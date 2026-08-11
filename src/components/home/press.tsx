import Image from "next/image";
import { Container, Eyebrow, Rule } from "@/components/ui/section";
import { Frame } from "@/components/ui/frame";
import { Reveal } from "@/components/ui/reveal";
import { VideoThumb } from "@/components/ui/video";
import { CitationList } from "@/components/citation-list";
import { pressCitations } from "@/content/media";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";

export function Press({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const { press, a11y } = dictionary;

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <Eyebrow>{press.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-[length:var(--text-display-sm)] leading-[1.05] font-bold text-ink-900">
              {press.title}
            </h2>
            <Rule className="mt-7" />
            <p className="mt-7 text-lg leading-relaxed text-ink-600">
              {press.body}
            </p>
            <Image
              src="/images/partner-mdr.png"
              alt="MDR"
              width={400}
              height={129}
              className="mt-8 h-8 w-auto opacity-70"
            />

            <h3 className="mt-10 text-xs font-semibold tracking-[0.2em] text-ink-500 uppercase">
              {press.citations}
            </h3>
            <CitationList
              citations={pressCitations}
              locale={locale}
              className="mt-4"
            />
          </Reveal>

          <Reveal delay={120}>
            <VideoThumb
              playLabel={a11y.playVideo}
              video={{
                id: "press",
                youtube: site.video.press,
                poster: "/images/prototype-stairs.jpg",
                title: press.videoTitle,
                meta: "MDR — 2023",
              }}
            />
            <Frame className="mt-4 border-dashed" padded={false}>
              <p className="px-5 py-4 text-xs leading-relaxed text-ink-500">
                {press.privacyNote}
              </p>
            </Frame>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
