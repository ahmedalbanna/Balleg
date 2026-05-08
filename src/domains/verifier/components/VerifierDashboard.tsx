import { FileSearch, CheckCircle2, XCircle, AlertCircle, Image as ImageIcon, Mic, MapPin, Search, Filter, ChevronLeft, ChevronRight, History, BarChart3, ShieldCheck, Sparkles, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { aiService } from "../../core/services/ai";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../../core/services/firebase";
import { Report } from "../../core/services/reportApi";
import { notificationService } from "../../core/services/notifications";
import { toast } from "sonner";
import MapView from "../../locations/components/MapView";

export function VerifierDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAIClassifying, setIsAIClassifying] = useState(false);
  const [aiClassification, setAiClassification] = useState<string | null>(null);
  const [priorityInfo, setPriorityInfo] = useState<string>("medium");

  const departments = ['النظافة والمخلفات', 'الطرق والجسور', 'شبكات المياه والصرف', 'الكهرباء والإنارة', 'البيئة والحدائق', 'الأمن والسلامة', 'الحالات الإنسانية'];

  useEffect(() => {
    const q = query(collection(db, 'reports'), where('status', '==', 'pending_verification'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Report));
      setReports(docs);
      if (docs.length > 0 && !selectedReportId) {
        setSelectedReportId(docs[0].id);
        const rep = docs[0];
        setAiClassification(rep.aiAnalysis?.classification || rep.department || "غير محدد");
        setPriorityInfo(rep.aiAnalysis?.priority || rep.priority || "medium");
      }
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'reports'));

    return () => unsubscribe();
  }, []);

  const currentReport = reports.find(r => r.id === selectedReportId);

  const handleVerify = async () => {
    if(!currentReport) return;
    setIsVerifying(true);
    try {
        const repRef = doc(db, 'reports', currentReport.id);
        await updateDoc(repRef, {
            status: "pending_operator",
            department: aiClassification || currentReport.department || "غير محدد",
            priority: priorityInfo,
            updatedAt: new Date().toISOString()
        });

        if (currentReport.userId && currentReport.userId !== "anonymous") {
            await notificationService.notifyUser(currentReport.userId, {
                title: "تم التحقق من بلاغك",
                message: `تم التحقق من صحة بلاغك رقم ${currentReport.id} وهو الآن قيد التوجيه للقسم المختص.`,
                type: "info"
            });
        }

        toast.success("تم اعتماد البلاغ وتوجيهه بنجاح.");
        setSelectedReportId(null);
    } catch (e) {
        handleFirestoreError(e, OperationType.UPDATE, 'reports');
    } finally {
        setIsVerifying(false);
    }
  };

  const handleReject = async () => {
    if(!currentReport) return;
    setIsVerifying(true);
    try {
        const repRef = doc(db, 'reports', currentReport.id);
        await updateDoc(repRef, {
            status: "rejected",
            rejectReason: "بلاغ وهمي أو مكرر (تدقيق بشري)",
            updatedAt: new Date().toISOString()
        });

        if (currentReport.userId && currentReport.userId !== "anonymous") {
            await notificationService.notifyUser(currentReport.userId, {
                title: "تم استبعاد البلاغ",
                message: `تم مراجعة بلاغك رقم ${currentReport.id} وتبين أنه وهمي أو مكرر، لذا تم استبعاده.`,
                type: "error"
            });
        }

        toast.info("تم استبعاد البلاغ.");
        setSelectedReportId(null);
    } catch (e) {
        handleFirestoreError(e, OperationType.UPDATE, 'reports');
    } finally {
        setIsVerifying(false);
    }
  };

  const handleAIClassify = async () => {
    if(!currentReport?.description) return;
    setIsAIClassifying(true);
    setAiClassification(null);
    
    const result = await aiService.classifyReport(currentReport.description);
    
    if (result.success) {
        setAiClassification(result.classification || "غير معروف");
        setPriorityInfo(result.priority || "medium");
    } else {
        toast.error(result.error);
    }
    setIsAIClassifying(false);
  };

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-slate-50/20 min-h-[85vh] rounded-[3rem] border border-slate-200/50 shadow-sm relative overflow-hidden">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-slate-700 text-white flex items-center justify-center shadow-xl shadow-slate-900/20">
            <FileSearch className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex tracking-tight">غرفة مراجعة البيانات</h2>
            <p className="text-slate-500 mt-1 font-bold">المنصة التشغيلية الأولى للتحقق من صحة البلاغات وتصنيفها يدوياً</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">الإنتاجية اليوم</p>
                    <p className="text-lg font-black text-slate-900 leading-none">١٢٨ بلاغاً</p>
                </div>
                <div className="w-px h-8 bg-slate-100" />
                <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">دقة التصنيف</p>
                    <p className="text-lg font-black text-emerald-600 leading-none">٩٨.٥٪</p>
                </div>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Queue List */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
                <div className="p-6 border-b border-slate-50">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">قائمة الانتظار ({reports.length})</h3>
                        <History className="w-4 h-4 text-slate-300" />
                    </div>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                        <input type="text" placeholder="بحث في المعرفات..." className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold outline-none" />
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-3">
                    {reports.map(report => (
                        <button 
                            key={report.id}
                            onClick={() => {
                                setSelectedReportId(report.id);
                                setAiClassification(report.aiAnalysis?.classification || report.department || "غير محدد");
                                setPriorityInfo(report.aiAnalysis?.priority || report.priority || "medium");
                            }}
                            className={`w-full text-right p-4 rounded-2xl border transition-all ${
                                selectedReportId === report.id 
                                ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20 active-scale-95' 
                                : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-white hover:border-slate-300'
                            }`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${
                                    selectedReportId === report.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                                }`}>
                                    {report.type}
                                </span>
                                <span className={`text-[9px] font-bold ${selectedReportId === report.id ? 'text-slate-400' : 'text-slate-400'}`}>
                                    {report.id}
                                </span>
                            </div>
                            <h4 className="text-xs font-black truncate">{report.description || "بلاغ غير معروف"}</h4>
                            <div className="flex items-center gap-2 mt-3">
                                {report.imageUrl && <ImageIcon className={`w-3 h-3 ${selectedReportId === report.id ? 'text-slate-400' : 'text-slate-300'}`} />}
                                {report.audioUrl && <Mic className={`w-3 h-3 ${selectedReportId === report.id ? 'text-slate-400' : 'text-slate-300'}`} />}
                                <div className={`ml-auto w-1.5 h-1.5 rounded-full ${report.priority === 'critical' ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'}`} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Verification Stage */}
        <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
                {currentReport ? (
                    <motion.div 
                        key={currentReport.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col"
                    >
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 font-readex">فحص البلاغ #{currentReport?.id}</h3>
                                <p className="text-[11px] font-bold text-slate-500 mt-1">المبلغ: مجهول (هاتف محمول) • إحداثيات موثقة</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-all shadow-sm">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                                <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-all shadow-sm">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="aspect-video bg-slate-200 rounded-[2rem] overflow-hidden relative group flex items-center justify-center">
                                        {currentReport.imageUrl ? (
                                            <>
                                                <img 
                                                    src={currentReport.imageUrl} 
                                                    alt="Evidence" 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    referrerPolicy="no-referrer"
                                                />
                                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="px-6 py-2.5 bg-white text-slate-900 rounded-xl text-[10px] font-black shadow-xl">تفعيل المكبر</button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-slate-400 font-bold text-xs">لا يوجد صورة مرفقة</div>
                                        )}
                                    </div>

                                    <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <Mic className="w-4 h-4 text-slate-400" />
                                                <span className="text-[10px] font-black text-slate-900 uppercase">التسجيل الصوتي للمبلغ</span>
                                            </div>
                                            {currentReport.audioUrl ? (
                                                <span className="text-[10px] font-bold text-emerald-500">مرفق</span>
                                            ) : (
                                                <span className="text-[10px] font-bold text-slate-400">غير متوفر</span>
                                            )}
                                        </div>
                                        {currentReport.audioUrl ? (
                                            <audio src={currentReport.audioUrl} controls className="w-full h-8" />
                                        ) : (
                                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden relative" />
                                        )}
                                        {currentReport.audioUrl && (
                                            <div className="flex justify-between mt-3">
                                                <button className="text-[9px] font-black text-slate-400 hover:text-slate-900 transition-colors">تحويل لصوت لنص (AI)</button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-8 text-right">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">وصف البلاغ</label>
                                        <p className="text-sm font-bold text-slate-800 leading-relaxed bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                            {currentReport.description || "لا يوجد وصف كتابي لإظهاره."}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2 relative">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] font-black text-slate-400 uppercase block">التصنيف المختارة</label>
                                                <button 
                                                    onClick={handleAIClassify}
                                                    disabled={isAIClassifying}
                                                    className="flex items-center gap-1 text-[9px] font-black text-violet-600 bg-violet-50 px-2 py-1 rounded-lg hover:bg-violet-100 transition-colors disabled:opacity-50"
                                                >
                                                    <Sparkles className="w-3 h-3" />
                                                    {isAIClassifying ? "جاري التصنيف..." : "تصنيف ذكي"}
                                                </button>
                                            </div>
                                            <div className="relative">
                                                <select 
                                                    value={aiClassification || ""}
                                                    onChange={(e) => setAiClassification(e.target.value)}
                                                    className={`w-full p-4 bg-white border ${!aiClassification ? 'border-amber-300 ring-2 ring-amber-100' : 'border-slate-200'} rounded-2xl text-[11px] font-black outline-none focus:ring-2 focus:ring-slate-100 transition-all appearance-none cursor-pointer`}
                                                >
                                                    <option value="">-- اختر الجهة المختصة يدوياً --</option>
                                                    {departments.map(dept => (
                                                        <option key={dept} value={dept}>{dept}</option>
                                                    ))}
                                                </select>
                                                {!aiClassification && (
                                                    <div className="absolute -top-10 right-0 bg-amber-50 text-amber-700 text-[10px] font-black px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-2">
                                                        <AlertCircle size={12} />
                                                        فشل الذكاء الاصطناعي في تحديد الجهة، يرجى الاختيار يدوياً
                                                    </div>
                                                )}
                                                {aiClassification && (
                                                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                        <Wand2 className="w-3 h-3 text-violet-500 animate-pulse" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase block">مستوى الأولوية</label>
                                            <div className="flex gap-2">
                                                <button onClick={() => setPriorityInfo('critical')} className={`flex-1 py-4 rounded-2xl border text-[10px] font-black transition-all ${priorityInfo === 'critical' ? 'bg-rose-50 text-rose-600 border-rose-200 shadow-sm' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>حرج</button>
                                                <button onClick={() => setPriorityInfo('high')} className={`flex-1 py-4 rounded-2xl border text-[10px] font-black transition-all ${priorityInfo === 'high' ? 'bg-orange-50 text-orange-600 border-orange-200 shadow-sm' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>عالي</button>
                                                <button onClick={() => setPriorityInfo('medium')} className={`flex-1 py-4 rounded-2xl border text-[10px] font-black transition-all ${priorityInfo === 'medium' ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-sm' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>عادي</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-slate-900 rounded-[2.5rem] text-white">
                                        <div className="flex items-center gap-3 mb-3">
                                            <MapPin className="w-5 h-5 text-slate-400" />
                                            <span className="text-xs font-black">الموقع الجغرافي الموثق</span>
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-400 mb-4 leading-relaxed">
                                            {currentReport.location ? (
                                                <>الإحداثيات: {currentReport.location[0].toFixed(4)}° N, {currentReport.location[1].toFixed(4)}° E</>
                                            ) : (
                                                "الموقع غير محدد"
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={handleVerify}
                                disabled={isVerifying}
                                className="flex-[2] py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-sm hover:bg-emerald-700 transition-all shadow-[0_15px_30px_-5px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 disabled:opacity-70"
                            >
                                {isVerifying ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-5 h-5" />
                                        اعتماد وتوجيه للقسم المختص
                                    </>
                                )}
                            </button>
                            <button 
                                onClick={handleReject}
                                disabled={isVerifying}
                                className="flex-1 py-5 bg-white border border-slate-200 text-slate-400 rounded-[2rem] font-black text-sm hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all flex items-center justify-center gap-3 disabled:opacity-70">
                                <XCircle className="w-5 h-5" />
                                استبعاد (بلاغ وهمي)
                            </button>
                            <button 
                                onClick={() => toast.info("تم وضع علامة مراجعة ميدانية على البلاغ")}
                                className="flex-1 py-5 bg-white border border-slate-200 text-slate-400 rounded-[2rem] font-black text-sm hover:bg-slate-100 hover:text-slate-900 transition-all flex items-center justify-center gap-3">
                                <AlertCircle className="w-5 h-5" />
                                يحتاج مراجعة ميدانية
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm h-full flex flex-col items-center justify-center p-20 text-center">
                        <div className="w-24 h-24 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-300 mb-8">
                            <ShieldCheck className="w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 font-readex mb-3 tracking-tight">قائمة الانتظار فارغة</h3>
                        <p className="text-slate-500 font-bold max-w-sm mx-auto leading-relaxed">
                            لقد قمت بمراجعة جميع البلاغات المعلقة بنجاح. يمكنك استعراض الأرشيف أو تحليل أداء اليوم.
                        </p>
                        <div className="mt-12 flex gap-4">
                            <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black shadow-xl">استعراض الأرشيف</button>
                            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-xs font-black">تحليل الأداء الفردي</button>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
