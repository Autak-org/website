import Link from "next/link";
import { Container, Rule, SectionHeader } from "@/components/ui/section";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, Code, Megaphone, Wrench } from "@/components/icons";
import { pillarOrder, projectsByPillar, type Pillar } from "@/content/projects";
import { routes } from "@/lib/routes";
import { t } from "@/i18n/localized";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";

const icons: Record<Pillar, (props: { className?: string }) => React.ReactElement> = {
  hardware: Wrench,
  software: Code,
  awareness: Megaphone,
};

export function Pillars({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const { pillars } = dictionary;

  return (
    <section className="border-y border-ink-200 bg-ink-50 py-14 sm:py-20 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow={pillars.eyebrow}
          title={pillars.title}
          intro={pillars.subtitle}
        />

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {pillarOrder.map((pillar, index) => {
            const Icon = icons[pillar];
            const copy = pillars.items[pillar];

            return (
              <Reveal as="li" key={pillar} delay={index * 90}>
                <Frame interactive className="flex h-full flex-col">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-6 w-6" />
                  </span>

                  <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-brand-600 uppercase">
                    {copy.name}
                  </p>
                  <h3 className="mt-2 text-2xl leading-tight font-bold text-ink-900">
                    {copy.headline}
                  </h3>

                  <Rule className="mt-5" />

                  <p className="mt-5 leading-relaxed text-ink-600">{copy.body}</p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {projectsByPillar(pillar).map((project) => (
                      <li key={project.slug}>
                        <Link
                          href={routes.project(locale, project.slug)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-1.5 text-sm text-ink-700 transition-colors hover:border-brand-500 hover:text-brand-600"
                        >
                          {t(project.name, locale)}
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Frame>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
