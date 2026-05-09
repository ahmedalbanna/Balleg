import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, LayersControl, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, Info, Truck } from 'lucide-react';

interface DriverPoint {
  lat: number;
  lng: number;
  intensity: number;
  label: string;
  type?: 'loading' | 'delivery' | 'checkpoint' | 'hazard';
  status?: string;
}

interface DriverMapViewProps {
  points: DriverPoint[];
  route?: [number, number][];
  center?: [number, number];
  zoom?: number;
}

export default function DriverMapView({ 
  points, 
  route = [],
  center = [15.3694, 44.1910], 
  zoom = 13 
}: DriverMapViewProps) {
  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-teal-50 shadow-2xl relative">
      <div className="absolute top-6 right-6 z-[1000] bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-teal-100 shadow-xl max-w-xs pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5 text-teal-900 font-black text-xs">
              <Navigation className="w-3.5 h-3.5 text-teal-600" />
              <span>متابعة خط السير</span>
          </div>
          <p className="text-[9px] text-slate-500 leading-relaxed font-bold italic">
              عرض حي لمسار الرحلة الحالي، نقاط التوقف المجدولة، والبلاغات المرورية.
          </p>
      </div>

      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <LayersControl position="bottomleft">
            <LayersControl.BaseLayer checked name="خريطة الملاحة">
                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </LayersControl.BaseLayer>
        </LayersControl>

        {route.length > 0 && (
          <Polyline 
            positions={route} 
            color="#0d9488" 
            weight={5} 
            opacity={0.6}
            dashArray="10, 10"
          />
        )}

        {points.map((point, idx) => (
          <CircleMarker
            key={idx}
            center={[point.lat, point.lng]}
            radius={8 + point.intensity * 8}
            fillColor={point.type === 'checkpoint' ? '#f43f5e' : point.type === 'hazard' ? '#e11d48' : '#0d9488'}
            color="white"
            weight={3}
            fillOpacity={0.7}
          >
            <Tooltip permanent direction="top" offset={[0, -12]} opacity={0.9}>
               <div className="text-[10px] font-black px-2 py-0.5 bg-teal-600 text-white rounded shadow-md">
                  {point.label}
               </div>
            </Tooltip>
            <Popup>
              <div className="p-3 min-w-[150px]" dir="rtl">
                <div className="inline-flex items-center gap-2 mb-2 px-2 py-1 bg-teal-50 text-teal-700 rounded-lg text-[10px] font-black italic">
                    <Info size={12} />
                    <span>تفاصيل النقطة</span>
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-1">{point.label}</h3>
                <p className="text-[10px] text-slate-500 leading-relaxed mb-3">
                    الحالة: {point.status || 'في الانتظار'}
                </p>
                <button className="w-full py-2 bg-teal-600 text-white text-[10px] font-black rounded-xl hover:bg-teal-700 transition-all active:scale-95 shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2">
                    <Truck size={12} />
                    تأكيد الوصول للموقع
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
