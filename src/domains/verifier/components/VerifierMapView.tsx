import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ShieldCheck, Info, Map as MapIcon, Search, Eye } from 'lucide-react';

interface VerifierPoint {
  lat: number;
  lng: number;
  intensity: number;
  label: string;
  type?: 'incident' | 'verification' | 'audit' | 'location';
  status?: 'verified' | 'pending' | 'rejected' | 'urgent';
  source?: string;
  timestamp?: any;
}

interface VerifierMapViewProps {
  points: VerifierPoint[];
  center?: [number, number];
  zoom?: number;
}

export default function VerifierMapView({ 
  points, 
  center = [15.3694, 44.1910], 
  zoom = 13 
}: VerifierMapViewProps) {
  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-slate-50 shadow-2xl relative">
      <div className="absolute top-6 right-6 z-[1000] bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-xl max-w-xs pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5 text-slate-900 font-black text-xs">
              <MapIcon className="w-3.5 h-3.5 text-slate-600" />
              <span>خارطة نقاط التحقق والمصادقة</span>
          </div>
          <p className="text-[9px] text-slate-500 leading-relaxed font-bold italic">
              رصد جغرافي لمواقع الأحداث التي تحتاج لتوثيق، ومسارات الفرق الميدانية ونقاط التدقيق.
          </p>
      </div>

      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <LayersControl position="bottomleft">
            <LayersControl.BaseLayer checked name="خريطة التوثيق">
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
            fillColor={point.status === 'urgent' ? '#ef4444' : point.status === 'verified' ? '#10b981' : point.status === 'rejected' ? '#f43f5e' : '#334155'}
            color="white"
            weight={3}
            fillOpacity={0.7}
          >
            <Tooltip permanent direction="top" offset={[0, -12]} opacity={0.9}>
               <div className="text-[10px] font-black px-2 py-0.5 bg-slate-900 text-white rounded shadow-md">
                  {point.label}
               </div>
            </Tooltip>
            <Popup>
              <div className="p-3 min-w-[200px]" dir="rtl">
                <div className="inline-flex items-center gap-2 mb-2 px-2 py-1 bg-slate-50 text-slate-700 rounded-lg text-[10px] font-black italic">
                    <ShieldCheck size={12} />
                    <span>تفاصيل المصادقة</span>
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-1">{point.label}</h3>
                <div className="space-y-1 mb-3">
                    <p className="text-[10px] text-slate-500 flex justify-between">
                        <span>نوع المهمة:</span>
                        <span className="font-black text-slate-700">
                          {point.type === 'incident' ? 'بلاغ ميداني' : 
                           point.type === 'verification' ? 'طلب توثيق' : 
                           point.type === 'audit' ? 'تدقيق بيانات' : 'نقطة رصد'}
                        </span>
                    </p>
                    <p className="text-[10px] text-slate-500 flex justify-between">
                        <span>حالة التحقق:</span>
                        <span className={`font-black ${point.status === 'verified' ? 'text-green-600' : point.status === 'urgent' ? 'text-rose-600' : 'text-slate-600'}`}>
                            {point.status === 'verified' ? 'تم التوثيق' : point.status === 'pending' ? 'قيد المراجعة' : point.status === 'rejected' ? 'بيان غير دقيق' : 'عاجل جداً'}
                        </span>
                    </p>
                    {point.source && (
                      <p className="text-[10px] text-slate-500 flex justify-between">
                          <span>المصدر:</span>
                          <span className="font-black text-slate-700">{point.source}</span>
                      </p>
                    )}
                </div>
                
                <button className="w-full py-2 bg-slate-900 text-white text-[10px] font-black rounded-xl hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2">
                    <Search size={12} />
                    بدء إجراءات التدقيق
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
