import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/")({
  component: PortalHome,
  head: () =>
    pageHead({
      title: "Romani Music — Archive & International Booking Agency",
      description:
        "Romani Music is based in the Netherlands. The site holds an archive of Romani music and an international booking agency for living manouche styles. The portfolio is still being built.",
      path: "/",
      verbatim: true,
    }),
});

function PortalHome() {
  const door =
    "flex min-h-[50dvh] flex-col justify-center px-8 py-16 no-underline sm:min-h-dvh sm:px-12";
  const label = "text-[11px] uppercase tracking-[0.28em]";
  const name =
    "mt-4 font-display text-5xl leading-[1.05] underline decoration-2 underline-offset-8 sm:text-6xl";
  const line = "mt-4 max-w-sm text-sm leading-relaxed";
  return (
    <section className="flex min-h-dvh flex-col">
      <div className="bg-white px-8 pb-6 pt-8 text-center sm:pt-10">
        <h1 className="font-display text-6xl leading-none text-neutral-950 sm:text-8xl">
          Romani Music
        </h1>
        <hr className="mx-auto mt-6 border-0 border-t border-neutral-950" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col-reverse sm:grid sm:grid-cols-2">
        <Link to="/archive" className={`${door} bg-white text-ink`}>
          <span className={`${label} text-neutral-500`}>Archive</span>
          <span className={`${name} decoration-neutral-400`}>Romani music archive</span>
          <span className={`${line} text-neutral-600`}>
            Styles, family lines, chronicle, and sources.
          </span>
        </Link>
        <a href="/booking/" className={`${door} bg-black text-white`}>
          <span className={`${label} text-white/70`}>Agency</span>
          <span className={`${name} decoration-white/50`}>Romani Music Booking</span>
          <span className={`${line} text-white/75`}>
            Romani Music International Booking Agency
          </span>
        </a>
      </div>
    </section>
  );
}
