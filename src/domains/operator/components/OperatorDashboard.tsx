import { Headset, Inbox, CheckCircle2, XCircle, Forward, Clock, Filter, Search, MoreHorizontal, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { reportApi, Report } from "../../core/services/reportApi";
import { aiService } from "../../core/services/ai";
import { notificationService } from "../../core/services/notifications";
import { cn } from "../../core/utils/cn";

export function OperatorDashboard() {
  const [activeTab, setActiveTab] = useState<'new' | 'processed'>('new');
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [routingId, setRoutingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPending();
    const interval = setInterval(fetchPending, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchPending = async () => {
    try {
      const data = await reportApi.getPendingOperator();
      setReports(data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const handleRoute = async (report: Report, department: string) => {
    setRoutingId(report.id);
    try {
      // Optioanl: Auto-classify before routing if not classified
      let classification = report.classification;
      if (!classification) {
         const res = await aiService.classifyReport(report.description || "لا يوجد وصف");
         if (res.success) classification = res.classification;
      }
      
      await reportApi.routeReport(report.id, department, classification || "عام");
      
      // Notify about routing
      await notificationService.notifyUser(department, {
        title: "بلاغ جديد موجه لقسمك",
        message: `تم توجيه بلاغ جديد رقم ${report.id} إلى قسم ${department}.`,
        type: "info"
      });

      setReports(prev => prev.filter(r => r.id !== report.id));
    } catch (e) {
      console.error(e);
    } finally {
      setRoutingId(null);
    }
  };

  const getTimeAgo = (dateStr: string) => {
    const min = Math.round((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (min === 0) return "الآن";
    if (min < 60) return `منذ ${min} دقيقة`;
    return `منذ ${Math.round(min/60)} ساعة`;
  };

  return (
    <div className="flex flex-col gap-6 w-full p-2 sm:p-10 bg-indigo-50/20 min-h-[85vh] rounded-[3rem] border border-indigo-100/50 shadow-sm">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/20">
            <Headset className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex">مركز استقبال البلاغات (مباشر)</h2>
            <p className="text-slate-500 mt-1 font-bold">إدارة منظمة وسريعة لخدمة المواطن</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="bg-white border border-slate-200 rounded-2xl p-1 shadow-sm flex items-center">
                <button 
                  onClick={() => setActiveTab('new')}
                  className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${activeTab === 'new' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-slate-900'}`}
                >
                    الوارد ({reports.length})
                </button>
            </div>
        </div>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
            { label: "بلاغات جديدة", value: reports.length.toString(), color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "متوسط وقت الرد", value: "< ١ د", color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "بانتظار التوجيه", value: reports.length.toString(), color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <Inbox className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Inbox View */}
        <div className="lg:col-span-8 flex flex-col gap-4">
            <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" placeholder="بحث سريع..." className="pr-10 pl-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold w-64 focus:ring-2 focus:ring-indigo-100" />
                        </div>
                    </div>
                    {loading && <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />}
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
                    <AnimatePresence>
                    {reports.length === 0 && !loading && (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <CheckCircle2 className="w-12 h-12 text-slate-200 mb-2" />
                            <p className="font-bold">لا يوجد أية بلاغات بانتظار التوجيه.</p>
                        </div>
                    )}
                    {reports.map((report) => (
                        <motion.div 
                          key={report.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          className="p-6 hover:bg-indigo-50/30 transition-colors group"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-1">
                                        <Inbox className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-black text-slate-800 line-clamp-1 flex-1 leading-relaxed">{report.description}</h4>
                                        </div>
                                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 mb-3">
                                            <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">{report.id}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {getTimeAgo(report.createdAt)}</span>
                                            <span className="text-slate-400">نوع التدخيل: {report.type}</span>
                                        </div>

                                        {report.imageUrl && (
                                            <div className="mb-4 rounded-xl overflow-hidden border border-slate-200 w-full max-w-xs group-hover:border-indigo-200 transition-colors">
                                                <img src={report.imageUrl} alt="Report" className="w-full h-32 object-cover" />
                                            </div>
                                        )}

                                        {report.aiAnalysis && (
                                            <div className="mb-4 p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Sparkles className="w-3 h-3 text-emerald-600" />
                                                    <span className="text-[10px] font-black text-emerald-700 uppercase">نتائج التحليل الذكي</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {report.aiAnalysis.detectedObjects?.map((obj: string) => (
                                                        <span key={obj} className="px-2 py-0.5 bg-white border border-emerald-100 text-emerald-700 text-[8px] font-bold rounded-lg leading-none">
                                                            {obj}
                                                        </span>
                                                    ))}
                                                    <span className={cn(
                                                        "px-2 py-0.5 text-[8px] font-bold rounded-lg leading-none",
                                                        report.aiAnalysis.severity === 'high' ? "bg-red-100 text-red-700" :
                                                        report.aiAnalysis.severity === 'medium' ? "bg-amber-100 text-amber-700" :
                                                        "bg-blue-100 text-blue-700"
                                                    )}>
                                                        شدة الحالة: {report.aiAnalysis.severity === 'high' ? 'مرتفعة' : report.aiAnalysis.severity === 'medium' ? 'متوسطة' : 'عادية'}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Action Buttons for Routing */}
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {routingId === report.id ? (
                                                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600">
                                                    <Loader2 className="w-4 h-4 animate-spin" /> جاري التوجيه للجهة المختصة...
                                                </div>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleRoute(report, 'نظافة')} className="px-3 py-1.5 bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-700 text-[10px] font-black rounded-lg transition-colors flex items-center gap-1">
                                                        <Forward className="w-3 h-3" /> إلى النظافة
                                                    </button>
                                                    <button onClick={() => handleRoute(report, 'طرق')} className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 text-[10px] font-black rounded-lg transition-colors flex items-center gap-1">
                                                        <Forward className="w-3 h-3" /> إلى الطرق
                                                    </button>
                                                    <button onClick={() => handleRoute(report, 'مياه')} className="px-3 py-1.5 bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 text-[10px] font-black rounded-lg transition-colors flex items-center gap-1">
                                                        <Forward className="w-3 h-3" /> إلى المياه
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </div>
                
                <div className="p-4 bg-slate-50 text-[10px] text-center font-bold text-slate-400 border-t border-slate-100 flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    جاري التحديث تلقائياً للبلاغات الواردة...
                </div>
            </section>
        </div>

        {/* Shortcuts & Support */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <section className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden group">
                <Sparkles className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                <h4 className="text-lg font-black mb-4">التصنيف الذكي</h4>
                <p className="text-xs leading-relaxed opacity-80 mb-4">
                    سيتم تلقائياً قراءة نص وحالة البلاغ عبر الذكاء الاصطناعي لتأكيد قسم التحويل قبل اعتماده منعاً لتواجد بلاغات خاطئة في إدارات المعالجة.
                </p>
                <div className="mt-4 inline-block bg-white/20 px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-inner">
                    نشط ويعمل تلقائياً
                </div>
            </section>

            <section className="bg-white rounded-[2.5rem] p-7 border border-slate-100 shadow-sm">
                <h4 className="font-black text-slate-800 mb-5 text-sm uppercase tracking-widest">جهات التحويل النشطة</h4>
                <div className="space-y-3">
                    {['نظافة', 'طرق', 'مياه', 'كهرباء'].map(org => (
                        <div key={org} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                            <span className="text-xs font-bold text-slate-600">{org}</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
      </div>
    </div>
  );
}
