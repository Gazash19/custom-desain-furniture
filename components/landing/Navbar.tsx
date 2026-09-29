'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, MessageCircle, Box } from 'lucide-react';

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
          ? 'bg-[#FDFBF8]/95 backdrop-blur-xl border border-[#E2DDD5] shadow-xl shadow-stone-900/5 rounded-2xl sm:rounded-full py-3 px-5 sm:px-7' 
          : 'bg-[#FDFBF8]/85 backdrop-blur-md border border-[#E7E2DA] shadow-md shadow-stone-900/5 rounded-2xl sm:rounded-full py-3.5 px-5 sm:px-8'
      }`}>
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 flex items-center justify-center text-white shadow-md shadow-amber-900/20 group-hover:scale-105 transition-transform duration-300">
              <Box className="w-5 h-5 text-amber-100 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#1C1917]">
                <span>PAPO</span>
                <span className="text-amber-800">3D</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-medium hidden sm:block">
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
                className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-stone-700 hover:text-amber-850 hover:bg-stone-200/50 rounded-full transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Online Konsultasi</span>
            </div>

            <a
              href="https://wa.me/qr/BMNBVD4FHIRNO1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-full shadow-md shadow-emerald-800/15 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <MessageCircle size={16} className="fill-white stroke-none" />
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
              className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-sm active:scale-95"
            >
              <MessageCircle size={17} className="fill-white stroke-none" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:text-[#1C1917] hover:bg-stone-200/60 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-[#E5E0D8] space-y-2 pb-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-stone-800 hover:bg-stone-100 hover:text-amber-800 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <a
                href="https://wa.me/qr/BMNBVD4FHIRNO1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md"
              >
                <MessageCircle size={18} className="fill-white stroke-none" />
                <span>Konsultasi Cepat WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
