/**
 * German and English are written by hand. Remaining UI locales are produced
 * by `npm run translate`. Editorial copy for those locales is filled by
 * `npm run translate:editorial` (optional `*_fr` / `*_nl` / … fields).
 */
export const sourceLocales = ["de", "en"] as const;

export const translatedLocales = ["fr", "nl", "es", "tr"] as const;

export const locales = [...sourceLocales, ...translatedLocales] as const;

export type Locale = (typeof locales)[number];
export type SourceLocale = (typeof sourceLocales)[number];
export type TranslatedLocale = (typeof translatedLocales)[number];

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
