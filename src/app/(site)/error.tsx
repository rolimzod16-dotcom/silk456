"use client";

import { useEffect } from "react";
import { StatusPage } from "@/components/site/status-page";

export default function SiteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <StatusPage kind="error" onRetry={reset} />;
}
