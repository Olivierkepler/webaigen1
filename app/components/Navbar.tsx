"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { name: "Archive", href: "/archive" },
  { name: "Collective", href: "/collective" },
  { name: "Exhibitions", href: "/exhibitions" },
  { name: "Inquiry", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full px-[5%] py-6 md:py-8 flex justify-between items-center z-[1000] backdrop-blur-md border-b border-white/5 transition-all duration-500">
        {/* Logo */}
        <Link href="/" className="text-xl tracking-[10px] text-[#d4af37] font-semibold font-montserrat hover:opacity-80 transition-opacity">
          <Image 
            src="/images/weiagenlogo1.png" 
            alt="Monolith Logo" 
            width={56} 
            height={56} 
            draggable={false}
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-[1rem] font-bold tracking-[3px] uppercase font-montserrat hover:text-[#d4af37] transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 z-[1100] group"
          aria-label="Toggle Menu"
        >
          <span className={`w-6 h-[1px] bg-white transition-transform duration-500 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-[1px] bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`w-6 h-[1px] bg-white transition-transform duration-500 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 bg-black z-[1050] flex flex-col items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col items-center gap-10">
          {navLinks.map((link, i) => (
            <Link 
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-3xl font-cormorant italic font-light transition-all duration-700 delay-[${i * 100}ms] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-10 w-10 h-[1px] bg-[#d4af37]" />
          <p className="text-[0.6rem] tracking-[4px] opacity-40 uppercase font-montserrat">Global Archive ©2026</p>
        </div>
      </div>
    </>
  );
}