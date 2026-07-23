'use client';

import dynamic from 'next/dynamic';
import { UMKM } from '@/data/mockData';
import { MapPin } from 'lucide-react';

const PetaLeaflet = dynamic(() => import('@/components/PetaLeaflet'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-2xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-500 animate-pulse">
      <MapPin className="w-12 h-12 text-emerald-600 animate-bounce mb-3" />
      <p className="font-semibold text-base text-slate-700">Memuat Peta Interaktif Kelurahan Bonto Jaya...</p>
      <p className="text-xs text-slate-400 mt-1">Menyiapkan koordinat spasial UMKM</p>
    </div>
  ),
});

interface Props {
  dataUMKM: UMKM[];
  onSelectUMKM?: (umkm: UMKM) => void;
}

export default function PetaLeafletWrapper({ dataUMKM, onSelectUMKM }: Props) {
  return <PetaLeaflet dataUMKM={dataUMKM} onSelectUMKM={onSelectUMKM} />;
}
