import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  Clock, 
  AlertCircle, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  MoreVertical,
  ChevronDown,
  Wrench,
  Construction
} from 'lucide-react';
import { reportApi, Report } from '../../core/services/reportApi';
import { cn } from '../../core/utils/cn';

export const SpecialistPendingTasks: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = reportApi.subscribeToReports((data) => {
      // Specialist sees tasks pending verification or newly reported
      setReports(data.filter(r => r.status === 'pending_verification' || r.status === 'pending'));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full" dir="rtl">
      <header className="px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-amber-100">
            <ClipboardCheck size={12} />
            وحدة التحقق الميداني والتقني
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">المهام المعلقة</h1>
        <p className="text-sm font-bold text-slate-400 italic">البلاغات التي تطلب زيارة ميدانية أو معاينة فنية لإصدار تقرير المطابقة</p>
      </header>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 bg-slate-50/20 flex flex-col sm:flex-row gap-6 items-center">
              <div className="relative flex-1">
                  <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="البحث في المهام..." 
                    className="w-full pl-8 pr-16 py-5 bg-white border border-slate-100 rounded-3xl text-sm font-bold outline-none"
                  />
              </div>
              <button className="flex items-center gap-3 px-8 py-5 bg-white border border-slate-100 rounded-3xl text-sm font-bold text-slate-600">
                  <Filter size={20} />
                  تصفية المواقع
              </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-6">
              {loading ? [...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-slate-50 rounded-[2.5rem] animate-pulse" />
              )) : reports.map((report) => (
                  <motion.div 
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group border-t-4 border-t-indigo-500"
                  >
                      <div className="flex justify-between items-start mb-6">
                           <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                               <Wrench size={22} />
                           </div>
                           <span className={cn(
                               "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tight",
                               report.priority === 'critical' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'
                           )}>
                               {report.priority === 'critical' ? 'سيادي' : 'اعتيادي'}
                           </span>
                      </div>
                      <h3 className="text-base font-black text-slate-900 mb-2 truncate">{report.title}</h3>
                      <p className="text-[11px] font-bold text-slate-400 mb-6 italic line-clamp-2">{report.description}</p>
                      
                      <div className="space-y-3 mb-8">
                           <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase">
                               <MapPin size={14} className="text-indigo-400" />
                               {report.district}
                           </div>
                           <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase">
                               <Clock size={14} className="text-amber-400" />
                               انتظار منذ ٢٤ ساعة
                           </div>
                      </div>

                      <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                           بدء الفحص الفني
                           <Construction size={14} />
                      </button>
                  </motion.div>
              ))}
          </div>
      </div>
    </div>
  );
};
