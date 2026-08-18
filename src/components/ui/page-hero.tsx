import Image from "next/image";
import Link from "next/link";
import { Container, Rule } from "@/components/ui/section";
import { cn } from "@/lib/cn";

/** The current page is the one crumb without a link. */
export type Crumb = { label: string; href?: string };

/**
 * Shared masthead for every page below the homepage: one photograph, one
 * headline, one intro. Keeping the shape identical everywhere is what makes
 * the site feel like a single product.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  breadcrumbs,
  breadcrumbLabel = "Breadcrumb",
  actions,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
  breadcrumbs?: readonly Crumb[];
  breadcrumbLabel?: string;
  actions?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-55"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/35"
      />

      <Container
        className={cn(
          "relative pb-10 sm:pb-14 lg:pb-20",
          compact ? "pt-28 sm:pt-32 lg:pt-36" : "pt-28 sm:pt-36 lg:pt-44",
        )}
      >
        {breadcrumbs?.length ? (
          <nav aria-label={breadcrumbLabel} className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/60">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-white/30">
                      /
                    </span>
                  ) : null}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-white"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.12em] text-brand-300 uppercase sm:tracking-[0.2em]">
              <span aria-hidden="true" className="h-px w-8 bg-brand-400" />
              {eyebrow}
            </p>
          ) : null}

          <h1
            className={cn(
              "text-[length:var(--text-display)] leading-[1] font-bold text-white",
              eyebrow && "mt-5",
            )}
          >
            {title}
          </h1>

          <Rule tone="dark" className="mt-8" />

          {intro ? (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:mt-8 sm:text-lg">
              {intro}
            </p>
          ) : null}

          {actions ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
