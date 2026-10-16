import { COUNTRIES, STYLES, tourMeta, type CountryId, type StyleId } from "@/lib/catalog";
import type { Text } from "@/lib/locale";
import type { Tour } from "@/lib/tours";

export const SITE_URL = "https://www.greatsilktrails.com";

type Intro = { tagline: Text; text: Text };

const COUNTRY_INTRO: Record<CountryId, Intro> = {
  uzbekistan: {
    tagline: { en: "Blue domes and caravan cities", ru: "Голубые купола и караванные города" },
    text: {
      en: "Samarkand, Bukhara and Khiva — the heart of the Silk Road, where madrasahs, bazaars and workshops still live by the old trade rhythm.",
      ru: "Самарканд, Бухара и Хива — сердце Шёлкового пути, где медресе, базары и мастерские до сих пор живут в ритме старой торговли.",
    },
  },
  tajikistan: {
    tagline: { en: "The Pamir Highway and mountain valleys", ru: "Памирский тракт и горные долины" },
    text: {
      en: "High passes, the Wakhan corridor and Pamiri villages on one of the most spectacular roads in Asia.",
      ru: "Высокие перевалы, Ваханский коридор и памирские кишлаки на одной из самых красивых дорог Азии.",
    },
  },
  kyrgyzstan: {
    tagline: { en: "Tien Shan, yurts and alpine lakes", ru: "Тянь-Шань, юрты и горные озёра" },
    text: {
      en: "Nomad camps, horse treks and nights by Song-Kul — a country of open pastures and big mountains.",
      ru: "Кочевые стоянки, конные маршруты и ночи у Сон-Куля — страна открытых пастбищ и больших гор.",
    },
  },
  kazakhstan: {
    tagline: { en: "Steppe, canyons and the Heavenly Mountains", ru: "Степь, каньоны и Небесные горы" },
    text: {
      en: "Charyn canyon, the northern Tien Shan and the endless steppe of the old caravan routes.",
      ru: "Чарынский каньон, северный Тянь-Шань и бескрайняя степь старых караванных путей.",
    },
  },
  china: {
    tagline: { en: "Kashgar and the eastern gates", ru: "Кашгар и восточные ворота" },
    text: {
      en: "Xinjiang's oases, the Kashgar bazaar and the road to the Pamir and Karakul Lake.",
      ru: "Оазисы Синьцзяна, кашгарский базар и дорога к Памиру и озеру Каракуль.",
    },
  },
  iran: {
    tagline: { en: "Persian gardens and pink mosques", ru: "Персидские сады и розовые мечети" },
    text: {
      en: "Isfahan, Shiraz and Yazd — tilework, caravanserais and the poetry of ancient Persia.",
      ru: "Исфахан, Шираз и Йезд — изразцы, караван-сараи и поэзия древней Персии.",
    },
  },
  turkmenistan: {
    tagline: { en: "Ancient Merv and desert fire", ru: "Древний Мерв и огонь пустыни" },
    text: {
      en: "Merv, Kunya-Urgench and the Karakum desert on the western stretch of the route.",
      ru: "Мерв, Куня-Ургенч и пустыня Каракум на западном участке пути.",
    },
  },
  mongolia: {
    tagline: { en: "Nomad steppe on horseback", ru: "Кочевая степь верхом" },
    text: {
      en: "Gers, eagle hunters and days in the saddle across the open steppe.",
      ru: "Юрты, беркутчи и дни в седле по открытой степи.",
    },
  },
};

const STYLE_INTRO: Record<StyleId, Intro> = {
  "overland-4x4": {
    tagline: { en: "Long roads, high passes", ru: "Длинные дороги, высокие перевалы" },
    text: {
      en: "Multi-country routes by 4x4 with experienced drivers — the classic way to cross the Silk Road.",
      ru: "Маршруты через несколько стран на 4x4 с опытными водителями — классический способ пройти Шёлковый путь.",
    },
  },
  trekking: {
    tagline: { en: "On foot through the mountains", ru: "Пешком через горы" },
    text: {
      en: "Trails in the Tien Shan and Pamir with guides, pack support and nights in yurts or tents.",
      ru: "Тропы Тянь-Шаня и Памира с гидами, поддержкой и ночёвками в юртах или палатках.",
    },
  },
  motorcycle: {
    tagline: { en: "The Pamir Highway on two wheels", ru: "Памирский тракт на двух колёсах" },
    text: {
      en: "Guided motorcycle routes with bike rental, backup vehicle and mechanic support.",
      ru: "Мото-маршруты с гидом, арендой мотоцикла, машиной сопровождения и механиком.",
    },
  },
  "culture-cities": {
    tagline: { en: "Madrasahs, bazaars and workshops", ru: "Медресе, базары и мастерские" },
    text: {
      en: "The great cities of the Silk Road with historians and art experts as your guides.",
      ru: "Великие города Шёлкового пути с историками и искусствоведами в роли гидов.",
    },
  },
  "horse-riding": {
    tagline: { en: "In the saddle with nomads", ru: "В седле с кочевниками" },
    text: {
      en: "Horse treks between summer pastures, lakes and herder camps.",
      ru: "Конные переходы между летними пастбищами, озёрами и стоянками пастухов.",
    },
  },
  photography: {
    tagline: { en: "Light, faces and landscapes", ru: "Свет, лица и пейзажи" },
    text: {
      en: "Routes timed for the best light, with time to stop and shoot.",
      ru: "Маршруты под лучший свет, со временем, чтобы остановиться и снять.",
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
    label: { en: country.en, ru: country.ru },
    ...COUNTRY_INTRO[country.id],
    image: list[0]?.image ?? "/images/hero-silkroad.png",
    tours: list,
  };
}

export function styleCollection(id: string, tours: Tour[]): Collection | undefined {
  const style = STYLES.find((item) => item.id === id);
  if (!style) return undefined;
  const list = tours.filter((tour) => tourMeta(tour).styles.includes(style.id));
  return {
    kind: "travel-styles",
    id: style.id,
    label: { en: style.en, ru: style.ru },
    ...STYLE_INTRO[style.id],
    image: list[0]?.image ?? "/images/hero-silkroad.png",
    tours: list,
  };
}

export const countryCollections = (tours: Tour[]) =>
  COUNTRIES.map((item) => countryCollection(item.id, tours)!);

export const styleCollections = (tours: Tour[]) =>
  STYLES.map((item) => styleCollection(item.id, tours)!);

/** Shared hero / heading copy for the inner pages. */
export const PAGE_COPY = {
  tours: {
    eyebrow: { en: "Caravan routes", ru: "Караванные маршруты" },
    title: { en: "Silk Road Tour Packages", ru: "Туры по Шёлковому пути" },
    text: {
      en: "Ready-made routes with accommodation, guides and all transfers. Filter by season, length or country.",
      ru: "Готовые маршруты с проживанием, гидами и всеми трансферами. Фильтруйте по сезону, длительности или стране.",
    },
  },
  destinations: {
    eyebrow: { en: "Where we travel", ru: "Куда мы ездим" },
    title: { en: "Destinations", ru: "Направления" },
    text: {
      en: "Eight countries along the Great Silk Road — pick one to see its routes.",
      ru: "Восемь стран на Великом Шёлковом пути — выберите страну, чтобы увидеть маршруты.",
    },
  },
  "travel-styles": {
    eyebrow: { en: "How we travel", ru: "Как мы путешествуем" },
    title: { en: "Travel styles", ru: "Стили путешествий" },
    text: {
      en: "By 4x4, on foot, on horseback or through the old cities — choose the pace that suits you.",
      ru: "На 4x4, пешком, верхом или по старым городам — выберите свой темп.",
    },
  },
  services: {
    eyebrow: { en: "Beyond the route", ru: "Кроме маршрута" },
    title: { en: "Services", ru: "Услуги" },
    text: {
      en: "Transport, guides, visas, permits and accommodation — everything the road needs.",
      ru: "Транспорт, гиды, визы, разрешения и проживание — всё, что нужно в дороге.",
    },
  },
  about: {
    eyebrow: { en: "About us", ru: "О нас" },
    title: { en: "Great Silk Trails", ru: "Great Silk Trails" },
    text: {
      en: "Boutique tours along the Silk Road with local guides and small groups.",
      ru: "Авторские туры по Шёлковому пути с местными гидами и в небольших группах.",
    },
  },
  contact: {
    eyebrow: { en: "Contact", ru: "Контакты" },
    title: { en: "Get in touch", ru: "Связаться с нами" },
    text: {
      en: "Tell us your dates and wishes — we reply within one business day.",
      ru: "Расскажите о датах и пожеланиях — ответим в течение рабочего дня.",
    },
  },
  faq: {
    eyebrow: { en: "Before you go", ru: "Перед поездкой" },
    title: { en: "Questions & answers", ru: "Вопросы и ответы" },
    text: {
      en: "Visas, seasons, booking, altitude and safety — what travelers ask us most.",
      ru: "Визы, сезоны, бронирование, высота и безопасность — о чём нас спрашивают чаще всего.",
    },
  },
  privacy: {
    eyebrow: { en: "Legal", ru: "Документы" },
    title: { en: "Privacy Policy", ru: "Политика конфиденциальности" },
    text: { en: "How we handle the details you send us.", ru: "Как мы обращаемся с вашими данными." },
  },
  terms: {
    eyebrow: { en: "Legal", ru: "Документы" },
    title: { en: "Terms of Service", ru: "Условия использования" },
    text: { en: "How booking requests work.", ru: "Как работают заявки на бронирование." },
  },
} satisfies Record<string, { eyebrow: Text; title: Text; text: Text }>;

export const COMMON = {
  home: { en: "Home", ru: "Главная" },
  tours: { en: "Tours", ru: "Туры" },
  routes: { en: "Routes", ru: "Маршрутов" },
  seeRoutes: { en: "See routes", ru: "Смотреть маршруты" },
  allTours: { en: "All tours", ru: "Все туры" },
  noRoutesTitle: { en: "No ready-made routes yet", ru: "Готовых маршрутов пока нет" },
  noRoutesText: {
    en: "We build these trips to order. Tell us your dates and we'll design a private route.",
    ru: "Такие поездки мы собираем под заказ. Напишите даты — составим индивидуальный маршрут.",
  },
  requestRoute: { en: "Request a custom route", ru: "Заказать маршрут" },
  related: { en: "You may also like", ru: "Вам может понравиться" },
  perPerson: { en: "per person", ru: "за человека" },
  bookThis: { en: "Book This Tour", ru: "Забронировать тур" },
  askQuestion: { en: "Ask a question", ru: "Задать вопрос" },
  noPrepay: {
    en: "No prepayment — pay after a manager confirms the details.",
    ru: "Без предоплаты — оплата после подтверждения деталей менеджером.",
  },
} satisfies Record<string, Text>;
