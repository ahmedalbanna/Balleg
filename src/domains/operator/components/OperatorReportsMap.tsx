import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Map as MapIcon, 
  MapPin, 
  Activity, 
  Layers, 
  Navigation, 
  Compass, 
  Target, 
  Locate, 
  Search,
  LayoutGrid,
  Zap,
  Droplets,
  AlertTriangle,
  Maximize2,
  Box
} from 'lucide-react';
import OperatorMapView from './OperatorMapView';
import { reportApi, Report } from '../../core/services/reportApi';
import { cn } from '../../core/utils/cn';

export const OperatorReportsMap: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [activeLayer, setActiveLayer] = useState('all');

  useEffect(() => {
    const unsubscribe = reportApi.subscribeToReports((data) => {
      setReports(data.filter(r => r.status !== 'completed'));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full p-2 h-full" dir="rtl">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 px-2">
        <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-slate-700 shadow-xl shadow-slate-900/10">
                <Compass size={12} />
                قاعدة البيانات الجغرافية الحية
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">خريطة البلاغات</h1>
            <p className="text-sm font-bold text-slate-400 italic">مُتابعة جغرافية لكثافة وتحركات البلاغات الميدانية وتوجيه أقرب الفرق</p>
        </div>

        <div className="flex gap-3">
             <div className="bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm flex">
                 <button 
                   onClick={() => setActiveLayer('all')}
                   className={cn(
                       "px-6 py-2 rounded-xl text-[11px] font-black transition-all",
                       activeLayer === 'all' ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-900"
                   )}
                 >الكل</button>
                 <button 
                   onClick={() => setActiveLayer('emergency')}
                   className={cn(
                       "px-6 py-2 rounded-xl text-[11px] font-black transition-all",
                       activeLayer === 'emergency' ? "bg-rose-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-900"
                   )}
                 >طارئ</button>
                 <button 
                   onClick={() => setActiveLayer('assigned')}
                   className={cn(
                       "px-6 py-2 rounded-xl text-[11px] font-black transition-all",
                       activeLayer === 'assigned' ? "bg-emerald-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-900"
                   )}
                 >قيد المعالجة</button>
             </div>
        </div>
      </header>

      <div className="flex-1 bg-white rounded-[4rem] border border-slate-100 shadow-2xl relative overflow-hidden group min-h-[700px]">
          <OperatorMapView 
             points={reports.map(r => ({
                lat: r.location?.[0] || 15.3694,
                lng: r.location?.[1] || 44.1910,
                intensity: r.priority === 'critical' ? 1 : 0.4,
                label: r.title,
                type: r.department as any,
                status: r.status as any,
                priority: r.priority
             }))}
             center={[15.3694, 44.1910]}
             zoom={14}
          />

          {/* Map HUD Components */}
          <div className="absolute top-8 right-8 z-[1000] space-y-4">
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[3rem] border border-white shadow-2xl w-72">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 italic">مفتاح الخريطة</h3>
                  <div className="space-y-6">
                       {[
                           { label: 'بلاغ أولوية قصوى', color: 'bg-rose-500', icon: AlertTriangle },
                           { label: 'قطاع المياه', color: 'bg-blue-500', icon: Droplets },
                           { label: 'طوارئ الكهرباء', color: 'bg-amber-500', icon: Zap },
                           { label: 'قيد المراجعة', color: 'bg-slate-400', icon: Activity },
                       ].map((item, i) => (
                           <div key={i} className="flex items-center gap-4 group cursor-pointer">
                               <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", item.color)}>
                                   <item.icon size={18} />
                               </div>
                               <span className="text-[11px] font-black text-slate-600 group-hover:text-slate-900 transition-colors uppercase">{item.label}</span>
                           </div>
                       ))}
                  </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-[2.5rem] border border-white/5 text-white shadow-2xl">
                   <div className="flex items-center justify-between mb-4">
                       <span className="text-[10px] font-black text-slate-500 uppercase">نطاق التغطية</span>
                       <span className="text-[10px] font-black text-emerald-400">آمن</span>
                   </div>
                   <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400">
                           <LayoutGrid size={24} />
                       </div>
                       <div>
                           <p className="text-lg font-black leading-none mb-1">١٢٠ كم٢</p>
                           <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic tracking-tight">إجمالي المساحة المرصودة</p>
                       </div>
                   </div>
              </div>
          </div>

          {/* Location Bar */}
          <div className="absolute top-8 left-8 z-[1000] pointer-events-none">
              <div className="bg-white/90 backdrop-blur-xl px-8 py-5 rounded-full border border-white text-slate-900 pointer-events-auto flex items-center gap-8 shadow-2xl ring-1 ring-slate-200/50">
                   <div className="flex items-center gap-3">
                       <Locate size={18} className="text-blue-600" />
                       <span className="text-xs font-black">أمانة العاصمة، اليمن</span>
                   </div>
                   <div className="w-px h-6 bg-slate-100" />
                   <div className="flex items-center gap-6">
                        <button className="text-[10px] font-black hover:text-blue-600 transition-colors uppercase tracking-widest italic underline decoration-blue-500/30 underline-offset-4">تحديد الموقع</button>
                        <button className="text-[10px] font-black hover:text-blue-600 transition-colors uppercase tracking-widest">توسيع الشاشة</button>
                   </div>
              </div>
          </div>

          {/* Quick Stats Overlay */}
          <div className="absolute bottom-10 left-10 z-[1000] flex gap-4">
              {[
                  { label: 'البلاغات', val: reports.length, icon: Box },
                  { label: 'الاستجابة', val: '٨٨٪', icon: Zap },
              ].map((stat, k) => (
                  <div key={k} className="bg-white/90 backdrop-blur-xl p-5 rounded-3xl border border-white shadow-2xl flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                          <stat.icon size={20} />
                      </div>
                      <div className="text-right">
                          <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">{stat.label}</p>
                          <p className="text-base font-black text-slate-900">{stat.val}</p>
                      </div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};
