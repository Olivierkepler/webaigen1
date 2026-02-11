"use client";


export default function ContactPage() {
  return (
    <main className="bg-[#050505] min-h-screen">
  
    
      <section className="pt-32 md:pt-48 px-[5%] md:px-[10%] pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          
          {/* Left Column: Atmospheric Text */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-[#d4af37] text-[0.7rem] tracking-[5px] uppercase font-montserrat block mb-6">
                Connect with the Archive
              </span>
              <h1 className="font-cormorant text-6xl md:text-8xl font-light italic leading-tight">
                Inquiry <br /> & Concept.
              </h1>
              <p className="font-montserrat mt-8 text-white/50 max-w-md leading-relaxed tracking-wide">
                Whether you are looking to contribute to the archive, inquire about a 
                specific structure, or discuss a future collaboration, our collective 
                is listening.
              </p>
            </div>

            <div className="mt-12 md:mt-0 space-y-6">
              <div>
                <p className="text-[0.6rem] text-[#d4af37] tracking-[3px] uppercase mb-2">Location</p>
                <p className="font-montserrat text-sm opacity-80">Omotesando, Tokyo, JP</p>
              </div>
              <div>
                <p className="text-[0.6rem] text-[#d4af37] tracking-[3px] uppercase mb-2">Direct</p>
                <p className="font-montserrat text-sm opacity-80 underline underline-offset-4">contact@monolith-archive.co</p>
              </div>
            </div>
          </div>

          {/* Right Column: Minimalist Form */}
          <div className="bg-white/[0.02] p-8 md:p-12 border border-white/5 backdrop-blur-sm">
            <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
              
              {/* Name Input */}
              <div className="relative group">
                <input 
                  type="text" 
                  name="name"
                  placeholder=" " 
                  className="peer w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#d4af37] transition-colors font-montserrat text-sm"
                />
                <label className="absolute left-0 top-3 text-white/30 text-[0.7rem] tracking-[2px] uppercase transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-[#d4af37] peer-[:not(:placeholder-shown)]:-top-4">
                  Full Name
                </label>
              </div>

              {/* Email Input */}
              <div className="relative group">
                <input 
                  type="email" 
                  name="email"
                  placeholder=" " 
                  className="peer w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#d4af37] transition-colors font-montserrat text-sm"
                />
                <label className="absolute left-0 top-3 text-white/30 text-[0.7rem] tracking-[2px] uppercase transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-[#d4af37] peer-[:not(:placeholder-shown)]:-top-4">
                  Email Address
                </label>
              </div>

              {/* Message Input */}
              <div className="relative group">
                <textarea 
                  name="message"
                  rows={4}
                  placeholder=" " 
                  className="peer w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#d4af37] transition-colors font-montserrat text-sm resize-none"
                />
                <label className="absolute left-0 top-3 text-white/30 text-[0.7rem] tracking-[2px] uppercase transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-[#d4af37] peer-[:not(:placeholder-shown)]:-top-4">
                  Your Message
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full py-4 border border-[#d4af37] text-[#d4af37] text-[0.7rem] tracking-[5px] uppercase font-semibold hover:bg-[#d4af37] hover:text-black transition-all duration-500 cursor-none"
              >
                Send Inquiry
              </button>
            </form>
          </div>

        </div>
      </section>

   
    </main>
  );
}