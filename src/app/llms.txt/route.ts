import { COUNTRIES, STYLES } from "@/lib/catalog";
import { getContent } from "@/lib/content";
import { SITE_URL } from "@/lib/pages";
import { SITE_NAME, tourTitle } from "@/lib/seo";

// Built on every request, like the sitemap, so tours edited in the admin show up at once.
export const dynamic = "force-dynamic";

/** /llms.txt — a plain-text map of the site for AI assistants (llmstxt.org). */
export async function GET() {
  const { tours } = await getContent();
  const link = (name: string, path: string, note?: string) => `- [${name}](${SITE_URL}${path})${note ? `: ${note}` : ""}`;

  const text = [
    `# ${SITE_NAME}`,
    "",
    "> Tour operator based in Dushanbe, Tajikistan. Small-group and private Silk Road tours across Tajikistan, Uzbekistan, Kyrgyzstan, Kazakhstan and Western China: Pamir Highway 4x4 and motorcycle trips, Fann Mountains treks, Silk Road city tours. Local guides and drivers, GBAO permits and visa support.",
    "",
    "## Tours",
    ...tours.map((tour) => link(tourTitle(tour), `/tours/${tour.slug}`, `${tour.subtitle}. From $${tour.price} per person.`)),
    "",
    "## Destinations",
    ...COUNTRIES.map((country) => link(`${country.en} tours`, `/destinations/${country.id}`)),
    "",
    "## Travel styles",
    ...STYLES.map((style) => link(style.en, `/travel-styles/${style.id}`)),
    "",
    "## About and planning",
    link("Services", "/services", "4x4 transport, drivers and guides, visa assistance, GBAO permits, custom itineraries"),
    link("FAQ", "/faq", "visas, Pamir permits, seasons, accommodation, bookings"),
    link("About", "/about"),
    link("Contact", "/contact"),
    "",
  ].join("\n");

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
