import type { Metadata } from "next";
import { CollectionIndex } from "@/components/site/inner-pages";
import { styleCollections } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Travel styles",
  description: "Overland 4x4, trekking, motorcycle, culture, horse riding and photography tours on the Silk Road.",
};

export default function TravelStylesPage() {
  return <CollectionIndex kind="travel-styles" items={styleCollections()} />;
}
