import PortfolioTable from '@/components/admin/PortfolioTable';

export const metadata = {
  title: 'Katalog Portofolio | Admin Jepara 3D',
  description: 'Tambah, edit, dan kelola portofolio desain furnitur 3D yang tampil di website.',
};

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Katalog Portofolio 3D</h1>
        <p className="text-slate-500 text-sm sm:text-base mt-1">
          Kelola galeri visualisasi 3D studio. Setiap karya yang ditambahkan di sini akan otomatis tampil di landing page depan.
        </p>
      </div>
      
      <PortfolioTable />
    </div>
  );
}
