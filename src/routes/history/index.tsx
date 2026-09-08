import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { FiledClip } from "@/components/filed-media";
import { CHAPTERS, HISTORY_INDEX_SLUGS } from "@/data/catalog";
import { MEDIA } from "@/data/media";
import { useI18n } from "@/i18n/provider";
import { locChapter } from "@/i18n/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/history/")({
  component: HistoryIndex,
  head: () =>
    pageHead({
      title: `History of Romani music`,
      description:
        "The long road from India; Roma, Sinti and Manouche; the Holland–Hungary connection; and how the music is passed down.",
      path: "/history",
    }),
});

function HistoryIndex() {
  const { t, locale } = useI18n();
  const peoples = CHAPTERS.filter((c) =>
    (HISTORY_INDEX_SLUGS as readonly string[]).includes(c.slug),
  ).map((c) => locChapter(c, locale, t));
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-mark">
          {t("history.kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl text-fg sm:text-5xl">{t("history.title")}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{t("history.lede")}</p>
        <p className="mt-4 text-sm">
          <Link to="/history/timeline" className="text-fg underline">
            {t("history.openTimeline")}
          </Link>
          {" · "}
          <Link to="/history/culture" className="text-fg underline">
            {t("history.cultureLink")}
          </Link>
        </p>

        <section className="mt-10 max-w-3xl border border-rule bg-panel/40 p-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent">{t("history.cultureKicker")}</p>
          <h2 className="mt-2 font-display text-2xl text-ink">{t("history.cultureCardTitle")}</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            {t("history.cultureCardBody")}
          </p>
          <p className="mt-4">
            <Link
              to="/history/culture"
              className="inline-flex min-h-11 items-center bg-ink px-5 py-2.5 text-sm text-paper no-underline hover:bg-accent"
            >
              {t("history.cultureOpen")}
            </Link>
          </p>
        </section>

        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {peoples.map((ch) => (
            <li key={ch.slug}>
              <Link
                to="/history/$slug"
                params={{ slug: ch.slug }}
                className="flex h-full flex-col border border-border bg-surface p-5 no-underline hover:bg-raised"
              >
                <span className="text-[0.7rem] tabular-nums tracking-widest text-mark">
                  {t("history.chapter")} {ch.catalog}
                </span>
                <h2 className="mt-2 font-display text-2xl leading-snug text-fg">{ch.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{ch.lede}</p>
              </Link>
            </li>
          ))}
        </ol>

        <section className="mt-16 max-w-3xl">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-mark">
            {t("history.watch")}
          </p>
          <h2 className="mt-2 font-display text-2xl text-fg">
            {t("history.watchTitle")}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            {t("history.watchBody")}
          </p>
          <FiledClip media={MEDIA.hungary} />
          <p className="mt-3 text-sm">
            <Link
              to="/history/$slug"
              params={{ slug: "hungary" }}
              className="text-fg underline"
            >
              {t("history.hungaryChapter")}
            </Link>
            {" · "}
            <Link
              to="/styles/$slug"
              params={{ slug: "hungarian" }}
              className="text-fg underline"
            >
              Cigányzene
            </Link>
          </p>
        </section>
      </div>
    </SiteShell>
  );
}
