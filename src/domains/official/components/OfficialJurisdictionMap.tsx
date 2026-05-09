import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Map as MapIcon, 
  MapPin, 
  Globe, 
  Layers, 
  Navigation, 
  Search, 
  Building2, 
  Zap, 
  Droplets,
  Maximize2,
  Monitor,
  Activity,
  Locate,
  Compass,
  LayoutGrid
} from 'lucide-react';
import OfficialMapView from './OfficialMapView';
import { reportApi, Report } from '../../core/services/reportApi';
import { cn } from '../../core/utils/cn';

export const OfficialJurisdictionMap: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [activeLayer, setActiveLayer] = useState('jurisdiction');

  useEffect(() => {
    const unsubscribe = reportApi.subscribeToReports((data) => {
      setReports(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full p-2 h-full" dir="rtl">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 px-2">
        <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-slate-700 shadow-xl shadow-slate-900/10">
                <Compass size={12} />
                تخطيط النطاقات والولايات
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">خرائط الاختصاص والإشراف</h1>
            <p className="text-sm font-bold text-slate-400 italic">تحديد النطاقات الجغرافية للإشراف وتوزيع الصلاحيات بين المكاتب الميدانية</p>
        </div>

        <div className="flex gap-3">
             <div className="bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm flex">
                 <button 
                   onClick={() => setActiveLayer('jurisdiction')}
                   className={cn(
                       "px-6 py-2 rounded-xl text-[11px] font-black transition-all",
                       activeLayer === 'jurisdiction' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-400 hover:text-slate-900"
                   )}
                 >نطاق الإشراف</button>
                 <button 
                   onClick={() => setActiveLayer('density')}
                   className={cn(
                       "px-6 py-2 rounded-xl text-[11px] font-black transition-all",
                       activeLayer === 'density' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-400 hover:text-slate-900"
                   )}
                 >كثافة العمليات</button>
             </div>
        </div>
      </header>

      <div className="flex-1 bg-white rounded-[4rem] border border-slate-100 shadow-2xl relative overflow-hidden group min-h-[700px]">
          {/* Map Surface */}
          <OfficialMapView 
             points={reports.map(r => ({
                lat: r.location?.[0] || 15.3694,
                lng: r.location?.[1] || 44.1910,
                intensity: activeLayer === 'density' ? 0.8 : 0.4,
                label: r.title,
                type: r.department as any,
                status: r.status as any,
                priority: r.priority
             }))}
             center={[15.3694, 44.1910]}
             zoom={13}
          />

          {/* Map Controls */}
          <div className="absolute top-8 right-8 z-[1000] flex flex-col gap-3">
              <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white shadow-2xl w-64">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 italic">نطاقات التحكم</h3>
                   <div className="space-y-4">
                       {[
                           { label: 'القطاع الأول (صباحي)', color: 'bg-emerald-500', count: '٤٥٪' },
                           { label: 'القطاع الثاني (مركزي)', color: 'bg-indigo-500', count: '٣٥٪' },
                           { label: 'القطاع الثالث (طرفي)', color: 'bg-amber-500', count: '٢٠٪' },
                       ].map((sector, i) => (
                           <div key={i} className="flex items-center justify-between group cursor-pointer">
                               <div className="flex items-center gap-3">
                                   <div className={cn("w-2 h-2 rounded-full", sector.color)} />
                                   <span className="text-[11px] font-black text-slate-600 group-hover:text-slate-900 transition-colors">{sector.label}</span>
                               </div>
                               <span className="text-[10px] font-black text-slate-400">{sector.count}</span>
                           </div>
                       ))}
                   </div>
                   <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                        <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                            <Layers size={14} />
                            تغيير طريقة العرض
                        </button>
                        <button className="w-full py-3 bg-slate-50 text-slate-400 rounded-xl text-[9px] font-black hover:bg-slate-100 transition-all flex items-center justify-center gap-2 italic">
                            إعادة ضبط المركز
                        </button>
                   </div>
              </div>
          </div>

          <div className="absolute bottom-8 left-8 z-[1000] flex gap-4">
              <div className="bg-white/90 backdrop-blur-xl p-4 rounded-3xl border border-white shadow-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <LayoutGrid size={20} />
                  </div>
                  <div className="text-right ml-4">
                      <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">دقة الرصد</p>
                      <p className="text-xs font-black text-slate-900">± ٢.٥ متر</p>
                  </div>
              </div>
              <div className="bg-white/90 backdrop-blur-xl p-4 rounded-3xl border border-white shadow-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Activity size={20} />
                  </div>
                  <div className="text-right ml-4">
                      <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">الحالة</p>
                      <p className="text-xs font-black text-slate-900">اتصال مباشر</p>
                  </div>
              </div>
          </div>
          
          <div className="absolute top-8 left-8 z-[1000] pointer-events-none">
              <div className="bg-slate-950/80 backdrop-blur-md px-6 py-4 rounded-full border border-white/10 text-white pointer-events-auto flex items-center gap-6 shadow-2xl">
                   <div className="flex items-center gap-2">
                       <Locate size={14} className="text-indigo-400" />
                       <span className="text-[10px] font-black whitespace-nowrap">الإحداثيات الحالية: ١٥.٣٦٩٤ ، ٤٤.١٩١٠</span>
                   </div>
                   <div className="w-px h-4 bg-white/20" />
                   <button className="text-[10px] font-black hover:text-indigo-400 transition-colors uppercase tracking-widest">توسيع النطاق</button>
              </div>
          </div>
      </div>
    </div>
  );
};
