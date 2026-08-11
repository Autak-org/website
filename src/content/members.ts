import type { Localized } from "@/i18n/localized";

export type Member = {
  slug: string;
  name: string;
  photo: string;
  /** Board function or the role a supporter plays for the association. */
  role?: Localized<string>;
  tags?: readonly string[];
  bio?: Localized<string>;
};

export type MemberGroup = {
  id: "team" | "alumni" | "supporters";
  members: readonly Member[];
};

const photo = (slug: string) => `/images/people/${slug}.jpg`;

const team: readonly Member[] = [
  {
    slug: "manuel-wessely",
    name: "Manuel Wessely",
    photo: photo("manuel-wessely"),
    role: { de: "1. Vorsitzender", en: "1st Chair" },
    tags: ["#Informatik", "#Vertrauensperson"],
    bio: {
      de: "Für Manu ist als motivierter Informatiker das Zehnfingersystem ein Klacks. Zudem setzt er sich für seine Mitmenschen ein.",
      en: "A motivated computer scientist for whom touch typing is a formality — and someone who consistently stands up for the people around him.",
    },
  },
  {
    slug: "niklas-degener",
    name: "Niklas Degener",
    photo: photo("niklas-degener"),
    role: { de: "2. Vorsitzender", en: "2nd Chair" },
  },
  {
    slug: "gernot-suemmermann",
    name: "Gernot Sümmermann",
    photo: photo("gernot-suemmermann"),
    role: { de: "Schriftführer", en: "Secretary" },
    tags: ["#Maschinenbau", "#Kreativität"],
    bio: {
      de: "Immer mit dabei, pitcht uns um die Welt und bringt uns mit seinem Netzwerk nach vorne.",
      en: "Always there, pitching us around the world and moving us forward with his network.",
    },
  },
  {
    slug: "thomas-hoenig",
    name: "Dr. Thomas Hönig",
    photo: photo("thomas-hoenig"),
    tags: ["#Physik", "#Filmekenner"],
    bio: {
      de: "Er ist wie ein Vater für den ein oder anderen. Jedes Meeting unterstützt Thomas mit hilfreichen Einwänden.",
      en: "Something of a father figure to the team. Thomas improves every meeting with a well-placed objection.",
    },
  },
  {
    slug: "patricia-fritze",
    name: "Patricia Fritze",
    photo: photo("patricia-fritze"),
  },
  {
    slug: "felix-reuter",
    name: "Felix Reuter",
    photo: photo("felix-reuter"),
    tags: ["#Elektrotechnik", "#Hilfsbereit"],
    bio: {
      de: "Willst du etwas über Wechselstrom lernen, bekommst du bei Felix gleich eine Ladung Humor dazu.",
      en: "Ask Felix about alternating current and you get a load of humour along with the answer.",
    },
  },
  {
    slug: "abhishek-ganesh",
    name: "Abhishek Ganesh",
    photo: photo("abhishek-ganesh"),
    tags: ["#Ingenieurwesen"],
  },
  {
    slug: "amol-kodange",
    name: "Amol Kodange",
    photo: photo("amol-kodange"),
    tags: ["#Ingenieurwesen"],
  },
  {
    slug: "nitish-aggarwal",
    name: "Nitish Aggarwal",
    photo: photo("nitish-aggarwal"),
    tags: ["#Ingenieurwesen"],
  },
  {
    slug: "subhangee-sahoo",
    name: "Subhangee Sahoo",
    photo: photo("subhangee-sahoo"),
    tags: ["#Ingenieurwesen"],
  },
  {
    slug: "aditi-mishra",
    name: "Aditi Mishra",
    photo: photo("aditi-mishra"),
    tags: ["#Ingenieurwesen"],
  },
  {
    slug: "leoni-kaever",
    name: "Leoni Kaever",
    photo: photo("leoni-kaever"),
  },
  {
    slug: "florian-ernst",
    name: "Florian Ernst",
    photo: photo("florian-ernst"),
  },
];

const alumni: readonly Member[] = [
  {
    slug: "rene-rosenthal",
    name: "René Rosenthal",
    photo: photo("rene-rosenthal"),
    tags: ["#Mechanik", "#Werkstatt"],
    bio: {
      de: "Du willst wissen, wie man eine CNC-Fräse bedient oder ein Produkt entwickelt? Dann steht René hinter dir.",
      en: "Want to know how to run a CNC mill or develop a product? René has your back.",
    },
  },
  {
    slug: "nikolas-roessler",
    name: "Nikolas Roessler",
    photo: photo("nikolas-roessler"),
    tags: ["#BWL", "#Anträge"],
    bio: {
      de: "Wenn es um Bewerbungen geht, ist Niko unser Mann. Darüber hinaus jongliert er unsere Finanzen.",
      en: "When it comes to applications, Niko is our man — and he juggles our finances on top.",
    },
  },
  {
    slug: "michael-heinrichs",
    name: "Michael Heinrichs",
    photo: photo("michael-heinrichs"),
    tags: ["#Elektrotechnik", "#Realist"],
    bio: {
      de: "Technisches Verständnis mit Fingerspitzengefühl: Schneller als man gucken kann, hat Michael etwas codiert.",
      en: "Technical depth with a light touch — faster than you can look, Michael has coded something.",
    },
  },
  {
    slug: "ece-angun",
    name: "Ece Angun",
    photo: photo("ece-angun"),
    tags: ["#Problemlöserin", "#Kreativ"],
  },
  {
    slug: "julia-kampmann",
    name: "Julia Kampmann",
    photo: photo("julia-kampmann"),
    tags: ["#Medizinaffin", "#Motiviert"],
    bio: {
      de: "Unser jüngstes Teammitglied engagiert sich mit Begeisterung und ist auf Messen für ein Pläuschchen zu haben.",
      en: "Our youngest team member, involved with enthusiasm and always up for a chat at a trade fair.",
    },
  },
  {
    slug: "juliane-schlierkamp",
    name: "Juliane Schlierkamp",
    photo: photo("juliane-schlierkamp"),
    tags: ["#Produktionstechnik", "#Allrounderin"],
    bio: {
      de: "Steht mit voller Power hinter der Organisation und kann zu jedem Thema neue Ideen beisteuern.",
      en: "Full power behind the organisation, with new ideas for every topic on the table.",
    },
  },
  {
    slug: "neslihan-altinel",
    name: "Neslihan Altinel",
    photo: photo("neslihan-altinel"),
    tags: ["#WirtIng", "#Lösungsorientiert"],
    bio: {
      de: "Neslihans Lebensmotto: Erwartungen nicht nur erfüllen, sondern übertreffen.",
      en: "Neslihan's motto: don't just meet expectations, exceed them.",
    },
  },
  {
    slug: "chenyan-feng",
    name: "Chenyan Feng",
    photo: photo("chenyan-feng"),
    tags: ["#Elektrotechnik", "#Bücherwurm"],
    bio: {
      de: "Eine smarte Person, die sehr belesen ist. Mit ihrem Wissen und ihrer Reiseerfahrung möchte sie etwas bewegen.",
      en: "Widely read and widely travelled, and set on putting that knowledge to work.",
    },
  },
  {
    slug: "fiona-hoenig",
    name: "Fiona Hönig",
    photo: photo("fiona-hoenig"),
    tags: ["#Marketing", "#Nachhaltigkeit"],
    bio: {
      de: "Wenn du unsere Postings siehst, hatte Fiona ihre Finger im Spiel. Außerdem liebt sie es, sich zu vernetzen.",
      en: "If you have seen our posts, Fiona had a hand in them. She also loves connecting people.",
    },
  },
  {
    slug: "marcel-wettlaufer",
    name: "Marcel Wettlaufer",
    photo: photo("marcel-wettlaufer"),
    tags: ["#WirtIng", "#Konstruktion"],
    bio: {
      de: "Mit viel Durchhaltevermögen schafft es Marcel, Theorie und Praxis zu vereinen. Konstruktionen sind aus seiner Hand.",
      en: "Marcel combines theory and practice with a lot of persistence. The constructions come from his hand.",
    },
  },
  { slug: "simon-kumar", name: "Simon Kumar", photo: photo("simon-kumar") },
  {
    slug: "madlen-merklinger",
    name: "Madlen Merklinger",
    photo: photo("madlen-merklinger"),
  },
  {
    slug: "harshita-gupta",
    name: "Harshita Gupta",
    photo: photo("harshita-gupta"),
  },
];

const supporters: readonly Member[] = [
  {
    slug: "achim-kampker",
    name: "Prof. Dr. Achim Kampker",
    photo: photo("achim-kampker"),
    role: { de: "Schirmherr", en: "Patron" },
    bio: {
      de: "Gründer von StreetScooter.",
      en: "Founder of StreetScooter.",
    },
  },
  {
    slug: "mirco-bolten",
    name: "Mirco Bolten",
    photo: photo("mirco-bolten"),
    role: { de: "EXIST-Coach", en: "EXIST coach" },
    bio: {
      de: "Unterstützt uns im EXIST-Antrag.",
      en: "Supports us with the EXIST application.",
    },
  },
  {
    slug: "raul-krauthausen",
    name: "Raul Krauthausen",
    photo: photo("raul-krauthausen"),
    bio: {
      de: "Half, die ersten Konzepte zu evaluieren.",
      en: "Helped evaluate the first concepts.",
    },
  },
  {
    slug: "kathy-mulders",
    name: "Kathy Mulders",
    photo: photo("kathy-mulders"),
    role: { de: "Aktive Mentorin", en: "Active mentor" },
    bio: {
      de: "Hilft bei der strategischen Planung.",
      en: "Helps with strategic planning.",
    },
  },
  {
    slug: "dennis",
    name: "Dennis",
    photo: photo("dennis"),
    role: { de: "Aktiver Mentor", en: "Active mentor" },
    bio: {
      de: "Hilft in der strategischen Ausführung.",
      en: "Helps with strategic execution.",
    },
  },
  {
    slug: "mark-brandt",
    name: "Mark Brandt",
    photo: photo("mark-brandt"),
    bio: {
      de: "Unterstützt uns mit seiner Erfahrung.",
      en: "Supports us with his experience.",
    },
  },
  {
    slug: "horst-boltersdorf",
    name: "Horst Boltersdorf",
    photo: photo("horst-boltersdorf"),
    bio: {
      de: "Unterstützt uns mit seinen Ideen.",
      en: "Supports us with his ideas.",
    },
  },
  {
    slug: "tanja-roembke",
    name: "Dr. Tanja Römbke",
    photo: photo("tanja-roembke"),
    bio: {
      de: "Unterstützte uns mit ihrer Erfahrung.",
      en: "Supported us with her experience.",
    },
  },
  {
    slug: "christian-bayerlein",
    name: "Christian Bayerlein",
    photo: photo("christian-bayerlein"),
    bio: {
      de: "Unterstützte uns mit seiner Erfahrung.",
      en: "Supported us with his experience.",
    },
  },
  {
    slug: "david-moser",
    name: "David Moser",
    photo: photo("david-moser"),
    bio: {
      de: "Unterstützte uns mit seiner Erfahrung.",
      en: "Supported us with his experience.",
    },
  },
  {
    slug: "martin-westhoff",
    name: "Martin Westhoff",
    photo: photo("martin-westhoff"),
    bio: {
      de: "Unterstützte uns mit seiner Erfahrung.",
      en: "Supported us with his experience.",
    },
  },
  {
    slug: "carsten",
    name: "Carsten",
    photo: photo("carsten"),
    bio: {
      de: "Unterstützte uns mit seiner Erfahrung.",
      en: "Supported us with his experience.",
    },
  },
  {
    slug: "david-lebhuser",
    name: "David Lebhuser",
    photo: photo("david-lebhuser"),
    bio: {
      de: "Nahm mit uns an UpdateDeutschland teil.",
      en: "Took part in UpdateDeutschland with us.",
    },
  },
  {
    slug: "lisa-schmidt",
    name: "Lisa Schmidt",
    photo: photo("lisa-schmidt"),
    bio: {
      de: "Half beim UpdateDeutschland-Prototypen.",
      en: "Helped with the UpdateDeutschland prototype.",
    },
  },
  {
    slug: "zacharias-wittmann",
    name: "Zacharias Wittmann",
    photo: photo("zacharias-wittmann"),
    bio: {
      de: "Nahm mit uns an UpdateDeutschland teil.",
      en: "Took part in UpdateDeutschland with us.",
    },
  },
  {
    slug: "lukas-seidel",
    name: "Lukas J. G. Seidel",
    photo: photo("lukas-seidel"),
    bio: {
      de: "Nahm mit uns an UpdateDeutschland teil.",
      en: "Took part in UpdateDeutschland with us.",
    },
  },
];

export const memberGroups: readonly MemberGroup[] = [
  { id: "team", members: team },
  { id: "alumni", members: alumni },
  { id: "supporters", members: supporters },
];

export const memberCount = team.length + alumni.length + supporters.length;
