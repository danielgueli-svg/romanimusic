import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/i18n/provider";
import { LOCALE_META, isLocale, type Locale } from "@/i18n/locales";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  const nav = [
    { to: "/history" as const, label: t("nav.history") },
    { to: "/styles" as const, label: t("nav.styles") },
    { to: "/families" as const, label: t("nav.families") },
    { to: "/artists" as const, label: t("nav.artists") },
    { to: "/events" as const, label: t("nav.events") },
    { to: "/foundation" as const, label: t("nav.foundation") },
    { to: "/contact" as const, label: t("nav.contact") },
  ] as const;

  return (
    <header className="border-b border-rule bg-paper">
      <div className="relative mx-auto max-w-5xl px-5 py-7 sm:py-9">
        <button
          type="button"
          className="absolute right-5 top-7 z-10 inline-flex min-h-11 min-w-11 items-center justify-center text-ink md:hidden"
          aria-expanded={open}
          aria-label={open ? t("nav.close") : t("nav.menu")}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <Link
          to="/"
          className="mx-auto block text-center no-underline"
          onClick={() => setOpen(false)}
        >
          <span className="sr-only">Romani Music</span>
          <span className="inline-flex flex-col items-center">
            <span className="block h-px w-full bg-ink/80" />
            <span className="mt-2 font-display text-[2.35rem] leading-[0.92] tracking-[0.06em] text-ink sm:text-5xl md:text-6xl">
              ROMANI
            </span>
            <span className="font-display text-[2.35rem] leading-[0.92] tracking-[0.06em] text-ink sm:text-5xl md:text-6xl">
              MUSIC
            </span>
            <span className="mt-2 block h-px w-full bg-ink/80" />
          </span>
        </Link>
        <div className="mt-3 flex justify-center">
          <LangSwitch />
        </div>
        <nav
          aria-label={t("nav.primary")}
          className="mt-6 hidden justify-center gap-x-6 gap-y-2 text-sm md:flex"
        >
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-ink/80 no-underline underline-offset-4 hover:text-accent hover:underline"
              activeProps={{ className: "text-accent" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className={cn("border-t border-rule md:hidden", open ? "block" : "hidden")}>
        <nav className="flex flex-col px-5 py-2" aria-label={t("nav.mobile")}>
          {nav.map((item) => (
            <Link
              key={`${item.to}-m`}
              to={item.to}
              className="flex min-h-11 items-center text-sm text-ink no-underline"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function LangSwitch() {
  const { locale, setLocale, t } = useI18n();
  const east = LOCALE_META.filter((l) => l.group === "east");
  const west = LOCALE_META.filter((l) => l.group === "west");
  return (
    <label className="inline-flex min-h-11 items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted">
      <span className="sr-only">{t("lang.label")}</span>
      <select
        value={locale}
        onChange={(e) => {
          const v = e.target.value;
          if (isLocale(v)) setLocale(v as Locale);
        }}
        className="min-h-11 max-w-[16rem] border border-rule bg-paper px-2 text-center text-[12px] tracking-normal text-ink"
        aria-label={t("lang.label")}
      >
        {east.map((l) => (
          <option key={l.code} value={l.code}>
            {l.native}
          </option>
        ))}
        <option disabled>────────</option>
        {west.map((l) => (
          <option key={l.code} value={l.code}>
            {l.native}
          </option>
        ))}
      </select>
    </label>
  );
}
