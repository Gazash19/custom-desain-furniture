"use client";

import { MessageCircle, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";

export function BriefForm() {
  return (
    <section id="contact" className="py-24 sm:py-28 bg-[#faf8f5] border-t border-stone-200/60">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Main Consultation Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-stone-200/80 shadow-xl overflow-hidden p-8 sm:p-14 text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Konsultasi Gratis</span>
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-stone-900 tracking-tight">
              Punya Rencana Bikin Mebel Custom?
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
              Kirimkan foto ruangan, coretan sketsa kasar, atau referensi Pinterest Anda. Kami bantu buatkan desain 3D dan gambar kerjanya.
            </p>
          </div>

          {/* Big WhatsApp CTA Button */}
          <div className="pt-2">
            <a
              href="https://wa.me/qr/BMNBVD4FHIRNO1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-base sm:text-lg shadow-xl shadow-emerald-900/20 hover:scale-105 transition-all duration-300"
            >
              <MessageCircle size={22} />
              <span>Konsultasi via WhatsApp</span>
              <ArrowRight size={18} />
            </a>
            <p className="text-xs text-stone-400 mt-3 font-light">
              Klik untuk langsung terhubung ke chat WhatsApp resmi studio kami.
            </p>
          </div>

          {/* 3 Studio Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-stone-100 text-left">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
              <div className="flex items-center gap-2 text-stone-900 font-medium text-sm">
                <MessageCircle size={16} className="text-emerald-700" />
                <span>Konsultasi & Estimasi Cepat</span>
              </div>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Diskusikan kebutuhan desain dan estimasi biaya pengerjaan tanpa komitmen awal.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
              <div className="flex items-center gap-2 text-stone-900 font-medium text-sm">
                <MapPin size={16} className="text-amber-800" />
                <span>Keahlian Asli Jepara</span>
              </div>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Pemahaman mendalam konstruksi kayu solid & mebel modern berstandar ekspor.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
              <div className="flex items-center gap-2 text-stone-900 font-medium text-sm">
                <Clock size={16} className="text-stone-700" />
                <span>Respon Ramah & Cepat</span>
              </div>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Senin - Sabtu (08.00 - 21.00 WIB). Siap melayani pemesanan desain dari seluruh kota di Indonesia.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
