import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Activity,
  Zap,
  Phone,
  MessageSquare,
  Navigation,
  Eye,
  CheckCircle2,
  Bell
} from 'lucide-react';
import { reportApi, Report } from '../../core/services/reportApi';
import { cn } from '../../core/utils/cn';

export const OfficialUrgentReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = reportApi.subscribeToReports((data) => {
        // Show only critical and high priority reports
        setReports(data.filter(r => r.priority === 'critical' || r.priority === 'high'));
        setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full" dir="rtl">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-2">
        <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-rose-500 shadow-xl shadow-rose-600/20 animate-pulse">
                <AlertTriangle size={12} />
                غرفة العمليات الاستثنائية
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">البلاغات العاجلة والطارئة</h1>
            <p className="text-sm font-bold text-slate-400 italic">مُتابعة لحظية للبلاغات التي تم تصنيفها كتهديد للأمن العام أو تعطل حيوي للمرافق</p>
        </div>

        <div className="flex items-center gap-4">
             <div className="bg-white px-8 py-4 rounded-[2rem] border border-rose-100 shadow-sm flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                     <Bell size={24} />
                 </div>
                 <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">بلاغات قيد الحل</p>
                     <p className="text-2xl font-black text-slate-900">{reports.length}</p>
                 </div>
             </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
          {loading ? (
             [...Array(3)].map((_, i) => (
                 <div key={i} className="h-64 bg-white rounded-[3.5rem] animate-pulse border border-slate-100" />
             ))
          ) : reports.length === 0 ? (
              <div className="bg-white p-32 rounded-[4rem] text-center border border-slate-100 shadow-sm">
                  <ShieldAlert size={80} className="mx-auto text-slate-100 mb-8" />
                  <h3 className="text-2xl font-black text-slate-900 mb-2">لا توجد حالات طارئة نشطة</h3>
                  <p className="text-sm font-bold text-slate-400 italic">نظام الرصد لم يسجل أي بلاغات "سيادية" خلال الساعات الـ ٢٤ الأخيرة.</p>
              </div>
          ) : reports.map((report) => (
              <motion.div 
                key={report.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                    "bg-white p-10 rounded-[3.5rem] border shadow-sm group hover:shadow-2xl hover:shadow-rose-500/5 transition-all overflow-hidden relative",
                    report.priority === 'critical' ? 'border-rose-100 ring-2 ring-rose-50 ring-offset-0' : 'border-slate-100'
                )}
              >
                  {report.priority === 'critical' && (
                      <div className="absolute top-0 right-0 w-3 lg:w-4 h-full bg-rose-600" />
                  )}
                  
                  <div className="flex flex-col lg:flex-row gap-10">
                      <div className="flex-1 space-y-6">
                          <div className="flex items-center gap-4">
                              <span className="px-5 py-1.5 bg-rose-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">#{report.id?.split('-')[0]}</span>
                              <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400 italic">
                                  <Clock size={14} />
                                  منذ {Math.floor((Date.now() - (report.createdAt?.seconds * 1000 || Date.now())) / 60000)} دقيقة
                              </span>
                          </div>
                          
                          <div>
                              <h3 className="text-2xl font-black text-slate-900 mb-3 leading-tight">{report.title}</h3>
                              <p className="text-sm font-bold text-slate-500 leading-relaxed italic">{report.description}</p>
                          </div>

                          <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-50 text-xs font-bold text-slate-600">
                               <div className="flex items-center gap-2.5">
                                   <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><MapPin size={16} /></div>
                                   {report.district} - {report.locationText || 'الموقع محدد بالإحداثيات'}
                               </div>
                               <div className="flex items-center gap-2.5">
                                   <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><Activity size={16} /></div>
                                   الحالة: {report.status === 'pending_verification' ? 'قيد التقييم الأولي' : 'طاقم العمل في الموقع'}
                               </div>
                          </div>
                      </div>

                      <div className="lg:w-80 space-y-4">
                           <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic text-center">إجراءات التحكم السريع</p>
                                <button className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-xs hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20 flex items-center justify-center gap-3">
                                    <Phone size={18} />
                                    اتصال بغرفة العمليات
                                </button>
                                <button className="w-full py-4 bg-white border border-rose-200 text-rose-600 rounded-2xl font-black text-xs hover:bg-rose-50 transition-all flex items-center justify-center gap-3">
                                    <Navigation size={18} />
                                    توجيه أقرب دورية
                                </button>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="py-3 bg-white border border-slate-100 text-slate-400 rounded-2xl font-black text-[10px] hover:bg-slate-50 flex items-center justify-center gap-2">
                                        <MessageSquare size={14} />
                                        دردشة
                                    </button>
                                    <button className="py-3 bg-white border border-slate-100 text-slate-400 rounded-2xl font-black text-[10px] hover:bg-slate-50 flex items-center justify-center gap-2">
                                        <Eye size={14} />
                                        الموقع
                                    </button>
                                </div>
                           </div>
                      </div>
                  </div>
              </motion.div>
          ))}
      </div>
    </div>
  );
};
