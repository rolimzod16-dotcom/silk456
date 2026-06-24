"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/lib/testimonials";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section
      id="testimonials"
      className="relative border-y border-border bg-secondary/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Отзывы путешественников
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
            Истории тех, кто уже прошёл путь
          </h2>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">4.9 / 5</span>
            <span className="text-sm text-muted-foreground">· 820+ отзывов</span>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.06, 0.3) }}
              className="relative flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/15" />
              <div className="flex">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">
                «{t.text}»
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-semibold text-primary">
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-foreground">
                    {t.name}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {t.location} · {t.date}
                  </div>
                </div>
              </figcaption>
              <div className="mt-3 inline-flex w-fit items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
                Тур: {t.tour}
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
