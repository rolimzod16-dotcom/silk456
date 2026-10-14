"use client";

import { createContext, useContext } from "react";
import type { SiteContent } from "@/lib/site-content";

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

export function useContent() {
  const value = useContext(ContentContext);
  if (!value) throw new Error("useContent must be used inside ContentProvider");
  return value;
}
