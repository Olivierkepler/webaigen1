"use client";

import { useState, useEffect } from "react";
import { CalendarDays, X, Clock, Globe, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScheduleModalLauncher() {
  const [open, setOpen] = useState(false);

  // Lock scroll when modal is open for a premium feel
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      {/* LAUNCHER: High-End Secondary Action Style */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
        className="group relative  cursor-pointer  flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-black/50 px-6 py-3 backdrop-blur-md transition-all hover:border-amber-500/50"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <CalendarDays className="h-4 w-4 text-amber-500" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
          Secure Session
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6">
            {/* BACKDROP: Deep Blur for focus */}
            <motion.button
              type="button"
              aria-label="Close modal backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* MODAL CASE */}
            <motion.div
              layoutId="modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050505] shadow-[0_0_80px_rgba(0,0,0,0.5)]"
              role="dialog"
              aria-modal="true"
            >
              {/* Top Accent Line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

              {/* HEADER AREA */}
              <div className="flex items-center justify-between px-8 pt-8 pb-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500/80">
                      Protocol Initialization
                    </span>
                  </div>
                  <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase">
                    System Architecture Sync
                  </h2>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all hover:bg-white hover:text-black"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 transition-transform group-hover:rotate-90" />
                </button>
              </div>

              {/* MODAL BODY */}
              <div className="px-8 pb-10">
                {/* Meta Info Bar */}
                <div className="mb-8 flex flex-wrap gap-4 border-y border-white/5 py-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <Clock className="h-3 w-3 text-amber-500" />
                    45 MINUTE BRIEFING
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <Globe className="h-3 w-3 text-amber-500" />
                    SYNCED TO LOCAL TIME
                  </div>
                </div>

                {/* CONTENT PLACEHOLDER (The "Glass" Card) */}
                <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-amber-500/10 p-4">
                      <CalendarDays className="h-8 w-8 text-amber-500" />
                    </div>
                  </div>

                  <p className="mx-auto max-w-xs text-sm font-medium leading-relaxed text-slate-300">
                    Initializing your customized scheduling interface...
                  </p>

                  {/* Subtle Loading Progress */}
                  <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "0%" }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="h-full w-1/3 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                    />
                  </div>
                </div>

                {/* ACTION FOOTER */}
                <div className="mt-8 flex flex-col gap-3">
                  <button className="flex w-full items-center justify-between rounded-xl bg-white px-6 py-4 text-[10px] font-black uppercase tracking-widest text-black transition-transform hover:scale-[1.02]">
                    Next Step: Select Date
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <p className="text-center text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    Powered by WebAiGen Autonomous Scheduler
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
