import { Container, SectionHeader } from "@/components/ui/section";
import { Carousel, type Slide } from "@/components/ui/carousel";
import { Reveal } from "@/components/ui/reveal";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";
import { t } from "@/i18n/localized";
import type { Localized } from "@/i18n/localized";

const slides: readonly { src: string; alt: Localized<string> }[] = [
  {
    src: "/images/team-group.jpg",
    alt: {
      de: "Das autak-Team versammelt sich vor dem Aachener Dom.",
      en: "The autak team gathered in front of Aachen Cathedral.",
    },
  },
  {
    src: "/images/media/wheelchair-event.jpg",
    alt: {
      de: "Rollstuhlfahrende bei einem Autak-Event im Freien.",
      en: "Wheelchair users at an outdoor Autak event.",
    },
  },
  {
    src: "/images/team-workshop.jpg",
    alt: {
      de: "Arbeit am Prototyp in der Werkstatt.",
      en: "Working on the prototype in the workshop.",
    },
  },
  {
    src: "/images/media/event-lasertag.jpg",
    alt: {
      de: "Rollstuhl-Lasertag in einer abgedunkelten Halle.",
      en: "Wheelchair laser tag in a darkened arena.",
    },
  },
  {
    src: "/images/media/booth-indoor.jpg",
    alt: {
      de: "Messestand mit dem Rollstuhl-Prototyp.",
      en: "Trade fair booth with the wheelchair prototype.",
    },
  },
  {
    src: "/images/media/demo-street.jpg",
    alt: {
      de: "Autak-Stand in der Aachener Innenstadt.",
      en: "Autak stand in Aachen city centre.",
    },
  },
  {
    src: "/images/media/group-outdoor.jpg",
    alt: {
      de: "Gruppenbild des Teams im Freien.",
      en: "Group photo of the team outdoors.",
    },
  },
];

export function Gallery({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const { gallery, a11y } = dictionary;

  const items: Slide[] = slides.map((slide) => ({
    src: slide.src,
    alt: t(slide.alt, locale),
    caption: t(slide.alt, locale),
  }));

  return (
    <section className="border-y border-ink-200 bg-ink-50 py-14 sm:py-20 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          intro={gallery.subtitle}
        />

        <Reveal className="mt-14 min-w-0">
          <Carousel
            slides={items}
            labels={{
              region: a11y.carousel,
              previous: a11y.previousSlide,
              next: a11y.nextSlide,
              slide: a11y.slide,
            }}
          />
        </Reveal>
      </Container>
    </section>
  );
}
