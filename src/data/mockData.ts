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
  kategori: 'Pembangunan' | 'Kegiatan' | 'Pengumuman' | 'APBDes';
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
  pusatKoordinat: [-5.518, 119.925] as [number, number], // Koordinat sekitar Bantaeng/Sulsel
};

export const LIST_UMKM: UMKM[] = [
  {
    id: "umkm-1",
    nama: "Kerajinan Anyaman Bambu Jaya",
    pemilik: "Pak Syamsuddin",
    kategori: "Kerajinan",
    latitude: -5.5175,
    longitude: 119.9242,
    alamat: "Dusun Bonto Tinggi RT 02/RW 01",
    kontakWA: "6281234567890",
    foto: "https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=600&auto=format&fit=crop",
    deskripsi: "Pusat produksi anyaman bambu tradisional seperti bakul, tudung saji, hiasan dinding, dan tas etnik ramah lingkungan.",
    jamOperasional: "08.00 - 17.00 WITA",
    produkUnggulan: ["Bakul Bambu Motif", "Tudung Saji Modern", "Tas Anyaman Souvenir"],
    rating: 4.9,
  },
  {
    id: "umkm-2",
    nama: "Warung Kopi & Kuliner Khas Kancing",
    pemilik: "Ibu Hajar",
    kategori: "Kuliner",
    latitude: -5.5190,
    longitude: 119.9265,
    alamat: "Jl. Poros Utama Dusun Bonto Bira",
    kontakWA: "6282198765432",
    foto: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop",
    deskripsi: "Menyajikan kue tradisional seperti Cucur Bayao, Barongko, dan Kopi Arabika lokal racikan khas warga Desa Bonto Jaya.",
    jamOperasional: "07.00 - 21.00 WITA",
    produkUnggulan: ["Kopi Robusta Bonto", "Cucur Bayao", "Barongko Manis"],
    rating: 4.8,
  },
  {
    id: "umkm-3",
    nama: "Kebun Madu Hutan Trigona Bonto",
    pemilik: "Daeng Raba",
    kategori: "Pertanian",
    latitude: -5.5160,
    longitude: 119.9280,
    alamat: "Area Perkebunan Dusun Kampong Beru",
    kontakWA: "6285341239876",
    foto: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?q=80&w=600&auto=format&fit=crop",
    deskripsi: "Budidaya madu kelulut/trigona asli tanpa bahan pengawet. Kaya akan propolis alami dan asam organik untuk kesehatan.",
    jamOperasional: "08.00 - 16.00 WITA",
    produkUnggulan: ["Madu Trigona Murni 250ml", "Propolis Tetes Alami"],
    rating: 5.0,
  },
  {
    id: "umkm-4",
    nama: "Bengkel Sepeda Motor & Las Bonto Mandiri",
    pemilik: "Pak Aris",
    kategori: "Jasa",
    latitude: -5.5185,
    longitude: 119.9220,
    alamat: "Jl. Samping Lapangan Olahraga Desa",
    kontakWA: "6281355667788",
    foto: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
    deskripsi: "Layanan perbaikan sepeda motor, ganti oli, tune up, serta jasa pengelasan pagar, kanopi, dan alat-alat pertanian warga.",
    jamOperasional: "08.00 - 18.00 WITA",
    produkUnggulan: ["Servis Injeksi Motor", "Las Pagar & Alat Tani"],
    rating: 4.7,
  },
  {
    id: "umkm-5",
    nama: "Toko Sembako & Hasil Tani Berkah",
    pemilik: "Ibu Nurhayati",
    kategori: "Perdagangan",
    latitude: -5.5205,
    longitude: 119.9250,
    alamat: "Dusun Bonto Jaya Barat No. 12",
    kontakWA: "6285299881122",
    foto: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop",
    deskripsi: "Menyediakan kebutuhan pokok harian warga serta menjual hasil bumi desa seperti beras merah, jagung pipil, dan cengkeh.",
    jamOperasional: "06.00 - 21.00 WITA",
    produkUnggulan: ["Beras Red Rice Organik", "Cengkeh Kering Kualitas A"],
    rating: 4.9,
  }
];

export const LIST_BERITA: Berita[] = [
  {
    id: "berita-1",
    judul: "Musrenbangdes Bonto Jaya 2026: Prioritaskan Pembangunan Jalan Tani dan Digitalisasi UMKM",
    slug: "musrenbangdes-2026-prioritas-jalan-tani-dan-umkm",
    kategori: "Pembangunan",
    tanggal: "18 Juli 2026",
    penulis: "Sekretaris Desa",
    ringkasan: "Pemerintah Desa Bonto Jaya menggelar Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) untuk menetapkan skala prioritas APBDes 2027.",
    konten: "Musrenbangdes tahun ini berjalan dengan lancar dan dihadiri oleh jajaran BPD, kepala dusun, tokoh masyarakat, serta perwakilan kelompok tani & UMKM. Fokus utama alokasi anggaran adalah penyelesaian betonisasi jalan tani sepanjang 1.2 km serta penyediaan infrastruktur internet dan peta digital UMKM.",
    gambar: "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "berita-2",
    judul: "Pelatihan Pengemasan & Pemasaran Digital bagi Pelaku Usaha Kerajinan Desa",
    slug: "pelatihan-pengemasan-pemasaran-digital-umkm",
    kategori: "Kegiatan",
    tanggal: "10 Juli 2026",
    penulis: "Kaur Perencanaan",
    ringkasan: "Sebanyak 25 pengrajin anyaman bambu mengikuti lokakarya branding dan pemasaran online untuk menembus pasar luar daerah.",
    konten: "Dinas Koperasi dan UMKM bekerja sama dengan Pemdes Bonto Jaya menggelar pelatihan dua hari mengenai desain kemasan ramah lingkungan, fotografi produk dengan smartphone, serta tata cara pendaftaran toko online di marketplace nasional.",
    gambar: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "berita-3",
    judul: "Pengumuman Jadwal Pelayanan Administrasi Keliling dan Posyandu Lansia",
    slug: "pengumuman-jadwal-layanan-keliling-posyandu",
    kategori: "Pengumuman",
    tanggal: "02 Juli 2026",
    penulis: "Kasi Kesejahteraan",
    ringkasan: "Pelayanan pengurusan surat pengantar dan pemeriksaan kesehatan gratis akan diselenggarakan di Dusun Bonto Bira pekan ini.",
    konten: "Guna mendekatkan pelayanan publik kepada warga, Pemerintah Desa Bonto Jaya meluncurkan program 'Desa Menyapa' dengan menghadirkan mobil pelayanan administrasi dan tim medis posyandu secara berkala di tiap-tiap dusun.",
    gambar: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop",
  }
];

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
