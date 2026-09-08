import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { pageHead } from "@/lib/seo";
import { useI18n } from "@/i18n/provider";
import type { MsgKey } from "@/i18n/en";

export const Route = createFileRoute("/history/culture")({
  component: CultureHistory,
  head: () =>
    pageHead({
      title: `Roma cultural history`,
      description:
        "A people with an Indian origin, many self-names, and musics made in the countries they entered. Filed from sources.",
      path: "/history/culture",
    }),
});

const DOORS: Array<{
  kicker: string;
  title: MsgKey;
  body: MsgKey;
  to: "/history/$slug" | "/styles";
  slug?: string;
}> = [
  { kicker: "01", title: "culture.d1.title", body: "culture.d1.body", to: "/history/$slug", slug: "origins" },
  { kicker: "02", title: "culture.d2.title", body: "culture.d2.body", to: "/history/$slug", slug: "origins" },
  { kicker: "03", title: "culture.d3.title", body: "culture.d3.body", to: "/history/$slug", slug: "roma-sinti" },
  { kicker: "04", title: "culture.d4.title", body: "culture.d4.body", to: "/history/$slug", slug: "origins" },
  { kicker: "05", title: "culture.d5.title", body: "culture.d5.body", to: "/history/$slug", slug: "transmission" },
  { kicker: "06", title: "culture.d6.title", body: "culture.d6.body", to: "/styles" },
];

function CultureHistory() {
  const { t } = useI18n();
  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-5 py-14">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
          {t("history.cultureFrom")}
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
          {t("history.cultureH1")}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/85">{t("history.cultureLede")}</p>
        <p className="mt-4 text-base leading-relaxed text-muted">{t("history.cultureAlready")}</p>

        <ol className="mt-10 divide-y divide-rule border-y border-rule">
          {DOORS.map((d) => {
            const inner = (
              <>
                <span className="w-8 shrink-0 font-display text-xl text-accent">{d.kicker}</span>
                <span>
                  <span className="block font-display text-xl text-ink">{t(d.title)}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted">{t(d.body)}</span>
                </span>
              </>
            );
            return (
              <li key={d.kicker}>
                {d.slug ? (
                  <Link
                    to="/history/$slug"
                    params={{ slug: d.slug }}
                    className="flex gap-6 py-6 no-underline hover:bg-panel/50"
                  >
                    {inner}
                  </Link>
                ) : (
                  <Link to="/styles" className="flex gap-6 py-6 no-underline hover:bg-panel/50">
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>

        <p className="mt-10 text-sm leading-relaxed text-muted">{t("history.watchBody")}</p>
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link to="/history" className="underline underline-offset-4 hover:text-accent">
            {t("history.back")}
          </Link>
          <Link to="/history/timeline" className="underline underline-offset-4 hover:text-accent">
            {t("home.pathTimeline")}
          </Link>
          <Link
            to="/history/$slug"
            params={{ slug: "hungary" }}
            className="underline underline-offset-4 hover:text-accent"
          >
            {t("history.hungaryChapter")}
          </Link>
          <Link to="/sources" className="underline underline-offset-4 hover:text-accent">
            {t("footer.sources")}
          </Link>
        </p>
      </article>
    </SiteShell>
  );
}
