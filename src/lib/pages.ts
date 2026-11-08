import { COUNTRIES, STYLES, tourMeta, type CountryId, type StyleId } from "@/lib/catalog";
import type { Text } from "@/lib/locale";
import type { Tour } from "@/lib/tours";

export const SITE_URL = "https://www.greatsilktrails.com";

export type Intro = { tagline: Text; text: Text };

const COUNTRY_INTRO: Record<CountryId, Intro> = {
  uzbekistan: {
    tagline: { en: "Blue domes and caravan cities", de: "Blaue Kuppeln und Karawanenstädte" },
    text: {
      en: "Samarkand, Bukhara and Khiva — the heart of the Silk Road, where madrasahs, bazaars and workshops still live by the old trade rhythm.",
      de: "Samarkand, Buchara und Chiwa – das Herz der Seidenstraße, wo Medresen, Basare und Werkstätten noch im Rhythmus des alten Handels leben.",
    },
  },
  tajikistan: {
    tagline: { en: "The Pamir Highway and mountain valleys", de: "Pamir Highway und Bergtäler" },
    text: {
      en: "High passes, the Wakhan corridor and Pamiri villages on one of the most spectacular roads in Asia.",
      de: "Hohe Pässe, der Wachan-Korridor und Pamir-Dörfer an einer der spektakulärsten Straßen Asiens.",
    },
  },
  kyrgyzstan: {
    tagline: { en: "Tien Shan, yurts and alpine lakes", de: "Tian Shan, Jurten und Bergseen" },
    text: {
      en: "Nomad camps, horse treks and nights by Song-Kul — a country of open pastures and big mountains.",
      de: "Nomadencamps, Reittouren und Nächte am Song-Köl – ein Land weiter Weiden und großer Berge.",
    },
  },
  kazakhstan: {
    tagline: { en: "Steppe, canyons and the Heavenly Mountains", de: "Steppe, Canyons und die Himmelsberge" },
    text: {
      en: "Charyn canyon, the northern Tien Shan and the endless steppe of the old caravan routes.",
      de: "Der Scharyn-Canyon, der nördliche Tian Shan und die endlose Steppe der alten Karawanenwege.",
    },
  },
  china: {
    tagline: { en: "Kashgar and the eastern gates", de: "Kaschgar und die östlichen Tore" },
    text: {
      en: "Xinjiang's oases, the Kashgar bazaar and the road to the Pamir and Karakul Lake.",
      de: "Die Oasen Xinjiangs, der Basar von Kaschgar und die Straße zum Pamir und zum Karakul-See.",
    },
  },
};

export const STYLE_INTRO: Record<StyleId, Intro> = {
  "overland-4x4": {
    tagline: { en: "Long roads, high passes", de: "Lange Straßen, hohe Pässe" },
    text: {
      en: "Multi-country routes by 4x4 with experienced drivers — the classic way to cross the Silk Road.",
      de: "Routen durch mehrere Länder im Geländewagen mit erfahrenen Fahrern – der klassische Weg über die Seidenstraße.",
    },
  },
  trekking: {
    tagline: { en: "On foot through the mountains", de: "Zu Fuß durch die Berge" },
    text: {
      en: "Trails in the Tien Shan and Pamir with guides, pack support and nights in yurts or tents.",
      de: "Pfade im Tian Shan und Pamir mit Guides, Gepäcktransport und Nächten in Jurten oder Zelten.",
    },
  },
  motorcycle: {
    tagline: { en: "The Pamir Highway on two wheels", de: "Der Pamir Highway auf zwei Rädern" },
    text: {
      en: "Guided motorcycle routes with bike rental, backup vehicle and mechanic support.",
      de: "Geführte Motorradrouten mit Mietmotorrad, Begleitfahrzeug und Mechaniker.",
    },
  },
  "culture-cities": {
    tagline: { en: "Madrasahs, bazaars and workshops", de: "Medresen, Basare und Werkstätten" },
    text: {
      en: "The great cities of the Silk Road with historians and art experts as your guides.",
      de: "Die großen Städte der Seidenstraße mit Historikern und Kunstexperten als Guides.",
    },
  },
  "horse-riding": {
    tagline: { en: "In the saddle with nomads", de: "Im Sattel mit Nomaden" },
    text: {
      en: "Horse treks between summer pastures, lakes and herder camps.",
      de: "Ritte zwischen Sommerweiden, Seen und Hirtenlagern.",
    },
  },
  photography: {
    tagline: { en: "Light, faces and landscapes", de: "Licht, Gesichter und Landschaften" },
    text: {
      en: "Routes timed for the best light, with time to stop and shoot.",
      de: "Routen für das beste Licht, mit Zeit zum Anhalten und Fotografieren.",
    },
  },
};

export type Collection = {
  kind: "destinations" | "travel-styles";
  id: string;
  label: Text;
  tagline: Text;
  text: Text;
  image: string;
  tours: Tour[];
};

export function countryCollection(id: string, tours: Tour[]): Collection | undefined {
  const country = COUNTRIES.find((item) => item.id === id);
  if (!country) return undefined;
  const list = tours.filter((tour) => tourMeta(tour).countries.includes(country.id));
  return {
    kind: "destinations",
    id: country.id,
    label: { en: country.en, de: country.de },
    ...COUNTRY_INTRO[country.id],
    image: list[0]?.image ?? "/images/hero-silkroad.png",
    tours: list,
  };
}

export function styleCollection(
  id: string,
  tours: Tour[],
  intros: Record<StyleId, Intro> = STYLE_INTRO,
): Collection | undefined {
  const style = STYLES.find((item) => item.id === id);
  if (!style) return undefined;
  const list = tours.filter((tour) => tourMeta(tour).styles.includes(style.id));
  return {
    kind: "travel-styles",
    id: style.id,
    label: { en: style.en, de: style.de },
    ...(intros[style.id] ?? STYLE_INTRO[style.id]),
    image: list[0]?.image ?? "/images/hero-silkroad.png",
    tours: list,
  };
}

export const countryCollections = (tours: Tour[]) =>
  COUNTRIES.map((item) => countryCollection(item.id, tours)!);

export const styleCollections = (tours: Tour[], intros: Record<StyleId, Intro> = STYLE_INTRO) =>
  STYLES.map((item) => styleCollection(item.id, tours, intros)!);

/** Shared hero / heading copy for the inner pages. */
export const PAGE_COPY = {
  tours: {
    eyebrow: { en: "Caravan routes", de: "Karawanenrouten" },
    title: { en: "Silk Road Tour Packages", de: "Seidenstraßen-Reisen" },
    text: {
      en: "Ready-made routes with accommodation, guides and all transfers. Filter by season, length or country.",
      de: "Fertige Routen mit Unterkunft, Guides und allen Transfers. Filtern Sie nach Saison, Dauer oder Land.",
    },
  },
  destinations: {
    eyebrow: { en: "Where we travel", de: "Wohin wir reisen" },
    title: { en: "Destinations", de: "Reiseziele" },
    text: {
      en: "Five countries along the Great Silk Road — pick one to see its routes.",
      de: "Fünf Länder an der Großen Seidenstraße – wählen Sie ein Land, um seine Routen zu sehen.",
    },
  },
  "travel-styles": {
    eyebrow: { en: "How we travel", de: "Wie wir reisen" },
    title: { en: "Travel styles", de: "Reisestile" },
    text: {
      en: "By 4x4, on foot, on horseback or through the old cities — choose the pace that suits you.",
      de: "Im Geländewagen, zu Fuß, zu Pferd oder durch die alten Städte – wählen Sie Ihr Tempo.",
    },
  },
  services: {
    eyebrow: { en: "Beyond the route", de: "Mehr als die Route" },
    title: { en: "Services", de: "Leistungen" },
    text: {
      en: "Transport, guides, visas, permits and accommodation — everything the road needs.",
      de: "Transport, Guides, Visa, Genehmigungen und Unterkunft – alles, was die Reise braucht.",
    },
  },
  about: {
    eyebrow: { en: "About us", de: "Über uns" },
    title: { en: "Great Silk Trails", de: "Great Silk Trails" },
    text: {
      en: "Boutique tours along the Silk Road with local guides and small groups.",
      de: "Besondere Reisen auf der Seidenstraße mit lokalen Guides und in kleinen Gruppen.",
    },
  },
  contact: {
    eyebrow: { en: "Contact", de: "Kontakt" },
    title: { en: "Get in touch", de: "Kontakt aufnehmen" },
    text: {
      en: "Tell us your dates and wishes — we reply within one business day.",
      de: "Nennen Sie uns Termine und Wünsche – wir antworten innerhalb eines Werktags.",
    },
  },
  faq: {
    eyebrow: { en: "Before you go", de: "Vor der Reise" },
    title: { en: "Questions & answers", de: "Fragen & Antworten" },
    text: {
      en: "Visas, seasons, booking, altitude and safety — what travelers ask us most.",
      de: "Visa, Reisezeiten, Buchung, Höhe und Sicherheit – was Reisende uns am häufigsten fragen.",
    },
  },
  privacy: {
    eyebrow: { en: "Legal", de: "Rechtliches" },
    title: { en: "Privacy Policy", de: "Datenschutzerklärung" },
    text: { en: "How we handle the details you send us.", de: "Wie wir mit Ihren Daten umgehen." },
  },
  terms: {
    eyebrow: { en: "Legal", de: "Rechtliches" },
    title: { en: "Terms of Service", de: "Nutzungsbedingungen" },
    text: { en: "How booking requests work.", de: "Wie Buchungsanfragen funktionieren." },
  },
} satisfies Record<string, { eyebrow: Text; title: Text; text: Text }>;

export const COMMON = {
  home: { en: "Home", de: "Startseite" },
  tours: { en: "Tours", de: "Reisen" },
  routes: { en: "Routes", de: "Routen" },
  seeRoutes: { en: "See routes", de: "Routen ansehen" },
  allTours: { en: "All tours", de: "Alle Reisen" },
  noRoutesTitle: { en: "No ready-made routes yet", de: "Noch keine fertigen Routen" },
  noRoutesText: {
    en: "We build these trips to order. Tell us your dates and we'll design a private route.",
    de: "Solche Reisen stellen wir auf Anfrage zusammen. Nennen Sie uns Ihre Termine – wir planen eine private Route.",
  },
  requestRoute: { en: "Request a custom route", de: "Route anfragen" },
  related: { en: "You may also like", de: "Das könnte Ihnen auch gefallen" },
  perPerson: { en: "per person", de: "pro Person" },
  bookThis: { en: "Book This Tour", de: "Reise buchen" },
  askQuestion: { en: "Ask a question", de: "Frage stellen" },
  noPrepay: {
    en: "No prepayment — pay after a manager confirms the details.",
    de: "Ohne Anzahlung – Zahlung erst, nachdem ein Manager die Details bestätigt hat.",
  },
} satisfies Record<string, Text>;
