"""Translate Autak editorial Markdown into machine locales (fr/nl/es/tr).

Uses https://github.com/Cynteract/translation-toolkit (Google Cloud Translation).

Examples:
  npm run translate:editorial -- all --from en --to all
  npm run translate:editorial -- all --from en --to fr
  npm run translate:editorial -- news/cybathlon.md --from en --to all
  npm run translate:editorial -- editorial/projects/wheelchair --from en --to all

Options:
  --force   Re-translate even when target keys already exist
"""

from __future__ import annotations

import argparse
import html
import os
import sys
from pathlib import Path

# Allow `python scripts/translate/main.py` from the repo root.
sys.path.insert(0, str(Path(__file__).resolve().parent))

from translation_toolkit import LocalizationDataset, Translator

from parse.editorial import (
    english_sources,
    missing_targets,
    parse_file,
    protect_glossary,
    restore_glossary,
    serialize,
    upsert_translations,
)
from utils.locales import assert_source_locale, get_target_locales
from utils.paths import list_editorial_files


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Machine-translate editorial/*_en fields into fr/nl/es/tr."
    )
    parser.add_argument(
        "target",
        help="'all', an editorial path, or a path relative to editorial/",
    )
    parser.add_argument(
        "--from",
        dest="source",
        required=True,
        help="Source locale (use 'en' — editorial machine locales are based on English).",
    )
    parser.add_argument(
        "--to",
        dest="to",
        required=True,
        help="Target locale code, or 'all' for fr/nl/es/tr.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite existing machine-translated fields.",
    )
    return parser.parse_args()


def translate_file(
    path: Path,
    source: str,
    targets: list[str],
    *,
    force: bool,
    translator: Translator,
) -> bool:
    """Translate one editorial file. Returns True if the file was modified."""
    raw = path.read_text(encoding="utf-8")
    try:
        fields, body = parse_file(raw)
    except ValueError as exc:
        print(f"[Skip] {path}: {exc}")
        return False

    if source != "en":
        print(
            f"[Skip] {path}: only English (`*_en`) is used as the MT source "
            f"(got --from {source})."
        )
        return False

    sources = english_sources(fields)
    if not sources:
        print(f"[Skip] {path}: no *_en fields")
        return False

    # One dataset entry per English field that still needs at least one locale.
    entries: list[tuple[str, str, dict[str, str], list[str]]] = []
    for field in sources:
        locales_needed = missing_targets(fields, field, targets, force=force)
        if not locales_needed:
            continue
        protected, table = protect_glossary(field.value)
        entries.append((field.key, protected, table, locales_needed))

    if not entries:
        print(f"[Ok] {path}: already up to date")
        return False

    locale_set = sorted({locale for *_, locales in entries for locale in locales})
    print(
        f"[Info] {path}: {len(entries)} field(s) → {', '.join(locale_set)}"
    )

    dataset = LocalizationDataset()
    for index, (_key, text, _table, _locales) in enumerate(entries):
        dataset.add_entry("editorial", f"block_{index}", source, text)

    translator.auto_translate(
        dataset,
        target_locales=locale_set,
        source_locale=source,
    )

    updated = fields
    for index, (source_key, _text, table, locales_needed) in enumerate(entries):
        translations: dict[str, str] = {}
        for locale in locales_needed:
            translated = dataset.get_value("editorial", f"block_{index}", locale)
            translated = html.unescape(translated or "")
            translations[locale] = restore_glossary(translated, table)
        updated = upsert_translations(updated, source_key, translations)

    path.write_text(serialize(updated, body), encoding="utf-8")
    print(f"[Wrote] {path}")
    return True


def main() -> None:
    args = parse_args()
    assert_source_locale(args.source)
    targets = get_target_locales(args.to, args.source)

    sa_path = "service-account-key.json"
    if not os.path.isfile(sa_path):
        raise SystemExit(
            "[Error] Missing service-account-key.json in the project root. "
            "Place a Google Cloud service account key there (git-ignored)."
        )

    files = list_editorial_files(args.target)
    if not files:
        raise SystemExit("[Error] No editorial Markdown files matched.")

    print(
        f"[Info] {len(files)} file(s), source={args.source}, "
        f"targets={', '.join(targets)}, force={args.force}"
    )

    translator = Translator(service_account_path=sa_path)
    changed = 0
    for path in files:
        if translate_file(
            path, args.source, targets, force=args.force, translator=translator
        ):
            changed += 1

    print(f"[Done] Updated {changed}/{len(files)} file(s).")


if __name__ == "__main__":
    main()
