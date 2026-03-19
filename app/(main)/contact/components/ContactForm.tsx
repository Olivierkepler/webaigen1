"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      fullName: formData.get("fullName")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      company: formData.get("company")?.toString().trim() || "",
      service: formData.get("service")?.toString().trim() || "",
      message: formData.get("message")?.toString().trim() || "",
      website: formData.get("website")?.toString().trim() || "",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Something went wrong. Please try again."
        );
      }

      setStatus("Your inquiry has been sent.");
      form.reset();
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_60px_rgba(255,255,255,0.03)] backdrop-blur-xl md:p-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_45%)]" />

      <form className="relative space-y-10" onSubmit={handleSubmit}>
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Full Name */}
        <div className="relative">
          <input
            id="fullName"
            type="text"
            name="fullName"
            placeholder="Your full name"
            required
            className="peer w-full border-0 border-b border-white/20 bg-transparent py-4 text-sm font-montserrat text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-[#d4af37]"
          />
          <label
            htmlFor="fullName"
            className="mb-2 block text-[0.72rem] uppercase tracking-[0.22em] text-white/60"
          >
            Full Name
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            className="peer w-full border-0 border-b border-white/20 bg-transparent py-4 text-sm font-montserrat text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-[#d4af37]"
          />
          <label
            htmlFor="email"
            className="mb-2 block text-[0.72rem] uppercase tracking-[0.22em] text-white/60"
          >
            Email Address
          </label>
        </div>

        {/* Company */}
        <div className="relative">
          <input
            id="company"
            type="text"
            name="company"
            placeholder="Your company"
            className="peer w-full border-0 border-b border-white/20 bg-transparent py-4 text-sm font-montserrat text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-[#d4af37]"
          />
          <label
            htmlFor="company"
            className="mb-2 block text-[0.72rem] uppercase tracking-[0.22em] text-white/60"
          >
            Company Name
          </label>
        </div>

        {/* Service Needed */}
        <div className="relative">
          <label
            htmlFor="service"
            className="mb-2 block text-[0.72rem] uppercase tracking-[0.22em] text-white/60"
          >
            Service Needed
          </label>
          <select
            id="service"
            name="service"
            required
            defaultValue=""
            className="w-full border-0 border-b border-white/20 bg-[#050505] py-4 text-sm font-montserrat text-white outline-none transition-colors duration-300 focus:border-[#d4af37]"
          >
            <option value="" disabled>
              Select a service
            </option>
            <option value="web-design">Web Design</option>
            <option value="web-development">Web Development</option>
            <option value="ui-ux-design">UI/UX Design</option>
            <option value="branding">Branding</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>

        {/* Message */}
        <div className="relative">
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Your message"
            required
            className="peer w-full resize-none border-0 border-b border-white/20 bg-transparent py-4 text-sm font-montserrat text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-[#d4af37]"
          />
          <label
            htmlFor="message"
            className="mb-2 block text-[0.72rem] uppercase tracking-[0.22em] text-white/60"
          >
            Message
          </label>
        </div>

        {/* Status Message */}
        {status && (
          <p className="font-montserrat text-sm text-white/70">{status}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="group w-full rounded-full border border-[#d4af37] px-6 py-4 font-montserrat text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-[#d4af37] transition-all duration-500 hover:bg-[#d4af37] hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="inline-block transition-transform duration-500 group-hover:tracking-[0.28em]">
            {loading ? "Sending..." : "Send Inquiry"}
          </span>
        </button>
      </form>
    </div>
  );
}