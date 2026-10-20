import type { Metadata } from "next";
import { staticPageMeta } from "@/lib/seo";
import { CollectionIndex } from "@/components/site/inner-pages";
import { getContent } from "@/lib/content";
import { styleCollections } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  return staticPageMeta("travelStyles", {
  title: "Silk Road Travel Styles: 4x4, Trekking, Motorcycle & Culture",
  description:
    "Choose how to travel the Silk Road: overland 4x4, trekking, motorcycle, culture and cities, horse riding or photography tours.",
  path: "/travel-styles",
});
}

export default async function TravelStylesPage() {
  const { tours, pages } = await getContent();
  return <CollectionIndex kind="travel-styles" items={styleCollections(tours, pages.styles)} />;
}
