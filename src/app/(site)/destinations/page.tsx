import type { Metadata } from "next";
import { staticPageMeta } from "@/lib/seo";
import { CollectionIndex } from "@/components/site/inner-pages";
import { getContent } from "@/lib/content";
import { countryCollections } from "@/lib/pages";

export async function generateMetadata(): Promise<Metadata> {
  return staticPageMeta("destinations", {
  title: "Silk Road Destinations: Central Asia, Iran, China & Mongolia",
  description:
    "Explore Silk Road destinations — Uzbekistan, Tajikistan, Kyrgyzstan, Kazakhstan, Turkmenistan, Iran, China and Mongolia — and the tours we run in each country.",
  path: "/destinations",
});
}

export default async function DestinationsPage() {
  const { tours } = await getContent();
  return <CollectionIndex kind="destinations" items={countryCollections(tours)} />;
}
