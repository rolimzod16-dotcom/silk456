import type { CountryId } from "@/lib/catalog";

/** Editable guide content for a destination page; empty sections are hidden. */
export type CountryContent = {
  overview: string;
  image: string;
  facts: { label: string; value: string }[];
  highlights: { title: string; text: string; image?: string }[];
  bestTime: { season: string; text: string }[];
  travelInfo: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  seoTitle?: string;
  seoDescription?: string;
};

export const EMPTY_COUNTRY: CountryContent = {
  overview: "",
  image: "",
  facts: [],
  highlights: [],
  bestTime: [],
  travelInfo: [],
  faq: [],
};

const visaNote = "Rules change often — we check them for your passport with your quote.";

export const DEFAULT_COUNTRIES: Record<CountryId, CountryContent> = {
  tajikistan: {
    overview:
      "Tajikistan is the mountain heart of Central Asia: more than 90% of the country is mountains, from the Fann range near Samarkand to the high Pamir plateau. Travelers come for the Pamir Highway, turquoise alpine lakes, the Wakhan valley on the Afghan border and the hospitality of Pamiri and Tajik families.",
    image: "",
    facts: [
      { label: "Capital", value: "Dushanbe" },
      { label: "Currency", value: "Tajik somoni (TJS)" },
      { label: "Languages", value: "Tajik; Russian widely spoken" },
      { label: "Time zone", value: "UTC+5" },
    ],
    highlights: [
      { title: "The Pamir Highway", text: "The M41 crosses the Roof of the World from Dushanbe to Osh, over passes above 4,000 m and across the lunar Pamir plateau." },
      { title: "Wakhan Valley", text: "A green valley along the Panj river facing the Hindu Kush, with ancient fortresses, petroglyphs and hot springs." },
      { title: "Fann Mountains", text: "The most accessible high mountains in the country, a trekking paradise of jagged peaks and alpine lakes." },
      { title: "Seven Lakes (Haft Kul)", text: "A chain of turquoise lakes in the Shing valley, each a different shade, linked by a mountain road and trails." },
      { title: "Iskanderkul", text: "A glacial lake at 2,200 m named after Alexander the Great, with a waterfall and village homestays nearby." },
      { title: "Dushanbe", text: "A green capital of wide avenues, teahouses and the Mehrgon bazaar — the start of most journeys." },
      { title: "Pamiri culture", text: "Traditional Pamiri houses with their skylight ceilings, music, crafts and family homestays across GBAO." },
      { title: "Khujand", text: "One of the oldest cities in Central Asia, on the Syr Darya in the Fergana valley, with a lively bazaar." },
    ],
    bestTime: [
      { season: "June – September", text: "The season for the Pamir Highway, high passes, the Wakhan and treks in the Fann Mountains." },
      { season: "April – May, October", text: "Good for Dushanbe, Khujand and lower valleys; high passes may still be closed by snow." },
      { season: "November – March", text: "Winter in the mountains; many high roads close. City breaks and winter trips on request." },
    ],
    travelInfo: [
      { title: "Visa", text: `Most visitors apply for a Tajik e-visa online before travel. ${visaNote}` },
      { title: "GBAO permit", text: "Travel in the Pamirs (GBAO) needs a GBAO permit in addition to your visa; Lake Sarez needs a separate permit. We arrange permits with your booking." },
      { title: "Getting there", text: "International flights arrive in Dushanbe and Khujand. Land borders connect with Uzbekistan and Kyrgyzstan." },
      { title: "Getting around", text: "Mountain routes are driven in 4x4 vehicles with experienced drivers; distances take longer than maps suggest." },
      { title: "Money", text: "Cash is king outside Dushanbe. Bring US dollars or euros in good condition; ATMs are limited in the mountains." },
    ],
    faq: [
      { q: "Is the Pamir Highway difficult?", a: "It is a long, rough mountain road with passes above 4,000 m. In a 4x4 with a driver it suits most healthy travelers; itineraries climb gradually." },
      { q: "Where do we stay in the Pamirs?", a: "Mostly in family homestays and small guesthouses — simple, warm and a highlight of the trip." },
    ],
  },
  uzbekistan: {
    overview:
      "Uzbekistan holds the most famous cities of the Silk Road — Samarkand, Bukhara and Khiva — with turquoise domes, madrasahs and bazaars that still follow the old trade rhythm. Fast trains link the cities, and the craft traditions of silk, ceramics and embroidery are alive in workshops across the country.",
    image: "",
    facts: [
      { label: "Capital", value: "Tashkent" },
      { label: "Currency", value: "Uzbek som (UZS)" },
      { label: "Languages", value: "Uzbek; Russian widely spoken" },
      { label: "Time zone", value: "UTC+5" },
    ],
    highlights: [
      { title: "Samarkand", text: "The Registan, the Shah-i-Zinda necropolis and Gur-e-Amir — Timur's capital and the jewel of the Silk Road." },
      { title: "Bukhara", text: "A living old town of trading domes, the Kalan minaret, Lyab-i Hauz and the Ark fortress." },
      { title: "Khiva", text: "Itchan Kala, a complete walled city of minarets and madrasahs, magical at sunset." },
      { title: "Tashkent", text: "A modern capital with Soviet-era architecture, ornate metro stations and the Chorsu bazaar." },
      { title: "Fergana Valley crafts", text: "Silk weaving in Margilan and ceramics in Rishtan — the craft heart of the country." },
      { title: "Shahrisabz", text: "Timur's birthplace with the ruins of the Ak-Saray palace, in the hills south of Samarkand." },
      { title: "Desert yurt camps", text: "Nights in yurts near Aydarkul lake and the Nuratau mountains, with camel rides and starry skies." },
    ],
    bestTime: [
      { season: "April – May", text: "Mild days and blooming gardens — the best time for the cities." },
      { season: "September – October", text: "Warm, dry and the harvest season; ideal for sightseeing." },
      { season: "June – August", text: "Hot, often above 40 °C in Bukhara and Khiva; plan early starts." },
      { season: "November – March", text: "Cool and quiet, with few crowds — good for short city breaks." },
    ],
    travelInfo: [
      { title: "Visa", text: `Citizens of many countries, including the EU and the UK, can visit visa-free for up to 30 days; others use an e-visa. ${visaNote}` },
      { title: "Getting around", text: "Afrosiyob high-speed trains connect Tashkent, Samarkand and Bukhara; Khiva is reached by train or flight to Urgench." },
      { title: "Registration", text: "Hotels register foreign guests automatically; keep the slips until you leave the country." },
      { title: "Money", text: "Cards work in larger hotels and shops; carry som in cash for bazaars and small cafés." },
    ],
    faq: [
      { q: "How many days do I need?", a: "A week covers Tashkent, Samarkand, Bukhara and Khiva at a comfortable pace; add days for the Fergana valley or a desert yurt camp." },
      { q: "What should I wear?", a: "Light, modest clothing; cover shoulders and knees when visiting mosques and mausoleums." },
    ],
  },
  kyrgyzstan: {
    overview:
      "Kyrgyzstan is a country of the Tien Shan mountains, summer pastures and nomad traditions. Travelers ride horses to alpine lakes, sleep in yurt camps and hike through valleys that have changed little in centuries.",
    image: "",
    facts: [
      { label: "Capital", value: "Bishkek" },
      { label: "Currency", value: "Kyrgyz som (KGS)" },
      { label: "Languages", value: "Kyrgyz; Russian widely spoken" },
      { label: "Time zone", value: "UTC+6" },
    ],
    highlights: [
      { title: "Issyk-Kul", text: "A huge alpine lake ringed by snowy peaks, with beaches, petroglyphs and canyons on its shores." },
      { title: "Son-Kul", text: "A high pasture lake at about 3,000 m where herders spend the summer in yurts." },
      { title: "Karakol", text: "A base for treks into the Tien Shan, with a wooden Dungan mosque and Orthodox cathedral." },
      { title: "Fairy Tale Canyon", text: "Red rock formations on the south shore of Issyk-Kul, shaped by wind and rain." },
      { title: "Ala-Archa", text: "A national park of glaciers and alpine meadows less than an hour from Bishkek." },
      { title: "Tash Rabat", text: "A 15th-century stone caravanserai in a remote valley on the road to China." },
    ],
    bestTime: [
      { season: "June – September", text: "Main season for yurt camps, Son-Kul, horse treks and high trails." },
      { season: "May, October", text: "Quieter shoulder months; mountain pastures may be cold or snowy." },
      { season: "November – April", text: "Winter sports near Karakol and Bishkek; many high areas closed." },
    ],
    travelInfo: [
      { title: "Visa", text: `Citizens of many countries, including the EU, UK and US, can visit visa-free for up to 60 days. ${visaNote}` },
      { title: "Getting there", text: "Flights arrive in Bishkek and Osh; land borders connect with Kazakhstan, Uzbekistan and Tajikistan." },
      { title: "Getting around", text: "Roads to lakes and pastures are often unpaved; 4x4 vehicles and horses reach the best places." },
      { title: "Money", text: "Cash is needed in yurt camps and villages; ATMs are available in Bishkek, Karakol and Osh." },
    ],
    faq: [
      { q: "Do I need riding experience?", a: "No. Most horse rides are at a walking pace with local guides; tell us your experience and we adapt the route." },
    ],
  },
  kazakhstan: {
    overview:
      "Kazakhstan is the largest country of Central Asia, stretching from the Caspian to the Altai. South-eastern Kazakhstan around Almaty offers canyons, alpine lakes and the northern Tien Shan, while Turkestan keeps the great monuments of the Silk Road.",
    image: "",
    facts: [
      { label: "Capital", value: "Astana" },
      { label: "Currency", value: "Kazakhstani tenge (KZT)" },
      { label: "Languages", value: "Kazakh; Russian widely spoken" },
      { label: "Time zone", value: "UTC+5" },
    ],
    highlights: [
      { title: "Almaty", text: "A green city at the foot of the mountains, with the Green Bazaar, parks and Soviet modernist architecture." },
      { title: "Charyn Canyon", text: "The Valley of Castles — red rock walls carved by the Charyn river." },
      { title: "Kolsai & Kaindy lakes", text: "Alpine lakes in spruce forest, and Kaindy's sunken forest of drowned trees." },
      { title: "Big Almaty Lake", text: "A turquoise reservoir high above the city in the Zailiysky Alatau." },
      { title: "Turkestan", text: "The Mausoleum of Khoja Ahmed Yasawi, a masterpiece of Timurid architecture." },
    ],
    bestTime: [
      { season: "May – September", text: "Best for canyons, lakes and hiking around Almaty." },
      { season: "April, October", text: "Mild and quiet; good for Almaty and Turkestan." },
      { season: "December – March", text: "Ski season at Shymbulak and frozen mountain lakes." },
    ],
    travelInfo: [
      { title: "Visa", text: `Citizens of many countries, including the EU, UK and US, can visit visa-free for up to 30 days. ${visaNote}` },
      { title: "Getting around", text: "Day trips from Almaty are by car; long distances between regions are covered by trains and domestic flights." },
      { title: "Money", text: "Cards are widely accepted in cities; carry some cash for national parks and villages." },
    ],
    faq: [
      { q: "Can Kazakhstan be combined with Kyrgyzstan?", a: "Yes. Almaty is a few hours from the Kyrgyz border, so Charyn and Issyk-Kul combine easily in one trip." },
    ],
  },
  china: {
    overview:
      "Western China's Xinjiang region was the eastern gateway of the Silk Road. Kashgar's old town and bazaars, the oasis of Turpan and the Karakoram Highway towards the Pamir show a world where Chinese and Central Asian cultures meet.",
    image: "",
    facts: [
      { label: "Regional capital", value: "Urumqi" },
      { label: "Currency", value: "Renminbi (CNY)" },
      { label: "Languages", value: "Mandarin, Uyghur" },
      { label: "Time zone", value: "UTC+8 (Beijing time)" },
    ],
    highlights: [
      { title: "Kashgar", text: "The old town, the Id Kah mosque and the famous Sunday livestock market." },
      { title: "Karakul Lake", text: "A high lake beneath Muztagh Ata on the Karakoram Highway." },
      { title: "Tashkurgan", text: "A stone fortress and the Tajik villages of the Chinese Pamir." },
      { title: "Turpan", text: "An oasis of grapes and ancient ruins beside the Flaming Mountains." },
    ],
    bestTime: [
      { season: "May – October", text: "Best for Kashgar, the Karakoram Highway and the high lakes." },
      { season: "July – August", text: "Hot in Turpan and the desert; pleasant at altitude." },
    ],
    travelInfo: [
      { title: "Visa", text: `Many European nationals can currently visit China visa-free for a limited stay; others need a visa in advance. ${visaNote}` },
      { title: "Border areas", text: "The road towards the Khunjerab Pass needs a border-area permit, arranged by us." },
      { title: "Getting around", text: "Trains and flights connect Urumqi, Turpan and Kashgar; the Karakoram Highway is driven by car." },
      { title: "Money & apps", text: "Mobile payment apps are used everywhere; set one up before you go and carry some cash." },
    ],
    faq: [
      { q: "Can I travel from Kashgar to Central Asia overland?", a: "Yes, via the Irkeshtam or Torugart passes into Kyrgyzstan, subject to border opening hours and permits." },
    ],
  },
  iran: {
    overview:
      "Iran was the western arm of the Silk Road — a land of Persian gardens, blue-tiled mosques, desert caravanserais and 2,500 years of history from Persepolis to Isfahan.",
    image: "",
    facts: [
      { label: "Capital", value: "Tehran" },
      { label: "Currency", value: "Iranian rial (IRR)" },
      { label: "Language", value: "Persian (Farsi)" },
      { label: "Time zone", value: "UTC+3:30" },
    ],
    highlights: [
      { title: "Isfahan", text: "Naqsh-e Jahan Square, the Sheikh Lotfollah mosque and the historic bridges." },
      { title: "Shiraz", text: "Gardens, poetry and the Nasir al-Mulk 'pink mosque'." },
      { title: "Persepolis", text: "The ceremonial capital of the Achaemenid kings." },
      { title: "Yazd", text: "A mud-brick desert city of windcatchers and Zoroastrian heritage." },
      { title: "Kashan", text: "Merchant houses and the Fin Garden, a classic Persian garden." },
    ],
    bestTime: [
      { season: "March – May", text: "Spring in the gardens — the most popular season." },
      { season: "October – November", text: "Warm days and clear skies across the desert cities." },
      { season: "December – February", text: "Mild in the desert cities; cold in the north and mountains." },
    ],
    travelInfo: [
      { title: "Visa", text: `Many nationalities can get an e-visa; citizens of some countries (e.g. US, UK, Canada) must travel with a licensed guide on an approved itinerary. ${visaNote}` },
      { title: "Money", text: "Foreign bank cards do not work in Iran; bring enough cash in euros or US dollars for the whole trip." },
      { title: "Dress code", text: "Women cover their hair in public; everyone wears modest clothing covering arms and legs." },
    ],
    faq: [
      { q: "Is it safe to travel to Iran?", a: "Check your government's current travel advice before booking; we follow it when planning routes and will tell you if anything changes." },
    ],
  },
  turkmenistan: {
    overview:
      "Turkmenistan is one of the least visited countries in the world: the ruins of ancient Merv, the burning Darvaza gas crater in the Karakum desert and the white-marble capital, Ashgabat.",
    image: "",
    facts: [
      { label: "Capital", value: "Ashgabat" },
      { label: "Currency", value: "Turkmen manat (TMT)" },
      { label: "Languages", value: "Turkmen; Russian" },
      { label: "Time zone", value: "UTC+5" },
    ],
    highlights: [
      { title: "Merv", text: "Once one of the largest cities in the world, a UNESCO site of fortresses and mausoleums." },
      { title: "Darvaza crater", text: "A burning gas crater in the Karakum desert, best seen at night." },
      { title: "Kunya-Urgench", text: "Minarets and mausoleums of the old capital of Khorezm." },
      { title: "Ashgabat", text: "A city of white marble and monuments, and the Tolkuchka bazaar." },
    ],
    bestTime: [
      { season: "March – May", text: "Mild weather for the desert and Merv." },
      { season: "September – November", text: "Warm days and cool nights at Darvaza." },
    ],
    travelInfo: [
      { title: "Visa", text: `A tourist visa requires a letter of invitation from a licensed agency and travel with a guide. We prepare the invitation with your booking. ${visaNote}` },
      { title: "Getting there", text: "Flights to Ashgabat, or a land crossing from Khiva in Uzbekistan via Kunya-Urgench." },
      { title: "Money", text: "Bring cash; card payments are limited for visitors." },
    ],
    faq: [
      { q: "Can I combine Turkmenistan with Uzbekistan?", a: "Yes. Khiva is close to the Kunya-Urgench border crossing, so the two countries combine naturally." },
    ],
  },
  mongolia: {
    overview:
      "Mongolia is the land of the open steppe: nomad families in gers, horses, the Gobi desert and Lake Khövsgöl in the northern taiga.",
    image: "",
    facts: [
      { label: "Capital", value: "Ulaanbaatar" },
      { label: "Currency", value: "Mongolian tögrög (MNT)" },
      { label: "Language", value: "Mongolian" },
      { label: "Time zone", value: "UTC+8" },
    ],
    highlights: [
      { title: "Lake Khövsgöl", text: "A vast clear lake in the north, frozen solid in winter, home to reindeer-herding Tsaatan families nearby." },
      { title: "Gobi desert", text: "Singing dunes, flaming cliffs and camel herders in the south." },
      { title: "Orkhon Valley", text: "The site of Karakorum, the old capital of the Mongol Empire, and the Erdene Zuu monastery." },
      { title: "Naadam festival", text: "Wrestling, archery and horse racing every July." },
    ],
    bestTime: [
      { season: "June – September", text: "Main travel season for the steppe, the Gobi and Naadam in July." },
      { season: "February – March", text: "Winter trips to frozen Lake Khövsgöl and its ice festival." },
    ],
    travelInfo: [
      { title: "Visa", text: `Many nationalities can enter visa-free for a limited stay; others need a visa in advance. ${visaNote}` },
      { title: "Getting around", text: "Distances are huge; travel is by 4x4 and domestic flights, often on dirt tracks." },
      { title: "Money", text: "Cards work in Ulaanbaatar; carry cash in the countryside." },
    ],
    faq: [
      { q: "How cold is winter?", a: "Very cold — often below −30 °C in the north. Winter trips include heated gers and we send a detailed clothing list." },
    ],
  },
};
