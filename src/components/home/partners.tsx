import Image from "next/image";
import { Container, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { partners } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries/de";

export function Partners({ dictionary }: { dictionary: Dictionary }) {
  const copy = dictionary.partners;

  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow={copy.eyebrow}
          title={copy.title}
          intro={copy.subtitle}
        />

        {/* One grid, one border: the logos share a single ruled sheet rather
            than floating in separate boxes. */}
        <Reveal className="mt-14 overflow-hidden rounded-2xl border border-ink-200">
          <ul className="grid grid-cols-2 divide-x divide-y divide-ink-200 sm:grid-cols-4">
            {partners.map((partner) => (
              <li
                key={partner.name}
                className="flex h-32 items-center justify-center bg-white p-6"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={200}
                  height={80}
                  className="max-h-12 w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
