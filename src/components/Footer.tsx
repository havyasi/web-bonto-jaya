import Link from 'next/link';
import { DATA_DESA } from '@/data/mockData';
import { Building2, MapPin, Mail, Phone, Clock, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {DATA_DESA.nama}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Portal resmi pemerintahan dan layanan digital pemetaan UMKM Desa Bonto Jaya. Mendorong transparansi dan kemajuan ekonomi lokal.
            </p>
          </div>

          {/* Col 2: Kontak & Kantor */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-base border-b border-slate-800 pb-2">Kontak Pelayanan</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                <span>{DATA_DESA.alamatBalaiDesa}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href={`mailto:${DATA_DESA.email}`} className="hover:text-emerald-400 transition-colors">
                  {DATA_DESA.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href={`tel:${DATA_DESA.telepon}`} className="hover:text-emerald-400 transition-colors">
                  {DATA_DESA.telepon}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                <span>{DATA_DESA.jamPelayanan}</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigasi Cepat */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-base border-b border-slate-800 pb-2">Tautan Penting</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">Beranda Utama</Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-emerald-400 transition-colors">Profil & Perangkat Desa</Link>
              </li>
              <li>
                <Link href="/peta-umkm" className="hover:text-emerald-400 transition-colors">Peta GIS & Direktori UMKM</Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-emerald-400 transition-colors">Transparansi Dana APBDes</Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-emerald-400 transition-colors">Portal Login Admin Desa</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Statistik Singkat */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-base border-b border-slate-800 pb-2">Demografi Ringkas</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                <span className="block text-slate-400">Luas Wilayah</span>
                <span className="text-base font-bold text-white mt-1 block">{DATA_DESA.luasWilayah}</span>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                <span className="block text-slate-400">Penduduk</span>
                <span className="text-base font-bold text-white mt-1 block">{DATA_DESA.jumlahPenduduk} Jiwa</span>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                <span className="block text-slate-400">Kepala Keluarga</span>
                <span className="text-base font-bold text-white mt-1 block">{DATA_DESA.jumlahKK} KK</span>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                <span className="block text-slate-400">RT / RW</span>
                <span className="text-base font-bold text-white mt-1 block">{DATA_DESA.jumlahRT} / {DATA_DESA.jumlahRW}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p>© {new Date().getFullYear()} {DATA_DESA.nama}. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="flex items-center justify-center gap-1">
            Dirancang & Disusun Oleh <span className="text-emerald-400 font-semibold">Ananta Waskita Gisda</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
