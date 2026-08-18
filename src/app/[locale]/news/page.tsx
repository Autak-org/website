import type { Metadata } from "next";
import Image from "next/image";
import { Container, Rule, Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ScrollingStarWheel } from "@/components/ui/scrolling-star-wheel";
import { ArrowRight } from "@/components/icons";
import { formatDate } from "@/components/news-card";
import { news } from "@/content/news";
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
  return { title: pages.news.title, description: pages.news.intro };
}

export default async function NewsPage({ params }: LocaleParams) {
  const { locale, dictionary } = await resolvePage(params);
  const { pages, nav, common } = dictionary;
  const items = [...news].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHero
        eyebrow={pages.news.eyebrow}
        title={pages.news.title}
        intro={pages.news.intro}
        image="/images/media/event-crowd.jpg"
        imageAlt={dictionary.gallery.subtitle}
        breadcrumbs={[
          { label: nav.home, href: routes.home(locale) },
          { label: nav.news },
        ]}
        breadcrumbLabel={dictionary.a11y.breadcrumb}
      />

      <div id="news-stream" className="bg-white py-14 sm:py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <ScrollingStarWheel
                  targetId="news-stream"
                  turns={2}
                  className="h-48 w-48"
                />
                <Rule className="mt-10" />
                <p className="mt-6 text-sm leading-relaxed text-ink-500">
                  {pages.news.wheelHint}
                </p>
                <p className="mt-8 text-xs font-semibold tracking-[0.16em] text-ink-400 uppercase">
                  {items.length} · {pages.news.categories.all}
                </p>
              </div>
            </aside>

            <ol className="relative border-l border-ink-200 pl-8 sm:pl-12">
              {items.map((item, index) => (
                <li key={item.slug} className="relative pb-14 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute top-2 -left-[calc(2rem+5px)] h-2.5 w-2.5 rounded-full bg-brand-500 ring-4 ring-white sm:-left-[calc(3rem+5px)]"
                  />

                  <Reveal delay={index === 0 ? 0 : 80}>
                    <article className="grid gap-6 sm:grid-cols-[1fr_240px] sm:items-start">
                      <div>
                        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-[0.14em] uppercase">
                          <span className="text-brand-600">
                            {pages.news.categories[item.category]}
                          </span>
                          <span aria-hidden="true" className="h-px w-6 bg-ink-300" />
                          <time
                            dateTime={item.date}
                            className="text-ink-500 normal-case"
                          >
                            {formatDate(item.date, locale)}
                          </time>
                        </p>

                        <h2 className="mt-4 text-2xl leading-snug font-bold text-ink-900">
                          {t(item.title, locale)}
                        </h2>

                        <Rule className="mt-5" />

                        <p className="mt-5 leading-relaxed text-ink-600">
                          {t(item.excerpt, locale)}
                        </p>

                        {item.link ? (
                          <a
                            href={item.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
                          >
                            {t(item.link.label, locale)}
                            <ArrowRight className="h-4 w-4 -rotate-45" />
                          </a>
                        ) : null}
                      </div>

                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink-200 sm:aspect-[3/4]">
                        <Image
                          src={item.image}
                          alt={t(item.imageAlt, locale)}
                          fill
                          sizes="(min-width: 640px) 240px, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </div>

      <Section tone="muted" divide>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-xl text-lg leading-relaxed text-ink-600">
            {dictionary.involve.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={site.meeting} external>
              {dictionary.join.meeting}
            </ButtonLink>
            <ButtonLink href={routes.projects(locale)} variant="ghost" arrow>
              {common.seeAllProjects}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
