'use client';

import { useState, useEffect } from 'react';
import { LIST_BERITA as MOCK_BERITA, APBDES_DATA, Berita } from '@/data/mockData';
import { supabase } from '@/lib/supabase';
import { Newspaper, PieChart, FileText, Calendar, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function BeritaPage() {
  const [beritaList, setBeritaList] = useState<Berita[]>(MOCK_BERITA);

  useEffect(() => {
    async function fetchBerita() {
      try {
        const { data, error } = await supabase
          .from('berita')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const mapped: Berita[] = data.map((row: any) => ({
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
          setBeritaList(mapped);
        }
      } catch (err) {
        console.warn('Gagal mengambil data Berita dari Supabase:', err);
      }
    }
    fetchBerita();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Newspaper className="w-4 h-4 text-emerald-400" /> Pusat Informasi & Transparansi
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Kabar Desa & Akuntabilitas APBDes
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Publikasi kegiatan desa, kebijakan penganggaran APBDes {APBDES_DATA.tahun}, dan syarat administrasi persuratan warga Desa Bonto Jaya.
          </p>
        </div>
      </div>

      {/* 1. SEKSI APBDES TRANSPARANSI */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <PieChart className="w-4 h-4 text-emerald-600" /> Akuntabilitas Keuangan
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Transparansi Dana Desa (APBDes {APBDES_DATA.tahun})</h2>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 font-semibold block">Status Penganggaran</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Surplus & Terverifikasi BPD
            </span>
          </div>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200/80 space-y-2">
            <span className="text-xs font-bold text-emerald-800 uppercase">Total Pendapatan Desa</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-900">
              Rp {APBDES_DATA.pendapatan.toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-emerald-700">Terdiri dari Dana Desa, ADD, & PADes</p>
          </div>

          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200/80 space-y-2">
            <span className="text-xs font-bold text-amber-800 uppercase">Total Belanja Desa</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-900">
              Rp {APBDES_DATA.belanja.toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-amber-700">Infrastruktur, Pembangunan & UMKM</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200/80 space-y-2">
            <span className="text-xs font-bold text-blue-800 uppercase">Sisa Lebih Pembiayaan (SILPA)</span>
            <div className="text-2xl sm:text-3xl font-black text-blue-900">
              Rp {APBDES_DATA.pembiayaan.toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-blue-700">Cadangan Kas Desa</p>
          </div>
        </div>

        {/* Detail Rincian Pendapatan & Belanja */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          <div className="space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Rincian Sumber Pendapatan
            </h3>
            <div className="space-y-3">
              {APBDES_DATA.rincianPendapatan.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs font-semibold">
                  <span className="text-slate-700">{item.sumber}</span>
                  <span className="text-slate-900 font-extrabold">Rp {item.jumlah.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Rincian Alokasi Belanja
            </h3>
            <div className="space-y-3">
              {APBDES_DATA.rincianBelanja.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs font-semibold">
                  <span className="text-slate-700">{item.bidang}</span>
                  <span className="text-slate-900 font-extrabold">Rp {item.jumlah.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 2. ARTIKEL BERITA & KEGIATAN DESA */}
      <section className="space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-4">
          <Newspaper className="w-6 h-6 text-emerald-600" /> Artikel & Berita Kegiatan Terbaru
        </h2>

        {beritaList.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-3">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">Belum Ada Artikel Berita</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Berita dan pengumuman terbaru akan muncul di sini setelah ditambahkan melalui Admin Dashboard.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beritaList.map((berita) => (
              <article
                key={berita.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-slate-100">
                    <img
                      src={berita.gambar}
                      alt={berita.judul}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      {berita.kategori}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {berita.tanggal}</span>
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {berita.penulis}</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                      {berita.judul}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {berita.konten}
                    </p>
                  </div>
                </div>
                
                <div className="p-6 pt-0">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer">
                    Baca Artikel Lengkap <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
