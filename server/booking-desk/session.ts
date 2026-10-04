const COOKIE = "booking_session";
const MAX_AGE_SEC = 14 * 24 * 60 * 60;

export type SessionUser =
  | { role: "owner" }
  | { role: "artist"; slug: string };

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  const length = Math.max(a.length, b.length);
  let diff = a.length === b.length ? 0 : 1;
  for (let i = 0; i < length; i++) diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  return diff === 0;
}

async function hmac(secret: string, body: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  return new Uint8Array(sig);
}

export async function sealSession(
  user: SessionUser,
  secret: string,
  nowSec: number,
): Promise<string> {
  const payload = {
    role: user.role,
    slug: user.role === "artist" ? user.slug : undefined,
    exp: nowSec + MAX_AGE_SEC,
  };
  const body = bytesToBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const sig = bytesToBase64Url(await hmac(secret, body));
  return `${body}.${sig}`;
}

export async function openSession(
  token: string,
  secret: string,
  nowSec: number,
): Promise<SessionUser | null> {
  const dot = token.indexOf(".");
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  let expected: Uint8Array;
  try {
    expected = await hmac(secret, body);
  } catch {
    return null;
  }
  let given: Uint8Array;
  try {
    given = base64UrlToBytes(sig);
  } catch {
    return null;
  }
  if (!timingSafeEqual(expected, given)) return null;
  let payload: { role?: string; slug?: string; exp?: number };
  try {
    payload = JSON.parse(new TextDecoder().decode(base64UrlToBytes(body)));
  } catch {
    return null;
  }
  if (typeof payload.exp !== "number" || payload.exp < nowSec) return null;
  if (payload.role === "owner") return { role: "owner" };
  if (payload.role === "artist" && typeof payload.slug === "string") {
    return { role: "artist", slug: payload.slug };
  }
  return null;
}

export function readSessionCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === COOKIE) return rest.join("=");
  }
  return null;
}

export function sessionCookie(token: string, secure: boolean): string {
  const parts = [
    `${COOKIE}=${token}`,
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    `Max-Age=${MAX_AGE_SEC}`,
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

export function clearSessionCookie(secure: boolean): string {
  const parts = [`${COOKIE}=`, "HttpOnly", "Path=/", "SameSite=Lax", "Max-Age=0"];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}
