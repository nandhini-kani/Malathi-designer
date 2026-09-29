
"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Edit3,
  ImageIcon,
  Plus,
  Scissors,
  Trash2,
  X,
} from "lucide-react";

import AdminGuard from "@/components/admin/AdminGuard";
import ServiceForm, {
  type ServiceFormValues,
} from "@/components/admin/ServiceForm";
import Sidebar from "@/components/admin/Sidebar";

type ServiceItem = {
  _id: string;
  title: string;
  description: string;
  image?: string;
  price?: number | string;
  isActive?: boolean;
  sortOrder?: number;
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function fetchServices(): Promise<ServiceItem[]> {
    const response = await fetch("/api/services", { cache: "no-store" });
    const data = await response.json();

    return Array.isArray(data?.data?.services)
      ? data.data.services
      : [];
  }

  useEffect(() => {
    let isMounted = true;

    fetchServices()
      .then((services) => {
        if (isMounted) setServices(services);
      })
      .catch((error) => {
        console.error("Fetch services error:", error);
        if (isMounted) setServices([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  async function refreshServices() {
    setLoading(true);

    try {
      setServices(await fetchServices());
    } catch (error) {
      console.error("Fetch services error:", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(values: ServiceFormValues) {
    try {
      const payload = {
        ...values,
        price: values.price || "",
      };

      const response = editingId
        ? await fetch(`/api/services/${editingId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/services", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Unable to save service.");
        return;
      }

      setEditingId(null);
      await refreshServices();
    } catch (error) {
      console.error("Save service error:", error);
      alert("Something went wrong while saving the service.");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Unable to delete service.");
        return;
      }

      if (editingId === id) {
        setEditingId(null);
      }

      await refreshServices();
    } catch (error) {
      console.error("Delete service error:", error);
      alert("Something went wrong while deleting.");
    }
  }

  async function handleToggle(
    id: string,
    currentValue: boolean
  ) {
    const service = services.find(
      (item) => item._id === id
    );

    if (!service) return;

    try {
      const response = await fetch(
        `/api/services/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...service,
            isActive: !currentValue,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Unable to change status.");
        return;
      }

      await refreshServices();
    } catch (error) {
      console.error("Toggle service error:", error);
      alert("Unable to change service status.");
    }
  }

  const editingService = editingId
    ? services.find(
        (item) => item._id === editingId
      )
    : undefined;

  const initialValues = editingService
    ? {
        title: editingService.title,
        description: editingService.description,
        image: editingService.image || "",
        price:
          editingService.price === undefined ||
          editingService.price === null
            ? ""
            : String(editingService.price),
        isActive:
          editingService.isActive ?? true,
        sortOrder:
          editingService.sortOrder ?? 0,
      }
    : undefined;

  return (
    <AdminGuard>
      <div className="flex min-h-screen flex-col bg-[#faf8fc] md:flex-row">

        {/* Sidebar */}
        <Sidebar />

        {/* Main */}
        <main className="min-w-0 flex-1 overflow-x-hidden p-3 sm:p-4 md:p-6 lg:p-8">

          {/* =====================================================
              HEADER
          ====================================================== */}
          <div className="mb-6">

            <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-5 text-white shadow-lg shadow-purple-100 sm:p-6 md:p-7">

              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-12 right-24 h-28 w-28 rounded-full bg-white/5" />

              <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15">
                      <Scissors size={16} />
                    </div>

                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-100">
                      Malathi Designer
                    </span>
                  </div>

                  <h1 className="text-2xl font-bold sm:text-3xl">
                    Services
                  </h1>

                  <p className="mt-1 max-w-xl text-sm leading-5 text-purple-100">
                    Add, edit and manage the tailoring services
                    displayed on your website.
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                  <Scissors size={20} />

                  <div>
                    <p className="text-xs text-purple-100">
                      Total Services
                    </p>

                    <p className="text-xl font-bold">
                      {services.length}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* =====================================================
              MAIN CONTENT
          ====================================================== */}
          <div className="grid gap-5 lg:gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">

            {/* ===================================================
                FORM
            ==================================================== */}
            <section className="h-fit rounded-3xl border border-purple-100 bg-white p-4 shadow-sm sm:p-5 xl:sticky xl:top-6">

              <div className="mb-5 flex items-start justify-between gap-3">

                <div className="flex items-start gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                    {editingId ? (
                      <Edit3 size={19} />
                    ) : (
                      <Plus size={20} />
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-purple-500">
                      {editingId
                        ? "Edit Service"
                        : "New Service"}
                    </p>

                    <h2 className="mt-1 text-lg font-bold text-slate-800">
                      {editingId
                        ? "Update service"
                        : "Create a service"}
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Add clear information for your customers.
                    </p>
                  </div>

                </div>

                {editingId && (
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-rose-50 hover:text-rose-500"
                    aria-label="Cancel editing"
                  >
                    <X size={17} />
                  </button>
                )}

              </div>

              <ServiceForm
                key={editingId ?? "new-service"}
                initialValues={initialValues}
                submitLabel={
                  editingId
                    ? "Update service"
                    : "Create service"
                }
                onSubmit={handleSave}
              />

            </section>

            {/* ===================================================
                SERVICES LIST
            ==================================================== */}
            <section className="min-w-0">

              <div className="mb-4 flex items-end justify-between">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-purple-500">
                    Your Services
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-800">
                    Service collection
                  </h2>
                </div>

                <span className="rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-600">
                  {services.length} total
                </span>

              </div>

              {loading ? (
                <div className="grid gap-4 sm:grid-cols-2">

                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="h-48 animate-pulse rounded-3xl bg-white shadow-sm"
                    />
                  ))}

                </div>
              ) : services.length === 0 ? (

                <div className="rounded-3xl border border-dashed border-purple-200 bg-white p-8 text-center sm:p-12">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-500">
                    <Scissors size={28} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-800">
                    No services yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Create your first tailoring service using
                    the form to get started.
                  </p>

                </div>

              ) : (

                <div className="grid gap-4 sm:grid-cols-2">

                  {services.map((service) => (

                    <article
                      key={service._id}
                      className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-100/50"
                    >

                      {/* Image */}
                      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">

                        {service.image ? (
                          <img
                            src={service.image}
                            alt={service.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-purple-300">
                            <ImageIcon size={38} />
                          </div>
                        )}

                        {/* Status */}
                        <div className="absolute left-3 top-3">

                          {service.isActive ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-600 shadow-sm backdrop-blur">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-[11px] font-semibold text-slate-500 shadow-sm backdrop-blur">
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                              Disabled
                            </span>
                          )}

                        </div>

                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5">

                        <div className="flex items-start justify-between gap-3">

                          <div className="min-w-0">
                            <h3 className="truncate text-base font-bold text-slate-800 sm:text-lg">
                              {service.title}
                            </h3>

                            <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">
                              {service.description}
                            </p>
                          </div>

                          {service.price ? (
                            <span className="shrink-0 rounded-xl bg-purple-50 px-2.5 py-1.5 text-xs font-bold text-purple-600">
                              ₹ {String(service.price)}
                            </span>
                          ) : null}

                        </div>

                        {/* Actions */}
                        <div className="mt-4 grid grid-cols-3 gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              setEditingId(service._id)
                            }
                            className="flex items-center justify-center gap-1.5 rounded-xl border border-purple-100 bg-purple-50 px-2 py-2.5 text-xs font-semibold text-purple-600 transition hover:bg-purple-600 hover:text-white"
                          >
                            <Edit3 size={14} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleToggle(
                                service._id,
                                Boolean(service.isActive)
                              )
                            }
                            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                          >
                            <CheckCircle2 size={14} />
                            {service.isActive
                              ? "Disable"
                              : "Enable"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(service._id)
                            }
                            className="flex items-center justify-center gap-1.5 rounded-xl bg-rose-50 px-2 py-2.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-600 hover:text-white"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>

                        </div>

                      </div>

                    </article>

                  ))}

                </div>

              )}

            </section>

          </div>
        </main>
      </div>
    </AdminGuard>
  );
}