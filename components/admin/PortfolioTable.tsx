'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  RefreshCw, 
  Search, 
  X, 
  Check, 
  Sparkles, 
  Image as ImageIcon, 
  LayoutGrid, 
  List,
  HelpCircle,
  AlertCircle,
  Link as LinkIcon
} from 'lucide-react';
import { formatImageUrl, isGoogleDriveUrl } from '@/lib/utils';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  style: string;
  softwareUsed?: string;
  images: string[];
  description?: string;
  createdAt?: string;
}

export default function PortfolioTable() {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Living');
  const [formStyle, setFormStyle] = useState('');
  const [formSoftware, setFormSoftware] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');

  // Google Drive & Image Helper State
  const [rawInputUrl, setRawInputUrl] = useState('');
  const [isDriveDetected, setIsDriveDetected] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [showDriveTutorial, setShowDriveTutorial] = useState(false);

  const handleImageUrlChange = (val: string) => {
    setRawInputUrl(val);
    setImageLoadError(false);
    const formatted = formatImageUrl(val);
    const isDrive = isGoogleDriveUrl(val);
    setIsDriveDetected(isDrive);
    setFormImageUrl(formatted);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAddModalOpen) {
        setIsAddModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAddModalOpen]);

  const fetchPortfolios = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/portfolios');
      if (res.ok) {
        const data = await res.json();
        setPortfolios(data);
      }
    } catch (err) {
      console.error('Gagal mengambil data portofolio:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) return;

    setIsSubmitting(true);
    try {
      if (!formImageUrl) {
        alert('Silakan pilih foto render terlebih dahulu (upload dari laptop atau tempel link Google Drive).');
        setIsSubmitting(false);
        return;
      }

      const finalImageUrl = formatImageUrl(formImageUrl);
      const res = await fetch('/api/portfolios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formTitle,
          category: formCategory,
          style: formStyle.trim() || 'Modern Woodcraft',
          softwareUsed: formSoftware.trim() || '3ds Max, Corona Renderer',
          imageUrl: finalImageUrl,
          description: formDescription,
        }),
      });

      if (res.ok) {
        setFormTitle('');
        setFormStyle('');
        setFormSoftware('');
        setFormImageUrl('');
        setRawInputUrl('');
        setFormDescription('');
        setIsDriveDetected(false);
        setImageLoadError(false);
        setIsAddModalOpen(false);
        fetchPortfolios();
      } else {
        alert('Gagal menambahkan karya ke database. Periksa koneksi Supabase.');
      }
    } catch (err) {
      console.error('Error adding portfolio:', err);
      alert('Terjadi kesalahan koneksi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Hapus karya "${title}" dari galeri website?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/portfolios?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setPortfolios(prev => prev.filter(item => item.id !== id));
      } else {
        alert('Gagal menghapus karya.');
      }
    } catch (err) {
      console.error('Error deleting portfolio:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredItems = portfolios.filter(item => {
    const matchesCategory = categoryFilter === 'Semua' || item.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.style.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">

      {/* Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/80 shadow-2xs flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Cari karya furnitur, gaya, kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-700 focus:bg-white transition-all text-stone-800 placeholder-stone-400"
          />
        </div>

        {/* Categories, View Toggle & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {['Semua', 'Living', 'Dining', 'Bedroom', 'Kitchen', 'Commercial'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  categoryFilter === cat
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Mode Switcher */}
          <div className="hidden sm:flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'}`}
              title="Tampilan Grid Visual"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'}`}
              title="Tampilan Tabel Data"
            >
              <List size={16} />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium shadow-xs transition-all hover:scale-105"
          >
            <Plus size={18} />
            <span>Tambah Karya 3D</span>
          </button>

          {/* Refresh */}
          <button
            onClick={fetchPortfolios}
            disabled={loading}
            className="p-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors disabled:opacity-50"
            title="Segarkan Data"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin text-amber-800' : ''} />
          </button>
        </div>
      </div>

      {/* Main Content Showcase */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-24 text-center text-stone-400 space-y-3">
            <RefreshCw size={32} className="animate-spin text-amber-800 mx-auto" />
            <p className="text-sm font-medium font-light">Memuat karya portofolio dari Supabase...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-24 text-center px-4">
            <div className="w-16 h-16 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <ImageIcon size={30} />
            </div>
            <h3 className="text-base font-semibold text-stone-700">Tidak ada karya yang sesuai</h3>
            <p className="text-sm text-stone-400 mt-1 mb-5 font-light">
              {searchTerm || categoryFilter !== 'Semua' 
                ? 'Coba ganti filter kategori atau kata kunci pencarian Anda.' 
                : 'Belum ada karya yang diunggah ke katalog studio.'}
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-5 py-2.5 rounded-full text-xs font-medium shadow-xs"
            >
              <Plus size={16} />
              <span>Tambah Karya 3D Baru</span>
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View Mode */
          <div className="p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const thumb = item.images && item.images.length > 0 ? formatImageUrl(item.images[0]) : '';

              return (
                <div 
                  key={item.id} 
                  className="group relative rounded-2xl bg-stone-50/70 border border-stone-200/80 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/11] bg-stone-200 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={thumb} 
                      alt={item.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-stone-900/80 text-white backdrop-blur-xs shadow-xs">
                        {item.category}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      disabled={deletingId === item.id}
                      className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-md opacity-0 group-hover:opacity-100"
                      title="Hapus Karya Ini"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="p-5 space-y-1.5 flex-1">
                    <h4 className="font-serif font-normal text-stone-900 text-base sm:text-lg line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-stone-500 font-light">
                      Gaya: <span className="font-medium text-stone-700">{item.style}</span> &bull; {item.softwareUsed || '3ds Max, Corona'}
                    </p>
                    {item.description && (
                      <p className="text-xs text-stone-400 line-clamp-2 pt-1 font-light leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="px-5 py-3 bg-white border-t border-stone-200/70 flex items-center justify-between text-xs">
                    <span className="text-stone-400 font-light">Tampil di Galeri Depan</span>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      disabled={deletingId === item.id}
                      className="text-rose-600 hover:text-rose-800 font-semibold inline-flex items-center gap-1 sm:hidden"
                    >
                      <Trash2 size={14} />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View Mode */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50/80 border-b border-stone-200/80 text-[13px] font-medium text-stone-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Pratinjau & Judul</th>
                  <th className="py-4 px-6">Kategori</th>
                  <th className="py-4 px-6">Style Furnitur</th>
                  <th className="py-4 px-6">Software Desain</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {filteredItems.map((item) => {
                  const thumb = item.images && item.images.length > 0 ? formatImageUrl(item.images[0]) : '';

                  return (
                    <tr key={item.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={thumb} 
                            alt={item.title} 
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-xl object-cover border border-stone-200 shadow-2xs flex-shrink-0" 
                          />
                          <div>
                            <p className="font-serif font-normal text-stone-900 text-base">{item.title}</p>
                            {item.description && (
                              <p className="text-xs text-stone-400 line-clamp-1 max-w-xs mt-0.5 font-light">{item.description}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200/50">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-stone-600 font-light">
                        {item.style}
                      </td>
                      <td className="py-4 px-6 text-xs text-stone-500 font-light">
                        {item.softwareUsed || '3ds Max, Corona'}
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          disabled={deletingId === item.id}
                          className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Hapus Karya"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Tambah Karya Portofolio Baru */}
      {isAddModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddModalOpen(false);
          }}
        >
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header: PINNED AT TOP (Always visible in F11/fullscreen, close button always clickable!) */}
            <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 sm:py-5 border-b border-stone-200/80 bg-stone-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-amber-900 flex items-center justify-center shadow-xs">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-stone-900 font-normal">Tambah Karya Portofolio 3D</h3>
                  <p className="text-xs text-stone-500 font-light">Karya baru akan otomatis tayang di galeri depan website</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-9 h-9 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                title="Tutup (Esc)"
                aria-label="Tutup"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form id="portfolio-form" onSubmit={handleAddSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">Judul Desain / Furniture *</label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: Modern Japandi Kitchen Set"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-700 focus:bg-white transition-all text-stone-900 placeholder-stone-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">Kategori Ruang *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-700 focus:bg-white text-stone-800"
                  >
                    <option value="Living">Ruang Tamu (Living)</option>
                    <option value="Dining">Ruang Makan (Dining)</option>
                    <option value="Bedroom">Kamar Tidur (Bedroom)</option>
                    <option value="Kitchen">Dapur / Kitchen Set</option>
                    <option value="Commercial">Komersial & Kafe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">Gaya Desain</label>
                  <input
                    type="text"
                    placeholder="Contoh: Japandi, Modern Woodcraft, Klasik"
                    value={formStyle}
                    onChange={(e) => setFormStyle(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-700 focus:bg-white text-stone-800 placeholder-stone-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">Software yang Digunakan</label>
                <input
                  type="text"
                  placeholder="Contoh: 3ds Max, Corona Renderer, SketchUp, Blender"
                  value={formSoftware}
                  onChange={(e) => setFormSoftware(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-700 focus:bg-white text-stone-800 placeholder-stone-400"
                />
              </div>

              {/* URL Gambar Render (HANYA VIA LINK / GOOGLE DRIVE) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Link Foto Render (Google Drive / URL Gambar) *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowDriveTutorial(!showDriveTutorial)}
                    className="text-[11px] text-amber-800 hover:text-amber-900 font-medium inline-flex items-center gap-1 underline underline-offset-2"
                  >
                    <HelpCircle size={13} />
                    <span>{showDriveTutorial ? 'Tutup panduan' : 'Cara pakai Google Drive?'}</span>
                  </button>
                </div>

                {showDriveTutorial && (
                  <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-xs text-amber-950 space-y-2 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 font-semibold text-amber-900">
                      <Sparkles size={14} className="text-amber-700" />
                      <span>Petunjuk Link Google Drive:</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-1 text-stone-700 pl-1 leading-relaxed text-[11px]">
                      <li>Buka Google Drive &rarr; klik kanan gambar render &rarr; pilih <strong>Bagikan (Share)</strong>.</li>
                      <li>Di bagian Akses umum, ubah dari &quot;Dibatasi&quot; menjadi <strong>&quot;Siapa saja yang memiliki link&quot;</strong>.</li>
                      <li>Klik <strong>Salin link</strong> lalu tempel di kolom di bawah ini.</li>
                    </ol>
                  </div>
                )}

                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                    value={rawInputUrl || formImageUrl}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-700 focus:bg-white text-stone-800 placeholder-stone-400 font-mono"
                  />
                </div>

                {isDriveDetected && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60 font-medium">
                    <Check size={14} className="text-emerald-600 flex-shrink-0" />
                    <span>Link Google Drive valid! Gambar otomatis terhubung ke galeri.</span>
                  </div>
                )}

                {/* Live Image Preview */}
                {formImageUrl && (
                  <div className="mt-2 p-3 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="font-medium text-stone-700">Pratinjau Gambar Langsung:</span>
                      {imageLoadError ? (
                        <span className="text-rose-600 font-medium flex items-center gap-1">
                          <AlertCircle size={13} />
                          Gambar Tidak Dapat Dimuat
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-medium flex items-center gap-1">
                          <Check size={13} />
                          Gambar Berhasil Dimuat
                        </span>
                      )}
                    </div>

                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-stone-200 border border-stone-300/60 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formImageUrl}
                        alt="Pratinjau render"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={() => setImageLoadError(true)}
                        onLoad={() => setImageLoadError(false)}
                      />
                    </div>

                    {imageLoadError && (
                      <div className="p-3 bg-rose-50 border border-rose-200/80 rounded-xl text-xs text-rose-800 space-y-1">
                        <p className="font-semibold flex items-center gap-1">
                          <AlertCircle size={14} className="text-rose-600" />
                          Link belum dapat dibuka
                        </p>
                        <p className="text-rose-700 leading-relaxed font-light text-[11px]">
                          Pastikan izin akses di Google Drive disetel ke <strong>&quot;Siapa saja yang memiliki link&quot;</strong>.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">Deskripsi Tambahan</label>
                <textarea
                  rows={2}
                  placeholder="Ceritakan detail kayu jati, finishing, atau konsep furnitur..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-700 focus:bg-white text-stone-800 resize-none placeholder-stone-400"
                />
              </div>
            </form>

            {/* Footer: PINNED AT BOTTOM (Always visible, save & cancel buttons never cut off!) */}
            <div className="flex-shrink-0 px-6 py-4 border-t border-stone-200/80 bg-stone-50/90 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-5 py-2.5 rounded-full text-stone-600 hover:bg-stone-200/60 text-xs sm:text-sm font-medium transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                form="portfolio-form"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-700 hover:bg-amber-800 text-white text-xs sm:text-sm font-medium transition-all shadow-md disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={15} className="animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Check size={15} />
                    <span>Simpan Karya ke Database</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
