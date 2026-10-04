import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/provider";
import { locPlaces, locRole } from "@/i18n/content";

export type LineageNode = {
  name: string;
  role?: string;
  years?: string;
  artistSlug?: string;
  generation?: number;
  born?: string;
  died?: string;
  bornPlace?: string;
  diedPlace?: string;
  bio?: string;
  note?: string;
};

export function LineageTimeline({ nodes }: { nodes: LineageNode[] }) {
  const { t, locale } = useI18n();
  return (
    <ol className="mt-6 space-y-6 border-l border-border pl-6">
      {nodes.map((n, i) => (
        <li key={`${n.name}-${i}`} className="relative">
          <span className="absolute -left-[1.6rem] top-1 size-2.5 rounded-full bg-mark" />
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-faint">
            {t("lineage.gen")} {n.generation ?? i + 1}
          </p>
          <h3 className="mt-1 font-display text-xl text-fg">{n.name}</h3>
          <p className="mt-1 text-sm text-muted">
            {[locRole(n.role, locale), n.years].filter(Boolean).join(" · ")}
          </p>
          {n.born || n.died ? (
            <p className="mt-1 text-sm text-faint">
              {n.born ? `${t("lineage.born")} ${n.born}${n.bornPlace ? ` · ${locPlaces(n.bornPlace, locale)}` : ""}` : t("lineage.undated")}
              {n.died ? ` — ${t("lineage.died")} ${n.died}${n.diedPlace ? ` · ${locPlaces(n.diedPlace, locale)}` : ""}` : ""}
            </p>
          ) : null}
          {n.bio || n.note ? (
            <p className="mt-2 text-sm leading-relaxed text-fg/90">{n.bio || n.note}</p>
          ) : null}
          {n.artistSlug ? (
            <p className="mt-2 text-sm">
              <Link
                to="/artists/$slug"
                params={{ slug: n.artistSlug }}
                className="text-fg underline"
              >
                {t("lineage.artistPage")}
              </Link>
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
