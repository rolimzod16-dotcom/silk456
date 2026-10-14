import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionDetail } from "@/components/site/inner-pages";
import { COUNTRIES } from "@/lib/catalog";
import { countryCollection } from "@/lib/pages";

type Props = { params: Promise<{ country: string }> };

export function generateStaticParams() {
  return COUNTRIES.map((item) => ({ country: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = countryCollection((await params).country);
  if (!collection) return {};
  return {
    title: `${collection.label.en} tours`,
    description: collection.text.en,
  };
}

export default async function DestinationPage({ params }: Props) {
  const collection = countryCollection((await params).country);
  if (!collection) notFound();
  return <CollectionDetail collection={collection} />;
}
