'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DATA_DESA } from '@/data/mockData';
import { Mountain, ArrowLeft, Download, Maximize2, X, Info, FileImage, ShieldAlert } from 'lucide-react';

export default function PetaLerengPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Path gambar peta kelerengan (PNG).
  // Pengguna dapat mengganti file gambar ini dengan menempatkan file PNG karya temannya di folder public/peta-lereng.png
  const petaImageUrl = '/peta-lereng.png';
  const fallbackImageUrl = 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1600&auto=format&fit=crop';

  const [imgSrc, setImgSrc] = useState(petaImageUrl);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Back Navigation & Header */}
      <div className="space-y-4">
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Pusat Informasi
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Mountain className="w-4 h-4 text-emerald-600" /> Dokumen Pemetaan Spasial
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Peta Kelerengan Wilayah {DATA_DESA.nama}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Dokumen peta tata ruang dan tingkat kemiringan lereng (kelerengan) wilayah Kelurahan Bonto Jaya, Kec. {DATA_DESA.kecamatan}, Kab. {DATA_DESA.kabupaten}.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsFullscreen(true)}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
            >
              <Maximize2 className="w-4 h-4" /> Layar Penuh
            </button>
            <a
              href={imgSrc}
              download="Peta-Kelerengan-Bonto-Jaya.png"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
            >
              <Download className="w-4 h-4" /> Unduh PNG
            </a>
          </div>
        </div>
      </div>

      {/* Main PNG Map Display Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs text-slate-500 font-semibold">
          <span className="flex items-center gap-1.5">
            <FileImage className="w-4 h-4 text-emerald-600" /> Tampilan Hasil Olahan Pemetaan (Format PNG)
          </span>
          <span className="hidden sm:inline text-slate-400">Klik gambar atau tombol &quot;Layar Penuh&quot; untuk memperbesar</span>
        </div>

        <div
          onClick={() => setIsFullscreen(true)}
          className="relative group bg-slate-900 rounded-2xl overflow-hidden cursor-pointer border border-slate-200 flex items-center justify-center min-h-[400px] max-h-[750px]"
        >
          <img
            src={imgSrc}
            onError={() => setImgSrc(fallbackImageUrl)}
            alt="Peta Kelerengan Kelurahan Bonto Jaya"
            className="w-full h-auto max-h-[750px] object-contain transition-transform duration-300 group-hover:scale-[1.01]"
          />

          {/* Hover Overlay Badge */}
          <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white/95 backdrop-blur-md text-slate-900 font-bold text-xs px-4 py-2 rounded-xl shadow-xl flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-emerald-600" /> Klik untuk Memperbesar Gambar
            </span>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="w-full flex items-center justify-between max-w-6xl mb-3 text-white">
            <h3 className="font-extrabold text-sm sm:text-base flex items-center gap-2">
              <Mountain className="w-5 h-5 text-emerald-400" /> Peta Kelerengan {DATA_DESA.nama} (Hasil Olahan GIS)
            </h3>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white font-bold transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative max-w-6xl w-full max-h-[85vh] overflow-auto flex items-center justify-center rounded-2xl bg-black/40 border border-slate-800 p-2">
            <img
              src={imgSrc}
              alt="Peta Kelerengan Fullscreen"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs">
            <a
              href={imgSrc}
              download="Peta-Kelerengan-Bonto-Jaya.png"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all"
            >
              <Download className="w-4 h-4" /> Unduh Gambar Asli (PNG)
            </a>
            <button
              onClick={() => setIsFullscreen(false)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors"
            >
              Tutup Layar Penuh
            </button>
          </div>
        </div>
      )}

      {/* Info Guide Card */}
      <div className="bg-emerald-50 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 text-emerald-950 space-y-3">
        <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm sm:text-base">
          <Info className="w-5 h-5 text-emerald-700" /> Cara Mengganti Gambar Peta Kelerengan (File PNG):
        </div>
        <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
          Untuk memasukkan file gambar PNG hasil ekspor GIS dari teman Anda:
        </p>
        <ol className="text-xs sm:text-sm text-emerald-900 space-y-1.5 list-decimal list-inside font-medium bg-white/70 p-4 rounded-2xl border border-emerald-200/50">
          <li>Simpan file gambar PNG buatan teman Anda dengan nama file: <code className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-mono font-bold">peta-lereng.png</code></li>
          <li>Masukkan file tersebut ke dalam folder project: <code className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-mono font-bold">public/peta-lereng.png</code></li>
          <li>Gambar peta di halaman ini akan otomatis berubah mengikuti file PNG tersebut!</li>
        </ol>
      </div>

    </div>
  );
}
