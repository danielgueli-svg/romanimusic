import { OG_IMAGE, SITE_NAME, SITE_ORIGIN, SITE_TAGLINE } from "./site";

export function clipMeta(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).replace(/\s+\S*$/, "").replace(/[.,;:—–-]$/, "")}…`;
}

export function pageHead(opts: {
  title: string;
  description?: string;
  path: string;
  noindex?: boolean;
  /** Keep description and og:description character-for-character. */
  verbatim?: boolean;
}) {
  const title = opts.title.includes(SITE_NAME)
    ? opts.title
    : `${opts.title} | ${SITE_NAME}`;
  const raw = opts.description?.trim() || SITE_TAGLINE;
  const description = opts.verbatim ? raw : clipMeta(raw);
  const path = opts.path.startsWith("/") ? opts.path : `/${opts.path}`;
  const url = `${SITE_ORIGIN}${path === "/" ? "/" : path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(opts.noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_GB" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
