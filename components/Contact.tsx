"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Send,
  MessageCircle,
} from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Store the form element before using await.
    // This prevents e.currentTarget from becoming null.
    const formElement = e.currentTarget;

    setLoading(true);
    setSent(false);

    try {
      const form = new FormData(formElement);

      const payload = Object.fromEntries(form.entries());

      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Unable to send enquiry.");
        return;
      }

      // Show success message
      setSent(true);

      // Reset form safely
      formElement.reset();
    } catch (error) {
      console.error("Enquiry error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FCFAFF]">
      <section className="relative overflow-hidden bg-[#FCFAFF]">

        {/* Background Decorations */}
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-purple-200/20 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl" />

        <div className="container-custom relative px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600 sm:text-sm">
              Contact Us
            </p>

            <h1 className="mt-3 text-3xl font-black leading-tight text-violet-950 sm:text-4xl md:text-5xl">
              Let&apos;s Talk About

              <span className="block bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#8B5CF6] bg-clip-text text-transparent">
                Your Stitching
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Share your stitching requirement with us. We&apos;ll get in
              touch with you and help you with the next steps.
            </p>
          </div>

          {/* Main Content */}
          <div className="mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12">

            {/* LEFT SIDE */}
            <div className="text-center lg:text-left">

              <h2 className="text-2xl font-bold text-violet-950 sm:text-3xl">
                We&apos;d Love to Hear From You
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:mx-0">
                Whether you need a blouse, custom dress, alteration or
                any other ladies tailoring service, feel free to contact
                Malathi Designer.
              </p>

              {/* Contact Cards */}
              <div className="mx-auto mt-8 max-w-xl space-y-4 lg:mx-0">

                {/* Location */}
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-violet-100 bg-white p-5 text-center shadow-sm sm:flex-row sm:text-left">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-50">
                    <MapPin
                      size={22}
                      className="text-violet-600"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-violet-950">
                      Our Location
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Kondamanayakkanpatti,
                      <br />
                      Namakkal, Tamil Nadu
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-violet-100 bg-white p-5 text-center shadow-sm sm:flex-row sm:text-left">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-50">
                    <Phone
                      size={22}
                      className="text-violet-600"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-violet-950">
                      Call Us
                    </h3>

                    <a
                      href="tel:+918248744594"
                      className="mt-1 block text-sm text-slate-600 transition hover:text-violet-600"
                    >
                      +91 82487 44594
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-violet-100 bg-white p-5 text-center shadow-sm sm:flex-row sm:text-left">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-50">
                    <MessageCircle
                      size={22}
                      className="text-violet-600"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-violet-950">
                      WhatsApp Enquiry
                    </h3>

                    <a
                      href="https://wa.me/918248744594?text=Hi%20Malathi%20Designer%2C%20I%20would%20like%20to%20enquire%20about%20tailoring%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm text-slate-600 transition hover:text-violet-600"
                    >
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT SIDE - FORM */}
            <form
              onSubmit={submit}
              className="rounded-3xl border border-violet-100 bg-white p-5 shadow-xl shadow-violet-100/40 sm:p-7 lg:p-8"
            >

              {/* Form Header */}
              <div className="mb-6">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                  Send an Enquiry
                </p>

                <h2 className="mt-2 text-2xl font-bold text-violet-950">
                  Tell Us What You Need
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Fill in your details and we&apos;ll get back to you.
                </p>
              </div>

              <div className="grid gap-4">

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-semibold text-violet-950"
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-violet-100 bg-[#FCFAFF] px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-semibold text-violet-950"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    required
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl border border-violet-100 bg-[#FCFAFF] px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-semibold text-violet-950"
                  >
                    Email
                    <span className="ml-1 text-xs font-normal text-slate-400">
                      (Optional)
                    </span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-violet-100 bg-[#FCFAFF] px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
                  />
                </div>

                {/* Service */}
                <div>
                  <label
                    htmlFor="service"
                    className="mb-1.5 block text-sm font-semibold text-violet-950"
                  >
                    Service You Need
                  </label>

                  <input
                    id="service"
                    name="service"
                    placeholder="Example: Blouse Stitching"
                    className="w-full rounded-xl border border-violet-100 bg-[#FCFAFF] px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-semibold text-violet-950"
                  >
                    Your Requirement
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Tell us what you need..."
                    rows={5}
                    className="w-full resize-none rounded-xl border border-violet-100 bg-[#FCFAFF] px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send size={18} />

                  {loading ? "Sending..." : "Send Enquiry"}
                </button>

                {/* Success Message */}
                {sent && (
                  <p className="rounded-xl border border-green-100 bg-green-50 p-3 text-center text-sm font-medium text-green-700">
                    Your enquiry was sent successfully.
                  </p>
                )}

              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}