export default function CancelPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] px-6 py-20 flex items-center justify-center">
      <section className="w-full max-w-2xl rounded-[2rem] bg-white p-10 shadow-2xl text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-4xl">
          ⚠️
        </div>

        <p className="text-sm font-bold tracking-[0.25em] text-orange-600">
          PAYMENT CANCELLED
        </p>

        <h1 className="mt-4 text-4xl font-bold text-slate-950">
          Your payment was not completed.
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          No payment was charged. You can return to the payment page and try
          again whenever you are ready.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/payment"
            className="rounded-2xl bg-slate-950 px-8 py-4 font-semibold text-white"
          >
            Try Again
          </a>

          <a
            href="/"
            className="rounded-2xl border border-slate-300 px-8 py-4 font-semibold text-slate-900"
          >
            Back to Home
          </a>
        </div>
      </section>
    </main>
  );
}