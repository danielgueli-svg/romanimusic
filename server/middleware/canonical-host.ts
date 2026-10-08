/**
 * Canonical host: 301 the bare domain to www for archive pages rendered by
 * this Worker (GSC listed https://romanimusic.com/ under "Excluded by noindex").
 *
 * Static assets (public/booking/*, robots.txt, images) are served before the
 * Worker runs, so they never reach this middleware. A Cloudflare zone Redirect
 * Rule (romanimusic.com/* -> https://www.romanimusic.com/${1}, 301) covers those.
 *
 * Never touches the booking desk (login page and /booking/api/*), auth routes,
 * or non-GET/HEAD requests, so a session or form post is not broken mid-flight.
 */
const BARE_HOST = "romanimusic.com";
const CANONICAL_ORIGIN = "https://www.romanimusic.com";

type CanonicalEvent = { req: Request };

function skip(method: string, pathname: string): boolean {
  if (method !== "GET" && method !== "HEAD") return true;
  if (pathname === "/booking" || pathname.startsWith("/booking/")) return true;
  if (pathname.startsWith("/api/")) return true;
  return false;
}

export default function canonicalHostMiddleware(
  event: CanonicalEvent,
  next: () => unknown | Promise<unknown>,
): unknown | Promise<unknown> {
  const url = new URL(event.req.url);
  if (url.hostname !== BARE_HOST) return next();
  if (skip(event.req.method.toUpperCase(), url.pathname)) return next();
  return new Response(null, {
    status: 301,
    headers: {
      location: `${CANONICAL_ORIGIN}${url.pathname}${url.search}`,
      "cache-control": "public, max-age=3600",
    },
  });
}
