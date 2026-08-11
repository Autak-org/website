import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Rule, Section, SectionHeader } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Frame, FrameImage } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { VideoGallery } from "@/components/ui/video";
import { Carousel } from "@/components/ui/carousel";
import { ArrowRight } from "@/components/icons";
import { projectBySlug, projects } from "@/content/projects";
import { localizeVideos } from "@/lib/videos";
import { getDictionary, isLocale, locales, t } from "@/i18n";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

type ProjectParams = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: ProjectParams): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const project = projectBySlug(slug);
  if (!project) return {};

  const dictionary = getDictionary(locale);

  return {
    title: `${t(project.name, locale)} — ${dictionary.nav.projects}`,
    description: t(project.summary, locale),
    openGraph: { images: [project.cover] },
  };
}

export default async function ProjectPage({ params }: ProjectParams) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale);
  const project = projectBySlug(slug);
  if (!project) notFound();

  const { pages, nav, a11y, common } = dictionary;
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <PageHero
        eyebrow={dictionary.pillars.items[project.pillar].name}
        title={t(project.name, locale)}
        intro={t(project.summary, locale)}
        image={project.cover}
        imageAlt={t(project.coverAlt, locale)}
        breadcrumbs={[
          { label: nav.home, href: routes.home(locale) },
          { label: nav.projects, href: routes.projects(locale) },
          { label: t(project.name, locale) },
        ]}
        breadcrumbLabel={a11y.breadcrumb}
        actions={
          <>
            <ButtonLink href={site.joinForm} external>
              {dictionary.join.member}
            </ButtonLink>
            <ButtonLink href={routes.contact(locale)} variant="ghost" arrow>
              {common.writeUs}
            </ButtonLink>
          </>
        }
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow={pages.project.overview}
              title={t(project.tagline, locale)}
            />
          </div>

          <Frame className="h-fit p-6 sm:p-8">
            <dl className="space-y-6">
              <div>
                <dt className="text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase">
                  {pages.projects.status}
                </dt>
                <dd className="mt-2 font-semibold text-ink-900">
                  {t(project.status, locale)}
                </dd>
              </div>
              <Rule />
              <div>
                <dt className="text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase">
                  {pages.project.contributeTitle}
                </dt>
                <dd className="mt-2 leading-relaxed text-ink-600">
                  {t(project.contribution, locale)}
                </dd>
              </div>
            </dl>
          </Frame>
        </div>
      </Section>

      {project.sections.map((section, position) => (
        <Section
          key={section.id}
          id={section.id}
          tone={position % 2 === 0 ? "muted" : "light"}
          divide
        >
          <Reveal>
            <div
              className={
                section.image
                  ? "grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                  : "max-w-3xl"
              }
            >
              <div className={position % 2 === 1 ? "lg:order-2" : undefined}>
                <h2 className="text-[length:var(--text-display-sm)] leading-tight font-bold text-ink-900">
                  {t(section.title, locale)}
                </h2>
                <Rule className="mt-6" />
                <p className="mt-6 leading-relaxed whitespace-pre-line text-ink-600">
                  {t(section.body, locale)}
                </p>
              </div>

              {section.image ? (
                <FrameImage
                  src={section.image}
                  alt={section.imageAlt ? t(section.imageAlt, locale) : ""}
                  ratio="4/3"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className={position % 2 === 1 ? "lg:order-1" : undefined}
                />
              ) : null}
            </div>
          </Reveal>
        </Section>
      ))}

      {project.videos?.length ? (
        <Section divide>
          <SectionHeader
            eyebrow={t(project.name, locale)}
            title={pages.project.videos}
            intro={dictionary.press.privacyNote}
          />
          <div className="mt-12">
            <VideoGallery
              videos={localizeVideos(project.videos, locale)}
              playLabel={a11y.playVideo}
            />
          </div>
        </Section>
      ) : null}

      {project.gallery?.length ? (
        <Section tone="muted" divide>
          <SectionHeader
            eyebrow={t(project.name, locale)}
            title={pages.project.gallery}
          />
          <div className="mt-12">
            <Carousel
              labels={{
                region: a11y.carousel,
                previous: a11y.previousSlide,
                next: a11y.nextSlide,
                slide: a11y.slide,
              }}
              slides={project.gallery.map((item) => ({
                src: item.src,
                alt: t(item.alt, locale),
              }))}
            />
          </div>
        </Section>
      ) : null}

      <Section divide>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <ButtonLink
            href={routes.projects(locale)}
            variant="secondary"
          >
            {pages.project.backToProjects}
          </ButtonLink>

          <Link
            href={routes.project(locale, next.slug)}
            className="group text-right"
          >
            <span className="block text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase">
              {pages.project.nextProject}
            </span>
            <span className="mt-1 inline-flex items-center gap-2 text-xl font-bold text-ink-900 transition-colors group-hover:text-brand-600">
              {t(next.name, locale)}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </Section>
    </>
  );
}
