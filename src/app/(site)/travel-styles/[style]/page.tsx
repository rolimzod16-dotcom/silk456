import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionDetail } from "@/components/site/inner-pages";
import { getContent } from "@/lib/content";
import { styleCollection } from "@/lib/pages";

type Props = { params: Promise<{ style: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = styleCollection((await params).style, (await getContent()).tours);
  if (!collection) return {};
  return {
    title: `${collection.label.en} tours`,
    description: collection.text.en,
  };
}

export default async function TravelStylePage({ params }: Props) {
  const collection = styleCollection((await params).style, (await getContent()).tours);
  if (!collection) notFound();
  return <CollectionDetail collection={collection} />;
}
