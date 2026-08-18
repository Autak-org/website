import Image from "next/image";
import { cn } from "@/lib/cn";

type Tone = "light" | "dark";

/**
 * The bordered panel that every block of text and every image sits inside.
 * One border width, one radius, one padding scale — that consistency is what
 * makes the pages read as a single design rather than a stack of sections.
 */
export function Frame({
  children,
  tone = "light",
  padded = true,
  interactive = false,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  tone?: Tone;
  /** Turn off for media that should bleed to the border. */
  padded?: boolean;
  interactive?: boolean;
  className?: string;
  as?: "div" | "li" | "article" | "figure" | "section";
}) {
  return (
    <Tag
      className={cn(
        "overflow-hidden rounded-2xl border",
        tone === "dark"
          ? "border-white/15 bg-white/[0.04]"
          : "border-ink-200 bg-white",
        padded && "p-5 sm:p-8",
        interactive &&
          "transition-colors duration-300 hover:border-brand-500/70",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Framed image with an optional caption, matching `Frame`'s border. */
export function FrameImage({
  src,
  alt,
  caption,
  ratio = "4/3",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  tone = "light",
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio?: "4/3" | "3/2" | "16/9" | "1/1" | "3/4";
  priority?: boolean;
  sizes?: string;
  tone?: Tone;
  className?: string;
  imageClassName?: string;
}) {
  const ratios: Record<string, string> = {
    "4/3": "aspect-[4/3]",
    "3/2": "aspect-[3/2]",
    "16/9": "aspect-video",
    "1/1": "aspect-square",
    "3/4": "aspect-[3/4]",
  };

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border",
        tone === "dark" ? "border-white/15 bg-ink-900" : "border-ink-200 bg-ink-50",
        className,
      )}
    >
      <div className={cn("relative w-full", ratios[ratio])}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
        />
      </div>

      {caption ? (
        <figcaption
          className={cn(
            "border-t px-5 py-4 text-sm leading-relaxed",
            tone === "dark"
              ? "border-white/15 text-ink-400"
              : "border-ink-200 text-ink-600",
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
