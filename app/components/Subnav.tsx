"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

export default function ContactSubnav() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  // 1. Intelligent Scroll Listener
  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = 100;
    // On mobile, we toggle visibility based on scroll. 
    // On desktop, we can use this to shrink the navbar slightly for a "tight" feel.
    setIsScrolled(latest > threshold);
  });

  // 2. Clipboard Logic
  const handleCopy = () => {
    navigator.clipboard.writeText("webaigen3@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* CONTAINER WRAPPER 
        - Desktop: Sticky, always visible.
        - Mobile: Fixed, only visible when isScrolled is true.
      */}
      <motion.nav 
        // Mobile Animation Control
        initial={false}
        animate={
            // Check window width logic handled via CSS classes, but here we control the 'y'
            typeof window !== 'undefined' && window.innerWidth < 768 
            ? (isScrolled ? "visible" : "hidden") 
            : "visible"
        }
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 }
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        
        className={`
          z-50 w-full select-none
          fixed top-30 left-0 right-0 px-4
          md:hidden
          ${!isScrolled && "hidden"} /* Hide on mobile initially via CSS to prevent flash */
        `}
      >
        <div className="pointer-events-auto mx-auto max-w-4xl">
          <div className="
            group relative flex items-center justify-between 
            bg-[#050505]/80 backdrop-blur-xl border border-white/10 
            px-5 py-3 md:px-8 md:py-4 
            rounded-2xl md:rounded-full 
            shadow-[0_8px_32px_rgba(0,0,0,0.5)]
            transition-all duration-500 hover:border-[#d4af37]/40 hover:bg-[#050505]/90
          ">
            
            {/* --- LEFT: Contact Actions --- */}
            <div className="flex w-full items-center justify-between md:justify-start md:gap-12">
              
              {/* Phone Button */}
              <a href="tel:+16173808053" className="flex flex-col group/item">
                <span className="font-mono text-[9px] text-[#d4af37] tracking-[2px] uppercase mb-0.5 opacity-60 group-hover/item:opacity-100 transition-opacity">
                  Call
                </span>
                <span className="font-sans text-xs font-medium text-white hover:text-[#d4af37] transition-colors">
                  +1 (617) 380-8053
                </span>
              </a>
              
              {/* Divider (Desktop Only) */}
              <div className="hidden md:block h-8 w-px bg-white/10" />

              {/* Email Button (Click to Copy) */}
              <button 
                onClick={handleCopy}
                className="flex flex-col text-right md:text-left group/item focus:outline-none"
              >
                <span className="font-mono text-[9px] text-[#d4af37] tracking-[2px] uppercase mb-0.5 opacity-60 group-hover/item:opacity-100 transition-opacity">
                  {copied ? "Copied!" : "Email"}
                </span>
                <span className={`font-sans text-xs font-medium transition-colors ${copied ? "text-[#d4af37]" : "text-white group-hover/item:text-[#d4af37]"}`}>
                  webaigen3@gmail.com
                </span>
              </button>
            </div>

            {/* --- RIGHT: Status Indicator (Desktop + Tablet) --- */}
            <div className="hidden md:flex items-center gap-3 bg-white/[0.03] px-4 py-1.5 rounded-full border border-white/5">
              <div className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#d4af37]"></span>
              </div>
              <span className="font-mono text-[9px] tracking-[2px] uppercase text-white/40 pt-px">
                System Online
              </span>
            </div>

            {/* --- SHINE EFFECT (Subtle moving sheen) --- */}
            <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl md:rounded-full pointer-events-none">
                <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:animate-shine" />
            </div>

          </div>
        </div>
      </motion.nav>
    </>
  );
}