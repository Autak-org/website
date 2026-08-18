import { Container, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, Heart, Users, Video } from "@/components/icons";
import { site } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries/de";

const meta = {
  member: { href: site.joinForm, Icon: Users },
  meeting: { href: site.meeting, Icon: Video },
  donate: { href: site.paypal, Icon: Heart },
} as const;

type CardId = keyof typeof meta;

export function Involve({ dictionary }: { dictionary: Dictionary }) {
  const { involve } = dictionary;
  const ids = Object.keys(meta) as CardId[];

  return (
    <section
      id="involve"
      className="scroll-mt-header bg-brand-500 py-14 text-white sm:py-20 lg:py-28"
    >
      <Container>
        <Reveal className="max-w-2xl">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-white/60" />
            {involve.eyebrow}
          </p>
          <SectionHeading className="mt-5 text-white">
            {involve.title}
          </SectionHeading>
          <hr className="mt-7 border-0 border-t border-white/30" />
          <p className="mt-7 text-lg leading-relaxed text-white/85">
            {involve.subtitle}
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {ids.map((id, index) => {
            const card = involve.cards[id];
            const { href, Icon } = meta[id];

            return (
              <Reveal
                as="li"
                key={id}
                delay={index * 100}
                className="group flex flex-col rounded-2xl border border-white/20 bg-white p-6 text-ink-800 sm:p-8"
              >
                <span className="inline-flex h-13 w-13 items-center justify-center rounded-xl bg-brand-50 p-3 text-brand-600">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-2xl font-bold text-ink-900">
                  {card.title}
                </h3>
                <hr className="mt-4 border-0 border-t border-ink-200" />
                <p className="mt-4 grow leading-relaxed text-ink-600">
                  {card.body}
                </p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                >
                  {card.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={120}>
          <div className="mt-10 rounded-2xl border border-white/25 bg-white/10 p-5 backdrop-blur-sm sm:p-8">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-white uppercase">
              {involve.bankLabel}
            </h3>
            <hr className="mt-5 border-0 border-t border-white/25" />
            <dl className="mt-5 grid gap-x-10 gap-y-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-white/70">{involve.bankHolder}</dt>
                <dd className="mt-1 font-semibold text-white">
                  {site.bank.holder}
                </dd>
              </div>
              <div>
                <dt className="text-white/70">{involve.bankName}</dt>
                <dd className="mt-1 font-semibold text-white">{site.bank.name}</dd>
              </div>
              <div>
                <dt className="text-white/70">IBAN</dt>
                <dd className="mt-1 font-semibold break-all text-white tabular-nums">
                  {site.bank.iban}
                </dd>
              </div>
              <div>
                <dt className="text-white/70">BIC</dt>
                <dd className="mt-1 font-semibold text-white">{site.bank.bic}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
