"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useUiStore } from "@/lib/ui-store";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#tours", label: "Tours" },
  { href: "#about", label: "About" },
  { href: "#why", label: "Why Us" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const openBooking = useUiStore((s) => s.openBooking);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#top" className="flex items-center gap-2.5 group">
          <span
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
              scrolled
                ? "border-primary/30 bg-primary/5 text-primary"
                : "border-white/30 bg-white/10 text-white"
            )}
          >
            <Compass className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span
              className={cn(
                "font-display text-lg font-semibold tracking-wide transition-colors",
                scrolled ? "text-foreground" : "text-white"
              )}
            >
              Silk Caravan
            </span>
            <span
              className={cn(
                "text-[10px] uppercase tracking-[0.25em] transition-colors",
                scrolled ? "text-muted-foreground" : "text-white/70"
              )}
            >
              Silk Road Tours
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                scrolled ? "text-foreground/80" : "text-white/85"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            onClick={() => openBooking()}
            variant={scrolled ? "default" : "secondary"}
            className={cn(scrolled ? "" : "bg-white/95 text-foreground hover:bg-white")}
          >
            Book Now
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn("md:hidden", scrolled ? "text-foreground" : "text-white")}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[340px]">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b pb-4">
                <span className="font-display text-lg font-semibold text-primary">
                  Silk Caravan
                </span>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>
              <nav className="mt-4 flex flex-col gap-1">
                {NAV.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="rounded-md px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto pt-4">
                <SheetClose asChild>
                  <Button
                    className="w-full"
                    onClick={() => openBooking()}
                  >
                    Book a Tour
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
