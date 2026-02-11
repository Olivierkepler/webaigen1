interface LightboxProps {
    src: string;
    onClose: () => void;
  }
  
  export default function Lightbox({ src, onClose }: LightboxProps) {
    return (
      <div 
        className="fixed inset-0 bg-black/95 z-[11000] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300 transition-all"
        onClick={onClose}
      >
        <button 
          className="absolute top-10 right-10 text-white text-4xl font-thin hover:text-[#d4af37] transition-colors"
          aria-label="Close"
        >
          &times;
        </button>
        <img 
          src={src} 
          alt="Architectural Preview" 
          className="max-w-full max-h-[85vh] border border-[#d4af37]/20 object-contain shadow-2xl" 
        />
      </div>
    );
  }