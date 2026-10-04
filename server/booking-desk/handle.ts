import { ARTISTS, OWNER_ACCOUNT, artistBySlug, isOwnerAccount } from "./roster.ts";
import { loginPageHtml } from "./page.ts";
import {
  clearSessionCookie,
  openSession,
  readSessionCookie,
  sealSession,
  sessionCookie,
  type SessionUser,
} from "./session.ts";
import {
  BookingStoreError,
  MISSING_BINDING_ERROR,
  storeFromBinding,
  type BookingStore,
} from "./store.ts";

export type BookingEnv = {
  BOOKING_OWNER_PASSWORD?: string;
  BOOKING_ARTIST_PASSWORDS?: string;
  BOOKING_SESSION_SECRET?: string;
};

export type BookingRuntime = {
  env: BookingEnv;
  store: BookingStore | null;
  now?: () => number;
};

const ARTIST_BLOCK =
  "An artist cannot block a date. The owner confirms a block only as part of a consultation.";
const CONSULTATION_BLOCK =
  "A date is blocked only in consultation. Add a note on this date first. The owner confirms the block after that.";

const SHORT_PAGES: Record<string, string> = {
  "/booking": "/booking/index.html",
  "/booking/about": "/booking/about.html",
  "/booking/contact": "/booking/contact.html",
  "/booking/booking": "/booking/booking.html",
};

export function ownsBookingDesk(method: string, rawPath: string): boolean {
  const path = normalizePath(rawPath);
  if (path === "/booking/login" || path.startsWith("/booking/api/")) return true;
  if (method !== "GET" && method !== "HEAD") return false;
  return Object.prototype.hasOwnProperty.call(SHORT_PAGES, path);
}

export function resolveBookingRuntime(
  proc: Record<string, string | undefined>,
  workerEnv?: Record<string, unknown> | null,
): BookingRuntime {
  return {
    env: {
      BOOKING_OWNER_PASSWORD: pickString(workerEnv, proc, "BOOKING_OWNER_PASSWORD"),
      BOOKING_ARTIST_PASSWORDS: pickString(workerEnv, proc, "BOOKING_ARTIST_PASSWORDS"),
      BOOKING_SESSION_SECRET: pickString(workerEnv, proc, "BOOKING_SESSION_SECRET"),
    },
    store: storeFromBinding(workerEnv?.BOOKING_DB),
  };
}

function pickString(
  worker: Record<string, unknown> | null | undefined,
  proc: Record<string, string | undefined>,
  key: string,
): string | undefined {
  const fromWorker = worker?.[key];
  if (typeof fromWorker === "string" && fromWorker.length > 0) return fromWorker;
  const fromProc = proc[key];
  if (typeof fromProc === "string" && fromProc.length > 0) return fromProc;
  return undefined;
}

function normalizePath(pathname: string): string {
  const path = pathname.split("?")[0] || "/";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

function json(status: number, body: unknown, extra?: HeadersInit): Response {
  const headers = new Headers(extra);
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("cache-control", "no-store");
  headers.set("x-robots-tag", "noindex");
  return new Response(JSON.stringify(body), { status, headers });
}

function html(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex",
    },
  });
}

function redirect(location: string): Response {
  return new Response(null, {
    status: 302,
    headers: { location, "cache-control": "no-cache" },
  });
}

type Accounts =
  | { ok: true; ownerPassword: string; artists: Map<string, string> }
  | { ok: false; error: string };

function loadAccounts(env: BookingEnv): Accounts {
  if (!env.BOOKING_OWNER_PASSWORD) {
    return { ok: false, error: "BOOKING_OWNER_PASSWORD is not set." };
  }
  if (!env.BOOKING_ARTIST_PASSWORDS) {
    return { ok: false, error: "BOOKING_ARTIST_PASSWORDS is not set." };
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(env.BOOKING_ARTIST_PASSWORDS);
  } catch {
    return { ok: false, error: "BOOKING_ARTIST_PASSWORDS is not valid JSON." };
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { ok: false, error: "BOOKING_ARTIST_PASSWORDS must be a JSON object of slug to password." };
  }
  const artists = new Map<string, string>();
  for (const artist of ARTISTS) {
    const value = (parsed as Record<string, unknown>)[artist.slug];
    if (typeof value !== "string" || value.length === 0) {
      return { ok: false, error: `BOOKING_ARTIST_PASSWORDS is missing a password for ${artist.slug}.` };
    }
    artists.set(artist.slug, value);
  }
  return { ok: true, ownerPassword: env.BOOKING_OWNER_PASSWORD, artists };
}

async function sameSecret(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const [left, right] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(a)),
    crypto.subtle.digest("SHA-256", enc.encode(b)),
  ]);
  const x = new Uint8Array(left);
  const y = new Uint8Array(right);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

function monthRange(month: string): { from: string; to: string } | null {
  if (!/^\d{4}-\d{2}$/.test(month)) return null;
  const year = Number(month.slice(0, 4));
  const mon = Number(month.slice(5, 7));
  if (mon < 1 || mon > 12) return null;
  const last = new Date(Date.UTC(year, mon, 0)).getUTCDate();
  const mm = String(mon).padStart(2, "0");
  return { from: `${year}-${mm}-01`, to: `${year}-${mm}-${String(last).padStart(2, "0")}` };
}

function validDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const year = Number(date.slice(0, 4));
  const mon = Number(date.slice(5, 7));
  const day = Number(date.slice(8, 10));
  const dt = new Date(Date.UTC(year, mon - 1, day));
  return dt.getUTCFullYear() === year && dt.getUTCMonth() === mon - 1 && dt.getUTCDate() === day;
}

async function readJson(request: Request): Promise<Record<string, unknown> | Response> {
  const text = await request.text();
  if (text.length > 100_000) return json(413, { error: "Request body is too large." });
  if (!text) return {};
  try {
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return json(400, { error: "Expected a JSON object." });
    }
    return parsed as Record<string, unknown>;
  } catch {
    return json(400, { error: "Expected JSON." });
  }
}

function requireStore(store: BookingStore | null): BookingStore | Response {
  if (!store) return json(503, { error: MISSING_BINDING_ERROR });
  return store;
}

function present(record: Awaited<ReturnType<BookingStore["get"]>>, name: string) {
  return {
    artist: record.artist,
    name,
    date: record.date,
    blocked: record.blocked,
    blockedAt: record.blockedAt,
    notes: record.notes.map((note) => ({
      id: note.id,
      role: note.role,
      author: note.role === "owner" ? "Owner" : name,
      text: note.text,
      createdAt: note.createdAt,
    })),
  };
}

export async function handleBookingRequest(
  request: Request,
  runtime: BookingRuntime,
): Promise<Response | null> {
  const url = new URL(request.url);
  const method = request.method.toUpperCase();
  const path = normalizePath(url.pathname);
  if (!ownsBookingDesk(method, path)) return null;

  if (method === "GET" || method === "HEAD") {
    const target = SHORT_PAGES[path];
    if (target) return redirect(target);
  }

  if (path === "/booking/login") {
    if (method !== "GET" && method !== "HEAD") return json(405, { error: "Method not allowed." });
    return html(loginPageHtml());
  }

  if (!path.startsWith("/booking/api/")) return json(404, { error: "Not found." });

  const now = runtime.now ?? (() => Math.floor(Date.now() / 1000));
  const secure = url.protocol === "https:";

  if (path === "/booking/api/login" && method === "POST") {
    return login(request, runtime, now(), secure);
  }
  if (path === "/booking/api/logout" && method === "POST") {
    return json(200, { ok: true }, { "set-cookie": clearSessionCookie(secure) });
  }

  const session = await requireSession(request, runtime, now());
  if (session instanceof Response) return session;

  if (path === "/booking/api/session" && method === "GET") return sessionResponse(session);
  if (path === "/booking/api/artists" && method === "GET") {
    if (session.role !== "owner") return json(403, { error: "Only the owner can list artists." });
    return json(200, { artists: ARTISTS.map((artist) => ({ slug: artist.slug, name: artist.name })) });
  }

  const dateMatch = path.match(/^\/booking\/api\/dates\/(\d{4}-\d{2}-\d{2})(\/notes|\/block)?$/);
  if (dateMatch) {
    const date = dateMatch[1];
    const action = dateMatch[2] ?? "";
    if (!validDate(date)) return json(400, { error: "Date must be YYYY-MM-DD." });
    if (action === "" && method === "GET") return getDate(url, session, runtime, date);
    if (action === "/notes" && method === "POST") return addNote(request, session, runtime, date, now());
    if (action === "/block" && method === "POST") return confirmBlock(request, session, runtime, date, now());
    return json(405, { error: "Method not allowed." });
  }

  if (path === "/booking/api/calendar" && method === "GET") return calendar(url, session, runtime);

  if (method !== "GET" && method !== "POST") return json(405, { error: "Method not allowed." });
  return json(404, { error: "Not found." });
}

async function login(
  request: Request,
  runtime: BookingRuntime,
  nowSec: number,
  secure: boolean,
): Promise<Response> {
  if (!runtime.env.BOOKING_SESSION_SECRET) {
    return json(500, { error: "BOOKING_SESSION_SECRET is not set." });
  }
  const accounts = loadAccounts(runtime.env);
  if (!accounts.ok) return json(500, { error: accounts.error });
  const body = await readJson(request);
  if (body instanceof Response) return body;
  const account = typeof body.account === "string" ? body.account.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!account || !password) return json(400, { error: "Email and password are required." });

  let expected: string | null = null;
  let user: SessionUser | null = null;
  if (isOwnerAccount(account)) {
    expected = accounts.ownerPassword;
    user = { role: "owner" };
  } else {
    const artistPassword = accounts.artists.get(account);
    if (artistPassword) {
      expected = artistPassword;
      user = { role: "artist", slug: account };
    }
  }
  const matches = await sameSecret(password, expected ?? "booking-desk-no-such-account");
  if (!user || !matches) return json(401, { error: "Email or password is wrong." });

  const token = await sealSession(user, runtime.env.BOOKING_SESSION_SECRET, nowSec);
  return json(200, sessionBody(user), { "set-cookie": sessionCookie(token, secure) });
}

function sessionBody(user: SessionUser) {
  if (user.role === "owner") return { role: "owner" as const };
  const artist = artistBySlug(user.slug);
  return { role: "artist" as const, slug: user.slug, name: artist?.name ?? user.slug };
}

function sessionResponse(user: SessionUser): Response {
  return json(200, sessionBody(user));
}

async function requireSession(
  request: Request,
  runtime: BookingRuntime,
  nowSec: number,
): Promise<SessionUser | Response> {
  if (!runtime.env.BOOKING_SESSION_SECRET) {
    return json(500, { error: "BOOKING_SESSION_SECRET is not set." });
  }
  const token = readSessionCookie(request.headers.get("cookie"));
  if (!token) return json(401, { error: "Sign in required." });
  const user = await openSession(token, runtime.env.BOOKING_SESSION_SECRET, nowSec);
  if (!user) return json(401, { error: "Sign in required." });
  if (user.role === "artist" && !artistBySlug(user.slug)) {
    return json(401, { error: "Sign in required." });
  }
  return user;
}

function artistForRequest(session: SessionUser, requested: string | null): string | Response {
  if (session.role === "artist") {
    if (requested && requested !== session.slug) {
      return json(403, { error: "That calendar belongs to another artist." });
    }
    return session.slug;
  }
  if (!requested || !artistBySlug(requested)) {
    return json(400, { error: "Choose one of the four artists." });
  }
  return requested;
}

async function calendar(
  url: URL,
  session: SessionUser,
  runtime: BookingRuntime,
): Promise<Response> {
  const store = requireStore(runtime.store);
  if (store instanceof Response) return store;
  const slug = artistForRequest(session, url.searchParams.get("artist"));
  if (slug instanceof Response) return slug;
  const month = url.searchParams.get("month") ?? "";
  const range = monthRange(month);
  if (!range) return json(400, { error: "Month must be YYYY-MM." });
  const artist = artistBySlug(slug);
  if (!artist) return json(400, { error: "Choose one of the four artists." });
  try {
    const rows = await store.list(slug, range.from, range.to);
    return json(200, {
      artist: { slug: artist.slug, name: artist.name },
      month,
      dates: rows.map((row) => ({
        date: row.date,
        blocked: row.blocked,
        noteCount: row.notes.length,
      })),
    });
  } catch (err) {
    return storeFailure(err);
  }
}

async function getDate(
  url: URL,
  session: SessionUser,
  runtime: BookingRuntime,
  date: string,
): Promise<Response> {
  const store = requireStore(runtime.store);
  if (store instanceof Response) return store;
  const slug = artistForRequest(session, url.searchParams.get("artist"));
  if (slug instanceof Response) return slug;
  const artist = artistBySlug(slug);
  if (!artist) return json(400, { error: "Choose one of the four artists." });
  try {
    return json(200, present(await store.get(slug, date), artist.name));
  } catch (err) {
    return storeFailure(err);
  }
}

async function addNote(
  request: Request,
  session: SessionUser,
  runtime: BookingRuntime,
  date: string,
  nowSec: number,
): Promise<Response> {
  const store = requireStore(runtime.store);
  if (store instanceof Response) return store;
  const body = await readJson(request);
  if (body instanceof Response) return body;
  const requested = typeof body.artist === "string" ? body.artist : null;
  const slug = artistForRequest(session, requested);
  if (slug instanceof Response) return slug;
  const artist = artistBySlug(slug);
  if (!artist) return json(400, { error: "Choose one of the four artists." });
  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) return json(400, { error: "Write a note." });
  if (text.length > 1000) return json(400, { error: "Note is too long." });
  try {
    const record = await store.addNote(slug, date, {
      id: crypto.randomUUID(),
      role: session.role,
      author: session.role === "owner" ? OWNER_ACCOUNT : slug,
      text,
      createdAt: new Date(nowSec * 1000).toISOString(),
    });
    return json(200, present(record, artist.name));
  } catch (err) {
    return storeFailure(err);
  }
}

async function confirmBlock(
  request: Request,
  session: SessionUser,
  runtime: BookingRuntime,
  date: string,
  nowSec: number,
): Promise<Response> {
  if (session.role !== "owner") return json(403, { error: ARTIST_BLOCK });
  const store = requireStore(runtime.store);
  if (store instanceof Response) return store;
  const body = await readJson(request);
  if (body instanceof Response) return body;
  const requested = typeof body.artist === "string" ? body.artist : null;
  const slug = artistForRequest(session, requested);
  if (slug instanceof Response) return slug;
  const artist = artistBySlug(slug);
  if (!artist) return json(400, { error: "Choose one of the four artists." });
  try {
    const existing = await store.get(slug, date);
    if (existing.notes.length === 0) return json(403, { error: CONSULTATION_BLOCK });
    const record = await store.confirmBlock(slug, date, new Date(nowSec * 1000).toISOString());
    return json(200, present(record, artist.name));
  } catch (err) {
    return storeFailure(err);
  }
}

function storeFailure(err: unknown): Response {
  if (err instanceof BookingStoreError && err.code === "CONSULTATION_REQUIRED") {
    return json(403, { error: CONSULTATION_BLOCK });
  }
  const message = err instanceof Error ? err.message : "Booking store failed.";
  return json(500, { error: `Booking store failed: ${message}` });
}
