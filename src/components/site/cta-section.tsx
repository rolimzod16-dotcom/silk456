"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale";
import { useUiStore } from "@/lib/ui-store";

export function CtaSection() {
  const openBooking = useUiStore((s) => s.openBooking);
  const { ui } = useLocale();
  const t = ui.cta;

  return (
    <section className="relative overflow-hidden">
      <div className="relative isolate">
        <Image src="/images/hero-silkroad.png" alt="Camel caravan on the Silk Road" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-spice-dark/80" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{t.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">{t.title}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/80 sm:text-lg">{t.text}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" onClick={() => openBooking()} className="gap-2 text-base">
                {t.book} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/10 text-base text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              >
                <Link href="/contact">{t.ask}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
