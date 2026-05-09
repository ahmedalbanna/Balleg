import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Code2, Info, Terminal, Database } from 'lucide-react';

interface DeveloperPoint {
  lat: number;
  lng: number;
  intensity: number;
  label: string;
  type?: 'server' | 'database' | 'api';
  status?: 'active' | 'maintenance' | 'offline';
  load?: number;
}

interface DeveloperMapViewProps {
  points: DeveloperPoint[];
  center?: [number, number];
  zoom?: number;
}

export default function DeveloperMapView({ 
  points, 
  center = [15.3694, 44.1910], 
  zoom = 13 
}: DeveloperMapViewProps) {
  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-indigo-50 shadow-2xl relative">
      <div className="absolute top-6 right-6 z-[1000] bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-indigo-100 shadow-xl max-w-xs pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5 text-indigo-900 font-black text-xs">
              <Code2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>مراقبة البنية التحتية</span>
          </div>
          <p className="text-[9px] text-slate-500 leading-relaxed font-bold italic">
              عرض جغرافي لمواقع الخوادم، مراكز البيانات، ونقاط توصيل المحتوى (CDN) النشطة.
          </p>
      </div>

      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <LayersControl position="bottomleft">
            <LayersControl.BaseLayer checked name="خريطة الشبكة">
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
            fillColor={point.status === 'offline' ? '#ef4444' : point.status === 'maintenance' ? '#f59e0b' : '#6366f1'}
            color="white"
            weight={3}
            fillOpacity={0.7}
          >
            <Tooltip permanent direction="top" offset={[0, -12]} opacity={0.9}>
               <div className="text-[10px] font-black px-2 py-0.5 bg-indigo-600 text-white rounded shadow-md">
                  {point.label}
               </div>
            </Tooltip>
            <Popup>
              <div className="p-3 min-w-[180px]" dir="rtl">
                <div className="inline-flex items-center gap-2 mb-2 px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black italic">
                    <Info size={12} />
                    <span>حالة العقدة</span>
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-1">{point.label}</h3>
                <div className="space-y-1 mb-3">
                    <p className="text-[10px] text-slate-500 flex justify-between">
                        <span>النوع:</span>
                        <span className="font-black text-slate-700">{point.type === 'server' ? 'خادم' : point.type === 'database' ? 'قاعدة بيانات' : 'واجهة API'}</span>
                    </p>
                    <p className="text-[10px] text-slate-500 flex justify-between">
                        <span>الضغط:</span>
                        <span className="font-black text-indigo-600">{point.load || 0}%</span>
                    </p>
                </div>
                <button className="w-full py-2 bg-indigo-600 text-white text-[10px] font-black rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2">
                    <Terminal size={12} />
                    فتح سجل الأخطاء (Logs)
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
