import type { Localized } from "@/i18n/localized";
import { byOrder, loadMarkdownDir, localized, required } from "@/lib/markdown";

export type Product = {
  id: string;
  name: Localized<string>;
  summary: Localized<string>;
  image: string;
  imageAlt: Localized<string>;
  /** `sold-out` and `soon` render as a state instead of a buy button. */
  availability: "available" | "soon" | "sold-out";
  price?: string;
};

const availabilityValues = ["available", "soon", "sold-out"] as const;

function isAvailability(
  value: string,
): value is Product["availability"] {
  return (availabilityValues as readonly string[]).includes(value);
}

function loadProducts(): Product[] {
  return byOrder(loadMarkdownDir("editorial/shop")).map(({ slug, file, data }) => {
    const availability = required(data, "availability", file);
    if (!isAvailability(availability)) {
      throw new Error(
        `${file}: availability must be one of ${availabilityValues.join(", ")}.`,
      );
    }

    return {
      id: slug,
      availability,
      name: localized(data, "name", file),
      summary: localized(data, "summary", file),
      image: required(data, "image", file),
      imageAlt: localized(data, "image_alt", file),
      price: data.price || undefined,
    };
  });
}

export const products: readonly Product[] = loadProducts();
