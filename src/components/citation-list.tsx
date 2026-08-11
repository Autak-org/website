import { ArrowRight } from "@/components/icons";
import { t, type Locale } from "@/i18n";
import type { Citation } from "@/content/media";
import { cn } from "@/lib/cn";

/** Press and cooperation mentions as a ruled list, dark or light. */
export function CitationList({
  citations,
  locale,
  tone = "light",
  className,
}: {
  citations: readonly Citation[];
  locale: Locale;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <ul
      className={cn(
        "divide-y border-y",
        dark ? "divide-white/15 border-white/15" : "divide-ink-200 border-ink-200",
        className,
      )}
    >
      {citations.map((citation) => (
        <li key={citation.id}>
          <Row
            outlet={citation.outlet}
            title={t(citation.title, locale)}
            year={citation.year}
            href={citation.href}
            dark={dark}
          />
        </li>
      ))}
    </ul>
  );
}

function Row({
  outlet,
  title,
  year,
  href,
  dark,
}: {
  outlet: string;
  title: string;
  year: string;
  href?: string;
  dark: boolean;
}) {
  const inner = (
    <>
      <span className="min-w-0">
        <span
          className={cn(
            "block font-semibold",
            dark ? "text-white" : "text-ink-900",
          )}
        >
          {outlet}
        </span>
        <span
          className={cn(
            "mt-0.5 block text-sm",
            dark ? "text-ink-400" : "text-ink-500",
          )}
        >
          {title}
        </span>
      </span>
      <span
        className={cn(
          "flex shrink-0 items-center gap-2 text-sm",
          dark ? "text-ink-400" : "text-ink-500",
        )}
      >
        {year}
        {href ? (
          <ArrowRight className="h-3.5 w-3.5 -rotate-45 text-brand-500" />
        ) : null}
      </span>
    </>
  );

  const layout = "flex items-start justify-between gap-4 py-4";

  if (!href) return <div className={layout}>{inner}</div>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        layout,
        "transition-colors",
        dark ? "hover:text-brand-300" : "hover:text-brand-600",
      )}
    >
      {inner}
    </a>
  );
}
