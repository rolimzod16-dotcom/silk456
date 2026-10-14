import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TourPage } from "@/components/site/tour-page";
import { tourMeta } from "@/lib/catalog";
import { getContent, getTour } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tour = await getTour((await params).slug);
  if (!tour) return {};
  return {
    title: tour.title,
    description: `${tour.subtitle}. ${tour.duration}, from $${tour.price}.`,
    openGraph: { title: tour.title, description: tour.subtitle, images: [tour.image] },
  };
}

export default async function TourDetailPage({ params }: Props) {
  const tour = await getTour((await params).slug);
  if (!tour) notFound();

  // Prefer tours that share a country, then fill up with the rest.
  const countries = tourMeta(tour).countries;
  const shares = (item: typeof tour) => tourMeta(item).countries.some((c) => countries.includes(c));
  const others = (await getContent()).tours.filter((item) => item.slug !== tour.slug);
  const related = [...others.filter(shares), ...others.filter((item) => !shares(item))].slice(0, 3);

  return <TourPage tour={tour} related={related} />;
}
