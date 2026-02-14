"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

export default function ContactSubnav() {
  const { scrollY } = useScroll();
  const [isMobileVisible, setIsMobileVisible] = useState(false);

  // Scroll Listener: Only affects mobile state
  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = 150; // Show after scrolling 150px
    if (latest > threshold && !isMobileVisible) {
      setIsMobileVisible(true);
    } else if (latest <= threshold && isMobileVisible) {
      setIsMobileVisible(false);
    }
  });

  return (
    <>
      {/* --- DESKTOP: Always Sticky --- */}
      <nav className="hidden md:block sticky top-30 z-40 w-full px-[8%] select-none pointer-events-none">
        <div className="pointer-events-auto mx-auto max-w-4xl">
          <Content />
        </div>
      </nav>

      {/* --- MOBILE: Fixed & Scroll Triggered --- */}
      <AnimatePresence>
        {isMobileVisible && (
          <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none"
          >
            <div className="pointer-events-auto shadow-2xl">
              <Content mobile />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

// --- SHARED CONTENT COMPONENT ---
function Content({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={`
      relative flex items-center justify-between 
      bg-[#050505]/80 backdrop-blur-xl border border-white/10 
      transition-colors duration-500 hover:border-[#d4af37]/40 
      ${mobile ? "rounded-2xl px-5 py-3 gap-4" : "rounded-full px-6 py-4 gap-0"}
    `}>
      
      {/* Contact Info */}
      <div className={`flex w-full ${mobile ? "flex-row justify-between items-center" : "justify-start gap-12"}`}>
        
        {/* Phone */}
        <div className="group flex flex-col">
          <span className="font-mono text-[9px] text-[#d4af37] tracking-[2px] uppercase mb-1 opacity-70">
            Inquiry
          </span>
          <a 
            href="tel:+16173808053" 
            className="font-sans text-xs font-medium text-white tracking-wide hover:text-[#d4af37] transition-colors"
          >
            +1 (617) 380-8053
          </a>
        </div>
        
        {/* Email */}
        <div className={`group flex flex-col ${mobile ? "text-right" : "border-l border-white/10 pl-8 text-left"}`}>
          <span className="font-mono text-[9px] text-[#d4af37] tracking-[2px] uppercase mb-1 opacity-70">
            Email
          </span>
          <a 
            href="mailto:webaigen3@gmail.com" 
            className="font-sans text-xs font-medium text-white tracking-wide hover:text-[#d4af37] transition-colors"
          >
           webaigen3@gmail.com
          </a>
        </div>
      </div>

      {/* Status Indicator (Desktop Only to save space on mobile) */}
      {!mobile && (
        <div className="flex items-center gap-3 bg-white/[0.02] px-4 py-2 rounded-full border border-white/5">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
          </div>
          <span className="font-mono text-[9px] tracking-[2px] uppercase text-white/50">
            System Online
          </span>
        </div>
      )}
    </div>
  );
}