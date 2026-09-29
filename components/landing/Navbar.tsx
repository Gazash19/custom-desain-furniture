'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, MessageCircle, Sparkles, Box } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Portofolio', href: '#portfolio' },
    { name: 'Keunggulan', href: '#features' },
    { name: 'Layanan', href: '#services' },
    { name: 'Alur Kerja', href: '#process' },
    { name: 'Kontak Studio', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 pt-4">
      <div className={`container mx-auto max-w-7xl transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/85 backdrop-blur-xl border border-slate-800/80 shadow-2xl shadow-black/40 rounded-2xl sm:rounded-full py-3 px-5 sm:px-7' 
          : 'bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-full py-3.5 px-5 sm:px-8'
      }`}>
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <Box className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-heading text-xl sm:text-2xl font-bold tracking-tight text-white">
                <span>PAPO</span>
                <span className="text-amber-400">3D</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium hidden sm:block">
                Studio Desain Custom Mebel
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Online Konsultasi</span>
            </div>

            <a
              href="https://wa.me/qr/BMNBVD4FHIRNO1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-full shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <MessageCircle size={16} className="fill-slate-950 stroke-none" />
              <span>Chat WhatsApp</span>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://wa.me/qr/BMNBVD4FHIRNO1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat WhatsApp"
              className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-md active:scale-95"
            >
              <MessageCircle size={17} className="fill-slate-950 stroke-none" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-800/80 space-y-2 pb-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-amber-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <a
                href="https://wa.me/qr/BMNBVD4FHIRNO1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-xl text-sm font-bold shadow-lg"
              >
                <MessageCircle size={18} className="fill-slate-950 stroke-none" />
                <span>Konsultasi Cepat WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

