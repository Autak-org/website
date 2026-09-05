"""Helpers for reading the project's supported-locale list.

Read all locales from `i18n/config.json`
"""
import json

# Memoized result of the first get_all_locales() call. The config file
# never changes during a single CLI invocation, so it only needs to be read
# from disk once.
_all_locales_cache = None

def get_all_locales(exclude=None):
    """Returns the list of locale codes configured in i18n/config.json.

    Args:
        exclude (list[str] | None): Locale codes to filter out of the result 
            (e.g. the source locale, which should never be listed as one of its own translation targets).

    Returns:
        list[str]: The configured locale codes, minus any in `exclude`.
    """
    global _all_locales_cache
    if _all_locales_cache is None:
        with open("i18n/config.json", "r", encoding="utf-8") as f:
            i18n_config = json.load(f)
        _all_locales_cache = i18n_config.get("locales", [])
    if exclude and isinstance(exclude, list):
        _all_locales_cache = [locale for locale in _all_locales_cache if locale not in exclude]
    return _all_locales_cache

def assert_locale_exists(locale):
    """Exits the process with an error message if `locale` is not configured.

    Args:
        locale (str): The locale code to validate (e.g. "de", "en").
    """
    if locale not in get_all_locales():
        print(f"[Error] The specified locale '{locale}' could not be found in the i18n configuration.")
        sys.exit(1)
