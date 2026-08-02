'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import PetaLeafletWrapper from '@/components/PetaLeafletWrapper';
import { DATA_DESA, LIST_UMKM as MOCK_UMKM, LIST_BERITA as MOCK_BERITA, LIST_LAYANAN as MOCK_LAYANAN, UMKM, Berita, LayananSurat } from '@/data/mockData';
import { supabase } from '@/lib/supabase';
import { 
  MapPin, 
  ArrowRight, 
  Users, 
  Home, 
  Building, 
  Store, 
  FileText, 
  ShieldCheck, 
  Phone, 
  Newspaper, 
  CheckCircle2, 
  ChevronRight,
  ChevronLeft,
  Search,
  X,
  Layers
} from 'lucide-react';

export default function HomePage() {
  const [umkmList, setUmkmList] = useState<UMKM[]>(MOCK_UMKM);
  const [beritaList, setBeritaList] = useState<Berita[]>(MOCK_BERITA);
  const [layananList, setLayananList] = useState<LayananSurat[]>(MOCK_LAYANAN);
  const [isLoading, setIsLoading] = useState(true);

  // Carousel & Modal state
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showAllLayananModal, setShowAllLayananModal] = useState(false);
  const [searchLayananQuery, setSearchLayananQuery] = useState('');

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [umkmRes, beritaRes, layananRes] = await Promise.all([
          supabase.from('umkm').select('*').order('created_at', { ascending: false }),
          supabase.from('berita').select('*').order('created_at', { ascending: false }),
          supabase.from('layanan_surat').select('*').order('created_at', { ascending: false })
        ]);

        if (umkmRes.data) {
          const mapped: UMKM[] = umkmRes.data.map((row: any) => ({
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

        if (beritaRes.data) {
          const mappedB: Berita[] = beritaRes.data.map((row: any) => ({
            id: row.id,
            judul: row.judul,
            slug: row.slug ?? row.id,
            kategori: row.kategori,
            tanggal: row.tanggal ?? (row.created_at ? new Date(row.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Terbaru'),
            penulis: row.penulis ?? 'Admin Desa',
            ringkasan: row.ringkasan ?? '',
            konten: row.konten,
            gambar: row.gambar,
          }));
          setBeritaList(mappedB);
        }

        if (layananRes.data && layananRes.data.length > 0) {
          const mappedL: LayananSurat[] = layananRes.data.map((row: any) => ({
            id: row.id,
            nama_surat: row.nama_surat,
            persyaratan: row.persyaratan ?? [],
            created_at: row.created_at,
          }));
          setLayananList(mappedL);
        }
      } catch (err) {
        console.warn('Gagal mengambil data dari Supabase:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const featuredUMKM = umkmList.slice(0, 3);
  const featuredBerita = beritaList.slice(0, 3);

  const filteredLayananModal = layananList.filter((item) =>
    item.nama_surat.toLowerCase().includes(searchLayananQuery.toLowerCase()) ||
    item.persyaratan.some((p) => p.toLowerCase().includes(searchLayananQuery.toLowerCase()))
  );

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[560px] flex items-center bg-slate-900 overflow-hidden py-20">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop"
            alt="Lansekap Desa"
            className="w-full h-full object-cover scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Portal Resmi Pemerintahan Desa Bonto Jaya
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Selamat Datang di Portal & Peta Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">{DATA_DESA.nama}</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Solusi terpadu transparansi pelayanan publik dan etalase promosi spasial bagi UMKM & potensi lokal Kelurahan Bonto Jaya, Kec. {DATA_DESA.kecamatan}, Kab. {DATA_DESA.kabupaten}.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/peta-umkm"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-950/50 hover:scale-105 active:scale-95"
              >
                <MapPin className="w-5 h-5" />
                Jelajahi Peta
              </Link>
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
              >
                <Building className="w-5 h-5 text-slate-400" />
                Profil Kelurahan Bonto Jaya
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 2. DEMOGRAFI & RINGKASAN DESA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200/80 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Luas Wilayah</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900">{DATA_DESA.luasWilayah}</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200/80 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Total Penduduk</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900">{DATA_DESA.jumlahPenduduk.toLocaleString('id-ID')} Jiwa</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200/80 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Kepala Keluarga</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900">{DATA_DESA.jumlahKK} KK</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200/80 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block">UMKM Terdaftar</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900">{umkmList.length} Usaha</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. PETA DIGITAL UMKM SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Fitur Utama Spasial</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Peta Etalase UMKM Desa</h2>
          </div>
          <Link
            href="/peta-umkm"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            Buka Peta Mode Penuh <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <PetaLeafletWrapper dataUMKM={umkmList} />
      </section>

      {/* 4. UMKM UNGGULAN GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Promosi Lokal</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Produk & Usaha Unggulan Warga</h2>
          </div>
          <Link
            href="/peta-umkm"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            Lihat Semua UMKM <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredUMKM.map((umkm) => (
            <div
              key={umkm.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200/80 hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={umkm.foto}
                  alt={umkm.nama}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                  {umkm.kategori}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {umkm.nama}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-600 mt-1">Pemilik: {umkm.pemilik}</p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {umkm.deskripsi}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {umkm.alamat}
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/${umkm.kontakWA}?text=Halo%20${encodeURIComponent(umkm.pemilik)},%20saya%20tertarik%20dengan%20${encodeURIComponent(umkm.nama)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" /> Hubungi via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LAYANAN ADMINISTRASI CEPAT (CAROUSEL & MODAL) */}
      <section className="bg-slate-100/80 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Layanan Publik</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Persyaratan Administrasi Persuratan</h2>
              <p className="text-sm text-slate-600">Panduan syarat dokumen resmi pelayanan kantor Kelurahan Bonto Jaya.</p>
            </div>

            {/* Navigasi Carousel Slider */}
            {layananList.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scrollCarousel('left')}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-xs active:scale-95 cursor-pointer"
                  title="Geser Kiri"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollCarousel('right')}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-xs active:scale-95 cursor-pointer"
                  title="Geser Kanan"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {layananList.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-3">
              <FileText className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">Belum Ada Data Layanan Persuratan</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Informasi persyaratan layanan surat akan muncul di sini setelah ditambahkan melalui Admin Dashboard.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Carousel Track */}
              <div
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1 px-1"
              >
                {layananList.map((item) => (
                  <div
                    key={item.id}
                    className="w-[280px] sm:w-[320px] shrink-0 snap-start bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-base leading-snug">{item.nama_surat}</h3>
                      <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                        {item.persyaratan.map((p, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tombol Lihat Semua Layanan */}
              <div className="text-center pt-2">
                <button
                  onClick={() => setShowAllLayananModal(true)}
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95 text-xs sm:text-sm cursor-pointer"
                >
                  <Layers className="w-4 h-4" /> Lihat Semua Persyaratan Layanan ({layananList.length} Surat)
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* MODAL POPUP: SEMUA LAYANAN & PENCARIAN */}
      {showAllLayananModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Daftar Lengkap Persyaratan Surat</h3>
                <p className="text-xs text-slate-500 mt-0.5">Kelurahan Bonto Jaya — Total {layananList.length} Jenis Layanan</p>
              </div>
              <button
                onClick={() => { setShowAllLayananModal(false); setSearchLayananQuery(''); }}
                className="w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Input Pencarian */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama surat atau persyaratan (contoh: SKCK, Domisili, SKU, Pindah)..."
                value={searchLayananQuery}
                onChange={(e) => setSearchLayananQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-emerald-600 font-medium"
              />
              {searchLayananQuery && (
                <button
                  onClick={() => setSearchLayananQuery('')}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                >
                  Bersihkan
                </button>
              )}
            </div>

            {/* Grid Hasil */}
            <div className="flex-1 overflow-y-auto pr-1">
              {filteredLayananModal.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <p className="text-sm font-bold text-slate-600">Tidak ada layanan surat yang cocok</p>
                  <p className="text-xs text-slate-400">Coba kata kunci pencarian yang lain.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredLayananModal.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 space-y-3 hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-sm leading-snug">{item.nama_surat}</h4>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-1.5 pt-1 border-t border-slate-200/60">
                        {item.persyaratan.map((p, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6. SOROTAN BERITA TERKINI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Informasi Publik</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Kabar & Publikasi Desa</h2>
          </div>
          <Link
            href="/berita"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            Lihat Semua Berita <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBerita.map((berita) => (
            <Link
              key={berita.id}
              href="/berita"
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-lg transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-44 bg-slate-100 overflow-hidden">
                <img
                  src={berita.gambar}
                  alt={berita.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {berita.kategori}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">{berita.tanggal} • Oleh {berita.penulis}</span>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors mt-1.5 leading-snug">
                    {berita.judul}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {berita.ringkasan}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 pt-2">
                  Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
