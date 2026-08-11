import { Container, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { NewsCard } from "@/components/news-card";
import { ArrowRight } from "@/components/icons";
import { newsByDate } from "@/content/news";
import { routes } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";

export function NewsPreview({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const copy = dictionary.pages.news;

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow={copy.eyebrow}
          title={copy.title}
          intro={copy.intro}
          actions={
            <ButtonLink href={routes.news(locale)} variant="ghost">
              {dictionary.common.seeAllNews}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          }
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsByDate.slice(0, 3).map((item, index) => (
            <Reveal as="li" key={item.slug} delay={index * 90}>
              <NewsCard item={item} locale={locale} dictionary={dictionary} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
