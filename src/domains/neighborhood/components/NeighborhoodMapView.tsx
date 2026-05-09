import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Home, Info, Map as MapIcon, Users, AlertCircle } from 'lucide-react';

interface NeighborhoodPoint {
  lat: number;
  lng: number;
  intensity: number;
  label: string;
  type?: 'resident' | 'building' | 'commercial' | 'incident';
  status?: 'verified' | 'pending' | 'urgent';
  owner?: string;
  contact?: string;
}

interface NeighborhoodMapViewProps {
  points: NeighborhoodPoint[];
  center?: [number, number];
  zoom?: number;
}

export default function NeighborhoodMapView({ 
  points, 
  center = [15.3694, 44.1910], 
  zoom = 13 
}: NeighborhoodMapViewProps) {
  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-green-50 shadow-2xl relative">
      <div className="absolute top-6 right-6 z-[1000] bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-green-100 shadow-xl max-w-xs pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5 text-green-900 font-black text-xs">
              <MapIcon className="w-3.5 h-3.5 text-green-600" />
              <span>خارطة المربعات السكنية</span>
          </div>
          <p className="text-[9px] text-slate-500 leading-relaxed font-bold italic">
              عرض جغرافي للمباني السكنية، المرافق التجارية، والبلاغات الميدانية داخل الحي.
          </p>
      </div>

      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <LayersControl position="bottomleft">
            <LayersControl.BaseLayer checked name="خريطة الحي">
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
            fillColor={point.type === 'incident' || point.status === 'urgent' ? '#ef4444' : point.type === 'commercial' ? '#3b82f6' : '#16a34a'}
            color="white"
            weight={3}
            fillOpacity={0.7}
          >
            <Tooltip permanent direction="top" offset={[0, -12]} opacity={0.9}>
               <div className="text-[10px] font-black px-2 py-0.5 bg-green-600 text-white rounded shadow-md">
                  {point.label}
               </div>
            </Tooltip>
            <Popup>
              <div className="p-3 min-w-[200px]" dir="rtl">
                <div className="inline-flex items-center gap-2 mb-2 px-2 py-1 bg-green-50 text-green-700 rounded-lg text-[10px] font-black italic">
                    <Home size={12} />
                    <span>بيانات العقار/الساكن</span>
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-1">{point.label}</h3>
                <div className="space-y-1 mb-3">
                    <p className="text-[10px] text-slate-500 flex justify-between">
                        <span>النوع:</span>
                        <span className="font-black text-slate-700">
                          {point.type === 'resident' ? 'سكن عائلي' : 
                           point.type === 'building' ? 'عمارة/مجمع' : 
                           point.type === 'commercial' ? 'محل تجاري' : 'بلاغ ميداني'}
                        </span>
                    </p>
                    <p className="text-[10px] text-slate-500 flex justify-between">
                        <span>الحالة:</span>
                        <span className={`font-black ${point.status === 'urgent' ? 'text-rose-600' : 'text-green-600'}`}>
                            {point.status === 'verified' ? 'موثق' : point.status === 'pending' ? 'بانتظار التوثيق' : 'بلاغ عاجل'}
                        </span>
                    </p>
                    {point.owner && (
                      <p className="text-[10px] text-slate-500 flex justify-between">
                          <span>المالك:</span>
                          <span className="font-black text-slate-700">{point.owner}</span>
                      </p>
                    )}
                </div>
                
                <button className="w-full py-2 bg-green-600 text-white text-[10px] font-black rounded-xl hover:bg-green-700 transition-all active:scale-95 shadow-lg shadow-green-600/20 flex items-center justify-center gap-2">
                    <Users size={12} />
                    عرض سجل السكان
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
