import type { Localized } from "@/i18n/localized";
import { loadMarkdownDir, localized, required } from "@/lib/markdown";

export type NewsCategory = "prototype" | "event" | "press" | "team" | "product";

export type NewsItem = {
  slug: string;
  /** ISO date, used for sorting and for the <time> element. */
  date: string;
  category: NewsCategory;
  title: Localized<string>;
  excerpt: Localized<string>;
  image: string;
  imageAlt: Localized<string>;
  /** Optional outbound link, for example to a broadcaster's media library. */
  link?: { href: string; label: Localized<string> };
};

const categories: readonly NewsCategory[] = [
  "prototype",
  "event",
  "press",
  "team",
  "product",
];

function isCategory(value: string): value is NewsCategory {
  return (categories as readonly string[]).includes(value);
}

function loadNews(): NewsItem[] {
  return loadMarkdownDir("editorial/news").map(({ slug, file, data }) => {
    const category = required(data, "category", file);
    if (!isCategory(category)) {
      throw new Error(
        `${file}: category must be one of ${categories.join(", ")}.`,
      );
    }

    const item: NewsItem = {
      slug,
      date: required(data, "date", file),
      category,
      title: localized(data, "title", file),
      excerpt: localized(data, "excerpt", file),
      image: required(data, "image", file),
      imageAlt: localized(data, "image_alt", file),
    };

    if (data.link_href) {
      item.link = {
        href: data.link_href,
        label: localized(data, "link_label", file),
      };
    }

    return item;
  });
}

export const news: readonly NewsItem[] = loadNews();

export const newsByDate = [...news].sort((a, b) => b.date.localeCompare(a.date));
