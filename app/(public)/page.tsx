import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { PortfolioGallery } from "@/components/landing/PortfolioGallery";
import { BriefForm } from "@/components/landing/BriefForm";
import Link from "next/link";
import { ShieldCheck, MessageCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 selection:bg-amber-800 selection:text-white font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <PortfolioGallery />
        <ServicesSection />
        <ProcessSection />
        <BriefForm />
      </main>

      {/* Warm Japandi Minimalist Footer */}
      <footer className="bg-stone-900 text-stone-400 border-t border-stone-800/80 pt-16 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            {/* Col 1: Brand Info */}
            <div className="md:col-span-2 space-y-4">
              <span className="font-serif text-2xl tracking-tight text-white font-normal">
                Jepara<span className="font-sans font-bold text-amber-500">3D</span>
              </span>
              <p className="text-sm text-stone-400 max-w-md leading-relaxed font-light">
                Studio spesialis visualisasi render 3D fotorealistik dan gambar kerja teknis mebel kayu asli Jepara. Membantu desainer, bengkel workshop, dan pemilik rumah merealisasikan furnitur impian.
              </p>
              <div className="text-xs text-stone-500">
                Jepara, Jawa Tengah &bull; Melayani proyek desain seluruh Indonesia
              </div>
            </div>

            {/* Col 2: Navigasi Cepat */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Navigasi Halaman</h4>
              <ul className="space-y-2 text-sm font-light">
                <li><Link href="#portfolio" className="hover:text-white transition-colors">Galeri Portofolio</Link></li>
                <li><Link href="#services" className="hover:text-white transition-colors">Layanan Desain</Link></li>
                <li><Link href="#process" className="hover:text-white transition-colors">Alur Pengerjaan</Link></li>
                <li><Link href="#contact" className="hover:text-white transition-colors">Kontak Studio</Link></li>
              </ul>
            </div>

            {/* Col 3: Akses Studio */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Akses Langsung</h4>
              <div className="space-y-2.5">
                <a 
                  href="https://wa.me/qr/BMNBVD4FHIRNO1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle size={15} />
                  <span>Chat WhatsApp Resmi</span>
                </a>
                <div>
                  <Link 
                    href="/admin" 
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700/60 transition-all text-xs font-medium mt-2"
                  >
                    <ShieldCheck size={14} className="text-amber-400" />
                    <span>Panel Admin Portofolio</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>© {new Date().getFullYear()} Jepara 3D Furniture Design Studio. Hak cipta dilindungi.</p>
            <p className="font-light">Modern &bull; Presisi &bull; Estetis</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button (Hanya Icon) */}
      <a
        href="https://wa.me/qr/BMNBVD4FHIRNO1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp Studio"
        className="fixed bottom-6 right-6 z-50 w-13 h-13 sm:w-14 sm:h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping group-hover:hidden"></span>
        <MessageCircle size={28} className="relative z-10" />
      </a>
    </div>
  );
}
