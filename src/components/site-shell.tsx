import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { JsonLd, siteGraph } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SourcesBar } from "@/components/sources-bar";
import { useI18n } from "@/i18n/provider";

export function SiteShell({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const onSources = path === "/sources";
  const onHome = path === "/";

  return (
    <div className="flex min-h-dvh flex-col bg-paper text-ink">
      <JsonLd data={siteGraph()} />
      <a
        href="#main"
        className="absolute left-4 top-4 z-50 -translate-y-[180%] bg-ink px-3 py-2 text-sm text-paper focus:translate-y-0"
      >
        {t("skip")}
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      {onSources || onHome ? null : <SourcesBar />}
      <SiteFooter />
    </div>
  );
}
