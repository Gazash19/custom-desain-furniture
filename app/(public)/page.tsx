import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustFeatures } from "@/components/landing/TrustFeatures";
import { PortfolioGallery } from "@/components/landing/PortfolioGallery";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { BriefForm } from "@/components/landing/BriefForm";
import Link from "next/link";
import { MessageCircle, Box, MapPin, Clock, ArrowUpRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans">
      <Navbar />
      
      <main>
        <HeroSection />
        <TrustFeatures />
        <PortfolioGallery />
        <ServicesSection />
        <ProcessSection />
        <BriefForm />
      </main>

      {/* Modern Luxury Studio Footer (Bootstrap Agency Style) */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 sm:pt-20 pb-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
            
            {/* Col 1: Brand Info */}
            <div className="md:col-span-2 space-y-4">
              <Link href="/" className="inline-flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-md">
                  <Box className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                </div>
                <span className="font-heading text-2xl font-bold tracking-tight text-white">
                  PAPO<span className="text-amber-400">3D</span>
                </span>
              </Link>

              <p className="text-sm text-slate-400 max-w-md leading-relaxed font-light">
                Studio jasa desain custom furniture, visualisasi 3D photorealistic, dan gambar kerja teknis (shop drawing) mebel kayu asli sentra Jepara. Membantu pemilik rumah, desainer interior, dan workshop mewujudkan mebel presisi siap produksi.
              </p>
              
              <div className="flex items-center gap-2 text-xs text-slate-400 font-light">
                <MapPin size={14} className="text-amber-400 shrink-0" />
                <span>Jepara, Jawa Tengah &bull; Melayani pemesanan desain dari seluruh Indonesia</span>
              </div>
            </div>

            {/* Col 2: Navigasi Cepat */}
            <div className="space-y-3">
              <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                Navigasi Cepat
              </h4>
              <ul className="space-y-2 text-sm font-light">
                <li><Link href="#portfolio" className="hover:text-amber-400 transition-colors">Galeri Portofolio 3D</Link></li>
                <li><Link href="#features" className="hover:text-amber-400 transition-colors">Standar Keunggulan</Link></li>
                <li><Link href="#services" className="hover:text-amber-400 transition-colors">Paket Layanan Desain</Link></li>
                <li><Link href="#process" className="hover:text-amber-400 transition-colors">Tahapan Alur Kerja</Link></li>
                <li><Link href="#contact" className="hover:text-amber-400 transition-colors">Konsultasi Desain</Link></li>
              </ul>
            </div>

            {/* Col 3: Konsultasi & Layanan */}
            <div className="space-y-3">
              <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                Layanan & Chat
              </h4>
              <div className="space-y-3">
                <a 
                  href="https://wa.me/qr/BMNBVD4FHIRNO1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle size={16} />
                  <span>Chat WhatsApp Studio</span>
                  <ArrowUpRight size={14} />
                </a>

                <div className="flex items-start gap-2 text-xs text-slate-400 font-light">
                  <Clock size={14} className="text-amber-400 shrink-0 mt-0.5" />
                  <span>Buka Senin - Sabtu (08.00 - 21.00 WIB) untuk konsultasi dimensi, layout, & estimasi desain.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} PAPO3D — Custom Furniture 3D Design Studio. Seluruh hak cipta dilindungi.</p>
            <p className="font-light text-slate-400">Presisi Konstruksi &bull; Estetis &bull; Siap Produksi</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button with Radar Pulse */}
      <a
        href="https://wa.me/qr/BMNBVD4FHIRNO1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Konsultasi via WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400/40 animate-ping pointer-events-none group-hover:hidden"></span>
        <MessageCircle size={28} className="relative z-10 fill-white stroke-none" />
      </a>
    </div>
  );
}
