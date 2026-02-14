"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * WebAiGen — Services Console (Polished)
 * - Cleaner filtering logic
 * - Stronger premium visual system (grid + glow + scan)
 * - Better motion discipline (reduced-motion aware)
 * - Accessible buttons + focus states
 * - More consistent typography + spacing
 * - Safer timers (no NodeJS.Timeout typing issues in Next)
 */

// --- TYPES & DATA ---
type Category = "ALL" | "UI/UX" | "INFRA" | "AI" | "SEC";

type Metric = { label: string; value: string };

type Service = {
  id: string;
  category: Exclude<Category, "ALL">;
  title: string;
  subtitle: string;
  description: string;
  metrics: Metric[];
};

const ACCENT = "#d4af37";

const SERVICES: Service[] = [
  {
    id: "01",
    category: "UI/UX",
    title: "Neural Interface",
    subtitle: "Frontend Systems",
    description:
      "Self-optimizing React architectures with cinematic motion and ruthless clarity. Interfaces that feel predictive — not reactive.",
    metrics: [
      { label: "FPS", value: "120+" },
      { label: "LCP", value: "<0.8s" },
    ],
  },
  {
    id: "02",
    category: "INFRA",
    title: "Deep Grid",
    subtitle: "Serverless Mesh",
    description:
      "Edge-first backend systems built for speed, resiliency, and cost control. Distributed compute tuned for real-world traffic.",
    metrics: [
      { label: "Uptime", value: "99.99%" },
      { label: "Regions", value: "Global" },
    ],
  },
  {
    id: "03",
    category: "AI",
    title: "Synthetic Mind",
    subtitle: "LLM Integration",
    description:
      "LLMs wired into your product with retrieval, tools, and guardrails. Turn legacy data into an experience people can talk to.",
    metrics: [
      { label: "Stack", value: "RAG + Tools" },
      { label: "Latency", value: "Low" },
    ],
  },
  {
    id: "04",
    category: "SEC",
    title: "Void Shield",
    subtitle: "Cybersecurity",
    description:
      "Hardening, threat modeling, and zero-trust architecture. Practical security that protects users and keeps teams shipping.",
    metrics: [
      { label: "Posture", value: "Zero-Trust" },
      { label: "Incidents", value: "0" },
    ],
  },
  {
    id: "05",
    category: "AI",
    title: "Vision Core",
    subtitle: "Image Intelligence",
    description:
      "Computer vision pipelines for inspection, monitoring, and creative tooling. Built for speed, accuracy, and clean deployment.",
    metrics: [
      { label: "Accuracy", value: "99.4%" },
      { label: "Latency", value: "12ms" },
    ],
  },
  {
    id: "06",
    category: "INFRA",
    title: "Data Forge",
    subtitle: "Analytics + Vectors",
    description:
      "Realtime analytics with vector search foundations. From raw behavior → insights → personalization, without chaos.",
    metrics: [
      { label: "Scale", value: "Petabyte" },
      { label: "Sync", value: "Realtime" },
    ],
  },
];

// --- UTILS ---
const CATS: Category[] = ["ALL", "UI/UX", "INFRA", "AI", "SEC"];

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

// --- MAIN COMPONENT ---
export default function ServicesConsole() {
  const [activeFilter, setActiveFilter] = useState<Category>("ALL");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const visibleServices = useMemo(() => {
    if (activeFilter === "ALL") return SERVICES;
    return SERVICES.filter((s) => s.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="relative pt-40 min-h-screen w-full bg-[#050505] text-white overflow-hidden py-24 px-4 md:px-12">
      {/* Ambient grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(60% 60% at 50% 35%, black 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(60% 60% at 50% 35%, black 40%, transparent 75%)",
        }}
      />

      {/* Film grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glows */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(212,175,55,0.55), rgba(0,0,0,0) 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-44 right-[-12%] h-[520px] w-[520px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.35), rgba(0,0,0,0) 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-14 md:gap-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-white/10 pb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-2 h-2 rounded-full shadow-[0_0_16px_rgba(212,175,55,0.8)]"
                style={{ backgroundColor: ACCENT }}
              />
              <span className="font-mono text-[11px] text-white/60 tracking-[0.28em]">
                WEBAIGEN / SERVICES_CONSOLE
              </span>
              <span className="hidden sm:inline font-mono text-[11px] text-white/30 tracking-[0.28em]">
                · SYSTEM_READY
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl  font-cormorant  font-light italic leading-tight tracking-tight text-white">
              Protocol <span className="text-white/30">Index</span>
            </h1>

            <p className="mt-5 text-white/60 leading-relaxed">
              High-end web systems, infrastructure, and AI integrations — built
              fast, built clean, built to scale. Select a module to reveal
              telemetry and capabilities.
            </p>
          </div>

          {/* Filter bar */}
          <div className="flex flex-wrap gap-2">
            {CATS.map((cat) => {
              const active = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={cx(
                    "relative px-4 py-2 text-[11px] font-mono tracking-[0.22em] border transition-all duration-300 outline-none",
                    "focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#d4af37]/50",
                    active
                      ? "border-[#d4af37]/70 bg-[#d4af37]/10 text-[#d4af37]"
                      : "border-white/10 text-white/45 hover:border-white/25 hover:text-white"
                  )}
                  aria-pressed={active}
                >
                  <span className="opacity-70">[</span>
                  {cat}
                  <span className="opacity-70">]</span>

                  {/* subtle underline pulse for active */}
                  <span
                    aria-hidden
                    className={cx(
                      "absolute left-2 right-2 -bottom-[1px] h-px opacity-0 transition-opacity duration-300",
                      active && "opacity-100"
                    )}
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(212,175,55,0.9), transparent)",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleServices.map((service) => (
              <ServiceCard
                key={service.id}
                data={service}
                isHovered={hoveredCard === service.id}
                setHovered={setHoveredCard}
                reduceMotion={!!reduceMotion}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer line */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-white/55">
            Want this packaged into a scoped build? We’ll map the fastest path.
          </p>
          <a
            href="/contact"
            className="group relative inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] px-6 py-3 overflow-hidden"
          >
            <span
              className="absolute inset-0 w-0 transition-all duration-[700ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full"
              style={{ backgroundColor: ACCENT }}
            />
            <span className="relative z-10 text-[11px] tracking-[0.34em] uppercase font-mono text-white group-hover:text-black transition-colors duration-500">
              Initiate Contact
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

// --- CARD ---
function ServiceCard({
  data,
  isHovered,
  setHovered,
  reduceMotion,
}: {
  data: Service;
  isHovered: boolean;
  setHovered: (id: string | null) => void;
  reduceMotion: boolean;
}) {
  const categoryTone = useMemo(() => {
    // a tiny “system” flavor without changing the brand palette too much
    switch (data.category) {
      case "AI":
        return "rgba(212,175,55,0.22)";
      case "INFRA":
        return "rgba(59,130,246,0.18)";
      case "SEC":
        return "rgba(16,185,129,0.16)";
      case "UI/UX":
      default:
        return "rgba(212,175,55,0.18)";
    }
  }, [data.category]);

  return (
    <motion.article
      layout
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985, y: 10 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.985, y: 8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(data.id)}
      onMouseLeave={() => setHovered(null)}
      className={cx(
        "group relative h-[370px] w-full overflow-hidden",
        "rounded-2xl border bg-[#0a0a0a]",
        "border-white/10 hover:border-white/20",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]",
        "cursor-crosshair"
      )}
    >
      {/* Ambient highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(900px circle at 20% 0%, ${categoryTone}, rgba(0,0,0,0) 55%)`,
        }}
      />

      {/* Scan line */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 h-[55%]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(212,175,55,0.08), transparent)",
          filter: "blur(0.2px)",
        }}
        animate={
          reduceMotion
            ? { top: "-60%" }
            : { top: isHovered ? "110%" : "-70%" }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 1.65,
                repeat: isHovered ? Infinity : 0,
                ease: "linear",
              }
        }
      />

      {/* Border shimmer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,0.08), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full p-7 sm:p-8 flex flex-col justify-between">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-white/35 tracking-[0.24em]">
                NO.{data.id}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/15" />
              <span className="font-mono text-[11px] text-white/35 tracking-[0.24em]">
                {data.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={cx(
                  "h-1.5 w-1.5 rounded-full transition-all duration-300",
                  isHovered
                    ? "shadow-[0_0_10px_rgba(212,175,55,0.85)]"
                    : "shadow-none"
                )}
                style={{ backgroundColor: isHovered ? ACCENT : "rgba(255,255,255,0.16)" }}
              />
              <span className="font-mono text-[10px] text-white/40 tracking-[0.28em] uppercase">
                {isHovered ? "ACTIVE_SIGNAL" : "STANDBY"}
              </span>
            </div>
          </div>

          {/* Corner glyph */}
          <div className="hidden sm:flex items-center justify-center h-11 w-11 rounded-xl border border-white/10 bg-black/20">
            <span className="text-white/55 font-mono text-xs">{`#${data.id}`}</span>
          </div>
        </div>

        {/* Middle */}
        <div className="space-y-4">
          <GlitchText
            text={data.title}
            isActive={isHovered && !reduceMotion}
            className="text-3xl sm:text-[2.05rem] text-white font-light tracking-tight"
          />

          <p className="font-mono text-[11px] text-[#d4af37] tracking-[0.26em] uppercase">
            // {data.subtitle}
          </p>

          <p className="text-sm text-white/55 leading-relaxed border-l border-white/10 pl-4 transition-colors duration-300 group-hover:border-[#d4af37]/45 group-hover:text-white/75">
            {data.description}
          </p>
        </div>

        {/* Bottom telemetry */}
        <div className="pt-6 border-t border-white/10">
          <div className="grid grid-cols-2 gap-4">
            {data.metrics.map((m) => (
              <div key={m.label} className="relative">
                <div className="font-mono text-[10px] text-white/35 uppercase mb-1 tracking-[0.2em]">
                  {m.label}
                </div>
                <div className="font-mono text-lg text-white transition-colors duration-300 group-hover:text-[#d4af37]">
                  {m.value}
                </div>
                <div
                  aria-hidden
                  className="absolute -bottom-2 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(212,175,55,0.65), transparent)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech corner accents */}
      <div aria-hidden className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/25" />
      <div aria-hidden className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/25" />
      <div aria-hidden className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/25" />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 w-3 h-3 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ borderColor: ACCENT }}
      />

      {/* subtle inner vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.03), inset 0 -90px 120px rgba(0,0,0,0.55)",
        }}
      />
    </motion.article>
  );
}

// --- GLITCH TEXT (decode) ---
const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/";

function GlitchText({
  text,
  isActive,
  className,
}: {
  text: string;
  isActive: boolean;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const iterations = useRef(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayText(text);
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }

    iterations.current = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const t = text;
      setDisplayText(() =>
        t
          .split("")
          .map((_, index) => {
            if (index < iterations.current) return t[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iterations.current >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      iterations.current += 1 / 3; // decode speed
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isActive, text]);

  return <h3 className={className}>{displayText}</h3>;
}
