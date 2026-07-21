'use client';

import { useState, useEffect } from 'react';
import PetaLeafletWrapper from '@/components/PetaLeafletWrapper';
import { LIST_UMKM as MOCK_UMKM, UMKM } from '@/data/mockData';
import { supabase } from '@/lib/supabase';
import { MapPin, Phone, Store, Navigation, Search, Filter } from 'lucide-react';

export default function PetaUMKMPage() {
  const [umkmList, setUmkmList] = useState<UMKM[]>(MOCK_UMKM);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUMKM, setSelectedUMKM] = useState<UMKM | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function fetchUMKM() {
      try {
        const { data, error } = await supabase
          .from('umkm')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const mapped: UMKM[] = data.map((row: any) => ({
            id: row.id,
            nama: row.nama,
            pemilik: row.pemilik,
            kategori: row.kategori,
            latitude: row.latitude,
            longitude: row.longitude,
            alamat: row.alamat,
            kontakWA: row.kontak_wa,
            foto: row.foto,
            deskripsi: row.deskripsi,
            jamOperasional: row.jam_operasional ?? '08.00 - 17.00 WITA',
            produkUnggulan: row.produk_unggulan ?? [],
            rating: row.rating,
          }));
          setUmkmList(mapped);
        }
      } catch (err) {
        console.warn('Gagal mengambil data UMKM dari Supabase, menggunakan data lokal:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUMKM();
  }, []);

  const categories = ['Semua', 'Kuliner', 'Kerajinan', 'Pertanian', 'Jasa', 'Perdagangan'];

  const filteredList = umkmList.filter((u) => {
    const matchCat = activeCategory === 'Semua' || u.kategori === activeCategory;
    const matchSearch = u.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.pemilik.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <Navigation className="w-4 h-4 text-emerald-600" /> Navigasi Spasial UMKM
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Peta Etalase Digital UMKM Desa</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Cari lokasi fisik usaha, foto produk, dan kontak WhatsApp pemilik UMKM warga Desa Bonto Jaya secara langsung.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-bold px-4 py-2.5 rounded-xl border border-emerald-200/80 shrink-0">
          <Store className="w-4 h-4 text-emerald-600" />
          <span>{umkmList.length} Titik UMKM Terverifikasi</span>
        </div>
      </div>

      {/* Main Grid Layout: Map (Left/Center) + Sidebar Directory (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left 2 Cols: Interactive Leaflet Map */}
        <div className="lg:col-span-2 space-y-4">
          <PetaLeafletWrapper
            dataUMKM={umkmList}
            onSelectUMKM={(umkm) => setSelectedUMKM(umkm)}
          />
        </div>

        {/* Right Col: Directory Sidebar */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4 max-h-[600px] flex flex-col">
          
          <div className="space-y-3">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Store className="w-5 h-5 text-emerald-600" /> Direktori UMKM ({filteredList.length})
            </h2>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    activeCategory === c
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama usaha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden font-medium"
              />
            </div>
          </div>

          {/* Scrollable UMKM Item Cards */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
            {filteredList.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedUMKM(item)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center space-x-3 ${
                  selectedUMKM?.id === item.id
                    ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                    : 'border-slate-200/80 hover:border-emerald-300 hover:bg-slate-50'
                }`}
              >
                <img
                  src={item.foto}
                  alt={item.nama}
                  className="w-16 h-16 rounded-lg object-cover shrink-0 bg-slate-100"
                />
                <div className="min-w-0 flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">{item.kategori}</span>
                    {item.rating && (
                      <span className="text-[11px] font-extrabold text-amber-500">★ {item.rating}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs truncate">{item.nama}</h3>
                  <p className="text-[11px] text-slate-500 truncate">Pemilik: {item.pemilik}</p>
                  
                  <a
                    href={`https://wa.me/${item.kontakWA}?text=Halo%20${encodeURIComponent(item.pemilik)},%20saya%20menemukan%20usaha%20Anda%20di%20Peta%20UMKM%20Desa%20Bonto%20Jaya`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 hover:text-emerald-700 pt-0.5"
                  >
                    <Phone className="w-3 h-3" /> Hubungi WA
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
