import Image from "next/image";
import { Frame } from "@/components/ui/frame";
import { cn } from "@/lib/cn";

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar?: string;
};

export function QuoteCard({
  testimonial,
  tone = "light",
  className,
}: {
  testimonial: Testimonial;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Frame
      as="figure"
      tone={tone}
      className={cn("flex h-full flex-col justify-between", className)}
    >
      <blockquote
        className={cn(
          "text-lg leading-relaxed",
          tone === "dark" ? "text-white" : "text-ink-800",
        )}
      >
        <span aria-hidden="true" className="mr-1 text-brand-500">
          &ldquo;
        </span>
        {testimonial.quote}
        <span aria-hidden="true" className="ml-0.5 text-brand-500">
          &rdquo;
        </span>
      </blockquote>

      <figcaption
        className={cn(
          "mt-7 flex items-center gap-4 border-t pt-6 text-sm",
          tone === "dark" ? "border-white/15" : "border-ink-200",
        )}
      >
        {testimonial.avatar ? (
          <Image
            src={testimonial.avatar}
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 font-display text-lg font-bold text-brand-600"
          >
            {testimonial.name.charAt(0)}
          </span>
        )}
        <span>
          <span
            className={cn(
              "block font-semibold",
              tone === "dark" ? "text-white" : "text-ink-900",
            )}
          >
            {testimonial.name}
          </span>
          <span
            className={cn(tone === "dark" ? "text-ink-400" : "text-ink-500")}
          >
            {testimonial.role}
          </span>
        </span>
      </figcaption>
    </Frame>
  );
}
