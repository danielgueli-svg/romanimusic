import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { useI18n } from "@/i18n/provider";
import { DONATE_EMAIL, SITE_NAME } from "@/lib/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/donate")({
  component: DonatePage,
  head: () =>
    pageHead({
      title: `Donate`,
      description:
        "The foundation is a non-profit in the Netherlands. Gifts pay for the archive of Romani music.",
      path: "/donate",
    }),
});

const AMOUNTS = [10, 25, 50, 100] as const;

function DonatePage() {
  const { t } = useI18n();
  const [amount, setAmount] = useState<(typeof AMOUNTS)[number] | "other">(25);
  const [other, setOther] = useState("25");

  const euros = amount === "other" ? Number(other) : amount;
  const valid = Number.isFinite(euros) && euros > 0;

  const href = useMemo(() => {
    const n = valid ? euros : 25;
    const subject = `${t("donate.title")} €${n} — ${SITE_NAME}`;
    const body = `${t("donate.mailIntro")} €${n}.\n\n${t("donate.mailName")}\n`;
    return `mailto:${DONATE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [euros, valid, t]);

  return (
    <SiteShell>
      <article className="mx-auto max-w-xl px-4 py-12 sm:px-6">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-mark">
          {t("donate.kicker")}
        </p>
        <h1 className="mt-2 font-display text-4xl text-fg">{t("donate.title")}</h1>
        <p className="mt-6 text-lg leading-relaxed text-fg">{t("donate.lede")}</p>
        <p className="mt-4 text-base leading-relaxed text-muted">{t("foundation.donateLede")}</p>
        <fieldset className="mt-8">
          <legend className="text-sm text-muted">{t("donate.amount")}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {AMOUNTS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setAmount(n)}
                className={
                  amount === n
                    ? "inline-flex min-h-11 min-w-16 items-center justify-center bg-accent px-4 text-sm font-medium text-accent-fg"
                    : "inline-flex min-h-11 min-w-16 items-center justify-center border border-border bg-surface px-4 text-sm text-fg"
                }
              >
                €{n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setAmount("other")}
              className={
                amount === "other"
                  ? "inline-flex min-h-11 items-center justify-center bg-accent px-4 text-sm font-medium text-accent-fg"
                  : "inline-flex min-h-11 items-center justify-center border border-border bg-surface px-4 text-sm text-fg"
              }
            >
              {t("donate.other")}
            </button>
          </div>
          {amount === "other" ? (
            <label className="mt-4 flex flex-col gap-1 text-xs text-muted">
              {t("donate.amount")} (€)
              <input
                type="number"
                min={1}
                step={1}
                value={other}
                onChange={(e) => setOther(e.target.value)}
                className="min-h-11 border border-border bg-surface px-3 text-sm text-fg"
              />
            </label>
          ) : null}
        </fieldset>
        <p className="mt-8">
          <a
            href={href}
            className="inline-flex min-h-11 items-center bg-accent px-5 text-sm font-medium text-accent-fg no-underline transition-opacity duration-150 hover:opacity-90 active:scale-[0.96]"
          >
            {t("donate.write")}
          </a>
        </p>
        <p className="mt-4 text-sm text-faint">{DONATE_EMAIL}</p>
      </article>
    </SiteShell>
  );
}
