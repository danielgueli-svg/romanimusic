import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { pageHead } from "@/lib/seo";
import { BOOKING_AGENCY_TITLE, BOOKING_EMAIL } from "@/lib/site";

const ROSTER = [
  "Brady Winterstein Trio",
  "Marcia Bamberg Swing Quartet",
  "Daniel Gueli Swing Orchestra",
] as const;

export const Route = createFileRoute("/booking")({
  component: BookingPage,
  head: () =>
    pageHead({
      title: BOOKING_AGENCY_TITLE,
      description:
        "International booking agency for Romani music. Under construction.",
      path: "/booking",
      noindex: true,
    }),
});

function BookingPage() {
  return (
    <SiteShell>
      <section className="border-b border-rule">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-accent">
            Under construction
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.05] text-ink sm:text-5xl md:text-6xl">
            {BOOKING_AGENCY_TITLE}
          </h1>
          <div className="mt-8 max-w-xl space-y-4 text-lg leading-relaxed text-ink/85">
            <p>
              This page will be the international booking agency — a sister idea to{" "}
              <a
                href="https://eatmorejazz.com"
                className="underline underline-offset-4 hover:text-accent"
                rel="noreferrer"
                target="_blank"
              >
                eatmorejazz.com
              </a>
              . A new site comes later.
            </p>
          </div>
          <ul
            className="mt-12 max-w-xl divide-y divide-rule border-y border-rule"
            aria-label="Roster"
          >
            {ROSTER.map((name) => (
              <li key={name} className="py-5 font-display text-2xl text-ink sm:text-3xl">
                {name}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm">
            <a
              href={`mailto:${BOOKING_EMAIL}`}
              className="text-ink underline underline-offset-4 hover:text-accent"
            >
              {BOOKING_EMAIL}
            </a>
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex min-h-11 items-center border border-ink/25 px-5 py-2.5 text-sm no-underline hover:border-accent hover:text-accent"
            >
              Portals
            </Link>
            <Link
              to="/archive"
              className="inline-flex min-h-11 items-center bg-ink px-5 py-2.5 text-sm text-paper no-underline hover:bg-accent"
            >
              Romani music archive
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
