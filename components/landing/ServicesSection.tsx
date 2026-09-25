import { Box, Ruler, Palette, ArrowRight } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      title: "Desain Custom Living & Bedroom",
      subtitle: "Sesuai Ukuran Ruangan",
      description: "Desain custom meja makan, kursi, lemari pakaian (wardrobe), dipan tempat tidur, dan backdrop TV minimalis modern yang disesuaikan dengan dimensi ruangan.",
      icon: <Box className="w-8 h-8 text-amber-800" />,
      tag: "Living & Bedroom"
    },
    {
      title: "Kitchen Set & Kabinet Ruang",
      subtitle: "Ergonomis & Fungsional",
      description: "Perencanaan layout dapur ergonomis, kitchen set kabinet atas & bawah, rak partisi, counter bar, dan storage multifungsi.",
      icon: <Palette className="w-8 h-8 text-amber-800" />,
      tag: "Kitchen & Pantry"
    },
    {
      title: "Gambar Kerja Teknis (Shop Drawing)",
      subtitle: "Format PDF Siap Cetak",
      description: "Gambar kerja 2D detail dengan dimensi milimeter, tampak depan-samping-atas, potongan konstruksi kayu, dan daftar kebutuhan material.",
      icon: <Ruler className="w-8 h-8 text-amber-800" />,
      tag: "Siap Bengkel Tukang"
    },
  ];

  return (
    <section id="services" className="py-24 sm:py-28 bg-white border-t border-stone-200/60">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-3">Layanan Kami</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-stone-900 tracking-tight mb-4">
            Solusi Desain Mebel Custom
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
            Dari konsep ide, sketsa kasar, hingga gambar detail siap eksekusi bengkel kayu.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-8 rounded-2xl bg-[#faf8f5] border border-stone-200/70 hover:border-amber-800/40 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-2xs border border-stone-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {service.icon}
                  </div>
                  <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50">
                    {service.tag}
                  </span>
                </div>
                
                <h3 className="font-serif text-2xl text-stone-900 mb-3 font-normal group-hover:text-amber-800 transition-colors">
                  {service.title}
                </h3>
                <p className="text-stone-600 text-sm font-light leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-200/70 flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>{service.subtitle}</span>
                <span className="w-2 h-2 rounded-full bg-amber-800/40"></span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
