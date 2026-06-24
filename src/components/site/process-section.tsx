"use client";

import { motion } from "framer-motion";
import { MessagesSquare, Route, Plane, Map } from "lucide-react";

const STEPS = [
  {
    icon: MessagesSquare,
    step: "01",
    title: "Request & call",
    text: "You submit a request — a manager calls within 24 hours, clarifies your wishes and helps choose a route.",
  },
  {
    icon: Map,
    step: "02",
    title: "Route planning",
    text: "We agree on dates, group size and add-ons (single room, extra nights, photo tour). We send the contract.",
  },
  {
    icon: Plane,
    step: "03",
    title: "Preparation",
    text: "We help with visas and flights, send a packing checklist and a welcome briefing pack.",
  },
  {
    icon: Route,
    step: "04",
    title: "Off you go!",
    text: "We meet you at the airport, hand you over to the guide — and the caravan sets off. On call 24/7 throughout.",
  },
];

export function ProcessSection() {
  return (
    <section className="relative bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            How We Work
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
            From request to caravan — four steps
          </h2>
        </div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />
          {STEPS.map((s, idx) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.1, 0.4) }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary/20 bg-background p-5">
                <s.icon className="h-7 w-7 text-primary" />
                <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary font-display text-xs font-bold text-primary-foreground">
                  {s.step}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
