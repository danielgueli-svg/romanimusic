import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { TRADITIONS, artistsOfStyleChrono } from "@/data/catalog";
import { useI18n } from "@/i18n/provider";
import { locTradition } from "@/i18n/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/styles/")({
  component: StylesIndex,
  head: () =>
    pageHead({
      title: `Styles of Romani music`,
      description:
        "Flamenco, jazz manouche, cigányzene, Balkan brass, lăutărească and other Romani styles. A short story for each. Named players.",
      path: "/styles",
    }),
});

function StylesIndex() {
  const { t, locale } = useI18n();
  const list = [...TRADITIONS]
    .map((s) => locTradition(s, locale))
    .sort((a, b) => a.name.localeCompare(b.name, locale));
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-mark">
          {t("styles.kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl text-fg">{t("styles.title")}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{t("styles.lede")}</p>
        <ol className="mt-12 space-y-10">
          {list.map((s) => {
            const players = artistsOfStyleChrono(s.slug).slice(0, 6);
            const where = s.countries?.length ? s.countries : s.region ? [s.region] : [];
            return (
              <li key={s.slug} className="border-t border-border pt-8">
                <h2 className="font-display text-2xl text-fg sm:text-3xl">
                  <Link
                    to="/styles/$slug"
                    params={{ slug: s.slug }}
                    className="text-fg no-underline hover:underline"
                  >
                    {s.name}
                  </Link>
                </h2>
                {s.localNames?.length ? (
                  <p className="mt-1 text-sm text-mark">{s.localNames.join(" · ")}</p>
                ) : null}
                {where.length ? (
                  <p className="mt-4 font-display text-xl leading-snug text-fg sm:text-2xl">
                    {where.join(" · ")}
                  </p>
                ) : null}
                {s.summary ? (
                  <p className="mt-4 text-base leading-relaxed text-fg/90">{s.summary}</p>
                ) : null}
                {players.length ? (
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {t("styles.namedPlayers")}:{" "}
                    {players.map((a, i) => (
                      <span key={a.slug}>
                        {i > 0 ? ", " : null}
                        <Link
                          to="/artists/$slug"
                          params={{ slug: a.slug }}
                          className="text-fg underline"
                        >
                          {a.name}
                        </Link>
                      </span>
                    ))}
                  </p>
                ) : null}
                <p className="mt-4 text-sm">
                  <Link
                    to="/styles/$slug"
                    params={{ slug: s.slug }}
                    className="text-fg underline"
                  >
                    {t("styles.open")}
                  </Link>
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </SiteShell>
  );
}
