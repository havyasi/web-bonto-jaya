'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { UMKM, DATA_DESA } from '@/data/mockData';
import { Phone, MapPin, Clock, Search, Sparkles, Filter, Store, Layers } from 'lucide-react';

// Sub-component to re-center map smoothly
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 16, { animate: true, duration: 1.2 });
  }, [center, map]);
  return null;
}

// Function to create custom Leaflet marker icons based on category
function getCustomMarkerIcon(kategori: string) {
  let color = '#059669'; // default emerald
  if (kategori === 'Kuliner') color = '#e11d48'; // rose
  if (kategori === 'Kerajinan') color = '#d97706'; // amber
  if (kategori === 'Pertanian') color = '#16a34a'; // green
  if (kategori === 'Jasa') color = '#2563eb'; // blue
  if (kategori === 'Perdagangan') color = '#9333ea'; // purple

  const svgHtml = `
    <div style="
      background-color: ${color};
      width: 36px;
      height: 36px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      border: 2px solid white;
    ">
      <div style="transform: rotate(45deg); color: white; font-weight: bold; font-size: 14px;">
        📍
      </div>
    </div>
  `;

  return L.divIcon({
    html: svgHtml,
    className: 'custom-leaflet-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
}

interface Props {
  dataUMKM: UMKM[];
  onSelectUMKM?: (umkm: UMKM) => void;
}

const TILE_PROVIDERS = {
  satellite: {
    id: 'satellite',
    label: 'Satelit HD',
    url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps',
  },
  street: {
    id: 'street',
    label: 'Jalan HD',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
  },
  osm: {
    id: 'osm',
    label: 'OSM Standar',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
  },
};

export default function PetaLeaflet({ dataUMKM, onSelectUMKM }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCenter, setActiveCenter] = useState<[number, number]>(DATA_DESA.pusatKoordinat);
  const [activeUMKM, setActiveUMKM] = useState<UMKM | null>(null);
  const [mapType, setMapType] = useState<keyof typeof TILE_PROVIDERS>('satellite');

  const categories = ['Semua', 'Kuliner', 'Kerajinan', 'Pertanian', 'Jasa', 'Perdagangan'];

  const filteredUMKM = dataUMKM.filter((item) => {
    const matchesCat = selectedCategory === 'Semua' || item.kategori === selectedCategory;
    const matchesSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.pemilik.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleMarkerClick = (umkm: UMKM) => {
    setActiveCenter([umkm.latitude, umkm.longitude]);
    setActiveUMKM(umkm);
    if (onSelectUMKM) onSelectUMKM(umkm);
  };

  return (
    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100 flex flex-col">
      
      {/* Map Control Bar (Search & Filter) */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200/80">
          <Search className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari lokasi UMKM atau nama pemilik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden font-medium"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none bg-white/90 backdrop-blur-md p-1.5 rounded-xl shadow-lg border border-slate-200/80 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md scale-105'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Map Type / Layer Switcher Selector (Floating Top-Right below control bar) */}
      <div className="absolute top-20 sm:top-20 right-4 z-20 bg-white/95 backdrop-blur-md p-1.5 rounded-xl shadow-xl border border-slate-200/80 flex items-center gap-1">
        <span className="text-[11px] font-bold text-slate-500 px-2 flex items-center gap-1 hidden xs:flex">
          <Layers className="w-3.5 h-3.5 text-emerald-600" /> Mode Peta:
        </span>
        {(Object.keys(TILE_PROVIDERS) as Array<keyof typeof TILE_PROVIDERS>).map((key) => (
          <button
            key={key}
            onClick={() => setMapType(key)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              mapType === key
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {TILE_PROVIDERS[key].label}
          </button>
        ))}
      </div>

      {/* Leaflet Map Canvas */}
      <MapContainer
        center={activeCenter}
        zoom={15}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <ChangeView center={activeCenter} />

        <TileLayer
          key={mapType}
          attribution={TILE_PROVIDERS[mapType].attribution}
          url={TILE_PROVIDERS[mapType].url}
        />

        {filteredUMKM.map((umkm) => (
          <Marker
            key={umkm.id}
            position={[umkm.latitude, umkm.longitude]}
            icon={getCustomMarkerIcon(umkm.kategori)}
            eventHandlers={{
              click: () => handleMarkerClick(umkm),
            }}
          >
            <Popup>
              <div className="text-slate-800 font-sans p-1">
                {/* Photo Header */}
                <div className="relative h-32 w-full bg-slate-100 overflow-hidden rounded-t-lg -mt-1 -mx-1 mb-2">
                  <img
                    src={umkm.foto}
                    alt={umkm.nama}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                    {umkm.kategori}
                  </span>
                </div>

                {/* Info Content */}
                <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                  {umkm.nama}
                </h3>
                <p className="text-xs font-semibold text-emerald-700 mt-0.5 flex items-center gap-1">
                  <Store className="w-3.5 h-3.5" /> Pemilik: {umkm.pemilik}
                </p>

                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {umkm.deskripsi}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{umkm.alamat}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{umkm.jamOperasional}</span>
                  </div>
                </div>

                {/* Direct WhatsApp Call to Action */}
                <a
                  href={`https://wa.me/${umkm.kontakWA}?text=Halo%20${encodeURIComponent(umkm.pemilik)},%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(umkm.nama)}%20di%20Website%20Desa%20Bonto%20Jaya`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-lg text-xs font-bold transition-all shadow-md active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Hubungi Pemilik via WA
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Footer Legend */}
      <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 shadow-lg border border-slate-200/80">
        <span className="text-slate-400 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-emerald-600" /> Kategori:
        </span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span> Kuliner</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span> Kerajinan</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-600"></span> Pertanian</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Jasa</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span> Perdagangan</span>
      </div>

    </div>
  );
}
