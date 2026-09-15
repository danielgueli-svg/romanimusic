import { GYPSY_JAZZ_HUB } from "@/lib/site";

export type Festival = {
  id: string;
  name: string;
  place: string;
  month: string;
  href: string;
  styleSlug?: string;
  body: string;
  hub?: boolean;
};

/** Big festivals with official sites. Not a concert diary. Nothing invented. */
export const FESTIVALS: Festival[] = [
  {
    id: "khamoro",
    name: "World Roma Festival Khamoro",
    place: "Prague, Czech Republic",
    month: "May",
    href: "https://khamoro.cz/en",
    body: "Khamoro means sunshine. The world’s largest professional Romani festival, in Prague since 1999. Last filed edition: 24–30 May 2026, the 28th. Slovo 21 and SP Saga. Official site for the next year.",
  },
  {
    id: "jerez",
    name: "Festival de Jerez",
    place: "Jerez de la Frontera, Spain",
    month: "February–March",
    href: "https://www.festivaldejerez.es/",
    styleSlug: "flamenco",
    body: "Flamenco in the town of the palos. Gitano art on a public stage. Next filed edition: 19 February–6 March 2027, the 31st. Dates on the official site.",
  },
  {
    id: "guca",
    name: "Guča Trumpet Festival",
    place: "Guča, Serbia",
    month: "August",
    href: "https://www.guca.rs/",
    styleSlug: "balkan-brass",
    body: "The famous Balkan brass gathering. Not a Romani-only festival. The origin of the job is still the wedding. Last filed edition: 7–9 August 2026, the 65th. Official site.",
  },
  {
    id: "romane-dyvesa",
    name: "Romane Dyvesa",
    place: "Gorzów Wielkopolski, Poland",
    month: "August",
    href: "http://romane-dyvesa.com/",
    body: "International meetings of Romani ensembles. The organisers call it the oldest festival of its kind, from 1989. Edward Dębicki / Teatr Terno. Last filed edition: 21 August 2026, the 38th, Gorzów amphitheatre.",
  },
  {
    id: "cante-minas",
    name: "Festival Internacional del Cante de las Minas",
    place: "La Unión, Spain",
    month: "July–August",
    href: "https://festivalcantedelasminas.org/",
    styleSlug: "flamenco",
    body: "Flamenco of the mining cantes. Since 1961. The Lámpara Minera is the prize. Last filed edition: 29 July–8 August 2026, the 65th. Not a complete flamenco encyclopaedia.",
  },
  {
    id: "bienal-sevilla",
    name: "Bienal de Flamenco",
    place: "Seville, Spain",
    month: "September",
    href: "https://www.labienal.com/",
    styleSlug: "flamenco",
    body: "Even years. The large Seville flamenco biennial, from 1980. Gitano families sit at the centre of this art. Last filed edition: 9 September–3 October 2026, the 24th. Ownership claims are political.",
  },
];

export const DJANGO_FESTIVAL = {
  name: "Festival Django Reinhardt",
  place: "Fontainebleau / Samois-sur-Seine, France",
  month: "June",
  href: GYPSY_JAZZ_HUB,
  official: "https://www.festivaldjangoreinhardt.com",
  body: "One of the biggest festivals of this music. Filed: Fontainebleau, 25–28 June 2026, 46th edition. The jazz calendar — jams, concerts, this festival — lives on the sister site. This archive keeps the history.",
};
