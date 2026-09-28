"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Clock3,
  Globe2,
    Star,
  Mail,
  MapPin,
  Phone,
  Save,
  Settings2,
  Sparkles,
  UserRound,
  Share2,
  MessageCircle,
} from "lucide-react";
import AdminGuard from "@/components/admin/AdminGuard";
import Sidebar from "@/components/admin/Sidebar";

type SettingsState = {
  businessName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  openingHours: string;
};

const emptySettings: SettingsState = {
  businessName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  whatsapp: "",
  instagram: "",
  facebook: "",
  heroTitle: "",
  heroSubtitle: "",
  aboutTitle: "",
  aboutDescription: "",
  openingHours: "",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] =
    useState<SettingsState>(emptySettings);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      setLoading(true);

      try {
        const response = await fetch("/api/settings", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (
          response.ok &&
          data.success &&
          data.data?.settings
        ) {
          setSettings({
            ...emptySettings,
            ...data.data.settings,
          });
        }
      } catch (error) {
        console.error("Fetch settings error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);

    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Unable to save settings.");
        return;
      }

      alert("Settings saved successfully.");
    } catch (error) {
      console.error("Save settings error:", error);
      alert("Unable to save settings.");
    } finally {
      setSaving(false);
    }
  }

  function handleChange(
    field: keyof SettingsState,
    value: string
  ) {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));
  }

  const inputClass =
    "w-full rounded-xl border border-purple-100 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-50";

  const textareaClass =
    "w-full resize-y rounded-xl border border-purple-100 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-50";

  return (
    <AdminGuard>
      <div className="flex min-h-screen flex-col bg-[#faf8fc] md:flex-row">
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-x-hidden p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Header */}
          <section className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-purple-100 sm:mb-6 sm:rounded-3xl">
            <div className="p-5 sm:p-6 md:p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    <Settings2 size={14} />
                    Business Management
                  </div>

                  <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    Settings
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-purple-100 sm:text-base">
                    Manage your business information, social links,
                    homepage content and contact details.
                  </p>
                </div>

                <div className="flex w-full items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md sm:w-fit sm:min-w-[190px]">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                    <Building2 size={22} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-purple-100">
                      Business Profile
                    </p>

                    <p className="mt-0.5 text-sm font-bold text-white">
                      Malathi Designer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-purple-100 bg-white shadow-sm shadow-purple-100 sm:rounded-3xl">
              <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-purple-100 border-t-purple-600" />

                <p className="text-sm font-medium text-slate-600">
                  Loading settings...
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Please wait a moment.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 sm:space-y-6"
            >
              {/* Business Information */}
              <section className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm shadow-purple-100 sm:rounded-3xl">
                <div className="border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-purple-600 shadow-sm">
                      <Building2 size={20} />
                    </div>

                    <div>
                      <h2 className="text-base font-bold text-slate-800 sm:text-lg">
                        Business Information
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                        Basic details about your tailoring business.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 p-4 sm:p-6 md:grid-cols-2">
                  {/* Business Name */}
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    <span className="flex items-center gap-2">
                      <Building2 size={15} className="text-purple-500" />
                      Business Name
                    </span>

                    <input
                      value={settings.businessName}
                      onChange={(event) =>
                        handleChange(
                          "businessName",
                          event.target.value
                        )
                      }
                      placeholder="Malathi Designer"
                      className={inputClass}
                    />
                  </label>

                  {/* Phone */}
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    <span className="flex items-center gap-2">
                      <Phone size={15} className="text-purple-500" />
                      Phone
                    </span>

                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(event) =>
                        handleChange(
                          "phone",
                          event.target.value
                        )
                      }
                      placeholder="Enter phone number"
                      className={inputClass}
                    />
                  </label>

                  {/* Email */}
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    <span className="flex items-center gap-2">
                      <Mail size={15} className="text-purple-500" />
                      Email
                    </span>

                    <input
                      type="email"
                      value={settings.email}
                      onChange={(event) =>
                        handleChange(
                          "email",
                          event.target.value
                        )
                      }
                      placeholder="example@gmail.com"
                      className={inputClass}
                    />
                  </label>

                  {/* City */}
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    <span className="flex items-center gap-2">
                      <MapPin size={15} className="text-purple-500" />
                      City
                    </span>

                    <input
                      value={settings.city}
                      onChange={(event) =>
                        handleChange(
                          "city",
                          event.target.value
                        )
                      }
                      placeholder="Namakkal"
                      className={inputClass}
                    />
                  </label>

                  {/* Address */}
                  <label className="space-y-2 text-sm font-semibold text-slate-700 md:col-span-2">
                    <span className="flex items-center gap-2">
                      <MapPin size={15} className="text-purple-500" />
                      Address
                    </span>

                    <textarea
                      value={settings.address}
                      onChange={(event) =>
                        handleChange(
                          "address",
                          event.target.value
                        )
                      }
                      rows={3}
                      placeholder="Enter complete business address"
                      className={textareaClass}
                    />
                  </label>

                  {/* Opening Hours */}
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    <span className="flex items-center gap-2">
                      <Clock3 size={15} className="text-purple-500" />
                      Opening Hours
                    </span>

                    <input
                      value={settings.openingHours}
                      onChange={(event) =>
                        handleChange(
                          "openingHours",
                          event.target.value
                        )
                      }
                      placeholder="Mon - Sat: 9:00 AM - 7:00 PM"
                      className={inputClass}
                    />
                  </label>
                </div>
              </section>

              {/* Social Media */}
              <section className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm shadow-purple-100 sm:rounded-3xl">
                <div className="border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-purple-600 shadow-sm">
                      <Globe2 size={20} />
                    </div>

                    <div>
                      <h2 className="text-base font-bold text-slate-800 sm:text-lg">
                        Social & Contact Links
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                        Add your WhatsApp and social media links.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 p-4 sm:p-6 md:grid-cols-2">
                  {/* WhatsApp */}
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    <span className="flex items-center gap-2">
                      <MessageCircle
                        size={15}
                        className="text-emerald-500"
                      />
                      WhatsApp
                    </span>

                    <input
                      value={settings.whatsapp}
                      onChange={(event) =>
                        handleChange(
                          "whatsapp",
                          event.target.value
                        )
                      }
                      placeholder="WhatsApp number or link"
                      className={inputClass}
                    />
                  </label>

                  {/* Instagram */}
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    <span className="flex items-center gap-2">
                      <Star
                        size={15}
                        className="text-fuchsia-500"
                      />
                      Instagram
                    </span>

                    <input
                      value={settings.instagram}
                      onChange={(event) =>
                        handleChange(
                          "instagram",
                          event.target.value
                        )
                      }
                      placeholder="Instagram profile URL"
                      className={inputClass}
                    />
                  </label>

                  {/* Facebook */}
                  <label className="space-y-2 text-sm font-semibold text-slate-700 md:col-span-2">
                    <span className="flex items-center gap-2">
                      <Share2
                        size={15}
                        className="text-blue-500"
                      />
                      Facebook
                    </span>

                    <input
                      value={settings.facebook}
                      onChange={(event) =>
                        handleChange(
                          "facebook",
                          event.target.value
                        )
                      }
                      placeholder="Facebook page URL"
                      className={inputClass}
                    />
                  </label>
                </div>
              </section>

              {/* Homepage Content */}
              <section className="overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm shadow-purple-100 sm:rounded-3xl">
                <div className="border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-purple-600 shadow-sm">
                      <Sparkles size={20} />
                    </div>

                    <div>
                      <h2 className="text-base font-bold text-slate-800 sm:text-lg">
                        Homepage Content
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                        Control the main content shown on your website.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 p-4 sm:p-6">
                  {/* Hero Title */}
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    <span>Hero Title</span>

                    <input
                      value={settings.heroTitle}
                      onChange={(event) =>
                        handleChange(
                          "heroTitle",
                          event.target.value
                        )
                      }
                      placeholder="Beautiful Stitching, Perfect Fit"
                      className={inputClass}
                    />
                  </label>

                  {/* Hero Subtitle */}
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    <span>Hero Subtitle</span>

                    <textarea
                      value={settings.heroSubtitle}
                      onChange={(event) =>
                        handleChange(
                          "heroSubtitle",
                          event.target.value
                        )
                      }
                      rows={3}
                      placeholder="Custom tailoring designed especially for you."
                      className={textareaClass}
                    />
                  </label>

                  {/* About Title */}
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    <span className="flex items-center gap-2">
                      <UserRound
                        size={15}
                        className="text-purple-500"
                      />
                      About Title
                    </span>

                    <input
                      value={settings.aboutTitle}
                      onChange={(event) =>
                        handleChange(
                          "aboutTitle",
                          event.target.value
                        )
                      }
                      placeholder="About Malathi Designer"
                      className={inputClass}
                    />
                  </label>

                  {/* About Description */}
                  <label className="space-y-2 text-sm font-semibold text-slate-700">
                    <span>About Description</span>

                    <textarea
                      value={settings.aboutDescription}
                      onChange={(event) =>
                        handleChange(
                          "aboutDescription",
                          event.target.value
                        )
                      }
                      rows={5}
                      placeholder="Write a short description about your tailoring business..."
                      className={textareaClass}
                    />
                  </label>
                </div>
              </section>

              {/* Save Section */}
              <section className="rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:rounded-3xl sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-purple-600 shadow-sm">
                      <CheckCircle2 size={20} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Keep your business information updated
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                        Save your changes after updating the website
                        content.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:scale-[1.01] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    <Save size={17} />

                    {saving ? "Saving..." : "Save Settings"}
                  </button>
                </div>
              </section>
            </form>
          )}
        </main>
      </div>
    </AdminGuard>
  );
}