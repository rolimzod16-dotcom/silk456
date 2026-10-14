import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { BookingDialog } from "@/components/site/booking-dialog";
import { LocaleProvider } from "@/lib/locale";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <BookingDialog />
      </div>
    </LocaleProvider>
  );
}
