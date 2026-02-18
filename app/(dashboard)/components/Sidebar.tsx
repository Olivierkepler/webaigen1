"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./providers/SidebarProvider"; 
import { 
  LayoutGrid, 
  MessagesSquare, 
  Calendar, 
  FileText, 
  Zap, 
  LogOut,
  Terminal,
  ChevronLeft,
  ChevronRight,
  Settings
} from "lucide-react";

const MENU_ITEMS = [
  { name: "Overview", href: "/dashboard", icon: LayoutGrid },
  { name: "Neural Chat", href: "/dashboard/chat", icon: MessagesSquare },
  { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
  { name: "Proposals", href: "/dashboard/proposals", icon: FileText },
  { name: "Automations", href: "/dashboard/automations", icon: Zap },
];

export default function Sidebar({ 
  userEmail = "operator@webai.gen", 
  userRole = "Admin" 
}: { 
  userEmail?: string; 
  userRole?: string 
}) {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside 
      className={`relative hidden h-screen flex-col border-r border-white/5 bg-[#050505] transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] lg:flex ${
        isCollapsed ? "w-[72px]" : "w-64"
      }`}
    >
      
      {/* --- Toggle Button (Floating on Border) --- */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a] text-white/40 shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all hover:bg-white/10 hover:text-white hover:scale-110"
      >
        {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      {/* --- Header: Brand --- */}
      <div className={`flex h-16 shrink-0 items-center border-b border-white/5 ${isCollapsed ? "justify-center" : "px-6 gap-3"}`}>
        <div className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 shadow-[0_0_15px_rgba(212,175,55,0.1)] transition-transform hover:scale-105">
          <Terminal className="h-5 w-5 text-[#d4af37]" />
        </div>
        
        <div className={`flex flex-col overflow-hidden whitespace-nowrap transition-all duration-300 ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
          <span className="text-sm font-bold tracking-wide text-white">WebAiGen</span>
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
            OS v2.4
          </span>
        </div>
      </div>

      {/* --- Navigation --- */}
      <nav className="flex-1 space-y-1.5 py-6 px-3 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/5">
        
        {!isCollapsed && (
            <div className="px-3 mb-2 transition-opacity duration-300 animate-in fade-in">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
                    Main Menu
                </span>
            </div>
        )}
        
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              // Simple tooltip via title attribute for collapsed state
              title={isCollapsed ? item.name : ""} 
              className={`group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#d4af37]/10 text-[#d4af37]"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              } ${isCollapsed ? "justify-center" : "justify-between"}`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 shrink-0 transition-colors ${isActive ? "text-[#d4af37]" : "text-white/40 group-hover:text-white"}`} />
                
                <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100 block"}`}>
                    {item.name}
                </span>
              </div>
              
              {isActive && !isCollapsed && (
                <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* --- Footer: User Profile --- */}
      <div className="  bottom-0  shrink-0 border-t border-white/5 p-3">
        <div className={`group flex items-center rounded-xl border border-white/5 bg-white/[0.02] p-2 transition-colors hover:bg-white/5 ${isCollapsed ? "justify-center" : "justify-between"}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37] to-[#8a7020] text-[10px] font-bold text-black ring-2 ring-black">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            
            <div className={`flex flex-col overflow-hidden transition-all duration-300 ${isCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100 block"}`}>
              <span className="truncate text-xs font-medium text-white/90">
                {userEmail}
              </span>
              <span className="truncate text-[10px] font-mono text-white/40 uppercase">
                {userRole}
              </span>
            </div>
          </div>
          
          {!isCollapsed && (
            <Link href="/api/auth/signout" className="p-1.5 rounded-md hover:bg-white/10 text-white/30 hover:text-white transition-colors">
                <LogOut className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}