"use client";

import Image from "next/image";
import { useContent } from "@/lib/content-context";
import { useLocale, useText } from "@/lib/locale";

const COPY = {
  en: { eyebrow: "Our team", title: "The people behind your journey" },
  ru: { eyebrow: "Наша команда", title: "Люди, которые стоят за вашим путешествием" },
};

/** People added in the admin; the section stays hidden until there are some. */
export function TeamSection() {
  const { team } = useContent();
  const { locale } = useLocale();
  const tx = useText();
  if (team.length === 0) return null;

  return (
    <section id="team" className="scroll-mt-24 bg-background pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{COPY[locale].eyebrow}</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">{COPY[locale].title}</h2>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {team.map((member) => (
            <article
              key={member.id}
              className="w-full overflow-hidden rounded-2xl border border-border bg-card card-warm-shadow sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
            >
              <div className="relative aspect-[4/5] bg-secondary/50">
                {member.photo ? (
                  <Image src={member.photo} alt={member.name} fill unoptimized className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center font-display text-5xl text-primary/40">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold text-foreground">{member.name}</h3>
                {tx(member.role) && <p className="mt-0.5 text-sm font-medium text-primary">{tx(member.role)}</p>}
                {tx(member.bio) && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tx(member.bio)}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
