import type { Metadata } from "next";
import { Rule, Section, SectionHeader } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { VideoGallery } from "@/components/ui/video";
import { VoiceGrid } from "@/components/voice-grid";
import { ProjectCard } from "@/components/project-card";
import { PositionCard } from "@/components/position-card";
import { Calendar } from "@/components/icons";
import { eventVideos, memberVoices } from "@/content/media";
import { featuredProjects } from "@/content/projects";
import { positions } from "@/content/positions";
import { localizeVideos } from "@/lib/videos";
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
              <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase">
                <Calendar className="h-4 w-4" />
                {dictionary.contact.hours}
              </p>
              <h2 className="mt-6 text-[length:var(--text-display-sm)] leading-tight font-bold text-ink-900">
                {copy.meetingTitle}
              </h2>
              <Rule className="mt-6" />
              <p className="mt-6 leading-relaxed text-ink-600">
                {copy.meetingBody}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href={site.meeting} external size="lg">
                {copy.meetingCta}
              </ButtonLink>
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
            playLabel={a11y.playVideo}
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
          {featuredProjects.map((project, index) => (
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

      <Section divide>
        <SectionHeader
          eyebrow="04 / 04"
          title={copy.positionsTitle}
          intro={copy.positionsIntro}
          actions={
            <ButtonLink href={routes.positions(locale)} variant="ghost" arrow>
              {nav.positions}
            </ButtonLink>
          }
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {positions.map((position, index) => (
            <Reveal as="li" key={position.id} delay={(index % 2) * 90}>
              <PositionCard
                position={position}
                locale={locale}
                dictionary={dictionary}
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
