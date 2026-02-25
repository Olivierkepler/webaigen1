"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Sparkles, Box } from "lucide-react";
import LogoLoader from "../../../components/LogoLoader";

export default function CreateAgentPage() {
  const [name, setName] = useState("");
  const [isInitializing, setIsInitializing] = useState(false);
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setIsInitializing(true);
    
    try {
      const response = await fetch("/api/chatbots", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // Aesthetic delay to let the animation "breathe"
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh(); // Forces the dashboard to fetch new SQL data
        }, 2500);
      } else {
        setIsInitializing(false);
        alert("Deployment failed. Check console for details.");
      }
    } catch (error) {
      setIsInitializing(false);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
           style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
      />

      <div className="w-full max-w-md z-10">
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-[#d4af37] transition-colors mb-8"
        >
          <ChevronLeft size={14} /> Back to Terminal
        </Link>

        {isInitializing ? (
          <div className="flex flex-col items-center py-12 animate-in fade-in zoom-in duration-500">
            <LogoLoader size={120} label="Architecting Neural Node..." />
            <p className="mt-8 text-[10px] font-mono uppercase tracking-[0.3em] text-[#d4af37] animate-pulse">
              Syncing with Neon DB
            </p>
          </div>
        ) : (
          <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-sm shadow-2xl animate-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#d4af37]/10 rounded-lg">
                <Box size={20} className="text-[#d4af37]" />
              </div>
              <div>
                <h1 className="text-xl font-light tracking-tight">Initialize Agent</h1>
                <p className="text-[10px] text-white/30 uppercase tracking-widest">Deployment Phase 01</p>
              </div>
            </div>

            <form onSubmit={handleCreate} className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-3">
                  Identification Name
                </label>
                <input 
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Nexus-Core-Alpha"
                  className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-sm focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20 outline-none transition-all placeholder:text-white/10"
                />
              </div>

              <button 
                type="submit"
                disabled={!name}
                className="w-full py-4 bg-[#d4af37] text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-white transition-all disabled:opacity-20 disabled:grayscale group flex items-center justify-center gap-2"
              >
                <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                Begin Architecting
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-[9px] text-white/20 leading-relaxed uppercase tracking-tighter">
                NOTICE: Initialization will allocate a dedicated record in your Neon SQL cluster. Ensure your naming conventions follow security protocols.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}