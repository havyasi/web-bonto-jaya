'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LIST_BERITA as MOCK_BERITA, Berita } from '@/data/mockData';
import { supabase } from '@/lib/supabase';
import { Newspaper, Calendar, User, ArrowRight, Mountain, Map, FileImage } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Newspaper className="w-4 h-4 text-emerald-400" /> Pusat Informasi & Dokumen Kelurahan
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Kabar & Publikasi Bonto Jaya
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Publikasi berita kegiatan desa, dokumen spasial kelerengan, pengumuman publik, dan informasi pelayanan warga.
          </p>
        </div>
      </div>

      {/* BANNER DOKUMEN SPASIAL & PETA KELERENGAN */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Mountain className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <FileImage className="w-3.5 h-3.5" /> Peta Spasial Geospasial
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Peta Kelerengan Wilayah Kelurahan Bonto Jaya
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Lihat dan unduh peta kontur/kelerengan tanah (kemiringan lereng) hasil analisis geospasial untuk perencanaan tata ruang dan mitigasi bencana.
            </p>
          </div>
        </div>

        <Link
          href="/peta-lereng"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all active:scale-95 shrink-0"
        >
          <Map className="w-4 h-4" /> Lihat Peta Kelerengan (PNG) <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

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
                style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
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
                    <h3 className="text-lg font-extrabold text-slate-900 leading-snug" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                      {berita.judul}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed" style={{ overflowWrap: 'anywhere', wordBreak: 'break-word', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as any, overflow: 'hidden' }}>
                      {berita.ringkasan || berita.konten}
                    </p>
                  </div>
                </div>
                
                <div className="p-6 pt-0">
                  <Link
                    href={`/berita/${berita.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    Baca Artikel Lengkap <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
