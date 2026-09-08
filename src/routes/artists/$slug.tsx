import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArchiveCrumb } from "@/components/crumb";
import { FiledClip, FiledPhoto } from "@/components/filed-media";
import { SiteShell } from "@/components/site-shell";
import { FAMILIES, concertsForArtist, getArtist, getTradition } from "@/data/catalog";
import { lifeOf } from "@/data/lives";
import { mediaOf } from "@/data/media";
import { artistSite } from "@/data/websites";
import { useI18n } from "@/i18n/provider";
import { locPlaces, locRole, locTradition } from "@/i18n/content";
import { pageHead } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { SITE_ORIGIN } from "@/lib/site";

export const Route = createFileRoute("/artists/$slug")({
  component: ArtistPage,
  loader: ({ params }) => {
    const artist = getArtist(params.slug);
    if (!artist) throw notFound();
    return { artist };
  },
  head: ({ loaderData }) =>
    pageHead({
      title: loaderData?.artist.name ?? "Artist",
      description: loaderData?.artist.bio || loaderData?.artist.role,
      path: `/artists/${loaderData?.artist.slug ?? ""}`,
    }),
});

function ArtistPage() {
  const { t, locale } = useI18n();
  const { artist } = Route.useLoaderData();
  const traditionRaw = artist.traditionSlug ? getTradition(artist.traditionSlug) : undefined;
  const tradition = traditionRaw ? locTradition(traditionRaw, locale) : undefined;
  const house = FAMILIES.find((f) => f.members.some((m) => m.artistSlug === artist.slug));
  const media = mediaOf(artist.slug, house?.slug);
  const site = artistSite(artist.slug);
  const concerts = concertsForArtist(artist.slug, artist.name);
  const life = lifeOf(artist.slug);

  return (
    <SiteShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: artist.name,
          description: artist.bio,
          url: `${SITE_ORIGIN}/artists/${artist.slug}`,
          jobTitle: artist.role,
        }}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <ArchiveCrumb
          style={tradition ? { slug: tradition.slug, name: tradition.name } : undefined}
          house={house ? { slug: house.slug, name: house.name } : undefined}
          artist={artist.name}
        />
        <h1 className="font-display text-4xl text-fg">{artist.name}</h1>
        <p className="mt-3 text-sm text-muted">
          {[artist.years, locRole(artist.role, locale), artist.country ? locPlaces(artist.country, locale) : undefined]
            .filter(Boolean)
            .join(" · ")}
        </p>
        {tradition ? (
          <p className="mt-2 text-sm text-muted">
            {t("artists.filed")}:{" "}
            <Link to="/styles/$slug" params={{ slug: tradition.slug }} className="text-fg underline">
              {tradition.name}
            </Link>
          </p>
        ) : null}
        {house ? (
          <p className="mt-2 text-sm text-muted">
            {t("artists.family")}:{" "}
            <Link to="/families/$slug" params={{ slug: house.slug }} className="text-fg underline">
              {house.name}
            </Link>
          </p>
        ) : null}
        {site ? (
          <p className="mt-2 text-sm text-muted">
            {t("artists.official")}:{" "}
            <a href={site.href} className="text-fg underline">
              {site.label}
            </a>
          </p>
        ) : null}
        <FiledPhoto media={media} size="small" />
        {life ? (
          <>
            <section className="mt-8" lang={life.lang}>
              <h2 className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.18em] text-mark">
                {life.langLabel}
              </h2>
              <div className="mt-4 space-y-3">
                {life.original.map((p) => (
                  <p key={p.slice(0, 40)} className="text-base leading-[1.7] text-fg">
                    {p}
                  </p>
                ))}
              </div>
            </section>
            <section className="mt-8" lang="en">
              <h2 className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.18em] text-mark">
                {t("artists.lifeEn")}
              </h2>
              <div className="mt-4 space-y-3">
                {life.en.map((p) => (
                  <p key={p.slice(0, 40)} className="text-base leading-[1.7] text-fg/90">
                    {p}
                  </p>
                ))}
              </div>
            </section>
            <p className="mt-6 text-xs leading-relaxed text-faint">
              {t("artists.writtenFrom")}:{" "}
              {life.sources.map((s, i) => (
                <span key={s.label}>
                  {i > 0 ? " · " : null}
                  {s.href ? (
                    <a href={s.href} className="underline">
                      {s.label}
                    </a>
                  ) : (
                    s.label
                  )}
                </span>
              ))}
            </p>
          </>
        ) : artist.bio ? (
          <p className="mt-8 text-base leading-[1.7] text-fg/90">{artist.bio}</p>
        ) : null}
        <FiledClip media={media} />
        {concerts.length ? (
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="font-display text-2xl text-fg">{t("concerts.artist")}</h2>
            <ol className="mt-6 divide-y divide-border border-y border-border">
              {concerts.map((c) => (
                <li key={c.id} className="py-4">
                  <p className="text-sm tabular-nums text-mark">
                    {c.end ? `${c.start} – ${c.end}` : c.start}
                  </p>
                  {c.url ? (
                    <p className="font-display text-lg text-fg">
                      <a href={c.url} className="text-fg no-underline hover:underline">
                        {c.title}
                      </a>
                    </p>
                  ) : (
                    <p className="font-display text-lg text-fg">{c.title}</p>
                  )}
                  <p className="text-sm text-muted">
                    {[c.venue, c.city, c.country].filter(Boolean).join(" · ")}
                  </p>
                  {c.source ? <p className="mt-1 text-xs text-faint">{c.source}</p> : null}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm">
              <Link to="/events" className="text-fg underline">
                {t("concerts.all")}
              </Link>
            </p>
          </section>
        ) : null}
      </article>
    </SiteShell>
  );
}
