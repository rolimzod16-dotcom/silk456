import type { StyleId } from "@/lib/catalog";
import type { Text } from "@/lib/locale";
import { STYLE_INTRO, type Intro } from "@/lib/pages";
import { SERVICES } from "@/lib/services";
import { UI } from "@/lib/ui-text";

/** Static pages whose search title and description can be set in the admin. */
export const SEO_PAGES = [
  { key: "home", label: "Главная", path: "/" },
  { key: "tours", label: "Каталог туров", path: "/tours" },
  { key: "destinations", label: "Направления", path: "/destinations" },
  { key: "travelStyles", label: "Стили путешествий", path: "/travel-styles" },
  { key: "services", label: "Услуги", path: "/services" },
  { key: "about", label: "О нас", path: "/about" },
  { key: "contact", label: "Контакты", path: "/contact" },
  { key: "faq", label: "Вопросы и ответы", path: "/faq" },
] as const;

export type SeoPageKey = (typeof SEO_PAGES)[number]["key"];
export type Seo = { title: string; description: string };
export type ServiceContent = { id: string; title: Text; lead: Text; points: Text[] };

/** Editable texts of the fixed pages; empty fields fall back to the built-in copy. */
export type PagesContent = {
  home: { badge: Text; titleStart: Text; titleAccent: Text; text: Text };
  about: { titleStart: Text; titleAccent: Text; p1: Text; p2: Text };
  services: ServiceContent[];
  styles: Record<StyleId, Intro>;
  seo: Record<SeoPageKey, Seo>;
};

const pair = (en: string, ru: string): Text => ({ en, ru });

export const DEFAULT_PAGES: PagesContent = {
  home: {
    badge: pair(UI.en.hero.badge, UI.ru.hero.badge),
    titleStart: pair(UI.en.hero.titleStart, UI.ru.hero.titleStart),
    titleAccent: pair(UI.en.hero.titleAccent, UI.ru.hero.titleAccent),
    text: pair(UI.en.hero.text, UI.ru.hero.text),
  },
  about: {
    titleStart: pair(UI.en.about.titleStart, UI.ru.about.titleStart),
    titleAccent: pair(UI.en.about.titleAccent, UI.ru.about.titleAccent),
    p1: pair(UI.en.about.p1, UI.ru.about.p1),
    p2: pair(UI.en.about.p2, UI.ru.about.p2),
  },
  services: SERVICES,
  styles: STYLE_INTRO,
  seo: Object.fromEntries(SEO_PAGES.map((page) => [page.key, { title: "", description: "" }])) as Record<SeoPageKey, Seo>,
};
