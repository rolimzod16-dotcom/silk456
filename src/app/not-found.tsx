import Link from "next/link";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { BookingDialog } from "@/components/site/booking-dialog";
import { getContent } from "@/lib/content";
import { ContentProvider } from "@/lib/content-context";
import { LocaleProvider } from "@/lib/locale";

export default async function NotFound() {
  const content = await getContent();
  return (
    <ContentProvider content={content}>
    <LocaleProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center bg-silk-pattern px-4 pt-32 pb-20 text-center">
          <div>
            <p className="font-display text-7xl font-semibold text-primary">404</p>
            <h1 className="mt-4 font-display text-3xl font-semibold text-foreground">
              This trail leads nowhere
            </h1>
            <p className="mt-3 text-muted-foreground">The page you are looking for does not exist.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/" className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Home
              </Link>
              <Link href="/tours" className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-secondary">
                All tours
              </Link>
            </div>
          </div>
        </main>
        <SiteFooter />
        <BookingDialog />
      </div>
    </LocaleProvider>
    </ContentProvider>
  );
}
