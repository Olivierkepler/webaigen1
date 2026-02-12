"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image"; // Import Next.js Image component for optimization

const testimonials = [
  {
    id: "01",
    quote: "Monolith doesn't just design spaces; they curate silence and light. Their brutalist approach to our headquarters redefined our corporate identity.",
    author: "Adrian Voss",
    position: "CEO, Arca Global",
    year: "2025",
    image: "/images/woman1.jpg" // Placeholder for author image
  },
  {
    id: "02",
    quote: "The interplay of raw concrete and digital glass creates an atmosphere that feels both ancient and futuristic. Truly the soul of the structure.",
    author: "Elena Rossi",
    position: "Lead Curator, V&A Museum",
    year: "2026",
    image: "/images/woman2.jpg" // Placeholder for author image
  },
  {
    id: "03",
    quote: "Working with Monolith was like witnessing poetry in structure. Their vision for the public library merged classicism with groundbreaking materials.",
    author: "Dr. Kenji Tanaka",
    position: "Urban Planner, Tokyo Metro",
    year: "2024",
    image: "/images/man1.jpg" // Placeholder for author image
  }
];

export default function ArchitectureTestimonials() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Trigger animation as section enters/leaves viewport
  });

  // Parallax effect for the background image
  const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="relative bg-[#050505] py-32 px-[10%] overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 z-0 opacity-10" // Reduced opacity for subtlety
      >
        <Image
          src="https://images.unsplash.com/photo-1542866632-1574d30c5e75?auto=format&fit=crop&w=1920&q=80" // Another architectural image
          alt="Testimonial Background"
          fill
          sizes="100vw"
          className="object-cover grayscale-[80%]"
          priority // Prioritize loading as it's a key visual
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" /> {/* Dark overlay for blending */}
      </motion.div>

      {/* Background Subtle Watermark */}
      <div className="absolute top-10 right-[-5%] pointer-events-none select-none z-10">
        <span className="font-serif text-[20vw] text-white/[0.02] leading-none">
          Archive
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-20"> {/* Ensure content is above background */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <span className="font-mono text-[10px] tracking-[6px] text-[#d4af37] uppercase">
            Testimonials
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-white mt-4 italic">
            Perspective.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="relative group"
            >
              {/* Top Accent Line */}
              <div className="w-12 h-[1px] bg-[#d4af37] mb-8 transition-all duration-700 group-hover:w-full" />
              
              <span className="font-mono text-[10px] text-white/20 mb-6 block tracking-widest">
                PROJECT_REF_{item.id}
              </span>

              <blockquote className="font-serif text-2xl md:text-3xl text-white/90 leading-tight mb-10">
                "{item.quote}"
              </blockquote>

              <div className="flex items-center gap-6 border-l border-white/10 pl-6 py-2">
                {/* Author Image */}
                {item.image && (
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.author}
                      width={60}
                      height={60}
                      className="rounded-full object-cover border-2 border-[#d4af37]/50"
                    />
                  </div>
                )}
                
                <div className="flex flex-col flex-grow">
                  <span className="font-montserrat font-semibold text-[#d4af37] text-sm tracking-[2px] uppercase">
                    {item.author}
                  </span>
                  <div className="flex justify-between items-center mt-1">
                     <span className="font-mono text-[9px] text-white/30 tracking-[3px] uppercase">
                      {item.position}
                    </span>
                    <span className="font-serif italic text-white/20 text-xs">
                      © {item.year}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}