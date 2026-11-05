"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { useContent } from "@/lib/content-context";
import { useLocale, useText } from "@/lib/locale";
import { isForeignPhoto } from "@/lib/utils";

const COPY = {
  en: { eyebrow: "Our team", title: "The people behind your journey", languages: "Languages" },
  ru: { eyebrow: "Наша команда", title: "Люди, которые стоят за вашим путешествием", languages: "Языки" },
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
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{COPY[locale].eyebrow}</span>
        <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">{COPY[locale].title}</h2>
        {/* The first two people, usually the owners, get the wider cards. */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <article
              key={member.id}
              className={`overflow-hidden rounded-2xl border border-border bg-card card-warm-shadow ${index < 2 ? "lg:col-span-2" : ""}`}
            >
              <div className="relative aspect-[4/3] bg-secondary/50">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    unoptimized={isForeignPhoto(member.photo)}
                    alt={member.name}
                    fill
                    sizes={index < 2 ? "(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-display text-5xl text-primary/40">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="p-5">
                {tx(member.role) && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">{tx(member.role)}</p>
                )}
                <h3 className="mt-1.5 font-display text-xl font-semibold text-foreground">{member.name}</h3>
                {tx(member.bio) && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tx(member.bio)}</p>}
                {member.languages && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {COPY[locale].languages}: {member.languages}
                  </p>
                )}
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}, Instagram`}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    <Instagram className="h-4 w-4" /> Instagram
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
