"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useContent } from "@/lib/content-context";
import { phoneHref } from "@/lib/site-content";

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Why Us", href: "/about#why" },
  { label: "Reviews", href: "/about#testimonials" },
  { label: "Destinations", href: "/destinations" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  const { tours, settings } = useContent();
  const tourLinks = [
    ...tours.slice(0, 5).map((tour) => ({ label: tour.title, href: `/tours/${tour.slug}` })),
    { label: "All tours →", href: "/tours" },
  ];
  const socials = [
    { label: "IG", name: "Instagram", href: settings.instagram },
    { label: "FB", name: "Facebook", href: settings.facebook },
    { label: "YT", name: "YouTube", href: settings.youtube },
    { label: "TG", name: "Telegram", href: settings.telegram },
    { label: "WA", name: "WhatsApp", href: settings.whatsapp },
  ].filter((item) => item.href);
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter",
          email,
          subject: "Newsletter subscription",
          message: `Subscribe ${email} to the newsletter.`,
        }),
      });
      if (!res.ok) throw new Error();
      setEmail("");
      toast({ title: "You're subscribed", description: "New routes and dates — once a month." });
    } catch {
      toast({ title: "Failed to subscribe", description: "Please try again later.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  }

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
                  {settings.brandName}
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
              {settings.phone && (
                <a href={phoneHref(settings.phone)} className="flex items-center gap-2 text-white/70 hover:text-accent">
                  <Phone className="h-4 w-4" /> {settings.phone}
                </a>
              )}
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-white/70 hover:text-accent">
                  <Mail className="h-4 w-4" /> {settings.email}
                </a>
              )}
              {settings.address && (
                <div className="flex items-center gap-2 text-white/70">
                  <MapPin className="h-4 w-4" /> {settings.address}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Tours
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {tourLinks.map((l) => (
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
            <form className="mt-4 flex gap-2" onSubmit={subscribe}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                disabled={sending}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                OK
              </button>
            </form>
            {socials.length > 0 && (
            <div className="mt-5 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-xs font-semibold text-white/70 transition-colors hover:border-accent hover:text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {settings.brandName}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-accent">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
