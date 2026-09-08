import type { Chapter, FamilyHouse, Tradition } from "@/data/catalog";
import type { Festival } from "@/data/festivals";
import type { StoryNode } from "@/data/story";
import type { MsgKey } from "./en";
import type { Locale } from "./locales";
import { NL_CHAPTERS } from "./content-nl";
import { NL_CHAPTERS_MORE } from "./content-nl-more";
import { NL_SURFACE } from "./content-surface-nl";
import { NL_FAMILY_HISTORY } from "./content-surface-hist-nl";

export type SectionPack = { title?: string; paragraphs?: string[] };
export type ChapterPack = {
  title?: string;
  lede?: string;
  sections?: Record<string, SectionPack>;
};
export type StoryPack = { title?: string; body?: string[]; cta?: string };
export type TraditionPack = { summary?: string; about?: string[] };
export type SurfacePack = {
  traditions?: Record<string, TraditionPack>;
  families?: Record<string, string>;
  familyHistory?: Record<string, string[]>;
  festivals?: Record<string, { body?: string; month?: string; place?: string }>;
  countries?: Record<string, string>;
  sources?: Record<string, { title?: string; lede?: string }>;
  later?: Record<string, { title?: string; lede?: string }>;
  roles?: Record<string, string>;
  labels?: Record<string, string>;
};

const CHAPTER_PACKS: Partial<Record<Locale, Record<string, ChapterPack>>> = {
  nl: { ...NL_CHAPTERS, ...NL_CHAPTERS_MORE },
};

const SURFACE: Partial<Record<Locale, SurfacePack>> = {
  nl: { ...NL_SURFACE, familyHistory: NL_FAMILY_HISTORY },
};

export const CHAPTER_TITLE_KEY: Record<string, MsgKey> = {
  origins: "home.chI.title",
  "roma-sinti": "home.chII.title",
  "holland-hungary": "home.chIII.title",
  transmission: "home.chIV.title",
};

export const CHAPTER_TEASER_KEY: Record<string, MsgKey> = {
  origins: "home.chI.body",
  "roma-sinti": "home.chII.body",
  "holland-hungary": "home.chIII.body",
  transmission: "home.chIV.body",
};

export function locChapter(
  ch: Chapter,
  locale: Locale,
  t: (k: MsgKey) => string,
): Chapter {
  const pack = CHAPTER_PACKS[locale]?.[ch.slug];
  const titleKey = CHAPTER_TITLE_KEY[ch.slug];
  const teaserKey = CHAPTER_TEASER_KEY[ch.slug];
  return {
    ...ch,
    title:
      pack?.title ??
      (titleKey ? t(titleKey) : ch.slug === "hungary" ? t("history.hungaryChapter") : ch.title),
    lede: pack?.lede ?? (teaserKey ? t(teaserKey) : ch.lede),
    sections: ch.sections.map((s) => {
      const sp = pack?.sections?.[s.id ?? ""];
      if (!sp) {
        return {
          ...s,
          title: s.title ? locPlaces(s.title, locale) : s.title,
          paragraphs: s.paragraphs.map((p) => locPlaces(p, locale)),
        };
      }
      return {
        ...s,
        title: sp.title ?? s.title,
        paragraphs: sp.paragraphs ?? s.paragraphs,
      };
    }),
  };
}

export function locPlaces(text: string, locale: Locale): string {
  const map = SURFACE[locale]?.countries;
  if (!map) return text;
  let out = text;
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  for (const en of keys) {
    out = out.replaceAll(en, map[en]);
  }
  return out;
}

export function locLabel(text: string, locale: Locale): string {
  return SURFACE[locale]?.labels?.[text] ?? locPlaces(text, locale);
}

export function locRole(text: string | undefined, locale: Locale): string | undefined {
  if (!text) return text;
  const map = SURFACE[locale]?.roles;
  if (!map) return text;
  if (map[text]) return map[text];
  let out = text;
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  for (const en of keys) {
    out = out.replaceAll(en, map[en]);
  }
  return out;
}

export function locTradition(tr: Tradition, locale: Locale): Tradition {
  const p = SURFACE[locale]?.traditions?.[tr.slug];
  if (!p) {
    return {
      ...tr,
      region: tr.region ? locPlaces(tr.region, locale) : tr.region,
      countries: tr.countries?.map((c) => locPlaces(c, locale)),
    };
  }
  return {
    ...tr,
    summary: p.summary ?? tr.summary,
    about: p.about ?? tr.about,
    region: tr.region ? locPlaces(tr.region, locale) : tr.region,
    countries: tr.countries?.map((c) => locPlaces(c, locale)),
  };
}

export function locFamily(f: FamilyHouse, locale: Locale): FamilyHouse {
  const summary = SURFACE[locale]?.families?.[f.slug];
  const history = SURFACE[locale]?.familyHistory?.[f.slug];
  return {
    ...f,
    summary: summary ?? f.summary,
    origin: locPlaces(f.origin, locale),
    history: history ?? f.history.map((p) => locPlaces(p, locale)),
    members: f.members.map((m) => ({
      ...m,
      role: locRole(m.role, locale),
      note: m.note ? locPlaces(m.note, locale) : m.note,
    })),
  };
}

export function locFestival(f: Festival, locale: Locale): Festival {
  const p = SURFACE[locale]?.festivals?.[f.id];
  return {
    ...f,
    body: p?.body ?? f.body,
    month: p?.month ?? f.month,
    place: p?.place ?? locPlaces(f.place, locale),
  };
}

export function locSourceGroup<T extends { id: string; title: string; lede?: string }>(
  g: T,
  locale: Locale,
): T {
  const p = SURFACE[locale]?.sources?.[g.id];
  if (!p) {
    return {
      ...g,
      title: locPlaces(g.title, locale),
      lede: g.lede ? locPlaces(g.lede, locale) : g.lede,
    };
  }
  return {
    ...g,
    title: p.title ?? g.title,
    lede: p.lede ?? g.lede,
  };
}

export function locLaterGroup<T extends { id: string; title: string; lede?: string }>(
  g: T,
  locale: Locale,
): T {
  const p = SURFACE[locale]?.later?.[g.id];
  if (!p) {
    return {
      ...g,
      title: locPlaces(g.title, locale),
      lede: g.lede ? locPlaces(g.lede, locale) : g.lede,
    };
  }
  return {
    ...g,
    title: p.title ?? g.title,
    lede: p.lede ?? g.lede,
  };
}

const NL_STORY: Record<string, StoryPack> = {
  india: {
    title: "Noordwest-India",
    body: [
      "Taal- en genetisch onderzoek wijst op een oorsprong in noordwest-India, meer dan duizend jaar geleden.",
      "Romani is een Indo-Arische taal.",
      "Er is geen overgeleverde oorspronkelijke Romani-muziek die als fossiel kan klinken.",
    ],
    cta: "Hoofdstuk oorsprong",
  },
  europe: {
    title: "Opgeschreven in Europa",
    body: [
      "In 1417 wordt een groep in Hildesheim genoemd.",
      "In 1420 staan ze in de Nederlanden en België.",
      "In 1427 komt een grotere groep bij Parijs aan.",
    ],
    cta: "Hoofdstuk oorsprong",
  },
  bihari: {
    title: "De restaurantviool",
    body: [
      "Czinka Panna (1711–1772) was een genoemde Romani-bandleidster in het koninkrijk Hongarije.",
      "János Bihari (1764–1827) is de genoemde voorouder van de Hongaarse restaurantviool.",
      "Verbunkos groeide als wervingsdans. De csárdás is de publieke dansvorm.",
    ],
    cta: "Hoofdstuk Hongarije",
  },
  russia: {
    title: "Koren en zeven snaren",
    body: [
      "Vanaf de late achttiende eeuw werden Romani-koren een Russische mode.",
      "De zevensnarige gitaar was het huisinstrument van die wereld.",
      "Theater Romen in Moskou, opgericht in 1931, is het oudste professionele Romani-theater.",
    ],
    cta: "Hoofdstuk Rusland",
  },
  flamenco: {
    title: "Flamenco benoemd",
    body: [
      "Romani-mensen bereikten Spanje in de vijftiende eeuw. Zij werden de Calé.",
      "In de achttiende en negentiende eeuw kreeg in Sevilla, Jerez, Cádiz en later Barcelona een zangvorm een publieke naam: flamenco.",
      "Het is Andalusisch. Het is ook Gitano.",
    ],
    cta: "Hoofdstuk flamenco",
  },
  lautari: {
    title: "Het werk van de lăutar",
    body: [
      "In Walachije en Moldavië is de professionele muzikant op een bruiloft vaker wel dan niet een Romani-lăutar.",
      "Het beroep overleefde de slavernij in de vorstendommen, afgeschaft in de jaren 1850.",
      "Een taraf is de werkende eenheid. Manele is een latere stedelijke zaal van hetzelfde vak.",
    ],
    cta: "Hoofdstuk Roemenië",
  },
  east: {
    title: "Brass, klarinet, 9/8",
    body: [
      "Op de zuidelijke Balkan droegen Roma lang het buitenpaar zurla en tapan. Brassbands erfden dezelfde kalender: bruiloften, feestdagen, begrafenissen.",
      "Roman-gemeenschappen in westelijk Turkije zijn sinds de Byzantijnse en Ottomaanse eeuwen beroepsmuzikanten.",
      "In de Turkse republiek kreeg een commerciële dansvorm een publieke naam: Roman oyun havası.",
    ],
    cta: "Hoofdstuk Balkan",
  },
  django: {
    title: "Django en het Quintette",
    body: [
      "Jean “Django” Reinhardt, geboren in een Manouche-familie, voegde de oude Sinti-familietaal samen met de Amerikaanse jazz die hij in Parijs hoorde.",
      "Met het Quintette du Hot Club de France maakte hij een klank die de wijdere wereld herkende.",
      "Jams en concerten van deze familie staan op gypsyjazzhub.com. Dit archief bewaart de geschiedenis.",
    ],
    cta: "Hoofdstuk gypsy jazz",
  },
  "holland-hungary": {
    title: "Holland–Hongarije",
    body: [
      "Hongaarse Roma, Roemeense Roma en Sinti-families kwamen in Nederlandse restaurants.",
      "Zij kwamen voor zalen die een staande violist wilden: csárdás, hora, Russische standaards.",
      "Veres, Mirando en Serban speelden hetzelfde boek. Drie families, geen één verwantschap.",
    ],
    cta: "Hoofdstuk Holland–Hongarije",
  },
  porajmos: {
    title: "De Porajmos",
    body: [
      "De muziek ging niet ongedeerd door de twintigste eeuw.",
      "In Auschwitz-Birkenau hield een familiekamp ongeveer drieëntwintigduizend mensen. Bijna niemand keerde terug.",
      "Daarom behandelden zoveel Duitse Sinti-spelers van de volgende generatie Django’s stukken als overleven, niet als nostalgie.",
    ],
    cta: "Hoofdstuk oorsprong",
  },
  "new-rooms": {
    title: "Nieuwe zalen",
    body: [
      "Gitano-pinksterkerken maakten vanaf de jaren zestig alabanzas — lofzangen met een flamencolijf en een gospeltekst.",
      "Kalyi Jag begon in Hongarije in 1978. Taraf de Haïdouks en Fanfare Ciocărlia zetten lokaal vakmanschap in de jaren negentig op festivalpodia.",
      "Manele groeide snel na 1989. Het is een latere stedelijke stijl, los van het dorps-taraf.",
      "Táncház in Hongarije vanaf de jaren zeventig: dorpsdans, naast het caféboek (The Fiddle Channel, 2020).",
    ],
    cta: "Hoe de muziek wordt doorgegeven",
  },
  transmission: {
    title: "Hoe de muziek wordt doorgegeven",
    body: [
      "Het grootste deel van deze muziek heeft nooit een microfoon gezien.",
      "Het wordt op het gehoor geleerd in de familie. Bruiloften, herbergen en restaurants leerden de stijl.",
      "De familie is het archief. Platen zijn wat een publiek bereikte.",
    ],
    cta: "Hoofdstuk overdracht",
  },
  archive: {
    title: "Dit archief",
    body: [
      "Dit is een archief van Romani-muziek.",
      "Romani-muzikanten spelen in veel landen. De muziek verschilt van land tot land.",
      "De catalogus dient geschiedenis, families, artiesten en stijlen in. Jazz manouche heeft ook een eigen site: gypsyjazzhub.com.",
    ],
    cta: "Open de catalogus",
  },
  next: {
    title: "Een familie toevoegen",
    body: [
      "Muzikanten die een familiepagina willen, schrijven hier.",
      "Levende families kunnen een herinnering, een datum, een foto sturen.",
      "Een pagina gaat pas online als we die onder een familie hebben opgenomen.",
    ],
    cta: "Schrijf naar het archief",
  },
};

const STORY_PACKS: Partial<Record<Locale, Record<string, StoryPack>>> = {
  nl: NL_STORY,
};

export function locStory(node: StoryNode, locale: Locale): StoryNode {
  const pack = STORY_PACKS[locale]?.[node.id];
  if (!pack) return node;
  return {
    ...node,
    title: pack.title ?? node.title,
    body: pack.body ?? node.body,
    cta: { ...node.cta, label: pack.cta ?? node.cta.label },
  };
}
