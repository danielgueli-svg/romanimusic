import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { getTradition } from "@/data/catalog";
import {
  HOME_CHAPTERS,
  HOME_STYLES,
} from "@/data/home";
import { useI18n } from "@/i18n/provider";
import type { MsgKey } from "@/i18n/en";
import { locLabel } from "@/i18n/content";
import { pageHead } from "@/lib/seo";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: Home,
  head: () =>
    pageHead({
      title: `${SITE_NAME} — ${SITE_TAGLINE.split(".")[0]}`,
      description: SITE_TAGLINE,
      path: "/",
    }),
});

function Home() {
  const { t, locale } = useI18n();
  return (
    <SiteShell>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
            {t("home.kicker")}
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.05] text-ink sm:text-6xl">
            {t("home.h1")}
          </h1>
          <div className="mt-8 max-w-xl space-y-4 text-lg leading-relaxed text-ink/85">
            <p>{t("home.lead1")}</p>
            <p>{t("home.lead2")}</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/history"
              className="inline-flex min-h-11 items-center bg-ink px-5 py-2.5 text-sm text-paper no-underline hover:bg-accent"
            >
              {t("home.readChronicle")}
            </Link>
            <Link
              to="/events"
              className="inline-flex min-h-11 items-center border border-ink/25 px-5 py-2.5 text-sm no-underline hover:border-accent hover:text-accent"
            >
              {t("home.festivalsCta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{t("home.startHere")}</p>
              <h2 className="mt-2 font-display text-3xl">{t("home.chronicle")}</h2>
            </div>
            <Link
              to="/history/timeline"
              className="text-sm underline underline-offset-4 hover:text-accent"
            >
              {t("home.openTimeline")}
            </Link>
          </div>
          <ol className="mt-8 divide-y divide-rule border-y border-rule">
            {HOME_CHAPTERS.map((ch) => {
              const keys: Record<string, { title: MsgKey; body: MsgKey }> = {
                origins: { title: "home.chI.title", body: "home.chI.body" },
                "roma-sinti": { title: "home.chII.title", body: "home.chII.body" },
                "holland-hungary": { title: "home.chIII.title", body: "home.chIII.body" },
                transmission: { title: "home.chIV.title", body: "home.chIV.body" },
              };
              const k = keys[ch.slug];
              return (
              <li key={ch.slug}>
                <Link
                  to="/history/$slug"
                  params={{ slug: ch.slug }}
                  className="flex gap-6 py-6 no-underline hover:bg-panel/50"
                >
                  <span className="w-8 shrink-0 font-display text-xl text-accent">{ch.roman}</span>
                  <span>
                    <span className="block font-display text-xl">{t(k.title)}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{t(k.body)}</span>
                  </span>
                </Link>
              </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{t("home.filedStyles")}</p>
          <h2 className="mt-2 max-w-xl font-display text-3xl">{t("home.stylesH2")}</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{t("home.stylesBlurb")}</p>
          <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
            {HOME_STYLES.map((s) => {
              const exists = Boolean(getTradition(s.slug));
              const name = (
                <>
                  <span className="font-display text-lg group-hover:text-accent">{locLabel(s.name, locale)}</span>
                  <span className="block text-xs text-muted">{locLabel(s.where, locale)}</span>
                </>
              );
              return (
                <li key={s.slug}>
                  {exists ? (
                    <Link
                      to="/styles/$slug"
                      params={{ slug: s.slug }}
                      className="group block no-underline"
                    >
                      {name}
                    </Link>
                  ) : (
                    <Link to="/styles" className="group block no-underline">
                      {name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 sm:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{t("home.speaksKicker")}</p>
            <p className="mt-4 text-[17px] leading-relaxed">{t("home.speaks")}</p>
            <p className="mt-4 text-[17px] leading-relaxed">
              {t("home.sourcesLine")}{" "}
              <Link to="/sources" className="underline underline-offset-4 hover:text-accent">
                {t("home.sourcesList")}
              </Link>
              .
            </p>
          </div>
          <div className="border border-rule bg-panel/50 p-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{t("home.contributeKicker")}</p>
            <p className="mt-3 font-display text-2xl">{t("home.contributeTitle")}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t("home.contributeBody")}</p>
            <Link
              to="/contact"
              className="mt-6 inline-flex min-h-11 items-center bg-accent px-4 py-2 text-sm text-paper no-underline hover:bg-ink"
            >
              {t("home.openContact")}
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
