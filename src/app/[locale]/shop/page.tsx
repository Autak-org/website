import type { Metadata } from "next";
import Image from "next/image";
import { Rule, Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { products } from "@/content/shop";
import { resolvePage, type LocaleParams } from "@/lib/page";
import { getDictionary, isLocale, t } from "@/i18n";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { pages } = getDictionary(locale);
  return { title: pages.shop.title, description: pages.shop.intro };
}

export default async function ShopPage({ params }: LocaleParams) {
  const { locale, dictionary } = await resolvePage(params);
  const { pages, nav } = dictionary;
  const copy = pages.shop;

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
        image="/images/media/shop-cards.jpg"
        imageAlt={copy.title}
        breadcrumbs={[
          { label: nav.home, href: routes.home(locale) },
          { label: nav.shop },
        ]}
        breadcrumbLabel={dictionary.a11y.breadcrumb}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={(index % 3) * 90}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white">
                <div className="relative aspect-[4/3] border-b border-ink-200">
                  <Image
                    src={product.image}
                    alt={t(product.imageAlt, locale)}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink-700">
                    {copy.availability[product.availability]}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl leading-snug font-bold text-ink-900">
                    {t(product.name, locale)}
                  </h2>
                  <Rule className="mt-4" />
                  <p className="mt-4 leading-relaxed text-ink-600">
                    {t(product.summary, locale)}
                  </p>
                  {product.price ? (
                    <p className="mt-auto pt-6 text-lg font-bold text-ink-900">
                      {product.price}
                    </p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="muted" divide>
        <Frame className="p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-12">
            <div>
              <h2 className="text-[length:var(--text-display-sm)] leading-tight font-bold text-ink-900">
                {copy.notifyTitle}
              </h2>
              <Rule className="mt-6" />
              <p className="mt-6 leading-relaxed text-ink-600">
                {copy.notifyBody}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href={`mailto:${site.email}`} external>
                {copy.notifyCta}
              </ButtonLink>
              <ButtonLink href={site.shop} external variant="ghost" arrow>
                {copy.legacyCta}
              </ButtonLink>
            </div>
          </div>
        </Frame>
      </Section>
    </>
  );
}
