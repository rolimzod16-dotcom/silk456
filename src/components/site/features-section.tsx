"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Users,
  MapPinned,
  Compass,
  Wallet,
  Headphones,
} from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Safety first",
    text: "Every route is risk-assessed, guides are certified, a coordinator is on call 24/7 and insurance is included in the packages.",
  },
  {
    icon: Users,
    title: "Small groups",
    text: "From 6 to 14 people. No 50-seat buses — just living dialogue and attention to every traveler.",
  },
  {
    icon: MapPinned,
    title: "Original routes",
    text: "We drive every kilometer ourselves before launching a tour. Unusual stops, secret viewpoints and local masters.",
  },
  {
    icon: Compass,
    title: "Expert enthusiast guides",
    text: "Historians, ethnographers and photographers. They don't read Wikipedia — they share what they learned on expeditions.",
  },
  {
    icon: Wallet,
    title: "Honest pricing",
    text: "Everything is in the package — transfers, accommodation, tickets, guides and most dinners. No hidden extras on the ground.",
  },
  {
    icon: Headphones,
    title: "24/7 support",
    text: "A personal coordinator for your whole tour. Flight delayed, luggage lost — we handle it while you sip tea.",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="why"
      className="relative border-y border-border bg-secondary/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Why Us
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
            The Silk Road, with no surprises
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Twelve years ago we realized: a journey along this route takes not
            a ticket, but a guide. So we became one.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.05, 0.25) }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
