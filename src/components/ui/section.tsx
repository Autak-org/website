import { cn } from "@/lib/cn";

type Tone = "light" | "dark";
type SectionTone = Tone | "muted";

const sectionBackground: Record<SectionTone, string> = {
  light: "bg-white text-ink-800",
  muted: "bg-ink-50 text-ink-800",
  dark: "bg-ink-950 text-ink-300",
};

/**
 * The single horizontal rhythm of the site. Every page and every section uses
 * this container so gutters line up from the header down to the footer.
 */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-6 lg:px-10", className)}>
      {children}
    </div>
  );
}

/** Vertical rhythm counterpart to `Container`. */
export function Section({
  children,
  id,
  tone = "light",
  className,
  bleed = false,
  divide = false,
}: {
  children: React.ReactNode;
  id?: string;
  tone?: SectionTone;
  className?: string;
  /** Skips the container when a section paints edge to edge. */
  bleed?: boolean;
  /** Hairline across the top, for sections that share a background colour. */
  divide?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-header py-20 lg:py-28",
        sectionBackground[tone],
        divide && (tone === "dark" ? "border-t border-white/15" : "border-t border-ink-200"),
        className,
      )}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

/** Thin divider. Used to separate titles from the copy that follows. */
export function Rule({
  tone = "light",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <hr
      className={cn(
        "border-0 border-t",
        tone === "dark" ? "border-white/15" : "border-ink-200",
        className,
      )}
    />
  );
}

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase",
        tone === "dark" ? "text-brand-300" : "text-brand-600",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-8", tone === "dark" ? "bg-brand-400" : "bg-brand-500")}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "text-[length:var(--text-display-sm)] leading-[1.05] font-bold",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Eyebrow, title, rule, intro — in that order, everywhere. The rule is what
 * keeps a heading visually separate from the paragraph underneath it.
 */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "start",
  actions,
  className,
  as,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: Tone;
  align?: "start" | "center";
  actions?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        centered ? "mx-auto max-w-3xl items-center text-center" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}

      <SectionHeading
        as={as}
        className={cn(
          eyebrow && "mt-5",
          tone === "dark" ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </SectionHeading>

      <Rule tone={tone} className={cn("mt-7 w-full", centered && "max-w-24")} />

      {intro ? (
        <p
          className={cn(
            "mt-7 text-lg leading-relaxed",
            tone === "dark" ? "text-ink-300" : "text-ink-600",
          )}
        >
          {intro}
        </p>
      ) : null}

      {actions ? (
        <div
          className={cn(
            "mt-8 flex flex-wrap gap-3",
            centered && "justify-center",
          )}
        >
          {actions}
        </div>
      ) : null}
    </div>
  );
}
