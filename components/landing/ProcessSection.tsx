import { MessageCircle, Cuboid, MonitorPlay, CheckCircle2, ArrowRight } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Konsultasi Ide & Ukuran',
      description: 'Kirimkan sketsa kasar, foto ruangan, atau referensi Pinterest Anda via WhatsApp. Kami diskusikan kebutuhan dimensi & budget material.',
      icon: <MessageCircle className="w-6 h-6 text-amber-400" />
    },
    {
      number: '02',
      title: 'Pemodelan 3D Presisi',
      description: 'Penyusunan model 3D berskala milimeter dengan memperhatikan detail sambungan konstruksi kayu khas Jepara.',
      icon: <Cuboid className="w-6 h-6 text-amber-400" />
    },
    {
      number: '03',
      title: 'Review Render & Revisi',
      description: 'Kami kirimkan visualisasi render 3D fotorealistis untuk evaluasi warna finishing, jenis serat kayu, dan aksesoris handle/laci.',
      icon: <MonitorPlay className="w-6 h-6 text-amber-400" />
    },
    {
      number: '04',
      title: 'Penyerahan File Final Siap Produksi',
      description: 'Anda menerima paket gambar High-Res dan file dokumen PDF Shop Drawing lengkap siap dicetak dan diberikan ke bengkel mebel.',
      icon: <CheckCircle2 className="w-6 h-6 text-amber-400" />
    }
  ];

  return (
    <section id="process" className="py-24 sm:py-28 bg-[#0B0F17] text-white relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">Alur Kerja Sistematis</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Cara Mudah Memesan Desain 3D
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            Pengerjaan cepat, komunikatif, dan transparan dari konsep awal sampai dokumen siap bengkel.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative p-7 sm:p-8 bg-slate-900/60 rounded-2xl border border-slate-800/80 hover:border-amber-500/50 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Step Number in Background */}
              <div className="absolute top-4 right-5 font-heading text-4xl sm:text-5xl font-extrabold text-slate-800/80 select-none group-hover:text-amber-500/20 transition-colors">
                {step.number}
              </div>

              <div className="relative z-10 space-y-5">
                <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all duration-300">
                  {step.icon}
                </div>
                
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span>Langkah {step.number}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Fast CTA */}
        <div className="mt-14 text-center">
          <a
            href="https://wa.me/qr/BMNBVD4FHIRNO1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-amber-400 hover:text-amber-300 hover:underline transition-colors"
          >
            <span>Punya pertanyaan tentang alur pemesanan? Diskusikan langsung sekarang</span>
            <ArrowRight size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}
