import { ARTISTS, CHAPTERS, FAMILIES, TRADITIONS } from "@/data/catalog";
import { SITE_ORIGIN } from "./site";

const STATIC = [
  "/",
  "/history",
  "/history/timeline",
  "/history/culture",
  "/styles",
  "/families",
  "/artists",
  "/events",
  "/foundation",
  "/donate",
  "/contact",
  "/sources",
  "/work",
];

export function sitemapPaths(): string[] {
  const extra = [
    ...CHAPTERS.map((c) => `/history/${c.slug}`),
    ...TRADITIONS.map((t) => `/styles/${t.slug}`),
    ...FAMILIES.map((f) => `/families/${f.slug}`),
    ...ARTISTS.map((a) => `/artists/${a.slug}`),
  ];
  return [...new Set([...STATIC, ...extra])];
}

export function sitemapXml(): string {
  const urls = sitemapPaths()
    .map((path) => {
      const loc = `${SITE_ORIGIN}${path === "/" ? "/" : path}`;
      const priority =
        path === "/" ? "1.0" : path.split("/").length <= 2 ? "0.8" : "0.6";
      return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
