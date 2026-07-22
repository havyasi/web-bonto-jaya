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
  Loader2,
  AlertTriangle,
  Share2,
  Printer,
  ChevronRight,
} from 'lucide-react';

export default function BeritaDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [berita, setBerita] = useState<Berita | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [relatedNews, setRelatedNews] = useState<Berita[]>([]);

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
          tanggal:
            data.tanggal ??
            (data.created_at
              ? new Date(data.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : 'Terbaru'),
          penulis: data.penulis ?? 'Admin Desa',
          ringkasan: data.ringkasan ?? '',
          konten: data.konten,
          gambar: data.gambar,
        };
        setBerita(mapped);

        // Fetch related news (same category, exclude current)
        const { data: relData } = await supabase
          .from('berita')
          .select('*')
          .eq('kategori', mapped.kategori)
          .neq('id', mapped.id)
          .order('created_at', { ascending: false })
          .limit(3);

        if (relData && relData.length > 0) {
          setRelatedNews(
            relData.map((row: any) => ({
              id: row.id,
              judul: row.judul,
              slug: row.slug ?? row.id,
              kategori: row.kategori,
              tanggal:
                row.tanggal ??
                (row.created_at
                  ? new Date(row.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : 'Terbaru'),
              penulis: row.penulis ?? 'Admin Desa',
              ringkasan: row.ringkasan ?? '',
              konten: row.konten,
              gambar: row.gambar,
            }))
          );
        }
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        <p className="text-sm text-slate-500">Memuat artikel...</p>
      </div>
    );
  }

  // Not found state
  if (notFound || !berita) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 px-4">
        <AlertTriangle className="w-12 h-12 text-amber-500" />
        <h1 className="text-2xl font-bold text-slate-900">
          Artikel Tidak Ditemukan
        </h1>
        <p className="text-sm text-slate-500 max-w-md">
          Artikel berita yang Anda cari tidak tersedia atau mungkin telah
          dihapus.
        </p>
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Berita
        </Link>
      </div>
    );
  }

  const kategoriColor: Record<string, string> = {
    Pembangunan: 'bg-blue-600',
    Kegiatan: 'bg-emerald-600',
    Pengumuman: 'bg-amber-600',
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
      {/* Breadcrumb */}
      <div
        className="border-b"
        style={{ borderColor: '#e2e8f0', backgroundColor: '#ffffff' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs" style={{ color: '#94a3b8' }}>
            <Link
              href="/"
              className="transition-colors"
              style={{ color: '#64748b' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#059669')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
            >
              Beranda
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href="/berita"
              className="transition-colors"
              style={{ color: '#64748b' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#059669')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
            >
              Berita
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: '#0f172a' }} className="font-medium truncate max-w-[200px]">
              {berita.judul}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Badge */}
        <div className="mb-4">
          <span
            className={`inline-block text-white text-xs font-bold px-3 py-1 rounded ${
              kategoriColor[berita.kategori] || 'bg-slate-600'
            }`}
          >
            {berita.kategori}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4"
          style={{
            color: '#0f172a',
            fontFamily:
              'Georgia, "Times New Roman", "Noto Serif", serif',
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
          }}
        >
          {berita.judul}
        </h1>

        {/* Meta Info */}
        <div
          className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mb-6 pb-6 border-b"
          style={{ color: '#64748b', borderColor: '#e2e8f0' }}
        >
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" style={{ color: '#059669' }} />
            {berita.penulis}
          </span>
          <span style={{ color: '#cbd5e1' }}>|</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" style={{ color: '#059669' }} />
            {berita.tanggal}
          </span>

          {/* Share & Print Buttons */}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: berita.judul,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link berhasil disalin!');
                }
              }}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border transition-colors"
              style={{
                color: '#64748b',
                borderColor: '#e2e8f0',
                backgroundColor: '#ffffff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#059669';
                e.currentTarget.style.color = '#059669';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = '#64748b';
              }}
            >
              <Share2 className="w-3.5 h-3.5" /> Bagikan
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border transition-colors"
              style={{
                color: '#64748b',
                borderColor: '#e2e8f0',
                backgroundColor: '#ffffff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#059669';
                e.currentTarget.style.color = '#059669';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.color = '#64748b';
              }}
            >
              <Printer className="w-3.5 h-3.5" /> Cetak
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <figure className="mb-8">
          <div className="rounded-lg overflow-hidden">
            <img
              src={berita.gambar}
              alt={berita.judul}
              className="w-full h-auto max-h-[480px] object-cover"
            />
          </div>
          <figcaption
            className="text-xs mt-2 italic"
            style={{ color: '#94a3b8' }}
          >
            Foto: {berita.judul}
          </figcaption>
        </figure>

        {/* Lead Paragraph / Ringkasan */}
        {berita.ringkasan && (
          <p
            className="text-base sm:text-lg font-semibold leading-relaxed mb-6"
            style={{
              color: '#1e293b',
              fontFamily:
                'Georgia, "Times New Roman", "Noto Serif", serif',
              overflowWrap: 'anywhere',
              wordBreak: 'break-word',
            }}
          >
            {berita.ringkasan}
          </p>
        )}

        {/* Horizontal rule after lead */}
        {berita.ringkasan && (
          <hr className="mb-6" style={{ borderColor: '#e2e8f0' }} />
        )}

        {/* Article Body */}
        <div
          className="leading-relaxed text-base space-y-5"
          style={{
            color: '#334155',
            fontFamily:
              'Georgia, "Times New Roman", "Noto Serif", serif',
            lineHeight: '1.9',
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
          }}
        >
          {berita.konten.split('\n').map((paragraph, idx) =>
            paragraph.trim() ? (
              <p key={idx}>{paragraph}</p>
            ) : null
          )}
        </div>

        {/* Tags / Footer section */}
        <div
          className="mt-10 pt-6 border-t flex flex-wrap items-center justify-between gap-4"
          style={{ borderColor: '#e2e8f0' }}
        >
          <div className="flex items-center gap-2 text-xs" style={{ color: '#94a3b8' }}>
            <span className="font-medium">Sumber:</span>
            <span>Pemerintah Desa Bonto Jaya</span>
          </div>
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: '#059669' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#047857')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#059669')}
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Semua Berita
          </Link>
        </div>
      </article>

      {/* Related News Section */}
      {relatedNews.length > 0 && (
        <section
          className="border-t py-10"
          style={{ borderColor: '#e2e8f0', backgroundColor: '#ffffff' }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-lg font-bold mb-6 pb-3 border-b-2"
              style={{ color: '#0f172a', borderColor: '#059669' }}
            >
              Berita Terkait
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="group block"
                >
                  <div className="rounded-lg overflow-hidden mb-3">
                    <img
                      src={item.gambar}
                      alt={item.judul}
                      className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span
                    className="text-xs font-bold uppercase"
                    style={{ color: '#059669' }}
                  >
                    {item.kategori}
                  </span>
                  <h3
                    className="text-sm font-bold mt-1 leading-snug transition-colors group-hover:text-emerald-700"
                    style={{ color: '#1e293b' }}
                  >
                    {item.judul}
                  </h3>
                  <p
                    className="text-xs mt-1.5"
                    style={{ color: '#94a3b8' }}
                  >
                    {item.tanggal}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
