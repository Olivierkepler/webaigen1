import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import {
  Calendar,
  MessagesSquare,
  Settings,
  FileText,
  ArrowUpRight,
  Sparkles,
  Activity,
  ShieldCheck,
  Search
} from "lucide-react";



export default async function DashboardPage() {
  const session = (await getServerSession()) as Session | null;

  if (!session?.user?.email) redirect("/login");

  const name = session.user.name || "Operator";
  const email = session.user.email;
  const role = (session.user as any)?.role ?? "user";

  return (
    // 1. App Shell Container (Fixed Height)
    <div className="flex w-full bg-[#030303] text-white font-sans selection:bg-[#d4af37] selection:text-black overflow-y-auto">
      

      {/* 3. Main Content Area (Scrollable) */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Ambient Background Effects (Localized to Main) */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
            backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            }}
        />
        <div className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-[#d4af37]/5 blur-[120px]" />

        {/* --- Top Bar (Mobile Toggle + Search) --- */}
        <header className="flex-none h-16 border-b border-white/5 bg-[#030303]/50 backdrop-blur-sm flex items-center justify-between px-8 z-10">
            {/* Breadcrumb / Status */}
            <div className="flex items-center gap-3">
                 <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                 <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                    Dashboard / Overview
                 </span>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 w-64 text-xs text-white/50 focus-within:border-[#d4af37]/50 focus-within:text-white transition-colors">
                <Search className="h-3.5 w-3.5" />
                <input 
                    type="text" 
                    placeholder="Search commands..." 
                    className="bg-transparent outline-none w-full placeholder:text-white/20"
                />
                <span className="text-[10px] border border-white/10 rounded px-1.5 py-0.5">⌘K</span>
            </div>
        </header>

        {/* --- Scrollable Content --- */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <div className="mx-auto max-w-6xl space-y-10">
                
                {/* Hero Section */}
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1">
                        <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">
                            System_Ready
                        </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white">
                        Welcome back, <span className="text-white/40">{name}</span>
                        </h1>
                    </div>

                    <div className="flex gap-3">
                        <ActionButton href="/dashboard/settings" icon={<Settings className="w-4 h-4"/>} label="Config" />
                        <ActionButton href="/dashboard/automations" icon={<Activity className="w-4 h-4"/>} label="Automations" active />
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    
                    {/* Left Column: Tools */}
                    <div className="lg:col-span-8 space-y-8">
                        <SectionHeader title="Quick Actions" subtitle="Launch Tools" />
                        
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <ActionTile
                                icon={<MessagesSquare className="h-5 w-5 text-[#d4af37]" />}
                                title="Neural Chat"
                                desc="Execute AI commands and generate code."
                                href="/dashboard/chat"
                            />
                            <ActionTile
                                icon={<Calendar className="h-5 w-5 text-blue-400" />}
                                title="Scheduler"
                                desc="Manage availability and bookings."
                                href="/dashboard/schedule"
                            />
                            <ActionTile
                                icon={<FileText className="h-5 w-5 text-emerald-400" />}
                                title="Proposals"
                                desc="Create high-value estimates."
                                href="/dashboard/proposals"
                            />
                            <ActionTile
                                icon={<Activity className="h-5 w-5 text-purple-400" />}
                                title="Workflows"
                                desc="Monitor active automation runs."
                                href="/dashboard/automations"
                            />
                        </div>

                        <SectionHeader title="System Events" subtitle="Recent Activity" />
                        <div className="space-y-1">
                            <EventRow label="Lead Capture" value="New lead from 'Landing Page A'" time="2m ago" />
                            <EventRow label="Automation" value="Workflow 'Onboarding' executed" time="1h ago" />
                            <EventRow label="Security" value="New login detected (US-EAST)" time="4h ago" />
                        </div>
                    </div>

                    {/* Right Column: Status */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card title="Workspace Status">
                            <div className="space-y-4">
                                <StatusRow label="Plan" value="Pro Tier" />
                                <StatusRow label="API Usage" value="84%" />
                                <StatusRow label="Database" value="Healthy" />
                                
                                <div className="h-px w-full bg-white/10" />
                                
                                <div className="rounded bg-[#d4af37]/10 border border-[#d4af37]/20 p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-3 h-3 text-[#d4af37]" />
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">Recommendation</span>
                                    </div>
                                    <p className="text-xs text-white/70 leading-relaxed mb-3">
                                        Your calendar is not synced. Connect Google Calendar to enable auto-scheduling.
                                    </p>
                                    <Link href="/dashboard/settings" className="text-[10px] font-mono uppercase tracking-widest text-white hover:text-[#d4af37] underline decoration-white/20 underline-offset-4">
                                        Connect Now 
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------
   SUB-COMPONENTS (Clean, Reusable, Aesthetic)
------------------------------------------------------------------------- */

function Card({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-md p-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-6">{title}</h3>
            {children}
        </div>
    )
}

function SectionHeader({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h3 className="text-sm font-medium text-white">{title}</h3>
            <span className="text-[10px] font-mono uppercase text-white/30 tracking-widest">{subtitle}</span>
        </div>
    )
}

function ActionButton({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <Link href={href} className={`flex items-center gap-2 px-4 py-2 rounded border transition-all ${active ? 'bg-[#d4af37] border-[#d4af37] text-black hover:bg-[#b5952f]' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}>
            {icon}
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">{label}</span>
        </Link>
    )
}

function ActionTile({ icon, title, desc, href }: { icon: React.ReactNode, title: string, desc: string, href: string }) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] p-5 transition-all duration-300 hover:border-[#d4af37]/50 hover:bg-[#d4af37]/5 hover:-translate-y-1"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
         <ArrowUpRight className="h-4 w-4 text-[#d4af37]" />
      </div>
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:bg-[#d4af37]/10 group-hover:border-[#d4af37]/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-white group-hover:text-[#d4af37] transition-colors">{title}</h3>
      <p className="mt-1 text-xs text-white/50 leading-relaxed">{desc}</p>
    </Link>
  );
}

function EventRow({ label, value, time }: { label: string, value: string, time: string }) {
    return (
        <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] px-2 rounded transition-colors cursor-default">
            <div className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <div>
                    <div className="text-[10px] font-mono uppercase text-white/40 tracking-wider">{label}</div>
                    <div className="text-xs text-white/80">{value}</div>
                </div>
            </div>
            <div className="text-[10px] font-mono text-white/30">{time}</div>
        </div>
    )
}

function StatusRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-xs text-white/50">{label}</span>
            <span className="text-xs font-mono text-white">{value}</span>
        </div>
    )
}