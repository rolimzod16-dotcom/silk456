import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionDetail } from "@/components/site/inner-pages";
import { getContent } from "@/lib/content";
import { countryCollection } from "@/lib/pages";

type Props = { params: Promise<{ country: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = countryCollection((await params).country, (await getContent()).tours);
  if (!collection) return {};
  return {
    title: `${collection.label.en} tours`,
    description: collection.text.en,
  };
}

export default async function DestinationPage({ params }: Props) {
  const collection = countryCollection((await params).country, (await getContent()).tours);
  if (!collection) notFound();
  return <CollectionDetail collection={collection} />;
}
