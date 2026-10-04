import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { DJANGO_FESTIVAL, FESTIVALS } from "@/data/festivals";
import { pageHead } from "@/lib/seo";
import { useI18n } from "@/i18n/provider";
import { locFestival } from "@/i18n/content";

export const Route = createFileRoute("/events")({
  component: EventsPage,
  head: () =>
    pageHead({
      title: `Romani music festivals`,
      description:
        "Big festivals of Romani music. Official sites. Not a concert diary. Django Reinhardt festival on gypsyjazzhub.com.",
      path: "/events",
    }),
});

function EventsPage() {
  const { t, locale } = useI18n();
  const django = locFestival(
    {
      id: "django",
      name: DJANGO_FESTIVAL.name,
      place: DJANGO_FESTIVAL.place,
      month: DJANGO_FESTIVAL.month,
      href: DJANGO_FESTIVAL.href,
      body: DJANGO_FESTIVAL.body,
    },
    locale,
  );
  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-5 py-14">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{t("events.kicker")}</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">{t("events.title")}</h1>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed">{t("events.intro")}</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          {t("sources.bar")} {t("events.send")}{" "}
          <Link to="/contact" className="underline underline-offset-4 hover:text-accent">
            {t("nav.contact")}
          </Link>
          .
        </p>

        <ul className="mt-12 divide-y divide-rule border-y border-rule">
          {FESTIVALS.map((raw) => {
            const f = locFestival(raw, locale);
            return (
            <li key={f.id} className="py-7">
              <p className="text-[11px] uppercase tracking-[0.18em] text-accent">{f.month}</p>
              <h2 className="mt-1 font-display text-2xl">
                <a
                  href={f.href}
                  className="text-ink no-underline hover:text-accent"
                  rel="noreferrer"
                  target="_blank"
                >
                  {f.name}
                </a>
              </h2>
              <p className="mt-1 text-sm text-muted">{f.place}</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed">{f.body}</p>
              <p className="mt-3 text-sm">
                <a
                  href={f.href}
                  className="underline underline-offset-4 hover:text-accent"
                  rel="noreferrer"
                  target="_blank"
                >
                  {t("ui.officialSite")}
                </a>
                {f.styleSlug ? (
                  <>
                    {" · "}
                    <Link
                      to="/styles/$slug"
                      params={{ slug: f.styleSlug }}
                      className="underline underline-offset-4 hover:text-accent"
                    >
                      {t("ui.stylePage")}
                    </Link>
                  </>
                ) : null}
              </p>
            </li>
            );
          })}
        </ul>

        <aside className="mt-12 border border-rule bg-panel/50 p-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("footer.sister")}</p>
          <h2 className="mt-2 font-display text-2xl">{django.name}</h2>
          <p className="mt-1 text-sm text-muted">
            {django.place} · {django.month}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed">{django.body}</p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <a
              href={DJANGO_FESTIVAL.href}
              className="underline underline-offset-4 hover:text-accent"
              rel="noreferrer"
            >
              gypsyjazzhub.com
            </a>
            <a
              href={DJANGO_FESTIVAL.official}
              className="underline underline-offset-4 hover:text-accent"
              rel="noreferrer"
              target="_blank"
            >
              festivaldjangoreinhardt.com
            </a>
            <Link
              to="/history/$slug"
              params={{ slug: "gypsy-jazz" }}
              className="underline underline-offset-4 hover:text-accent"
            >
              {t("events.historyChapter")}
            </Link>
          </p>
        </aside>
      </div>
    </SiteShell>
  );
}
