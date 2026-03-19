import ContactForm from "./components/ContactForm";

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
                    Quincy, Massachusetts
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
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}