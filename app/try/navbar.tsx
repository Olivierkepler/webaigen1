"use client";

import { useEffect, useState } from "react";
import { Menu, X, Rocket, ArrowRight } from "lucide-react";
import Container from "./ui/container";
import Button from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
  { href: "#dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu open (mobile overlay)
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={[
        "fixed top-60 left-0 right-0 z-50",
        "transition-all duration-300",
        "bg-white", // ✅ always white
        scrolled ? "border-b border-zinc-200 py-2" : "py-4",
      ].join(" ")}
    >
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className=" rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-pink-500/20 duration-300">
           <img src="/images/Webaigen.png" alt="webaigen" className="w-10 h-10" />
          </div>
          <span className="font-bold text-xl tracking-tight text-zinc-900">
            webaigen
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-white p-1 rounded-full border border-zinc-200">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors rounded-full hover:bg-zinc-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden lg:inline-flex">
            Log in
          </Button>
          <Button size="sm">Get Started</Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </Container>

      {/* ✅ Mobile Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop (click outside to close) */}
            <motion.button
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-black/30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              className="fixed left-0 right-0 top-[72px] z-50 md:hidden border-t border-zinc-200 bg-white"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Container className="py-8 flex flex-col gap-6">
                <nav className="flex flex-col gap-4">
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-zinc-700 hover:text-pink-600 transition-colors flex items-center justify-between group"
                    >
                      {link.label}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </a>
                  ))}
                </nav>

                <div className="flex flex-col gap-3 pt-4 border-t border-zinc-200">
                  <Button variant="secondary" className="w-full">
                    Dashboard
                  </Button>
                  <Button className="w-full">Get Started</Button>
                </div>
              </Container>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}