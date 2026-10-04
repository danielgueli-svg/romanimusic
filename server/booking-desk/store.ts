export const BOOKING_DB_BINDING = "BOOKING_DB";
export const BOOKING_DB_NAME = "romanimusic-booking";

export const MISSING_BINDING_ERROR =
  "BOOKING_DB binding is missing. Create the D1 database romanimusic-booking and bind it as BOOKING_DB. Nothing was saved.";

export class BookingStoreError extends Error {
  readonly code: "CONSULTATION_REQUIRED";
  constructor(message: string, code: "CONSULTATION_REQUIRED") {
    super(message);
    this.name = "BookingStoreError";
    this.code = code;
  }
}

export type BookingNote = {
  id: string;
  role: "owner" | "artist";
  author: string;
  text: string;
  createdAt: string;
};

export type BookingDateRecord = {
  artist: string;
  date: string;
  blocked: boolean;
  blockedAt: string | null;
  notes: BookingNote[];
};

export interface BookingStore {
  list(artist: string, from: string, to: string): Promise<BookingDateRecord[]>;
  get(artist: string, date: string): Promise<BookingDateRecord>;
  addNote(artist: string, date: string, note: BookingNote): Promise<BookingDateRecord>;
  confirmBlock(artist: string, date: string, at: string): Promise<BookingDateRecord>;
}

export interface D1Prepared {
  bind(...values: unknown[]): D1Prepared;
  all<T = Record<string, unknown>>(): Promise<{ results?: T[] }>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run(): Promise<unknown>;
}

export interface D1Binding {
  prepare(sql: string): D1Prepared;
  exec(sql: string): Promise<unknown>;
  batch(statements: D1Prepared[]): Promise<unknown>;
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS booking_dates (
  artist TEXT NOT NULL,
  date TEXT NOT NULL,
  blocked INTEGER NOT NULL DEFAULT 0,
  blocked_at TEXT,
  PRIMARY KEY (artist, date)
);
CREATE TABLE IF NOT EXISTS booking_notes (
  id TEXT PRIMARY KEY,
  artist TEXT NOT NULL,
  date TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS booking_notes_artist_date ON booking_notes (artist, date);
`;

const CONSULTATION =
  "A date is blocked only in consultation. Add a note on this date first.";

function emptyRecord(artist: string, date: string): BookingDateRecord {
  return { artist, date, blocked: false, blockedAt: null, notes: [] };
}

function clone(record: BookingDateRecord): BookingDateRecord {
  return {
    ...record,
    notes: record.notes.map((note) => ({ ...note })),
  };
}

export function createMemoryStore(): BookingStore {
  const rows = new Map<string, BookingDateRecord>();
  const key = (artist: string, date: string) => `${artist}|${date}`;

  return {
    async list(artist, from, to) {
      const found: BookingDateRecord[] = [];
      for (const row of rows.values()) {
        if (row.artist === artist && row.date >= from && row.date <= to) found.push(clone(row));
      }
      found.sort((a, b) => a.date.localeCompare(b.date));
      return found;
    },
    async get(artist, date) {
      return clone(rows.get(key(artist, date)) ?? emptyRecord(artist, date));
    },
    async addNote(artist, date, note) {
      const row = rows.get(key(artist, date)) ?? emptyRecord(artist, date);
      row.notes = [...row.notes, { ...note }];
      rows.set(key(artist, date), row);
      return clone(row);
    },
    async confirmBlock(artist, date, at) {
      const row = rows.get(key(artist, date));
      if (!row || row.notes.length === 0) throw new BookingStoreError(CONSULTATION, "CONSULTATION_REQUIRED");
      row.blocked = true;
      row.blockedAt = at;
      rows.set(key(artist, date), row);
      return clone(row);
    },
  };
}

type NoteRow = {
  id: string;
  artist: string;
  date: string;
  author: string;
  role: string;
  body: string;
  created_at: string;
};

type DateRow = {
  artist: string;
  date: string;
  blocked: number;
  blocked_at: string | null;
};

function noteFromRow(row: NoteRow): BookingNote {
  return {
    id: row.id,
    role: row.role === "owner" ? "owner" : "artist",
    author: row.author,
    text: row.body,
    createdAt: row.created_at,
  };
}

export function createD1Store(db: D1Binding): BookingStore {
  let ready: Promise<void> | null = null;
  const ensure = () => {
    ready ??= Promise.resolve(db.exec(SCHEMA)).then(
      () => undefined,
      (err) => {
        ready = null;
        throw err;
      },
    );
    return ready;
  };

  async function readOne(artist: string, date: string): Promise<BookingDateRecord> {
    const dateRow = await db
      .prepare(
        "SELECT artist, date, blocked, blocked_at FROM booking_dates WHERE artist = ? AND date = ?",
      )
      .bind(artist, date)
      .first<DateRow>();
    const notes = await db
      .prepare(
        "SELECT id, artist, date, author, role, body, created_at FROM booking_notes WHERE artist = ? AND date = ? ORDER BY created_at, id",
      )
      .bind(artist, date)
      .all<NoteRow>();
    return {
      artist,
      date,
      blocked: Boolean(dateRow?.blocked),
      blockedAt: dateRow?.blocked_at ?? null,
      notes: (notes.results ?? []).map(noteFromRow),
    };
  }

  return {
    async list(artist, from, to) {
      await ensure();
      const dateRows = await db
        .prepare(
          "SELECT artist, date, blocked, blocked_at FROM booking_dates WHERE artist = ? AND date >= ? AND date <= ? ORDER BY date",
        )
        .bind(artist, from, to)
        .all<DateRow>();
      const noteRows = await db
        .prepare(
          "SELECT id, artist, date, author, role, body, created_at FROM booking_notes WHERE artist = ? AND date >= ? AND date <= ? ORDER BY created_at, id",
        )
        .bind(artist, from, to)
        .all<NoteRow>();
      const byDate = new Map<string, BookingDateRecord>();
      for (const row of dateRows.results ?? []) {
        byDate.set(row.date, {
          artist: row.artist,
          date: row.date,
          blocked: Boolean(row.blocked),
          blockedAt: row.blocked_at,
          notes: [],
        });
      }
      for (const row of noteRows.results ?? []) {
        const record = byDate.get(row.date) ?? emptyRecord(row.artist, row.date);
        record.notes.push(noteFromRow(row));
        byDate.set(row.date, record);
      }
      return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
    },
    async get(artist, date) {
      await ensure();
      return readOne(artist, date);
    },
    async addNote(artist, date, note) {
      await ensure();
      await db.batch([
        db
          .prepare(
            "INSERT INTO booking_dates (artist, date, blocked) VALUES (?, ?, 0) ON CONFLICT (artist, date) DO NOTHING",
          )
          .bind(artist, date),
        db
          .prepare(
            "INSERT INTO booking_notes (id, artist, date, author, role, body, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
          )
          .bind(note.id, artist, date, note.author, note.role, note.text, note.createdAt),
      ]);
      return readOne(artist, date);
    },
    async confirmBlock(artist, date, at) {
      await ensure();
      const count = await db
        .prepare("SELECT COUNT(*) AS n FROM booking_notes WHERE artist = ? AND date = ?")
        .bind(artist, date)
        .first<{ n: number }>();
      if (!count || Number(count.n) < 1) {
        throw new BookingStoreError(CONSULTATION, "CONSULTATION_REQUIRED");
      }
      await db
        .prepare(
          `INSERT INTO booking_dates (artist, date, blocked, blocked_at) VALUES (?, ?, 1, ?)
           ON CONFLICT (artist, date) DO UPDATE SET blocked = 1, blocked_at = excluded.blocked_at`,
        )
        .bind(artist, date, at)
        .run();
      return readOne(artist, date);
    },
  };
}

export function storeFromBinding(binding: unknown): BookingStore | null {
  if (!binding || typeof binding !== "object") return null;
  const db = binding as D1Binding;
  if (
    typeof db.prepare !== "function" ||
    typeof db.exec !== "function" ||
    typeof db.batch !== "function"
  ) {
    return null;
  }
  return createD1Store(db);
}
