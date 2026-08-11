import type { Localized } from "@/i18n/localized";
import type { SourceVideo } from "@/lib/videos";

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

export const projects: readonly Project[] = [
  {
    slug: "wheelchair",
    pillar: "hardware",
    featured: true,
    name: { de: "Rollstuhl", en: "Wheelchair" },
    tagline: {
      de: "Ein Sternrad, das Treppen zu einer Strecke wie jede andere macht",
      en: "A star wheel that turns stairs into just another stretch of road",
    },
    summary: {
      de: "Der treppensteigende Prototyp, mit dem alles begann — inzwischen in der zweiten Generation.",
      en: "The stair-climbing prototype that started everything — now in its second generation.",
    },
    status: {
      de: "Prototyp 2 im Test",
      en: "Prototype 2 in testing",
    },
    cover: "/images/wheelchair-prototype.jpg",
    coverAlt: {
      de: "Der Autak-Prototyp: ein schwarzer Rollstuhl mit pinkem Logo und je drei kleinen Rädern pro Seite.",
      en: "The Autak prototype: a black wheelchair with a pink logo and three small wheels on each side.",
    },
    contribution: {
      de: "Konstruktion, Fertigung der Aluteile, Firmware für die ESP32-Steuerung und Testfahrten mit Nutzerinnen und Nutzern.",
      en: "Construction, machining the aluminium parts, firmware for the ESP32 control unit and test drives with users.",
    },
    sections: [
      {
        id: "star-wheel",
        title: { de: "Das Sternrad", en: "The star wheel" },
        body: {
          de: "Drei Räder sitzen auf einem drehbaren Träger. Trifft der Rollstuhl auf eine Stufe, rollt der Träger ab und das nächste Rad setzt auf der Stufe auf. Dadurch steht der Rollstuhl auf Treppen stabil und bleibt im Alltag trotzdem flexibel und portabel.",
          en: "Three wheels sit on a rotating carrier. When the chair meets a step the carrier rolls over and the next wheel lands on the stair above. That keeps the chair stable on a staircase while staying flexible and portable in everyday use.",
        },
        image: "/images/media/wheelchair-render.jpg",
        imageAlt: {
          de: "CAD-Ansicht des Sternrads mit drei Rädern auf einem drehbaren Träger.",
          en: "CAD view of the star wheel with three wheels on a rotating carrier.",
        },
      },
      {
        id: "eye-level",
        title: { de: "Auf Augenhöhe", en: "At eye level" },
        body: {
          de: "Ein Gespräch auf Augenhöhe oder das Erreichen höher gelegener Orte wird mit unserem Rollstuhl möglich. Die ausfahrbaren Speichen heben die Sitzposition an, der Neigungswinkel von Rücken- und Fußstütze lässt sich anpassen.",
          en: "A conversation at eye level, or reaching something on a high shelf. Extendable spokes raise the seating position, and the angle of the backrest and footrest can be adjusted.",
        },
        image: "/images/media/wheelchair-steps.jpg",
        imageAlt: {
          de: "Darstellung des Rollstuhls beim Überwinden mehrerer Treppenstufen.",
          en: "Illustration of the wheelchair climbing several stairs.",
        },
      },
      {
        id: "obstacles",
        title: { de: "Hindernisse im Alltag", en: "Everyday obstacles" },
        body: {
          de: "Die Räder passen sich jedem Untergrund an — Bordsteinkanten, Kopfsteinpflaster oder Waldboden. Die Sternräder verändern ihre Höhe und gleichen die Neigung der Fahrbahn aus.",
          en: "The wheels adapt to any surface: kerbs, cobblestones or a forest path. The star wheels change height to compensate for the camber of the road.",
        },
        image: "/images/media/wheelchair-stairs.jpg",
        imageAlt: {
          de: "Der Rollstuhl im Außeneinsatz auf unebenem Untergrund.",
          en: "The wheelchair outdoors on uneven ground.",
        },
      },
      {
        id: "prototype",
        title: { de: "Vom Konzept zum Prototyp", en: "From concept to prototype" },
        body: {
          de: "Der erste Prototyp ist weitestgehend funktionsfähig und wurde mit mehreren Testerinnen und Testern erprobt. Für Präsentationen und Belastungstests bauen wir gerade einen zweiten Prototyp auf.",
          en: "The first prototype is largely functional and has been tried out with several testers. We are currently building a second one for presentations and load testing.",
        },
        image: "/images/media/wheelchair-detail.jpg",
        imageAlt: {
          de: "Detailaufnahme des Rollstuhlrahmens mit gefrästen Aluminiumteilen.",
          en: "Close-up of the wheelchair frame with machined aluminium parts.",
        },
      },
    ],
    videos: [
      {
        id: "stair-climb",
        file: "/videos/stair-climb.mp4",
        poster: "/images/media/video-stair-climb.jpg",
        title: { de: "Treppensteigen", en: "Climbing stairs" },
      },
      {
        id: "tilted-path",
        file: "/videos/tilted-path.mp4",
        poster: "/images/media/video-tilted-path.jpg",
        title: { de: "Schräge Fahrbahn", en: "Tilted path" },
      },
      {
        id: "stair-drive",
        file: "/videos/stair-drive.mp4",
        poster: "/images/media/video-stair-drive.jpg",
        title: { de: "Fahrt über Stufen", en: "Driving over steps" },
      },
      {
        id: "seat-assembly",
        file: "/videos/seat-assembly.mp4",
        poster: "/images/media/video-seat-assembly.jpg",
        title: { de: "Sitzbaugruppe", en: "Seat assembly" },
      },
    ],
  },
  {
    slug: "connie",
    pillar: "hardware",
    featured: true,
    name: { de: "Connie", en: "Connie" },
    tagline: {
      de: "Der Kofferanhänger, der mit wenigen Handgriffen am Rollstuhl sitzt",
      en: "The luggage hitch that clips onto a wheelchair in a few moves",
    },
    summary: {
      de: "Mit Rollstuhl und Koffer selbstständig unterwegs sein — ohne fremde Hilfe.",
      en: "Travelling independently with a wheelchair and a suitcase, without asking for help.",
    },
    status: { de: "Im Shop erhältlich", en: "Available in the shop" },
    cover: "/images/connie-detail.jpg",
    coverAlt: {
      de: "Der Kofferanhänger Connie, montiert an einem Rollstuhl.",
      en: "The Connie luggage hitch mounted on a wheelchair.",
    },
    contribution: {
      de: "Fertigung, Verpackung und Versand sowie Rückmeldungen aus dem Alltag von Nutzerinnen und Nutzern.",
      en: "Manufacturing, packing and shipping, plus everyday feedback from the people who use it.",
    },
    sections: [
      {
        id: "idea",
        title: { de: "Die Idee", en: "The idea" },
        body: {
          de: "Um mit einem Rollstuhl und einem Koffer selbstständig unterwegs sein zu können, haben wir den Kofferanhänger Connie entwickelt. Mit nur wenigen Handgriffen ist er installiert; genauso schnell lässt er sich wieder abmontieren. Durch die handliche Größe passt Connie platzsparend in jeden Rucksack.",
          en: "To make travelling with a wheelchair and a suitcase possible on your own, we developed the Connie luggage hitch. It installs in a few moves and comes off just as quickly, and it is small enough to stow in any backpack.",
        },
        image: "/images/media/station-travel.jpg",
        imageAlt: {
          de: "Reisende mit Gepäck in einer Bahnhofshalle.",
          en: "Travellers with luggage in a station concourse.",
        },
      },
      {
        id: "funding",
        title: { de: "Wohin das Geld fließt", en: "Where the money goes" },
        body: {
          de: "100 % des Gewinns reinvestieren wir in weitere Entwicklungen, zum Beispiel in den aktuellen Prototyp des Treppensteigrollstuhls.",
          en: "100 % of the profit is reinvested into further development, for example into the current stair-climbing wheelchair prototype.",
        },
        image: "/images/media/station-travel.jpg",
        imageAlt: {
          de: "Connie zusammengelegt neben einem Rucksack.",
          en: "Connie folded up next to a backpack.",
        },
      },
    ],
  },
  {
    slug: "robot-arm",
    pillar: "hardware",
    name: { de: "Roboterarm", en: "Robot arm" },
    tagline: {
      de: "Greift, was zu hoch, zu tief oder zu weit weg liegt",
      en: "Reaches what is too high, too low or too far away",
    },
    summary: {
      de: "Ein Greifarm am Rollstuhl, der Türen öffnet und Dinge erreichbar macht.",
      en: "A gripper on the wheelchair that opens doors and brings things within reach.",
    },
    status: { de: "In Entwicklung", en: "In development" },
    cover: "/images/media/portrait-desk.jpg",
    coverAlt: {
      de: "Teammitglied arbeitet am Rechner an der Steuerung des Roboterarms.",
      en: "Team member working on the robot arm control software.",
    },
    contribution: {
      de: "Objekterkennung, Bewegungsplanung und die sichere Ansteuerung des Arms in ROS.",
      en: "Object detection, motion planning and safe control of the arm in ROS.",
    },
    sections: [
      {
        id: "problem",
        title: { de: "Das Problem", en: "The problem" },
        body: {
          de: "Wie öffnen Sie die Tür Ihrer Küche, die Haustür oder ein Schließfach, wenn Sie im Rollstuhl sitzen? Genau dieses Problem versuchen wir zu lösen.",
          en: "How would you open your kitchen door, your front door or a locker from a wheelchair? That is the problem we are trying to solve.",
        },
      },
      {
        id: "components",
        title: { de: "Drei Komponenten", en: "Three components" },
        body: {
          de: "Eine Tiefenkamera erkennt Objekte und liefert zusätzlich Abstandsinformationen. Der Kinova Jaco ist ein Roboterarm, der für die Montage am Rollstuhl und für den sicheren Betrieb in der Nähe von Menschen ausgelegt ist. Der Rollstuhl selbst trägt beides.",
          en: "A depth camera detects objects and adds distance information. The Kinova Jaco is a robot arm designed to be mounted on a wheelchair and operated safely around people. The wheelchair itself carries both.",
        },
        image: "/images/media/accessibility-symbol.jpg",
        imageAlt: {
          de: "Aufgemaltes Rollstuhlsymbol auf einer Bodenfläche.",
          en: "Wheelchair symbol painted on the ground.",
        },
      },
    ],
  },
  {
    slug: "app",
    pillar: "software",
    featured: true,
    name: { de: "BusBuddy", en: "BusBuddy" },
    tagline: {
      de: "Barrierefrei von A nach B — mit einer App, die nur zwei Farben braucht",
      en: "Barrier-free from A to B — with an app that only needs two colours",
    },
    summary: {
      de: "Rot heißt falscher Bus, grün heißt richtiger Bus. Mehr braucht es oft nicht.",
      en: "Red means wrong bus, green means right bus. Often that is all it takes.",
    },
    status: { de: "In Aachen getestet", en: "Tested in Aachen" },
    cover: "/images/media/navigation-city.jpg",
    coverAlt: {
      de: "Person hält ein Smartphone mit einer Karten-App in der Stadt.",
      en: "Person holding a smartphone with a map app in the city.",
    },
    contribution: {
      de: "App-Entwicklung, Anbindung der Fahrplandaten und Nutzertests im echten Linienbetrieb.",
      en: "App development, connecting timetable data and user testing on real bus routes.",
    },
    sections: [
      {
        id: "who",
        title: { de: "Für wen", en: "Who it is for" },
        body: {
          de: "Zum Anfang fokussieren wir uns auf den öffentlichen Nahverkehr — für Menschen mit Seheinschränkung, mit kognitiven Barrieren, für Menschen aus dem Ausland, im hohen Alter oder in der Grundschule.",
          en: "We start with local public transport — for people with visual impairments, with cognitive barriers, people from abroad, older people and primary school children.",
        },
        image: "/images/media/event-crowd.jpg",
        imageAlt: {
          de: "Menschen unterschiedlichen Alters warten an einer Haltestelle.",
          en: "People of different ages waiting at a stop.",
        },
      },
      {
        id: "problems",
        title: { de: "Die Probleme", en: "The problems" },
        body: {
          de: "Unlesbare Fahrpläne, verwirrende Apps, zu viele Menschen, zu laut, Displayfehler, zu schnell, kurzfristige Fahrplanänderungen — und die Angst, zu fragen.",
          en: "Unreadable timetables, confusing apps, too many people, too loud, display faults, too fast, last-minute schedule changes — and being afraid to ask.",
        },
        image: "/images/media/app-timetable.jpg",
        imageAlt: {
          de: "Ausschnitt eines gedruckten Fahrplans mit engen Spalten.",
          en: "Section of a printed timetable with tightly packed columns.",
        },
      },
      {
        id: "solution",
        title: { de: "Unsere Lösung", en: "Our solution" },
        body: {
          de: "Eine App, die genau eine Frage beantwortet: Ist das mein Bus? Rot bedeutet falscher Bus, grün bedeutet richtiger Bus. Mit der Unterstützung der StädteRegion konnten wir die App in Aachen bereits erfolgreich testen.",
          en: "An app that answers exactly one question: is this my bus? Red means the wrong bus, green means the right one. With support from the StädteRegion we have already tested the app successfully in Aachen.",
        },
        image: "/images/media/app-field-test.jpg",
        imageAlt: {
          de: "Test der App an einer Bushaltestelle in Aachen.",
          en: "Testing the app at a bus stop in Aachen.",
        },
      },
    ],
  },
  {
    slug: "learning-platform",
    pillar: "software",
    name: { de: "Lernplattform", en: "Learning platform" },
    tagline: {
      de: "Behinderung spielerisch kennenlernen",
      en: "Getting to know disability through play",
    },
    summary: {
      de: "Barrierefreies Wissen für Schulklassen — erzählt von Menschen mit Behinderung selbst.",
      en: "Accessible knowledge for school classes — told by people with disabilities themselves.",
    },
    status: { de: "Konzept und Pilot", en: "Concept and pilot" },
    cover: "/images/media/learning-workshop.jpg",
    coverAlt: {
      de: "Hände verschiedener Menschen übereinander als Zeichen für Zusammenarbeit.",
      en: "Hands of different people stacked together as a sign of collaboration.",
    },
    contribution: {
      de: "Didaktik, Redaktion der Lerneinheiten und die Entwicklung der interaktiven Minispiele.",
      en: "Didactics, editing the learning units and building the interactive mini-games.",
    },
    sections: [
      {
        id: "concept",
        title: { de: "Das Konzept", en: "The concept" },
        body: {
          de: "Eine Lernplattform, die Themen rund um Behinderung, Inklusion und Barrierefreiheit einfach und interessant an Schülerinnen und Schüler vermittelt. Menschen mit Behinderung stellen dabei ihre eigene Behinderung, ihre Hilfsmittel, ihre Hobbys und ihre Lebensrealität selbst dar.",
          en: "A learning platform that explains disability, inclusion and accessibility to pupils in a simple and interesting way. People with disabilities present their own disability, their aids, their hobbies and the reality of their lives.",
        },
      },
      {
        id: "games",
        title: { de: "Minispiele", en: "Mini-games" },
        body: {
          de: "Interaktive Minispiele — zum Beispiel Rollstuhlfahren — machen das Thema erlebbar und zeigen Barrieren, statt sie nur zu beschreiben.",
          en: "Interactive mini-games — driving a wheelchair, for instance — make the topic tangible and show barriers instead of only describing them.",
        },
        image: "/images/media/shop-cards.jpg",
        imageAlt: {
          de: "Das Autak-Kartenspiel „Inklusiv & divers“.",
          en: "The Autak card game “Inklusiv & divers”.",
        },
      },
    ],
  },
  {
    slug: "social-media",
    pillar: "awareness",
    name: { de: "Critical Social Media", en: "Critical social media" },
    tagline: {
      de: "Kritisch hinterfragen, was als normal gilt",
      en: "Questioning what counts as normal",
    },
    summary: {
      de: "Durch Videos, Bilder und Texte bringen wir Inklusion in die Köpfe aller.",
      en: "Through videos, images and text we put inclusion into everyone's head.",
    },
    status: { de: "Laufend", en: "Ongoing" },
    cover: "/images/media/event-lights.jpg",
    coverAlt: {
      de: "Farbiges Bühnenlicht bei einem Autak-Event.",
      en: "Coloured stage lighting at an Autak event.",
    },
    contribution: {
      de: "Redaktion, Videoschnitt, Fotografie und die Planung von Kampagnen.",
      en: "Editorial work, video editing, photography and campaign planning.",
    },
    sections: [
      {
        id: "why",
        title: { de: "Warum wir posten", en: "Why we post" },
        body: {
          de: "Inklusion ist ein globaler Dauerbrenner. Barrieren verschwinden nicht, weil jemand eine Rampe baut — sie verschwinden, wenn genug Menschen sie überhaupt erst bemerken. Deshalb machen wir sie sichtbar, bevor wir sie abbauen.",
          en: "Inclusion is a long-standing global issue. Barriers do not disappear because someone builds a ramp; they disappear once enough people notice them in the first place. So we make them visible before we remove them.",
        },
      },
    ],
  },
  {
    slug: "events",
    pillar: "awareness",
    name: { de: "Events", en: "Events" },
    tagline: {
      de: "Aufmerksamkeit — und selbst ausprobieren",
      en: "Attention — and trying it yourself",
    },
    summary: {
      de: "Rollstuhl-Lasertag, Podiumsdiskussionen und Biathlon: Inklusion zum Anfassen.",
      en: "Wheelchair laser tag, panel discussions and biathlon: inclusion you can take part in.",
    },
    status: { de: "Mehrmals im Jahr", en: "Several times a year" },
    cover: "/images/community-event.jpg",
    coverAlt: {
      de: "Teilnehmende bei einem Autak-Event in Aachen.",
      en: "Participants at an Autak event in Aachen.",
    },
    contribution: {
      de: "Organisation, Auf- und Abbau, Betreuung der Teilnehmenden und Öffentlichkeitsarbeit.",
      en: "Organisation, setup and teardown, looking after participants and press work.",
    },
    sections: [
      {
        id: "idea",
        title: { de: "Die Idee", en: "The idea" },
        body: {
          de: "Durch verschiedene Events wollen wir alle Menschen — mit und ohne Behinderung — in Kontakt bringen und gemeinsam etwas erleben.",
          en: "Through a range of events we want to bring everyone together — with and without disabilities — and share an experience.",
        },
      },
      {
        id: "biathlon",
        title: { de: "Rollstuhl-Biathlon", en: "Wheelchair biathlon" },
        body: {
          de: "Mit dem von uns entwickelten Format des Rollstuhl-Biathlons tragen wir barrierefreie Mobilität, Teilhabe und Inklusion in den öffentlichen Raum. Betroffene bekommen einen Rahmen zum Austausch, alle anderen begegnen dem Thema zum ersten Mal ganz direkt.",
          en: "The wheelchair biathlon format we developed carries accessible mobility, participation and inclusion into public space. It gives people affected a place to exchange, and confronts everyone else with the topic first-hand.",
        },
        image: "/images/media/wheelchair-event.jpg",
        imageAlt: {
          de: "Rollstuhlfahrende bei einem Autak-Event im Freien.",
          en: "Wheelchair users at an outdoor Autak event.",
        },
      },
      {
        id: "past",
        title: { de: "Vergangene Events", en: "Past events" },
        body: {
          de: "2022 haben wir zusammen mit der BlackLasertag-Halle in Aachen ein Rollstuhl-Lasertag für rund 200 Studierende veranstaltet. 2021 gab es zur Bundestagswahl eine Podiumsdiskussion mit Abgeordneten zum Thema Social Entrepreneurship und Barrierefreiheit.",
          en: "In 2022 we ran wheelchair laser tag for around 200 students together with the BlackLasertag arena in Aachen. In 2021, ahead of the federal election, we hosted a panel discussion with members of parliament on social entrepreneurship and accessibility.",
        },
        image: "/images/media/event-lasertag.jpg",
        imageAlt: {
          de: "Rollstuhl-Lasertag in einer abgedunkelten Halle.",
          en: "Wheelchair laser tag in a darkened arena.",
        },
      },
    ],
    gallery: [
      {
        src: "/images/media/event-panel.jpg",
        alt: {
          de: "Podiumsdiskussion mit mehreren Gästen auf der Bühne.",
          en: "Panel discussion with several guests on stage.",
        },
      },
      {
        src: "/images/media/demo-street.jpg",
        alt: {
          de: "Autak-Stand in der Aachener Innenstadt.",
          en: "Autak stand in Aachen city centre.",
        },
      },
      {
        src: "/images/media/booth-indoor.jpg",
        alt: {
          de: "Messestand mit Rollstuhl-Prototyp.",
          en: "Trade fair booth with the wheelchair prototype.",
        },
      },
    ],
  },
];

export const pillarOrder: readonly Pillar[] = ["hardware", "software", "awareness"];

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function projectsByPillar(pillar: Pillar): readonly Project[] {
  return projects.filter((project) => project.pillar === pillar);
}

export const featuredProjects = projects.filter((project) => project.featured);
