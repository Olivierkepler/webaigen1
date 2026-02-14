"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";

export default function Footer() {
  const [time, setTime] = useState(new Date());
  const footerRef = useRef<HTMLElement>(null);
  
  // 1. Smooth Scroll Physics for the "Portal" Effect
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scale = useTransform(smoothProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [0.5, 1]);
  const blur = useTransform(smoothProgress, [0, 1], [10, 0]);

  // 2. Magnetic Button Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
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
      style={{ scale, opacity, filter: useMotionTemplate`blur(${blur}px)` }}
      className="bg-[#030303] text-white pt-32 pb-12 relative overflow-hidden select-none z-10 perspective-[1000px]"
    >
      {/* --- BACKGROUND LAYERS --- */}
      
      {/* Grid Mesh */}
      <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Noise Texture for "Cinematic" Feel */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} />

      {/* Glow Orb */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#d4af37] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />


      {/* --- CONTENT --- */}
      <div className="max-w-[1800px] mx-auto px-[5%] md:px-[8%] relative z-10">
        
        {/* Top Row: Marquee & Magnetic Button */}
        <div className="flex flex-col md:flex-row justify-between items-start border-b border-white/10 pb-20 mb-20 relative">
          
          {/* Animated Marquee */}
          <div className="absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap opacity-30 pointer-events-none">
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="flex items-center gap-12"
            >
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-[8vw] md:text-[6vw] font-cormorant font-light italic tracking-tighter leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]">
                  Neural Architecture <span className="font-mono not-italic text-sm tracking-widest text-[#d4af37] align-middle mx-4">///</span> System 
                </span>
              ))}
            </motion.div>
          </div>

          {/* Magnetic "UPLINK" Button */}
          <div className="absolute right-0 top-[-40px] md:top-0 z-20">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={scrollToTop}
              style={{ x: xSpring, y: ySpring }}
              className="group cursor-pointer relative"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/10 backdrop-blur-sm bg-white/[0.01] flex items-center justify-center transition-colors duration-500 group-hover:border-[#d4af37]/50 group-hover:bg-[#d4af37]/5">
                <div className="relative overflow-hidden h-4 flex flex-col items-center">
                  <span className="font-mono text-[10px] uppercase tracking-[3px] text-white group-hover:-translate-y-4 transition-transform duration-300">Uplink</span>
                  <span className="absolute top-4 font-mono text-[10px] uppercase tracking-[3px] text-[#d4af37] group-hover:-translate-y-4 transition-transform duration-300">Uplink</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Brand & Input */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <h2 className="font-cormorant text-6xl md:text-8xl text-white font-light tracking-tighter leading-[0.85] mb-8">
                WebAiGen <br/>
                <span className="italic text-white/20">Systems.</span>
              </h2>
              <p className="font-mono text-xs text-white/40 max-w-sm leading-relaxed mb-12">
                Deploying autonomous digital infrastructure for the next generation of the internet.
              </p>
            </div>

            {/* Terminal Input */}
            <div className="relative group max-w-md">
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-[#d4af37] font-mono text-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                {`>`}
              </div>
              <input 
                type="email" 
                placeholder="INITIATE_SEQUENCE // EMAIL" 
                className="w-full bg-transparent border-b border-white/10 py-4 font-mono text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#d4af37] transition-all duration-500 pl-0 group-focus-within:pl-4"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-mono text-[#d4af37] opacity-50 hover:opacity-100 uppercase tracking-widest">
                [Enter]
              </button>
            </div>
          </div>

          {/* Links & Data */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 pt-4">
            
            {/* Column 1 */}
            <div className="space-y-8">
              <h4 className="font-mono text-[10px] text-[#d4af37] uppercase tracking-[3px]">Protocol</h4>
              <ul className="space-y-4">
                {['Intelligence', 'Systems', 'Manifesto', 'Pricing'].map((item) => (
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
              <h4 className="font-mono text-[10px] text-[#d4af37] uppercase tracking-[3px]">Network</h4>
              <ul className="space-y-4">
                {['Twitter / X', 'LinkedIn', 'GitHub', 'Discord'].map((item) => (
                  <li key={item}>
                    <a href="#" className="group block overflow-hidden relative">
                      <span className="block font-sans text-sm text-white/60 uppercase tracking-wide group-hover:-translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.76, 0, 0.24, 1)]">
                        {item}
                      </span>
                      <span className="absolute top-0 left-0 block font-sans text-sm text-[#d4af37] uppercase tracking-wide translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.76, 0, 0.24, 1)]">
                        {item}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Live Telemetry */}
            <div className="col-span-2 md:col-span-1 space-y-8">
              <h4 className="font-mono text-[10px] text-[#d4af37] uppercase tracking-[3px] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Telemetry
              </h4>
              
              <div className="space-y-6">
                <div className="group">
                  <p className="font-mono text-[9px] text-white/30 uppercase mb-1 group-hover:text-[#d4af37] transition-colors">Server // NYC</p>
                  <p className="font-mono text-sm text-white/80 tabular-nums">{formatTime("America/New_York")}</p>
                </div>
                <div className="group">
                  <p className="font-mono text-[9px] text-white/30 uppercase mb-1 group-hover:text-[#d4af37] transition-colors">Node // LDN</p>
                  <p className="font-mono text-sm text-white/80 tabular-nums">{formatTime("Europe/London")}</p>
                </div>
                <div className="group">
                  <p className="font-mono text-[9px] text-white/30 uppercase mb-1 group-hover:text-[#d4af37] transition-colors">Relay // TKY</p>
                  <p className="font-mono text-sm text-white/80 tabular-nums">{formatTime("Asia/Tokyo")}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
          <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
            © 2026 WebAiGen Systems LLC.
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