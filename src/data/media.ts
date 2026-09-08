export type FiledPhoto = {
  src: string;
  alt: string;
  credit: string;
  href?: string;
};

export type FiledClip = {
  id: string;
  title: string;
  credit: string;
};

export type FiledMedia = {
  photo?: FiledPhoto;
  youtube?: FiledClip;
  clips?: FiledClip[];
};

/** Public-library stills and official / label YouTube. Nothing invented. */
export const MEDIA: Record<string, FiledMedia> = {
  "django-reinhardt": {
    photo: {
      src: "/media/django-reinhardt.jpg",
      alt: "Django Reinhardt, Aquarium, New York, about November 1946",
      credit: "William P. Gottlieb, Library of Congress. Public domain.",
      href: "https://www.loc.gov/pictures/item/gottlieb.07301/",
    },
    youtube: {
      id: "QyjJ3ThpRkA",
      title: "Django Reinhardt — Echoes of France (La Marseillaise)",
      credit: "Official Django Reinhardt channel",
    },
  },
  reinhardt: {
    photo: {
      src: "/media/django-reinhardt.jpg",
      alt: "Django Reinhardt, Aquarium, New York, about November 1946",
      credit: "William P. Gottlieb, Library of Congress. Public domain.",
      href: "https://www.loc.gov/pictures/item/gottlieb.07301/",
    },
    youtube: {
      id: "QyjJ3ThpRkA",
      title: "Django Reinhardt — Echoes of France (La Marseillaise)",
      credit: "Official Django Reinhardt channel",
    },
  },
  "gypsy-jazz": {
    photo: {
      src: "/media/django-reinhardt.jpg",
      alt: "Django Reinhardt, Aquarium, New York, about November 1946",
      credit: "William P. Gottlieb, Library of Congress. Public domain.",
      href: "https://www.loc.gov/pictures/item/gottlieb.07301/",
    },
    youtube: {
      id: "QyjJ3ThpRkA",
      title: "Django Reinhardt — Echoes of France (La Marseillaise)",
      credit: "Official Django Reinhardt channel",
    },
  },
  "stephane-grappelli": {
    photo: {
      src: "/media/stephane-grappelli.jpg",
      alt: "Stéphane Grappelli",
      credit: "Allan Warren. CC BY-SA 3.0, via Wikimedia Commons.",
      href: "https://commons.wikimedia.org/wiki/File:StephaneGrappelli25.JPG",
    },
  },
  "janos-bihari": {
    photo: {
      src: "/media/janos-bihari.jpg",
      alt: "János Bihari, painted by János Donát, 1820",
      credit: "János Donát, 1820. Hungarian National Museum. Public domain.",
      href: "https://commons.wikimedia.org/wiki/File:J%C3%A1nos_Don%C3%A1t_-_Portrait_of_J%C3%A1nos_Bihari,_Composer_and_Gipsy_Virtuoso_-_WGA06440.jpg",
    },
  },
  camaron: {
    youtube: {
      id: "0usfxEYijXY",
      title: "Camarón de la Isla — La Leyenda Del Tiempo",
      credit: "Universal Music Spain (official audio)",
    },
  },
  flamenco: {
    youtube: {
      id: "0usfxEYijXY",
      title: "Camarón de la Isla — La Leyenda Del Tiempo",
      credit: "Universal Music Spain (official audio)",
    },
  },
  "gipsy-kings": {
    youtube: {
      id: "7qbEt_lSib4",
      title: "Gipsy Kings — Bamboléo (Official Video)",
      credit: "Gipsy Kings official channel",
    },
  },
  "reyes-baliardo": {
    youtube: {
      id: "7qbEt_lSib4",
      title: "Gipsy Kings — Bamboléo (Official Video)",
      credit: "Gipsy Kings official channel",
    },
  },
  "taraf-de-haidouks": {
    youtube: {
      id: "HxHhSy36Klo",
      title: "Taraf de Haïdouks — Romanian Folk Dances",
      credit: "Crammed Discs",
    },
  },
  clejani: {
    youtube: {
      id: "HxHhSy36Klo",
      title: "Taraf de Haïdouks — Romanian Folk Dances",
      credit: "Crammed Discs",
    },
  },
  "fanfare-ciocarlia": {
    youtube: {
      id: "QiHmiZQNgL4",
      title: "Fanfare Ciocărlia — Moliendo Cafe",
      credit: "Piranha Records (official audio, Iag Bari, 2001)",
    },
  },
  "zece-prajini": {
    youtube: {
      id: "QiHmiZQNgL4",
      title: "Fanfare Ciocărlia — Moliendo Cafe",
      credit: "Piranha Records (official audio, Iag Bari, 2001)",
    },
  },
  hungarian: {
    photo: {
      src: "/media/janos-bihari.jpg",
      alt: "János Bihari, painted by János Donát, 1820",
      credit: "János Donát, 1820. Hungarian National Museum. Public domain.",
      href: "https://commons.wikimedia.org/wiki/File:J%C3%A1nos_Don%C3%A1t_-_Portrait_of_J%C3%A1nos_Bihari,_Composer_and_Gipsy_Virtuoso_-_WGA06440.jpg",
    },
    youtube: {
      id: "5nDo9cF4JlE",
      title: "A Brief Overview of Roma (Gypsy) Music in Hungary",
      credit: "The Music Historian, 2017",
    },
    clips: [
      {
        id: "k9oaSVpE3kM",
        title: "Hungarian Gypsy Music?",
        credit: "The Fiddle Channel, 2020",
      },
    ],
  },
  hungary: {
    photo: {
      src: "/media/janos-bihari.jpg",
      alt: "János Bihari, painted by János Donát, 1820",
      credit: "János Donát, 1820. Hungarian National Museum. Public domain.",
    },
    youtube: {
      id: "5nDo9cF4JlE",
      title: "A Brief Overview of Roma (Gypsy) Music in Hungary",
      credit: "The Music Historian, 2017",
    },
    clips: [
      {
        id: "k9oaSVpE3kM",
        title: "Hungarian Gypsy Music?",
        credit: "The Fiddle Channel, 2020",
      },
    ],
  },
  lautareasca: {
    youtube: {
      id: "HxHhSy36Klo",
      title: "Taraf de Haïdouks — Romanian Folk Dances",
      credit: "Crammed Discs",
    },
    clips: [
      {
        id: "bmqobam_kfM",
        title: "Transylvania — Roma Voices",
        credit: "FM Records, The Rom Of Fire, Vol. 3, 2001 / 2006",
      },
    ],
  },
  romania: {
    youtube: {
      id: "HxHhSy36Klo",
      title: "Taraf de Haïdouks — Romanian Folk Dances",
      credit: "Crammed Discs",
    },
    clips: [
      {
        id: "bmqobam_kfM",
        title: "Transylvania — Roma Voices",
        credit: "FM Records, The Rom Of Fire, Vol. 3, 2001 / 2006",
      },
    ],
  },
  "balkan-brass": {
    youtube: {
      id: "eV1CerFDY3s",
      title: "Esma Redžepova — Chaje Shukarije",
      credit: "World Connection (official audio)",
    },
    clips: [
      {
        id: "-syh8Fjkg3g",
        title: "Eva Salina & Peter Stan: Serbian Roma Music Concert",
        credit: "Library of Congress Homegrown, 2019",
      },
      {
        id: "jg5S6t28i-E",
        title: "Khamoro Festival Of Roma Music In Prague",
        credit: "Radio Free Europe / Radio Liberty, 2012",
      },
      {
        id: "T0eMDGgAy1c",
        title: "Ibro Lolov — Gypsy Dance from Sofia",
        credit: "ARC / NAXOS of America, 2014. Album title uses Gypsy.",
      },
    ],
  },
  balkans: {
    youtube: {
      id: "eV1CerFDY3s",
      title: "Esma Redžepova — Chaje Shukarije",
      credit: "World Connection (official audio)",
    },
    clips: [
      {
        id: "-syh8Fjkg3g",
        title: "Eva Salina & Peter Stan: Serbian Roma Music Concert",
        credit: "Library of Congress Homegrown, 2019",
      },
      {
        id: "jg5S6t28i-E",
        title: "Khamoro Festival Of Roma Music In Prague",
        credit: "Radio Free Europe / Radio Liberty, 2012",
      },
    ],
  },
  "esma-redzepova": {
    youtube: {
      id: "eV1CerFDY3s",
      title: "Esma Redžepova — Chaje Shukarije",
      credit: "World Connection (official audio)",
    },
    clips: [
      {
        id: "cwvmxeSKnso",
        title: "Esma Redžepova & Folk Masters Play Romani (Gypsy) & Macedonian Music",
        credit: "Library of Congress Homegrown, 2016",
      },
    ],
  },
  teodosievski: {
    youtube: {
      id: "cwvmxeSKnso",
      title: "Esma Redžepova & Folk Masters Play Romani (Gypsy) & Macedonian Music",
      credit: "Library of Congress Homegrown, 2016",
    },
  },
  "saban-bajramovic": {
    youtube: {
      id: "-syh8Fjkg3g",
      title: "Eva Salina & Peter Stan: Serbian Roma Music Concert",
      credit: "Library of Congress Homegrown, 2019. Peter Stan, accordion; Eva Salina, voice.",
    },
  },
  bajramovic: {
    youtube: {
      id: "-syh8Fjkg3g",
      title: "Eva Salina & Peter Stan: Serbian Roma Music Concert",
      credit: "Library of Congress Homegrown, 2019. Peter Stan, accordion; Eva Salina, voice.",
    },
  },
  "vlax-song": {
    youtube: {
      id: "R-L477kx8LA",
      title: "Věra Bílá & Kale — Pas o panori",
      credit: "verabilaakaleVEVO",
    },
  },
  bila: {
    youtube: {
      id: "R-L477kx8LA",
      title: "Věra Bílá & Kale — Pas o panori",
      credit: "verabilaakaleVEVO",
    },
  },
  "vera-bila": {
    youtube: {
      id: "R-L477kx8LA",
      title: "Věra Bílá & Kale — Pas o panori",
      credit: "verabilaakaleVEVO",
    },
  },
};

export function clipsOf(media?: FiledMedia): FiledClip[] {
  if (!media) return [];
  const out: FiledClip[] = [];
  if (media.youtube) out.push(media.youtube);
  if (media.clips) out.push(...media.clips);
  return out;
}

export function mediaOf(...slugs: Array<string | undefined>): FiledMedia | undefined {
  for (const slug of slugs) {
    if (slug && MEDIA[slug]) return MEDIA[slug];
  }
  return undefined;
}
