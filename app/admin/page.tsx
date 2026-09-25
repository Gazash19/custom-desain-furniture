import Link from 'next/link';
import { db } from '@/db';
import { portfolios } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { 
  Image as ImageIcon, 
  PlusCircle, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  FolderOpen 
} from 'lucide-react';
import { formatImageUrl } from '@/lib/utils';

export const revalidate = 0; // Dynamic on every request

export default async function AdminDashboard() {
  let portfolioList: any[] = [];

  try {
    portfolioList = await db.select().from(portfolios).orderBy(desc(portfolios.createdAt));
  } catch (e) {
    console.error('Error fetching portfolios in admin dashboard:', e);
  }

  const totalPortfolios = portfolioList.length;
  const categoriesSet = new Set(portfolioList.map(p => p.category));
  const totalCategories = categoriesSet.size;
  const featuredCount = portfolioList.filter(p => p.isFeatured).length;

  const recentPortfolios = portfolioList.slice(0, 6);

  return (
    <div className="space-y-8">
      
      {/* Header Banner - Warm Teak Wood Studio Style */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-stone-700/60">
        <div>
          <div className="flex items-center gap-2 mb-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={16} />
            <span>Pusat Manajemen Galeri Portofolio</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight">Dasbor Portofolio Studio</h1>
          <p className="text-stone-300 text-sm sm:text-base mt-1 max-w-2xl font-light leading-relaxed">
            Kelola katalog karya 3D furnitur studio Anda. Tambah karya baru, atur foto render dari Google Drive atau link gambar, dan tampilkan langsung di galeri depan website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/portfolio"
            className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-md transition-all hover:scale-105"
          >
            <PlusCircle size={18} />
            <span>Tambah Karya 3D</span>
          </Link>
          <Link
            href="/#portfolio"
            target="_blank"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2.5 rounded-full text-sm font-medium border border-white/20 transition-all"
          >
            <ExternalLink size={16} />
            <span>Lihat Galeri Depan</span>
          </Link>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Portfolios */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <ImageIcon size={24} />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800">Supabase</span>
          </div>
          <p className="text-sm font-medium text-stone-500">Total Karya 3D</p>
          <h3 className="font-serif text-3xl font-normal text-stone-900 mt-1">{totalPortfolios}</h3>
          <p className="text-xs text-stone-400 mt-2 flex items-center gap-1 font-light">
            <CheckCircle2 size={13} className="text-emerald-600" />
            <span>Aktif di etalase website</span>
          </p>
        </div>

        {/* Categories */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
              <FolderOpen size={24} />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">Kategori</span>
          </div>
          <p className="text-sm font-medium text-stone-500">Kategori Ruang</p>
          <h3 className="font-serif text-3xl font-normal text-stone-900 mt-1">{totalCategories || 4}</h3>
          <p className="text-xs text-stone-400 mt-2 font-light">Living, Dining, Bedroom, dll.</p>
        </div>

        {/* Featured */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100/60 text-amber-900 flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900">Highlight</span>
          </div>
          <p className="text-sm font-medium text-stone-500">Karya Unggulan</p>
          <h3 className="font-serif text-3xl font-normal text-stone-900 mt-1">{featuredCount || totalPortfolios}</h3>
          <p className="text-xs text-stone-400 mt-2 font-light">Diprioritaskan di galeri</p>
        </div>

        {/* Gallery System Status */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800">Online</span>
          </div>
          <p className="text-sm font-medium text-stone-500">Status Galeri</p>
          <h3 className="font-serif text-2xl font-normal text-stone-900 mt-1">Aktif & Sinkron</h3>
          <p className="text-xs text-stone-400 mt-2 flex items-center gap-1 font-light">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Update langsung terlihat</span>
          </p>
        </div>
      </div>

      {/* Recent Showcase Grid */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-2xs overflow-hidden">
        <div className="p-6 sm:p-7 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl text-stone-900 font-normal flex items-center gap-2">
              <Layers size={20} className="text-amber-800" />
              <span>Koleksi Karya Portofolio Terbaru</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-light mt-0.5">Daftar desain 3D furnitur yang saat ini aktif tampil di landing page</p>
          </div>
          
          <Link
            href="/admin/portfolio"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-900 transition-colors"
          >
            <span>Buka Semua & Tambah Karya</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {recentPortfolios.length === 0 ? (
          <div className="text-center py-20 px-4">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3 text-stone-400">
              <ImageIcon size={30} />
            </div>
            <h3 className="text-base font-semibold text-stone-700">Belum Ada Portofolio Tersimpan</h3>
            <p className="text-sm text-stone-400 max-w-sm mx-auto mt-1 mb-5 font-light">
              Tambahkan karya render 3D furnitur Anda ke katalog sekarang agar langsung muncul di website depan.
            </p>
            <Link
              href="/admin/portfolio"
              className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-5 py-2.5 rounded-full text-xs font-semibold transition-all shadow-sm"
            >
              <PlusCircle size={16} />
              <span>Tambah Karya Pertama</span>
            </Link>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPortfolios.map((item) => {
              const rawThumb = item.images && item.images.length > 0 ? item.images[0] : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800';
              const thumb = formatImageUrl(rawThumb);

              return (
                <div 
                  key={item.id} 
                  className="group relative rounded-2xl bg-stone-50/70 border border-stone-200/80 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/11] bg-stone-200 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={thumb} 
                      alt={item.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-stone-900/80 text-white backdrop-blur-xs shadow-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5 flex-1">
                    <h4 className="font-serif font-normal text-stone-900 text-base line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-stone-500 font-light">
                      Gaya: <span className="text-stone-700 font-medium">{item.style}</span> &bull; {item.softwareUsed || '3ds Max'}
                    </p>
                    {item.description && (
                      <p className="text-xs text-stone-400 line-clamp-2 pt-1 font-light leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="px-4 py-3 bg-white border-t border-stone-200/70 flex items-center justify-between text-xs">
                    <span className="text-stone-400 font-light">Tampil di Web</span>
                    <Link
                      href="/admin/portfolio"
                      className="font-medium text-amber-800 hover:underline flex items-center gap-1"
                    >
                      <span>Kelola</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
