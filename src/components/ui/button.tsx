import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "md" | "lg";

const base =
  "inline-flex max-sm:w-full items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-out active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30",
  secondary:
    "bg-ink-900 text-white hover:bg-ink-950 shadow-lg shadow-ink-900/15",
  ghost:
    "border-2 border-ink-200 text-ink-900 hover:border-brand-500 hover:text-brand-600 bg-white/80",
  onDark:
    "border-2 border-white/40 text-white hover:bg-white hover:text-ink-900 backdrop-blur-sm",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  /** Trailing arrow for links that continue a journey rather than commit. */
  arrow?: boolean;
  className?: string;
  "aria-label"?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  arrow = false,
  className,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], "group", className);
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
