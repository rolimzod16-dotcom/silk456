"use client";

import { usePathname } from "next/navigation";
import { useContent } from "@/lib/content-context";
import { useLocale } from "@/lib/locale";

/** Floating click-to-chat button, shown once a WhatsApp link is set in the admin. */
export function WhatsAppButton() {
  const { settings } = useContent();
  const { ui } = useLocale();
  const pathname = usePathname();
  if (!settings.whatsapp) return null;
  // Tour pages have their own bottom bar with WhatsApp on phones.
  const onTourPage = /^\/tours\/[^/]+$/.test(pathname);
  return (
    <a
      href={settings.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ui.whatsapp}
      title={ui.whatsapp}
      className={`fixed bottom-5 right-5 z-40 ${onTourPage ? "hidden lg:flex" : "flex"} h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40`}
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.5.7 4.9 2 7L3 29l6.6-2.2c2 1.1 4.2 1.6 6.4 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23.1c-2 0-3.9-.5-5.6-1.5l-.4-.2-3.9 1.3 1.3-3.8-.3-.4c-1.1-1.7-1.7-3.7-1.7-5.8C5.4 9.8 10.1 5.2 16 5.2s10.6 4.6 10.6 10.4S21.9 26.1 16 26.1zm5.8-7.8c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1c-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.3c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z" />
      </svg>
    </a>
  );
}
