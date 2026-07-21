'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Berita } from '@/data/mockData';
import {
  ArrowLeft,
  Calendar,
  User,
  Newspaper,
  Loader2,
  AlertTriangle,
  Tag,
} from 'lucide-react';

export default function BeritaDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [berita, setBerita] = useState<Berita | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function fetchBerita() {
      setIsLoading(true);
      try {
        // Try fetching by slug first
        let { data, error } = await supabase
          .from('berita')
          .select('*')
          .eq('slug', slug)
          .single();

        // If not found by slug, try fetching by ID
        if (error || !data) {
          const { data: dataById, error: errorById } = await supabase
            .from('berita')
            .select('*')
            .eq('id', slug)
            .single();

          if (errorById || !dataById) {
            setNotFound(true);
            return;
          }
          data = dataById;
        }

        const mapped: Berita = {
          id: data.id,
          judul: data.judul,
          slug: data.slug ?? data.id,
          kategori: data.kategori,
          tanggal: data.tanggal ?? (data.created_at ? new Date(data.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Terbaru'),
          penulis: data.penulis ?? 'Admin Desa',
          ringkasan: data.ringkasan ?? '',
          konten: data.konten,
          gambar: data.gambar,
        };
        setBerita(mapped);
      } catch (err) {
        console.error('Gagal memuat berita:', err);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBerita();
  }, [slug]);

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center text-center space-y-4">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        <p className="text-sm font-semibold text-slate-500">Memuat artikel berita...</p>
      </div>
    );
  }

  // Not found state
  if (notFound || !berita) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500" />
        <h1 className="text-2xl font-black text-slate-900">Artikel Tidak Ditemukan</h1>
        <p className="text-sm text-slate-500 max-w-md">
          Artikel berita yang Anda cari tidak tersedia atau mungkin telah dihapus.
        </p>
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Halaman Berita
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

      {/* Back Button */}
      <Link
        href="/berita"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Semua Berita
      </Link>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg">
        <img
          src={berita.gambar}
          alt={berita.judul}
          className="w-full h-64 sm:h-80 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-emerald-600/90 text-white text-xs font-bold px-3 py-1 rounded-full">
            <Tag className="w-3 h-3" /> {berita.kategori}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight drop-shadow-md">
            {berita.judul}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 font-semibold">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {berita.tanggal}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> {berita.penulis}
            </span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 space-y-6">

        {/* Ringkasan */}
        {berita.ringkasan && (
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-5">
            <p className="text-sm font-semibold text-emerald-900 leading-relaxed italic">
              &ldquo;{berita.ringkasan}&rdquo;
            </p>
          </div>
        )}

        {/* Konten Utama */}
        <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700">
          {berita.konten.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </article>

      {/* Footer / Back CTA */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-6">
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Lihat Berita Lainnya
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
          <Newspaper className="w-4 h-4" /> Desa Bonto Jaya
        </div>
      </div>

    </div>
  );
}
