"use client";

import { useLocale } from "@/lib/locale";

export function ServicesSection() {
  const { t } = useLocale();

  return (
    <section id="services" className="scroll-mt-24 bg-[#faf5eb] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
            {t.servicesHeading}
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t.servicesText}</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.map((item) => (
            <article key={item.id} className="rounded-2xl border border-[#d4a82a]/25 bg-white p-5">
              <h3 className="font-display text-xl font-semibold text-[#0f1225]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
