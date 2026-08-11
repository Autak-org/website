#!/usr/bin/env python3
"""Lifts the legal texts out of the one.com HTML snapshot.

The editor marks reusable chrome (menus, footer) with `data-in-template="true"`,
so page content is everything inside a TEXT component that is *not* in a
template. Inside those regions the markup is walked while remembering the
innermost block-level tag, which recovers headings, paragraphs and lists.

Run from the repository root:  python3 scripts/extract-legal.py
"""

from __future__ import annotations

import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content"
OUT = ROOT / "src" / "content" / "legal.generated.ts"

BLOCK_TAGS = {"h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "td"}

# The address block is part of the page chrome and is rendered by the footer.
# `div id=` catches an unclosed tag the editor left in the privacy page, which
# would otherwise surface as a heading.
DROP = (
    "+49 24192133973",
    "© alle rechte vorbehalten",
    "info@autak.org",
    "div id=",
)

PAGES = {
    "imprint": {
        "de": "home/impressum.html",
        "en": "en-1/imprint.html",
    },
    "statutes": {
        "de": "home/satzung/index.html",
        "en": "en-1/statutes/index.html",
    },
    "contributions": {
        "de": "home/satzung/beitragsordnung.html",
        "en": "en-1/statutes/schedule-of-contributions.html",
    },
    "privacy": {
        "de": "home/satzung/datenschutzerkl-rung.html",
        "en": "en-1/statutes/privacy-policy.html",
    },
}


def content_regions(raw: str) -> str:
    """Keeps only the page-specific TEXT components, dropping the site chrome."""
    parts = re.split(r'data-in-template="', raw)
    kept = []
    for part in parts[1:]:
        flag, _, rest = part.partition('"')
        if flag == "false" and 'data-specific-kind="TEXT"' in rest[:400]:
            # `rest` starts mid-tag; skip the remaining attributes.
            kept.append(rest.partition(">")[2])
    return "".join(kept)


def normalise(raw_text: str) -> str:
    text = html.unescape(raw_text).replace("\xa0", " ")
    text = re.sub(r"[^\S\n]+", " ", text)
    text = re.sub(r"\n{2,}", "\n", text)
    return "\n".join(line.strip() for line in text.split("\n")).strip()


def blocks(path: Path) -> list[dict[str, str]]:
    raw = path.read_text(encoding="utf-8", errors="replace")
    raw = re.sub(r"(?is)<(script|style|head)[^>]*>.*?</\1>", " ", raw)
    raw = content_regions(raw)

    out: list[dict[str, str]] = []
    stack: list[str] = []
    buffer: list[str] = []
    # Anchors collected for the block currently being built, as (href, text).
    links: list[list[str]] = []
    open_links: list[list[str]] = []

    def flush() -> None:
        text = normalise("".join(buffer))
        anchors = [(href, normalise(label)) for href, label in links]
        buffer.clear()
        links.clear()
        open_links.clear()
        if not text:
            return
        tag = next((t for t in reversed(stack) if t in BLOCK_TAGS), "p")
        kind = {"h1": "h2", "h2": "h2", "h3": "h3", "h4": "h3", "h5": "h3", "h6": "h3"}.get(tag)
        if kind is None:
            kind = "li" if tag == "li" else "p"

        # A block that is nothing but a link becomes a download button.
        if len(anchors) == 1 and anchors[0][1] == text:
            out.append({"type": "link", "text": text, "href": anchors[0][0]})
            return

        out.append({"type": kind, "text": text})

    for match in re.finditer(r"(?s)<(/?)([a-zA-Z0-9]+)([^>]*?)(/?)>|([^<]+)", raw):
        closing, tag, attrs, self_closing, text = match.groups()
        if text is not None:
            buffer.append(text)
            for link in open_links:
                link[1] += text
            continue
        tag = tag.lower()
        if tag == "br":
            buffer.append("\n")
            continue
        if tag == "a":
            if closing:
                if open_links:
                    open_links.pop()
            else:
                href = re.search(r'href="([^"]*)"', attrs or "")
                link = [href.group(1) if href else "", ""]
                links.append(link)
                open_links.append(link)
            continue
        if self_closing:
            buffer.append(" ")
            continue
        if closing:
            if tag in BLOCK_TAGS:
                flush()
                if tag in stack:
                    stack.pop(stack.index(tag))
            continue
        if tag in BLOCK_TAGS:
            flush()
            stack.append(tag)

    flush()
    return out


def trim(items: list[dict[str, str]]) -> list[dict[str, str]]:
    cleaned: list[dict[str, str]] = []
    for item in items:
        text = item["text"].strip()
        lowered = text.lower()
        if not text or text in {"|", ":", "."}:
            continue
        if any(marker in lowered for marker in DROP):
            continue

        kind = item["type"]
        if kind == "link":
            cleaned.append({"type": kind, "text": text, "href": item["href"]})
            continue

        # The editor styled section titles as bold paragraphs. Promoting them
        # keeps headings visually distinct from the body copy.
        if (
            kind == "p"
            and "\n" not in text
            and ":" not in text
            and len(text) < 64
            and text[-1] not in ".:!?"
        ):
            kind = "h3"

        # One heading in the imprint runs a label straight into the first
        # section sign; split it so both read as their own heading.
        if kind in {"h2", "h3"}:
            parts = re.match(r"^(.+?)(§\s*\d+.*)$", text)
            if parts and parts.group(1).strip():
                cleaned.append({"type": kind, "text": parts.group(1).strip()})
                cleaned.append({"type": kind, "text": parts.group(2).strip()})
                continue

        cleaned.append({"type": kind, "text": text})

    # The first heading duplicates the page title rendered by the layout.
    if cleaned and cleaned[0]["type"] == "h2":
        cleaned = cleaned[1:]
    return cleaned


def main() -> None:
    data = {
        slug: {locale: trim(blocks(CONTENT / rel)) for locale, rel in sources.items()}
        for slug, sources in PAGES.items()
    }

    body = json.dumps(data, ensure_ascii=False, indent=2)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(
        "// Generated by scripts/extract-legal.py from the one.com snapshot in content/.\n"
        "// Do not edit by hand; re-run the script instead.\n\n"
        "export type LegalBlock = {\n"
        '  type: "h2" | "h3" | "p" | "li" | "link";\n'
        "  text: string;\n"
        "  href?: string;\n"
        "};\n\n"
        f"export const legalContent = {body} as const satisfies Record<\n"
        "  string,\n"
        "  Record<string, readonly LegalBlock[]>\n"
        ">;\n",
        encoding="utf-8",
    )

    for slug, locales in data.items():
        print(slug, {locale: len(items) for locale, items in locales.items()})


if __name__ == "__main__":
    main()
