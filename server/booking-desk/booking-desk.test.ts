import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { handleBookingRequest, type BookingRuntime } from "./handle.ts";
import { ARTISTS } from "./roster.ts";
import { loginPageHtml } from "./page.ts";
import {
  createD1Store,
  createMemoryStore,
  MISSING_BINDING_ERROR,
  storeFromBinding,
  type BookingStore,
  type D1Binding,
} from "./store.ts";

const PASSWORDS = {
  "daniel-gueli": "d-secret",
  "brady-winterstein": "b-secret",
  "marcia-bamberg": "m-secret",
  "django-rosenberg": "j-secret",
};

function runtime(store: BookingStore | null, now = () => 1_700_000_000): BookingRuntime {
  return {
    env: {
      BOOKING_OWNER_PASSWORD: "owner-secret",
      BOOKING_ARTIST_PASSWORDS: JSON.stringify(PASSWORDS),
      BOOKING_SESSION_SECRET: "session-secret",
    },
    store,
    now,
  };
}

async function call(
  method: string,
  path: string,
  ctx: BookingRuntime,
  options: { cookie?: string; json?: unknown } = {},
) {
  const headers = new Headers();
  if (options.cookie) headers.set("cookie", options.cookie);
  if (options.json !== undefined) headers.set("content-type", "application/json");
  return handleBookingRequest(
    new Request(`https://romanimusic.test${path}`, {
      method,
      headers,
      body: options.json !== undefined ? JSON.stringify(options.json) : undefined,
    }),
    ctx,
  );
}

function sessionCookie(response: Response): string {
  const raw = response.headers.getSetCookie?.()[0] ?? "";
  const match = raw.match(/booking_session=([^;]+)/);
  assert.ok(match, raw);
  return `booking_session=${match[1]}`;
}

describe("booking desk", () => {
  it("serves login without naming artists, and leaves static booking files alone", async () => {
    const page = await call("GET", "/booking/login", runtime(null));
    assert.ok(page);
    assert.equal(page.status, 200);
    const html = await page.text();
    assert.match(html, /\/booking\/js\/desk\.js/);
    const desk = readFileSync("public/booking/js/desk.js", "utf8");
    assert.match(desk, /"Email"/);
    assert.match(desk, /Password/);
    assert.match(desk, /password\.type = "password"/);
    for (const artist of ARTISTS) {
      assert.equal(html.includes(artist.slug), false);
      assert.equal(html.includes(artist.name), false);
    }
    assert.equal(loginPageHtml().includes("owner"), false);
    assert.equal(desk.includes('type="search"'), false);
    assert.equal(desk.toLowerCase().includes("search"), false);
    for (const artist of ARTISTS) assert.equal(desk.includes(artist.slug), false);

    for (const path of ["/booking/index.html", "/booking/about.html", "/", "/archive"]) {
      assert.equal(await call("GET", path, runtime(null)), null);
    }
  });

  it("keeps the short booking URLs pointed at the live pages", async () => {
    for (const [path, location] of [
      ["/booking", "/booking/index.html"],
      ["/booking/", "/booking/index.html"],
      ["/booking/about", "/booking/about.html"],
      ["/booking/contact", "/booking/contact.html"],
      ["/booking/booking", "/booking/booking.html"],
    ] as const) {
      const response = await call("GET", path, runtime(null));
      assert.ok(response);
      assert.equal(response.status, 302);
      assert.equal(response.headers.get("location"), location);
    }
  });

  it("puts the login link only on the footer logo", () => {
    for (const name of ["index.html", "about.html", "contact.html", "booking.html"]) {
      const html = readFileSync(`public/booking/${name}`, "utf8");
      assert.equal(html.match(/href="\/booking\/login"/g)?.length, 1, name);
      assert.match(html, /class="footer-logo" href="\/booking\/login"/);
      assert.match(html, /class="brand" href="https:\/\/romanimusic.com\/booking\/"/);
      const nav = html.slice(html.indexOf('class="site-nav"'), html.indexOf("</nav>"));
      assert.equal(nav.includes("/booking/login"), false);
    }
    const home = readFileSync("public/booking/index.html", "utf8");
    for (const artist of ARTISTS) assert.ok(home.includes(artist.name), artist.name);
  });

  it("signs in the owner and an artist, and rejects a wrong password", async () => {
    const store = createMemoryStore();
    const owner = await call("POST", "/booking/api/login", runtime(store), {
      json: { account: "danielgueli@gmail.com", password: "owner-secret" },
    });
    assert.ok(owner);
    assert.equal(owner.status, 200);
    assert.equal((await owner.json()).role, "owner");
    assert.match(sessionCookie(owner), /booking_session=/);

    const artist = await call("POST", "/booking/api/login", runtime(store), {
      json: { account: "brady-winterstein", password: "b-secret" },
    });
    assert.ok(artist);
    assert.deepEqual(await artist.json(), {
      role: "artist",
      slug: "brady-winterstein",
      name: "Brady Winterstein Trio",
    });

    const wrong = await call("POST", "/booking/api/login", runtime(store), {
      json: { account: "brady-winterstein", password: "nope" },
    });
    assert.ok(wrong);
    assert.equal(wrong.status, 401);
    assert.equal(wrong.headers.getSetCookie?.().length ?? 0, 0);

    const folded = await call("POST", "/booking/api/login", runtime(store), {
      json: { account: "  DanielGueli@Gmail.com  ", password: "owner-secret" },
    });
    assert.ok(folded);
    assert.equal(folded.status, 200);
    assert.equal((await folded.json()).role, "owner");

    const legacy = await call("POST", "/booking/api/login", runtime(store), {
      json: { account: "owner", password: "owner-secret" },
    });
    assert.ok(legacy);
    assert.equal(legacy.status, 401);

    const musician = await call("POST", "/booking/api/login", runtime(store), {
      json: { account: "daniel-gueli", password: "d-secret" },
    });
    assert.ok(musician);
    assert.equal((await musician.json()).role, "artist");
  });

  it("shows the owner a fixed list of four, then that artist's calendar", async () => {
    const store = createMemoryStore();
    const ctx = runtime(store);
    const owner = await call("POST", "/booking/api/login", ctx, {
      json: { account: "danielgueli@gmail.com", password: "owner-secret" },
    });
    assert.ok(owner);
    const cookie = sessionCookie(owner);
    const list = await call("GET", "/booking/api/artists", ctx, { cookie });
    assert.ok(list);
    assert.deepEqual(
      (await list.json()).artists.map((artist: { slug: string }) => artist.slug),
      ARTISTS.map((artist) => artist.slug),
    );

    const artistLogin = await call("POST", "/booking/api/login", ctx, {
      json: { account: "daniel-gueli", password: "d-secret" },
    });
    assert.ok(artistLogin);
    const denied = await call("GET", "/booking/api/artists", ctx, {
      cookie: sessionCookie(artistLogin),
    });
    assert.ok(denied);
    assert.equal(denied.status, 403);
  });

  it("lets owner and artist note an open date, and blocks only after consultation", async () => {
    const store = createMemoryStore();
    let blocks = 0;
    const watched: BookingStore = {
      ...store,
      confirmBlock: async (artist, date, at) => {
        blocks += 1;
        return store.confirmBlock(artist, date, at);
      },
    };
    const ctx = runtime(watched);
    const artistLogin = await call("POST", "/booking/api/login", ctx, {
      json: { account: "marcia-bamberg", password: "m-secret" },
    });
    assert.ok(artistLogin);
    const artistCookie = sessionCookie(artistLogin);
    const ownerLogin = await call("POST", "/booking/api/login", ctx, {
      json: { account: "danielgueli@gmail.com", password: "owner-secret" },
    });
    assert.ok(ownerLogin);
    const ownerCookie = sessionCookie(ownerLogin);

    const artistBlock = await call(
      "POST",
      "/booking/api/dates/2026-10-12/block",
      ctx,
      { cookie: artistCookie, json: {} },
    );
    assert.ok(artistBlock);
    assert.equal(artistBlock.status, 403);
    assert.match(await artistBlock.text(), /cannot block/);
    assert.equal(blocks, 0);

    const early = await call("POST", "/booking/api/dates/2026-10-12/block", ctx, {
      cookie: ownerCookie,
      json: { artist: "marcia-bamberg" },
    });
    assert.ok(early);
    assert.equal(early.status, 403);
    assert.match(await early.text(), /consultation/);
    assert.equal(blocks, 0);

    const note = await call("POST", "/booking/api/dates/2026-10-12/notes", ctx, {
      cookie: artistCookie,
      json: { text: "Set an option" },
    });
    assert.ok(note);
    assert.equal(note.status, 200);
    const noted = await note.json();
    assert.equal(noted.notes[0].text, "Set an option");
    assert.equal(noted.notes[0].author, "Marcia Bamberg Swing Quartet");
    assert.equal(noted.blocked, false);

    const other = await call("POST", "/booking/api/dates/2026-10-12/notes", ctx, {
      cookie: artistCookie,
      json: { artist: "django-rosenberg", text: "Not mine" },
    });
    assert.ok(other);
    assert.equal(other.status, 403);

    const ownerNote = await call("POST", "/booking/api/dates/2026-10-12/notes", ctx, {
      cookie: ownerCookie,
      json: { artist: "marcia-bamberg", text: "Hold the date" },
    });
    assert.ok(ownerNote);
    assert.equal(ownerNote.status, 200);

    const blocked = await call("POST", "/booking/api/dates/2026-10-12/block", ctx, {
      cookie: ownerCookie,
      json: { artist: "marcia-bamberg" },
    });
    assert.ok(blocked);
    assert.equal(blocked.status, 200);
    assert.equal((await blocked.json()).blocked, true);
    assert.equal(blocks, 1);

    const calendar = await call(
      "GET",
      "/booking/api/calendar?month=2026-10",
      ctx,
      { cookie: artistCookie },
    );
    assert.ok(calendar);
    const body = await calendar.json();
    assert.equal(body.artist.name, "Marcia Bamberg Swing Quartet");
    assert.deepEqual(body.dates, [{ date: "2026-10-12", blocked: true, noteCount: 2 }]);

    const foreign = await call(
      "GET",
      "/booking/api/calendar?month=2026-10&artist=django-rosenberg",
      ctx,
      { cookie: artistCookie },
    );
    assert.ok(foreign);
    assert.equal(foreign.status, 403);
  });

  it("fails clearly when BOOKING_DB is missing and does not pretend a save worked", async () => {
    const ctx = runtime(null);
    const login = await call("POST", "/booking/api/login", ctx, {
      json: { account: "danielgueli@gmail.com", password: "owner-secret" },
    });
    assert.ok(login);
    const response = await call("POST", "/booking/api/dates/2026-10-03/notes", ctx, {
      cookie: sessionCookie(login),
      json: { artist: "daniel-gueli", text: "Set an option" },
    });
    assert.ok(response);
    assert.equal(response.status, 503);
    const body = await response.json();
    assert.equal(body.error, MISSING_BINDING_ERROR);
    assert.equal(body.dates, undefined);
    assert.equal(body.ok, undefined);
    assert.equal(storeFromBinding(undefined), null);
    assert.equal(storeFromBinding({ prepare() {} }), null);
  });

  it("rejects a tampered or expired session", async () => {
    const store = createMemoryStore();
    const login = await call("POST", "/booking/api/login", runtime(store), {
      json: { account: "danielgueli@gmail.com", password: "owner-secret" },
    });
    assert.ok(login);
    const cookie = sessionCookie(login);
    const tampered = cookie.replace(/.$/, cookie.endsWith("a") ? "b" : "a");
    const bad = await call("GET", "/booking/api/session", runtime(store), { cookie: tampered });
    assert.ok(bad);
    assert.equal(bad.status, 401);

    const early = await call(
      "POST",
      "/booking/api/login",
      runtime(store, () => 1_000),
      { json: { account: "danielgueli@gmail.com", password: "owner-secret" } },
    );
    assert.ok(early);
    const expired = await call(
      "GET",
      "/booking/api/session",
      runtime(store, () => 1_000 + 20 * 24 * 60 * 60),
      { cookie: sessionCookie(early) },
    );
    assert.ok(expired);
    assert.equal(expired.status, 401);
  });

  it("reports missing password configuration instead of a successful login", async () => {
    const response = await call(
      "POST",
      "/booking/api/login",
      {
        env: {
          BOOKING_OWNER_PASSWORD: "owner-secret",
          BOOKING_ARTIST_PASSWORDS: "{",
          BOOKING_SESSION_SECRET: "session-secret",
        },
        store: createMemoryStore(),
      },
      { json: { account: "danielgueli@gmail.com", password: "owner-secret" } },
    );
    assert.ok(response);
    assert.equal(response.status, 500);
    assert.match(await response.text(), /BOOKING_ARTIST_PASSWORDS/);
  });

  it("does not confirm a D1 block when the date has no consultation note", async () => {
    const runs: string[] = [];
    let schema = "";
    const statement = (sql: string) => {
      const bound = {
        bind() {
          return bound;
        },
        async all() {
          return { results: [] };
        },
        async first() {
          return { n: 0 };
        },
        async run() {
          runs.push(sql);
        },
      };
      return bound;
    };
    const db = {
      async exec(sql: string) {
        schema = sql;
      },
      prepare: statement,
      async batch(statements: Array<{ run: () => Promise<void> }>) {
        for (const item of statements) await item.run();
      },
    };
    const d1 = createD1Store(db as D1Binding);
    await assert.rejects(() => d1.confirmBlock("daniel-gueli", "2026-10-03", "2026-10-03T00:00:00.000Z"), /consultation/);
    assert.equal(runs.length, 0);
    assert.match(schema, /booking_dates/);
    assert.match(schema, /booking_notes/);
  });
});
