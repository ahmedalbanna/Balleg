import { BarChart3, LayoutDashboard, Bell, Search, Filter, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { reportApi, Report } from "../../core/services/reportApi";

export function OfficialDashboard() {
  const [department, setDepartment] = useState("نظافة");
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string|null>(null);

  useEffect(() => {
    fetchReports();
    const interval = setInterval(fetchReports, 5000); // Polling for demo
    return () => clearInterval(interval);
  }, [department]);

  const fetchReports = async () => {
    try {
      const data = await reportApi.getDepartmentReports(department);
      setReports(data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, s: string) => {
    setUpdatingId(id);
    try {
      await reportApi.updateStatus(id, s);
      setReports(prev => prev.filter(r => r.id !== id || s !== 'resolved')); // If resolved, it disappears from this view
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const stats = [
    { label: "بلاغات نشطة", value: reports.length.toString(), color: "text-blue-600", bg: "bg-blue-50" },
    { label: "جاري المعالجة", value: reports.filter(r => r.status === 'in_progress').length.toString(), color: "text-amber-600", bg: "bg-amber-50" },
    { label: "بانتظار العمل", value: reports.filter(r => r.status === 'pending_official').length.toString(), color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "تقييم الأداء", value: "٩٢٪", color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  const getTimeAgo = (dateStr: string) => {
    const min = Math.round((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (min === 0) return "الآن";
    if (min < 60) return `${min} دقيقة`;
    return `${Math.round(min/60)} ساعة`;
  };

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-slate-50 min-h-[80vh] rounded-3xl border border-slate-200">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 font-readex">لوحة تحكم معالجة البلاغات</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-slate-500 font-bold text-sm">الجهة الحالية:</span>
            <select 
              value={department} 
              onChange={(e) => { setDepartment(e.target.value); setLoading(true); }}
              className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-2 py-1 font-bold shadow-sm outline-none"
            >
                <option value="نظافة">قطاع النظافة</option>
                <option value="طرق">قطاع الطرق والمواصلات</option>
                <option value="مياه">مؤسسة المياه</option>
                <option value="كهرباء">الكهرباء والطاقة</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                تصدير تقرير إنجاز
            </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
          >
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{stat.label}</p>
            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Interactive Table Area */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold flex items-center gap-2 text-slate-800">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                البلاغات الموجهة إلى {department}
                {loading && <Loader2 className="w-4 h-4 text-blue-400 animate-spin mr-2" />}
            </h3>
        </div>
        <div className="overflow-x-auto flex-1 relative">
            <table className="w-full text-right">
                <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        <th className="px-6 py-4">رقم البلاغ</th>
                        <th className="px-6 py-4 w-1/3">الوصف</th>
                        <th className="px-6 py-4">التصنيف الذكي</th>
                        <th className="px-6 py-4">وقت الانتظار</th>
                        <th className="px-6 py-4">الحالة</th>
                        <th className="px-6 py-4">إجراء</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    <AnimatePresence>
                        {reports.length === 0 && !loading && (
                            <tr>
                                <td colSpan={6} className="text-center py-12 text-slate-400">
                                    <div className="flex flex-col items-center">
                                        <CheckCircle className="w-12 h-12 text-emerald-200 mb-2" />
                                        <p className="font-bold">لا توجد بلاغات معلقة لهذه الجهة. عمل ممتاز!</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {reports.map((report) => (
                            <motion.tr 
                                initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0, scale:0.95}}
                                key={report.id} className="hover:bg-slate-50/80 transition-colors group"
                            >
                                <td className="px-6 py-4 font-mono text-sm font-bold text-slate-700">{report.id}</td>
                                <td className="px-6 py-4 text-sm font-bold opacity-80 leading-relaxed max-w-xs transition-all">
                                    <div className="flex flex-col gap-2">
                                        <p className="line-clamp-2">{report.description}</p>
                                        {report.imageUrl && (
                                            <div className="w-20 h-20 rounded-lg overflow-hidden border border-slate-100 shadow-sm hover:scale-110 transition-transform cursor-pointer">
                                                <img src={report.imageUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs font-bold text-indigo-600">
                                    <span className="bg-indigo-50 px-2 py-1 rounded text-[10px] uppercase">{report.classification || report.type}</span>
                                </td>
                                <td className="px-6 py-4 text-xs font-bold text-slate-500">{getTimeAgo(report.createdAt)}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${report.status === 'in_progress' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                                        {report.status === 'in_progress' ? 'جاري المعالجة' : 'بانتظار العمل'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-left">
                                    <div className="flex items-center gap-2">
                                        {updatingId === report.id ? (
                                            <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                                        ) : (
                                            <>
                                                {report.status !== 'in_progress' && (
                                                    <button onClick={() => handleUpdateStatus(report.id, 'in_progress')} className="px-3 py-1 bg-amber-50 text-amber-600 hover:bg-amber-100 text-xs font-bold rounded transition-colors">
                                                        بدء العمل
                                                    </button>
                                                )}
                                                <button onClick={() => handleUpdateStatus(report.id, 'resolved')} className="px-3 py-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 text-xs font-bold rounded transition-colors flex items-center gap-1">
                                                    إنجاز
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </tbody>
            </table>
        </div>
      </section>
    </div>
  );
}
