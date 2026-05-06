import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Point {
  lat: number;
  lng: number;
  intensity: number;
  label: string;
}

interface MapViewProps {
  points: Point[];
  center?: [number, number];
  zoom?: number;
}

export default function MapView({ 
  points, 
  center = [15.3694, 44.1910], // Sana'a default
  zoom = 13 
}: MapViewProps) {
  return (
    <div className="w-full h-full rounded-[2rem] overflow-hidden border border-slate-200 shadow-inner">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((point, idx) => (
          <CircleMarker
            key={idx}
            center={[point.lat, point.lng]}
            radius={10 + point.intensity * 5}
            fillColor={point.intensity > 0.7 ? '#ef4444' : point.intensity > 0.4 ? '#f59e0b' : '#3b82f6'}
            color="white"
            weight={2}
            fillOpacity={0.6}
          >
            <Tooltip permanent direction="top" offset={[0, -10]} opacity={0.9} className="custom-tooltip">
               <div className="text-[10px] font-black px-2 py-1 bg-white rounded-lg shadow-sm border border-slate-100">
                  {point.label}: {Math.round(point.intensity * 100)}% كثافة
               </div>
            </Tooltip>
            <Popup>
              <div className="p-2" dir="rtl">
                <h3 className="font-bold text-sm mb-1">{point.label}</h3>
                <p className="text-xs text-slate-500">تم رصد تركيز بلاغات عالٍ في هذا النطاق الجغرافي.</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
