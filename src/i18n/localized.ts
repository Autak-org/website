import {
  translatedLocales,
  type Locale,
  type TranslatedLocale,
} from "./config";

/**
 * Editorial content is written by hand in German and English.
 * Optional machine-translated locales (fr/nl/es/tr) are filled by
 * `npm run translate:editorial`. Missing ones fall back to English.
 */
export type Localized<T> = { de: T; en: T } & Partial<
  Record<TranslatedLocale, T>
>;

export function t<T>(value: Localized<T>, locale: Locale): T {
  return (value as Partial<Record<Locale, T>>)[locale] ?? value.en;
}

/** Attach optional machine-translated strings from frontmatter `key_fr` etc. */
export function withTranslatedLocales(
  data: Record<string, string>,
  key: string,
  base: { de: string; en: string },
): Localized<string> {
  const result: Localized<string> = { ...base };
  for (const locale of translatedLocales) {
    const value = data[`${key}_${locale}`]?.trim();
    if (value) result[locale] = value;
  }
  return result;
}
