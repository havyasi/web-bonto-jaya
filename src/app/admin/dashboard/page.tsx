'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { LIST_UMKM as MOCK_UMKM, LIST_BERITA as MOCK_BERITA, UMKM, Berita } from '@/data/mockData';
import { supabase } from '@/lib/supabase';
import {
  ShieldCheck,
  Plus,
  MapPin,
  Newspaper,
  Users,
  LogOut,
  Trash2,
  Edit3,
  CheckCircle,
  Store,
  Database,
  Image as ImageIcon,
  Loader2,
  AlertTriangle,
  Upload,
  Wifi,
  WifiOff,
  Calendar,
  User,
  FileText
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'umkm' | 'berita'>('umkm');

  // Data States
  const [umkmList, setUmkmList] = useState<UMKM[]>([]);
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  // Modals & UI States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddBeritaModal, setShowAddBeritaModal] = useState(false);
  const [editingUmkmId, setEditingUmkmId] = useState<string | null>(null);
  const [editingBeritaId, setEditingBeritaId] = useState<string | null>(null);
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // New UMKM Form state
  const [nama, setNama] = useState('');
  const [pemilik, setPemilik] = useState('');
  const [kategori, setKategori] = useState<'Kuliner' | 'Kerajinan' | 'Pertanian' | 'Jasa' | 'Perdagangan'>('Kuliner');
  const [latitude, setLatitude] = useState('-5.5180');
  const [longitude, setLongitude] = useState('119.9245');
  const [alamat, setAlamat] = useState('');
  const [kontakWA, setKontakWA] = useState('');
  const [foto, setFoto] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New Berita Form state
  const [judulBerita, setJudulBerita] = useState('');
  const [kategoriBerita, setKategoriBerita] = useState<'Pembangunan' | 'Kegiatan' | 'Pengumuman'>('Kegiatan');
  const [penulisBerita, setPenulisBerita] = useState('Sekretaris Desa');
  const [ringkasanBerita, setRingkasanBerita] = useState('');
  const [kontenBerita, setKontenBerita] = useState('');
  const [gambarBerita, setGambarBerita] = useState('');
  const [gambarBeritaFile, setGambarBeritaFile] = useState<File | null>(null);
  const [gambarBeritaPreview, setGambarBeritaPreview] = useState<string>('');
  const fileBeritaInputRef = useRef<HTMLInputElement>(null);

  // Fetch initial data from Supabase
  useEffect(() => {
    fetchAllData();
  }, []);

  async function fetchAllData() {
    setIsLoading(true);
    try {
      // Fetch UMKM
      const { data: umkmData, error: umkmError } = await supabase
        .from('umkm')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch Berita
      const { data: beritaData, error: beritaError } = await supabase
        .from('berita')
        .select('*')
        .order('created_at', { ascending: false });

      if (umkmError && beritaError) throw umkmError;

      setIsConnected(true);

      if (umkmData && umkmData.length > 0) {
        const mapped: UMKM[] = umkmData.map((row: any) => ({
          id: row.id,
          nama: row.nama,
          pemilik: row.pemilik,
          kategori: row.kategori,
          latitude: row.latitude,
          longitude: row.longitude,
          alamat: row.alamat,
          kontakWA: row.kontak_wa,
          foto: row.foto,
          deskripsi: row.deskripsi,
          jamOperasional: row.jam_operasional ?? '08.00 - 17.00 WITA',
          produkUnggulan: row.produk_unggulan ?? [],
          rating: row.rating ?? 5.0,
        }));
        setUmkmList(mapped);
      } else {
        setUmkmList(MOCK_UMKM);
      }

      if (beritaData && beritaData.length > 0) {
        const mappedBerita: Berita[] = beritaData.map((row: any) => ({
          id: row.id,
          judul: row.judul,
          slug: row.slug,
          kategori: row.kategori,
          tanggal: row.tanggal ?? new Date().toLocaleDateString('id-ID'),
          penulis: row.penulis ?? 'Admin Desa',
          ringkasan: row.ringkasan,
          konten: row.konten,
          gambar: row.gambar,
        }));
        setBeritaList(mappedBerita);
      } else {
        setBeritaList(MOCK_BERITA);
      }

    } catch (err) {
      console.warn('Gagal mengambil data dari Supabase:', err);
      setIsConnected(false);
      setUmkmList(MOCK_UMKM);
      setBeritaList(MOCK_BERITA);
    } finally {
      setIsLoading(false);
    }
  }

  function showNotification(msg: string, type: 'success' | 'error' = 'success') {
    setNotification(msg);
    setNotificationType(type);
    setTimeout(() => setNotification(''), 5000);
  }

  // Handle Photo selection
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>, isBerita = false) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showNotification('Hanya file gambar (JPG, PNG, WebP) yang diizinkan.', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showNotification('Ukuran foto maks 5MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (isBerita) {
        setGambarBeritaFile(file);
        setGambarBerita('');
        setGambarBeritaPreview(reader.result as string);
      } else {
        setFotoFile(file);
        setFoto('');
        setFotoPreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  }

  // Upload photo to Supabase Storage
  async function uploadPhoto(file: File, bucket = 'umkm-photos'): Promise<string | null> {
    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `photos/${fileName}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (err: any) {
      console.error('Gagal mengunggah foto:', err);
      showNotification(`Gagal mengunggah foto: ${err.message}`, 'error');
      return null;
    } finally {
      setIsUploading(false);
    }
  }

  // Submit UMKM
  const handleAddUMKM = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let fotoUrl = foto;
      if (fotoFile) {
        const uploadedUrl = await uploadPhoto(fotoFile);
        if (!uploadedUrl) { setIsSaving(false); return; }
        fotoUrl = uploadedUrl;
      }
      if (!fotoUrl) fotoUrl = 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop';

      const newEntry = {
        nama,
        pemilik,
        kategori,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        alamat: alamat || 'Desa Bonto Jaya',
        kontak_wa: kontakWA || '6281234567890',
        foto: fotoUrl,
        deskripsi: deskripsi || 'Deskripsi produk usaha warga Desa Bonto Jaya.',
        jam_operasional: '08.00 - 17.00 WITA',
      };

      if (isConnected) {
        if (editingUmkmId) {
          const { error } = await supabase.from('umkm').update(newEntry).eq('id', editingUmkmId);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('umkm').insert(newEntry);
          if (error) throw error;
        }
        await fetchAllData();
      } else {
        if (editingUmkmId) {
          setUmkmList(umkmList.map(u => u.id === editingUmkmId ? { ...u, ...newEntry, kontakWA: newEntry.kontak_wa, jamOperasional: newEntry.jam_operasional, produkUnggulan: newEntry.produk_unggulan } : u));
        } else {
          setUmkmList([{ id: `umkm-${Date.now()}`, ...newEntry, kontakWA: newEntry.kontak_wa, jamOperasional: newEntry.jam_operasional, produkUnggulan: newEntry.produk_unggulan }, ...umkmList]);
        }
      }

      const wasEditing = !!editingUmkmId;
      const savedNama = nama;
      setShowAddModal(false);
      resetUMKMForm();
      showNotification(`Berhasil ${wasEditing ? 'memperbarui' : 'menambah'} UMKM "${savedNama}"!`);
    } catch (err: any) {
      showNotification(`Gagal menyimpan UMKM: ${err.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Submit Berita
  const handleAddBerita = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let gambarUrl = gambarBerita;
      if (gambarBeritaFile) {
        const uploadedUrl = await uploadPhoto(gambarBeritaFile);
        if (uploadedUrl) gambarUrl = uploadedUrl;
      }
      if (!gambarUrl) gambarUrl = 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=600&auto=format&fit=crop';

      const slug = judulBerita.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const tanggalToday = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

      const newBerita = {
        judul: judulBerita,
        slug,
        kategori: kategoriBerita,
        tanggal: tanggalToday,
        penulis: penulisBerita || 'Perangkat Desa',
        ringkasan: ringkasanBerita || judulBerita,
        konten: kontenBerita || ringkasanBerita,
        gambar: gambarUrl,
      };

      if (isConnected) {
        if (editingBeritaId) {
          const { error } = await supabase.from('berita').update(newBerita).eq('id', editingBeritaId);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('berita').insert(newBerita);
          if (error) throw error;
        }
        await fetchAllData();
      } else {
        if (editingBeritaId) {
          setBeritaList(beritaList.map(b => b.id === editingBeritaId ? { ...b, ...newBerita } : b));
        } else {
          setBeritaList([{ id: `berita-${Date.now()}`, ...newBerita }, ...beritaList]);
        }
      }

      const wasEditingBerita = !!editingBeritaId;
      const savedJudul = judulBerita;
      setShowAddBeritaModal(false);
      resetBeritaForm();
      showNotification(`Berhasil ${wasEditingBerita ? 'memperbarui' : 'menerbitkan'} artikel berita "${savedJudul}"!`);
    } catch (err: any) {
      showNotification(`Gagal menerbitkan berita: ${err.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete UMKM
  const handleDeleteUMKM = async (id: string, namaUsaha: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus UMKM "${namaUsaha}"?`)) return;

    try {
      if (isConnected) {
        const { error } = await supabase.from('umkm').delete().eq('id', id);
        if (error) throw error;
      }
      setUmkmList(umkmList.filter((u) => u.id !== id));
      showNotification(`Data UMKM "${namaUsaha}" berhasil dihapus.`);
    } catch (err: any) {
      showNotification(`Gagal menghapus: ${err.message}`, 'error');
    }
  };

  // Delete Berita
  const handleDeleteBerita = async (id: string, judul: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus artikel berita "${judul}"?`)) return;

    try {
      if (isConnected) {
        const { error } = await supabase.from('berita').delete().eq('id', id);
        if (error) throw error;
      }
      setBeritaList(beritaList.filter((b) => b.id !== id));
      showNotification(`Artikel berita "${judul}" berhasil dihapus.`);
    } catch (err: any) {
      showNotification(`Gagal menghapus berita: ${err.message}`, 'error');
    }
  };

  function resetUMKMForm() {
    setNama(''); setPemilik(''); setDeskripsi(''); setAlamat(''); setKontakWA(''); setFoto('');
    setFotoFile(null); setFotoPreview(''); setKategori('Kuliner'); setLatitude('-5.5180'); setLongitude('119.9245');
    setEditingUmkmId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function resetBeritaForm() {
    setJudulBerita(''); setRingkasanBerita(''); setKontenBerita(''); setGambarBerita('');
    setGambarBeritaFile(null); setGambarBeritaPreview(''); setKategoriBerita('Kegiatan'); setPenulisBerita('Sekretaris Desa');
    setEditingBeritaId(null);
    if (fileBeritaInputRef.current) fileBeritaInputRef.current.value = '';
  }

  const handleEditUMKMClick = (umkm: UMKM) => {
    setEditingUmkmId(umkm.id);
    setNama(umkm.nama);
    setPemilik(umkm.pemilik);
    setKategori(umkm.kategori as any);
    setLatitude(umkm.latitude.toString());
    setLongitude(umkm.longitude.toString());
    setAlamat(umkm.alamat);
    setKontakWA(umkm.kontakWA);
    setFoto(umkm.foto);
    setDeskripsi(umkm.deskripsi);
    setFotoPreview(umkm.foto);
    setShowAddModal(true);
  };

  const handleEditBeritaClick = (berita: Berita) => {
    setEditingBeritaId(berita.id);
    setJudulBerita(berita.judul);
    setKategoriBerita(berita.kategori as any);
    setPenulisBerita(berita.penulis);
    setRingkasanBerita(berita.ringkasan);
    setKontenBerita(berita.konten);
    setGambarBerita(berita.gambar);
    setGambarBeritaPreview(berita.gambar);
    setShowAddBeritaModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Panel CMS Admin</span>
            <h1 className="text-2xl font-black">Dasbor Pengelolaan Desa Bonto Jaya</h1>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
              {isConnected ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Supabase PostgreSQL — Terhubung</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-400">Mode Offline — Data Lokal</span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Tambah UMKM
          </button>
          <button
            onClick={() => setShowAddBeritaModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Tambah Berita Baru
          </button>
          <Link
            href="/admin/login"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors border border-slate-700"
          >
            <LogOut className="w-4 h-4" /> Keluar
          </Link>
        </div>
      </div>

      {/* Toast Notification — Fixed bottom-right popup */}
      <div
        className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl text-sm font-bold transition-all duration-500 max-w-sm ${notification
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0 pointer-events-none'
          } ${notificationType === 'success'
            ? 'bg-emerald-600 text-white'
            : 'bg-red-600 text-white'
          }`}
      >
        {notificationType === 'success'
          ? <CheckCircle className="w-5 h-5 text-white shrink-0" />
          : <AlertTriangle className="w-5 h-5 text-white shrink-0" />}
        <span className="leading-snug">{notification}</span>
        <button
          onClick={() => setNotification('')}
          className="ml-2 text-white/70 hover:text-white text-lg leading-none font-black shrink-0"
        >
          ✕
        </button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Total Titik UMKM</span>
            <span className="text-2xl font-black text-slate-900">{isLoading ? '...' : `${umkmList.length} Terpasang`}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center shrink-0">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Artikel Berita Desa</span>
            <span className="text-2xl font-black text-slate-900">{isLoading ? '...' : `${beritaList.length} Artikel`}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">Status Database Supabase</span>
            <span className="text-2xl font-black text-slate-900">{isConnected ? 'Aktif & Terhubung' : 'Mode Offline'}</span>
          </div>
        </div>
      </div>

      {/* Tab Switcher & Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden p-6 space-y-6">

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('umkm')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${activeTab === 'umkm'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              <Store className="w-4 h-4" /> Kelola UMKM ({umkmList.length})
            </button>
            <button
              onClick={() => setActiveTab('berita')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${activeTab === 'berita'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              <Newspaper className="w-4 h-4" /> Kelola Berita Desa ({beritaList.length})
            </button>
          </div>

          <div>
            {activeTab === 'umkm' ? (
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
              >
                <Plus className="w-4 h-4" /> Tambah UMKM
              </button>
            ) : (
              <button
                onClick={() => setShowAddBeritaModal(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" /> Tambah Berita Baru
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: KELOLA UMKM */}
        {activeTab === 'umkm' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <th className="p-3">Foto & Nama UMKM</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Pemilik</th>
                  <th className="p-3">Koordinat</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {umkmList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">Belum ada data UMKM.</td>
                  </tr>
                ) : (
                  umkmList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 flex items-center space-x-3">
                        <img src={item.foto} alt={item.nama} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                        <div>
                          <span className="font-extrabold text-slate-900 block">{item.nama}</span>
                          <span className="text-[11px] text-slate-400">{item.alamat}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold text-[10px]">
                          {item.kategori}
                        </span>
                      </td>
                      <td className="p-3 font-semibold">{item.pemilik}</td>
                      <td className="p-3 font-mono text-[11px] text-slate-500">{item.latitude}, {item.longitude}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleEditUMKMClick(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-1"
                          title="Edit Data UMKM"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUMKM(item.id, item.nama)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Hapus Titik UMKM"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: KELOLA BERITA */}
        {activeTab === 'berita' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <th className="p-3">Gambar & Judul Artikel</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Tanggal & Penulis</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {beritaList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-400">Belum ada berita yang diterbitkan.</td>
                  </tr>
                ) : (
                  beritaList.map((berita) => (
                    <tr key={berita.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 flex items-center space-x-3">
                        <img src={berita.gambar} alt={berita.judul} className="w-12 h-10 rounded-lg object-cover bg-slate-100" />
                        <div>
                          <span className="font-extrabold text-slate-900 block max-w-md truncate">{berita.judul}</span>
                          <span className="text-[11px] text-slate-400 line-clamp-1">{berita.ringkasan}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full font-bold text-[10px]">
                          {berita.kategori}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 font-medium">
                        <div>{berita.tanggal}</div>
                        <span className="text-[10px] text-slate-400">Oleh: {berita.penulis}</span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleEditBeritaClick(berita)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-1"
                          title="Edit Berita"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBerita(berita.id, berita.judul)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Hapus Berita"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* MODAL 1: TAMBAH UMKM */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">{editingUmkmId ? 'Edit Data UMKM' : 'Tambah Titik Koordinat UMKM'}</h3>
              <button onClick={() => { setShowAddModal(false); resetUMKMForm(); }} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>

            <form onSubmit={handleAddUMKM} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Nama Usaha UMKM</label>
                <input type="text" required placeholder="Contoh: Warung Kopi Bonto" value={nama} onChange={(e) => setNama(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">Nama Pemilik</label>
                  <input type="text" required placeholder="Pak Syamsuddin" value={pemilik} onChange={(e) => setPemilik(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Kategori</label>
                  <select value={kategori} onChange={(e) => setKategori(e.target.value as any)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <option value="Kuliner">Kuliner</option>
                    <option value="Kerajinan">Kerajinan</option>
                    <option value="Pertanian">Pertanian</option>
                    <option value="Jasa">Jasa</option>
                    <option value="Perdagangan">Perdagangan</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">Latitude</label>
                  <input type="text" required value={latitude} onChange={(e) => setLatitude(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono" />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Longitude</label>
                  <input type="text" required value={longitude} onChange={(e) => setLongitude(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono" />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Alamat Lengkap / Dusun (Contoh: Dusun Bonto Tinggi RT 02/RW 01)</label>
                <input type="text" placeholder="Dusun Bonto Tinggi RT 01/RW 01" value={alamat} onChange={(e) => setAlamat(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Nomor WhatsApp (Format: 628xxxx)</label>
                <input type="text" placeholder="6281234567890" value={kontakWA} onChange={(e) => setKontakWA(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="block text-slate-700 mb-1">Foto Usaha</label>
                <div onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-dashed border-slate-300 hover:border-emerald-400 rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-50 hover:bg-emerald-50/30">
                  {fotoPreview ? (
                    <div className="space-y-2">
                      <img src={fotoPreview} alt="Preview" className="w-24 h-24 object-cover rounded-lg mx-auto" />
                      <p className="text-[11px] text-emerald-600 font-bold">{fotoFile?.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="w-8 h-8 mx-auto text-slate-400" />
                      <p className="text-slate-500 text-[11px]">Unggah foto ke <span className="text-emerald-600 font-bold">Supabase Storage</span></p>
                    </div>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleFileSelect(e, false)} className="hidden" />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea rows={3} placeholder="Penjelasan produk..." value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <div className="pt-2 flex items-center justify-end space-x-3">
                <button type="button" onClick={() => { setShowAddModal(false); resetUMKMForm(); }} className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold">Batal</button>
                <button type="submit" disabled={isSaving} className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl shadow-md hover:bg-emerald-700 flex items-center gap-2">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />} {editingUmkmId ? 'Perbarui Data' : 'Simpan ke Supabase'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: TAMBAH BERITA */}
      {showAddBeritaModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">{editingBeritaId ? 'Edit Artikel Berita' : 'Tambah Artikel Berita Desa'}</h3>
              <button onClick={() => { setShowAddBeritaModal(false); resetBeritaForm(); }} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>

            <form onSubmit={handleAddBerita} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Judul Artikel Berita</label>
                <input type="text" required placeholder="Contoh: Pelatihan Digitalisasi UMKM Desa" value={judulBerita} onChange={(e) => setJudulBerita(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1">Kategori Artikel</label>
                  <select value={kategoriBerita} onChange={(e) => setKategoriBerita(e.target.value as any)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Pembangunan">Pembangunan</option>
                    <option value="Pengumuman">Pengumuman</option>

                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Penulis / Sumber</label>
                  <input type="text" required placeholder="Sekretaris Desa" value={penulisBerita} onChange={(e) => setPenulisBerita(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Ringkasan Singkat (1-2 Kalimat)</label>
                <textarea rows={2} required placeholder="Ringkasan awal berita..." value={ringkasanBerita} onChange={(e) => setRingkasanBerita(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Isi Berita Lengkap</label>
                <textarea rows={5} required placeholder="Tuliskan berita secara mendalam..." value={kontenBerita} onChange={(e) => setKontenBerita(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>

              {/* Banner Upload Section */}
              <div className="space-y-2">
                <label className="block text-slate-700 mb-1">Gambar Banner Artikel</label>
                <div onClick={() => fileBeritaInputRef.current?.click()} className="w-full border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-50 hover:bg-blue-50/30">
                  {gambarBeritaPreview ? (
                    <div className="space-y-2">
                      <img src={gambarBeritaPreview} alt="Preview" className="w-32 h-20 object-cover rounded-lg mx-auto" />
                      <p className="text-[11px] text-blue-600 font-bold">{gambarBeritaFile?.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="w-8 h-8 mx-auto text-slate-400" />
                      <p className="text-slate-500 text-[11px]">Unggah gambar banner ke <span className="text-blue-600 font-bold">Supabase Storage</span></p>
                    </div>
                  )}
                  <input ref={fileBeritaInputRef} type="file" accept="image/*" onChange={(e) => handleFileSelect(e, true)} className="hidden" />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button type="button" onClick={() => { setShowAddBeritaModal(false); resetBeritaForm(); }} className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold">Batal</button>
                <button type="submit" disabled={isSaving} className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 flex items-center gap-2">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Newspaper className="w-4 h-4" />} {editingBeritaId ? 'Perbarui Berita' : 'Terbitkan Berita'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
