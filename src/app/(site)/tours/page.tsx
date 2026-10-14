import type { Metadata } from "next";
import { ToursCatalog } from "@/components/site/inner-pages";
import { COUNTRIES, DURATIONS, SEASONS, STYLES, type TourFilters } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Tours",
  description: "Silk Road tour packages with accommodation, guides and transfers included.",
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function pick<T extends { id: string }>(list: readonly T[], value: unknown) {
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
  return <ToursCatalog initial={initial} />;
}
