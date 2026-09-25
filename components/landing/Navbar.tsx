'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, MessageCircle, ShieldCheck } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Portofolio', href: '#portfolio' },
    { name: 'Layanan', href: '#services' },
    { name: 'Alur Kerja', href: '#process' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#faf8f5]/90 backdrop-blur-md border-b border-stone-200/60 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo - Warm Japandi & Teak Wood style */}
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="font-serif text-2xl tracking-tight text-stone-900 font-normal">
            Jepara<span className="font-sans font-bold text-amber-800">3D</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-widest text-stone-500 font-sans border-l border-stone-300 pl-2">
            Studio Furnitur
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex h-full items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-4 py-2 text-[14px] font-medium text-stone-600 hover:text-amber-800 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pl-4 flex items-center gap-3">
            {/* Direct WhatsApp CTA Button */}
            <a
              href="https://wa.me/qr/BMNBVD4FHIRNO1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-full transition-all shadow-xs"
            >
              <MessageCircle size={15} />
              <span>Chat WhatsApp</span>
            </a>

            {/* Subtle Admin Link */}
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 border border-stone-300 rounded-full hover:border-stone-500 hover:text-stone-900 transition-all"
            >
              <ShieldCheck size={14} />
              <span>Admin</span>
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="https://wa.me/qr/BMNBVD4FHIRNO1"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-xs font-semibold bg-emerald-700 text-white rounded-full flex items-center justify-center"
            title="Chat WhatsApp"
          >
            <MessageCircle size={16} />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg text-stone-700 hover:text-amber-800 hover:bg-stone-100 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown / Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf8f5] border-b border-stone-200 shadow-xl px-5 py-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-stone-700 hover:bg-stone-100 hover:text-amber-800 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-stone-200 space-y-2">
            <a
              href="https://wa.me/qr/BMNBVD4FHIRNO1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-700 text-white rounded-xl text-sm font-semibold shadow-xs"
            >
              <MessageCircle size={17} />
              <span>Hubungi via WhatsApp</span>
            </a>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 border border-stone-300 text-stone-700 rounded-xl text-sm font-medium hover:bg-stone-100 transition-colors"
            >
              <ShieldCheck size={16} />
              <span>Panel Admin Portofolio</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
