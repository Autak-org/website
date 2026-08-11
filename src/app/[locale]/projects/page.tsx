import type { Metadata } from "next";
import { Rule, Section, SectionHeader } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/project-card";
import { pillarOrder, projectsByPillar } from "@/content/projects";
import { resolvePage, type LocaleParams } from "@/lib/page";
import { getDictionary, isLocale } from "@/i18n";
import { routes } from "@/lib/routes";

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { pages } = getDictionary(locale);
  return { title: pages.projects.title, description: pages.projects.intro };
}

export default async function ProjectsPage({ params }: LocaleParams) {
  const { locale, dictionary } = await resolvePage(params);
  const { pages, nav, pillars } = dictionary;

  return (
    <>
      <PageHero
        title={pages.projects.title}
        intro={pages.projects.intro}
        image="/images/team-workshop.jpg"
        imageAlt={dictionary.gallery.subtitle}
        breadcrumbs={[
          { label: nav.home, href: routes.home(locale) },
          { label: nav.projects },
        ]}
        breadcrumbLabel={dictionary.a11y.breadcrumb}
      />

      {pillarOrder.map((pillar, index) => {
        const list = projectsByPillar(pillar);
        if (list.length === 0) return null;

        const copy = pillars.items[pillar];

        return (
          <Section
            key={pillar}
            id={pillar}
            tone={index % 2 === 1 ? "muted" : "light"}
            divide={index > 0}
          >
            <SectionHeader
              eyebrow={copy.name}
              title={copy.headline}
              intro={copy.body}
            />

            <Rule className="mt-12" />

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {list.map((project, position) => (
                <Reveal key={project.slug} delay={(position % 3) * 90}>
                  <ProjectCard project={project} locale={locale} />
                </Reveal>
              ))}
            </div>
          </Section>
        );
      })}
    </>
  );
}
