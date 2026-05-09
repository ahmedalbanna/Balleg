import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Headphones, AlertCircle } from 'lucide-react';

interface OperatorPoint {
  lat: number;
  lng: number;
  intensity: number;
  label: string;
  type?: string;
  caller?: string;
  time?: string;
}

interface OperatorMapViewProps {
  points: OperatorPoint[];
  center?: [number, number];
  zoom?: number;
}

export default function OperatorMapView({ 
  points, 
  center = [15.3694, 44.1910], 
  zoom = 13 
}: OperatorMapViewProps) {
  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-8 border-slate-50 shadow-2xl relative">
      <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-3">
              <Headphones size={18} className="animate-pulse" />
              <span className="text-xs font-black">غرفة عمليات اليمن الموحدة</span>
          </div>
      </div>

      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="خريطة عملياتية">
                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="قمر صناعي">
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
            radius={10 + point.intensity * 8}
            fillColor={point.type === 'emergency' ? '#ef4444' : '#3b82f6'}
            color="white"
            weight={3}
            fillOpacity={0.8}
          >
            <Tooltip permanent direction="top" offset={[0, -12]} opacity={0.9}>
               <div className="text-[10px] font-black px-2 py-1 bg-white text-slate-900 rounded-lg shadow-md border border-slate-100 italic">
                  {point.label}
               </div>
            </Tooltip>
            <Popup>
              <div className="p-3 min-w-[160px]" dir="rtl">
                <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={14} className={point.type === 'emergency' ? 'text-red-500' : 'text-blue-500'} />
                    <h3 className="font-black text-slate-900 text-sm">{point.label}</h3>
                </div>
                <div className="space-y-1.5 mb-4">
                    <p className="text-[10px] font-bold text-slate-500 italic">المتصل: {point.caller || 'غير معروف'}</p>
                    <p className="text-[10px] font-bold text-slate-400">الوقت: {point.time || 'الآن'}</p>
                </div>
                <button className="w-full py-2 bg-slate-900 text-white text-[10px] font-black rounded-xl hover:bg-black transition-all active:scale-95">
                    تحويل لفرقة الميدان
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
