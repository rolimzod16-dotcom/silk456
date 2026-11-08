"use client";

import { createContext, useContext, useMemo } from "react";
import { useLocale } from "@/lib/locale";
import type { SiteContent } from "@/lib/site-content";
import { localizeTour } from "@/lib/tours";

const ContentContext = createContext<SiteContent | null>(null);

export function ContentProvider({
  content,
  children,
}: {
  content: SiteContent;
  children: React.ReactNode;
}) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

/** Re-provides the content with tour texts in the visitor's language; sits inside LocaleProvider. */
export function LocalizedContent({ children }: { children: React.ReactNode }) {
  const content = useContent();
  const { locale } = useLocale();
  const value = useMemo(
    () => (locale === "en" ? content : { ...content, tours: content.tours.map((tour) => localizeTour(tour, locale)) }),
    [content, locale],
  );
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const value = useContext(ContentContext);
  if (!value) throw new Error("useContent must be used inside ContentProvider");
  return value;
}
