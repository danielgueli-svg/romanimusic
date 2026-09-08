import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { LATER_GROUPS } from "@/data/catalog";
import { useI18n } from "@/i18n/provider";
import { locLaterGroup } from "@/i18n/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/later")({
  component: LaterPage,
  head: () =>
    pageHead({
      title: `Later — to file`,
      description: "What waits. Conflicting dates, single-source claims, extra chairs.",
      path: "/later",
      noindex: true,
    }),
});

function LaterPage() {
  const { t, locale } = useI18n();
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-4xl text-fg">{t("later.title")}</h1>
        <p className="mt-4 text-base text-muted">{t("later.lede")}</p>
        {LATER_GROUPS.map((raw) => {
          const g = locLaterGroup(raw, locale);
          return (
          <section key={g.id} className="mt-12">
            <h2 className="font-display text-2xl text-fg">{g.title}</h2>
            {g.lede ? <p className="mt-2 text-sm text-muted">{g.lede}</p> : null}
            <ul className="mt-6 space-y-8">
              {g.items.map((raw) => {
                const it = raw as {
                  id?: string;
                  title?: string;
                  what?: string;
                  whyLater?: string;
                  url?: string;
                  sourceTitle?: string;
                };
                return (
                  <li key={it.id ?? it.title} className="border-t border-border pt-5">
                    <h3 className="font-display text-lg text-fg">{it.title}</h3>
                    {it.what ? (
                      <p className="mt-2 text-sm leading-relaxed text-fg/90">{it.what}</p>
                    ) : null}
                    {it.whyLater ? (
                      <p className="mt-2 text-sm text-muted">{it.whyLater}</p>
                    ) : null}
                    {it.url ? (
                      <a
                        href={it.url}
                        className="mt-2 inline-block text-sm text-fg underline"
                        rel="noreferrer"
                        target="_blank"
                      >
                        {it.sourceTitle ?? it.url}
                      </a>
                    ) : it.sourceTitle ? (
                      <p className="mt-2 text-xs text-faint">{it.sourceTitle}</p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </section>
          );
        })}
      </div>
    </SiteShell>
  );
}
