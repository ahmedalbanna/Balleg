import { Headset, Inbox, CheckCircle2, XCircle, Forward, Clock, Filter, Search, MoreHorizontal, Loader2, Sparkles, MapPin, X, ShieldCheck, AlertCircle, Bot, Mic, Square } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { reportApi, Report } from "../../core/services/reportApi";
import { aiService } from "../../core/services/ai";
import { notificationService } from "../../core/services/notifications";
import { cn } from "../../core/utils/cn";
import { toast } from "sonner";
import OperatorMapView from "./OperatorMapView";
import { doc, updateDoc, collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../core/services/firebase";

export function OperatorDashboard() {
   const [activeTab, setActiveTab] = useState<'new' | 'processed'>('new');
   const [reports, setReports] = useState<Report[]>([]);
   const [loading, setLoading] = useState(true);
   const [routingId, setRoutingId] = useState<string | null>(null);
   const [analyzingId, setAnalyzingId] = useState<string | null>(null);
   const [rejectingId, setRejectingId] = useState<string | null>(null);
   const [rejectReason, setRejectReason] = useState("");
   const [rejectDetails, setRejectDetails] = useState("");
   const [previewReport, setPreviewReport] = useState<Report | null>(null);
   const [selectedMapLocation, setSelectedMapLocation] = useState<[number, number] | null>(null);
   const [routeComment, setRouteComment] = useState("");

   // Rejection Voice States
   const [isRecordingReject, setIsRecordingReject] = useState(false);
   const [rejectAudioBlob, setRejectAudioBlob] = useState<Blob | null>(null);
   const mediaRecorderRef = useRef<MediaRecorder | null>(null);

   const handlePreviewReport = (report: Report | null) => {
      setPreviewReport(report);
      setRejectingId(null);
      setRejectReason("");
      setRejectDetails("");
      setRejectAudioBlob(null);
      setRouteComment("");
   };

   useEffect(() => {
      setLoading(true);
      import("firebase/firestore").then(({ collection, query, where, onSnapshot }) => {
         const statusFilter = activeTab === 'new' ? 'pending_operator' : 'in_progress';
         const q = query(collection(db, 'reports'), where('status', '==', statusFilter));
         const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Report));
            const priorityWeights: Record<string, number> = { critical: 4, high: 3, medium: 2, low: 1 };
            const sorted = docs.sort((a: Report, b: Report) => {
               const pA = a.aiAnalysis?.priority || a.priority || 'low';
               const pB = b.aiAnalysis?.priority || b.priority || 'low';
               const wA = priorityWeights[pA] || 1;
               const wB = priorityWeights[pB] || 1;
               if (activeTab === 'new') {
                  if (wA !== wB) return wB - wA;
                  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
               } else {
                  return new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime();
               }
            });
            setReports(sorted);
            setLoading(false);
         });
         return () => unsubscribe();
      });
   }, [activeTab]);

   const handleRoute = async (report: Report, department: string, comment?: string) => {
      setRoutingId(report.id);
      try {
         let classification = report.classification || report.aiAnalysis?.classification || department;
         let priority = report.priority || report.aiAnalysis?.priority || 'medium';

         const reportRef = doc(db, 'reports', report.id);
         await updateDoc(reportRef, {
            status: 'pending_official',
            department: department,
            classification: classification,
            priority: priority,
            operatorComment: comment || "",
            updatedAt: new Date().toISOString()
         });

         const auditRef = collection(db, 'audits');
         await addDoc(auditRef, {
            reportId: report.id,
            action: 'routed',
            target: department,
            operatorId: auth.currentUser?.uid,
            comment: comment || "",
            timestamp: new Date().toISOString()
         });

         await notificationService.notifyUser(department, {
            title: "بلاغ جديد موجه لقسمك",
            message: `تم توجيه بلاغ جديد رقم ${report.id} إلى قسم ${department}.`,
            type: "info"
         });

         if (report.userId && report.userId !== "anonymous") {
            await notificationService.notifyUser(report.userId, {
               title: "تم قبول البلاغ وتوجيهه",
               message: `تم قبول بلاغك رقم ${report.id} وتوجيهه إلى قسم ${department} للمعالجة.`,
               type: "success"
            });
         }

         setReports(prev => prev.filter(r => r.id !== report.id));
         toast.success(`تم القبول وتوجيه البلاغ إلى ${department}`);
      } catch (e) {
         console.error(e);
         toast.error('حدث خطأ أثناء التوجيه');
      } finally {
         setRoutingId(null);
      }
   };

   const handleAnalyze = async (report: Report) => {
      setAnalyzingId(report.id);
      try {
         const toastId = toast.loading("جاري تحليل البلاغ باستخدام AI...");

         const aiResult = await aiService.analyzeReport(report.description, report.imageUrl);

         if (!aiResult.success) {
            throw new Error(aiResult.error);
         }

         const reportRef = doc(db, 'reports', report.id);
         await updateDoc(reportRef, {
            aiAnalysis: {
               classification: aiResult.classification,
               priority: aiResult.priority,
               summary: aiResult.summary,
               detectedObjects: aiResult.detectedObjects
            },
            updatedAt: new Date().toISOString()
         });

         toast.success("اكتمل التحليل الذكي للبلاغ", { id: toastId });

         // If in preview, update it too
         if (previewReport && previewReport.id === report.id) {
            setPreviewReport(prev => prev ? {
               ...prev,
               aiAnalysis: aiResult
            } : null);
         }
      } catch (e: any) {
         toast.error(e.message || "حدث خطأ أثناء التحليل");
      } finally {
         setAnalyzingId(null);
      }
   };

   const handleReject = async (reportId: string) => {
      if (!rejectReason) {
         toast.error("يرجى اختيار سبب الرفض");
         return;
      }
      if (!rejectDetails && !rejectAudioBlob) {
         toast.error("يرجى كتابة تفاصيل سبب الرفض أو تسجيل مقطع صوتي");
         return;
      }

      try {
         const toastId = toast.loading("جاري رفض البلاغ...");

         let uploadedAudioUrl = "";
         if (rejectAudioBlob) {
            toast.loading("جاري رفع التسجيل الصوتي...", { id: toastId });
            const uploadRes = await reportApi.uploadAudio(rejectAudioBlob);
            if (uploadRes.success) {
               uploadedAudioUrl = uploadRes.audioUrl || "";
            }
         }

         const reportRef = doc(db, 'reports', reportId);
         const isMissingInfo = rejectReason === "معلومات ناقصة";

         await updateDoc(reportRef, {
            status: isMissingInfo ? 'needs_info' : 'rejected',
            rejectReason: rejectReason,
            rejectDetails: rejectDetails,
            rejectAudioUrl: uploadedAudioUrl,
            infoRequestedAt: isMissingInfo ? new Date().toISOString() : null,
            updatedAt: new Date().toISOString()
         });

         const report = reports.find(r => r.id === reportId);
         if (report && report.userId && report.userId !== "anonymous") {
            if (isMissingInfo) {
               await notificationService.notifyUser(report.userId, {
                  title: "مطلوب إضافة معلومات للبلاغ",
                  message: `يرجى تعديل البلاغ رقم ${reportId} وإضافة المعلومات المطلوبة خلال 48 ساعة لتفادي إغلاقه.`,
                  type: "warning"
               });
            } else {
               await notificationService.notifyUser(report.userId, {
                  title: "تم رفض البلاغ",
                  message: `نعتذر، تم رفض بلاغك رقم ${reportId}. السبب: ${rejectReason}. ${rejectDetails}`,
                  type: "error"
               });
            }
         }

         setReports(prev => prev.filter(r => r.id !== reportId));
         setRejectingId(null);
         setRejectReason("");
         setRejectDetails("");
         setRejectAudioBlob(null);
         toast.success(isMissingInfo ? "تم طلب معلومات إضافية من المواطن" : "تم رفض البلاغ", { id: toastId });
         handlePreviewReport(null);
      } catch (e) {
         console.error(e);
         toast.error("حدث خطأ أثناء الرفض");
      }
   };

   const getTimeAgo = (dateStr: string) => {
      const min = Math.round((Date.now() - new Date(dateStr).getTime()) / 60000);
      if (min === 0) return "الآن";
      if (min < 60) return `منذ ${min} دقيقة`;
      return `منذ ${Math.round(min / 60)} ساعة`;
   };

   const departments = ['النظافة والمخلفات', 'الطرق والجسور', 'شبكات المياه والصرف', 'الكهرباء والإنارة', 'البيئة والحدائق', 'الأمن والسلامة', 'الحالات الإنسانية'];

   const startRecordingReject = async () => {
      try {
         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
         const mediaRecorder = new MediaRecorder(stream);
         mediaRecorderRef.current = mediaRecorder;
         const chunks: BlobPart[] = [];
         mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
         mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: "audio/webm" });
            setRejectAudioBlob(blob);
            toast.success("تم حفظ التسجيل الصوتي للرفض");
         };
         mediaRecorder.start();
         setIsRecordingReject(true);
      } catch (err) {
         toast.error("يرجى إعطاء صلاحية الميكروفون");
      }
   };

   const stopRecordingReject = () => {
      if (mediaRecorderRef.current && isRecordingReject) {
         mediaRecorderRef.current.stop();
         setIsRecordingReject(false);
         mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
   };

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

            <div className="flex bg-white/50 p-1 rounded-2xl border border-indigo-100/50 self-start lg:self-center">
               <button
                  onClick={() => setActiveTab('new')}
                  className={cn(
                     "px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2",
                     activeTab === 'new' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-500 hover:bg-white hover:text-indigo-600"
                  )}
               >
                  <Inbox size={14} />
                  البلاغات الجديدة
               </button>
               <button
                  onClick={() => setActiveTab('processed')}
                  className={cn(
                     "px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2",
                     activeTab === 'processed' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-500 hover:bg-white hover:text-indigo-600"
                  )}
               >
                  <Clock size={14} />
                  قيد المعالجة (تتبع وتحويل)
               </button>
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
                           <Inbox className="text-indigo-600 w-5 h-5" />
                           {activeTab === 'new' ? 'الوارد الجديد' : 'البلاغات الجارية (إعادة التوجيه)'}
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
                                 layoutId={report.id}
                                 initial={{ opacity: 0, y: -10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 exit={{ opacity: 0, x: -50 }}
                                 onClick={() => handlePreviewReport(report)}
                                 className="p-6 hover:bg-indigo-50/30 transition-all group flex flex-col gap-3 cursor-pointer border-b border-slate-50 last:border-0 relative overflow-hidden"
                              >
                                 <div className="absolute top-0 left-0 w-1 pt-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />

                                 <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-3">
                                       {report.priority === 'critical' && (
                                          <span className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-[10px] font-black rounded-lg animate-pulse shadow-sm">
                                             <AlertCircle className="w-3 h-3" />
                                             عاجل جداً
                                          </span>
                                       )}
                                       <span className="text-indigo-700 bg-indigo-50 px-3 py-1 font-black text-[10px] rounded-lg tracking-wider border border-indigo-100 uppercase">
                                          ID: {report.id}
                                       </span>
                                    </div>
                                    <span className="text-slate-500 text-[10px] font-bold flex items-center gap-1">
                                       <Clock className="w-3 h-3" /> {getTimeAgo(report.createdAt)}
                                    </span>
                                 </div>

                                 <p className="text-sm font-black text-slate-800 leading-relaxed line-clamp-2">
                                    {report.description}
                                 </p>

                                 <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-4">
                                       {report.imageUrl && <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600"><Inbox size={14} /></div>}
                                       {report.audioUrl && <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600"><Headset size={14} /></div>}
                                       {report.location && <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600"><MapPin size={14} /></div>}
                                    </div>

                                    <div className="flex items-center gap-2">
                                       {report.aiAnalysis && (
                                          <span className="text-[9px] font-black bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md border border-emerald-100">تم التحليل بواسطة AI</span>
                                       )}
                                       <span className="text-[10px] font-black text-indigo-600 flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">
                                          فتح البلاغ <Forward size={12} className="rotate-180" />
                                       </span>
                                    </div>
                                 </div>
                              </motion.div>
                           )
                        })}
                     </AnimatePresence>
                  </div>
               </section>
            </div>

            {/* Shortcuts & Support */}
            <div className="lg:col-span-4 flex flex-col gap-6">
               <section className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden group">
                  <Sparkles className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                  <h4 className="text-xl font-black mb-4 flex items-center gap-2 border-b border-white/20 pb-4">
                     <ShieldCheck className="w-6 h-6" /> صلاحيات الاستقبال
                  </h4>
                  <ul className="text-xs leading-relaxed opacity-90 space-y-3 font-bold">
                     <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-300 mt-1.5 shrink-0" /> أنت أول نقطة اتصال مع بلاغات المواطنين.</li>
                     <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-300 mt-1.5 shrink-0" /> قم بتحويل البلاغ للإدارة المختصة للتنفيذ.</li>
                     <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-300 mt-1.5 shrink-0" /> البلاغات المرفوضة يجب أن تحتوي على مبرر واضح ورسالة إضافية.</li>
                     <li className="flex gap-2 text-indigo-200"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" /> (لا يمكنك تعديل البلاغات بعد توجيهها للقسم).</li>
                  </ul>
               </section>
            </div>
         </div>

         {/* Report Details Modal */}
         <AnimatePresence>
            {previewReport && (
               <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     onClick={() => handlePreviewReport(null)}
                     className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                  />
                  <motion.div
                     layoutId={previewReport.id}
                     className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                  >
                     <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                              <Bot size={24} />
                           </div>
                           <div>
                              <h3 className="text-xl font-black text-slate-900">تفاصيل البلاغ الوارد</h3>
                              <p className="text-[10px] font-black text-slate-400 tracking-wider">ID: {previewReport.id} • {getTimeAgo(previewReport.createdAt)}</p>
                           </div>
                        </div>
                        <button onClick={() => handlePreviewReport(null)} className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all">
                           <X size={20} />
                        </button>
                     </div>

                     <div className="flex-1 overflow-y-auto p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                           <div className="flex flex-col gap-6">
                              <div>
                                 <h4 className="text-xs font-black text-slate-400 uppercase mb-3 flex items-center gap-2">
                                    <Forward size={14} className="text-indigo-600" /> وصف البلاغ والمشكلة
                                 </h4>
                                 <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                    <p className="text-slate-800 font-bold leading-relaxed whitespace-pre-wrap">
                                       {previewReport.description}
                                    </p>
                                 </div>
                              </div>

                              {previewReport.audioUrl && (
                                 <div>
                                    <h4 className="text-xs font-black text-slate-400 uppercase mb-3 flex items-center gap-2">
                                       <Headset size={14} className="text-indigo-600" /> التسجيل الصوتي المرفق
                                    </h4>
                                    <div className="bg-indigo-50/50 p-4 rounded-3xl border border-indigo-100">
                                       <audio controls className="w-full h-10" src={previewReport.audioUrl}>
                                          متصفحك لا يدعم تشغيل الصوت
                                       </audio>
                                    </div>
                                 </div>
                              )}

                              {previewReport.aiAnalysis ? (
                                 <div className="bg-indigo-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-indigo-600/20">
                                    <Sparkles className="absolute -top-4 -left-4 w-24 h-24 opacity-10 rotate-12" />
                                    <h4 className="text-sm font-black mb-4 flex items-center gap-2 border-b border-white/20 pb-3">
                                       <Bot size={18} /> تحليل الذكاء الاصطناعي (Gemini Vision)
                                    </h4>
                                    <div className="space-y-4">
                                       <div className="flex items-center justify-between bg-white/10 p-3 rounded-xl border border-white/10">
                                          <span className="text-[10px] font-black opacity-80 uppercase">الجهة المقترحة</span>
                                          <span className="text-xs font-black">{previewReport.aiAnalysis.classification}</span>
                                       </div>
                                       <div className="flex items-center justify-between bg-white/10 p-3 rounded-xl border border-white/10">
                                          <span className="text-[10px] font-black opacity-80 uppercase">الأولوية</span>
                                          <span className={cn("text-xs font-black px-2 py-0.5 rounded-md", previewReport.aiAnalysis.priority === 'critical' ? 'bg-red-500' : 'bg-amber-500')}>
                                             {previewReport.aiAnalysis.priority === 'critical' ? 'عاجل جداً' : previewReport.aiAnalysis.priority === 'high' ? 'عالية' : 'متوسطة'}
                                          </span>
                                       </div>
                                       <p className="text-xs font-bold leading-relaxed bg-white/5 p-4 rounded-2xl">
                                          {previewReport.aiAnalysis.summary}
                                       </p>
                                    </div>
                                 </div>
                              ) : (
                                 <button
                                    onClick={() => handleAnalyze(previewReport)}
                                    disabled={analyzingId === previewReport.id}
                                    className="w-full py-5 bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-3xl text-indigo-600 font-black text-sm flex items-center justify-center gap-3 hover:bg-indigo-100 transition-all disabled:opacity-50"
                                 >
                                    {analyzingId === previewReport.id ? <Loader2 size={24} className="animate-spin" /> : <Bot size={24} />}
                                    تحليل البلاغ واستخراج التوصيات بالذكاء الاصطناعي
                                 </button>
                              )}
                           </div>

                           <div className="flex flex-col gap-6">
                              {previewReport.imageUrl && (
                                 <div>
                                    <h4 className="text-xs font-black text-slate-400 uppercase mb-3 flex items-center gap-2">
                                       <Forward size={14} className="text-indigo-600" /> الصورة المرفقة
                                    </h4>
                                    <div className="rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl relative group aspect-video">
                                       <img src={previewReport.imageUrl} alt="البلاغ" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                       <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                          <a href={previewReport.imageUrl} target="_blank" rel="noreferrer" className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-black text-xs">فتح الصورة بالحجم الكامل</a>
                                       </div>
                                    </div>
                                 </div>
                              )}

                              {previewReport.location && (
                                 <div>
                                    <h4 className="text-xs font-black text-slate-400 uppercase mb-3 flex items-center gap-2">
                                       <MapPin size={14} className="text-indigo-600" /> موقع البلاغ الجغرافي
                                    </h4>
                                    <div className="h-[300px] rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-inner">
                                       <OperatorMapView
                                          center={previewReport.location as [number, number]}
                                          points={[{
                                             lat: (previewReport.location as [number, number])[0],
                                             lng: (previewReport.location as [number, number])[1],
                                             label: previewReport.id.slice(0, 8),
                                             intensity: previewReport.priority === 'critical' ? 1 : 0.5,
                                             type: previewReport.priority === 'critical' ? 'emergency' : 'normal',
                                             time: getTimeAgo(previewReport.createdAt)
                                          }]}
                                       />
                                    </div>
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>

                     <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
                        <div className="flex gap-3">
                           {rejectingId === previewReport.id ? (
                              <div className="flex items-center gap-3 animate-in slide-in-from-right-4">
                                 <select
                                    value={rejectReason}
                                    onChange={e => setRejectReason(e.target.value)}
                                    className="p-3 bg-white border border-red-100 text-xs font-black rounded-xl text-red-600 outline-none"
                                 >
                                    <option value="">-- اختر سبب الرفض --</option>
                                    <option value="بلاغ مكرر">بلاغ مكرر</option>
                                    <option value="معلومات ناقصة">معلومات ناقصة</option>
                                    <option value="خارج الاختصاص">خارج الاختصاص</option>
                                 </select>
                                 <div className="relative flex-1 min-w-[250px]">
                                    <input
                                       placeholder="اكتب التوضيح للمواطن (إلزامي)..."
                                       value={rejectDetails}
                                       onChange={e => setRejectDetails(e.target.value)}
                                       className={cn(
                                          "p-3 bg-white border text-xs font-bold rounded-xl w-full pr-10",
                                          !rejectDetails && rejectingId ? "border-red-200" : "border-slate-200"
                                       )}
                                    />
                                    <AlertCircle size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400" />
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <button
                                       onClick={isRecordingReject ? stopRecordingReject : startRecordingReject}
                                       className={cn(
                                          "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                          isRecordingReject ? "bg-red-500 text-white animate-pulse" :
                                             rejectAudioBlob ? "bg-emerald-100 text-emerald-600 border border-emerald-200" : "bg-white border border-slate-200 text-slate-400"
                                       )}
                                       title="تسجيل رد صوتي"
                                    >
                                       {isRecordingReject ? <Square size={16} /> : <Mic size={16} />}
                                    </button>
                                    {rejectAudioBlob && (
                                       <button onClick={() => setRejectAudioBlob(null)} className="text-[10px] font-black text-red-500 underline">حذف الصوت</button>
                                    )}
                                 </div>
                                 <button
                                    onClick={() => handleReject(previewReport.id)}
                                    className="px-6 py-3 bg-red-600 text-white rounded-xl font-black text-xs shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all flex items-center gap-2"
                                 >
                                    <XCircle size={14} />
                                    تأكيد الرفض النهائي
                                 </button>
                                 <button onClick={() => setRejectingId(null)} className="p-3 text-slate-400"><X size={20} /></button>
                              </div>
                           ) : (
                              <div className="flex flex-wrap gap-4 items-center">
                                 <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mr-2">توجيه إلى جهة:</label>
                                    <select
                                       id="dept_selector"
                                       defaultValue={previewReport.aiAnalysis?.classification || 'النظافة والمخلفات'}
                                       className="p-3 bg-white border border-slate-200 text-xs font-black rounded-xl outline-none min-w-[180px]"
                                    >
                                       {departments.map(d => (
                                          <option key={d} value={d}>{d}</option>
                                       ))}
                                    </select>
                                 </div>
                                 <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mr-2">ملاحظات التحويل (اختياري):</label>
                                    <input
                                       type="text"
                                       placeholder="اكتب سبب التحويل أو ملاحظات للمنفذ..."
                                       value={routeComment}
                                       onChange={(e) => setRouteComment(e.target.value)}
                                       className="p-3 bg-white border border-slate-200 text-xs font-bold rounded-xl outline-none"
                                    />
                                 </div>
                                 <div className="flex gap-4 self-end">
                                    <button
                                       onClick={() => {
                                          const selector = document.getElementById('dept_selector') as HTMLSelectElement;
                                          handleRoute(previewReport!, selector.value, routeComment);
                                          setPreviewReport(null);
                                          setRouteComment("");
                                       }}
                                       disabled={routingId === previewReport.id}
                                       className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-3"
                                    >
                                       {routingId === previewReport.id ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle2 size={20} />}
                                       {previewReport.status === 'in_progress' ? 'تحديث وتغيير الجهة' : 'قبول وتوجيه البلاغ'}
                                    </button>

                                    <button
                                       onClick={() => setRejectingId(previewReport!.id)}
                                       className="px-8 py-4 bg-white border border-red-100 text-red-500 rounded-2xl font-black text-sm hover:bg-red-50 transition-all"
                                    >
                                       رفض البلاغ
                                    </button>
                                 </div>
                              </div>
                           )}
                        </div>

                        <div className="flex items-center gap-4">
                           <div className="text-left">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">المواطن صاحب البلاغ</p>
                              <p className="text-sm font-black text-slate-900">{previewReport.userId === 'anonymous' ? 'مواطن مجهول (Anonymous)' : 'مواطن مسجل (Verified)'}</p>
                           </div>
                           <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                              <Inbox size={24} />
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>

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
                        <OperatorMapView
                           center={selectedMapLocation}
                           points={[{
                              lat: selectedMapLocation[0],
                              lng: selectedMapLocation[1],
                              intensity: 0.8,
                              label: "موقع المخالفة",
                              type: 'normal'
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

