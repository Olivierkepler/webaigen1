"use client";
import { useState } from "react";

const tiers = [
  {
    name: "Nexus",
    price: "4,900",
    description: "High-velocity frontend architecture. Perfect for Series-A launches.",
    features: [
      "Next.js / React 19",
      "WebGL & Framer Motion", 
      "Sanity Headless CMS", 
      "Technical SEO Audit"
    ],
    cta: "Initialize System"
  },
  {
    name: "Cortex",
    price: "14,500",
    description: "Intelligent web application with custom RAG (AI) integration.",
    features: [
      "Custom Knowledge Base", 
      "Vector Database Setup", 
      "User Auth & Dashboard", 
      "Stripe Payments Logic"
    ],
    cta: "Deploy Neural Net",
    featured: true
  },
  {
    name: "Sovereign",
    price: "32,000",
    description: "Full-scale SaaS MVP. From zero to scalable autonomous product.",
    features: [
      "Multi-Tenant Architecture", 
      "Predictive Agent Swarm", 
      "Mobile App (React Native)", 
      "3-Month Growth Support"
    ],
    cta: "Achieve Singularity"
  }
];

export default function Pricing() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(1);

  return (
    <section className="bg-[#050505] py-40 px-[5%] md:px-[10%] select-none border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-24 space-y-4">
          <p className="font-mono text-[0.6rem] tracking-[6px] uppercase text-[#d4af37]">Capital Allocation</p>
          <h2 className="font-cormorant text-6xl md:text-8xl font-light tracking-tighter text-white">
            Systems <span className="italic text-white/30">& Value.</span>
          </h2>
        </div>

        {/* The Tiers */}
        <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              className={`
                relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border 
                group
                ${hoveredIndex === idx 
                  ? 'flex-[2.5] bg-[#0a0a0a] border-[#d4af37]/40 shadow-[0_20px_80px_rgba(212,175,55,0.05)]' 
                  : 'flex-1 bg-white/[0.02] border-white/5 hover:border-white/10'}
              `}
            >
              {/* Background Scanline Effect (Visible on Hover) */}
              <div className={`absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none transition-opacity duration-500 ${hoveredIndex === idx ? 'opacity-100' : 'opacity-0'}`} />

              {/* Featured Badge */}
              {tier.featured && (
                <div className="absolute top-0 right-0 p-4 z-20">
                  <span className={`font-mono text-[8px] tracking-widest uppercase transition-colors duration-300 ${hoveredIndex === idx ? 'text-[#d4af37] border border-[#d4af37]/30 px-2 py-1 bg-[#d4af37]/10' : 'text-white/20 border border-white/10 px-2 py-1'}`}>
                    Standard Protocol
                  </span>
                </div>
              )}

              <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
                <div>
                  <div className="mb-8">
                    <p className="font-mono text-[10px] text-white/30 mb-2 tracking-[2px]">SYS_0{idx + 1}</p>
                    <h3 className="font-cormorant text-4xl uppercase tracking-widest transition-colors duration-500"
                        style={{ color: hoveredIndex === idx ? '#d4af37' : 'white' }}>
                      {tier.name}
                    </h3>
                  </div>

                  <div className="mb-10 overflow-hidden min-h-[60px]">
                    <p className={`font-sans text-xs md:text-sm text-white/50 leading-relaxed transition-all duration-700 ${hoveredIndex === idx ? 'opacity-100' : 'opacity-60'}`}>
                      {tier.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-5 border-t border-white/5 pt-8">
                    {tier.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-4 group/feature">
                        <div className={`w-1 h-1 bg-[#d4af37] transition-all duration-300 ${hoveredIndex === idx ? 'scale-100 shadow-[0_0_10px_#d4af37]' : 'scale-0'}`} />
                        <p className={`font-mono text-[0.65rem] uppercase tracking-[2px] transition-all duration-500 ${hoveredIndex === idx ? 'opacity-90 text-white' : 'opacity-40 text-white/50'}`}>
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="mt-12">
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="font-mono text-sm text-[#d4af37]">$</span>
                    <span className="font-cormorant text-5xl md:text-6xl tracking-tighter text-white">{tier.price}</span>
                    {hoveredIndex === idx && <span className="font-mono text-[9px] text-white/30 uppercase animate-pulse"> / Fixed</span>}
                  </div>

                  <button className={`w-full py-4 border transition-all cursor-pointer duration-500 uppercase font-mono text-[0.6rem] tracking-[4px] relative overflow-hidden group/btn
                    ${hoveredIndex === idx ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white'}
                  `}>
                    <span className="relative z-10">{tier.cta}</span>
                    {/* Button Glitch Hover */}
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                  </button>
                </div>
              </div>

              {/* Decorative Tech Corners (Only visible on active) */}
              <div className={`absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#d4af37] transition-all duration-500 delay-100 ${hoveredIndex === idx ? 'opacity-100 w-6 h-6' : 'opacity-0 w-2 h-2'}`} />
              <div className={`absolute top-0 left-0 w-8 h-8 border-t border-l border-[#d4af37] transition-all duration-500 delay-100 ${hoveredIndex === idx ? 'opacity-100 w-6 h-6' : 'opacity-0 w-2 h-2'}`} />
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-40 text-[0.55rem] tracking-[3px] uppercase font-mono text-white">
          <p>Third-party API costs (OpenAI/Anthropic) billed separately.</p>
          <p>Availability: Q3 2026 Slots Open</p>
        </div>
      </div>
    </section>
  );
}