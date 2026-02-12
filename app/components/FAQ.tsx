"use client";
import { useState } from "react";

const faqs = [
  {
    id: "01",
    question: "What is the ‘Monolith’ philosophy?",
    answer: "Our approach prioritizes mass over ornament. We believe a structure should feel like it was extracted from the earth rather than simply placed upon it."
  },
  {
    id: "02",
    question: "How do you handle global site logistics?",
    answer: "We utilize 1:1 digital twins and local material sourcing to ensure the environmental footprint matches the structural intent, regardless of coordinates."
  },
  {
    id: "03",
    question: "Do you offer interior deconstruction?",
    answer: "Yes. We view the interior as a continuation of the external void. We design custom furniture and lighting to serve the primary volume."
  },
  {
    id: "04",
    question: "What is the typical project timeline?",
    answer: "Quality requires gravity. Concept to completion typically spans 12 to 24 months, depending on the material deconstruction involved."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#050505] py-40 px-[5%] md:px-[10%] border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
        
        {/* Left: Sticky Title Section */}
        <div className="md:w-1/3 md:sticky md:top-40 h-fit">
          <p className="font-mono text-[9px] text-[#d4af37] tracking-[4px] uppercase mb-4">Inquiry / 05</p>
          <h2 className="font-cormorant text-6xl font-light tracking-tighter leading-none mb-8">
            Common <br /> <span className="italic opacity-40">Dialogues.</span>
          </h2>
          <div className="w-12 h-px bg-[#d4af37]/40" />
        </div>

        {/* Right: The Interactive Stack */}
        <div className="md:w-2/3 space-y-px">
          {faqs.map((faq, idx) => (
            <div 
              key={faq.id}
              className="group border-b border-white/5 py-10 cursor-pointer overflow-hidden"
              onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
            >
              <div className="flex items-start justify-between gap-8">
                <div className="flex items-start gap-8">
                  <span className="font-mono text-[10px] text-[#d4af37] opacity-40 mt-2">
                    {faq.id}
                  </span>
                  <h3 className={`font-cormorant text-2xl md:text-3xl transition-all duration-500 ${activeIndex === idx ? 'text-[#d4af37]' : 'text-white'}`}>
                    {faq.question}
                  </h3>
                </div>
                
                {/* Visual indicator: A vertical line that rotates */}
                <div className="relative w-4 h-4 mt-3">
                  <div className="absolute inset-0 w-full h-px bg-white/40" />
                  <div className={`absolute inset-0 w-full h-px bg-white/40 transition-transform duration-500 ${activeIndex === idx ? 'rotate-0' : 'rotate-90'}`} />
                </div>
              </div>

              {/* Revealable Content */}
              <div 
                className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden ${
                  activeIndex === idx ? 'max-h-60 opacity-100 mt-8' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="flex gap-8">
                  {/* Decorative Spacer */}
                  <div className="hidden md:block w-[1px] h-20 bg-gradient-to-b from-[#d4af37] to-transparent ml-[42px]" />
                  <p className="font-montserrat text-sm text-white/50 leading-relaxed max-w-xl">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}