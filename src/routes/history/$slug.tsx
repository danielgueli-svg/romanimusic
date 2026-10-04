import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { FiledClip, FiledPhoto } from "@/components/filed-media";
import { getChapter } from "@/data/catalog";
import { mediaOf } from "@/data/media";
import { pageHead } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { SITE_ORIGIN } from "@/lib/site";
import { locChapter } from "@/i18n/content";
import { useI18n } from "@/i18n/provider";

export const Route = createFileRoute("/history/$slug")({
  component: HistoryChapter,
  loader: ({ params }) => {
    const chapter = getChapter(params.slug);
    if (!chapter) throw notFound();
    return { chapter };
  },
  head: ({ loaderData }) =>
    pageHead({
      title: loaderData?.chapter.title ?? "History",
      description: loaderData?.chapter.lede,
      path: `/history/${loaderData?.chapter.slug ?? ""}`,
    }),
});

function HistoryChapter() {
  const { chapter } = Route.useLoaderData();
  const { t, locale } = useI18n();
  const copy = locChapter(chapter, locale, t);
  return (
    <SiteShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: copy.title,
          description: copy.lede,
          url: `${SITE_ORIGIN}/history/${chapter.slug}`,
          inLanguage: locale,
        }}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-mark">
          {copy.catalog}
        </p>
        <h1 className="mt-2 font-display text-4xl text-fg">{copy.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{copy.lede}</p>
        <FiledPhoto media={mediaOf(chapter.slug, chapter.traditionSlug)} />
        {copy.sections.map((sec) => (
          <section key={sec.id ?? sec.title} className="mt-10">
            {sec.kicker ? (
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-faint">{sec.kicker}</p>
            ) : null}
            {sec.title ? (
              <h2 className="mt-1 font-display text-2xl text-fg">{sec.title}</h2>
            ) : null}
            <div className="mt-4 space-y-4">
              {sec.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="text-base leading-[1.7] text-fg/90">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
        <FiledClip media={mediaOf(chapter.slug, chapter.traditionSlug)} />
        <p className="mt-12 text-sm">
          <Link to="/history" className="text-fg underline">
            {t("history.back")}
          </Link>
        </p>
      </article>
    </SiteShell>
  );
}
