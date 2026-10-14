import type { MetadataRoute } from "next";
import { COUNTRIES, STYLES } from "@/lib/catalog";
import { SITE_URL } from "@/lib/pages";
import { getContent } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { tours } = await getContent();
  const paths = [
    "",
    "/tours",
    "/destinations",
    "/travel-styles",
    "/services",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    ...tours.map((tour) => `/tours/${tour.slug}`),
    ...COUNTRIES.map((item) => `/destinations/${item.id}`),
    ...STYLES.map((item) => `/travel-styles/${item.id}`),
  ];
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
