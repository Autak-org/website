import { QuoteCard } from "@/components/ui/quote";
import { Reveal } from "@/components/ui/reveal";
import { t, type Locale } from "@/i18n";
import type { Voice } from "@/content/media";

export function VoiceGrid({
  voices,
  locale,
  tone = "light",
}: {
  voices: readonly Voice[];
  locale: Locale;
  tone?: "light" | "dark";
}) {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {voices.map((voice, index) => (
        <Reveal as="li" key={voice.id} delay={(index % 3) * 90}>
          <QuoteCard
            tone={tone}
            testimonial={{
              id: voice.id,
              quote: t(voice.quote, locale),
              name: voice.name,
              role: t(voice.role, locale),
              avatar: voice.avatar,
            }}
          />
        </Reveal>
      ))}
    </ul>
  );
}
