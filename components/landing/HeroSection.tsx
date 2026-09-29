import Link from 'next/link';
import { ArrowDown, MessageCircle, Sparkles, CheckCircle2, Layers, Award, ShieldCheck } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 overflow-hidden bg-[#0B0F17]">
      
      {/* Ambient Radial Mesh Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-amber-600/15 via-amber-500/10 to-indigo-600/10 blur-[130px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-amber-600/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      {/* Decorative Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      ></div>

      <div className="container mx-auto max-w-5xl relative z-10 flex flex-col items-center text-center">
        
        {/* Top Floating Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium mb-8 shadow-xl shadow-amber-500/5 hover:border-amber-400 transition-colors">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="tracking-wide">Studio Spesialis Desain Mebel 3D & Shop Drawing Jepara</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl leading-[1.12]">
          Wujudkan Mebel Custom <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            Visual 3D Nyata & Presisi
          </span>{" "}
          Sebelum Produksi
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 font-light max-w-2xl mb-10 leading-relaxed">
          Hindari salah ukuran dan kecewa hasil jadi. Kami hadirkan visualisasi 3D fotorealistis lengkap dengan dimensi milimeter dan gambar kerja detail siap dieksekusi tukang workshop.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
          <a
            href="https://wa.me/qr/BMNBVD4FHIRNO1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold px-8 py-4 rounded-full shadow-xl shadow-amber-500/25 hover:shadow-amber-500/35 hover:scale-105 active:scale-95 transition-all text-sm sm:text-base group"
          >
            <MessageCircle size={19} className="fill-slate-950 stroke-none" />
            <span>Konsultasi Gratis via WhatsApp</span>
          </a>

          <Link
            href="#portfolio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 hover:text-white transition-all text-sm sm:text-base backdrop-blur-md"
          >
            <Layers size={18} className="text-amber-400" />
            <span>Jelajahi Portofolio</span>
          </Link>
        </div>

        {/* Trust Stats Bar (Modern Bootstrap Style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl p-5 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl">
          <div className="text-center p-3 border-r border-slate-800/80 last:border-none">
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-white">350+</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">Karya Desain Selesai</div>
          </div>

          <div className="text-center p-3 md:border-r border-slate-800/80 last:border-none">
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-amber-400">100%</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">Presisi Skala Milimeter</div>
          </div>

          <div className="text-center p-3 border-r border-slate-800/80 last:border-none">
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-white">PDF & 3D</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">Gambar Siap Cetak</div>
          </div>

          <div className="text-center p-3 last:border-none">
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-amber-400">Jepara</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1">Standar Kayu Ekspor</div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <Link
          href="#portfolio"
          className="text-slate-500 hover:text-amber-400 transition-colors p-2 mt-12 hidden sm:block animate-bounce"
          aria-label="Scroll ke portofolio"
        >
          <ArrowDown className="w-5 h-5" />
        </Link>

      </div>
    </section>
  );
}

