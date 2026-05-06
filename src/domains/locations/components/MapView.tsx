import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'motion/react';
import { AlertTriangle, MapPin, Info, Navigation } from 'lucide-react';

// Fix for default marker icon in leaflet
import 'leaflet/dist/leaflet.css';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description: string;
  type: 'hazard' | 'complaint' | 'need' | 'info';
  status?: string;
}

interface MapViewProps {
  markers?: MapMarker[];
  center?: [number, number];
  zoom?: number;
  role?: string;
  onMarkerClick?: (marker: MapMarker) => void;
}

const RecenterButton = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  return (
    <button
      onClick={() => map.setView(center, 13)}
      className="absolute bottom-6 right-6 z-[1000] bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors border border-gray-100"
      title="إعادة التمركز"
    >
      <Navigation className="w-5 h-5 text-primary" />
    </button>
  );
};

export const MapView: React.FC<MapViewProps> = ({
  markers = [],
  center = [33.5138, 36.2765], // Default center (e.g., Damascus)
  zoom = 13,
  role = 'guest'
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getMarkerIcon = (type: MapMarker['type']) => {
    const colors = {
      hazard: '#ef4444', // Red
      complaint: '#f59e0b', // Amber
      need: '#3b82f6', // Blue
      info: '#10b981', // Green
    };

    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
          background-color: ${colors[type]};
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        ">
          <div style="transform: rotate(45deg); color: white;">
            ${type === 'hazard' ? '⚠️' : type === 'complaint' ? '📝' : type === 'need' ? '📦' : 'ℹ️'}
          </div>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });
  };

  if (!mounted) return <div className="w-full h-full bg-gray-100 animate-pulse rounded-2xl" />;

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      <MapContainer
        center={center as [number, number]}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={getMarkerIcon(marker.type)}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px] text-right font-cairo">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white
                    ${marker.type === 'hazard' ? 'bg-red-500' : 
                      marker.type === 'complaint' ? 'bg-amber-500' : 
                      marker.type === 'need' ? 'bg-blue-500' : 'bg-emerald-500'}
                  `}>
                    {marker.type === 'hazard' ? 'خطر' : 
                     marker.type === 'complaint' ? 'بلاغ' : 
                     marker.type === 'need' ? 'احتياج' : 'معلومة'}
                  </span>
                  <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-1">{marker.title}</h3>
                </div>
                <p className="text-xs text-gray-600 mb-2 leading-relaxed">{marker.description}</p>
                {marker.status && (
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Info className="w-3 h-3" />
                    <span>الحالة: {marker.status}</span>
                  </div>
                )}
                <button className="mt-3 w-full bg-primary/10 text-primary text-xs py-1.5 rounded-lg hover:bg-primary/20 transition-colors font-bold">
                  عرض التفاصيل
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <RecenterButton center={center as [number, number]} />
      </MapContainer>

      {/* Map Overlay Controls */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-gray-100 text-right">
          <h4 className="text-xs font-bold text-gray-900 mb-2">دليل الخريطة</h4>
          <div className="space-y-1.5">
            <div className="flex items-center justify-end gap-2 text-[10px] text-gray-600">
              <span>مخاطر الطريق</span>
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
            </div>
            <div className="flex items-center justify-end gap-2 text-[10px] text-gray-600">
              <span>بلاغات بلدية</span>
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            </div>
            <div className="flex items-center justify-end gap-2 text-[10px] text-gray-600">
              <span>احتياجات إنسانية</span>
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
