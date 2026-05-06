import { Headset, Inbox, CheckCircle2, XCircle, Forward, Clock, Filter, Search, MoreHorizontal, Loader2, Sparkles, MapPin, X, ShieldCheck, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { usePermissions } from "../../core/hooks/usePermissions";
import { RequirePermission } from "../../core/components/RequirePermission";
import { reportApi, Report } from "../../core/services/reportApi";
import { aiService } from "../../core/services/ai";
import { notificationService } from "../../core/services/notifications";
import { cn } from "../../core/utils/cn";
import { toast } from "sonner";
import MapView from "../../locations/components/MapView";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../core/services/firebase";

export function OperatorDashboard() {
  const [activeTab, setActiveTab] = useState<'new' | 'processed'>('new');
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [routingId, setRoutingId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectDetails, setRejectDetails] = useState("");
  const [selectedMapLocation, setSelectedMapLocation] = useState<[number, number] | null>(null);

  const { hasPermission } = usePermissions();

  useEffect(() => {
    if (!hasPermission('report:read_all')) {
      setLoading(false);
      return;
    }
    
    import("firebase/firestore").then(({ collection, query, where, onSnapshot }) => {
       const q = query(collection(db, 'reports'), where('status', '==', 'pending_operator'));
       const unsubscribe = onSnapshot(q, (snapshot) => {
          const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Report));
          const priorityWeights: Record<string, number> = { critical: 4, high: 3, medium: 2, low: 1 };
          const sorted = docs.sort((a: Report, b: Report) => {
            const wA = priorityWeights[a.priority || 'low'] || 1;
            const wB = priorityWeights[b.priority || 'low'] || 1;
            if (wA !== wB) return wB - wA;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          setReports(sorted);
          setLoading(false);
       });
       return () => unsubscribe();
    });
  }, []);

  const handleRoute = async (report: Report, department: string) => {
    setRoutingId(report.id);
    try {
      let classification = report.classification;
      if (!classification) {
         const res = await aiService.classifyReport(report.description || "لا يوجد وصف");
         if (res.success) classification = res.classification;
      }
      
      const reportRef = doc(db, 'reports', report.id);
      await updateDoc(reportRef, {
        status: 'pending_official',
        department: department,
        updatedAt: serverTimestamp()
      });
      
      await notificationService.notifyUser(department, {
        title: "بلاغ جديد موجه لقسمك",
        message: `تم توجيه بلاغ جديد رقم ${report.id} إلى قسم ${department}.`,
        type: "info"
      });

      setReports(prev => prev.filter(r => r.id !== report.id));
      toast.success(`تم القبول وتوجيه البلاغ إلى ${department}`);
    } catch (e) {
      console.error(e);
      toast.error('حدث خطأ أثناء التوجيه');
    } finally {
      setRoutingId(null);
    }
  };

  const handleReject = async (reportId: string) => {
    if (!rejectReason) {
      toast.error("يرجى اختيار سبب الرفض");
      return;
    }
    if (!rejectDetails) {
      toast.error("يرجى كتابة تفاصيل سبب الرفض");
      return;
    }

    try {
      const toastId = toast.loading("جاري رفض البلاغ...");
      // For demo, standard update via direct firestore to status rejected
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, {
        status: 'rejected',
        rejectReason: rejectReason,
        rejectDetails: rejectDetails,
        updatedAt: serverTimestamp()
      });
      
      setReports(prev => prev.filter(r => r.id !== reportId));
      setRejectingId(null);
      setRejectReason("");
      setRejectDetails("");
      toast.success("تم رفض البلاغ", { id: toastId });
    } catch (e) {
      console.error(e);
      toast.error("حدث خطأ أثناء الرفض");
    }
  };

  const getTimeAgo = (dateStr: string) => {
    const min = Math.round((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (min === 0) return "الآن";
    if (min < 60) return `منذ ${min} دقيقة`;
    return `منذ ${Math.round(min/60)} ساعة`;
  };

  const departments = ['النظافة والمخلفات', 'الطرق والجسور', 'المياه والصرف الصحي', 'الكهرباء والإنارة', 'الحدائق والمرافق', 'الجهات الأمنية'];

  return (
    <div className="flex flex-col gap-6 w-full p-2 sm:p-10 bg-indigo-50/20 min-h-[85vh] rounded-[3rem] border border-indigo-100/50 shadow-sm relative">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/20">
            <Headset className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex">مركز استقبال البلاغات (العمليات)</h2>
            <p className="text-slate-500 mt-1 font-bold">إدارة منظمة وسريعة لتصنيف وتوجيه البلاغات الواردة</p>
          </div>
        </div>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
            { label: "بلاغات جديدة واردة", value: reports.length.toString(), color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "متوسط وقت الرد", value: "< ١ د", color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "بلاغات قيد المعالجة (مركزياً)", value: "3", color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <Inbox className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
              <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Inbox View */}
        <div className="lg:col-span-8 flex flex-col gap-4">
            <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[700px]">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <h3 className="font-black text-slate-800 flex items-center gap-2">
                           <Inbox className="text-indigo-600 w-5 h-5"/> الوارد الجديد
                        </h3>
                    </div>
                    {loading && <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />}
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                    <AnimatePresence>
                    {reports.length === 0 && !loading && (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8">
                            <CheckCircle2 className="w-16 h-16 text-slate-200 mb-4" />
                            <p className="font-bold text-lg text-slate-500">لا يوجد أية بلاغات واردة جديدة.</p>
                            <p className="text-xs mt-2">جميع البلاغات تم توجيهها بنجاح.</p>
                        </div>
                    )}
                    {reports.map((report) => {
                        const defaultDept = report.aiAnalysis?.classification || 'عام';
                        
                        return (
                        <motion.div 
                          key={report.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          className="p-6 hover:bg-slate-50/50 transition-colors group flex flex-col gap-4"
                        >
                            <div className="flex items-center gap-3 mb-2">
                               {report.priority === 'critical' && (
                                   <span className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-[10px] font-black rounded-lg animate-pulse shadow-sm">
                                       <AlertCircle className="w-3 h-3" />
                                       عاجل جداً
                                   </span>
                               )}
                               <span className="text-indigo-700 bg-indigo-50 px-3 py-1 font-black text-[10px] rounded-lg tracking-wider border border-indigo-100 uppercase">
                                   ID: {report.id}
                               </span>
                               <span className="text-slate-500 text-[10px] font-bold flex items-center gap-1">
                                   <Clock className="w-3 h-3" /> {getTimeAgo(report.createdAt)}
                               </span>
                            </div>

                            <p className="text-sm font-black text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                              {report.description}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                {report.imageUrl && (
                                    <div className="w-48 h-32 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                                        <img src={report.imageUrl} alt="مرفق البلاغ" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                
                                <div className="flex flex-col gap-2 flex-1 max-w-sm">
                                  {report.audioUrl && (
                                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                                        <Headset className="w-5 h-5 text-indigo-500" />
                                        <audio controls className="h-8 flex-1 w-full" src={report.audioUrl}>
                                          متصفحك لا يدعم تشغيل الصوت.
                                        </audio>
                                      </div>
                                  )}
                                  
                                  {report.location && Array.isArray(report.location) && (
                                     <button 
                                        onClick={() => setSelectedMapLocation(report.location as [number, number])}
                                        className="w-full bg-slate-100 hover:bg-indigo-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between transition-colors text-indigo-700 font-bold text-xs"
                                     >
                                        <span className="flex items-center gap-2"><MapPin className="w-4 h-4"/> عرض الموقع على الخريطة</span>
                                        <span>🌍</span>
                                     </button>
                                  )}
                                </div>
                            </div>

                            {report.aiAnalysis && (
                                <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl flex items-center gap-3">
                                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                                    <div className="text-[11px] font-bold text-indigo-900">
                                        اقتراح الذكاء الاصطناعي: قسم <strong className="bg-white px-2 py-0.5 rounded text-indigo-700 mx-1">{report.aiAnalysis.classification || 'غير محدد'}</strong>
                                        <span className="text-slate-500 text-[10px] mr-2">(درجة التوافق: مرتفعة)</span>
                                    </div>
                                </div>
                            )}
                                        
                            {/* Actions Area */}
                            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                               {rejectingId === report.id ? (
                                  <div className="flex flex-col gap-3 w-full animate-in fade-in slide-in-from-top-4">
                                     <div className="flex items-center justify-between">
                                       <h5 className="text-xs font-black text-red-600">سبب رفض البلاغ:</h5>
                                       <button onClick={() => setRejectingId(null)} className="text-slate-400 hover:text-slate-700"><X className="w-4 h-4"/></button>
                                     </div>
                                     <select 
                                       value={rejectReason}
                                       onChange={e => setRejectReason(e.target.value)}
                                       className="w-full p-2.5 rounded-xl border border-red-200 bg-red-50 text-xs font-bold text-slate-700"
                                     >
                                        <option value="">-- اختر سبب الرفض --</option>
                                        <option value="معلومات غير مكتملة">معلومات البلاغ غير مكتملة</option>
                                        <option value="بلاغ متكرر">بلاغ متكرر أو موجود مسبقاً</option>
                                        <option value="خارج النطاق">خارج النطاق الجغرافي أو الاختصاص</option>
                                        <option value="بلاغ وهمي">بلاغ كيدي أو وهمي</option>
                                     </select>
                                     <textarea 
                                       placeholder="اكتب تفاصيل إضافية إجبارية للمواطن..."
                                       value={rejectDetails}
                                       onChange={e => setRejectDetails(e.target.value)}
                                       className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold min-h-[80px]"
                                     />
                                     <div className="flex gap-2">
                                        <button onClick={() => handleReject(report.id)} className="flex-1 bg-red-600 text-white font-black text-xs py-2.5 rounded-xl hover:bg-red-700 transition-colors">
                                           تأكيد الرفض
                                        </button>
                                     </div>
                                  </div>
                               ) : (
                                 <>
                                    <div className="flex items-center gap-2">
                                       <button 
                                         onClick={() => handleRoute(report, defaultDept)}
                                         disabled={routingId === report.id}
                                         className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50"
                                       >
                                         <CheckCircle2 className="w-4 h-4" /> 
                                         قبول وتوجيه للاقتراح
                                       </button>
                                       
                                       <div className="relative group/dropdown">
                                          <button 
                                            className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-black hover:bg-slate-50 transition-colors flex items-center gap-2"
                                          >
                                            <Forward className="w-4 h-4" /> 
                                            تحويل يدوي
                                          </button>
                                          {/* Dropdown menu */}
                                          <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all z-10 flex flex-col overflow-hidden">
                                             {departments.map(dept => (
                                                <button 
                                                  key={dept}
                                                  onClick={() => handleRoute(report, dept)}
                                                  className="text-right px-4 py-3 text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 border-b border-slate-50 last:border-0"
                                                >
                                                  {dept}
                                                </button>
                                             ))}
                                          </div>
                                       </div>
                                    </div>
                                    
                                    <button 
                                      onClick={() => setRejectingId(report.id)}
                                      className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl text-xs font-black transition-colors flex items-center gap-2"
                                    >
                                       <XCircle className="w-4 h-4" /> رفض
                                    </button>
                                 </>
                               )}
                            </div>
                        </motion.div>
                    )})}
                    </AnimatePresence>
                </div>
            </section>
        </div>

        {/* Shortcuts & Support */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <section className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden group">
                <Sparkles className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                <h4 className="text-xl font-black mb-4 flex items-center gap-2 border-b border-white/20 pb-4">
                  <ShieldCheck className="w-6 h-6"/> صلاحيات الاستقبال
                </h4>
                <ul className="text-xs leading-relaxed opacity-90 space-y-3 font-bold">
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-300 mt-1.5 shrink-0"/> أنت أول نقطة اتصال مع بلاغات المواطنين.</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-300 mt-1.5 shrink-0"/> قم بتحويل البلاغ للإدارة المختصة للتنفيذ.</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-300 mt-1.5 shrink-0"/> البلاغات المرفوضة يجب أن تحتوي على مبرر واضح ورسالة إضافية.</li>
                    <li className="flex gap-2 text-indigo-200"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"/> (لا يمكنك تعديل البلاغات بعد توجيهها للقسم).</li>
                </ul>
            </section>
        </div>
      </div>

      {/* Map Modal */}
      <AnimatePresence>
         {selectedMapLocation && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                 onClick={() => setSelectedMapLocation(null)}
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95, y: 20 }}
                 className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
               >
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                     <h3 className="font-black text-slate-800 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-indigo-600" />
                        موقع البلاغ المحدد
                     </h3>
                     <button 
                       onClick={() => setSelectedMapLocation(null)}
                       className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-300 transition-colors"
                     >
                        <X className="w-4 h-4" />
                     </button>
                  </div>
                  <div className="h-[500px] w-full">
                     <MapView 
                        center={selectedMapLocation}
                        points={[{
                           lat: selectedMapLocation[0],
                           lng: selectedMapLocation[1],
                           intensity: 0.8,
                           label: "موقع المخالفة"
                        }]}
                     />
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

    </div>
  );
}

