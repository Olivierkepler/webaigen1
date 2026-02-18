import type { Metadata } from "next";
import { SidebarProvider } from "./components/providers/SidebarProvider"; // Check your path!
import Sidebar from "./components/Sidebar"; // Check your path!
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardNavbar from "./components/DashboardNavbar"

export const metadata: Metadata = {
  title: "WebAiGen | Console",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession());
  
  // Basic protection (optional if you have middleware)
  if (!session) redirect("/login");

  const email = session.user?.email || "User";
  const role = (session.user as any)?.role || "Operator";

  return (
    <SidebarProvider>
        <DashboardNavbar user={session.user ?? { name: "Operator", email: "User" }} />
      <div className="flex h-screen w-full bg-[#030303] text-white overflow-hidden font-sans selection:bg-[#d4af37] selection:text-black">
        
        {/* The Sidebar component handles its own width based on Context */}
        <Sidebar userEmail={email} userRole={role} />
        
        {/* Main Content: flex-1 ensures it fills the remaining width automatically */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative transition-all duration-300 ease-in-out">
           {children}
        </div>

      </div>
    </SidebarProvider>
  );
}