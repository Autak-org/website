/**
 * German and English are written by hand. The remaining locales are produced
 * by `npm run translate`, which machine-translates the English dictionary and
 * writes `dictionaries/generated/<locale>.ts`.
 */
export const sourceLocales = ["de", "en"] as const;

export const translatedLocales = ["fr", "nl", "es", "tr"] as const;

export const locales = [...sourceLocales, ...translatedLocales] as const;

export type Locale = (typeof locales)[number];
export type SourceLocale = (typeof sourceLocales)[number];

export const defaultLocale: Locale = "de";

export const localeNames: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  fr: "Français",
  nl: "Nederlands",
  es: "Español",
  tr: "Türkçe",
};

/** Shown next to machine-translated locales in the language menu. */
export const machineTranslated = new Set<Locale>(translatedLocales);

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
