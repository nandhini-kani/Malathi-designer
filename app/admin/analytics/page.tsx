"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  BarChart3,
  CalendarDays,
  ChevronRight,
  Clock3,
  Eye,
  Globe2,
  MapPin,
  Monitor,
  MousePointerClick,
  Smartphone,
  User,
  Users,
} from "lucide-react";

import AdminGuard from "@/components/admin/AdminGuard";
import Sidebar from "@/components/admin/Sidebar";

type Analytics = {
  visits: {
    today: number;
    week: number;
    month: number;
    total: number;
  };

  uniqueVisitors: {
    today: number;
    week: number;
    month: number;
    total: number;
  };
};

type Visitor = {
  visitorId: string;
  firstVisit: string;
  lastVisit: string;
  visitCount: number;
  pagesViewed: string[];
  device: string;
  browser: string;
  os: string;
  location: {
    city: string;
    region: string;
    country: string;
  };
};

const emptyAnalytics: Analytics = {
  visits: {
    today: 0,
    week: 0,
    month: 0,
    total: 0,
  },

  uniqueVisitors: {
    today: 0,
    week: 0,
    month: 0,
    total: 0,
  },
};

function formatDate(date: string) {
  if (!date) return "-";

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "-";
  }

  return value.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function shortenVisitorId(id: string) {
  if (!id) return "-";

  if (id.length <= 24) {
    return id;
  }

  return `${id.slice(0, 12)}...${id.slice(-8)}`;
}

function getDeviceIcon(device: string) {
  const value = device?.toLowerCase() || "";

  if (
    value.includes("mobile") ||
    value.includes("phone") ||
    value.includes("android") ||
    value.includes("iphone")
  ) {
    return Smartphone;
  }

  return Monitor;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] =
    useState<Analytics>(emptyAnalytics);

  const [visitors, setVisitors] =
    useState<Visitor[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [visitorLoading, setVisitorLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadAnalytics() {
      try {
        setLoading(true);

        const response = await fetch(
          "/api/analytics/stats",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load analytics"
          );
        }

        const data = await response.json();

        setAnalytics(
          data.analytics ||
            data.data ||
            data ||
            emptyAnalytics
        );
      } catch (error) {
        console.error(
          "Analytics loading error:",
          error
        );

        setError(
          "Unable to load analytics data."
        );
      } finally {
        setLoading(false);
      }
    }

    async function loadVisitors() {
      try {
        setVisitorLoading(true);

        const response = await fetch(
          "/api/analytics/visitors",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load visitors"
          );
        }

        const data = await response.json();

        setVisitors(
          data.visitors ||
            data.data ||
            []
        );
      } catch (error) {
        console.error(
          "Visitor loading error:",
          error
        );
      } finally {
        setVisitorLoading(false);
      }
    }

    loadAnalytics();
    loadVisitors();
  }, []);

  return (
    <AdminGuard>
      <div className="flex min-h-screen flex-col bg-[#faf7ff] md:flex-row">
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-x-hidden">
          {/* ================= HEADER ================= */}

          <section className="border-b border-violet-100 bg-white">
            <div className="px-4 py-5 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-md">
                      <BarChart3 size={19} />
                    </div>

                    <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                      Website Analytics
                    </span>
                  </div>

                  <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Visitor Analytics
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Track website visits and
                    visitor activity.
                  </p>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-xl border border-violet-100 bg-violet-50 px-3 py-2 text-xs font-medium text-violet-700">
                  <Activity size={15} />

                  Live visitor data
                </div>
              </div>
            </div>
          </section>

          <div className="px-4 py-5 sm:px-6 lg:px-8">
            {/* ================= ERROR ================= */}

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* ================= OVERVIEW ================= */}

            <section className="mb-7">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-slate-900">
                  Overview
                </h2>

                <p className="text-sm text-slate-500">
                  Website traffic summary
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <StatCard
                  title="Today"
                  value={
                    loading
                      ? "..."
                      : analytics.visits.today
                  }
                  subtitle={`${analytics.uniqueVisitors.today} unique`}
                  icon={Eye}
                  gradient="from-violet-600 to-purple-600"
                />

                <StatCard
                  title="This Week"
                  value={
                    loading
                      ? "..."
                      : analytics.visits.week
                  }
                  subtitle={`${analytics.uniqueVisitors.week} unique`}
                  icon={CalendarDays}
                  gradient="from-blue-600 to-cyan-500"
                />

                <StatCard
                  title="This Month"
                  value={
                    loading
                      ? "..."
                      : analytics.visits.month
                  }
                  subtitle={`${analytics.uniqueVisitors.month} unique`}
                  icon={BarChart3}
                  gradient="from-fuchsia-600 to-violet-600"
                />

                <StatCard
                  title="Total Visits"
                  value={
                    loading
                      ? "..."
                      : analytics.visits.total
                  }
                  subtitle={`${analytics.uniqueVisitors.total} unique`}
                  icon={Users}
                  gradient="from-indigo-600 to-blue-600"
                />
              </div>
            </section>

            {/* ================= UNIQUE VISITORS ================= */}

            <section className="mb-7">
              <div className="rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 via-white to-blue-50 p-4 shadow-sm sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-md">
                      <Users size={21} />
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-900">
                        Unique Visitors
                      </h2>

                      <p className="text-xs text-slate-500">
                        Individual visitors detected
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-violet-700">
                      {loading
                        ? "..."
                        : analytics
                            .uniqueVisitors
                            .total}
                    </p>

                    <p className="text-[11px] text-slate-500">
                      Total
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <MiniStat
                    label="Today"
                    value={
                      loading
                        ? "..."
                        : analytics
                            .uniqueVisitors
                            .today
                    }
                  />

                  <MiniStat
                    label="Week"
                    value={
                      loading
                        ? "..."
                        : analytics
                            .uniqueVisitors
                            .week
                    }
                  />

                  <MiniStat
                    label="Month"
                    value={
                      loading
                        ? "..."
                        : analytics
                            .uniqueVisitors
                            .month
                    }
                  />
                </div>
              </div>
            </section>

            {/* ================= VISITOR DETAILS ================= */}

            <section>
              <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Visitor Details
                  </h2>

                  <p className="text-sm text-slate-500">
                    Detailed information about
                    website visitors
                  </p>
                </div>

                <div className="hidden rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm ring-1 ring-slate-200 sm:block">
                  {visitors.length} visitors
                </div>
              </div>

              {visitorLoading ? (
                <VisitorLoading />
              ) : visitors.length === 0 ? (
                <EmptyVisitors />
              ) : (
                <div className="space-y-3">
                  {visitors.map(
                    (visitor, index) => (
                      <VisitorCard
                        key={`${visitor.visitorId}-${index}`}
                        visitor={visitor}
                      />
                    )
                  )}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
}: {
  title: string;
  value: number | string;
  subtitle: string;
  icon: React.ElementType;
  gradient: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm`}
        >
          <Icon size={19} />
        </div>

        <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          {title}
        </span>
      </div>

      <p className="mt-3 text-2xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-0.5 text-xs text-slate-500">
        {subtitle}
      </p>
    </div>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-xl border border-white bg-white/80 px-3 py-2.5 shadow-sm">
      <p className="text-[10px] font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-0.5 text-lg font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   VISITOR CARD
========================================================= */

function VisitorCard({
  visitor,
}: {
  visitor: Visitor;
}) {
  const DeviceIcon = getDeviceIcon(
    visitor.device
  );

  const pages = Array.from(
    new Set(visitor.pagesViewed || [])
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
      {/* ================= VISITOR HEADER ================= */}

      <div className="flex items-center justify-between gap-3 border-b border-violet-100 bg-gradient-to-r from-violet-50 via-white to-blue-50 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-sm">
            <User className="text-blue" size={17} />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900">
              Visitor
            </p>

            <p className="truncate text-[10px] text-slate-400">
              {shortenVisitorId(
                visitor.visitorId
              )}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold text-violet-700">
          <Eye size={13} />

          {visitor.visitCount} Visits
        </div>
      </div>

      {/* =====================================================
          1. VISITOR INFORMATION
          SEPARATE HORIZONTAL SCROLL
      ====================================================== */}

      <ScrollableSection
        title="Visitor Information"
        icon={User}
        iconClass="bg-violet-100 text-violet-600"
        titleClass="text-violet-700"
      >
        <div className="grid min-w-[850px] grid-cols-4 gap-3">
          <InfoBox
            label="Visitor ID"
            value={shortenVisitorId(
              visitor.visitorId
            )}
            icon={User}
          />

          <InfoBox
            label="Device"
            value={
              visitor.device || "Unknown"
            }
            icon={DeviceIcon}
          />

          <InfoBox
            label="Operating System"
            value={
              visitor.os || "Unknown"
            }
            icon={Monitor}
          />

          <InfoBox
            label="Browser"
            value={
              visitor.browser ||
              "Unknown"
            }
            icon={Globe2}
          />
        </div>
      </ScrollableSection>

      {/* =====================================================
          2. LOCATION
          SEPARATE HORIZONTAL SCROLL
      ====================================================== */}

      <ScrollableSection
        title="Location"
        icon={MapPin}
        iconClass="bg-blue-100 text-blue-600"
        titleClass="text-blue-700"
      >
        <div className="grid min-w-[650px] grid-cols-3 gap-3">
          <InfoBox
            label="City"
            value={
              visitor.location?.city ||
              "Unknown"
            }
            icon={MapPin}
          />

          <InfoBox
            label="Region"
            value={
              visitor.location?.region ||
              "Unknown"
            }
            icon={Globe2}
          />

          <InfoBox
            label="Country"
            value={
              visitor.location?.country ||
              "Unknown"
            }
            icon={Globe2}
          />
        </div>
      </ScrollableSection>

      {/* =====================================================
          3. VISIT HISTORY
          SEPARATE HORIZONTAL SCROLL
      ====================================================== */}

      <ScrollableSection
        title="Visit History"
        icon={Clock3}
        iconClass="bg-purple-100 text-purple-600"
        titleClass="text-purple-700"
      >
        <div className="grid min-w-[650px] grid-cols-3 gap-3">
          <InfoBox
            label="First Visit"
            value={formatDate(
              visitor.firstVisit
            )}
            icon={Clock3}
          />

          <InfoBox
            label="Last Visit"
            value={formatDate(
              visitor.lastVisit
            )}
            icon={Activity}
          />

          <InfoBox
            label="Total Visits"
            value={`${visitor.visitCount}`}
            icon={MousePointerClick}
          />
        </div>
      </ScrollableSection>

      {/* =====================================================
          4. PAGES VIEWED
          SEPARATE HORIZONTAL SCROLL
      ====================================================== */}

      <ScrollableSection
        title="Pages Viewed"
        icon={Eye}
        iconClass="bg-indigo-100 text-indigo-600"
        titleClass="text-indigo-700"
      >
        <div className="min-w-[650px] rounded-xl border border-indigo-100 bg-indigo-50/50 p-3">
          <div className="flex w-max gap-2">
            {pages.length > 0 ? (
              pages.map(
                (page, index) => (
                  <span
                    key={`${visitor.visitorId}-${page}-${index}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-100 bg-white px-3 py-2 text-xs font-semibold text-indigo-700 shadow-sm"
                  >
                    <Eye size={12} />

                    {page}
                  </span>
                )
              )
            ) : (
              <span className="text-xs text-slate-400">
                No pages recorded
              </span>
            )}
          </div>
        </div>
      </ScrollableSection>

      {/* ================= SWIPE HINT ================= */}

      <div className="flex items-center justify-center gap-2 border-t border-violet-100 bg-gradient-to-r from-violet-50 to-blue-50 px-3 py-2 sm:hidden">
        <span className="text-[10px] font-semibold text-violet-600">
          Swipe each section left / right
        </span>

        <ChevronRight
          size={13}
          className="animate-pulse text-violet-500"
        />
      </div>
    </div>
  );
}

/* =========================================================
   SCROLLABLE SECTION
========================================================= */

function ScrollableSection({
  title,
  icon: Icon,
  iconClass,
  titleClass,
  children,
}: {
  title: string;
  icon: React.ElementType;
  iconClass: string;
  titleClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-slate-100 px-4 py-3 last:border-b-0">
      {/* Section heading */}

      <div className="mb-2 flex items-center gap-2">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
        >
          <Icon size={14} />
        </div>

        <h3
          className={`text-xs font-bold ${titleClass}`}
        >
          {title}
        </h3>
      </div>

      {/* ONLY THIS SECTION SCROLLS */}

      <div className="overflow-x-auto overscroll-x-contain">
        <div className="pb-1">
          {children}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INFO BOX
========================================================= */

function InfoBox({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="min-w-0">
      <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        <Icon size={11} />

        {label}
      </label>

      <div className="flex h-10 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700 shadow-sm">
        <span className="truncate">
          {value}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   LOADING
========================================================= */

function VisitorLoading() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
            <div className="h-9 w-9 animate-pulse rounded-xl bg-slate-200" />

            <div className="space-y-1">
              <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />

              <div className="h-2 w-32 animate-pulse rounded bg-slate-100" />
            </div>
          </div>

          <div className="space-y-3 p-4">
            <div className="h-16 animate-pulse rounded-xl bg-slate-100" />

            <div className="h-16 animate-pulse rounded-xl bg-slate-100" />

            <div className="h-16 animate-pulse rounded-xl bg-slate-100" />

            <div className="h-16 animate-pulse rounded-xl bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyVisitors() {
  return (
    <div className="rounded-2xl border border-dashed border-violet-200 bg-white px-5 py-12 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-500">
        <Users size={25} />
      </div>

      <h3 className="mt-4 text-base font-bold text-slate-800">
        No visitors yet
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Visitor information will appear here
        when someone visits your website.
      </p>
    </div>
  );
}