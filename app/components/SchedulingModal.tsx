"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Activity, Lock, Globe } from "lucide-react";
import LogoLoader from "../components/LogoLoader"; // Ensure this path is correct

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  calendarUrl?: string;
};

const LOADING_STEPS = [
  "INITIALIZING_UPLINK...",
  "RESOLVING_DNS_PROXY...",
  "HANDSHAKING_SECURE_LAYER...",
  "RENDERING_INTERFACE...",
];

export default function SchedulingModal({
  isOpen,
  onClose,
  calendarUrl = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ..." // <--- DEFAULT IF NONE PROVIDED
}: ModalProps) {
  const [isConnecting, setIsConnecting] = useState(true);
  const [loadingText, setLoadingText] = useState(LOADING_STEPS[0]);

  // Handle the "Fake Loading" sequence for immersion
  useEffect(() => {
    if (isOpen) {
      setIsConnecting(true);
      let stepIndex = 0;
      setLoadingText(LOADING_STEPS[0]);

      // Cycle through text
      const textInterval = setInterval(() => {
        stepIndex++;
        if (stepIndex < LOADING_STEPS.length) {
          setLoadingText(LOADING_STEPS[stepIndex]);
        }
      }, 450);

      // Finish loading
      const timer = setTimeout(() => {
        setIsConnecting(false);
        clearInterval(textInterval);
      }, 2000);

      return () => {
        clearTimeout(timer);
        clearInterval(textInterval);
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed mt-20 inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6">
          
          {/* 1. BACKDROP (Blur & Dim) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm"
          />

          {/* 2. MODAL CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative flex flex-col w-full max-w-5xl h-[90svh] sm:h-[85vh] bg-[#050505] border border-white/10 rounded-md shadow-[0_0_60px_rgba(212,175,55,0.08)] overflow-hidden"
          >
            
            {/* --- HEADER: TERMINAL STYLE --- */}
            <div className="flex-none flex items-center justify-between px-4 py-3 sm:px-6 bg-[#0a0a0a] border-b border-white/5 z-20">
              
              {/* Left: Status Indicator */}
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors duration-500 ${
                  isConnecting 
                    ? 'border-[#d4af37]/30 bg-[#d4af37]/5' 
                    : 'border-emerald-500/30 bg-emerald-500/5'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${
                    isConnecting ? 'bg-[#d4af37] animate-ping' : 'bg-emerald-500'
                  }`} />
                  <span className={`font-mono text-[10px] tracking-widest uppercase font-semibold ${
                    isConnecting ? 'text-[#d4af37]' : 'text-emerald-500'
                  }`}>
                    {isConnecting ? "Connecting" : "Secure_Link_Active"}
                  </span>
                </div>

                {/* Desktop Only: Technical Jargon */}
                <div className="hidden md:flex items-center gap-2 text-white/20">
                  <Activity className="w-3 h-3" />
                  <span className="font-mono text-[10px] tracking-widest uppercase">
                    Channel: Encrypted
                  </span>
                </div>
              </div>
              
              {/* Right: Close Button */}
              <button 
                onClick={onClose}
                className="group flex items-center gap-2 px-2 py-1 text-white/40 hover:text-white hover:bg-white/5 rounded-sm transition-all"
              >
                <span className="hidden sm:block font-mono text-[10px] uppercase tracking-widest group-hover:text-[#d4af37] transition-colors">
                  Close Terminal
                </span>
                <div className="p-1 border border-white/10 rounded-sm group-hover:border-white/40">
                  <X className="w-4 h-4" />
                </div>
              </button>
            </div>

            {/* --- BODY: THE CONTENT --- */}
            <div className="relative flex-grow w-full bg-[#FFFFFF]">
              
               {/* A. LOADING OVERLAY (High Tech) */}
               <AnimatePresence>
                 {isConnecting && (
                   <motion.div 
                     initial={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#020202]"
                   >
                      {/* Grid Background Effect */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
                      
                      {/* Scanline Effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-2 w-full animate-scanline pointer-events-none" />

                      <div className="relative z-10 flex flex-col items-center gap-6">
                        <LogoLoader size={120} label="" />
                        
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-mono text-xs text-[#d4af37] tracking-[0.25em] uppercase animate-pulse">
                            {loadingText}
                          </span>
                          <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
                            Please Stand By...
                          </span>
                        </div>
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>

               {/* B. THE ACTUAL CALENDAR IFRAME */}
               <iframe
                    className="w-full h-full border-0"
                 title="Consultation Schedule"
                 // "allow" permissions are important for modern calendars
                 allow="camera; microphone; fullscreen; display-capture; autoplay" 
               />


            </div>
            
            {/* --- FOOTER: DECORATIVE STATUS BAR --- */}
            <div className="flex-none h-10 bg-[#050505] border-t border-white/5 flex items-center justify-between px-6 z-20">
                
                {/* Protocol Info */}
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2 text-white/30">
                      <Lock className="w-3 h-3" />
                      <span className="font-mono text-[9px] tracking-widest uppercase">TLS_1.3 // 256-Bit</span>
                   </div>
                   <div className="hidden sm:flex items-center gap-2 text-white/30">
                      <Globe className="w-3 h-3" />
                      <span className="font-mono text-[9px] tracking-widest uppercase">Node: US-EAST-1</span>
                   </div>
                </div>

                {/* Decorative LED Array */}
                <div className="flex gap-1.5 opacity-50">
                    {[1,2,3].map(i => (
                      <motion.div 
                        key={i} 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                        className="w-1 h-1 bg-[#d4af37] rounded-full" 
                      />
                    ))}
                </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}