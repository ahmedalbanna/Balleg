import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Landmark } from 'lucide-react';

interface OfficialPoint {
  lat: number;
  lng: number;
  intensity: number;
  label: string;
  category?: string;
  assignedTo?: string;
}

interface OfficialMapViewProps {
  points: OfficialPoint[];
  center?: [number, number];
  zoom?: number;
}

export default function OfficialMapView({ 
  points, 
  center = [15.3694, 44.1910], 
  zoom = 13 
}: OfficialMapViewProps) {
  return (
    <div className="w-full h-full rounded-[2rem] overflow-hidden border-2 border-slate-100 shadow-xl relative group">
      <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-emerald-100 shadow-lg max-w-xs pointer-events-none transition-transform group-hover:scale-105">
          <div className="flex items-center gap-2 mb-1.5 text-emerald-900 font-black text-xs">
              <Landmark className="w-3.5 h-3.5 text-emerald-600" />
              <span>خريطة الولاية القضائية</span>
          </div>
          <p className="text-[9px] text-slate-500 leading-relaxed font-bold">
              توضيح جغرافي لنطاق المسؤولية وتوزيع البلاغات حسب المعطيات الميدانية الرسمية.
          </p>
      </div>

      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <LayersControl position="topleft">
            <LayersControl.BaseLayer checked name="التخطيط العمراني">
                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="تضاريس المنطقة">
                <TileLayer
                    attribution='&copy; ESRI'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
            </LayersControl.BaseLayer>
        </LayersControl>

        {points.map((point, idx) => (
          <CircleMarker
            key={idx}
            center={[point.lat, point.lng]}
            radius={6 + point.intensity * 10}
            fillColor="#10b981"
            color="white"
            weight={2}
            fillOpacity={0.7}
          >
            <Tooltip permanent direction="top" offset={[0, -10]} opacity={0.8}>
               <div className="text-[9px] font-black px-1.5 py-0.5 bg-emerald-900 text-white rounded shadow-sm">
                  {point.label}
               </div>
            </Tooltip>
            <Popup>
              <div className="p-2 min-w-[140px]" dir="rtl">
                <h3 className="font-black text-emerald-950 text-xs mb-1">{point.label}</h3>
                <div className="space-y-1">
                    <p className="text-[9px] font-bold text-slate-500">التصنيف: {point.category || 'غير مصنف'}</p>
                    <p className="text-[9px] font-bold text-emerald-600 italic">المكلف: {point.assignedTo || 'قيد الانتظار'}</p>
                </div>
                <button className="mt-3 w-full py-1.5 bg-emerald-600 text-white text-[9px] font-black rounded hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-600/10 active:scale-95">
                    إصدار توجيه رسمي
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
