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

Two-portal home (`/`, `/archive`, `/booking` under-construction). Do **not** build the booking-agency product here. Do **not** attach custom domains or flip DNS (DomainVis + Daniel).

## Prove after live

- CF Version id
- https://romanimusic.danielgueli.workers.dev/ → 200 (two portals)
- `/archive` → 200
- `/booking` → 200
- sample asset 200
