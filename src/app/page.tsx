'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PetaLeafletWrapper from '@/components/PetaLeafletWrapper';
import { DATA_DESA, LIST_UMKM as MOCK_UMKM, LIST_BERITA, UMKM } from '@/data/mockData';
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
  ChevronRight 
} from 'lucide-react';

export default function HomePage() {
  const [umkmList, setUmkmList] = useState<UMKM[]>(MOCK_UMKM);
  const [isLoading, setIsLoading] = useState(true);

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
        // If data is empty, keep mock data as fallback
      } catch (err) {
        console.warn('Gagal mengambil data UMKM dari Supabase, menggunakan data lokal:', err);
        // Keep mock data as fallback
      } finally {
        setIsLoading(false);
      }
    }
    fetchUMKM();
  }, []);

  const featuredUMKM = umkmList.slice(0, 3);
  const featuredBerita = LIST_BERITA.slice(0, 3);

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
              Solusi terpadu transparansi pelayanan publik dan etalase promosi spasial bagi UMKM & potensi lokal Desa Bonto Jaya, Kec. {DATA_DESA.kecamatan}, Kab. {DATA_DESA.kabupaten}.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/peta-umkm"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-950/50 hover:scale-105 active:scale-95"
              >
                <MapPin className="w-5 h-5" />
                Jelajahi Peta UMKM
              </Link>
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
              >
                <Building className="w-5 h-5 text-slate-400" />
                Profil & Perangkat Desa
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

      {/* 5. LAYANAN ADMINISTRASI CEPAT */}
      <section className="bg-slate-100/80 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Layanan Publik</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Persyaratan Administrasi Persuratan</h2>
            <p className="text-sm text-slate-600">Panduan syarat dokumen resmi pelayanan kantor balai Desa Bonto Jaya.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3 hover:border-emerald-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Surat Keterangan Usaha (SKU)</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Pengantar RT / RW</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> FC KTP & Kartu Keluarga</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Foto tempat lokasi usaha</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3 hover:border-emerald-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Surat Keterangan Domisili</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Pengantar RT / RW</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> FC KTP & Kartu Keluarga</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Pasfoto 3x4 (2 Lembar)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3 hover:border-emerald-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Surat Pengantar SKCK</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Surat Pengantar RT / RW</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> FC KTP & Kartu Keluarga</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> FC Akta Kelahiran</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3 hover:border-emerald-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Surat Keterangan Tidak Mampu</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Pengantar RT / RW</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> FC KTP & Kartu Keluarga</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Surat Pernyataan Bermaterai</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

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
