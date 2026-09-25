import { MessageCircle, Cuboid, MonitorPlay, CheckCircle2 } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Konsultasi Konsep',
      description: 'Diskusikan referensi gambar, ukuran ruangan, dan estimasi waktu melalui chat WhatsApp.',
      icon: <MessageCircle className="w-6 h-6 text-amber-300" />
    },
    {
      number: '02',
      title: 'Pemodelan 3D Presisi',
      description: 'Pembuatan struktur 3D sesuai skala dimensi riil untuk memastikan proporsi furnitur akurat.',
      icon: <Cuboid className="w-6 h-6 text-amber-300" />
    },
    {
      number: '03',
      title: 'Render & Penyesuaian',
      description: 'Aplikasi tekstur kayu, pencahayaan alami, dan sesi revisi hingga desain sesuai ekspektasi.',
      icon: <MonitorPlay className="w-6 h-6 text-amber-300" />
    },
    {
      number: '04',
      title: 'Penyerahan File Final',
      description: 'Penyerahan file render High-Resolution dan dokumen PDF gambar kerja siap workshop.',
      icon: <CheckCircle2 className="w-6 h-6 text-amber-300" />
    }
  ];

  return (
    <section id="process" className="py-24 sm:py-28 bg-stone-900 text-white relative">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">Alur Kerja</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight mb-4">
            Tahapan Pengerjaan Rapi
          </h2>
          <p className="text-stone-400 text-sm sm:text-base font-light leading-relaxed">
            Transparan, terukur, dan komunikatif dari konsep awal hingga file siap produksi.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative p-7 bg-stone-800/80 rounded-2xl border border-stone-700/80 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Subtle Step Number */}
              <div className="absolute top-4 right-5 text-4xl font-serif font-light text-stone-700 select-none group-hover:text-amber-500/30 transition-colors">
                {step.number}
              </div>

              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-stone-900 border border-stone-700 flex items-center justify-center">
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-normal text-white mb-2">{step.title}</h3>
                  <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
