"use client";

export default function ContactSubnav() {
  return (
    /* The outer container handles the sticky positioning and centering */
    <nav className="sticky top-30 z-40 w-full px-[5%] md:px-[10%] hidden md:block select-none">
      
      {/* The actual bar: 7xl max width, centered, with backdrop effects */}
      <div className="max-w-7xl mx-auto bg-[#050505]/60 backdrop-blur-xl border border-white/10 py-4 px-10 rounded-full flex justify-between items-center transition-all duration-500 hover:border-[#d4af37]/30 shadow-2xl">
        
        {/* Contact Logic: Group 1 */}
        <div className="flex gap-12">
          <div className="flex flex-col">
            <span className="font-mono text-[8px] text-[#d4af37] tracking-[4px] uppercase mb-1 opacity-80">
              Inquiry
            </span>
            <a 
              href="tel:+442079460123" 
              className="font-montserrat text-[10px] tracking-[2px] hover:text-[#d4af37] transition-colors duration-300"
            >
              +44 (0) 20 7946 0123
            </a>
          </div>
          
          <div className="flex flex-col border-l border-white/10 pl-12">
            <span className="font-mono text-[8px] text-[#d4af37] tracking-[4px] uppercase mb-1 opacity-80">
              Email
            </span>
            <a 
              href="mailto:studio@monolith.arc" 
              className="font-montserrat text-[10px] tracking-[2px] hover:text-[#d4af37] transition-colors duration-300 uppercase"
            >
              studio@monolith.arc
            </a>
          </div>
        </div>

        {/* Operational Status: Group 2 */}
        <div className="flex items-center gap-4 bg-white/[0.03] px-5 py-2 rounded-full border border-white/5">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
          </div>
          <span className="font-mono text-[9px] tracking-[3px] uppercase text-white/50">
            Available for Commissions — 2026
          </span>
        </div>

      </div>
    </nav>
  );
}