"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  Bell,
  Settings,
  LogOut,
  LayoutDashboard,
  Calendar,
  Users,
  Cpu,
  ChevronDown,
} from "lucide-react";
import Logo from "../../components/logo1";

type Props = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  onToggleSidebar?: () => void;
};

export default function DashboardNavbar({ user, onToggleSidebar }: Props) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // ✅ Best neutral option: DiceBear "personas" (professional, gender-neutral, consistent per user)
//   const avatarUrl = useMemo(() => {
//     const seed = (user.email || user.name || "webaigen").trim();
//     return (
//       user.image ||
//       `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(
//         seed
//       )}&backgroundColor=0a0a0a&radius=50`
//     );
//   }, [user.email, user.name, user.image]);

  // Close dropdown on outside click + Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpenMenu(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
      {/* Top gold line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60" />

      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile sidebar toggle */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 border border-white/10 bg-white/5 hover:bg-white/10 transition"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-4 h-4 text-white/70" />
          </button>

          {/* Logo / Brand */}
          <Link href="/dashboard" className="flex items-center gap-2 group">
            {/* <Cpu className="w-5 h-5 text-[#d4af37]" /> */}
            <Logo className="w-10 h-10" />

            <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/80 group-hover:text-white">
              WebAiGen_OS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 ml-6">
            <NavLink
              href="/dashboard"
              icon={<LayoutDashboard className="w-4 h-4" />}
              label="Overview"
            />
            <NavLink
              href="/dashboard/clients"
              icon={<Users className="w-4 h-4" />}
              label="Clients"
            />
            <NavLink
              href="/dashboard/meetings"
              icon={<Calendar className="w-4 h-4" />}
              label="Meetings"
            />
            <NavLink
              href="/dashboard/settings"
              icon={<Settings className="w-4 h-4" />}
              label="Settings"
            />
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button
            className="relative p-2 border border-white/10 bg-white/5 hover:bg-white/10 transition"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-white/60" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
          </button>

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpenMenu((p) => !p)}
              className="flex items-center gap-2 px-2 py-1 border border-white/10 bg-white/5 hover:bg-white/10 transition"
              aria-haspopup="menu"
              aria-expanded={openMenu}
            >
              {/* <Image
                src={avatarUrl}
                alt="User avatar"
                width={28}
                height={28}
                className="rounded-full bg-black"
                unoptimized
              /> */}

              <span className="hidden md:block text-xs text-white/70">
                {user.name || "Operator"}
              </span>

              <ChevronDown
                className={`w-3 h-3 text-white/40 transition-transform ${
                  openMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {openMenu && (
              <div
                className="absolute right-0 mt-2 w-56 bg-[#0a0a0a] border border-white/10 shadow-xl rounded-sm overflow-hidden"
                role="menu"
              >
                <div className="px-3 py-2 border-b border-white/10">
                  <p className="text-xs text-white/80">
                    {user.name || "Operator"}
                  </p>
                  <p className="text-[10px] text-white/40 truncate">
                    {user.email || "No email"}
                  </p>
                </div>

                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2 px-3 py-2 text-xs text-white/70 hover:bg-white/5"
                  role="menuitem"
                  onClick={() => setOpenMenu(false)}
                >
                  <Settings className="w-3 h-3" />
                  Settings
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10"
                  role="menuitem"
                >
                  <LogOut className="w-3 h-3" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------- */
/* Reusable Nav Link */
/* ---------------------------------- */
function NavLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/50 hover:text-[#d4af37] transition"
    >
      {icon}
      {label}
    </Link>
  );
}
