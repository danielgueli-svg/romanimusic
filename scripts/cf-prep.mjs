#!/usr/bin/env node
/**
 * After a Cloudflare Worker build, set worker name + observability + auth URL.
 * Minimal — no HubDb / Durable Objects / crons.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const wranglerPath = join(root, ".output/server/wrangler.json");

if (!existsSync(wranglerPath)) {
  console.error("[cf-prep] missing", wranglerPath);
  process.exit(1);
}

function readVars(path) {
  if (!path || !existsSync(path)) return {};
  try {
    const parsed = JSON.parse(readFileSync(path, "utf8"));
    return parsed.vars && typeof parsed.vars === "object" ? parsed.vars : {};
  } catch {
    return {};
  }
}

const prevVars = readVars(process.env.CF_PREV_WRANGLER);
const cfg = JSON.parse(readFileSync(wranglerPath, "utf8"));
cfg.name = "romanimusic";
cfg.observability = {
  enabled: true,
  head_sampling_rate: 1,
  logs: {
    enabled: true,
    invocation_logs: true,
    head_sampling_rate: 1,
  },
};
cfg.vars = {
  ...prevVars,
  ...(cfg.vars || {}),
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "https://www.romanimusic.com",
};
const bookingD1Id = process.env.BOOKING_D1_ID;
if (bookingD1Id) {
  cfg.d1_databases = [
    {
      binding: "BOOKING_DB",
      database_name: "romanimusic-booking",
      database_id: bookingD1Id,
    },
  ];
} else {
  console.log(
    "[cf-prep] BOOKING_D1_ID unset; not writing the BOOKING_DB binding. Calendar saves fail until Maintenance creates it.",
  );
}
writeFileSync(wranglerPath, JSON.stringify(cfg, null, 2) + "\n");
console.log("[cf-prep] wrangler.json ready for romanimusic");
