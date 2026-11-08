import type { StyleId } from "@/lib/catalog";
import type { Text } from "@/lib/locale";
import { STYLE_INTRO, type Intro } from "@/lib/pages";
import { SERVICES } from "@/lib/services";
import { UI } from "@/lib/ui-text";

/** Static pages whose search title and description can be set in the admin. */
export const SEO_PAGES = [
  { key: "home", label: "Startseite", path: "/" },
  { key: "tours", label: "Каталог туров", path: "/tours" },
  { key: "destinations", label: "Reiseziele", path: "/destinations" },
  { key: "travelStyles", label: "Reisestile", path: "/travel-styles" },
  { key: "services", label: "Leistungen", path: "/services" },
  { key: "about", label: "Über uns", path: "/about" },
  { key: "contact", label: "Kontakt", path: "/contact" },
  { key: "faq", label: "Fragen & Antworten", path: "/faq" },
] as const;

export type SeoPageKey = (typeof SEO_PAGES)[number]["key"];
export type Seo = { title: string; description: string };
export type SitePhotos = { hero: string; about: string; cta: string; pageHero: string; whyUs: string };
export type ServiceContent = { id: string; title: Text; lead: Text; points: Text[] };

/** Editable texts of the fixed pages; empty fields fall back to the built-in copy. */
export type PagesContent = {
  home: { badge: Text; titleStart: Text; titleAccent: Text; text: Text };
  about: { titleStart: Text; titleAccent: Text; p1: Text; p2: Text };
  services: ServiceContent[];
  styles: Record<StyleId, Intro>;
  seo: Record<SeoPageKey, Seo>;
  photos: SitePhotos;
};

const pair = (en: string, de: string): Text => ({ en, de });

export const DEFAULT_PHOTOS: SitePhotos = {
  hero: "/images/hero-silkroad.png",
  about: "/images/about-bazaar.png",
  cta: "/images/hero-silkroad.png",
  pageHero: "/images/hero-silkroad.png",
  whyUs: "/images/why-travel.jpg",
};

export const DEFAULT_PAGES: PagesContent = {
  photos: DEFAULT_PHOTOS,
  home: {
    badge: pair(UI.en.hero.badge, UI.de.hero.badge),
    titleStart: pair(UI.en.hero.titleStart, UI.de.hero.titleStart),
    titleAccent: pair(UI.en.hero.titleAccent, UI.de.hero.titleAccent),
    text: pair(UI.en.hero.text, UI.de.hero.text),
  },
  about: {
    titleStart: pair(UI.en.about.titleStart, UI.de.about.titleStart),
    titleAccent: pair(UI.en.about.titleAccent, UI.de.about.titleAccent),
    p1: pair(UI.en.about.p1, UI.de.about.p1),
    p2: pair(UI.en.about.p2, UI.de.about.p2),
  },
  services: SERVICES,
  styles: STYLE_INTRO,
  seo: Object.fromEntries(SEO_PAGES.map((page) => [page.key, { title: "", description: "" }])) as Record<SeoPageKey, Seo>,
};
