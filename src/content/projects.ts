import type { Localized } from "@/i18n/localized";
import type { SourceVideo } from "@/lib/videos";
import { videosByIds } from "@/content/media";
import {
  byOrder,
  csv,
  flag,
  listContentDirs,
  loadMarkdownDirOptional,
  loadMarkdownFile,
  localized,
  optional,
  optionalLocalized,
  required,
} from "@/lib/markdown";

export type Pillar = "hardware" | "software" | "awareness";

export type ProjectSection = {
  id: string;
  title: Localized<string>;
  body: Localized<string>;
  image?: string;
  imageAlt?: Localized<string>;
};

export type Project = {
  slug: string;
  pillar: Pillar;
  name: Localized<string>;
  tagline: Localized<string>;
  /** One sentence for cards and previews. */
  summary: Localized<string>;
  status: Localized<string>;
  cover: string;
  coverAlt: Localized<string>;
  /** What a new member can pick up on this project. */
  contribution: Localized<string>;
  sections: readonly ProjectSection[];
  gallery?: readonly { src: string; alt: Localized<string> }[];
  videos?: readonly SourceVideo[];
  /** Set for the two or three projects shown as previews on landing pages. */
  featured?: boolean;
};

const pillars: readonly Pillar[] = ["hardware", "software", "awareness"];

function isPillar(value: string): value is Pillar {
  return (pillars as readonly string[]).includes(value);
}

function loadProjects(): Project[] {
  return listContentDirs("editorial/projects")
    .map((slug) => {
      const index = `editorial/projects/${slug}/index.md`;
      const { file, data } = loadMarkdownFile(index);
      const pillar = required(data, "pillar", file);
      if (!isPillar(pillar)) {
        throw new Error(`${file}: pillar must be one of ${pillars.join(", ")}.`);
      }

      const videoIds = csv(data, "videos");
      const gallery = byOrder(
        loadMarkdownDirOptional(`editorial/projects/${slug}/gallery`),
      ).map((item) => ({
        src: required(item.data, "src", item.file),
        alt: localized(item.data, "alt", item.file),
      }));
      const sections = byOrder(
        loadMarkdownDirOptional(`editorial/projects/${slug}/sections`),
      ).map((item) => {
        const image = optional(item.data, "image");
        const imageAlt = optionalLocalized(item.data, "image_alt", item.file);
        if (image && !imageAlt) {
          throw new Error(
            `${item.file}: set image_alt_de and image_alt_en when image is set.`,
          );
        }
        return {
          id: item.slug,
          title: localized(item.data, "title", item.file),
          body: localized(item.data, "body", item.file),
          image,
          imageAlt,
        };
      });

      const project: Project = {
        slug,
        pillar,
        featured: flag(data, "featured") || undefined,
        name: localized(data, "name", file),
        tagline: localized(data, "tagline", file),
        summary: localized(data, "summary", file),
        status: localized(data, "status", file),
        cover: required(data, "cover", file),
        coverAlt: localized(data, "cover_alt", file),
        contribution: localized(data, "contribution", file),
        sections,
      };

      if (gallery.length) project.gallery = gallery;
      if (videoIds.length) project.videos = videosByIds(videoIds, file);

      return {
        project,
        order: Number(data.order ?? Number.MAX_SAFE_INTEGER),
      };
    })
    .sort((a, b) => a.order - b.order || a.project.slug.localeCompare(b.project.slug))
    .map(({ project }) => project);
}

export const projects: readonly Project[] = loadProjects();

export const pillarOrder: readonly Pillar[] = ["hardware", "software", "awareness"];

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function projectsByPillar(pillar: Pillar): readonly Project[] {
  return projects.filter((project) => project.pillar === pillar);
}

export const featuredProjects = projects.filter((project) => project.featured);
