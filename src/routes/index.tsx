import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { pageHead } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: PortalHome,
  head: () =>
    pageHead({
      title: SITE_NAME,
      description:
        "Romani music archive and international booking agency. Two doors.",
      path: "/",
    }),
});

function PortalHome() {
  return (
    <SiteShell>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
            romanimusic.com
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] text-ink sm:text-5xl">
            Romani Music
          </h1>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            <li>
              <Link
                to="/archive"
                className="flex min-h-44 flex-col border border-rule bg-panel/50 p-6 no-underline transition-colors hover:border-accent"
              >
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted">
                  Archive
                </span>
                <span className="mt-3 font-display text-2xl text-ink sm:text-3xl">
                  Romani music archive
                </span>
                <span className="mt-3 text-sm leading-relaxed text-muted">
                  Styles, family lines, chronicle, and sources.
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/booking"
                className="flex min-h-44 flex-col border border-rule bg-panel/50 p-6 no-underline transition-colors hover:border-accent"
              >
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted">
                  Agency
                </span>
                <span className="mt-3 font-display text-2xl text-ink sm:text-3xl">
                  Romani music international booking agency
                </span>
                <span className="mt-3 text-sm leading-relaxed text-muted">
                  Under construction.
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
