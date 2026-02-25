import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route"; 
import { sql } from "../../../../utils/db";
import {
  Settings,
  MessagesSquare,
  ArrowUpRight,
  Sparkles,
  Search,
  Plus,
  Database,
  Shield,
  Activity
} from "lucide-react";

export default async function DashboardPage() {
  // 1. Authenticate Session - Passing authOptions is mandatory for getServerSession in App Router
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const name = session.user.name || "Operator";
  const userEmail = session.user.email;

  // 2. Fetch User Chatbots with Error Handling
  let myBots: any[] = [];
  let dbStatus = "Connected";

  try {
    // Direct SQL using the Neon Serverless driver
    myBots = await sql`
      SELECT * FROM chatbots 
      WHERE user_email = ${userEmail} 
      ORDER BY created_at DESC
    `;
  } catch (error) {
    console.error("Database Fetch Error:", error);
    dbStatus = "Error";
  }

  return (
    <div className="flex w-full bg-[#030303] text-white font-sans selection:bg-[#d4af37] selection:text-black min-h-screen overflow-x-hidden">
      <main className="flex-1 flex flex-col min-w-0 relative">
        
        {/* Ambient Grid Background */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
        
        {/* Top Bar */}
        <header className="flex-none h-16 border-b border-white/5 bg-[#030303]/50 backdrop-blur-sm flex items-center justify-between px-8 z-10">
            <div className="flex items-center gap-3">
                 <div className={`h-2 w-2 rounded-full ${dbStatus === 'Connected' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-red-500'}`} />
                 <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                    Dashboard / {dbStatus === 'Connected' ? 'Live' : 'Offline'}
                 </span>
            </div>
            <div className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 w-64 text-xs text-white/50 focus-within:border-[#d4af37]/50 focus-within:text-white transition-colors">
                <Search className="h-3.5 w-3.5" />
                <input type="text" placeholder="Search agents..." className="bg-transparent outline-none w-full placeholder:text-white/20" />
            </div>
        </header>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10">
            <div className="mx-auto max-w-6xl space-y-10">
                
                {/* Hero Section */}
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1">
                            <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />
                            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d4af37]">System_Ready</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white">
                        Welcome, <span className="text-white/40">{name}</span>
                        </h1>
                    </div>
                    <div className="flex gap-3">
                        <ActionButton href="/dashboard/settings" icon={<Settings className="w-4 h-4"/>} label="Config" />
                        <ActionButton href="/dashboard/create" icon={<Plus className="w-4 h-4"/>} label="Initialize" active />
                    </div>
                </div>

                {/* Main Dashboard Layout */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    
                    {/* Left: Chatbot Grid */}
                    <div className="lg:col-span-8 space-y-8">
                        <SectionHeader title="Your Autonomous Agents" subtitle={`${myBots.length} Records Found`} />
                        
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {myBots.length > 0 ? (
                                myBots.map((bot: any) => (
                                    <ActionTile
                                        key={bot.id}
                                        icon={<MessagesSquare className="h-5 w-5 text-[#d4af37]" />}
                                        title={bot.name}
                                        desc={bot.welcome_message || "Active AI Agent"}
                                        href={`/dashboard/chatbots/${bot.id}`}
                                    />
                                ))
                            ) : (
                                <Link href="/dashboard/create" className="col-span-2 border border-dashed border-white/10 rounded-xl p-12 flex flex-col items-center justify-center group hover:border-[#d4af37]/30 transition-all bg-white/[0.01]">
                                    <Plus className="w-8 h-8 text-white/20 group-hover:text-[#d4af37] mb-3" />
                                    <p className="text-sm text-white/40 group-hover:text-white font-light uppercase tracking-widest text-center">
                                        No agents found.<br/><span className="text-[10px] mt-2 block opacity-50">Click to initialize first node.</span>
                                    </p>
                                </Link>
                            )}
                        </div>

                        <SectionHeader title="Terminal Events" subtitle="System Logs" />
                        <div className="space-y-1">
                            <EventRow icon={<Database className="w-3 h-3"/>} label="Neon SQL" value={dbStatus === 'Connected' ? "Query Successful" : "Connection Refused"} time="Live" />
                            <EventRow icon={<Shield className="w-3 h-3"/>} label="Auth Context" value={`Encrypted: ${userEmail}`} time="Active" />
                            <EventRow icon={<Activity className="w-3 h-3"/>} label="Latency" value="Optimal (Neon Edge)" time="12ms" />
                        </div>
                    </div>

                    {/* Right: Sidebar Status */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card title="Workspace Status">
                            <div className="space-y-4">
                                <StatusRow label="Identity" value="Verified" />
                                <StatusRow label="Active Nodes" value={myBots.length.toString()} />
                                <StatusRow label="Environment" value="Production" />
                                <div className="h-px w-full bg-white/10 my-4" />
                                <div className="rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 p-4">
                                    <p className="text-[10px] font-mono uppercase text-[#d4af37] mb-2 font-bold tracking-widest flex items-center gap-2">
                                        <Sparkles className="w-3 h-3" /> Security Protocol
                                    </p>
                                    <p className="text-xs text-white/70 leading-relaxed italic">
                                        Data isolation is active. Your agents are strictly mapped to your unique identifier.
                                    </p>
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
   SUB-COMPONENTS (Error-Free Definitions)
------------------------------------------------------------------------- */

function Card({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-md p-6">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-6">{title}</h3>
            {children}
        </div>
    )
}

function SectionHeader({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h3 className="text-sm font-medium text-white uppercase tracking-wider">{title}</h3>
            <span className="text-[10px] font-mono uppercase text-white/30 tracking-widest">{subtitle}</span>
        </div>
    )
}

function ActionButton({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <Link href={href} className={`flex items-center gap-2 px-4 py-2 rounded-sm border transition-all ${active ? 'bg-[#d4af37] border-[#d4af37] text-black hover:opacity-90' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}>
            {icon}
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold">{label}</span>
        </Link>
    )
}

function ActionTile({ icon, title, desc, href }: { icon: React.ReactNode, title: string, desc: string, href: string }) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] p-6 transition-all duration-300 hover:border-[#d4af37]/50 hover:bg-[#d4af37]/5"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
         <ArrowUpRight className="h-4 w-4 text-[#d4af37]" />
      </div>
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:bg-[#d4af37]/10 group-hover:border-[#d4af37]/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-white group-hover:text-[#d4af37] transition-colors uppercase tracking-wide">{title}</h3>
      <p className="mt-1 text-xs text-white/40 leading-relaxed font-light">{desc}</p>
    </Link>
  );
}

function EventRow({ icon, label, value, time }: { icon: React.ReactNode, label: string, value: string, time: string }) {
    return (
        <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] px-2 rounded transition-colors cursor-default">
            <div className="flex items-center gap-3">
                <div className="text-[#d4af37] opacity-50">{icon}</div>
                <div>
                    <div className="text-[9px] font-mono uppercase text-white/30 tracking-wider">{label}</div>
                    <div className="text-xs text-white/70">{value}</div>
                </div>
            </div>
            <div className="text-[9px] font-mono text-white/20 uppercase tracking-tighter">{time}</div>
        </div>
    )
}

function StatusRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-xs text-white/40 uppercase tracking-widest">{label}</span>
            <span className="text-xs font-mono text-white font-bold">{value}</span>
        </div>
    )
}