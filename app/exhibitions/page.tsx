"use client";
import { useState, useEffect, useRef } from "react";


import TicketModal from "../components/TicketModal";

const exhibitions = [
  {
    status: "Upcoming",
    title: "Shadow & Void",
    date: "MAR 2026",
    city: "Tokyo",
    venue: "National Art Center",
    description: "An immersive exploration of brutalist shadows through 1:1 scale light installations.",
    img: "https://images.unsplash.com/photo-1490761668535-35497054764d?auto=format&fit=crop&w=1200&q=80"  },
  {
    status: "Current",
    title: "The Silent Monolith",
    date: "JAN 2026",
    city: "London",
    venue: "Tate Modern",
    description: "Documenting the decaying concrete structures of the post-soviet era.",
    img: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    status: "Archive",
    title: "Glass Ethics",
    date: "OCT 2025",
    city: "New York",
    venue: "MoMA",
    description: "The evolution of transparency in 21st-century corporate architecture.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
  }
];

export default function ExhibitionsPage() {
  const [activeExhibit, setActiveExhibit] = useState<any>(null);

  return (
    <main className="bg-[#050505] min-h-screen overflow-x-hidden">
      {/* Cinematic Typographic Hero */}
      <header className="relative h-[80vh] w-full flex items-center px-[10%]">
        <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-px h-0 bg-[#d4af37] animate-[grow-v_2s_ease-in-out_forwards]" />
        
        <div className="relative z-10 flex flex-col items-start">
          <div className="overflow-hidden">
             <span className="block text-[#d4af37] text-[0.7rem] tracking-[8px] uppercase font-montserrat animate-[slide-up_1s_ease-out_forwards]">
               Global Circuit
             </span>
          </div>
          <div className="overflow-hidden mt-4">
            <div className="flex items-start gap-10">
              {/* (spacer) */}
              <span className="block w-7 md:w-10" />
              <h1 className="font-cormorant text-[clamp(4.5rem,14vw,11rem)] md:text-7xl italic font-light tracking-tighter leading-none animate-[slide-up_1.5s_cubic-bezier(0.23,1,0.32,1)_forwards]">
                Installations.
              </h1>
            </div>
          </div>
          <div className="w-0 h-px bg-white/20 mt-12  animate-[grow-h_1.5s_ease-in-out_0.5s_forwards]" />
        </div>
      </header>

      <section className="px-[10%] pb-32">
        <div className="space-y-64">
          {exhibitions.map((exhibit, i) => (
            <ExhibitionRow 
              key={i} 
              exhibit={exhibit} 
              onOpen={() => setActiveExhibit(exhibit)} 
            />
          ))}
        </div>
      </section>

      {activeExhibit && (
        <TicketModal exhibit={activeExhibit} onClose={() => setActiveExhibit(null)} />
      )}
      
    </main>
  );
}

function ExhibitionRow({ exhibit, onOpen }: { exhibit: any; onOpen: () => void }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });
    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={rowRef}
      className={`grid grid-cols-1 md:grid-cols-12 gap-10 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Left: Metadata with Staggered Fade */}
      <div className="md:col-span-3 border-l border-[#d4af37]/30 pl-6 h-fit overflow-hidden">
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <span className={`text-[0.6rem] tracking-[3px] uppercase font-semibold ${exhibit.status === 'Upcoming' ? 'text-[#d4af37]' : 'text-white/40'}`}>
            {exhibit.status}
          </span>
          <p className="font-cormorant text-5xl mt-2">{exhibit.date}</p>
          <p className="font-montserrat text-[0.7rem] uppercase tracking-[2px] mt-1 opacity-60">{exhibit.city}</p>
        </div>
      </div>

      {/* Right: Reveal Image Mask */}
      <div className="md:col-span-9">
        <div 
          className="relative group cursor-none mb-12"
          onClick={onOpen}
        >
          <div className={`absolute inset-0 bg-[#050505] z-10 transition-all duration-[1.5s] cubic-bezier(0.23,1,0.32,1) ${isVisible ? 'translate-x-full' : 'translate-x-0'}`} />
          <div className="overflow-hidden aspect-[21/9]">
            <img 
              src={exhibit.img} 
              alt={exhibit.title} 
              className={`w-full h-full object-cover grayscale transition-all duration-[2s] ${isVisible ? 'scale-100 opacity-60' : 'scale-125 opacity-0'}`}
            />
          </div>
        </div>
        
        <div className={`max-w-xl transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light mb-6 leading-none">{exhibit.title}</h2>
          <p className="font-montserrat text-[0.6rem] tracking-[3px] uppercase text-[#d4af37] mb-6">{exhibit.venue}</p>
          <p className="font-montserrat text-sm text-white/40 leading-relaxed mb-10">{exhibit.description}</p>
          <button className="group relative text-[0.6rem] tracking-[5px] uppercase py-2">
            <span className="relative z-10 transition-colors group-hover:text-black">Request Entry</span>
            <div className="absolute bottom-0 left-0 w-full h-px bg-[#d4af37] group-hover:h-full transition-all duration-300 -z-0" />
          </button>
        </div>
      </div>

    
    </div>
  );
}