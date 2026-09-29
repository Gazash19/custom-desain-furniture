"use client";

import { MessageCircle, MapPin, Clock, ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";

export function BriefForm() {
  return (
    <section id="contact" className="py-24 sm:py-28 bg-[#EAE4DC] border-t border-[#DDD6CE] relative overflow-hidden">
      
      {/* Subtle warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-200/50 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 relative z-10">
        
        {/* Main Consultation Card */}
        <div className="rounded-3xl bg-[#FDFBF8] border border-[#DDD6CE] shadow-2xl p-8 sm:p-14 text-center space-y-8 relative overflow-hidden">
          
          {/* Top amber accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800"></div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-wider shadow-2xs">
            <Sparkles size={14} />
            <span>Konsultasi Desain Gratis</span>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight leading-tight">
              Siap Mewujudkan Desain Mebel Custom Anda?
            </h2>
            <p className="text-[#57534E] text-sm sm:text-base font-normal leading-relaxed">
              Kirimkan foto ruangan, coretan sketsa kasar, atau referensi Pinterest Anda. Kami siap hitung proporsi, buatkan 3D fotorealistis, dan gambar kerja teknisnya.
            </p>
          </div>

          {/* Big WhatsApp CTA Button */}
          <div className="pt-2 flex flex-col items-center">
            <a
              href="https://wa.me/qr/BMNBVD4FHIRNO1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base sm:text-lg shadow-xl shadow-emerald-900/15 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group"
            >
              <MessageCircle size={22} className="fill-white stroke-none" />
              <span>Mulai Konsultasi via WhatsApp</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <div className="flex items-center gap-2 text-xs text-[#78716C] mt-4 font-normal">
              <Zap size={14} className="text-amber-700" />
              <span>Respon Cepat &bull; Tanpa Biaya Konsultasi Awal &bull; Melayani Seluruh Indonesia</span>
            </div>
          </div>

          {/* 3 Studio Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-10 border-t border-[#EAE4DC] text-left">
            <div className="p-4.5 rounded-2xl bg-[#F4F0EB] border border-[#DDD6CE] space-y-1.5">
              <div className="flex items-center gap-2 text-[#1C1917] font-heading font-semibold text-sm">
                <Clock size={16} className="text-amber-800" />
                <span>Diskusi & Estimasi Cepat</span>
              </div>
              <p className="text-xs text-[#57534E] font-normal leading-relaxed">
                Kirim foto ruangan dan dapatkan estimasi dimensi serta gambaran pengerjaan langsung.
              </p>
            </div>

            <div className="p-4.5 rounded-2xl bg-[#F4F0EB] border border-[#DDD6CE] space-y-1.5">
              <div className="flex items-center gap-2 text-[#1C1917] font-heading font-semibold text-sm">
                <MapPin size={16} className="text-amber-800" />
                <span>Pengalaman Sentra Jepara</span>
              </div>
              <p className="text-xs text-[#57534E] font-normal leading-relaxed">
                Pemahaman mendalam tentang anatomi sambungan kayu, finishing duco/melamik, dan standar workshop.
              </p>
            </div>

            <div className="p-4.5 rounded-2xl bg-[#F4F0EB] border border-[#DDD6CE] space-y-1.5">
              <div className="flex items-center gap-2 text-[#1C1917] font-heading font-semibold text-sm">
                <ShieldCheck size={16} className="text-amber-800" />
                <span>Garansi Akurasi Produksi</span>
              </div>
              <p className="text-xs text-[#57534E] font-normal leading-relaxed">
                Gambar kerja kami dibuat dengan notasi milimeter presisi sehingga tukang kayu tinggal eksekusi.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
