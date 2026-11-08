import { unstable_rethrow } from "next/navigation";
import { cache } from "react";
import { COUNTRIES, REGIONS, SEASONS, STYLES, tourMeta, type CountryId } from "@/lib/catalog";
import { DEFAULT_COUNTRIES, type CountryContent } from "@/lib/country-content";
import { DEFAULT_COUNTRIES_DE } from "@/lib/country-content-de";
import { FAQ } from "@/lib/faq";
import { DEFAULT_PAGES, SEO_PAGES, type PagesContent, type ServiceContent } from "@/lib/pages-content";
import { DEFAULT_SETTINGS, type FaqItem, type SiteContent, type SiteSettings, type TeamMember } from "@/lib/site-content";
import { mutateDoc, readDoc } from "@/lib/store";
import { testimonials as builtInTestimonials, type Testimonial } from "@/lib/testimonials";
import { tours as builtInTours, type Departure, type DepartureStatus, type Tour, type TourDay } from "@/lib/tours";

const DOC_ID = "silk456-content.json";
/** Cache tag for public reads; the admin revalidates it on every save. */
export const CONTENT_TAG = "site-content";

type StoredContent = Partial<SiteContent>;

/** The client's six featured tours, in the order they appear on the home page. */
const HOME_TOURS = ["pamir-highway", "fann-mountains-trek", "samarkand-gold", "tianshan-nomads", "pamir-moto", "almaty-charyn"];

/** Shown until the team is edited in the admin; from then on the saved list is used. */
const BUILT_IN_OWNER: TeamMember = {
  id: "sultonsho-guliev",
  name: "Sultonsho Guliev",
  role: { en: "Owner, Executive Director", de: "Inhaber, Geschäftsführer" },
  bio: { en: "", de: "" },
  photo: "/images/team/sultonsho.jpeg",
  languages: "",
  instagram: "",
};

function defaults(): SiteContent {
  const rank = (slug: string) => (HOME_TOURS.includes(slug) ? HOME_TOURS.indexOf(slug) : HOME_TOURS.length);
  return {
    tours: [...builtInTours]
      .sort((a, b) => rank(a.slug) - rank(b.slug))
      .map((tour) => ({ ...tour, ...tourMeta(tour), published: true, showOnHome: HOME_TOURS.includes(tour.slug) })),
    testimonials: builtInTestimonials,
    settings: DEFAULT_SETTINGS,
    countries: Object.fromEntries(
      COUNTRIES.map(({ id }) => [id, { ...DEFAULT_COUNTRIES[id], de: DEFAULT_COUNTRIES_DE[id] }]),
    ) as Record<CountryId, CountryContent>,
    faq: FAQ,
    pages: DEFAULT_PAGES,
    team: [BUILT_IN_OWNER],
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
const STATUSES: DepartureStatus[] = ["guaranteed", "open", "closed"];
/** Statuses saved before availability details were added. */
const OLD_STATUSES: Record<string, DepartureStatus> = { available: "open", limited: "open", full: "closed" };

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** "Day 3 — Bukhara" and "3. Bukhara" become "Bukhara": the day number is shown separately. */
function cleanDayTitle(title: string) {
  return title.replace(/^\s*(day|tag|день)?\s*\d+\s*[.:—–-]?\s*/i, "").trim() || title;
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
      const status = STATUSES.includes(item.status as DepartureStatus)
        ? (item.status as DepartureStatus)
        : (OLD_STATUSES[String(item.status)] ?? "open");
      const price = num(item.price);
      const spotsLeft = item.spotsLeft === undefined || item.spotsLeft === "" ? undefined : Math.max(0, Math.round(num(item.spotsLeft)));
      const toGuarantee = Math.max(0, Math.round(num(item.toGuarantee)));
      return {
        start,
        ...(end && end >= start && { end }),
        ...(price > 0 && { price }),
        status: spotsLeft === 0 ? "closed" : status,
        ...(spotsLeft !== undefined && { spotsLeft }),
        ...(toGuarantee > 0 && { toGuarantee }),
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

function normalizeTourDe(value: unknown): Tour["de"] {
  const d = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  // Lists keep blank lines so German items stay next to their English ones.
  const lines = (v: unknown, max = 400) => (Array.isArray(v) ? v.map((item) => str(item, max)) : []);
  return {
    title: str(d.title, 160),
    subtitle: str(d.subtitle, 300),
    description: str(d.description, 6000),
    country: str(d.country, 120),
    duration: str(d.duration, 80),
    groupSize: str(d.groupSize, 80),
    difficulty: str(d.difficulty, 80),
    season: str(d.season, 120),
    highlights: lines(d.highlights),
    included: lines(d.included),
    excluded: lines(d.excluded),
    itinerary: (Array.isArray(d.itinerary) ? d.itinerary : []).map((day) => {
      const x = day && typeof day === "object" ? (day as Record<string, unknown>) : {};
      return { title: str(x.title, 200), description: str(x.description, 4000), overnight: str(x.overnight, 200) };
    }),
    faq: (Array.isArray(d.faq) ? d.faq : []).map((item) => {
      const x = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
      return { q: str(x.q, 300), a: str(x.a, 3000) };
    }),
  };
}

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
    ...(Math.round(num(t.guaranteedFrom)) > 0 && { guaranteedFrom: Math.round(num(t.guaranteedFrom)) }),
    faq: normalizeQa(t.faq),
    published: t.published !== false,
    showOnHome: t.showOnHome === true,
    mapImage: str(t.mapImage, 600),
    mapEmbed: safeMapEmbed(t.mapEmbed),
    seoTitle: str(t.seoTitle, 70),
    seoDescription: str(t.seoDescription, 170),
    aliases: strList(t.aliases, 80).map(slugify).filter((alias) => alias && alias !== slug),
    de: normalizeTourDe(t.de),
  };
}

/**
 * Accepts a Google Maps embed URL, or the whole <iframe> code copied from
 * Google Maps; anything else is dropped so no foreign page is embedded.
 */
function safeMapEmbed(value: unknown) {
  const raw = str(value, 2000);
  const src = raw.match(/src="([^"]+)"/)?.[1] ?? raw;
  try {
    const url = new URL(src);
    const google =
      url.hostname === "www.google.com" &&
      (url.pathname.startsWith("/maps/") || (url.pathname === "/maps" && url.searchParams.get("output") === "embed"));
    return url.protocol === "https:" && google ? url.toString() : "";
  } catch {
    return "";
  }
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
    seoTitle: str(t.seoTitle, 70),
    seoDescription: str(t.seoDescription, 170),
    de: normalizeCountryDe(t.de),
  };
}

function normalizeCountryDe(value: unknown): CountryContent["de"] {
  if (!value || typeof value !== "object") return undefined;
  const d = value as Record<string, unknown>;
  // Pairs keep their position so each German item stays next to its English one.
  const pairs = <A extends string, B extends string>(v: unknown, a: A, b: B, max = 2000) =>
    (Array.isArray(v) ? v : []).map((item) => {
      const x = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
      return { [a]: str(x[a], max), [b]: str(x[b], max) } as Record<A | B, string>;
    });
  return {
    overview: str(d.overview, 6000),
    facts: pairs(d.facts, "label", "value", 160),
    highlights: pairs(d.highlights, "title", "text", 1500),
    bestTime: pairs(d.bestTime, "season", "text", 1000),
    travelInfo: pairs(d.travelInfo, "title", "text"),
    faq: pairs(d.faq, "q", "a", 3000),
  };
}

/**
 * German for a country saved before German existed: every text whose English still matches
 * the built-in one gets the built-in German; edited texts stay English until translated.
 */
function builtInGerman(saved: CountryContent, base: CountryContent): CountryContent["de"] {
  const de = base.de ?? {};
  const match = <T, D>(items: T[], baseItems: T[], deItems: D[] | undefined, same: (a: T, b: T) => boolean) =>
    items.map((item) => {
      const index = baseItems.findIndex((b) => same(item, b));
      return index >= 0 ? (deItems?.[index] ?? {}) : {};
    });
  return {
    overview: saved.overview === base.overview ? de.overview : "",
    facts: match(saved.facts, base.facts, de.facts, (a, b) => a.label === b.label && a.value === b.value),
    highlights: match(saved.highlights, base.highlights, de.highlights, (a, b) => a.title === b.title && a.text === b.text),
    bestTime: match(saved.bestTime, base.bestTime, de.bestTime, (a, b) => a.season === b.season && a.text === b.text),
    travelInfo: match(saved.travelInfo, base.travelInfo, de.travelInfo, (a, b) => a.title === b.title && a.text === b.text),
    faq: match(saved.faq, base.faq, de.faq, (a, b) => a.q === b.q && a.a === b.a),
  };
}

function normalizeCountries(value: unknown, base: Record<CountryId, CountryContent>) {
  const t = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const result = { ...base };
  for (const country of COUNTRIES) {
    if (t[country.id] === undefined) continue;
    const saved = normalizeCountry(t[country.id]);
    if (!saved.de) saved.de = builtInGerman(saved, base[country.id]);
    result[country.id] = saved;
  }
  return result;
}

function normalizeFaq(value: unknown): FaqItem[] {
  const text = (v: unknown, max: number) => {
    const o = v && typeof v === "object" ? (v as Record<string, unknown>) : {};
    return { en: str(o.en, max), de: str(o.de, max) };
  };
  return objects(value)
    .map((item) => ({ q: text(item.q, 300), a: text(item.a, 3000) }))
    .filter((item) => item.q.en && item.a.en);
}

/**
 * { en, de } pair; an empty value keeps the built-in text so pages never go blank.
 * If the English was rewritten but the German was not, the German page shows the new English
 * rather than an old German text about something else.
 */
function textPair(value: unknown, fallback: { en: string; de: string }, max = 2000) {
  const o = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const en = str(o.en, max) || fallback.en;
  return { en, de: str(o.de, max) || (en === fallback.en ? fallback.de : en) };
}

function normalizePages(raw: unknown): PagesContent {
  const t = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const base = DEFAULT_PAGES;
  const group = <K extends "home" | "about">(key: K) => {
    const src = t[key] && typeof t[key] === "object" ? (t[key] as Record<string, unknown>) : {};
    return Object.fromEntries(
      Object.entries(base[key]).map(([field, fallback]) => [field, textPair(src[field], fallback as { en: string; de: string })]),
    ) as PagesContent[K];
  };
  const storedServices = objects(t.services);
  const services: ServiceContent[] = base.services.map((service) => {
    const s = storedServices.find((item) => item.id === service.id) ?? {};
    const points = objects(s.points)
      .map((point) => ({ en: str(point.en, 300), de: str(point.de, 300) }))
      .filter((point) => point.en);
    return {
      id: service.id,
      title: textPair(s.title, service.title, 120),
      lead: textPair(s.lead, service.lead),
      points: points.length ? points : service.points,
    };
  });
  const storedStyles = t.styles && typeof t.styles === "object" ? (t.styles as Record<string, unknown>) : {};
  const styles = Object.fromEntries(
    STYLES.map(({ id }) => {
      const s = storedStyles[id] && typeof storedStyles[id] === "object" ? (storedStyles[id] as Record<string, unknown>) : {};
      return [id, { tagline: textPair(s.tagline, base.styles[id].tagline, 120), text: textPair(s.text, base.styles[id].text) }];
    }),
  ) as PagesContent["styles"];
  const storedSeo = t.seo && typeof t.seo === "object" ? (t.seo as Record<string, unknown>) : {};
  const seo = Object.fromEntries(
    SEO_PAGES.map(({ key }) => {
      const s = storedSeo[key] && typeof storedSeo[key] === "object" ? (storedSeo[key] as Record<string, unknown>) : {};
      return [key, { title: str(s.title, 70), description: str(s.description, 170) }];
    }),
  ) as PagesContent["seo"];
  const storedPhotos = t.photos && typeof t.photos === "object" ? (t.photos as Record<string, unknown>) : {};
  const photos = Object.fromEntries(
    Object.entries(base.photos).map(([key, fallback]) => [key, str(storedPhotos[key], 600) || fallback]),
  ) as PagesContent["photos"];
  return { photos, home: group("home"), about: group("about"), services, styles, seo };
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

/** One language may be left empty: the other fills in so a card is never blank. */
function eitherLanguage(value: unknown, max: number) {
  const o = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const en = str(o.en, max);
  const de = str(o.de, max);
  return { en: en || de, de: de || en };
}

function normalizeTeam(value: unknown): TeamMember[] {
  return objects(value)
    .filter((member) => !!str(member.name, 120))
    .map((member) => ({
      id: str(member.id, 60) || crypto.randomUUID(),
      name: str(member.name, 120),
      role: eitherLanguage(member.role, 120),
      bio: eitherLanguage(member.bio, 1000),
      photo: str(member.photo, 600),
      languages: str(member.languages, 200),
      instagram: /^https:\/\//i.test(str(member.instagram, 300)) ? str(member.instagram, 300) : "",
    }));
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
    pages: stored.pages ? normalizePages(stored.pages) : base.pages,
    team: Array.isArray(stored.team) ? normalizeTeam(stored.team) : base.team,
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

/** A tour whose address used to be `slug` (renamed in the admin). */
export async function getTourByAlias(slug: string) {
  return (await getContent()).tours.find((tour) => tour.aliases?.includes(slug));
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
        ...(section === "pages" && { pages: normalizePages(value) }),
        ...(section === "team" && { team: normalizeTeam(value) }),
      };
      return { store: next, result: next };
    },
  );
}
