# Romani Music International Booking Agency

Static booking site for the commercial half of the Romani Music portal. Promoters, venues, and festivals use it to read a short roster and send an inquiry.

The archive — history, styles, families — is a different site: [romanimusic.com](https://www.romanimusic.com). A two-door entry lives at [romanimusic.danielgueli.workers.dev](https://romanimusic.danielgueli.workers.dev). `/archive` is the museum. `/booking` there is still a stub. This folder is the agency that will later sit behind that door.

There is no build step. No npm. The roster is three acts:

- Brady Winterstein Trio
- Marcia Bamberg Swing Quintet
- Daniel Gueli Gypsy Jazz Orchestra

## Preview locally

From this folder:

```
python3 -m http.server 8080
```

Open http://localhost:8080/

Or open `index.html` directly. Relative links work either way.

## Pages

| Path | What it is |
| --- | --- |
| `index.html` | Home |
| `artists/index.html` | Roster |
| `artists/brady-winterstein-trio.html` | Artist |
| `artists/marcia-bamberg-swing-quintet.html` | Artist |
| `artists/daniel-gueli-gypsy-jazz-orchestra.html` | Artist |
| `dates.html` | Public dates (empty until confirmed) |
| `about.html` | Agency, and how it sits next to the archive |
| `contact.html` | Booking form (mailto) |

## Booking form

The form on `contact.html` checks the required fields in the browser, then opens a `mailto:` to info@romanimusic.com with the inquiry in the body. Nothing is posted to a server.

## Adding an artist

1. Add an entry to `js/roster.js` (slug, name, kicker, summary, page).
2. Mirror it in `data/roster.json` if you keep that file.
3. Duplicate a page in `artists/` and name it `{slug}.html`.
4. Add an `<option>` for the slug on `contact.html`.

Home and the artists index re-render their cards from `js/roster.js`. The cards already in the HTML are the fallback when JavaScript is off.

## Publish later

Ship this folder as static files: GitHub, then Cloudflare Worker or Pages, next to the portal. Not Vercel.

Keep the folder structure (`css/`, `js/`, `artists/`, `data/`, `favicon.svg`) so `index.html` is at the root of whatever path or subdomain you attach — for example the booking door on romanimusic.com.
