import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Newspaper, Info, Map as MapIcon, Camera, Mic, Radio } from 'lucide-react';

interface JournalistPoint {
  lat: number;
  lng: number;
  intensity: number;
  label: string;
  type?: 'report' | 'incident' | 'interview' | 'event';
  status?: 'published' | 'draft' | 'urgent';
  verified?: boolean;
}

interface JournalistMapViewProps {
  points: JournalistPoint[];
  center?: [number, number];
  zoom?: number;
}

export default function JournalistMapView({ 
  points, 
  center = [15.3694, 44.1910], 
  zoom = 13 
}: JournalistMapViewProps) {
  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-rose-50 shadow-2xl relative">
      <div className="absolute top-6 right-6 z-[1000] bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-rose-100 shadow-xl max-w-xs pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5 text-rose-900 font-black text-xs">
              <MapIcon className="w-3.5 h-3.5 text-rose-600" />
              <span>خارطة الأحداث الميدانية</span>
          </div>
          <p className="text-[9px] text-slate-500 leading-relaxed font-bold italic">
              رصد جغرافي لمواقع الأحداث الراهنة، التقارير الميدانية، ومناطق التغطية الصحفية النشطة.
          </p>
      </div>

      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <LayersControl position="bottomleft">
            <LayersControl.BaseLayer checked name="خريطة الصحافة">
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
            fillColor={point.type === 'incident' || point.status === 'urgent' ? '#ef4444' : point.type === 'interview' ? '#f59e0b' : '#e11d48'}
            color="white"
            weight={3}
            fillOpacity={0.7}
          >
            <Tooltip permanent direction="top" offset={[0, -12]} opacity={0.9}>
               <div className="text-[10px] font-black px-2 py-0.5 bg-rose-600 text-white rounded shadow-md">
                  {point.label}
               </div>
            </Tooltip>
            <Popup>
              <div className="p-3 min-w-[200px]" dir="rtl">
                <div className="inline-flex items-center gap-2 mb-2 px-2 py-1 bg-rose-50 text-rose-700 rounded-lg text-[10px] font-black italic">
                    <Radio size={12} />
                    <span>تفاصيل التغطية</span>
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-1">{point.label}</h3>
                <div className="space-y-1 mb-3">
                    <p className="text-[10px] text-slate-500 flex justify-between">
                        <span>النوع:</span>
                        <span className="font-black text-slate-700">
                          {point.type === 'report' ? 'تقرير ميداني' : 
                           point.type === 'incident' ? 'حدث عاجل' : 
                           point.type === 'interview' ? 'مقابلة' : 'فعالية'}
                        </span>
                    </p>
                    <p className="text-[10px] text-slate-500 flex justify-between">
                        <span>الحالة:</span>
                        <span className={`font-black ${point.status === 'urgent' ? 'text-rose-600' : 'text-slate-600'}`}>
                            {point.status === 'urgent' ? 'تغطية عاجلة' : 'قيد المراجعة'}
                        </span>
                    </p>
                </div>
                
                <button className="w-full py-2 bg-rose-600 text-white text-[10px] font-black rounded-xl hover:bg-rose-700 transition-all active:scale-95 shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2">
                    <Camera size={12} />
                    إرسال وسائط ميدانية
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
