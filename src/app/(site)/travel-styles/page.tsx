import type { Metadata } from "next";
import { CollectionIndex } from "@/components/site/inner-pages";
import { getContent } from "@/lib/content";
import { styleCollections } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Travel styles",
  description: "Overland 4x4, trekking, motorcycle, culture, horse riding and photography tours on the Silk Road.",
};

export default async function TravelStylesPage() {
  const { tours } = await getContent();
  return <CollectionIndex kind="travel-styles" items={styleCollections(tours)} />;
}
