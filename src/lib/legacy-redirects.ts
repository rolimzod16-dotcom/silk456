/**
 * Addresses from earlier versions of greatsilktrails.com that Google still knows:
 * an old WordPress (Traveler theme) site and a previous Next.js site with /en and /ru.
 * Each maps to the closest page of the current site.
 */

type Rule = { source: string; destination: string };

const SERVICE_SLUGS: Record<string, string> = {
  "transport-rental": "transport",
  "transport-car-rental": "transport",
  "car-rental": "transport",
  "drivers-guides": "guides",
  "drivers-and-guides": "guides",
  guides: "guides",
  "visa-support": "visa",
  visa: "visa",
  "permits-gbao": "permits",
  permits: "permits",
  "permits-special-access": "permits",
  accommodation: "stay",
  "accommodation-logistics": "stay",
  "tailor-made": "tailor",
  "tailor-made-routes": "tailor",
};

const services: Rule[] = Object.entries(SERVICE_SLUGS).flatMap(([slug, id]) => [
  { source: `/services/${slug}`, destination: `/services#${id}` },
  { source: `/${slug}`, destination: `/services#${id}` },
]);

const pages: Rule[] = [
  // previous Next.js site
  { source: "/journeys", destination: "/tours" },
  { source: "/journeys/:slug", destination: "/tours/:slug" },
  { source: "/tour/:slug", destination: "/tours/:slug" },
  { source: "/destination/:slug", destination: "/destinations/:slug" },
  { source: "/styles", destination: "/travel-styles" },
  { source: "/styles/:slug", destination: "/travel-styles/:slug" },
  { source: "/about-us", destination: "/about" },
  { source: "/portfolio", destination: "/about" },
  { source: "/portfolio/:path*", destination: "/about" },
  { source: "/contacts", destination: "/contact" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/cookies", destination: "/privacy" },
  { source: "/cookie-policy", destination: "/privacy" },
  { source: "/privacy-policy", destination: "/privacy" },
  { source: "/cancellation", destination: "/terms" },
  { source: "/cancellation-policy", destination: "/terms" },
  { source: "/terms-and-conditions", destination: "/terms" },
  { source: "/terms-of-service", destination: "/terms" },
  // old WordPress travel theme
  { source: "/st_tour", destination: "/tours" },
  { source: "/st_tour/:path*", destination: "/tours" },
  { source: "/st_activity/:path*", destination: "/tours" },
  { source: "/st_hotel/:path*", destination: "/tours" },
  { source: "/st_rental/:path*", destination: "/tours" },
  { source: "/st_cars/:path*", destination: "/tours" },
  { source: "/st_location/:slug", destination: "/destinations/:slug" },
  { source: "/st_location/:slug/:rest*", destination: "/destinations/:slug" },
  { source: "/tour-search-sidebar", destination: "/tours" },
  { source: "/tour-search", destination: "/tours" },
  { source: "/search-result", destination: "/tours" },
  { source: "/category/:path*", destination: "/" },
  { source: "/tag/:path*", destination: "/" },
  { source: "/author/:path*", destination: "/" },
  { source: "/page/:n", destination: "/" },
];

const LEGACY = [...services, ...pages];

/** Language prefixes used by the earlier sites; the current site has one URL per page. */
const LANGS = ["en", "ru", "fr", "de", "es", "it", "zh", "tr", "ar"];

export function legacyRedirects() {
  return [
    ...LANGS.flatMap((lang) => [
      ...LEGACY.map((r) => ({ ...r, source: `/${lang}${r.source}`, permanent: true })),
      { source: `/${lang}`, destination: "/", permanent: true },
      { source: `/${lang}/:path*`, destination: "/:path*", permanent: true },
    ]),
    ...LEGACY.map((r) => ({ ...r, permanent: true })),
  ];
}
