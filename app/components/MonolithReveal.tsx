"use client";
import { useState, useEffect, useRef } from "react";

const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLSpanElement>(null);

  // 1. AUTOMATIC TYPING: Triggered after the CSS slide-up delay
  useEffect(() => {
    let i = 0;
    let interval: NodeJS.Timeout;

    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i === text.length) {
          clearInterval(interval);
          setIsDone(true);
        }
      }, 70); // Smooth character-by-character speed
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay]);

  // 2. MAGNETIC TRACKING: Activates only after typing completes
  useEffect(() => {
    if (!isDone) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate delta between mouse and text center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) * 0.15; // Damping factor
      const y = (e.clientY - centerY) * 0.15;
      
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDone]);

  return (
    <span ref={containerRef} className="relative inline-block">
      {displayedText}
      {/* The Magnetic Datum Cursor */}
      <span 
        className={`inline-block w-[3px] h-[0.8em] bg-[#d4af37] ml-2 align-middle transition-transform duration-300 ease-out
        ${isDone ? 'shadow-[0_0_15px_#d4af37]' : ''}`}
        style={{
          transform: isDone 
            ? `translate(${mousePos.x}px, ${mousePos.y}px)` 
            : `translate(0, 0)`,
          opacity: isDone ? 0.8 : 1
        }}
      />
    </span>
  );
};

export default function MonolithReveal() { 
  return (
    <div className="relative z-10 select-none">
      <h1 className="font-cormorant text-[clamp(4rem,12vw,10rem)] leading-[0.8] font-light tracking-tighter text-white">
        {/* Row 1: Immediate slide-up */}
        <div className="block overflow-hidden">
          <span className="block animate-[slide-up_1.2s_cubic-bezier(0.23,1,0.32,1)_forwards] translate-y-full">
            The Soul
          </span>
        </div>

        {/* Row 2: Slide-up with 0.3s delay, then typing starts at 1.2s */}
        <div className="block overflow-hidden mt-4">
          <span className="block italic font-light animate-[slide-up_1.2s_cubic-bezier(0.23,1,0.32,1)_0.3s_forwards] translate-y-full">
            of the{" "}
            <span className="not-italic stroke-text text-transparent">
              <TypingText text="Structure." delay={1200} />
            </span>
          </span>
        </div>
      </h1>

      <style jsx global>{`
        @keyframes slide-up {
          from { transform: translateY(105%); }
          to { transform: translateY(0); }
        }
        .stroke-text {
          -webkit-text-stroke: 1px rgb(255, 255, 255);
          text-shadow: 0 0 30px rgba(212, 175, 55, 0.1);
        }
      `}</style>
    </div>
  );
}