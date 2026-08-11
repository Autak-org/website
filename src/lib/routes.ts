import type { Locale } from "@/i18n/config";

/**
 * Every internal URL in one place, so a rename never leaves a dangling link.
 */
export const routes = {
  home: (locale: Locale) => `/${locale}`,
  about: (locale: Locale) => `/${locale}/about`,
  projects: (locale: Locale) => `/${locale}/projects`,
  project: (locale: Locale, slug: string) => `/${locale}/projects/${slug}`,
  news: (locale: Locale) => `/${locale}/news`,
  positions: (locale: Locale) => `/${locale}/positions`,
  shop: (locale: Locale) => `/${locale}/shop`,
  contact: (locale: Locale) => `/${locale}/contact`,
  partners: (locale: Locale) => `/${locale}/for-partners`,
  users: (locale: Locale) => `/${locale}/for-users`,
  members: (locale: Locale) => `/${locale}/for-members`,
  legal: (locale: Locale, slug: LegalSlug) => `/${locale}/legal/${slug}`,
} as const;

export const legalSlugs = [
  "imprint",
  "privacy",
  "statutes",
  "contributions",
] as const;

export type LegalSlug = (typeof legalSlugs)[number];
