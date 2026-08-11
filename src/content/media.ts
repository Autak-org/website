import type { SourceVideo } from "@/lib/videos";
import type { Localized } from "@/i18n/localized";

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

export const userVoices: readonly Voice[] = [
  {
    id: "commuter",
    quote: {
      de: "Ich sehe auf einen Blick, ob das mein Bus ist. Das klingt banal, bis man einmal zwanzig Minuten lang gerätselt hat.",
      en: "I can see at a glance whether that is my bus. Sounds trivial, until you have spent twenty minutes guessing.",
    },
    name: "Testnutzerin BusBuddy",
    role: { de: "Feldtest Aachen, 2025", en: "Field test Aachen, 2025" },
  },
  {
    id: "traveller",
    quote: {
      de: "Connie ist in einer Minute dran und passt danach in den Rucksack. Zum ersten Mal habe ich meinen Koffer allein zum Gleis gebracht.",
      en: "Connie clips on in a minute and fits in a backpack afterwards. It was the first time I got my suitcase to the platform on my own.",
    },
    name: "Connie-Nutzer",
    role: { de: "Rückmeldung aus dem Shop", en: "Feedback from the shop" },
  },
  {
    id: "tester",
    quote: {
      de: "Beim Testfahren merkt man den Unterschied zwischen einer Rampe und einem Rollstuhl, der die Stufe einfach nimmt.",
      en: "On a test drive you feel the difference between a ramp and a chair that simply takes the step.",
    },
    name: "Testfahrer Prototyp 1",
    role: { de: "Nutzertest, Aachen", en: "User test, Aachen" },
  },
];

export const memberVoices: readonly Voice[] = [
  {
    id: "firmware",
    quote: {
      de: "Ich bin an einem Donnerstag zum Meeting gekommen und hatte zwei Wochen später Code auf dem Rollstuhl.",
      en: "I turned up at a Thursday meeting and had code running on the wheelchair two weeks later.",
    },
    name: "Mitglied, Firmware",
    role: { de: "Seit 2024 dabei", en: "Joined in 2024" },
  },
  {
    id: "thesis",
    quote: {
      de: "Meine Abschlussarbeit steht nicht im Regal — sie fährt.",
      en: "My thesis is not sitting on a shelf — it drives.",
    },
    name: "Abschlussarbeit, Maschinenbau",
    role: { de: "RWTH Aachen", en: "RWTH Aachen" },
  },
  {
    id: "organisation",
    quote: {
      de: "Man muss nicht löten können. Organisieren, schreiben, fotografieren — es gibt für jeden etwas zu tun.",
      en: "You do not have to know how to solder. Organising, writing, photographing — there is something for everyone.",
    },
    name: "Mitglied, Organisation",
    role: { de: "FH Aachen", en: "FH Aachen" },
  },
];

export const partnerVoices: readonly Voice[] = [
  {
    id: "cooperation",
    quote: {
      de: "Ein Verein, der Prototypen baut statt Präsentationen — und der bei Rückfragen am selben Tag antwortet.",
      en: "An association that builds prototypes rather than slide decks — and answers questions the same day.",
    },
    name: "Kooperationspartner",
    role: { de: "Industrie, Region Aachen", en: "Industry, Aachen region" },
  },
  {
    id: "sponsor",
    quote: {
      de: "Wir sehen genau, wo unsere Sachspende gelandet ist. Das ist bei Förderungen nicht selbstverständlich.",
      en: "We can see exactly where our donation in kind ended up. That is not a given with sponsorships.",
    },
    name: "Sponsor",
    role: { de: "Messtechnik", en: "Measurement technology" },
  },
];

/** Coverage the association has actually had. */
export type Citation = {
  id: string;
  outlet: string;
  title: Localized<string>;
  year: string;
  href?: string;
};

export const pressCitations: readonly Citation[] = [
  {
    id: "mdr",
    outlet: "MDR — Einfach genial",
    title: {
      de: "Wissenschaftsmagazin über den treppensteigenden Rollstuhl",
      en: "Science programme on the stair-climbing wheelchair",
    },
    year: "2023",
    href: "https://www.youtube.com/watch?v=F5Ns46SNK1s",
  },
  {
    id: "ard",
    outlet: "ARD Mediathek",
    title: {
      de: "Beitrag über Mobilität und Teilhabe in Aachen",
      en: "Feature on mobility and participation in Aachen",
    },
    year: "2023",
  },
  {
    id: "cybathlon",
    outlet: "CYBATHLON",
    title: {
      de: "Assistenztechnik im Wettbewerb",
      en: "Assistive technology in competition",
    },
    year: "2024",
  },
  {
    id: "updatedeutschland",
    outlet: "UpdateDeutschland",
    title: {
      de: "Prototyp im bundesweiten Innovationsprogramm",
      en: "Prototype in the nationwide innovation programme",
    },
    year: "2021",
  },
];

const pressVideo: SourceVideo = {
  id: "press",
  youtube: "F5Ns46SNK1s",
  poster: "/images/media/video-poster-ard.jpg",
  title: { de: "MDR — Einfach genial", en: "MDR — Einfach genial" },
  meta: "2023",
};

const eventVideo: SourceVideo = {
  id: "event",
  youtube: "kmyMPOIq7RQ",
  poster: "/images/media/video-poster-event.jpg",
  title: {
    de: "Tag der Ingenieurwissenschaften",
    en: "Engineering Sciences Day",
  },
};

const stairClimb: SourceVideo = {
  id: "stair-climb",
  file: "/videos/stair-climb.mp4",
  poster: "/images/media/video-stair-climb.jpg",
  title: { de: "Treppensteigen", en: "Climbing stairs" },
};

const tiltedPath: SourceVideo = {
  id: "tilted-path",
  file: "/videos/tilted-path.mp4",
  poster: "/images/media/video-tilted-path.jpg",
  title: { de: "Schräge Fahrbahn", en: "Tilted path" },
};

const stairDrive: SourceVideo = {
  id: "stair-drive",
  file: "/videos/stair-drive.mp4",
  poster: "/images/media/video-stair-drive.jpg",
  title: { de: "Fahrt über Stufen", en: "Driving over steps" },
};

const seatAssembly: SourceVideo = {
  id: "seat-assembly",
  file: "/videos/seat-assembly.mp4",
  poster: "/images/media/video-seat-assembly.jpg",
  title: { de: "Sitzbaugruppe", en: "Seat assembly" },
};

export const showcaseVideos: readonly SourceVideo[] = [
  pressVideo,
  stairClimb,
  tiltedPath,
  stairDrive,
  seatAssembly,
  eventVideo,
];

/** Product footage for the users hub. */
export const usageVideos: readonly SourceVideo[] = [
  stairClimb,
  stairDrive,
  tiltedPath,
];

/** Events and workshop time lapses for the members hub. */
export const eventVideos: readonly SourceVideo[] = [
  eventVideo,
  seatAssembly,
  stairDrive,
];

/** Where we work and what we can build there. */
export type Capability = {
  id: string;
  label: Localized<string>;
  value: Localized<string>;
};

export const capabilities: readonly Capability[] = [
  {
    id: "location",
    label: { de: "Standort", en: "Location" },
    value: {
      de: "Werkstatt und Büro in der Ottostraße 51A, Aachen — im Umfeld von RWTH und FH.",
      en: "Workshop and office at Ottostraße 51A, Aachen — in the orbit of RWTH and FH Aachen.",
    },
  },
  {
    id: "mechanical",
    label: { de: "Mechanik", en: "Mechanical" },
    value: {
      de: "Konstruktion in Fusion 360 und FreeCAD, gefräste Aluminiumteile, 3D-Druck und Montage im Haus.",
      en: "Design in Fusion 360 and FreeCAD, milled aluminium parts, 3D printing and in-house assembly.",
    },
  },
  {
    id: "electronics",
    label: { de: "Elektronik", en: "Electronics" },
    value: {
      de: "ESP32-Firmware, CAN-Bus, 45-Volt-High-Torque-Antriebe und eigene Bedienelektronik.",
      en: "ESP32 firmware, CAN bus, 45-volt high-torque drives and our own control electronics.",
    },
  },
  {
    id: "software",
    label: { de: "Software", en: "Software" },
    value: {
      de: "Mobile Apps, Objekterkennung und Bewegungsplanung für den Roboterarm.",
      en: "Mobile apps, object detection and motion planning for the robot arm.",
    },
  },
];
