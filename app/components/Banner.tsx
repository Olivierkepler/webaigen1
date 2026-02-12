"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

export default function ArchitectBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for the "Perspective Shift"
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Rotating the banner slightly based on mouse position
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      className="py-20 px-[5%] bg-[#050505] perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full max-w-7xl mx-auto h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden border border-white/10 bg-[#111]"
      >
        {/* Background Layer: High-Contrast Abstract Architecture */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1495572049086-a971d881fa8d?q=80&w=1920&auto=format&fit=crop" 
            alt="Abstract Concrete" 
            className="w-full h-full object-cover opacity-40 grayscale scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-transparent to-[#d4af37]/10" />
        </div>

        {/* Floating Glass Element */}
        <motion.div 
          style={{ translateZ: "50px" }}
          className="absolute inset-10 z-10 border border-white/20 rounded-2xl backdrop-blur-md bg-white/[0.02] p-8 md:p-16 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="font-mono text-[10px] tracking-[6px] text-[#d4af37] uppercase">
                Now Commissioning
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-white leading-none">
                Bring the <br /> <span className="italic text-white/60">Vision to life.</span>
              </h2>
            </div>
            <div className="hidden md:block">
               {/* Minimalist Grid Icon */}
               <div className="grid grid-cols-2 gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-[#d4af37]/40" />
                  ))}
               </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="max-w-md text-sm text-white/50 leading-relaxed font-light">
              Our studio is currently accepting select inquiries for the 2026/27 cycle. 
              We prioritize projects that challenge the boundaries of material and shadow.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-[#d4af37] text-black font-montserrat font-bold text-xs tracking-[4px] uppercase rounded-full transition-shadow hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              Start Inquiry
            </motion.button>
          </div>
        </motion.div>

        {/* Decorative "Data" Layers */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[10px] text-white/10 uppercase pointer-events-none">
          Structural Integrity // 44.098 - 12.001
        </div>
      </motion.div>
    </section>
  );
}