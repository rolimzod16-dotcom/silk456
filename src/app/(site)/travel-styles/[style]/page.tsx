import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { CollectionDetail } from "@/components/site/inner-pages";
import { getContent } from "@/lib/content";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbLd, pageMeta, tourListLd } from "@/lib/seo";
import { styleCollection } from "@/lib/pages";

type Props = { params: Promise<{ style: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = styleCollection((await params).style, (await getContent()).tours, (await getContent()).pages.styles);
  if (!collection) return {};
  const count = collection.tours.length;
  return pageMeta({
    title: `${collection.label.en} Tours on the Silk Road`,
    description: `${collection.text.en}${count ? ` ${count} ready-made ${count === 1 ? "itinerary" : "itineraries"} with local guides.` : " Private routes built to order."}`,
    path: `/travel-styles/${collection.id}`,
    image: collection.image,
  });
}

export default async function TravelStylePage({ params }: Props) {
  const collection = styleCollection((await params).style, (await getContent()).tours, (await getContent()).pages.styles);
  if (!collection) permanentRedirect("/travel-styles"); // unknown or old slug
  return (
    <>
      <JsonLd
        data={[
          tourListLd(`${collection.label.en} tours`, collection.tours),
          breadcrumbLd([
            { name: "Travel styles", path: "/travel-styles" },
            { name: collection.label.en, path: `/travel-styles/${collection.id}` },
          ]),
        ]}
      />
      <CollectionDetail collection={collection} />
    </>
  );
}
