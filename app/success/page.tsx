export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fb] px-6 py-20 flex items-center justify-center">
      <section className="w-full max-w-3xl rounded-[2rem] bg-white p-10 shadow-2xl text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
          ✅
        </div>

        <p className="text-sm font-bold tracking-[0.25em] text-green-600">
          PAYMENT CONFIRMED
        </p>

        <h1 className="mt-4 text-4xl font-bold text-slate-950">
          Your WebAIgen project has started.
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Thank you for your payment. Our team will review your request and begin
          the onboarding process.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-4 text-left">
          {[
            "Payment confirmation received",
            "Project review begins within 24 hours",
            "Team will contact you for next steps",
            "Strategy call and requirements collection",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-700"
            >
              ✓ {item}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="rounded-2xl bg-slate-950 px-8 py-4 font-semibold text-white"
          >
            Back to Home
          </a>

          <a
            href="/contact"
            className="rounded-2xl border border-slate-300 px-8 py-4 font-semibold text-slate-900"
          >
            Contact Team
          </a>
        </div>
      </section>
    </main>
  );
}