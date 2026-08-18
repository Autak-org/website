import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Rule, Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Frame } from "@/components/ui/frame";
import { Download } from "@/components/icons";
import { legalContent, type LegalBlock } from "@/content/legal.generated";
import { getDictionary, isLocale, locales } from "@/i18n";
import { legalSlugs, routes, type LegalSlug } from "@/lib/routes";

type LegalParams = { params: Promise<{ locale: string; slug: string }> };

function isLegalSlug(value: string): value is LegalSlug {
  return (legalSlugs as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    legalSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: LegalParams): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isLegalSlug(slug)) return {};

  const { pages } = getDictionary(locale);
  return { title: pages.legal[slug], description: pages.legal.intro[slug] };
}

export default async function LegalPage({ params }: LegalParams) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isLegalSlug(slug)) notFound();

  const dictionary = getDictionary(locale);
  const { pages, nav } = dictionary;

  // Only German and English exist as source documents; other locales read the
  // English text, because a machine translation of a legal document would be
  // misleading.
  const document: readonly LegalBlock[] =
    legalContent[slug][locale as "de" | "en"] ?? legalContent[slug].en;

  return (
    <>
      <PageHero
        eyebrow={pages.legal.eyebrow}
        title={pages.legal[slug]}
        intro={pages.legal.intro[slug]}
        image="/images/media/aachen-crest.jpg"
        imageAlt={pages.legal[slug]}
        compact
        breadcrumbs={[
          { label: nav.home, href: routes.home(locale) },
          { label: pages.legal[slug] },
        ]}
        breadcrumbLabel={dictionary.a11y.breadcrumb}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_260px] lg:gap-16">
          <Frame className="prose-legal p-5 sm:p-10">
            {document.map((block, index) => {
              const key = `${block.type}-${index}`;

              if (block.type === "h2") {
                return <h2 key={key}>{block.text}</h2>;
              }
              if (block.type === "h3") {
                return <h3 key={key}>{block.text}</h3>;
              }
              if (block.type === "li") {
                return (
                  <p key={key} className="clause">
                    {block.text}
                  </p>
                );
              }
              if (block.type === "link" && block.href) {
                return (
                  <a
                    key={key}
                    href={block.href}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-ink-200 px-5 py-2.5 text-sm font-semibold text-ink-900 no-underline transition-colors hover:border-brand-500 hover:text-brand-600"
                  >
                    <Download className="h-4 w-4" />
                    {block.text}
                  </a>
                );
              }
              return <p key={key}>{block.text}</p>;
            })}
          </Frame>

          <aside className="lg:sticky lg:top-32 lg:h-fit">
            <h2 className="text-xs font-semibold tracking-[0.2em] text-ink-500 uppercase">
              {pages.legal.otherDocuments}
            </h2>
            <Rule className="mt-4" />
            <ul className="mt-4 space-y-1">
              {legalSlugs
                .filter((item) => item !== slug)
                .map((item) => (
                  <li key={item}>
                    <Link
                      href={routes.legal(locale, item)}
                      className="block rounded-xl px-4 py-3 font-medium text-ink-700 transition-colors hover:bg-ink-50 hover:text-brand-600"
                    >
                      {pages.legal[item]}
                    </Link>
                  </li>
                ))}
            </ul>
          </aside>
        </div>
      </Section>
    </>
  );
}
