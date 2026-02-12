"use client";
import { useEffect, useState } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative h-screen w-full flex items-center overflow-hidden bg-[#050505]">
      {/* 1. Parallax Background Layer */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-200 ease-out"
        style={{ 
          transform: `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.2}px)`,
          backgroundImage: `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </div>

      {/* 2. Main Content Layer */}
      <div className="px-[10%] z-10 relative w-full">
        <div className="overflow-hidden mb-6">
          <p className="font-montserrat  font-extralight tracking-[8px] uppercase text-[0.95rem] text-[#d4af37] animate-[slide-up_1s_ease-out_forwards]">
            Global Architecture Collective
          </p>
        </div>

        <h1 className="font-cormorant text-[clamp(4rem,12vw,10rem)] leading-[0.8] font-light tracking-tighter">
          <span className="block overflow-hidden">
            <span className="block animate-[slide-up_1.2s_cubic-bezier(0.23,1,0.32,1)_0.2s_forwards]">
              The Soul
            </span>
          </span>
          <span className="block overflow-hidden mt-2">
            <span className="block italic font-light animate-[slide-up_1.2s_cubic-bezier(0.23,1,0.32,1)_0.4s_forwards]">
              of the <span className="not-italic stroke-text text-transparent">Structure.</span>
            </span>
          </span>
        </h1>

        {/* 3. The "Get Started" Architectural Button */}
        <div className="mt-16 overflow-hidden">
          <div className="animate-[slide-up_1.2s_cubic-bezier(0.23,1,0.32,1)_0.8s_forwards] opacity-0">
            <button className="group relative px-12 py-5 overflow-hidden border border-white/10 transition-all duration-500 hover:border-[#d4af37]/50">
              {/* Animated Background Fill */}
              <div className="absolute inset-0 w-0 bg-[#d4af37] transition-all duration-[700ms] cubic-bezier(0.23,1,0.32,1) group-hover:w-full" />
              
              {/* Button Text */}
              <span className="relative z-10 font-bold  cursor-pointer font-montserrat text-[0.65rem] tracking-[5px] uppercase text-white group-hover:text-black transition-colors duration-500">
                Begin Exploration
              </span>
              
              {/* Corner Accents (The "Architectural" feel) */}
              <div className="absolute top-0 left-0 w-2 h-[1px] bg-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2 h-[1px] bg-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

        {/* Decorative Architectural Line */}
        <div className="h-px bg-[#d4af37]/40 mt-16 w-0 animate-[grow-h_1.5s_ease-in-out_1s_forwards]" />
      </div>

      {/* 4. Refined Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-all duration-700 ease-in-out"
        style={{ 
            opacity: Math.max(0, 0.6 - scrollY / 400),
            transform: `translate3d(-50%, ${scrollY * 0.1}px, 0)` 
        }}
      >
        <div className="w-10 h-16 border-2 border-white rounded-full relative">
          <div className="w-4 h-4 bg-[#d4af37] absolute left-1/2 -translate-x-1/2 top-3 rounded-full animate-bounce" /> 
        </div>
        <span className="text-[0.5rem] tracking-[3px] font-montserrat uppercase opacity-40">Scroll</span>
      </div>

      {/* Side Decorative Metadata */}
      <div className="absolute mt-50 left-12 top-1/2 -rotate-90 origin-left z-10 hidden md:block opacity-20">
        <p className="text-[0.5rem] tracking-[5px] uppercase font-montserrat whitespace-nowrap">
          Latitude: 35.6895° N — Longitude: 139.6917° E
        </p>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </header>
  );
}