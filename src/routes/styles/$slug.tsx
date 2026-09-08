import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArchiveCrumb } from "@/components/crumb";
import { FiledMedia } from "@/components/filed-media";
import { SiteShell } from "@/components/site-shell";
import { familiesOfStyle, artistsOfStyleChrono, getChapter, getTradition } from "@/data/catalog";
import { mediaOf } from "@/data/media";
import { useI18n } from "@/i18n/provider";
import { locChapter, locFamily, locPlaces, locRole, locTradition } from "@/i18n/content";
import { GYPSY_JAZZ_HUB } from "@/lib/site";
import { pageHead } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { SITE_ORIGIN } from "@/lib/site";

export const Route = createFileRoute("/styles/$slug")({
  component: StylePage,
  loader: ({ params }) => {
    const style = getTradition(params.slug);
    if (!style) throw notFound();
    return { style };
  },
  head: ({ loaderData }) =>
    pageHead({
      title: loaderData?.style.name ?? "Style",
      description:
        loaderData?.style.summary ||
        (Array.isArray(loaderData?.style.about)
          ? loaderData?.style.about[0]
          : loaderData?.style.about) ||
        `${loaderData?.style.name} — a Romani music style in the archive.`,
      path: `/styles/${loaderData?.style.slug ?? ""}`,
    }),
});

function StylePage() {
  const { t, locale } = useI18n();
  const { style: raw } = Route.useLoaderData();
  const style = locTradition(raw, locale);
  const houses = familiesOfStyle(style.slug).map((f) => locFamily(f, locale));
  const chapterRaw = style.chapterSlug ? getChapter(style.chapterSlug) : getChapter(style.slug);
  const chapter = chapterRaw ? locChapter(chapterRaw, locale, t) : undefined;
  const players = artistsOfStyleChrono(style.slug);
  const hub = style.slug === "gypsy-jazz";

  return (
    <SiteShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: style.name,
          description: style.summary,
          url: `${SITE_ORIGIN}/styles/${style.slug}`,
          isPartOf: `${SITE_ORIGIN}/#website`,
        }}
      />
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <ArchiveCrumb style={{ slug: style.slug, name: style.name }} />
        <h1 className="font-display text-4xl text-fg">{style.name}</h1>
        {style.localNames?.length ? (
          <p className="mt-2 text-sm text-mark">{style.localNames.join(" · ")}</p>
        ) : null}
        {style.countries?.length ? (
          <p className="mt-4 font-display text-2xl leading-snug text-fg sm:text-3xl">
            {style.countries.join(" · ")}
          </p>
        ) : style.region ? (
          <p className="mt-4 font-display text-2xl leading-snug text-fg sm:text-3xl">{style.region}</p>
        ) : null}
        {style.summary ? (
          <p className="mt-6 text-lg leading-relaxed text-muted">{style.summary}</p>
        ) : null}
        <FiledMedia media={mediaOf(style.slug, style.chapterSlug)} />
        {(Array.isArray(style.about) ? style.about : style.about ? [style.about] : []).map((p) => (
          <p key={p.slice(0, 48)} className="mt-6 text-base leading-[1.7] text-fg/90">
            {p}
          </p>
        ))}
        {chapter ? (
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="font-display text-2xl text-fg">{t("styles.history")}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">{chapter.lede}</p>
            {chapter.sections.map((sec) => (
              <div key={sec.id ?? sec.title} className="mt-8">
                {sec.title ? (
                  <h3 className="font-display text-xl text-fg">{sec.title}</h3>
                ) : null}
                <div className="mt-3 space-y-3">
                  {sec.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)} className="text-base leading-[1.7] text-fg/90">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ) : null}
        {players.length ? (
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="font-display text-2xl text-fg">{t("styles.keyPlayers")}</h2>
            <ol className="timeline-container mt-8">
              {players.map((a, i) => (
                <li
                  key={a.slug}
                  className={i % 2 === 0 ? "timeline-item is-left" : "timeline-item is-right"}
                >
                  <Link to="/artists/$slug" params={{ slug: a.slug }} className="block no-underline">
                    <span className="date">{a.years ?? "—"}</span>
                    <h3 className="outline-none">{a.name}</h3>
                    {a.role || a.country || a.bio ? (
                      <ul className="timeline-sub">
                        {[locRole(a.role, locale), a.country ? locPlaces(a.country, locale) : undefined].filter(Boolean).length ? (
                          <li>{[locRole(a.role, locale), a.country ? locPlaces(a.country, locale) : undefined].filter(Boolean).join(" · ")}</li>
                        ) : null}
                        {a.bio ? <li>{a.bio}</li> : null}
                      </ul>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
        {hub ? (
          <section className="mt-12 border-t border-border pt-10">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-mark">
              Gypsy Jazz Hub
            </p>
            <p className="mt-2 font-display text-2xl text-fg">{t("hub.circle")}</p>
            <p className="mt-4 text-base leading-relaxed text-muted">{t("hub.names")}</p>
            <h2 className="mt-10 font-display text-2xl text-fg">{t("hub.lineage")}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              <li>
                <Link
                  to="/history/$slug"
                  params={{ slug: "gypsy-jazz" }}
                  className="flex h-full flex-col border border-border bg-surface p-4 no-underline hover:bg-raised"
                >
                  <span className="text-[0.65rem] tabular-nums tracking-wide text-mark">
                    1910–1953
                  </span>
                  <span className="mt-2 font-display text-lg text-fg">{t("hub.history")}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/artists/$slug"
                  params={{ slug: "django-reinhardt" }}
                  className="flex h-full flex-col border border-border bg-surface p-4 no-underline hover:bg-raised"
                >
                  <span className="text-[0.65rem] tabular-nums tracking-wide text-mark">
                    1910–1953
                  </span>
                  <span className="mt-2 font-display text-lg text-fg">Django</span>
                  <span className="mt-2 text-sm leading-relaxed text-muted">{t("hub.django")}</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/artists/$slug"
                  params={{ slug: "stephane-grappelli" }}
                  className="flex h-full flex-col border border-border bg-surface p-4 no-underline hover:bg-raised"
                >
                  <span className="text-[0.65rem] tabular-nums tracking-wide text-mark">
                    1908–1997
                  </span>
                  <span className="mt-2 font-display text-lg text-fg">Grappelli</span>
                  <span className="mt-2 text-sm leading-relaxed text-muted">{t("hub.grappelli")}</span>
                </Link>
              </li>
            </ul>
            <p className="mt-8 text-sm text-muted">{t("hub.circle")}</p>
            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <a href={GYPSY_JAZZ_HUB} className="text-fg underline">
                gypsyjazzhub.com
              </a>
              <a href={GYPSY_JAZZ_HUB} className="text-fg underline">
                {t("hub.board")}
              </a>
            </p>
          </section>
        ) : null}
        {houses.length ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl text-fg">{t("styles.familiesOf")}</h2>
            <ul className="mt-4 space-y-2">
              {houses.map((f) => (
                <li key={f.slug}>
                  <Link to="/families/$slug" params={{ slug: f.slug }} className="text-fg underline">
                    {f.name}
                  </Link>
                  <span className="text-faint"> — {f.origin}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {chapter ? (
          <p className="mt-10 text-sm">
            <Link to="/history/$slug" params={{ slug: chapter.slug }} className="text-fg underline">
              {t("styles.readChapter")}
            </Link>
          </p>
        ) : null}
      </article>
    </SiteShell>
  );
}
