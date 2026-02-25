"use client";

import React, { useState } from "react";
import LogoLoader from "./LogoLoader";

export default function CreateBotModal({ onBotCreated }: { onBotCreated: () => void }) {
  const [name, setName] = useState("");
  const [isInitializing, setIsInitializing] = useState(false);

  const handleCreate = async () => {
    setIsInitializing(true);
    
    const response = await fetch("/api/chatbots", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // Simulate "Architecting" time for dramatic effect
      setTimeout(() => {
        setIsInitializing(false);
        setName("");
        onBotCreated();
      }, 2000);
    } else {
      setIsInitializing(false);
      alert("Failed to initialize agent.");
    }
  };

  return (
    <div className="p-8 bg-[#080808] border border-white/10 rounded-sm max-w-md w-full">
      {isInitializing ? (
        <div className="py-10 flex flex-col items-center">
          <LogoLoader size={100} label="Architecting Agent..." />
        </div>
      ) : (
        <>
          <h2 className="text-xl font-light mb-6">Initialize New Agent</h2>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Agent Name</label>
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Customer Support Alpha"
                className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-sm focus:border-[#d4af37] outline-none transition-all"
              />
            </div>
            <button 
              onClick={handleCreate}
              disabled={!name}
              className="w-full py-3 bg-[#d4af37] text-black text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[#fde68a] disabled:opacity-50 transition-all"
            >
              Begin Deployment
            </button>
          </div>
        </>
      )}
    </div>
  );
}