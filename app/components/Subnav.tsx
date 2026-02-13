"use client";

export default function ContactSubnav() {
  return (
    /* Top-20 or Top-30 depending on your main nav height */
    <nav className="sticky top-25 md:top-30 z-40 w-full px-4 md:px-[10%] select-none">
      
      {/* Container: Stacks on mobile, Row on desktop */}
      <div className="max-w-5xl mx-auto bg-[#050505]/30 backdrop-blur-xl border border-white/10 py-2 md:py-3 px-6 md:px-10 rounded-2xl md:rounded-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 transition-all duration-500 hover:border-[#d4af37]/30 shadow-2xl">
        
        {/* Contact Logic: Group 1 */}
        <div className="flex w-full md:w-auto justify-between md:justify-start gap-6 md:gap-12">
          {/* Phone */}
          <div className="flex flex-col">
            <span className="font-mono text-[7px] md:text-[8px] text-[#d4af37] tracking-[3px] md:tracking-[4px] uppercase mb-1 opacity-80">
              Inquiry
            </span>
            <a 
              href="tel:+442079460123" 
              className="font-montserrat text-[9px] md:text-[10px] tracking-[1px] md:tracking-[2px] hover:text-[#d4af37] transition-colors duration-300"
            >
              +6173808053
            </a>
          </div>
          
          {/* Email - Border hidden on mobile to save space, visible on MD+ */}
          <div className="flex flex-col md:border-l md:border-white/10 md:pl-12 text-right md:text-left">
            <span className="font-mono text-[7px] md:text-[8px] text-[#d4af37] tracking-[3px] md:tracking-[4px] uppercase mb-1 opacity-80">
              Email
            </span>
            <a 
              href="mailto:studio@monolith.arc" 
              className="font-montserrat text-[9px] md:text-[10px] tracking-[1px] md:tracking-[2px] hover:text-[#d4af37] transition-colors duration-300 uppercase"
            >
             webaigen3@gmail.com
            </a>
          </div>
        </div>

        {/* Operational Status: Group 2 (Hidden on very small screens or made ultra-compact) */}
        <div className=" hidden md:flex items-center gap-3 bg-white/[0.03] px-4 md:px-5 py-2 rounded-full border border-white/5 w-full md:w-auto justify-center md:justify-start">
          <div className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-[#d4af37] animate-blink"></span>
            <style jsx>{`
              @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
              }
              .animate-blink {
                animation: blink 1.4s cubic-bezier(.6,0,.4,1) infinite;
              }
            `}</style>
          </div>
          <span className="font-mono text-[8px] md:text-[9px] tracking-[2px] md:tracking-[3px] uppercase text-white/50 whitespace-nowrap">
  Accepting New Projects
</span>

        </div>

      </div>
    </nav>
  );
}