"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

/* =========================================================
   Decrypt Effect — polished (RAF-based, stable, less jitter)
   ========================================================= */
function useDecrypt(text: string, speedMs = 18, delayMs = 120) {
  const [out, setOut] = useState(text);
  const reduceMotion = useReducedMotion();

  const glyphs = useMemo(
    () => "XY01_<>[]?/~!@#%&*".split(""),
    []
  );

  useEffect(() => {
    if (reduceMotion) {
      setOut(text);
      return;
    }

    let raf = 0;
    let start = 0;
    let done = false;

    const tick = (t: number) => {
      if (!start) start = t;

      const elapsed = t - start;
      if (elapsed < delayMs) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const steps = Math.floor((elapsed - delayMs) / speedMs);
      const progress = Math.min(steps / text.length, 1);

      const revealCount = Math.floor(progress * text.length);

      const next = text
        .split("")
        .map((ch, i) => {
          if (i < revealCount) return ch;
          return glyphs[(i * 7 + steps) % glyphs.length];
        })
        .join("");

      setOut(next);

      if (revealCount >= text.length) done = true;
      if (!done) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, speedMs, delayMs, glyphs, reduceMotion]);

  return out;
}

function DecryptText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const d = useDecrypt(text);
  return <span className={className}>{d}</span>;
}

/* =========================================================
   Hero — polished for premium / high-end feel
   ========================================================= */
export default function Hero() {
  const [bgIndex, setBgIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // 1) Mouse spotlight (scoped to section; not global window)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY, reduceMotion]
  );

  const spotlight = useMotionTemplate`radial-gradient(
    680px circle at ${mouseX}px ${mouseY}px,
    rgba(255, 255, 255, 0.06),
    transparent 72%
  )`;

  // 2) Scroll parallax (gentler)
  const { scrollY } = useScroll();
  const yContent = useTransform(scrollY, [0, 1000], [0, -90]);
  const yBg = useTransform(scrollY, [0, 1000], [0, 170]);

  // 3) Curated background set (memoized)
  const bgImages = [
    // Neural / AI / conceptual
    "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=2600&q=80", // your current neural
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=2600&q=80", // modern AI abstract (great hero)
  
    // Code / web dev
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=2600&q=80", // code close-up (classic)
    "https://images.unsplash.com/photo-1641593629558-5a2bb7d1c16f?auto=format&fit=crop&w=2600&q=80", // modern dev/terminal vibe
    "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=2600&q=80", // “AI/web” abstract tech
  
    // Infrastructure / compute
    "https://images.unsplash.com/photo-1555664424-778a69032334?auto=format&fit=crop&w=2600&q=80", // your current chip/core
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2600&q=80", // circuits (clean + premium)
  
    // Data stream / fiber / networking
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2600&q=80", // your current data stream
    "https://images.unsplash.com/photo-1606755962773-d324e7a7a61b?auto=format&fit=crop&w=2600&q=80", // fiber optic streak
    "https://images.unsplash.com/photo-1488229297570-58520851e868?auto=format&fit=crop&w=2600&q=80", // network light lines
  
    // UI / geometric “systems”
    "https://images.unsplash.com/photo-1752533809748-6d875f1f83c2?auto=format&fit=crop&w=2600&q=80", // geometric black tech (super premium)
    "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=2600&q=80", // abstract grid / UI-like
  ];
  

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      setBgIndex((p) => (p + 1) % bgImages.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [bgImages.length, reduceMotion]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-[100svh] w-full overflow-hidden bg-[#020202] text-white selection:bg-[#d4af37] selection:text-black"
    >
      {/* =====================================================
          LAYER 1: Background image + cinematic overlays
          ===================================================== */}
      <motion.div
        style={{ y: yBg, scale: 1.08 }}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.62 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${bgImages[bgIndex]}')` }}
          />
        </AnimatePresence>

        {/* Vignette + bottom readability */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_92%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/40" />

        {/* subtle film grain */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* =====================================================
          LAYER 2: Spotlight (mouse-follow)
          ===================================================== */}
      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay"
          style={{ background: spotlight }}
          aria-hidden="true"
        />
      )}

      {/* =====================================================
          LAYER 3: 3D grid floor (softer + cleaner)
          ===================================================== */}
      <div className="absolute inset-0 z-[1] [perspective:1000px] pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-[-22%] left-[-20%] right-[-20%] top-[22%] bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:56px_56px] transform rotate-x-[62deg] opacity-25" />
      </div>

      {/* =====================================================
          LAYER 4: Content
          ===================================================== */}
      <motion.div
        style={{ y: yContent }}
        className="relative z-20 flex h-full flex-col justify-center px-[6%] sm:px-[8%]"
      >
        <div className="max-w-6xl">
          {/* Top Tag */}
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 flex items-center gap-3"
          >
            <div className="flex h-7 px-3.5 items-center justify-center rounded-sm border border-[#d4af37]/25 bg-[#d4af37]/10 backdrop-blur-md">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#d4af37]">
                System Online
              </span>
            </div>
            <span className="h-px w-12 bg-[#d4af37]/20" />
          </motion.div>

          {/* Headline */}
          <h1 className="font-cormorant text-[clamp(3.25rem,7vw,8rem)] leading-[0.9] font-light tracking-tight text-white drop-shadow-2xl">
            <span className="block text-white/45 text-[0.42em] mb-3 font-mono tracking-[0.32em] uppercase pl-1">
              <DecryptText text="Next Gen Intelligence" />
            </span>

            <span className="block">Design & Build</span>

            <span className="block italic">
              at the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-yellow-100 to-[#d4af37]">
                Speed of Light.
              </span>
            </span>
          </h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-start gap-6 sm:gap-12"
          >
            <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-[#d4af37] to-transparent mt-4" />
            <p className="max-w-xl font-sans text-sm sm:text-lg text-white/82 leading-relaxed drop-shadow-md">
              WebAiGen engineers high-performance interfaces and autonomous systems.
              We deploy production-ready intelligence that is{" "}
              <span className="text-white font-medium border-b border-[#d4af37]/50 pb-0.5">
                secure by design
              </span>
              .
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 flex w-full flex-col gap-5 sm:flex-row sm:w-auto sm:items-center"
          >
            <PrimaryButton href="/contact">Initialize Project</PrimaryButton>
            <SecondaryButton href="/work">Access Case Studies</SecondaryButton>
          </motion.div>
        </div>
      </motion.div>

      {/* =====================================================
          Footer stats — cleaner, more “enterprise”
          ===================================================== */}
      <div className="absolute bottom-0 left-0 right-0 z-30 hidden sm:flex justify-between px-[6%] py-6 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <Stat label="Latency" value="12ms" />
        <Stat label="Encryption" value="AES-256" />
        <Stat label="Status" value="Operational" color="#d4af37" />
        <Stat label="Region" value="Global Edge" />
      </div>
    </section>
  );
}

/* =========================================================
   Micro Components — refined interactions & accessibility
   ========================================================= */

function PrimaryButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex w-full items-center justify-center overflow-hidden
        bg-white px-8 py-4 sm:w-auto
        transition-all duration-300
        hover:bg-[#d4af37]
        active:scale-[0.99]"
    >
      {/* animated bracket frame */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-black" />
        <div className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-black" />
        <div className="absolute left-0 bottom-0 h-3 w-3 border-l-2 border-b-2 border-black" />
        <div className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-black" />
      </div>

      <span className="relative z-10 font-mono text-xs font-bold uppercase tracking-[0.22em] text-black">
        {children}
      </span>
    </Link>
  );
}

function SecondaryButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex w-full items-center justify-center gap-3
        border border-white/20 bg-black/35 px-8 py-4 backdrop-blur-sm
        transition-all duration-300
        hover:border-[#d4af37]/70 hover:bg-black/45
        active:scale-[0.99]
        sm:w-auto"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
      <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-white/90 group-hover:text-[#d4af37] transition-colors">
        {children}
      </span>
    </Link>
  );
}

function Stat({
  label,
  value,
  color = "white",
}: {
  label: string;
  value: string;
  color?: string;
}) {
  const dotClass = color === "white" ? "bg-white/40" : "bg-[#d4af37]";
  return (
    <div className="flex items-center gap-3">
      <div className={`h-1 w-1 rounded-full ${dotClass}`} />
      <div className="flex flex-col">
        <span className="font-mono text-[9px] uppercase text-white/40 tracking-[0.22em]">
          {label}
        </span>
        <span
          className="font-mono text-xs text-white tabular-nums"
          style={{ color: color === "white" ? undefined : color }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
