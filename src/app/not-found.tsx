import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { BookingDialog } from "@/components/site/booking-dialog";
import { StatusPage } from "@/components/site/status-page";
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
          <main className="flex flex-1 flex-col">
            <StatusPage kind="notFound" />
          </main>
          <SiteFooter />
          <BookingDialog />
        </div>
      </LocaleProvider>
    </ContentProvider>
  );
}
