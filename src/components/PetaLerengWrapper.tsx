'use client';

import dynamic from 'next/dynamic';
import { Mountain } from 'lucide-react';

const PetaLereng = dynamic(() => import('@/components/PetaLereng'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[650px] rounded-2xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-500 animate-pulse">
      <Mountain className="w-12 h-12 text-emerald-600 animate-bounce mb-3" />
      <p className="font-semibold text-base text-slate-700">Memuat Peta Kelerengan...</p>
      <p className="text-xs text-slate-400 mt-1">Menyiapkan data topografi & relief</p>
    </div>
  ),
});

export default function PetaLerengWrapper() {
  return <PetaLereng />;
}
