import type { Metadata } from "next";
import { ToursCatalog } from "@/components/site/inner-pages";
import { COUNTRIES, DURATIONS, SEASONS, STYLES, type TourFilters } from "@/lib/catalog";
import { JsonLd } from "@/components/site/json-ld";
import { getContent } from "@/lib/content";
import { breadcrumbLd, pageMeta, tourListLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { tours } = await getContent();
  return pageMeta({
    title: "Silk Road Tour Packages & Itineraries",
    description: `${tours.length} Silk Road itineraries across Uzbekistan, Tajikistan, Kyrgyzstan, Kazakhstan, Turkmenistan, Iran, China and Mongolia. Hotels, guides and transfers included — filter by season, length or country.`,
    path: "/tours",
  });
}

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function pick<T extends string>(list: readonly { id: T }[], value: unknown): T | null {
  return list.find((item) => item.id === value)?.id ?? null;
}

export default async function ToursPage({ searchParams }: Props) {
  const query = await searchParams;
  const initial: Partial<TourFilters> = {
    country: pick(COUNTRIES, query.country),
    style: pick(STYLES, query.style),
    season: pick(SEASONS, query.season),
    duration: pick(DURATIONS, query.duration),
  };
  const { tours } = await getContent();
  return (
    <>
      <JsonLd data={[tourListLd("Silk Road tour packages", tours), breadcrumbLd([{ name: "Tours", path: "/tours" }])]} />
      <ToursCatalog initial={initial} />
    </>
  );
}
