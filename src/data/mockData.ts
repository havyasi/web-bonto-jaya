export interface UMKM {
  id: string;
  nama: string;
  pemilik: string;
  kategori: 'Kuliner' | 'Kerajinan' | 'Pertanian' | 'Jasa' | 'Perdagangan';
  latitude: number;
  longitude: number;
  alamat: string;
  kontakWA: string;
  foto: string;
  deskripsi: string;
  jamOperasional: string;
  produkUnggulan: string[];
  rating?: number;
}

export interface Berita {
  id: string;
  judul: string;
  slug: string;
  kategori: 'Pembangunan' | 'Kegiatan' | 'Pengumuman';
  tanggal: string;
  penulis: string;
  ringkasan: string;
  konten: string;
  gambar: string;
}

export interface PerangkatDesa {
  id: string;
  nama: string;
  jabatan: string;
  foto: string;
  kontak?: string;
}

export interface APBDesData {
  tahun: number;
  pendapatan: number;
  belanja: number;
  pembiayaan: number;
  rincianPendapatan: { sumber: string; jumlah: number }[];
  rincianBelanja: { bidang: string; jumlah: number }[];
}

export const DATA_DESA = {
  nama: "Desa Bonto Jaya",
  tagline: "Desa Digital, Mandiri, dan Berdaya Saing",
  kecamatan: "Bissappu",
  kabupaten: "Bantaeng",
  provinsi: "Sulawesi Selatan",
  kodePos: "92451",
  luasWilayah: "14.5 km²",
  jumlahPenduduk: 3840,
  jumlahKK: 920,
  jumlahRT: 12,
  jumlahRW: 4,
  alamatBalaiDesa: "Jl. Poros Desa Bonto Jaya No. 01, Kec. Bissappu",
  email: "pemerintah@bontojaya.desa.id",
  telepon: "0812-4567-8901",
  jamPelayanan: "Senin - Jumat | 08.00 - 15.30 WITA",
  pusatKoordinat: [-5.5458585, 119.863438] as [number, number], // Koordinat sekitar Bantaeng/Sulsel
};

export const LIST_UMKM: UMKM[] = [];

export const LIST_BERITA: Berita[] = [];


export const APBDES_DATA: APBDesData = {
  tahun: 2026,
  pendapatan: 1450000000,
  belanja: 1420000000,
  pembiayaan: 30000000,
  rincianPendapatan: [
    { sumber: "Dana Desa (APBN)", jumlah: 820000000 },
    { sumber: "Alokasi Dana Desa (ADD)", jumlah: 450000000 },
    { sumber: "Bagi Hasil Pajak & Retribusi", jumlah: 110000000 },
    { sumber: "Pendapatan Asli Desa (PADes)", jumlah: 70000000 },
  ],
  rincianBelanja: [
    { bidang: "Penyelenggaraan Pemerintahan Desa", jumlah: 480000000 },
    { bidang: "Pelaksanaan Pembangunan Desa", jumlah: 590000000 },
    { bidang: "Pembinaan Kemasyarakatan", jumlah: 120000000 },
    { bidang: "Pemberdayaan Masyarakat & UMKM", jumlah: 180000000 },
    { bidang: "Penanggulangan Bencana & Darurat", jumlah: 50000000 },
  ],
};

export const LIST_PERANGKAT_DESA: PerangkatDesa[] = [
  {
    id: "p-1",
    nama: "H. Andi Muhammad Basri, S.Sos",
    jabatan: "Kepala Desa Bonto Jaya",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    kontak: "0811-2233-4455",
  },
  {
    id: "p-2",
    nama: "Rahmat Hidayat, S.IP",
    jabatan: "Sekretaris Desa",
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    kontak: "0812-3344-5566",
  },
  {
    id: "p-3",
    nama: "Siti Rahmah, A.Md.Ak",
    jabatan: "Kaur Keuangan",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "p-4",
    nama: "Faisal Amir, S.T",
    jabatan: "Kaur Perencanaan & Pembangunan",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "p-5",
    nama: "Nurul Hidayah, S.Pd",
    jabatan: "Kasi Pemerintahan",
    foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "p-6",
    nama: "Zulkifli, S.H",
    jabatan: "Kasi Kesejahteraan & Pelayanan",
    foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
  }
];
