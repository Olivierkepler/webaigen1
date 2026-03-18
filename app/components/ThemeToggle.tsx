"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => mounted && setTheme(isDark ? "light" : "dark")}
      className="px-4 py-2 border border-black/10 hover:border-[#d4af37]/60 bg-black/[0.03] text-black/85 hover:text-[#d4af37] dark:border-white/10 dark:bg-white/[0.02] dark:text-white/85 text-[0.7rem] font-montserrat tracking-[4px] uppercase transition-colors"
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} mode`
          : "Toggle theme"
      }
    >
      {mounted ? (isDark ? "Light" : "Dark") : "Theme"}
    </button>
  );
}