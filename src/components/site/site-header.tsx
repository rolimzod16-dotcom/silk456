"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useLocale, useText } from "@/lib/locale";
import { COMMON } from "@/lib/pages";
import { useUiStore } from "@/lib/ui-store";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { locale, setLocale, t } = useLocale();
  const tx = useText();
  const pathname = usePathname();
  const openBooking = useUiStore((state) => state.openBooking);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

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
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
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
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          <NavLink href="/tours" active={isActive("/tours")}>{tx(COMMON.tours)}</NavLink>
          <Dropdown label={t.nav.destinations} href="/destinations" active={isActive("/destinations")}>
            {t.countries.map((item) => (
              <DropdownLink key={item.id} href={`/destinations/${item.id}`}>
                {item.label}
              </DropdownLink>
            ))}
            <DropdownLink href="/destinations">{t.nav.viewAll}</DropdownLink>
          </Dropdown>
          <Dropdown label={t.nav.travelStyles} href="/travel-styles" active={isActive("/travel-styles")}>
            {t.styles.map((item) => (
              <DropdownLink key={item.id} href={`/travel-styles/${item.id}`}>
                {item.label}
              </DropdownLink>
            ))}
            <DropdownLink href="/travel-styles">{t.nav.viewAll}</DropdownLink>
          </Dropdown>
          <Dropdown label={t.nav.services} href="/services" active={isActive("/services")}>
            {t.services.map((item) => (
              <DropdownLink key={item.id} href={`/services#${item.id}`}>
                {item.title}
              </DropdownLink>
            ))}
          </Dropdown>
          <NavLink href="/about" active={isActive("/about")}>{t.nav.about}</NavLink>
          <NavLink href="/contact" active={isActive("/contact")}>{t.nav.contact}</NavLink>
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
              <div className="mt-6 max-h-[calc(100vh-6rem)] space-y-1 overflow-y-auto pb-6 text-sm text-foreground">
                <MobileLink href="/tours" strong>{tx(COMMON.tours)}</MobileLink>
                <MobileLink href="/destinations" strong>{t.nav.destinations}</MobileLink>
                {t.countries.map((item) => (
                  <MobileLink key={item.id} href={`/destinations/${item.id}`}>
                    {item.label}
                  </MobileLink>
                ))}
                <MobileLink href="/travel-styles" strong>{t.nav.travelStyles}</MobileLink>
                {t.styles.map((item) => (
                  <MobileLink key={item.id} href={`/travel-styles/${item.id}`}>
                    {item.label}
                  </MobileLink>
                ))}
                <MobileLink href="/services" strong>{t.nav.services}</MobileLink>
                <MobileLink href="/about" strong>{t.nav.about}</MobileLink>
                <MobileLink href="/contact" strong>{t.nav.contact}</MobileLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "whitespace-nowrap rounded-md px-2.5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] hover:text-accent xl:px-3 xl:text-xs",
        active ? "text-accent" : "text-white/85",
      )}
    >
      {children}
    </Link>
  );
}

function Dropdown({
  label,
  href,
  active,
  children,
}: {
  label: string;
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative">
      <Link
        href={href}
        className={cn(
          "flex items-center gap-0.5 whitespace-nowrap rounded-md px-2.5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] group-hover:text-accent xl:px-3 xl:text-xs",
          active ? "text-accent" : "text-white/85",
        )}
      >
        <span>{label}</span>
        <ChevronDown className="size-3 text-white" />
      </Link>
      <div className="invisible absolute left-0 top-full z-50 min-w-[240px] pt-1 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="max-h-[min(70vh,520px)] overflow-y-auto rounded-xl border border-border bg-card py-2 text-foreground shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
}

function DropdownLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block w-full px-4 py-2.5 text-left text-sm text-foreground/80 hover:bg-secondary hover:text-foreground"
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  strong = false,
  children,
}: {
  href: string;
  strong?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "block w-full rounded-lg px-3 py-2 text-left hover:bg-secondary",
        strong && "mt-2 font-medium uppercase tracking-[0.14em]",
      )}
    >
      {children}
    </Link>
  );
}
