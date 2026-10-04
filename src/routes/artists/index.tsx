import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { ARTISTS, artistCountries, getTradition, styleFilterKey } from "@/data/catalog";
import { useI18n } from "@/i18n/provider";
import { locPlaces, locRole } from "@/i18n/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/artists/")({
  component: ArtistsIndex,
  head: () =>
    pageHead({
      title: `Romani musicians`,
      description:
        "A register of Romani musicians, each with a page, filed under style and family.",
      path: "/artists",
    }),
});

function ArtistsIndex() {
  const { t, locale } = useI18n();
  const [style, setStyle] = useState("");
  const [country, setCountry] = useState("");

  const styleOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const a of ARTISTS) {
      const key = styleFilterKey(a.traditionSlug);
      if (!key || seen.has(key)) continue;
      const name = getTradition(key)?.name ?? key;
      seen.set(key, name);
    }
    return [...seen.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, []);

  const countryOptions = useMemo(() => {
    const set = new Set<string>();
    for (const a of ARTISTS) for (const c of artistCountries(a)) set.add(c);
    return [...set].sort((a, b) => a.localeCompare(b));
  }, []);

  const list = ARTISTS.filter((a) => {
    if (style && styleFilterKey(a.traditionSlug) !== style) return false;
    if (country && !artistCountries(a).includes(country)) return false;
    return true;
  });

  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-mark">
          {t("artists.kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl text-fg">{t("artists.title")}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{t("artists.lede")}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs text-muted">
            {t("families.style")}
            <select
              className="min-h-11 border border-border bg-surface px-3 text-sm text-fg"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="">{t("artists.allStyles")}</option>
              {styleOptions.map(([slug, name]) => (
                <option key={slug} value={slug}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs text-muted">
            {t("artists.country")}
            <select
              className="min-h-11 border border-border bg-surface px-3 text-sm text-fg"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">{t("artists.allCountries")}</option>
              {countryOptions.map((c) => (
                <option key={c} value={c}>
                  {locPlaces(c, locale)}
                </option>
              ))}
            </select>
          </label>
        </div>
        {list.length === 0 ? (
          <p className="mt-10 text-sm text-muted">{t("artists.empty")}</p>
        ) : (
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {list.map((a) => {
              const filedKey = styleFilterKey(a.traditionSlug);
              const filed = filedKey ? getTradition(filedKey) : undefined;
              return (
                <li key={a.slug} className="py-5">
                  <Link
                    to="/artists/$slug"
                    params={{ slug: a.slug }}
                    className="font-display text-xl text-fg no-underline hover:underline"
                  >
                    {a.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted">
                    {[a.years, locRole(a.role, locale), a.country ? locPlaces(a.country, locale) : undefined, filed?.name]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </SiteShell>
  );
}
