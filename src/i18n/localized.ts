import type { Locale } from "./config";

/**
 * Editorial content (names, project copy, job ads) is written by hand in
 * German and English. Machine-translated locales fall back to English rather
 * than shipping a half-translated page.
 */
export type Localized<T> = { de: T; en: T };

export function t<T>(value: Localized<T>, locale: Locale): T {
  return (value as Partial<Record<Locale, T>>)[locale] ?? value.en;
}
