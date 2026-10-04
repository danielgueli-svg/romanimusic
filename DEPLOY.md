# Deploy Romanimusic (Cloudflare Workers)

**Prove host (pre-cutover):** https://romanimusic.danielgueli.workers.dev  
**Worker name:** `romanimusic`  
**Repo:** `danielgueli-svg/romanimusic` `main`

Do **not** treat `*.grok.me`, Vercel, or www.romanimusic.com as tip until DomainVis + Daniel finish the DNS cutover (CF zone + custom domains). Soft ack ≠ live.

## What “deploy” means

1. Commit lands on `main`.
2. Build a Cloudflare Worker bundle (`GROK_CF_WORKER=1`).
3. Run `scripts/cf-prep.mjs` (Worker name `romanimusic`, observability, BETTER_AUTH_URL).
4. `npx wrangler deploy --config .output/server/wrangler.json --keep-vars` **WITH ASSETS** (never `--no-assets`).
5. Soft-ack Website Maintenance: tip SHA + “Soft ack ≠ live; tip↔workers.dev WITH ASSETS.”

Pushing `main` alone does not update the Worker until Maintenance (or an agent) runs deploy:cf.

## Commands

```bash
npm run deploy:cf
# or:
GROK_CF_WORKER=1 npm run build && node scripts/cf-prep.mjs
npx wrangler deploy --config .output/server/wrangler.json --keep-vars
```

## Scope

Two-portal home (`/`, `/archive`). Agency door links to static tip at `/booking/` (Worker assets). Do **not** rebuild the booking-agency product in the React app. Do **not** attach custom domains or flip DNS (DomainVis + Daniel).

## Prove after live

- CF Version id
- https://romanimusic.danielgueli.workers.dev/ → 200 (two portals)
- `/archive` → 200
- `/booking` → 200
- sample asset 200

## Booking desk

Artist and owner calendars live on the worker, not in the React archive. The only public entry is the footer logo on the booking pages, which opens `/booking/login`. Login is an email for the owner, or an artist slug, and a password. There is no artist search.

Secrets are worker secrets, read at runtime. Do not put them in `wrangler.json` vars or in git.

```bash
printf '%s' 'choose-a-long-password' | npx wrangler secret put BOOKING_OWNER_PASSWORD
printf '%s' 'choose-a-long-random-secret' | npx wrangler secret put BOOKING_SESSION_SECRET
printf '%s' '{"daniel-gueli":"...","brady-winterstein":"...","marcia-bamberg":"...","django-rosenberg":"..."}' | npx wrangler secret put BOOKING_ARTIST_PASSWORDS
```

The owner account is exactly `danielgueli@gmail.com` (trim, case-insensitive). The old name `owner` does not sign in. Artist account names are exactly `daniel-gueli`, `brady-winterstein`, `marcia-bamberg`, and `django-rosenberg`, and those accounts are artists, never the owner.

### Binding a later deploy must create

There is no D1 binding on the worker today. Calendar rows and notes use one D1 database:

- **Binding name:** `BOOKING_DB`
- **Database name:** `romanimusic-booking`

```bash
npx wrangler d1 create romanimusic-booking
# copy database_id, then either export it for cf-prep:
BOOKING_D1_ID='<database_id>' npm run deploy:cf
# or add this to the generated .output/server/wrangler.json before deploy:
# "d1_databases": [{ "binding": "BOOKING_DB", "database_name": "romanimusic-booking", "database_id": "<database_id>" }]

npx wrangler d1 execute romanimusic-booking --remote --file=migrations/booking/0001_booking.sql
```

`scripts/cf-prep.mjs` writes that `d1_databases` entry only when `BOOKING_D1_ID` is set. If the binding is missing, `/booking/api` reads and writes return **503** and `BOOKING_DB binding is missing... Nothing was saved.` They do not fall back to an empty calendar or a memory store.

A date can take notes from the owner and from that artist (for example “Set an option”). An artist cannot block a date. The owner can confirm a block only after at least one note exists on that date.

Local proof, without deploy:

```bash
node --experimental-strip-types --test server/booking-desk/booking-desk.test.ts
```
