"use client";

import { useMemo, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  ClipboardList,
  Ruler, // Used for Scale
  Layers,
  Sparkles,
  Brain,
  Globe,
  Layout,
  ShoppingCart,
  Database,
  MessageSquare,
  Cpu,
} from "lucide-react";
import { generateEstimatePDF } from "../../utils/generatePDF";
import { motion, AnimatePresence } from "framer-motion";

/* ----------------------------------------------------
   1. Domain Specific Types & Data
---------------------------------------------------- */
type ServiceType = "landing" | "website" | "ecommerce" | "ai_platform";
type AILevel = "integration" | "fine_tune" | "autonomous";

type EstimatorPanelProps = {
  open: boolean;
  onClose: () => void;
  onSendToChat: (markdown: string) => void;
};

// Labels
const serviceLabels: Record<ServiceType, string> = {
  landing: "Landing Page",
  website: "Corporate Site",
  ecommerce: "E-Commerce",
  ai_platform: "AI SaaS Platform",
};

const aiLabels: Record<AILevel, string> = {
  integration: "L1: API Wrapper",
  fine_tune: "L2: RAG + Fine-Tune",
  autonomous: "L3: Agentic System",
};

// Pricing Constants
const baseMinCost: Record<ServiceType, number> = {
  landing: 800,
  website: 2500,
  ecommerce: 4000,
  ai_platform: 8000,
};

const costPerUnit: Record<ServiceType, number> = {
  landing: 250, // per section
  website: 400, // per page
  ecommerce: 600, // per product category
  ai_platform: 1200, // per feature module
};

const aiMultipliers: Record<AILevel, number> = {
  integration: 1.1,
  fine_tune: 1.8,
  autonomous: 3.5,
};

const STEPS = [
  { id: 1, label: "Architecture", description: "Select the core system type." },
  { id: 2, label: "Scale", description: "Define scope (Pages/Modules)." },
  { id: 3, label: "Intelligence", description: "Select AI Model sophistication." },
  { id: 4, label: "Modules", description: "Add neural capabilities." },
  { id: 5, label: "Protocol", description: "Review and initialize." },
];

export default function EstimatorPanel({
  open,
  onClose,
  onSendToChat,
}: EstimatorPanelProps) {
  // State
  const [step, setStep] = useState<number>(1);
  const [service, setService] = useState<ServiceType | null>(null);
  const [unitInput, setUnitInput] = useState<string>("");
  const [aiLevel, setAiLevel] = useState<AILevel>("integration");
  const [extras, setExtras] = useState({
    vector_db: false,
    voice_synth: false,
    predictive: false,
  });

  // ------------------------------------------------------------------
  // Logic Engine
  // ------------------------------------------------------------------
  const parsedUnits = useMemo(() => {
    const n = Number(unitInput);
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [unitInput]);

  const estimate = useMemo(() => {
    if (!service || !parsedUnits) return null;

    const base = baseMinCost[service];
    const perUnit = costPerUnit[service];
    const multiplier = aiMultipliers[aiLevel];

    // Core Calculation: (Base + (Scale * UnitCost)) * AI Multiplier
    let total = (base + (perUnit * parsedUnits)) * multiplier;
    
    const breakdown: string[] = [];
    breakdown.push(`Core Architecture & Logic: $${total.toFixed(0)}`);

    // Extras Calculation
    if (extras.vector_db) {
      total += 2500;
      breakdown.push("Vector Database Setup: $2,500");
    }
    if (extras.voice_synth) {
      total += 1800;
      breakdown.push("Voice Synthesis Module: $1,800");
    }
    if (extras.predictive) {
      total += 5000;
      breakdown.push("Predictive ML Engine: $5,000");
    }

    return {
      total,
      low: total * 0.9,
      high: total * 1.2,
      breakdown,
    };
  }, [service, parsedUnits, aiLevel, extras]);

  // Navigation Guards
  const canNext = () => {
    if (step === 1) return !!service;
    if (step === 2) return !!parsedUnits;
    if (step === 3) return !!aiLevel;
    return true;
  };

  const next = () => { if (canNext()) setStep((prev) => Math.min(prev + 1, 5)); };
  const back = () => { setStep((prev) => Math.max(prev - 1, 1)); };
  
  const reset = () => {
    setStep(1);
    setService(null);
    setUnitInput("");
    setAiLevel("integration");
    setExtras({ vector_db: false, voice_synth: false, predictive: false });
  };

  // ------------------------------------------------------------------
  // Handlers
  // ------------------------------------------------------------------
  const handleSendToChat = () => {
    if (!service || !parsedUnits || !estimate) return;

    const selectedExtras = Object.entries(extras)
      .filter(([, v]) => v)
      .map(([k]) => k.replace("_", " ").toUpperCase());

    const markdown = [
      `### 🧬 SYSTEM ESTIMATE: ${serviceLabels[service]}`,
      "",
      `- **Architecture:** ${serviceLabels[service]}`,
      `- **Scale:** ${parsedUnits} Units`,
      `- **Model:** ${aiLabels[aiLevel]}`,
      selectedExtras.length ? `- **Modules:** ${selectedExtras.join(", ")}` : `- **Modules:** Standard`,
      "",
      `**Projected Investment:** $${estimate.low.toFixed(0)} – $${estimate.high.toFixed(0)}`,
      "",
      "> *Note: algorithmic estimate. Final compute costs vary based on API usage.*",
    ].join("\n");

    onSendToChat(markdown);
    onClose();
    reset();
  };

  const handleDownloadPDF = () => {
    if (!service || !parsedUnits || !estimate) return;

    generateEstimatePDF({
      service: serviceLabels[service],
      units: parsedUnits,
      aiModel: aiLabels[aiLevel],
      devCost: estimate.total * 0.6,
      computeCost: estimate.total * 0.4,
      total: estimate.total,
    });
  };

  // Helper for icons
  const getServiceIcon = (s: ServiceType) => {
    switch (s) {
      case "landing": return Layout;
      case "website": return Globe;
      case "ecommerce": return ShoppingCart;
      case "ai_platform": return Brain;
    }
  };

  const currentStepMeta = STEPS.find((s) => s.id === step);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          key="estimatorPanel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full"
        >
          {/* Main Container - Glassmorphism Cyberpunk Style */}
          <div className="h-full flex flex-col rounded-2xl border border-[#d4af37]/20 shadow-[0_0_50px_-12px_rgba(0,0,0,0.9)] bg-[#080808]/95 backdrop-blur-xl text-slate-50 overflow-hidden">
            
            {/* 1. Header */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[#d4af37]/20 bg-gradient-to-r from-[#d4af37]/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30">
                  <ClipboardList className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-bold">
                      System Architect
                    </span>
                    <span className="inline-flex items-center rounded-sm px-1.5 py-0.5 text-[9px] font-mono bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30">
                      V 2.0
                    </span>
                  </div>
                  <div className="text-sm font-bold flex items-center gap-2 text-white">
                    <span>{step}. {currentStepMeta?.label}</span>
                    {service && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded border border-white/20 bg-white/5 text-white/70 uppercase">
                        {serviceLabels[service].split(' ')[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="group p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-white/50 group-hover:text-white" />
              </button>
            </div>

            {/* 2. Progress Indicator */}
            <div className="px-4 pt-4 pb-2">
              <div className="flex items-center justify-between relative">
                {/* Background Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-0" />
                
                {STEPS.map((s) => {
                  const isCompleted = s.id < step;
                  const isActive = s.id === step;
                  return (
                    <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
                      <div
                        className={`
                          flex items-center justify-center h-5 w-5 rounded-full text-[9px] font-bold transition-all duration-300
                          ${isCompleted ? "bg-[#d4af37] text-black scale-100" 
                            : isActive ? "bg-[#d4af37] text-black scale-125 shadow-[0_0_10px_#d4af37]" 
                            : "bg-[#1a1a1a] border border-white/20 text-white/30"}
                        `}
                      >
                        {isCompleted ? <Check className="w-3 h-3" /> : s.id}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Main Content Area */}
            <div className="flex-1 px-4 py-2 space-y-4 overflow-y-auto custom-scroll relative">
               {/* Background Grid Pattern */}
               <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                    style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 relative z-10"
                >
                  {/* STEP 1: SERVICE */}
                  {step === 1 && (
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {(Object.keys(serviceLabels) as ServiceType[]).map((s) => {
                        const Icon = getServiceIcon(s);
                        const isActive = service === s;
                        return (
                          <button
                            key={s}
                            onClick={() => setService(s)}
                            className={`
                              group relative overflow-hidden flex items-center gap-4 p-3 rounded-lg border text-left transition-all duration-200
                              ${isActive 
                                ? "bg-[#d4af37]/10 border-[#d4af37] text-white" 
                                : "bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:border-white/20"}
                            `}
                          >
                            <div className={`p-2 rounded-md ${isActive ? 'bg-[#d4af37] text-black' : 'bg-black/50 text-white/50'}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-sm font-bold uppercase tracking-wide">{serviceLabels[s]}</div>
                              <div className="text-[10px] text-white/40">Base Protocol: ${baseMinCost[s]}</div>
                            </div>
                            {isActive && <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#d4af37] shadow-[0_0_10px_#d4af37]" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* STEP 2: SCALE */}
                  {step === 2 && (
                    <div className="space-y-6 mt-4">
                      <div className="bg-black/40 border border-[#d4af37]/30 p-6 rounded-xl text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#d4af37]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <label className="text-xs uppercase tracking-widest text-[#d4af37] mb-2 block">
                           Define System Scale
                        </label>
                        
                        <div className="flex items-center justify-center gap-2">
                            <input
                            type="number"
                            min={1}
                            autoFocus
                            value={unitInput}
                            onChange={(e) => setUnitInput(e.target.value)}
                            className="bg-transparent text-5xl font-mono text-white outline-none w-24 text-center placeholder:text-white/10"
                            placeholder="0"
                            />
                        </div>
                        <div className="text-[10px] text-white/40 mt-2 font-mono">UNITS / PAGES / MODULES</div>
                      </div>

                      <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs text-white/60">
                        <span className="text-[#d4af37] font-bold">NOTE:</span> "Units" refers to unique page layouts for websites, or functional feature modules for AI platforms.
                      </div>
                    </div>
                  )}

                  {/* STEP 3: AI LEVEL */}
                  {step === 3 && (
                    <div className="space-y-3 mt-2">
                      {(Object.keys(aiLabels) as AILevel[]).map((level) => {
                        const isActive = aiLevel === level;
                        return (
                           <button
                             key={level}
                             onClick={() => setAiLevel(level)}
                             className={`
                               w-full p-4 rounded-lg border text-left transition-all relative overflow-hidden
                               ${isActive 
                                 ? "bg-gradient-to-r from-[#d4af37]/20 to-transparent border-[#d4af37]" 
                                 : "bg-white/5 border-white/5 hover:border-white/20"}
                             `}
                           >
                             <div className="flex justify-between items-center mb-1">
                               <span className={`text-sm font-bold uppercase ${isActive ? "text-[#d4af37]" : "text-white/80"}`}>
                                 {aiLabels[level]}
                               </span>
                               {isActive && <Check className="w-4 h-4 text-[#d4af37]" />}
                             </div>
                             <div className="text-[10px] text-white/50">
                               Multiplier: <span className="font-mono text-white">x{aiMultipliers[level]}</span>
                             </div>
                           </button>
                        )
                      })}
                    </div>
                  )}

                  {/* STEP 4: EXTRAS */}
                  {step === 4 && (
                     <div className="space-y-2 mt-2">
                        {[
                          { key: 'vector_db', label: 'Vector Database', icon: Database, price: 2500 },
                          { key: 'voice_synth', label: 'Voice Synthesis', icon: MessageSquare, price: 1800 },
                          { key: 'predictive', label: 'Predictive Analytics', icon: Sparkles, price: 5000 }
                        ].map((item) => (
                           <label
                             key={item.key}
                             className={`
                               flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
                               ${extras[item.key as keyof typeof extras] 
                                 ? "bg-white/10 border-[#d4af37]/50 text-white" 
                                 : "bg-white/5 border-transparent text-white/50 hover:bg-white/10"}
                             `}
                           >
                              <div className={`p-2 rounded ${extras[item.key as keyof typeof extras] ? "bg-[#d4af37] text-black" : "bg-black/50"}`}>
                                 <item.icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                 <div className="text-xs font-bold uppercase">{item.label}</div>
                                 <div className="text-[10px] opacity-70">+${item.price}</div>
                              </div>
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={extras[item.key as keyof typeof extras]}
                                onChange={(e) => setExtras(prev => ({...prev, [item.key]: e.target.checked}))}
                              />
                              {extras[item.key as keyof typeof extras] && <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />}
                           </label>
                        ))}
                     </div>
                  )}

                  {/* STEP 5: SUMMARY */}
                  {step === 5 && estimate && (
                    <div className="space-y-4">
                       <div className="bg-[#050505] border border-[#d4af37]/30 rounded-lg p-5 relative overflow-hidden">
                          {/* Scanline effect */}
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,10,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%] opacity-20" />
                          
                          <div className="relative z-10 space-y-3">
                             <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                <div className="text-xs text-white/50 uppercase">Architecture</div>
                                <div className="text-sm font-bold text-white">{serviceLabels[service!]}</div>
                             </div>
                             
                             <div className="grid grid-cols-2 gap-4 pb-3 border-b border-white/10">
                                <div>
                                   <div className="text-xs text-white/50 uppercase">Scale</div>
                                   <div className="text-sm text-white font-mono">{parsedUnits} Units</div>
                                </div>
                                <div className="text-right">
                                   <div className="text-xs text-white/50 uppercase">Model</div>
                                   <div className="text-sm text-white font-mono">{aiLabels[aiLevel].split(':')[0]}</div>
                                </div>
                             </div>

                             <div className="pt-2">
                                <div className="text-[10px] text-[#d4af37] uppercase tracking-widest mb-1">Estimated Investment</div>
                                <div className="text-2xl font-bold text-white tracking-tight">
                                   ${estimate.low.toFixed(0)} <span className="text-white/30 text-lg mx-1">-</span> ${estimate.high.toFixed(0)}
                                </div>
                             </div>
                          </div>
                       </div>

                       <button
                         onClick={handleDownloadPDF}
                         className="w-full py-3 rounded-lg border border-[#d4af37]/30 hover:bg-[#d4af37]/10 text-[#d4af37] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                       >
                          <ClipboardList className="w-4 h-4" /> Export Data Packet (PDF)
                       </button>

                       <p className="text-[10px] text-white/30 text-center">
                          Initiating this protocol does not bind resources. <br/>Final calibration required by human architect.
                       </p>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

            {/* 4. Footer Controls */}
            <div className="px-4 py-3 border-t border-white/10 bg-[#0a0a0a] flex items-center justify-between">
               
               {/* Back / Close */}
               <button
                  onClick={step === 1 ? onClose : back}
                  className="px-3 py-1.5 rounded-md text-xs text-white/50 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1"
               >
                  {step === 1 ? <X className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
                  {step === 1 ? "Abort" : "Back"}
               </button>

               <div className="flex items-center gap-2">
                  <button onClick={reset} className="px-3 py-1.5 text-[10px] text-white/30 hover:text-white transition-colors">
                     RESET
                  </button>

                  {/* Next / Initialize */}
                  <button
                    onClick={step === 5 ? handleSendToChat : next}
                    disabled={!canNext()}
                    className={`
                       px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all
                       ${canNext() 
                         ? "bg-[#d4af37] text-black hover:bg-[#b5952f] shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                         : "bg-white/10 text-white/20 cursor-not-allowed"}
                    `}
                  >
                     {step === 5 ? "Initialize" : "Next"}
                     {step === 5 ? <Cpu className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                  </button>
               </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}