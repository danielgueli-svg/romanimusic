import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { JsonLd, siteGraph } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SourcesBar } from "@/components/sources-bar";
import { useI18n } from "@/i18n/provider";
import { isBookingPath } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteShell({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const onSources = path === "/sources";
  const onPortal = path === "/";
  const onArchive = path === "/archive";
  const onBooking = isBookingPath(path);
  const hideSourcesBar = onSources || onPortal || onArchive || onBooking;

  useEffect(() => {
    document.documentElement.classList.toggle("theme-booking", onBooking);
    return () => document.documentElement.classList.remove("theme-booking");
  }, [onBooking]);

  return (
    <div className={cn("flex min-h-dvh flex-col bg-paper text-ink", onBooking && "theme-booking")}>
      <JsonLd data={siteGraph()} />
      <a
        href="#main"
        className="absolute left-4 top-4 z-50 -translate-y-[180%] bg-ink px-3 py-2 text-sm text-paper focus:translate-y-0"
      >
        {t("skip")}
      </a>
      {onPortal ? null : <SiteHeader />}
      <main id="main" className="flex-1">
        {children}
      </main>
      {hideSourcesBar ? null : <SourcesBar />}
      {onPortal ? <SiteFooter portal /> : <SiteFooter />}
    </div>
  );
}
