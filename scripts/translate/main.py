"""CLI entry point for translating the docs/UI-text.

- This script is executed via `npm run translate`.
- It reads source files (either a specific one or all of them) under the specified source locale and translates them into the target locale(s).
- It invokes https://github.com/Cynteract/translation_toolkit for translation.
"""

import argparse
import html
import json
import os
from pathlib import Path
import sys

from translation_toolkit import LocalizationDataset, Translator

from parse.markdown import parse_markdown, unescape_for_markdown
from parse.json import parse_json, unescape_for_json
from utils.locales import get_all_locales, assert_locale_exists
from utils.target_resolver import resolve_path_ext, resolve_locale_rel_path, resolve_full_path, resolve_locale_rel_paths

def parse_args():
    """Parses CLI arguments into a (target, locale_map) pair.

    Returns:
        tuple[str, dict]: 
            - target(str): The normalized `target` argument
            - locale_map(dict[str, str]): A dict with "from" and "to" keys holding the requested source/target locale(s).
    """
    parser = argparse.ArgumentParser(description="Translation Toolkit CLI")
    parser.add_argument(
        "target",
        help="Specify 'all', a path (start from 'i18m/[lang]' or 'i18n/[lang]/docusaurus-plugin-content-docs/current')"
    )
    parser.add_argument(
        "--from",
        help="source languages (e.g., en, de)."
    )
    parser.add_argument(
        "--to",
        help="target languages (e.g., en, de), or 'all' for all supported languages"
    )
    args = parser.parse_args()

    target = os.path.normpath(args.target)
    locale_map = {k: getattr(args, k) for k in ["from", "to"]}

    return target, locale_map

def translate_file(locale_rel_path, locale_map):
    """Translates a single source file into one or every target locale.

    The source file is read once and parsed once, 
    then reused for every target locale in `locale_map["to"]` 
    (or every locale in the project when it is "all")
    
    So the actual translation call to `Translator.auto_translate`below 
    is batched across all target locales in one request rather than looping per-locale.

    Args:
        locale_rel_path (str): Path to the file, relative to a locale's root directory 
            (e.g. "docusaurus-plugin-content-docs/current/index.mdx"),
            as resolved by utils.target_resolver.
        locale_map (dict): The "from"/"to" locale codes parsed by parse_args()
            ("to" may be the literal string "all").
    """
    print(f"[Info] Translating file: {locale_rel_path} from \"{locale_map['from']}\" to \"{locale_map['to']}\"")

    # Load the content of the source file
    full_path_from = resolve_full_path(locale_rel_path, locale_map["from"])
    with open(full_path_from, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Parse the content based on the file extension into an ordered list of
    # {"text": str, "shouldTranslate": bool} blocks. 
    path_ext = resolve_path_ext(locale_rel_path)
    if path_ext in [".md", ".mdx"]:
        parsed_blocks = parse_markdown(content)
    elif path_ext == ".json":
        # placeholder_table is used to unescape the translated content back into valid JSON
        parsed_blocks, placeholder_table = parse_json(content)

    # Register only the translatable blocks as entries in a single dataset
    dataset = LocalizationDataset()
    for idx, block in enumerate(parsed_blocks):
        if not block["shouldTranslate"]:
            continue
        dataset.add_entry("docs", f"block_{idx}", locale_map['from'], block["text"])

    # Resolve target locales: "all" expands to every configured locale
    # (except the source locale itself)
    if locale_map['to'] == "all":
        locales_to = get_all_locales(exclude=[locale_map['from']])
    else:
        locales_to = [locale_map['to']]

    # Send every translatable block to Google Cloud Translation in one batched call, 
    # covering every target locale at once.
    translator = Translator(service_account_path="service-account-key.json")
    translator.auto_translate(
        dataset,
        target_locales=locales_to,
        source_locale=locale_map["from"]
    )

    # Reassemble each target locale's file by walking the same block list used to build the dataset
    for locale_to in locales_to:
        full_path_to = resolve_full_path(locale_rel_path, locale_to)

        os.makedirs(os.path.dirname(full_path_to), exist_ok=True)
        with open(full_path_to, "w", encoding="utf-8") as f:
            for idx, block in enumerate(parsed_blocks):
                if block["shouldTranslate"]:
                    translated_content = dataset.get_value("docs", f"block_{idx}", locale_to)
                    if path_ext == ".json":
                        # For JSON, unescape any HTML entities and any placeholders
                        unescaped_content = unescape_for_json(translated_content, placeholder_table)
                    else:
                        # For Markdown, unescape any HTML entities
                        unescaped_content = unescape_for_markdown(translated_content)
                    f.write(unescaped_content)
                else:
                    f.write(block["text"])

def main():
    """CLI entry point.

    - `target != "all"`: Resolves the `target` argument into one or more locale-relative file paths, 
        then hands each one to translate_file(). `target == "all"` walks
    - `target == "all"`: Walks every translatable file (.md/.mdx/.json) 
        under the source locale's directory tree
    """
    target, locale_map = parse_args()

    # Fail fast with a clear error if --from refers to a locale 
    # that isn't configured in i18n/config.json
    assert_locale_exists(locale_map["from"])

    if target == "all":
        target_parent_dir = os.path.join("i18n", locale_map["from"])
        locale_rel_paths = resolve_locale_rel_paths(target_parent_dir, locale_map["from"])

        # Translate each file
        for locale_rel_path in locale_rel_paths:
            translate_file(locale_rel_path, locale_map)
    else:
        locale_rel_path = resolve_locale_rel_path(target, locale_map["from"])
        translate_file(locale_rel_path, locale_map)

if __name__ == "__main__":
    main()
