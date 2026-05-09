import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { HeartHandshake, Info, Map as MapIcon, Siren } from 'lucide-react';

interface HumanitarianPoint {
  lat: number;
  lng: number;
  intensity: number;
  label: string;
  type?: 'aid-center' | 'shelter' | 'medical-point' | 'incident';
  status?: 'active' | 'full' | 'closed' | 'urgent';
  needs?: string[];
}

interface HumanitarianMapViewProps {
  points: HumanitarianPoint[];
  center?: [number, number];
  zoom?: number;
}

export default function HumanitarianMapView({ 
  points, 
  center = [15.3694, 44.1910], 
  zoom = 13 
}: HumanitarianMapViewProps) {
  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-teal-50 shadow-2xl relative">
      <div className="absolute top-6 right-6 z-[1000] bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-teal-100 shadow-xl max-w-xs pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5 text-teal-900 font-black text-xs">
              <MapIcon className="w-3.5 h-3.5 text-teal-600" />
              <span>خريطة الاحتياج والاستجابة</span>
          </div>
          <p className="text-[9px] text-slate-500 leading-relaxed font-bold italic">
              متابعة جغرافية فورية لمراكز التوزيع، نقاط الإيواء، ومناطق الاحتياج الإنساني الأكثر تضرراً.
          </p>
      </div>

      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <LayersControl position="bottomleft">
            <LayersControl.BaseLayer checked name="خريطة الاستجابة">
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
            fillColor={point.type === 'incident' || point.status === 'urgent' ? '#ef4444' : point.type === 'shelter' ? '#f59e0b' : '#0d9488'}
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
              <div className="p-3 min-w-[200px]" dir="rtl">
                <div className="inline-flex items-center gap-2 mb-2 px-2 py-1 bg-teal-50 text-teal-700 rounded-lg text-[10px] font-black italic">
                    <HeartHandshake size={12} />
                    <span>تفاصيل النقطة</span>
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-1">{point.label}</h3>
                <div className="space-y-1 mb-3">
                    <p className="text-[10px] text-slate-500 flex justify-between">
                        <span>النوع:</span>
                        <span className="font-black text-slate-700">
                          {point.type === 'aid-center' ? 'مركز توزيع' : 
                           point.type === 'shelter' ? 'مركز إيواء' : 
                           point.type === 'medical-point' ? 'نقطة طبية' : 'حادثة/احتياج'}
                        </span>
                    </p>
                    <p className="text-[10px] text-slate-500 flex justify-between">
                        <span>الحالة:</span>
                        <span className={`font-black ${point.status === 'urgent' ? 'text-rose-600' : 'text-teal-600'}`}>
                            {point.status === 'urgent' ? 'استجابة عاجلة' : 'نشط'}
                        </span>
                    </p>
                </div>
                
                {point.needs && point.needs.length > 0 && (
                  <div className="mb-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2">الاحتياجات المطلوبة:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {point.needs.map((need, n) => (
                        <span key={n} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded-md border border-slate-200">{need}</span>
                      ))}
                    </div>
                  </div>
                )}

                <button className="w-full py-2 bg-teal-600 text-white text-[10px] font-black rounded-xl hover:bg-teal-700 transition-all active:scale-95 shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2">
                    <Siren size={12} />
                    تحديث طلب الدعم
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
