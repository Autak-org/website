import type { Metadata } from "next";
import { Rule, Section, SectionHeader } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { PositionCard } from "@/components/position-card";
import { Download } from "@/components/icons";
import { positions } from "@/content/positions";
import { resolvePage, type LocaleParams } from "@/lib/page";
import { getDictionary, isLocale } from "@/i18n";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { pages } = getDictionary(locale);
  return { title: pages.positions.title, description: pages.positions.intro };
}

export default async function PositionsPage({ params }: LocaleParams) {
  const { locale, dictionary } = await resolvePage(params);
  const { pages, nav, common } = dictionary;
  const copy = pages.positions;

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
        image="/images/media/learning-workshop.jpg"
        imageAlt={copy.title}
        breadcrumbs={[
          { label: nav.home, href: routes.home(locale) },
          { label: nav.positions },
        ]}
        breadcrumbLabel={dictionary.a11y.breadcrumb}
        actions={
          <>
            <ButtonLink href={`mailto:${site.email}`} external>
              {common.apply}
            </ButtonLink>
            <ButtonLink href={site.meeting} external variant="onDark">
              {dictionary.join.meeting}
            </ButtonLink>
          </>
        }
      />

      <Section>
        <SectionHeader
          eyebrow="01"
          title={copy.openTitle}
          intro={copy.openIntro}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {positions.map((position, index) => (
            <Reveal key={position.id} delay={(index % 2) * 90}>
              <PositionCard
                position={position}
                locale={locale}
                dictionary={dictionary}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="muted" divide>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Frame className="flex flex-col p-8">
            <h2 className="text-2xl font-bold text-ink-900">
              {copy.proposalTitle}
            </h2>
            <Rule className="mt-5" />
            <p className="mt-5 leading-relaxed text-ink-600">
              {copy.proposalBody}
            </p>
            <a
              href="/downloads/bus_buddy_thesis_proposal.pdf"
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink-200 bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-500 hover:text-brand-600"
            >
              <Download className="h-4 w-4" />
              {copy.proposalCta}
            </a>
          </Frame>

          <Frame className="flex flex-col p-8">
            <h2 className="text-2xl font-bold text-ink-900">
              {copy.nothingTitle}
            </h2>
            <Rule className="mt-5" />
            <p className="mt-5 leading-relaxed text-ink-600">
              {copy.nothingBody}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={site.meeting} external>
                {dictionary.join.meeting}
              </ButtonLink>
              <ButtonLink href={routes.contact(locale)} variant="ghost" arrow>
                {common.writeUs}
              </ButtonLink>
            </div>
          </Frame>
        </div>
      </Section>
    </>
  );
}
