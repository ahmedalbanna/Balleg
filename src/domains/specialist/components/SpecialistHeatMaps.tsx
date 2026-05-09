import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Layers, 
  MapPin, 
  Search, 
  Filter, 
  Activity, 
  ShieldAlert, 
  Compass, 
  Monitor, 
  Maximize2,
  Navigation,
  Globe
} from 'lucide-react';
import SpecialistMapView from './SpecialistMapView';
import { reportApi, Report } from '../../core/services/reportApi';
import { cn } from '../../core/utils/cn';

export const SpecialistHeatMaps: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [activeLayer, setActiveLayer] = useState('heat');

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
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-rose-100 shadow-xl shadow-rose-600/5">
                        <Flame size={12} className="text-rose-500" />
                        التحليل المكاني للبقع الساخنة
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">الخرائط الحرارية</h1>
                    <p className="text-sm font-bold text-slate-400 italic">تحديد مناطق تركز البلاغات المتكررة والأعطال الجسيمة لتحليل المسببات الهيكلية</p>
                </div>

                <div className="flex bg-white p-1.5 rounded-2x border border-slate-100 shadow-sm">
                    <button 
                        onClick={() => setActiveLayer('heat')}
                        className={cn(
                            "px-6 py-2 rounded-xl text-[11px] font-black transition-all",
                            activeLayer === 'heat' ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20" : "text-slate-400 hover:text-slate-900"
                        )}
                    >كثافة البلاغات</button>
                    <button 
                        onClick={() => setActiveLayer('priority')}
                        className={cn(
                            "px-6 py-2 rounded-xl text-[11px] font-black transition-all",
                            activeLayer === 'priority' ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20" : "text-slate-400 hover:text-slate-900"
                        )}
                    >المخاطر الفنية</button>
                </div>
            </header>

            <div className="flex-1 bg-white rounded-[4rem] border border-slate-100 shadow-2xl relative overflow-hidden group min-h-[700px]">
                <SpecialistMapView 
                    points={reports.map(r => ({
                        lat: r.location?.[0] || 15.3694,
                        lng: r.location?.[1] || 44.1910,
                        intensity: activeLayer === 'heat' ? 0.9 : 0.5,
                        label: r.title,
                        type: r.department as any,
                        status: r.status as any,
                        priority: r.priority
                    }))}
                    center={[15.3694, 44.1910]}
                    zoom={13}
                />

                <div className="absolute top-8 right-8 z-[1000] space-y-4">
                     <div className="bg-white/95 backdrop-blur-xl p-8 rounded-[3rem] border border-white shadow-2xl w-72">
                         <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 italic">تحليل النطاق</h3>
                         <div className="space-y-6">
                              {[
                                  { label: 'منطقة استنزاف عالي', color: 'bg-rose-500', icon: ShieldAlert },
                                  { label: 'بقعة نشطة تقنياً', color: 'bg-indigo-500', icon: Activity },
                                  { label: 'نطاق هادئ مستقر', color: 'bg-emerald-500', icon: Compass },
                              ].map((item, i) => (
                                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", item.color)}>
                                          <item.icon size={18} />
                                      </div>
                                      <span className="text-[10px] font-black text-slate-600 group-hover:text-slate-900 uppercase">{item.label}</span>
                                  </div>
                              ))}
                         </div>
                     </div>
                </div>

                <div className="absolute bottom-8 left-8 z-[1000] flex gap-4">
                     <div className="bg-slate-950 p-6 rounded-[2rem] text-white shadow-2xl flex items-center gap-5 border border-white/10">
                          <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-600/30">
                              <Activity size={20} />
                          </div>
                          <div>
                              <p className="text-[9px] font-black text-slate-500 uppercase leading-none mb-1 italic">دقة التدرج الحراري</p>
                              <p className="text-sm font-black">94.8% مؤكد</p>
                          </div>
                     </div>
                </div>
            </div>
        </div>
    );
};
