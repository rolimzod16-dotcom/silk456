"use client";

import { useState } from "react";
import Image from "next/image";
import { Globe, Instagram } from "lucide-react";
import { useContent } from "@/lib/content-context";
import { useLocale, useText } from "@/lib/locale";
import { isForeignPhoto } from "@/lib/utils";

const COPY = {
  en: {
    eyebrow: "Our team",
    title: "The People Behind Your Journey",
    intro: "A dedicated team of travel professionals, guides and partners who make every journey smooth, safe and memorable.",
    languages: "Languages",
    more: "Read more",
    less: "Show less",
  },
  de: {
    eyebrow: "Unser Team",
    title: "Die Menschen hinter Ihrer Reise",
    intro: "Ein engagiertes Team aus Reiseprofis, Guides und Partnern, das jede Reise reibungslos, sicher und unvergesslich macht.",
    languages: "Sprachen",
    more: "Mehr lesen",
    less: "Weniger anzeigen",
  },
};

/** A long bio is cut to a few lines so the cards stay even; the reader can open it. */
function Bio({ text, more, less }: { text: string; more: string; less: string }) {
  const [open, setOpen] = useState(false);
  const long = text.length > 180;
  return (
    <div className="mt-2">
      <p className={`text-sm leading-relaxed text-muted-foreground ${long && !open ? "line-clamp-4" : ""}`}>{text}</p>
      {long && (
        <button type="button" onClick={() => setOpen(!open)} className="mt-1 text-xs font-semibold text-primary hover:underline">
          {open ? less : more}
        </button>
      )}
    </div>
  );
}

/** People added in the admin; the section stays hidden until there are some. */
export function TeamSection() {
  const { team } = useContent();
  const { locale } = useLocale();
  const tx = useText();
  const t = COPY[locale];
  if (team.length === 0) return null;

  return (
    <section id="team" className="scroll-mt-24 border-t border-border bg-background py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-2 lg:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t.eyebrow}</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">{t.title}</h2>
          </div>
          <p className="max-w-lg text-muted-foreground lg:justify-self-end lg:border-l lg:border-border lg:pl-6">{t.intro}</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article key={member.id} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card card-warm-shadow">
              <div className="relative aspect-[4/3] bg-secondary/50">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    unoptimized={isForeignPhoto(member.photo)}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-display text-5xl text-primary/40">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-display text-lg font-semibold text-foreground">{member.name}</h3>
                {tx(member.role) && (
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary">{tx(member.role)}</p>
                )}
                {tx(member.bio) && <Bio text={tx(member.bio)} more={t.more} less={t.less} />}
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-3">
                  {member.languages && (
                    <p className="inline-flex items-center gap-1.5 text-xs text-foreground/80">
                      <Globe className="h-3.5 w-3.5 text-primary" />
                      <span className="font-semibold">{t.languages}:</span> {member.languages}
                    </p>
                  )}
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name}, Instagram`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <Instagram className="h-3.5 w-3.5" /> Instagram
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
