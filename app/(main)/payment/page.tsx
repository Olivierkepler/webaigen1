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
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage: "url('/images/payment.jpeg')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/95 via-[#020617]/90 to-black" />

      <section className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#C9A227]">
            WebAigen Secure Payment
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Custom Project Payment
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            Enter the agreed amount and complete your payment securely through Stripe.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[30px] border border-white/10 bg-white shadow-[0_35px_120px_rgba(0,0,0,0.45)] lg:grid-cols-[1fr_440px]">
          <div className="p-8 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A227]">
              Payment Details
            </p>

            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Secure payment for WebAigen services.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              This payment page is used for WebAigen AI automation, custom software,
              workflow optimization, and business technology services.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "AI automation services",
                "Custom software development",
                "Workflow optimization",
                "Business technology support",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#C9A227]/15 text-sm font-bold text-[#C9A227]">
                    ✓
                  </div>
                  <p className="font-semibold text-slate-900">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
              <p className="font-semibold text-slate-950">After payment</p>
              <p className="mt-2 leading-7 text-slate-600">
                A WebAigen team member will confirm your payment and continue with the
                next steps for your project.
              </p>
            </div>
          </div>

          <aside className="bg-[#0b1120] p-8 text-white md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9A227]">
              Payment Summary
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Enter payment amount
              </label>

              <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3">
                <span className="mr-2 text-slate-400">$</span>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent text-lg font-bold text-white outline-none placeholder:text-slate-500"
                />
              </div>

              <div className="mt-5 flex justify-between text-sm text-slate-400">
                <span>Provider</span>
                <span>WebAigen</span>
              </div>

              <div className="mt-4 flex justify-between text-sm text-slate-400">
                <span>Type</span>
                <span>One-time payment</span>
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
              className="mt-8 w-full rounded-2xl bg-[#C9A227] px-6 py-4 text-base font-black text-[#020617] transition hover:bg-[#d8b33a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Redirecting..." : "Proceed to Secure Checkout"}
            </button>

            <p className="mt-5 text-center text-sm leading-6 text-slate-400">
              Payment is securely processed by Stripe. WebAigen does not store card details.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}