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
  itinerary: { day: number; title: string; description: string }[]
  included: string[]
  excluded: string[]
  description: string
  featured?: boolean
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
    oldPrice: 1590,
    image: "/images/tours/samarkand.png",
    rating: 4.9,
    reviews: 218,
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
      { day: 4, title: "Ancient Bukhara", description: "Kalan Minaret, Lyab-i Hauz, trading domes and the Ark Fortress." },
      { day: 5, title: "Khiva", description: "Flight to Urgench, tour of Itchan Kala and the Kalta Minor Minaret." },
      { day: 6, title: "Workshops", description: "Pottery in Gijduvan, silk weaving and handmade carpets." },
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
    featured: true,
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
    oldPrice: 2590,
    image: "/images/tours/kashgar.png",
    rating: 4.8,
    reviews: 142,
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
      { day: 6, title: "Torugart Pass", description: "Views of the Pamir, lunch with nomads." },
      { day: 7, title: "Workshops", description: "Uyghur cooking, carpets, handmade paper." },
      { day: 8, title: "Hotan", description: "Silk weaving and jade workshops." },
      { day: 9, title: "Return", description: "Drive back to Urumqi, farewell dinner." },
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
    featured: true,
  },
  {
    slug: "tianshan-nomads",
    title: "Charyn & the Heavenly Mountains",
    subtitle: "Kyrgyzstan: canyons, lakes and nomads",
    country: "Kyrgyzstan",
    region: "Central Asia",
    duration: "8 days / 7 nights",
    days: 8,
    price: 1490,
    oldPrice: 1790,
    image: "/images/tours/kyrgyzstan.png",
    rating: 4.9,
    reviews: 176,
    groupSize: "up to 12 guests",
    difficulty: "Moderate",
    season: "June — September",
    highlights: [
      "Issyk-Kul — the second-largest alpine lake on Earth",
      "Charyn Canyon and the Fairy Tale rocks",
      "Son-Kul — a high-altitude pasture at 3,016 m",
      "Overnight in a real nomad yurt",
      "Horseback riding and traditional games",
    ],
    itinerary: [
      { day: 1, title: "Bishkek", description: "Arrival, city tour, Osh Bazaar." },
      { day: 2, title: "Charyn Canyon", description: "Valley of Castles, trekking, overnight in a yurt." },
      { day: 3, title: "Issyk-Kul", description: "Cholpon-Ata petroglyphs, evening by the lake." },
      { day: 4, title: "Son-Kul", description: "Climb to 3,016 m, nomads and herds of horses." },
      { day: 5, title: "Nomad life", description: "Horseback ride, mare-milking, traditional games." },
      { day: 6, title: "Fairy Tale Rocks", description: "Otherworldly landscapes, sunset by the lake." },
      { day: 7, title: "Karakol", description: "Dungan mosque, orthodox church, dinner with a local family." },
      { day: 8, title: "Departure", description: "Return to Bishkek, transfer." },
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
    featured: true,
  },
  {
    slug: "persian-silk",
    title: "Persian Silk Roads",
    subtitle: "Isfahan, Shiraz and Yazd — the heart of Iran",
    country: "Iran",
    region: "West Asia",
    duration: "9 days / 8 nights",
    days: 9,
    price: 1890,
    oldPrice: 2250,
    image: "/images/tours/isfahan.png",
    rating: 4.7,
    reviews: 98,
    groupSize: "up to 10 guests",
    difficulty: "Easy",
    season: "March — May, October — November",
    highlights: [
      "Naqsh-e Jahan Square in Isfahan",
      "The pink mosques of Shiraz",
      "The clay city of Yazd — wind towers and Zoroastrians",
      "Persepolis — capital of the Achaemenids",
      "Gardens of the Persian shahs",
    ],
    itinerary: [
      { day: 1, title: "Tehran", description: "Arrival, Iran National Museum." },
      { day: 2, title: "Shiraz", description: "Flight, Eram Garden, the pink Nasir ol Molk Mosque." },
      { day: 3, title: "Persepolis", description: "Ancient capital of the Achaemenids, Naqsh-e Rostam necropolis." },
      { day: 4, title: "Pasargadae", description: "Tomb of Cyrus the Great, train to Isfahan." },
      { day: 5, title: "Isfahan", description: "Naqsh-e Jahan Square, Sheikh Lotfollah Mosque." },
      { day: 6, title: "Armenian Quarter", description: "Vank Cathedral, bridges over the Zayandeh River." },
      { day: 7, title: "Yazd", description: "Clay city, wind towers, Zoroastrian fire temple." },
      { day: 8, title: "Workshops", description: "Persian carpets, miniatures, a teahouse evening." },
      { day: 9, title: "Departure", description: "Return to Tehran, flight home." },
    ],
    included: [
      "4★ hotels in traditional mansions",
      "Internal flights and transfers",
      "Art-historian guide",
      "All entrance tickets",
      "Breakfasts and 4 dinners",
    ],
    excluded: [
      "International flights",
      "Iranian visa",
      "Personal expenses",
      "Travel insurance",
    ],
    description:
      "The western arm of the Silk Road — Persia. From the splendor of Naqsh-e Jahan Square to the clay towers of Yazd and the ruins of Persepolis. A journey through 2,500 years of history, architecture and poetry.",
  },
  {
    slug: "great-turkestan",
    title: "Greater Turkestan",
    subtitle: "The grand journey across all of Central Asia",
    country: "Multi-country",
    region: "Central Asia",
    duration: "14 days / 13 nights",
    days: 14,
    price: 3490,
    oldPrice: 4190,
    image: "/images/tours/khiva.png",
    rating: 5.0,
    reviews: 64,
    groupSize: "up to 8 guests",
    difficulty: "Moderate",
    season: "April — October",
    highlights: [
      "5 countries in one route: Uzbekistan, Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan",
      "All the jewels of the Silk Road",
      "The Pamir Highway and the high mountains",
      "Gas and the Darvaza Crater",
      "VIP format: small group and premium hotels",
    ],
    itinerary: [
      { day: 1, title: "Tashkent", description: "Arrival, dinner, briefing." },
      { day: 2, title: "Samarkand", description: "Afrosiyob train, Registan." },
      { day: 3, title: "Bukhara", description: "Kalan, Lyab-i Hauz." },
      { day: 4, title: "Khiva", description: "Itchan Kala, Kalta Minor." },
      { day: 5, title: "Konye-Urgench", description: "Crossing into Turkmenistan." },
      { day: 6, title: "Darvaza Crater", description: "The burning crater in the desert, overnight in a yurt." },
      { day: 7, title: "Ashgabat", description: "The white-marble capital." },
      { day: 8, title: "Flight to Almaty", description: "Kazakhstan, city tour." },
      { day: 9, title: "Charyn & Issyk-Kul", description: "Canyon, crossing into Kyrgyzstan." },
      { day: 10, title: "Son-Kul", description: "Nomads and yurts." },
      { day: 11, title: "Osh", description: "Sacred Sulayman Mountain." },
      { day: 12, title: "Pamir Highway", description: "A road above the clouds, Tajikistan." },
      { day: 13, title: "Dushanbe", description: "Capital of Tajikistan, farewell dinner." },
      { day: 14, title: "Departure", description: "Transfer to the airport." },
    ],
    included: [
      "4–5★ hotels and the best yurt camps",
      "All flights, trains and transfers",
      "Guides in every country",
      "All entrance tickets and permits",
      "Full board",
    ],
    excluded: [
      "International flights",
      "Visas (Turkmenistan, Tajikistan)",
      "Personal expenses",
      "Travel insurance",
    ],
    description:
      "An epic journey across all of Central Asia — from Khiva to the Pamirs, from the burning Darvaza Crater to the high-altitude Son-Kul. Our flagship route for those who want to see the entire Silk Road in a single trip.",
    featured: true,
  },
  {
    slug: "steppe-nomads",
    title: "Steppe Nomads",
    subtitle: "Kyrgyzstan and Mongolia: life in a yurt",
    country: "Kyrgyzstan / Mongolia",
    region: "East Asia",
    duration: "6 days / 5 nights",
    days: 6,
    price: 990,
    image: "/images/tours/steppe.png",
    rating: 4.8,
    reviews: 121,
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
]

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug)
}
