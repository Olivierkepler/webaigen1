"use client";
import { useState } from "react";

const tiers = [
  {
    name: "Draft",
    price: "4,500",
    description: "For conceptual explorations and structural ideation.",
    features: ["Initial Concept Sketches", "3D Massing Study", "Material Board", "2 Revision Cycles"],
    cta: "Start Exploration"
  },
  {
    name: "Monolith",
    price: "12,000",
    description: "Full architectural blueprinting for luxury residential projects.",
    features: ["Full Technical Drawings", "VR Spatial Walkthrough", "Lighting Analysis", "Contractor Liaison"],
    cta: "Acquire Blueprint",
    featured: true
  },
  {
    name: "Estate",
    price: "45,000",
    description: "Comprehensive design-build oversight for commercial icons.",
    features: ["Global Site Analysis", "Bespoke Material Sourcing", "On-site Directorship", "Unlimted Revisions"],
    cta: "Commence Project"
  }
];

export default function Pricing() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(1);

  return (
    <section className="bg-[#050505] py-40 px-[5%] md:px-[10%]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-24 space-y-4">
          <p className="font-montserrat text-[0.6rem] tracking-[6px] uppercase text-[#d4af37]">Investment</p>
          <h2 className="font-cormorant text-6xl md:text-8xl font-light tracking-tighter">
            Pricing <span className="italic opacity-40">& Value.</span>
          </h2>
        </div>

        {/* The Tiers */}
        <div className="flex flex-col md:flex-row gap-4 min-h-[600px]">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              className={`relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border border-white/5 
                ${hoveredIndex === idx ? 'flex-[2.5] bg-[#0a0a0a]' : 'flex-1 bg-transparent'}
              `}
            >
              {/* Background Glow for Featured */}
              {tier.featured && (
                <div className="absolute top-0 right-0 p-4">
                  <span className="font-mono text-[8px] tracking-widest text-[#d4af37] border border-[#d4af37]/30 px-2 py-1 uppercase">
                    Most Selected
                  </span>
                </div>
              )}

              <div className="p-12 h-full flex flex-col justify-between">
                <div>
                  <div className="mb-10">
                    <p className="font-mono text-[10px] text-white/30 mb-2">Tier 0{idx + 1}</p>
                    <h3 className="font-cormorant text-4xl uppercase tracking-widest transition-colors duration-500"
                        style={{ color: hoveredIndex === idx ? '#d4af37' : 'white' }}>
                      {tier.name}
                    </h3>
                  </div>

                  <div className="mb-12 overflow-hidden">
                    <p className={`font-montserrat text-sm text-white/50 leading-relaxed transition-all duration-700 ${hoveredIndex === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                      {tier.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {tier.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-4 group">
                        <div className="w-1 h-1 bg-[#d4af37] scale-0 group-hover:scale-100 transition-transform" />
                        <p className={`font-montserrat text-[0.7rem] uppercase tracking-[2px] transition-opacity duration-500 ${hoveredIndex === idx ? 'opacity-100' : 'opacity-20'}`}>
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12">
                  <div className="mb-8">
                    <span className="font-mono text-sm text-[#d4af37]">$</span>
                    <span className="font-cormorant text-6xl tracking-tighter">{tier.price}</span>
                    <span className="font-mono text-[10px] text-white/20 uppercase ml-2">USD / Fixed</span>
                  </div>

                  <button className={`w-full py-4 border transition-all cursor-pointer duration-500 uppercase font-montserrat text-[0.6rem] tracking-[4px]
                    ${hoveredIndex === idx ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'bg-transparent text-white border-white/10'}
                  `}>
                    {tier.cta}
                  </button>
                </div>
              </div>

              {/* Decorative Corner Accents (Inside the Slab) */}
              <div className={`absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#d4af37]/20 transition-opacity duration-700 ${hoveredIndex === idx ? 'opacity-100' : 'opacity-0'}`} />
            </div>
          ))}
        </div>

        {/* Support Note */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-30 text-[0.5rem] tracking-[4px] uppercase font-mono">
          <p>Prices subject to site complexity analysis.</p>
          <p>Global availability: Tokyo / London / NYC</p>
        </div>
      </div>
    </section>
  );
}