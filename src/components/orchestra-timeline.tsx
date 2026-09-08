import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/provider";
import { getFamily, type OrchestraEvent } from "@/data/catalog";
import type { MsgKey } from "@/i18n/en";

const KIND_KEY: Record<string, MsgKey> = {
  found: "orch.found",
  split: "orch.split",
  lead: "orch.lead",
  join: "orch.join",
  rename: "orch.rename",
  end: "orch.end",
};

export function OrchestraTimeline({
  events,
  showFamily = false,
}: {
  events: OrchestraEvent[];
  showFamily?: boolean;
}) {
  const { t } = useI18n();
  return (
    <ol className="mt-6 divide-y divide-border border-y border-border">
      {events.map((e) => {
        const family = showFamily ? getFamily(e.familySlug) : undefined;
        return (
          <li
            key={`${e.familySlug}-${e.year}-${e.band}-${e.title}`}
            className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr] sm:gap-8"
          >
            <p className="font-sans text-sm tabular-nums text-mark">{e.year}</p>
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-faint">
                {KIND_KEY[e.kind] ? t(KIND_KEY[e.kind]) : e.kind}
              </p>
              <h3 className="mt-1 font-display text-lg text-fg">{e.title}</h3>
              <p className="mt-1 text-sm text-muted">{e.band}</p>
              {family ? (
                <p className="mt-1 text-sm">
                  <Link
                    to="/families/$slug"
                    params={{ slug: family.slug }}
                    className="text-fg underline"
                  >
                    {family.name}
                  </Link>
                </p>
              ) : null}
              <p className="mt-2 text-sm leading-relaxed text-fg/90">{e.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}