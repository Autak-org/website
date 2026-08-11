import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import type { Dictionary } from "@/i18n/dictionaries/de";

export function Stats({ dictionary }: { dictionary: Dictionary }) {
  const { stats } = dictionary;

  return (
    <section aria-label={stats.label} className="bg-ink-950 py-14 lg:py-16">
      <Container>
        <ul className="grid divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.value}
              delay={index * 90}
              className="py-6 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0"
            >
              <p className="text-[length:var(--text-display-sm)] leading-none font-bold text-brand-400">
                {item.value}
              </p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
                {item.label}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
