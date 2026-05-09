import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Construction, Info, HardHat, Hammer } from 'lucide-react';

interface ContractorPoint {
  lat: number;
  lng: number;
  intensity: number;
  label: string;
  type?: 'worksite' | 'hazard' | 'resource';
  status?: string;
  progress?: number;
}

interface ContractorMapViewProps {
  points: ContractorPoint[];
  center?: [number, number];
  zoom?: number;
}

export default function ContractorMapView({ 
  points, 
  center = [15.3694, 44.1910], 
  zoom = 13 
}: ContractorMapViewProps) {
  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-amber-50 shadow-2xl relative">
      <div className="absolute top-6 right-6 z-[1000] bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-amber-100 shadow-xl max-w-xs pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5 text-amber-900 font-black text-xs">
              <Construction className="w-3.5 h-3.5 text-amber-600" />
              <span>متابعة المواقع الإنشائية</span>
          </div>
          <p className="text-[9px] text-slate-500 leading-relaxed font-bold italic">
              خريطة توضح مواقع العمل الجارية، مصادر المواد، ونقاط المخاطر المحتملة في الميدان.
          </p>
      </div>

      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <LayersControl position="bottomleft">
            <LayersControl.BaseLayer checked name="خريطة الموقع">
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
            fillColor={point.type === 'hazard' ? '#ef4444' : point.type === 'resource' ? '#f59e0b' : '#d97706'}
            color="white"
            weight={3}
            fillOpacity={0.7}
          >
            <Tooltip permanent direction="top" offset={[0, -12]} opacity={0.9}>
               <div className="text-[10px] font-black px-2 py-0.5 bg-amber-600 text-white rounded shadow-md">
                  {point.label}
               </div>
            </Tooltip>
            <Popup>
              <div className="p-3 min-w-[180px]" dir="rtl">
                <div className="inline-flex items-center gap-2 mb-2 px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-[10px] font-black italic">
                    <Info size={12} />
                    <span>تفاصيل الموقع</span>
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-1">{point.label}</h3>
                <div className="space-y-1 mb-3">
                    <p className="text-[10px] text-slate-500 flex justify-between">
                        <span>الحالة:</span>
                        <span className="font-black text-slate-700">{point.status || 'نشط'}</span>
                    </p>
                    <p className="text-[10px] text-slate-500 flex justify-between">
                        <span>التقدم:</span>
                        <span className="font-black text-amber-600">{point.progress || 0}%</span>
                    </p>
                </div>
                <button className="w-full py-2 bg-amber-600 text-white text-[10px] font-black rounded-xl hover:bg-amber-700 transition-all active:scale-95 shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2">
                    <HardHat size={12} />
                    رفع تقرير إنجاز يومي
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
