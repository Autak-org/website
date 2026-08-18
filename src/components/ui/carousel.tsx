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

function nearestIndex(track: HTMLElement) {
  const origin = track.getBoundingClientRect().left;
  let best = 0;
  let bestDist = Infinity;

  for (let i = 0; i < track.children.length; i++) {
    const dist = Math.abs(
      (track.children[i] as HTMLElement).getBoundingClientRect().left - origin,
    );
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  }

  return best;
}

function scrollLeftFor(track: HTMLElement, index: number) {
  const first = track.children[0] as HTMLElement | undefined;
  const slide = track.children[index] as HTMLElement | undefined;
  if (!first || !slide) return 0;
  return slide.offsetLeft - first.offsetLeft;
}

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
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback((target: number) => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return;

    const n = track.children.length;
    const wrapped = ((target % n) + n) % n;
    const max = Math.max(0, track.scrollWidth - track.clientWidth);

    indexRef.current = wrapped;
    setIndex(wrapped);
    track.scrollTo({
      left: Math.min(max, scrollLeftFor(track, wrapped)),
      behavior: "smooth",
    });
  }, []);

  const step = useCallback(
    (delta: number) => {
      const track = trackRef.current;
      if (!track) return;

      const max = Math.max(0, track.scrollWidth - track.clientWidth);
      if (delta < 0 && track.scrollLeft <= 1) {
        track.scrollTo({ left: max, behavior: "smooth" });
        return;
      }
      if (delta > 0 && track.scrollLeft >= max - 1) {
        scrollTo(0);
        return;
      }
      scrollTo(indexRef.current + delta);
    },
    [scrollTo],
  );

  // Keep the indicator in step with wherever the visitor scrolled to.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = nearestIndex(track);
        indexRef.current = next;
        setIndex(next);
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
      className="relative min-w-0 max-w-full"
    >
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
        <ol className="flex min-w-0 flex-wrap items-center gap-2">
          {slides.map((slide, position) => (
            <li key={slide.src}>
              <button
                type="button"
                onClick={() => scrollTo(position)}
                aria-current={position === index}
                aria-label={`${labels.slide} ${position + 1}`}
                className="flex h-11 items-center"
              >
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    position === index
                      ? "w-10 bg-brand-500"
                      : "w-4 bg-ink-300",
                  )}
                />
              </button>
            </li>
          ))}
        </ol>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label={labels.previous}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-colors hover:border-brand-500 hover:text-brand-600"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
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
