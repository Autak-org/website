import type { Metadata } from "next";
import { Rule, Section, SectionHeader } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { VideoGallery } from "@/components/ui/video";
import { VoiceGrid } from "@/components/voice-grid";
import { ProjectCard } from "@/components/project-card";
import { Calendar } from "@/components/icons";
import { eventVideos, memberVoices } from "@/content/media";
import { featuredProjects } from "@/content/projects";
import { localizeVideos, videoLabels } from "@/lib/videos";
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
  return { title: pages.members.title, description: pages.members.intro };
}

export default async function MembersPage({ params }: LocaleParams) {
  const { locale, dictionary } = await resolvePage(params);
  const { pages, nav, common, a11y } = dictionary;
  const copy = pages.members;

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
        image="/images/media/event-lasertag.jpg"
        imageAlt={copy.title}
        breadcrumbs={[
          { label: nav.home, href: routes.home(locale) },
          { label: dictionary.audiences.members.name },
        ]}
        breadcrumbLabel={a11y.breadcrumb}
        actions={
          <>
            <ButtonLink href={site.meeting} external>
              {dictionary.join.meeting}
            </ButtonLink>
            <ButtonLink href={site.joinForm} external variant="onDark">
              {dictionary.join.member}
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Frame className="p-5 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-12">
            <div>
              <h2 className="mt-6 text-[length:var(--text-display-sm)] leading-tight font-bold text-ink-900">
                {copy.meetingTitle}
              </h2>
              <Rule className="mt-6" />
              <p className="mt-6 leading-relaxed whitespace-pre-line text-ink-600">
                {copy.meetingBody}
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 lg:justify-self-end">
              <ButtonLink href={site.meeting} external size="lg">
                {copy.meetingCta}
              </ButtonLink>

              <div>
                <p className="text-base font-semibold text-ink-900">
                  {copy.meetingWhere}
                </p>
                <address className="mt-2 text-sm leading-relaxed text-ink-600 not-italic">
                  Ottostraße 51A
                  <br />
                  52070 Aachen
                </address>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Autak%20e.V.%2C%20Ottostra%C3%9Fe%2051A%2C%2052070%20Aachen%2C%20Germany"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                >
                  {dictionary.contact.directions}
                </a>
              </div>
            </div>
          </div>
        </Frame>
      </Section>

      <Section tone="muted" divide>
        <SectionHeader
          eyebrow="01 / 04"
          title={copy.videoTitle}
          intro={copy.videoIntro}
        />
        <div className="mt-12">
          <VideoGallery
            videos={localizeVideos(eventVideos, locale)}
            labels={videoLabels(a11y)}
          />
        </div>
      </Section>

      <Section divide>
        <SectionHeader
          eyebrow="02 / 04"
          title={copy.voicesTitle}
          intro={copy.voicesIntro}
        />
        <div className="mt-12">
          <VoiceGrid voices={memberVoices} locale={locale} />
        </div>
      </Section>

      <Section tone="muted" divide>
        <SectionHeader
          eyebrow="03 / 04"
          title={copy.projectsTitle}
          intro={copy.projectsIntro}
          actions={
            <ButtonLink href={routes.projects(locale)} variant="ghost" arrow>
              {common.seeAllProjects}
            </ButtonLink>
          }
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects
            .filter((project) => project.slug !== "connie")
            .map((project, index) => (
              <Reveal as="li" key={project.slug} delay={(index % 3) * 90}>
                <ProjectCard
                  project={project}
                  locale={locale}
                  contribution={pages.projects.contribution}
                />
              </Reveal>
            ))}
        </ul>
      </Section>

      <Section tone="dark" divide>
        <Frame tone="dark" className="p-5 text-center sm:p-12">
          <h2 className="text-[length:var(--text-display-sm)] leading-tight font-bold text-balance text-white">
            {copy.ctaTitle}
          </h2>
          <Rule tone="dark" className="mx-auto mt-6 max-w-24" />
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-pretty text-ink-400">
            {copy.ctaBody}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={site.joinForm} external>
              {dictionary.join.member}
            </ButtonLink>
            <ButtonLink href={site.meeting} external variant="onDark">
              {dictionary.join.meeting}
            </ButtonLink>
          </div>
        </Frame>
      </Section>
    </>
  );
}
