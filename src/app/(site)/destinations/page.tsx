import type { Metadata } from "next";
import { CollectionIndex } from "@/components/site/inner-pages";
import { countryCollections } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Silk Road destinations: Uzbekistan, Tajikistan, Kyrgyzstan, Kazakhstan, China, Iran, Turkmenistan and Mongolia.",
};

export default function DestinationsPage() {
  return <CollectionIndex kind="destinations" items={countryCollections()} />;
}
