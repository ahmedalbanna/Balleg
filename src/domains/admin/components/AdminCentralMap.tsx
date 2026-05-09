import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Map as MapIcon, 
  Filter, 
  MapPin, 
  Info, 
  AlertCircle,
  Activity,
  Layers,
  Search,
  Zap,
  Droplets,
  Monitor,
  Maximize2,
  Minimize2,
  Navigation,
  Globe
} from 'lucide-react';
import AdminMapView from './AdminMapView';
import { reportApi, Report } from '../../core/services/reportApi';
import { cn } from '../../core/utils/cn';

export const AdminCentralMap: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeLayer, setActiveLayer] = useState('heat');

  useEffect(() => {
    const unsubscribe = reportApi.subscribeToReports((data) => {
      setReports(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className={cn(
        "flex flex-col gap-8 w-full transition-all duration-500 bg-[#FAFBFF]",
        isFullscreen ? "fixed inset-0 z-[100] p-10" : "p-2 sm:p-4"
    )} dir="rtl">
      {!isFullscreen && (
          <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-slate-700 shadow-xl shadow-slate-900/10">
                    <Monitor size={12} />
                    غرفة التحكم الجيومكاني
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">رادار الرصد الحي الموحد</h1>
                <p className="text-sm font-bold text-slate-400 italic">مُتابعة جغرافية لحظية لكافة العمليات الميدانية وتدفق البلاغات عبر العاصمة</p>
            </div>

            <div className="flex flex-wrap gap-4">
                <div className="bg-white px-8 py-4 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-indigo-100 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Activity size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight leading-none mb-2">البلاغات النشطة</p>
                        <p className="text-2xl font-black text-slate-900">{reports.length}</p>
                    </div>
                </div>
                <button 
                    onClick={() => setIsFullscreen(true)}
                    className="w-16 h-16 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/20"
                >
                    <Maximize2 size={24} />
                </button>
            </div>
          </header>
      )}

      <div className={cn(
          "flex-1 bg-white rounded-[4rem] border border-slate-100 shadow-2xl shadow-indigo-500/5 relative overflow-hidden group",
          isFullscreen ? "h-full" : "h-[700px]"
      )}>
          {/* Map Component */}
          <AdminMapView 
            points={reports.map(r => ({
                lat: r.location?.[0] || 15.3694,
                lng: r.location?.[1] || 44.1910,
                intensity: r.priority === 'critical' ? 1.0 : r.priority === 'high' ? 0.7 : 0.4,
                label: r.title,
                type: r.department as any,
                status: r.status as any,
                priority: r.priority
            }))}
            center={[15.3694, 44.1910]}
            zoom={13}
          />

          {/* Floating Controls Overlay */}
          <div className="absolute top-8 right-8 flex flex-col gap-3 z-[1000]">
              <div className="bg-white/90 backdrop-blur-xl p-2 rounded-3xl border border-white shadow-2xl">
                  <button 
                    onClick={() => setActiveLayer('heat')}
                    className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                        activeLayer === 'heat' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                      <Zap size={20} />
                  </button>
                  <button 
                    onClick={() => setActiveLayer('markers')}
                    className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center mt-2 transition-all",
                        activeLayer === 'markers' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                      <MapPin size={20} />
                  </button>
                  <button className="w-12 h-12 rounded-2xl flex items-center justify-center mt-2 text-slate-400 hover:text-slate-600">
                      <Layers size={20} />
                  </button>
              </div>
          </div>

          <div className="absolute top-8 left-8 flex flex-col gap-3 z-[1000]">
               <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white shadow-2xl w-64">
                   <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 italic">فلترة الرصد</h3>
                   <div className="space-y-4">
                       {[
                           { label: 'المياه والصرف', icon: Droplets, color: 'blue', count: 12 },
                           { label: 'الكهرباء والطاقة', icon: Zap, color: 'amber', count: 8 },
                           { label: 'الأشغال والطرق', icon: Navigation, color: 'emerald', count: 15 },
                       ].map((f, i) => (
                           <div key={i} className="flex items-center justify-between group cursor-pointer">
                               <div className="flex items-center gap-3">
                                   <div className={cn("w-2 h-2 rounded-full", `bg-${f.color}-500`)} />
                                   <span className="text-[11px] font-black text-slate-600 group-hover:text-slate-900">{f.label}</span>
                               </div>
                               <span className="text-[10px] font-black text-slate-400">{f.count}</span>
                           </div>
                       ))}
                   </div>
                   <div className="mt-8 pt-6 border-t border-slate-100">
                        <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
                             تحديث الخريطة
                             <Globe size={14} />
                        </button>
                   </div>
               </div>
          </div>

          {isFullscreen && (
              <button 
                onClick={() => setIsFullscreen(false)}
                className="absolute bottom-8 left-8 w-16 h-16 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center hover:bg-slate-800 transition-all active:scale-95 shadow-2xl z-[1000]"
              >
                  <Minimize2 size={24} />
              </button>
          )}

          {/* Bottom Feed */}
          <div className="absolute bottom-8 right-8 left-40 hidden lg:flex gap-4 z-[1000] pointer-events-none">
              <div className="pointer-events-auto bg-slate-950/90 backdrop-blur-xl p-4 pr-6 rounded-[2.5rem] border border-white/10 shadow-2xl flex items-center gap-8 max-w-2xl overflow-hidden">
                  <div className="flex items-center gap-4 shrink-0">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black animate-pulse">
                          <Activity size={18} />
                      </div>
                      <div className="text-right">
                          <p className="text-[10px] font-black text-indigo-400 uppercase leading-none">آخر بلاغ وارد</p>
                          <p className="text-xs font-black text-white whitespace-nowrap">{reports[0]?.title || 'جاري الرصد...'}</p>
                      </div>
                  </div>
                  <div className="w-px h-8 bg-white/10 shrink-0" />
                  <p className="text-[10px] font-bold text-slate-400 italic truncate">
                      {reports[0]?.district || 'المنطقة غير محددة'} - الطاقم الميداني قيد التوجيه للموقع المذكور في البلاغ رقم #{reports[0]?.id?.split('-')[0]}
                  </p>
              </div>
          </div>
      </div>
    </div>
  );
};
