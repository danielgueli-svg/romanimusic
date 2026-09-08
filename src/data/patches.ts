export type SourceQuote = {
  lang: string;
  original: string;
  en: string;
  nl?: string;
  credit: string;
};

export type LaterItem = {
  id: string;
  title: string;
  what: string;
  whyLater: string;
  sourceTitle?: string;
  url?: string;
  year?: string;
};

export const FAMILY_PATCHES: Record<string, Record<string, unknown>> = {
  limberger: {
    history: [
      "Tcha Limberger’s site: born into a Belgian family of Manouche musicians. Grandfather Piotto Limberger, violinist and bandleader. Father Vivi Limberger, singer and guitarist, recorded and toured with Fapy Lafertin and the band Waso. Tcha studied Magyar nóta in Budapest with primás Horvát Béla, a Sinti player of the Hungarian restaurant book. The two families stay distinct.",
      "The Fiddle Channel, 2020, Hungarian Gypsy Music?: Tcha speaks at the end. Auto-caption wrote “Charlinberger.” This is his family page. He told the film Magyar nóta is high-level music making; it may be artificial folk and still be incredible; most Romani people play the music of the country they live in. The family stays Manouche. The book stays Hungarian.",
      "DjangoBooks 2005 adds chairs Tcha’s site does not name (Storro, Jan, Sas van Gent). Those are listed under Later. Whether Fapy is uncle or cousin also is listed under Later. Ferret of Paris is a different family. Living dates: Gypsy Jazz Hub.",
    ],
  },
  bajramovic: {
    history: [
      "Šaban Bajramović (1936–2008), Niš. A popular Romani voice of Yugoslavia, not a brass primás. The songs outlived the rooms.",
      "Library of Congress Homegrown, 16 May 2019: Eva Salina and Peter Stan played that Serbian Roma song-world in Washington. Peter “Perica” Stan is a Serbian/Romanian Roma accordionist. Eva Salina is an American interpreter of Vida Pavlović and of Šaban — a neighbour of this family, not a member.",
    ],
  },
  kocani: {
    summary:
      "Romani brass from Kočani. Naat Veliov, trumpet. Public name in the 1990s. Macedonian cousin of Guča and Zece Prăjini.",
    history: [
      "The Kočani Orkestar began as town wedding brass (1930s in family memory) and became a European festival name in the 1990s.",
      "Macedonian notices name Naat (Neat) Veliov as trumpet and leader: born Kočani, 25 May 1957, grandfather Ahmet on trumpet. English Wikipedia: he led until 2000; later line-ups kept the name. Two public names (King Naat Veliov Original Kočani Orkestar and Kočani Orkestar on Crammed) are not two families.",
    ],
    members: [
      {
        name: "Naat Veliov",
        years: "b. 1957",
        role: "Trumpet",
        artistSlug: "naat-veliov",
        note: "Kočani, 25 May 1957. Macedonian notices.",
      },
      {
        name: "Kočani Orkestar",
        years: "public 1990s",
        role: "Brass orchestra",
        artistSlug: "kocani-orkestar",
      },
    ],
  },
  bila: {
    summary:
      "Rom-pop from the Czech-Slovak lands. Věra Bílá took Romani-language song to a public stage with backbeat and guitar.",
    history: [
      "Věra Bílá (22 May 1954, Rokycany – 12 March 2019, Plzeň). Giňa clan. Father Karol/Karel Giňa, singer. Birth name / alternative Věra Giňová (RomArchive). Heart attack; Faculty Hospital Plzeň (iDNES / Radio Prague).",
      "Kale took public form in 1995 (RomArchive, Inka Jurková): related young men of Rokycany — Emil “Bišu” Miko, Emil “Pupa” Miko, Jan Dužda, Deziderius Lučka, Milan Kroka (later Marek Miko). Genre they named: Rom-pop. Songs in Romani, also Czech and Slovak.",
      "Earlier private/local band from 1986 (Emil Miko, Paměť národa). First CD: Miko says 1995; RomArchive files RomPop 1996 — both stand. Kale Kalore 1998. Split 2005: Kale continued without her (RomArchive). Film Black and White in Colour 1999 (Mira Erdevicki-Charap).",
      "From the 1990s, Věra Bílá & Kale put Romani-language identity on a festival stage after decades when the slow songs stayed inside the settlement.",
      "Ida Kelarová is a neighbour of this family. Dežo Dužda sat in Kale then Romano Rat with Kelarová — a hinge chair, not a merger. “Queen of Romany” and Ella Fitzgerald comparisons are journalists’ lines, not a community crown.",
    ],
    members: [
      {
        name: "Věra Bílá",
        years: "1954–2019",
        role: "Voice, Rom-pop",
        artistSlug: "vera-bila",
        note: "Giňa clan. Born Věra Giňová, Rokycany. Died Faculty Hospital Plzeň.",
      },
      {
        name: "Kale",
        years: "public form 1995",
        role: "Rom-pop",
        note: "Emil “Bišu” Miko, Emil “Pupa” Miko, Jan Dužda, Deziderius Lučka, Milan Kroka (later Marek Miko). RomArchive.",
      },
    ],
  },
  czinka: {
    quotes: [
      {
        lang: "hu",
        original:
          "Czinka Panna, Cinka (Sajógömör, 1711 – ? , 1772 ? ): cigányzenész. Atyja is zenész volt. Zenére pártfogója, Lányi János földbirtokos taníttatta Rozsnyón. 1730-ban férjhez ment egy nagybőgőshöz, vele és két zenész sógorával hozta létre korának egyik legnépszerűbb cigánybandáját. Hiteles műve nem maradt fenn. A híres ~-nóta kétségtelenül 19. sz.-i alkotás, úgyszintén mindazok a dallamok, amelyeket Fáy István és Káldy Gyula az ő neve alatt adtak közre. Ugyanez áll a Rákóczi-indulóra is, amely ugyancsak nem ~ műve, hanem a 19. sz. elejének reprezentáns m. hangszeres darabja.",
        en: "Czinka Panna, Cinka (Sajógömör, 1711 – ?, 1772?): gypsy musician. Her father was also a musician. Her patron, the landowner Lányi János, had her taught violin in Rozsnyó. In 1730 she married a double-bassist; with him and two musician brothers-in-law she formed one of the most popular gypsy bands of her time. No authentic work survives. The famous Czinka-nóta is certainly a nineteenth-century piece, as are the tunes Fáy István and Káldy Gyula issued under her name. The same holds for the Rákóczi March, which is not her work but a representative Hungarian instrumental piece of the early nineteenth century.",
        nl: "Czinka Panna, Cinka (Sajógömör, 1711 – ?, 1772?): muzikante. Haar vader was ook muzikant. Haar mecenas, grootgrondbezitter Lányi János, liet haar in Rozsnyó viool leren. In 1730 trouwde zij met een contrabassist; met hem en twee muzikante zwagers vormde zij een van de populairste bands van haar tijd. Er is geen authentiek werk bewaard. De bekende Czinka-nóta is zeker negentiende-eeuws, evenals de deuntjes die Fáy en Káldy onder haar naam uitgaven. Hetzelfde geldt voor de Rákóczi-mars, die niet van haar is maar een Hongaars instrumentaal stuk uit het begin van de negentiende eeuw.",
        credit: "Magyar életrajzi lexikon / MEK — Czinka Panna, Cinka",
      },
    ],
  },
  magyari: {
    history: [
      "Magyar életrajzi lexikon (Arcanum): Magyari Imre, born Debrecen 10 September 1894, died Budapest 27 April 1940; cigányprímás. Father, id. Magyari Imre, a named Debrecen primás. Violin at the Debrecen conservatory with Füredi József. Gold medal at a Budapest primás competition at nine. Moved to Budapest in 1916 and formed his own orchestra. From 1920 until his death he played at the Hungária Szálló restaurant. Tours: England, Italy, the Netherlands. Recordings survive. A csárdás, Baj van, nagy baj…, was still known when the lexicon was printed.",
      "The lexicon is the original for that career. Extra chairs once printed here from the grave register (Siófok 1909, Radics Béla, Royal Szálló, Magyar Rádió from 1925) did not come back from that register this pass. They are listed under Later until the original lines are in hand again.",
      "Hungarian Wikipedia prints 12 September 1894. The lexicon prints the 10th. This page files the 10th. The 12th is listed under Later. This is not Toki Horváth Gyula of Kaposvár.",
    ],
    quotes: [
      {
        lang: "hu",
        original:
          "Magyari Imre (Debrecen, 1894. szept. 10. – Bp., 1940. ápr. 27.): cigányprímás. Atyja, id. ~ Imre neves prímás volt Debrecenben. Hegedűtanulmányokat a debreceni konzervatóriumban folytatott Füredi Józsefnél. 9 éves korában aranyérmet nyert a bp.-i prímásversenyen. 1916-ban Bp.-re költözött és önálló zenekart alakított. 1920-tól haláláig a Hungária Szálló éttermében muzsikált, közben több ízben megfordult külföldön, nagy sikerrel szerepelt Angliában, Olaszo.-ban és Hollandiában. Játékát szépszámú lemezfelvétel őrzi, szerzeményei közül néhány (Baj van, nagy baj… c. csárdás) ma is ismert.",
        en: "Magyari Imre (Debrecen, 10 September 1894 – Budapest, 27 April 1940): gypsy primás. His father, Magyari Imre Sr., was a well-known primás in Debrecen. He studied violin at the Debrecen conservatory with Füredi József. At nine he won a gold medal at the Budapest primás competition. In 1916 he moved to Budapest and formed his own orchestra. From 1920 until his death he played in the restaurant of the Hungária Hotel, and toured abroad with success in England, Italy and the Netherlands. Numerous recordings survive; among his pieces the csárdás Baj van, nagy baj… was still known.",
        nl: "Magyari Imre (Debrecen, 10 september 1894 – Boedapest, 27 april 1940): primás. Zijn vader, id. Magyari Imre, was een bekende primás in Debrecen. Viool aan het conservatorium van Debrecen bij Füredi József. Op zijn negende goud op de primás-wedstrijd in Boedapest. In 1916 naar Boedapest, eigen orkest. Van 1920 tot zijn dood speelde hij in het restaurant van het Hungária Hotel; succes in Engeland, Italië en Nederland. Er zijn veel platen; de csárdás Baj van, nagy baj… was toen het lexicon verscheen nog bekend.",
        credit: "Magyar életrajzi lexikon, Arcanum",
      },
    ],
  },
  jaroka: {
    history: [
      "Id. Járóka Sándor was born 16 February 1922 in Kisvárda and died in Budapest on 11 April 1984. Magyar életrajzi lexikon (Arcanum): Népművészet Mestere, 1955. From 1932 a leading primás of the aranyosi Rajkó orchestra — the lexicon’s wording. Own ensemble from 1947. From 1952 he led the Interior Ministry artists’ folk orchestra. In 1958 he formed a new band and later opened the rebuilt Fortuna étterem with it. A six-week American tour in 1971 with a seven-piece band — Karádi Katalin and Svéd Sándor sang with them, as the lexicon spells the names. Six months in 1976 at the new Budapest restaurant in Detroit; in 1978 the Magyar Falu restaurant there also opened with his orchestra.",
      "The 100 Tagú Cigányzenekar’s own history: founded 1985 as a tribute to the late Sándor Járóka Sr., “King of the Prímás.” Roma musicians gathering to honour a master — that is the origin story the orchestra prints.",
      "His son, ifj. Járóka Sándor, was born in Budapest on 30 September 1954. Fidelio: Magyar Érdemrend lovagkeresztje, 20 August 2003. In 1994, in the United States, Romani musicians crowned him king of the primás, as they had his father. Diabetes; coma from 27 February 2004; he did not wake. Died 18 September 2007. Buried beside his father in the New Public Cemetery, Rákoskeresztúr. The 100 Tagú played at the grave, with Boross Lajos among the leaders. One joint record of father and son exists. Further chairs wait until they are sourced.",
    ],
    quotes: [
      {
        lang: "hu",
        original:
          "Járóka Sándor, id. (Kisvárda, 1922. febr. 16. – Bp., 1984. ápr. 11.): prímás, zenekarvezető, a Népművészet Mestere (1955). 1932-től az aranyosi Rajkó-zenekar egyik vezető prímása. 1947-ben megalakította saját együttesét. 1952-től a Belügymin. Művészegyüttes népi zenekarát vezette. 1958-ban új zenekart alakított s később ezzel nyitotta meg kapuit az újjáépített Fortuna-étterem. 1971-ben hathetes amerikai körutat tett héttagú együttesével, ahol Karádi Katalin és Svéd Sándor is énekelt zenekarával. 1976-ban hat hónapig Detroitban, az akkor megnyílt Budapest étteremben muzsikált, 1978-ban ugyanott a Magyar Falu étterem is az ő zenekarával nyílt meg.",
        en: "Járóka Sándor Sr. (Kisvárda, 16 February 1922 – Budapest, 11 April 1984): primás, bandleader, Master of Folk Art (1955). From 1932 one of the leading primáses of the Aranyos Rajkó orchestra. In 1947 he formed his own ensemble. From 1952 he led the folk orchestra of the Interior Ministry artists’ ensemble. In 1958 a new band, with which he later opened the rebuilt Fortuna restaurant. In 1971 a six-week American tour with seven players; Karádi Katalin and Svéd Sándor also sang with them. In 1976 six months at the new Budapest restaurant in Detroit; in 1978 the Magyar Falu restaurant there also opened with his orchestra.",
        nl: "Járóka Sándor sr. (Kisvárda, 16 februari 1922 – Boedapest, 11 april 1984): primás, orkestleider, Meester van de Volkskunst (1955). Vanaf 1932 een van de leidende primáses van het Aranyos-Rajkó-orkest. In 1947 eigen ensemble. Vanaf 1952 het volksorkest van het kunstenaarsensemble van Binnenlandse Zaken. In 1958 een nieuwe band, waarmee hij later het herbouwde Fortuna-restaurant opende. In 1971 zes weken Amerika met zeven man; Karádi Katalin en Svéd Sándor zongen mee. In 1976 zes maanden in Detroit, restaurant Budapest; in 1978 opende daar ook Magyar Falu met zijn orkest.",
        credit: "Magyar életrajzi lexikon, Arcanum",
      },
    ],
  },
  "toki-horvath": {
    history: [
      "Magyar életrajzi lexikon (Arcanum): Toki Horváth Gyula (Kaposvár, 17 September 1920 – Munich, 13 October 1971), cigányprímás, Master of Folk Art 1954. From the age of five, second primás in his hometown’s best orchestra. From autumn 1931 a leader of the Budapest rajkó orchestra; with that band he played in England, Germany and France, 1935–38. Own orchestra from 1938. First leading primás of the 32-member Fővárosi Népizenekar, formed 15 December 1950. In 1954 his orchestra played in Moscow at the Tchaikovsky Hall, in Kyiv, and in other Soviet cities. Hungarian folk song first took a large place in his programmes. In 1956 a Western European tour; he did not return. He lived in Munich, with shorter and longer interruptions, until his death.",
      "The Népművészet Mesterei register page that once carried the same career did not open this pass. The lexicon is the original in hand. A 2025 liner note that after Magyari Imre’s death in 1940 he was called “King of the Gypsies” is not in the lexicon. That crown is listed under Later.",
      "This is not Ernő Toki Balogh, named on the 100 Tagú page as the band József Sárközi jr. played with in Spain at ten. Same professional world. Different chair.",
    ],
    quotes: [
      {
        lang: "hu",
        original:
          "Toki Horváth Gyula (Kaposvár, 1920. szept. 17. – München, 1971. okt. 13.): cigányprímás, a népművészet mestere (1954). 5 éves korától másodprímás szülővárosa legjobb zenekarában. 1931 őszétől a bp.-i rajkózenekar egyik vezetője. E zenekarral szerepelt Angliában, Német- és Franciao.-ban (1935-38). 1938-tól saját zenekarával lépett fel. Első vezető prímása az 1950. dec. 15.-én alakult 32 tagú Fővárosi Népizenekarnak. 1954-ben zenekarával Moszkvában a Csajkovszkij-teremben, Kijevben és más szovjet városokban adott hangversenyeket. Az ő zenei repertoárjában jutott először jelentős szerephez a magyar népdal. 1956-ban zenekarával Ny-európai körútra indult és nem tért vissza. Haláláig – hosszabb-rövidebb megszakításokkal – Münchenben élt.",
        en: "Toki Horváth Gyula (Kaposvár, 17 September 1920 – Munich, 13 October 1971): gypsy primás, Master of Folk Art (1954). From the age of five, second primás in the best orchestra of his hometown. From autumn 1931 a leader of the Budapest rajkó orchestra; with that band he appeared in England, Germany and France (1935–38). From 1938 he played with his own orchestra. First leading primás of the 32-member Capital Folk Orchestra formed on 15 December 1950. In 1954 concerts in Moscow at the Tchaikovsky Hall, in Kyiv and other Soviet cities. Hungarian folk song first took a large place in his programmes. In 1956 a Western European tour; he did not return. Until his death he lived in Munich, with shorter and longer interruptions.",
        nl: "Toki Horváth Gyula (Kaposvár, 17 september 1920 – München, 13 oktober 1971): primás, Meester van de Volkskunst (1954). Vanaf zijn vijfde tweede primás in het beste orkest van zijn stad. Vanaf najaar 1931 leider van het Boedapestse rajkó-orkest; daarmee in Engeland, Duitsland en Frankrijk (1935–38). Vanaf 1938 eigen orkest. Eerste leidend primás van het 32-koppige hoofdstedelijk volksorkest, opgericht 15 december 1950. In 1954 Moskou (Tsjaikovski-zaal), Kiev en andere Sovjetsteden. Hongaars volkslied kreeg bij hem voor het eerst een grote plaats. In 1956 een West-Europese tournee; hij keerde niet terug. Tot zijn dood woonde hij, met onderbrekingen, in München.",
        credit: "Magyar életrajzi lexikon, Arcanum",
      },
    ],
  },
  boross: {
    history: [
      "HVG / MTI, 9 July 2014: Lajos Boross died in hospital on Tuesday night, aged 89 — so born 1925. Confirmed to RomNet by Beke Farkas Nándor, president of the 100 Tagú. Violin from the age of five, first from his father Boross Géza, then from Rácz Laci, “prímáskirály.” 1938–40 in the Öreg Rajkók; already on Hungarian Radio. 1940–42 at the Music Academy, teacher Zatureczky Ede.",
      "At seventeen he formed his own orchestra at the Trombitás étterem in Buda. Kodály Zoltán backed his appointment as leading primás of the Állami Népi Együttes in 1950. Népművészet Mestere, 1953. From 1958, leading primás of the Magyar Rádió folk orchestra. Halászbástya étterem, 1972: HVG says he met Yehudi Menuhin there, who asked to play Brahms’s Fifth Hungarian Dance with him; Menuhin later wrote of that playing in The Music of Man. Margitkert on Rózsadomb from 1981.",
      "In 1985, HVG: he was crowned king of the primáses, and the same year became alelnök and főprímás of the newly founded 100 Tagú Cigányzenekar. He stepped down in 1998 for health; kept as örökös, tiszteletbeli főprímás. Kossuth Prize, 2006, for work popularising Romani performing arts. The 100 Tagú English page still names him as the man who conferred the Chief Primás title on Lendvai Csócsi in 1998 — that orchestra’s own wording.",
    ],
    quotes: [
      {
        lang: "hu",
        original:
          "Elhunyt Boross Lajos Kossuth-díjas prímás, a 100 Tagú Cigányzenekar örökös, tiszteletbeli főprímása. A kórházban ápolt zenész 89 éves korában halt meg kedd éjjel. Boross Lajos ötévesen kezdett hegedülni, kezdetben édesapjától, Boross Gézától, majd Rácz Lacitól, a prímáskirálytól tanult. 1985-ben a prímások királyává koronázták, majd ugyanebben az évben lett az akkor alakult 100 Tagú Cigányzenekar alelnöke és főprímása. A cigány előadóművészet népszerűsítéséért végzett munkásságát 2006-ban Kossuth-díjjal ismerték el.",
        en: "Lajos Boross, Kossuth-prize primás, perpetual honorary főprímás of the 100 Member Hungarian Gypsy Orchestra, has died. The musician, in hospital, died on Tuesday night aged 89. He began the violin at five, first from his father Boross Géza, then from Rácz Laci, the king of primáses. In 1985 he was crowned king of the primáses, and the same year became vice-president and főprímás of the newly founded 100 Member orchestra. In 2006 a Kossuth Prize for work popularising gypsy performing art.",
        nl: "Lajos Boross, Kossuth-prijs-primás en eeuwig erelid-főprímás van het 100-koppige orkest, is overleden. In het ziekenhuis, 89 jaar, dinsdagnacht. Viool vanaf zijn vijfde, eerst van zijn vader Boross Géza, daarna van Rácz Laci, de primás-koning. In 1985 tot koning van de primáses gekroond, hetzelfde jaar vicevoorzitter en főprímás van het nieuwe 100-koppige orkest. In 2006 de Kossuth-prijs voor het uitdragen van de Roma-podiumkunst.",
        credit: "HVG, 9 July 2014, citing Beke Farkas Nándor / RomNet",
      },
    ],
  },
  santa: {
    history: [
      "Kultura.hu (2 March 2025, eightieth birthday notice): born 2 March 1945 in a Kaposvár cigányzenész dynasty — every ancestor a primás. Died 22 October 2024, aged 79, after a long illness. Father, id. Sánta Ferenc, already led a band in Jászberény at fifteen. Violin from age seven at the local school, with Lehota Dezső — the original order of the name.",
      "Fidelio (2 March 2020, seventy-fifth birthday): in the band at thirteen; later Pécs, then the Liszt Academy from eighteen; violin and teacher diplomas, 1969. First own folk orchestra, 1973. Budapest hotel rooms: Hilton, 1979–81; Átrium Hyatt Tokaj restaurant, 1981–90. First solo recording at Magyar Rádió, 1972. Founding member of the 100 Tagú Cigányzenekar. From 1994, artistic director and leading primás of the Magyar Nemzeti Cigányzenekar — about eighty players in that Fidelio notice.",
      "Awards kultura.hu lists include Liszt Ferenc-díj 2002, Kossuth-díj 2007, Nemzet Művésze 2014, Kossuth-nagydíj 2023, honorary citizen of Budapest 2011 and of Kaposvár 2024. The orchestra’s own team page names Johan János as főprímás and artistic director from 1 January 2026. That is a named successor, not a Sánta kinship unless a register says so.",
      "Roma Press Center, quoting 100 Tagú, printed 1946–2024. Fidelio’s seventy-fifth birthday on 2 March 2020 and kultura.hu’s eightieth on 2 March 2025 both say 1945. This page files 1945. The 1946 line is listed under Later. Children who graduated the Academy are named only as son (violin) and daughter (piano) — no given names here.",
    ],
    quotes: [
      {
        lang: "hu",
        original:
          "„Az orvos a testet gyógyítja, a cigányzenész pedig a lelket” – vallotta a nyolcvan éve, 1945. március 2-án született ifjabb Sánta Ferenc.",
        en: "“The doctor heals the body, the gypsy musician the soul” — as ifj. Sánta Ferenc, born 2 March 1945, used to say. That is his word cigányzenész, not this archive’s frame.",
        nl: "“De arts geneest het lichaam, de cigányzenész de ziel” — zo zei ifj. Sánta Ferenc, geboren 2 maart 1945. Dat is zijn woord, niet het kader van dit archief.",
        credit: "kultura.hu, 2 March 2025",
      },
    ],
  },
  "kalyi-jag": {
    origin: "Hungarian Roma — Nagyecsed / Budapest, from 1978",
    summary:
      "Kalyi Jag. End of August 1978. Szatmár Roma youth commuting between Nagyecsed and Budapest. The name is from a line of Bari Károly. Inward song, beside the restaurant primás families.",
    history: [
      "Kultura.hu, 5 September 2008, thirty years: the ensemble formed at the end of August 1978, from Szatmár Roma youth commuting between Nagyecsed and Budapest. They took the name from a poem by Bari Károly.",
      "Varga Gusztáv, speaking there for the ensemble: the founding was a “küldetés” — a sending. They meant Roma song and dance to stand in public culture. In 1979 the ensemble received the title Népművészet Ifjú Mestere.",
      "This page files that public group. It does not invent a family tree around the name.",
      "Rombase (Kovalcsik): first Hungaroton record 1987, Gypsy Folk Songs from Hungary. Young Masters of Folk Art 1979; the disc came later. Other public groups of this inward song sit on their own pages: Ternipe, Ando Drom, Rományi Rota, Kanizsa Csillagai. Not the café book.",
    ],
    members: [
      {
        name: "Kalyi Jag",
        years: "from 1978",
        role: "Voice, guitar — inward song",
        artistSlug: "kalyi-jag",
        note: "Name from Bari Károly. Kultura.hu, 2008.",
      },
      {
        name: "Varga Gusztáv",
        role: "Speaks for the ensemble at thirty years",
        note: "Kultura.hu, 2008. Founder in later Hungarian notices; this page files him as the voice of that anniversary, not a parish register.",
      },
    ],
    quotes: [
      {
        lang: "hu",
        original:
          "A Kalyi Jag tudatosan törekedett arra, hogy a roma népzene és néptánc a közkultúrába kerülhessen … az együttes már 1979-ben elnyerte A Népművészet Ifjú Mestere címet.",
        en: "Kalyi Jag meant Roma folk music and dance to reach public culture … in 1979 the ensemble already received the title Young Master of Folk Art.",
        nl: "Kalyi Jag wilde Roma-volksmuziek en -dans in de openbare cultuur brengen … in 1979 kreeg het ensemble de titel Jonge Meester van de Volkskunst.",
        credit: "Varga Gusztáv, kultura.hu, 5 September 2008",
      },
    ],
  },
  lunca: {
    origin: "Romanian Roma — Vărbilău, Prahova / Bucharest",
    summary:
      "Gabi Luncă. Digi24: Elena-Gabriela Luncă, born 16 October 1938, Vărbilău, Prahova; died 2 April 2021, Ilfov county hospital, COVID-19. Urban lăutărească. A different family from Puceanu.",
    history: [
      "Digi24, 3 April 2021: born 16 October 1938 in Vărbilău, Prahova. Father Dumitru Luncă, violinist of the Army Orchestra in Ploiești. She began to sing in 1951 with her father. From 1953, soloist of the workers’ folk orchestra at the Băicoi club.",
      "From 1993 she left the lăutărească stage and sang only at Pentecostal services in Bucharest. Digi24.",
      "Asphalt Tango: from Vărbilău in the Prahova valley; father the violinist Dumitru Luncă. Birth year 1938 matches Digi24. How many siblings Dumitru had is not settled here — six in some Romanian notices, twelve in the label note. That count is listed under Later.",
    ],
    members: [
      {
        name: "Gabi Luncă",
        years: "1938–2021",
        role: "Voice — urban lăutărească",
        artistSlug: "gabi-lunca",
        note: "Elena-Gabriela. Digi24: Vărbilău, 16 October 1938 — Ilfov, 2 April 2021.",
      },
      {
        name: "Dumitru Luncă",
        role: "Violin — Orchestra Armatei, Ploiești",
        note: "Father. Digi24.",
      },
    ],
    quotes: [
      {
        lang: "ro",
        original:
          "Gabi (Elena-Gabriela) Luncă s-a născut la 16 octombrie 1938 în comuna Vărbilău, judeţul Prahova. Talentul muzical l-a moştenit de la tatăl ei, Dumitru Luncă, violonist în cadrul Orchestrei Armatei din Ploieşti. A început să cânte în anul 1951, alături de tatăl său.",
        en: "Gabi (Elena-Gabriela) Luncă was born on 16 October 1938 in the commune of Vărbilău, Prahova county. She took the music from her father, Dumitru Luncă, violinist of the Army Orchestra in Ploiești. She began to sing in 1951, beside her father.",
        nl: "Gabi (Elena-Gabriela) Luncă is geboren op 16 oktober 1938 in Vărbilău, district Prahova. De muziek kwam van haar vader Dumitru Luncă, violist van het legerorkest in Ploiești. In 1951 begon zij te zingen, naast haar vader.",
        credit: "Digi24, 3 April 2021",
      },
    ],
  },
  teodosievski: {
    origin: "Macedonian Roma — Skopje",
    summary:
      "Esma Redžepova with Stevo Teodosievski’s ensemble. BBC: died in Skopje, 11 December 2016, aged 73, after a short illness — hospital and family. Guardian: born in Skopje’s old town in the war years; married Stevo in 1968.",
    history: [
      "BBC, 11 December 2016: Macedonia’s “Romany music queen” died in Skopje after a short illness, according to hospital and family. Age 73. One of the first vocalists to sing in the Romani language on that public scale.",
      "Guardian obituary, 14 December 2016: born in Skopje’s old town in the war; father Ibrahim Redžepova, shoeshine; mother Canija, seamstress. Stevo Teodosievski, accordionist and bandleader, asked the father to let her join the ensemble. They married in 1968.",
      "Guardian: in 1976, performing in Chandigarh, India, the couple were given the honorary titles of Queen and King of Gypsy Music. That is the Guardian’s wording of an honorary title, not a parish register, and not filed here as a World Romani Congress act.",
      "The Skopje house planned as a museum is not a working public room. Macedonian reporting of a looted building is listed under Later.",
      "Library of Congress Homegrown, 2016: Esma Redžepova & Folk Masters Play Romani (Gypsy) & Macedonian Music. The word Gypsy is in the Library’s title. She died later that year.",
    ],
    members: [
      {
        name: "Esma Redžepova",
        years: "1943–2016",
        role: "Voice",
        artistSlug: "esma-redzepova",
        note: "BBC: died Skopje, 11 December 2016, aged 73. Guardian: Skopje old town; married Stevo 1968.",
      },
      {
        name: "Stevo Teodosievski",
        role: "Accordion, bandleader",
        artistSlug: "stevo-teodosievski",
        note: "Guardian: asked her father; married 1968. Exact birth and death days wait for a second Macedonian notice.",
      },
    ],
    quotes: [
      {
        lang: "en",
        original:
          "Esma Redzepova died in Skopje following a short illness, according to hospital and family sources.",
        en: "Esma Redžepova died in Skopje following a short illness, according to hospital and family sources.",
        nl: "Esma Redžepova stierf in Skopje na een korte ziekte, volgens het ziekenhuis en de familie.",
        credit: "BBC News, 11 December 2016",
      },
    ],
  },
  puceanu: {
    origin: "Romanian Roma — Bucharest, urban lăutărească",
    summary:
      "Romica Puceanu, singer of urban lăutărească. Death 24 October 1996 is on Discogs and Romanian notices. Birth year is not picked: 1926 and 1927 both appear. That is listed under Later.",
    history: [
      "Named in the same research map as Gabi Luncă. Urban Bucharest lăutărească.",
      "Death: 24 October 1996, Bucharest. Discogs: five days after a car crash on the way to a performance. Birth day is not filed. Romanian notices print 19 January 1927; some catalogues print 1926. This page leaves both dates.",
    ],
  },
  "zece-prajini": {
    history: [
      "Zece Prăjini kept a brass trade for village weddings and funerals.",
      "Songlines (Garth Cartwright, 14 October 2021) and the Kennedy Center artist note: in 1996 the German sound engineer Henry Ernst came to the village and put that brass on a world stage as Fanfare Ciocărlia. Songlines: “fanfare” is the Romanian word for a brass band; “ciocărlia” means lark.",
      "Public from 1996. Cousin to Balkan truba, not to the string taraf of Clejani.",
    ],
  },
};

export const NEW_HOUSES: Record<string, unknown>[] = [
  {
    slug: "bihari",
    name: "Bihari",
    catalog: "",
    alsoKnown: "Bihari János",
    chapterSlug: "hungary",
    traditionSlug: "hungarian",
    origin: "Hungarian Roma — Nagyabony / Pest, 1764–1827",
    summary:
      "Bihari János. Magyar életrajzi lexikon: Nagyabony, 21 October 1764 — Pest, 26 April 1827. Violinist and composer of the verbunkos age. Abony’s city notice repeats those dates. An ancestor the café Lakatos families name. The Rákóczi March as his work is unproven.",
    history: [
      "Lexicon: father also a violinist. Around 1801 he came to Pest and formed the band that made him famous, usually five players — cimbalom and strings. 1811, Pozsony, at the diet. He also played in Vienna, including at the time of the Congress. A restless touring life in Hungary. Around 1818 often in Veszprém, with Ruzitska Ignác as patron and friend.",
      "Peak in the early 1820s. 1822: Liszt heard him and wrote of him with high praise — the lexicon’s wording. From 1823 the career slowly declined. 1824: an accident; he broke the left arm. Virtuoso playing ended. He still fiddled, but had to give the primás chair to another. 1825: still played at the queen’s coronation in Pozsony. Old age, left alone.",
      "The lexicon calls him the outstanding composer and performer of the early nineteenth century, the greatest representative of verbunkos, with Lavotta and Csermák as a virtuoso triad. Not all works given to him are authentic. The idea that he wrote the Rákóczi song and the Rákóczi March is an unproven assumption — the lexicon’s own caution. Káldy Gyula’s claim that Beethoven often heard him in Vienna stays Káldy’s claim.",
    ],
    members: [
      {
        name: "Bihari János",
        years: "1764–1827",
        role: "Violin",
        artistSlug: "janos-bihari",
        note: "Lexicon: Nagyabony, 21 October 1764 — Pest, 26 April 1827.",
      },
    ],
    quotes: [
      {
        lang: "hu",
        original:
          "Bihari János (Nagyabony, 1764. okt. 21. – Pest, 1827. ápr. 26.): cigány származású zeneszerző és hegedűművész. Atyja is hegedűs volt. 1801 körül Pestre jött s itt megalakította híressé vált bandáját, amely többnyire 5 tagból állott (cimbalmos és vonósok).",
        en: "Bihari János (Nagyabony, 21 October 1764 – Pest, 26 April 1827): composer and violinist of Romani origin. His father was also a violinist. Around 1801 he came to Pest and formed the band that became famous, usually five players (cimbalom and strings).",
        nl: "Bihari János (Nagyabony, 21 oktober 1764 – Pest, 26 april 1827): componist en violist van Roma-afkomst. Ook zijn vader was violist. Rond 1801 kwam hij naar Pest en vormde daar de band die beroemd werd, meestal vijf spelers (cimbalom en strijkers).",
        credit: "Magyar életrajzi lexikon, Arcanum",
      },
    ],
  },
  {
    slug: "johan",
    name: "Johan",
    catalog: "",
    alsoKnown: "Johan János",
    chapterSlug: "hungary",
    traditionSlug: "hungarian",
    origin: "Hungarian Roma — Budapest, living chair",
    summary:
      "Johan János. First-person: own orchestra from 2005, Budapest; leading primás of the 100 Tagú, 2012–2025; from 2026 főprímás and artistic director of the Magyar Nemzeti Cigányzenekar. Not merged with Sánta.",
    history: [
      "His own page (zenekarokaz.hu): “Zenekaromat 2005-ben Budapest kiváló zenészeiből alapítottam.” 2012 to 2025, leading primás of the 100 Member Hungarian Gypsy Orchestra. From 2026, főprímás and artistic director of the Magyar Nemzeti Cigányzenekar. 2008: first prize, International Gypsy Orchestra Competition, with his band.",
      "Józsefváros Újság, 23 March 2026: the national orchestra’s idea already in the 1980s; the band set out in 1994 under ifj. Sánta Ferenc; now re-formed under Johan János; 1 April at the Hagyományok Háza.",
      "Kultura.hu, 11 May 2026: in January 2026 he decided to bring back into public view the Magyar Nemzeti Cigányzenekar, there called founded in 1988. 1988 and 1994 both sit in print. Both founding years remain listed under Later.",
    ],
    members: [
      {
        name: "Johan János",
        years: "living",
        role: "Violin, primás",
        artistSlug: "johan-janos",
        note: "Own orchestra 2005. 100 Tagú 2012–2025. MNCz from 2026. First-person page.",
      },
    ],
    quotes: [
      {
        lang: "hu",
        original:
          "Zenekaromat 2005-ben Budapest kiváló zenészeiből alapítottam. 2012 és 2025 között a 100 Tagú Cigányzenekar vezető prímása voltam. 2026-tól a Magyar Nemzeti Cigányzenekar főprímása és művészeti igazgatója vagyok.",
        en: "I founded my orchestra in 2005 from excellent musicians of Budapest. From 2012 to 2025 I was leading primás of the 100 Member Hungarian Gypsy Orchestra. From 2026 I am főprímás and artistic director of the Hungarian National Gypsy Orchestra.",
        nl: "Ik heb mijn orkest in 2005 opgericht met uitstekende musici uit Boedapest. Van 2012 tot 2025 was ik leidend primás van het 100-koppige Hongaarse Roma-orkest. Vanaf 2026 ben ik főprímás en artistiek directeur van het Hongaars Nationaal Cigány-orkest.",
        credit: "Johan János, zenekarokaz.hu (first person)",
      },
    ],
  },
  {
    slug: "mustafov",
    name: "Mustafov",
    catalog: "",
    alsoKnown: "Ferus Mustafov",
    chapterSlug: "balkans",
    traditionSlug: "balkan-brass",
    origin: "Macedonian Roma — Štip",
    summary:
      "Ferus Mustafov. Saxophone and clarinet. Songlines: Štip, 20 December 1950 — Skopje, 22 May 2023. A wedding-band king who mostly stayed off the world-music circuit.",
    history: [
      "Songlines, Kim Burton, 7 June 2023: born in Štip into a Roma family of musicians. Father Ilmi Jašarov, saxophone; mother Zumbrut also played. Violin and clarinet at the local school. Professional at seventeen.",
      "Songlines: Sarajevo in the 1970s folk new wave; then Skopje. Director of Romani-language music programming for television there. Globe Style and Tropical issued records for a Western ear. He preferred local and diasporic rooms, and a motel-restaurant with a studio of his own.",
      "Death: stroke, hospital in Skopje, 22 May 2023, aged 72. Macedonian notices: Xoraxane family. A different chair from Kočani brass. A merge with Naat Veliov is not recorded.",
    ],
    members: [
      {
        name: "Ferus Mustafov",
        years: "1950–2023",
        role: "Saxophone, clarinet",
        artistSlug: "ferus-mustafov",
        note: "Štip — Skopje. Songlines obituary.",
      },
      {
        name: "Ilmi Jašarov",
        role: "Saxophone",
        note: "Father. Songlines: credited with bringing the saxophone into that local folk.",
      },
    ],
  },
  {
    slug: "mahala-rai",
    name: "Mahala Rai Banda",
    catalog: "",
    alsoKnown: "Aurel Ioniță",
    chapterSlug: "romania",
    traditionSlug: "lautareasca",
    alsoTraditionSlugs: ["balkan-brass"],
    origin: "Romanian Roma — Bucharest",
    summary:
      "Bucharest Romani band, public from 2004. Crammed, then Asphalt Tango. Neighbour to the Clejani circuit. Not a merger.",
    history: [
      "Asphalt Tango artist page: eleven-piece from Bucharest streets; violin and brass together. Debut on Crammed Discs, 2004–05. Ghetto Blasters on Asphalt Tango, 2009.",
      "Aurel Ioniță is the named violin and composer on public cards. Some notices say a Clejani kinship with Taraf de Haïdouks. That kinship is not filed onto this family. The Clejani family stays Clejani.",
      "Festival bills put them next to Fanfare Ciocărlia. The circuit is not the village job.",
    ],
    members: [
      {
        name: "Aurel Ioniță",
        role: "Violin, voice",
        artistSlug: "aurel-ionita",
        note: "Named leader on the label cards. Kinship with Clejani is listed under Later.",
      },
    ],
  },
  {
    slug: "ando-drom",
    name: "Ando Drom",
    catalog: "",
    alsoKnown: "On the road",
    chapterSlug: "central",
    traditionSlug: "vlax-song",
    origin: "Hungarian Roma — Budapest, from 1984",
    summary:
      "Ando Drom. Romani: on the road. Named public group of inward song, from 1984. Jenő Zsigó. Inward song, beside the restaurant primás families.",
    history: [
      "Rombase (Kovalcsik): after Kalyi Jag, Ando Drom was among the groups that tried new genres of this inward song. The name is Romani for on the road.",
      "Public notices: founded 1984, Budapest. Musical director Jenő Zsigó, voice and instruments. Mónika Juhász Miczura (Mitsou) sang with them for years — a named voice. Guest chairs (Bratsch, Kálmán Balogh) belong on their own pages.",
      "A listener playlist of “traditional Hungarian Gypsy music” often files them next to Kalyi Jag. That is this inward song, not cigányzene.",
    ],
    members: [
      {
        name: "Jenő Zsigó",
        role: "Voice, instruments — director",
        artistSlug: "jeno-zsigo",
        note: "Named director in public notices. 1984.",
      },
      {
        name: "Ando Drom",
        years: "from 1984",
        role: "Voice, guitar, kanna — inward song",
        artistSlug: "ando-drom",
      },
    ],
  },
  {
    slug: "ternipe",
    name: "Ternipe",
    catalog: "",
    alsoKnown: "TerniPe — Youth",
    chapterSlug: "central",
    traditionSlug: "vlax-song",
    origin: "Hungarian Roma — Szabolcs-Szatmár-Bereg / Budapest, from 1989",
    summary:
      "Ternipe. Romani: youth. Named Vlach public group of inward song, from 1989. Rombase: close to Kalyi Jag’s folk approach. Inward song, beside the café families.",
    history: [
      "Rombase (Kovalcsik): among the known Vlach Roma ensembles, Ternipe stayed traditional in approach.",
      "Public notices: formed 1989 by young musicians from Szabolcs-Szatmár-Bereg county and Budapest. The name means youth. ARC issued an album titled Hungarian Gypsy Music (2006) — the label’s word, not this archive’s genre collapse.",
      "Named so the Vlax page holds more than Kalyi Jag and Bílá.",
    ],
    members: [
      {
        name: "Ternipe",
        years: "from 1989",
        role: "Voice, guitar — inward song",
        artistSlug: "ternipe",
      },
    ],
  },
  {
    slug: "romanyi-rota",
    name: "Rományi Rota",
    catalog: "",
    alsoKnown: "Roma Wheel",
    chapterSlug: "central",
    traditionSlug: "vlax-song",
    origin: "Hungarian Roma — Nagyecsed, from 1985",
    summary:
      "Rományi Rota. Roma Wheel. Named public group of inward song. Rombase lists it with Ando Drom among groups trying new genres.",
    history: [
      "Rombase (Kovalcsik): Rományi Rota (Roma Wheel) among the named folklore ensembles after Kalyi Jag.",
      "Public cards: Nagyecsed, Szatmár, from 1985. Same town-world as Kalyi Jag. A different family.",
    ],
    members: [
      {
        name: "Rományi Rota",
        years: "from 1985",
        role: "Voice — inward song",
        artistSlug: "romanyi-rota",
      },
    ],
  },
  {
    slug: "kanizsa-csillagai",
    name: "Kanizsa Csillagai",
    catalog: "",
    alsoKnown: "Stars of Kanizsa",
    chapterSlug: "central",
    traditionSlug: "vlax-song",
    origin: "Hungarian Beás — Nagykanizsa, from 1993",
    summary:
      "Kanizsa Csillagai. Stars of Kanizsa. Named Beás public family. Underground Magazin, 2005: first local stage 28 February 1993. Beás song, beside Oláh café music and beside Kalyi Jag.",
    history: [
      "Rombase (Kovalcsik): the first Boyash band was the short-lived Frácilor; then the Stars of Kanizsa. They adapted Boyash folksongs.",
      "Underground Magazin, 11 February 2005: Roma from Nagykanizsa; Beás songs. Leader Horváth Zoltán, guitar and voice. First appearance 28 February 1993, a local Ki mit tud? round. A family band in that notice: wife Ibi, voice; brother Sándor, guitar and mandolin. Extra chairs in that article are listed under Later until a family page records them.",
      "Beás dialect is Romanian-related, not Romani. That is already on this style page. This is the named singing family that page waited for.",
    ],
    members: [
      {
        name: "Horváth Zoltán",
        role: "Guitar, voice",
        artistSlug: "zoltan-horvath-kanizsa",
        note: "Underground Magazin 2005. Leader.",
      },
      {
        name: "Kanizsa Csillagai",
        years: "from 1993",
        role: "Voice, guitar, kanna — Beás song",
        artistSlug: "kanizsa-csillagai",
      },
    ],
  },
];

export const ORCHESTRA_PATCHES: Record<string, Record<string, unknown>[]> = {
  bila: [
    {
      year: "1995–2005",
      sort: 1995,
      kind: "found",
      band: "Věra Bílá & Kale",
      title: "Rom-pop",
      body: "Czech-Slovak Romani-language songs on a public stage; Kale continued after the 2005 split without her.",
    },
  ],
  bihari: [
    {
      year: "c. 1801",
      sort: 1801,
      kind: "found",
      band: "Bihari’s Pest band",
      title: "Usually five — cimbalom and strings",
      body: "Lexicon: around 1801 he came to Pest and formed the band that made him famous, usually five players.",
    },
    {
      year: "1824",
      sort: 1824,
      kind: "end",
      band: "Bihari’s Pest band",
      title: "Left arm broken — primás chair given up",
      body: "Lexicon: accident, left arm broken. Virtuoso career ended. He still played, but had to let another take the primás.",
    },
  ],
  "kalyi-jag": [
    {
      year: "1978",
      sort: 1978,
      kind: "found",
      band: "Kalyi Jag",
      title: "End of August, Nagyecsed–Budapest",
      body: "Kultura.hu, 2008: formed at the end of August 1978 from Szatmár Roma youth commuting between Nagyecsed and Budapest.",
    },
  ],
  johan: [
    {
      year: "2005",
      sort: 2005,
      kind: "found",
      band: "Johan János zenekara",
      title: "Own orchestra in Budapest",
      body: "First-person: founded in 2005 from excellent musicians of Budapest.",
    },
    {
      year: "2012–25",
      sort: 2012,
      kind: "lead",
      band: "100 Tagú Cigányzenekar",
      title: "Leading primás",
      body: "First-person: leading primás of the 100 Member orchestra, 2012 to 2025.",
    },
    {
      year: "2026",
      sort: 2026,
      kind: "lead",
      band: "Magyar Nemzeti Cigányzenekar",
      title: "Főprímás and artistic director",
      body: "First-person: from 2026. Józsefváros: re-formed under him; 1 April 2026, Hagyományok Háza. Founding year of that orchestra is listed under Later (1988 / 1994).",
    },
  ],
  lunca: [
    {
      year: "1951",
      sort: 1951,
      kind: "join",
      band: "With Dumitru Luncă",
      title: "Began to sing beside her father",
      body: "Digi24: she began to sing in 1951 with her father.",
    },
    {
      year: "1993",
      sort: 1993,
      kind: "end",
      band: "Urban lăutărească stage",
      title: "Left the stage for Pentecostal services",
      body: "Digi24: from 1993 she sang only at Pentecostal services in Bucharest.",
    },
  ],
  teodosievski: [
    {
      year: "1968",
      sort: 1968,
      kind: "join",
      band: "Teodosievski ensemble",
      title: "Marriage — voice and accordion",
      body: "Guardian: she married Stevo Teodosievski in 1968, after he asked her father to let her join the ensemble.",
    },
    {
      year: "1976",
      sort: 1976,
      kind: "rename",
      band: "Esma and Stevo",
      title: "Honorary titles in Chandigarh",
      body: "Guardian: in 1976, performing in Chandigarh, India, honorary titles Queen and King of Gypsy Music — the Guardian’s wording.",
    },
  ],
  "zece-prajini": [
    {
      year: "1996",
      sort: 1996,
      kind: "found",
      band: "Fanfare Ciocărlia",
      title: "Henry Ernst in the village",
      body: "Songlines 2021 and Kennedy Center: German sound engineer Henry Ernst came to Zece Prăjini in 1996. The public name Fanfare Ciocărlia — brass band, lark.",
    },
  ],
  kocani: [
    {
      year: "1957",
      sort: 1957,
      kind: "birth",
      band: "Kočani",
      title: "Naat Veliov born",
      body: "Macedonian notices: Kočani, 25 May 1957. Grandfather Ahmet, trumpet.",
    },
    {
      year: "1990s",
      sort: 1994,
      kind: "found",
      band: "Kočani Orkestar",
      title: "Public festival name",
      body: "Wedding brass from the town, then a European festival name. English Wikipedia prints 1994. Family memory of the 1930s also stands.",
    },
  ],
  mustafov: [
    {
      year: "1950",
      sort: 1950,
      kind: "birth",
      band: "Mustafov",
      title: "Štip",
      body: "Songlines: 20 December 1950, Štip. Roma family of musicians.",
    },
    {
      year: "2023",
      sort: 2023,
      kind: "end",
      band: "Mustafov",
      title: "Skopje",
      body: "Songlines: died 22 May 2023, hospital in Skopje, after a stroke. Aged 72.",
    },
  ],
  "mahala-rai": [
    {
      year: "2004",
      sort: 2004,
      kind: "found",
      band: "Mahala Rai Banda",
      title: "Crammed debut",
      body: "Bucharest band. Self-titled album recorded 2004, Crammed Discs 2005. Not merged with Clejani.",
    },
    {
      year: "2009",
      sort: 2009,
      kind: "record",
      band: "Mahala Rai Banda",
      title: "Ghetto Blasters",
      body: "Asphalt Tango. Henry Ernst and Marc Elsner.",
    },
  ],
};

export const ARTIST_PATCHES: Record<string, Record<string, unknown>> = {
  "vera-bila": {
    name: "Věra Bílá",
    years: "1954–2019",
    role: "Voice, Rom-pop",
    country: "Czech / Slovak Roma",
    bio: "Věra Bílá (22 May 1954, Rokycany – 12 March 2019, Plzeň). Giňa clan. Birth name / alternative Věra Giňová (RomArchive). With Kale she took Romani-language song to a public stage. First CD: Miko says 1995; RomArchive files RomPop 1996 — both stand. Split 2005: Kale continued without her. Heart attack; Faculty Hospital Plzeň (iDNES / Radio Prague).",
  },
  "janos-bihari": {
    years: "1764–1827",
    role: "Violin",
    country: "Kingdom of Hungary",
    bio: "Bihari János. Lexicon: Nagyabony, 21 October 1764 — Pest, 26 April 1827. Verbunkos violin. Around 1801 a five-piece band in Pest. Liszt heard him in 1822. 1824: left arm broken, primás chair given up. Rákóczi March as his work is an unproven assumption in the same lexicon.",
  },
  "esma-redzepova": {
    years: "1943–2016",
    role: "Voice",
    country: "Skopje",
    bio: "BBC: died Skopje, 11 December 2016, aged 73, hospital and family. Guardian: born Skopje old town in the war; father Ibrahim, mother Canija; married Stevo Teodosievski 1968; 1976 Chandigarh honorary titles — Queen and King of Gypsy Music, the Guardian’s wording.",
  },
  "gabi-lunca": {
    years: "1938–2021",
    role: "Voice — urban lăutărească",
    bio: "Digi24: Elena-Gabriela Luncă, Vărbilău, 16 October 1938; died 2 April 2021, Ilfov hospital, COVID-19. Father Dumitru Luncă, violin, Army Orchestra Ploiești. Sang from 1951. From 1993, Pentecostal services only.",
  },
  "kocani-orkestar": {
    bio: "Romani brass from Kočani. Naat Veliov, trumpet, led the public name. Macedonian notices: born Kočani, 25 May 1957; grandfather Ahmet, trumpet. English Wikipedia: he led until 2000. The 1930s village memory and the 1990s festival name both stand. Cousin to Zece Prăjini, not the same family.",
  },
};

export const NEW_ARTISTS: Record<string, unknown>[] = [
  {
    slug: "kalyi-jag",
    name: "Kalyi Jag",
    years: "from 1978",
    role: "Voice, guitar — inward song",
    country: "Hungary",
    traditionSlug: "vlax-song",
    bio: "Kultura.hu, 2008: formed at the end of August 1978, Szatmár Roma youth between Nagyecsed and Budapest. Name from Bari Károly. Népművészet Ifjú Mestere, 1979.",
  },
  {
    slug: "johan-janos",
    name: "Johan János",
    years: "living",
    role: "Violin, primás",
    country: "Hungary (Budapest)",
    traditionSlug: "hungarian",
    bio: "First-person: orchestra from 2005; 100 Tagú leading primás 2012–2025; from 2026 főprímás of the Magyar Nemzeti Cigányzenekar.",
  },
  {
    slug: "stevo-teodosievski",
    name: "Stevo Teodosievski",
    role: "Accordion, bandleader",
    country: "Skopje",
    traditionSlug: "balkan-brass",
    bio: "Guardian: accordionist and bandleader; asked Esma’s father; married 1968. Exact birth and death wait for a second Macedonian notice on this page.",
  },
  {
    slug: "jaroka-sandor-sr",
    name: "id. Járóka Sándor",
    years: "1922–1984",
    role: "Violin, primás",
    country: "Hungary",
    traditionSlug: "hungarian",
    bio: "Kisvárda, 16 February 1922 — Budapest, 11 April 1984. The master the 100 Tagú was founded to honour.",
  },
  {
    slug: "jaroka-sandor-jr",
    name: "ifj. Járóka Sándor",
    years: "1954–2007",
    role: "Violin, primás",
    country: "Hungary",
    traditionSlug: "hungarian",
    bio: "Budapest, 30 September 1954 — 18 September 2007. Knight’s Cross 2003.",
  },
  {
    slug: "boross-lajos",
    name: "Boross Lajos",
    years: "1925–2014",
    role: "Violin, primás",
    country: "Hungary",
    traditionSlug: "hungarian",
    bio: "Budapest, 7 January 1925 — 8 July 2014. Perpetual honorary főprímás of the 100 Tagú.",
  },
  {
    slug: "toki-horvath-gyula",
    name: "Toki Horváth Gyula",
    years: "1920–1971",
    role: "Violin, primás",
    country: "Hungary / Germany",
    traditionSlug: "hungarian",
    bio: "Kaposvár, 17 September 1920 — Munich, 13 October 1971. Left Hungary 1956.",
  },
  {
    slug: "santa-ferenc-jr",
    name: "ifj. Sánta Ferenc",
    years: "1945–2024",
    role: "Violin, primás",
    country: "Hungary",
    traditionSlug: "hungarian",
    bio: "Kaposvár, 2 March 1945 — 22 October 2024. Magyar Nemzeti Cigányzenekar.",
  },
  {
    slug: "magyari-imre",
    name: "Magyari Imre",
    years: "1894–1940",
    role: "Violin, primás",
    country: "Hungary",
    traditionSlug: "hungarian",
    bio: "Debrecen, 10 September 1894 — Budapest, 27 April 1940. Hungária Szálló.",
  },
  {
    slug: "nicolae-neacsu",
    name: "Nicolae Neacșu (Culai)",
    years: "1924–2002",
    role: "Violin, voice",
    country: "Romania (Clejani)",
    traditionSlug: "lautareasca",
    bio: "Taraf de Haïdouks. Birthplace on Later.",
  },
  {
    slug: "ferus-mustafov",
    name: "Ferus Mustafov",
    years: "1950–2023",
    role: "Saxophone, clarinet",
    country: "North Macedonia (Štip / Skopje)",
    traditionSlug: "balkan-brass",
    bio: "Songlines: Štip, 20 December 1950 — Skopje, 22 May 2023. Wedding clarinet and saxophone. Father Ilmi Jašarov. Not Kočani.",
  },
  {
    slug: "aurel-ionita",
    name: "Aurel Ioniță",
    role: "Violin, voice",
    country: "Romania (Bucharest)",
    traditionSlug: "lautareasca",
    bio: "Named leader of Mahala Rai Banda on Crammed and Asphalt Tango cards. Public from 2004. Clejani kinship not filed.",
  },
  {
    slug: "naat-veliov",
    name: "Naat Veliov",
    years: "b. 1957",
    role: "Trumpet",
    country: "North Macedonia (Kočani)",
    traditionSlug: "balkan-brass",
    bio: "Macedonian notices: Kočani, 25 May 1957. Trumpet of the Kočani Orkestar. Grandfather Ahmet, trumpet. Led the public name; English Wikipedia says until 2000.",
  },
  {
    slug: "ando-drom",
    name: "Ando Drom",
    years: "from 1984",
    role: "Voice, guitar, kanna — inward song",
    country: "Hungary (Budapest)",
    traditionSlug: "vlax-song",
    bio: "Romani: on the road. Jenő Zsigó. Rombase: after Kalyi Jag, a named public group of inward song. Not cigányzene.",
  },
  {
    slug: "jeno-zsigo",
    name: "Jenő Zsigó",
    role: "Voice, instruments — director",
    country: "Hungary (Budapest)",
    traditionSlug: "vlax-song",
    bio: "Musical director of Ando Drom, from 1984 in public notices.",
  },
  {
    slug: "ternipe",
    name: "Ternipe",
    years: "from 1989",
    role: "Voice, guitar — inward song",
    country: "Hungary",
    traditionSlug: "vlax-song",
    bio: "Romani: youth. Rombase: Vlach ensemble, traditional approach. Szabolcs-Szatmár-Bereg / Budapest, 1989.",
  },
  {
    slug: "romanyi-rota",
    name: "Rományi Rota",
    years: "from 1985",
    role: "Voice — inward song",
    country: "Hungary (Nagyecsed)",
    traditionSlug: "vlax-song",
    bio: "Roma Wheel. Rombase. Same town-world as Kalyi Jag. A different family.",
  },
  {
    slug: "kanizsa-csillagai",
    name: "Kanizsa Csillagai",
    years: "from 1993",
    role: "Voice, guitar — Beás song",
    country: "Hungary (Nagykanizsa)",
    traditionSlug: "vlax-song",
    bio: "Stars of Kanizsa. Beás public family. Underground Magazin: first stage 28 February 1993. Horváth Zoltán.",
  },
  {
    slug: "zoltan-horvath-kanizsa",
    name: "Horváth Zoltán",
    role: "Guitar, voice",
    country: "Hungary (Nagykanizsa)",
    traditionSlug: "vlax-song",
    bio: "Leader of Kanizsa Csillagai. Underground Magazin, 2005. Not the café Horváth line.",
  },
];

export const LINEAGE_PATCHES: Record<string, Record<string, unknown>> = {
  "vera-bila": {
    generation: 1,
    born: "22 May 1954",
    died: "12 March 2019",
    bornPlace: "Rokycany",
    diedPlace: "Plzeň",
    bio: "Giňa clan. Father Karol/Karel Giňa, singer. Birth name / alternative Věra Giňová (RomArchive). Heart attack; Faculty Hospital Plzeň (iDNES / Radio Prague).",
  },
  "janos-bihari": {
    generation: 1,
    born: "21 October 1764",
    died: "26 April 1827",
    bornPlace: "Nagyabony",
    diedPlace: "Pest",
    bio: "Lexicon. Verbunkos violin. Five-piece band in Pest from about 1801.",
  },
  "gabi-lunca": {
    generation: 2,
    born: "16 October 1938",
    died: "2 April 2021",
    bornPlace: "Vărbilău, Prahova",
    diedPlace: "Ilfov / Bucharest",
    bio: "Digi24. Father Dumitru, violin.",
  },
  "esma-redzepova": {
    generation: 1,
    born: "1943",
    died: "11 December 2016",
    bornPlace: "Skopje, old town",
    diedPlace: "Skopje",
    bio: "BBC death; Guardian birth in the old town. Day of birth not filed from a second notice here.",
  },
  "ferus-mustafov": {
    generation: 1,
    born: "20 December 1950",
    died: "22 May 2023",
    bornPlace: "Štip",
    diedPlace: "Skopje",
    bio: "Songlines. Father Ilmi Jašarov, saxophone.",
  },
  "naat-veliov": {
    generation: 1,
    born: "25 May 1957",
    bornPlace: "Kočani",
    bio: "Macedonian notices. Trumpet. Grandfather Ahmet.",
  },
};

export const NEW_SOURCES: {
  group: string;
  items: {
    id: string;
    kind: string;
    title: string;
    credit?: string;
    year?: string;
    place?: string;
    url?: string;
    used?: string;
  }[];
}[] = [
  {
    group: "hungary",
    items: [
      {
        id: "fiddle-channel-2020",
        kind: "video",
        title: "Hungarian Gypsy Music?",
        credit: "The Fiddle Channel",
        year: "2020",
        url: "https://www.youtube.com/watch?v=k9oaSVpE3kM",
        used: "Hungary chapter §05 and Cigányzene. Liszt 1859; 1423; 1681 preacher; 1683 noble’s fiddler; Mihály Barna 1737 (Sárosi doubts); verbunkos scale; Rózsavölgyi / Rosenthal 1835; Gyula–Arad 1892; Monti 1904; Dinicu; Bartók 1904–06; Rajkó 1952; State Folk Ensemble 1951; táncház (Timár, Halmos, Sebő, Martin); Muzsikás 1972; Bogyiszló / Kiss János Ökrös 1983 on Later; Tcha Limberger on Magyar nóta. Auto-captions; names checked against this archive.",
      },
      {
        id: "arcanum-bihari",
        kind: "web",
        title: "Bihari János",
        credit: "Magyar életrajzi lexikon / Arcanum",
        url: "https://www.arcanum.com/hu/online-kiadvanyok/Lexikonok-magyar-eletrajzi-lexikon-7428D/b-74700/bihari-janos-74BEB/",
        used: "Nagyabony 21 Oct 1764 — Pest 26 Apr 1827; five-piece band; Liszt 1822; left arm 1824; Rákóczi authorship unproven; Káldy’s Beethoven claim.",
      },
      {
        id: "abony-bihari",
        kind: "web",
        title: "260 éve született Bihari János",
        credit: "Abony város hivatalos honlapja",
        year: "2024",
        url: "https://www.abony.hu/hirek/item/1712-260-eve-szuletett-bihari-janos",
        used: "Second notice of the same birth and death dates as the lexicon.",
      },
      {
        id: "kultura-kalyi-2008",
        kind: "web",
        title: "Harmincéves a Kalyi Jag",
        credit: "kultura.hu / Varga Gusztáv",
        year: "2008",
        url: "https://kultura.hu/harminceves-kalyi-jag/",
        used: "End of August 1978; Nagyecsed–Budapest; Bari Károly name; Népművészet Ifjú Mestere 1979.",
      },
      {
        id: "zenekarokaz-johan",
        kind: "web",
        title: "Johan János prímás és zenekara",
        credit: "Johan János (first person)",
        url: "https://www.zenekarokaz.hu/johan-janos-primas-es-zenekara",
        used: "Own orchestra 2005; 100 Tagú 2012–2025; MNCz from 2026; 2008 competition.",
      },
      {
        id: "jozsefvaros-mncz-2026",
        kind: "web",
        title: "A régi-új Magyar Nemzeti Cigányzenekar 30 éves",
        credit: "Józsefváros Újság / Bányay Géza",
        year: "2026",
        url: "https://jozsefvarosujsag.hu/a-regi-uj-magyar-nemzeti-ciganyzenekar-30-eves/",
        used: "Idea in the 1980s; band from 1994 under ifj. Sánta Ferenc; Johan restart; 1 April, Hagyományok Háza.",
      },
      {
        id: "kultura-johan-2026",
        kind: "web",
        title: "Johan János interview",
        credit: "kultura.hu",
        year: "2026",
        url: "https://kultura.hu/johan-janos-ugy-tunik-ma-az-emberek-inkabb-nezik-es-csak-masodsorban-hallgatjak-a-zenet/",
        used: "January 2026 decision to bring MNCz back; that page says founded 1988 — kept as a conflict with 1994.",
      },
    ],
  },
  {
    group: "lautari",
    items: [
      {
        id: "digi24-lunca",
        kind: "web",
        title: "Cine a fost Gabi Luncă",
        credit: "Digi24",
        year: "2021",
        url: "https://www.digi24.ro/stiri/actualitate/cine-a-fost-gabi-lunca-si-a-inceput-cariera-in-1951-iar-dupa-1993-a-cantat-doar-la-slujbe-penticostale-1482977",
        used: "Birth, father, 1951, 1953 Băicoi, 1993 Pentecostal, death 2 April 2021 COVID.",
      },
      {
        id: "asphalt-lunca",
        kind: "web",
        title: "Gabi Luncă",
        credit: "Asphalt Tango Records",
        url: "https://www.asphalt-tango.de/artists/gabi-lunca",
        used: "Vărbilău; father Dumitru; birth 1938. Sibling count (twelve) conflicts with Romanian notices (six) — Later.",
      },
    ],
  },
  {
    group: "east",
    items: [
      {
        id: "bbc-esma-2016",
        kind: "web",
        title: "Esma Redzepova, Macedonia's 'Romany music queen', dies at 73",
        credit: "BBC News",
        year: "2016",
        url: "https://www.bbc.com/news/world-europe-38283554",
        used: "Death Skopje, 11 December 2016, hospital and family, age 73, Romani-language singer.",
      },
      {
        id: "guardian-esma-2016",
        kind: "web",
        title: "Esma Redžepova obituary",
        credit: "The Guardian",
        year: "2016",
        url: "https://www.theguardian.com/world/2016/dec/14/esma-redzepova-obituary",
        used: "Skopje old town; Ibrahim and Canija; Stevo; marriage 1968; Chandigarh 1976 honorary titles.",
      },
      {
        id: "songlines-fanfare-2021",
        kind: "article",
        title: "Fanfare Ciocărlia | A Beginner's Guide",
        credit: "Garth Cartwright, Songlines",
        year: "2021",
        url: "https://www.songlines.co.uk/content/features/fanfare-ciocarlia-a-beginners-guide",
        used: "Henry Ernst, 1996, Zece Prăjini; fanfare / ciocărlia (lark).",
      },
      {
        id: "romarchive-bila-2018",
        kind: "article",
        title: "Věra Bílá",
        credit: "Inka Jurková / RomArchive",
        year: "2018",
        url: "https://www.romarchive.eu/en/collection/p/vera-bila/",
        used: "Giňa / Giňová; Kale public form 1995; named Rokycany players; Rom-pop; RomPop 1996; Kale Kalore 1998; split 2005.",
      },
      {
        id: "pamet-naroda-miko",
        kind: "web",
        title: "Emil Miko (1961)",
        credit: "Paměť národa",
        url: "https://www.pametnaroda.cz/cs/miko-emil-1961",
        used: "Private/local band from 1986 with cousins and Věra Bílá; first CD year 1995 in Miko’s telling.",
      },
      {
        id: "idnes-bila-2019",
        kind: "web",
        title: "Zemřela zpěvačka Věra Bílá",
        credit: "iDNES",
        year: "2019",
        url: "https://www.idnes.cz/kultura/hudba/vera-bila-zemrela.A190312_104512_hudba_ts",
        used: "Death 12 March 2019; Faculty Hospital Plzeň.",
      },
      {
        id: "radio-prague-bila-2019",
        kind: "web",
        title: "Czech Romany singer Věra Bílá dies at 64",
        credit: "Radio Prague International",
        year: "2019",
        url: "https://english.radio.cz/czech-romany-singer-vera-bila-dies-64-8136383",
        used: "Death notice; heart attack; hospital. Journalists’ Ella Fitzgerald / Queen of Romany lines are not a community crown.",
      },
      {
        id: "loc-eva-stan-2019",
        kind: "video",
        title: "Eva Salina & Peter Stan: Serbian Roma Music Concert",
        credit: "Library of Congress / American Folklife Center Homegrown",
        year: "2019",
        url: "https://www.loc.gov/item/webcast-8757/",
        used: "Balkans chapter and Bajramović family. Peter Stan, Serbian/Romanian Roma accordion. Eva Salina interprets Vida Pavlović and Šaban. Not a new family.",
      },
      {
        id: "loc-esma-2016",
        kind: "video",
        title: "Esma Redžepova & Folk Masters Play Romani (Gypsy) & Macedonian Music",
        credit: "Library of Congress Homegrown",
        year: "2016",
        url: "https://www.youtube.com/watch?v=cwvmxeSKnso",
        used: "Teodosievski family. Library title keeps Gypsy. Esma died later in 2016.",
      },
      {
        id: "rferl-khamoro-2012",
        kind: "video",
        title: "Khamoro Festival Of Roma Music In Prague",
        credit: "Radio Free Europe / Radio Liberty",
        year: "2012",
        url: "https://www.youtube.com/watch?v=jg5S6t28i-E",
        used: "Balkans chapter. Parade through Old Town; performers from Macedonia, France, Turkey.",
      },
      {
        id: "arc-ibro-lolov",
        kind: "record",
        title: "Gypsy Music from Bulgaria / Gypsy Dance from Sofia",
        credit: "Ibro Lolov / ARC / NAXOS",
        year: "1998 / 2014",
        url: "https://www.youtube.com/watch?v=T0eMDGgAy1c",
        used: "Named Bulgarian Romani accordion. Official audio, not the NestleBG mix. No family page yet.",
      },
      {
        id: "fm-transylvania-roma-voices",
        kind: "record",
        title: "Transylvania — Roma Voices",
        credit: "FM Records, The Rom Of Fire, Vol. 3",
        year: "2001",
        url: "https://www.youtube.com/watch?v=bmqobam_kfM",
        used: "Romania / lăutărească. Transylvania on the same map. Unknown Artist on the Topic channel.",
      },
      {
        id: "songlines-ferus-2023",
        kind: "article",
        title: "Obituary: Ferus Mustafov (1950–2023)",
        credit: "Kim Burton, Songlines",
        year: "2023",
        url: "https://www.songlines.co.uk/news/obituary-ferus-mustafov-1950-2023",
        used: "Štip 20 December 1950; Skopje 22 May 2023; father Ilmi Jašarov; mother Zumbrut; Sarajevo; Romani TV; Globe Style.",
      },
      {
        id: "asphalt-mahala",
        kind: "web",
        title: "Mahala Rai Banda",
        credit: "Asphalt Tango Records",
        url: "https://www.asphalt-tango.de/artists/mahala-rai-banda",
        used: "Bucharest band. Ghetto Blasters 2009. Not merged with Clejani.",
      },
      {
        id: "rombase-hungary",
        kind: "article",
        title: "The music of the Roma in Hungary",
        credit: "Katalin Kovalcsik / Rombase, University of Graz",
        url: "https://web.archive.org/web/20200806130554/http://rombase.uni-graz.at/cgi-bin/art.cgi?src=data/music/countries/hungary.en.xml",
        used: "Kalyi Jag 1979/1987; Ternipe traditional Vlach; Ando Drom, Amaro Suno, Rományi Rota new genres; Kanizsa Csillagai Boyash after Frácilor.",
      },
      {
        id: "underground-kanizsa-2005",
        kind: "article",
        title: "Kanizsa Csillagai",
        credit: "Underground Magazin",
        year: "2005",
        url: "http://www.undergroundmagazin.hu/cikk.php?id=14387",
        used: "Nagykanizsa; Beás songs; Horváth Zoltán; first stage 28 February 1993.",
      },
    ],
  },
];

export const NEW_LATER: Record<string, LaterItem[]> = {
  conflicts: [
    {
      id: "lunca-siblings",
      title: "Dumitru Luncă — six children, or twelve?",
      what: "Digi24 and Romanian notices: Gabi grew up in a family of six children. Asphalt Tango: one of violinist Dumitru Luncă’s 12 children. Birth year and father match. The sibling count does not.",
      whyLater: "Two counts. This page files the father, not the number.",
      sourceTitle: "Digi24 / Asphalt Tango",
      year: "1938",
    },
    {
      id: "puceanu-birth",
      title: "Romica Puceanu — 1926 or 1927?",
      what: "Discogs and several Romanian notices: 19 January 1927, Bucharest. CNCR’s heading on one pass printed 1926–1996 while the body said 1927. This page files the death, not the birth year.",
      whyLater: "One year apart. Both readings remain listed under Later.",
      sourceTitle: "Discogs / CNCR / Romanian notices",
      year: "1926 / 1927",
    },
    {
      id: "magyari-nori-extras",
      title: "Magyari Imre — Siófok, Radics, Royal Szálló, radio 1925",
      what: "The Magyari family once printed Siófok 1909 in his father’s band, assistant primás to Radics Béla, the Royal Szálló, and Magyar Rádió from 1925, attributed to the NORI grave register. The lexicon does not have those lines. The grave page did not return them this pass.",
      whyLater: "Until the original register lines are in hand, they are not on the family.",
      sourceTitle: "NORI grave page (not recovered this pass) vs Arcanum lexicon",
    },
    {
      id: "mihaly-barna",
      title: "Mihály Barna / Barnabás — 1737 quartet, or a fiction?",
      what: "The Fiddle Channel, 2020: first renowned Gypsy violinist and bandleader Mihály Barnabás, 1737 quartet (second violin, harp, bass); credited with a Rákóczi song; said to have fought and been exiled with Prince Ferenc Rákóczi. The same film notes Sárosi: Panna Czinka’s grandfather Mihály Barna was fictitious, and Rákóczi had no Gypsies in his retinue. The Czinka family already files the Rákóczi March as not hers (lexicon).",
      whyLater: "The film names him and doubts him in the same breath. No family page.",
      sourceTitle: "The Fiddle Channel, Hungarian Gypsy Music?",
      year: "1737 / 2020",
      url: "https://www.youtube.com/watch?v=k9oaSVpE3kM",
    },
  ],
  "needs-second": [
    {
      id: "bogyiszlo-okros",
      title: "Bogyiszló Orchestra / Kiss János Ökrös",
      what: "The Fiddle Channel, 2020: Romani source band from Bogyiszló on the Danube; primás Kiss János Ökrös; Sebő recorded them for Hungaroton in 1983; ugrós and other tunes that predate verbunkos. ASR also wrote “Bogiszló.”",
      whyLater: "A named village band in one film. No family page until origin and sources are recorded.",
      sourceTitle: "The Fiddle Channel, Hungarian Gypsy Music?",
      year: "1983 / 2020",
      url: "https://www.youtube.com/watch?v=k9oaSVpE3kM",
    },
    {
      id: "rozsavolgyi-1835",
      title: "Márk Rózsavölgyi — first csárdás, 1835?",
      what: "The Fiddle Channel, 2020: Rózsavölgyi composed the first csárdás in 1835; born Mordecai Rosenthal; he and his ensemble were Jewish, not Romani. Sárosi, in the same film’s telling, later called many csárdás pieces made to pattern. This is repertoire history, not a Romani family register.",
      whyLater: "One film’s first-csárdás date. Filed on the Hungary chapter as the film’s claim. No family page — he is not Roma.",
      sourceTitle: "The Fiddle Channel, Hungarian Gypsy Music?",
      year: "1835 / 2020",
      url: "https://www.youtube.com/watch?v=k9oaSVpE3kM",
    },
    {
      id: "ibro-lolov",
      title: "Ibro Lolov — Bulgarian accordion family?",
      what: "Named Romani accordionist from Bulgaria. ARC album Gypsy Music from Bulgaria (1998); NAXOS audio 2014. A NestleBG YouTube mix is not the source. Neighbour to Papazov’s clarinet.",
      whyLater: "A named player and a label. No family page until origin and sources are recorded.",
      sourceTitle: "ARC / NAXOS — Gypsy Music from Bulgaria",
      year: "1998 / 2014",
      url: "https://www.youtube.com/watch?v=T0eMDGgAy1c",
    },
    {
      id: "selime-bajrami",
      title: "Selime Bajrami — Kosovo Roma song, Jugoton 1969",
      what: "Selime Bajrami & Ansambl Rasima Saliha, Gilava Amare Romenge, Jugoton EPY-4085, 1969. Liner notes for Stand Up, People. Fan YouTube uploads exist. Not Selma Bajrami the pop singer.",
      whyLater: "A named Kosovo voice. No family page until origin and sources are recorded. Fan clips are not used here.",
      sourceTitle: "Jugoton EPY-4085 / Stand Up, People liner notes",
      year: "1969",
    },
    {
      id: "greek-romani-compilation",
      title: "Songs of Greece’s Gypsies — 1996 FM Records",
      what: "Compilation. To Tragoudi Ton Gyfton sung by Eleni Vitali. Official FM Records audio exists. Greece is already a country on Balkan brass. The compilation is not a Romani family register.",
      whyLater: "No Greek Romani family page until origin and sources are recorded. A title is not enough to file Eleni Vitali as Roma.",
      sourceTitle: "FM Records — Songs of Greece’s Gypsies",
      year: "1996",
      url: "https://www.youtube.com/watch?v=T_Brds73aLc",
    },
    {
      id: "transylvania-dancing-clip",
      title: "Dancing Gypsies in Transylvania — guesthouse clip",
      what: "CasaNoah Guesthouses, 2009. Title uses Gypsy. A tourist dance video, not a lăutar family.",
      whyLater: "Not filed. Transylvania is already on the Romania chapter via Bartók and the FM Records track.",
      sourceTitle: "CasaNoah Guesthouses",
      year: "2009",
      url: "https://www.youtube.com/watch?v=2UJu9kqk5QE",
    },
    {
      id: "playlist-fusion-not-families",
      title: "Gypsy Hill, Balkan Beat Box, Goran Bregović — not families",
      what: "Milenka BobicT’s playlist gypsy balkan music mixes Fanfare Ciocărlia with Gypsy Hill (Batov), Balkan Beat Box, Besh o droM, Shantel remixes, and Goran Bregović. Those are festival/fusion bills. Bregović is not Roma. A playlist is not a family register.",
      whyLater: "Fusion acts wait until a Romani family line is sourced.",
      sourceTitle: "YouTube playlist — Milenka BobicT",
      year: "playlist",
    },
    {
      id: "milan-zavkov",
      title: "Milan Zavkov — Macedonian clarinet",
      what: "Named on the same playlist: Macedonian narodna / čoček clarinet. No second source filed this pass.",
      whyLater: "A named player. No family page until origin and sources are recorded.",
      sourceTitle: "Playlist credit only",
    },
    {
      id: "mahala-clejani-kin",
      title: "Aurel Ioniță — Clejani kinship?",
      what: "Wikipedia and World Music Central: Mahala Rai Banda’s Aurel Ioniță from a Clejani lăutari family, related to Taraf de Haïdouks. This page files the band, not the cousin-chart.",
      whyLater: "A merge with Clejani waits until a family page records the chairs.",
      sourceTitle: "Asphalt Tango / Wikipedia (thin)",
    },
    {
      id: "amaro-suno",
      title: "Amaro Suno — Our Dream",
      what: "Rombase lists Amaro Suno with Ando Drom and Rományi Rota among groups trying new genres of Hungarian inward song. No family page this pass.",
      whyLater: "Named in Kovalcsik. No family page until origin and sources are recorded.",
      sourceTitle: "Rombase — The music of the Roma in Hungary",
    },
    {
      id: "kanizsa-extra-chairs",
      title: "Kanizsa Csillagai — Ibi, Sándor, Havasi, Orsós",
      what: "Underground Magazin 2005 names wife Ibi (voice), brother Sándor (guitar, mandolin), brother-in-law Havasi Attila (kanna), cousin Orsós Vendel. This page files Horváth Zoltán as leader. Extra chairs wait.",
      whyLater: "One magazine notice. The whole kinship chart waits until it is sourced.",
      sourceTitle: "Underground Magazin, 11 February 2005",
      year: "2005",
    },
  ],
};
