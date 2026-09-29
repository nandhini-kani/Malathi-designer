"use client";

import { useState } from "react";

type OfferFormValues = {
  title: string;
  description: string;
  discount: string;
  image: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
};

const emptyForm: OfferFormValues = {
  title: "",
  description: "",
  discount: "",
  image: "",
  startDate: "",
  endDate: "",
  isActive: true,
};

export default function OfferForm({
  initialValues,
  onSubmit,
  onSuccess,
  submitLabel = "Save offer",
}: {
  initialValues?: Partial<OfferFormValues>;

  onSubmit: (values: OfferFormValues) => Promise<void> | void;

  onSuccess?: () => void;

  submitLabel?: string;
}) {
  const [values, setValues] = useState<OfferFormValues>({
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    discount: initialValues?.discount ?? "",
    image: initialValues?.image ?? "",
    startDate: initialValues?.startDate ?? "",
    endDate: initialValues?.endDate ?? "",
    isActive: initialValues?.isActive ?? true,
  });

  const [loading, setLoading] = useState(false);

  function updateField<K extends keyof OfferFormValues>(
    field: K,
    value: OfferFormValues[K]
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);

    try {
      const cleanedValues: OfferFormValues = {
        title: values.title.trim(),
        description: values.description.trim(),
        discount: values.discount.trim(),
        image: values.image.trim(),
        startDate: values.startDate,
        endDate: values.endDate,
        isActive: values.isActive,
      };

      await onSubmit(cleanedValues);

      /*
       * IMPORTANT:
       * Clear the complete form after successful save/update.
       */
      setValues({
        ...emptyForm,
      });

      /*
       * Tell parent page:
       * "Save/update is completed."
       *
       * Parent should clear editingId.
       */
      onSuccess?.();
    } catch (error) {
      console.error("Save offer error:", error);

      /*
       * Do NOT clear the form when saving fails.
       * User can correct the values and try again.
       */
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-5 rounded-2xl
        border border-purple-100
        bg-white p-4
        shadow-sm shadow-purple-100
        sm:p-5
      "
    >
      {/* ================= TITLE ================= */}

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
          Offer title
        </label>

        <input
          required
          value={values.title}
          onChange={(event) =>
            updateField("title", event.target.value)
          }
          placeholder="Example: Festive Blouse Offer"
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
            updateField("description", event.target.value)
          }
          placeholder="Describe the offer..."
          className="
            w-full resize-none rounded-xl
            border border-slate-200
            bg-white px-3 py-2.5 text-sm text-slate-800
            outline-none transition
            placeholder:text-slate-400
            focus:border-purple-400
            focus:ring-2 focus:ring-purple-100
          "
        />
      </div>

      {/* ================= DISCOUNT + IMAGE ================= */}

      <div className="grid gap-4 md:grid-cols-2">
        {/* DISCOUNT */}

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Discount
          </label>

          <input
            required
            value={values.discount}
            onChange={(event) =>
              updateField("discount", event.target.value)
            }
            placeholder="Example: 20% OFF"
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

        {/* IMAGE */}

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Image URL
          </label>

          <input
            value={values.image}
            onChange={(event) =>
              updateField("image", event.target.value)
            }
            placeholder="https://..."
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
      </div>

      {/* ================= DATES ================= */}

      <div className="grid gap-4 md:grid-cols-2">
        {/* START DATE */}

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Start date
          </label>

          <input
            type="date"
            value={values.startDate}
            onChange={(event) =>
              updateField("startDate", event.target.value)
            }
            className="
              w-full rounded-xl border border-slate-200
              bg-white px-3 py-2.5 text-sm text-slate-800
              outline-none transition
              focus:border-purple-400
              focus:ring-2 focus:ring-purple-100
            "
          />
        </div>

        {/* END DATE */}

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            End date
          </label>

          <input
            type="date"
            value={values.endDate}
            onChange={(event) =>
              updateField("endDate", event.target.value)
            }
            className="
              w-full rounded-xl border border-slate-200
              bg-white px-3 py-2.5 text-sm text-slate-800
              outline-none transition
              focus:border-purple-400
              focus:ring-2 focus:ring-purple-100
            "
          />
        </div>
      </div>

      {/* ================= ACTIVE ================= */}

      <label
        className="
          flex cursor-pointer items-center gap-3
          rounded-xl border border-purple-100
          bg-purple-50/40
          px-4 py-3
          text-sm text-slate-700
        "
      >
        <input
          type="checkbox"
          checked={values.isActive}
          onChange={(event) =>
            updateField("isActive", event.target.checked)
          }
          className="h-4 w-4 accent-purple-600"
        />

        <span>
          <span className="block font-semibold">
            Active offer
          </span>

          <span className="text-xs text-slate-500">
            Show this offer on the public website
          </span>
        </span>
      </label>

      {/* ================= SUBMIT ================= */}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full rounded-xl
          bg-gradient-to-r
          from-violet-600
          via-purple-600
          to-fuchsia-600
          px-4 py-3
          text-sm font-semibold
          text-white
          shadow-sm shadow-purple-200
          transition
          hover:opacity-95
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}