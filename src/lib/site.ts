export const SITE_NAME = "Romani Music";
export const SITE_DOMAIN = "romanimusic.com";
export const SITE_ORIGIN = "https://www.romanimusic.com";
export const BOOKING_AGENCY_TITLE = "Romani Music International Booking Agency";
export const BOOKING_EMAIL = "info@romanimusic.com";

export function isBookingPath(pathname: string) {
  return pathname === "/booking" || pathname.startsWith("/booking/");
}
export const SITE_TAGLINE =
  "An archive of Romani music. Romani musicians play in many countries. The music differs from country to country.";
export const GYPSY_JAZZ_HUB = "https://gypsyjazzhub.com";
export const DONATE_EMAIL = "donate@romanimusic.com";
export const OG_IMAGE = `${SITE_ORIGIN}/og.jpg`;
