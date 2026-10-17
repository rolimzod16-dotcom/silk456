import { unstable_rethrow } from "next/navigation";
import { cache } from "react";
import { COUNTRIES, REGIONS, SEASONS, STYLES, tourMeta, type CountryId } from "@/lib/catalog";
import { DEFAULT_COUNTRIES, type CountryContent } from "@/lib/country-content";
import { FAQ } from "@/lib/faq";
import { DEFAULT_SETTINGS, type FaqItem, type SiteContent, type SiteSettings } from "@/lib/site-content";
import { mutateDoc, readDoc } from "@/lib/store";
import { testimonials as builtInTestimonials, type Testimonial } from "@/lib/testimonials";
import { tours as builtInTours, type Departure, type DepartureStatus, type Tour, type TourDay } from "@/lib/tours";

const DOC_ID = "silk456-content.json";
/** Cache tag for public reads; the admin revalidates it on every save. */
export const CONTENT_TAG = "site-content";

type StoredContent = Partial<SiteContent>;

function defaults(): SiteContent {
  return {
    tours: builtInTours.map((tour) => ({ ...tour, ...tourMeta(tour), published: true })),
    testimonials: builtInTestimonials,
    settings: DEFAULT_SETTINGS,
    countries: DEFAULT_COUNTRIES,
    faq: FAQ,
  };
}

const str = (value: unknown, max = 2000) => (typeof value === "string" ? value.trim().slice(0, max) : "");
const num = (value: unknown) => {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};
const strList = (value: unknown, max = 400) =>
  Array.isArray(value) ? value.map((item) => str(item, max)).filter(Boolean) : [];
const objects = (value: unknown) =>
  (Array.isArray(value) ? value : []).filter((item): item is Record<string, unknown> => !!item && typeof item === "object");
function pickIds<T extends string>(value: unknown, allowed: readonly { id: T }[]): T[] {
  const ids = new Set(allowed.map((item) => item.id as string));
  return Array.isArray(value) ? (value.filter((item) => ids.has(item)) as T[]) : [];
}
const isoDate = (value: unknown) => {
  const s = str(value, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : "";
};
const STATUSES: DepartureStatus[] = ["available", "limited", "full"];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** "Day 3 — Bukhara" and "3. Bukhara" become "Bukhara": the day number is shown separately. */
function cleanDayTitle(title: string) {
  return title.replace(/^\s*(day|день)?\s*\d+\s*[.:—–-]?\s*/i, "").trim() || title;
}

function normalizeDays(value: unknown): TourDay[] {
  return objects(value)
    .filter((day) => !!str(day.title))
    .map((day, index) => ({
      day: index + 1,
      title: cleanDayTitle(str(day.title, 200)),
      description: str(day.description, 4000),
      ...(str(day.overnight, 200) && { overnight: str(day.overnight, 200) }),
      ...(str(day.image, 600) && { image: str(day.image, 600) }),
    }));
}

function normalizeDepartures(value: unknown): Departure[] {
  return objects(value)
    .map((item) => {
      const start = isoDate(item.start);
      if (!start) return null;
      const end = isoDate(item.end);
      const status = STATUSES.includes(item.status as DepartureStatus) ? (item.status as DepartureStatus) : "available";
      const price = num(item.price);
      return {
        start,
        ...(end && end >= start && { end }),
        ...(price > 0 && { price }),
        status,
        ...(str(item.note, 200) && { note: str(item.note, 200) }),
      } satisfies Departure;
    })
    .filter((item): item is Departure => !!item)
    .sort((a, b) => a.start.localeCompare(b.start));
}

const normalizeQa = (value: unknown) =>
  objects(value)
    .map((item) => ({ q: str(item.q, 300), a: str(item.a, 3000) }))
    .filter((item) => item.q && item.a);

export function normalizeTour(raw: unknown): Tour | null {
  if (!raw || typeof raw !== "object") return null;
  const t = raw as Record<string, unknown>;
  const title = str(t.title, 160);
  const slug = slugify(str(t.slug) || title);
  if (!title || !slug) return null;
  const oldPrice = num(t.oldPrice);
  const region = str(t.region);
  const itinerary = normalizeDays(t.itinerary);

  return {
    slug,
    title,
    subtitle: str(t.subtitle, 300),
    country: str(t.country, 120),
    region: (REGIONS as readonly string[]).includes(region) ? region : REGIONS[0],
    duration: str(t.duration, 80),
    days: Math.max(1, Math.round(num(t.days)) || itinerary.length || 1),
    price: num(t.price),
    oldPrice: oldPrice > 0 ? oldPrice : undefined,
    image: str(t.image, 600) || "/images/hero-silkroad.png",
    rating: Math.min(5, num(t.rating)),
    reviews: Math.round(num(t.reviews)),
    groupSize: str(t.groupSize, 80),
    difficulty: str(t.difficulty, 80),
    season: str(t.season, 120),
    highlights: strList(t.highlights),
    itinerary,
    included: strList(t.included),
    excluded: strList(t.excluded),
    description: str(t.description, 6000),
    featured: t.featured === true,
    countries: pickIds(t.countries, COUNTRIES),
    seasons: pickIds(t.seasons, SEASONS),
    styles: pickIds(t.styles, STYLES),
    gallery: strList(t.gallery, 600).slice(0, 24),
    departures: normalizeDepartures(t.departures),
    faq: normalizeQa(t.faq),
    published: t.published !== false,
  };
}

export function normalizeTestimonial(raw: unknown): Testimonial | null {
  if (!raw || typeof raw !== "object") return null;
  const t = raw as Record<string, unknown>;
  const name = str(t.name, 120);
  const text = str(t.text, 2000);
  if (!name || !text) return null;
  const initials =
    str(t.initials, 4) ||
    name
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  return {
    id: str(t.id, 60) || crypto.randomUUID(),
    name,
    location: str(t.location, 120),
    initials,
    rating: Math.min(5, Math.max(1, Math.round(num(t.rating)) || 5)),
    text,
    tour: str(t.tour, 160),
    date: str(t.date, 60),
  };
}

export function normalizeSettings(raw: unknown): SiteSettings {
  const t = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const result = { ...DEFAULT_SETTINGS };
  for (const key of Object.keys(DEFAULT_SETTINGS) as (keyof SiteSettings)[]) {
    if (typeof t[key] === "string") result[key] = str(t[key], 300);
  }
  return result;
}

function normalizeCountry(raw: unknown): CountryContent {
  const t = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  return {
    overview: str(t.overview, 6000),
    image: str(t.image, 600),
    facts: objects(t.facts)
      .map((f) => ({ label: str(f.label, 60), value: str(f.value, 160) }))
      .filter((f) => f.label && f.value),
    highlights: objects(t.highlights)
      .map((h) => ({ title: str(h.title, 120), text: str(h.text, 1500), ...(str(h.image, 600) && { image: str(h.image, 600) }) }))
      .filter((h) => h.title),
    bestTime: objects(t.bestTime)
      .map((b) => ({ season: str(b.season, 80), text: str(b.text, 1000) }))
      .filter((b) => b.season && b.text),
    travelInfo: objects(t.travelInfo)
      .map((i) => ({ title: str(i.title, 120), text: str(i.text, 2000) }))
      .filter((i) => i.title && i.text),
    faq: normalizeQa(t.faq),
  };
}

function normalizeCountries(value: unknown, base: Record<CountryId, CountryContent>) {
  const t = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const result = { ...base };
  for (const country of COUNTRIES) {
    if (t[country.id] !== undefined) result[country.id] = normalizeCountry(t[country.id]);
  }
  return result;
}

function normalizeFaq(value: unknown): FaqItem[] {
  const text = (v: unknown, max: number) => {
    const o = v && typeof v === "object" ? (v as Record<string, unknown>) : {};
    return { en: str(o.en, max), ru: str(o.ru, max) };
  };
  return objects(value)
    .map((item) => ({ q: text(item.q, 300), a: text(item.a, 3000) }))
    .filter((item) => item.q.en && item.a.en);
}

function normalizeTours(value: unknown): Tour[] {
  const seen = new Set<string>();
  return (Array.isArray(value) ? value : [])
    .map(normalizeTour)
    .filter((tour): tour is Tour => {
      if (!tour || seen.has(tour.slug)) return false;
      seen.add(tour.slug);
      return true;
    });
}

function merge(stored: StoredContent | null): SiteContent {
  const base = defaults();
  if (!stored) return base;
  return {
    tours: Array.isArray(stored.tours) ? normalizeTours(stored.tours) : base.tours,
    testimonials: Array.isArray(stored.testimonials)
      ? stored.testimonials.map(normalizeTestimonial).filter((t): t is Testimonial => !!t)
      : base.testimonials,
    settings: stored.settings ? normalizeSettings(stored.settings) : base.settings,
    countries: stored.countries ? normalizeCountries(stored.countries, base.countries) : base.countries,
    faq: Array.isArray(stored.faq) ? normalizeFaq(stored.faq) : base.faq,
  };
}

async function readStored(fresh = false): Promise<StoredContent | null> {
  const value = await readDoc(DOC_ID, fresh ? {} : { tag: CONTENT_TAG });
  return value && typeof value === "object" ? (value as StoredContent) : null;
}

/** Visitors never see draft tours. */
function publicView(content: SiteContent): SiteContent {
  return { ...content, tours: content.tours.filter((tour) => tour.published !== false) };
}

/** Site content for visitors; falls back to the built-in data. */
export const getContent = cache(async (): Promise<SiteContent> => {
  try {
    return publicView(merge(await readStored()));
  } catch (error) {
    unstable_rethrow(error);
    console.error("[content] read failed, using built-in data", error);
    return publicView(defaults());
  }
});

/** Uncached read for the admin, including drafts, so edits never start from stale data. */
export async function getFreshContent(): Promise<SiteContent> {
  return merge(await readStored(true));
}

export async function getTour(slug: string) {
  return (await getContent()).tours.find((tour) => tour.slug === slug);
}

type Section = keyof SiteContent;

export function saveSection(section: Section, value: unknown): Promise<SiteContent> {
  return mutateDoc(
    DOC_ID,
    async () => (await readStored(true)) ?? {},
    (stored) => {
      const current = merge(stored);
      const next: SiteContent = {
        ...current,
        ...(section === "tours" && { tours: normalizeTours(value) }),
        ...(section === "testimonials" && {
          testimonials: (Array.isArray(value) ? value : [])
            .map(normalizeTestimonial)
            .filter((t): t is Testimonial => !!t),
        }),
        ...(section === "settings" && { settings: normalizeSettings(value) }),
        ...(section === "countries" && { countries: normalizeCountries(value, current.countries) }),
        ...(section === "faq" && { faq: normalizeFaq(value) }),
      };
      return { store: next, result: next };
    },
  );
}
