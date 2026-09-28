

"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Gift,
  ImageIcon,
  MessageSquareText,
  Plus,
  Scissors,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import AdminGuard from "@/components/admin/AdminGuard";
import DashboardCard from "@/components/admin/DashboardCard";
import Sidebar from "@/components/admin/Sidebar";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    services: 0,
    gallery: 0,
    offers: 0,
    pendingReviews: 0,
    newEnquiries: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [
          servicesResponse,
          galleryResponse,
          offersResponse,
          reviewsResponse,
          enquiriesResponse,
        ] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/gallery"),
          fetch("/api/offers"),
          fetch("/api/admin/reviews"),
          fetch("/api/enquiries"),
        ]);

        const servicesData = await servicesResponse.json();
        const galleryData = await galleryResponse.json();
        const offersData = await offersResponse.json();
        const reviewsData = await reviewsResponse.json();
        const enquiriesData = await enquiriesResponse.json();

        const reviews = reviewsData?.data?.reviews || [];
        const enquiries = enquiriesData?.data?.enquiries || [];

        setStats({
          services: Array.isArray(servicesData?.data?.services)
            ? servicesData.data.services.length
            : 0,

          gallery: Array.isArray(galleryData?.data?.gallery)
            ? galleryData.data.gallery.length
            : 0,

          offers: Array.isArray(offersData?.data?.offers)
            ? offersData.data.offers.length
            : 0,

          pendingReviews: reviews.filter(
            (item: { isApproved: boolean }) => !item.isApproved
          ).length,

          newEnquiries: enquiries.filter(
            (item: { status: string }) => item.status === "new"
          ).length,
        });
      } catch (error) {
        console.error("Load dashboard stats error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const totalContent =
    stats.services + stats.gallery + stats.offers;

  return (
    <AdminGuard>
      <div className="flex min-h-screen flex-col bg-[#faf7fb] md:flex-row">

        {/* SIDEBAR */}
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-x-hidden p-3 sm:p-4 md:p-6 lg:p-8">

          {/* =====================================================
              WELCOME HEADER
          ====================================================== */}
          <section className="mb-5 sm:mb-6">
            <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#7c3aed] via-[#9333ea] to-[#db2777] p-5 text-white shadow-xl shadow-purple-200 sm:p-6 md:rounded-[30px] md:p-8">

              {/* Decorative elements */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 sm:h-40 sm:w-40" />
              <div className="absolute -bottom-16 right-16 h-36 w-36 rounded-full bg-white/5" />
              <div className="absolute left-1/2 top-0 h-20 w-20 rounded-full bg-white/5" />

              <div className="relative z-10 flex flex-col gap-5 sm:gap-6 md:flex-row md:items-center md:justify-between">

                <div className="min-w-0">

                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                      <Sparkles size={15} />
                    </span>

                    <p className="truncate text-xs font-medium tracking-[0.16em] text-purple-100 sm:text-sm sm:tracking-[0.2em]">
                      MALATHI DESIGNER
                    </p>
                  </div>

                  <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl">
                    Welcome back, Admin ✨
                  </h1>

                  <p className="mt-2 max-w-xl text-sm leading-5 text-purple-100 sm:leading-6 md:text-base">
                    Manage your tailoring services, designs, offers and
                    customers from one beautiful dashboard.
                  </p>
                </div>

                <div className="flex items-center gap-3 md:shrink-0">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur sm:h-20 sm:w-20 md:h-24 md:w-24">
                    <Scissors
                      size={28}
                      strokeWidth={1.5}
                      className="sm:h-9 sm:w-9 md:h-11 md:w-11"
                    />
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              QUICK ACTIONS
          ====================================================== */}
          <section className="mb-6 sm:mb-8">

            <div className="mb-3 flex items-end justify-between sm:mb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-purple-500 sm:text-xs">
                  Quick Actions
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-800 sm:text-xl">
                  Manage your business
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

              {/* Service */}
              <a
                href="/admin/services"
                className="group min-w-0 rounded-2xl border border-purple-100 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-4"
              >
                <div className="flex items-center gap-2 sm:gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 sm:h-11 sm:w-11">
                    <Plus size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      Add Service
                    </p>

                    <p className="hidden truncate text-xs text-slate-500 sm:block">
                      Create new service
                    </p>
                  </div>

                </div>
              </a>

              {/* Gallery */}
              <a
                href="/admin/gallery"
                className="group min-w-0 rounded-2xl border border-pink-100 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-4"
              >
                <div className="flex items-center gap-2 sm:gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-600 sm:h-11 sm:w-11">
                    <ImageIcon size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      Add Gallery
                    </p>

                    <p className="hidden truncate text-xs text-slate-500 sm:block">
                      Upload new designs
                    </p>
                  </div>

                </div>
              </a>

              {/* Offers */}
              <a
                href="/admin/offers"
                className="group min-w-0 rounded-2xl border border-amber-100 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-4"
              >
                <div className="flex items-center gap-2 sm:gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 sm:h-11 sm:w-11">
                    <Gift size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      Create Offer
                    </p>

                    <p className="hidden truncate text-xs text-slate-500 sm:block">
                      Promote services
                    </p>
                  </div>

                </div>
              </a>

              {/* Enquiries */}
              <a
                href="/admin/enquiries"
                className="group min-w-0 rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-4"
              >
                <div className="flex items-center gap-2 sm:gap-3">

                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 sm:h-11 sm:w-11">

                    <MessageSquareText size={19} />

                    {stats.newEnquiries > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">
                        {stats.newEnquiries}
                      </span>
                    )}

                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      Enquiries
                    </p>

                    <p className="hidden truncate text-xs text-slate-500 sm:block">
                      Customer messages
                    </p>
                  </div>

                </div>
              </a>

            </div>
          </section>

          {/* =====================================================
              STATISTICS
          ====================================================== */}
          <section className="mb-6 sm:mb-8">

            <div className="mb-3 sm:mb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-purple-500 sm:text-xs">
                Business Overview
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-800 sm:text-xl">
                Your dashboard at a glance
              </h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="h-28 animate-pulse rounded-2xl bg-white shadow-sm sm:h-32"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">

                <DashboardCard
                  title="Total Services"
                  value={stats.services}
                  icon={<Scissors size={20} />}
                  accent="rose"
                />

                <DashboardCard
                  title="Gallery Images"
                  value={stats.gallery}
                  icon={<ImageIcon size={20} />}
                  accent="amber"
                />

                <DashboardCard
                  title="Active Offers"
                  value={stats.offers}
                  icon={<Gift size={20} />}
                  accent="sky"
                />

                <DashboardCard
                  title="Pending Reviews"
                  value={stats.pendingReviews}
                  icon={<Star size={20} />}
                  accent="amber"
                />

                <DashboardCard
                  title="New Enquiries"
                  value={stats.newEnquiries}
                  icon={<MessageSquareText size={20} />}
                  accent="emerald"
                />

              </div>
            )}
          </section>

          {/* =====================================================
              NEW BUSINESS PULSE
          ====================================================== */}
          <section className="mb-6 sm:mb-8">

            <div className="mb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-purple-500 sm:text-xs">
                Business Pulse
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-800 sm:text-2xl">
                What is happening today?
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                A simple view of the areas that need your attention.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">

              {/* =================================================
                  CUSTOMER ENQUIRIES
              ================================================== */}
              <a
                href="/admin/enquiries"
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white shadow-lg shadow-emerald-100 transition hover:-translate-y-1 hover:shadow-xl sm:p-6"
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />

                <div className="relative">

                  <div className="flex items-start justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                      <MessageSquareText size={23} />
                    </div>

                    <ArrowRight
                      size={20}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>

                  <p className="mt-6 text-sm font-medium text-emerald-50">
                    Customer Enquiries
                  </p>

                  <div className="mt-1 flex items-end gap-2">
                    <span className="text-4xl font-bold">
                      {stats.newEnquiries}
                    </span>

                    <span className="mb-1 text-sm text-emerald-100">
                      new
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs text-emerald-50">
                    <Bell size={14} />

                    {stats.newEnquiries > 0
                      ? "Customers are waiting for a response"
                      : "No new enquiries right now"}
                  </div>

                </div>
              </a>

              {/* =================================================
                  REVIEWS
              ================================================== */}
              <a
                href="/admin/reviews"
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 p-5 text-white shadow-lg shadow-amber-100 transition hover:-translate-y-1 hover:shadow-xl sm:p-6"
              >
                <div className="absolute -bottom-10 -right-8 h-32 w-32 rounded-full bg-white/10" />

                <div className="relative">

                  <div className="flex items-start justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                      <Star size={23} />
                    </div>

                    <ArrowRight
                      size={20}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>

                  <p className="mt-6 text-sm font-medium text-amber-50">
                    Review Center
                  </p>

                  <div className="mt-1 flex items-end gap-2">
                    <span className="text-4xl font-bold">
                      {stats.pendingReviews}
                    </span>

                    <span className="mb-1 text-sm text-amber-100">
                      pending
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs text-amber-50">
                    {stats.pendingReviews > 0 ? (
                      <>
                        <Bell size={14} />
                        Reviews need your attention
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={14} />
                        Everything is reviewed
                      </>
                    )}
                  </div>

                </div>
              </a>

              {/* =================================================
                  WEBSITE CONTENT
              ================================================== */}
              <div className="relative overflow-hidden rounded-3xl border border-purple-100 bg-white p-5 shadow-sm sm:p-6">

                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-purple-50" />

                <div className="relative">

                  <div className="flex items-start justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                      <Sparkles size={23} />
                    </div>

                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                      Live
                    </span>
                  </div>

                  <p className="mt-6 text-sm font-medium text-slate-500">
                    Website Content
                  </p>

                  <div className="mt-1 flex items-end gap-2">
                    <span className="text-4xl font-bold text-slate-800">
                      {totalContent}
                    </span>

                    <span className="mb-1 text-sm text-slate-400">
                      items
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2">

                    <div className="rounded-xl bg-purple-50 p-2.5 text-center">
                      <p className="text-lg font-bold text-purple-600">
                        {stats.services}
                      </p>

                      <p className="text-[10px] text-slate-500">
                        Services
                      </p>
                    </div>

                    <div className="rounded-xl bg-pink-50 p-2.5 text-center">
                      <p className="text-lg font-bold text-pink-600">
                        {stats.gallery}
                      </p>

                      <p className="text-[10px] text-slate-500">
                        Gallery
                      </p>
                    </div>

                    <div className="rounded-xl bg-amber-50 p-2.5 text-center">
                      <p className="text-lg font-bold text-amber-600">
                        {stats.offers}
                      </p>

                      <p className="text-[10px] text-slate-500">
                        Offers
                      </p>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </section>

          {/* =====================================================
              BOTTOM MANAGEMENT AREA
          ====================================================== */}
          <div className="grid gap-5 lg:grid-cols-2">

            {/* KEEP YOUR SHOP FRESH */}
            <section className="relative overflow-hidden rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50 via-white to-pink-50 p-5 sm:p-6">

              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-100/60" />

              <div className="relative">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-purple-600 shadow-sm">
                    <Scissors size={22} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-purple-500">
                      Keep growing
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-slate-800">
                      Keep your shop fresh ✨
                    </h2>
                  </div>

                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Add new stitching designs and update your gallery
                  regularly so customers can discover your latest work.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">

                  <a
                    href="/admin/gallery"
                    className="flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-3 text-sm font-semibold text-purple-600 shadow-sm ring-1 ring-purple-100 transition hover:bg-purple-600 hover:text-white"
                  >
                    <ImageIcon size={16} />
                    Gallery
                  </a>

                  <a
                    href="/admin/services"
                    className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-3 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
                  >
                    <Plus size={16} />
                    Service
                  </a>

                </div>
              </div>
            </section>

            {/* CUSTOMER EXPERIENCE */}
            <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-pink-500">
                    Customer Experience
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-800">
                    Stay connected 💕
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-50 text-pink-500">
                  <Users size={21} />
                </div>

              </div>

              <div className="mt-5 space-y-3">

                <a
                  href="/admin/enquiries"
                  className="group flex items-center justify-between rounded-2xl bg-slate-50 p-3 transition hover:bg-emerald-50"
                >
                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                      <MessageSquareText size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        New Enquiries
                      </p>

                      <p className="text-xs text-slate-400">
                        {stats.newEnquiries} waiting for response
                      </p>
                    </div>

                  </div>

                  <ArrowRight
                    size={17}
                    className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-500"
                  />
                </a>

                <a
                  href="/admin/reviews"
                  className="group flex items-center justify-between rounded-2xl bg-slate-50 p-3 transition hover:bg-amber-50"
                >
                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                      <Star size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Customer Reviews
                      </p>

                      <p className="text-xs text-slate-400">
                        {stats.pendingReviews} waiting for approval
                      </p>
                    </div>

                  </div>

                  <ArrowRight
                    size={17}
                    className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-amber-500"
                  />
                </a>

              </div>
            </section>

          </div>

          {/* =====================================================
              FOOTER TIP
          ====================================================== */}
          <div className="mt-5 rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:mt-6 sm:p-5">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex min-w-0 items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-purple-600 shadow-sm">
                  <Sparkles size={16} />
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-slate-800">
                    Dashboard Tip
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                    Keep your gallery updated with your latest tailoring
                    work to make your website more attractive.
                  </p>
                </div>

              </div>

              <a
                href="/admin/gallery"
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 sm:w-auto"
              >
                Update Gallery
                <ArrowRight size={16} />
              </a>

            </div>
          </div>

        </main>
      </div>
    </AdminGuard>
  );
}