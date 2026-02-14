"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Link from "next/link";

// --- TYPES ---
interface Project {
  id: number;
  client: string;
  category: string;
  desc: string;
  stack: string[];
  year: string;
  src: string;
}

// --- DATA: "Tech Edge" Aesthetics ---
const projects: Project[] = [
  { 
    id: 1, 
    client: "Nova Protocol", 
    category: "Fintech Dashboard", 
    desc: "Real-time institutional crypto trading terminal with AI prediction.",
    stack: ["React", "D3.js", "WebSockets"],
    year: "2024", 
    // Image: Macro Chip / Processor (Sharp, Gold, Dark)
    src: "https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=2500&auto=format&fit=crop" 
  },
  { 
    id: 2, 
    client: "Nexus AI", 
    category: "LLM Infrastructure", 
    desc: "Neural network visualization for enterprise model training.",
    stack: ["Python", "WebGL", "Next.js"],
    year: "2025", 
    // Image: Abstract Block/Node Network (Dark with Gold lighting)
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2600&auto=format&fit=crop" },
  { 
    id: 3, 
    client: "Vantage Health", 
    category: "MedTech SaaS", 
    desc: "Patient diagnostics platform with predictive analytics.",
    stack: ["TypeScript", "Supabase", "AWS"],
    year: "2023", 
    // Image: Abstract Lidar / Laser Scan (Red/Dark/Structured)
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2500&auto=format&fit=crop" 
  },
  { 
    id: 4, 
    client: "Aura Commerce", 
    category: "Headless Storefront", 
    desc: "3D product configurator for luxury retail brands.",
    stack: ["Shopify", "Three.js", "Vercel"],
    year: "2024", 
    // Image: Dark Geometric / Architectural (Sharp Edges, Minimal)
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2500&auto=format&fit=crop" 
  },
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, 
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 1.2, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
};

export default function SelectedWorks() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={containerRef}
      id="selected-works"
      className="relative z-10 bg-[#050505] px-[5%] py-32 md:py-10 overflow-hidden text-white"
    >
      {/* Background Texture - Keeping it subtle */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

      {/* --- HEADER --- */}
      <div className="relative mb-32 flex flex-col md:flex-row md:items-end md:justify-between gap-10 border-b border-white/10 pb-12">
        <motion.h2 
          style={{ y: yTitle }}
          // className="font-cormorant text-[clamp(3.5rem,8vw,7rem)] font-light tracking-tighter leading-[0.9]"
          className="font-cormorant text-[clamp(2.25rem,7vw,5rem)] leading-[0.9] font-light tracking-tight text-white drop-shadow-2xl"

        >
          <span className="block overflow-hidden">
            <motion.span 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              Selected
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="block italic text-[#d4af37]"
            >
              Deployments.
            </motion.span>
          </span>
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-xs flex flex-col gap-4"
        >
          <p className="font-montserrat text-[0.65rem] uppercase tracking-[3px] text-white/50 leading-relaxed">
            Engineering digital dominance. <br/>
            From <span className="text-[#d4af37]">Concept</span> to <span className="text-white">Scale</span>.
          </p>
          <div className="h-px w-full bg-gradient-to-r from-[#d4af37]/50 to-transparent" />
        </motion.div>
      </div>

      {/* --- GRID --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }} 
        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24 w-full"
      >
        {projects.map((project, i) => (
          <ParallaxCard key={project.id} project={project} index={i} />
        ))}
      </motion.div>
    </section>
  );
}

function ParallaxCard({ project, index }: { project: Project, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  // Parallax: Odd items float differently
  const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? 40 : -40]); 

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      style={{ y }} 
      className={`group relative flex flex-col ${index % 2 === 1 ? "md:mt-32" : ""}`}
    >
      <Link href={`/work/${project.id}`} className="block w-full cursor-none">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/5 border border-white/10 transition-colors duration-500 hover:border-[#d4af37]/50">
          
          {/* 1. Curtain Reveal (Black Wipe) */}
          <motion.div
            initial={{ height: "100%" }}
            whileInView={{ height: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            className="absolute inset-0 z-20 bg-[#050505]"
          />

          {/* 2. Image: Tech Edges (High Contrast) */}
          <motion.img
            src={project.src}
            alt={project.client}
            className="h-full w-full object-cover opacity-80 transition-all duration-[1.5s] cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-105 group-hover:opacity-100 group-hover:contrast-125"
          />

          {/* 3. Tech Stack Tags (Gold Border on Hover) */}
          <div className="absolute bottom-5 left-5 z-30 flex flex-wrap gap-2 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
             {project.stack.map((tech) => (
                <span key={tech} className="px-2 py-1 text-[0.55rem] uppercase tracking-wider font-mono bg-[#050505]/80 backdrop-blur-md border border-[#d4af37]/30 text-[#d4af37] rounded-sm">
                    {tech}
                </span>
             ))}
          </div>

          {/* 4. Center 'View' Button (Gold) */}
           <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 scale-75">
             <div className="h-24 w-24 rounded-full border border-[#d4af37]/60 bg-[#d4af37]/10 backdrop-blur-sm flex items-center justify-center">
                <span className="font-montserrat text-[0.6rem] uppercase tracking-[2px] text-[#d4af37] font-bold">View</span>
             </div>
          </div>
        </div>
      </Link>

      {/* Project Details */}
      <div className="mt-8 flex flex-col border-t border-white/10 pt-6 transition-colors duration-500 group-hover:border-[#d4af37]/30">
        <div className="flex justify-between items-start">
            <h3 className="font-cormorant text-3xl sm:text-4xl text-white font-medium group-hover:text-[#d4af37] transition-colors duration-500">
              {project.client}
            </h3>
            <span className="font-mono text-[0.6rem] text-white/40 border border-white/10 px-2 py-1 rounded-full group-hover:border-[#d4af37]/30 group-hover:text-[#d4af37]">
                {project.year}
            </span>
        </div>
        
        <div className="mt-3 flex flex-col gap-1">
            <p className="font-montserrat text-[0.65rem] uppercase tracking-[2px] text-white/60">
              {project.category}
            </p>
            <p className="font-sans text-sm text-white/40 leading-relaxed max-w-sm mt-2">
                {project.desc}
            </p>
        </div>
      </div>
    </motion.div>
  );
}