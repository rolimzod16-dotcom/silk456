import type { CountryId } from "@/lib/catalog";
import type { CountryDe } from "@/lib/country-content";

const visaNote = "Die Regeln ändern sich oft – wir prüfen sie mit Ihrem Angebot für Ihren Pass.";

/** German texts for the built-in destination pages; items match the English ones by position. */
export const DEFAULT_COUNTRIES_DE: Record<CountryId, CountryDe> = {
  tajikistan: {
    overview:
      "Tadschikistan ist das Bergherz Zentralasiens: Mehr als 90 % des Landes sind Gebirge, vom Fan-Gebirge bei Samarkand bis zum hohen Pamir-Plateau. Reisende kommen wegen des Pamir Highways, der türkisfarbenen Bergseen, des Wachan-Tals an der afghanischen Grenze und der Gastfreundschaft pamirischer und tadschikischer Familien.",
    facts: [
      { label: "Hauptstadt", value: "Duschanbe" },
      { label: "Währung", value: "Tadschikischer Somoni (TJS)" },
      { label: "Sprachen", value: "Tadschikisch; Russisch weit verbreitet" },
      { label: "Zeitzone", value: "UTC+5" },
    ],
    highlights: [
      { title: "Der Pamir Highway", text: "Die M41 überquert das Dach der Welt von Duschanbe nach Osch, über Pässe von mehr als 4.000 m und das mondähnliche Pamir-Plateau." },
      { title: "Wachan-Tal", text: "Ein grünes Tal am Fluss Pandsch gegenüber dem Hindukusch, mit alten Festungen, Felszeichnungen und heißen Quellen." },
      { title: "Fan-Gebirge", text: "Das am leichtesten erreichbare Hochgebirge des Landes, ein Trekkingparadies aus zackigen Gipfeln und Bergseen." },
      { title: "Sieben Seen (Haft Kul)", text: "Eine Kette türkisfarbener Seen im Sching-Tal, jeder in einem anderen Farbton, verbunden durch eine Bergstraße und Pfade." },
      { title: "Iskanderkul", text: "Ein Gletschersee auf 2.200 m, benannt nach Alexander dem Großen, mit Wasserfall und Gastfamilien in der Nähe." },
      { title: "Duschanbe", text: "Eine grüne Hauptstadt mit breiten Alleen, Teehäusern und dem Mehrgon-Basar – Ausgangspunkt der meisten Reisen." },
      { title: "Pamirische Kultur", text: "Traditionelle Pamir-Häuser mit Oberlichtdecken, Musik, Handwerk und Gastfamilien in ganz GBAO." },
      { title: "Chudschand", text: "Eine der ältesten Städte Zentralasiens, am Syrdarja im Ferganatal, mit einem lebhaften Basar." },
    ],
    bestTime: [
      { season: "Juni – September", text: "Saison für den Pamir Highway, hohe Pässe, das Wachan-Tal und Trekking im Fan-Gebirge." },
      { season: "April – Mai, Oktober", text: "Gut für Duschanbe, Chudschand und tiefere Täler; hohe Pässe können noch verschneit sein." },
      { season: "November – März", text: "Winter in den Bergen; viele Hochstraßen sind gesperrt. Städtereisen und Winterreisen auf Anfrage." },
    ],
    travelInfo: [
      { title: "Visum", text: `Die meisten Reisenden beantragen vor der Reise online ein tadschikisches E-Visum. ${visaNote}` },
      { title: "GBAO-Genehmigung", text: "Für Reisen im Pamir (GBAO) brauchen Sie zusätzlich zum Visum eine GBAO-Genehmigung; für den Sarez-See eine eigene. Wir besorgen die Genehmigungen mit Ihrer Buchung." },
      { title: "Anreise", text: "Internationale Flüge landen in Duschanbe und Chudschand. Landgrenzen führen nach Usbekistan und Kirgistan." },
      { title: "Unterwegs", text: "Bergrouten werden im Geländewagen mit erfahrenen Fahrern gefahren; Strecken dauern länger, als die Karte vermuten lässt." },
      { title: "Geld", text: "Außerhalb von Duschanbe zählt Bargeld. Bringen Sie US-Dollar oder Euro in gutem Zustand mit; in den Bergen gibt es kaum Geldautomaten." },
    ],
    faq: [
      { q: "Ist der Pamir Highway schwierig?", a: "Es ist eine lange, raue Bergstraße mit Pässen über 4.000 m. Im Geländewagen mit Fahrer ist sie für die meisten gesunden Reisenden geeignet; die Reisen steigen langsam an." },
      { q: "Wo übernachten wir im Pamir?", a: "Meist in Gastfamilien und kleinen Gästehäusern – einfach, herzlich und ein Höhepunkt der Reise." },
    ],
  },
  uzbekistan: {
    overview:
      "Usbekistan hat die berühmtesten Städte der Seidenstraße – Samarkand, Buchara und Chiwa – mit türkisfarbenen Kuppeln, Medresen und Basaren, die noch dem alten Handelsrhythmus folgen. Schnellzüge verbinden die Städte, und das Handwerk von Seide, Keramik und Stickerei lebt in Werkstätten im ganzen Land.",
    facts: [
      { label: "Hauptstadt", value: "Taschkent" },
      { label: "Währung", value: "Usbekischer Sum (UZS)" },
      { label: "Sprachen", value: "Usbekisch; Russisch weit verbreitet" },
      { label: "Zeitzone", value: "UTC+5" },
    ],
    highlights: [
      { title: "Samarkand", text: "Der Registan, die Nekropole Schah-i-Sinda und Gur-Emir – Timurs Hauptstadt und das Juwel der Seidenstraße." },
      { title: "Buchara", text: "Eine lebendige Altstadt mit Handelskuppeln, dem Kalon-Minarett, Labi-Hovuz und der Festung Ark." },
      { title: "Chiwa", text: "Itchan Kala, eine vollständig ummauerte Stadt aus Minaretten und Medresen, magisch bei Sonnenuntergang." },
      { title: "Taschkent", text: "Eine moderne Hauptstadt mit sowjetischer Architektur, prächtigen Metrostationen und dem Chorsu-Basar." },
      { title: "Handwerk im Ferganatal", text: "Seidenweberei in Margilan und Keramik in Rischtan – das Handwerksherz des Landes." },
      { title: "Schahrisabs", text: "Timurs Geburtsort mit den Ruinen des Ak-Saray-Palastes in den Hügeln südlich von Samarkand." },
      { title: "Jurtencamps in der Wüste", text: "Nächte in Jurten am Aydarkul-See und im Nuratau-Gebirge, mit Kamelritten und Sternenhimmel." },
    ],
    bestTime: [
      { season: "April – Mai", text: "Milde Tage und blühende Gärten – die beste Zeit für die Städte." },
      { season: "September – Oktober", text: "Warm, trocken und Erntezeit; ideal für Besichtigungen." },
      { season: "Juni – August", text: "Heiß, in Buchara und Chiwa oft über 40 °C; planen Sie frühe Starts." },
      { season: "November – März", text: "Kühl und ruhig, wenig Andrang – gut für kurze Städtereisen." },
    ],
    travelInfo: [
      { title: "Visum", text: `Bürger vieler Länder, auch der EU und Großbritanniens, reisen bis zu 30 Tage visumfrei ein; andere nutzen ein E-Visum. ${visaNote}` },
      { title: "Unterwegs", text: "Afrosiyob-Schnellzüge verbinden Taschkent, Samarkand und Buchara; nach Chiwa geht es per Zug oder Flug nach Urgentsch." },
      { title: "Registrierung", text: "Hotels registrieren ausländische Gäste automatisch; bewahren Sie die Belege bis zur Ausreise auf." },
      { title: "Geld", text: "In größeren Hotels und Geschäften funktionieren Karten; für Basare und kleine Cafés brauchen Sie Sum in bar." },
    ],
    faq: [
      { q: "Wie viele Tage brauche ich?", a: "Eine Woche reicht für Taschkent, Samarkand, Buchara und Chiwa in angenehmem Tempo; für das Ferganatal oder ein Jurtencamp planen Sie zusätzliche Tage." },
      { q: "Was sollte ich anziehen?", a: "Leichte, dezente Kleidung; bedecken Sie Schultern und Knie beim Besuch von Moscheen und Mausoleen." },
    ],
  },
  kyrgyzstan: {
    overview:
      "Kirgistan ist ein Land des Tian-Shan-Gebirges, der Sommerweiden und der Nomadentradition. Reisende reiten zu Bergseen, schlafen in Jurtencamps und wandern durch Täler, die sich seit Jahrhunderten kaum verändert haben.",
    facts: [
      { label: "Hauptstadt", value: "Bischkek" },
      { label: "Währung", value: "Kirgisischer Som (KGS)" },
      { label: "Sprachen", value: "Kirgisisch; Russisch weit verbreitet" },
      { label: "Zeitzone", value: "UTC+6" },
    ],
    highlights: [
      { title: "Issyk-Kul", text: "Ein riesiger Bergsee, umgeben von schneebedeckten Gipfeln, mit Stränden, Felszeichnungen und Schluchten an seinen Ufern." },
      { title: "Song-Köl", text: "Ein Weidesee auf etwa 3.000 m, an dem Hirten den Sommer in Jurten verbringen." },
      { title: "Karakol", text: "Ausgangspunkt für Trekking im Tian Shan, mit einer hölzernen Dunganen-Moschee und einer orthodoxen Kathedrale." },
      { title: "Märchenschlucht", text: "Rote Felsformationen am Südufer des Issyk-Kul, geformt von Wind und Regen." },
      { title: "Ala-Artscha", text: "Ein Nationalpark mit Gletschern und Almwiesen, weniger als eine Stunde von Bischkek entfernt." },
      { title: "Tasch Rabat", text: "Eine steinerne Karawanserei aus dem 15. Jahrhundert in einem abgelegenen Tal auf dem Weg nach China." },
    ],
    bestTime: [
      { season: "Juni – September", text: "Hauptsaison für Jurtencamps, Song-Köl, Reittouren und Höhenwege." },
      { season: "Mai, Oktober", text: "Ruhigere Nebensaison; die Bergweiden können kalt oder verschneit sein." },
      { season: "November – April", text: "Wintersport bei Karakol und Bischkek; viele Hochgebiete sind gesperrt." },
    ],
    travelInfo: [
      { title: "Visum", text: `Bürger vieler Länder, auch der EU, Großbritanniens und der USA, reisen bis zu 60 Tage visumfrei ein. ${visaNote}` },
      { title: "Anreise", text: "Flüge landen in Bischkek und Osch; Landgrenzen führen nach Kasachstan, Usbekistan und Tadschikistan." },
      { title: "Unterwegs", text: "Straßen zu Seen und Weiden sind oft unbefestigt; die schönsten Orte erreicht man im Geländewagen oder zu Pferd." },
      { title: "Geld", text: "In Jurtencamps und Dörfern braucht man Bargeld; Geldautomaten gibt es in Bischkek, Karakol und Osch." },
    ],
    faq: [
      { q: "Brauche ich Reiterfahrung?", a: "Nein. Die meisten Ritte sind im Schritt mit lokalen Guides; sagen Sie uns Ihre Erfahrung, und wir passen die Route an." },
    ],
  },
  kazakhstan: {
    overview:
      "Kasachstan ist das größte Land Zentralasiens und reicht vom Kaspischen Meer bis zum Altai. Der Südosten um Almaty bietet Canyons, Bergseen und den nördlichen Tian Shan, während Turkestan die großen Monumente der Seidenstraße bewahrt.",
    facts: [
      { label: "Hauptstadt", value: "Astana" },
      { label: "Währung", value: "Kasachischer Tenge (KZT)" },
      { label: "Sprachen", value: "Kasachisch; Russisch weit verbreitet" },
      { label: "Zeitzone", value: "UTC+5" },
    ],
    highlights: [
      { title: "Almaty", text: "Eine grüne Stadt am Fuß der Berge, mit dem Grünen Basar, Parks und sowjetischer Moderne." },
      { title: "Scharyn-Canyon", text: "Das Tal der Burgen – rote Felswände, geformt vom Fluss Scharyn." },
      { title: "Kolsai- und Kaindy-Seen", text: "Bergseen im Fichtenwald und der versunkene Wald im Kaindy-See." },
      { title: "Großer Almaty-See", text: "Ein türkisfarbener Stausee hoch über der Stadt im Transili-Alatau." },
      { title: "Turkestan", text: "Das Mausoleum von Hodscha Ahmad Yasawi, ein Meisterwerk timuridischer Architektur." },
    ],
    bestTime: [
      { season: "Mai – September", text: "Am besten für Canyons, Seen und Wanderungen rund um Almaty." },
      { season: "April, Oktober", text: "Mild und ruhig; gut für Almaty und Turkestan." },
      { season: "Dezember – März", text: "Skisaison in Schymbulak und zugefrorene Bergseen." },
    ],
    travelInfo: [
      { title: "Visum", text: `Bürger vieler Länder, auch der EU, Großbritanniens und der USA, reisen bis zu 30 Tage visumfrei ein. ${visaNote}` },
      { title: "Unterwegs", text: "Tagesausflüge ab Almaty mit dem Auto; lange Strecken zwischen den Regionen mit Zug und Inlandsflügen." },
      { title: "Geld", text: "In Städten werden Karten weithin akzeptiert; für Nationalparks und Dörfer etwas Bargeld mitnehmen." },
    ],
    faq: [
      { q: "Lässt sich Kasachstan mit Kirgistan kombinieren?", a: "Ja. Almaty liegt wenige Stunden von der kirgisischen Grenze entfernt, sodass sich Scharyn und Issyk-Kul leicht in einer Reise verbinden lassen." },
    ],
  },
  china: {
    overview:
      "Die westchinesische Region Xinjiang war das östliche Tor der Seidenstraße. Kaschgars Altstadt und Basare, die Oase Turpan und der Karakorum Highway Richtung Pamir zeigen eine Welt, in der sich chinesische und zentralasiatische Kultur begegnen.",
    facts: [
      { label: "Regionalhauptstadt", value: "Ürümqi" },
      { label: "Währung", value: "Renminbi (CNY)" },
      { label: "Sprachen", value: "Mandarin, Uigurisch" },
      { label: "Zeitzone", value: "UTC+8 (Pekinger Zeit)" },
    ],
    highlights: [
      { title: "Kaschgar", text: "Die Altstadt, die Id-Kah-Moschee und der berühmte Sonntags-Viehmarkt." },
      { title: "Karakul-See", text: "Ein Hochgebirgssee unter dem Muztagh Ata am Karakorum Highway." },
      { title: "Taschkurgan", text: "Eine Steinfestung und die tadschikischen Dörfer des chinesischen Pamir." },
      { title: "Turpan", text: "Eine Oase der Weintrauben und alten Ruinen neben den Flammenden Bergen." },
    ],
    bestTime: [
      { season: "Mai – Oktober", text: "Am besten für Kaschgar, den Karakorum Highway und die Hochgebirgsseen." },
      { season: "Juli – August", text: "Heiß in Turpan und in der Wüste; angenehm in der Höhe." },
    ],
    travelInfo: [
      { title: "Visum", text: `Viele Europäer können derzeit für einen begrenzten Aufenthalt visumfrei nach China reisen; andere brauchen vorab ein Visum. ${visaNote}` },
      { title: "Grenzgebiete", text: "Für die Straße zum Khunjerab-Pass ist eine Grenzgebietsgenehmigung nötig, die wir besorgen." },
      { title: "Unterwegs", text: "Züge und Flüge verbinden Ürümqi, Turpan und Kaschgar; den Karakorum Highway fährt man mit dem Auto." },
      { title: "Geld & Apps", text: "Mobile Bezahl-Apps werden überall genutzt; richten Sie eine vor der Reise ein und haben Sie etwas Bargeld dabei." },
    ],
    faq: [
      { q: "Kann ich von Kaschgar auf dem Landweg nach Zentralasien reisen?", a: "Ja, über den Irkeschtam- oder Torugart-Pass nach Kirgistan, abhängig von den Öffnungszeiten der Grenze und Genehmigungen." },
    ],
  },
};
