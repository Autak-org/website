"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/icons";
import { cn } from "@/lib/cn";

export type Slide = {
  src: string;
  alt: string;
  caption?: string;
};

/**
 * Scroll-snap carousel. The track is a real scroll container, so it works with
 * a trackpad, a touch swipe and the keyboard before any JavaScript runs.
 */
export function Carousel({
  slides,
  labels,
}: {
  slides: readonly Slide[];
  labels: { region: string; previous: string; next: string; slide: string };
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback((target: number) => {
    const track = trackRef.current;
    if (!track) return;

    const clamped = Math.max(0, Math.min(target, track.children.length - 1));
    const slide = track.children[clamped] as HTMLElement | undefined;
    if (slide) {
      track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
  }, []);

  // Keep the indicator in step with wherever the visitor scrolled to.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const width = track.clientWidth || 1;
        setIndex(Math.round(track.scrollLeft / width));
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={labels.region}
      className="relative"
    >
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, position) => (
          <li
            key={slide.src}
            aria-label={`${labels.slide} ${position + 1} / ${slides.length}`}
            className="w-full shrink-0 snap-start sm:w-[calc(50%-0.625rem)] lg:w-[calc(40%-0.75rem)]"
          >
            <figure className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              {slide.caption ? (
                <figcaption className="border-t border-ink-200 px-5 py-4 text-sm text-ink-600">
                  {slide.caption}
                </figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-6">
        <ol className="flex flex-wrap items-center gap-2">
          {slides.map((slide, position) => (
            <li key={slide.src}>
              <button
                type="button"
                onClick={() => scrollTo(position)}
                aria-current={position === index}
                aria-label={`${labels.slide} ${position + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  position === index
                    ? "w-10 bg-brand-500"
                    : "w-4 bg-ink-300 hover:bg-ink-400",
                )}
              />
            </li>
          ))}
        </ol>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollTo(index - 1)}
            aria-label={labels.previous}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-colors hover:border-brand-500 hover:text-brand-600"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => scrollTo(index + 1)}
            aria-label={labels.next}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-colors hover:border-brand-500 hover:text-brand-600"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
