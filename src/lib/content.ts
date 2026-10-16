import { unstable_rethrow } from "next/navigation";
import { cache } from "react";
import { COUNTRIES, REGIONS, SEASONS, STYLES, tourMeta } from "@/lib/catalog";
import { DEFAULT_SETTINGS, type SiteContent, type SiteSettings } from "@/lib/site-content";
import { mutateDoc, readDoc } from "@/lib/store";
import { testimonials as builtInTestimonials, type Testimonial } from "@/lib/testimonials";
import { tours as builtInTours, type Tour } from "@/lib/tours";

const DOC_ID = "silk456-content.json";
/** Cache tag for public reads; the admin revalidates it on every save. */
export const CONTENT_TAG = "site-content";

type StoredContent = Partial<SiteContent>;

function defaults(): SiteContent {
  return {
    tours: builtInTours.map((tour) => ({ ...tour, ...tourMeta(tour) })),
    testimonials: builtInTestimonials,
    settings: DEFAULT_SETTINGS,
  };
}

const str = (value: unknown, max = 2000) => (typeof value === "string" ? value.trim().slice(0, max) : "");
const num = (value: unknown) => {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};
const strList = (value: unknown, max = 400) =>
  Array.isArray(value) ? value.map((item) => str(item, max)).filter(Boolean) : [];
function pickIds<T extends string>(value: unknown, allowed: readonly { id: T }[]): T[] {
  const ids = new Set(allowed.map((item) => item.id as string));
  return Array.isArray(value) ? (value.filter((item) => ids.has(item)) as T[]) : [];
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function normalizeTour(raw: unknown): Tour | null {
  if (!raw || typeof raw !== "object") return null;
  const t = raw as Record<string, unknown>;
  const title = str(t.title, 160);
  const slug = slugify(str(t.slug) || title);
  if (!title || !slug) return null;
  const oldPrice = num(t.oldPrice);
  const region = str(t.region);
  const itinerary = Array.isArray(t.itinerary)
    ? t.itinerary
        .map((day) => (day && typeof day === "object" ? (day as Record<string, unknown>) : null))
        .filter((day): day is Record<string, unknown> => !!day && !!str(day.title))
        .map((day, index) => ({
          day: index + 1,
          title: str(day.title, 200),
          description: str(day.description, 1000),
        }))
    : [];

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
    description: str(t.description, 4000),
    featured: t.featured === true,
    countries: pickIds(t.countries, COUNTRIES),
    seasons: pickIds(t.seasons, SEASONS),
    styles: pickIds(t.styles, STYLES),
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
  };
}

async function readStored(fresh = false): Promise<StoredContent | null> {
  const value = await readDoc(DOC_ID, fresh ? {} : { tag: CONTENT_TAG });
  return value && typeof value === "object" ? (value as StoredContent) : null;
}

/** Site content for the current request; falls back to the built-in data. */
export const getContent = cache(async (): Promise<SiteContent> => {
  try {
    return merge(await readStored());
  } catch (error) {
    unstable_rethrow(error);
    console.error("[content] read failed, using built-in data", error);
    return defaults();
  }
});

/** Uncached read for the admin, so edits never start from stale data. */
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
      };
      return { store: next, result: next };
    },
  );
}
