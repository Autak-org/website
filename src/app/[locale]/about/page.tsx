import type { Metadata } from "next";
import { Rule, Section, SectionHeader } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { MemberCard } from "@/components/member-card";
import { memberGroups } from "@/content/members";
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
  return { title: pages.about.title, description: pages.about.intro };
}

export default async function AboutPage({ params }: LocaleParams) {
  const { locale, dictionary } = await resolvePage(params);
  const { pages, nav, common } = dictionary;

  return (
    <>
      <PageHero
        eyebrow={pages.about.eyebrow}
        title={pages.about.title}
        intro={pages.about.intro}
        image="/images/media/group-outdoor.jpg"
        imageAlt={dictionary.mission.imageAlt}
        breadcrumbs={[
          { label: nav.home, href: routes.home(locale) },
          { label: nav.about },
        ]}
        breadcrumbLabel={dictionary.a11y.breadcrumb}
      />

      {memberGroups.map((group, index) => {
        const copy = pages.about.groups[group.id];

        return (
          <Section
            key={group.id}
            id={group.id}
            tone={index % 2 === 1 ? "muted" : "light"}
            divide={index > 0}
          >
            <SectionHeader
              eyebrow={`0${index + 1} / 0${memberGroups.length}`}
              title={copy.title}
              intro={copy.body}
            />

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {group.members.map((member, position) => (
                <Reveal key={member.slug} delay={(position % 4) * 80}>
                  <MemberCard member={member} locale={locale} />
                </Reveal>
              ))}
            </div>
          </Section>
        );
      })}

      <Section divide>
        <Frame className="p-8 text-center sm:p-12">
          <h2 className="text-[length:var(--text-display-sm)] leading-tight font-bold text-balance text-ink-900">
            {pages.about.ctaTitle}
          </h2>
          <Rule className="mx-auto mt-6 max-w-24" />
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-pretty text-ink-500">
            {pages.about.ctaBody}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={site.joinForm} external>
              {dictionary.join.member}
            </ButtonLink>
            <ButtonLink href={routes.members(locale)} variant="secondary" arrow>
              {dictionary.audiences.members.name}
            </ButtonLink>
            <ButtonLink href={routes.contact(locale)} variant="ghost" arrow>
              {common.writeUs}
            </ButtonLink>
          </div>
        </Frame>
      </Section>
    </>
  );
}
