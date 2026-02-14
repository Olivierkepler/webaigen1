"use client";
import { useEffect, useState } from "react";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectCard from "./components/Gallery/ProjectCard";
import Lightbox from "./components/Lightbox";
import Footer from "./components/Footer";
import Vision from "./components/Vision";
import LogoLoader from "./components/LogoLoader";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Subnav from "./components/Subnav";
import Testimonial from "./components/ArchitectureTestimonials";
import SelectedWorks from "./components/SelectedWorks"

const projects = [
  {
    id: "01",
    type: "BRUTALISM",
    title: "The Concrete Echo",
    src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
    span: "tall",
  },
  {
    id: "02",
    type: "MODERNISM",
    title: "Glass Monoliths",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    span: "wide",
  },
  {
    id: "03",
    type: "FUTURISM",
    title: "Neo-Tokyo Voids",
    src: "https://images.unsplash.com/photo-1490761668535-35497054764d?auto=format&fit=crop&w=1200&q=80",
    span: "wide",
  },
  {
    id: "04",
    type: "TRADITION",
    title: "Stone Origins",
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80",
    span: "tall",
  },
];

export default function Home() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    document.documentElement.style.scrollBehavior = "smooth";
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-[#d4af37] selection:text-black">
      {/* 1) INITIAL PAGE PRELOADER */}
      <div
        className={`fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center transition-transform duration-[1500ms] cubic-bezier ${
          !isLoading ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <LogoLoader size={110} label="Loading Monolith…" />
      </div>

      {/* 2) NAVIGATION + HERO */}
      <section
        id="hero"
        className={`scroll-mt-28 transition-opacity duration-1000 delay-700 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        {/* Subnav appears only after scrolling down */}
        <Subnav
        
        />
        <Hero />
        
      </section>

      {/* 3) CONTENT FLOW */}
      <div className="relative z-10">
        {/* Vision */}
        <section id="vision" className="scroll-mt-28">
          <Vision />
        </section>

       <SelectedWorks/>
      </div>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-28">
        <Pricing />
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-28">
        <FAQ />
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="scroll-mt-28">
        <Testimonial />
      </section>

      {/* Footer */}
      <footer id="footer" className="scroll-mt-28">
        <Footer />
      </footer>

      {/* Lightbox overlay */}
      {selectedImg && (
        <Lightbox src={selectedImg} onClose={() => setSelectedImg(null)} />
      )}

      {/* GLOBAL ANIMATION INJECTIONS */}
      <style jsx global>{`
        @keyframes grow-h {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .cubic-bezier {
          transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
        }

        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: #050505;
        }
        ::-webkit-scrollbar-thumb {
          background: #d4af3733;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #d4af37;
        }
      `}</style>
    </main>
  );
}
