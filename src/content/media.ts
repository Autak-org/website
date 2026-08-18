import type { SourceVideo } from "@/lib/videos";
import type { Localized } from "@/i18n/localized";
import {
  byOrder,
  csv,
  loadMarkdownDir,
  optional,
  required,
  localized,
  type MarkdownFile,
} from "@/lib/markdown";

/**
 * Placeholder attributions.
 *
 * The quotes below are written in the association's voice for layout purposes.
 * Replace the text and the attribution with real, approved statements before
 * the site goes live — never publish an invented quote next to a real name.
 */
export type Voice = {
  id: string;
  quote: Localized<string>;
  name: string;
  role: Localized<string>;
  avatar?: string;
};

export type VoiceGroup = "users" | "members" | "partners";

const voiceGroups: readonly VoiceGroup[] = ["users", "members", "partners"];

function isVoiceGroup(value: string): value is VoiceGroup {
  return (voiceGroups as readonly string[]).includes(value);
}

function loadVoices(): Record<VoiceGroup, Voice[]> {
  const loaded: Record<VoiceGroup, Voice[]> = {
    users: [],
    members: [],
    partners: [],
  };

  for (const { slug, file, data } of byOrder(
    loadMarkdownDir("editorial/voices"),
  )) {
    const group = required(data, "group", file);
    if (!isVoiceGroup(group)) {
      throw new Error(
        `${file}: group must be one of ${voiceGroups.join(", ")}.`,
      );
    }

    loaded[group].push({
      id: slug,
      name: required(data, "name", file),
      role: localized(data, "role", file),
      quote: localized(data, "quote", file),
      avatar: optional(data, "avatar"),
    });
  }

  return loaded;
}

const voices = loadVoices();

export const userVoices: readonly Voice[] = voices.users;
export const memberVoices: readonly Voice[] = voices.members;
export const partnerVoices: readonly Voice[] = voices.partners;

/** Coverage the association has actually had. */
export type Citation = {
  id: string;
  outlet: string;
  title: Localized<string>;
  year: string;
  href?: string;
};

function loadCitations(): Citation[] {
  return byOrder(loadMarkdownDir("editorial/press")).map(
    ({ slug, file, data }) => ({
      id: slug,
      outlet: required(data, "outlet", file),
      year: required(data, "year", file),
      title: localized(data, "title", file),
      href: optional(data, "href"),
    }),
  );
}

export const pressCitations: readonly Citation[] = loadCitations();

function toVideo({ slug, file, data }: MarkdownFile): SourceVideo {
  const youtube = optional(data, "youtube");
  const videoFile = optional(data, "file");
  if (!youtube && !videoFile) {
    throw new Error(`${file}: set youtube or file (or both).`);
  }

  return {
    id: slug,
    poster: required(data, "poster", file),
    title: localized(data, "title", file),
    youtube,
    file: videoFile,
    meta: optional(data, "meta"),
  };
}

const videoFiles = loadMarkdownDir("editorial/videos");
const catalog = videoFiles.map(toVideo);

export const videoById: Readonly<Record<string, SourceVideo>> =
  Object.fromEntries(catalog.map((video) => [video.id, video]));

export function videosByIds(ids: string[], file: string): SourceVideo[] {
  return ids.map((id) => {
    const video = videoById[id];
    if (!video) {
      throw new Error(`${file}: unknown video id "${id}".`);
    }
    return video;
  });
}

function videosInList(list: string): SourceVideo[] {
  return [...videoFiles]
    .filter((item) => csv(item.data, "lists").includes(list))
    .sort((a, b) => {
      const ao = Number(
        a.data[`${list}_order`] ?? a.data.order ?? Number.MAX_SAFE_INTEGER,
      );
      const bo = Number(
        b.data[`${list}_order`] ?? b.data.order ?? Number.MAX_SAFE_INTEGER,
      );
      if (ao !== bo) return ao - bo;
      return a.slug.localeCompare(b.slug);
    })
    .map(toVideo);
}

export const showcaseVideos: readonly SourceVideo[] = videosInList("showcase");
export const usageVideos: readonly SourceVideo[] = videosInList("usage");
export const eventVideos: readonly SourceVideo[] = videosInList("events");

/** Where we work and what we can build there. */
export type Capability = {
  id: string;
  label: Localized<string>;
  value: Localized<string>;
};

function loadCapabilities(): Capability[] {
  return byOrder(loadMarkdownDir("editorial/capabilities")).map(
    ({ slug, file, data }) => ({
      id: slug,
      label: localized(data, "label", file),
      value: localized(data, "value", file),
    }),
  );
}

export const capabilities: readonly Capability[] = loadCapabilities();
