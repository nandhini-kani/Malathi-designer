"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Loading from "@/components/Loading";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    fetch("/api/auth/me", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!mounted) return;

        if (!response.ok || !data.success) {
          router.replace("/admin/login");
          return;
        }

        setIsAuthenticated(true);
      })
      .catch(() => {
        if (!mounted) return;
        router.replace("/admin/login");
      });

    return () => {
      mounted = false;
    };
  }, [router]);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
