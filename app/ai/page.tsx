"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BrainCircuit, 
  ScanLine, 
  MessageSquareCode, 
  DatabaseZap, 
  Activity, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";

// --- TYPES ---
type Solution = {
  id: string;
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  // The "Process" flow data
  process: {
    input: string;
    model: string;
    output: string;
  };
  metrics: { label: string; value: string; unit: string }[];
};

// --- DATA ---
const SOLUTIONS: Solution[] = [
  {
    id: "nlp",
    icon: MessageSquareCode,
    title: "Conversational Oracle",
    tagline: "Context-Aware LLM Agents",
    description: "Deployment of fine-tuned language models that don't just chat—they execute complex workflows, query vector databases, and maintain long-term memory of user intent.",
    process: {
      input: "Unstructured User Queries",
      model: "Transformer Architecture (GPT-4o)",
      output: "Executable SQL / API Actions"
    },
    metrics: [
      { label: "Resolution Rate", value: "94", unit: "%" },
      { label: "Avg Latency", value: "120", unit: "ms" }
    ]
  },
  {
    id: "vision",
    icon: ScanLine,
    title: "Computer Vision",
    tagline: "Automated Visual Inspection",
    description: "Real-time object detection pipelines for manufacturing quality control and security perimeter monitoring. Capable of processing 60+ streams simultaneously.",
    process: {
      input: "Raw 4K Video Feed",
      model: "YOLOv8 / CNN Ensemble",
      output: "Anomaly Detection <0.01s"
    },
    metrics: [
      { label: "Accuracy", value: "99.8", unit: "%" },
      { label: "Streams", value: "64", unit: "+" }
    ]
  },
  {
    id: "predictive",
    icon: Activity,
    title: "Predictive Engines",
    tagline: "Market & Behavior Forecasting",
    description: "Ingest terabytes of historical data to train forecasting models. Predict inventory shortages, stock movements, or user churn with military-grade precision.",
    process: {
      input: "Historical CSV / SQL Lakes",
      model: "XGBoost / LSTM Networks",
      output: "7-Day Probabilistic Forecast"
    },
    metrics: [
      { label: "Data Points", value: "50", unit: "M+" },
      { label: "ROI Uplift", value: "3.5", unit: "x" }
    ]
  },
  {
    id: "security",
    icon: ShieldCheck,
    title: "Sentinel AI",
    tagline: "Autonomous Cyber-Defense",
    description: "Self-healing networks that detect intrusion patterns in real-time. The system isolates compromised nodes and patches vulnerabilities before humans are even alerted.",
    process: {
      input: "Network Traffic Logs",
      model: "Unsupervised Anomaly Detection",
      output: "Auto-Quarantine & Patch"
    },
    metrics: [
      { label: "Reaction", value: "0.4", unit: "s" },
      { label: "False Positives", value: "<1", unit: "%" }
    ]
  }
];

export default function AiSolutionsPage() {
  const [activeTab, setActiveTab] = useState<string>(SOLUTIONS[0].id);
  const activeSolution = SOLUTIONS.find(s => s.id === activeTab) || SOLUTIONS[0];

  return (
    <section className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-[#d4af37]/30 overflow-hidden font-sans">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none opacity-20" />
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-b from-[#d4af37]/5 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        
        {/* HERO SECTION */}
        <div className="mb-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-6"
            >
                <BrainCircuit className="w-6 h-6 text-[#d4af37]" />
                <span className="font-mono text-xs tracking-[0.3em] text-[#d4af37] uppercase">
                    Architectures
                </span>
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.9]"
            >
                Synthetic <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/20">
                    Intelligence.
                </span>
            </motion.h1>
        </div>

        {/* --- MAIN INTERFACE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[600px]">
            
            {/* LEFT COLUMN: NAVIGATION (3 cols) */}
            <div className="lg:col-span-3 flex flex-col gap-2">
                {SOLUTIONS.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => setActiveTab(s.id)}
                        className={`group relative flex items-center gap-4 p-4 text-left transition-all duration-500 border-l-2 
                        ${activeTab === s.id 
                            ? "border-[#d4af37] bg-white/5" 
                            : "border-white/5 hover:border-white/20 hover:bg-white/5"
                        }`}
                    >
                        <s.icon 
                            className={`w-5 h-5 transition-colors duration-300 ${activeTab === s.id ? "text-[#d4af37]" : "text-white/40 group-hover:text-white"}`} 
                        />
                        <div>
                            <div className={`font-mono text-xs uppercase tracking-wider mb-1 ${activeTab === s.id ? "text-[#d4af37]" : "text-white/40"}`}>
                                0{SOLUTIONS.indexOf(s) + 1}
                            </div>
                            <div className={`text-sm font-medium ${activeTab === s.id ? "text-white" : "text-white/60"}`}>
                                {s.title}
                            </div>
                        </div>
                        
                        {/* Active Glow Background */}
                        {activeTab === s.id && (
                            <motion.div 
                                layoutId="nav-glow"
                                className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-transparent pointer-events-none"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* RIGHT COLUMN: DISPLAY (9 cols) */}
            <div className="lg:col-span-9 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="h-full w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-8 md:p-12 relative overflow-hidden flex flex-col justify-between"
                    >
                        {/* Decorative HUD Corners */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#d4af37]/50" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#d4af37]/50" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#d4af37]/50" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#d4af37]/50" />

                        {/* CONTENT: HEADER */}
                        <div className="relative z-10 mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="px-2 py-0.5 border border-[#d4af37]/30 rounded text-[10px] font-mono text-[#d4af37] uppercase tracking-wider bg-[#d4af37]/5">
                                    System Active
                                </div>
                                <div className="h-[1px] w-20 bg-gradient-to-r from-[#d4af37]/30 to-transparent" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-light mb-4 text-white">
                                {activeSolution.title}
                            </h2>
                            <p className="text-white/50 max-w-2xl leading-relaxed">
                                {activeSolution.description}
                            </p>
                        </div>

                        {/* CONTENT: PROCESS VISUALIZATION */}
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <ProcessNode 
                                step="01" 
                                label="INPUT" 
                                value={activeSolution.process.input} 
                                delay={0.1}
                            />
                            
                            {/* Animated Arrow/Connector */}
                            <div className="hidden md:flex items-center justify-center">
                                <motion.div 
                                    animate={{ opacity: [0.2, 1, 0.2] }} 
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <ChevronRight className="text-[#d4af37]" />
                                </motion.div>
                            </div>

                            <ProcessNode 
                                step="02" 
                                label="MODEL" 
                                value={activeSolution.process.model} 
                                delay={0.2}
                                isActive={true}
                            />

                             {/* Animated Arrow/Connector */}
                             <div className="hidden md:flex items-center justify-center">
                                <motion.div 
                                    animate={{ opacity: [0.2, 1, 0.2] }} 
                                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                >
                                    <ChevronRight className="text-[#d4af37]" />
                                </motion.div>
                            </div>

                            <ProcessNode 
                                step="03" 
                                label="OUTPUT" 
                                value={activeSolution.process.output} 
                                delay={0.3}
                            />
                        </div>

                        {/* CONTENT: FOOTER METRICS */}
                        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-8">
                            {activeSolution.metrics.map((m, i) => (
                                <div key={i}>
                                    <div className="text-xs font-mono text-white/30 uppercase mb-1">{m.label}</div>
                                    <div className="text-3xl font-light text-white">
                                        <Counter value={parseInt(m.value)} />
                                        <span className="text-[#d4af37] text-lg ml-1">{m.unit}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* BACKGROUND GRID (Moving) */}
                        <div 
                            className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{ 
                                backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                                backgroundSize: "40px 40px"
                            }}
                        />

                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
      </div>
    </section>
  );
}

// --- SUB-COMPONENTS ---

function ProcessNode({ step, label, value, delay, isActive = false }: { step: string; label: string; value: string; delay: number; isActive?: boolean }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className={`p-4 border ${isActive ? "border-[#d4af37]/30 bg-[#d4af37]/5" : "border-white/5 bg-white/5"} rounded relative overflow-hidden`}
        >
            <div className="flex justify-between items-start mb-3">
                <span className="font-mono text-[10px] text-white/30">{step} // {label}</span>
                {isActive && (
                    <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse shadow-[0_0_8px_#d4af37]" />
                )}
            </div>
            <div className="text-sm text-white/90 font-mono border-l-2 border-white/10 pl-3">
                {value}
            </div>
        </motion.div>
    )
}

// Simple counter animation for the metrics
function Counter({ value }: { value: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 1500; // ms
        const steps = 60;
        const intervalTime = duration / steps;
        const stepValue = value / steps;
        
        let current = 0;
        const timer = setInterval(() => {
            current += stepValue;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [value]);

    return <span>{count}</span>;
}