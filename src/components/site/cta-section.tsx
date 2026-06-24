"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/lib/ui-store";

export function CtaSection() {
  const openBooking = useUiStore((s) => s.openBooking);

  return (
    <section className="relative overflow-hidden">
      <div className="relative isolate">
        <Image
          src="/images/hero-silkroad.png"
          alt="Caravan on the Silk Road"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-spice-dark/80" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Your caravan awaits
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
              Ready to set off on the Silk Road?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
              Book a spot in a small group or order a custom itinerary. No
              prepayment required — pay after confirming the details with a
              manager.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() => openBooking()}
                className="gap-2 text-base"
              >
                Book a Tour <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white text-base"
              >
                <a href="#contact">Ask a Question</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
