import type { MetadataRoute } from "next";
import { COUNTRIES, STYLES, tourMeta } from "@/lib/catalog";
import { getContent } from "@/lib/content";
import { SITE_URL } from "@/lib/pages";
import { absolute } from "@/lib/seo";

type Entry = MetadataRoute.Sitemap[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { tours } = await getContent();
  const page = (path: string, priority: number, changeFrequency: Entry["changeFrequency"], images?: string[]): Entry => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
    ...(images?.length && { images: images.map(absolute) }),
  });
  const imagesFor = (match: (tour: (typeof tours)[number]) => boolean) =>
    [...new Set(tours.filter(match).map((tour) => tour.image))];

  return [
    page("", 1, "weekly", ["/images/hero-silkroad.png"]),
    page("/tours", 0.9, "weekly", imagesFor(() => true)),
    ...tours.map((tour) => page(`/tours/${tour.slug}`, 0.8, "monthly", [tour.image])),
    page("/destinations", 0.8, "monthly"),
    ...COUNTRIES.map((c) => page(`/destinations/${c.id}`, 0.7, "monthly", imagesFor((t) => tourMeta(t).countries.includes(c.id)))),
    page("/travel-styles", 0.7, "monthly"),
    ...STYLES.map((s) => page(`/travel-styles/${s.id}`, 0.6, "monthly", imagesFor((t) => tourMeta(t).styles.includes(s.id)))),
    page("/services", 0.6, "monthly"),
    page("/about", 0.6, "monthly", ["/images/about-bazaar.png"]),
    page("/faq", 0.6, "monthly"),
    page("/contact", 0.6, "yearly"),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
