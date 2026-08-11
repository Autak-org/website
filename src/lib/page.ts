import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Dictionary, type Locale } from "@/i18n";

export type LocaleParams = { params: Promise<{ locale: string }> };

/** Validates the locale segment once and hands back the dictionary with it. */
export async function resolvePage(
  params: LocaleParams["params"],
): Promise<{ locale: Locale; dictionary: Dictionary }> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return { locale, dictionary: getDictionary(locale) };
}
