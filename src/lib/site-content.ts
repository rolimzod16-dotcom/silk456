import type { Testimonial } from "@/lib/testimonials";
import type { Tour } from "@/lib/tours";

/** Editable site-wide details (contacts, socials). Safe to import on the client. */
export type SiteSettings = {
  brandName: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  instagram: string;
  facebook: string;
  youtube: string;
  telegram: string;
  whatsapp: string;
};

export type SiteContent = {
  tours: Tour[];
  testimonials: Testimonial[];
  settings: SiteSettings;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  brandName: "Great Silk Trails",
  phone: "",
  email: "",
  address: "",
  hours: "",
  instagram: "",
  facebook: "",
  youtube: "",
  telegram: "",
  whatsapp: "",
};

export const SETTINGS_FIELDS: { key: keyof SiteSettings; label: string; hint?: string }[] = [
  { key: "brandName", label: "Название компании", hint: "Показывается в футере" },
  { key: "phone", label: "Телефон" },
  { key: "email", label: "Email" },
  { key: "address", label: "Адрес офиса" },
  { key: "hours", label: "Часы работы" },
  { key: "instagram", label: "Instagram", hint: "Полная ссылка, https://…" },
  { key: "facebook", label: "Facebook", hint: "Полная ссылка" },
  { key: "youtube", label: "YouTube", hint: "Полная ссылка" },
  { key: "telegram", label: "Telegram", hint: "Ссылка вида https://t.me/…" },
  { key: "whatsapp", label: "WhatsApp", hint: "Ссылка вида https://wa.me/992XXXXXXXXX — включает кнопку WhatsApp на сайте" },
];

export function phoneHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
}
