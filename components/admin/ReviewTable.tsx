"use client";

import { Check, X, Trash2 } from "lucide-react";

export type ReviewRecord = {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt?: string;
};

export default function ReviewTable({
  reviews,
  onApprove,
  onReject,
  onDelete
}: {
  reviews: ReviewRecord[];
  onApprove: (id: string) => Promise<void> | void;
  onReject: (id: string) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Rating</th>
            <th className="px-4 py-3 font-medium">Comment</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id} className="border-t border-slate-200 align-top">
              <td className="px-4 py-3 font-medium text-slate-800">{review.name}</td>
              <td className="px-4 py-3 text-amber-500">{"★".repeat(review.rating)}</td>
              <td className="max-w-md px-4 py-3 text-slate-600">{review.comment}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${review.isApproved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {review.isApproved ? "Approved" : "Pending"}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-500">{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "-"}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {!review.isApproved ? (
                    <button type="button" onClick={() => onApprove(review._id)} className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-medium text-white">
                      <Check size={14} /> Approve
                    </button>
                  ) : (
                    <button type="button" onClick={() => onReject(review._id)} className="inline-flex items-center gap-1 rounded-lg bg-amber-500 px-2.5 py-1.5 text-xs font-medium text-white">
                      <X size={14} /> Reject
                    </button>
                  )}

                  <button type="button" onClick={() => onDelete(review._id)} className="inline-flex items-center gap-1 rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-medium text-white">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
