"use client";
import { useEffect, useRef } from 'react';

interface ProjectProps {
  project: { id: string; type: string; title: string; src: string; span: string };
  onOpen: (src: string) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) entry.target.classList.add('opacity-100', 'translate-y-0');
    }, { threshold: 0.1 });
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className={`relative transition-all duration-[1200ms] opacity-0 translate-y-24 ${project.span === 'tall' ? 'col-span-12 md:col-span-5 md:mt-24' : 'col-span-12 md:col-span-7'}`}>
      <div className="overflow-hidden bg-[#111] group" onClick={() => onOpen(project.src)}>
        <img src={project.src} alt={project.title} className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105 saturate-[0.8]" />
      </div>
      <div className="mt-5 font-montserrat">
        <span className="text-[#d4af37] text-[0.7rem] tracking-[2px] uppercase">{project.id} / {project.type}</span>
        <h3 className="font-cormorant text-2xl md:text-3xl font-light">{project.title}</h3>
      </div>
    </div>
  );
}