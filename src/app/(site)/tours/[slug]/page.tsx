import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TourPage } from "@/components/site/tour-page";
import { tourMeta } from "@/lib/catalog";
import { getTourBySlug, tours } from "@/lib/tours";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tour = getTourBySlug((await params).slug);
  if (!tour) return {};
  return {
    title: tour.title,
    description: `${tour.subtitle}. ${tour.duration}, from $${tour.price}.`,
    openGraph: { title: tour.title, description: tour.subtitle, images: [tour.image] },
  };
}

export default async function TourDetailPage({ params }: Props) {
  const tour = getTourBySlug((await params).slug);
  if (!tour) notFound();

  // Prefer tours that share a country, then fill up with the rest.
  const countries = tourMeta(tour).countries;
  const others = tours.filter((item) => item.slug !== tour.slug);
  const related = [
    ...others.filter((item) => tourMeta(item).countries.some((c) => countries.includes(c))),
    ...others.filter((item) => !tourMeta(item).countries.some((c) => countries.includes(c))),
  ].slice(0, 3);

  return <TourPage tour={tour} related={related} />;
}
