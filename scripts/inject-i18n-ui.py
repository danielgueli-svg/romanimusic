#!/usr/bin/env python3
"""Append new MsgKeys to every locale file. English is already in en.ts."""
from pathlib import Path

KEYS = {
  "nl": {
    "history.watch": "Kijken",
    "history.watchTitle": "Twee films over het Hongaarse boek",
    "history.watchBody": "The Music Historian, 2017. The Fiddle Channel, 2020. Het woord Gypsy staat in hun titels. Dit archief dient het restaurantboek in als cigányzene. De tweede film is een bron bij het hoofdstuk Hongarije.",
    "history.hungaryChapter": "Hoofdstuk Hongarije",
    "history.back": "Geschiedenis",
    "history.cultureFrom": "Uit het archief",
    "history.cultureH1": "Roma-cultuurgeschiedenis",
    "history.cultureLede": "Dit is een volk met een Indiase oorsprong, een lange weg westwaarts, en veel muzieken. Elke muziek is gemaakt in een land dat hen, op verschillende manieren, aan de rand van de kaart hield.",
    "history.cultureAlready": "De pagina’s hieronder staan al in dit archief. Elke pagina is uit bronnen geschreven.",
    "culture.d1.title": "Noordwest-India",
    "culture.d1.body": "Romani is een Indo-Arische taal. Taal- en genetisch onderzoek wijst op een oorsprong van meer dan duizend jaar geleden. Er is geen overgeleverde oorspronkelijke Romani-muziek die als fossiel kan klinken. Wat meeging was een manier van leren: op het gehoor, in de familie, vakmanschap voor een betalend publiek.",
    "culture.d2.title": "De weg westwaarts",
    "culture.d2.body": "Groepen trokken door Perzië, Armenië en de Byzantijnse wereld, en bereikten de Balkan in de late middeleeuwen. Vanaf het begin van de vijftiende eeuw verschijnen geschreven bronnen in West-Europa. Kroniekschrijvers noemden hen vaak Egyptenaren. Onder elkaar gebruikten ze later andere namen.",
    "culture.d3.title": "Zelfnamen",
    "culture.d3.body": "Roma, Sinti, Manouche, Calé, Gitano, Roman. Twee zelfnamen zijn geen twee spellingen van hetzelfde volk. Verwantschap is een familiefeit. Repertoire is werk. Gypsy is het woord van buiten. Dit archief houdt het alleen waar een stijl of een bron het nog draagt.",
    "culture.d4.title": "De Porajmos",
    "culture.d4.body": "In het Duitstalige Europa joeg de nazistaat op Sinti en Roma. In Auschwitz-Birkenau hield een familiekamp ongeveer drieëntwintigduizend mensen. Bijna niemand keerde terug. Daarom behandelden zoveel Duitse Sinti-spelers van de volgende generatie Django’s stukken als overleven, niet als nostalgie.",
    "culture.d5.title": "Op het gehoor, in de familie",
    "culture.d5.body": "Ze leren in de familie. Je kijkt tot de zaal vastzit. Sommigen zitten later op een conservatorium, ook de Liszt-academie. Beide is waar. Het grootste deel van deze muziek heeft nooit een microfoon gezien.",
    "culture.d6.title": "Bruiloften, herbergen, restaurants",
    "culture.d6.body": "De band speelt de dansen van het land en de liederen van de familie voor een betalend publiek. Daarom zijn flamenco, jazz manouche, csárdás, Balkanbrass en lăutărească verschillende tradities.",
    "home.kicker": "romanimusic.com · Nederland",
    "home.chI.title": "Oorsprong en de lange weg",
    "home.chI.body": "Een Indiase oorsprong, een weg westwaarts, en veel muzieken — elk gemaakt in een land dat hen aan de rand van de kaart hield.",
    "home.chII.title": "Roma, Sinti en Manouche",
    "home.chII.body": "Twee zelfnamen, geen twee spellingen van hetzelfde volk. Het caféboek reisde verder dan elke achternaam.",
    "home.chIII.title": "De verbinding Holland–Hongarije",
    "home.chIII.body": "In de jaren dertig namen Hongaarse Roma, Roemeense Roma en Sinti-violisten het restaurantboek mee naar Nederlandse zalen.",
    "home.chIV.title": "Hoe de muziek wordt doorgegeven",
    "home.chIV.body": "Het grootste deel van deze muziek heeft nooit een microfoon gezien. De familie is het archief. De platen zijn wat een publiek bereikte.",
    "ui.officialSite": "Officiële site",
    "ui.stylePage": "Stijlpagina",
    "events.kicker": "Kalender",
    "events.intro": "Grote festivals. Officiële websites. De maand is genoeg. Dit is geen concertagenda. Levende data van een genoemde artiest staan op die artiestpagina.",
    "events.send": "Stuur een festival met een officiële site via contact. Een pagina gaat pas online als we die onder een familie of bron hebben opgenomen.",
    "events.historyChapter": "Geschiedenishoofdstuk",
    "crumb.aria": "Kruimelpad",
    "error.title": "Er ging iets mis",
  },
}

# Other locales — filled below in the same shape as nl
from copy import deepcopy

def q(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')

# We'll load extra locale maps from the rest of this file if present.
# Minimal complete maps for remaining locales:

KEYS["de"] = {
    "history.watch": "Sehen",
    "history.watchTitle": "Zwei Filme über das ungarische Buch",
    "history.watchBody": "The Music Historian, 2017. The Fiddle Channel, 2020. Das Wort Gypsy steht in ihren Titeln. Dieses Archiv legt das Restaurantbuch als cigányzene an. Der zweite Film ist eine Quelle zum Ungarn-Kapitel.",
    "history.hungaryChapter": "Ungarn-Kapitel",
    "history.back": "Geschichte",
    "history.cultureFrom": "Aus dem Archiv",
    "history.cultureH1": "Roma-Kulturgeschichte",
    "history.cultureLede": "Ein Volk mit indischem Ursprung, einem langen Weg nach Westen und vielen Musiken. Jede Musik entstand in einem Land, das sie auf verschiedene Weise am Rand der Karte hielt.",
    "history.cultureAlready": "Die Seiten unten stehen bereits in diesem Archiv. Jede Seite ist aus Quellen geschrieben.",
    "culture.d1.title": "Nordwestindien",
    "culture.d1.body": "Romani ist eine indoarische Sprache. Sprach- und genetische Forschung weist auf einen Ursprung vor mehr als tausend Jahren. Es gibt keine überlieferte ursprüngliche Romani-Musik, die als Fossil gespielt werden kann. Was wanderte, war eine Art zu lernen: nach Gehör, in der Familie, Handwerk für ein zahlendes Publikum.",
    "culture.d2.title": "Der Weg nach Westen",
    "culture.d2.body": "Gruppen zogen durch Persien, Armenien und die byzantinische Welt und erreichten den Balkan im späten Mittelalter. Ab dem frühen 15. Jahrhundert erscheinen Schriftquellen in Westeuropa. Chronisten nannten sie oft Ägypter. Unter sich gebrauchten sie später andere Namen.",
    "culture.d3.title": "Selbstnamen",
    "culture.d3.body": "Roma, Sinti, Manouche, Calé, Gitano, Roman. Zwei Selbstnamen sind nicht zwei Schreibweisen desselben Volkes. Verwandtschaft ist eine Familientatsache. Repertoire ist Arbeit. Gypsy ist das Wort von außen. Dieses Archiv behält es nur, wo ein Stil oder eine Quelle es noch trägt.",
    "culture.d4.title": "Der Porajmos",
    "culture.d4.body": "Im deutschsprachigen Europa jagte der NS-Staat Sinti und Roma. In Auschwitz-Birkenau hielt ein Familienlager etwa dreiundzwanzigtausend Menschen. Fast niemand kehrte zurück. Deshalb behandelten so viele deutsche Sinti-Spieler der nächsten Generation Djangos Stücke als Überleben, nicht als Nostalgie.",
    "culture.d5.title": "Nach Gehör, in der Familie",
    "culture.d5.body": "Sie lernen in der Familie. Man schaut, bis der Raum sitzt. Manche sitzen später in einem Konservatorium, auch an der Liszt-Akademie. Beides ist wahr. Das meiste dieser Musik hat nie ein Mikrofon gesehen.",
    "culture.d6.title": "Hochzeiten, Wirtshäuser, Restaurants",
    "culture.d6.body": "Die Kapelle spielt die Tänze des Landes und die Lieder der Familie für ein zahlendes Publikum. Deshalb sind Flamenco, Jazz manouche, Csárdás, Balkan-Brass und Lăutărească verschiedene Traditionen.",
    "home.kicker": "romanimusic.com · Niederlande",
    "home.chI.title": "Ursprung und der lange Weg",
    "home.chI.body": "Ein indischer Ursprung, ein Weg nach Westen und viele Musiken — jede in einem Land gemacht, das sie am Rand der Karte hielt.",
    "home.chII.title": "Roma, Sinti und Manouche",
    "home.chII.body": "Zwei Selbstnamen, nicht zwei Schreibweisen desselben Volkes. Das Cafébuch reiste weiter als jeder Nachname.",
    "home.chIII.title": "Die Verbindung Niederlande–Ungarn",
    "home.chIII.body": "In den 1930ern brachten ungarische Roma, rumänische Roma und Sinti-Geiger das Restaurantbuch in niederländische Säle.",
    "home.chIV.title": "Wie die Musik weitergegeben wird",
    "home.chIV.body": "Das meiste dieser Musik hat nie ein Mikrofon gesehen. Die Familie ist das Archiv. Die Platten sind, was ein Publikum erreichte.",
    "ui.officialSite": "Offizielle Seite",
    "ui.stylePage": "Stilseite",
    "events.kicker": "Kalender",
    "events.intro": "Große Festivals. Offizielle Websites. Der Monat reicht. Das ist kein Konzerttagebuch. Lebende Daten eines genannten Künstlers stehen auf dessen Seite.",
    "events.send": "Senden Sie ein Festival mit offizieller Seite über Kontakt. Eine Seite erscheint erst, wenn wir sie aufgenommen haben.",
    "events.historyChapter": "Geschichtskapitel",
    "crumb.aria": "Brotkrumen",
    "error.title": "Etwas ist schiefgelaufen",
}

# Compact maps for remaining locales (same keys)
REST = {
"fr": {
 "history.watch":"Regarder","history.watchTitle":"Deux films sur le livre hongrois",
 "history.watchBody":"The Music Historian, 2017. The Fiddle Channel, 2020. Le mot Gypsy est dans leurs titres. Cette archive classe le livre de restaurant comme cigányzene. Le second film est une source du chapitre Hongrie.",
 "history.hungaryChapter":"Chapitre Hongrie","history.back":"Histoire","history.cultureFrom":"Depuis l’archive",
 "history.cultureH1":"Histoire culturelle roma",
 "history.cultureLede":"Un peuple d’origine indienne, une longue route vers l’ouest, et beaucoup de musiques. Chaque musique a été faite dans un pays qui a essayé, de façons différentes, de les tenir au bord de la carte.",
 "history.cultureAlready":"Les pages ci-dessous sont déjà dans cette archive. Chaque page est écrite à partir de sources.",
 "culture.d1.title":"Inde du Nord-Ouest",
 "culture.d1.body":"Le romani est une langue indo-aryenne. La recherche linguistique et génétique pointe une origine il y a plus de mille ans. Il n’existe pas de musique romani d’origine qui puisse se jouer comme un fossile. Ce qui a voyagé est une façon d’apprendre : l’oreille, la famille, le métier pour un public qui paie.",
 "culture.d2.title":"La route vers l’ouest",
 "culture.d2.body":"Des groupes ont traversé la Perse, l’Arménie et le monde byzantin, et ont atteint les Balkans à la fin du Moyen Âge. Dès le début du XVe siècle, des sources écrites apparaissent en Europe de l’Ouest. Les chroniqueurs les appelaient souvent Égyptiens. Entre eux ils ont plus tard d’autres noms.",
 "culture.d3.title":"Auto-désignations",
 "culture.d3.body":"Roma, Sinti, Manouche, Calé, Gitano, Roman. Deux auto-désignations ne sont pas deux graphies du même peuple. La parenté est un fait de famille. Le répertoire est un métier. Gypsy est le mot de l’extérieur. Cette archive le garde seulement là où un style ou une source le porte encore.",
 "culture.d4.title":"Le Porajmos",
 "culture.d4.body":"Dans l’Europe germanophone l’État nazi a chassé Sinti et Roma. À Auschwitz-Birkenau un camp familial a tenu environ vingt-trois mille personnes. Presque aucune n’est rentrée. C’est pourquoi tant de musiciens Sinti allemands de la génération suivante ont traité les airs de Django comme une survie, non une nostalgie.",
 "culture.d5.title":"À l’oreille, dans la famille",
 "culture.d5.body":"Ils apprennent dans la famille. On regarde jusqu’à ce que la salle tienne. Certains s’assoient plus tard dans un conservatoire, y compris l’Académie Liszt. Les deux sont vrais. La plus grande part de cette musique n’a jamais vu de microphone.",
 "culture.d6.title":"Mariages, tavernes, restaurants",
 "culture.d6.body":"Le groupe joue les danses du pays et les chants de la famille pour un public qui paie. C’est pourquoi le flamenco, le jazz manouche, le csárdás, le brass des Balkans et la lăutărească sont des traditions distinctes.",
 "home.kicker":"romanimusic.com · Pays-Bas",
 "home.chI.title":"Origines et la longue route",
 "home.chI.body":"Une origine indienne, une route vers l’ouest, et beaucoup de musiques — chacune faite dans un pays qui les a tenus au bord de la carte.",
 "home.chII.title":"Roma, Sinti et Manouche",
 "home.chII.body":"Deux auto-désignations, pas deux graphies du même peuple. Le livre de café a voyagé plus loin qu’aucun nom de famille.",
 "home.chIII.title":"Le lien Pays-Bas–Hongrie",
 "home.chIII.body":"Dans les années 1930, des violonistes roms hongrois, roms roumains et Sinti ont porté le livre de restaurant dans les salles néerlandaises.",
 "home.chIV.title":"Comment la musique se transmet",
 "home.chIV.body":"La plus grande part de cette musique n’a jamais vu de microphone. La famille est l’archive. Les disques sont ce qui a atteint un public.",
 "ui.officialSite":"Site officiel","ui.stylePage":"Page de style","events.kicker":"Calendrier",
 "events.intro":"Grands festivals. Sites officiels. Le mois suffit. Ce n’est pas un agenda de concerts. Les dates vivantes d’un artiste nommé restent sur sa page.",
 "events.send":"Envoyez un festival avec un site officiel via contact. Une page n’est publiée qu’après enregistrement.",
 "events.historyChapter":"Chapitre d’histoire","crumb.aria":"Fil d’Ariane","error.title":"Quelque chose a mal tourné",
},
"es": {
 "history.watch":"Ver","history.watchTitle":"Dos películas sobre el libro húngaro",
 "history.watchBody":"The Music Historian, 2017. The Fiddle Channel, 2020. La palabra Gypsy está en sus títulos. Este archivo registra el libro de restaurante como cigányzene. La segunda película es una fuente del capítulo Hungría.",
 "history.hungaryChapter":"Capítulo Hungría","history.back":"Historia","history.cultureFrom":"Del archivo",
 "history.cultureH1":"Historia cultural roma",
 "history.cultureLede":"Un pueblo de origen indio, un camino largo hacia el oeste y muchas músicas. Cada música se hizo en un país que, de distintas maneras, quiso tenerlos al borde del mapa.",
 "history.cultureAlready":"Las páginas de abajo ya están en este archivo. Cada página está escrita a partir de fuentes.",
 "culture.d1.title":"India noroccidental",
 "culture.d1.body":"El romaní es una lengua indoaria. La investigación lingüística y genética apunta a un origen de hace más de mil años. No hay una música romaní original que se pueda tocar como un fósil. Lo que viajó fue una forma de aprender: de oído, en la familia, oficio para un público que paga.",
 "culture.d2.title":"El camino hacia el oeste",
 "culture.d2.body":"Los grupos cruzaron Persia, Armenia y el mundo bizantino y llegaron a los Balcanes a finales de la Edad Media. Desde principios del siglo XV hay fuentes escritas en Europa occidental. Los cronistas los llamaban a menudo egipcios. Entre ellos usaron luego otros nombres.",
 "culture.d3.title":"Autonombres",
 "culture.d3.body":"Roma, Sinti, Manouche, Calé, Gitano, Roman. Dos autonombres no son dos grafías del mismo pueblo. El parentesco es un hecho de familia. El repertorio es un oficio. Gypsy es la palabra de fuera. Este archivo la guarda solo donde un estilo o una fuente aún la lleva.",
 "culture.d4.title":"El Porajmos",
 "culture.d4.body":"En la Europa de lengua alemana el Estado nazi persiguió a Sinti y Roma. En Auschwitz-Birkenau un campo familiar retuvo a unos veintitrés mil. Casi nadie volvió. Por eso tantos músicos Sinti alemanes de la generación siguiente trataron las piezas de Django como supervivencia, no como nostalgia.",
 "culture.d5.title":"De oído, en la familia",
 "culture.d5.body":"Aprenden en la familia. Se mira hasta que la sala encaja. Algunos se sientan luego en un conservatorio, también en la Academia Liszt. Las dos cosas son ciertas. La mayor parte de esta música nunca vio un micrófono.",
 "culture.d6.title":"Bodas, tabernas, restaurantes",
 "culture.d6.body":"La banda toca las danzas del país y las canciones de la familia para un público que paga. Por eso el flamenco, el jazz manouche, el csárdás, el brass de los Balcanes y la lăutărească son tradiciones distintas.",
 "home.kicker":"romanimusic.com · Países Bajos",
 "home.chI.title":"Orígenes y el camino largo",
 "home.chI.body":"Un origen indio, un camino hacia el oeste y muchas músicas — cada una hecha en un país que los tuvo al borde del mapa.",
 "home.chII.title":"Roma, Sinti y Manouche",
 "home.chII.body":"Dos autonombres, no dos grafías del mismo pueblo. El libro de café viajó más lejos que cualquier apellido.",
 "home.chIII.title":"El vínculo Países Bajos–Hungría",
 "home.chIII.body":"En los años treinta, violinistas romá húngaros, romá rumanos y Sinti llevaron el libro de restaurante a las salas neerlandesas.",
 "home.chIV.title":"Cómo se transmite la música",
 "home.chIV.body":"La mayor parte de esta música nunca vio un micrófono. La familia es el archivo. Los discos son lo que llegó a un público.",
 "ui.officialSite":"Sitio oficial","ui.stylePage":"Página de estilo","events.kicker":"Calendario",
 "events.intro":"Grandes festivales. Sitios oficiales. El mes basta. Esto no es una agenda de conciertos. Las fechas vivas de un artista nombrado quedan en su página.",
 "events.send":"Envíe un festival con sitio oficial por contacto. Una página se publica solo después de registrarla.",
 "events.historyChapter":"Capítulo de historia","crumb.aria":"Migas","error.title":"Algo salió mal",
},
}

KEYS.update(REST)

# Remaining locales: reuse a compact table
MORE = {
"pt": "fr", # placeholder handled below
}
# Explicit remaining
KEYS["pt"] = {
 "history.watch":"Ver","history.watchTitle":"Dois filmes sobre o livro húngaro",
 "history.watchBody":"The Music Historian, 2017. The Fiddle Channel, 2020. A palavra Gypsy está nos títulos. Este arquivo regista o livro de restaurante como cigányzene. O segundo filme é uma fonte do capítulo Hungria.",
 "history.hungaryChapter":"Capítulo Hungria","history.back":"História","history.cultureFrom":"Do arquivo",
 "history.cultureH1":"História cultural roma",
 "history.cultureLede":"Um povo de origem indiana, um caminho longo para oeste, e muitas músicas. Cada música foi feita num país que, de modos diferentes, os quis à margem do mapa.",
 "history.cultureAlready":"As páginas abaixo já estão neste arquivo. Cada página é escrita a partir de fontes.",
 "culture.d1.title":"Índia do Noroeste",
 "culture.d1.body":"O romaní é uma língua indo-ariana. A investigação linguística e genética aponta uma origem há mais de mil anos. Não há música romaní original que se possa tocar como fóssil. O que viajou foi uma forma de aprender: de ouvido, na família, ofício para um público que paga.",
 "culture.d2.title":"O caminho para oeste",
 "culture.d2.body":"Os grupos atravessaram a Pérsia, a Arménia e o mundo bizantino e chegaram aos Balcãs no fim da Idade Média. Desde o início do século XV há fontes escritas na Europa Ocidental. Os cronistas chamavam-lhes muitas vezes egípcios. Entre si usaram depois outros nomes.",
 "culture.d3.title":"Autonomeações",
 "culture.d3.body":"Roma, Sinti, Manouche, Calé, Gitano, Roman. Duas autonomeações não são duas grafias do mesmo povo. O parentesco é um facto de família. O reportório é um ofício. Gypsy é a palavra de fora. Este arquivo guarda-a só onde um estilo ou uma fonte ainda a carrega.",
 "culture.d4.title":"O Porajmos",
 "culture.d4.body":"Na Europa de língua alemã o Estado nazi perseguiu Sinti e Roma. Em Auschwitz-Birkenau um campo familiar reteve cerca de vinte e três mil. Quase ninguém voltou. Por isso tantos músicos Sinti alemães da geração seguinte trataram as peças de Django como sobrevivência, não como nostalgia.",
 "culture.d5.title":"De ouvido, na família",
 "culture.d5.body":"Aprendem na família. Olha-se até a sala fechar. Alguns sentam-se depois num conservatório, também na Academia Liszt. As duas coisas são verdade. A maior parte desta música nunca viu um microfone.",
 "culture.d6.title":"Casamentos, tabernas, restaurantes",
 "culture.d6.body":"A banda toca as danças do país e as canções da família para um público que paga. Por isso o flamenco, o jazz manouche, o csárdás, o brass dos Balcãs e a lăutărească são tradições distintas.",
 "home.kicker":"romanimusic.com · Países Baixos",
 "home.chI.title":"Origens e o caminho longo",
 "home.chI.body":"Uma origem indiana, um caminho para oeste e muitas músicas — cada uma feita num país que os teve à margem do mapa.",
 "home.chII.title":"Roma, Sinti e Manouche",
 "home.chII.body":"Duas autonomeações, não duas grafias do mesmo povo. O livro de café viajou mais longe do que qualquer apelido.",
 "home.chIII.title":"A ligação Países Baixos–Hungria",
 "home.chIII.body":"Nos anos 1930, violinistas roma húngaros, roma romenos e Sinti levaram o livro de restaurante para as salas neerlandesas.",
 "home.chIV.title":"Como a música é transmitida",
 "home.chIV.body":"A maior parte desta música nunca viu um microfone. A família é o arquivo. Os discos são o que chegou a um público.",
 "ui.officialSite":"Sítio oficial","ui.stylePage":"Página de estilo","events.kicker":"Calendário",
 "events.intro":"Grandes festivais. Sítios oficiais. O mês chega. Isto não é uma agenda de concertos. As datas vivas de um artista nomeado ficam na sua página.",
 "events.send":"Envie um festival com sítio oficial por contacto. Uma página publica-se só depois de a registarmos.",
 "events.historyChapter":"Capítulo de história","crumb.aria":"Migalhas","error.title":"Algo correu mal",
}

KEYS["it"] = {
 "history.watch":"Guarda","history.watchTitle":"Due film sul libro ungherese",
 "history.watchBody":"The Music Historian, 2017. The Fiddle Channel, 2020. La parola Gypsy è nei titoli. Questo archivio registra il libro da ristorante come cigányzene. Il secondo film è una fonte del capitolo Ungheria.",
 "history.hungaryChapter":"Capitolo Ungheria","history.back":"Storia","history.cultureFrom":"Dall’archivio",
 "history.cultureH1":"Storia culturale roma",
 "history.cultureLede":"Un popolo di origine indiana, una strada lunga verso ovest e molte musiche. Ogni musica è nata in un paese che, in modi diversi, li ha tenuti al bordo della carta.",
 "history.cultureAlready":"Le pagine sotto sono già in questo archivio. Ogni pagina è scritta a partire da fonti.",
 "culture.d1.title":"India nordoccidentale",
 "culture.d1.body":"Il romaní è una lingua indoaria. La ricerca linguistica e genetica indica un’origine di più di mille anni fa. Non esiste una musica romaní originale da suonare come un fossile. Ciò che ha viaggiato è un modo di imparare: a orecchio, in famiglia, mestiere per un pubblico che paga.",
 "culture.d2.title":"La strada verso ovest",
 "culture.d2.body":"I gruppi attraversarono Persia, Armenia e il mondo bizantino e raggiunsero i Balcani nel tardo Medioevo. Dall’inizio del XV secolo compaiono fonti scritte in Europa occidentale. I cronisti li chiamavano spesso egiziani. Tra loro usarono poi altri nomi.",
 "culture.d3.title":"Autonimi",
 "culture.d3.body":"Roma, Sinti, Manouche, Calé, Gitano, Roman. Due autonimi non sono due grafie dello stesso popolo. La parentela è un fatto di famiglia. Il repertorio è un mestiere. Gypsy è la parola di fuori. Questo archivio la tiene solo dove uno stile o una fonte la porta ancora.",
 "culture.d4.title":"Il Porajmos",
 "culture.d4.body":"Nell’Europa di lingua tedesca lo Stato nazista cacciò Sinti e Roma. Ad Auschwitz-Birkenau un campo familiare tenne circa ventitremila persone. Quasi nessuno tornò. Per questo tanti musicisti Sinti tedeschi della generazione successiva trattarono i brani di Django come sopravvivenza, non come nostalgia.",
 "culture.d5.title":"A orecchio, in famiglia",
 "culture.d5.body":"Imparano in famiglia. Si guarda finché la sala non tiene. Alcuni poi siedono in un conservatorio, anche all’Accademia Liszt. Entrambe le cose sono vere. Gran parte di questa musica non ha mai visto un microfono.",
 "culture.d6.title":"Matrimoni, osterie, ristoranti",
 "culture.d6.body":"La band suona le danze del paese e i canti della famiglia per un pubblico che paga. Per questo flamenco, jazz manouche, csárdás, brass balcanico e lăutărească sono tradizioni diverse.",
 "home.kicker":"romanimusic.com · Paesi Bassi",
 "home.chI.title":"Origini e la strada lunga",
 "home.chI.body":"Un’origine indiana, una strada verso ovest e molte musiche — ciascuna fatta in un paese che li tenne al bordo della carta.",
 "home.chII.title":"Roma, Sinti e Manouche",
 "home.chII.body":"Due autonimi, non due grafie dello stesso popolo. Il libro da caffè ha viaggiato più lontano di qualsiasi cognome.",
 "home.chIII.title":"Il legame Paesi Bassi–Ungheria",
 "home.chIII.body":"Negli anni Trenta violinisti rom ungheresi, rom rumeni e Sinti portarono il libro da ristorante nelle sale olandesi.",
 "home.chIV.title":"Come si tramanda la musica",
 "home.chIV.body":"Gran parte di questa musica non ha mai visto un microfono. La famiglia è l’archivio. I dischi sono ciò che ha raggiunto un pubblico.",
 "ui.officialSite":"Sito ufficiale","ui.stylePage":"Pagina di stile","events.kicker":"Calendario",
 "events.intro":"Grandi festival. Siti ufficiali. Il mese basta. Non è un’agenda di concerti. Le date vive di un artista nominato restano sulla sua pagina.",
 "events.send":"Inviate un festival con sito ufficiale via contatto. Una pagina si pubblica solo dopo la registrazione.",
 "events.historyChapter":"Capitolo di storia","crumb.aria":"Percorso","error.title":"Qualcosa è andato storto",
}

# Eastern locales - condensed quality
def east(watch, watchT, huCh, back, fromA, h1, lede, already, d1t,d1b,d2t,d2b,d3t,d3b,d4t,d4b,d5t,d5b,d6t,d6b, kicker, iT,iB,iiT,iiB,iiiT,iiiB,ivT,ivB, off, style, cal, intro, send, histCh, crumb, err, watchB):
    return {
      "history.watch":watch,"history.watchTitle":watchT,"history.watchBody":watchB,
      "history.hungaryChapter":huCh,"history.back":back,"history.cultureFrom":fromA,
      "history.cultureH1":h1,"history.cultureLede":lede,"history.cultureAlready":already,
      "culture.d1.title":d1t,"culture.d1.body":d1b,"culture.d2.title":d2t,"culture.d2.body":d2b,
      "culture.d3.title":d3t,"culture.d3.body":d3b,"culture.d4.title":d4t,"culture.d4.body":d4b,
      "culture.d5.title":d5t,"culture.d5.body":d5b,"culture.d6.title":d6t,"culture.d6.body":d6b,
      "home.kicker":kicker,"home.chI.title":iT,"home.chI.body":iB,"home.chII.title":iiT,"home.chII.body":iiB,
      "home.chIII.title":iiiT,"home.chIII.body":iiiB,"home.chIV.title":ivT,"home.chIV.body":ivB,
      "ui.officialSite":off,"ui.stylePage":style,"events.kicker":cal,"events.intro":intro,
      "events.send":send,"events.historyChapter":histCh,"crumb.aria":crumb,"error.title":err,
    }

KEYS["hu"] = east(
 "Nézés","Két film a magyar könyvről","Magyarország fejezet","Történelem","Az archívumból",
 "Roma kultúrtörténet","Indiai eredetű nép, hosszú út nyugat felé, sok zene. Mindegyik zene olyan országban született, amely a térkép szélén tartotta őket.",
 "Az alábbi oldalak már ebben az archívumban vannak. Minden oldal forrásból íródott.",
 "Északnyugat-India","A romani indoárja nyelv. Nyelvi és genetikai kutatás több mint ezer éves eredetre mutat. Nincs fossziliaként játszható eredeti romani zene. Ami utazott: hallás, család, mesterség fizető közönségnek.",
 "Az út nyugat felé","Csoportok Perzsián, Örményországon és a bizánci világon át a késő középkorban érték el a Balkánt. A 15. század elejétől írott források jelennek meg Nyugat-Európában. A krónikások gyakran egyiptomiaknak nevezték őket.",
 "Önnevek","Roma, Sinti, Manouche, Calé, Gitano, Roman. Két önnév nem ugyanannak a népnek két írása. A rokonság családi tény. A repertoár munka. A Gypsy külső szó.",
 "A Porajmos","A német nyelvű Európában a náci állam Sinti és Roma után vadászott. Auschwitz-Birkenauban egy családi tábor mintegy huszonháromezer embert tartott. Szinte senki nem tért haza.",
 "Hallás után, a családban","A családban tanulnak. Nézed, amíg a terem beáll. Később néhányan konzervatóriumba ülnek, a Liszt Ferenc Zeneakadémiára is. Mindkettő igaz.",
 "Esküvők, kocsmák, éttermek","A banda az ország táncait és a család dalait játssza fizető közönségnek. Ezért más a flamenco, a jazz manouche, a csárdás, a balkáni brass és a lăutărească.",
 "romanimusic.com · Hollandia",
 "Eredet és a hosszú út","Indiai eredet, út nyugat felé, sok zene — mindegyik olyan országban, amely a térkép szélén tartotta őket.",
 "Roma, Sinti és Manouche","Két önnév, nem ugyanannak a népnek két írása. A kávéházi könyv messzebb utazott bármely vezetéknévnél.",
 "A Hollandia–Magyarország kapcsolat","Az 1930-as években magyar roma, romániai roma és Sinti hegedűsök vitték az éttermi könyvet holland termekbe.",
 "Hogyan adódik tovább a zene","Ennek a zenének a java soha nem látott mikrofont. A család az archívum. A lemezek azok, amik közönséghez jutottak.",
 "Hivatalos oldal","Stílusoldal","Naptár",
 "Nagy fesztiválok. Hivatalos honlapok. A hónap elég. Ez nem koncertnapló. Egy megnevezett művész élő dátumai az ő oldalán maradnak.",
 "Fesztivált hivatalos oldallal a kapcsolaton át. Oldal csak felvétel után jelenik meg.",
 "Történeti fejezet","Morzsa","Hiba történt",
 "The Music Historian, 2017. The Fiddle Channel, 2020. A Gypsy szó a címükben van. Ez az archívum az éttermi könyvet cigányzeneként veszi fel. A második film forrás a Magyarország fejezethez.",
)

KEYS["ro"] = east(
 "Vizualizare","Două filme despre cartea maghiară","Capitolul Ungaria","Istorie","Din arhivă",
 "Istorie culturală roma","Un popor de origine indiană, un drum lung spre vest, multe muzici. Fiecare muzică s-a făcut într-o țară care i-a ținut, în feluri diferite, la marginea hărții.",
 "Paginile de mai jos sunt deja în această arhivă. Fiecare pagină e scrisă din surse.",
 "India de nord-vest","Romani e o limbă indo-ariană. Cercetarea lingvistică și genetică arată o origine de mai bine de o mie de ani. Nu există o muzică romani originală de cântat ca fosilă. Ce a călătorit e un fel de a învăța: după ureche, în familie, meserie pentru un public care plătește.",
 "Drumul spre vest","Grupurile au trecut prin Persia, Armenia și lumea bizantină și au ajuns în Balcani în evul mediu târziu. De la începutul secolului XV apar izvoare scrise în Europa de Vest.",
 "Autonume","Roma, Sinti, Manouche, Calé, Gitano, Roman. Două autonume nu sunt două grafii ale aceluiași popor. Rudenie e fapt de familie. Repertoriul e meserie. Gypsy e cuvântul din afară.",
 "Porajmos","În Europa de limbă germană statul nazist a vânat Sinti și Roma. La Auschwitz-Birkenau un lagăr de familie a ținut circa douăzeci și trei de mii. Aproape nimeni nu s-a întors.",
 "După ureche, în familie","Învață în familie. Privești până sala se așază. Unii stau mai târziu la conservator, inclusiv Academia Liszt. Amândouă sunt adevărate.",
 "Nuntă, cârciumă, restaurant","Trupa cântă dansurile țării și cântecele familiei pentru un public care plătește. De aceea flamenco, jazz manouche, csárdás, brass balcanic și lăutărească sunt tradiții diferite.",
 "romanimusic.com · Țările de Jos",
 "Origini și drumul lung","Origine indiană, drum spre vest, multe muzici — fiecare într-o țară care i-a ținut la marginea hărții.",
 "Roma, Sinti și Manouche","Două autonume, nu două grafii ale aceluiași popor. Cartea de cafenea a călătorit mai departe decât orice nume de familie.",
 "Legătura Țările de Jos–Ungaria","În anii 1930, violoniști roma maghiari, roma români și Sinti au dus cartea de restaurant în sălile olandeze.",
 "Cum se transmite muzica","Cea mai mare parte a acestei muzici n-a văzut niciodată un microfon. Familia e arhiva. Discurile sunt ce a ajuns la un public.",
 "Site oficial","Pagină de stil","Calendar",
 "Festivale mari. Site-uri oficiale. Luna e destul. Nu e un agendă de concerte. Datele vii ale unui artist numit stau pe pagina lui.",
 "Trimiteți un festival cu site oficial prin contact. O pagină apare abia după înregistrare.",
 "Capitol de istorie","Fir","Ceva n-a mers",
 "The Music Historian, 2017. The Fiddle Channel, 2020. Cuvântul Gypsy e în titluri. Arhiva clasează cartea de restaurant ca cigányzene. Al doilea film e sursă la capitolul Ungaria.",
)

KEYS["sr"] = east(
 "Gledanje","Dva filma o mađarskoj knjizi","Poglavlje Mađarska","Istorija","Iz arhiva",
 "Romska kulturna istorija","Narod indijskog porekla, dug put na zapad, mnogo muzika. Svaka muzika nastala je u zemlji koja ih je, na različite načine, držala na ivici mape.",
 "Stranice ispod već su u ovom arhivu. Svaka stranica je pisana iz izvora.",
 "Severozapadna Indija","Romani je indoarijski jezik. Jezička i genetska istraživanja ukazuju na poreklo pre više od hiljadu godina. Nema sačuvane izvorne romske muzike koja se svira kao fosil. Putovalo je učenje: po sluhu, u porodici, zanat za publiku koja plaća.",
 "Put na zapad","Grupe su šle kroz Persiju, Jermeniju i vizantijski svet i stigle na Balkan u kasnom srednjem veku. Od početka 15. veka ima pisanih izvora u Zapadnoj Evropi.",
 "Samoimena","Roma, Sinti, Manouche, Calé, Gitano, Roman. Dva samoimena nisu dva zapisa istog naroda. Srodstvo je porodična činjenica. Repertoar je posao. Gypsy je reč sa strane.",
 "Porajmos","U nemačkom govornom području nacistička država je lovila Sinte i Rome. U Auschwitz-Birkenau porodični logor je držao oko dvadeset tri hiljade. Skoro niko se nije vratio.",
 "Po sluhu, u porodici","Uče u porodici. Gledaš dok sala ne slegne. Neki kasnije sede u konzervatorijumu, i na Liszt akademiji. Oboje je tačno.",
 "Svadbe, krčme, restorani","Bend svira igre zemlje i pesme porodice za publiku koja plaća. Zato su flamenco, jazz manouche, čardaš, balkanski brass i lăutărească različite tradicije.",
 "romanimusic.com · Holandija",
 "Poreklo i dugački put","Indijsko poreklo, put na zapad, mnogo muzika — svaka u zemlji koja ih je držala na ivici mape.",
 "Roma, Sinti i Manouche","Dva samoimena, ne dva zapisa istog naroda. Kafanska knjiga putovala je dalje od bilo kog prezimena.",
 "Veza Holandija–Mađarska","Tridesetih su mađarski Romi, rumunski Romi i Sinti violinisti odneli restoransku knjigu u holandske sale.",
 "Kako se muzika predaje","Većina ove muzike nije videla mikrofon. Porodica je arhiv. Ploče su ono što je stiglo do publike.",
 "Zvanični sajt","Stranica stila","Kalendar",
 "Veliki festivali. Zvanični sajtovi. Mesec je dovoljan. Ovo nije koncertni dnevnik. Živi datumi imenovanog umetnika ostaju na njegovoj stranici.",
 "Pošaljite festival sa zvaničnim sajtom preko kontakta. Stranica izlazi tek po unosu.",
 "Istorijsko poglavlje","Putanja","Nešto nije u redu",
 "The Music Historian, 2017. The Fiddle Channel, 2020. Reč Gypsy je u naslovima. Arhiv vodi restoransku knjigu kao cigányzene. Drugi film je izvor za poglavlje Mađarska.",
)

# Copy sr -> hr/bs with small lexical tweaks
KEYS["hr"] = {**KEYS["sr"], "history.back":"Povijest","history.cultureH1":"Romska kulturna povijest","events.historyChapter":"Povijesno poglavlje","history.hungaryChapter":"Poglavlje Mađarska"}
KEYS["bs"] = {**KEYS["sr"], "history.back":"Historija","history.cultureH1":"Romska kulturna historija"}

KEYS["mk"] = east(
 "Гледање","Два филма за унгарската книга","Поглавје Унгарија","Историја","Од архивот",
 "Ромска културна историја","Народ со индиско потекло, долг пат кон запад, многу музики. Секоја музика е направена во земја што ги држела на работ на картата.",
 "Страниците подолу веќе се во овој архив. Секоја страница е пишувана од извори.",
 "Северозападна Индија","Романи е индоариски јазик. Јазичните и генетските истражувања покажуваат потекло пред повеќе од илјада години. Нема зачувана изворна ромска музика што се свири како фосил.",
 "Патот кон запад","Групите поминале низ Персија, Ерменија и византискиот свет и стигнале на Балканот во доцниот среден век.",
 "Самоимиња","Roma, Sinti, Manouche, Calé, Gitano, Roman. Две самоимиња не се два записа на истиот народ. Сродството е семеен факт. Репертоарот е работа.",
 "Порајмос","Во германското говорно подрачје нацистичката држава ги ловела Синтите и Ромите. Во Аушвиц-Биркенау семеен логор држел околу дваесет и три илјади. Речиси никој не се вратил.",
 "По слух, во семејството","Учат во семејството. Гледаш додека салата не се врзе. Некои подоцна седат во конзерваториум, и на академијата Лист.",
 "Свадби, меани, ресторани","Бендот ги свири ората на земјата и песните на семејството за публика што плаќа. Затоа фламенко, jazz manouche, чардаш, балкански брас и lăutărească се различни традиции.",
 "romanimusic.com · Холандија",
 "Потекло и долгиот пат","Индиско потекло, пат кон запад, многу музики.",
 "Roma, Sinti и Manouche","Две самоимиња, не два записа на истиот народ.",
 "Врската Холандија–Унгарија","Во 1930-тите унгарски Роми, романски Роми и Синти виолинисти ја однеле ресторанската книга во холандски сали.",
 "Како се предава музиката","Најголемиот дел од оваа музика никогаш не видел микрофон. Семејството е архивот.",
 "Официјална страница","Страница за стил","Календар",
 "Големи фестивали. Официјални сајтови. Месецот е доволен. Ова не е концертен дневник.",
 "Испратете фестивал со официјален сајт преку контакт. Страница излегува дури по запис.",
 "Историско поглавје","Патека","Нешто тргна наопаку",
 "The Music Historian, 2017. The Fiddle Channel, 2020. Зборот Gypsy е во насловите. Архивот ја води ресторанската книга како cigányzene.",
)

KEYS["bg"] = east(
 "Гледане","Два филма за унгарската книга","Глава Унгария","История","От архива",
 "Ромска културна история","Народ с индийски произход, дълъг път на запад, много музики. Всяка музика е направена в страна, която ги е държала в края на картата.",
 "Страниците по-долу вече са в този архив. Всяка страница е писана от извори.",
 "Северозападна Индия","Романи е индоарийски език. Езикови и генетични изследвания сочат произход преди повече от хиляда години. Няма запазена изходна ромска музика като вкаменелост.",
 "Пътят на запад","Групите минават през Персия, Армения и византийския свят и стигат Балканите в късното средновековие.",
 "Самоназвания","Roma, Sinti, Manouche, Calé, Gitano, Roman. Две самоназвания не са два записа на същия народ.",
 "Пораймос","В немскоезична Европа нацистката държава е преследвала синти и роми. В Аушвиц-Биркенау семеен лагер е държал около двадесет и три хиляди. Почти никой не се е върнал.",
 "По слух, в семейството","Учат в семейството. Гледаш, докато залата се стегне. Някои после седят в консерватория, и в Академия Лист.",
 "Сватби, кръчми, ресторанти","Бандата свири танците на страната и песните на семейството за платена публика. Затова фламенко, jazz manouche, чардаш, балкански брас и lăutărească са различни традиции.",
 "romanimusic.com · Нидерландия",
 "Произход и дългият път","Индийски произход, път на запад, много музики.",
 "Roma, Sinti и Manouche","Две самоназвания, не два записа на същия народ.",
 "Връзката Нидерландия–Унгария","През 30-те унгарски роми, румънски роми и синти цигулари носят ресторантската книга в нидерландски зали.",
 "Как се предава музиката","Повечето от тази музика никога не е виждала микрофон. Семейството е архивът.",
 "Официален сайт","Страница за стил","Календар",
 "Големи фестивали. Официални сайтове. Месецът стига. Това не е концертен дневник.",
 "Изпратете фестивал с официален сайт през контакт. Страница излиза чак след запис.",
 "Историческа глава","Път","Нещо се обърка",
 "The Music Historian, 2017. The Fiddle Channel, 2020. Думата Gypsy е в заглавията. Архивът води ресторантската книга като cigányzene.",
)

KEYS["cs"] = east(
 "Sledovat","Dva filmy o maďarské knize","Kapitola Maďarsko","Dějiny","Z archivu",
 "Romské kulturní dějiny","Lid indického původu, dlouhá cesta na západ, mnoho hudby. Každá hudba vznikla v zemi, která je držela na okraji mapy.",
 "Stránky níže už v tomto archivu jsou. Každá stránka je psána ze zdrojů.",
 "Severozápadní Indie","Romani je indoárjský jazyk. Jazykový a genetický výzkum ukazuje původ před více než tisíci lety. Neexistuje původní romská hudba, kterou by šlo hrát jako fosilii.",
 "Cesta na západ","Skupiny šly Persií, Arménií a byzantským světem a na Balkán dorazily v pozdním středověku.",
 "Vlastní jména","Roma, Sinti, Manouche, Calé, Gitano, Roman. Dvě vlastní jména nejsou dva zápisy téhož lidu.",
 "Porajmos","V německy mluvící Evropě honil nacistický stát Sinty a Romy. V Osvětimi-Březince držel rodinný tábor asi třiadvacet tisíc lidí. Skoro nikdo se nevrátil.",
 "Podle sluchu, v rodině","Učí se v rodině. Díváš se, dokud sál nesedne. Někteří později sedí na konzervatoři, i na Lisztově akademii.",
 "Svatby, hospody, restaurace","Kapela hraje tance země a písně rodiny pro platící publikum. Proto jsou flamenco, jazz manouche, čardáš, balkánský brass a lăutărească různé tradice.",
 "romanimusic.com · Nizozemsko",
 "Původ a dlouhá cesta","Indický původ, cesta na západ, mnoho hudby.",
 "Roma, Sinti a Manouche","Dvě vlastní jména, ne dva zápisy téhož lidu.",
 "Spojení Nizozemsko–Maďarsko","Ve třicátých letech maďarští Romové, rumunští Romové a sintští houslisté nesli restaurační knihu do nizozemských sálů.",
 "Jak se hudba předává","Většina této hudby nikdy neviděla mikrofon. Rodina je archiv.",
 "Oficiální stránka","Stránka stylu","Kalendář",
 "Velké festivaly. Oficiální weby. Měsíc stačí. Toto není koncertní deník.",
 "Pošlete festival s oficiálním webem přes kontakt. Stránka vyjde až po zápisu.",
 "Kapitola dějin","Drobečky","Něco se pokazilo",
 "The Music Historian, 2017. The Fiddle Channel, 2020. Slovo Gypsy je v názvech. Archiv eviduje restaurační knihu jako cigányzene.",
)
KEYS["sk"] = {**KEYS["cs"], "history.back":"Dejiny","history.cultureH1":"Rómske kultúrne dejiny","home.kicker":"romanimusic.com · Holandsko"}

KEYS["pl"] = east(
 "Oglądaj","Dwa filmy o węgierskiej księdze","Rozdział Węgry","Historia","Z archiwum",
 "Romska historia kultury","Lud indyjskiego pochodzenia, długa droga na zachód, wiele muzyki. Każda muzyka powstała w kraju, który trzymał ich na skraju mapy.",
 "Strony poniżej już są w tym archiwum. Każda strona jest pisana ze źródeł.",
 "Północno-zachodnie Indie","Romani to język indoaryjski. Badania językowe i genetyczne wskazują pochodzenie sprzed ponad tysiąca lat.",
 "Droga na zachód","Grupy szły przez Persję, Armenię i świat bizantyjski i dotarły na Bałkany w późnym średniowieczu.",
 "Samonazwy","Roma, Sinti, Manouche, Calé, Gitano, Roman. Dwie samonazwy to nie dwa zapisy tego samego ludu.",
 "Porajmos","W niemieckojęzycznej Europie państwo nazistowskie polowało na Sinti i Romów. W Auschwitz-Birkenau obóz rodzinny trzymał około dwudziestu trzech tysięcy. Prawie nikt nie wrócił.",
 "Ze słuchu, w rodzinie","Uczą się w rodzinie. Patrzysz, aż sala siądzie. Niektórzy później siedzą w konserwatorium, także na Akademii Liszta.",
 "Wesela, karczmy, restauracje","Zespół gra tańce kraju i pieśni rodziny dla płacącej publiczności. Dlatego flamenco, jazz manouche, czardasz, bałkański brass i lăutărească to różne tradycje.",
 "romanimusic.com · Niderlandy",
 "Pochodzenie i długa droga","Indyjskie pochodzenie, droga na zachód, wiele muzyki.",
 "Roma, Sinti i Manouche","Dwie samonazwy, nie dwa zapisy tego samego ludu.",
 "Łączność Holandia–Węgry","W latach 30. węgierscy Romowie, rumuńscy Romowie i skrzypkowie Sinti przenieśli księgę restauracyjną do holenderskich sal.",
 "Jak muzyka jest przekazywana","Większość tej muzyki nigdy nie widziała mikrofonu. Rodzina jest archiwum.",
 "Strona oficjalna","Strona stylu","Kalendarz",
 "Duże festiwale. Oficjalne strony. Miesiąc wystarczy. To nie dziennik koncertów.",
 "Wyślij festiwal z oficjalną stroną przez kontakt. Strona ukazuje się dopiero po wpisie.",
 "Rozdział historii","Ścieżka","Coś poszło nie tak",
 "The Music Historian, 2017. The Fiddle Channel, 2020. Słowo Gypsy jest w tytułach. Archiwum zapisuje księgę restauracyjną jako cigányzene.",
)

KEYS["sl"] = east(
 "Ogled","Dva filma o madžarski knjigi","Poglavje Madžarska","Zgodovina","Iz arhiva",
 "Romska kulturna zgodovina","Ljudstvo indijskega izvora, dolga pot na zahod, veliko glasb. Vsaka glasba je nastala v deželi, ki jih je držala na robu zemljevida.",
 "Strani spodaj so že v tem arhivu. Vsaka stran je pisana iz virov.",
 "Severozahodna Indija","Romani je indoarijski jezik. Jezikoslovne in genetske raziskave kažejo izvor pred več kot tisoč leti.",
 "Pot na zahod","Skupine so šle skozi Perzijo, Armenijo in bizantinski svet in v poznem srednjem veku dosegle Balkan.",
 "Samoimena","Roma, Sinti, Manouche, Calé, Gitano, Roman. Dve samoimeni nista dva zapisa istega ljudstva.",
 "Porajmos","V nemško govoreči Evropi je nacistična država lovila Sinte in Rome. V Auschwitz-Birkenau je družinski tabor držal okoli triindvajset tisoč. Skoraj nihče se ni vrnil.",
 "Po sluhu, v družini","Učijo se v družini. Gledaš, dokler dvorana ne sede. Nekateri pozneje sedijo na konservatoriju, tudi na Lisztovi akademiji.",
 "Poroke, gostilne, restavracije","Ansambel igra plese dežele in pesmi družine za plačljivo občinstvo.",
 "romanimusic.com · Nizozemska",
 "Izvor in dolga pot","Indijski izvor, pot na zahod, veliko glasb.",
 "Roma, Sinti in Manouche","Dve samoimeni, ne dva zapisa istega ljudstva.",
 "Povezava Nizozemska–Madžarska","V tridesetih so madžarski Romi, romunski Romi in sintski violinisti nesli restavracijsko knjigo v nizozemske dvorane.",
 "Kako se glasba predaja","Večina te glasbe nikoli ni videla mikrofona. Družina je arhiv.",
 "Uradna stran","Stran sloga","Koledar",
 "Veliki festivali. Uradna spletna mesta. Mesec zadošča. To ni koncertni dnevnik.",
 "Pošljite festival z uradno stranjo prek stika. Stran izide šele po vpisu.",
 "Zgodovinsko poglavje","Pot","Nekaj je šlo narobe",
 "The Music Historian, 2017. The Fiddle Channel, 2020. Beseda Gypsy je v naslovih.",
)

KEYS["sq"] = east(
 "Shiko","Dy filma mbi librin hungarez","Kreu Hungari","Histori","Nga arkivi",
 "Historia kulturore rome","Popull me origjinë indiane, rrugë e gjatë drejt perëndimit, shumë muzika. Çdo muzikë u bë në një vend që i mbajti në buzë të hartës.",
 "Faqet më poshtë janë tashmë në këtë arkiv. Çdo faqe është shkruar nga burime.",
 "India veriperëndimore","Romani është gjuhë indoariane. Kërkimi gjuhësor dhe gjenetik tregon origjinë më shumë se një mijë vjet më parë.",
 "Rruga drejt perëndimit","Grupet kaluan Persinë, Armenine dhe botën bizantine dhe arritën Ballkanin në mesjetën e vonë.",
 "Vetëmënet","Roma, Sinti, Manouche, Calé, Gitano, Roman. Dy vetëmëne nuk janë dy shkrime të të njëjtit popull.",
 "Porajmos","Në Evropën gjermanishtfolëse shteti nazist gjuajti Sinti dhe Roma. Në Auschwitz-Birkenau një kamp familjar mbajti rreth njëzet e tre mijë. Pothuajse askush nuk u kthye.",
 "Me vesh, në familje","Mësojnë në familje. Shikon derisa salla të mbërthehet. Disa më vonë ulen në konservator, edhe në Akademinë Liszt.",
 "Dasma, hane, restorante","Banda luan vallet e vendit dhe këngët e familjes për publik që paguan.",
 "romanimusic.com · Holanda",
 "Origjina dhe rruga e gjatë","Origjinë indiane, rrugë drejt perëndimit, shumë muzika.",
 "Roma, Sinti dhe Manouche","Dy vetëmëne, jo dy shkrime të të njëjtit popull.",
 "Lidhja Holandë–Hungari","Në vitet 1930 violinistë romë hungarezë, romë rumunë dhe Sinti e çuan librin e restorantit në sallat holandeze.",
 "Si jepet muzika","Pjesa më e madhe e kësaj muzike nuk ka parë kurrë mikrofon. Familja është arkivi.",
 "Faqe zyrtare","Faqe stili","Kalendar",
 "Festivale të mëdha. Faqe zyrtare. Muaji mjafton. Kjo nuk është ditar koncertesh.",
 "Dërgoni një festival me faqe zyrtare nëpërmjet kontaktit. Faqja del vetëm pas regjistrimit.",
 "Kreu i historisë","Rrugëtim","Diçka shkoi keq",
 "The Music Historian, 2017. The Fiddle Channel, 2020. Fjala Gypsy është në tituj.",
)

KEYS["ru"] = east(
 "Смотреть","Два фильма о венгерской книге","Глава Венгрия","История","Из архива",
 "Ромская культурная история","Народ индийского происхождения, долгий путь на запад, много музык. Каждая музыка сделана в стране, которая держала их на краю карты.",
 "Страницы ниже уже в этом архиве. Каждая страница написана по источникам.",
 "Северо-западная Индия","Романи — индоарийский язык. Языковые и генетические исследования указывают на происхождение более тысячи лет назад. Нет сохранившейся исходной ромской музыки, которую можно сыграть как ископаемое.",
 "Путь на запад","Группы шли через Персию, Армению и византийский мир и к позднему Средневековью достигли Балкан.",
 "Самоназвания","Roma, Sinti, Manouche, Calé, Gitano, Roman. Два самоназвания — не два написания одного народа.",
 "Пораймос","В немецкоязычной Европе нацистское государство охотилось на синти и рома. В Освенциме-Биркенау семейный лагерь держал около двадцати трёх тысяч. Почти никто не вернулся.",
 "На слух, в семье","Учатся в семье. Смотришь, пока зал не сядет. Некоторые потом сидят в консерватории, и в Академии Листа.",
 "Свадьбы, трактиры, рестораны","Оркестр играет танцы страны и песни семьи для платящей публики. Поэтому фламенко, jazz manouche, чардаш, балканский брасс и лэутэряскэ — разные традиции.",
 "romanimusic.com · Нидерланды",
 "Происхождение и долгий путь","Индийское происхождение, путь на запад, много музык.",
 "Roma, Sinti и Manouche","Два самоназвания, не два написания одного народа.",
 "Связь Нидерланды–Венгрия","В 1930-е венгерские рома, румынские рома и синти-скрипачи принесли ресторанную книгу в голландские залы.",
 "Как передаётся музыка","Большая часть этой музыки никогда не видела микрофон. Семья — архив.",
 "Официальный сайт","Страница стиля","Календарь",
 "Крупные фестивали. Официальные сайты. Месяца довольно. Это не концертный дневник.",
 "Пришлите фестиваль с официальным сайтом через контакт. Страница выходит только после записи.",
 "Глава истории","Путь","Что-то пошло не так",
 "The Music Historian, 2017. The Fiddle Channel, 2020. Слово Gypsy стоит в названиях. Архив ведёт ресторанную книгу как cigányzene.",
)

ROOT = Path("/workspace/src/i18n")
NEED = list(KEYS["nl"].keys())

for code, mapping in KEYS.items():
    path = ROOT / f"{code}.ts"
    text = path.read_text()
    missing = [k for k in NEED if f'"{k}"' not in text]
    if not missing:
        print(code, "already has keys")
        continue
    block = []
    for k in missing:
        v = mapping[k]
        block.append(f'  "{k}":\n    "{q(v)}",' if len(v) > 80 else f'  "{k}": "{q(v)}",')
    # drop trailing comma on last then insert before closing
    insert = "\n".join(block)
    if not text.rstrip().endswith("};"):
        raise SystemExit(f"unexpected end {code}")
    # before last };
    idx = text.rstrip().rfind("};")
    # previous entry should already have comma
    prefix = text[:idx].rstrip()
    if not prefix.endswith(","):
        prefix += ","
    new = prefix + "\n" + insert + "\n};\n"
    path.write_text(new)
    print(code, "added", len(missing))
