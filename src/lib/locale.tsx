"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { copy, type Locale } from "@/lib/messages";

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: ReturnType<typeof copy>;
} | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("gst-locale");
    if (saved === "ru" || saved === "en") setLocaleState(saved);
  }, []);

  function setLocale(next: Locale) {
    setLocaleState(next);
    window.localStorage.setItem("gst-locale", next);
    document.documentElement.lang = next;
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: copy(locale) }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside LocaleProvider");
  return value;
}
