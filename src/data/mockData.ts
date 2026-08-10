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

export interface LayananSurat {
  id: string;
  nama_surat: string;
  persyaratan: string[];
  kategori?: 'Pelayanan Umum' | 'Administrasi Kependudukan';
  created_at?: string;
}

export const DATA_DESA = {
  nama: "Kelurahan Bonto Jaya",
  tagline: "Desa Digital, Mandiri, dan Berdaya Saing",
  kecamatan: "Bissappu",
  kabupaten: "Bantaeng",
  provinsi: "Sulawesi Selatan",
  kodePos: "92451",
  luasWilayah: "14.5 km²",
  jumlahPenduduk: 3840,
  jumlahKK: 920,
  jumlahRT: 14,
  jumlahRW: 7,
  alamatBalaiDesa: "Jl. Poros Desa Bonto Jaya No. 01, Kec. Bissappu",
  email: "bontojayakel@gmail.com",
  telepon: "085396610635 (Lurah)\n085340811117 (Pak Agus)",
  jamPelayanan: "Senin - Jumat | 08.00 - 12.00 WITA",
  pusatKoordinat: [-5.5458585, 119.863438] as [number, number], // Koordinat sekitar Bantaeng/Sulsel
};

export const LIST_UMKM: UMKM[] = [];

export const LIST_BERITA: Berita[] = [];

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

export const LIST_LAYANAN: LayananSurat[] = [
  // === PELAYANAN UMUM KANTOR KELURAHAN ===
  {
    id: "l-1",
    nama_surat: "Surat Keterangan Domisili",
    kategori: "Pelayanan Umum",
    persyaratan: ["Pengantar RT / RW", "FC KTP & Kartu Keluarga", "Pasfoto 3x4 (2 Lembar)"],
  },
  {
    id: "l-2",
    nama_surat: "Surat Keterangan Sudah Menikah",
    kategori: "Pelayanan Umum",
    persyaratan: ["FC KTP & KK Suami-Istri", "FC Buku Nikah / Akta Nikah", "Pengantar RT / RW"],
  },
  {
    id: "l-3",
    nama_surat: "Surat Keterangan Belum Menikah",
    kategori: "Pelayanan Umum",
    persyaratan: ["Pengantar RT / RW", "FC KTP & KK Pemohon", "Surat Pernyataan Belum Menikah"],
  },
  {
    id: "l-4",
    nama_surat: "Surat Keterangan Pindah",
    kategori: "Pelayanan Umum",
    persyaratan: ["Pengantar RT / RW", "KTP & KK Asli", "Pasfoto 3x4 (4 Lembar)"],
  },
  {
    id: "l-5",
    nama_surat: "Surat Keterangan Usaha",
    kategori: "Pelayanan Umum",
    persyaratan: ["Pengantar RT / RW", "FC KTP & Kartu Keluarga", "Foto Lokasi Usaha"],
  },
  {
    id: "l-6",
    nama_surat: "Surat Keterangan Tidak Mampu (SKTM)",
    kategori: "Pelayanan Umum",
    persyaratan: ["Pengantar RT / RW", "FC KTP & Kartu Keluarga", "Surat Pernyataan Bermaterai"],
  },
  {
    id: "l-7",
    nama_surat: "Legalisasi / Pengesahan Surat",
    kategori: "Pelayanan Umum",
    persyaratan: ["Dokumen Asli yang akan dilegalisir", "FC KTP Pemohon", "Pengantar RT / RW"],
  },
  {
    id: "l-8",
    nama_surat: "Surat Keterangan Hibah",
    kategori: "Pelayanan Umum",
    persyaratan: ["FC KTP & KK Pemberi dan Penerima Hibah", "Surat Pernyataan Hibah Bermaterai", "Pengantar RT / RW"],
  },
  {
    id: "l-9",
    nama_surat: "Surat Keterangan Beda Nama",
    kategori: "Pelayanan Umum",
    persyaratan: ["FC KTP & KK Pemohon", "Dokumen yang menunjukkan perbedaan nama", "Pengantar RT / RW"],
  },
  {
    id: "l-10",
    nama_surat: "Surat Keterangan Belum Memiliki Rumah",
    kategori: "Pelayanan Umum",
    persyaratan: ["Pengantar RT / RW", "FC KTP & KK Pemohon", "Surat Pernyataan Bermaterai"],
  },
  // === ADMINISTRASI KEPENDUDUKAN ===
  {
    id: "l-11",
    nama_surat: "Kartu Keluarga (KK)",
    kategori: "Administrasi Kependudukan",
    persyaratan: ["FC KTP Kepala Keluarga", "FC Surat Nikah / Akta Nikah", "FC Akta Kelahiran Anggota Keluarga", "Pengantar RT / RW"],
  },
  {
    id: "l-12",
    nama_surat: "Kartu Tanda Penduduk (KTP) Elektronik",
    kategori: "Administrasi Kependudukan",
    persyaratan: ["FC Kartu Keluarga (KK)", "Surat Pengantar RT / RW", "FC Akta Kelahiran / Ijazah"],
  },
  {
    id: "l-13",
    nama_surat: "Surat Keterangan Pindah Datang",
    kategori: "Administrasi Kependudukan",
    persyaratan: ["Surat Keterangan Pindah dari daerah asal", "FC KTP & KK", "Pengantar RT / RW tujuan"],
  },
  {
    id: "l-14",
    nama_surat: "Surat Keterangan Pindah Keluar",
    kategori: "Administrasi Kependudukan",
    persyaratan: ["KTP & KK Asli", "Pengantar RT / RW", "Pasfoto 3x4 (4 Lembar)"],
  },
  {
    id: "l-15",
    nama_surat: "Akta Kelahiran",
    kategori: "Administrasi Kependudukan",
    persyaratan: ["Surat Keterangan Lahir dari Bidan / RS", "FC KTP & KK Orang Tua", "FC Buku Nikah Orang Tua", "Pengantar RT / RW"],
  },
  {
    id: "l-16",
    nama_surat: "Akta Kematian",
    kategori: "Administrasi Kependudukan",
    persyaratan: ["Surat Keterangan Kematian dari Dokter / RS", "FC KTP & KK Almarhum/ah", "FC KTP Pelapor", "Pengantar RT / RW"],
  },
  {
    id: "l-17",
    nama_surat: "Perubahan Data Kependudukan",
    kategori: "Administrasi Kependudukan",
    persyaratan: ["FC KTP & KK", "Dokumen pendukung perubahan data", "Surat Pernyataan Bermaterai", "Pengantar RT / RW"],
  },
  {
    id: "l-18",
    nama_surat: "Surat Keterangan Domisili (Kependudukan)",
    kategori: "Administrasi Kependudukan",
    persyaratan: ["Pengantar RT / RW", "FC KTP & Kartu Keluarga", "Pasfoto 3x4 (2 Lembar)"],
  },
];

