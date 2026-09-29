"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Edit3,
  ImageIcon,
  Images,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import AdminGuard from "@/components/admin/AdminGuard";
import GalleryUpload from "@/components/admin/GalleryUpload";
import Sidebar from "@/components/admin/Sidebar";

type GalleryItem = {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
  isActive?: boolean;
  publicId?: string;
};

type GalleryFormValues = {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  publicId: string;
  isActive: boolean;
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function fetchItems(): Promise<GalleryItem[]> {
    const response = await fetch("/api/gallery", {
      method: "GET",
      cache: "no-store",
    });
    const data = await response.json();

    console.log("Gallery API response:", data);

    return data?.success && Array.isArray(data?.data?.gallery)
      ? data.data.gallery
      : [];
  }

  useEffect(() => {
    let isMounted = true;

    fetchItems()
      .then((galleryItems) => {
        if (isMounted) setItems(galleryItems);
      })
      .catch((error) => {
        console.error("Failed to fetch gallery:", error);
        if (isMounted) setItems([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  async function refreshItems() {
    setLoading(true);

    try {
      setItems(await fetchItems());
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(values: GalleryFormValues) {
    try {
      const payload = {
        title: values.title,
        description: values.description,
        category: values.category,
        imageUrl: values.imageUrl,
        publicId: values.publicId,
        isActive: values.isActive,
      };

      const response = editingId
        ? await fetch(`/api/gallery/${editingId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/gallery", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Unable to save gallery item.");
        return;
      }

      alert(
        editingId
          ? "Gallery image updated successfully."
          : "Gallery image uploaded successfully."
      );

      setEditingId(null);

      await refreshItems();
    } catch (error) {
      console.error("Save gallery error:", error);
      alert("Something went wrong while saving the gallery image.");
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gallery image?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Unable to delete gallery item.");
        return;
      }

      if (editingId === id) {
        setEditingId(null);
      }

      await refreshItems();
    } catch (error) {
      console.error("Delete gallery error:", error);
      alert("Something went wrong while deleting the image.");
    }
  }

  async function handleToggle(
    id: string,
    currentValue: boolean
  ) {
    const item = items.find(
      (galleryItem) => galleryItem._id === id
    );

    if (!item) {
      return;
    }

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: item.title,
          description: item.description || "",
          category: item.category || "Other",
          imageUrl: item.imageUrl,
          publicId: item.publicId || "",
          isActive: !currentValue,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Unable to change status.");
        return;
      }

      await refreshItems();
    } catch (error) {
      console.error("Toggle gallery status error:", error);
      alert("Something went wrong while changing the status.");
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

  const activeCount = items.filter(
    (item) => item.isActive
  ).length;

  const disabledCount = items.length - activeCount;

  return (
    <AdminGuard>
      <div className="flex min-h-screen flex-col bg-[#faf8fc] md:flex-row">
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-x-hidden p-3 sm:p-4 md:p-6 lg:p-8">
          {/* PAGE HEADER */}
          <section className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-5 text-white shadow-lg shadow-purple-100 sm:rounded-3xl sm:p-6 lg:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                    <Images className="h-5 w-5" />
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-100">
                    Portfolio
                  </p>
                </div>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Gallery
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-purple-100 sm:text-base">
                  Upload and manage your tailoring portfolio images
                  beautifully in one place.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:min-w-[330px]">
                <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm sm:rounded-2xl sm:p-4">
                  <p className="text-[11px] text-purple-100 sm:text-xs">
                    Total
                  </p>

                  <p className="mt-1 text-xl font-bold sm:text-2xl">
                    {items.length}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm sm:rounded-2xl sm:p-4">
                  <p className="text-[11px] text-purple-100 sm:text-xs">
                    Active
                  </p>

                  <p className="mt-1 text-xl font-bold sm:text-2xl">
                    {activeCount}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm sm:rounded-2xl sm:p-4">
                  <p className="text-[11px] text-purple-100 sm:text-xs">
                    Disabled
                  </p>

                  <p className="mt-1 text-xl font-bold sm:text-2xl">
                    {disabledCount}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* EDIT MODE BAR */}
          {editingId && (
            <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-purple-100 bg-purple-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <Edit3 className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-purple-900">
                    Editing gallery image
                  </p>

                  <p className="text-xs text-purple-600">
                    Update the image details and save your changes.
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
            {/* UPLOAD FORM */}
            <div className="min-w-0">
              <div className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm sm:rounded-3xl">
                <div className="border-b border-purple-50 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-4 sm:px-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                      {editingId ? (
                        <Edit3 className="h-5 w-5" />
                      ) : (
                        <Upload className="h-5 w-5" />
                      )}
                    </div>

                    <div>
                      <h2 className="text-base font-bold text-slate-800">
                        {editingId
                          ? "Edit Gallery Image"
                          : "Add Gallery Image"}
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {editingId
                          ? "Update your portfolio image"
                          : "Add a new portfolio image"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <GalleryUpload
                    key={editingId ?? "new-gallery"}
                    initialValues={
                      editingId
                        ? items.find(
                            (item) => item._id === editingId
                          )
                        : undefined
                    }
                    submitLabel={
                      editingId
                        ? "Update Image"
                        : "Upload Image"
                    }
                    onSubmit={handleSave}
                  />
                </div>
              </div>
            </div>

            {/* GALLERY LIST */}
            <div className="min-w-0">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Your Portfolio
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {items.length === 0
                      ? "No images added yet."
                      : `${items.length} portfolio ${
                          items.length === 1
                            ? "image"
                            : "images"
                        }`}
                  </p>
                </div>

                {!loading && items.length > 0 && (
                  <div className="flex w-fit items-center gap-2 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700">
                    <ImageIcon className="h-3.5 w-3.5" />
                    Gallery
                  </div>
                )}
              </div>

              {loading ? (
                <div className="rounded-2xl border border-purple-100 bg-white p-10 text-center shadow-sm sm:rounded-3xl">
                  <div className="mx-auto mb-4 flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                    <Images className="h-6 w-6" />
                  </div>

                  <p className="text-sm font-medium text-slate-600">
                    Loading gallery...
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Please wait a moment.
                  </p>
                </div>
              ) : items.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-purple-200 bg-white p-8 text-center shadow-sm sm:rounded-3xl sm:p-12">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600">
                    <ImageIcon className="h-7 w-7" />
                  </div>

                  <h2 className="text-lg font-bold text-slate-800">
                    No gallery images
                  </h2>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Upload your first tailoring portfolio image
                    using the form.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="group overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-100 sm:rounded-3xl"
                    >
                      {/* IMAGE */}
                      <div className="relative overflow-hidden bg-purple-50">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-56"
                        />

                        {/* IMAGE OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

                        {/* STATUS */}
                        <div className="absolute right-3 top-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold shadow-md backdrop-blur-sm ${
                              item.isActive
                                ? "bg-emerald-50/95 text-emerald-700"
                                : "bg-white/95 text-slate-600"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                item.isActive
                                  ? "bg-emerald-500"
                                  : "bg-slate-400"
                              }`}
                            />

                            {item.isActive
                              ? "Active"
                              : "Disabled"}
                          </span>
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="p-4 sm:p-5">
                        <div className="min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="truncate text-base font-bold text-slate-800 sm:text-lg">
                                {item.title}
                              </h3>

                              <span className="mt-1 inline-flex rounded-full bg-purple-50 px-2.5 py-1 text-[11px] font-semibold text-purple-600">
                                {item.category || "Other"}
                              </span>
                            </div>
                          </div>

                          {item.description && (
                            <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-500 sm:text-sm">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* ACTIONS */}
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(item._id)
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
                                item._id,
                                Boolean(item.isActive)
                              )
                            }
                            className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />

                            <span>
                              {item.isActive
                                ? "Disable"
                                : "Enable"}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(item._id)
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
                <Plus className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Keep your portfolio fresh
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                  Add your latest blouse, frock, bridal and custom
                  stitching designs to showcase your work to
                  customers.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}