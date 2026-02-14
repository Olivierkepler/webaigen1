"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image"; 

const testimonials = [
  {
    id: "01",
    quote: "WebAiGen didn't just build a website; they engineered a sales engine. The autonomous AI agent now handles 60% of our inbound queries flawlessly.",
    author: "Marcus Chen",
    position: "Founder, Apex Nova",
    year: "2024",
    // Using generic unsplash IDs for demo - replace with your real assets
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces"
  },
  {
    id: "02",
    quote: "We moved from a static brochure to a living digital ecosystem. The RAG integration allows our clients to converse with our data in real-time.",
    author: "Sarah Jenkins",
    position: "CTO, OmniStream",
    year: "2025",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces"
  },
  {
    id: "03",
    quote: "A masterclass in technical aesthetics. They fused high-performance Next.js architecture with a design language that feels years ahead of the market.",
    author: "Dr. Aris Thorne",
    position: "Director, Future Labs",
    year: "2024",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces"
  },
  {
    id: "04",
    quote: "Total transformation. Our conversion rate doubled when we deployed the neural interface. This is the difference between a vendor and a visionary partner.",
    author: "Elena Rossi",
    position: "VP Marketing, Saphire",
    year: "2025",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces"
  }
];

export default function WebAiGenTestimonials() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effect for the background
  const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="relative bg-[#050505] py-32 md:py-48 px-[5%] md:px-[10%] overflow-hidden border-t border-white/5">
      
      {/* --- PARALLAX BACKGROUND --- */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      >
        <Image
          // Abstract Data Network Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
          alt="Neural Network Background"
          fill
          sizes="100vw"
          className="object-cover grayscale mix-blend-screen"
          priority 
        />
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]" /> 
      </motion.div>

      {/* Background Watermark */}
      <div className="absolute top-20 right-[-10%] pointer-events-none select-none z-10">
        <span className="font-mono text-[15vw] font-bold text-white/[0.03] leading-none tracking-tighter">
          SYNERGY
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-20"> 
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#d4af37]" />
            <span className="font-mono text-[10px] tracking-[4px] text-[#d4af37] uppercase">
              System Validation
            </span>
          </div>
          <h2 className="font-cormorant text-5xl md:text-7xl text-white mt-4 font-light">
            Client <span className="italic text-white/30">Consensus.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="relative group"
            >
              {/* Tech Header Line */}
              <div className="flex items-center justify-between mb-8 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                 <div className="w-12 h-[1px] bg-[#d4af37]" />
                 <span className="font-mono text-[9px] text-[#d4af37] tracking-widest uppercase">
                    Node_0{item.id}
                 </span>
              </div>
              
              <blockquote className="font-sans text-xl md:text-2xl text-white/80 leading-relaxed mb-10 font-light">
                "{item.quote}"
              </blockquote>

              {/* Author Data Block */}
              <div className="flex items-center gap-5 border-l-2 border-white/5 pl-6 py-1 group-hover:border-[#d4af37]/50 transition-colors duration-500">
                {/* Author Image with Tech Ring */}
                {item.image && (
                  <div className="relative flex-shrink-0 w-[60px] h-[60px]">
                    <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-[#d4af37] transition-colors duration-500 animate-[spin_10s_linear_infinite]" />
                    <Image
                      src={item.image}
                      alt={item.author}
                      fill
                      className="rounded-full object-cover p-1 grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                )}
                
                <div className="flex flex-col justify-center">
                  <span className="font-cormorant text-xl text-white tracking-wide">
                    {item.author}
                  </span>
                  <div className="flex flex-wrap gap-x-4 items-center mt-1">
                     <span className="font-mono text-[9px] text-[#d4af37] tracking-[2px] uppercase">
                      {item.position}
                    </span>
                    <span className="font-mono text-[8px] text-white/20">
                      // Deployed {item.year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 group-hover:border-[#d4af37] transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}