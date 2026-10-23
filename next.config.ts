import type { NextConfig } from "next";
import { legacyRedirects } from "./src/lib/legacy-redirects";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Old addresses from earlier versions of the site, still known to Google.
  async redirects() {
    return legacyRedirects();
  },
  images: {
    // Tour photos uploaded from the admin live in Supabase Storage.
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
};

export default nextConfig;
