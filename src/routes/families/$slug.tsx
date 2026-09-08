import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArchiveCrumb } from "@/components/crumb";
import { FiledMedia } from "@/components/filed-media";
import { LineageTimeline } from "@/components/lineage-timeline";
import { OrchestraTimeline } from "@/components/orchestra-timeline";
import { SiteShell } from "@/components/site-shell";
import {
  getFamily,
  getTradition,
  lineageOf,
  neighboursOf,
  orchestraFor,
} from "@/data/catalog";
import { useI18n } from "@/i18n/provider";
import { locFamily, locTradition } from "@/i18n/content";
import { pageHead } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { SITE_ORIGIN } from "@/lib/site";
import { mediaOf } from "@/data/media";

export const Route = createFileRoute("/families/$slug")({
  component: FamilyPage,
  loader: ({ params }) => {
    const family = getFamily(params.slug);
    if (!family) throw notFound();
    return { family };
  },
  head: ({ loaderData }) =>
    pageHead({
      title: loaderData?.family.name ?? "Family",
      description: loaderData?.family.summary,
      path: `/families/${loaderData?.family.slug ?? ""}`,
    }),
});

function FamilyPage() {
  const { t, locale } = useI18n();
  const { family: raw } = Route.useLoaderData();
  const family = locFamily(raw, locale);
  const traditionRaw = getTradition(family.traditionSlug);
  const tradition = traditionRaw ? locTradition(traditionRaw, locale) : undefined;
  const lineage = lineageOf(family);
  const orchestra = orchestraFor(family.slug);
  const neighbours = neighboursOf(family).map((n) => locFamily(n, locale));

  return (
    <SiteShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MusicGroup",
          name: family.name,
          description: family.summary,
          url: `${SITE_ORIGIN}/families/${family.slug}`,
          genre: tradition?.name,
        }}
      />
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <ArchiveCrumb
          style={tradition ? { slug: tradition.slug, name: tradition.name } : undefined}
          house={{ slug: family.slug, name: family.name }}
        />
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-mark">
          {t("families.house")}
          {family.catalog ? ` ${family.catalog}` : ""}
        </p>
        <h1 className="mt-3 font-display text-4xl text-fg sm:text-5xl">{family.name}</h1>
        {family.alsoKnown ? <p className="mt-3 text-sm text-muted">{family.alsoKnown}</p> : null}
        <p className="mt-2 text-sm text-faint">{family.origin}</p>
        {tradition ? (
          <p className="mt-3 text-sm text-muted">
            {t("families.style")}:{" "}
            <Link
              to="/styles/$slug"
              params={{ slug: tradition.slug }}
              className="text-fg underline"
            >
              {tradition.name}
            </Link>
          </p>
        ) : null}
        <p className="mt-6 text-lg leading-relaxed text-muted">{family.summary}</p>
        <FiledMedia media={mediaOf(family.slug)} />

        <div className="mt-10 space-y-5">
          {family.history.map((p) => (
            <p key={p.slice(0, 48)} className="text-base leading-[1.7] text-fg/90">
              {p}
            </p>
          ))}
        </div>

        {family.quotes?.length ? (
          <section className="mt-10 space-y-4">
            {family.quotes.map((q) => (
              <figure key={q.original.slice(0, 40)} className="border-l-2 border-mark pl-4">
                <p lang={q.lang} className="text-base leading-[1.7] text-fg">
                  {q.original}
                </p>
                {q.lang !== locale ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {locale === "nl" && q.nl ? q.nl : q.en}
                  </p>
                ) : null}
                <figcaption className="mt-2 text-xs text-faint">{q.credit}</figcaption>
              </figure>
            ))}
          </section>
        ) : null}

        <section className="mt-12">
          <h2 className="font-display text-2xl text-fg">{t("lineage.title")}</h2>
          <p className="mt-2 text-sm text-muted">{t("lineage.lede")}</p>
          <LineageTimeline nodes={lineage} />
        </section>

        {orchestra.length ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl text-fg">{t("families.orchestraYears")}</h2>
            <p className="mt-2 text-sm text-muted">{t("families.orchestraYearsLede")}</p>
            <OrchestraTimeline events={orchestra} />
          </section>
        ) : null}

        {neighbours.length ? (
          <section className="mt-12 border border-border bg-surface p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-faint">
              {t("families.neighbours")}
            </p>
            <p className="mt-1 text-xs text-muted">{t("families.neighboursLede")}</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {neighbours.map((n) => (
                <li key={n.slug}>
                  <Link to="/families/$slug" params={{ slug: n.slug }} className="text-fg underline">
                    {n.name}
                  </Link>
                  <span className="text-faint"> — {n.origin}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p className="mt-10 text-sm text-muted">
          {tradition ? (
            <>
              <Link
                to="/styles/$slug"
                params={{ slug: tradition.slug }}
                className="text-fg underline"
              >
                {t("families.historyChapter")}
              </Link>
              {" · "}
            </>
          ) : null}
          <Link to="/families" className="text-fg underline">
            {t("families.all")}
          </Link>
        </p>
      </article>
    </SiteShell>
  );
}
