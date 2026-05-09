import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Store, Info, Truck } from 'lucide-react';

interface MerchantPoint {
  lat: number;
  lng: number;
  intensity: number;
  label: string;
  type?: 'store' | 'warehouse' | 'delivery';
  status?: string;
}

interface MerchantMapViewProps {
  points: MerchantPoint[];
  center?: [number, number];
  zoom?: number;
}

export default function MerchantMapView({ 
  points, 
  center = [15.3694, 44.1910], 
  zoom = 13 
}: MerchantMapViewProps) {
  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-indigo-50 shadow-2xl relative">
      <div className="absolute top-6 right-6 z-[1000] bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-indigo-100 shadow-xl max-w-xs pointer-events-none">
          <div className="flex items-center gap-2 mb-1.5 text-indigo-900 font-black text-xs">
              <Store className="w-3.5 h-3.5 text-indigo-600" />
              <span>مواقع تجمعات الأعمال</span>
          </div>
          <p className="text-[9px] text-slate-500 leading-relaxed font-bold italic">
              خريطة توضح توزيع المتاجر، المستودعات، وطرق الشحن النشطة في المنطقة.
          </p>
      </div>

      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <LayersControl position="bottomleft">
            <LayersControl.BaseLayer checked name="خريطة الأعمال">
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
            fillColor={point.type === 'warehouse' ? '#4338ca' : '#0ea5e9'}
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
              <div className="p-3 min-w-[150px]" dir="rtl">
                <div className="inline-flex items-center gap-2 mb-2 px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black italic">
                    <Info size={12} />
                    <span>تفاصيل المنشأة</span>
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-1">{point.label}</h3>
                <p className="text-[10px] text-slate-500 leading-relaxed mb-3">
                    الحالة: {point.status || 'نشط'}
                </p>
                <button className="w-full py-2 bg-indigo-600 text-white text-[10px] font-black rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2">
                    <Truck size={12} />
                    تتبع الشحنات لهذا الموقع
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
