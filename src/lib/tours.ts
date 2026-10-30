import type { CountryId, SeasonId, StyleId } from "@/lib/catalog"

export type Tour = {
  slug: string
  title: string
  subtitle: string
  country: string
  region: string
  duration: string
  days: number
  price: number
  oldPrice?: number
  image: string
  rating: number
  reviews: number
  groupSize: string
  difficulty: string
  season: string
  highlights: string[]
  itinerary: TourDay[]
  included: string[]
  excluded: string[]
  description: string
  featured?: boolean
  countries?: CountryId[]
  seasons?: SeasonId[]
  styles?: StyleId[]
  /** Extra photos for the gallery section. */
  gallery?: string[]
  /** Fixed departures; empty means dates on request. */
  departures?: Departure[]
  /** Minimum guests for a guaranteed departure, shown above the dates. */
  guaranteedFrom?: number
  faq?: { q: string; a: string }[]
  /** Drafts are visible only in the admin. */
  published?: boolean
  /** Shown in the featured block on the home page (in admin order). */
  showOnHome?: boolean
  /** Route map: an uploaded scheme and/or a Google Maps embed link. */
  mapImage?: string
  mapEmbed?: string
  /** Optional overrides for search results; generated when empty. */
  seoTitle?: string
  seoDescription?: string
  /** Previous page addresses; they redirect to the current one. */
  aliases?: string[]
}

export type TourDay = {
  day: number
  title: string
  description: string
  overnight?: string
  image?: string
}

export type DepartureStatus = "guaranteed" | "open" | "closed"

export type Departure = {
  start: string
  end?: string
  price?: number
  status: DepartureStatus
  /** Places still free; 0 closes the departure. */
  spotsLeft?: number
  /** Guests still needed before the departure is guaranteed. */
  toGuarantee?: number
  note?: string
}

export const tours: Tour[] = [
  {
    slug: "samarkand-gold",
    title: "Samarkand Gold",
    subtitle: "Jewels of the Great Silk Road in Uzbekistan",
    country: "Uzbekistan",
    region: "Central Asia",
    duration: "7 days / 6 nights",
    days: 7,
    price: 1290,
    image: "/images/tours/samarkand.png",
    rating: 0,
    reviews: 0,
    groupSize: "up to 12 guests",
    difficulty: "Easy",
    season: "April — October",
    highlights: [
      "Registan Square with its three madrasahs",
      "Gur-e-Amir Mausoleum and the Timurids",
      "Bibi-Khanym Mosque and Siab Bazaar",
      "The museum-city of Bukhara",
      "Night-lit minarets of Khiva",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Tashkent", description: "Airport transfer, welcome dinner with national cuisine, route briefing." },
      { day: 2, title: "Tashkent — Samarkand", description: "Morning Afrosiyob high-speed train. Guided tour of Registan and the madrasahs." },
      { day: 3, title: "Samarkand — Bukhara", description: "Gur-e-Amir Mausoleum, Shah-i-Zinda. Sunset drive to Bukhara." },
      { day: 4, title: "Ancient Bukhara", description: "Kalan Minaret, Lyab-i Hauz, trading domes and the Ark Fortress. Afternoon visit to the potters of Gijduvan." },
      { day: 5, title: "Bukhara — Khiva", description: "Train across the Kyzylkum desert to Khiva, evening walk in Itchan Kala." },
      { day: 6, title: "Khiva", description: "Itchan Kala, the Kalta Minor Minaret, woodcarving and suzani embroidery workshops." },
      { day: 7, title: "Departure", description: "Free morning, transfer to Urgench airport." },
    ],
    included: [
      "4★ hotels in the historic centers",
      "All transfers in air-conditioned vehicles",
      "Afrosiyob high-speed train",
      "Licensed English-speaking guide",
      "Entrance tickets to all sites",
      "Breakfasts and 4 dinners with national cuisine",
    ],
    excluded: [
      "International flights",
      "Visa (if required)",
      "Personal expenses and gratuities",
      "Travel insurance",
    ],
    description:
      "A journey through three great cities of the Silk Road — Samarkand, Bukhara and Khiva. Walk the same streets as the silk and spice caravans of a thousand years ago, see turquoise domes and hear the legends of the Timurids.",
  },
  {
    slug: "kashgar-caravan",
    title: "Kashgar Caravan",
    subtitle: "Xinjiang and the ancient gates of China",
    country: "China",
    region: "East Asia",
    duration: "10 days / 9 nights",
    days: 10,
    price: 2190,
    image: "/images/tours/kashgar.png",
    rating: 0,
    reviews: 0,
    groupSize: "up to 10 guests",
    difficulty: "Moderate",
    season: "May — September",
    highlights: [
      "The Grand Bazaar of Kashgar — largest in Central Asia",
      "Ancient city of Turpan and the Flaming Mountains",
      "Grand Bazaar and the Apak Khoja Mausoleum",
      "Karakul Lake at the foot of Kongur Tagh",
      "Uyghur cuisine and a lagman noodle masterclass",
    ],
    itinerary: [
      { day: 1, title: "Urumqi", description: "Arrival, Xinjiang Museum, welcome dinner." },
      { day: 2, title: "Turpan", description: "High-speed train, ancient city of Jiaohe and the Flaming Mountains." },
      { day: 3, title: "Turpan — Kashgar", description: "Emin Minaret, overnight train to Kashgar." },
      { day: 4, title: "Old Kashgar", description: "Labyrinth of streets, Apak Khoja Mausoleum, the Grand Bazaar." },
      { day: 5, title: "Karakul Lake", description: "Drive to the high-altitude lake at 3,600 m, Kyrgyz yurts." },
      { day: 6, title: "Tashkurgan", description: "Stone fortress, Tajik villages and views of the Chinese Pamir." },
      { day: 7, title: "Workshops", description: "Uyghur cooking, carpets, handmade paper." },
      { day: 8, title: "Hotan", description: "Silk weaving and jade workshops." },
      { day: 9, title: "Hotan — Urumqi", description: "Flight back to Urumqi, farewell dinner." },
      { day: 10, title: "Departure", description: "Transfer to the airport." },
    ],
    included: [
      "4★ hotels and traditional guesthouses",
      "Internal trains and transfers",
      "All guided excursions",
      "Entrance tickets",
      "Breakfasts and 5 dinners",
    ],
    excluded: [
      "International flights",
      "Chinese visa",
      "Personal expenses",
      "Travel insurance",
    ],
    description:
      "A route along the eastern arm of the Silk Road — from Turpan to Kashgar. See where China met Central Asia for millennia, taste Uyghur cuisine and climb up to the high-altitude Karakul Lake.",
  },
  {
    slug: "tianshan-nomads",
    title: "Tien Shan & the Heavenly Lakes",
    subtitle: "Kyrgyzstan: canyons, lakes and nomads",
    country: "Kyrgyzstan",
    region: "Central Asia",
    duration: "8 days / 7 nights",
    days: 8,
    price: 1490,
    image: "/images/tours/kyrgyzstan.png",
    rating: 0,
    reviews: 0,
    groupSize: "up to 12 guests",
    difficulty: "Moderate",
    season: "June — September",
    highlights: [
      "Issyk-Kul — the second-largest alpine lake on Earth",
      "Konorchek red canyons and the Fairy Tale (Skazka) canyon",
      "Son-Kul — a high-altitude pasture at 3,016 m",
      "Overnight in a real nomad yurt",
      "Horseback riding and traditional games",
    ],
    itinerary: [
      { day: 1, title: "Bishkek", description: "Arrival, city tour, Osh Bazaar." },
      { day: 2, title: "Burana & Konorchek", description: "Burana Tower, hike in the red Konorchek canyons, drive to Issyk-Kul." },
      { day: 3, title: "Issyk-Kul", description: "Cholpon-Ata petroglyphs, evening by the lake." },
      { day: 4, title: "Karakol", description: "Dungan mosque, Orthodox church, dinner with a local family." },
      { day: 5, title: "Fairy Tale Canyon", description: "The Skazka rock formations on the south shore, sunset by the lake." },
      { day: 6, title: "Son-Kul", description: "Climb to the 3,016 m pasture, overnight in a yurt camp." },
      { day: 7, title: "Nomad life", description: "Horseback ride, felt-making in Kochkor, drive to Bishkek." },
      { day: 8, title: "Departure", description: "Transfer to Manas airport." },
    ],
    included: [
      "Hotels and yurt camps",
      "4WD with driver",
      "Half-board meals",
      "Guide and horseback rides",
      "All permits and entrance tickets",
    ],
    excluded: [
      "International flights",
      "Personal gear rental",
      "Personal expenses",
      "Travel insurance",
    ],
    description:
      "Deep immersion into the world of Kyrgyz nomads amid the Tien Shan Heavenly Mountains. Sleep in a yurt at 3,000 meters, walk ancient caravan trails and see canyons that look like Mars.",
  },
  {
    slug: "steppe-nomads",
    title: "Steppe Nomads",
    subtitle: "Kyrgyzstan: life in a yurt",
    country: "Kyrgyzstan",
    region: "Central Asia",
    duration: "6 days / 5 nights",
    days: 6,
    price: 990,
    image: "/images/tours/steppe.png",
    rating: 0,
    reviews: 0,
    groupSize: "up to 14 guests",
    difficulty: "Easy",
    season: "June — September",
    highlights: [
      "Overnight in a real nomad yurt",
      "Horseback riding and an eagle-hunting show",
      "National dishes: beshbarmak and kuurdak",
      "Star-filled sky with zero light pollution",
      "Meetings with nomad families",
    ],
    itinerary: [
      { day: 1, title: "Bishkek", description: "Arrival, Osh Bazaar." },
      { day: 2, title: "Issyk-Kul", description: "Drive to the lake, petroglyphs." },
      { day: 3, title: "Yurt camp", description: "Nomad life, horseback ride." },
      { day: 4, title: "Eagle show", description: "Salbuurun — hunters with golden eagles." },
      { day: 5, title: "Traditional games", description: "Kok-boru and folk music." },
      { day: 6, title: "Departure", description: "Return to Bishkek." },
    ],
    included: [
      "Hotel and yurt accommodation",
      "Transfers and horseback rides",
      "Half board",
      "Guide and all activities",
    ],
    excluded: [
      "International flights",
      "Personal expenses",
      "Travel insurance",
    ],
    description:
      "A short but packed immersion into the world of nomads. The perfect first tour for those who want to feel the rhythm of steppe life without straying far from civilization.",
  },
  {
    slug: "pamir-highway",
    title: "The Pamir Highway",
    subtitle: "Overland across the Roof of the World",
    country: "Tajikistan",
    region: "Central Asia",
    duration: "12 days / 11 nights",
    days: 12,
    price: 2390,
    image: "/images/tours/kyrgyzstan.png",
    rating: 0,
    reviews: 0,
    groupSize: "up to 8 guests",
    difficulty: "Moderate",
    season: "June — September",
    highlights: [
      "The M41 Pamir Highway from Dushanbe to Osh",
      "The Wakhan Corridor with views of the Hindu Kush",
      "Yamchun Fortress and the Bibi Fatima hot springs",
      "Karakul Lake at 3,900 m",
      "Homestays with Pamiri families",
    ],
    itinerary: [
      { day: 1, title: "Dushanbe", description: "Arrival, city tour, Hissar Fortress and briefing on the route." },
      { day: 2, title: "Dushanbe — Kalaikhum", description: "Drive along the Panj river with Afghanistan on the opposite bank." },
      { day: 3, title: "Kalaikhum — Khorog", description: "Pamiri villages and the botanical garden of Khorog." },
      { day: 4, title: "Khorog — Ishkashim", description: "Into the Wakhan valley, Sunday market and Kaakha fortress." },
      { day: 5, title: "Wakhan Valley", description: "Yamchun Fortress, Bibi Fatima springs and petroglyphs." },
      { day: 6, title: "Langar", description: "Hike to petroglyphs above the village, views of the Hindu Kush." },
      { day: 7, title: "Langar — Bulunkul", description: "Khargush pass and the high plateau lakes." },
      { day: 8, title: "Bulunkul — Murghab", description: "Yashilkul lake, Kyrgyz yurts and the Pamir plateau." },
      { day: 9, title: "Murghab — Karakul", description: "Ak-Baital pass at 4,655 m, the highest point of the highway." },
      { day: 10, title: "Karakul — Sary-Tash", description: "Kyzylart pass into Kyrgyzstan, views of Lenin Peak." },
      { day: 11, title: "Sary-Tash — Osh", description: "Descent through the Alay valley, Osh bazaar and Sulaiman-Too." },
      { day: 12, title: "Departure", description: "Transfer to Osh airport." },
    ],
    included: [
      "4x4 vehicles with experienced drivers",
      "English-speaking guide",
      "Hotels and family homestays",
      "GBAO permit",
      "All meals outside Dushanbe and Osh",
    ],
    excluded: ["International flights", "Tajik e-visa", "Travel insurance", "Personal expenses"],
    description:
      "One of the great road journeys of the world: twelve days along the Panj river, through the Wakhan corridor and across the high Pamir plateau to Kyrgyzstan, with nights in Pamiri homestays.",
    countries: ["tajikistan", "kyrgyzstan"],
    seasons: ["summer", "autumn"],
    styles: ["overland-4x4", "photography"],
  },
  {
    slug: "fann-mountains-trek",
    title: "Fann Mountains Trek",
    subtitle: "Turquoise lakes of the Seven Lakes and Iskanderkul",
    country: "Tajikistan",
    region: "Central Asia",
    duration: "7 days / 6 nights",
    days: 7,
    price: 990,
    image: "/images/tours/kyrgyzstan.png",
    rating: 0,
    reviews: 0,
    groupSize: "up to 10 guests",
    difficulty: "Moderate",
    season: "June — September",
    highlights: [
      "The Seven Lakes of the Shing valley",
      "Iskanderkul lake and its waterfall",
      "Alaudin lakes and the Chimtarga massif",
      "Nights in tents and village guesthouses",
    ],
    itinerary: [
      { day: 1, title: "Dushanbe", description: "Arrival and gear check." },
      { day: 2, title: "Dushanbe — Iskanderkul", description: "Anzob pass, Iskanderkul lake and the Fann waterfall." },
      { day: 3, title: "Seven Lakes", description: "Drive to Shing and hike past the first lakes." },
      { day: 4, title: "Marguzor — Hazorchashma", description: "Trek to the highest of the seven lakes." },
      { day: 5, title: "Alaudin lakes", description: "Transfer and trek to the Alaudin lakes camp." },
      { day: 6, title: "Mutnye lakes", description: "Day hike under Chimtarga, return to camp." },
      { day: 7, title: "Return to Dushanbe", description: "Descent, drive back and farewell dinner." },
    ],
    included: ["Mountain guide", "Tents and camping equipment", "All meals on the trek", "Transfers from Dushanbe"],
    excluded: ["International flights", "Sleeping bag", "Travel insurance"],
    description:
      "A week of trekking in the Fann Mountains, the most accessible high mountains of Tajikistan, with turquoise lakes every day and nights in camp and village guesthouses.",
    countries: ["tajikistan"],
    seasons: ["summer", "autumn"],
    styles: ["trekking", "photography"],
  },
  {
    slug: "pamir-moto",
    title: "Pamir Highway by Motorcycle",
    subtitle: "The M41 on two wheels with a backup vehicle",
    country: "Tajikistan",
    region: "Central Asia",
    duration: "14 days / 13 nights",
    days: 14,
    price: 3490,
    image: "/images/tours/steppe.png",
    rating: 0,
    reviews: 0,
    groupSize: "up to 8 riders",
    difficulty: "Challenging",
    season: "June — September",
    highlights: [
      "Ride the full Pamir Highway from Dushanbe to Osh",
      "Wakhan Corridor gravel roads",
      "Ak-Baital pass at 4,655 m",
      "Backup 4x4 with mechanic and spare parts",
    ],
    itinerary: [
      { day: 1, title: "Dushanbe", description: "Arrival, bike handover and test ride." },
      { day: 2, title: "Dushanbe — Kalaikhum", description: "First riding day along the Panj river." },
      { day: 3, title: "Kalaikhum — Khorog", description: "Gravel and asphalt along the Afghan border." },
      { day: 4, title: "Rest day in Khorog", description: "Bike service and time in town." },
      { day: 5, title: "Khorog — Ishkashim", description: "Into the Wakhan valley." },
      { day: 6, title: "Ishkashim — Langar", description: "Gravel road with Hindu Kush views." },
      { day: 7, title: "Langar — Bulunkul", description: "Khargush pass, one of the hardest sections." },
      { day: 8, title: "Bulunkul — Murghab", description: "High plateau riding." },
      { day: 9, title: "Rest day in Murghab", description: "Service and acclimatisation." },
      { day: 10, title: "Murghab — Karakul", description: "Ak-Baital pass." },
      { day: 11, title: "Karakul — Sary-Tash", description: "Kyzylart pass into Kyrgyzstan." },
      { day: 12, title: "Sary-Tash — Osh", description: "Alay valley descent." },
      { day: 13, title: "Osh", description: "Bike handover, bazaar and Sulaiman-Too." },
      { day: 14, title: "Departure", description: "Transfer to Osh airport." },
    ],
    included: ["Motorcycle rental", "Riding guide", "Backup 4x4 with mechanic", "Fuel", "Hotels and homestays", "GBAO permit"],
    excluded: ["International flights", "Riding gear", "Motorcycle insurance excess", "Travel insurance"],
    description:
      "The Pamir Highway the way riders dream of it: fourteen days on a motorcycle from Dushanbe to Osh, with a riding guide, a backup vehicle and a mechanic behind you.",
    countries: ["tajikistan", "kyrgyzstan"],
    seasons: ["summer"],
    styles: ["motorcycle", "overland-4x4"],
  },
  {
    slug: "silk-road-moto",
    title: "Silk Road Moto",
    subtitle: "Uzbekistan's caravan cities to the Tien Shan",
    country: "Uzbekistan",
    region: "Central Asia",
    duration: "10 days / 9 nights",
    days: 10,
    price: 2690,
    image: "/images/tours/khiva.png",
    rating: 0,
    reviews: 0,
    groupSize: "up to 8 riders",
    difficulty: "Moderate",
    season: "May — October",
    highlights: [
      "Ride between Khiva, Bukhara and Samarkand",
      "The Kyzylkum desert road",
      "Fergana valley and the Kyrgyz border",
      "Song-Kul lake on two wheels",
    ],
    itinerary: [
      { day: 1, title: "Khiva", description: "Arrival, bike handover and Itchan Kala at sunset." },
      { day: 2, title: "Khiva — Bukhara", description: "Long desert stage through the Kyzylkum." },
      { day: 3, title: "Bukhara", description: "Rest day in the old city." },
      { day: 4, title: "Bukhara — Samarkand", description: "Riding via Gijduvan ceramics workshops." },
      { day: 5, title: "Samarkand", description: "Registan and Shah-i-Zinda." },
      { day: 6, title: "Samarkand — Tashkent", description: "Highway stage to the capital." },
      { day: 7, title: "Tashkent — Fergana", description: "Kamchik pass into the Fergana valley." },
      { day: 8, title: "Fergana — Osh", description: "Border crossing into Kyrgyzstan." },
      { day: 9, title: "Osh — Kazarman", description: "Mountain gravel roads." },
      { day: 10, title: "Departure", description: "Bike handover and transfer." },
    ],
    included: ["Motorcycle rental", "Riding guide", "Backup vehicle", "Fuel", "Hotels"],
    excluded: ["International flights", "Riding gear", "Travel insurance"],
    description:
      "A riding tour that links the great caravan cities of Uzbekistan with the mountains of Kyrgyzstan, with a backup vehicle all the way.",
    countries: ["uzbekistan", "kyrgyzstan"],
    seasons: ["spring", "summer", "autumn"],
    styles: ["motorcycle"],
  },
  {
    slug: "winter-samarkand",
    title: "Winter Samarkand & Bukhara",
    subtitle: "Quiet madrasahs and warm teahouses",
    country: "Uzbekistan",
    region: "Central Asia",
    duration: "5 days / 4 nights",
    days: 5,
    price: 690,
    image: "/images/tours/samarkand.png",
    rating: 0,
    reviews: 0,
    groupSize: "up to 12 guests",
    difficulty: "Easy",
    season: "November — March",
    highlights: [
      "Registan without the summer crowds",
      "Plov masterclass in a family home",
      "Bukhara's trading domes and hammam",
      "Afrosiyob high-speed train",
    ],
    itinerary: [
      { day: 1, title: "Tashkent", description: "Arrival, Chorsu bazaar and the metro." },
      { day: 2, title: "Tashkent — Samarkand", description: "Afrosiyob train, Registan and Gur-e-Amir." },
      { day: 3, title: "Samarkand", description: "Shah-i-Zinda, paper workshop and plov masterclass." },
      { day: 4, title: "Samarkand — Bukhara", description: "Train to Bukhara, old town and hammam." },
      { day: 5, title: "Departure", description: "Morning walk and transfer." },
    ],
    included: ["Boutique hotels", "Afrosiyob trains", "Guide", "Breakfasts and one cooking class"],
    excluded: ["International flights", "Lunches and dinners", "Travel insurance"],
    description:
      "Uzbekistan's great cities in the low season: crisp mornings, empty courtyards and long evenings in teahouses. A short break that works from November to March.",
    countries: ["uzbekistan"],
    seasons: ["winter", "spring", "autumn"],
    styles: ["culture-cities"],
  },
  {
    slug: "almaty-charyn",
    title: "Almaty & Charyn Canyon",
    subtitle: "Mountains, canyons and the Kolsai lakes",
    country: "Kazakhstan",
    region: "Central Asia",
    duration: "5 days / 4 nights",
    days: 5,
    price: 790,
    image: "/images/tours/kyrgyzstan.png",
    rating: 0,
    reviews: 0,
    groupSize: "up to 12 guests",
    difficulty: "Easy",
    season: "April — October",
    highlights: [
      "Charyn canyon and the Valley of Castles",
      "Kolsai and Kaindy lakes",
      "Medeu and Shymbulak above Almaty",
      "Green Bazaar and Soviet modernism",
    ],
    itinerary: [
      { day: 1, title: "Almaty", description: "Arrival, Panfilov Park and the Green Bazaar." },
      { day: 2, title: "Charyn canyon", description: "Hike through the Valley of Castles." },
      { day: 3, title: "Kolsai and Kaindy", description: "Lakes and the sunken forest of Kaindy." },
      { day: 4, title: "Shymbulak", description: "Cable car into the Zailiysky Alatau." },
      { day: 5, title: "Departure", description: "Transfer to the airport." },
    ],
    included: ["Hotel and guesthouse", "4x4 transfers", "Guide", "Park fees"],
    excluded: ["International flights", "Meals in Almaty", "Travel insurance"],
    description:
      "A short, active introduction to Kazakhstan: the canyons and mountain lakes east of Almaty, with easy hikes every day.",
    countries: ["kazakhstan"],
    seasons: ["spring", "summer", "autumn"],
    styles: ["trekking", "photography"],
  },
  {
    slug: "almaty-winter",
    title: "Almaty Winter Escape",
    subtitle: "Skiing, hot springs and frozen lakes",
    country: "Kazakhstan",
    region: "Central Asia",
    duration: "5 days / 4 nights",
    days: 5,
    price: 840,
    image: "/images/hero-silkroad.png",
    rating: 0,
    reviews: 0,
    groupSize: "up to 10 guests",
    difficulty: "Easy",
    season: "December — March",
    highlights: [
      "Ski day at Shymbulak",
      "Frozen Big Almaty lake",
      "Chundzha hot springs",
      "Kazakh winter cuisine",
    ],
    itinerary: [
      { day: 1, title: "Almaty", description: "Arrival and city walk." },
      { day: 2, title: "Shymbulak", description: "Ski or snowshoe day in the mountains." },
      { day: 3, title: "Big Almaty lake", description: "Frozen lake and the observatory road." },
      { day: 4, title: "Chundzha", description: "Hot springs on the way to Charyn canyon in snow." },
      { day: 5, title: "Departure", description: "Transfer to the airport." },
    ],
    included: ["Hotel", "Transfers", "Guide", "Hot spring entry"],
    excluded: ["International flights", "Ski pass and rental", "Travel insurance"],
    description: "Kazakhstan's mountains in winter: a ski day, frozen lakes and hot springs, all within reach of Almaty.",
    countries: ["kazakhstan"],
    seasons: ["winter"],
    styles: ["culture-cities", "photography"],
  },
  {
    slug: "karakoram-highway",
    title: "Kashgar & the Karakoram Highway",
    subtitle: "From the Kashgar bazaar to Tashkurgan",
    country: "China",
    region: "East Asia",
    duration: "8 days / 7 nights",
    days: 8,
    price: 1890,
    image: "/images/tours/kashgar.png",
    rating: 0,
    reviews: 0,
    groupSize: "up to 10 guests",
    difficulty: "Moderate",
    season: "May — October",
    highlights: [
      "The Sunday livestock market in Kashgar",
      "Karakul lake under Muztagh Ata",
      "Stone city of Tashkurgan",
      "Tajik villages of the Chinese Pamir",
    ],
    itinerary: [
      { day: 1, title: "Kashgar", description: "Arrival and the old town." },
      { day: 2, title: "Kashgar", description: "Sunday market and Id Kah Mosque." },
      { day: 3, title: "Kashgar — Karakul", description: "Karakoram Highway to the lake." },
      { day: 4, title: "Karakul", description: "Walks around the lake under Muztagh Ata." },
      { day: 5, title: "Tashkurgan", description: "Stone city and Tajik villages." },
      { day: 6, title: "Khunjerab area", description: "Day trip toward the Pakistan border." },
      { day: 7, title: "Return to Kashgar", description: "Drive back and farewell dinner." },
      { day: 8, title: "Departure", description: "Transfer to Kashgar airport." },
    ],
    included: ["Hotels and yurt stay", "4x4 transfers", "Guide", "Border area permits"],
    excluded: ["International flights", "Chinese visa", "Travel insurance"],
    description:
      "The Chinese side of the Pamir: Kashgar's markets, the Karakoram Highway and the lakes and Tajik villages around Tashkurgan.",
    countries: ["china"],
    seasons: ["spring", "summer", "autumn"],
    styles: ["overland-4x4", "photography"],
  },
]

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug)
}
