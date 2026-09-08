import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { useI18n } from "@/i18n/provider";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/foundation")({
  component: FoundationPage,
  head: () =>
    pageHead({
      title: `Foundation`,
      description:
        "This archive is based in the Netherlands. It is a non-profit. History first, then families, then artists.",
      path: "/foundation",
    }),
});

function FoundationPage() {
  const { t } = useI18n();
  return (
    <SiteShell>
      <article className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-mark">
          {t("foundation.kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl text-fg">{t("foundation.title")}</h1>
        <p className="mt-6 text-lg leading-relaxed text-fg">{t("foundation.lede")}</p>
        <div className="mt-8 space-y-5 text-base leading-[1.7] text-muted">
          <p>{t("foundation.p1")}</p>
          <p>{t("foundation.p2")}</p>
          <p>{t("foundation.p3")}</p>
        </div>
        <p className="mt-10 flex flex-wrap items-center gap-4 text-sm">
          <Link
            to="/donate"
            className="inline-flex min-h-11 items-center bg-accent px-5 text-sm font-medium text-accent-fg no-underline transition-opacity duration-150 hover:opacity-90 active:scale-[0.96]"
          >
            {t("foundation.donate")}
          </Link>
          <Link to="/contact" className="text-fg underline">
            {t("foundation.contact")}
          </Link>
        </p>
      </article>
    </SiteShell>
  );
}
