export function LegalText({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-3xl space-y-5 px-4 text-base leading-relaxed text-foreground/85 sm:px-6 lg:px-8 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground">
        {children}
      </div>
    </section>
  );
}
