import { Compass, Sparkles, FileText, CheckCircle2, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';

export function TrustFeatures() {
  const features = [
    {
      icon: <Compass className="w-6 h-6 text-amber-400" />,
      title: "Skala & Dimensi Akurat 1:1",
      description: "Dihitung teliti menyesuaikan ketebalan kayu, ruang plong dinding, serta sirkulasi ergonomis pengguna.",
    },
    {
      icon: <Eye className="w-6 h-6 text-amber-400" />,
      title: "Render Fotorealistik 3D",
      description: "Visualisasi cahaya, bayangan, dan serat urat kayu nyata sehingga Anda tahu persis wujud mebel sebelum dibuat.",
    },
    {
      icon: <FileText className="w-6 h-6 text-amber-400" />,
      title: "Shop Drawing Siap Cetak (PDF)",
      description: "Dilengkapi tampak potongan, notasi ukuran milimeter, hingga spesifikasi aksesoris engsel dan rel laci.",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-amber-400" />,
      title: "Keahlian Asli Sentra Jepara",
      description: "Memahami karakter konstruksi kayu jati, mahoni, plywood, HPL, hingga finishing duco berstandar ekspor.",
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-24 bg-[#0E131F] border-y border-slate-800/80 relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={13} />
            <span>Standar Studio Kami</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Mengapa Memilih PAPO3D?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed">
            Menjembatani ide kreatif Anda dengan realisasi fisik workshop tanpa risiko miskomunikasi teknis.
          </p>
        </div>

        {/* Feature Cards Grid (Bootstrap Modern Agency Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-amber-500/40 hover:bg-slate-900 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-800/60 flex items-center gap-2 text-xs text-amber-400/80 font-medium">
                <CheckCircle2 size={14} className="text-amber-400" />
                <span>Terjamin Presisi</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
