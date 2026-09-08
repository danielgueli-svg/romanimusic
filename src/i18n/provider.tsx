import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { EN, type MsgKey } from "./en";
import { NL } from "./nl";
import { HU } from "./hu";
import { RO } from "./ro";
import { SR } from "./sr";
import { HR } from "./hr";
import { BS } from "./bs";
import { MK } from "./mk";
import { BG } from "./bg";
import { CS } from "./cs";
import { SK } from "./sk";
import { PL } from "./pl";
import { SL } from "./sl";
import { SQ } from "./sq";
import { RU } from "./ru";
import { DE } from "./de";
import { ES } from "./es";
import { PT } from "./pt";
import { IT } from "./it";
import { FR } from "./fr";
import {
  detectLocale,
  htmlLang,
  isLocale,
  type Locale,
} from "./locales";

export type { Locale };

const DICT: Record<Locale, Record<MsgKey, string>> = {
  en: EN,
  nl: NL,
  hu: HU,
  ro: RO,
  sr: SR,
  hr: HR,
  bs: BS,
  mk: MK,
  bg: BG,
  cs: CS,
  sk: SK,
  pl: PL,
  sl: SL,
  sq: SQ,
  ru: RU,
  de: DE,
  es: ES,
  pt: PT,
  it: IT,
  fr: FR,
};

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (k: MsgKey) => string;
};

const I18n = createContext<I18nValue>({
  locale: "en",
  setLocale: () => {},
  t: (k) => EN[k],
});

function storedLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem("rm-lang");
  if (isLocale(saved)) return saved;
  return detectLocale();
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    setLocaleState(storedLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = htmlLang(locale);
  }, [locale]);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale: (next) => {
        setLocaleState(next);
        window.localStorage.setItem("rm-lang", next);
      },
      t: (k) => DICT[locale]?.[k] ?? EN[k] ?? k,
    }),
    [locale],
  );

  return <I18n.Provider value={value}>{children}</I18n.Provider>;
}

export function useI18n() {
  return useContext(I18n);
}
