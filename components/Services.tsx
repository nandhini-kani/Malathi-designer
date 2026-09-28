"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

import SectionHeading from "@/components/SectionHeading";
import EmptyState from "@/components/EmptyState";

type Service = {
  _id: string;
  title: string;
  description: string;
  image?: string;
  price?: number | string;
  isActive?: boolean;
  sortOrder?: number;
};

export default function Services({
  preview = false,
}: {
  preview?: boolean;
}) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/services", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Unable to load services."
          );
        }

        const serviceList = Array.isArray(
          data?.data?.services
        )
          ? data.data.services
          : [];

        setServices(serviceList);
      } catch (error) {
        console.error("Load public services error:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  const activeServices = services.filter(
    (service) => service.isActive !== false
  );

  const shown = preview
    ? activeServices.slice(0, 6)
    : activeServices;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        <SectionHeading
          eyebrow="Our Services"
          title="Stitching Made for You"
          description="From everyday wear to special occasions, we create beautifully stitched outfits with a comfortable fit and personal touch."
        />

        {loading ? (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            Loading services...
          </div>
        ) : shown.length > 0 ? (
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {shown.map((service) => (
              <div
                key={service._id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* IMAGE */}
                <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-violet-100 via-purple-50 to-rose-50">

                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                          <span className="text-3xl">🧵</span>
                        </div>

                        <p className="text-sm font-medium text-violet-700">
                          Malathi Designer
                        </p>
                      </div>
                    </div>
                  )}

                  {/* IMAGE OVERLAY */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* SERVICE LABEL */}
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-violet-800 shadow-sm backdrop-blur">
                      Tailoring Service
                    </span>
                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <h3 className="text-xl font-bold text-violet-950">
                    {service.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>

                  {/* BOTTOM */}
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">

                    <div>
                      {service.price !== undefined &&
                      service.price !== null &&
                      String(service.price).trim() !== "" ? (
                        <>
                          <p className="text-xs text-slate-500">
                            Starting from
                          </p>

                          <p className="mt-1 text-lg font-bold text-rose-600">
                            ₹ {String(service.price)}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm font-medium text-slate-500">
                          Price on enquiry
                        </p>
                      )}
                    </div>

                    <a
                      href="https://wa.me/918248744594"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800"
                    >
                      <MessageCircle size={16} />
                      Enquire
                    </a>

                  </div>

                </div>
              </div>
            ))}

          </div>
        ) : (
          <div className="mt-10">
            <EmptyState message="Services will appear here after they are added from the admin panel." />
          </div>
        )}

      </div>
    </section>
  );
}