import Link from 'next/link';
import { ArrowDown, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section 
      className="relative flex items-center justify-center min-h-[90vh] bg-center bg-cover pt-20"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop')" }}
    >
      {/* Warm natural dark overlay */}
      <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-[1px]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center py-16 sm:py-20">
        
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-200 text-xs sm:text-sm font-medium mb-6">
          <Sparkles size={14} className="text-amber-300" />
          <span>Studio Visualisasi 3D & Desain Furnitur Jepara</span>
        </div>

        {/* Main Heading - Clean & Editorial */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white mb-6 tracking-tight max-w-4xl font-normal leading-tight">
          Visualisasi Furnitur 3D <br />
          <span className="italic font-light text-amber-200">Presisi & Bernilai Seni</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-stone-200 font-light max-w-2xl mb-10 leading-relaxed">
          Mengubah konsep furnitur kayu dan penataan interior Anda menjadi render 3D fotorealistik serta gambar kerja teknis siap produksi bengkel.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14 w-full sm:w-auto">
          <a 
            href="https://wa.me/qr/BMNBVD4FHIRNO1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-8 py-3.5 rounded-full font-medium shadow-lg shadow-amber-900/40 transition-all hover:scale-105 text-sm sm:text-base"
          >
            <MessageCircle size={18} />
            <span>Konsultasi via WhatsApp</span>
          </a>
          <Link 
            href="#portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 transition-all text-sm sm:text-base"
          >
            <span>Lihat Galeri Portofolio</span>
          </Link>
        </div>

        {/* 3 Minimalist Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-white/15 max-w-3xl w-full text-stone-300 text-xs sm:text-sm font-light">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 size={16} className="text-amber-300" />
            <span>Skala & Dimensi Milimeter</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 size={16} className="text-amber-300" />
            <span>Pencahayaan Fotorealistik</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 size={16} className="text-amber-300" />
            <span>Gambar Kerja Siap Tukang</span>
          </div>
        </div>

        {/* Down Arrow */}
        <Link 
          href="#portfolio"
          className="text-stone-300 hover:text-white transition-colors animate-bounce p-2 mt-12 hidden sm:block"
          aria-label="Gulir ke galeri"
        >
          <ArrowDown className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
