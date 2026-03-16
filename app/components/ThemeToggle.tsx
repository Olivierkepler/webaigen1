"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration flicker
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-9 w-9" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative flex h-9 w-9 items-center justify-center overflow-hidden border border-border-subtle bg-foreground/[0.03] transition-all hover:bg-foreground/[0.08] active:scale-95"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ y: 15, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -15, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="text-accent"
        >
          {isDark ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3a6 6 0 009 9 9 9 0 11-9-9z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2m0 16v2m9-10h2M3 12H1m15.364-6.364l1.414-1.414M6.364 17.636l1.414-1.414M6.364 6.364L4.95 4.95m14.142 14.142l-1.414-1.414M12 7a5 5 0 100 10 5 5 0 000-10z" />
            </svg>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Decorative Micro-Border for Luxury Feel */}
      <div className="absolute inset-0 border border-accent/0 transition-colors group-hover:border-accent/20" />
    </button>
  );
}