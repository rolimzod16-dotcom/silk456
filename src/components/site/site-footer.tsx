"use client";

import Link from "next/link";
import { Compass, Phone, Mail, MapPin } from "lucide-react";

const TOUR_LINKS = [
  { label: "Samarkand Gold", href: "#tours" },
  { label: "Kashgar Caravan", href: "#tours" },
  { label: "Charyn & Heavenly Mountains", href: "#tours" },
  { label: "Persian Silk Roads", href: "#tours" },
  { label: "Greater Turkestan", href: "#tours" },
];

const COMPANY_LINKS = [
  { label: "About", href: "#about" },
  { label: "Why Us", href: "#why" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-spice-dark text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-accent">
                <Compass className="h-5 w-5" />
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-semibold text-white">
                  Silk Caravan
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                  Silk Road Tours
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Boutique tours along the ancient Silk Road since 2013. Small
              groups, expert guides and living stories on every kilometer.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a href="tel:+14155550142" className="flex items-center gap-2 text-white/70 hover:text-accent">
                <Phone className="h-4 w-4" /> +1 (415) 555-0142
              </a>
              <a href="mailto:hello@silkcaravan.tours" className="flex items-center gap-2 text-white/70 hover:text-accent">
                <Mail className="h-4 w-4" /> hello@silkcaravan.tours
              </a>
              <div className="flex items-center gap-2 text-white/70">
                <MapPin className="h-4 w-4" /> 221 Samarkand St, Suite 5
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Tours
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {TOUR_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/70 transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/70 transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-white/70">
              New routes, departure dates and seasonal deals — once a month.
            </p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                OK
              </button>
            </form>
            <div className="mt-5 flex gap-3">
              {["IG", "FB", "YT", "X"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-xs font-semibold text-white/70 transition-colors hover:border-accent hover:text-accent"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Silk Caravan. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-accent">Privacy Policy</Link>
            <Link href="#" className="hover:text-accent">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
