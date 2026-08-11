import type { VideoItem } from "@/components/ui/video";
import { t, type Localized } from "@/i18n/localized";
import type { Locale } from "@/i18n/config";

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
