import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardNavbar from "./components/DashboardNavbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <DashboardNavbar user={session.user} />

      <main className="px-4 md:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
