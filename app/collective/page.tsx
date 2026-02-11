"use client";
import Footer from "../components/Footer";

const members = [
  { name: "Elias Thorne", role: "Principal Architect", origin: "London", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" },
  { name: "Sanae Ito", role: "Lead Curator", origin: "Tokyo", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" },
  { name: "Marcus Vane", role: "Structural Lead", origin: "Oslo", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80" },
];

export default function CollectivePage() {
  return (
    <main className="bg-[#050505] min-h-screen flex flex-col">
      <section className="pt-48 px-[10%] flex-grow pb-24">
        <div className="max-w-2xl mb-32">
          <span className="text-[#d4af37] text-[0.7rem] tracking-[5px] uppercase font-montserrat">The Minds</span>
          <h1 className="font-cormorant text-6xl md:text-8xl italic font-light mt-4">Collective.</h1>
          <p className="font-montserrat mt-8 text-white/50 leading-loose tracking-wide">
            A global network of structural philosophers, dedicated to the preservation 
            and evolution of the monolith. We don't build spaces; we archive the soul of the structure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {members.map((member, i) => (
            <div key={i} className={`group ${i === 1 ? 'md:mt-24' : ''}`}>
              <div className="overflow-hidden bg-[#111] aspect-[3/4] mb-6">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <h3 className="font-cormorant text-2xl font-light underline underline-offset-8 decoration-[#d4af37]/30">
                {member.name}
              </h3>
              <p className="font-montserrat text-[0.6rem] uppercase tracking-[3px] mt-4 opacity-40">
                {member.role} — {member.origin}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}