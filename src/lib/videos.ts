import { t, type Localized } from "@/i18n/localized";
import type { Locale } from "@/i18n/config";

export type VideoItem = {
  id: string;
  /** YouTube id, or a path to a self-hosted file. */
  youtube?: string;
  file?: string;
  poster: string;
  title: string;
  meta?: string;
};

export type VideoLabels = {
  play: string;
  mute: string;
  unmute: string;
};

export function videoLabels(a11y: {
  playVideo: string;
  muteVideo: string;
  unmuteVideo: string;
}): VideoLabels {
  return {
    play: a11y.playVideo,
    mute: a11y.muteVideo,
    unmute: a11y.unmuteVideo,
  };
}

/** How videos are stored in content: captions in both languages. */
export type SourceVideo = {
  id: string;
  youtube?: string;
  file?: string;
  poster: string;
  title: Localized<string>;
  meta?: string;
};

export function localizeVideos(
  videos: readonly SourceVideo[],
  locale: Locale,
): VideoItem[] {
  return videos.map((video) => ({ ...video, title: t(video.title, locale) }));
}
