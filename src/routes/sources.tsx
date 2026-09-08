import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SOURCE_GROUPS } from "@/data/catalog";
import { useI18n } from "@/i18n/provider";
import { locPlaces, locSourceGroup } from "@/i18n/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/sources")({
  component: SourcesPage,
  head: () =>
    pageHead({
      title: `Sources`,
      description:
        "The books, films, discographies, archives and public records used to write this catalogue of Romani music.",
      path: "/sources",
    }),
});

function SourcesPage() {
  const { t, locale } = useI18n();
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-mark">
          {t("sources.kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl text-fg">{t("sources.title")}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{t("sources.lede")}</p>
        {SOURCE_GROUPS.map((raw) => {
          const g = locSourceGroup(raw, locale);
          return (
          <section key={g.id} className="mt-12">
            <h2 className="font-display text-2xl text-fg">{g.title}</h2>
            {g.lede ? <p className="mt-2 text-sm text-muted">{g.lede}</p> : null}
            <ol className="mt-6 space-y-6">
              {g.items.map((item) => (
                <li key={item.id}>
                  <p className="font-medium text-fg">{item.title}</p>
                  <p className="text-sm text-muted">
                    {[item.credit, item.year, item.place ? locPlaces(item.place, locale) : undefined]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {item.used ? (
                    <p className="mt-1 text-sm text-faint">
                      {t("sources.used")} {locPlaces(item.used, locale)}
                    </p>
                  ) : null}
                  {item.url ? (
                    <a
                      href={item.url}
                      className="mt-1 inline-block text-sm text-fg underline"
                      rel="noreferrer"
                      target="_blank"
                    >
                      {t("sources.open")}
                    </a>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>
          );
        })}
      </div>
    </SiteShell>
  );
}
