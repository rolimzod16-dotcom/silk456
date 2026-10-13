"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useLocale } from "@/lib/locale";
import { scrollToId, useUiStore } from "@/lib/ui-store";
import { cn } from "@/lib/utils";

function go(id: string) {
  if (window.location.pathname !== "/") {
    window.location.href = `/#${id}`;
    return;
  }
  scrollToId(id);
}

export function SiteHeader() {
  const { locale, setLocale, t } = useLocale();
  const openBooking = useUiStore((state) => state.openBooking);
  const setFilters = useUiStore((state) => state.setFilters);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function pickCountry(id: (typeof t.countries)[number]["id"]) {
    setFilters({ country: id, style: null, region: "all" });
    setOpen(false);
    go("tours");
  }

  function pickStyle(id: (typeof t.styles)[number]["id"]) {
    setFilters({ style: id, country: null, region: "all" });
    setOpen(false);
    go("tours");
  }

  function pickAllTours() {
    setFilters({ country: null, style: null, region: "all" });
    setOpen(false);
    go("tours");
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b text-white transition-all duration-300",
        scrolled
          ? "border-white/10 bg-spice-dark shadow-md"
          : "border-white/10 bg-[oklch(0.22_0.04_40/0.42)] backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" onClick={() => go("top")}>
          <Image
            src="/brand/logo.png"
            alt=""
            width={756}
            height={571}
            priority
            className="h-10 w-auto sm:h-12"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-wide text-white">
              Great Silk Trails
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-white/65">
              Silk Road Tours
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex">
          <Dropdown label={t.nav.destinations}>
            <DropdownLink onClick={pickAllTours}>{t.nav.viewAll}</DropdownLink>
            {t.countries.map((item) => (
              <DropdownLink key={item.id} onClick={() => pickCountry(item.id)}>
                {item.label}
              </DropdownLink>
            ))}
          </Dropdown>
          <Dropdown label={t.nav.travelStyles}>
            {t.styles.map((item) => (
              <DropdownLink key={item.id} onClick={() => pickStyle(item.id)}>
                {item.label}
              </DropdownLink>
            ))}
          </Dropdown>
          <Dropdown label={t.nav.services}>
            {t.services.map((item) => (
              <DropdownLink
                key={item.id}
                onClick={() => {
                  setOpen(false);
                  go("services");
                }}
              >
                {item.title}
              </DropdownLink>
            ))}
          </Dropdown>
          <NavButton onClick={() => go("about")}>{t.nav.about}</NavButton>
          <NavButton onClick={() => go("contact")}>{t.nav.contact}</NavButton>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div
            className="flex items-center rounded-full border border-white/25 bg-white/10 px-1 py-0.5 text-[11px] font-semibold tracking-wide"
            role="group"
            aria-label="Language"
          >
            {(["en", "ru"] as const).map((code) => (
              <button
                key={code}
                type="button"
                aria-pressed={locale === code}
                onClick={() => setLocale(code)}
                className={cn(
                  "rounded-full px-2 py-1 uppercase transition",
                  locale === code ? "bg-accent text-accent-foreground" : "text-white/80 hover:text-white",
                )}
              >
                {code}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => openBooking()}
            className="inline-flex items-center rounded-full bg-accent px-3 py-2 text-[11px] font-semibold text-accent-foreground shadow-sm hover:bg-accent/90 sm:px-4 sm:text-sm"
          >
            {t.plan}
          </button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-md border border-white/25 text-white lg:hidden"
                aria-label={t.menu}
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 border-l border-border bg-background">
              <SheetTitle className="flex items-center gap-2 pr-8 font-display text-lg font-semibold tracking-wide text-foreground">
                <Image src="/brand/logo.png" alt="" width={756} height={571} className="h-8 w-auto" />
                Great Silk Trails
              </SheetTitle>
              <div className="mt-6 space-y-2 text-sm text-foreground">
                <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {t.nav.destinations}
                </p>
                {t.countries.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => pickCountry(item.id)}
                    className="block w-full rounded-lg px-3 py-2 text-left hover:bg-secondary"
                  >
                    {item.label}
                  </button>
                ))}
                <p className="px-2 pt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {t.nav.travelStyles}
                </p>
                {t.styles.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => pickStyle(item.id)}
                    className="block w-full rounded-lg px-3 py-2 text-left hover:bg-secondary"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    go("services");
                  }}
                  className="mt-2 block w-full rounded-lg px-3 py-2 text-left font-medium uppercase tracking-[0.14em] hover:bg-secondary"
                >
                  {t.nav.services}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    go("about");
                  }}
                  className="block w-full rounded-lg px-3 py-2 text-left font-medium uppercase tracking-[0.14em] hover:bg-secondary"
                >
                  {t.nav.about}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    go("contact");
                  }}
                  className="block w-full rounded-lg px-3 py-2 text-left font-medium uppercase tracking-[0.14em] hover:bg-secondary"
                >
                  {t.nav.contact}
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function NavButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md px-2.5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/85 hover:text-accent xl:px-3 xl:text-xs"
    >
      {children}
    </button>
  );
}

function Dropdown({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group relative">
      <div className="flex cursor-default items-center gap-0.5 rounded-md px-2.5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/85 group-hover:text-accent xl:px-3 xl:text-xs">
        <span>{label}</span>
        <ChevronDown className="size-3 text-white" />
      </div>
      <div className="invisible absolute left-0 top-full z-50 min-w-[240px] pt-1 opacity-0 transition group-hover:visible group-hover:opacity-100">
        <div className="max-h-[min(70vh,520px)] overflow-y-auto rounded-xl border border-border bg-card py-2 text-foreground shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
}

function DropdownLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full px-4 py-2.5 text-left text-sm text-foreground/80 hover:bg-secondary hover:text-foreground"
    >
      {children}
    </button>
  );
}
