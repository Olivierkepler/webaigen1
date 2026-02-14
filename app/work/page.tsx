"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Lock, Eye, Calendar, Tag } from "lucide-react";

// --- TYPES ---
type Project = {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
};

// --- DATA ---
const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Aegis Financial",
    client: "Global Bank",
    year: "2024",
    category: "Fintech Security",
    description: "Deployed a self-learning fraud detection system analyzing 4M+ transactions daily. Reduced false positives by 40% using an ensemble of anomaly detection models.",
    tech: ["Python", "TensorFlow", "React", "AWS"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Nexus Health",
    client: "MedTech Corp",
    year: "2023",
    category: "Diagnostic AI",
    description: "Built a HIPAA-compliant diagnostic assistant for radiologists. Computer vision pipelines identify micro-fractures in X-rays with 99.2% accuracy.",
    tech: ["Computer Vision", "PyTorch", "Next.js", "Edge Computing"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Velociter Auto",
    client: "EV Manufacturer",
    year: "2024",
    category: "Telemetry Dashboard",
    description: "Real-time telemetry visualization for prototype electric vehicles. The interface handles 500hz data streams with zero latency for track-side engineering teams.",
    tech: ["WebGL", "Three.js", "WebSocket", "Go"],
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Echo Estate",
    client: "Luxury Real Estate",
    year: "2023",
    category: "Predictive Market",
    description: "Proprietary valuation algorithm combining satellite imagery and market trends to predict property value spikes in emerging luxury markets.",
    tech: ["Geospatial AI", "Mapbox", "Node.js"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
  }
];

export default function WorkPage() {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);
  const activeProject = PROJECTS.find((p) => p.id === activeId) || PROJECTS[0];

  return (
    <section className="relative pt-24 min-h-screen w-full bg-[#050505] text-white selection:bg-[#d4af37]/30">
      
      {/* BACKGROUND NOISE */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-0 mix-blend-overlay"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        
        {/* --- LEFT COLUMN: THE INDEX (Scrollable) --- */}
        <div className="w-full lg:w-1/2 pt-24 pb-12 px-6 md:px-12 lg:px-16 flex flex-col justify-center">
          
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-2 h-2 bg-[#d4af37] rounded-sm" />
               <span className="font-mono text-xs text-[#d4af37] tracking-[0.2em] uppercase">
                 Classified Case Files
               </span>
            </div>
            <h1 className="text-5xl md:text-7xl  font-cormorant  font-light italic leading-tight tracking-tight text-white mb-6">
              Selected <span className="italic text-white/30">Works.</span>
            </h1>
            <p className="max-w-md text-white/50 text-sm leading-relaxed border-l border-white/10 pl-4">
              A curated archive of high-impact deployments. Each project represents a synthesis of aesthetic precision and algorithmic complexity.
            </p>
          </div>

          {/* Project List */}
          <div className="space-y-0">
            {PROJECTS.map((project) => (
              <ProjectListItem 
                key={project.id} 
                project={project} 
                isActive={activeId === project.id}
                onClick={() => setActiveId(project.id)}
              />
            ))}
          </div>

        </div>

        {/* --- RIGHT COLUMN: THE VIEWPORT (Sticky) --- */}
        <div className="hidden lg:block w-1/2 h-screen sticky top-0 border-l border-white/10 bg-[#080808] overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "circOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Main Image */}
              <img 
                src={activeProject.image} 
                alt={activeProject.title} 
                className="w-full h-full object-cover opacity-60 grayscale-[20%] contrast-[1.1]"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent opacity-50" />

              {/* Data Overlay (Bottom Left) */}
              <div className="absolute bottom-12 left-12 right-12">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-sm"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-3xl text-white font-light mb-1">{activeProject.title}</h2>
                            <span className="text-[#d4af37] font-mono text-xs uppercase tracking-wider">// {activeProject.client}</span>
                        </div>
                        <ArrowUpRight className="text-white/40 w-6 h-6" />
                    </div>
                    
                    <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-lg">
                        {activeProject.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {activeProject.tech.map(t => (
                            <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-white/50">
                                {t}
                            </span>
                        ))}
                    </div>
                </motion.div>
              </div>

              {/* Decorative HUD Elements */}
              <div className="absolute top-8 right-8 font-mono text-[10px] text-white/30 text-right space-y-1">
                 <div>IMG_ID: {activeProject.id}_RAW</div>
                 <div>RES: 4K_ULTRA</div>
                 <div className="text-[#d4af37]">SECURE_CONNECTION</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

// --- SUB-COMPONENT: LIST ITEM ---
function ProjectListItem({ 
  project, 
  isActive, 
  onClick 
}: { 
  project: Project; 
  isActive: boolean; 
  onClick: () => void;
}) {
  return (
    <div 
      onClick={onClick}
      onMouseEnter={onClick}
      className={`group relative py-8 border-t border-white/10 cursor-pointer transition-colors duration-500
        ${isActive ? "bg-white/5" : "hover:bg-white/[0.02]"}`
      }
    >
      <div className="px-4 flex items-center justify-between">
        
        {/* Left: ID & Title */}
        <div className="flex items-center gap-6">
           <span className={`font-mono text-sm transition-colors duration-300 ${isActive ? "text-[#d4af37]" : "text-white/20"}`}>
             0{project.id}
           </span>
           
           <div>
             <h3 className={`text-2xl md:text-3xl font-light transition-all duration-300 ${isActive ? "text-white translate-x-2" : "text-white/40 group-hover:text-white"}`}>
               {project.title}
             </h3>
             <div className="md:hidden mt-2 text-xs text-white/30 font-mono">
               // {project.category}
             </div>
           </div>
        </div>

        {/* Right: Meta Info (Desktop Only) */}
        <div className="hidden md:flex items-center gap-12 text-sm text-white/30 font-mono">
           <div className="w-32 text-right">{project.category}</div>
           <div className={`transition-transform duration-300 ${isActive ? "rotate-45 text-[#d4af37]" : "group-hover:text-white"}`}>
              <ArrowUpRight className="w-5 h-5" />
           </div>
        </div>

      </div>

      {/* Active Indicator Line (Left) */}
      <motion.div 
        className="absolute left-0 top-0 bottom-0 w-1 bg-[#d4af37]"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}