import { DATA_DESA, LIST_PERANGKAT_DESA } from '@/data/mockData';
import { Building2, Target, Eye, Users, ShieldCheck, MapPin } from 'lucide-react';

export default function ProfilPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Building2 className="w-4 h-4 text-emerald-400" /> Profil Pemerintahan Desa
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Profil & Struktur Organisasi {DATA_DESA.nama}
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Mengenal lebih dekat sejarah, visi-misi, serta jajaran Perangkat Desa Bonto Jaya, Kecamatan {DATA_DESA.kecamatan}, Kabupaten {DATA_DESA.kabupaten}.
          </p>
        </div>
      </div>

      {/* Sejarah & Visi Misi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sejarah */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" /> Sejarah Singkat Desa Bonto Jaya
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Desa Bonto Jaya terbentuk melalui semangat gotong royong warga yang menghendaki kemandirian tata kelola wilayah dan optimalisasi potensi sektor pertanian serta kerajinan lokal. Terletak di kawasan perbukitan yang subur di Kecamatan Bissappu, Desa Bonto Jaya dikenal dengan komoditas anyaman bambu, perkebunan cengkeh, dan hasil bumi pilihan.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Seiring bertransformasi menuju desa digital, Desa Bonto Jaya kini memadukan kearifan lokal nilai-nilai kebersamaan dengan pemanfaatan teknologi informasi untuk mempermudah pelayanan publik dan memperluas pemasaran produk-produk UMKM warga.
          </p>
        </div>

        {/* Visi Misi Card */}
        <div className="bg-emerald-900 text-white p-8 rounded-3xl shadow-lg space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Eye className="w-5 h-5 text-emerald-400" /> Visi Desa
            </div>
            <p className="text-lg font-bold leading-snug text-white">
              "Terwujudnya Desa Bonto Jaya yang Maju, Sejahtera, Transparan, dan Berdaya Saing Melalui Penguatan UMKM dan Teknologi Digital."
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-emerald-800/80">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Target className="w-5 h-5 text-emerald-400" /> Misi Utama
            </div>
            <ul className="text-xs text-emerald-100 space-y-2 leading-relaxed">
              <li>1. Meningkatkan kualitas pelayanan publik berbasis digital dan transparan.</li>
              <li>2. Mengembangkan etalase promosi dan kapasitas produksi UMKM lokal.</li>
              <li>3. Meningkatkan infrastruktur jalan tani dan fasilitas umum desa.</li>
            </ul>
          </div>
        </div>

      </div>

      {/* SOTK Perangkat Desa */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Struktur Organisasi</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Perangkat Desa Bonto Jaya</h2>
          <p className="text-sm text-slate-600">Pelayan masyarakat yang siap mengabdi untuk kemajuan dan kesejahteraan warga.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LIST_PERANGKAT_DESA.map((perangkat) => (
            <div
              key={perangkat.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center space-x-4 hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden shrink-0 shadow-inner">
                <img
                  src={perangkat.foto}
                  alt={perangkat.nama}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-extrabold text-slate-900 text-sm truncate">{perangkat.nama}</h3>
                <span className="text-xs font-semibold text-emerald-700 block mt-0.5">{perangkat.jabatan}</span>
                {perangkat.kontak && (
                  <span className="text-[11px] text-slate-400 block mt-1">Kontak: {perangkat.kontak}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
