import {
  FAMILIES as FAMILIES_RAW,
  ORCHESTRA as ORCHESTRA_RAW,
  LINEAGE as LINEAGE_RAW,
  ARTISTS as ARTISTS_RAW,
  SOURCE_GROUPS as SOURCE_GROUPS_RAW,
  TRADITIONS as TRADITIONS_RAW,
  REGIONS as REGIONS_RAW,
  CHAPTERS as CHAPTERS_RAW,
  LATER_GROUPS as LATER_GROUPS_RAW,
  CONCERTS as CONCERTS_RAW,
} from "./_generated";
import {
  ARTIST_PATCHES,
  FAMILY_PATCHES,
  LINEAGE_PATCHES,
  NEW_ARTISTS,
  NEW_HOUSES,
  NEW_LATER,
  NEW_SOURCES,
  ORCHESTRA_PATCHES,
  type SourceQuote,
} from "./patches";

export type FamilyMember = {
  name: string;
  years?: string;
  role?: string;
  artistSlug?: string;
  note?: string;
};

export type FamilyHouse = {
  slug: string;
  name: string;
  catalog: string;
  alsoKnown?: string;
  chapterSlug?: string;
  traditionSlug: string;
  alsoTraditionSlugs?: string[];
  origin: string;
  summary: string;
  history: string[];
  members: FamilyMember[];
  quotes?: SourceQuote[];
};

export type OrchestraEvent = {
  year: string;
  sort: number;
  kind: string;
  band: string;
  title: string;
  body: string;
  familySlug: string;
};

export type LineageExtra = {
  generation?: number;
  born?: string;
  died?: string;
  bornPlace?: string;
  diedPlace?: string;
  bio?: string;
};

export type Artist = {
  slug: string;
  name: string;
  years?: string;
  role?: string;
  country?: string;
  traditionSlug?: string;
  bio?: string;
  photo?: string;
};

export type Tradition = {
  slug: string;
  catalog?: string;
  name: string;
  localNames?: string[];
  region?: string;
  regionSlug?: string;
  countries?: string[];
  summary?: string;
  about?: string | string[];
  instruments?: string[];
  forms?: string[];
  artistSlugs?: string[];
  related?: { slug: string; label: string }[];
  chapterSlug?: string;
  sisterHub?: { label: string; href: string };
};

export type Chapter = {
  slug: string;
  catalog?: string;
  title: string;
  lede: string;
  traditionSlug?: string;
  related?: { slug: string; label: string }[];
  sections: { id?: string; kicker?: string; title?: string; heading?: string; paragraphs: string[] }[];
};

const BASE_FAMILIES = FAMILIES_RAW as unknown as FamilyHouse[];
export const FAMILIES: FamilyHouse[] = [
  ...BASE_FAMILIES.map((f) => {
    const patch = FAMILY_PATCHES[f.slug] as Partial<FamilyHouse> | undefined;
    return patch ? { ...f, ...patch } : f;
  }),
  ...(NEW_HOUSES as FamilyHouse[]),
];

export const ORCHESTRA = {
  ...(ORCHESTRA_RAW as unknown as Record<string, Omit<OrchestraEvent, "familySlug">[]>),
  ...(ORCHESTRA_PATCHES as Record<string, Omit<OrchestraEvent, "familySlug">[]>),
};

export const LINEAGE = {
  ...(LINEAGE_RAW as unknown as Record<string, LineageExtra>),
  ...(LINEAGE_PATCHES as Record<string, LineageExtra>),
};

const BASE_ARTISTS = ARTISTS_RAW as unknown as Artist[];
export const ARTISTS: Artist[] = [
  ...BASE_ARTISTS.map((a) => {
    const patch = ARTIST_PATCHES[a.slug] as Partial<Artist> | undefined;
    return patch ? { ...a, ...patch } : a;
  }),
  ...(NEW_ARTISTS as Artist[]).filter((n) => !BASE_ARTISTS.some((a) => a.slug === n.slug)),
];

export const SOURCE_GROUPS = (SOURCE_GROUPS_RAW as unknown as {
  id: string;
  title: string;
  lede?: string;
  items: {
    id: string;
    kind?: string;
    title: string;
    credit?: string;
    year?: string;
    place?: string;
    url?: string;
    used?: string;
  }[];
}[]).map((g) => {
  const extra = NEW_SOURCES.filter((s) => s.group === g.id).flatMap((s) => s.items);
  const ids = new Set(g.items.map((i) => i.id));
  return { ...g, items: [...extra.filter((i) => !ids.has(i.id)), ...g.items] };
});

export const TRADITIONS = TRADITIONS_RAW as unknown as Tradition[];
export const REGIONS = REGIONS_RAW as unknown as {
  slug: string;
  name: string;
  kicker?: string;
  chapterSlug?: string;
}[];
export const CHAPTERS = CHAPTERS_RAW as unknown as Chapter[];

export const LATER_GROUPS = (LATER_GROUPS_RAW as unknown as {
  id: string;
  title: string;
  lede?: string;
  items: Record<string, unknown>[];
}[]).map((g) => {
  const extra = NEW_LATER[g.id] ?? [];
  const ids = new Set(g.items.map((i) => String((i as { id?: string }).id ?? "")));
  return { ...g, items: [...g.items, ...extra.filter((i) => !ids.has(i.id))] };
});

export const CONCERTS = CONCERTS_RAW as unknown as Concert[];

export type Concert = {
  id: string;
  start: string;
  end?: string;
  title: string;
  artist?: string;
  city?: string;
  country?: string;
  styleSlug?: string;
  venue?: string;
  url?: string;
  source?: string;
  note?: string;
};

const CONCERT_ARTIST_SLUG: Record<string, string> = {
  "Fanfare Ciocărlia": "fanfare-ciocarlia",
  "100 Tagú Cigányzenekar": "hundred-tagu",
  "100 Tagú Cigányzenekar Hangversenyzenekara": "hundred-tagu",
};

export function concertsForArtist(slug: string, name?: string) {
  return CONCERTS.filter((c) => {
    if (!c.artist) return false;
    if (CONCERT_ARTIST_SLUG[c.artist] === slug) return true;
    if (name && c.artist === name) return true;
    return false;
  }).sort((a, b) => a.start.localeCompare(b.start));
}

export const HISTORY_INDEX_SLUGS = [
  "origins",
  "roma-sinti",
  "holland-hungary",
  "transmission",
] as const;

export function getFamily(slug: string) {
  return FAMILIES.find((f) => f.slug === slug);
}
export function getTradition(slug: string) {
  return TRADITIONS.find((t) => t.slug === slug);
}
/** Artist style filter: Holland–Hungary is the same café book as Hungarian Romani music. */
export function styleFilterKey(traditionSlug?: string) {
  if (!traditionSlug) return undefined;
  if (traditionSlug === "holland-hungary") return "hungarian";
  return traditionSlug;
}
export function getChapter(slug: string) {
  return CHAPTERS.find((c) => c.slug === slug);
}
export function getArtist(slug: string) {
  return ARTISTS.find((a) => a.slug === slug);
}
export function familiesOfStyle(slug: string) {
  return FAMILIES.filter(
    (f) => f.traditionSlug === slug || f.alsoTraditionSlugs?.includes(slug),
  );
}
export function artistsOfStyle(slug: string) {
  const tradition = getTradition(slug);
  const seen = new Set<string>();
  const out: Artist[] = [];
  for (const s of tradition?.artistSlugs ?? []) {
    const a = getArtist(s);
    if (a && !seen.has(a.slug)) {
      seen.add(a.slug);
      out.push(a);
    }
  }
  for (const a of ARTISTS) {
    if (a.traditionSlug === slug && !seen.has(a.slug)) {
      seen.add(a.slug);
      out.push(a);
    }
  }
  return out;
}
export function yearSortValue(years?: string) {
  if (!years) return 9999;
  const y = years.toLowerCase();
  const four = years.match(/(\d{4})/);
  if (four) return Number(four[1]);
  if (/19th/.test(y)) return 1800;
  if (/late 20th/.test(y)) return 1975;
  if (/20th/.test(y)) return 1900;
  if (/21st/.test(y)) return 2000;
  const three = years.match(/(\d{3})/);
  return three ? Number(three[1]) : 9999;
}
export function artistsOfStyleChrono(slug: string) {
  return [...artistsOfStyle(slug)].sort((a, b) => {
    const dy = yearSortValue(a.years) - yearSortValue(b.years);
    return dy !== 0 ? dy : a.name.localeCompare(b.name);
  });
}
export function orchestraFor(slug: string): OrchestraEvent[] {
  return (ORCHESTRA[slug] ?? []).map((e) => ({ ...e, familySlug: slug }));
}
export function familyCountry(f: FamilyHouse) {
  const o = f.origin.toLowerCase();
  if (o.includes("nether")) return "Netherlands";
  if (o.includes("slovak")) return "Slovakia";
  if (o.includes("hungary") || o.includes("hungarian")) return "Hungary";
  if (o.includes("romania") || o.includes("clejani") || o.includes("prăjini") || o.includes("prahova") || o.includes("bucharest"))
    return "Romania";
  if (o.includes("spain") || o.includes("gitano") || o.includes("calé") || o.includes("cale"))
    return "Spain";
  if (o.includes("france") || o.includes("manouche") || o.includes("paris")) return "France";
  if (o.includes("serb")) return "Serbia";
  if (o.includes("macedonia") || o.includes("skopje")) return "North Macedonia";
  if (o.includes("russia")) return "Russia";
  if (o.includes("turkey") || o.includes("thrace")) return "Turkey";
  if (o.includes("finland") || o.includes("kaale")) return "Finland";
  if (o.includes("austria")) return "Austria";
  if (o.includes("czech")) return "Czechia";
  if (o.includes("belgium")) return "Belgium";
  if (o.includes("german")) return "Germany";
  return f.origin.split("—")[0]?.trim() || f.origin;
}
export function artistCountries(a: Artist): string[] {
  const raw = (a.country ?? "").toLowerCase();
  if (!raw) return [];
  const found: string[] = [];
  const add = (label: string) => {
    if (!found.includes(label)) found.push(label);
  };
  if (raw.includes("nether")) add("Netherlands");
  if (raw.includes("hungary") || raw.includes("hungarian")) add("Hungary");
  if (raw.includes("romania") || raw.includes("clejani") || raw.includes("prăjini")) add("Romania");
  if (raw.includes("spain")) add("Spain");
  if (raw.includes("france") || raw.includes("alsace")) add("France");
  if (raw.includes("germany") || raw.includes("german")) add("Germany");
  if (raw.includes("belgium")) add("Belgium");
  if (raw.includes("switzerland")) add("Switzerland");
  if (raw.includes("russia")) add("Russia");
  if (raw.includes("turkey") || raw.includes("thrace")) add("Turkey");
  if (raw.includes("north macedonia") || raw.includes("macedonia")) add("North Macedonia");
  if (raw.includes("serbia") || raw.includes("niš")) add("Serbia");
  if (raw.includes("bulgaria")) add("Bulgaria");
  if (raw.includes("norway")) add("Norway");
  if (raw.includes("finland")) add("Finland");
  if (raw.includes("slovak")) add("Slovakia");
  if (raw.includes("czech")) add("Czechia");
  return found;
}
export function neighboursOf(family: FamilyHouse) {
  const country = familyCountry(family);
  return FAMILIES.filter(
    (f) => f.slug !== family.slug && familyCountry(f) === country,
  ).slice(0, 8);
}
export function lineageOf(family: FamilyHouse) {
  return family.members.map((m, i) => {
    const extra = m.artistSlug ? LINEAGE[m.artistSlug] : undefined;
    return {
      name: m.name,
      role: m.role,
      years: m.years,
      artistSlug: m.artistSlug,
      note: m.note,
      generation: extra?.generation ?? i + 1,
      born: extra?.born,
      died: extra?.died,
      bornPlace: extra?.bornPlace,
      diedPlace: extra?.diedPlace,
      bio: extra?.bio ?? m.note,
    };
  });
}