
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    async function trackVisitor() {
      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: pathname,
          }),
          cache: "no-store",
        });
      } catch (error) {
        console.error(
          "Visitor tracking failed:",
          error
        );
      }
    }

    trackVisitor();
  }, [pathname]);

  return null;
}

