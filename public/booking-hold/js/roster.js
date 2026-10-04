/* Romani Music International Booking Agency — roster data
 *
 * To add an artist later:
 *   1. Push a new object onto ARTISTS.
 *   2. Add matching copy keys to js/i18n.js for every language (en, es, fr, de, it, nl, hu, pl, sr, hr, el).
 *   3. Duplicate any file in /artists/ and rename it to {slug}.html.
 *   4. Add the slug as an <option> on contact.html.
 *   5. Mirror the object in data/roster.json if you keep that file in sync.
 *
 * Cards and the home band panel are rendered from this file plus js/i18n.js.
 * The HTML already in the pages is the no-JavaScript fallback.
 */
window.RMBA = window.RMBA || {};
window.RMBA.ARTISTS = [
  {
    slug: "brady-winterstein-trio",
    name: "Brady Winterstein Trio",
    listName: "Brady Winterstein Trio",
    kickerKey: "artist.brady.kicker",
    summaryKey: "artist.brady.summary",
    page: "artists/brady-winterstein-trio.html",
    photo: "assets/brady-winterstein-djangofestivalen-2017.jpg",
    photoAltKey: "artist.brady.photoAlt",
    photoCaptionKey: "artist.brady.photoCaption",
    bioKeys: ["artist.brady.bio1", "artist.brady.bio2", "artist.brady.bio3", "artist.brady.bio4"],
    details: [
      { labelKey: "detail.style", valueKey: "artist.brady.style" },
      { labelKey: "detail.base", valueKey: "artist.brady.base" },
      { labelKey: "detail.records", valueKey: "artist.brady.records" },
      { labelKey: "detail.lineup", valueKey: "artist.brady.lineup" },
      { labelKey: "detail.available", valueKey: "artist.brady.available" }
    ],
    links: [
      { href: "https://wintersteintrio.bandcamp.com/album/savoir-vivre", labelKey: "artist.brady.link.savoir" },
      { href: "https://open.spotify.com/album/5Ok4tDaHFI2wmrStHERRN8", labelKey: "artist.brady.link.spotifyAlbum" },
      { href: "https://open.spotify.com/artist/160PD01L7M0KULOkg9Me0e", labelKey: "artist.brady.link.spotifyArtist" }
    ],
    plainRecords: ["artist.brady.link.happy"]
  },

  {
    slug: "marcia-bamberg-swing-quartet",
    name: "Marcia Bamberg Swing Quartet",
    listName: "Marcia Bamberg Swing Quartet",
    kickerKey: "artist.marcia.kicker",
    summaryKey: "artist.marcia.summary",
    page: "artists/marcia-bamberg-swing-quartet.html",
    photo: "assets/marcia-bamberg-portrait.jpg",
    photoAltKey: "artist.marcia.photoAlt",
    photoCaptionKey: "artist.marcia.photoCaption",
    photoNoteKey: "artist.marcia.photoNote",
    bioKeys: ["artist.marcia.bio1", "artist.marcia.bio2"],
    sections: [
      {
        titleKey: "artist.marcia.h2four",
        paraKeys: ["artist.marcia.pMarcia", "artist.marcia.pJohn", "artist.marcia.pRonald", "artist.marcia.pDaniel"]
      },
      {
        titleKey: "artist.marcia.h2public",
        paraKeys: ["artist.marcia.public", "artist.marcia.diary"]
      },
      {
        titleKey: "artist.marcia.h2book",
        itemKeys: ["artist.marcia.book1", "artist.marcia.book2", "artist.marcia.book3"],
        paraKeys: ["artist.marcia.typical"]
      }
    ],
    details: [
      { labelKey: "detail.lineup", valueKey: "artist.marcia.lineup" },
      { labelKey: "detail.base", valueKey: "artist.marcia.base" },
      { labelKey: "detail.album", valueKey: "artist.marcia.album" },
      { labelKey: "detail.available", valueKey: "artist.marcia.available" },
      { labelKey: "detail.site", valueKey: "artist.marcia.siteHtml", html: true }
    ],
    links: [
      { href: "https://marciabamberg.nl/marcia-bamberg-swing-quartet", labelKey: "artist.marcia.link.site" },
      { href: "https://www.youtube.com/@MBSQ2022", labelKey: "artist.marcia.link.youtube" }
    ]
  },
  {
    slug: "marcia-bamberg-swing-quintet",
    name: "Marcia Bamberg Swing Quintet",
    listName: "Marcia Bamberg Swing Quintet",
    kickerKey: "artist.marcia.kicker",
    summaryKey: "artist.marcia.summary",
    page: "artists/marcia-bamberg-swing-quintet.html",
    photo: "assets/marcia-bamberg-portrait.jpg",
    photoAltKey: "artist.marcia.photoAlt",
    photoCaptionKey: "artist.marcia.photoCaption",
    photoNoteKey: "artist.marcia.photoNote",
    bioKeys: ["artist.marcia.bio1", "artist.marcia.bio2"],
    sections: [
      {
        titleKey: "artist.marcia.h2four",
        paraKeys: ["artist.marcia.pMarcia", "artist.marcia.pJohn", "artist.marcia.pRonald", "artist.marcia.pDaniel", "artist.marcia.pChristian"]
      },
      {
        titleKey: "artist.marcia.h2public",
        paraKeys: ["artist.marcia.public", "artist.marcia.diary"]
      },
      {
        titleKey: "artist.marcia.h2book",
        itemKeys: ["artist.marcia.book1", "artist.marcia.book2", "artist.marcia.book3", "artist.marcia.book4"],
        paraKeys: ["artist.marcia.typical"]
      }
    ],
    details: [
      { labelKey: "detail.lineup", valueKey: "artist.marcia.lineup" },
      { labelKey: "detail.base", valueKey: "artist.marcia.base" },
      { labelKey: "detail.album", valueKey: "artist.marcia.album" },
      { labelKey: "detail.available", valueKey: "artist.marcia.available" },
      { labelKey: "detail.site", valueKey: "artist.marcia.siteHtml", html: true }
    ],
    links: [
      { href: "https://marciabamberg.nl/marcia-bamberg-swing-quintet", labelKey: "artist.marcia.link.site" },
      { href: "https://www.youtube.com/@MBSQ2022", labelKey: "artist.marcia.link.youtube" }
    ]
  },
  {
    slug: "daniel-gueli-gypsy-jazz-orchestra",
    name: "Daniel Gueli Gypsy Jazz Orchestra",
    listName: "Daniel Gueli Gypsy Jazz Orchestra",
    kickerKey: "artist.daniel.kicker",
    summaryKey: "artist.daniel.summary",
    page: "artists/daniel-gueli-gypsy-jazz-orchestra.html",
    photo: "assets/daniel-gueli-front.jpg",
    photoAltKey: "artist.daniel.photoAlt",
    photoCaptionKey: "artist.daniel.photoCaption",
    photoNoteKey: "artist.daniel.photoNote",
    bioKeys: ["artist.daniel.bio1", "artist.daniel.bio2", "artist.daniel.bio3"],
    details: [
      { labelKey: "detail.style", valueKey: "artist.daniel.style" },
      { labelKey: "detail.base", valueKey: "artist.daniel.base" },
      { labelKey: "detail.lineup", valueKey: "artist.daniel.lineup" },
      { labelKey: "detail.available", valueKey: "artist.daniel.available" }
    ],
    links: []
  },
  {
    slug: "django-rosenberg-trio",
    name: "Django Rosenberg Trio",
    listName: "Django Rosenberg Trio",
    kickerKey: "artist.django.kicker",
    summaryKey: "artist.django.summary",
    page: "artists/django-rosenberg-trio.html",
    photo: "assets/joseph-reinhardt.jpg",
    photoAltKey: "artist.django.photoAlt",
    photoCaptionKey: "artist.django.photoCaption",
    bioKeys: ["artist.django.bio1", "artist.django.bio2"],
    sections: [
      {
        titleKey: "artist.django.h2lineup",
        paraKeys: [
          "artist.django.pDjango",
          "artist.django.pGrappelli",
          "artist.django.pJoseph",
          "artist.django.pNucky",
          "artist.django.pDaniel"
        ]
      }
    ],
    details: [
      { labelKey: "detail.style", valueKey: "artist.django.style" },
      { labelKey: "detail.base", valueKey: "artist.django.base" },
      { labelKey: "detail.lineup", valueKey: "artist.django.lineup" },
      { labelKey: "detail.available", valueKey: "artist.django.available" }
    ],
    links: []
  }
];
