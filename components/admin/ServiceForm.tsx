"use client";

import { useState } from "react";
import Image from "next/image";

export type ServiceFormValues = {
  title: string;
  description: string;
  image: string;
  price: string;
  isActive: boolean;
  sortOrder: number;
};

const emptyForm: ServiceFormValues = {
  title: "",
  description: "",
  image: "",
  price: "",
  isActive: true,
  sortOrder: 0,
};

export default function ServiceForm({
  initialValues,
  onSubmit,
  onSuccess,
  submitLabel = "Save service",
}: {
  initialValues?: Partial<ServiceFormValues>;
  onSubmit: (values: ServiceFormValues) => Promise<void> | void;
  onSuccess?: () => void;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<ServiceFormValues>({
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    image: initialValues?.image ?? "",
    price: initialValues?.price ?? "",
    isActive: initialValues?.isActive ?? true,
    sortOrder: initialValues?.sortOrder ?? 0,
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState("");

  async function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageError("");

    if (!file.type.startsWith("image/")) {
      setImageError("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size must be less than 5MB.");
      event.target.value = "";
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Image upload failed.");
      }

      const uploadedUrl = data?.data?.url;

      if (!uploadedUrl) {
        throw new Error(
          "Upload succeeded, but image URL was not returned."
        );
      }

      setValues((current) => ({
        ...current,
        image: uploadedUrl,
      }));
    } catch (error) {
      console.error("Image upload error:", error);

      setImageError(
        error instanceof Error
          ? error.message
          : "Unable to upload image."
      );
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setImageError("");

    const trimmedTitle = values.title.trim();
    const trimmedDescription = values.description.trim();

    if (!trimmedTitle) {
      setImageError("Please enter a service title.");
      return;
    }

    if (!trimmedDescription) {
      setImageError("Please enter a service description.");
      return;
    }

    if (!values.image) {
      setImageError("Please upload a service image.");
      return;
    }

    setLoading(true);

    try {
      const cleanedValues: ServiceFormValues = {
        title: trimmedTitle,
        description: trimmedDescription,
        image: values.image,
        price: values.price.trim(),
        isActive: values.isActive,
        sortOrder: Number(values.sortOrder) || 0,
      };

      /*
       * Save / update service.
       */
      await onSubmit(cleanedValues);

      /*
       * IMPORTANT:
       * Clear the form after successful save.
       */
      setValues({ ...emptyForm });

      setImageError("");

      /*
       * Tell parent page that save/update finished.
       * Parent should clear editingId here.
       */
      onSuccess?.();

      /*
       * Scroll to top.
       */
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Save service error:", error);

      setImageError(
        error instanceof Error
          ? error.message
          : "Unable to save service."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-purple-100 bg-white p-4 shadow-sm shadow-purple-100 sm:p-5"
    >
      {/* ================= TITLE ================= */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
          Service title
        </label>

        <input
          required
          value={values.title}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              title: event.target.value,
            }))
          }
          placeholder="Example: Blouse Stitching"
          className="
            w-full rounded-xl border border-slate-200
            bg-white px-3 py-2.5 text-sm text-slate-800
            outline-none transition
            placeholder:text-slate-400
            focus:border-purple-400
            focus:ring-2 focus:ring-purple-100
          "
        />
      </div>

      {/* ================= DESCRIPTION ================= */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
          Description
        </label>

        <textarea
          required
          rows={4}
          value={values.description}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              description: event.target.value,
            }))
          }
          placeholder="Example: Custom blouse stitching with neat finishing and perfect fitting."
          className="
            w-full resize-none rounded-xl border border-slate-200
            bg-white px-3 py-2.5 text-sm text-slate-800
            outline-none transition
            placeholder:text-slate-400
            focus:border-purple-400
            focus:ring-2 focus:ring-purple-100
          "
        />
      </div>

      {/* ================= IMAGE + PRICE ================= */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* IMAGE */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Service image
          </label>

          <div className="rounded-xl border border-dashed border-purple-200 bg-purple-50/40 p-3">
            {values.image ? (
              <div className="relative overflow-hidden rounded-xl border border-purple-100 bg-white">
                <Image
                  src={values.image}
                  alt={values.title || "Service image"}
                  width={600}
                  height={400}
                  className="h-44 w-full object-cover"
                  unoptimized
                />

                <button
                  type="button"
                  onClick={() =>
                    setValues((current) => ({
                      ...current,
                      image: "",
                    }))
                  }
                  className="
                    absolute right-2 top-2 rounded-lg
                    bg-black/70 px-3 py-1.5
                    text-xs font-semibold text-white
                    transition hover:bg-black
                  "
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex h-44 flex-col items-center justify-center rounded-xl bg-white text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl">
                  🖼️
                </div>

                <p className="text-sm font-semibold text-slate-700">
                  Upload service image
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  JPG, PNG, WEBP • Maximum 5MB
                </p>
              </div>
            )}

            <label
              className="
                mt-3 flex cursor-pointer items-center
                justify-center rounded-xl
                bg-gradient-to-r from-violet-600
                via-purple-600 to-fuchsia-600
                px-4 py-2.5 text-sm font-semibold
                text-white shadow-sm shadow-purple-200
                transition hover:opacity-95
              "
            >
              {uploadingImage
                ? "Uploading..."
                : values.image
                  ? "Change Image"
                  : "Choose Image"}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="hidden"
              />
            </label>
          </div>

          {imageError && (
            <p className="mt-2 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">
              {imageError}
            </p>
          )}
        </div>

        {/* PRICE */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Starting price
          </label>

          <input
            value={values.price}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                price: event.target.value,
              }))
            }
            placeholder="Example: 500"
            className="
              w-full rounded-xl border border-slate-200
              bg-white px-3 py-2.5 text-sm text-slate-800
              outline-none transition
              placeholder:text-slate-400
              focus:border-purple-400
              focus:ring-2 focus:ring-purple-100
            "
          />

          <p className="mt-1.5 text-xs text-slate-500">
            Leave empty if price depends on the design.
          </p>
        </div>
      </div>

      {/* ================= SORT + ACTIVE ================= */}
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Sort order
          </label>

          <input
            type="number"
            min="0"
            value={values.sortOrder}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                sortOrder: Number(event.target.value),
              }))
            }
            className="
              w-full rounded-xl border border-slate-200
              bg-white px-3 py-2.5 text-sm text-slate-800
              outline-none transition
              focus:border-purple-400
              focus:ring-2 focus:ring-purple-100
            "
          />

          <p className="mt-1.5 text-xs text-slate-500">
            0 appears first, then 1, 2, 3...
          </p>
        </div>

        <div className="flex items-end">
          <label
            className="
              flex w-full cursor-pointer items-center gap-3
              rounded-xl border border-purple-100
              bg-purple-50/40 px-4 py-3
              text-sm text-slate-700
            "
          >
            <input
              type="checkbox"
              checked={values.isActive}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  isActive: event.target.checked,
                }))
              }
              className="h-4 w-4 accent-purple-600"
            />

            <span>
              <span className="block font-semibold">
                Active service
              </span>

              <span className="text-xs text-slate-500">
                Show this service on the public website
              </span>
            </span>
          </label>
        </div>
      </div>

      {/* ================= ERROR ================= */}
      {imageError && (
        <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {imageError}
        </div>
      )}

      {/* ================= SUBMIT ================= */}
      <button
        type="submit"
        disabled={loading || uploadingImage}
        className="
          w-full rounded-xl
          bg-gradient-to-r from-violet-600
          via-purple-600 to-fuchsia-600
          px-4 py-3 text-sm font-semibold
          text-white shadow-sm shadow-purple-200
          transition hover:opacity-95
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {uploadingImage
          ? "Uploading image..."
          : loading
            ? "Saving..."
            : submitLabel}
      </button>
    </form>
  );
}