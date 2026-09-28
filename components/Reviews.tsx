"use client";

import { useEffect, useState } from "react";
import { Send, Star } from "lucide-react";

import SectionHeading from "@/components/SectionHeading";
import EmptyState from "@/components/EmptyState";

type Review = {
  _id: string;
  name: string;
  rating: number;
  comment: string;
};

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    try {
      const response = await fetch("/api/reviews", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error(
          "Unable to load reviews:",
          data.message
        );
        return;
      }

      setReviews(data.data?.reviews || []);
    } catch (error) {
      console.error("Reviews loading error:", error);
    }
  }

  async function submitReview(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedComment = comment.trim();

    if (!trimmedName || !trimmedComment) {
      alert("Name and review are required.");
      return;
    }

    if (rating < 1 || rating > 5) {
      alert("Please select a rating.");
      return;
    }

    setLoading(true);
    setSubmitted(false);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          rating: Number(rating),
          comment: trimmedComment,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.message ||
            "Unable to submit your review."
        );
        return;
      }

      /*
       * Add the newly created review immediately
       * to the page.
       */
      if (data.data?.review) {
        const newReview: Review = {
          _id: String(data.data.review._id),
          name: data.data.review.name,
          rating: Number(data.data.review.rating),
          comment: data.data.review.comment,
        };

        setReviews((currentReviews) => [
          newReview,
          ...currentReviews,
        ]);
      } else {
        await loadReviews();
      }

      // Clear form
      setName("");
      setRating(5);
      setComment("");

      // Show success message
      setSubmitted(true);
    } catch (error) {
      console.error(
        "Review submission error:",
        error
      );

      alert(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section-padding bg-violet-50/50">
      <div className="container-custom">

        {/* Heading */}
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Customers Share"
          description="See what our customers say about their stitching experience."
        />

        {/* Reviews */}
        {reviews.length > 0 ? (
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="premium-card p-7"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({
                    length: review.rating,
                  }).map((_, index) => (
                    <Star
                      key={index}
                      size={17}
                      fill="currentColor"
                      className="text-violet-500"
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="mt-5 leading-7 text-slate-600">
                  “{review.comment}”
                </p>

                {/* Customer Name */}
                <p className="mt-5 font-bold text-violet-950">
                  {review.name}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              message="Be the first customer to share your experience."
            />
          </div>
        )}

        {/* Write Review */}
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="rounded-3xl border border-violet-100 bg-white p-6 shadow-lg shadow-violet-100/40 sm:p-8">

            {/* Form Heading */}
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                Share Your Experience
              </p>

              <h2 className="mt-2 text-2xl font-bold text-violet-950 sm:text-3xl">
                Write a Review
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                We would love to hear about your experience
                with Malathi Designer.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={submitReview}
              className="mt-8 space-y-5"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="review-name"
                  className="mb-2 block text-sm font-semibold text-violet-950"
                >
                  Your Name
                </label>

                <input
                  id="review-name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-violet-100 bg-[#FCFAFF] px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
                />
              </div>

              {/* Rating */}
              <div>
                <p className="mb-2 text-sm font-semibold text-violet-950">
                  Your Rating
                </p>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      aria-label={`${value} star rating`}
                      className="rounded-lg p-1 transition hover:bg-violet-50"
                    >
                      <Star
                        size={28}
                        fill={
                          value <= rating
                            ? "currentColor"
                            : "none"
                        }
                        className={
                          value <= rating
                            ? "text-violet-500"
                            : "text-slate-300"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label
                  htmlFor="review-comment"
                  className="mb-2 block text-sm font-semibold text-violet-950"
                >
                  Your Review
                </label>

                <textarea
                  id="review-comment"
                  value={comment}
                  onChange={(event) =>
                    setComment(event.target.value)
                  }
                  required
                  rows={5}
                  placeholder="Tell us about your experience..."
                  className="w-full resize-none rounded-xl border border-violet-100 bg-[#FCFAFF] px-4 py-3 text-sm leading-6 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={18} />

                {loading
                  ? "Submitting..."
                  : "Submit Review"}
              </button>

              {/* Success */}
              {submitted && (
                <div className="rounded-xl border border-green-100 bg-green-50 p-3 text-center text-sm font-medium text-green-700">
                  Thank you! Your review has been added
                  successfully.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}