import { COUNTRIES, DURATIONS, SEASONS, STYLES } from "@/lib/catalog";

export type Locale = "en" | "ru";

const services = {
  en: [
    { id: "transport", title: "Transport and car rental", text: "Cars, 4x4s and drivers for the whole route." },
    { id: "guides", title: "Drivers and guides", text: "Local guides who know the road and the people." },
    { id: "visa", title: "Visa support", text: "Invitations and paperwork before you travel." },
    { id: "permits", title: "Permits and special access", text: "GBAO and other permits arranged in advance." },
    { id: "stay", title: "Accommodation and logistics", text: "Hotels, yurts and family guesthouses." },
    { id: "tailor", title: "Tailor-made routes", text: "A private itinerary built around your dates." },
  ],
  ru: [
    { id: "transport", title: "Транспорт и аренда авто", text: "Машины, 4x4 и водители на весь маршрут." },
    { id: "guides", title: "Водители и гиды", text: "Местные гиды, которые знают дорогу и людей." },
    { id: "visa", title: "Визовая поддержка", text: "Приглашения и документы до поездки." },
    { id: "permits", title: "Разрешения и спецдоступ", text: "ГБАО и другие разрешения заранее." },
    { id: "stay", title: "Проживание и логистика", text: "Отели, юрты и семейные гостевые дома." },
    { id: "tailor", title: "Индивидуальные маршруты", text: "Частный маршрут под ваши даты." },
  ],
} as const;

export function copy(locale: Locale) {
  const ru = locale === "ru";
  return {
    plan: ru ? "Спланировать поездку" : "Plan my journey",
    menu: ru ? "Меню" : "Menu",
    close: ru ? "Закрыть" : "Close",
    nav: {
      destinations: ru ? "Направления" : "Destinations",
      travelStyles: ru ? "Стили путешествий" : "Travel styles",
      services: ru ? "Услуги" : "Services",
      about: ru ? "О нас" : "About",
      contact: ru ? "Контакты" : "Contact",
      viewAll: ru ? "Смотреть все" : "View all",
    },
    countries: COUNTRIES.map((item) => ({ id: item.id, label: ru ? item.ru : item.en })),
    styles: STYLES.map((item) => ({ id: item.id, label: ru ? item.ru : item.en })),
    services: services[locale],
    finder: {
      season: ru ? "Сезон" : "Season",
      howLong: ru ? "Сколько дней" : "How long",
      where: ru ? "Куда" : "Where",
      explore: ru ? "Смотреть маршруты" : "Show routes",
      clear: ru ? "Сбросить" : "Clear",
      empty: ru ? "Под эти фильтры маршрутов нет." : "No routes match these filters.",
      showing: ru ? "Показано маршрутов" : "Routes shown",
      showN: (n: number) => (ru ? `Показать маршруты: ${n}` : `Show ${n} ${n === 1 ? "route" : "routes"}`),
      request: ru ? "Заказать свой маршрут" : "Request a custom route",
      seasons: SEASONS.map((item) => ({ id: item.id, label: ru ? item.ru : item.en })),
      durations: DURATIONS.map((item) => ({ id: item.id, label: ru ? item.ru : item.en })),
    },
    servicesHeading: ru ? "Услуги" : "Services",
    servicesText: ru
      ? "То, что нужно на Шёлковом пути кроме самого маршрута: транспорт, гиды, визы и жильё."
      : "What the road needs besides the route itself: transport, guides, visas and a place to stay.",
  };
}
