import { Container, Eyebrow, Rule, SectionHeading } from "@/components/ui/section";
import { Frame, FrameImage } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
import type { Dictionary } from "@/i18n/dictionaries/de";

export function Mission({ dictionary }: { dictionary: Dictionary }) {
  const { mission } = dictionary;

  return (
    <section id="mission" className="scroll-mt-header bg-white py-14 sm:py-20 lg:py-28">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Frame className="h-full">
              <Eyebrow>{mission.eyebrow}</Eyebrow>
              <SectionHeading className="mt-5 text-ink-900">
                {mission.title}
              </SectionHeading>
              <Rule className="mt-7" />
              <p className="mt-7 text-lg leading-relaxed font-medium text-ink-800">
                {mission.lead}
              </p>
              {mission.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="mt-5 leading-relaxed text-ink-600"
                >
                  {paragraph}
                </p>
              ))}
            </Frame>
          </Reveal>

          <Reveal delay={120}>
            <FrameImage
              src="/images/pillars-banner.jpg"
              alt={mission.imageAlt}
              ratio="4/3"
              caption={mission.imageAlt}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
