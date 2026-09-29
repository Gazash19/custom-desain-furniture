"use client";

import { useState, useEffect } from "react";
import { dummyPortfolios } from "@/lib/data-dummy";
import { MessageCircle, X, ArrowUpRight, Layers, Eye, Cpu, Compass } from "lucide-react";
import { formatImageUrl } from "@/lib/utils";

interface Portfolio {
  id: string;
  title: string;
  category: string;
  style: string;
  softwareUsed?: string;
  images: string[];
  description?: string;
}

const categoryTabs = [
  { id: "Semua", label: "Semua Karya" },
  { id: "Living", label: "Ruang Tamu" },
  { id: "Dining", label: "Ruang Makan" },
  { id: "Bedroom", label: "Kamar Tidur" },
  { id: "Kitchen", label: "Kitchen Set" },
  { id: "Commercial", label: "Komersial & Kafe" },
];

export function PortfolioGallery() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>(dummyPortfolios);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedItem, setSelectedItem] = useState<Portfolio | null>(null);

  useEffect(() => {
    fetch('/api/portfolios')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setPortfolios(data);
        }
      })
      .catch(err => {
        console.error('Menggunakan data dummy default:', err);
      });
  }, []);

  // Lock body scroll saat modal foto terbuka & dengarkan tombol Escape
  useEffect(() => {
    if (selectedItem) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedItem(null);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedItem]);

  const filteredPortfolios = activeCategory === "Semua" 
    ? portfolios 
    : portfolios.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="portfolio" className="py-24 sm:py-28 bg-[#F4F0EB] relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDFBF8] border border-[#DDD6CE] text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
            <Layers size={13} />
            <span>Koleksi Render & Gambar Kerja</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight mb-4">
            Galeri Portofolio Pilihan
          </h2>
          <p className="text-[#57534E] text-sm sm:text-base font-normal leading-relaxed">
            Eksplorasi ragam rancangan mebel kustom, visualisasi 3D fotorealistis, dan gambar kerja teknis presisi tinggi.
          </p>
        </div>

        {/* Category Filter Pills (Warm Neutral) */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-14">
          {categoryTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? "bg-[#1C1917] text-white shadow-md scale-105" 
                    : "bg-[#FDFBF8] text-[#57534E] border border-[#DDD6CE] hover:border-[#1C1917] hover:text-[#1C1917]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredPortfolios.map((item) => {
            const displayImg = formatImageUrl(item.images?.[0] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc');
            
            return (
              <div 
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-[#FDFBF8] border border-[#DDD6CE] hover:border-amber-800/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with Aspect Ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={displayImg} 
                    alt={item.title} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  
                  {/* Hover Overlay with Action Button */}
                  <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-amber-800/90 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                      <Eye size={14} />
                      <span>Lihat Detail Desain</span>
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-[#FDFBF8]/95 backdrop-blur-md text-amber-900 border border-amber-800/20 shadow-xs">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-[#1C1917] group-hover:text-amber-800 transition-colors line-clamp-1 mb-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-[#57534E] text-xs sm:text-sm font-normal line-clamp-2 leading-relaxed mb-4">
                      {item.description || 'Desain furnitur custom presisi lengkap dengan detail konstruksi siap bengkel.'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EAE4DC] flex items-center justify-between text-xs text-[#78716C]">
                    <span className="font-medium text-stone-600">{item.style || 'Modern Custom'}</span>
                    <span className="inline-flex items-center gap-1 text-amber-800 font-semibold group-hover:translate-x-0.5 transition-transform">
                      <span>Detail</span>
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox / Detail Modal */}
        {selectedItem && (
          <div 
            className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
            onClick={() => setSelectedItem(null)}
          >
            <div 
              className="bg-[#FDFBF8] border border-[#DDD6CE] rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#1C1917]/80 hover:bg-[#1C1917] text-white flex items-center justify-center transition-colors shadow-md"
                aria-label="Tutup popup"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Modal Image */}
                <div className="relative aspect-[4/3] md:aspect-auto md:h-full bg-stone-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={formatImageUrl(selectedItem.images?.[0] || '')} 
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <div className="absolute bottom-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FDFBF8]/95 text-amber-900 border border-amber-800/30">
                      {selectedItem.category}
                    </span>
                  </div>
                </div>

                {/* Modal Detail Info */}
                <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-amber-800">
                        {selectedItem.style || 'Custom Woodcraft'}
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1">
                        {selectedItem.title}
                      </h3>
                    </div>

                    <p className="text-[#57534E] text-sm sm:text-base font-normal leading-relaxed">
                      {selectedItem.description || 'Desain 3D custom mebel dengan skala presisi tinggi. Dapat dipesan dengan penyesuaian dimensi dan material sesuai ukuran ruangan Anda.'}
                    </p>

                    <div className="p-4 rounded-xl bg-[#F4F0EB] border border-[#DDD6CE] space-y-2 text-xs">
                      <div className="flex items-center justify-between text-stone-600">
                        <span className="flex items-center gap-1.5">
                          <Cpu size={14} className="text-amber-800" />
                          <span>Software Visualisasi:</span>
                        </span>
                        <span className="text-[#1C1917] font-semibold">{selectedItem.softwareUsed || '3ds Max, Corona'}</span>
                      </div>
                      <div className="flex items-center justify-between text-stone-600">
                        <span className="flex items-center gap-1.5">
                          <Compass size={14} className="text-amber-800" />
                          <span>Status Gambar:</span>
                        </span>
                        <span className="text-emerald-700 font-semibold">Siap Gambar Kerja (PDF)</span>
                      </div>
                    </div>
                  </div>

                  {/* Order via WhatsApp Action Button */}
                  <div className="pt-4 border-t border-[#EAE4DC]">
                    <a
                      href={`https://wa.me/qr/BMNBVD4FHIRNO1?text=${encodeURIComponent(`Halo PAPO3D, saya tertarik dengan model desain: "${selectedItem.title}" (${selectedItem.category}). Bisa konsultasi penyesuaian ukuran dan biayanya?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all hover:scale-102"
                    >
                      <MessageCircle size={18} className="fill-white stroke-none" />
                      <span>Pesan / Konsultasi Model Ini via WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
