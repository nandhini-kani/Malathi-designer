"use client";

import { Trash2 } from "lucide-react";

export type EnquiryRecord = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message: string;
  status: "new" | "contacted" | "completed";
  createdAt?: string;
};

export default function EnquiryTable({
  enquiries,
  onStatusChange,
  onDelete
}: {
  enquiries: EnquiryRecord[];
  onStatusChange: (id: string, status: "new" | "contacted" | "completed") => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Phone</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Service</th>
            <th className="px-4 py-3 font-medium">Message</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enquiry) => (
            <tr key={enquiry._id} className="border-t border-slate-200 align-top">
              <td className="px-4 py-3 font-medium text-slate-800">{enquiry.name}</td>
              <td className="px-4 py-3 text-slate-600">{enquiry.phone}</td>
              <td className="px-4 py-3 text-slate-600">{enquiry.email || "-"}</td>
              <td className="px-4 py-3 text-slate-600">{enquiry.service || "-"}</td>
              <td className="max-w-md px-4 py-3 text-slate-600">{enquiry.message}</td>
              <td className="px-4 py-3">
                <select
                  value={enquiry.status}
                  onChange={(event) => onStatusChange(enquiry._id, event.target.value as "new" | "contacted" | "completed")}
                  className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
              <td className="px-4 py-3 text-slate-500">{enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleDateString() : "-"}</td>
              <td className="px-4 py-3">
                <button type="button" onClick={() => onDelete(enquiry._id)} className="inline-flex items-center gap-1 rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-medium text-white">
                  <Trash2 size={14} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
