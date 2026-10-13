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
        "fixed inset-x-0 top-0 z-50 border-b border-[#d4a82a]/25 bg-[#0f1225] text-white",
        scrolled && "shadow-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-3 px-4 sm:h-20 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" onClick={() => go("top")}>
          <Image
            src="/brand/logo.png"
            alt=""
            width={756}
            height={571}
            priority
            className="h-10 w-auto sm:h-12"
          />
          <span className="text-sm font-bold tracking-[0.08em] text-white sm:text-[15px]">
            GREAT SILK TRAILS
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
            className="flex items-center rounded-full border border-white/35 bg-white/10 px-1 py-0.5 text-[11px] font-bold tracking-wide"
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
                  locale === code ? "bg-[#d4a82a] text-[#0f1225]" : "text-white hover:text-white",
                )}
              >
                {code}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => openBooking()}
            className="inline-flex items-center rounded-full bg-[#d4a82a] px-3 py-2 text-[11px] font-semibold text-[#0f1225] shadow-md hover:bg-[#e0b84a] sm:px-4 sm:text-sm"
          >
            {t.plan}
          </button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-md border border-[#d4a82a]/40 text-white lg:hidden"
                aria-label={t.menu}
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 border-l border-[#d4a82a]/30 bg-white">
              <SheetTitle className="flex items-center gap-2 pr-8 text-base font-bold tracking-wide text-[#0f1225]">
                <Image src="/brand/logo.png" alt="" width={756} height={571} className="h-8 w-auto" />
                GREAT SILK TRAILS
              </SheetTitle>
              <div className="mt-6 space-y-2 text-sm text-[#0f1225]">
                <p className="px-2 text-[11px] font-bold uppercase tracking-wide text-[#0f1225]/50">
                  {t.nav.destinations}
                </p>
                {t.countries.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => pickCountry(item.id)}
                    className="block w-full rounded-lg px-3 py-2 text-left hover:bg-[#faf5eb]"
                  >
                    {item.label}
                  </button>
                ))}
                <p className="px-2 pt-3 text-[11px] font-bold uppercase tracking-wide text-[#0f1225]/50">
                  {t.nav.travelStyles}
                </p>
                {t.styles.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => pickStyle(item.id)}
                    className="block w-full rounded-lg px-3 py-2 text-left hover:bg-[#faf5eb]"
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
                  className="mt-2 block w-full rounded-lg px-3 py-2 text-left font-semibold uppercase tracking-wide hover:bg-[#faf5eb]"
                >
                  {t.nav.services}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    go("about");
                  }}
                  className="block w-full rounded-lg px-3 py-2 text-left font-semibold uppercase tracking-wide hover:bg-[#faf5eb]"
                >
                  {t.nav.about}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    go("contact");
                  }}
                  className="block w-full rounded-lg px-3 py-2 text-left font-semibold uppercase tracking-wide hover:bg-[#faf5eb]"
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
      className="rounded-lg px-2.5 py-2 text-[11px] font-bold uppercase tracking-wide text-white hover:bg-white/10 xl:px-3 xl:text-xs"
    >
      {children}
    </button>
  );
}

function Dropdown({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group relative">
      <div className="flex cursor-default items-center gap-0.5 rounded-lg px-2.5 py-2 text-[11px] font-bold uppercase tracking-wide text-white group-hover:bg-white/10 xl:px-3 xl:text-xs">
        <span>{label}</span>
        <ChevronDown className="size-3 text-white" />
      </div>
      <div className="invisible absolute left-0 top-full z-50 min-w-[240px] pt-1 opacity-0 transition group-hover:visible group-hover:opacity-100">
        <div className="max-h-[min(70vh,520px)] overflow-y-auto rounded-xl border border-[#d4a82a]/25 bg-white py-2 text-[#0f1225] shadow-xl">
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
      className="block w-full px-4 py-2.5 text-left text-sm text-[#3a4060] hover:bg-[#faf5eb]"
    >
      {children}
    </button>
  );
}
