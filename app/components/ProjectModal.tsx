"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Check, Terminal, Cpu, Shield, Globe } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// --- FORM STEPS ---
// 1. Identity (Name, Email)
// 2. Vector (Service Type, Budget)
// 3. Brief (Description)

export default function ProjectModal({ isOpen, onClose }: ModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    details: ""
  });

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setIsSuccess(false);
        setIsSubmitting(false);
        setFormData({ name: "", email: "", service: "", budget: "", details: "" });
      }, 500);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API Call / "Compiling"
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
          
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020202]/80 backdrop-blur-sm"
          />

          {/* MODAL WINDOW */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#d4af37]/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col min-h-[500px]"
          >
            {/* DECORATIVE SCANLINES */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
                 style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px)", backgroundSize: "100% 4px" }} 
            />
            
            {/* HEADER */}
            <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#050505]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#d4af37] animate-pulse rounded-full" />
                <span className="font-mono text-xs text-[#d4af37] tracking-[0.2em] uppercase">
                  Initialize_Protocol // v2.4
                </span>
              </div>
              <button 
                onClick={onClose}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CONTENT AREA */}
            <div className="relative z-10 flex-grow p-8 flex flex-col">
              
              {!isSuccess ? (
                <>
                  {/* PROGRESS BAR */}
                  <div className="flex gap-2 mb-12">
                    {[1, 2, 3].map((s) => (
                      <div 
                        key={s} 
                        className={`h-1 flex-1 transition-all duration-500 ${s <= step ? "bg-[#d4af37]" : "bg-white/10"}`} 
                      />
                    ))}
                  </div>

                  {/* FORM STEPS */}
                  <div className="flex-grow">
                    <AnimatePresence mode="wait">
                      
                      {/* STEP 1: IDENTITY */}
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <h2 className="text-3xl font-light text-white">Identity Verification</h2>
                          <div className="space-y-4">
                            <InputGroup 
                              label="DESIGNATION (NAME)" 
                              placeholder="> Enter full name..."
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                            <InputGroup 
                              label="COMMS (EMAIL)" 
                              placeholder="> Enter email address..."
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2: VECTORS */}
                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                          <h2 className="text-3xl font-light text-white">Select Vector</h2>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <ServiceCard 
                              icon={Globe} 
                              label="Web System" 
                              active={formData.service === "Web"}
                              onClick={() => setFormData({...formData, service: "Web"})}
                            />
                            <ServiceCard 
                              icon={Cpu} 
                              label="AI Integ." 
                              active={formData.service === "AI"}
                              onClick={() => setFormData({...formData, service: "AI"})}
                            />
                            <ServiceCard 
                              icon={Shield} 
                              label="Security" 
                              active={formData.service === "Security"}
                              onClick={() => setFormData({...formData, service: "Security"})}
                            />
                          </div>

                          <div className="space-y-2">
                             <label className="font-mono text-xs text-[#d4af37] uppercase tracking-wider">Estimated Resources (Budget)</label>
                             <select 
                                value={formData.budget}
                                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 p-4 text-white font-mono text-sm focus:border-[#d4af37] focus:outline-none transition-colors"
                             >
                                <option value="" disabled>Select Range</option>
                                <option value="10-20k">$10k - $20k</option>
                                <option value="20-50k">$20k - $50k</option>
                                <option value="50k+">$50k +</option>
                             </select>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 3: BRIEF */}
                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <h2 className="text-3xl font-light text-white">Mission Brief</h2>
                          <div className="space-y-2">
                            <label className="font-mono text-xs text-[#d4af37] uppercase tracking-wider">Parameters</label>
                            <textarea
                              className="w-full h-32 bg-black/30 border border-white/10 p-4 text-white font-mono text-sm focus:border-[#d4af37] focus:outline-none transition-colors resize-none"
                              placeholder="> Describe project requirements..."
                              value={formData.details}
                              onChange={(e) => setFormData({...formData, details: e.target.value})}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* FOOTER ACTIONS */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
                    {step > 1 ? (
                      <button onClick={handleBack} className="text-white/40 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors">
                        [ Back ]
                      </button>
                    ) : <div />}
                    
                    {step < 3 ? (
                      <button 
                        onClick={handleNext}
                        disabled={step === 1 && (!formData.name || !formData.email)}
                        className="flex items-center gap-2 bg-white text-black px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#d4af37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Proceed <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 bg-[#d4af37] text-black px-8 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
                      >
                        {isSubmitting ? "Transmitting..." : "Initialize"}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                /* SUCCESS STATE */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-grow flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full border-2 border-[#d4af37] flex items-center justify-center">
                    <Check className="w-10 h-10 text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-white mb-2">Transmission Secured</h3>
                    <p className="text-white/50 font-mono text-sm">
                      Our architects will decode your request<br/>and establish a secure uplink shortly.
                    </p>
                  </div>
                  <div className="font-mono text-xs text-[#d4af37] mt-8">
                     SESSION_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </div>
                  <button onClick={onClose} className="mt-8 text-white/40 hover:text-white text-xs underline decoration-dotted">
                    Close Terminal
                  </button>
                </motion.div>
              )}
              
            </div>
            
            {/* CORNER DECORATIONS */}
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#d4af37]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#d4af37]" />
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// --- SUB COMPONENTS ---

function InputGroup({ label, placeholder, value, onChange }: { label: string, placeholder: string, value: string, onChange: (e: any) => void }) {
  return (
    <div className="space-y-2 group">
      <label className="font-mono text-xs text-white/40 uppercase tracking-wider group-focus-within:text-[#d4af37] transition-colors">{label}</label>
      <div className="relative">
        <input 
          type="text" 
          value={value}
          onChange={onChange}
          className="w-full bg-transparent border-b border-white/20 py-3 text-white font-mono text-lg placeholder:text-white/10 focus:border-[#d4af37] focus:outline-none transition-all"
          placeholder={placeholder}
        />
        <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#d4af37] transition-all duration-500 group-focus-within:w-full" />
      </div>
    </div>
  )
}

function ServiceCard({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-3 p-6 border transition-all duration-300
        ${active ? "border-[#d4af37] bg-[#d4af37]/10" : "border-white/10 bg-white/5 hover:border-white/30"}`}
    >
      <Icon className={`w-6 h-6 ${active ? "text-[#d4af37]" : "text-white/40"}`} />
      <span className={`font-mono text-xs uppercase tracking-wider ${active ? "text-white" : "text-white/40"}`}>
        {label}
      </span>
    </button>
  )
}