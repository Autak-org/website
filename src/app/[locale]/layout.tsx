import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getDictionary, isLocale, locales, type Locale } from "@/i18n";

type LayoutParams = { params: Promise<{ locale: string }> };

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d0d0d",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dictionary = getDictionary(locale);

  return {
    title: {
      default: "Autak",
      template: "%s — Autak",
    },
    description: dictionary.meta.description,
    alternates: {
      languages: Object.fromEntries(locales.map((item) => [item, `/${item}`])),
    },
    openGraph: {
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      locale,
      type: "website",
      images: ["/images/hero-aachen.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutParams & { children: React.ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale);

  return (
    <html lang={locale}>
      <body className="bg-white text-ink-800">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-brand-600 focus:px-6 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          {dictionary.a11y.skipToContent}
        </a>

        <SiteHeader locale={locale as Locale} dictionary={dictionary} />
        <main id="main">{children}</main>
        <SiteFooter locale={locale as Locale} dictionary={dictionary} />
      </body>
    </html>
  );
}
