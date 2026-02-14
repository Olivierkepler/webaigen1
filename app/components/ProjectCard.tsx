"use client";
import { useEffect, useRef, useState } from 'react';

interface ProjectProps {
  project: { id: string; type: string; title: string; src: string; span: string };
  onOpen: (src: string) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Determine direction based on the project span
  const isTall = project.span === 'tall';
  const initialTransform = isTall ? 'translate-x-[-100px]' : 'translate-x-[100px]';

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.15 });

    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerOffset = (rect.top + rect.height / 2) - window.innerHeight / 2;
      setOffset(centerOffset * 0.1);
    };

    if (cardRef.current) observer.observe(cardRef.current);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div 
      ref={cardRef} 
      className={`group relative transition-all duration-[1800ms] cubic-bezier(0.23, 1, 0.32, 1) 
      ${isTall ? 'col-span-12 md:col-span-5 md:mt-48' : 'col-span-12 md:col-span-7'}
      ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${initialTransform}`}`}
    >
      {/* 1. Image Container with "Opposition" Parallax */}
      <div 
        className="overflow-hidden bg-[#0a0a0a] cursor-none relative aspect-[4/5] md:aspect-auto h-[500px] md:h-[800px]" 
        onClick={() => onOpen(project.src)}
      >
        {/* Animated Reveal Curtain */}
        <div 
          className={`absolute inset-0 z-20 bg-[#050505] transition-transform duration-[1500ms] cubic-bezier(0.7, 0, 0.3, 1) ${isVisible ? 'scale-x-0' : 'scale-x-100'} ${isTall ? 'origin-left' : 'origin-right'}`}
        />
        
        <img 
          src={project.src} 
          alt={project.title} 
          style={{ 
            transform: `translate3d(0, ${offset}px, 0) scale(${isVisible ? 1.1 : 1.3})`,
          }}
          className="absolute inset-0 w-full h-[140%] -top-[20%] object-cover grayscale transition-all duration-[2500ms] group-hover:grayscale-0 group-hover:scale-105" 
        />
      </div>
      
      {/* 2. Text Metadata with Delayed Counter-Slide */}
      <div className={`mt-10 font-montserrat transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="flex items-center gap-4 mb-3">
          <span className="text-[#d4af37] text-[0.65rem] tracking-[6px] uppercase font-bold">
            {project.id}
          </span>
          <div className="w-12 h-px bg-[#d4af37]/30" />
          <span className="text-white/40 text-[0.6rem] tracking-[3px] uppercase italic">
            {project.type}
          </span>
        </div>
        
        <h3 className="font-cormorant text-4xl md:text-7xl font-light tracking-tight leading-[0.9] group-hover:text-[#d4af37] transition-colors duration-500">
          {project.title.split(' ').map((word, i) => (
             <span key={i} className="inline-block mr-3">{word}</span>
          ))}
        </h3>

        {/* Floating Explore Trigger */}
        <div className="mt-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            <p className="text-[0.5rem] tracking-[4px] uppercase text-white/60">View Webaigen</p>
        </div>
      </div>
    </div>
  );
}