import { handleBookingRequest, ownsBookingDesk, resolveBookingRuntime } from "../booking-desk/handle.ts";

type BookingEvent = {
  req: Request & {
    runtime?: { cloudflare?: { env?: Record<string, unknown> } };
  };
};

function workerEnv(event: BookingEvent): Record<string, unknown> | null {
  const fromReq = event.req.runtime?.cloudflare?.env;
  const fromGlobal = (globalThis as { __env__?: Record<string, unknown> }).__env__;
  if (!fromReq && !fromGlobal) return null;
  return { ...(fromGlobal ?? {}), ...(fromReq ?? {}) };
}

export default async function bookingDeskMiddleware(
  event: BookingEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  const url = new URL(event.req.url);
  if (!ownsBookingDesk(event.req.method, url.pathname)) return next();
  const response = await handleBookingRequest(
    event.req,
    resolveBookingRuntime(process.env, workerEnv(event)),
  );
  if (!response) return next();
  return response;
}
