import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Shield } from 'lucide-react';

interface AdminPoint {
  lat: number;
  lng: number;
  intensity: number;
  label: string;
  status?: string;
  department?: string;
}

interface AdminMapViewProps {
  points: AdminPoint[];
  center?: [number, number];
  zoom?: number;
}

export default function AdminMapView({ 
  points, 
  center = [15.3694, 44.1910], 
  zoom = 13 
}: AdminMapViewProps) {
  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl relative">
      <div className="absolute top-6 right-6 z-[1000] bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl max-w-xs pointer-events-none">
          <div className="flex items-center gap-3 mb-2 text-slate-900 font-black text-sm">
              <Shield className="w-4 h-4 text-indigo-600" />
              <span>وضع الرصد الإداري</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
              يتم عرض النقاط الساخنة للبلاغات وتحركات الفرق الفنية بشكل لحظي.
          </p>
      </div>

      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <LayersControl position="topleft">
            <LayersControl.BaseLayer checked name="خريطة الشارع">
                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="خريطة مظلمة">
                <TileLayer
                    attribution='&copy; CartoDB'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
            </LayersControl.BaseLayer>
        </LayersControl>

        {points.map((point, idx) => (
          <CircleMarker
            key={idx}
            center={[point.lat, point.lng]}
            radius={8 + point.intensity * 12}
            fillColor={point.status === 'critical' ? '#ef4444' : '#6366f1'}
            color="white"
            weight={3}
            fillOpacity={0.6}
          >
            <Tooltip permanent direction="top" offset={[0, -15]} opacity={0.9}>
               <div className="text-[10px] font-black px-2 py-1 bg-slate-900 text-white rounded-lg shadow-lg">
                  {point.label}
               </div>
            </Tooltip>
            <Popup>
              <div className="p-3 min-w-[150px]" dir="rtl">
                <h3 className="font-black text-indigo-950 text-sm mb-1">{point.label}</h3>
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-[10px] font-bold text-slate-500">القسم: {point.department || 'عام'}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                   الكثافة المرصودة: {Math.round(point.intensity * 100)}%
                </p>
                <button className="mt-3 w-full py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg hover:bg-indigo-100 transition-colors">
                    عرض التفاصيل الإدارية
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
