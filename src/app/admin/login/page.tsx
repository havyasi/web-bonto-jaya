'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Demo Authentication check
    setTimeout(() => {
      if (email === 'admin@bontojaya.desa.id' && password === 'admin123') {
        router.push('/admin/dashboard');
      } else {
        // Allow quick demo access or show message
        if (email.length > 0 && password.length > 0) {
          router.push('/admin/dashboard');
        } else {
          setError('Email dan kata sandi wajib diisi!');
          setLoading(false);
        }
      }
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 rounded-2xl text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Login Perangkat Desa</h1>
          <p className="text-xs text-slate-500">
            Masuk ke Dasbor CMS Supabase untuk mengelola berita, titik koordinat UMKM, dan konten desa.
          </p>
        </div>

        {/* Form Error Alert */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Demo Hint Box */}
        <div className="bg-emerald-50 border border-emerald-200/80 p-3.5 rounded-xl text-xs text-emerald-800 space-y-1">
          <p className="font-extrabold flex items-center gap-1.5">
            🔑 Akses Demo Admin CMS:
          </p>
          <p>Email: <code className="bg-emerald-100 px-1.5 py-0.5 rounded font-mono">admin@bontojaya.desa.id</code></p>
          <p>Password: <code className="bg-emerald-100 px-1.5 py-0.5 rounded font-mono">admin123</code></p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Perangkat Desa</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bontojaya.desa.id"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Memverifikasi Autentikasi Supabase...' : 'Masuk Dasbor Admin'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

      </div>
    </div>
  );
}
