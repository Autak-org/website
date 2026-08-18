import { Container, Eyebrow, Rule } from "@/components/ui/section";
import { FrameImage } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, Check } from "@/components/icons";
import { routes } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";

export function Flagship({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const { flagship } = dictionary;

  return (
    <section className="relative overflow-hidden bg-ink-950 py-14 text-white sm:py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <FrameImage
              src="/images/wheelchair-prototype.jpg"
              alt={flagship.imageAlt}
              ratio="16/9"
              tone="dark"
              caption={flagship.imageAlt}
            />
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2">
            <Eyebrow tone="dark">{flagship.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-[length:var(--text-display-sm)] leading-[1.05] font-bold text-white">
              {flagship.title}
            </h2>

            <Rule tone="dark" className="mt-7" />

            {flagship.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mt-7 text-lg leading-relaxed text-ink-300"
              >
                {paragraph}
              </p>
            ))}

            <ul className="mt-8 space-y-3">
              {flagship.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-ink-200">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <ButtonLink href={routes.project(locale, "wheelchair")} size="lg">
                {flagship.cta}
                <ArrowRight className="h-5 w-5" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
