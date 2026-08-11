import type { Metadata } from "next";
import { Rule, Section, SectionHeader } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { VideoGallery } from "@/components/ui/video";
import { VoiceGrid } from "@/components/voice-grid";
import { NewsCard } from "@/components/news-card";
import { ProjectCard } from "@/components/project-card";
import { usageVideos, userVoices } from "@/content/media";
import { news } from "@/content/news";
import { featuredProjects } from "@/content/projects";
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
  return { title: pages.users.title, description: pages.users.intro };
}

export default async function UsersPage({ params }: LocaleParams) {
  const { locale, dictionary } = await resolvePage(params);
  const { pages, nav, common, a11y } = dictionary;
  const copy = pages.users;
  const latest = [...news]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
        image="/images/media/user-portrait.jpg"
        imageAlt={copy.title}
        breadcrumbs={[
          { label: nav.home, href: routes.home(locale) },
          { label: dictionary.audiences.users.name },
        ]}
        breadcrumbLabel={a11y.breadcrumb}
        actions={
          <>
            <ButtonLink href={routes.shop(locale)}>{nav.shop}</ButtonLink>
            <ButtonLink href={routes.contact(locale)} variant="onDark" arrow>
              {common.writeUs}
            </ButtonLink>
          </>
        }
      />

      <Section>
        <SectionHeader
          eyebrow="01 / 04"
          title={copy.newsTitle}
          intro={copy.newsIntro}
          actions={
            <ButtonLink href={routes.news(locale)} variant="ghost" arrow>
              {common.seeAllNews}
            </ButtonLink>
          }
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((item, index) => (
            <Reveal as="li" key={item.slug} delay={(index % 3) * 90}>
              <NewsCard item={item} locale={locale} dictionary={dictionary} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="muted" divide>
        <SectionHeader
          eyebrow="02 / 04"
          title={copy.videoTitle}
          intro={copy.videoIntro}
        />
        <div className="mt-12">
          <VideoGallery
            videos={localizeVideos(usageVideos, locale)}
            playLabel={a11y.playVideo}
          />
        </div>
      </Section>

      <Section divide>
        <SectionHeader
          eyebrow="03 / 04"
          title={copy.voicesTitle}
          intro={copy.voicesIntro}
        />
        <div className="mt-12">
          <VoiceGrid voices={userVoices} locale={locale} />
        </div>
      </Section>

      <Section tone="muted" divide>
        <SectionHeader
          eyebrow="04 / 04"
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
              <ProjectCard project={project} locale={locale} />
            </Reveal>
          ))}
        </ul>
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
            <ButtonLink href={routes.contact(locale)}>
              {common.writeUs}
            </ButtonLink>
            <ButtonLink href={site.shop} external variant="ghost" arrow>
              {common.externalShop}
            </ButtonLink>
          </div>
        </Frame>
      </Section>
    </>
  );
}
