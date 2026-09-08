import { createFileRoute, Link } from "@tanstack/react-router";
import { OrchestraTimeline } from "@/components/orchestra-timeline";
import { SiteShell } from "@/components/site-shell";
import { FAMILIES, familyCountry, getTradition, orchestraFor } from "@/data/catalog";
import { useI18n } from "@/i18n/provider";
import { locFamily, locPlaces, locTradition } from "@/i18n/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/families/")({
  component: FamiliesIndex,
  head: () =>
    pageHead({
      title: `Families of Romani musicians`,
      description:
        "Named family lines that carried a style across generations. Origin, lineage, orchestra years.",
      path: "/families",
    }),
});

function FamiliesIndex() {
  const { t, locale } = useI18n();
  const orchestra = FAMILIES.flatMap((f) => orchestraFor(f.slug)).sort(
    (a, b) => a.sort - b.sort || a.year.localeCompare(b.year),
  );

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-mark">
          {t("families.kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl text-fg sm:text-5xl">{t("families.title")}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{t("families.lede")}</p>
        {orchestra.length ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl text-fg sm:text-3xl">{t("families.orchestraAll")}</h2>
            <OrchestraTimeline events={orchestra} showFamily />
          </section>
        ) : null}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {FAMILIES.map((raw) => {
            const f = locFamily(raw, locale);
            const styleRaw = getTradition(f.traditionSlug);
            const style = styleRaw ? locTradition(styleRaw, locale) : undefined;
            return (
              <li key={f.slug}>
                <Link
                  to="/families/$slug"
                  params={{ slug: f.slug }}
                  className="flex h-full flex-col border border-border bg-surface p-5 no-underline hover:bg-raised"
                >
                  <h2 className="font-display text-2xl text-fg">{f.name}</h2>
                  <p className="mt-2 text-sm text-muted">{f.origin}</p>
                  <p className="mt-2 text-xs text-faint">
                    {style?.name} · {locPlaces(familyCountry(f), locale)}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{f.summary}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </SiteShell>
  );
}