"use client";

import {
  X,
  Mic,
  MicOff,
  RotateCcw,
  Sun,
  Moon,
  Copy,
  Send,
  Cpu,
  Terminal,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useRef, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import EstimatorPanel from "./EstimatorPanel";
import Image from "next/image";
import Logo from "../components/logo1";

/* ----------------------------------------------------
   Type Definitions (Unchanged)
---------------------------------------------------- */
interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}
interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}
interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}
interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}
interface WindowWithSpeechRecognition extends Window {
  SpeechRecognition?: new () => SpeechRecognition;
  webkitSpeechRecognition?: new () => SpeechRecognition;
}
type Role = "user" | "assistant";
type Message = {
  id: string;
  role: Role;
  content: string;
  time: string;
};
type ChatApiResponse = {
  reply?: string;
  error?: string;
};

const STORAGE_KEY = "web_aigen_chat_history";
const createId = () => Math.random().toString(36).slice(2);

export default function Chatbot() {
  /* ----------------------------------------------------
     Local State
  ---------------------------------------------------- */
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content: "System initialized. How can I assist with your architecture today?",
      time: new Date().toISOString(),
    },
  ]);

  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [estimatorOpen, setEstimatorOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const typewriterTimeoutRef = useRef<number | null>(null);

  // NEW: refs for mobile keyboard-safe scrolling
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const isDark = theme === "dark";

  /* ----------------------------------------------------
     Helpers
  ---------------------------------------------------- */
  const formatTime = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const safeText = (str: string) => str.replace(/[\u0000-\u001F]+/g, " ");

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  /* ----------------------------------------------------
     iOS / Mobile: prevent "zoom on focus"
     - iOS zooms when font-size < 16px on inputs.
     - We enforce >= 16px on small screens only, while keeping desktop unchanged.
---------------------------------------------------- */

  /* ----------------------------------------------------
     iOS / Mobile: keep chat stable when keyboard opens
     Strategy:
     - Use visualViewport to detect keyboard height
     - Apply a bottom offset (padding) to the scroll area
     - Ensure the input stays visible and only messages scroll
---------------------------------------------------- */
  const [kbInset, setKbInset] = useState(0);

  useEffect(() => {
    if (!open) return;

    const vv = window.visualViewport;
    if (!vv) return;

    const update = () => {
      // Keyboard reduces visual viewport height; we compute inset relative to layout viewport.
      // This works well for iOS Safari + Android Chrome.
      const inset = Math.max(0, window.innerHeight - vv.height - (vv.offsetTop || 0));
      setKbInset(inset);
    };

    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);

    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, [open]);

  // When focusing the textarea, ensure the input is visible and last message stays reachable.
  const handleFocusInput = () => {
    // Give keyboard animation a moment, then scroll to bottom
    window.setTimeout(() => {
      scrollToBottom();
    }, 50);
    window.setTimeout(() => {
      scrollToBottom();
    }, 220);
  };

  /* ----------------------------------------------------
     Clear Chat
  ---------------------------------------------------- */
  const clearChat = () => {
    setMessages([
      {
        id: createId(),
        role: "assistant",
        content: "Memory purged. Systems ready for new input.",
        time: new Date().toISOString(),
      },
    ]);
    window.localStorage.removeItem(STORAGE_KEY);
    clearTypewriter();
  };

  /* ----------------------------------------------------
     Load + Save Message History
  ---------------------------------------------------- */
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Message[];
        if (parsed.length) setMessages(parsed);
      } catch (e) {
        console.error("Failed to parse stored messages:", e);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(scrollToBottom, [messages, typingText, loading]);

  /* ----------------------------------------------------
     Voice Recognition
  ---------------------------------------------------- */
  const initRecognition = (): SpeechRecognition | null => {
    const SpeechRecognitionClass =
      (window as WindowWithSpeechRecognition).SpeechRecognition ||
      (window as WindowWithSpeechRecognition).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) return null;

    const rec = new SpeechRecognitionClass();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };

    rec.onerror = (e: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", e.error);
      setIsRecording(false);
    };

    rec.onend = () => setIsRecording(false);

    return rec;
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const rec = initRecognition();
    if (!rec) {
      alert("Audio input module not detected.");
      return;
    }

    recognitionRef.current = rec;
    setIsRecording(true);
    rec.start();
  };

  /* ----------------------------------------------------
     Typewriter Effect
  ---------------------------------------------------- */
  const clearTypewriter = () => {
    if (typewriterTimeoutRef.current) {
      window.clearTimeout(typewriterTimeoutRef.current);
      typewriterTimeoutRef.current = null;
    }
    setTypingText("");
  };

  const runTypewriter = (text: string, onDone: () => void) => {
    clearTypewriter();
    const clean = safeText(text);
    let idx = 0;

    const step = () => {
      setTypingText((prev) => prev + clean.charAt(idx));
      idx += 1;

      if (idx < clean.length) {
        const prevChar = clean.charAt(idx - 1);
        let delay = 15;
        if (".!?".includes(prevChar)) delay = 80;
        else if (",;:".includes(prevChar)) delay = 30;

        typewriterTimeoutRef.current = window.setTimeout(step, delay);
      } else {
        onDone();
      }
    };

    if (clean.length === 0) onDone();
    else step();
  };

  useEffect(() => () => clearTypewriter(), []);

  /* ----------------------------------------------------
     Chat API
  ---------------------------------------------------- */
  const fetchReply = async (chatMessages: Message[]): Promise<string> => {
    const res = await fetch("/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatMessages }),
    });

    const data = (await res.json()) as ChatApiResponse;

    if (!res.ok) throw new Error(data.error || "Request failed.");

    return data.reply ?? "Protocol unclear. Please refine query.";
  };

  /* ----------------------------------------------------
     Send Message
  ---------------------------------------------------- */
  const sendMessage = async () => {
    if (!input.trim() || loading || typingText) return;

    const content = input.trim();

    const userMsg: Message = {
      id: createId(),
      role: "user",
      content,
      time: new Date().toISOString(),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const reply = await fetchReply(updated);

      runTypewriter(reply, () => {
        setMessages((prev) => [
          ...prev,
          {
            id: createId(),
            role: "assistant",
            content: reply,
            time: new Date().toISOString(),
          },
        ]);
        setTypingText("");
        setLoading(false);
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content: "Connection error. Retrying uplink...",
          time: new Date().toISOString(),
        },
      ]);
      setTypingText("");
      setLoading(false);
    }
  };

  /* ----------------------------------------------------
     Regenerate
  ---------------------------------------------------- */
  const regenerateLast = async () => {
    if (loading || typingText) return;

    const lastAssistantIndex = [...messages]
      .map((m, idx) => ({ ...m, idx }))
      .filter((m) => m.role === "assistant")
      .slice(-1)[0]?.idx;

    if (lastAssistantIndex === undefined) return;

    const baseMessages = messages.filter((_, idx) => idx !== lastAssistantIndex);

    setMessages(baseMessages);
    setLoading(true);
    clearTypewriter();

    try {
      const reply = await fetchReply(baseMessages);

      runTypewriter(reply, () => {
        setMessages((prev) => [
          ...prev,
          {
            id: createId(),
            role: "assistant",
            content: reply,
            time: new Date().toISOString(),
          },
        ]);
        setTypingText("");
        setLoading(false);
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content: "Error regenerating sequence.",
          time: new Date().toISOString(),
        },
      ]);
      setTypingText("");
      setLoading(false);
    }
  };

  /* ----------------------------------------------------
     Markdown Renderer
  ---------------------------------------------------- */
  const copyToClipboard = (text: string) => {
    if (typeof navigator === "undefined") return;
    navigator.clipboard?.writeText(text).catch(console.error);
  };

  const markdownComponents: Partial<Components> = {
    code: (props: { inline?: boolean; className?: string; children?: ReactNode }) => {
      const { inline, className, children } = props;
      const code = String(children ?? "").trim();

      if (inline) {
        return (
          <code className="px-1.5 py-0.5 rounded-sm bg-[#d4af37]/10 text-[#d4af37] text-xs font-mono border border-[#d4af37]/20">
            {children}
          </code>
        );
      }

      return (
        <div className="relative z-[99999] group my-3 border border-white/10 rounded-sm overflow-hidden bg-black">
          <div className="flex items-center justify-between px-3 py-1 bg-white/5 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
            <button
              onClick={() => copyToClipboard(code)}
              className="text-[10px] font-mono uppercase text-white/40 hover:text-white transition-colors"
            >
              Copy_Snippet
            </button>
          </div>
          <pre className="text-xs p-4 overflow-auto text-white/80 font-mono">
            <code className={className}>{code}</code>
          </pre>
        </div>
      );
    },
    p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
  };

  /* ----------------------------------------------------
     Estimator Wrapper
  ---------------------------------------------------- */
  const handleEstimatorSendToChat = (markdown: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: createId(),
        role: "assistant",
        content: markdown,
        time: new Date().toISOString(),
      },
    ]);
  };

  /* ----------------------------------------------------
     UI Rendering
  ---------------------------------------------------- */
  return (
    <div className="relative z-[1001]">
      {/* 1. CLOSED STATE: Floating Orb */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 pl-5 pr-1.5 py-1.5 bg-[#050505]/80 backdrop-blur-xl border border-[#d4af37]/30 rounded-full shadow-[0_5px_25px_-5px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-105 hover:border-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
        >
          <div className="flex flex-col items-start mr-1">
            <span className="text-[9px] font-mono text-[#d4af37] tracking-[0.15em] uppercase leading-none mb-0.5">
              System Online
            </span>
            <span className="text-sm font-bold text-white tracking-wide">Ask WebAiGen</span>
          </div>

          <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37]/20 to-black border border-[#d4af37]/50 shrink-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#d4af37] opacity-0 group-hover:opacity-20 animate-pulse transition-opacity duration-500" />
            <Image
              src="/images/robot.png"
              width={32}
              height={32}
              alt="AI Chatbot"
              className="w-7 h-7 object-contain relative z-10 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
              priority
            />
          </div>

          <div className="absolute top-1 right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-[#050505]"></span>
          </div>
        </button>
      )}

      {/* 2. OPEN STATE: Main Interface */}
      {open && (
        <div
          className={`
            fixed bottom-4 right-4 sm:bottom-6 sm:right-6
            w-[95vw] sm:w-[480px] md:w-[600px]
            ${estimatorOpen ? "md:w-[90vw] xl:w-[1200px]" : ""}
            h-[85vh] sm:h-[800px] max-h-[90vh]
            rounded-md overflow-hidden
            flex flex-col
            border border-white/10
            shadow-[0_0_50px_rgba(0,0,0,0.8)]
            animate-in slide-in-from-bottom-10 fade-in duration-300
            ${isDark ? "bg-[#050505]/95 backdrop-blur-md" : "bg-zinc-100 border-zinc-300"}

            /* ✅ MOBILE: center on X axis + stabilize */
            left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0
          `}
          // ✅ iOS: allow content to size to the visual viewport without jumping
          style={{
            // keep desktop normal; on mobile we compensate with kbInset via padding on scroll region
            // nothing here changes desktop layout.
          }}
        >
          {/* Top Gold Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-70" />

          {/* --- HEADER --- */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/20">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#d4af37]/10 border border-[#d4af37]/20">
                {/* <Sparkles className="w-4 h-4 text-[#d4af37]" /> */}
               <Logo/> 
              </div>
              <div>
                <h3
                  className={`font-mono text-xs font-bold uppercase tracking-widest ${
                    isDark ? "text-white" : "text-zinc-900"
                  }`}
                >
                  AI_Architect
                </h3>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                    {loading || typingText ? "Processing..." : "System_Online"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
            <button
  onClick={() => setEstimatorOpen((prev) => !prev)}
  className={`
      hidden sm:flex items-center cursor-pointer gap-2 px-4 py-1.5 rounded-sm border transition-all duration-300 group
      ${
        estimatorOpen
          ? "bg-[#d4af37] border-[#d4af37] text-black shadow-[0_0_15px_rgba(212,175,55,0.5)]"
          : "bg-[#d4af37]/10 border-[#d4af37]/50 text-[#d4af37] hover:bg-[#d4af37] hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
      }
    `}
>
  <Cpu className={`w-3.5 h-3.5 ${estimatorOpen ? "animate-spin-slow" : ""}`} />
  <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
    {estimatorOpen ? "Active" : "Launch_Estimator"}
  </span>
</button>

              {/* <button
                onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
                className="p-2 text-white/20 hover:text-white transition-colors"
              >
                {isDark ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
              </button> */}

              <button
                onClick={clearChat}
                className="p-2 cursor-pointer text-white/20 hover:text-white transition-colors"
                title="Clear Memory"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setOpen(false)}
                className="p-2 cursor-pointer text-white/20 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* --- BODY --- */}
          <div className="flex flex-1 overflow-hidden relative">
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Estimator Panel */}
            <div
              className={`transition-all duration-500 ease-[0.22,1,0.36,1] border-r border-white/5 ${
                estimatorOpen ? "w-full md:w-[45%]" : "w-0"
              } overflow-hidden bg-black/40`}
            >
              <EstimatorPanel
                open={estimatorOpen}
                onClose={() => setEstimatorOpen(false)}
                onSendToChat={handleEstimatorSendToChat}
                // isDark={isDark}
              />
            </div>

            {/* Chat Log + Input */}
            <div className="flex-1 flex flex-col relative min-w-0">
              {/* ✅ IMPORTANT:
                  - Only THIS area scrolls.
                  - We add paddingBottom based on kbInset so the last messages remain visible above keyboard.
                  - Use overscroll containment + iOS momentum scrolling.
              */}
              <div
                ref={scrollAreaRef}
                className="
                  flex-1 overflow-y-auto p-4 space-y-6
                  scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent
                  overscroll-contain
                  [scrollbar-gutter:stable]
                  [-webkit-overflow-scrolling:touch]
                "
                style={{
                  paddingBottom: Math.max(16, kbInset + 16), // ✅ key: prevents keyboard from covering last message
                }}
              >
                {messages.map((m) => {
                  const isUser = m.role === "user";
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                    >
                      <span className="mb-1 font-mono text-[9px] text-white/20 uppercase tracking-widest px-1">
                        {isUser ? "User_Input" : "Sys_Response"} // {formatTime(m.time)}
                      </span>

                      <div
                        className={`
                          max-w-[90%] md:max-w-[85%] rounded-sm text-sm p-3 relative
                          ${
                            isUser
                              ? "bg-[#d4af37]/10 border border-[#d4af37]/30 text-white rounded-tr-none"
                              : "bg-white/5 border border-white/10 text-white/80 rounded-tl-none"
                          }
                        `}
                      >
                        <div
                          className={`absolute top-0 w-2 h-2 border-t border-l ${
                            isUser ? "right-0 border-[#d4af37]" : "left-0 border-white/40"
                          }`}
                        />

                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeHighlight]}
                          components={markdownComponents}
                        >
                          {m.content}
                        </ReactMarkdown>
                      </div>

                      {!isUser && (
                        <div className="mt-2 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => copyToClipboard(m.content)}
                            className="flex items-center gap-1 text-[10px] text-white/30 hover:text-[#d4af37]"
                          >
                            <Copy className="w-3 h-3" /> Copy
                          </button>
                          <button
                            onClick={regenerateLast}
                            className="flex items-center gap-1 text-[10px] text-white/30 hover:text-[#d4af37]"
                          >
                            <RotateCcw className="w-3 h-3" /> Retry
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}

                {!typingText && loading && (
                  <div className="flex items-center gap-2 text-[#d4af37]/60 font-mono text-xs animate-pulse pl-2">
                    <Terminal className="w-3 h-3" />
                    <span>Generating_Response...</span>
                  </div>
                )}

                {typingText && (
                  <div className="flex flex-col items-start animate-in fade-in">
                    <span className="mb-1 font-mono text-[9px] text-[#d4af37]/50 uppercase tracking-widest px-1">
                      Stream_Incoming
                    </span>
                    <div className="max-w-[85%] bg-[#d4af37]/5 border border-[#d4af37]/20 text-[#d4af37] p-3 rounded-sm rounded-tl-none text-sm">
                      <ReactMarkdown components={markdownComponents}>{typingText}</ReactMarkdown>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* --- INPUT AREA --- */}
              {/* ✅ Sticky input: stays visible while the messages scroll.
                  Also: iOS zoom fix -> ensure textarea font-size >= 16px on small screens.
              */}
              <div
                className="p-3 border-t border-white/5 bg-[#0a0a0a]"
                style={{
                  // Optional extra safety: when kbInset exists, lift the input slightly above keyboard
                  // without moving the entire modal.
                  transform: kbInset ? `translateY(-${Math.min(kbInset, 260)}px)` : undefined,
                }}
              >
                <div className="flex items-end gap-2 bg-white/5 border border-white/10 rounded-sm p-2 focus-within:border-[#d4af37]/50 focus-within:bg-white/10 transition-all">
                  <div className="pb-2 pl-1">
                    <ChevronRight className="w-4 h-4 text-[#d4af37] animate-pulse" />
                  </div>

                  <textarea
                    ref={inputRef}
                    value={input}
                    onFocus={handleFocusInput}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Enter command or query..."
                    className="
                      flex-1 bg-transparent border-none text-white focus:ring-0
                      placeholder:text-white/20 font-sans resize-none max-h-24 py-2 custom-scroll
                      outline-none
                      text-sm
                      max-sm:text-[16px]  /* ✅ prevents iOS zoom */
                    "
                    rows={1}
                    style={{ minHeight: "40px" }}
                    inputMode="text"
                    autoCapitalize="sentences"
                    autoCorrect="on"
                  />

                  <div className="flex gap-1 pb-1">
                    <button
                      onClick={toggleRecording}
                      className={`p-2 rounded-sm transition-all ${
                        isRecording ? "bg-red-500/20 text-red-500" : "text-white/30 hover:text-white"
                      }`}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={sendMessage}
                      disabled={!input.trim()}
                      className="p-2 bg-[#d4af37] text-black rounded-sm hover:bg-[#b5952f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between mt-2 px-1">
                  <span className="text-[9px] font-mono text-white/20 uppercase">
                    Encrypted Connection
                  </span>
                  <span className="text-[9px] font-mono text-white/20 uppercase">v2.4.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ OPTIONAL (Recommended): small global CSS note (add to globals.css)
          This improves mobile keyboard behavior for the entire app.
          If you don't want global changes, you can skip this.
      */}
      {/*
        In globals.css:
        html, body { height: 100%; }
        body { overscroll-behavior-y: none; }
      */}
    </div>
  );
}
