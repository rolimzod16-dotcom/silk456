import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionDetail } from "@/components/site/inner-pages";
import { STYLES } from "@/lib/catalog";
import { styleCollection } from "@/lib/pages";

type Props = { params: Promise<{ style: string }> };

export function generateStaticParams() {
  return STYLES.map((item) => ({ style: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = styleCollection((await params).style);
  if (!collection) return {};
  return {
    title: `${collection.label.en} tours`,
    description: collection.text.en,
  };
}

export default async function TravelStylePage({ params }: Props) {
  const collection = styleCollection((await params).style);
  if (!collection) notFound();
  return <CollectionDetail collection={collection} />;
}
