# Romani Music Booking

Static booking desk for three acts. It is meant to be served at `/booking/` on the Romani Music worker. There is no build step.

## Roster

- Brady Winterstein Trio
- Marcia Bamberg Swing Quartet
- Daniel Gueli Swing Orchestra

Contact is `mailto:info@romanimusic.com` only. Languages are English, French, Italian, Spanish, German, and Chinese.

## What changed

The first screen is no longer a navy page with an azuro thumbnail rail. It is a black, full-viewport list of the three names. The active name lays that act’s photo behind the type, and a muted film fades in over it. Moving across a name switches the picture and the film. Under that, the page opens into paper and large color blocks: lineup, photo, a playable film, then three booking steps and the email set in poster type.

The left rail is gone on the home page, About, and Contact. About and Contact use the same black bar and the same color blocks.

Films, privacy-enhanced and not autoplaying in the blocks:

- Brady Winterstein Trio — Happy Together, Finland 2013
- Marcia Bamberg Swing Quartet — Que reste-t-il de nos amours
- Daniel Gueli Swing Orchestra — a film from Daniel Gueli’s own channel (Amsterdam Jazz Ambassadors, Mo’ Better Blues). The roster name stays Daniel Gueli Swing Orchestra.

Photos kept: Brady Winterstein (Tore Sætre, CC BY-SA 4.0, credited beside the image), Marcia Bamberg, and Daniel Gueli.

## Preview

Serve the repository root so the `/booking/` base path resolves:

```
python3 -m http.server 43123
```

Open http://127.0.0.1:43123/booking/

## Deploy

Ship the `booking/` folder as static files on the worker path `/booking/`. Each page sets `<base href="/booking/">`.
