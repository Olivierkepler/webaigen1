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
      subject: formData.get("subject")?.toString().trim() || "",
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
        throw new Error(result.message || "Something went wrong. Please try again.");
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

        {/* Name */}
        <div className="relative">
          <input
            id="fullName"
            type="text"
            name="fullName"
            placeholder=" "
            required
            className="peer w-full border-0 border-b border-white/20 bg-transparent py-4 text-sm font-montserrat text-white placeholder-transparent outline-none transition-colors duration-300 focus:border-[#d4af37]"
          />
          <label
            htmlFor="fullName"
            className="pointer-events-none absolute left-0 top-4 text-[0.72rem] uppercase tracking-[0.22em] text-white/35 transition-all duration-300 peer-focus:-top-3 peer-focus:text-[0.65rem] peer-focus:text-[#d4af37] peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[0.65rem]"
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
            placeholder=" "
            required
            className="peer w-full border-0 border-b border-white/20 bg-transparent py-4 text-sm font-montserrat text-white placeholder-transparent outline-none transition-colors duration-300 focus:border-[#d4af37]"
          />
          <label
            htmlFor="email"
            className="pointer-events-none absolute left-0 top-4 text-[0.72rem] uppercase tracking-[0.22em] text-white/35 transition-all duration-300 peer-focus:-top-3 peer-focus:text-[0.65rem] peer-focus:text-[#d4af37] peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[0.65rem]"
          >
            Email Address
          </label>
        </div>

        {/* Subject */}
        <div className="relative">
          <input
            id="subject"
            type="text"
            name="subject"
            placeholder=" "
            required
            className="peer w-full border-0 border-b border-white/20 bg-transparent py-4 text-sm font-montserrat text-white placeholder-transparent outline-none transition-colors duration-300 focus:border-[#d4af37]"
          />
          <label
            htmlFor="subject"
            className="pointer-events-none absolute left-0 top-4 text-[0.72rem] uppercase tracking-[0.22em] text-white/35 transition-all duration-300 peer-focus:-top-3 peer-focus:text-[0.65rem] peer-focus:text-[#d4af37] peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[0.65rem]"
          >
            Subject
          </label>
        </div>

        {/* Message */}
        <div className="relative">
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder=" "
            required
            className="peer w-full resize-none border-0 border-b border-white/20 bg-transparent py-4 text-sm font-montserrat text-white placeholder-transparent outline-none transition-colors duration-300 focus:border-[#d4af37]"
          />
          <label
            htmlFor="message"
            className="pointer-events-none absolute left-0 top-4 text-[0.72rem] uppercase tracking-[0.22em] text-white/35 transition-all duration-300 peer-focus:-top-3 peer-focus:text-[0.65rem] peer-focus:text-[#d4af37] peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[0.65rem]"
          >
            Your Message
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