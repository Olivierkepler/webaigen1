"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Globe, Wifi } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  // Replace this default with your actual Google Calendar Appointment URL
  calendarUrl?: string; 
};

export default function SchedulingModal({ 
  isOpen, 
  onClose,
  calendarUrl = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ..." // <--- PASTE YOUR LINK HERE
}: ModalProps) {

  // Simulate "Connecting" state for realism
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsConnecting(true);
      const timer = setTimeout(() => setIsConnecting(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
          
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020202]/90 backdrop-blur-md"
          />

          {/* MODAL WINDOW */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl h-[70vh] bg-[#0a0a0a] border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.1)] flex flex-col overflow-hidden rounded-sm"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#050505] z-10">
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${isConnecting ? 'border-amber-500/30 bg-amber-500/10' : 'border-green-500/30 bg-green-500/10'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${isConnecting ? 'bg-amber-500 animate-ping' : 'bg-green-500'}`} />
                  <span className={`font-mono text-[10px] tracking-wider uppercase ${isConnecting ? 'text-amber-500' : 'text-green-500'}`}>
                    {isConnecting ? "Establishing Uplink..." : "Signal Locked"}
                  </span>
                </div>
                <span className="hidden sm:block font-mono text-xs text-white/30 tracking-[0.2em] uppercase">
                  // Expert_Consultation
                </span>
              </div>
              
              <button 
                onClick={onClose}
                className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors"
              >
                <span className="hidden sm:block font-mono text-[10px] uppercase tracking-widest group-hover:text-[#d4af37]">Terminate</span>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CONTENT */}
            <div className="relative flex-grow bg-white">
               {isConnecting ? (
                 <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center gap-4 z-20">
                    <Wifi className="w-12 h-12 text-[#d4af37] animate-pulse" />
                    <div className="font-mono text-xs text-[#d4af37] uppercase tracking-widest">
                        Encrypting Channel...
                    </div>
                 </div>
               ) : (
                 <iframe 
                   src={calendarUrl} 
                   className="w-full h-full border-0"
                   title="Schedule Appointment"
                 />
               )}
            </div>
            
            {/* DECORATIVE FOOTER */}
            <div className="h-8 bg-[#050505] border-t border-white/5 flex items-center justify-between px-6">
                <div className="flex gap-4 font-mono text-[9px] text-white/20">
                    <span>SECURE_SOCKET_LAYER</span>
                    <span>TLS_1.3</span>
                </div>
                <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 bg-white/10 rounded-full" />)}
                </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}