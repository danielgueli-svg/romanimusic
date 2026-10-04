import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/provider";

export function SourcesBar() {
  const { t } = useI18n();
  return (
    <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted sm:px-6">
      {t("sources.bar")}{" "}
      <Link to="/sources" className="text-fg underline">
        {t("sources.link")}
      </Link>
    </p>
  );
}
