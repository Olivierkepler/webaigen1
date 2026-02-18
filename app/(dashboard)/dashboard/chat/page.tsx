// app/dashboard/chat/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import Link from "next/link";
import { 
  ArrowLeft, 
  MessagesSquare, 
  Terminal, 
  Cpu, 
  Zap, 
  Clock, 
  Activity, 
  ChevronRight,
  Command,
  Settings,
  Share2,
  Maximize2
} from "lucide-react";

// ✅ Import your existing Chatbot
import Chatbot from "../../components/Chatbot";

export default async function DashboardChatPage() {
  const session = (await getServerSession()) as Session | null;

  if (!session?.user?.email) redirect("/login");

  const { email } = session.user;
  const role = (session.user as any)?.role ?? "Operator";

  return (
    <div className="relative flex h-[calc(100vh-64px)] w-full flex-col bg-[#050505] text-[#e5e5e5] font-sans overflow-hidden selection:bg-[#d4af37]/30 selection:text-[#d4af37]">
      
      {/* --- VISUAL ASSETS: GRAIN & GLOW --- */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] bg-[#d4af37]/5 blur-[120px] rounded-full mix-blend-screen" />

      {/* --- TOP COMMAND BAR --- */}
      <header className="z-20 flex h-14 items-center justify-between border-b border-white/5 bg-[#050505]/50 px-6 backdrop-blur-md">
        <div className="flex items-center gap-6">
            <Link 
                href="/dashboard" 
                className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors"
            >
                <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Back</span>
            </Link>
            
            <div className="h-4 w-[1px] bg-white/10" />

            <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-[#d4af37]/10">
                    <Terminal className="h-3 w-3 text-[#d4af37]" />
                </div>
                <span className="text-sm font-medium tracking-tight text-white/80">WebAiGen</span>
                <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-white/30">v2.4.0</span>
            </div>
        </div>

        <div className="flex items-center gap-4">
             {/* Model Selector Pill */}
            <div className="hidden md:flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-3 py-1.5 transition-colors hover:border-white/10">
                <Cpu className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs text-white/60">G-PRO-1.5-TURBO</span>
                <ChevronRight className="h-3 w-3 text-white/20" />
            </div>

            <button className="rounded p-2 text-white/40 hover:bg-white/5 hover:text-white transition-colors">
                <Share2 className="h-4 w-4" />
            </button>
            <button className="rounded p-2 text-white/40 hover:bg-white/5 hover:text-white transition-colors">
                <Settings className="h-4 w-4" />
            </button>
        </div>
      </header>


      {/* --- MAIN WORKSPACE --- */}
      <div className="z-10 flex flex-1 overflow-hidden">
        
        {/* LEFT: MAIN CHAT TERMINAL */}
        <main className="relative flex flex-1 flex-col border-r border-white/5 bg-[#050505]">
             {/* Chat Wrapper */}
             <div className="flex-1 w-full h-full relative">
                 {/* This absolute positioning guarantees the Chatbot takes 100% of the container height 
                    and handles its own internal scrolling.
                 */}
                 <div className="absolute inset-0 ">
                    <Chatbot />
                 </div>
             </div>
        </main>

        {/* RIGHT: INSPECTOR PANEL (Hidden on mobile, visible on lg) */}
        <aside className="hidden w-[320px] flex-col bg-[#080808] lg:flex">
            
            {/* Panel Header */}
            <div className="flex h-12 items-center justify-between border-b border-white/5 px-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Context Inspector</span>
                <Activity className="h-3 w-3 text-white/20" />
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                
                {/* Section: Status */}
                <div className="space-y-3">
                    <div className="text-xs font-medium text-white/70">System Status</div>
                    <div className="grid grid-cols-2 gap-2">
                        <StatusMetric label="Latency" value="12ms" active />
                        <StatusMetric label="Tokens" value="8k/32k" />
                        <StatusMetric label="Encryption" value="AES-256" />
                        <StatusMetric label="Session" value="Secure" />
                    </div>
                </div>

                <div className="h-[1px] w-full bg-white/5" />

                {/* Section: Quick Prompts */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="text-xs font-medium text-white/70">Quick Actions</div>
                        <span className="text-[10px] text-[#d4af37] cursor-pointer hover:underline">View All</span>
                    </div>
                    <div className="space-y-2">
                        <ActionRow icon={<Zap className="w-3 h-3 text-amber-400"/>} label="Generate Proposal" cmd="Cmd+1" />
                        <ActionRow icon={<Terminal className="w-3 h-3 text-blue-400"/>} label="Debug Component" cmd="Cmd+2" />
                        <ActionRow icon={<Maximize2 className="w-3 h-3 text-emerald-400"/>} label="Analyze Data" cmd="Cmd+3" />
                    </div>
                </div>

                <div className="h-[1px] w-full bg-white/5" />

                {/* Section: User Info */}
                <div className="rounded border border-white/5 bg-white/[0.02] p-3">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-gradient-to-tr from-[#d4af37] to-[#8a7020] flex items-center justify-center font-bold text-black text-xs">
                            {email?.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <div className="truncate text-xs font-medium text-white">{email}</div>
                            <div className="text-[10px] text-white/40 font-mono uppercase">{String(role)} Account</div>
                        </div>
                    </div>
                </div>

            </div>

             {/* Panel Footer */}
             <div className="border-t border-white/5 p-4">
                <div className="rounded bg-blue-500/10 border border-blue-500/20 p-3">
                    <div className="flex items-start gap-2">
                        <div className="mt-0.5 text-blue-400"><Command className="w-3 h-3" /></div>
                        <div className="text-[10px] leading-relaxed text-blue-200/70">
                            <strong className="text-blue-400">Pro Tip:</strong> Type <code className="bg-blue-900/30 px-1 rounded text-blue-100">/help</code> to see available agents.
                        </div>
                    </div>
                </div>
             </div>

        </aside>
      </div>

      {/* --- FOOTER STATUS BAR --- */}
      <footer className="z-20 flex h-7 flex-none items-center justify-between border-t border-white/5 bg-[#050505] px-4 text-[10px] font-mono text-white/30">
        <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Connected
            </span>
            <span>US-EAST-1</span>
            <span className="hidden sm:inline">Mem: 42%</span>
        </div>
        <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Docs</span>
            <span className="hover:text-white cursor-pointer transition-colors">API Status</span>
            <div className="flex items-center gap-1 text-white/20">
                <Clock className="h-3 w-3" />
                <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        </div>
      </footer>
    </div>
  );
}

/* --- MICRO-COMPONENTS --- */

function StatusMetric({ label, value, active }: { label: string, value: string, active?: boolean }) {
    return (
        <div className="flex flex-col rounded border border-white/5 bg-white/[0.02] p-2 transition-colors hover:bg-white/5 hover:border-white/10">
            <span className="text-[10px] uppercase text-white/30 font-mono mb-1">{label}</span>
            <div className={`text-xs font-mono font-medium ${active ? 'text-emerald-400' : 'text-white/80'}`}>
                {value}
            </div>
        </div>
    )
}

function ActionRow({ icon, label, cmd }: { icon: React.ReactNode, label: string, cmd: string }) {
    return (
        <button className="group flex w-full items-center justify-between rounded px-2 py-1.5 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-2.5">
                {icon}
                <span className="text-xs text-white/60 group-hover:text-white transition-colors">{label}</span>
            </div>
            <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] font-mono text-white/30 group-hover:border-white/20 group-hover:text-white/50 sm:inline-block">
                {cmd}
            </kbd>
        </button>
    )
}