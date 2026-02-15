"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Logo from "../components/logo";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

export default function Footer() {
  const [time, setTime] = useState(new Date());
  const footerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // 1. Smooth Scroll Physics
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scale = useTransform(smoothProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [0.5, 1]);

  // 2. Magnetic Button Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const xSpring = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const ySpring = useSpring(mouseY, { stiffness: 150, damping: 15 });

  // 3. Time Logic
  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (timeZone: string) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone,
    }).format(time);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      ref={footerRef}
      style={{ scale, opacity }}
      className="bg-[#030303] text-white pt-32 pb-12 relative overflow-hidden select-none z-10 perspective-[1000px]"
    >
      {/* --- BACKGROUND LAYERS --- */}

      {/* Grid Mesh */}
      <div
        className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow Orb */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#d4af37] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      {/* --- CONTENT --- */}
      <div className="max-w-[1800px] mx-auto px-[5%] md:px-[8%] relative z-10">
        {/* --- TOP ROW: HOLOGRAPHIC HUD & REACTOR BUTTON --- */}
        <div className="flex flex-col md:flex-row justify-between items-start border-b border-white/5 pb-24 mb-24 relative group/hud select-none">
          {/* PARALLAX DATA STREAM */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            {/* Layer 1 */}
            <motion.div
              animate={reduceMotion ? {} : { x: [0, -2000] }}
              transition={
                reduceMotion ? {} : { repeat: Infinity, duration: 80, ease: "linear" }
              }
              className="absolute inset-0 flex items-center opacity-[0.03] mix-blend-overlay"
            >
              {[...Array(8)].map((_, i) => (
                <span
                  key={i}
                  className="text-[15vw] leading-none font-sans font-black tracking-tighter text-white whitespace-nowrap mr-32"
                >
                  SYSTEM_READY // 0{i}
                </span>
              ))}
            </motion.div>

            {/* Layer 2 */}
            <motion.div
              animate={reduceMotion ? {} : { x: [0, -1500] }}
              transition={
                reduceMotion ? {} : { repeat: Infinity, duration: 50, ease: "linear" }
              }
              className="relative z-10 flex items-center gap-24 pt-6"
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-6">
                  <span className="text-[5vw] md:text-[4vw] font-cormorant font-light italic tracking-tight text-white/90 mix-blend-difference whitespace-nowrap">
                    Neural Architecture
                  </span>
                  <div className="flex items-center gap-3 opacity-50">
                    <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse" />
                    <span className="font-mono text-[10px] text-[#d4af37] tracking-[0.3em] uppercase">
                      SEQ_0{i} // ACTIVATE
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* MAGNETIC REACTOR BUTTON */}
          <div className="absolute right-0 top-[-50px] md:top-[-20px] z-50 mr-[2%] md:mr-0">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={scrollToTop}
              style={{ x: xSpring, y: ySpring }}
              className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center cursor-pointer group/btn"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") scrollToTop();
              }}
              aria-label="Scroll to top"
            >
              {/* Reactor Rings */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 border border-white/10 rounded-full scale-100 group-hover/btn:scale-110 group-hover/btn:border-white/20 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />

                <motion.div
                  className="absolute inset-0 w-full h-full"
                  animate={reduceMotion ? {} : { rotate: 360 }}
                  transition={
                    reduceMotion ? {} : { repeat: Infinity, duration: 20, ease: "linear" }
                  }
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full opacity-30 group-hover/btn:opacity-100 transition-opacity duration-500"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="49"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      strokeDasharray="6 6"
                      fill="none"
                      className="text-white"
                    />
                  </svg>
                </motion.div>

                <motion.div
                  className="absolute inset-[15%] w-[70%] h-[70%]"
                  animate={reduceMotion ? {} : { rotate: -360 }}
                  transition={
                    reduceMotion ? {} : { repeat: Infinity, duration: 15, ease: "linear" }
                  }
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#d4af37]">
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="20 100"
                      fill="none"
                      className="opacity-0 group-hover/btn:opacity-100 transition-all duration-500"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* CORE BUTTON (polished) */}
              <div
                className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center overflow-hidden
                  bg-[#050505] border border-white/10
                  group-hover/btn:border-[#d4af37]/70
                  transition-all duration-500
                  shadow-[0_10px_30px_rgba(0,0,0,0.5)]
                  group-hover/btn:shadow-[0_0_30px_rgba(212,175,55,0.25)]"
              >
                {/* Liquid Fill */}
                <div
                  className="absolute inset-0 bg-[#d4af37]
                    translate-y-full
                    group-hover/btn:translate-y-0
                    transition-transform duration-700
                    ease-[cubic-bezier(0.22,1,0.36,1)]"
                />

                {/* Subtle inner glow */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100
                    transition-opacity duration-500
                    shadow-[inset_0_0_25px_rgba(212,175,55,0.35)]"
                />

                {/* Content */}
                <div className="relative z-20 flex flex-col items-center gap-1 text-white">
                  {/* Arrow */}
                  <div className="h-5 w-5 relative overflow-hidden">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="absolute inset-0 w-full h-full transition-all duration-500
                        group-hover/btn:-translate-y-full group-hover/btn:opacity-40"
                    >
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="absolute inset-0 w-full h-full translate-y-full
                        transition-transform duration-500
                        group-hover/btn:translate-y-0"
                    >
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  </div>

                  {/* Label */}
                  <div className="h-3 relative w-16 overflow-hidden flex justify-center">
                    <span
                      className="absolute top-0 font-mono text-[9px] tracking-[2px] uppercase
                        transition-all duration-500
                        group-hover/btn:-translate-y-full opacity-70"
                    >
                      Uplink
                    </span>

                    <span
                      className="absolute top-0 font-mono text-[9px] tracking-[2px] uppercase
                        translate-y-full transition-all duration-500
                        group-hover/btn:translate-y-0 font-bold"
                    >
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Brand & Input (updated with Logo layout) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-start gap-5 mb-8">
                <div className="mt-2">
                  <Logo />
                </div>

                <div>
                  <h2 className="font-cormorant text-6xl md:text-8xl text-white font-light tracking-tighter leading-[0.85]">
                    WebAiGen <br />
                    {/* <span className="italic text-white/20">Systems.</span> */}
                  </h2>

                  <p className="mt-6 font-mono text-xs text-white/40 max-w-sm leading-relaxed border-l border-[#d4af37]/30 pl-4">
                    Deploying autonomous digital infrastructure for the next generation of the internet.
                  </p>
                </div>
              </div>
            </div>

            {/* Terminal Input (polished) */}
            <div className="relative max-w-md group">
              <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 font-mono text-sm text-[#d4af37] opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                {`>`}
              </div>

              <input
                type="email"
                placeholder="INITIATE_SEQUENCE // EMAIL"
                className="w-full bg-transparent border-b border-white/10 py-4
                  font-mono text-sm text-white placeholder:text-white/20
                  focus:outline-none focus:border-[#d4af37]/80
                  transition-all duration-500
                  pl-0 group-focus-within:pl-5"
              />

              <button
                type="button"
                className="absolute right-0 top-1/2 -translate-y-1/2
                  font-mono text-xs text-[#d4af37] uppercase tracking-widest
                  opacity-50 hover:opacity-100 transition-all
                  hover:translate-x-1"
              >
                [Enter]
              </button>

              <div className="pointer-events-none absolute left-0 -bottom-[1px] h-[1px] w-0 bg-[#d4af37]/60 group-focus-within:w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </div>
          </div>

          {/* Links & Data */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 pt-4">
            {/* Column 1 */}
            <div className="space-y-8">
              <h4 className="font-mono text-[10px] text-[#d4af37] uppercase tracking-[3px]">
                Protocol
              </h4>
              <ul className="space-y-4">
                {["Intelligence", "Systems", "Manifesto", "Pricing"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="group flex items-center gap-2">
                      <span className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-[#d4af37] transition-colors duration-300" />
                      <span className="font-sans text-sm text-white/60 uppercase tracking-wide group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                        {item}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-8">
              <h4 className="font-mono text-[10px] text-[#d4af37] uppercase tracking-[3px]">
                Network
              </h4>
              <ul className="space-y-4">
                {["Twitter / X", "LinkedIn", "GitHub", "Discord"].map((item) => (
                  <li key={item}>
                    <a href="#" className="group block overflow-hidden relative">
                      <span className="block font-sans text-sm text-white/60 uppercase tracking-wide group-hover:-translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]">
                        {item}
                      </span>
                      <span className="absolute top-0 left-0 block font-sans text-sm text-[#d4af37] uppercase tracking-wide translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]">
                        {item}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div className="col-span-2 md:col-span-1 space-y-8">
              <h4 className="font-mono text-[10px] text-[#d4af37] uppercase tracking-[3px] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Telemetry
              </h4>

              {/* <div className="space-y-6">
                <div className="group">
                  <p className="font-mono text-[9px] text-white/30 uppercase mb-1 group-hover:text-[#d4af37] transition-colors">
                    Server // NYC
                  </p>
                  <p className="font-mono text-sm text-white/80 tabular-nums">
                    {formatTime("America/New_York")}
                  </p>
                </div>
                <div className="group">
                  <p className="font-mono text-[9px] text-white/30 uppercase mb-1 group-hover:text-[#d4af37] transition-colors">
                    Node // LDN
                  </p>
                  <p className="font-mono text-sm text-white/80 tabular-nums">
                    {formatTime("Europe/London")}
                  </p>
                </div>
                <div className="group">
                  <p className="font-mono text-[9px] text-white/30 uppercase mb-1 group-hover:text-[#d4af37] transition-colors">
                    Relay // TKY
                  </p>
                  <p className="font-mono text-sm text-white/80 tabular-nums">
                    {formatTime("Asia/Tokyo")}
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
          <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
            © 2026 WebAiGen LLC.
          </p>
          <div className="flex gap-1 items-center font-mono text-[10px] text-[#d4af37] uppercase tracking-widest opacity-80">
            <span className="w-2 h-2 border border-[#d4af37] flex items-center justify-center">
              <span className="w-0.5 h-0.5 bg-[#d4af37]" />
            </span>
            <span>All Systems Operational</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
