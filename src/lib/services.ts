import type { Text } from "@/lib/locale";

/** Service sections on /services; ids match the header menu anchors. */
export const SERVICES: { id: string; title: Text; lead: Text; points: Text[] }[] = [
  {
    id: "transport",
    title: { en: "Transport and car rental", de: "Transport und Mietwagen" },
    lead: {
      en: "Comfortable cars, minivans and 4x4 vehicles with experienced drivers for city transfers, long-distance routes and mountain roads.",
      de: "Komfortable Autos, Minivans und Geländewagen mit erfahrenen Fahrern – für Transfers, lange Strecken und Bergstraßen.",
    },
    points: [
      { en: "Airport and railway transfers", de: "Transfers von Flughäfen und Bahnhöfen" },
      { en: "4x4 vehicles for the Pamir Highway and mountain passes", de: "Geländewagen für den Pamir Highway und Bergpässe" },
      { en: "Minivans and buses for groups", de: "Minivans und Busse für Gruppen" },
      { en: "Train and domestic flight tickets", de: "Zug- und Inlandsflugtickets" },
    ],
  },
  {
    id: "guides",
    title: { en: "Drivers and guides", de: "Fahrer und Guides" },
    lead: {
      en: "Local guides and drivers who know the history, the roads and the people — for a city day or a whole expedition.",
      de: "Lokale Guides und Fahrer, die Geschichte, Straßen und Menschen kennen – für einen Stadttag oder eine ganze Expedition.",
    },
    points: [
      { en: "English- and Russian-speaking guides", de: "Englisch- und russischsprachige Guides" },
      { en: "City walks and museum visits", de: "Stadtrundgänge und Museumsbesuche" },
      { en: "Mountain and trekking guides", de: "Berg- und Trekkingguides" },
      { en: "Driver-guides for small groups", de: "Fahrer-Guides für kleine Gruppen" },
    ],
  },
  {
    id: "visa",
    title: { en: "Visa support", de: "Visa-Service" },
    lead: {
      en: "We check the entry rules for your passport and prepare the documents each country requires.",
      de: "Wir prüfen die Einreiseregeln für Ihren Pass und bereiten die Dokumente vor, die jedes Land verlangt.",
    },
    points: [
      { en: "Up-to-date visa check for your nationality", de: "Aktuelle Visumprüfung für Ihre Staatsangehörigkeit" },
      { en: "Letters of invitation where required", de: "Einladungsschreiben, wo nötig" },
      { en: "Help with e-visa applications", de: "Hilfe bei E-Visa-Anträgen" },
      { en: "Advice on multi-country routes and border crossings", de: "Beratung zu Routen durch mehrere Länder und Grenzübergänge" },
    ],
  },
  {
    id: "permits",
    title: { en: "Permits and special access", de: "Genehmigungen und Sonderzugang" },
    lead: {
      en: "Some of the most beautiful places need special permits. We arrange them in advance so the road stays open.",
      de: "Manche der schönsten Orte brauchen Sondergenehmigungen. Wir besorgen sie im Voraus, damit der Weg offen bleibt.",
    },
    points: [
      { en: "GBAO permit for the Pamirs", de: "GBAO-Genehmigung für den Pamir" },
      { en: "Lake Sarez and protected areas", de: "Sarez-See und Schutzgebiete" },
      { en: "Border-zone permits", de: "Genehmigungen für Grenzzonen" },
      { en: "National park entry", de: "Eintritt in Nationalparks" },
    ],
  },
  {
    id: "stay",
    title: { en: "Accommodation and logistics", de: "Unterkunft und Logistik" },
    lead: {
      en: "From boutique hotels in historic centres to yurt camps and family guesthouses in the mountains — booked and confirmed for every night.",
      de: "Von Boutique-Hotels in historischen Zentren bis zu Jurtencamps und Familiengästehäusern in den Bergen – für jede Nacht gebucht und bestätigt.",
    },
    points: [
      { en: "Hotels and boutique guesthouses", de: "Hotels und Boutique-Gästehäuser" },
      { en: "Yurt camps and mountain homestays", de: "Jurtencamps und Gastfamilien in den Bergen" },
      { en: "Meals, tickets and day-by-day logistics", de: "Verpflegung, Tickets und Logistik für jeden Tag" },
      { en: "Support while you travel", de: "Betreuung während der Reise" },
    ],
  },
  {
    id: "tailor",
    title: { en: "Tailor-made routes", de: "Individuelle Routen" },
    lead: {
      en: "Your dates, your pace, your interests. We combine countries and experiences into one private itinerary.",
      de: "Ihre Termine, Ihr Tempo, Ihre Interessen. Wir verbinden Länder und Erlebnisse zu einer privaten Reise.",
    },
    points: [
      { en: "Private tours for couples, families and friends", de: "Private Reisen für Paare, Familien und Freunde" },
      { en: "Multi-country Silk Road journeys", de: "Seidenstraßen-Reisen durch mehrere Länder" },
      { en: "Photography, trekking and culture focus", de: "Schwerpunkt Fotografie, Trekking oder Kultur" },
      { en: "A written itinerary and quote before you pay", de: "Schriftlicher Reiseplan und Angebot vor der Zahlung" },
    ],
  },
];
