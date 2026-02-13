"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NodeALogo from "../components/NodeALogo";
import SearchBar from "./SearchBar";

const navLinks = [
  { name: "Archive", href: "/archive" },
  { name: "Collective", href: "/collective" },
  { name: "Exhibitions", href: "/exhibitions" },
  { name: "Inquiry", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape + lock body scroll when menu is open
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-[1000]">
        {/* Top bar */}
        <div className="px-[5%] py-3 md:py-5 flex items-center justify-between border-b border-white/5 backdrop-blur-md bg-black/20">
          {/* Brand */}
          <div className="group relative flex items-center gap-4 md:gap-6">
            <Link
              href="/"
              className="relative shrink-0 transition-transform duration-500 ease-in-out group-hover:scale-[1.03]"
              aria-label="Home"
            >
              <div className="absolute inset-0 bg-[#d4af37] opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-15" />
              <NodeALogo size={44} />
            </Link>

            {/* Divider */}
            <div className="hidden sm:block h-10 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />

            {/* Wordmark */}
            <div className="hidden sm:flex flex-col">
              <Link href="/" className="overflow-hidden">
                <span className="block text-base md:text-lg font-bold tracking-[10px] md:tracking-[12px] text-[#d4af37] font-montserrat uppercase leading-none transition-all duration-700 group-hover:tracking-[13px] md:group-hover:tracking-[15px]">
                  Monolith
                </span>
              </Link>

              <div className="mt-1.5 flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-35"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#d4af37]"></span>
                </span>

                <span className="font-mono text-[8px] tracking-[3px] text-white/40 uppercase">
                  World Building Archive — 2026
                </span>
              </div>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12">
            <div className="w-[260px] xl:w-[320px]">
              <SearchBar />

            </div>

            <div className="flex items-center gap-8 xl:gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[0.95rem] font-semibold tracking-[3px] uppercase font-montserrat text-white/85 hover:text-[#d4af37] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right actions (tablet) */}
          <div className="hidden md:flex lg:hidden items-center gap-3">
            <div className="w-[240px]">
              <SearchBar />
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 border border-white/10 hover:border-white/20 bg-white/[0.02] text-white/85 text-[0.7rem] font-montserrat tracking-[4px] uppercase transition-colors"
              aria-haspopup="dialog"
              aria-expanded={isOpen}
            >
              Menu
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            aria-label="Toggle Menu"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Toggle navigation</span>
            <span
              className={`block w-5 h-px bg-white transition-transform duration-500 ${
                isOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-white mt-1.5 transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-5 h-px bg-white mt-1.5 transition-transform duration-500 ${
                isOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile/Tablet Drawer */}
      <div
        className={`fixed inset-0 z-[1050] transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <button
          className="absolute inset-0 bg-black/70"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[86%] max-w-[420px] bg-[#050505] border-l border-white/10
          transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-6 sm:p-8 flex flex-col h-full">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3"
              >
                <NodeALogo size={36} />
                <span className="text-sm font-montserrat tracking-[6px] uppercase text-[#d4af37]">
                  Monolith
                </span>
              </Link>

              <button
                onClick={() => setIsOpen(false)}
                className="h-10 w-10 inline-flex items-center justify-center border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                aria-label="Close menu"
              >
                <span className="text-white/80 text-xl leading-none">×</span>
              </button>
            </div>

            <div className="mt-6">
              <SearchBar />
            </div>

            <div className="mt-10 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl sm:text-3xl font-cormorant italic font-light text-white/90 hover:text-[#d4af37]
                  transition-all duration-500 ${
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                  style={{ transitionDelay: `${120 + i * 60}ms` }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-10">
              <div className="w-10 h-px bg-[#d4af37]/80" />
              <p className="mt-4 text-[0.65rem] tracking-[4px] text-white/40 uppercase font-montserrat">
                Global Archive © 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
