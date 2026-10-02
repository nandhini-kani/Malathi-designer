
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MessageCircle, Sparkles } from "lucide-react";

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
          <div className="mt-10 rounded-3xl border border-violet-100 bg-violet-50/50 p-10 text-center text-violet-700">
            Loading services...
          </div>
        ) : shown.length > 0 ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {shown.map((service) => (
              <article
                key={service._id}
                className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >

                {/* FULL IMAGE AREA */}
                <div className="relative h-[390px] w-full overflow-hidden bg-violet-50">

                  {/* Image */}
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
                          <span className="text-4xl">🧵</span>
                        </div>

                        <p className="mt-4 text-sm font-semibold text-violet-700">
                          Malathi Designer
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="absolute left-5 top-5 z-20">
                    <div className="flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-bold text-violet-800 shadow-md backdrop-blur-md">
                      <Sparkles size={13} />
                      Tailoring Service
                    </div>
                  </div>

                </div>

                {/* CONTENT */}
                <div className="px-4 py-3">

                  <h3 className="text-lg font-bold tracking-tight text-violet-950">
                    {service.title}
                  </h3>

                  <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-slate-600">
                    {service.description}
                  </p>

                  <div className="my-2.5 h-px bg-slate-100" />

                  <div className="flex items-center justify-between gap-3">

                    <div>
                      {service.price !== undefined &&
                      service.price !== null &&
                      String(service.price).trim() !== "" ? (
                        <>
                          <p className="text-[11px] font-medium text-slate-500">
                            Starting from
                          </p>

                          <p className="mt-0.5 text-base font-bold text-violet-900">
                            ₹{String(service.price)}
                          </p>
                        </>
                      ) : (
                        <p className="text-xs font-medium text-slate-500">
                          Price on enquiry
                        </p>
                      )}
                    </div>

                    <a
                      href="https://wa.me/918248744594"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-violet-700 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-violet-800"
                    >
                      <MessageCircle size={14} />
                      Enquire
                    </a>

                  </div>

                </div>

              </article>
            ))}

          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              message="Services will appear here after they are added from the admin panel."
            />
          </div>
        )}

      </div>
    </section>
  );
}

