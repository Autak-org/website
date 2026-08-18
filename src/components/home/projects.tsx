import { Container, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { ArrowRight } from "@/components/icons";
import { projects } from "@/content/projects";
import { routes } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";

export function Projects({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const copy = dictionary.projects;

  return (
    <section
      id="projects"
      className="scroll-mt-header border-y border-ink-200 bg-ink-50 py-14 sm:py-20 lg:py-28"
    >
      <Container>
        <SectionHeader
          eyebrow={copy.eyebrow}
          title={copy.title}
          intro={copy.subtitle}
          actions={
            <ButtonLink href={routes.projects(locale)} variant="ghost">
              {dictionary.common.seeAllProjects}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          }
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal as="li" key={project.slug} delay={(index % 3) * 90}>
              <ProjectCard project={project} locale={locale} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
