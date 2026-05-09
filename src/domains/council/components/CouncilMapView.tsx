import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Landmark, Info, Search } from 'lucide-react';

interface CouncilPoint {
  lat: number;
  lng: number;
  intensity: number;
  label: string;
  type?: 'incident' | 'project' | 'audit' | 'checkpoint' | 'hazard' | 'delivery';
  status?: string;
  inspector?: string;
}

interface CouncilMapViewProps {
  points: CouncilPoint[];
  center?: [number, number];
  zoom?: number;
}

export default function CouncilMapView({ 
  points, 
  center = [15.3694, 44.1910], 
  zoom = 13 
}: CouncilMapViewProps) {
  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-slate-50 shadow-2xl relative">
      <div className="absolute top-6 right-6 z-[1000] bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-xl max-w-xs pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5 text-slate-900 font-black text-xs">
              <Landmark className="w-3.5 h-3.5 text-slate-600" />
              <span>الرقابة المكانية الشاملة</span>
          </div>
          <p className="text-[9px] text-slate-500 leading-relaxed font-bold italic">
              استعرض النقاط الساخنة، مواقع المشاريع الجارية، وتقارير الرقابة الميدانية المباشرة.
          </p>
      </div>

      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <LayersControl position="bottomleft">
            <LayersControl.BaseLayer checked name="خريطة البلدية">
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
            fillColor={point.type === 'incident' || point.type === 'hazard' ? '#ef4444' : point.type === 'project' || point.type === 'delivery' ? '#3b82f6' : '#10b981'}
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
              <div className="p-3 min-w-[180px]" dir="rtl">
                <div className="inline-flex items-center gap-2 mb-2 px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-black italic">
                    <Info size={12} />
                    <span>سجل الرقابة</span>
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-1">{point.label}</h3>
                <div className="space-y-1 mb-3">
                    <p className="text-[10px] text-slate-500 flex justify-between">
                        <span>الحالة:</span>
                        <span className="font-black text-slate-700">{point.status || 'تحت المعالجة'}</span>
                    </p>
                    <p className="text-[10px] text-slate-500 flex justify-between">
                        <span>المفتش:</span>
                        <span className="font-black text-slate-700">{point.inspector || 'مفتش المناوبة'}</span>
                    </p>
                </div>
                <button className="w-full py-2 bg-slate-900 text-white text-[10px] font-black rounded-xl hover:bg-black transition-all active:scale-95 shadow-lg shadow-black/20 flex items-center justify-center gap-2">
                    <Search size={12} />
                    فتح الملف الرقابي الكامل
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
