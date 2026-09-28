"use client";

import {
  useEffect,
  useState
} from "react";

import {
  Scissors
} from "lucide-react";

import SectionHeading from "@/components/SectionHeading";
import EmptyState from "@/components/EmptyState";

type Service = {
  _id: string;
  title: string;
  description: string;
  image?: string;
};

export default function Services({
  preview = false
}: {
  preview?: boolean;
}) {
  const [services, setServices] =
    useState<Service[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((response) =>
        response.json()
      )
      .then((data) =>
        setServices(
          data.services || []
        )
      )
      .catch(() => {});
  }, []);

  const shown = preview
    ? services.slice(0, 6)
    : services;

  return (
    <section className="section-padding bg-white">

      <div className="container-custom">

        <SectionHeading
          eyebrow="Our Services"
          title="Tailoring for Every Style"
          description="Choose a stitching service and discuss your preferred design and fitting."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {shown.map(
            (service) => (
              <div
                key={service._id}
                className="premium-card overflow-hidden"
              >

                <div className="grid h-44 place-items-center bg-gradient-to-br from-violet-100 to-blue-50">
                  <Scissors
                    size={46}
                    className="text-violet-500"
                  />
                </div>

                <div className="p-6">

                  <h3 className="text-xl font-bold text-violet-950">
                    {service.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {service.description}
                  </p>

                </div>

              </div>
            )
          )}

        </div>

        {!services.length && (
          <div className="mt-10">
            <EmptyState message="Services will appear here after they are added from the admin panel." />
          </div>
        )}

      </div>

    </section>
  );
}