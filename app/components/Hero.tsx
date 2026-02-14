"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useMotionTemplate,
  AnimatePresence 
} from "framer-motion";

// --- CUSTOM HOOK: Decrypt Text Effect ---
const useDecrypt = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "XY01_<>[]?/~!@#%&*";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < i) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      i += 1 / 3; 
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayText;
};

function DecryptText({ text, className }: { text: string, className?: string }) {
  const decrypted = useDecrypt(text);
  return <span className={className}>{decrypted}</span>;
}

export default function Hero() {
  const [bgIndex, setBgIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  // 1. Mouse Interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(({ clientX, clientY }: MouseEvent) => {
    const { left, top } = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // A subtle spotlight that follows the mouse
  const spotlight = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    rgba(255, 255, 255, 0.05),
    transparent 80%
  )`;

  // 2. Parallax Scroll
  const { scrollY } = useScroll();
  const yContent = useTransform(scrollY, [0, 1000], [0, -100]);
  const yBg = useTransform(scrollY, [0, 1000], [0, 200]);

  // 3. CURATED HIGH-TECH IMAGES
  const bgImages = [
    // Image 1: The "Neural Brain" - Dark with Gold Nodes (AI focus)
    "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2600&auto=format&fit=crop",
    // Image 2: The "Quantum Core" - Sharp hardware/processor macro (Infrastructure focus)
    "https://images.unsplash.com/photo-1555664424-778a69032334?q=80&w=2600&auto=format&fit=crop",
    // Image 3: The "Data Stream" - Abstract dark fiber/geometric (Speed focus)
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2600&auto=format&fit=crop",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 6000); // Change image every 6 seconds
    return () => clearInterval(timer);
  }, [bgImages.length]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#020202] text-white selection:bg-[#d4af37] selection:text-black"
    >
      
      {/* --- LAYER 1: Background Images (High Visibility) --- */}
      <motion.div 
        style={{ y: yBg, scale: 1.1 }}
        className="absolute inset-0 z-0"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }} // Increased opacity for visibility
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${bgImages[bgIndex]}')` }}
          />
        </AnimatePresence>

        {/* Smart Overlay: Clear center, Dark edges (Vignette) */}
        {/* This allows the image to be SEEN in the middle, but text readable on sides/bottom */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)]" />
        
        {/* Vertical Gradient for Text Readability at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/50" />
      </motion.div>

      {/* --- LAYER 2: Mouse Spotlight --- */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-100 mix-blend-overlay"
        style={{ background: spotlight }}
      />

      {/* --- LAYER 3: 3D Grid Floor --- */}
      <div className="absolute inset-0 z-0 [perspective:1000px] pointer-events-none">
        <div className="absolute bottom-[-20%] left-[-20%] right-[-20%] top-[20%] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] transform rotate-x-60 opacity-30" />
      </div>

      {/* --- LAYER 4: Content --- */}
      <motion.div 
        style={{ y: yContent }}
        className="relative z-20 flex h-full flex-col justify-center px-[6%] sm:px-[8%]"
      >
        <div className="max-w-6xl">
          
          {/* Top Tag */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex items-center gap-3"
          >
            <div className="flex h-6 px-3 items-center justify-center rounded-sm border border-[#d4af37]/30 bg-[#d4af37]/10 backdrop-blur-md">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#d4af37]">
                System Online
              </span>
            </div>
            <span className="h-px w-12 bg-[#d4af37]/20" />
          </motion.div>

          {/* Main Headline */}
          <h1 className="font-cormorant text-[clamp(3.5rem,7vw,8rem)] leading-[0.9] font-light tracking-tight text-white drop-shadow-2xl">
            <span className="block text-white/40 text-[0.4em] mb-2 font-mono tracking-widest uppercase pl-1">
              <DecryptText text="Next Gen Intelligence" />
            </span>
            <span className="block">
              Design & Build
            </span>
            <span className="block italic">
               at the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-yellow-100 to-[#d4af37] animate-pulse">
                 Speed of Light.
               </span>
            </span>
          </h1>

          {/* Description */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-8 flex flex-col sm:flex-row items-start gap-6 sm:gap-12"
          >
             <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-[#d4af37] to-transparent mt-4" />
             <p className="max-w-xl font-sans text-sm sm:text-lg text-white/80 leading-relaxed drop-shadow-md">
               WebAiGen engineers high-performance interfaces and autonomous systems.
               We deploy production-ready intelligence that is <span className="text-white font-medium border-b border-[#d4af37]/50 pb-0.5">secure by design</span>.
             </p>
          </motion.div>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 flex w-full flex-col gap-5 sm:flex-row sm:w-auto sm:items-center"
          >
            <PrimaryButton href="/contact">Initialize Project</PrimaryButton>
            <SecondaryButton href="/work">Access Case Studies</SecondaryButton>
          </motion.div>

        </div>
      </motion.div>

      {/* Footer Stats Ticker */}
      <div className="absolute bottom-0 left-0 right-0 z-30 hidden sm:flex justify-between px-[6%] py-6 border-t border-white/10 bg-black/20 backdrop-blur-sm">
         <Stat label="Latency" value="12ms" />
         <Stat label="Encryption" value="AES-256" />
         <Stat label="Status" value="Optimized" color="#d4af37" />
         <Stat label="Region" value="Global Edge" />
      </div>

    </section>
  );
}

// --- Micro Components ---

function PrimaryButton({ children, href }: { children: React.ReactNode, href: string }) {
  return (
    <Link 
      href={href} 
      className="group relative flex w-full items-center justify-center bg-white px-8 py-4 sm:w-auto hover:bg-[#d4af37] transition-colors duration-300"
    >
      {/* Tech Brackets */}
      <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-black transition-all duration-300 group-hover:h-full group-hover:w-full opacity-0 group-hover:opacity-100" />
      <div className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-black transition-all duration-300 group-hover:h-full group-hover:w-full opacity-0 group-hover:opacity-100" />
      
      <span className="relative z-10 font-mono text-xs font-bold uppercase tracking-[2px] text-black">
        {children}
      </span>
    </Link>
  );
}

function SecondaryButton({ children, href }: { children: React.ReactNode, href: string }) {
  return (
    <Link 
      href={href} 
      className="group relative flex w-full items-center justify-center gap-3 border border-white/20 bg-black/40 px-8 py-4 backdrop-blur-sm transition-all hover:border-[#d4af37] sm:w-auto"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
      <span className="font-mono text-xs font-medium uppercase tracking-[2px] text-white group-hover:text-[#d4af37] transition-colors">
        {children}
      </span>
    </Link>
  );
}

function Stat({ label, value, color = "white" }: { label: string, value: string, color?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`h-1 w-1 rounded-full ${color === "white" ? "bg-white/40" : "bg-[#d4af37]"}`} />
      <div className="flex flex-col">
        <span className="font-mono text-[9px] uppercase text-white/40 tracking-wider">{label}</span>
        <span className="font-mono text-xs text-white" style={{ color: color === "white" ? "" : color }}>{value}</span>
      </div>
    </div>
  );
}