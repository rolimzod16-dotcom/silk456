"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TripFinder } from "@/components/site/trip-finder";
import { STYLES, tourMeta } from "@/lib/catalog";
import { useContent } from "@/lib/content-context";
import { useLocale } from "@/lib/locale";
import { useUiStore } from "@/lib/ui-store";

export function Hero() {
  const openBooking = useUiStore((s) => s.openBooking);
  const { ui } = useLocale();
  const { tours } = useContent();
  const t = ui.hero;

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
        src="/images/hero-silkroad.png"
        alt="Camel caravan at sunset along the Silk Road"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/90">{t.badge}</span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {t.titleStart} <span className="text-gold-gradient">{t.titleAccent}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">{t.text}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-white/5 px-5 py-5">
              <div className="font-display text-3xl font-semibold text-white sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/70 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-white/70"
        >
          <span className="text-xs uppercase tracking-[0.2em]">{t.scroll}</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </div>
    </section>
  );
}
