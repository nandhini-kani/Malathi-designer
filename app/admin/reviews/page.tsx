"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  MessageSquareText,
  Star,
  ThumbsUp,
  Users,
} from "lucide-react";

import AdminGuard from "@/components/admin/AdminGuard";
import ReviewTable, {
  type ReviewRecord,
} from "@/components/admin/ReviewTable";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchReviews(): Promise<ReviewRecord[]> {
    const response = await fetch("/api/admin/reviews", {
      method: "GET",
      cache: "no-store",
    });
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Unable to load reviews.");
    }

    return Array.isArray(data?.data?.reviews)
      ? data.data.reviews
      : [];
  }

  useEffect(() => {
    let isMounted = true;

    fetchReviews()
      .then((reviews) => {
        if (isMounted) setReviews(reviews);
      })
      .catch((error) => {
        console.error("Fetch reviews error:", error);
        if (isMounted) setReviews([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  async function refreshReviews() {
    setLoading(true);

    try {
      setReviews(await fetchReviews());
    } catch (error) {
      console.error("Fetch reviews error:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id: string) {
    try {
      const response = await fetch("/api/admin/reviews", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          action: "approve",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.message || "Unable to approve review."
        );
        return;
      }

      await refreshReviews();
    } catch (error) {
      console.error("Approve review error:", error);
      alert("Unable to approve review.");
    }
  }

  async function handleReject(id: string) {
    try {
      const response = await fetch("/api/admin/reviews", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          action: "reject",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.message || "Unable to reject review."
        );
        return;
      }

      await refreshReviews();
    } catch (error) {
      console.error("Reject review error:", error);
      alert("Unable to reject review.");
    }
  }

async function handleDelete(id: string) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this review?"
  );

  if (!confirmed) return;

  try {
    const response = await fetch(`/api/reviews/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Unable to delete review."
      );
    }

    setReviews((currentReviews) =>
      currentReviews.filter((review) => review._id !== id)
    );

    alert("Review deleted successfully.");
  } catch (error) {
    console.error("Delete review error:", error);

    alert(
      error instanceof Error
        ? error.message
        : "Unable to delete review."
    );
  }
}

  /*
   * These counts are intentionally calculated from the
   * reviews already loaded from your API.
   */
  const approvedReviews = reviews.filter(
    (review) =>
      Boolean(
        (review as ReviewRecord & {
          isApproved?: boolean;
          status?: string;
        }).isApproved
      ) ||
      (
        review as ReviewRecord & {
          status?: string;
        }
      ).status === "approved"
  ).length;

  const pendingReviews = Math.max(
    reviews.length - approvedReviews,
    0
  );

  return (
    <AdminGuard>
      <div className="flex min-h-screen flex-col bg-[#faf8fc] md:flex-row">
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-x-hidden p-3 sm:p-4 md:p-6 lg:p-8">
          {/* HEADER */}
          <section className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-5 text-white shadow-lg shadow-purple-100 sm:rounded-3xl sm:p-6 lg:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              {/* TITLE */}
              <div className="min-w-0">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                    <MessageSquareText className="h-5 w-5" />
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-100">
                    Customer Feedback
                  </p>
                </div>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Reviews
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-purple-100 sm:text-base">
                  Manage customer reviews, feedback and
                  testimonials for your tailoring business.
                </p>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:min-w-[330px]">
                <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm sm:rounded-2xl sm:p-4">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-purple-100" />

                    <p className="text-[11px] text-purple-100 sm:text-xs">
                      Total
                    </p>
                  </div>

                  <p className="mt-1 text-xl font-bold sm:text-2xl">
                    {reviews.length}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm sm:rounded-2xl sm:p-4">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-purple-100" />

                    <p className="text-[11px] text-purple-100 sm:text-xs">
                      Approved
                    </p>
                  </div>

                  <p className="mt-1 text-xl font-bold sm:text-2xl">
                    {approvedReviews}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm sm:rounded-2xl sm:p-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-purple-100" />

                    <p className="text-[11px] text-purple-100 sm:text-xs">
                      Pending
                    </p>
                  </div>

                  <p className="mt-1 text-xl font-bold sm:text-2xl">
                    {pendingReviews}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION HEADER */}
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Customer Reviews
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review and manage feedback submitted by
                your customers.
              </p>
            </div>

            {!loading && reviews.length > 0 && (
              <div className="flex w-fit items-center gap-2 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700">
                <ThumbsUp className="h-3.5 w-3.5" />
                {reviews.length}{" "}
                {reviews.length === 1
                  ? "Review"
                  : "Reviews"}
              </div>
            )}
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="rounded-2xl border border-purple-100 bg-white p-10 text-center shadow-sm sm:rounded-3xl">
              <div className="mx-auto mb-4 flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                <MessageSquareText className="h-6 w-6" />
              </div>

              <p className="text-sm font-medium text-slate-600">
                Loading reviews...
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Please wait a moment.
              </p>
            </div>
          ) : reviews.length === 0 ? (
            /* EMPTY STATE */
            <div className="rounded-2xl border border-dashed border-purple-200 bg-white p-8 text-center shadow-sm sm:rounded-3xl sm:p-12">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600">
                <MessageSquareText className="h-7 w-7" />
              </div>

              <h2 className="text-lg font-bold text-slate-800">
                No reviews yet
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Customer reviews and feedback will appear
                here when they are submitted.
              </p>
            </div>
          ) : (
            /* REVIEWS */
            <div className="min-w-0 overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm sm:rounded-3xl">
              {/* TABLE HEADER */}
              <div className="border-b border-purple-50 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-4 sm:px-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                    <Star className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-800">
                      Review Management
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Approve, reject or delete customer
                      feedback.
                    </p>
                  </div>
                </div>
              </div>

              {/* RESPONSIVE TABLE */}
              <div className="min-w-0 overflow-x-auto">
                <div className="min-w-[700px]">
                  <ReviewTable
                    reviews={reviews}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            </div>
          )}

          {/* BOTTOM TIP */}
          {!loading && (
            <div className="mt-6 rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50 via-white to-pink-50 p-4 sm:rounded-3xl sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <Star className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Customer feedback matters
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                    Keep genuine customer feedback visible
                    on your website to help visitors understand
                    the quality of your tailoring services.
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