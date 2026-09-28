"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  MessageSquareText,
  Users,
} from "lucide-react";

import AdminGuard from "@/components/admin/AdminGuard";
import EnquiryTable, {
  type EnquiryRecord,
} from "@/components/admin/EnquiryTable";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchEnquiries() {
    setLoading(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      setEnquiries(
        Array.isArray(data?.data?.enquiries)
          ? data.data.enquiries
          : []
      );
    } catch (error) {
      console.error("Fetch enquiries error:", error);
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEnquiries();
  }, []);

  async function handleStatusChange(
    id: string,
    status: "new" | "contacted" | "completed"
  ) {
    try {
      const response = await fetch(`/api/enquiries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Unable to update enquiry status.");
        return;
      }

      await fetchEnquiries();
    } catch (error) {
      console.error("Update enquiry error:", error);
      alert("Unable to update enquiry status.");
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/enquiries/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Unable to delete enquiry.");
        return;
      }

      await fetchEnquiries();
    } catch (error) {
      console.error("Delete enquiry error:", error);
      alert("Unable to delete enquiry.");
    }
  }

  const newEnquiries = enquiries.filter(
    (enquiry) => enquiry.status === "new"
  ).length;

  const contactedEnquiries = enquiries.filter(
    (enquiry) => enquiry.status === "contacted"
  ).length;

  const completedEnquiries = enquiries.filter(
    (enquiry) => enquiry.status === "completed"
  ).length;

  return (
    <AdminGuard>
      <div className="flex min-h-screen flex-col bg-[#faf8fc] md:flex-row">
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-x-hidden p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Header */}
          <section className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-purple-100 sm:mb-6 sm:rounded-3xl">
            <div className="p-5 sm:p-6 md:p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    <MessageSquareText size={14} />
                    Customer Communication
                  </div>

                  <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    Enquiries
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-purple-100 sm:text-base">
                    Manage customer enquiries, follow up with customers, and
                    keep track of completed requests.
                  </p>
                </div>

                {/* Total */}
                <div className="flex w-full items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md sm:w-fit sm:min-w-[190px]">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                    <Users size={22} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-purple-100">
                      Total Enquiries
                    </p>
                    <p className="mt-0.5 text-2xl font-bold text-white">
                      {enquiries.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="mb-5 grid grid-cols-3 gap-2 sm:mb-6 sm:gap-3">
            {/* New */}
            <div className="rounded-2xl border border-purple-100 bg-white p-3 shadow-sm shadow-purple-50 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 sm:h-10 sm:w-10">
                  <Clock3 size={18} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-[10px] font-medium uppercase tracking-wide text-slate-400 sm:text-xs">
                    New
                  </p>

                  <p className="text-lg font-bold text-slate-800 sm:text-xl">
                    {newEnquiries}
                  </p>
                </div>
              </div>
            </div>

            {/* Contacted */}
            <div className="rounded-2xl border border-purple-100 bg-white p-3 shadow-sm shadow-purple-50 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-600 sm:h-10 sm:w-10">
                  <MessageSquareText size={18} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-[10px] font-medium uppercase tracking-wide text-slate-400 sm:text-xs">
                    Contacted
                  </p>

                  <p className="text-lg font-bold text-slate-800 sm:text-xl">
                    {contactedEnquiries}
                  </p>
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="rounded-2xl border border-purple-100 bg-white p-3 shadow-sm shadow-purple-50 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 sm:h-10 sm:w-10">
                  <CheckCircle2 size={18} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-[10px] font-medium uppercase tracking-wide text-slate-400 sm:text-xs">
                    Completed
                  </p>

                  <p className="text-lg font-bold text-slate-800 sm:text-xl">
                    {completedEnquiries}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Enquiry Table */}
          <section className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm shadow-purple-100 sm:rounded-3xl">
            <div className="border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-purple-600 shadow-sm">
                  <ClipboardList size={20} />
                </div>

                <div className="min-w-0">
                  <h2 className="text-base font-bold text-slate-800 sm:text-lg">
                    Customer Enquiries
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                    Review and update customer requests.
                  </p>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex min-h-[220px] items-center justify-center p-6">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-purple-100 border-t-purple-600" />

                  <p className="text-sm font-medium text-slate-600">
                    Loading enquiries...
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Please wait a moment.
                  </p>
                </div>
              </div>
            ) : enquiries.length === 0 ? (
              <div className="p-6 sm:p-10">
                <div className="rounded-2xl border border-dashed border-purple-200 bg-gradient-to-br from-purple-50/60 to-pink-50/60 p-8 text-center sm:p-12">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-purple-500 shadow-sm">
                    <MessageSquareText size={26} />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-slate-700 sm:text-lg">
                    No enquiries received yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Customer enquiries will appear here when someone contacts
                    Malathi Designer.
                  </p>
                </div>
              </div>
            ) : (
              /*
               * The table gets horizontal scrolling on small screens.
               * This prevents the enquiry columns from breaking the layout.
               */
              <div className="min-w-0 overflow-x-auto">
                <div className="min-w-[760px]">
                  <EnquiryTable
                    enquiries={enquiries}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            )}
          </section>

          {/* Bottom Tip */}
          {!loading && enquiries.length > 0 && (
            <div className="mt-5 rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:mt-6 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-purple-600 shadow-sm">
                  <MessageSquareText size={17} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Keep customer communication organized
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                    Update enquiries from <strong>New</strong> to{" "}
                    <strong>Contacted</strong> and finally{" "}
                    <strong>Completed</strong> as you handle each customer.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </AdminGuard>
  );
}