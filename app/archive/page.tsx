"use client";
import Footer from "../components/Footer";

const archiveItems = [
  { year: "2024", title: "Obsidian Voids", location: "Reykjavík", category: "Monolith" },
  { year: "2023", title: "The Glass Spine", location: "Berlin", category: "Modernism" },
  { year: "2022", title: "Concrete Silence", location: "Tokyo", category: "Brutalism" },
  { year: "2021", title: "Steel Ribs", location: "Chicago", category: "Industrial" },
  { year: "2020", title: "Stone Origin", location: "Oslo", category: "Minimalism" },
];

export default function ArchivePage() {
  return (
    <main className="bg-[#050505] min-h-screen flex flex-col">
      <section className="pt-48 px-[10%] flex-grow">
        <header className="mb-20 border-b border-white/10 pb-10">
          <span className="text-[#d4af37] text-[0.7rem] tracking-[5px] uppercase font-montserrat">Index 01</span>
          <h1 className="font-cormorant text-6xl md:text-8xl italic font-light mt-4">The Archive.</h1>
        </header>

        <div className="space-y-0">
          {archiveItems.map((item, i) => (
            <div 
              key={i} 
              className="group flex flex-col md:flex-row justify-between items-start md:items-center py-10 border-b border-white/5 hover:bg-white/[0.02] transition-colors px-4 -mx-4 cursor-none"
            >
              <div className="flex gap-10 items-center">
                <span className="font-montserrat text-[0.6rem] text-[#d4af37] tracking-[2px]">{item.year}</span>
                <h3 className="font-cormorant text-3xl md:text-4xl font-light group-hover:italic transition-all">
                  {item.title}
                </h3>
              </div>
              <div className="mt-4 md:mt-0 flex gap-8">
                <span className="font-montserrat text-[0.6rem] opacity-40 uppercase tracking-[2px]">{item.location}</span>
                <span className="font-montserrat text-[0.6rem] opacity-40 uppercase tracking-[2px]">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}