import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { useI18n } from "@/i18n/provider";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () =>
    pageHead({
      title: `Contact`,
      description:
        "Send a correction, a family memory, a source, or a photograph. Publication is not automatic.",
      path: "/contact",
    }),
});

function ContactPage() {
  const { t } = useI18n();
  return (
    <SiteShell>
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-mark">
          {t("contact.kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl text-fg">{t("contact.title")}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{t("contact.lede")}</p>
        <p className="mt-6 text-base leading-relaxed text-fg">{t("contact.houseAsk")}</p>
      </div>
    </SiteShell>
  );
}
