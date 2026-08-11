import type { Localized } from "@/i18n/localized";

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

export const products: readonly Product[] = [
  {
    id: "connie",
    name: { de: "Connie — Kofferanhänger", en: "Connie — luggage hitch" },
    summary: {
      de: "Befestigt einen Koffer am Rollstuhl. In wenigen Handgriffen montiert, zusammengelegt passt Connie in jeden Rucksack.",
      en: "Attaches a suitcase to a wheelchair. Fitted in a few moves, and small enough to stow in any backpack.",
    },
    image: "/images/connie-detail.jpg",
    imageAlt: {
      de: "Der Kofferanhänger Connie, montiert an einem Rollstuhl.",
      en: "The Connie luggage hitch mounted on a wheelchair.",
    },
    availability: "soon",
  },
  {
    id: "card-game",
    name: { de: "Kartenspiel „Inklusiv & divers“", en: "Card game “Inklusiv & divers”" },
    summary: {
      de: "Ein Kartenspiel über Behinderung, Vorurteile und Alltag — entwickelt für Schulklassen, Seminare und Wohnzimmer.",
      en: "A card game about disability, prejudice and everyday life — made for classrooms, seminars and living rooms.",
    },
    image: "/images/media/shop-card-game.jpg",
    imageAlt: {
      de: "Das Autak-Kartenspiel „Inklusiv & divers“ in der Verpackung.",
      en: "The Autak card game “Inklusiv & divers” in its box.",
    },
    availability: "soon",
  },
  {
    id: "luggage-tag",
    name: { de: "Kofferanhänger aus Restmaterial", en: "Luggage tag from offcuts" },
    summary: {
      de: "Aus den Resten unserer Fertigung. Klein, robust und ein Gesprächsanlass am Gepäckband.",
      en: "Made from the offcuts of our production. Small, sturdy and a conversation starter at baggage claim.",
    },
    image: "/images/media/shop-flat.jpg",
    imageAlt: {
      de: "Kofferanhänger aus gefrästem Restmaterial.",
      en: "Luggage tag milled from leftover material.",
    },
    availability: "soon",
  },
];
