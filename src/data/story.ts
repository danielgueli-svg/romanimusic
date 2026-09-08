/**
 * Homepage story spine.
 * Every date and sentence is copied from existing chapter text.
 * Do not invent kinships or years here.
 */

export type StoryCta =
  | {
      type: "history";
      slug: string;
      label: string;
    }
  | {
      type: "style";
      slug: string;
      label: string;
    }
  | {
      type: "family";
      slug: string;
      label: string;
    }
  | {
      type: "artist";
      slug: string;
      label: string;
    }
  | {
      type: "page";
      to: "/work" | "/contact" | "/families" | "/sources" | "/history";
      label: string;
    }
  | {
      type: "ext";
      href: string;
      label: string;
    };

export type StoryEra = "origin" | "named" | "rooms" | "after" | "archive" | "next";

export type StoryNode = {
  id: string;
  year: string;
  sort: number;
  era: StoryEra;
  title: string;
  body: string[];
  image?: { src: string; alt: string };
  cta: StoryCta;
};

export const STORY_SPAN = "c. 1000 → now";

export const STORY_NODES: StoryNode[] = [
  {
    id: "india",
    year: "c. 1000",
    sort: 1000,
    era: "origin",
    title: "Northwestern India",
    body: [
      "Linguistic and genetic research points to an origin in northwestern India more than a thousand years ago.",
      "Romani is an Indo-Aryan language.",
      "There is no surviving original Romani music that can be played as a fossil.",
    ],
    cta: { type: "history", slug: "origins", label: "Origins chapter" },
  },
  {
    id: "europe",
    year: "1417–1427",
    sort: 1417,
    era: "origin",
    title: "Written into Europe",
    body: [
      "In 1417 a group is mentioned in Hildesheim.",
      "In 1420 they are recorded in the Netherlands and Belgium.",
      "In 1427 a larger party arrives near Paris.",
    ],
    cta: { type: "history", slug: "origins", label: "Origins chapter" },
  },
  {
    id: "bihari",
    year: "1711–1827",
    sort: 1711,
    era: "named",
    title: "The restaurant violin",
    body: [
      "Czinka Panna (1711–1772) was a named Romani woman bandleader in the Kingdom of Hungary.",
      "János Bihari (1764–1827) is the named ancestor of the Hungarian restaurant violin.",
      "Verbunkos grew as recruiting-dance music. The csárdás is the public dance form.",
    ],
    image: {
      src: "/media/janos-bihari.jpg",
      alt: "János Bihari, Hungarian Romani violinist",
    },
    cta: { type: "history", slug: "hungary", label: "Hungary chapter" },
  },
  {
    id: "russia",
    year: "Late 18th c.",
    sort: 1780,
    era: "named",
    title: "Choirs and seven strings",
    body: [
      "From the late eighteenth century, Romani choirs became a Russian fashion.",
      "The seven-string guitar was the domestic instrument of this world.",
      "Theatre Romen in Moscow, founded 1931, is the oldest professional Romani theatre.",
    ],
    cta: { type: "history", slug: "russia", label: "Russia chapter" },
  },
  {
    id: "flamenco",
    year: "18th–19th c.",
    sort: 1800,
    era: "named",
    title: "Flamenco named",
    body: [
      "Romani people reached Spain in the fifteenth century. They became the Calé.",
      "By the eighteenth and nineteenth centuries, in Seville, Jerez, Cádiz and later Barcelona, a song form had a public name: flamenco.",
      "It is Andalusian. It is also Gitano.",
    ],
    cta: { type: "history", slug: "flamenco", label: "Flamenco chapter" },
  },
  {
    id: "lautari",
    year: "1850s",
    sort: 1856,
    era: "named",
    title: "The lăutar’s job",
    body: [
      "In Wallachia and Moldova the professional musician at a wedding is, more often than not, a Romani lăutar.",
      "The occupation outlived slavery in the principalities, abolished in the 1850s.",
      "A taraf is the working unit. Manele is a later urban room of the same profession.",
    ],
    cta: { type: "history", slug: "romania", label: "Romania chapter" },
  },
  {
    id: "east",
    year: "Long calendar",
    sort: 1900,
    era: "named",
    title: "Brass, clarinet, 9/8",
    body: [
      "In the southern Balkans Roma long held the outdoor pairing of zurla and tapan. Brass bands inherited the same calendar: weddings, feast days, funerals.",
      "Roman communities in western Turkey have been professional musicians since the Byzantine and Ottoman centuries.",
      "In the Turkish Republic a commercial dance genre took a public name: Roman oyun havası.",
    ],
    cta: { type: "history", slug: "balkans", label: "Balkans chapter" },
  },
  {
    id: "django",
    year: "1934",
    sort: 1934,
    era: "rooms",
    title: "Django and the Quintette",
    body: [
      "Jean “Django” Reinhardt, born into a Manouche family, fused the old Sinti family style with the American jazz he heard in Paris.",
      "With the Quintette du Hot Club de France he created a sound the wider world would recognise.",
      "Jams and concerts of this family sit on gypsyjazzhub.com. This archive keeps the history.",
    ],
    image: {
      src: "/media/django-reinhardt.jpg",
      alt: "Django Reinhardt",
    },
    cta: { type: "history", slug: "gypsy-jazz", label: "Gypsy jazz chapter" },
  },
  {
    id: "holland-hungary",
    year: "1935–1939",
    sort: 1935,
    era: "rooms",
    title: "Holland–Hungary",
    body: [
      "Hungarian Roma, Romanian Roma and Sinti families arrived in Dutch restaurants.",
      "They came for rooms that wanted a standing violin: csárdás, hora, Russian standards.",
      "Veres, Mirando and Serban played the same book. Three families, not one kinship.",
    ],
    cta: { type: "history", slug: "holland-hungary", label: "Holland–Hungary chapter" },
  },
  {
    id: "porajmos",
    year: "1939–1945",
    sort: 1939,
    era: "after",
    title: "The Porajmos",
    body: [
      "The music did not pass through the twentieth century unharmed.",
      "At Auschwitz-Birkenau a family camp held about twenty-three thousand. Almost none of them came home.",
      "This is why so many German Sinti players of the next generation treated Django’s tunes as survival, not nostalgia.",
    ],
    cta: { type: "history", slug: "origins", label: "Origins chapter" },
  },
  {
    id: "new-rooms",
    year: "1960s–1990s",
    sort: 1960,
    era: "after",
    title: "New rooms",
    body: [
      "Gitano Pentecostal churches, from the 1960s, made alabanzas — praise songs with a flamenco body and a gospel text.",
      "Kalyi Jag began in Hungary in 1978. Taraf de Haïdouks and Fanfare Ciocărlia walked a local professionalism onto festival stages in the 1990s.",
      "Manele grew fast after 1989. It is a later urban style, separate from the village taraf.",
      "Táncház in Hungary from the 1970s: village dance, next to the café book (The Fiddle Channel, 2020).",
    ],
    cta: { type: "history", slug: "transmission", label: "How the music is passed down" },
  },
  {
    id: "transmission",
    year: "Always",
    sort: 2000,
    era: "archive",
    title: "How the music is passed down",
    body: [
      "Most of this music never saw a microphone.",
      "It is learned by ear in the family. Weddings, taverns and restaurants taught the style.",
      "The family is the archive. Records are what reached a public.",
    ],
    cta: { type: "history", slug: "transmission", label: "Transmission chapter" },
  },
  {
    id: "archive",
    year: "Now",
    sort: 2026,
    era: "archive",
    title: "This archive",
    body: [
      "This site is an archive of Romani music.",
      "Romani musicians play in many countries. The music differs from country to country.",
      "The catalogue files history, families, artists, and styles. Jazz manouche also has its own site: gypsyjazzhub.com.",
    ],
    cta: { type: "page", to: "/work", label: "Open the catalogue" },
  },
  {
    id: "next",
    year: "Open",
    sort: 9999,
    era: "next",
    title: "Add a family",
    body: [
      "Musicians who want a family page can write here.",
      "Living families can send a memory, a date, a photograph.",
      "A page is published only after we record it under a family.",
    ],
    cta: { type: "page", to: "/contact", label: "Write to the archive" },
  },
];
