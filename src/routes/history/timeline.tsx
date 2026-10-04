import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { StoryTimeline } from "@/components/story-timeline";
import { useI18n } from "@/i18n/provider";
import { pageHead } from "@/lib/seo";
import { STORY_SPAN } from "@/data/story";

export const Route = createFileRoute("/history/timeline")({
  component: HistoryTimelinePage,
  head: () =>
    pageHead({
      title: `History timeline of Romani music`,
      description:
        "Years on a line. Every date here is already in a chapter.",
      path: "/history/timeline",
    }),
});

function HistoryTimelinePage() {
  const { t } = useI18n();
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-mark">
          {t("history.kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl text-fg sm:text-5xl">{t("history.timeline")}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {t("history.timelineLede")}
        </p>
        <p className="mt-3 font-sans text-sm tabular-nums tracking-[0.18em] text-mark">
          {STORY_SPAN}
        </p>
        <p className="mt-4 text-sm">
          <Link to="/history" className="text-fg underline">
            {t("history.title")}
          </Link>
        </p>
      </div>
      <StoryTimeline />
    </SiteShell>
  );
}
