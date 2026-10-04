/** Login slugs are fixed. Display names are the live booking-page headings. */
export const ARTISTS = [
  { slug: "daniel-gueli", name: "Daniel Gueli Swing Orchestra" },
  { slug: "brady-winterstein", name: "Brady Winterstein Trio" },
  { slug: "marcia-bamberg", name: "Marcia Bamberg Swing Quartet" },
  { slug: "django-rosenberg", name: "Django Rosenberg Trio" },
] as const;

export type ArtistSlug = (typeof ARTISTS)[number]["slug"];

export const OWNER_ACCOUNT = "danielgueli@gmail.com";

/** Owner desk is this email only. Compared after trim, case-insensitively. */
export function isOwnerAccount(account: string): boolean {
  return account.trim().toLowerCase() === OWNER_ACCOUNT;
}

export function artistBySlug(slug: string) {
  return ARTISTS.find((artist) => artist.slug === slug) ?? null;
}
