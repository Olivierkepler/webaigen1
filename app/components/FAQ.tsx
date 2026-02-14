"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    id: "01",
    question: "What is an 'Autonomous' website?",
    answer: "The old web is static; it waits for clicks. We build 'Autonomous' sites that react. Using embedded LLMs and vector databases, our interfaces understand user intent, personalize content in real-time, and can even perform tasks (like booking or support) without human oversight."
  },
  {
    id: "02",
    question: "How do you handle Data Privacy?",
    answer: "We practice 'Sovereign AI' architecture. We use local RAG (Retrieval-Augmented Generation) systems or sandboxed enterprise APIs. Your proprietary data is isolated, encrypted, and never used to train public models like ChatGPT."
  },
  {
    id: "03",
    question: "Do you integrate with existing CRMs?",
    answer: "Seamlessly. We build neural bridges between your frontend and tools like Salesforce, HubSpot, or Notion. Your website becomes a bi-directional agent that captures leads and updates your internal databases automatically."
  },
  {
    id: "04",
    question: "What is the typical build timeline?",
    answer: "Speed is a weapon. A standard 'Nexus' build takes 4-6 weeks. Complex 'Sovereign' systems with custom model fine-tuning and multi-agent swarms typically require 8-12 weeks for testing and alignment."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#050505] py-32 md:py-48 px-[5%] md:px-[10%] border-t border-white/5 select-none relative overflow-hidden">
      
      {/* Background Decorator */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 relative z-10">
        
        {/* Left: Sticky Title Section */}
        <div className="md:w-1/3 md:sticky md:top-32 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
            <p className="font-mono text-[10px] text-[#d4af37] tracking-[4px] uppercase">
              System // Query
            </p>
          </div>
          
          <h2 className="font-cormorant text-5xl md:text-6xl font-light tracking-tighter leading-[1.1] text-white mb-8">
            Protocol <br /> <span className="italic text-white/30">Clarifications.</span>
          </h2>
          
          <div className="w-12 h-px bg-gradient-to-r from-[#d4af37] to-transparent opacity-50" />
          
          <p className="mt-8 font-sans text-sm text-white/40 leading-relaxed max-w-xs">
            Understanding the architecture of the future requires new definitions.
          </p>
        </div>

        {/* Right: The Interactive Stack */}
        <div className="md:w-2/3">
          {faqs.map((faq, idx) => (
            <div 
              key={faq.id}
              className="group border-b border-white/5 cursor-pointer transition-all duration-500 hover:border-[#d4af37]/30"
              onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
            >
              <div className="py-8 md:py-10 px-2">
                {/* Question Row */}
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-baseline gap-6 md:gap-8">
                    <span className={`font-mono text-[10px] tracking-widest transition-colors duration-300 ${activeIndex === idx ? 'text-[#d4af37]' : 'text-white/20'}`}>
                      / {faq.id}
                    </span>
                    <h3 className={`font-cormorant text-2xl md:text-3xl transition-all duration-300 ${activeIndex === idx ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                      {faq.question}
                    </h3>
                  </div>
                  
                  {/* Plus/Minus Indicator */}
                  <div className="relative w-3 h-3 mt-3 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className={`absolute inset-0 w-full h-px bg-[#d4af37] transition-transform duration-300 ${activeIndex === idx ? 'rotate-0' : 'rotate-0'}`} />
                    <div className={`absolute inset-0 w-full h-px bg-[#d4af37] transition-transform duration-300 ${activeIndex === idx ? 'rotate-0 opacity-0' : 'rotate-90'}`} />
                  </div>
                </div>

                {/* Answer Row (Animated) */}
                <AnimatePresence>
                  {activeIndex === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="flex gap-8 pl-12 md:pl-20 pt-6 pb-2">
                        {/* Vertical Accent Line */}
                        <div className="hidden md:block w-px bg-gradient-to-b from-[#d4af37] to-transparent h-full min-h-[50px]" />
                        
                        <p className="font-sans text-sm md:text-base text-white/50 leading-relaxed max-w-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}