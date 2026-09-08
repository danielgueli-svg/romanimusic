export type LifeStory = {
  lang: string;
  langLabel: string;
  original: string[];
  en: string[];
  sources: { label: string; href?: string }[];
};

/**
 * Lives in this archive’s voice. Facts checked against Wikipedia and other
 * printed sources. Prose is written here, not lifted.
 */
export const LIVES: Record<string, LifeStory> = {
  "django-reinhardt": {
    lang: "fr",
    langLabel: "Français",
    original: [
      "Django Reinhardt naît à Liberchies, Belgique, le 23 janvier 1910.",
      "La famille est sinté. En France on dit manouche.",
      "En 1928 le feu prend dans la roulotte. La main gauche est brûlée. Le jour exact n’est pas le même d’une notice à l’autre.",
      "Joseph, le frère, lui apporte une guitare. La technique change.",
      "Paris, 1934: le Quintette du Hot Club de France, avec Stéphane Grappelli.",
      "En 1946, tournée américaine. Duke Ellington est sur l’affiche.",
      "Il meurt à Fontainebleau le 16 mai 1953.",
      "La musique sinté existait. Django la fait entendre au jazz public.",
    ],
    en: [
      "Django Reinhardt was born in Liberchies, Belgium, on 23 January 1910.",
      "The family is Sinti. In France the word is Manouche.",
      "In 1928 the caravan burned. The left hand was burned. Notices do not give the same day.",
      "Joseph, his brother, brought a guitar. The technique changed.",
      "Paris, 1934: the Quintette du Hot Club de France, with Stéphane Grappelli.",
      "In 1946, an American tour. Duke Ellington was on the bill.",
      "He died in Fontainebleau on 16 May 1953.",
      "Sinti music already existed. Django made the paying jazz public hear it.",
    ],
    sources: [
      { label: "This archive — Reinhardt family" },
      { label: "Checked: Wikipédia (fr)", href: "https://fr.wikipedia.org/wiki/Django_Reinhardt" },
      { label: "Library of Congress — Gottlieb, 1946" },
    ],
  },
  "stephane-grappelli": {
    lang: "fr",
    langLabel: "Français",
    original: [
      "Stéphane Grappelli naît à Paris le 26 janvier 1908.",
      "Père italien. Mère française. Il n’est pas romani.",
      "Les cinémas l’emploient dès 1923, violon et piano.",
      "Le Quintette, 1934, est le travail à deux avec Django.",
      "La guerre le laisse en Angleterre. Ils se retrouvent en 1946.",
      "Il meurt à Paris le 1er décembre 1997.",
    ],
    en: [
      "Stéphane Grappelli was born in Paris on 26 January 1908.",
      "Italian father. French mother. He was not Romani.",
      "Cinemas hired him from 1923, violin and piano.",
      "The Quintette, 1934, was the two-handed work with Django.",
      "The war left him in England. They met again in 1946.",
      "He died in Paris on 1 December 1997.",
    ],
    sources: [
      { label: "This archive — Reinhardt family" },
      { label: "Checked: Wikipédia (fr)", href: "https://fr.wikipedia.org/wiki/St%C3%A9phane_Grappelli" },
    ],
  },
  "janos-bihari": {
    lang: "hu",
    langLabel: "Magyar",
    original: [
      "Bihari János. Lexikon: Nagyabony, 1764. október 21. Pest, 1827. április 26.",
      "Verbunkos hegedű. A fizető terem zenéje.",
      "Pest, 1801 körül: ötfős banda.",
      "Liszt 1822-ben hallotta. Donát 1820-ban megfestette. A kép a Nemzeti Múzeumban van.",
      "1824: a bal kar eltörik. A prímási széknek vége.",
      "A Rákóczi-induló az ő műve: a lexikon ezt nem tartja bizonyítottnak.",
    ],
    en: [
      "János Bihari. Lexicon: Nagyabony, 21 October 1764. Pest, 26 April 1827.",
      "Verbunkos violin. Music for a paying room.",
      "Pest, around 1801: a five-piece band.",
      "Liszt heard him in 1822. Donát painted him in 1820. The picture is in the National Museum.",
      "1824: the left arm breaks. The primás chair ends.",
      "The Rákóczi March as his work: the lexicon does not treat this as proven.",
    ],
    sources: [
      { label: "Magyar életrajzi lexikon" },
      { label: "János Donát, 1820, Hungarian National Museum" },
      { label: "Checked: Wikipédia (hu)", href: "https://hu.wikipedia.org/wiki/Bihari_J%C3%A1nos_(zeneszerz%C5%91)" },
    ],
  },
  "czinka-panna": {
    lang: "hu",
    langLabel: "Magyar",
    original: [
      "Czinka Panna. MEK: Sajógömör, 1711.",
      "Halál: 1772, kérdőjellel. Egy másik lap Tornalját is ír. A hely nincs lezárva.",
      "Hegedű. Női banda vezető. Ritka szék abban a korban.",
      "Sárosi 1978-ban az első modern cigányprímásnak nevezi. Ez az ő könyve, nem anyakönyv.",
    ],
    en: [
      "Czinka Panna. MEK: Sajógömör, 1711.",
      "Death: 1772, with a question mark. Another page also writes Tornalja. The place is not closed.",
      "Violin. A woman bandleader. A rare chair in that time.",
      "Sárosi in 1978 names her the first modern Gypsy primás. That is his book, not a parish register.",
    ],
    sources: [
      { label: "MEK", href: "http://mek.oszk.hu/00300/00355/html/ABC02469/02975.htm" },
      { label: "RomArchive — Panna Czinka" },
      { label: "Sárosi, Gypsy Music, 1978" },
      { label: "Checked: Wikipédia (hu)", href: "https://hu.wikipedia.org/wiki/Czinka_Panna" },
    ],
  },
  camaron: {
    lang: "es",
    langLabel: "Español",
    original: [
      "José Monje Cruz. San Fernando, Cádiz, 5 de diciembre de 1950.",
      "Familia gitana. El público lo llama Camarón de la Isla.",
      "Madrid, 1968: tablaos. El disco con Paco de Lucía, 1969.",
      "La leyenda del tiempo, 1979. El cante sale del palo cerrado y no lo deja.",
      "Muere en Barcelona el 2 de julio de 1992.",
    ],
    en: [
      "José Monje Cruz. San Fernando, Cádiz, 5 December 1950.",
      "Gitano family. The public calls him Camarón de la Isla.",
      "Madrid, 1968: tablaos. The record with Paco de Lucía, 1969.",
      "La leyenda del tiempo, 1979. The cante leaves the closed palo and does not drop it.",
      "He died in Barcelona on 2 July 1992.",
    ],
    sources: [
      { label: "This archive — flamenco / Monje family" },
      { label: "Checked: Wikipedia (es)", href: "https://es.wikipedia.org/wiki/Camar%C3%B3n_de_la_Isla" },
    ],
  },
  "carmen-amaya": {
    lang: "es",
    langLabel: "Español",
    original: [
      "Carmen Amaya. Gitana de Barcelona. El Somorrostro.",
      "Unas fichas ponen 1913. Otras, 1918. Las dos quedan.",
      "El baile sale de niña. París. Buenos Aires, 1936. Carnegie Hall, 1941.",
      "Vuelve a España en 1947.",
      "Muere en Begur el 19 de noviembre de 1963.",
    ],
    en: [
      "Carmen Amaya. Barcelona Gitana. Somorrostro.",
      "Some cards print 1913. Others, 1918. Both stand.",
      "The dance starts in childhood. Paris. Buenos Aires, 1936. Carnegie Hall, 1941.",
      "She returns to Spain in 1947.",
      "She died in Begur on 19 November 1963.",
    ],
    sources: [
      { label: "This archive — Amaya family" },
      { label: "Checked: Wikipedia (es)", href: "https://es.wikipedia.org/wiki/Carmen_Amaya" },
    ],
  },
  "vera-bila": {
    lang: "cs",
    langLabel: "Česky",
    original: [
      "Věra Bílá. Rokycany, 22. května 1954. Plzeň, 12. března 2019.",
      "Rod Giňa. Otec Karol Giňa zpíval. RomArchive píše i Věra Giňová.",
      "Kale: veřejná kapela od 1995. Sami tomu říkali rom-pop.",
      "První deska: Miko 1995, RomArchive RomPop 1996. Obě karty platí.",
      "Film Mira Erdevicki-Charap, 1999. Rozchod 2005. Kale jdou dál bez ní.",
      "Infarkt. Fakultní nemocnice Plzeň.",
    ],
    en: [
      "Věra Bílá. Rokycany, 22 May 1954. Plzeň, 12 March 2019.",
      "Giňa clan. Father Karol Giňa sang. RomArchive also files Věra Giňová.",
      "Kale: a public band from 1995. They named the genre Rom-pop.",
      "First disc: Miko 1995, RomArchive RomPop 1996. Both cards stand.",
      "Film by Mira Erdevicki-Charap, 1999. Split 2005. Kale go on without her.",
      "Heart attack. Faculty Hospital Plzeň.",
    ],
    sources: [
      { label: "RomArchive — Inka Jurková, 2018" },
      { label: "Paměť národa — Emil Miko" },
      { label: "iDNES / Radio Prague" },
      { label: "Checked: Wikipedie (cs)", href: "https://cs.wikipedia.org/wiki/V%C4%9Bra_B%C3%ADl%C3%A1" },
    ],
  },
  "esma-redzepova": {
    lang: "mk",
    langLabel: "Македонски",
    original: [
      "Есма Реџепова. Скопје, 8 август 1943. Скопје, 11 декември 2016. Би-би-си: 73 години.",
      "Татко Ибрахим. Мајка Џанија. Така The Guardian.",
      "Гласот со Стево Теодосиевски од есента 1957. Брак 1968.",
      "Чандигар, 1976: почесни титули. Тоа е реченицата на весникот, не круна тука.",
    ],
    en: [
      "Esma Redžepova. Skopje, 8 August 1943. Skopje, 11 December 2016. BBC: aged 73.",
      "Father Ibrahim. Mother Canija. So The Guardian.",
      "The voice with Stevo Teodosievski from autumn 1957. Marriage 1968.",
      "Chandigarh, 1976: honorary titles. That is the paper’s sentence, not a crown here.",
    ],
    sources: [
      { label: "BBC" },
      { label: "The Guardian" },
      { label: "This archive — Teodosievski family" },
      { label: "Checked: Википедија (mk)", href: "https://mk.wikipedia.org/wiki/%D0%95%D1%81%D0%BC%D0%B0_%D0%A0%D0%B5%D1%9F%D0%B5%D0%BF%D0%BE%D0%B2%D0%B0" },
    ],
  },
  "gipsy-kings": {
    lang: "fr",
    langLabel: "Français",
    original: [
      "Les Gipsy Kings. Familles gitanes d’Arles et de Montpellier.",
      "Fils et neveux de José Reyes.",
      "La rumba catalane, années 1970. Pas le cante jondo.",
      "Bamboléo met le mot Gipsy sur les radios. Le site du groupe le confirme.",
    ],
    en: [
      "The Gipsy Kings. Gitane families of Arles and Montpellier.",
      "Sons and nephews of José Reyes.",
      "Rumba catalana, 1970s. Not cante jondo.",
      "Bamboléo put the word Gipsy on the radios. The band’s own site confirms it.",
    ],
    sources: [
      { label: "gipsykings.com", href: "https://www.gipsykings.com/" },
      { label: "This archive — Reyes / Baliardo" },
    ],
  },
  "fanfare-ciocarlia": {
    lang: "ro",
    langLabel: "Română",
    original: [
      "Fanfare Ciocărlia. Zece Prăjini, Moldova.",
      "Alamă de nuntă. Sat rom. Viteză și durată.",
      "Henry Ernst a venit în 1996. Asphalt Tango ține agenda.",
      "Ioan Ivancea, clarinet, conducător. Anul nașterii 1934 e pe mai multe fișe. Anul morții 2005 sau 2006. Nu alegem.",
      "Aceeași meserie ca truba balcanică. Nu ca taraf-ul de coarde.",
    ],
    en: [
      "Fanfare Ciocărlia. Zece Prăjini, Moldavia.",
      "Wedding brass. A Romani village. Speed and stamina.",
      "Henry Ernst came in 1996. Asphalt Tango keeps the dates.",
      "Ioan Ivancea, clarinet, leader. Birth year 1934 is on more than one card. Death year 2005 or 2006. We do not pick.",
      "The same job as Balkan truba. Not the string taraf.",
    ],
    sources: [
      { label: "Asphalt Tango", href: "https://www.asphalt-tango.de/artists/fanfare-ciocarlia" },
      { label: "This archive — Zece Prăjini" },
      { label: "Checked: Wikipedia (ro)", href: "https://ro.wikipedia.org/wiki/Fanfare_Cioc%C4%83rlia" },
    ],
  },
  "ferus-mustafov": {
    lang: "mk",
    langLabel: "Македонски",
    original: [
      "Ферус Мустафов. Штип, 20 декември 1950 — Скопје, 22 мај 2023.",
      "Ромско семејство на музичари. Татко Илми Јашаров, саксофон.",
      "Кларинет и саксофон. Свадбен крал. Не Кочани.",
      "Songlines: умре по мозочен удар, во болница во Скопје.",
    ],
    en: [
      "Ferus Mustafov. Štip, 20 December 1950 — Skopje, 22 May 2023.",
      "A Roma family of musicians. Father Ilmi Jašarov, saxophone.",
      "Clarinet and saxophone. A wedding-band king. Not Kočani.",
      "Songlines: he died after a stroke, in hospital in Skopje.",
    ],
    sources: [
      { label: "Songlines — Kim Burton, 2023", href: "https://www.songlines.co.uk/news/obituary-ferus-mustafov-1950-2023" },
      { label: "This archive — Mustafov" },
      { label: "Checked: Википедија (mk)", href: "https://mk.wikipedia.org/wiki/%D0%A4%D0%B5%D1%80%D1%83%D1%81_%D0%9C%D1%83%D1%81%D1%82%D0%B0%D1%84%D0%BE%D0%B2" },
    ],
  },
  "taraf-de-haidouks": {
    lang: "ro",
    langLabel: "Română",
    original: [
      "Clejani. Lăutari de nuntă. În română: Taraful Haiducilor. Afară: Taraf de Haïdouks.",
      "Speranța Rădulescu i-a înregistrat în 1983.",
      "Crammed Discs, după 1989. Primul disc, 1991.",
      "Culai, Șaică, Cacurică — viori și țambal din sat. Anii de moarte sunt pe pagina casei.",
      "Locul nașterii lui Neacșu nu se închide aici.",
    ],
    en: [
      "Clejani. Wedding lăutari. In Romanian: Taraful Haiducilor. Abroad: Taraf de Haïdouks.",
      "Speranța Rădulescu recorded them in 1983.",
      "Crammed Discs, after 1989. First disc, 1991.",
      "Culai, Șaică, Cacurică — village violin and cimbalom. Death years sit on the family page.",
      "Neacșu’s birthplace is not closed here.",
    ],
    sources: [
      { label: "Crammed Discs", href: "https://www.crammed.be/" },
      { label: "This archive — Clejani" },
      { label: "Checked: Wikipedia (ro)", href: "https://ro.wikipedia.org/wiki/Taraful_Haiducilor" },
    ],
  },
  "roby-lakatos": {
    lang: "hu",
    langLabel: "Magyar",
    original: [
      "Lakatos Roby. 1965.",
      "Apa: Lakatos Antal, pesti kávéház.",
      "Kilencévesen már abban a bandában hegedül.",
      "Ő mondja: hetedik hegedűs nemzedék. Ez az ő szava.",
      "Belgium, aztán koncert. A könyv csárdás és nóta. Djangót tudja. Nem Django-játékos.",
    ],
    en: [
      "Roby Lakatos. 1965.",
      "Father: Antal Lakatos, a Pest café.",
      "At nine he already played in that band.",
      "He says: seventh violin generation. That is his word.",
      "Belgium, then the concert hall. The book is csárdás and nóta. He can play Django. He is not a Django player.",
    ],
    sources: [
      { label: "roby-lakatos.com", href: "https://www.roby-lakatos.com/" },
      { label: "This archive — Lakatos family" },
    ],
  },
  "sandor-lakatos": {
    lang: "hu",
    langLabel: "Magyar",
    original: [
      "Lakatos Sándor. Budapest, 1924. december 17. – 1994. május 24.",
      "Az apa Flóris tanított. A nagybátya Tóni bandájában tanulta a prímási széket.",
      "Saját zenekar a Britannia Szállóban, tizennyolc évesen.",
      "Rádió, 1950–55. Zeneakadémia ugyanakkor.",
      "1954: Liszt-díj és Népművészet Mestere.",
      "Fia Déki. Roby más ág. Két Lakatos-család.",
    ],
    en: [
      "Sándor Lakatos. Budapest, 17 December 1924 – 24 May 1994.",
      "Father Flóris taught him. Uncle Tóni’s band taught the primás chair.",
      "Own orchestra at the Britannia Hotel, age eighteen.",
      "Radio, 1950–55. The Academy at the same time.",
      "1954: Liszt Prize and Master of Folk Art.",
      "His son is Déki. Roby is another branch. Two Lakatos families.",
    ],
    sources: [
      { label: "This archive — Lakatos family" },
      { label: "Checked: Wikipédia (hu)", href: "https://hu.wikipedia.org/wiki/Lakatos_S%C3%A1ndor_(zen%C3%A9sz)" },
    ],
  },
  "sandor-deki-lakatos": {
    lang: "hu",
    langLabel: "Magyar",
    original: [
      "Déki Lakatos Sándor. Budapest, 1945. szeptember 6.",
      "Apa: Lakatos Sándor. A Déki név a dédanya vonala. Apa kérte.",
      "A nagyapa Flóris tette a hegedűt a kezébe. 1960-tól az apa bandája.",
      "Egy lap hatodik prímásnak írja. Az a lap szövege, nem anyakönyv.",
    ],
    en: [
      "Sándor Déki Lakatos. Budapest, 6 September 1945.",
      "Father: Sándor Lakatos. The name Déki is a great-grandmother’s line. The father asked for it.",
      "Grandfather Flóris put the violin in his hand. From 1960, the father’s band.",
      "One page calls him the sixth primás. That is that page, not a parish register.",
    ],
    sources: [
      { label: "This archive — Lakatos family" },
      { label: "Checked: Wikipédia (hu)", href: "https://hu.wikipedia.org/wiki/D%C3%A9ki_Lakatos_S%C3%A1ndor" },
    ],
  },
  "boross-lajos": {
    lang: "hu",
    langLabel: "Magyar",
    original: [
      "Boross Lajos. Budapest, 1925. január 7. Halál: 2014. július 8. MTI: 89 éves.",
      "Az apa Géza. Öreg Rajkók, 1938–40. Zeneakadémia Zathureczkynél.",
      "Tizenhét évesen a Trombitás étterem.",
      "1950: Állami Népi Együttes. Az MTI szerint Kodály állt a kinevezés mögött.",
      "Népművészet Mestere: az egyik gyászjelentés 1953, egy másik lap 1954. Mindkettő áll.",
      "1985: a 100 Tagú főprímása. 1998: egészség. Örökös tiszteletbeli szék. Kossuth-díj, 2006.",
    ],
    en: [
      "Lajos Boross. Budapest, 7 January 1925. Death: 8 July 2014. MTI: aged 89.",
      "Father Géza. Öreg Rajkók, 1938–40. Academy with Zathureczky.",
      "At seventeen, the Trombitás restaurant.",
      "1950: State Folk Ensemble. MTI says Kodály stood behind the appointment.",
      "Master of Folk Art: one obituary 1953, another page 1954. Both stand.",
      "1985: főprímás of the 100 Tagú. 1998: health. Perpetual honorary chair. Kossuth Prize, 2006.",
    ],
    sources: [
      { label: "MTI / HVG, 2014" },
      { label: "This archive — Boross family" },
      { label: "Checked: Wikipédia (hu)", href: "https://hu.wikipedia.org/wiki/Boross_Lajos_(pr%C3%ADm%C3%A1s)" },
    ],
  },
  "jaroka-sandor-sr": {
    lang: "hu",
    langLabel: "Magyar",
    original: [
      "Id. Járóka Sándor. Kisvárda, 1922. február 16. Budapest, 1984. április 11.",
      "Aranyos Rajkó, 1932. Saját együttes, 1947. Népművészet Mestere, 1955.",
      "Fortuna étterem. Amerikai turné, 1971. Detroit, 1976.",
      "A 100 Tagú 1985-ben az ő temetése után alakult. A zenekar így írja.",
    ],
    en: [
      "Sándor Járóka Sr. Kisvárda, 16 February 1922. Budapest, 11 April 1984.",
      "Aranyos Rajkó, 1932. Own band, 1947. Master of Folk Art, 1955.",
      "Fortuna restaurant. American tour, 1971. Detroit, 1976.",
      "The 100 Tagú formed in 1985 after his funeral. The orchestra writes it that way.",
    ],
    sources: [
      { label: "Magyar életrajzi lexikon" },
      { label: "100tagu.hu" },
      { label: "Checked: Wikipédia (hu) disambiguation", href: "https://hu.wikipedia.org/wiki/J%C3%A1r%C3%B3ka_S%C3%A1ndor" },
    ],
  },
  "jaroka-sandor-jr": {
    lang: "hu",
    langLabel: "Magyar",
    original: [
      "Ifj. Járóka Sándor. Budapest, 1954. szeptember 30. Halál: 2007. szeptember 18.",
      "Lovagkereszt, 2003. Fidelio.",
      "1994, Egyesült Államok: a muzsikusok ugyanazt a címet adták, mint az apának. Egy cikk szava, nem koronázás itt.",
      "Cukorbetegség. Kóma 2004. február 27-től. Rákoskeresztúr, apa mellett. A 100 Tagú játszott.",
    ],
    en: [
      "Sándor Járóka Jr. Budapest, 30 September 1954. Death: 18 September 2007.",
      "Knight’s Cross, 2003. Fidelio.",
      "1994, United States: the musicians gave him the same title as his father. A paper’s word, not a crowning here.",
      "Diabetes. Coma from 27 February 2004. Rákoskeresztúr, beside the father. The 100 Tagú played.",
    ],
    sources: [
      { label: "Fidelio" },
      { label: "This archive — Járóka family" },
    ],
  },
  "toki-horvath-gyula": {
    lang: "hu",
    langLabel: "Magyar",
    original: [
      "Toki Horváth Gyula. Kaposvár, 1920. szeptember 17. München, 1971. október 13.",
      "Ötévesen második prímás otthon. 1931: budapesti Rajkó.",
      "Saját banda, 1938. Fővárosi Népi Zenekar, 1950. Népművészet Mestere, 1954.",
      "1956-os turné. Nem jött haza.",
      "Nem Toki Balogh Ernő. Nem a Magyari család.",
    ],
    en: [
      "Gyula Toki Horváth. Kaposvár, 17 September 1920. Munich, 13 October 1971.",
      "Second primás at home from five. 1931: Budapest Rajkó.",
      "Own band, 1938. Capital Folk Orchestra, 1950. Master of Folk Art, 1954.",
      "1956 tour. He did not come home.",
      "A different musician from Ernő Toki Balogh, and from the Magyari family.",
    ],
    sources: [
      { label: "Népművészet Mesterei" },
      { label: "Magyar életrajzi lexikon" },
    ],
  },
  "santa-ferenc-jr": {
    lang: "hu",
    langLabel: "Magyar",
    original: [
      "Ifj. Sánta Ferenc. Kaposvár, 1945. március 2. Halál: 2024. október 22.",
      "Kultura.hu és Fidelio: 1945. Egy másik közlemény 1946-ot ír. Itt 1945. A 1946 Lateren van.",
      "Hét évesen hegedű. Zeneakadémia tizennyolc évesen. Diploma, 1969.",
      "Szállodák: Hilton, Átrium Hyatt. 100 Tagú alapító. 1994: Magyar Nemzeti Cigányzenekar.",
      "Liszt 2002. Kossuth 2007 és 2023.",
    ],
    en: [
      "Ferenc Sánta Jr. Kaposvár, 2 March 1945. Death: 22 October 2024.",
      "Kultura.hu and Fidelio: 1945. Another notice prints 1946. Here 1945. 1946 is listed under Later.",
      "Violin from seven. Academy from eighteen. Diploma, 1969.",
      "Hotels: Hilton, Átrium Hyatt. 100 Tagú founder. 1994: Magyar Nemzeti Cigányzenekar.",
      "Liszt 2002. Kossuth 2007 and 2023.",
    ],
    sources: [
      { label: "kultura.hu, 2025" },
      { label: "Fidelio, 2020" },
      { label: "This archive — Sánta family" },
    ],
  },
  "magyari-imre": {
    lang: "hu",
    langLabel: "Magyar",
    original: [
      "Magyari Imre. Debrecen. Lexikon és sírhely: 1894. szeptember 10. Egy magyar lap 12-ét ír. Itt a 10. A 12. Lateren van.",
      "Budapest, 1940. április 27.",
      "Az apa debreceni prímás. Kilencévesen aranyérem Pesten.",
      "1916: Pest. 1920-tól a Hungária Szálló. Rádió 1925-től.",
    ],
    en: [
      "Magyari Imre. Debrecen. Lexicon and grave: 10 September 1894. One Hungarian page prints the 12th. Here the 10th. The 12th is listed under Later.",
      "Budapest, 27 April 1940.",
      "The father was a Debrecen primás. Gold medal in Pest at nine.",
      "1916: Pest. From 1920 the Hungária Szálló. Radio from 1925.",
    ],
    sources: [
      { label: "Magyar életrajzi lexikon" },
      { label: "NORI, Fiumei út" },
    ],
  },
  "hundred-tagu": {
    lang: "hu",
    langLabel: "Magyar",
    original: [
      "100 Tagú Cigányzenekar. Budapest, 1985.",
      "Járóka Sándor temetése után. A zenekar saját története.",
      "Első koncert: Tavaszi Fesztivál, 1986.",
      "Hungarikum, 2014. március 18.",
      "Ma 138 ember. Éttermi könyv nagyteremben.",
    ],
    en: [
      "100 Member Hungarian Gypsy Orchestra. Budapest, 1985.",
      "After Sándor Járóka’s funeral. The orchestra’s own history.",
      "First concert: Spring Festival, 1986.",
      "Hungarikum, 18 March 2014.",
      "Today 138 people. The restaurant book in a concert hall.",
    ],
    sources: [
      { label: "100tagu.hu", href: "https://www.100tagu.hu/" },
      { label: "Checked: Wikipédia (hu)", href: "https://hu.wikipedia.org/wiki/100_Tag%C3%BA_Cig%C3%A1nyzenekar" },
    ],
  },
  "romica-puceanu": {
    lang: "ro",
    langLabel: "Română",
    original: [
      "Romica Puceanu. Discogs: 19 ianuarie 1927, București. Alte fișe: 1926 sau 1928. Toate stau.",
      "Moarte: 24 octombrie 1996. Accident pe drumul spre scenă. Cinci zile.",
      "Tatăl, Constantin, țambal la Hanul lui Manuc.",
      "Hanul Galben, Târgoviște, la paisprezece ani. Electrecord mai târziu.",
      "Lăutărească de mahala.",
    ],
    en: [
      "Romica Puceanu. Discogs: 19 January 1927, Bucharest. Other cards: 1926 or 1928. All stand.",
      "Death: 24 October 1996. A crash on the way to the stage. Five days.",
      "The father, Constantin, cimbalom at Hanul lui Manuc.",
      "Hanul Galben, Târgoviște, at fourteen. Electrecord later.",
      "Mahala lăutărească.",
    ],
    sources: [
      { label: "Discogs" },
      { label: "This archive — Puceanu" },
      { label: "Checked: Wikipedia (ro)", href: "https://ro.wikipedia.org/wiki/Romica_Puceanu" },
    ],
  },
  "gabi-lunca": {
    lang: "ro",
    langLabel: "Română",
    original: [
      "Gabi Luncă. Numele de casă: Elena-Gabriela. Vărbilău, 16 octombrie 1938.",
      "Digi24: 2 aprilie 2021, spital Ilfov.",
      "Tatăl Dumitru, vioară la Ploiești.",
      "Scena din 1951. Mahala. Din 1993, numai biserica penticostală. O fișă scrie 1992. Aici 1993, cu Digi24.",
    ],
    en: [
      "Gabi Luncă. Family name: Elena-Gabriela. Vărbilău, 16 October 1938.",
      "Digi24: 2 April 2021, Ilfov hospital.",
      "Father Dumitru, violin in Ploiești.",
      "The stage from 1951. Mahala. From 1993, only the Pentecostal church. One card prints 1992. Here 1993, with Digi24.",
    ],
    sources: [
      { label: "Digi24" },
      { label: "This archive — Luncă" },
      { label: "Checked: Wikipedia (ro)", href: "https://ro.wikipedia.org/wiki/Gabi_Lunc%C4%83" },
    ],
  },
  "nicolae-neacsu": {
    lang: "ro",
    langLabel: "Română",
    original: [
      "Nicolae Neacșu. Culai. Vioară. 1924–septembrie 2002.",
      "O fișă îl pune la Clejani. Alta la Isaccea. Locul nașterii rămâne pe Later.",
      "Clejani l-a auzit. Taraf de Haïdouks l-a scos din sat.",
    ],
    en: [
      "Nicolae Neacșu. Culai. Violin. 1924–September 2002.",
      "One card puts him in Clejani. Another in Isaccea. Birthplace is listed under Later.",
      "Clejani heard him. Taraf de Haïdouks took him out of the village.",
    ],
    sources: [
      { label: "This archive — Clejani. Birthplace on Later." },
      { label: "Checked: Wikipedia (ro)", href: "https://ro.wikipedia.org/wiki/Nicolae_Neac%C8%99u" },
    ],
  },
};

export function lifeOf(slug: string) {
  return LIVES[slug];
}
