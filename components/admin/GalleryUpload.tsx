"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const categories = [
  "Blouse",
  "Dress",
  "Churidar",
  "Kids",
  "Alteration",
  "Other",
];

export type GalleryFormValues = {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  publicId: string;
  isActive: boolean;
};

type GalleryUploadProps = {
  initialValues?: Partial<GalleryFormValues>;
  onSubmit: (values: GalleryFormValues) => Promise<void> | void;
  submitLabel?: string;
};

export default function GalleryUpload({
  initialValues,
  onSubmit,
  submitLabel = "Save image",
}: GalleryUploadProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);

  const [imageError, setImageError] = useState("");
  const [formError, setFormError] = useState("");

  /*
   * IMPORTANT:
   * This keeps the form values synchronized when you click Edit
   * and the initialValues change.
   */
  useEffect(() => {
    setTitle(initialValues?.title || "");
    setDescription(initialValues?.description || "");
    setCategory(initialValues?.category || "Other");
    setImageUrl(initialValues?.imageUrl || "");
    setPublicId(initialValues?.publicId || "");
    setIsActive(initialValues?.isActive ?? true);

    setImageError("");
    setFormError("");
  }, [initialValues]);

  async function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageError("");
    setFormError("");

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
        throw new Error(
          data.message || "Image upload failed."
        );
      }

      const uploadedUrl =
        data.data?.url ||
        data.data?.secure_url ||
        "";

      const uploadedPublicId =
        data.data?.publicId ||
        data.data?.public_id ||
        "";

      if (!uploadedUrl) {
        throw new Error(
          "Upload completed, but Cloudinary URL was not returned."
        );
      }

      setImageUrl(uploadedUrl);
      setPublicId(uploadedPublicId);
    } catch (error) {
      console.error(
        "Gallery image upload error:",
        error
      );

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

    setFormError("");
    setImageError("");

    if (!title.trim()) {
      setFormError("Please enter a gallery title.");
      return;
    }

    if (!imageUrl.trim()) {
      setImageError(
        "Please upload a gallery image first."
      );
      return;
    }

    setSaving(true);

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        category,
        imageUrl,
        publicId,
        isActive,
      });
    } catch (error) {
      console.error(
        "Save gallery error:",
        error
      );

      setFormError(
        error instanceof Error
          ? error.message
          : "Unable to save gallery image."
      );
    } finally {
      setSaving(false);
    }
  }

  function removeImage() {
    setImageUrl("");
    setPublicId("");
    setImageError("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      {/* FORM ERROR */}

      {formError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {formError}
        </div>
      )}

      {/* TITLE + CATEGORY */}

      <div className="grid ">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Gallery title
          </label>

          <input
            type="text"
            required
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="Example: Designer Blouse"
            disabled={saving}
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100 disabled:bg-slate-100"
          />
        </div>

        {/* <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Category
          </label>

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            disabled={saving}
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100 disabled:bg-slate-100"
          >
            {categories.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div> */}
      </div>

      {/* DESCRIPTION */}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Description
        </label>

        <textarea
          rows={4}
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          disabled={saving}
          placeholder="Example: Beautiful custom stitching with neat finishing and perfect fitting."
          className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100 disabled:bg-slate-100"
        />
      </div>

      {/* IMAGE */}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Gallery image
        </label>

        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3">
          {imageUrl ? (
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt={title || "Gallery image"}
                width={1200}
                height={800}
                className="h-64 w-full object-cover"
              />

              {!saving && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-2 top-2 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-black"
                >
                  Remove
                </button>
              )}
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg bg-white text-center">
              <div className="mb-3 text-4xl">
                🖼️
              </div>

              <p className="text-sm font-medium text-slate-700">
                Upload gallery image
              </p>

              <p className="mt-1 text-xs text-slate-500">
                JPG, PNG, WEBP • Maximum 5MB
              </p>
            </div>
          )}

          {/* CHOOSE / CHANGE IMAGE */}

          <label
            className={`mt-3 flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition ${
              uploadingImage || saving
                ? "cursor-not-allowed bg-slate-400"
                : "cursor-pointer bg-violet-700 hover:bg-violet-800"
            }`}
          >
            {uploadingImage
              ? "Uploading..."
              : imageUrl
                ? "Change Image"
                : "Choose Image"}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleImageUpload}
              disabled={
                uploadingImage || saving
              }
              className="hidden"
            />
          </label>
        </div>

        {imageError && (
          <p className="mt-2 text-sm text-red-600">
            {imageError}
          </p>
        )}
      </div>

      {/* ACTIVE */}

      <div>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={isActive}
            disabled={saving}
            onChange={(event) =>
              setIsActive(event.target.checked)
            }
            className="h-4 w-4 accent-violet-700"
          />

          <span>
            <span className="block font-medium">
              Active gallery image
            </span>

            <span className="text-xs text-slate-500">
              Show this image on the public gallery
            </span>
          </span>
        </label>
      </div>

      {/* SAVE BUTTON */}

      <button
        type="submit"
        disabled={saving || uploadingImage}
        className="w-full rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-3 font-semibold text-white shadow-sm transition hover:from-rose-600 hover:to-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {uploadingImage
          ? "Uploading image..."
          : saving
            ? "Saving..."
            : submitLabel}
      </button>
    </form>
  );
}