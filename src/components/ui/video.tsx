"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "@/components/icons";
import { cn } from "@/lib/cn";

export type VideoItem = {
  id: string;
  /** YouTube id, or a path to a self-hosted file. */
  youtube?: string;
  file?: string;
  poster: string;
  title: string;
  meta?: string;
};

/**
 * Click-to-load video. Nothing is requested from YouTube until the visitor
 * asks for it, which keeps the pages free of third-party cookies on load.
 */
export function VideoThumb({
  video,
  playLabel,
  className,
  ratio = "16/9",
}: {
  video: VideoItem;
  playLabel: string;
  className?: string;
  ratio?: "16/9" | "4/3";
}) {
  const [active, setActive] = useState(false);

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border border-ink-200 bg-ink-950",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full",
          ratio === "16/9" ? "aspect-video" : "aspect-[4/3]",
        )}
      >
        {active ? (
          video.youtube ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtube}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <video
              src={video.file}
              controls
              autoPlay
              playsInline
              poster={video.poster}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            <Image
              src={video.poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-0.5 h-6 w-6" />
              </span>
            </span>
            <span className="sr-only">
              {playLabel}: {video.title}
            </span>
          </button>
        )}
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

export function VideoGallery({
  videos,
  playLabel,
  columns = 3,
}: {
  videos: readonly VideoItem[];
  playLabel: string;
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
          <VideoThumb video={video} playLabel={playLabel} />
        </li>
      ))}
    </ul>
  );
}
