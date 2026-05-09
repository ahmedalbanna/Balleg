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
  ChevronRight,
  Zap,
  Droplets
} from 'lucide-react';
import { cn } from '../../core/utils/cn';
import CitizenMapView from './CitizenMapView';
import { reportApi, Report } from '../../core/services/reportApi';

export function CitizenRegionMap() {
  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState({
      water: 12,
      electricity: 8,
      roads: 15,
      total: 35
  });

  useEffect(() => {
    const unsubscribe = reportApi.subscribeToReports((data) => {
      setReports(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-white min-h-[85vh] rounded-[3rem] border border-slate-50 shadow-sm relative overflow-hidden" dir="rtl">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,_rgba(16,185,129,0.03),_transparent_40%)] pointer-events-none" />
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
        <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-emerald-100">
                <Activity size={12} />
                الرصد الجغرافي النشط
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">خريطة رصد الأحياء</h1>
            <p className="text-sm font-bold text-slate-400 italic">الرؤية المشتركة لمشاكل ومنجزات مجتمعنا المحلي</p>
        </div>

        <div className="flex flex-wrap gap-4">
            <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-emerald-200 transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Droplets size={20} />
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 leading-none mb-1">بلاغات مياه</p>
                    <p className="text-xl font-black text-slate-900">{stats.water}</p>
                </div>
            </div>
            <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-amber-200 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap size={20} />
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 leading-none mb-1">بلاغات كهرباء</p>
                    <p className="text-xl font-black text-slate-900">{stats.electricity}</p>
                </div>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 relative z-10">
          {/* Main Map Area */}
          <div className="lg:col-span-3 h-[600px] rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm relative group">
              <CitizenMapView 
                points={reports.map(r => ({
                    lat: r.location?.[0] || 15.3694,
                    lng: r.location?.[1] || 44.1910,
                    intensity: r.priority === 'critical' ? 0.9 : 0.4,
                    label: r.title,
                    type: r.department as any,
                    status: r.status as any,
                    priority: r.priority
                }))}
                center={[15.3694, 44.1910]}
                zoom={13}
              />
              
              {/* Floating Controls */}
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                  <button className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-100 shadow-lg flex items-center justify-center text-slate-600 hover:text-emerald-600 transition-all active:scale-95">
                      <Layers size={20} />
                  </button>
                  <button className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-100 shadow-lg flex items-center justify-center text-slate-600 hover:text-emerald-600 transition-all active:scale-95">
                      <Filter size={20} />
                  </button>
              </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 h-full">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 italic px-2">آخر التحركات الميدانية</h3>
                  <div className="space-y-4">
                      {reports.slice(0, 5).map((report, i) => (
                          <div key={i} className="bg-white p-4 rounded-3xl border border-slate-100 group cursor-pointer hover:border-emerald-100 transition-all">
                              <div className="flex items-center gap-3 mb-2">
                                  <div className={cn(
                                      "w-2 h-2 rounded-full",
                                      report.status === 'resolved' ? 'bg-emerald-500' : 'bg-amber-500'
                                  )} />
                                  <span className="text-[10px] font-black text-slate-900 group-hover:text-emerald-600 truncate">{report.title}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-bold text-slate-400 italic">{report.department}</span>
                                  <ChevronRight size={12} className="text-slate-300 group-hover:text-emerald-500 transition-all group-hover:translate-x-[-4px]" />
                              </div>
                          </div>
                      ))}
                      
                      <div className="pt-4 mt-6 border-t border-slate-200">
                          <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-[11px] shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center gap-2">
                              أرغب بإضافة بلاغ من الموقع
                              <MapPin size={14} />
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
