"use client";
import { useEffect, useState, useRef } from "react";

export default function RefractiveLens() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Smoothly track mouse relative to the section
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative h-[80vh] bg-[#050505] flex items-center justify-center overflow-hidden cursor-none"
    >
      {/* 1. The "Blurred" Base Layer */}
      <div className="absolute inset-0 z-0 opacity-20 blur-sm saturate-0 transition-all duration-700">
        <div className="absolute inset-0 flex items-center justify-center text-[25vw] font-cormorant italic font-light text-white tracking-tighter opacity-10">
          Webaigen
        </div>
        <img 
          src="https://images.unsplash.com/photo-1491841315801-654f4949514e?auto=format&fit=crop&w=1920&q=80" 
          className="w-full h-full object-cover"
          alt="Abstract Architecture"
        />
      </div>

      {/* 2. The Interactive Content */}
      <div className="relative z-10 px-[10%] text-center">
        <h2 className="font-montserrat text-[clamp(1rem,3vw,2rem)] tracking-[15px] uppercase text-white/40 mb-8 transition-all duration-1000">
          Spatial <span className="text-[#d4af37]">Integrity</span>
        </h2>
        <p className="max-w-2xl mx-auto font-cormorant text-2xl md:text-4xl font-light leading-relaxed italic text-white/80">
          "Architecture starts when you carefully put two bricks together. There it begins."
        </p>
      </div>

      {/* 3. THE LENS: The Refractive Follower */}
      <div 
        className={`fixed pointer-events-none z-50 rounded-full border border-white/20 overflow-hidden transition-all duration-500 ease-out ${isHovering ? 'w-64 h-64 opacity-100 scale-100' : 'w-0 h-0 opacity-0 scale-50'}`}
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          backdropFilter: 'blur(20px) saturate(1.5) contrast(1.2) brightness(1.1)',
          boxShadow: '0 0 50px rgba(212, 175, 55, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Inside the lens, we show a "Clear" version of the world */}
        <div 
          className="absolute"
          style={{
            width: '100vw',
            height: '100vh',
            left: -mousePos.x,
            top: -mousePos.y,
            backgroundImage: "url('https://images.unsplash.com/photo-1491841315801-654f4949514e?auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(0) contrast(1.1)'
          }}
        >
          {/* Magnified Text Reveal inside Lens */}
          <div className="absolute inset-0 flex items-center justify-center text-[25vw] font-cormorant italic font-light text-[#d4af37] tracking-tighter opacity-40">
            MONOLITH
          </div>
        </div>
      </div>

      {/* Decorative Technical Crosshair */}
      <div 
        className="absolute pointer-events-none z-[60] text-[#d4af37] transition-opacity duration-300"
        style={{ 
            left: mousePos.x, 
            top: mousePos.y, 
            transform: 'translate(-50%, -50%)',
            opacity: isHovering ? 1 : 0
        }}
      >
        <div className="w-10 h-px bg-current absolute left-1/2 -translate-x-1/2" />
        <div className="h-10 w-px bg-current absolute top-1/2 -translate-y-1/2" />
      </div>
    </section>
  );
}