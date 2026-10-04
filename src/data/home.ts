/** Verbatim homepage copy. Do not invent. */

export const HOME_KICKER = "romanimusic.com · Netherlands";
export const HOME_H1 = "An archive of Romani music";
export const HOME_LEAD_1 =
  "Romani musicians play in many countries. The music is not the same in each one. Flamenco, jazz manouche, Hungarian csárdás, Balkan brass and lăutărească are different traditions, learned in families and played for a paying public.";
export const HOME_LEAD_2 =
  "This site records that difference: styles, family lines, countries, and the names people use for themselves — Roma, Sinti, Manouche, Calé, and others.";

export const HOME_ROOMS = [
  {
    kicker: "Chronicle",
    title: "History",
    body: "Four chapters: origins, names, Holland–Hungary, and how the music is passed down.",
    to: "/history" as const,
  },
  {
    kicker: "Dates",
    title: "Timeline",
    body: "Years on a line, taken from the chapters.",
    to: "/history/timeline" as const,
  },
  {
    kicker: "Rooms",
    title: "Style",
    body: "A short story for each style, then a larger page in year order.",
    to: "/styles" as const,
  },
  {
    kicker: "Lines",
    title: "Families",
    body: "Named lines that carried a style across generations — origin, lineage, orchestra years.",
    to: "/families" as const,
  },
  {
    kicker: "Register",
    title: "Artists",
    body: "One page per musician: dates, place, family, style.",
    to: "/artists" as const,
  },
  {
    kicker: "Netherlands",
    title: "Foundation",
    body: "A non-profit in the Netherlands. History first, then families, then artists.",
    to: "/foundation" as const,
  },
];

export const HOME_CHAPTERS = [
  {
    roman: "I",
    slug: "origins",
    title: "Origins and the long road",
    body: "An Indian origin, a westward road, and many musics — each one made in a country that tried to keep them at the edge of the map.",
  },
  {
    roman: "II",
    slug: "roma-sinti",
    title: "Roma, Sinti and Manouche",
    body: "Two self-names, not two spellings of the same people. The café book travelled farther than any surname.",
  },
  {
    roman: "III",
    slug: "holland-hungary",
    title: "The Holland–Hungary connection",
    body: "In the 1930s Hungarian Roma, Romanian Roma and Sinti violinists took the restaurant book into Dutch rooms.",
  },
  {
    roman: "IV",
    slug: "transmission",
    title: "How the music is passed down",
    body: "Most of this music never saw a microphone. The family is the archive. The records are what reached a public.",
  },
];

export const HOME_STYLES_H2 = "The music is not the same in every country.";
export const HOME_STYLES_BLURB =
  "Each style has a short story on the index, and a larger page for history and key players in year order. A Sinti family playing Hungarian tunes is still listed as Sinti. The setlist can match. The family origin is still Sinti.";

export const HOME_STYLES = [
  { slug: "alabanzas", name: "Alabanzas", where: "Spain · Portugal · France" },
  { slug: "balkan-brass", name: "Balkan brass & wedding", where: "Balkans" },
  { slug: "kaale", name: "Finnish Kaale song", where: "Finland · Sweden" },
  { slug: "flamenco", name: "Flamenco", where: "Spain · southern France" },
  { slug: "german-sinti-song", name: "German Sinti song", where: "Germany" },
  { slug: "gypsy-jazz", name: "Jazz manouche", where: "France · Low Countries" },
  { slug: "holland-hungary", name: "Holland–Hungary violin", where: "Netherlands · Hungary" },
  { slug: "hungarian", name: "Cigányzene", where: "Hungary" },
  { slug: "kalbelia", name: "Kalbelia", where: "Rajasthan" },
  { slug: "lautareasca", name: "Lăutărească", where: "Romania · Moldova" },
  { slug: "manele", name: "Manele", where: "Romania" },
  { slug: "reisende", name: "Reisende visor", where: "Norway · Sweden" },
];

export const HOME_SPEAKS =
  "Romani, Sinti, Manouche, Calé, Gitano, Roman are self-names. “Gypsy” is kept only where a style or a source still carries it — as in gypsy jazz, or on an old restaurant card — with that history in view.";
export const HOME_CONTRIBUTE =
  "Send a photo, a source, or a name. Musicians who want a family page can write here. A page is published only after we record it under a family.";
