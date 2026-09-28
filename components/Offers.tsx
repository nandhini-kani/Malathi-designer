"use client";

import { useEffect, useState } from "react";

import SectionHeading from "@/components/SectionHeading";
import EmptyState from "@/components/EmptyState";

type Offer = {
  _id: string;
  title: string;
  description: string;
  discount?: string;
  image?: string;
  startDate?: string | null;
  endDate?: string | null;
  isActive?: boolean;
};

export default function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOffers() {
      try {
        const response = await fetch("/api/offers");

        if (!response.ok) {
          throw new Error("Unable to load offers");
        }

        const data = await response.json();

        setOffers(data.data?.offers || []);
      } catch (error) {
        console.error("Offers loading error:", error);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    }

    loadOffers();
  }, []);

  function formatDate(date?: string | null) {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <main className="min-h-screen bg-[#FCFAFF]">
      <section className="relative overflow-hidden bg-[#FCFAFF]">

        {/* Background Decorations */}
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-purple-200/20 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl" />

        <div className="container-custom relative px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

          {/* Heading */}
          <SectionHeading
            eyebrow="Current Offers"
            title="Offers & Updates"
            description="Discover our latest offers and special updates from Malathi Designer."
          />

          {/* Loading */}
          {loading && (
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">

              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-3xl border border-violet-100 bg-white p-6 shadow-sm sm:p-7"
                >
                  <div className="h-7 w-28 rounded-full bg-violet-100" />

                  <div className="mt-5 h-8 w-3/4 rounded bg-violet-100" />

                  <div className="mt-4 h-4 w-full rounded bg-slate-100" />

                  <div className="mt-2 h-4 w-5/6 rounded bg-slate-100" />

                  <div className="mt-6 h-3 w-32 rounded bg-slate-100" />
                </div>
              ))}

            </div>
          )}

          {/* Offers */}
          {!loading && offers.length > 0 && (
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">

              {offers.map((offer) => (
                <div
                  key={offer._id}
                  className="group relative overflow-hidden rounded-3xl border border-violet-100 bg-white p-6 shadow-lg shadow-violet-100/30 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7"
                >

                  {/* Card Decoration */}
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-violet-100/60 blur-2xl transition group-hover:bg-purple-200/70" />

                  <div className="relative">

                    {/* Discount */}
                    <div className="inline-flex rounded-full bg-violet-50 px-4 py-2">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-600 sm:text-sm">
                        {offer.discount || "Special Offer"}
                      </p>
                    </div>

                    {/* Image */}
                    {offer.image && (
                      <div className="mt-5 overflow-hidden rounded-2xl">
                        <img
                          src={offer.image}
                          alt={offer.title}
                          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-60"
                        />
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="mt-5 text-2xl font-bold leading-tight text-violet-950 sm:text-3xl">
                      {offer.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                      {offer.description}
                    </p>

                    {/* Dates */}
                    {(offer.startDate || offer.endDate) && (
                      <div className="mt-6 border-t border-violet-100 pt-4">

                        {offer.startDate && (
                          <p className="text-xs text-slate-500">
                            Starts:{" "}
                            <span className="font-semibold text-violet-700">
                              {formatDate(offer.startDate)}
                            </span>
                          </p>
                        )}

                        {offer.endDate && (
                          <p className="mt-1 text-xs text-slate-500">
                            Valid until:{" "}
                            <span className="font-semibold text-violet-700">
                              {formatDate(offer.endDate)}
                            </span>
                          </p>
                        )}

                      </div>
                    )}

                  </div>
                </div>
              ))}

            </div>
          )}

          {/* Empty State */}
          {!loading && offers.length === 0 && (
            <div className="mx-auto mt-10 max-w-xl">
              <EmptyState message="No active offers have been added yet." />
            </div>
          )}

        </div>
      </section>
    </main>
  );
}