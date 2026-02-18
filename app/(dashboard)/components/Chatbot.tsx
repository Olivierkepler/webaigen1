"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Paperclip, 
  StopCircle, 
  ArrowUp,
  Cpu
} from "lucide-react";

// --- Types ---
type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Neural Interface initialized. System ready. \nWaiting for input...",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // 2. Simulate Network Delay (The "Thinking" Phase)
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I have processed your request. Here is the generated output based on the parameters provided.", // specific logic would go here
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-full w-full flex-col font-sans text-sm relative">
      
      {/* =========================================================
          1. MESSAGE FEED (Scrollable Area)
      ========================================================= */}
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="mx-auto max-w-3xl space-y-8">
          
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {/* Avatar (AI Only) */}
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded bg-white/5 border border-white/10 shadow-[0_0_10px_rgba(212,175,55,0.1)]">
                  <Cpu className="h-4 w-4 text-[#d4af37]" />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`relative max-w-[85%] rounded-lg p-4 leading-relaxed tracking-wide ${
                  msg.role === "user"
                    ? "bg-[#d4af37]/10 text-[#e5e5e5] border border-[#d4af37]/20"
                    : "text-gray-300"
                }`}
              >
                {/* Header (Role + Time) */}
                <div className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-40">
                    <span className="font-mono">{msg.role === 'user' ? 'Operator' : 'System'}</span>
                    <span>•</span>
                    <span>{msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>

                {/* Content */}
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>

              {/* Avatar (User Only) */}
              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded bg-white/10">
                  <User className="h-4 w-4 text-white/70" />
                </div>
              )}
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
             <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-white/5 border border-white/10">
                  <Cpu className="h-4 w-4 text-[#d4af37] animate-pulse" />
                </div>
                <div className="flex items-center gap-1 h-10">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:-0.3s]" />
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:-0.15s]" />
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40" />
                </div>
             </div>
          )}

          {/* Invisible div to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* =========================================================
          2. INPUT AREA (Floating Command Bar)
      ========================================================= */}
      <div className="p-4 md:p-6 pb-6 pt-2 z-20">
        <div className="mx-auto max-w-3xl">
            
            {/* Input Wrapper */}
            <form 
                onSubmit={handleSubmit}
                className="group relative flex items-end gap-2 rounded-xl border border-white/10 bg-[#0a0a0a]/90 p-2 shadow-2xl transition-colors focus-within:border-[#d4af37]/50"
            >
                {/* Attachment Button */}
                <button
                    type="button"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                >
                    <Paperclip className="h-4 w-4" />
                </button>

                {/* Text Area */}
                <input
                    ref={inputRef}
                    className="flex-1 bg-transparent px-2 py-3 text-sm text-white placeholder-white/30 focus:outline-none font-mono"
                    placeholder="Enter command or query..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoComplete="off"
                />

                {/* Send/Stop Button */}
                <button
                    type="submit"
                    disabled={!input.trim() && !isLoading}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all ${
                        input.trim() 
                        ? "bg-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]" 
                        : "bg-white/5 text-white/30 cursor-not-allowed"
                    }`}
                >
                    {isLoading ? (
                        <StopCircle className="h-4 w-4 animate-pulse" />
                    ) : (
                        <ArrowUp className="h-4 w-4" />
                    )}
                </button>
            </form>

            {/* Disclaimer / Footer */}
            <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-white/20 font-mono uppercase tracking-widest">
                <Sparkles className="h-3 w-3" />
                <span>AI Generated Content • Verify Important Data</span>
            </div>

        </div>
      </div>
    </div>
  );
}