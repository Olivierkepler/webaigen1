"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function InteractiveGrid() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // Raw mouse pos
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 }); // Lerped mouse pos
  const containerRef = useRef<HTMLElement>(null);

  // 1. Linear Interpolation for Smoothness (The "Weighty" feel)
  useEffect(() => {
    let animationFrameId: number;
    const lerp = () => {
      setSmoothMouse((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.08, // Lower = smoother/heavier
        y: prev.y + (mousePos.y - prev.y) * 0.08,
      }));
      animationFrameId = requestAnimationFrame(lerp);
    };
    lerp();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  // 2. Track Mouse Relative to Container (-0.5 to 0.5)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - left) / width - 0.5,
      y: (e.clientY - top) / height - 0.5,
    });
  };

  return (
    <section
      id="vision"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-[#050505] py-32 md:py-48 px-[5%] md:px-[10%] overflow-hidden group/section border-t border-white/5"
    >
      {/* Background Grid (Tech aesthetic) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Dynamic Scanner Line (Follows Mouse X) */}
      <div
        className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-[#d4af37]/60 to-transparent z-0 transition-opacity duration-300 opacity-0 group-hover/section:opacity-100 mix-blend-screen"
        style={{ 
            left: `${(mousePos.x + 0.5) * 100}%`,
            transition: "left 0.1s ease-out" 
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* --- LEFT: 3D Image Container --- */}
        <div className="md:col-span-6 relative aspect-[4/5] perspective-[2000px]">
          <div
            className="w-full h-full relative transition-transform duration-100 ease-linear transform-gpu"
            style={{
              // Rotates based on mouse position
              transform: `rotateY(${smoothMouse.x * 20}deg) rotateX(${smoothMouse.y * -20}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* The Image Wrapper */}
            <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-[0px_0px_100px_rgba(212,175,55,0.05)]">
              {/* Scanlines Overlay */}
              <div className="absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
              <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-2 bg-[length:100%_2px,3px_100%] pointer-events-none" />

              <img
                // Tech/Neural Network Image
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-full object-cover opacity-60 grayscale transition-all duration-700 group-hover/section:opacity-100 group-hover/section:grayscale-0 group-hover/section:scale-110"
                style={{
                  transform: `scale(1.1) translate(${smoothMouse.x * -30}px, ${smoothMouse.y * -30}px)`,
                }}
                alt="WebAiGen Neural Network"
              />
            </div>

            {/* Floating HUD Badge (3D Effect) */}
            <div
              className="absolute -top-6 -right-6 p-4 bg-[#050505]/90 backdrop-blur-md border border-[#d4af37]/30 z-20 shadow-2xl"
              style={{
                transform: `translateZ(60px) translate(${smoothMouse.x * 40}px, ${smoothMouse.y * 40}px)`,
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-1.5 w-1.5 bg-[#d4af37] animate-pulse rounded-full" />
                <p className="font-mono text-[9px] text-[#d4af37] tracking-[2px] uppercase">
                  Live Feed
                </p>
              </div>
              <p className="font-mono text-[9px] text-white/50 tracking-widest uppercase">
                X: {mousePos.x.toFixed(2)} <br/> 
                Y: {mousePos.y.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* --- RIGHT: Content --- */}
        <div className="md:col-span-6 space-y-10 pl-0 md:pl-10">
          <div className="relative">
            {/* Background Watermark */}
            <span className="absolute -top-16 -left-10 text-[8rem] font-bold font-mono text-white/[0.02] select-none pointer-events-none overflow-hidden whitespace-nowrap">
              SYSTEM_V2
            </span>

            <h2 className="font-cormorant text-[clamp(2.25rem,7vw,5rem)] leading-[0.9] font-light tracking-tight text-white drop-shadow-2xl">
              <span className="block text-[#d4af37] mix-blend-screen drop-shadow-lg">
                Neural
              </span>
              <span
                className="block font-cormorant text-[clamp(2.25rem,7vw,5rem)] leading-[0.9] font-light tracking-tight text-white drop-shadow-2xl"
                style={{
                  // Text "Glitch" / Skew based on mouse movement speed
                  transform: `skewX(${smoothMouse.x * -15}deg)`,
                  opacity: 1 - Math.abs(smoothMouse.x * 0.5), // Fades slightly on heavy skew
                }}
              >
                ARCHITECTS
              </span>
            </h2>
          </div>

          <p className="font-sans text-sm md:text-base text-white/40 leading-relaxed max-w-md border-l border-[#d4af37]/20 pl-6">
            <span className="text-white">WebAiGen</span> bridges the gap between human intent and machine execution. 
            We design autonomous systems that don't just exist—they <span className="text-[#d4af37] italic">evolve</span>.
          </p>

          {/* Tech Button */}
          <div className="pt-4">
            <Link
                href="/#tech-stack"
                className="inline-flex items-center justify-center relative px-8 py-4 overflow-hidden group border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#d4af37]/50 transition-colors"
            >
                {/* Button Scanline */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                
                <span className="relative z-10 font-mono text-[10px] tracking-[4px] uppercase text-white group-hover:text-[#d4af37] transition-colors">
                Initialize Protocol
                </span>
                
                {/* Corner Accents */}
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-hover:border-[#d4af37] transition-colors" />
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:border-[#d4af37] transition-colors" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}