"use client";

import { useState } from "react";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [amount, setAmount] = useState("");

  async function handleCheckout() {
    try {
      setLoading(true);
      setErrorMessage("");

      if (!amount || Number(amount) < 1) {
        setErrorMessage("Please enter a valid payment amount.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Unable to start checkout.");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        setErrorMessage("No checkout URL returned.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] px-6 pb-20 pt-36">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('/images/checkout-bg.jpeg')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/95 via-[#020617]/90 to-black" />

      <section className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#C9A227]">
            Secure Client Payment
          </p>

          <p className="mt-5 text-lg leading-8 text-slate-300">
          Secure payment for approved WebAigen projects.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[32px] border border-white/10 bg-white shadow-[0_35px_120px_rgba(0,0,0,0.45)] lg:grid-cols-[1fr_430px]">
          <div className="p-8 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A227]">
              Payment Details
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
            Client Payment Portal
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Use this secure portal to submit payment for approved WebAigen projects and services.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "AI Automation",
                "Custom Software",
                "Business Systems",
                "Technology Consulting",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-[#C9A227]/40 hover:bg-white hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
                >
                  <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#C9A227]/15 text-sm font-bold text-[#C9A227]">
                    ✓
                  </div>
                  <p className="font-semibold text-slate-900">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-slate-950">Next Steps</p>
              <p className="mt-2 leading-7 text-slate-600">
              After payment, our team will review and confirm the transaction.
              </p>
            </div>
          </div>

          <aside className="bg-[#0b1120] p-8 text-white md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A227]">
              Secure Checkout
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Payment amount
              </label>

              <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.07] px-4 py-3 transition focus-within:border-[#C9A227]/70">
                <span className="mr-2 text-slate-400">$</span>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent text-lg font-semibold text-white outline-none placeholder:text-slate-500"
                />
              </div>

              <div className="mt-5 flex justify-between text-sm text-slate-400">
                <span>Provider</span>
                <span className="text-slate-300">WebAigen</span>
              </div>

              <div className="mt-4 flex justify-between text-sm text-slate-400">
                <span>Transaction type</span>
                <span className="text-slate-300">One-time payment</span>
              </div>
            </div>

            {errorMessage && (
              <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                {errorMessage}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-8 w-full rounded-2xl bg-[#C9A227] px-6 py-4 text-base font-semibold text-[#020617] shadow-[0_16px_40px_rgba(201,162,39,0.25)] transition hover:-translate-y-0.5 hover:bg-[#d8b33a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Redirecting..." : "Continue to Payment"}
            </button>

            <p className="mt-5 text-center text-sm leading-6 text-slate-400">
              All payments are securely processed through Stripe&apos;s
              encrypted payment infrastructure.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}