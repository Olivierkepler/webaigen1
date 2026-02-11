"use client";
import { useState, useEffect } from "react";

interface TicketModalProps {
  exhibit: { title: string; venue: string; date: string };
  onClose: () => void;
}

export default function TicketModal({ exhibit, onClose }: TicketModalProps) {
  const [step, setStep] = useState(1);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[12000] flex items-center justify-center p-6 backdrop-blur-xl bg-black/40 animate-in fade-in duration-500">
      <div 
        className="bg-[#0a0a0a] border border-white/10 w-full max-w-lg p-10 md:p-16 relative overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Architectural Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-3xl -mr-16 -mt-16" />
        
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-white/40 hover:text-[#d4af37] transition-colors uppercase text-[0.6rem] tracking-[2px]"
        >
          Close [esc]
        </button>

        {step === 1 ? (
          <div className="animate-in slide-in-from-bottom-4 duration-700">
            <span className="text-[#d4af37] text-[0.6rem] tracking-[4px] uppercase font-montserrat">Requesting Entry</span>
            <h2 className="font-cormorant text-4xl italic font-light mt-4 mb-2">{exhibit.title}</h2>
            <p className="text-[0.6rem] opacity-50 uppercase tracking-[2px] mb-10">{exhibit.venue} — {exhibit.date}</p>

            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div className="space-y-1">
                <label className="text-[0.5rem] tracking-[3px] uppercase opacity-40">Identify as</label>
                <input required type="text" placeholder="GUEST NAME" className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-[#d4af37] transition-colors font-montserrat text-sm uppercase tracking-widest" />
              </div>
              <div className="space-y-1">
                <label className="text-[0.5rem] tracking-[3px] uppercase opacity-40">Digital Node</label>
                <input required type="email" placeholder="EMAIL ADDRESS" className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-[#d4af37] transition-colors font-montserrat text-sm uppercase tracking-widest" />
              </div>
              <button className="w-full py-4 bg-[#d4af37] text-black text-[0.7rem] tracking-[5px] uppercase font-bold hover:bg-white transition-all duration-500 mt-6">
                Submit Request
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-10 animate-in zoom-in-95 duration-1000">
            <div className="w-12 h-px bg-[#d4af37] mx-auto mb-8" />
            <h2 className="font-cormorant text-4xl italic font-light mb-4 text-[#d4af37]">Waitlisted.</h2>
            <p className="font-montserrat text-[0.7rem] leading-loose opacity-60 uppercase tracking-[2px]">
              Your credentials have been indexed. <br />
              An invitation will manifest shortly.
            </p>
            <button onClick={onClose} className="mt-12 text-[0.6rem] tracking-[4px] opacity-40 hover:opacity-100 transition-opacity uppercase">Return to Archive</button>
          </div>
        )}
      </div>
    </div>
  );
}