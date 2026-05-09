import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Radio, Info, Map as MapIcon, Zap, Activity } from 'lucide-react';

interface TelecomPoint {
  lat: number;
  lng: number;
  intensity: number;
  label: string;
  type?: 'tower' | 'station' | 'fiber' | 'incident';
  status?: 'active' | 'maintenance' | 'offline';
  capacity?: string;
  frequency?: string;
}

interface TelecomMapViewProps {
  points: TelecomPoint[];
  center?: [number, number];
  zoom?: number;
}

export default function TelecomMapView({ 
  points, 
  center = [15.3694, 44.1910], 
  zoom = 13 
}: TelecomMapViewProps) {
  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-blue-50 shadow-2xl relative">
      <div className="absolute top-6 right-6 z-[1000] bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-blue-100 shadow-xl max-w-xs pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5 text-blue-900 font-black text-xs">
              <MapIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>خارطة البنية التحتية للاتصالات</span>
          </div>
          <p className="text-[9px] text-slate-500 leading-relaxed font-bold italic">
              رصد جغرافي لمواقع الأبراج، المحطات المركزية، ومسارات الألياف الضوئية وحالة الشبكة.
          </p>
      </div>

      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <LayersControl position="bottomleft">
            <LayersControl.BaseLayer checked name="خريطة الاتصالات">
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
            fillColor={point.status === 'offline' || point.type === 'incident' ? '#ef4444' : point.status === 'maintenance' ? '#f59e0b' : '#2563eb'}
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
              <div className="p-3 min-w-[200px]" dir="rtl">
                <div className="inline-flex items-center gap-2 mb-2 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black italic">
                    <Radio size={12} />
                    <span>بيانات الموقع الفني</span>
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-1">{point.label}</h3>
                <div className="space-y-1 mb-3">
                    <p className="text-[10px] text-slate-500 flex justify-between">
                        <span>النوع:</span>
                        <span className="font-black text-slate-700">
                          {point.type === 'tower' ? 'برج اتصالات' : 
                           point.type === 'station' ? 'محطة مركزية' : 
                           point.type === 'fiber' ? 'نقطة ألياف' : 'عطل فني'}
                        </span>
                    </p>
                    <p className="text-[10px] text-slate-500 flex justify-between">
                        <span>الحالة:</span>
                        <span className={`font-black ${point.status === 'offline' ? 'text-rose-600' : point.status === 'maintenance' ? 'text-amber-600' : 'text-blue-600'}`}>
                            {point.status === 'active' ? 'نشط' : point.status === 'maintenance' ? 'صيانة دورية' : 'متوقف'}
                        </span>
                    </p>
                    {point.capacity && (
                      <p className="text-[10px] text-slate-500 flex justify-between">
                          <span>السعة:</span>
                          <span className="font-black text-slate-700">{point.capacity}</span>
                      </p>
                    )}
                </div>
                
                <button className="w-full py-2 bg-blue-600 text-white text-[10px] font-black rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
                    <Zap size={12} />
                    فتح تذكرة صيانة
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
