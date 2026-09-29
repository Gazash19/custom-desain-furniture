import { Box, Ruler, Palette, CheckCircle2, ArrowRight, Sparkles, MessageCircle } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      title: "Desain Mebel Custom Satuan",
      subtitle: "Living, Dining & Bedroom",
      badge: "Paling Populer",
      description: "Rancangan 3D presisi untuk meja makan, kursi, lemari pakaian wardrobe, dipan tempat tidur, credenza, dan konsol custom.",
      icon: <Box className="w-7 h-7 text-amber-800" />,
      features: [
        "Visualisasi 3D Photorealistis High-Res",
        "Penyesuaian ukuran dimensi milimeter",
        "Pilihan jenis kayu & warna finishing",
        "Revisi bentuk & proporsi terpandu"
      ]
    },
    {
      title: "Kitchen Set & Built-in Kabinet",
      subtitle: "Dapur & Storage Multifungsi",
      badge: "Ergonomis",
      description: "Perencanaan tata letak dapur modern, kabinet atas & bawah, counter bar pulau, partisi sekat ruang, dan lemari bawah tangga.",
      icon: <Palette className="w-7 h-7 text-amber-800" />,
      features: [
        "Analisis alur segitiga kerja dapur",
        "Detail kompartemen & rel laci",
        "Visualisasi lighting LED strip terintegrasi",
        "Rekomendasi bahan solid wood & plywood HPL"
      ]
    },
    {
      title: "Gambar Kerja Teknis (Shop Drawing)",
      subtitle: "Standar Bengkel Kayu Jepara",
      badge: "Siap Tukang",
      description: "Dokumen teknis 2D lengkap format PDF siap cetak untuk pedoman tukang kayu di workshop agar pengerjaan tidak meleset.",
      icon: <Ruler className="w-7 h-7 text-amber-800" />,
      features: [
        "Gambar tampak depan, samping & atas",
        "Potongan konstruksi & sistem sambungan",
        "Notasi ukuran lengkap tanpa tebak-tebakan",
        "Bill of materials & spesifikasi hardware"
      ]
    },
  ];

  return (
    <section id="services" className="py-24 sm:py-28 bg-[#EAE4DC] border-t border-[#DDD6CE] relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDFBF8] border border-[#DDD6CE] text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
            <Sparkles size={13} />
            <span>Layanan Profesional</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight mb-4">
            Solusi Desain Lengkap Siap Produksi
          </h2>
          <p className="text-[#57534E] text-sm sm:text-base font-normal leading-relaxed">
            Dari sekadar coretan ide kasar hingga file siap eksekusi workshop pengrajin mebel.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-7 sm:p-8 rounded-2xl bg-[#FDFBF8] border border-[#DDD6CE] hover:border-amber-800/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
            >
              <div>
                {/* Header card */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/70 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-100/60 transition-all duration-300">
                    {service.icon}
                  </div>
                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 border border-amber-300/40">
                    {service.badge}
                  </span>
                </div>
                
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#1C1917] mb-1 group-hover:text-amber-800 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-amber-900 font-semibold mb-4">
                  {service.subtitle}
                </p>
                
                <p className="text-[#57534E] text-xs sm:text-sm font-normal leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features checklist */}
                <ul className="space-y-2.5 pt-4 border-t border-[#EAE4DC] mb-8">
                  {service.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-stone-700 font-normal">
                      <CheckCircle2 size={15} className="text-amber-800 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Action Link */}
              <a
                href={`https://wa.me/qr/BMNBVD4FHIRNO1?text=${encodeURIComponent(`Halo PAPO3D, saya tertarik dengan layanan: "${service.title}". Mau konsultasi konsep mebel saya.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#1C1917] hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm"
              >
                <MessageCircle size={16} />
                <span>Konsultasi Paket Ini</span>
                <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
