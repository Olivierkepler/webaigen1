"use client";

import React, { useState } from "react";
import CreateBotModal from "../../../components/CreateBotModal";
import { Plus, LayoutDashboard, MessageSquare } from "lucide-react";

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);

  // This function runs after the "Architecting" animation finishes in the modal
  const refreshBots = () => {
    setShowModal(false);
    // Logic to reload your bots from the database will go here
    window.location.reload(); 
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* --- DASHBOARD HEADER --- */}
      <nav className="border-b border-white/5 p-6 flex justify-between items-center">
        <h1 className="text-sm font-mono tracking-[0.3em] uppercase opacity-50">
          Architect / Terminal
        </h1>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-black text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#fde68a] transition-all"
        >
          <Plus size={14} />
          Initialize New Agent
        </button>
      </nav>

      {/* --- MODAL OVERLAY --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Dark Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)} 
          />
          
          {/* The Modal Component */}
          <div className="relative z-10 w-full max-w-md">
            <CreateBotModal onBotCreated={refreshBots} />
          </div>
        </div>
      )}

      {/* --- EMPTY STATE / CONTENT --- */}
      <main className="p-12 flex flex-col items-center justify-center min-h-[60vh]">
         <div className="text-center space-y-4">
            <MessageSquare className="w-12 h-12 text-white/10 mx-auto" />
            <p className="text-white/30 font-light tracking-wide">No active agents detected in your network.</p>
         </div>
      </main>
    </div>
  );
}