"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { 
  motion, 
  useScroll, 
  useTransform, 
  AnimatePresence, 
  useSpring 
} from "framer-motion";

export default function Hero() {
  const [bgIndex, setBgIndex] = useState(0);

  // 1. Physics-based Scroll Parallax
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]); // Background moves slower
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]); // Content moves up faster
  
  // Add a spring physics smoothing to the scroll for that "weighty" feel
  const smoothY = useSpring(y1, { stiffness: 100, damping: 20, restDelta: 0.001 });

  // 2. High-End Curated Backgrounds
  const bgImages = [
    "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2500&auto=format&fit=crop", // Abstract Dark Mesh
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2500&auto=format&fit=crop", // Deep Space / AI
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2500&auto=format&fit=crop", // Network/Globe
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [bgImages.length]);

  return (
    <section className="relative h-screen top-15 sm:top-0 w-full overflow-hidden bg-[#030303] text-white">
      
      {/* --- BACKGROUND LAYER --- */}
      <motion.div 
        style={{ y: smoothY, scale: 1.05 }} 
        className="absolute inset-0 z-0"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }} // Long, cinematic crossfade
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${bgImages[bgIndex]}')` }}
          />
        </AnimatePresence>

        {/* Cinematic Overlays (The "Expensive" Look) */}
        <div className="absolute inset-0 bg-black/60" /> {/* Dimmer */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/90 via-transparent to-[#030303]/30" />
        
        {/* Noise Texture: Essential for modern "AI" feel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
             style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} 
        />
      </motion.div>

      {/* --- DECORATIVE GRID --- */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* --- CONTENT LAYER --- */}
      <motion.div 
        style={{ y: y2 }}
        className="relative z-10 flex h-full flex-col justify-center px-[6%] sm:px-[8%] pt-20"
      >
        <div className="max-w-5xl">
          
          

          {/* Headline */}
          <h1 className="font-cormorant text-[clamp(3rem,7vw,7.5rem)] sm:text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.85] font-light tracking-tight text-white mix-blend-color-dodge">
            <span className="block overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="block"
              >
                Design and build
              </motion.span>
            </span>
            <span className="block overflow-hidden h-30 text-white/50">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="block italic"
              >
                 at the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-amber-200 to-[#d4af37] animate-gradient-x bg-[length:200%_auto]">speed of light.</span>
              </motion.span>
            </span>
          </h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-2 sm:mt-8 max-w-2xl text-base sm:text-lg text-white/60 font-light leading-relaxed border-l border-white/20 pl-6"
          >
            WebAiGen helps founders build high-converting interfaces and automate operations. 
            Deploy production-ready systems that are <span className="text-white">secure by design</span>.
          </motion.p>

        {/* Buttons Container */}
{/* Buttons Container */}
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8, duration: 0.8 }}
  // Changed: flex-col on mobile, flex-row on small screens and up
  className="mt-12 flex w-full flex-col gap-3 sm:flex-row sm:w-auto sm:items-center sm:gap-4"
>
  <PrimaryButton href="/contact">Start Project</PrimaryButton>
  <SecondaryButton href="/work">View Case Studies</SecondaryButton>
</motion.div>

          {/* Stats / Trust (The "Footer" of the hero) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-20 hidden sm:flex flex-wrap gap-8 border-t border-white/10 pt-8"
          >
             <Stat label="Uptime Guarantee" value="99.9%" />
             <Stat label="Projects Shipped" value="150+" />
             <Stat label="Client Valuation" value="$500M+" />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

// --- Micro-Components for cleanness ---
function PrimaryButton({ children, href }: { children: React.ReactNode, href: string }) {
  return (
    <Link 
      href={href} 
      // Added: w-full sm:w-auto, justify-center
      className="group relative flex w-full items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
    >
      <span className="relative z-10 font-montserrat text-xs font-bold uppercase tracking-[3px] text-black">
        {children}
      </span>
      {/* Hover Shine Effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </Link>
  );
}

function SecondaryButton({ children, href }: { children: React.ReactNode, href: string }) {
  return (
    <Link 
      href={href} 
      // Added: w-full sm:w-auto, justify-center
      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-4 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 sm:w-auto"
    >
      <span className="font-montserrat text-xs font-medium uppercase tracking-[3px] text-white">
        {children}
      </span>
      {/* Arrow stays nicely aligned */}
      <span className="text-white/50 transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

function Stat({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-cormorant text-2xl text-white/90">{value}</span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">{label}</span>
    </div>
  );
}