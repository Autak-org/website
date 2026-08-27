"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { Carousel, type Slide } from "@/components/ui/carousel";
import { cn } from "@/lib/cn";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/**
 * Horizontally queued photos that scroll in an endless loop. Pauses on hover.
 * Falls back to the manual carousel when the visitor prefers reduced motion.
 */
export function ContinuousCarousel({
  slides,
  labels,
  durationSec = 55,
  className,
}: {
  slides: readonly Slide[];
  labels: { region: string; previous: string; next: string; slide: string };
  durationSec?: number;
  className?: string;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const loop = [...slides, ...slides];

  if (reduceMotion) {
    return (
      <div className={cn("min-w-0 px-4 sm:px-6 lg:px-10", className)}>
        <Carousel slides={slides} labels={labels} />
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label={labels.region}
      className={cn("relative min-w-0 overflow-hidden", className)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-ink-50 to-transparent sm:w-12" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-ink-50 to-transparent sm:w-12" />

      <div
        className="gallery-marquee flex w-max gap-5 hover:[animation-play-state:paused]"
        style={{ animationDuration: `${durationSec}s` }}
      >
        {loop.map((slide, position) => {
          const original = position < slides.length;
          return (
            <figure
              key={`${slide.src}-${position}`}
              aria-hidden={!original}
              className="w-64 shrink-0 overflow-hidden rounded-2xl border border-ink-200 bg-white sm:w-72 lg:w-80"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={slide.src}
                  alt={original ? slide.alt : ""}
                  fill
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) 18rem, 16rem"
                  priority={position === 0}
                  className="object-cover"
                />
              </div>
              {slide.caption ? (
                <figcaption className="border-t border-ink-200 px-4 py-3 text-xs leading-snug text-ink-600 sm:text-sm">
                  {slide.caption}
                </figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>
    </div>
  );
}
