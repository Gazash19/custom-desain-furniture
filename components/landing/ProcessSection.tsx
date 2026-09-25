import { MessageCircle, Cuboid, MonitorPlay, CheckCircle2 } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Konsultasi & Ukuran',
      description: 'Diskusikan referensi foto, model furniture yang diinginkan, dan ukuran ruangan via WhatsApp.',
      icon: <MessageCircle className="w-6 h-6 text-amber-300" />
    },
    {
      number: '02',
      title: 'Pemodelan 3D Custom',
      description: 'Pembuatan konsep bentuk 3D sesuai proporsi ruangan dan estetika mebel kayu presisi.',
      icon: <Cuboid className="w-6 h-6 text-amber-300" />
    },
    {
      number: '03',
      title: 'Review & Revisi',
      description: 'Penyesuaian tekstur serat kayu, warna finishing, aksesoris, hingga desain sesuai keinginan Anda.',
      icon: <MonitorPlay className="w-6 h-6 text-amber-300" />
    },
    {
      number: '04',
      title: 'Penyerahan File Final',
      description: 'File gambar 3D High-Res + dokumen PDF gambar kerja teknis siap diserahkan ke tukang bengkel.',
      icon: <CheckCircle2 className="w-6 h-6 text-amber-300" />
    }
  ];

  return (
    <section id="process" className="py-24 sm:py-28 bg-stone-900 text-white relative">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">Alur Pengerjaan</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight mb-4">
            Cara Mudah Pesan Desain Furniture
          </h2>
          <p className="text-stone-400 text-sm sm:text-base font-light leading-relaxed">
            Proses cepat, transparan, dan komunikatif dari ide sampai desain siap dibuat.
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
