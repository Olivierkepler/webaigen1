"use client";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="px-[6%] md:px-[10%] pt-28 md:pt-40 pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
            {/* Left Column */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="mb-6 block font-montserrat text-[0.72rem] uppercase tracking-[0.35em] text-[#d4af37]">
                  Connect with the Archive
                </span>

                <h1 className="font-cormorant text-5xl font-light italic leading-[0.95] tracking-tight text-white md:text-7xl">
                  Inquiry <br /> & Concept.
                </h1>

                <p className="mt-8 max-w-lg font-montserrat text-sm leading-7 tracking-wide text-white/55 md:text-[0.95rem]">
                  Whether you are looking to contribute to the archive, inquire
                  about a specific structure, or discuss a future collaboration,
                  our collective is listening.
                </p>
              </div>

              <div className="mt-14 space-y-8 md:mt-24">
                <div>
                  <p className="mb-2 text-[0.65rem] uppercase tracking-[0.28em] text-[#d4af37]">
                    Location
                  </p>
                  <p className="font-montserrat text-sm text-white/75">
                    Omotesando, Tokyo, JP
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-[0.65rem] uppercase tracking-[0.28em] text-[#d4af37]">
                    Direct
                  </p>
                  <a
                    href="mailto:webaigen3@gmail.com"
                    className="font-montserrat text-sm text-white/75 underline decoration-white/30 underline-offset-4 transition hover:text-[#d4af37] hover:decoration-[#d4af37]"
                  >
                    webaigen3@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_60px_rgba(255,255,255,0.03)] backdrop-blur-xl md:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_45%)]" />

              <form
                className="relative space-y-10"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* Name */}
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder=" "
                    className="peer w-full border-0 border-b border-white/20 bg-transparent py-4 text-sm font-montserrat text-white placeholder-transparent outline-none transition-colors duration-300 focus:border-[#d4af37]"
                  />
                  <label
                    htmlFor="name"
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
                    className="peer w-full border-0 border-b border-white/20 bg-transparent py-4 text-sm font-montserrat text-white placeholder-transparent outline-none transition-colors duration-300 focus:border-[#d4af37]"
                  />
                  <label
                    htmlFor="email"
                    className="pointer-events-none absolute left-0 top-4 text-[0.72rem] uppercase tracking-[0.22em] text-white/35 transition-all duration-300 peer-focus:-top-3 peer-focus:text-[0.65rem] peer-focus:text-[#d4af37] peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[0.65rem]"
                  >
                    Email Address
                  </label>
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder=" "
                    className="peer w-full resize-none border-0 border-b border-white/20 bg-transparent py-4 text-sm font-montserrat text-white placeholder-transparent outline-none transition-colors duration-300 focus:border-[#d4af37]"
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute left-0 top-4 text-[0.72rem] uppercase tracking-[0.22em] text-white/35 transition-all duration-300 peer-focus:-top-3 peer-focus:text-[0.65rem] peer-focus:text-[#d4af37] peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[0.65rem]"
                  >
                    Your Message
                  </label>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="group w-full rounded-full border border-[#d4af37] px-6 py-4 font-montserrat text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-[#d4af37] transition-all duration-500 hover:bg-[#d4af37] hover:text-black"
                >
                  <span className="inline-block transition-transform duration-500 group-hover:tracking-[0.28em]">
                    Send Inquiry
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}