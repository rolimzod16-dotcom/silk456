import type { Text } from "@/lib/locale";

/** Service sections on /services; ids match the header menu anchors. */
export const SERVICES: { id: string; title: Text; lead: Text; points: Text[] }[] = [
  {
    id: "transport",
    title: { en: "Transport and car rental", ru: "Транспорт и аренда авто" },
    lead: {
      en: "Comfortable cars, minivans and 4x4 vehicles with experienced drivers for city transfers, long-distance routes and mountain roads.",
      ru: "Комфортные автомобили, минивэны и внедорожники с опытными водителями — для трансферов, дальних переездов и горных дорог.",
    },
    points: [
      { en: "Airport and railway transfers", ru: "Трансферы из аэропортов и с вокзалов" },
      { en: "4x4 vehicles for the Pamir Highway and mountain passes", ru: "Внедорожники для Памирского тракта и перевалов" },
      { en: "Minivans and buses for groups", ru: "Минивэны и автобусы для групп" },
      { en: "Train and domestic flight tickets", ru: "Билеты на поезда и внутренние рейсы" },
    ],
  },
  {
    id: "guides",
    title: { en: "Drivers and guides", ru: "Водители и гиды" },
    lead: {
      en: "Local guides and drivers who know the history, the roads and the people — for a city day or a whole expedition.",
      ru: "Местные гиды и водители, которые знают историю, дороги и людей, — на один день в городе или на всю экспедицию.",
    },
    points: [
      { en: "English- and Russian-speaking guides", ru: "Гиды на английском и русском языках" },
      { en: "City walks and museum visits", ru: "Пешие экскурсии и музеи" },
      { en: "Mountain and trekking guides", ru: "Горные гиды и гиды для треккинга" },
      { en: "Driver-guides for small groups", ru: "Водители-гиды для небольших групп" },
    ],
  },
  {
    id: "visa",
    title: { en: "Visa support", ru: "Визовая поддержка" },
    lead: {
      en: "We check the entry rules for your passport and prepare the documents each country requires.",
      ru: "Проверим правила въезда для вашего паспорта и подготовим документы, которые требует каждая страна.",
    },
    points: [
      { en: "Up-to-date visa check for your nationality", ru: "Актуальная проверка визовых правил для вашего гражданства" },
      { en: "Letters of invitation where required", ru: "Приглашения, где они нужны" },
      { en: "Help with e-visa applications", ru: "Помощь с электронными визами" },
      { en: "Advice on multi-country routes and border crossings", ru: "Советы по маршрутам через несколько стран и погранпереходам" },
    ],
  },
  {
    id: "permits",
    title: { en: "Permits and special access", ru: "Разрешения и спецдоступ" },
    lead: {
      en: "Some of the most beautiful places need special permits. We arrange them in advance so the road stays open.",
      ru: "Для некоторых самых красивых мест нужны специальные разрешения. Оформляем их заранее, чтобы дорога была открыта.",
    },
    points: [
      { en: "GBAO permit for the Pamirs", ru: "Разрешение ГБАО на Памир" },
      { en: "Lake Sarez and protected areas", ru: "Сарезское озеро и заповедные зоны" },
      { en: "Border-zone permits", ru: "Разрешения на посещение погранзон" },
      { en: "National park entry", ru: "Входные билеты в национальные парки" },
    ],
  },
  {
    id: "stay",
    title: { en: "Accommodation and logistics", ru: "Проживание и логистика" },
    lead: {
      en: "From boutique hotels in historic centres to yurt camps and family guesthouses in the mountains — booked and confirmed for every night.",
      ru: "От бутик-отелей в исторических центрах до юрточных лагерей и семейных гостевых домов в горах — забронировано и подтверждено на каждую ночь.",
    },
    points: [
      { en: "Hotels and boutique guesthouses", ru: "Отели и бутик-гостевые дома" },
      { en: "Yurt camps and mountain homestays", ru: "Юрточные лагеря и гостевые дома в горах" },
      { en: "Meals, tickets and day-by-day logistics", ru: "Питание, билеты и логистика по дням" },
      { en: "Support while you travel", ru: "Поддержка во время поездки" },
    ],
  },
  {
    id: "tailor",
    title: { en: "Tailor-made routes", ru: "Индивидуальные маршруты" },
    lead: {
      en: "Your dates, your pace, your interests. We combine countries and experiences into one private itinerary.",
      ru: "Ваши даты, ваш темп, ваши интересы. Объединим страны и впечатления в один индивидуальный маршрут.",
    },
    points: [
      { en: "Private tours for couples, families and friends", ru: "Частные туры для пар, семей и друзей" },
      { en: "Multi-country Silk Road journeys", ru: "Путешествия по нескольким странам Шёлкового пути" },
      { en: "Photography, trekking and culture focus", ru: "Акцент на фото, треккинг или культуру" },
      { en: "A written itinerary and quote before you pay", ru: "Письменная программа и расчёт до оплаты" },
    ],
  },
];
