import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { sql } from "@/utils/db";
import Link from "next/link";
import { ChevronLeft, Settings, Share2 } from "lucide-react";
import ChatInterface from "../../../../components/ChatInterface"; // Import the new client component

type Params = Promise<{ id: string }>;

export default async function AgentControlPage(props: { params: Params }) {
  const { id } = await props.params;
  
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  let bot;
  try {
    const bots = await sql`
      SELECT * FROM chatbots 
      WHERE id = ${id} AND user_email = ${session.user.email}
      LIMIT 1
    `;
    bot = bots[0];
  } catch (error) {
    console.error("Database error:", error);
  }

  if (!bot) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest mb-4">Node Not Found</p>
          <Link href="/dashboard" className="text-[#d4af37] text-xs underline uppercase tracking-widest">Return to Terminal</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#030303] text-white">
      {/* --- AGENT HEADER --- */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0a0a]/50 backdrop-blur-md z-20">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft size={18} className="text-white/40" />
          </Link>
          <div>
            <h1 className="text-sm font-semibold uppercase tracking-wider">{bot.name}</h1>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-tighter">Status: Operational</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
           <button className="p-2 hover:bg-white/5 rounded-md text-white/40 hover:text-white transition-all">
             <Share2 size={16} />
           </button>
           <button className="p-2 hover:bg-white/5 rounded-md text-white/40 hover:text-[#d4af37] transition-all">
             <Settings size={16} />
           </button>
        </div>
      </header>

      {/* --- MAIN INTERFACE --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Dynamic Chat Logic (The Update) */}
        <ChatInterface 
          botName={bot.name} 
          welcomeMessage={bot.welcome_message} 
        />

        {/* Info Sidebar (Right) */}
      {/* Info Sidebar (Right) */}
<aside className="hidden lg:block w-[420px] xl:w-[420px] shrink-0 bg-[#080808] p-8 space-y-8 overflow-y-auto border-l border-white/5">
  
  {/* Neural Configuration */}
  <section>
    <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-4">
      Neural Configuration
    </h3>

    <div className="space-y-4">
      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
        <p className="text-[10px] text-white/20 uppercase mb-1">Model</p>
        <p className="text-sm text-white/85">LLM-Node-Turbo</p>
      </div>

      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
        <p className="text-[10px] text-white/20 uppercase mb-2">Theme Color</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-3.5 w-3.5 rounded-full ring-1 ring-white/10"
              style={{ backgroundColor: bot.theme_color || '#d4af37' }}
            />
            <p className="text-sm text-white/80 font-mono uppercase">
              {bot.theme_color || '#d4af37'}
            </p>
          </div>

          <span className="text-[10px] font-mono text-white/30 uppercase">
            Active
          </span>
        </div>
      </div>
    </div>
  </section>

  {/* Deployment Data */}
  <section>
    <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-4">
      Deployment Data
    </h3>

    <div className="text-[12px] space-y-3 text-white/60">
      <div className="flex justify-between items-start gap-4">
        <span className="text-white/40">Node ID</span>
        <span className="font-mono text-[10px] text-white/80 break-all text-right">
          {bot.id}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-white/40">Created</span>
        <span className="font-mono text-[10px] text-white/90">
          {new Date(bot.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  </section>

</aside>
      </div>
    </div>
  );
}