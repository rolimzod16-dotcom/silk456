"use client";

import { ChevronDown } from "lucide-react";
import { FAQ } from "@/lib/faq";
import { useText } from "@/lib/locale";

export function FaqList() {
  const tx = useText();
  return (
    <section className="bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-3xl space-y-3 px-4 sm:px-6 lg:px-8">
        {FAQ.map((item) => (
          <details key={item.q.en} className="group rounded-2xl border border-border bg-card p-5 open:shadow-sm">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-lg font-semibold text-foreground">
              {tx(item.q)}
              <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 leading-relaxed text-foreground/80">{tx(item.a)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
