import { GYPSY_JAZZ_HUB, SITE_NAME, SITE_ORIGIN, SITE_TAGLINE } from "@/lib/site";

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function siteGraph(extra: Record<string, unknown>[] = []) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        name: SITE_NAME,
        url: SITE_ORIGIN,
        description: SITE_TAGLINE,
        inLanguage: "en",
        publisher: { "@id": `${SITE_ORIGIN}/#org` },
      },
      {
        "@type": "NonprofitOrganization",
        "@id": `${SITE_ORIGIN}/#org`,
        name: SITE_NAME,
        url: SITE_ORIGIN,
        email: "donate@romanimusic.com",
        address: { "@type": "PostalAddress", addressCountry: "NL" },
        sameAs: [GYPSY_JAZZ_HUB],
      },
      ...extra,
    ],
  };
}
