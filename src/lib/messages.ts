import { COUNTRIES, DURATIONS, SEASONS, STYLES } from "@/lib/catalog";

export type Locale = "en" | "de";

const services = {
  en: [
    { id: "transport", title: "Transport and car rental", text: "Cars, 4x4s and drivers for the whole route." },
    { id: "guides", title: "Drivers and guides", text: "Local guides who know the road and the people." },
    { id: "visa", title: "Visa support", text: "Invitations and paperwork before you travel." },
    { id: "permits", title: "Permits and special access", text: "GBAO and other permits arranged in advance." },
    { id: "stay", title: "Accommodation and logistics", text: "Hotels, yurts and family guesthouses." },
    { id: "tailor", title: "Tailor-made routes", text: "A private itinerary built around your dates." },
  ],
  de: [
    { id: "transport", title: "Transport und Mietwagen", text: "Autos, Geländewagen und Fahrer für die ganze Route." },
    { id: "guides", title: "Fahrer und Guides", text: "Lokale Guides, die Straße und Menschen kennen." },
    { id: "visa", title: "Visa-Service", text: "Einladungen und Dokumente vor der Reise." },
    { id: "permits", title: "Genehmigungen und Sonderzugang", text: "GBAO- und andere Genehmigungen im Voraus." },
    { id: "stay", title: "Unterkunft und Logistik", text: "Hotels, Jurten und Familiengästehäuser." },
    { id: "tailor", title: "Individuelle Routen", text: "Eine private Route zu Ihren Terminen." },
  ],
} as const;

export function copy(locale: Locale) {
  const de = locale === "de";
  return {
    plan: de ? "Reise planen" : "Plan my journey",
    menu: de ? "Menü" : "Menu",
    close: de ? "Schließen" : "Close",
    nav: {
      destinations: de ? "Reiseziele" : "Destinations",
      travelStyles: de ? "Reisestile" : "Travel styles",
      services: de ? "Leistungen" : "Services",
      about: de ? "Über uns" : "About",
      contact: de ? "Kontakt" : "Contact",
      viewAll: de ? "Alle ansehen" : "View all",
    },
    countries: COUNTRIES.map((item) => ({ id: item.id, label: de ? item.de : item.en })),
    styles: STYLES.map((item) => ({ id: item.id, label: de ? item.de : item.en })),
    services: services[locale],
    finder: {
      season: de ? "Saison" : "Season",
      howLong: de ? "Wie lange" : "How long",
      where: de ? "Wohin" : "Where",
      explore: de ? "Routen ansehen" : "Show routes",
      clear: de ? "Zurücksetzen" : "Clear",
      empty: de ? "Keine Routen für diese Filter." : "No routes match these filters.",
      showing: de ? "Angezeigte Routen" : "Routes shown",
      showN: (n: number) => (de ? `${n} ${n === 1 ? "Route" : "Routen"} anzeigen` : `Show ${n} ${n === 1 ? "route" : "routes"}`),
      request: de ? "Eigene Route anfragen" : "Request a custom route",
      seasons: SEASONS.map((item) => ({ id: item.id, label: de ? item.de : item.en })),
      durations: DURATIONS.map((item) => ({ id: item.id, label: de ? item.de : item.en })),
    },
    servicesHeading: de ? "Leistungen" : "Services",
    servicesText: de
      ? "Was die Seidenstraße neben der Route braucht: Transport, Guides, Visa und Unterkunft."
      : "What the road needs besides the route itself: transport, guides, visas and a place to stay.",
  };
}
