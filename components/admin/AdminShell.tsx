'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  ExternalLink, 
  Menu, 
  X, 
  Sparkles,
  LogOut 
} from 'lucide-react';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Jika di halaman login, tampilkan langsung tanpa shell dashboard
  if (pathname === '/admin/login') {
    return <main className="min-h-screen bg-[#faf8f5]">{children}</main>;
  }

  const handleLogout = async () => {
    if (confirm('Apakah Anda yakin ingin keluar dari panel admin?')) {
      setLoggingOut(true);
      try {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh();
      } catch (err) {
        console.error('Logout error:', err);
        router.push('/admin/login');
      } finally {
        setLoggingOut(false);
      }
    }
  };

  const navItems = [
    { name: 'Dasbor Utama', href: '/admin', icon: LayoutDashboard },
    { name: 'Katalog Portofolio', href: '/admin/portfolio', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] font-sans flex flex-col lg:flex-row text-stone-900">
      
      {/* Mobile Top Header (Visible only on < lg) */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-stone-900 text-white shadow-md">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          aria-label="Buka Menu"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center space-x-2">
          <span className="font-serif text-lg tracking-tight text-white">
            PAPO<span className="font-sans font-bold text-amber-500">3D</span>
          </span>
          <span className="text-[10px] uppercase font-semibold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
            Admin
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-xs text-stone-300 hover:text-white flex items-center gap-1 bg-stone-800 px-2.5 py-1.5 rounded-md transition-colors"
          >
            <ExternalLink size={13} />
            <span>Web</span>
          </Link>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-xs text-red-300 hover:text-white flex items-center gap-1 bg-red-950/60 border border-red-800/50 px-2 py-1.5 rounded-md transition-colors"
            title="Keluar"
          >
            <LogOut size={13} />
          </button>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar (Desktop fixed & Mobile Slide-over) */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-stone-900 text-stone-100 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl tracking-tight text-white">
                PAPO<span className="font-sans font-bold text-amber-500">3D</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <p className="text-xs text-stone-400 font-medium tracking-wide">Studio Management</p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
            aria-label="Tutup Menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <p className="px-3 text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">Menu Portofolio</p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive 
                    ? 'bg-amber-800 text-white shadow-lg shadow-amber-950/40 font-semibold' 
                    : 'text-stone-400 hover:text-white hover:bg-stone-800/70'
                }`}
              >
                <Icon size={19} className={isActive ? 'text-white' : 'text-stone-400'} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-stone-800 space-y-2.5">
          <div className="bg-stone-800/80 rounded-xl p-3 border border-stone-700/50">
            <div className="flex items-center gap-2 text-xs font-medium text-stone-300 mb-1">
              <Sparkles size={14} className="text-amber-400" />
              <span>PAPO3D Studio</span>
            </div>
            <p className="text-[11px] text-stone-400 leading-tight">Database Supabase terhubung aktif untuk katalog portofolio.</p>
          </div>

          <Link 
            href="/" 
            className="flex items-center justify-center space-x-2 px-4 py-2.5 w-full rounded-xl bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors text-xs font-semibold"
          >
            <ExternalLink size={14} />
            <span>Lihat Website Depan</span>
          </Link>

          {/* Tombol Logout Aman */}
          <button 
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 w-full rounded-xl bg-red-950/40 text-red-300 hover:bg-red-900/60 hover:text-white border border-red-900/40 transition-colors text-xs font-semibold cursor-pointer disabled:opacity-50"
          >
            <LogOut size={14} />
            <span>{loggingOut ? 'Keluar...' : 'Keluar (Logout)'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
