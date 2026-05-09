import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Wrench, Info, Navigation, CheckCircle } from 'lucide-react';

interface HandymanPoint {
  lat: number;
  lng: number;
  intensity: number;
  label: string;
  type?: 'repair' | 'maintenance' | 'inspection';
  status?: 'pending' | 'in-progress' | 'completed';
  technician?: string;
  urgent?: boolean;
}

interface HandymanMapViewProps {
  points: HandymanPoint[];
  center?: [number, number];
  zoom?: number;
}

export default function HandymanMapView({ 
  points, 
  center = [15.3694, 44.1910], 
  zoom = 13 
}: HandymanMapViewProps) {
  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-blue-50 shadow-2xl relative">
      <div className="absolute top-6 right-6 z-[1000] bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-blue-100 shadow-xl max-w-xs pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5 text-blue-900 font-black text-xs">
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
              <span>توزيع المهام الميدانية</span>
          </div>
          <p className="text-[9px] text-slate-500 leading-relaxed font-bold italic">
              خارطة تفاعلية توضح مواقع الصيانة العاجلة والمهام المجدولة في محيطك الحالي.
          </p>
      </div>

      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <LayersControl position="bottomleft">
            <LayersControl.BaseLayer checked name="خريطة المهام">
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
            fillColor={point.status === 'completed' ? '#10b981' : point.urgent ? '#ef4444' : '#3b82f6'}
            color="white"
            weight={3}
            fillOpacity={0.7}
          >
            <Tooltip permanent direction="top" offset={[0, -12]} opacity={0.9}>
               <div className="text-[10px] font-black px-2 py-0.5 bg-blue-600 text-white rounded shadow-md">
                  {point.label}
               </div>
            </Tooltip>
            <Popup>
              <div className="p-3 min-w-[180px]" dir="rtl">
                <div className="inline-flex items-center gap-2 mb-2 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black italic">
                    <Wrench size={12} />
                    <span>تفاصيل المهمة</span>
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-1">{point.label}</h3>
                <div className="space-y-1 mb-3">
                    <p className="text-[10px] text-slate-500 flex justify-between">
                        <span>النوع:</span>
                        <span className="font-black text-slate-700">{point.type === 'repair' ? 'إصلاح عطل' : point.type === 'maintenance' ? 'صيانة دورية' : 'فحص فني'}</span>
                    </p>
                    <p className="text-[10px] text-slate-500 flex justify-between">
                        <span>الحالة:</span>
                        <span className={`font-black ${point.status === 'completed' ? 'text-emerald-600' : 'text-blue-600'}`}>
                            {point.status === 'completed' ? 'منجزة' : point.status === 'in-progress' ? 'قيد العمل' : 'بانتظار البدء'}
                        </span>
                    </p>
                </div>
                <button className="w-full py-2 bg-blue-600 text-white text-[10px] font-black rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
                    <CheckCircle size={12} />
                    تحديث الحالة
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
