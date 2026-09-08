/** Official sites already filed in Sources. No invented URLs. */
export const ARTIST_SITES: Record<string, { href: string; label: string }> = {
  "tcha-limberger": {
    href: "https://www.tchalimberger.com/",
    label: "tchalimberger.com",
  },
  "roby-lakatos": {
    href: "https://www.roby-lakatos.com/",
    label: "roby-lakatos.com",
  },
  "hundred-tagu": {
    href: "https://www.100tagu.hu/",
    label: "100tagu.hu",
  },
  "gipsy-kings": {
    href: "https://www.gipsykings.com/",
    label: "gipsykings.com",
  },
  "fanfare-ciocarlia": {
    href: "https://www.asphalt-tango.de/artists/fanfare-ciocarlia",
    label: "Asphalt Tango — Fanfare Ciocărlia",
  },
  "aurel-ionita": {
    href: "https://www.asphalt-tango.de/artists/mahala-rai-banda",
    label: "Asphalt Tango — Mahala Rai Banda",
  },
};

export function artistSite(slug: string) {
  return ARTIST_SITES[slug];
}
