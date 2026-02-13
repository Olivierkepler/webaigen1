"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function InteractiveGrid() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    const lerp = () => {
      setSmoothMouse((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.1,
        y: prev.y + (mousePos.y - prev.y) * 0.1,
      }));
      animationFrameId = requestAnimationFrame(lerp);
    };
    lerp();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

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
      className="relative bg-[#050505] py-40 px-[5%] md:px-[10%] overflow-hidden group/section"
    >
      {/* Scanner line */}
      <div
        className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-[#d4af37]/30 to-transparent z-0 transition-opacity duration-500 opacity-0 group-hover/section:opacity-100"
        style={{ left: `${(smoothMouse.x + 0.5) * 100}%` }}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center relative z-10">
        <div className="md:col-span-6 relative aspect-[4/5] perspective-[2000px]">
          <div
            className="w-full h-full relative transition-transform duration-100 ease-linear"
            style={{
              transform: `rotateY(${smoothMouse.x * 15}deg) rotateX(${smoothMouse.y * -15}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute inset-0 overflow-hidden shadow-[20px_20px_50px_rgba(0,0,0,0.5)]">
              <img
                src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=80"
                className="w-full h-full object-cover grayscale brightness-50 group-hover/section:brightness-100 group-hover/section:grayscale-0 transition-all duration-1000"
                style={{
                  transform: `scale(1.2) translate(${smoothMouse.x * -20}px, ${smoothMouse.y * -20}px)`,
                }}
                alt="Brutalist Structure"
              />
            </div>

            <div
              className="absolute -top-6 -right-6 p-6 bg-black/80 backdrop-blur-xl border border-white/10 z-20"
              style={{
                transform: `translateZ(50px) translate(${smoothMouse.x * 30}px, ${smoothMouse.y * 30}px)`,
              }}
            >
              <p className="font-mono text-[10px] text-[#d4af37] tracking-[4px] uppercase">Ref. 088-X</p>
              <p className="text-white text-[10px] tracking-widest mt-1 opacity-50">SHADOW MAPPING</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-6 space-y-12">
          <div className="relative">
            <span className="absolute -top-10 -left-4 text-[10vw] font-cormorant italic text-white/5 select-none pointer-events-none">
              Silence
            </span>

            <h2 className="font-cormorant text-7xl md:text-9xl font-light leading-none tracking-tighter relative z-10">
              <span className="block text-[#d4af37] mix-blend-difference">Curating</span>
              <span
                className="block text-white transition-all duration-300 ease-out"
                style={{
                  transform: `skewX(${smoothMouse.x * -10}deg)`,
                  filter: `blur(${Math.abs(smoothMouse.x) * 2}px)`,
                }}
              >
                THE VOID
              </span>
            </h2>
          </div>

          <p className="font-montserrat text-sm text-white/30 leading-relaxed max-w-sm border-l border-white/10 pl-6 italic">
            "The monolith is not a shape; it is a weight. We design for the pressure of space."
          </p>

          {/* CTA now navigates */}
          <Link
            href="/#selected-works"
            className="inline-block relative px-8 py-4 overflow-hidden group"
          >
            <span className="relative z-10 font-montserrat text-[0.6rem] tracking-[6px] uppercase text-white transition-colors duration-500 group-hover:text-black">
              Access Blueprint
            </span>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#d4af37] group-hover:h-full transition-all duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}
