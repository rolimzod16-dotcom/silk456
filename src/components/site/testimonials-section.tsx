"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useLocale } from "@/lib/locale";
import type { Testimonial } from "@/lib/testimonials";

/** Real reviews added in the admin; the section stays hidden until there are some. */
export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const { ui } = useLocale();
  const t = ui.testimonials;
  if (testimonials.length === 0) return null;

  const average = testimonials.reduce((sum, item) => sum + item.rating, 0) / testimonials.length;

  return (
    <section id="testimonials" className="relative scroll-mt-24 border-y border-border bg-secondary/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t.eyebrow}</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">{t.title}</h2>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-semibold text-foreground">{average.toFixed(1)} / 5</span>
            <span className="text-sm text-muted-foreground">· {t.reviews(testimonials.length)}</span>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, idx) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.06, 0.3) }}
              className="relative flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/15" />
              <div className="flex" aria-label={`${item.rating} / 5`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">“{item.text}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-semibold text-primary">
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-foreground">{item.name}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {[item.location, item.date].filter(Boolean).join(" · ")}
                  </div>
                </div>
              </figcaption>
              {item.tour && (
                <div className="mt-3 inline-flex w-fit items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
                  {t.tour}: {item.tour}
                </div>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
