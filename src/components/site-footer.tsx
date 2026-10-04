import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/provider";
import { GYPSY_JAZZ_HUB, SITE_NAME } from "@/lib/site";

export function SiteFooter({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  if (compact) {
    return (
      <footer className="mt-auto border-t border-rule">
        <p className="mx-auto max-w-5xl px-5 py-6 text-xs text-muted">{SITE_NAME}</p>
      </footer>
    );
  }
  return (
    <footer className="mt-16 border-t border-rule">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg">{SITE_NAME}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{t("footer.blurb")}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("footer.sister")}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {t("footer.sisterBody")}{" "}
            <a href={GYPSY_JAZZ_HUB} className="text-ink underline underline-offset-4 hover:text-accent">
              gypsyjazzhub.com
            </a>
            .
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t("nav.cta")}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            <Link to="/contact" className="text-ink underline underline-offset-4 hover:text-accent">
              {t("home.upload")}
            </Link>
            . {t("footer.filedOntoFamily")}
          </p>
          <p className="mt-4 text-sm">
            <Link to="/events" className="text-ink underline underline-offset-4 hover:text-accent">
              {t("events.title")}
            </Link>
            {" · "}
            <Link to="/donate" className="text-ink underline underline-offset-4 hover:text-accent">
              {t("foundation.donate")}
            </Link>
          </p>
        </div>
      </div>
      <p className="border-t border-rule px-5 py-6 text-center text-xs leading-relaxed text-muted">
        {t("footer.note")}
      </p>
    </footer>
  );
}
