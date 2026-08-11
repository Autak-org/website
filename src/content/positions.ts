import type { Localized } from "@/i18n/localized";

export type PositionKind = "thesis" | "internship" | "both";

export type Position = {
  id: string;
  kind: PositionKind;
  title: Localized<string>;
  field: Localized<string>;
  /** What the work is. */
  task: Localized<string>;
  /** What the applicant gets out of it. */
  learn: Localized<string>;
};

export const positions: readonly Position[] = [
  {
    id: "microcontroller",
    kind: "both",
    title: {
      de: "Microcontroller-Programmierung",
      en: "Microcontroller programming",
    },
    field: { de: "Elektrotechnik, Informatik", en: "Electrical engineering, computer science" },
    task: {
      de: "Wir verwenden ESP32-Chips zur Ansteuerung der Rollstuhlräder, zum Auslesen der Geschwindigkeit, für das Bedienfeld und das Kippen des Sitzes.",
      en: "We use ESP32 chips to drive the wheelchair wheels, read the speed, run the user interface and tilt the seat.",
    },
    learn: {
      de: "Du lernst, in einem internationalen Team an Firmware zu arbeiten, wie sich Firmware in ein größeres Projekt integriert, und sammelst Erfahrung mit ESP32, CAN-Bus und 45-Volt-High-Torque-Motoren.",
      en: "You will learn to work on firmware in an international team, see how firmware fits into a larger project, and gain experience with ESP32, CAN bus and 45-volt high-torque motors.",
    },
  },
  {
    id: "construction",
    kind: "internship",
    title: { de: "Konstruktion und Fertigung", en: "Construction and manufacturing" },
    field: { de: "Maschinenbau", en: "Mechanical engineering" },
    task: {
      de: "Der Rollstuhl ist aus vielen gefrästen Aluteilen, Schrauben, Rohren und Kunststoffteilen zusammengebaut. Für Präsentationen und Tests brauchen wir einen zweiten Prototyp.",
      en: "The wheelchair is assembled from many milled aluminium parts, screws, tubes and plastic components. We need a second prototype for presentations and testing.",
    },
    learn: {
      de: "Du lernst, wie man einen Rollstuhl zusammenbaut und die Einzelteile dafür anfertigt.",
      en: "You will learn how to assemble a wheelchair and manufacture its individual parts.",
    },
  },
  {
    id: "3d-modeling",
    kind: "internship",
    title: { de: "3D-Modellierung", en: "3D modelling" },
    field: { de: "Konstruktion, Design", en: "Design engineering" },
    task: {
      de: "Wir erstellen die 3D-Modelle für die tragenden Elemente, für Befestigungen und für Steuerelemente.",
      en: "We create the 3D models for the load-bearing elements, the fasteners and the control elements.",
    },
    learn: {
      de: "Du lernst, Modelle mit Fusion 360 und FreeCAD zu erstellen, sie zu drucken und für Präsentationen aufzubereiten.",
      en: "You will learn to build models in Fusion 360 and FreeCAD, 3D print them and prepare them for presentation.",
    },
  },
  {
    id: "continuous-integration",
    kind: "thesis",
    title: {
      de: "Continuous Integration",
      en: "Continuous integration",
    },
    field: { de: "Informatik", en: "Computer science" },
    task: {
      de: "Um Qualität zu garantieren und unser Team und unsere Produkte aufs nächste Level zu bringen, brauchen wir Automatisierung in allen Bereichen.",
      en: "To guarantee quality and take our team and our products to the next level, we need automation across the board.",
    },
    learn: {
      de: "Du brauchst Programmiervorkenntnisse und sammelst Erfahrung darin, Automatisierung in allen Bereichen eines Rollstuhl bauenden Teams zu verankern.",
      en: "You need prior programming knowledge, and will gain experience embedding automation into every area of a team that builds wheelchairs.",
    },
  },
  {
    id: "process-management",
    kind: "both",
    title: { de: "Prozessmanagement", en: "Process management" },
    field: { de: "Wirtschaftsingenieurwesen, Management", en: "Industrial engineering, management" },
    task: {
      de: "Unser Team besteht aus einem festen Kern und einem Teil, der kommt und geht. Damit neue Leute schnell ankommen und ihre Arbeit bis ins Endprodukt landet, brauchen wir dich.",
      en: "Our team has a stable core and a part that comes and goes. We need you so new people settle in quickly and their work makes it all the way into the product.",
    },
    learn: {
      de: "Du hast Interesse an Managementtätigkeiten und bisher wenig Erfahrung darin? Probier dich bei uns aus.",
      en: "Interested in management work but with little experience so far? Try it out with us.",
    },
  },
  {
    id: "social-media",
    kind: "internship",
    title: { de: "Social Media und Kommunikation", en: "Social media and communications" },
    field: { de: "Marketing, Medien", en: "Marketing, media" },
    task: {
      de: "Inklusion ist ein globaler Dauerbrenner. Wir wollen Menschen mit unseren Projekten erreichen — und unser Team sucht ständig neue Leute.",
      en: "Inclusion is a long-standing global issue. We want to reach people with our projects — and our team is always looking for new members.",
    },
    learn: {
      de: "Du lernst, ein Projekt oder Produkt zu präsentieren und Social-Media-Kampagnen zu planen und durchzuführen.",
      en: "You will learn how to present a project or product and how to plan and run social campaigns.",
    },
  },
];

/** Attached to the thesis positions page as a downloadable example. */
export const thesisProposal = "/downloads/bus_buddy_thesis_proposal.pdf";
