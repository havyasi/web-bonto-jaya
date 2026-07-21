'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DATA_DESA } from '@/data/mockData';
import { MapPin, Menu, X, Building2, Newspaper, Home, UserCheck, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Beranda', href: '/', icon: Home },
    { name: 'Profil Desa', href: '/profil', icon: Building2 },
    { name: 'Peta UMKM', href: '/peta-umkm', icon: MapPin },
    { name: 'Pusat Informasi', href: '/berita', icon: Newspaper },
    { name: 'Admin CMS', href: '/admin/login', icon: ShieldCheck },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Identity */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <span className="block text-xl font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                {DATA_DESA.nama}
              </span>
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-emerald-600" /> Kec. {DATA_DESA.kecamatan}, {DATA_DESA.kabupaten}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    active
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-emerald-600' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 focus:outline-hidden transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200 shadow-xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  active
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-emerald-700'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-500'}`} />
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
