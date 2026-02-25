"use client";

import React, { useState } from "react";
import { Send, Cpu, User } from "lucide-react";

export default function ChatInterface({ botName, welcomeMessage }: { botName: string, welcomeMessage: string }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: welcomeMessage }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Placeholder for actual AI API call later
    setTimeout(() => {
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: `I am ${botName}. I have received your transmission: "${userMessage.content}". Neural processing will be integrated soon.` 
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col relative border-r border-white/5 " style={{ height: 830 }}>
      {/* Messages Window */}
      <div className="flex-1  p-4 md:p-8 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-white/10">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
            <div className={`h-8 w-8 rounded flex items-center justify-center shrink-0 border ${
              msg.role === 'assistant' 
              ? 'bg-[#d4af37]/10 border-[#d4af37]/20 text-[#d4af37]' 
              : 'bg-white/5 border-white/10 text-white/50'
            }`}>
              {msg.role === 'assistant' ? <Cpu size={14} /> : <User size={14} />}
            </div>
            
            <div className={`p-4 rounded-xl text-sm leading-relaxed ${
              msg.role === 'assistant' 
              ? 'bg-white/5 border border-white/10 text-white/80 rounded-tl-none' 
              : 'bg-[#d4af37] text-black font-medium rounded-tr-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-4 animate-pulse">
            <div className="h-8 w-8 rounded bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
              <Cpu size={14} />
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl rounded-tl-none text-[10px] uppercase tracking-widest text-white/40">
              Processing...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-[#030303] sticky bottom-0  " >
        <form onSubmit={sendMessage} className="max-w-3xl mx-auto relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${botName}...`}
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 pr-14 text-sm focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/20 outline-none transition-all placeholder:text-white/20"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-2 p-2.5 bg-[#d4af37] text-black rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:grayscale"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}