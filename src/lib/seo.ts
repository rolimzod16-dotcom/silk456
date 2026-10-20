import type { Metadata } from "next";
import { tourMeta } from "@/lib/catalog";
import { SITE_URL } from "@/lib/pages";
import type { SeoPageKey } from "@/lib/pages-content";
import type { SiteSettings } from "@/lib/site-content";
import type { Tour } from "@/lib/tours";

export const SITE_NAME = "Great Silk Trails";
export const DEFAULT_IMAGE = "/images/hero-silkroad.png";

export const absolute = (path: string) => (/^https?:\/\//.test(path) ? path : `${SITE_URL}${path}`);

/** Trims text to a search-snippet length on a word boundary. */
export function snippet(text: string, max = 158) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, clean.lastIndexOf(" ", max - 1))}…`;
}

/**
 * Per-page metadata: canonical URL plus complete Open Graph / Twitter tags
 * (Next replaces the parent's openGraph object rather than merging it).
 */
export function pageMeta({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} — ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: snippet(description),
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description: snippet(description, 200),
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: snippet(description, 200),
      images: [image],
    },
  };
}

/** Metadata for a fixed page, using the SEO texts set in the admin when present. */
export async function staticPageMeta(key: SeoPageKey, fallback: Parameters<typeof pageMeta>[0]): Promise<Metadata> {
  const { getContent } = await import("@/lib/content");
  const seo = (await getContent()).pages.seo[key];
  return pageMeta({
    ...fallback,
    title: seo?.title || fallback.title,
    description: seo?.description || fallback.description,
  });
}

export function tourTitle(tour: Tour) {
  return `${tour.title}: ${tour.days}-Day ${tour.country} Tour`;
}

export function tourDescription(tour: Tour) {
  const sights = tour.highlights.slice(0, 3).join(", ");
  return `${tour.subtitle}. ${tour.days} days from $${tour.price} per person${sights ? `: ${sights}` : ""}. Small groups, local guides, no prepayment.`;
}

// ---------- structured data (schema.org JSON-LD) ----------

export function organizationLd(settings: SiteSettings) {
  const sameAs = [settings.instagram, settings.facebook, settings.youtube, settings.telegram].filter(Boolean);
  return [
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "@id": `${SITE_URL}/#agency`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: absolute("/brand/logo.png"),
      image: absolute(DEFAULT_IMAGE),
      description:
        "Small-group and private Silk Road tours across Uzbekistan, Tajikistan, Kyrgyzstan, Kazakhstan, Turkmenistan, Iran, China and Mongolia.",
      ...(settings.phone && { telephone: settings.phone }),
      ...(settings.email && { email: settings.email }),
      ...(settings.address && { address: { "@type": "PostalAddress", streetAddress: settings.address } }),
      areaServed: ["Uzbekistan", "Tajikistan", "Kyrgyzstan", "Kazakhstan", "Turkmenistan", "Iran", "China", "Mongolia"],
      knowsLanguage: ["en", "ru"],
      ...(sameAs.length && { sameAs }),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#agency` },
    },
  ];
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function tourLd(tour: Tour) {
  const url = absolute(`/tours/${tour.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${url}#trip`,
    name: tour.title,
    description: tour.description || tour.subtitle,
    url,
    image: absolute(tour.image),
    touristType: tourMeta(tour).styles,
    itinerary: {
      "@type": "ItemList",
      numberOfItems: tour.itinerary.length,
      itemListElement: tour.itinerary.map((day) => ({
        "@type": "ListItem",
        position: day.day,
        item: { "@type": "TouristAttraction", name: day.title, description: day.description },
      })),
    },
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url,
      seller: { "@id": `${SITE_URL}/#agency` },
    },
    provider: { "@id": `${SITE_URL}/#agency` },
  };
}

export function tourListLd(name: string, tours: Tour[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: tours.length,
    itemListElement: tours.map((tour, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absolute(`/tours/${tour.slug}`),
      name: tour.title,
    })),
  };
}
