"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function Footer() {
  const [time, setTime] = useState(new Date());
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const footerRef = useRef<HTMLElement>(null);

  // 1. Time Logic
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Scroll Progress Logic for Magnetic Scale
  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visibleHeight = windowHeight - rect.top;
      const progress = Math.min(Math.max(visibleHeight / rect.height, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatTime = (offset: number) => {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: offset === 9 ? "Asia/Tokyo" : "Europe/London",
    }).format(time);
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-[#050505] pt-40 pb-10 border-t border-white/5 overflow-hidden relative"
    >
      {/* 3. THE PORTAL LAYER: Scales with Scroll */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          transform: `scale(${0.85 + (scrollProgress * 0.15)})`,
          opacity: scrollProgress,
          filter: `blur(${(1 - scrollProgress) * 40}px)`,
          transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#d4af3708] via-transparent to-transparent" />
      </div>

      {/* Back to Top Magnet */}
      <div 
        onMouseEnter={() => setIsHoveringTop(true)}
        onMouseLeave={() => setIsHoveringTop(false)}
        onClick={scrollToTop}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 flex items-center justify-center cursor-pointer z-50 group"
      >
        <div className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isHoveringTop ? 'scale-150' : 'scale-100'}`}>
          <div className="w-px h-16 bg-[#d4af37] mx-auto group-hover:h-20 transition-all duration-500" />
          <span className={`absolute top-20 left-1/2 -translate-x-1/2 font-montserrat text-[0.5rem] tracking-[4px] uppercase text-[#d4af37] transition-opacity duration-500 ${isHoveringTop ? 'opacity-100' : 'opacity-0'}`}>
            Top
          </span>
        </div>
      </div>

      {/* Marquee Background */}
      <div className="relative w-full overflow-hidden border-b border-white/5 pb-20 select-none pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-[#050505] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-[#050505] to-transparent" />

        <div className="flex animate-[marquee_40s_linear_infinite] min-w-full items-center" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <span 
              key={i}
              className="font-cormorant text-[5vw] leading-none uppercase italic font-extralight tracking-[-0.05em] inline-block px-12 text-[#d4af37] opacity-[0.5]"
            >
              Monolith Archive
              <span className="mx-8 text-[#d4af37] opacity-40 not-italic inline-block translate-y-[-0.1em]">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* 4. MAIN CONTENT: Wraps in a relative z-10 to stay above portal */}
      <div className="px-[5%] md:px-[10%] mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          
          <div className="md:col-span-5 space-y-12">
            <h2 className="font-cormorant text-5xl md:text-8xl font-light leading-none mb-6">
              Let's build <br /> 
              <span className="text-transparent [-webkit-text-stroke:1px_rgba(212,175,55,0.6)]">the void.</span>
            </h2>
            
            {/* <div className="grid grid-cols-2 gap-8">
              <div className="border-l border-white/10 pl-4">
                <p className="text-[#d4af37] text-[0.5rem] tracking-[3px] uppercase mb-2">Tokyo JST</p>
                <p className="font-mono text-xl opacity-80">{formatTime(9)}</p>
              </div>
              <div className="border-l border-white/10 pl-4">
                <p className="text-[#d4af37] text-[0.5rem] tracking-[3px] uppercase mb-2">London GMT</p>
                <p className="font-mono text-xl opacity-80">{formatTime(0)}</p>
              </div>
            </div> */}
          </div>

          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <p className="text-[0.6rem] tracking-[4px] uppercase opacity-30">Navigation</p>
              <ul className="space-y-4 font-montserrat text-xs tracking-widest uppercase">
                <li><Link href="/archive" className="hover:text-[#d4af37] transition-all hover:pl-2">Archive</Link></li>
                <li><Link href="/collective" className="hover:text-[#d4af37] transition-all hover:pl-2">Collective</Link></li>
                <li><Link href="/exhibitions" className="hover:text-[#d4af37] transition-all hover:pl-2">Exhibitions</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <p className="text-[0.6rem] tracking-[4px] uppercase opacity-30">Social</p>
              <ul className="space-y-4 font-montserrat text-xs tracking-widest uppercase text-white/60">
                <li><a href="#" className="hover:text-[#d4af37] transition-colors italic">Instagram</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors italic">LinkedIn</a></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 space-y-6">
              <p className="text-[0.6rem] tracking-[4px] uppercase opacity-30">Newsletter</p>
              <div className="relative group overflow-hidden">
                <input 
                  type="email" 
                  placeholder="EMAIL" 
                  className="bg-transparent border-b border-white/10 w-full py-2 text-[0.7rem] outline-none focus:border-[#d4af37] transition-colors uppercase tracking-widest"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[#d4af37] translate-x-10 group-focus-within:translate-x-0 transition-transform duration-500">→</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[0.5rem] tracking-[4px] uppercase opacity-30">
          <p>© 2026 MONOLITH ARCHIVE.</p>
          <div className="flex gap-10">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
          </div>
          <p className="text-[#d4af37] font-semibold">Built for the future.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </footer>
  );
}