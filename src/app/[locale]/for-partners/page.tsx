import type { Metadata } from "next";
import Image from "next/image";
import { Rule, Section, SectionHeader } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { VideoGallery } from "@/components/ui/video";
import { CitationList } from "@/components/citation-list";
import { VoiceGrid } from "@/components/voice-grid";
import {
  capabilities,
  partnerVoices,
  pressCitations,
  showcaseVideos,
} from "@/content/media";
import { localizeVideos } from "@/lib/videos";
import { resolvePage, type LocaleParams } from "@/lib/page";
import { getDictionary, isLocale, t } from "@/i18n";
import { routes } from "@/lib/routes";
import { partners, site } from "@/lib/site";

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { pages } = getDictionary(locale);
  return { title: pages.partners.title, description: pages.partners.intro };
}

export default async function PartnersPage({ params }: LocaleParams) {
  const { locale, dictionary } = await resolvePage(params);
  const { pages, nav, common, a11y } = dictionary;
  const copy = pages.partners;

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
        image="/images/media/event-panel.jpg"
        imageAlt={copy.title}
        breadcrumbs={[
          { label: nav.home, href: routes.home(locale) },
          { label: dictionary.audiences.partners.name },
        ]}
        breadcrumbLabel={a11y.breadcrumb}
        actions={
          <>
            <ButtonLink href={`mailto:${site.email}`} external>
              {common.writeUs}
            </ButtonLink>
            <ButtonLink href={site.paypal} external variant="onDark">
              {nav.donate}
            </ButtonLink>
          </>
        }
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <SectionHeader
            eyebrow="01 / 04"
            title={copy.pressTitle}
            intro={copy.pressIntro}
          />
          <div className="lg:pt-4">
            <CitationList citations={pressCitations} locale={locale} />
          </div>
        </div>

        <Frame padded={false} className="mt-14">
          <ul className="grid grid-cols-2 divide-x divide-y divide-ink-200 sm:grid-cols-4">
            {partners.map((partner) => (
              <li
                key={partner.name}
                className="flex items-center justify-center p-8"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={220}
                  height={80}
                  className="h-9 w-auto opacity-60 transition-opacity duration-300 hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        </Frame>
      </Section>

      <Section tone="muted" divide>
        <SectionHeader
          eyebrow="02 / 04"
          title={copy.videoTitle}
          intro={copy.videoIntro}
        />
        <div className="mt-12">
          <VideoGallery
            videos={localizeVideos(showcaseVideos, locale)}
            playLabel={a11y.playVideo}
          />
        </div>
      </Section>

      <Section divide>
        <SectionHeader
          eyebrow="03 / 04"
          title={copy.capabilitiesTitle}
          intro={copy.capabilitiesIntro}
        />

        <dl className="mt-12 grid gap-6 md:grid-cols-2">
          {capabilities.map((capability, index) => (
            <Reveal key={capability.id} delay={(index % 2) * 90}>
              <Frame className="h-full">
                <dt className="text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase">
                  {t(capability.label, locale)}
                </dt>
                <Rule className="mt-4" />
                <dd className="mt-4 leading-relaxed text-ink-600">
                  {t(capability.value, locale)}
                </dd>
              </Frame>
            </Reveal>
          ))}
        </dl>
      </Section>

      <Section tone="dark" divide>
        <SectionHeader
          tone="dark"
          eyebrow="04 / 04"
          title={copy.financeTitle}
          intro={copy.financeIntro}
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {copy.finance.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 90}>
              <Frame tone="dark" className="h-full">
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <Rule tone="dark" className="mt-4" />
                <p className="mt-4 leading-relaxed text-ink-400">{item.body}</p>
              </Frame>
            </Reveal>
          ))}
        </ul>

        <div className="mt-14">
          <VoiceGrid voices={partnerVoices} locale={locale} tone="dark" />
        </div>
      </Section>

      <Section divide>
        <Frame className="p-8 text-center sm:p-12">
          <h2 className="text-[length:var(--text-display-sm)] leading-tight font-bold text-balance text-ink-900">
            {copy.ctaTitle}
          </h2>
          <Rule className="mx-auto mt-6 max-w-24" />
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-pretty text-ink-500">
            {copy.ctaBody}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={`mailto:${site.email}`} external>
              {common.writeUs}
            </ButtonLink>
            <ButtonLink href={routes.projects(locale)} variant="ghost" arrow>
              {common.seeAllProjects}
            </ButtonLink>
          </div>
        </Frame>
      </Section>
    </>
  );
}
