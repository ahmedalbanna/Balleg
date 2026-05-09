import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '../../core/utils/cn';

interface MapPoint {
    lat: number;
    lng: number;
    intensity: number;
    label?: string;
    type?: 'water' | 'electricity' | 'waste' | 'safety';
    status?: 'pending' | 'verified' | 'completed' | 'rejected';
    priority?: 'low' | 'medium' | 'high' | 'critical';
}

interface SpecialistMapViewProps {
    points: MapPoint[];
    center?: [number, number];
    zoom?: number;
    className?: string;
}

const SpecialistMapView: React.FC<SpecialistMapViewProps> = ({ 
    points, 
    center = [15.3694, 44.1910], 
    zoom = 13,
    className 
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current || mapInstance.current) return;

        mapInstance.current = L.map(mapRef.current, {
            zoomControl: false,
            attributionControl: false
        }).setView(center as L.LatLngTuple, zoom);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
        }).addTo(mapInstance.current);

        // Add heat spots or markers
        points.forEach(point => {
            const color = point.priority === 'critical' ? '#f43f5e' : 
                          point.type === 'water' ? '#3b82f6' : 
                          point.type === 'electricity' ? '#f59e0b' : '#6366f1';

            // Specialist view: larger heat circles
            L.circle([point.lat, point.lng], {
                color: 'transparent',
                fillColor: color,
                fillOpacity: point.intensity * 0.4,
                radius: 300 * point.intensity
            }).addTo(mapInstance.current!);

            L.circleMarker([point.lat, point.lng], {
                radius: 6,
                fillColor: color,
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 1
            }).bindPopup(`<div class="p-2 font-black text-slate-900">${point.label || 'بلاغ فني'}</div>`)
              .addTo(mapInstance.current!);
        });

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, [points, center, zoom]);

    return (
        <div 
          ref={mapRef} 
          className={cn("w-full h-full min-h-[400px] z-0 grayscale-[0.5] contrast-125", className)}
        />
    );
};

export default SpecialistMapView;
