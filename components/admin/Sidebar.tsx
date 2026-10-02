"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Eye,
  Gift,
  ImageIcon,
  LogOut,
  MessageSquareText,
  Scissors,
  Settings,
  Star,
} from "lucide-react";

const navItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: BarChart3,
  },
  {
    href: "/admin/analytics",
    label: "Analytics",
    icon: Eye,
  },
  {
    href: "/admin/services",
    label: "Services",
    icon: Scissors,
  },
  {
    href: "/admin/gallery",
    label: "Gallery",
    icon: ImageIcon,
  },
  {
    href: "/admin/offers",
    label: "Offers",
    icon: Gift,
  },
  {
    href: "/admin/reviews",
    label: "Reviews",
    icon: Star,
  },
  {
    href: "/admin/enquiries",
    label: "Enquiries",
    icon: MessageSquareText,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      router.push("/admin/login");
    }
  }

  return (
    <aside className="w-full shrink-0 border-b border-purple-100 bg-white md:sticky md:top-0 md:flex md:h-screen md:w-64 md:flex-col md:border-b-0 md:border-r">

      {/* ================= BRAND + LOGOUT ================= */}
      <div className="border-b border-purple-100 px-4 py-4 sm:px-5 md:px-5 md:py-5">
        <div className="flex items-center justify-between gap-3">

          {/* LOGO + BRAND */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-lg font-bold text-white shadow-sm shadow-purple-200">
              M
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-slate-800">
                Malathi Designer
              </h2>

              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-500">
                Admin Panel
              </p>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl border border-slate-200 bg-white
              text-slate-500 transition-all duration-200
              hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600
              hover:shadow-sm
            "
          >
            <LogOut size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* ================= NAVIGATION ================= */}
      <div className="px-3 py-4 md:flex-1 md:overflow-y-auto md:px-3 md:py-6">

        <p className="mb-3 hidden px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 md:block">
          Main Menu
        </p>

        <nav className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:gap-1.5 md:overflow-visible md:pb-0">

          {navItems.map(
            ({ href, label, icon: Icon }) => {
              const active =
                pathname === href ||
                pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    group flex min-w-fit shrink-0 items-center gap-3
                    rounded-xl px-3 py-2.5 text-sm font-medium
                    transition-all duration-200
                    md:w-full md:px-3 md:py-3
                    ${
                      active
                        ? "bg-purple-50 text-purple-700"
                        : "text-slate-600 hover:bg-purple-50/70 hover:text-purple-700"
                    }
                  `}
                >

                  {/* ICON BOX */}
                  <span
                    className={`
                      flex h-8 w-8 shrink-0 items-center justify-center
                      rounded-lg transition-all
                      ${
                        active
                          ? "bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-sm shadow-purple-200"
                          : "bg-slate-50 text-slate-500 group-hover:bg-purple-100 group-hover:text-purple-600"
                      }
                    `}
                  >
                    <Icon
                      size={17}
                      strokeWidth={2}
                    />
                  </span>

                  {/* LABEL */}
                  <span className="whitespace-nowrap">
                    {label}
                  </span>

                  {/* ACTIVE DOT */}
                  {active && (
                    <span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-purple-600 md:block" />
                  )}
                </Link>
              );
            }
          )}

        </nav>
      </div>

      {/* ================= DESKTOP INFO ================= */}
      <div className="hidden px-4 pb-4 md:block">
        <div className="rounded-xl border border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 p-4">

          <p className="text-xs font-semibold text-purple-700">
            Admin Dashboard
          </p>

          <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
            Manage services, gallery, offers, reviews and customer enquiries.
          </p>

        </div>
      </div>

    </aside>
  );
}

