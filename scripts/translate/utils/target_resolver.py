"""Resolves the CLI's `target` argument into concrete file paths under i18n/.

The CLI accepts a `target` that is either of the following
- short path relative to a locale's docs root (e.g. "software-guide/launch.mdx")
- the file name for a UI-texts JSON file
- "all" 

These helpers convert that into the actual on-disk locale-relative path(s)
"""

import json
import os
from pathlib import Path
import sys

from utils.locales import get_all_locales

# Every file extension this pipeline knows how to parse, 
# grouped by the parser module (parse/markdown.py, parse/json.py) that handles it.
FILETYPE_EXTS_MAP = {
    "markdown": [".md", ".mdx"],
    "json": [".json"]
}

def resolve_path_ext(short_path, is_strict_mode=True):
    """Returns the lowercased file extension of `short_path` if supported.

    Args:
        short_path (str): A file path or bare file name; only its extension
            is inspected.
        is_strict_mode (bool): 
            - `True`: an unsupported extension is a fatal CLI usage error.
            - `False`: an unsupported extension is expected and simply skipped.

    Returns:
        str | None: The extension (e.g. ".mdx"), 
            or None when`is_strict_mode` is False and the extension isn't supported.
    """
    _, path_ext = os.path.splitext(short_path)
    path_ext = path_ext.lower()
    if path_ext not in [ext for exts in FILETYPE_EXTS_MAP.values() for ext in exts]:
        if is_strict_mode:
            print(f"[Error] Unsupported file extension '{path_ext}'. Only .md, .mdx, and .json are supported.")
            sys.exit(1)
        else:
            return None
    return path_ext


def resolve_locale_rel_path(short_path, locale_from):
    """Resolves a single CLI `target` path to a path relative to a locale root.

    Docs pages live under "docusaurus-plugin-content-docs/current/"
    while UI-text JSON files (footer.json, navbar.json, code.json,...) sit directly under the locale root.
    
    So a bare `short_path` is tried against both locations, in that order, 
    and the first one that actually exists on disk wins.

    Args:
        short_path (str): The path as given on the CLI
        locale_from (str): The source locale code (e.g. "de") (necessary when resolving `short_path` against).

    Returns:
        str: `locale_rel_path`, the path relative to the locale root (e.g. "docusaurus-plugin-content-docs/current/index.mdx").
    """
    locale_root_path = os.path.join("i18n", locale_from)
    for locale_rel_path_without_short_path in [
        "",
        os.path.join("docusaurus-plugin-content-docs", "current")
    ]:
        locale_rel_path = os.path.join(locale_rel_path_without_short_path, short_path)
        full_path_from = os.path.join(locale_root_path, locale_rel_path)
        if os.path.isfile(full_path_from):
            return locale_rel_path
    else:
        # If we get here, the file doesn't exist in either location. This is a fatal error.
        print(f"[Error] Source file '{short_path}' does not exist in the locale '{locale_from}'.")
        sys.exit(1)

def resolve_full_path(locale_rel_path, locale):
    """Joins a locale-relative path with its locale's root directory.

    Args:
        locale_rel_path (str): relative to "i18n/<locale>/".
        locale (str): The locale code to resolve against 
            (both source locale and target locale are fine)

    Returns:
        str: The full on-disk path, e.g. "i18n/en/docusaurus-theme/footer.json".
    """
    return os.path.join("i18n", locale, locale_rel_path)

def resolve_locale_rel_paths(parent_dir, locale_from):
    """Finds every translatable file under a locale's directory tree.

    Used for the `target == "all"` case
    
    Recursively scans `parent_dir` for every file with a supported extension (.md/.mdx/.json),
    and returns each one as a path relative to the locale root (e.g. "docusaurus-plugin-content-docs/current/index.mdx").

    Args:
        parent_dir (str): The directory to scan, expected to be the source locale's root (e.g. "i18n/de").
        locale_from (str): The source locale code (used only to compute paths relative to "i18n/<locale_from>/").

    Returns:
        list[str]: Locale-relative paths of every translatable file found.
    """
    target_exts = [ext for exts in FILETYPE_EXTS_MAP.values() for ext in exts]
    target_files = []
    for f in Path(parent_dir).rglob("*"):
        if not f.is_file(): continue
        if resolve_path_ext(f.name, is_strict_mode=False) not in target_exts: continue
        target_files.append(f)

    locale_root_path = os.path.join("i18n", locale_from)
    locale_rel_paths = []
    for file_path in target_files:
        locale_rel_path = file_path.relative_to(locale_root_path).as_posix()
        locale_rel_paths.append(locale_rel_path)

    return locale_rel_paths
