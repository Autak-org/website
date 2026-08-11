import { de, type Dictionary } from "./dictionaries/de";
import { en } from "./dictionaries/en";
import { generated } from "./dictionaries/generated";
import type { Locale } from "./config";

const dictionaries: Partial<Record<Locale, Dictionary>> = {
  de,
  en,
  ...generated,
};

/**
 * Falls back to English for any locale whose translation has not been
 * generated yet, so a new entry in `locales` can never break a page.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}

export type { Dictionary };
export * from "./config";
export * from "./localized";
