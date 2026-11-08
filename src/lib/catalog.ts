import type { Tour } from "@/lib/tours";

export const SEASONS = [
  { id: "spring", months: [3, 4, 5], en: "Spring", de: "Frühling" },
  { id: "summer", months: [6, 7, 8], en: "Summer", de: "Sommer" },
  { id: "autumn", months: [9, 10, 11], en: "Autumn", de: "Herbst" },
  { id: "winter", months: [12, 1, 2], en: "Winter", de: "Winter" },
] as const;

export type SeasonId = (typeof SEASONS)[number]["id"];

export const DURATIONS = [
  { id: "short", en: "1–7 days", de: "1–7 Tage" },
  { id: "medium", en: "8–12 days", de: "8–12 Tage" },
  { id: "long", en: "13+ days", de: "13+ Tage" },
] as const;

export type DurationId = (typeof DURATIONS)[number]["id"];

export const COUNTRIES = [
  { id: "tajikistan", en: "Tajikistan", de: "Tadschikistan" },
  { id: "uzbekistan", en: "Uzbekistan", de: "Usbekistan" },
  { id: "kyrgyzstan", en: "Kyrgyzstan", de: "Kirgistan" },
  { id: "kazakhstan", en: "Kazakhstan", de: "Kasachstan" },
  { id: "china", en: "China", de: "China" },
] as const;

export type CountryId = (typeof COUNTRIES)[number]["id"];

export const STYLES = [
  { id: "overland-4x4", en: "Overland and 4x4", de: "Overland und 4x4" },
  { id: "trekking", en: "Trekking", de: "Trekking" },
  { id: "motorcycle", en: "Motorcycle", de: "Motorrad" },
  { id: "culture-cities", en: "Culture and cities", de: "Kultur und Städte" },
  { id: "horse-riding", en: "Horse riding", de: "Reiten" },
  { id: "photography", en: "Photography", de: "Fotoreisen" },
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
  "steppe-nomads": {
    countries: ["kyrgyzstan"],
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

export const REGIONS = ["Central Asia", "East Asia"] as const;

export function tourMatches(tour: Tour, filters: TourFilters): boolean {
  const meta = tourMeta(tour);
  if (filters.region !== "all" && tour.region !== filters.region) return false;
  if (filters.season && !meta.seasons.includes(filters.season)) return false;
  if (filters.duration && durationOf(tour.days) !== filters.duration) return false;
  if (filters.country && !meta.countries.includes(filters.country)) return false;
  if (filters.style && !meta.styles.includes(filters.style)) return false;
  return true;
}
