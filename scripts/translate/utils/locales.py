"""Locale lists for the editorial translation CLI.

Mirrors `src/i18n/config.ts` — keep these in sync when adding a language.
"""

SOURCE_LOCALES = ["de", "en"]
TRANSLATED_LOCALES = ["fr", "nl", "es", "tr"]
ALL_LOCALES = SOURCE_LOCALES + TRANSLATED_LOCALES


def get_target_locales(to_arg: str, source: str) -> list[str]:
    """Expand `--to` into concrete locale codes (excluding the source)."""
    if to_arg == "all":
        return [locale for locale in TRANSLATED_LOCALES if locale != source]
    if to_arg not in ALL_LOCALES:
        raise SystemExit(
            f"[Error] Unknown locale '{to_arg}'. "
            f"Expected one of: {', '.join(ALL_LOCALES)} or 'all'."
        )
    if to_arg == source:
        raise SystemExit("[Error] --to cannot be the same as --from.")
    return [to_arg]


def assert_source_locale(locale: str) -> None:
    if locale not in SOURCE_LOCALES:
        raise SystemExit(
            f"[Error] --from must be a hand-written source locale "
            f"({', '.join(SOURCE_LOCALES)}), got '{locale}'."
        )
