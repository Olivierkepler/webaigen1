"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, ShieldCheck, X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check local storage to see if user has already acted
    const consent = localStorage.getItem("web_aigen_consent");
    
    // If not found, show banner after a short delay for smooth UX
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = (action: "accept" | "decline") => {
    // Save preference
    localStorage.setItem("web_aigen_consent", action);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-[200] w-[calc(100%-3rem)] max-w-sm"
        >
          {/* Main Container */}
          <div className="relative overflow-hidden rounded-sm border border-white/10 bg-[#050505]/95 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            
            {/* Top Decorative Line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50" />

            <div className="p-6">
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20">
                    <Cookie className="h-4 w-4 text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-white">
                      Protocol: Cookies
                    </h3>
                    <p className="font-mono text-[9px] text-white/40 uppercase tracking-wider">
                      Session_ID: Active
                    </p>
                  </div>
                </div>
                
                {/* Close (Decline) X */}
                <button 
                  onClick={() => handleAction("decline")}
                  className="text-white/30 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body Text */}
              <p className="mb-6 font-sans text-xs leading-relaxed text-white/70">
                We utilize non-intrusive tracking nodes to optimize system latency and user experience. 
                Data telemetry is encrypted. Do you authorize this uplink?
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => handleAction("accept")}
                  className="group relative flex-1 overflow-hidden bg-white px-4 py-2 text-center transition-colors hover:bg-[#d4af37]"
                >
                  <div className="absolute inset-0 flex items-center justify-between px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-1.5 w-1.5 border-l border-t border-black"/>
                    <div className="h-1.5 w-1.5 border-r border-t border-black"/>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-1.5 w-1.5 border-l border-b border-black"/>
                    <div className="h-1.5 w-1.5 border-r border-b border-black"/>
                  </div>
                  <span className="relative z-10 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                    Authorize
                  </span>
                </button>

                <button
                  onClick={() => handleAction("decline")}
                  className="flex-1 border border-white/10 bg-transparent px-4 py-2 text-center transition-colors hover:bg-white/5 hover:border-white/30"
                >
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                    Reject
                  </span>
                </button>
              </div>

              {/* Footer "Secure" badge */}
              <div className="mt-4 flex items-center justify-center gap-2 border-t border-white/5 pt-3">
                 <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
                 <span className="font-mono text-[9px] text-[#d4af37] tracking-widest uppercase">Encrypted Connection</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}