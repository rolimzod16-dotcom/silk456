"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type SectionLink = { id: string; label: string };

/**
 * In-page menu pinned under the site header. Highlights the section in view
 * and scrolls smoothly to a section on click.
 */
export function SectionNav({ items }: { items: SectionLink[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // A band just below the pinned menus decides which section is current.
      { rootMargin: "-150px 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  // Keep the active item visible in the horizontally scrolling menu on phones.
  useEffect(() => {
    const link = bar.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    link?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  function go(event: React.MouseEvent, id: string) {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  }

  return (
    <nav
      aria-label="On this page"
      className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 sm:top-20"
    >
      <div ref={bar} className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8 [scrollbar-width:none]">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            data-id={item.id}
            onClick={(e) => go(e, item.id)}
            aria-current={active === item.id ? "true" : undefined}
            className={cn(
              "shrink-0 whitespace-nowrap border-b-2 px-3 py-3.5 text-sm font-medium transition-colors",
              active === item.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/** Scroll offset for in-page sections: site header + this menu. */
export const SECTION_SCROLL = "scroll-mt-32 sm:scroll-mt-36";
