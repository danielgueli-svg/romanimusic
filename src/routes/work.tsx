import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { useI18n } from "@/i18n/provider";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/work")({
  component: WorkPage,
  head: () =>
    pageHead({
      title: `Work`,
      description:
        "History, families, artists, and styles. Open a page. Every page here is written from sources.",
      path: "/work",
    }),
});

function WorkPage() {
  const { t } = useI18n();
  const doors = [
    { to: "/history" as const, title: t("home.pathHistory"), intro: t("home.pathHistoryIntro") },
    { to: "/families" as const, title: t("home.pathFamilies"), intro: t("home.pathFamiliesIntro") },
    { to: "/artists" as const, title: t("home.pathArtists"), intro: t("home.pathArtistsIntro") },
    { to: "/styles" as const, title: t("styles.title"), intro: t("styles.lede") },
    { to: "/sources" as const, title: t("sources.title"), intro: t("sources.lede") },
    { to: "/events" as const, title: t("events.title"), intro: t("events.lede") },
    { to: "/foundation" as const, title: t("home.pathFoundation"), intro: t("home.pathFoundationIntro") },
    { to: "/donate" as const, title: t("donate.title"), intro: t("donate.lede") },
    { to: "/contact" as const, title: t("contact.title"), intro: t("contact.lede") },
  ];

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-mark">
          {t("work.kicker")}
        </p>
        <h1 className="mt-2 text-balance font-display text-4xl text-fg sm:text-5xl">
          {t("work.title")}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted">
          {t("work.lede")}
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {doors.map((d) => (
            <li key={d.to}>
              <Link
                to={d.to}
                className="flex min-h-40 flex-col border border-border bg-surface p-6 no-underline transition-colors duration-150 hover:bg-raised"
              >
                <h2 className="font-display text-2xl text-fg sm:text-3xl">{d.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted sm:text-base">
                  {d.intro}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SiteShell>
  );
}
