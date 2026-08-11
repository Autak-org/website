import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { StarWheel } from "@/components/ui/star-wheel";
import { ArrowRight } from "@/components/icons";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/de";

export function Hero({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const { hero, audiences } = dictionary;

  const entries = [
    { href: routes.partners(locale), ...audiences.partners },
    { href: routes.users(locale), ...audiences.users },
    { href: routes.members(locale), ...audiences.members },
  ];

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink-950">
      <Image
        src="/images/hero-aachen.jpg"
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Layered scrims keep the headline above 7:1 contrast regardless of
          what sits behind it in the photograph. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/35 to-transparent"
      />

      {/* The star wheel from the prototype, used as the page's signature mark. */}
      <StarWheel className="absolute -top-24 -right-32 hidden h-[34rem] w-[34rem] animate-[spin_60s_linear_infinite] text-white/10 lg:block" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-36 pb-10 lg:px-10 lg:pb-14">
        <p className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
          </span>
          {hero.eyebrow}
        </p>

        <h1 className="mt-8 max-w-4xl text-[length:var(--text-display-lg)] leading-[0.92] font-bold text-white">
          {hero.titleLead}{" "}
          <span className="text-brand-400">{hero.titleAccent}</span>
        </h1>

        <hr className="mt-9 max-w-4xl border-0 border-t border-white/20" />

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
          {hero.body}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={routes.projects(locale)} size="lg">
            {hero.primary}
            <ArrowRight className="h-5 w-5" />
          </ButtonLink>
          <ButtonLink href={site.paypal} variant="onDark" size="lg" external>
            {hero.secondary}
          </ButtonLink>
        </div>
      </div>

      {/* Three doors into the site, one per audience. */}
      <nav
        aria-label={audiences.label}
        className="relative border-t border-white/15 bg-ink-950/40 backdrop-blur-md"
      >
        <ul className="mx-auto grid w-full max-w-7xl divide-y divide-white/15 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-10">
          {entries.map((entry) => (
            <li key={entry.href} className="sm:first:-ml-6 sm:first:pl-6 lg:first:-ml-10 lg:first:pl-10">
              <Link
                href={entry.href}
                className="group flex items-center justify-between gap-4 py-5 sm:px-6 sm:first:pl-0"
              >
                <span>
                  <span className="block text-sm font-semibold text-white">
                    {entry.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-white/60">
                    {entry.blurb}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-brand-400 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
