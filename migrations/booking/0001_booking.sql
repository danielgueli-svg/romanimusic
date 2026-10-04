-- Booking desk store for the romanimusic worker.
-- Binding name: BOOKING_DB
-- Database name: romanimusic-booking
--
-- Maintenance, after `npx wrangler d1 create romanimusic-booking`:
--   npx wrangler d1 execute romanimusic-booking --remote --file=migrations/booking/0001_booking.sql
--
-- The worker also runs these statements on first use. A missing BOOKING_DB
-- binding does not create a stand-in. Saves fail until the binding exists.

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
