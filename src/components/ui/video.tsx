"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Play, Volume, VolumeOff } from "@/components/icons";
import { cn } from "@/lib/cn";
import type { VideoItem, VideoLabels } from "@/lib/videos";

export type { VideoItem, VideoLabels };

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

function useInView(threshold = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/**
 * Self-hosted clips play when scrolled into view (muted, looping).
 * YouTube stays click-to-play so embeds do not auto-start on scroll.
 */
export function VideoThumb({
  video,
  labels,
  className,
  ratio = "16/9",
}: {
  video: VideoItem;
  labels: VideoLabels;
  className?: string;
  ratio?: "16/9" | "4/3";
}) {
  const reduceMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fileActive, setFileActive] = useState(false);
  const [youtubeActive, setYoutubeActive] = useState(false);
  const [muted, setMuted] = useState(true);

  const isFile = Boolean(video.file);
  const isYoutube = Boolean(video.youtube);

  useEffect(() => {
    if (!isFile || reduceMotion) return;
    if (inView) setFileActive(true);
  }, [inView, isFile, reduceMotion]);

  const shouldPlayFile =
    isFile && fileActive && (reduceMotion || inView);

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !isFile) return;

    if (shouldPlayFile) {
      void element.play().catch(() => {});
      return;
    }

    element.pause();
  }, [shouldPlayFile, isFile]);

  const showYoutube = isYoutube && youtubeActive;
  const showFile = isFile && fileActive;
  const showPoster = !showYoutube && !showFile;
  const needsPlayButton = isYoutube || (isFile && reduceMotion);

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-ink-200 bg-ink-950",
        className,
      )}
    >
      <div
        ref={ref}
        className={cn(
          "relative w-full",
          ratio === "16/9" ? "aspect-video" : "aspect-[4/3]",
        )}
      >
        {showYoutube ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtube}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : null}

        {showFile ? (
          <>
            <video
              ref={videoRef}
              src={video.file}
              muted={reduceMotion ? false : muted}
              loop={!reduceMotion}
              controls={reduceMotion}
              playsInline
              preload="metadata"
              poster={video.poster}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {!reduceMotion ? (
              <button
                type="button"
                onClick={() => setMuted((current) => !current)}
                aria-label={muted ? labels.unmute : labels.mute}
                className="absolute right-3 bottom-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-ink-950/55 text-white backdrop-blur-sm transition-colors hover:bg-ink-950/75"
              >
                {muted ? (
                  <VolumeOff className="h-4 w-4" />
                ) : (
                  <Volume className="h-4 w-4" />
                )}
              </button>
            ) : null}
          </>
        ) : null}

        {showPoster ? (
          needsPlayButton ? (
            <button
              type="button"
              onClick={() =>
                isYoutube ? setYoutubeActive(true) : setFileActive(true)
              }
              className="group absolute inset-0 h-full w-full cursor-pointer"
            >
              <PosterImage video={video} />
              <PlayOverlay />
              <span className="sr-only">
                {labels.play}: {video.title}
              </span>
            </button>
          ) : (
            <PosterImage video={video} />
          )
        ) : null}
      </div>

      <figcaption className="border-t border-ink-200 bg-white px-5 py-4">
        <p className="font-semibold text-ink-900">{video.title}</p>
        {video.meta ? (
          <p className="mt-1 text-sm text-ink-500">{video.meta}</p>
        ) : null}
      </figcaption>
    </figure>
  );
}

function PosterImage({ video }: { video: VideoItem }) {
  return (
    <>
      <Image
        src={video.poster}
        alt=""
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent"
      />
    </>
  );
}

function PlayOverlay() {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-0.5 h-6 w-6" />
        </span>
      </span>
    </>
  );
}

export function VideoGallery({
  videos,
  labels,
  columns = 3,
}: {
  videos: readonly VideoItem[];
  labels: VideoLabels;
  columns?: 2 | 3;
}) {
  return (
    <ul
      className={cn(
        "grid gap-6",
        columns === 3
          ? "sm:grid-cols-2 lg:grid-cols-3"
          : "sm:grid-cols-2",
      )}
    >
      {videos.map((video) => (
        <li key={video.id}>
          <VideoThumb video={video} labels={labels} />
        </li>
      ))}
    </ul>
  );
}
