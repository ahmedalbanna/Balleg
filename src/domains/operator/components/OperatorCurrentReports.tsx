import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  MoreVertical,
  ChevronDown,
  Navigation,
  MessageSquare,
  Zap,
  Building2,
  FileText,
  User
} from 'lucide-react';
import { reportApi, Report } from '../../core/services/reportApi';
import { cn } from '../../core/utils/cn';

export const OperatorCurrentReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = reportApi.subscribeToReports((data) => {
        // Show all active reports for operator to monitor
        setReports(data.filter(r => r.status !== 'completed' && r.status !== 'rejected'));
        setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredReports = reports.filter(r => 
    r.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 w-full" dir="rtl">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-2">
        <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-emerald-100">
                <Activity size={12} />
                نظام الرصد والمتابعة اللحظية
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">البلاغات الجارية</h1>
            <p className="text-sm font-bold text-slate-400 italic">مُتابعة حالة التدخلات الميدانية الجارية والتأكد من سرعة تجاوب الفرق المختصة</p>
        </div>

        <div className="flex items-center gap-3">
             <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                 <div className="flex -space-x-4 space-x-reverse">
                     {[1,2,3].map(i => (
                         <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
                             <User size={12} />
                         </div>
                     ))}
                 </div>
                 <p className="text-[10px] font-black text-slate-900 uppercase">١٢ طاقم نشط</p>
             </div>
        </div>
      </header>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 bg-slate-50/20 flex flex-col sm:flex-row gap-6 items-center">
              <div className="relative flex-1 group">
                  <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="البحث برقم البلاغ، المنطقة، أو نوع الخدمة..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-16 py-5 bg-white border border-slate-100 rounded-3xl text-sm font-bold focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all"
                  />
              </div>
              <button className="flex items-center gap-3 px-8 py-5 bg-white border border-slate-100 rounded-3xl text-sm font-bold text-slate-600 hover:border-emerald-200 transition-all">
                  <Filter size={20} />
                  <span>تصفية الحالة</span>
                  <ChevronDown size={18} className="text-slate-400" />
              </button>
          </div>

          <div className="overflow-x-auto">
              <table className="w-full text-right">
                  <thead>
                      <tr className="border-b border-slate-50">
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">البلاغ والمنطقة</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">جهة الاختصاص</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">مستوى الخطورة</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">التقدم الميداني</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">آخر تحديث</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">الإجراءات</th>
                      </tr>
                  </thead>
                  <tbody>
                      {loading ? (
                          [...Array(5)].map((_, i) => (
                              <tr key={i} className="animate-pulse">
                                  <td colSpan={6} className="px-10 py-8 border-b border-slate-50"><div className="h-12 bg-slate-50 rounded-2xl" /></td>
                              </tr>
                          ))
                      ) : filteredReports.length === 0 ? (
                          <tr>
                              <td colSpan={6} className="px-10 py-32 text-center text-slate-300">لا توجد بلاغات نشطة حالياً</td>
                          </tr>
                      ) : filteredReports.map((report) => (
                          <motion.tr 
                            key={report.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group"
                          >
                              <td className="px-10 py-8">
                                  <div className="flex items-center gap-5">
                                      <div className={cn(
                                          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110",
                                          report.priority === 'critical' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-400'
                                      )}>
                                          <FileText size={22} />
                                      </div>
                                      <div>
                                          <p className="text-[10px] font-black text-slate-400 mb-0.5 tracking-widest uppercase">#{report.id?.split('-')[0]}</p>
                                          <p className="text-sm font-black text-slate-900 mb-1">{report.title}</p>
                                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 italic">
                                              <MapPin size={12} />
                                              {report.district}
                                          </div>
                                      </div>
                                  </div>
                              </td>
                              <td className="px-10 py-8">
                                  <div className="flex items-center gap-3">
                                      <Building2 size={16} className="text-slate-400" />
                                      <span className="text-xs font-bold text-slate-700">
                                          {report.department === 'water' ? 'قطاع المياه' : 
                                           report.department === 'electricity' ? 'طوارئ الكهرباء' : 'صندوق النظافة'}
                                      </span>
                                  </div>
                              </td>
                              <td className="px-10 py-8">
                                  <span className={cn(
                                      "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tight",
                                      report.priority === 'critical' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 
                                      report.priority === 'high' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                                  )}>
                                      {report.priority === 'critical' ? 'فوري / سيادي' : 
                                       report.priority === 'high' ? 'أولوية قصوى' : 'اعتيادي'}
                                  </span>
                              </td>
                              <td className="px-10 py-8">
                                  <div className="flex flex-col gap-2">
                                      <div className="flex items-center justify-between">
                                          <span className="text-[10px] font-black text-slate-900">
                                              {report.status === 'verified' ? '٧٥٪' : 
                                               report.status === 'pending_verification' ? '٣٠٪' : '١٠٪'}
                                          </span>
                                          <span className="text-[9px] font-bold text-slate-400 italic underline">قيد التنفيذ</span>
                                      </div>
                                      <div className="w-32 h-1.5 bg-slate-50 border border-slate-100 rounded-full overflow-hidden">
                                          <div 
                                            className={cn(
                                                "h-full rounded-full transition-all duration-1000",
                                                report.status === 'verified' ? 'w-3/4 bg-emerald-500' : 
                                                report.status === 'pending_verification' ? 'w-1/3 bg-blue-500' : 'w-1/10 bg-slate-300'
                                            )} 
                                          />
                                      </div>
                                  </div>
                              </td>
                              <td className="px-10 py-8">
                                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                                      <Clock size={14} className="text-slate-300" />
                                      منذ ١٥ دقيقة
                                  </div>
                              </td>
                              <td className="px-10 py-8 text-left">
                                  <div className="flex items-center justify-end gap-3">
                                      <button className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-emerald-600 hover:border-emerald-100 rounded-xl transition-all shadow-sm">
                                          <Navigation size={18} />
                                      </button>
                                      <button className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 rounded-xl transition-all shadow-sm">
                                          <MessageSquare size={18} />
                                      </button>
                                      <button className="p-3 text-slate-300 hover:text-slate-900 transition-colors">
                                          <MoreVertical size={18} />
                                      </button>
                                  </div>
                              </td>
                          </motion.tr>
                      ))}
                  </tbody>
              </table>
          </div>

          <div className="p-8 bg-slate-50/20 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase italic">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" /> مياه
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase italic">
                      <div className="w-2 h-2 rounded-full bg-amber-500" /> كهرباء
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase italic">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" /> أشغال
                  </div>
              </div>
              <p className="text-xs font-bold text-slate-300 italic">إجمالي البلاغات النشطة: {reports.length}</p>
          </div>
      </div>
    </div>
  );
};
