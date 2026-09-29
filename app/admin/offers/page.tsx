"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Edit3,
  Gift,
  Percent,
  Plus,
  Tag,
  Trash2,
  X,
} from "lucide-react";

import AdminGuard from "@/components/admin/AdminGuard";
import OfferForm from "@/components/admin/OfferForm";
import Sidebar from "@/components/admin/Sidebar";

type OfferItem = {
  _id: string;
  title: string;
  description: string;
  discount: string;
  image?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
};

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function fetchOffers(): Promise<OfferItem[]> {
    const response = await fetch("/api/offers", {
      method: "GET",
      cache: "no-store",
    });
    const data = await response.json();

    return Array.isArray(data?.data?.offers)
      ? data.data.offers
      : [];
  }

  useEffect(() => {
    let isMounted = true;

    fetchOffers()
      .then((offers) => {
        if (isMounted) setOffers(offers);
      })
      .catch((error) => {
        console.error("Failed to fetch offers:", error);
        if (isMounted) setOffers([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  async function refreshOffers() {
    setLoading(true);

    try {
      setOffers(await fetchOffers());
    } catch (error) {
      console.error("Failed to fetch offers:", error);
      setOffers([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(values: {
    title: string;
    description: string;
    discount: string;
    image: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
  }) {
    try {
      const response = editingId
        ? await fetch(`/api/offers/${editingId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
        : await fetch("/api/offers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Unable to save offer.");
        return;
      }

      alert(
        editingId
          ? "Offer updated successfully."
          : "Offer created successfully."
      );

      setEditingId(null);

      await refreshOffers();
    } catch (error) {
      console.error("Save offer error:", error);
      alert("Something went wrong while saving the offer.");
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this offer?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/offers/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Unable to delete offer.");
        return;
      }

      if (editingId === id) {
        setEditingId(null);
      }

      await refreshOffers();
    } catch (error) {
      console.error("Delete offer error:", error);
      alert("Something went wrong while deleting the offer.");
    }
  }

  async function handleToggle(
    id: string,
    currentValue: boolean
  ) {
    const item = offers.find(
      (offer) => offer._id === id
    );

    if (!item) {
      return;
    }

    try {
      const response = await fetch(`/api/offers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...item,
          isActive: !currentValue,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.message ||
            "Unable to change offer status."
        );
        return;
      }

      await refreshOffers();
    } catch (error) {
      console.error("Toggle offer error:", error);
      alert(
        "Something went wrong while changing the status."
      );
    }
  }

  function handleEdit(id: string) {
    setEditingId(id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleCancelEdit() {
    setEditingId(null);
  }

  const activeOffers = offers.filter(
    (offer) => offer.isActive
  ).length;

  const inactiveOffers =
    offers.length - activeOffers;

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
                    <Gift className="h-5 w-5" />
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-100">
                    Promotions
                  </p>
                </div>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Offers
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-purple-100 sm:text-base">
                  Create and manage special offers, discounts
                  and promotions for your customers.
                </p>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:min-w-[330px]">
                <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm sm:rounded-2xl sm:p-4">
                  <p className="text-[11px] text-purple-100 sm:text-xs">
                    Total
                  </p>

                  <p className="mt-1 text-xl font-bold sm:text-2xl">
                    {offers.length}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm sm:rounded-2xl sm:p-4">
                  <p className="text-[11px] text-purple-100 sm:text-xs">
                    Active
                  </p>

                  <p className="mt-1 text-xl font-bold sm:text-2xl">
                    {activeOffers}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm sm:rounded-2xl sm:p-4">
                  <p className="text-[11px] text-purple-100 sm:text-xs">
                    Disabled
                  </p>

                  <p className="mt-1 text-xl font-bold sm:text-2xl">
                    {inactiveOffers}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* EDIT MODE */}
          {editingId && (
            <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-purple-100 bg-purple-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <Edit3 className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-purple-900">
                    Editing offer
                  </p>

                  <p className="text-xs text-purple-600">
                    Update the offer details and save your changes.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCancelEdit}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-purple-200 bg-white px-4 py-2.5 text-sm font-semibold text-purple-700 transition hover:bg-purple-50 sm:w-auto"
              >
                <X className="h-4 w-4" />
                Cancel Edit
              </button>
            </div>
          )}

          {/* MAIN CONTENT */}
          <div className="grid gap-5 xl:grid-cols-[380px_minmax(0,1fr)]">
            {/* FORM */}
            <div className="min-w-0">
              <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm sm:rounded-3xl">
                {/* FORM HEADER */}
                <div className="border-b border-purple-50 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-4 sm:px-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                      {editingId ? (
                        <Edit3 className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </div>

                    <div>
                      <h2 className="text-base font-bold text-slate-800">
                        {editingId
                          ? "Edit Offer"
                          : "Create New Offer"}
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {editingId
                          ? "Update your promotion"
                          : "Add a new customer offer"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* FORM */}
                <div className="p-4 sm:p-5">
                  <OfferForm
                    key={editingId ?? "new-offer"}
                    initialValues={
                      editingId
                        ? offers.find(
                            (offer) =>
                              offer._id === editingId
                          )
                        : undefined
                    }
                    submitLabel={
                      editingId
                        ? "Update Offer"
                        : "Create Offer"
                    }
                    onSubmit={handleSave}
                  />
                </div>
              </div>
            </div>

            {/* OFFERS LIST */}
            <div className="min-w-0">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Your Offers
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {offers.length === 0
                      ? "No offers created yet."
                      : `${offers.length} ${
                          offers.length === 1
                            ? "offer"
                            : "offers"
                        } available`}
                  </p>
                </div>

                {!loading && offers.length > 0 && (
                  <div className="flex w-fit items-center gap-2 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700">
                    <Tag className="h-3.5 w-3.5" />
                    Promotions
                  </div>
                )}
              </div>

              {/* LOADING */}
              {loading ? (
                <div className="rounded-2xl border border-purple-100 bg-white p-10 text-center shadow-sm sm:rounded-3xl">
                  <div className="mx-auto mb-4 flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                    <Gift className="h-6 w-6" />
                  </div>

                  <p className="text-sm font-medium text-slate-600">
                    Loading offers...
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Please wait a moment.
                  </p>
                </div>
              ) : offers.length === 0 ? (
                /* EMPTY */
                <div className="rounded-2xl border border-dashed border-purple-200 bg-white p-8 text-center shadow-sm sm:rounded-3xl sm:p-12">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600">
                    <Gift className="h-7 w-7" />
                  </div>

                  <h2 className="text-lg font-bold text-slate-800">
                    No offers yet
                  </h2>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Create your first special offer using
                    the form.
                  </p>
                </div>
              ) : (
                /* OFFER CARDS */
                <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
                  {offers.map((offer) => (
                    <div
                      key={offer._id}
                      className="group overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-100 sm:rounded-3xl"
                    >
                      {/* IMAGE */}
                      {offer.image ? (
                        <div className="relative overflow-hidden bg-purple-50">
                          <img
                            src={offer.image}
                            alt={offer.title}
                            className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                          {/* DISCOUNT */}
                          <div className="absolute left-3 top-3">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-purple-700 shadow-md backdrop-blur-sm">
                              <Percent className="h-3.5 w-3.5" />
                              {offer.discount}
                            </span>
                          </div>

                          {/* STATUS */}
                          <div className="absolute right-3 top-3">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold shadow-md backdrop-blur-sm ${
                                offer.isActive
                                  ? "bg-emerald-50/95 text-emerald-700"
                                  : "bg-white/95 text-slate-600"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  offer.isActive
                                    ? "bg-emerald-500"
                                    : "bg-slate-400"
                                }`}
                              />

                              {offer.isActive
                                ? "Active"
                                : "Disabled"}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="relative flex h-32 items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
                          <Gift className="h-10 w-10 text-purple-200" />

                          <div className="absolute left-3 top-3">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1.5 text-xs font-bold text-purple-700">
                              <Percent className="h-3.5 w-3.5" />
                              {offer.discount}
                            </span>
                          </div>

                          <div className="absolute right-3 top-3">
                            <span
                              className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${
                                offer.isActive
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {offer.isActive
                                ? "Active"
                                : "Disabled"}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* CONTENT */}
                      <div className="p-4 sm:p-5">
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-slate-800 sm:text-lg">
                            {offer.title}
                          </h3>

                          <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-500 sm:text-sm">
                            {offer.description}
                          </p>
                        </div>

                        {/* DATES */}
                        {(offer.startDate ||
                          offer.endDate) && (
                          <div className="mt-4 flex items-center gap-2 rounded-xl bg-purple-50 px-3 py-2.5">
                            <CalendarDays className="h-4 w-4 shrink-0 text-purple-600" />

                            <div className="min-w-0 text-xs">
                              <p className="font-semibold text-purple-800">
                                Offer period
                              </p>

                              <p className="mt-0.5 truncate text-purple-600">
                                {offer.startDate
                                  ? new Date(
                                      offer.startDate
                                    ).toLocaleDateString()
                                  : "-"}{" "}
                                →{" "}
                                {offer.endDate
                                  ? new Date(
                                      offer.endDate
                                    ).toLocaleDateString()
                                  : "-"}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* ACTIONS */}
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(offer._id)
                            }
                            className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-xl border border-purple-100 bg-purple-50 px-2 py-2.5 text-xs font-semibold text-purple-700 transition hover:bg-purple-100"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleToggle(
                                offer._id,
                                Boolean(
                                  offer.isActive
                                )
                              )
                            }
                            className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />

                            <span>
                              {offer.isActive
                                ? "Disable"
                                : "Enable"}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(offer._id)
                            }
                            className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-xl bg-rose-50 px-2 py-2.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* BOTTOM TIP */}
          <div className="mt-6 rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50 via-white to-pink-50 p-4 sm:rounded-3xl sm:p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <Gift className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Make your offers stand out
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                  Add attractive discounts and limited-time
                  promotions to highlight your latest tailoring
                  services.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}