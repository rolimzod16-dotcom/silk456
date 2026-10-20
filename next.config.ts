import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Old addresses from earlier versions of the site, still known to Google.
  async redirects() {
    const old = [
      { source: "/journeys", destination: "/tours" },
      { source: "/journeys/:slug", destination: "/tours/:slug" },
      { source: "/tour/:slug", destination: "/tours/:slug" },
      { source: "/destination/:slug", destination: "/destinations/:slug" },
      { source: "/styles", destination: "/travel-styles" },
      { source: "/styles/:slug", destination: "/travel-styles/:slug" },
      { source: "/about-us", destination: "/about" },
      { source: "/contacts", destination: "/contact" },
      { source: "/contact-us", destination: "/contact" },
    ];
    return [
      // Language-prefixed paths (/en/..., /ru/...) map to the same page without the prefix.
      ...["en", "ru"].flatMap((lang) => [
        ...old.map((r) => ({ ...r, source: `/${lang}${r.source}`, permanent: true })),
        { source: `/${lang}`, destination: "/", permanent: true },
        { source: `/${lang}/:path*`, destination: "/:path*", permanent: true },
      ]),
      ...old.map((r) => ({ ...r, permanent: true })),
    ];
  },
  images: {
    // Tour photos uploaded from the admin live in Supabase Storage.
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
};

export default nextConfig;
