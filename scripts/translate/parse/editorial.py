"""Parse and rewrite Autak editorial frontmatter (`key_de` / `key_en` / …).

Only English source fields (`*_en`) are sent to the translator.
Machine locales are written back as sibling keys (`*_fr`, `*_nl`, …)
in the same file, preserving order and multiline `|-` blocks.
"""

from __future__ import annotations

from dataclasses import dataclass
import re

# Brand / product terms that must survive machine translation.
GLOSSARY = [
    "Autak",
    "Autak e.V.",
    "BusBuddy",
    "Connie",
    "Aachen",
    "RWTH",
    "FH Aachen",
    "PayPal",
    "ESP32",
    "CAN",
    "Fusion 360",
    "FreeCAD",
    "CYBATHLON",
    "MDR",
    "ARD",
    "UpdateDeutschland",
    "StädteRegion",
    "Kinova",
    "Jaco",
    "Einfach genial",
    "Inklusiv & divers",
]


@dataclass
class Field:
    key: str
    value: str
    multiline: bool


_FM_RE = re.compile(r"^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$")


def parse_file(content: str) -> tuple[list[Field], str]:
    """Split an editorial .md into ordered frontmatter fields + body."""
    match = _FM_RE.match(content)
    if not match:
        raise ValueError("Markdown must start with a --- frontmatter block.")

    fields: list[Field] = []
    current_key: str | None = None
    multiline_lines: list[str] = []
    multiline = False

    def flush() -> None:
        nonlocal current_key, multiline
        if current_key is None:
            return
        value = "\n".join(multiline_lines).rstrip("\n")
        fields.append(Field(key=current_key, value=value, multiline=multiline))
        current_key = None
        multiline_lines.clear()
        multiline = False

    for line in match.group(1).split("\n"):
        if current_key is not None and multiline:
            if line.startswith("  ") or line == "":
                multiline_lines.append(line[2:] if line.startswith("  ") else line)
                continue
            flush()

        kv = re.match(r"^([A-Za-z0-9_]+):\s*(.*)$", line)
        if not kv:
            continue

        key, raw = kv.group(1), kv.group(2)
        if raw in ("|", ">", "|-", ">-"):
            current_key = key
            multiline = True
            continue

        value = raw.strip()
        if (value.startswith('"') and value.endswith('"')) or (
            value.startswith("'") and value.endswith("'")
        ):
            value = value[1:-1]
        fields.append(Field(key=key, value=value, multiline=False))

    flush()
    return fields, match.group(2)


def english_sources(fields: list[Field]) -> list[Field]:
    """Return every `*_en` field (the machine-translation source)."""
    return [field for field in fields if field.key.endswith("_en")]


def missing_targets(
    fields: list[Field],
    source_field: Field,
    locales: list[str],
    *,
    force: bool,
) -> list[str]:
    """Which target locale suffixes still need a value for this English field."""
    base = source_field.key[: -len("_en")]
    existing = {field.key for field in fields}
    needed: list[str] = []
    for locale in locales:
        key = f"{base}_{locale}"
        if force or key not in existing:
            needed.append(locale)
    return needed


def protect_glossary(text: str) -> tuple[str, dict[str, str]]:
    """Swap glossary terms for opaque tags so Google leaves them alone."""
    table: dict[str, str] = {}
    # Longest first so "Autak e.V." wins over "Autak"
    for term in sorted(GLOSSARY, key=len, reverse=True):
        if term not in text:
            continue
        # Spaced alphanumeric tokens survive MT better than XML-ish tags
        # and keep neighbouring words from gluing onto brand names.
        token = f"ZZGL{len(table) + 1}ZZ"
        table[token] = term
        text = text.replace(term, f" {token} ")
    return re.sub(r" {2,}", " ", text).strip(), table


def restore_glossary(text: str, table: dict[str, str]) -> str:
    for token, term in table.items():
        text = re.sub(
            rf"\s*{re.escape(token)}\s*",
            f" {term} ",
            text,
            flags=re.IGNORECASE,
        )
    text = re.sub(r" {2,}", " ", text).strip()
    # If a brand still got glued to a letter (àCYBATHLON / leAutak), split it.
    for term in table.values():
        text = re.sub(rf"(?<=\w)({re.escape(term)})", r" \1", text)
        text = re.sub(rf"({re.escape(term)})(?=\w)", r"\1 ", text)
    return re.sub(r" {2,}", " ", text).strip()


def upsert_translations(
    fields: list[Field],
    source_key: str,
    translations: dict[str, str],
) -> list[Field]:
    """Insert or replace `base_<locale>` fields right after the English source."""
    base = source_key[: -len("_en")]
    result: list[Field] = []
    inserted_for: set[str] = set()

    for field in fields:
        if field.key == source_key:
            result.append(field)
            for locale, value in translations.items():
                target_key = f"{base}_{locale}"
                multiline = "\n" in value
                result.append(
                    Field(key=target_key, value=value, multiline=multiline)
                )
                inserted_for.add(target_key)
            continue

        # Drop old machine keys we are replacing; keep everything else.
        if field.key in inserted_for:
            continue
        # Also drop keys we are about to rewrite if they appeared out of order
        skip = False
        for locale in translations:
            if field.key == f"{base}_{locale}":
                skip = True
                break
        if skip:
            continue

        result.append(field)

    return result


def serialize(fields: list[Field], body: str) -> str:
    """Rebuild a full Markdown file from fields + body."""
    lines = ["---"]
    for field in fields:
        if field.multiline or "\n" in field.value:
            lines.append(f"{field.key}: |-")
            if field.value == "":
                lines.append("")
            else:
                for part in field.value.split("\n"):
                    lines.append(f"  {part}")
        else:
            lines.append(f"{field.key}: {field.value}")
    lines.append("---")
    body = body.rstrip("\n")
    if body:
        lines.append(body)
        lines.append("")
    else:
        lines.append("")
    return "\n".join(lines)
