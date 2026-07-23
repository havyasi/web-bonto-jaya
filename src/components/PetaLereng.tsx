'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { DATA_DESA } from '@/data/mockData';
import { Layers, Mountain, Info, ChevronDown, ChevronUp } from 'lucide-react';

// Sub-component to fit map bounds
function FitBounds({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  map.fitBounds(bounds, { padding: [30, 30] });
  return null;
}

const TILE_LAYERS = {
  topo: {
    label: 'Topografi (Kontur)',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenTopoMap contributors',
  },
  hillshade: {
    label: 'Relief Bukit (Hillshade)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri',
  },
  terrain: {
    label: 'Terrain + Label',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, HERE, Garmin',
  },
  satellite: {
    label: 'Satelit HD',
    url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps',
  },
};

// Approximate slope zones for Bonto Jaya / Bissappu area
// These are illustrative polygons based on general terrain knowledge
const SLOPE_ZONES: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { kelas: 'Datar (0–8%)', level: 1, color: '#22c55e', desc: 'Pemukiman, Persawahan' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [119.855, -5.552], [119.870, -5.552], [119.872, -5.548],
          [119.870, -5.543], [119.858, -5.542], [119.854, -5.546], [119.855, -5.552]
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { kelas: 'Landai (8–15%)', level: 2, color: '#eab308', desc: 'Perkebunan, Tegalan' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [119.870, -5.552], [119.878, -5.550], [119.880, -5.545],
          [119.876, -5.540], [119.872, -5.541], [119.872, -5.548], [119.870, -5.552]
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { kelas: 'Agak Curam (15–25%)', level: 3, color: '#f97316', desc: 'Hutan Rakyat, Kebun Campuran' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [119.854, -5.546], [119.858, -5.542], [119.856, -5.536],
          [119.850, -5.534], [119.848, -5.540], [119.854, -5.546]
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { kelas: 'Curam (25–45%)', level: 4, color: '#ef4444', desc: 'Hutan Lindung, Rawan Longsor' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [119.848, -5.540], [119.850, -5.534], [119.846, -5.530],
          [119.842, -5.533], [119.843, -5.538], [119.848, -5.540]
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { kelas: 'Sangat Curam (>45%)', level: 5, color: '#7f1d1d', desc: 'Tidak Boleh Dibangun' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [119.842, -5.533], [119.846, -5.530], [119.844, -5.526],
          [119.840, -5.528], [119.840, -5.532], [119.842, -5.533]
        ]],
      },
    },
  ],
};

const SLOPE_LEGEND = [
  { kelas: 'Datar (0–8%)', color: '#22c55e', desc: 'Pemukiman, Persawahan' },
  { kelas: 'Landai (8–15%)', color: '#eab308', desc: 'Perkebunan, Tegalan' },
  { kelas: 'Agak Curam (15–25%)', color: '#f97316', desc: 'Hutan Rakyat, Kebun Campuran' },
  { kelas: 'Curam (25–45%)', color: '#ef4444', desc: 'Hutan Lindung, Rawan Longsor' },
  { kelas: 'Sangat Curam (>45%)', color: '#7f1d1d', desc: 'Tidak Boleh Dibangun' },
];

export default function PetaLereng() {
  const [activeLayer, setActiveLayer] = useState<keyof typeof TILE_LAYERS>('topo');
  const [showZones, setShowZones] = useState(true);
  const [legendOpen, setLegendOpen] = useState(true);

  // Bounds for Bonto Jaya area
  const bounds: L.LatLngBoundsExpression = [
    [-5.560, 119.835],
    [-5.524, 119.885],
  ];

  const geoJsonStyle = (feature: any) => ({
    fillColor: feature.properties.color,
    weight: 2,
    opacity: 0.8,
    color: '#ffffff',
    fillOpacity: 0.35,
    dashArray: '3',
  });

  const onEachFeature = (feature: any, layer: L.Layer) => {
    if (feature.properties) {
      (layer as any).bindPopup(`
        <div style="font-family: system-ui; padding: 4px 0;">
          <div style="font-weight: 800; font-size: 14px; color: ${feature.properties.color}; margin-bottom: 4px;">
            ${feature.properties.kelas}
          </div>
          <div style="font-size: 12px; color: #475569;">
            <strong>Potensi Guna Lahan:</strong> ${feature.properties.desc}
          </div>
        </div>
      `);
    }
  };

  return (
    <div className="relative w-full h-[650px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100">

      {/* Map Layer Dropdown — top left */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200/80 flex items-center gap-2 px-3 py-2">
          <Layers className="w-4 h-4 text-emerald-600 shrink-0" />
          <select
            value={activeLayer}
            onChange={(e) => setActiveLayer(e.target.value as keyof typeof TILE_LAYERS)}
            className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer pr-1"
          >
            {(Object.keys(TILE_LAYERS) as Array<keyof typeof TILE_LAYERS>).map((key) => (
              <option key={key} value={key}>
                {TILE_LAYERS[key].label}
              </option>
            ))}
          </select>
        </div>

        {/* Toggle slope overlay */}
        <button
          onClick={() => setShowZones(!showZones)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold shadow-xl border transition-all ${
            showZones
              ? 'bg-emerald-600 text-white border-emerald-500'
              : 'bg-white/95 text-slate-600 border-slate-200/80 backdrop-blur-md'
          }`}
        >
          <Mountain className="w-4 h-4" />
          <span className="hidden sm:inline">Zona Lereng</span>
        </button>
      </div>

      {/* Legend — bottom left */}
      <div className="absolute bottom-4 left-4 z-20 max-w-[260px]">
        <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200/80 overflow-hidden">
          <button
            onClick={() => setLegendOpen(!legendOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-slate-700"
          >
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-emerald-600" /> Legenda Kelerengan
            </span>
            {legendOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
          {legendOpen && (
            <div className="px-4 pb-3 space-y-1.5 border-t border-slate-100 pt-2">
              {SLOPE_LEGEND.map((item) => (
                <div key={item.kelas} className="flex items-start gap-2">
                  <span
                    className="w-4 h-4 rounded shrink-0 mt-0.5 border border-white shadow-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <span className="text-[11px] font-bold text-slate-800 block">{item.kelas}</span>
                    <span className="text-[10px] text-slate-500">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Leaflet Map */}
      <MapContainer
        center={DATA_DESA.pusatKoordinat}
        zoom={14}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <FitBounds bounds={bounds} />

        <TileLayer
          key={activeLayer}
          attribution={TILE_LAYERS[activeLayer].attribution}
          url={TILE_LAYERS[activeLayer].url}
        />

        {showZones && (
          <GeoJSON
            key={`slope-zones-${showZones}`}
            data={SLOPE_ZONES}
            style={geoJsonStyle}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
    </div>
  );
}
