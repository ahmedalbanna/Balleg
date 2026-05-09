import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  AlertTriangle,
  FileCheck,
  MoreVertical,
  Eye,
  Stamp,
  ArrowUpRight,
  ChevronDown,
  Building2,
  FileText
} from 'lucide-react';
import { reportApi, Report } from '../../core/services/reportApi';
import { cn } from '../../core/utils/cn';

export const OfficialApproval: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const unsubscribe = reportApi.subscribeToReports((data) => {
          // Filter reports that are verified by specialist but need official approval
          // For prototype, we'll show pending_verification and verified
          setReports(data.filter(r => r.status === 'verified' || r.status === 'pending_verification'));
          setLoading(false);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false);
      }
    };
    fetchReports();
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
                <ShieldCheck size={12} />
                وحدة الاعتماد والمصادقة الحكومية
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">اعتماد بلاغات الميدان</h1>
            <p className="text-sm font-bold text-slate-400 italic">المصادقة الرسمية على تقارير الإنجاز ومعالجة البلاغات من الجهات المختصة</p>
        </div>

        <div className="flex items-center gap-3">
             <button className="px-6 py-3 bg-emerald-600 text-white rounded-2xl text-xs font-black hover:bg-emerald-700 transition-all active:scale-95 flex items-center gap-2 shadow-xl shadow-emerald-600/20">
                <Stamp size={16} />
                توقيع جماعي (Batch Approval)
            </button>
        </div>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/20 flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 group">
                  <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="البحث برقم البلاغ، الجهة المنفذة، أو نوع الخدمة..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-6 pr-14 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  />
              </div>
              <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 hover:border-emerald-200 transition-all">
                  <Filter size={18} />
                  <span>تصفية الفئات</span>
                  <ChevronDown size={16} className="text-slate-400" />
              </button>
          </div>

          <div className="overflow-x-auto">
              <table className="w-full text-right">
                  <thead>
                      <tr className="border-b border-slate-50">
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">رقم البلاغ / التصنيف</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الجهة المرفوعة منها</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">المستوى</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">حالة الميدان</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">تاريخ الرفع</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">التوثيق</th>
                      </tr>
                  </thead>
                  <tbody>
                      {loading ? (
                          [...Array(5)].map((_, i) => (
                              <tr key={i} className="animate-pulse">
                                  <td colSpan={6} className="px-8 py-6 border-b border-slate-50"><div className="h-12 bg-slate-50 rounded-xl" /></td>
                              </tr>
                          ))
                      ) : filteredReports.length === 0 ? (
                          <tr>
                              <td colSpan={6} className="px-8 py-32 text-center">
                                  <FileCheck size={64} className="mx-auto text-slate-100 mb-6" />
                                  <h3 className="text-lg font-black text-slate-900 mb-1">لا توجد بلاغات بانتظار الاعتماد</h3>
                                  <p className="text-sm font-bold text-slate-400 italic">تمت معالجة كافة طلبات المصادقة الواردة إلى مكتبكم.</p>
                              </td>
                          </tr>
                      ) : filteredReports.map((report) => (
                          <motion.tr 
                            key={report.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group"
                          >
                              <td className="px-8 py-6">
                                  <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                          <FileText size={18} />
                                      </div>
                                      <div>
                                          <p className="text-[10px] font-black text-emerald-600 mb-0.5">#{report.id?.split('-')[0]}</p>
                                          <p className="text-sm font-black text-slate-900">{report.title}</p>
                                      </div>
                                  </div>
                              </td>
                              <td className="px-8 py-6">
                                  <div className="flex items-center gap-2">
                                      <Building2 size={14} className="text-slate-400" />
                                      <span className="text-xs font-bold text-slate-600">
                                          {report.department === 'water' ? 'مؤسسة المياه' : 
                                           report.department === 'electricity' ? 'وزارة الكهرباء' : 'الأشغال العامة'}
                                      </span>
                                  </div>
                              </td>
                              <td className="px-8 py-6">
                                  <span className={cn(
                                      "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tight",
                                      report.priority === 'critical' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
                                  )}>
                                      {report.priority === 'critical' ? 'سيادي / طارئ' : 'اعتيادي'}
                                  </span>
                              </td>
                              <td className="px-8 py-6">
                                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black border border-blue-100 bg-blue-50 text-blue-600">
                                      <Clock size={12} />
                                      بانتظار الختم
                                  </div>
                              </td>
                              <td className="px-8 py-6">
                                  <p className="text-[10px] font-black text-slate-900">{new Date(report.createdAt?.seconds * 1000).toLocaleDateString('ar-YE')}</p>
                                  <p className="text-[9px] font-bold text-slate-400 italic">{new Date(report.createdAt?.seconds * 1000).toLocaleTimeString('ar-YE')}</p>
                              </td>
                              <td className="px-8 py-6 text-left">
                                  <div className="flex items-center justify-end gap-2">
                                      <button title="اعتماد ومصادقة" className="p-2.5 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl border border-emerald-100 transition-all">
                                          <Stamp size={18} />
                                      </button>
                                      <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl border border-transparent hover:border-indigo-100 transition-all">
                                          <Eye size={18} />
                                      </button>
                                      <button className="p-2.5 text-slate-300 hover:text-slate-900 transition-colors">
                                          <MoreVertical size={18} />
                                      </button>
                                  </div>
                              </td>
                          </motion.tr>
                      ))}
                  </tbody>
              </table>
          </div>

          <div className="p-6 bg-slate-50/20 flex items-center justify-between border-t border-slate-50">
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 italic">
                  <p>إجمالي الوارد: {reports.length}</p>
                  <p className="w-1 h-1 rounded-full bg-slate-300" />
                  <p>تم تدقيقه آلياً: 100%</p>
              </div>
              <div className="flex items-center gap-2">
                  <button className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-600">
                      <ChevronDown size={18} />
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};
