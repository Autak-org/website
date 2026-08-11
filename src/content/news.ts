import type { Localized } from "@/i18n/localized";

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

export const news: readonly NewsItem[] = [
  {
    slug: "prototype-two",
    date: "2025-11-18",
    category: "prototype",
    title: {
      de: "Zweiter Prototyp geht in den Aufbau",
      en: "Second prototype goes into assembly",
    },
    excerpt: {
      de: "Die gefrästen Aluteile für den zweiten Rollstuhl sind da. Er wird der erste sein, der Präsentationen und Belastungstests parallel übersteht — der erste Prototyp bleibt im Labor.",
      en: "The milled aluminium parts for the second wheelchair have arrived. It will be the first one to survive presentations and load testing in parallel — the first prototype stays in the lab.",
    },
    image: "/images/media/wheelchair-detail.jpg",
    imageAlt: {
      de: "Detailaufnahme des Rollstuhlrahmens mit gefrästen Aluminiumteilen.",
      en: "Close-up of the wheelchair frame with machined aluminium parts.",
    },
  },
  {
    slug: "busbuddy-field-test",
    date: "2025-06-24",
    category: "product",
    title: {
      de: "BusBuddy im Linienbetrieb getestet",
      en: "BusBuddy tested on real bus routes",
    },
    excerpt: {
      de: "Mit Unterstützung der StädteRegion Aachen konnten wir die App im echten Linienbetrieb testen. Rot heißt falscher Bus, grün heißt richtiger Bus — das hat auf Anhieb funktioniert.",
      en: "With support from the StädteRegion Aachen we tested the app on real bus routes. Red means the wrong bus, green the right one — and it worked straight away.",
    },
    image: "/images/media/app-field-test.jpg",
    imageAlt: {
      de: "Test der BusBuddy-App an einer Bushaltestelle in Aachen.",
      en: "Testing the BusBuddy app at a bus stop in Aachen.",
    },
  },
  {
    slug: "cybathlon",
    date: "2024-10-27",
    category: "event",
    title: {
      de: "Unterwegs beim CYBATHLON",
      en: "On the road at CYBATHLON",
    },
    excerpt: {
      de: "Assistenztechnik im Wettbewerb, entwickelt mit den Menschen, die sie benutzen. Genau die Haltung, mit der wir am Rollstuhl arbeiten.",
      en: "Assistive technology in competition, developed with the people who use it. Exactly the attitude we build the wheelchair with.",
    },
    image: "/images/media/booth-indoor.jpg",
    imageAlt: {
      de: "Messestand mit dem Autak-Rollstuhl-Prototyp.",
      en: "Trade fair booth with the Autak wheelchair prototype.",
    },
  },
  {
    slug: "seat-assembly",
    date: "2024-10-16",
    category: "prototype",
    title: {
      de: "Neue Sitzbaugruppe konstruiert",
      en: "New seat assembly designed",
    },
    excerpt: {
      de: "Rücken- und Fußstütze lassen sich jetzt unabhängig neigen. Das klingt nach einer Kleinigkeit — für die Sitzposition auf einer Treppe ist es der Unterschied.",
      en: "The backrest and footrest now tilt independently. It sounds like a detail — for the seating position on a staircase it is the difference.",
    },
    image: "/images/media/video-seat-assembly.jpg",
    imageAlt: {
      de: "CAD-Ansicht der neuen Sitzbaugruppe.",
      en: "CAD view of the new seat assembly.",
    },
  },
  {
    slug: "campus-day",
    date: "2024-09-06",
    category: "team",
    title: {
      de: "Neue Gesichter im Team",
      en: "New faces in the team",
    },
    excerpt: {
      de: "Zum Semesterstart sind wieder Studierende aus Maschinenbau, Elektrotechnik und Informatik dazugekommen. Unsere Teammeetings finden weiterhin donnerstags statt — offen für alle.",
      en: "Students from mechanical engineering, electrical engineering and computer science joined us at the start of the semester. Our team meetings are still on Thursdays — open to everyone.",
    },
    image: "/images/media/group-outdoor.jpg",
    imageAlt: {
      de: "Gruppenbild des Autak-Teams im Freien.",
      en: "Group photo of the Autak team outdoors.",
    },
  },
  {
    slug: "outdoor-testing",
    date: "2024-05-04",
    category: "prototype",
    title: {
      de: "Testfahrten auf Kopfsteinpflaster",
      en: "Test drives on cobblestones",
    },
    excerpt: {
      de: "Bordsteinkanten, Kopfsteinpflaster, Waldboden: Die Sternräder passen ihre Höhe an, damit der Sitz waagerecht bleibt. Wir haben eine Woche lang alles gefahren, was Aachen zu bieten hat.",
      en: "Kerbs, cobblestones, forest paths: the star wheels adjust their height so the seat stays level. We spent a week driving over everything Aachen has to offer.",
    },
    image: "/images/media/wheelchair-stairs.jpg",
    imageAlt: {
      de: "Der Rollstuhl im Außeneinsatz auf unebenem Untergrund.",
      en: "The wheelchair outdoors on uneven ground.",
    },
  },
  {
    slug: "einfach-genial",
    date: "2023-03-14",
    category: "press",
    title: {
      de: "Autak bei „Einfach genial“ im MDR",
      en: "Autak on MDR's “Einfach genial”",
    },
    excerpt: {
      de: "Das MDR-Wissenschaftsmagazin hat unseren Prototyp besucht und gezeigt, wie der Rollstuhl Stufen nimmt.",
      en: "The MDR science programme visited our prototype and showed how the wheelchair takes stairs.",
    },
    image: "/images/media/video-poster-ard.jpg",
    imageAlt: {
      de: "Standbild aus dem MDR-Beitrag über den Autak-Rollstuhl.",
      en: "Still from the MDR feature about the Autak wheelchair.",
    },
    link: {
      href: "https://www.youtube.com/watch?v=F5Ns46SNK1s",
      label: { de: "Beitrag ansehen", en: "Watch the feature" },
    },
  },
  {
    slug: "lasertag",
    date: "2022-11-12",
    category: "event",
    title: {
      de: "Rollstuhl-Lasertag für 200 Studierende",
      en: "Wheelchair laser tag for 200 students",
    },
    excerpt: {
      de: "Zusammen mit der BlackLasertag-Halle in Aachen haben wir ein Lasertag im Rollstuhl veranstaltet. Für die meisten Teilnehmenden war es die erste Stunde ihres Lebens im Rollstuhl.",
      en: "Together with the BlackLasertag arena in Aachen we ran laser tag in wheelchairs. For most participants it was the first hour of their life in a wheelchair.",
    },
    image: "/images/media/event-lasertag.jpg",
    imageAlt: {
      de: "Rollstuhl-Lasertag in einer abgedunkelten Halle.",
      en: "Wheelchair laser tag in a darkened arena.",
    },
  },
  {
    slug: "connie-launch",
    date: "2022-06-08",
    category: "product",
    title: {
      de: "Connie ist im Shop",
      en: "Connie is in the shop",
    },
    excerpt: {
      de: "Der Kofferanhänger Connie lässt sich mit wenigen Handgriffen am Rollstuhl montieren und passt zusammengelegt in jeden Rucksack. 100 % des Gewinns fließen zurück in die Entwicklung.",
      en: "The Connie luggage hitch mounts on a wheelchair in a few moves and folds down small enough for any backpack. 100 % of the profit goes back into development.",
    },
    image: "/images/connie-detail.jpg",
    imageAlt: {
      de: "Der Kofferanhänger Connie, montiert an einem Rollstuhl.",
      en: "The Connie luggage hitch mounted on a wheelchair.",
    },
  },
  {
    slug: "panel-discussion",
    date: "2021-09-16",
    category: "event",
    title: {
      de: "Podiumsdiskussion zur Bundestagswahl",
      en: "Panel discussion ahead of the federal election",
    },
    excerpt: {
      de: "Mit Bundestagsabgeordneten haben wir über Social Entrepreneurship und Barrierefreiheit diskutiert — und darüber, warum das eine ohne das andere selten funktioniert.",
      en: "We discussed social entrepreneurship and accessibility with members of parliament — and why one rarely works without the other.",
    },
    image: "/images/media/event-panel.jpg",
    imageAlt: {
      de: "Podiumsdiskussion mit mehreren Gästen auf der Bühne.",
      en: "Panel discussion with several guests on stage.",
    },
  },
];

export const newsByDate = [...news].sort((a, b) => b.date.localeCompare(a.date));
