import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/provider";

export function ArchiveCrumb({
  style,
  house,
  artist,
}: {
  style?: { slug: string; name: string };
  house?: { slug: string; name: string };
  artist?: string;
}) {
  const { t } = useI18n();
  return (
    <nav aria-label={t("crumb.aria")} className="mb-8 text-xs text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link to="/styles" className="text-faint no-underline hover:text-fg">
            {t("nav.atlas")}
          </Link>
        </li>
        {style ? (
          <li className="flex items-center gap-2">
            <span className="text-faint">/</span>
            {house || artist ? (
              <Link
                to="/styles/$slug"
                params={{ slug: style.slug }}
                className="text-muted no-underline hover:text-fg"
              >
                {style.name}
              </Link>
            ) : (
              <span className="text-fg">{style.name}</span>
            )}
          </li>
        ) : null}
        {house ? (
          <li className="flex items-center gap-2">
            <span className="text-faint">/</span>
            {artist ? (
              <Link
                to="/families/$slug"
                params={{ slug: house.slug }}
                className="text-muted no-underline hover:text-fg"
              >
                {house.name}
              </Link>
            ) : (
              <span className="text-fg">{house.name}</span>
            )}
          </li>
        ) : null}
        {artist ? (
          <li className="flex items-center gap-2">
            <span className="text-faint">/</span>
            <span className="text-fg">{artist}</span>
          </li>
        ) : null}
      </ol>
    </nav>
  );
}
