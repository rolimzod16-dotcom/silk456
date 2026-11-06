"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TripFinder } from "@/components/site/trip-finder";
import { STYLES, tourMeta } from "@/lib/catalog";
import { useContent } from "@/lib/content-context";
import { useLocale, useText } from "@/lib/locale";
import { useUiStore } from "@/lib/ui-store";
import { isForeignPhoto } from "@/lib/utils";

export function Hero() {
  const openBooking = useUiStore((s) => s.openBooking);
  const { ui } = useLocale();
  const { tours, pages } = useContent();
  const tx = useText();
  const t = ui.hero;
  const home = pages.home;

  // Figures come from the live catalogue, so they stay true as tours change.
  const countries = new Set(tours.flatMap((tour) => tourMeta(tour).countries)).size;
  const stats = [
    { value: String(tours.length), label: t.statRoutes },
    { value: String(countries), label: t.statCountries },
    { value: String(STYLES.length), label: t.statStyles },
    { value: "$0", label: t.statPrepay },
  ];

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden scroll-mt-24">
      <Image
        src={pages.photos.hero}
        unoptimized={isForeignPhoto(pages.photos.hero)}
        alt="Camel caravan at sunset along the Silk Road"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Dark behind the text on the left, the photo stays clear on the right. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/0" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/50 to-black/0" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col px-4 pt-28 pb-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/90">{tx(home.badge)}</span>
          </div>

          <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {tx(home.titleStart)} <span className="block text-gold-gradient">{tx(home.titleAccent)}</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">{tx(home.text)}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="text-base">
              <Link href="/tours">{t.viewTours}</Link>
            </Button>
            <Button
              onClick={() => openBooking()}
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/10 text-base text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
            >
              {t.plan}
            </Button>
          </div>

          <TripFinder />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="mx-auto mt-auto grid w-full max-w-5xl grid-cols-2 overflow-hidden rounded-2xl border border-white/15 bg-[#3a2416]/55 pt-px backdrop-blur-md sm:grid-cols-4 lg:mt-10"
        >
          {stats.map((s, index) => (
            <div
              key={s.label}
              className={`px-6 py-5 sm:px-8 ${index % 2 ? "border-l border-white/15" : ""} ${index > 1 ? "border-t border-white/15 sm:border-t-0" : ""} ${index === 2 ? "sm:border-l" : ""}`}
            >
              <div className="font-display text-3xl font-semibold text-white sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.15em] text-white/75">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
