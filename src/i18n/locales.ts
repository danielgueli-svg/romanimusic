export const LOCALE_META = [
  { code: "hu", native: "Magyar", html: "hu", group: "east" },
  { code: "ro", native: "Română", html: "ro", group: "east" },
  { code: "sr", native: "Srpski", html: "sr", group: "east" },
  { code: "hr", native: "Hrvatski", html: "hr", group: "east" },
  { code: "bs", native: "Bosanski", html: "bs", group: "east" },
  { code: "mk", native: "Македонски", html: "mk", group: "east" },
  { code: "bg", native: "Български", html: "bg", group: "east" },
  { code: "cs", native: "Čeština", html: "cs", group: "east" },
  { code: "sk", native: "Slovenčina", html: "sk", group: "east" },
  { code: "pl", native: "Polski", html: "pl", group: "east" },
  { code: "sl", native: "Slovenščina", html: "sl", group: "east" },
  { code: "sq", native: "Shqip", html: "sq", group: "east" },
  { code: "ru", native: "Русский", html: "ru", group: "east" },
  { code: "es", native: "Español", html: "es", group: "west" },
  { code: "pt", native: "Português", html: "pt", group: "west" },
  { code: "it", native: "Italiano", html: "it", group: "west" },
  { code: "fr", native: "Français", html: "fr", group: "west" },
  { code: "de", native: "Deutsch", html: "de", group: "west" },
  { code: "en", native: "English", html: "en", group: "west" },
  { code: "nl", native: "Nederlands", html: "nl", group: "west" },
] as const;

export type Locale = (typeof LOCALE_META)[number]["code"];

export const LOCALE_CODES = LOCALE_META.map((l) => l.code) as Locale[];

export function isLocale(v: string | null | undefined): v is Locale {
  return !!v && (LOCALE_CODES as string[]).includes(v);
}

export function htmlLang(locale: Locale): string {
  return LOCALE_META.find((l) => l.code === locale)?.html ?? "en";
}

/** First visit: browser language if we file it. Else English. */
export function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const wanted = [navigator.language, ...(navigator.languages ?? [])];
  for (const raw of wanted) {
    const tag = raw.toLowerCase();
    const short = tag.slice(0, 2);
    if (short === "sh" || tag.startsWith("sr")) return "sr";
    if (isLocale(short)) return short;
  }
  return "en";
}
