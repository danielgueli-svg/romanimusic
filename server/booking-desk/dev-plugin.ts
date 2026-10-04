import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import { handleBookingRequest, ownsBookingDesk, resolveBookingRuntime } from "./handle.ts";

async function toRequest(req: IncomingMessage): Promise<Request> {
  const method = (req.method ?? "GET").toUpperCase();
  const host = req.headers.host ?? "localhost";
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const item of value) headers.append(key, item);
    } else {
      headers.set(key, value);
    }
  }
  const hasBody = method !== "GET" && method !== "HEAD";
  let body: BodyInit | undefined;
  if (hasBody) {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    const buf = Buffer.concat(chunks);
    if (buf.byteLength > 0) body = new Blob([buf]);
  }
  return new Request(`http://${host}${req.url ?? "/"}`, {
    method,
    headers,
    body,
  });
}

async function writeResponse(res: ServerResponse, response: Response) {
  res.statusCode = response.status;
  const cookies =
    typeof response.headers.getSetCookie === "function" ? response.headers.getSetCookie() : [];
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") return;
    res.setHeader(key, value);
  });
  for (const cookie of cookies) res.appendHeader("set-cookie", cookie);
  const bytes = Buffer.from(await response.arrayBuffer());
  res.end(bytes);
}

/** Dev server only. The built worker uses server/middleware/booking-desk.ts. */
export function bookingDeskDevPlugin(): Plugin {
  return {
    name: "romanimusic:booking-desk",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const method = (req.method ?? "GET").toUpperCase();
          const path = (req.url ?? "/").split("?")[0] || "/";
          if (!ownsBookingDesk(method, path)) {
            next();
            return;
          }
          const response = await handleBookingRequest(
            await toRequest(req),
            resolveBookingRuntime(process.env),
          );
          if (!response) {
            next();
            return;
          }
          await writeResponse(res, response);
        } catch (err) {
          console.error("[booking-desk]", err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("content-type", "text/plain; charset=utf-8");
            res.end("booking desk failed");
          }
        }
      });
    },
  };
}
