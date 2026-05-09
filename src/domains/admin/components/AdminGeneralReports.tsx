import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  Eye,
  MessageSquare,
  ArrowUpRight,
  ChevronDown,
  Tag,
  Flag
} from 'lucide-react';
import { reportApi, Report } from '../../core/services/reportApi';
import { cn } from '../../core/utils/cn';

export const AdminGeneralReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const unsubscribe = reportApi.subscribeToReports((data) => {
          setReports(data);
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

  const filteredReports = reports.filter(r => {
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchesSearch = r.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         r.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         r.id?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending_verification': return { label: 'بانتظار التحقق', color: 'text-amber-600 bg-amber-50 border-amber-100', icon: Clock };
      case 'verified': return { label: 'تم التحقق', color: 'text-blue-600 bg-blue-50 border-blue-100', icon: CheckCircle2 };
      case 'resolved': return { label: 'تم الحل', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: CheckCircle2 };
      case 'rejected': return { label: 'مرفوض', color: 'text-rose-600 bg-rose-50 border-rose-100', icon: XCircle };
      default: return { label: 'قيد المراجعة', color: 'text-slate-600 bg-slate-50 border-slate-100', icon: AlertCircle };
    }
  };

  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-rose-600 bg-rose-50';
      case 'high': return 'text-amber-600 bg-amber-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full" dir="rtl">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-2">
        <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-indigo-100">
                <ClipboardList size={12} />
                إدارة البلاغات المركزية
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">رقابة الميدان المباشرة</h1>
            <p className="text-sm font-bold text-slate-400 italic">مراقبة ومعالجة كافة البلاغات الواردة من المواطنين والمناديب والجهات الحكومية</p>
        </div>

        <div className="flex items-center gap-3">
             <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
                {[
                    { id: 'all', label: 'الكل' },
                    { id: 'pending_verification', label: 'الجديدة' },
                    { id: 'verified', label: 'المحققة' },
                    { id: 'resolved', label: 'المنجزة' }
                ].map((btn) => (
                    <button
                        key={btn.id}
                        onClick={() => setFilterStatus(btn.id)}
                        className={cn(
                            "px-5 py-2 rounded-xl text-[11px] font-black transition-all",
                            filterStatus === btn.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-400 hover:text-slate-900"
                        )}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/20 flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 group">
                  <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="البحث برقم البلاغ، العنوان، أو تفاصيل المشكلة..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-6 pr-14 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  />
              </div>
              <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 hover:border-indigo-200 transition-all">
                  <Filter size={18} />
                  <span>تصفية متقدمة</span>
                  <ChevronDown size={16} className="text-slate-400" />
              </button>
          </div>

          <div className="overflow-x-auto">
              <table className="w-full text-right">
                  <thead>
                      <tr className="border-b border-slate-50">
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">رقم البلاغ / العنوان</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الموقع / الحي</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الأهمية</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الحالة</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">التوقيت</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">الإجراءات</th>
                      </tr>
                  </thead>
                  <tbody>
                      {loading ? (
                          [...Array(6)].map((_, i) => (
                              <tr key={i} className="animate-pulse">
                                  <td colSpan={6} className="px-8 py-6 border-b border-slate-50"><div className="h-10 bg-slate-50 rounded-xl" /></td>
                              </tr>
                          ))
                      ) : filteredReports.length === 0 ? (
                          <tr>
                              <td colSpan={6} className="px-8 py-32 text-center">
                                  <ClipboardList size={64} className="mx-auto text-slate-100 mb-6" />
                                  <h3 className="text-lg font-black text-slate-900 mb-1">لا توجد بلاغات حالياً</h3>
                                  <p className="text-sm font-bold text-slate-400 italic">لم يتم العثور على أي نتائج تطابق معايير البحث الحالية.</p>
                              </td>
                          </tr>
                      ) : filteredReports.map((report) => {
                          const status = getStatusInfo(report.status);
                          return (
                              <motion.tr 
                                key={report.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group cursor-pointer"
                              >
                                  <td className="px-8 py-6">
                                      <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                              <Flag size={18} />
                                          </div>
                                          <div>
                                              <p className="text-[10px] font-black text-indigo-600 mb-0.5">#{report.id?.split('-')[0]}</p>
                                              <p className="text-sm font-black text-slate-900 limit-1">{report.title}</p>
                                          </div>
                                      </div>
                                  </td>
                                  <td className="px-8 py-6">
                                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                          <MapPin size={14} className="text-slate-400" />
                                          {report.district || 'حي مجهول'}
                                      </div>
                                  </td>
                                  <td className="px-8 py-6">
                                      <span className={cn(
                                          "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tight",
                                          getPriorityInfo(report.priority)
                                      )}>
                                          {report.priority === 'critical' ? 'طارئ' : report.priority === 'high' ? 'مرتفع' : 'عادي'}
                                      </span>
                                  </td>
                                  <td className="px-8 py-6">
                                      <div className={cn(
                                          "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black border",
                                          status.color
                                      )}>
                                          <status.icon size={12} />
                                          {status.label}
                                      </div>
                                  </td>
                                  <td className="px-8 py-6">
                                      <div className="flex flex-col text-left md:text-right">
                                          <p className="text-[10px] font-black text-slate-900">{new Date(report.createdAt?.seconds * 1000).toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit' })}</p>
                                          <p className="text-[9px] font-bold text-slate-400 italic">{new Date(report.createdAt?.seconds * 1000).toLocaleDateString('ar-YE')}</p>
                                      </div>
                                  </td>
                                  <td className="px-8 py-6 text-left">
                                      <div className="flex items-center justify-end gap-2">
                                          <button title="معاينة التفاصيل" className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl border border-transparent hover:border-indigo-100 transition-all">
                                              <Eye size={16} />
                                          </button>
                                          <button title="الموقع الجغرافي" className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl border border-transparent hover:border-blue-100 transition-all">
                                              <MapPin size={16} />
                                          </button>
                                          <button className="p-2.5 text-slate-300 hover:text-slate-900 transition-colors">
                                              <MoreVertical size={16} />
                                          </button>
                                      </div>
                                  </td>
                              </motion.tr>
                          );
                      })}
                  </tbody>
              </table>
          </div>

          <div className="p-6 bg-slate-50/20 flex flex-col sm:flex-row items-center justify-between border-t border-slate-50 gap-4">
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 italic">
                  <p>إجمالي البلاغات: {reports.length}</p>
                  <p className="w-1 h-1 rounded-full bg-slate-300" />
                  <p>بحاجة لإجراء: {reports.filter(r => r.status === 'pending_verification').length}</p>
              </div>
              <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 ml-4">تم تحديثه قبل دقيقتين</span>
                  <div className="flex gap-1">
                      {[1, 2, 3].map(i => (
                          <button key={i} className={cn(
                              "w-8 h-8 rounded-lg text-[10px] font-black transition-all",
                              i === 1 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" : "bg-white border border-slate-100 text-slate-400 hover:border-indigo-200"
                          )}>
                              {i}
                          </button>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
