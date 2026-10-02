"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";

import SectionHeading from "@/components/SectionHeading";
import EmptyState from "@/components/EmptyState";

type GalleryItem = {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  publicId?: string;
  category?: string;
  isActive: boolean;
};

export default function Gallery({
  preview = false,
}: {
  preview?: boolean;
}) {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        const response = await fetch("/api/gallery", {
          cache: "no-store",
        });

        const data = await response.json();

        console.log("Gallery API:", data);

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load gallery"
          );
        }

        const galleryList = Array.isArray(
          data?.data?.gallery
        )
          ? data.data.gallery
          : [];

        setGallery(galleryList);
      } catch (error) {
        console.error("Gallery fetch error:", error);
        setGallery([]);
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, []);

  const activeGallery = gallery.filter(
    (item) => item.isActive !== false
  );

  const shown = preview
    ? activeGallery.slice(0, 6)
    : activeGallery;

  const toggleDescription = (id: string) => {
    setExpandedId((current) =>
      current === id ? null : id
    );
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        {/* SECTION HEADING */}
        <SectionHeading
          eyebrow="Our Gallery"
          title="Our Tailoring Collection"
          description="Explore our latest blouse, frock, churidar, kidswear and custom tailoring designs."
        />

        {/* LOADING */}
        {loading ? (
          <div className="mt-12 rounded-2xl border border-violet-100 bg-violet-50/40 p-10 text-center text-sm text-violet-600">
            Loading gallery...
          </div>
        ) : shown.length > 0 ? (

          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {shown.map((item) => {
              const isExpanded =
                expandedId === item._id;

              const hasLongDescription =
                Boolean(
                  item.description &&
                    item.description.length > 100
                );

              return (
                <article
                  key={item._id}
                  className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_7px_20px_rgba(0,0,0,0.08)]"
                >

                  {/* IMAGE */}
                  {/* IMAGE */}
<div className="relative h-[360px] w-full overflow-hidden bg-violet-50">

  {item.imageUrl ? (
    <Image
      src={item.imageUrl}
      alt={item.title}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
    />
  ) : (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
          <span className="text-3xl">🧵</span>
        </div>

        <p className="mt-3 text-sm font-semibold text-violet-700">
          Malathi Designer
        </p>
      </div>
    </div>
  )}

  {/* CATEGORY */}
  {item.category && (
    <div className="absolute left-5 top-5 z-10">
      <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-violet-800 shadow-sm backdrop-blur">
        {item.category}
      </span>
    </div>
  )}

</div>

                  {/* CONTENT */}
                 

<div className="px-5 pb-5 pt-4">

  {/* TITLE */}
  <h3 className="text-lg font-bold tracking-tight text-violet-950">
    {item.title}
  </h3>

  {/* DESCRIPTION */}
  {item.description && (
    <div className="mt-2">

      <p
        className={`text-sm leading-6 text-slate-600 ${
          isExpanded ? "" : "line-clamp-2"
        }`}
      >
        {item.description}
      </p>

      {/* READ MORE */}
      {hasLongDescription && (
        <button
          type="button"
          onClick={() =>
            toggleDescription(item._id)
          }
          className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-violet-700 transition hover:text-violet-900"
        >
          {isExpanded ? (
            <>
              Less
              <ChevronUp size={13} />
            </>
          ) : (
            <>
              Read more
              <ChevronDown size={13} />
            </>
          )}
        </button>
      )}

    </div>
  )}

  {/* UNIQUE SMALL LINE */}
  <div className="mt-2 flex justify-center items-center gap-2">
    <span className="h-px w-8 bg-violet-300" />

    <span className="text-[11px] font-medium tracking-wide text-violet-500">
      Made with care
    </span>

    <span className="h-px w-8 bg-violet-300" />
  </div>

</div>



                </article>
              );
            })}

          </div>

        ) : (
          <div className="mt-10">
            <EmptyState
              message="Gallery items will appear here after they are added from the admin panel."
            />
          </div>
        )}

      </div>
    </section>
  );
}