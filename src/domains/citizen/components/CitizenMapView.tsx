import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Home, Info } from 'lucide-react';

interface CitizenPoint {
  lat: number;
  lng: number;
  intensity: number;
  label: string;
  status?: string;
  description?: string;
}

interface CitizenMapViewProps {
  points: CitizenPoint[];
  center?: [number, number];
  zoom?: number;
}

export default function CitizenMapView({ 
  points, 
  center = [15.3694, 44.1910], 
  zoom = 13 
}: CitizenMapViewProps) {
  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-slate-50 shadow-2xl relative">
      <div className="absolute top-6 right-6 z-[1000] bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-emerald-100 shadow-xl max-w-xs pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5 text-emerald-900 font-black text-xs">
              <Home className="w-3.5 h-3.5 text-emerald-600" />
              <span>خريطة البلاغات المجتمعية</span>
          </div>
          <p className="text-[9px] text-slate-500 leading-relaxed font-bold italic">
              استكشف البلاغات في منطقتك والتعاون مع جيرانك لتحسين الخدمات.
          </p>
      </div>

      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <LayersControl position="bottomleft">
            <LayersControl.BaseLayer checked name="الخريطة الافتراضية">
                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </LayersControl.BaseLayer>
        </LayersControl>

        {points.map((point, idx) => (
          <CircleMarker
            key={idx}
            center={[point.lat, point.lng]}
            radius={8 + point.intensity * 8}
            fillColor="#10b981"
            color="white"
            weight={3}
            fillOpacity={0.7}
          >
            <Tooltip permanent direction="top" offset={[0, -12]} opacity={0.9}>
               <div className="text-[10px] font-black px-2 py-0.5 bg-emerald-600 text-white rounded shadow-md">
                  {point.label}
               </div>
            </Tooltip>
            <Popup>
              <div className="p-3 min-w-[150px]" dir="rtl">
                <div className="inline-flex items-center gap-2 mb-2 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black">
                    <Info size={12} />
                    <span>تفاصيل البلاغ</span>
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-1">{point.label}</h3>
                <p className="text-[10px] text-slate-500 leading-relaxed italic mb-3">
                    {point.description || 'بلاغ مسجل في منطقتك'}
                </p>
                <button className="w-full py-2 bg-emerald-600 text-white text-[10px] font-black rounded-xl hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-600/20">
                    متابعة التحديثات
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
