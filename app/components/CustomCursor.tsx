"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && followerRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        followerRef.current.style.transform = `translate3d(${e.clientX - 15}px, ${e.clientY - 15}px, 0)`;
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#d4af37] rounded-full pointer-events-none z-[10000] transition-transform duration-100 ease-out hidden md:block" />
      <div ref={followerRef} className="fixed top-0 left-0 w-10 h-10 border border-[#d4af37] rounded-full pointer-events-none z-[9999] transition-transform duration-500 ease-out hidden md:block" />
    </>
  );
}