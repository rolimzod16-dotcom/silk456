import type { Tour } from "@/lib/tours";

export const SEASONS = [
  { id: "spring", months: [3, 4, 5], en: "Spring", ru: "Весна" },
  { id: "summer", months: [6, 7, 8], en: "Summer", ru: "Лето" },
  { id: "autumn", months: [9, 10, 11], en: "Autumn", ru: "Осень" },
  { id: "winter", months: [12, 1, 2], en: "Winter", ru: "Зима" },
] as const;

export type SeasonId = (typeof SEASONS)[number]["id"];

export const DURATIONS = [
  { id: "short", en: "1–7 days", ru: "1–7 дней" },
  { id: "medium", en: "8–12 days", ru: "8–12 дней" },
  { id: "long", en: "13+ days", ru: "13+ дней" },
] as const;

export type DurationId = (typeof DURATIONS)[number]["id"];

export const COUNTRIES = [
  { id: "tajikistan", en: "Tajikistan", ru: "Таджикистан" },
  { id: "uzbekistan", en: "Uzbekistan", ru: "Узбекистан" },
  { id: "kyrgyzstan", en: "Kyrgyzstan", ru: "Кыргызстан" },
  { id: "kazakhstan", en: "Kazakhstan", ru: "Казахстан" },
  { id: "china", en: "China", ru: "Китай" },
  { id: "iran", en: "Iran", ru: "Иран" },
  { id: "turkmenistan", en: "Turkmenistan", ru: "Туркменистан" },
  { id: "mongolia", en: "Mongolia", ru: "Монголия" },
] as const;

export type CountryId = (typeof COUNTRIES)[number]["id"];

export const STYLES = [
  { id: "overland-4x4", en: "Overland and 4x4", ru: "Оверленд и 4x4" },
  { id: "trekking", en: "Trekking", ru: "Треккинг" },
  { id: "motorcycle", en: "Motorcycle", ru: "Мото" },
  { id: "culture-cities", en: "Culture and cities", ru: "Культура и города" },
  { id: "horse-riding", en: "Horse riding", ru: "Верховая езда" },
  { id: "photography", en: "Photography", ru: "Фото-путешествия" },
] as const;

export type StyleId = (typeof STYLES)[number]["id"];

type TourMeta = {
  countries: CountryId[];
  seasons: SeasonId[];
  styles: StyleId[];
};

const META: Record<string, TourMeta> = {
  "samarkand-gold": {
    countries: ["uzbekistan"],
    seasons: ["spring", "summer", "autumn"],
    styles: ["culture-cities"],
  },
  "kashgar-caravan": {
    countries: ["china"],
    seasons: ["spring", "summer", "autumn"],
    styles: ["culture-cities", "photography"],
  },
  "tianshan-nomads": {
    countries: ["kyrgyzstan"],
    seasons: ["summer", "autumn"],
    styles: ["trekking", "horse-riding", "overland-4x4"],
  },
  "persian-silk": {
    countries: ["iran"],
    seasons: ["spring", "autumn"],
    styles: ["culture-cities", "photography"],
  },
  "great-turkestan": {
    countries: ["uzbekistan", "kazakhstan", "kyrgyzstan", "tajikistan", "turkmenistan"],
    seasons: ["spring", "summer", "autumn"],
    styles: ["overland-4x4", "culture-cities"],
  },
  "steppe-nomads": {
    countries: ["kyrgyzstan", "mongolia"],
    seasons: ["summer", "autumn"],
    styles: ["horse-riding"],
  },
};

export type TourFilters = {
  season: SeasonId | null;
  duration: DurationId | null;
  country: CountryId | null;
  style: StyleId | null;
  region: string;
};

export const emptyFilters: TourFilters = {
  season: null,
  duration: null,
  country: null,
  style: null,
  region: "all",
};

export function durationOf(days: number): DurationId {
  if (days <= 7) return "short";
  if (days <= 12) return "medium";
  return "long";
}

/** Tours edited in the admin carry their own tags; built-in tours fall back to META. */
export function tourMeta(tour: Tour): TourMeta {
  const fallback = META[tour.slug];
  return {
    countries: tour.countries ?? fallback?.countries ?? [],
    seasons: tour.seasons ?? fallback?.seasons ?? [],
    styles: tour.styles ?? fallback?.styles ?? [],
  };
}

export const REGIONS = ["Central Asia", "West Asia", "East Asia"] as const;

export function tourMatches(tour: Tour, filters: TourFilters): boolean {
  const meta = tourMeta(tour);
  if (filters.region !== "all" && tour.region !== filters.region) return false;
  if (filters.season && !meta.seasons.includes(filters.season)) return false;
  if (filters.duration && durationOf(tour.days) !== filters.duration) return false;
  if (filters.country && !meta.countries.includes(filters.country)) return false;
  if (filters.style && !meta.styles.includes(filters.style)) return false;
  return true;
}
