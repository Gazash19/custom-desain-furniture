import Link from 'next/link';
import { ArrowDown, MessageCircle, Sparkles, CheckCircle2, Layers } from 'lucide-react';

export function HeroSection() {
  return (
    <section 
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop')" }}
    >
      {/* Warm Balanced Overlay (Not too dark, not too bright) */}
      <div className="absolute inset-0 bg-[#F4F0EB]/93 backdrop-blur-[2px]"></div>

      {/* Subtle Warm Radial Ambient Light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-amber-200/40 via-orange-100/30 to-amber-100/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-5xl relative z-10 flex flex-col items-center text-center">
        
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FDFBF8] border border-[#DDD6CE] text-amber-900 text-xs sm:text-sm font-medium mb-8 shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-700"></span>
          </span>
          <span className="tracking-wide">Studio Spesialis Desain Mebel 3D & Shop Drawing Jepara</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1C1917] mb-6 max-w-4xl leading-[1.14]">
          Wujudkan Mebel Custom <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 bg-clip-text text-transparent">
            Visual 3D Nyata & Presisi
          </span>{" "}
          Sebelum Produksi
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-[#57534E] font-normal max-w-2xl mb-10 leading-relaxed">
          Hindari salah ukuran dan kecewa hasil jadi. Kami hadirkan visualisasi 3D fotorealistis lengkap dengan dimensi milimeter dan gambar kerja detail siap dieksekusi tukang workshop.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
          <a
            href="https://wa.me/qr/BMNBVD4FHIRNO1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-amber-900/15 hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-sm sm:text-base group"
          >
            <MessageCircle size={19} className="fill-white stroke-none" />
            <span>Konsultasi Gratis via WhatsApp</span>
          </a>

          <Link
            href="#portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-[#292524] bg-[#FDFBF8] hover:bg-white border border-[#D5CFC7] hover:border-amber-700/60 shadow-sm transition-all text-sm sm:text-base"
          >
            <Layers size={18} className="text-amber-800" />
            <span>Jelajahi Portofolio</span>
          </Link>
        </div>

        {/* Trust Stats Bar (Warm Sandstone Balanced) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl p-5 sm:p-7 rounded-2xl bg-[#FDFBF8]/95 border border-[#DDD6CE] shadow-xl shadow-stone-900/5">
          <div className="text-center p-3 border-r border-[#E7E2DA] last:border-none">
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1C1917]">350+</div>
            <div className="text-[11px] sm:text-xs text-[#78716C] font-medium mt-1">Karya Desain Selesai</div>
          </div>

          <div className="text-center p-3 md:border-r border-[#E7E2DA] last:border-none">
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-amber-800">100%</div>
            <div className="text-[11px] sm:text-xs text-[#78716C] font-medium mt-1">Presisi Skala Milimeter</div>
          </div>

          <div className="text-center p-3 border-r border-[#E7E2DA] last:border-none">
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1C1917]">PDF & 3D</div>
            <div className="text-[11px] sm:text-xs text-[#78716C] font-medium mt-1">Gambar Siap Cetak</div>
          </div>

          <div className="text-center p-3 last:border-none">
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-amber-800">Jepara</div>
            <div className="text-[11px] sm:text-xs text-[#78716C] font-medium mt-1">Standar Kayu Ekspor</div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <Link
          href="#portfolio"
          className="text-stone-400 hover:text-amber-800 transition-colors p-2 mt-12 hidden sm:block animate-bounce"
          aria-label="Scroll ke portofolio"
        >
          <ArrowDown className="w-5 h-5" />
        </Link>

      </div>
    </section>
  );
}
