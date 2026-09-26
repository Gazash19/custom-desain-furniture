"use client";

import { useState, useEffect } from "react";
import { dummyPortfolios } from "@/lib/data-dummy";
import { MessageCircle, X, Sparkles, ArrowUpRight } from "lucide-react";
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
  { id: "Semua", label: "Semua" },
  { id: "Living", label: "Ruang Tamu" },
  { id: "Dining", label: "Ruang Makan" },
  { id: "Bedroom", label: "Kamar Tidur" },
  { id: "Kitchen", label: "Dapur & Kitchen" },
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
    <section id="portfolio" className="py-24 sm:py-28 bg-[#faf8f5]">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header - Clean & Minimalist */}
        <div className="text-center mb-14 sm:mb-18 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-3">Galeri Karya</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-stone-900 tracking-tight mb-4">
            Portofolio Desain Custom
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
            Kumpulan hasil rancangan desain mebel custom dan visualisasi 3D yang dirancang dengan detail proporsi kayu serta material autentik.
          </p>
        </div>

        {/* Minimalist Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-14 sm:mb-16">
          {categoryTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? "bg-stone-900 text-white shadow-sm" 
                    : "bg-white text-stone-600 border border-stone-200/80 hover:border-stone-400 hover:text-stone-900"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Big & Clean Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredPortfolios.map((item) => {
            const rawThumb = item.images && item.images.length > 0 ? item.images[0] : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200";
            const imageSrc = formatImageUrl(rawThumb);

            return (
              <div 
                key={item.id} 
                onClick={() => setSelectedItem(item)}
                className="group relative rounded-2xl bg-white overflow-hidden border border-stone-200/70 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                {/* Large Photo Showcase */}
                <div className="relative aspect-[16/11] overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={imageSrc} 
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Clean Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 text-[11px] font-medium tracking-wide rounded-full bg-stone-950/70 text-white backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Corner View Icon on Hover */}
                  <div className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-white text-stone-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Clean & Elegant Caption */}
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-light">
                    <span>{item.style}</span>
                    <span>{item.softwareUsed || '3ds Max & Corona'}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-stone-900 group-hover:text-amber-800 transition-colors font-normal leading-snug">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-stone-500 text-xs sm:text-sm font-light line-clamp-2 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Clean Modal Lightbox Preview */}
      {selectedItem && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedItem(null);
          }}
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col my-auto max-h-[90vh]">
            
            {/* Modal Image Header */}
            <div className="relative bg-stone-950 w-full overflow-hidden flex items-center justify-center max-h-[48vh] sm:max-h-[52vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={formatImageUrl(selectedItem.images[0])} 
                alt={selectedItem.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full max-h-[48vh] sm:max-h-[52vh] object-contain sm:object-cover" 
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white transition-all shadow-md z-20"
                aria-label="Tutup"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-4 left-5 z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-stone-900/85 text-white text-xs font-medium backdrop-blur-md shadow-md">
                  {selectedItem.category} &bull; {selectedItem.style}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-4">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal">{selectedItem.title}</h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1 font-light">
                  Software Desain: <span className="font-medium text-stone-700">{selectedItem.softwareUsed || '3ds Max, Corona Renderer'}</span>
                </p>
              </div>

              {selectedItem.description && (
                <p className="text-sm text-stone-600 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200/70 font-light">
                  {selectedItem.description}
                </p>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-stone-100">
                <p className="text-xs text-stone-500 font-light">
                  Ingin membuat desain furnitur dengan konsep serupa?
                </p>
                <a
                  href="https://wa.me/qr/BMNBVD4FHIRNO1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md"
                >
                  <MessageCircle size={16} />
                  <span>Konsultasikan via WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
