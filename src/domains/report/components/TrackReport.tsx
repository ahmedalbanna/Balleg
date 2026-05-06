import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, Activity, Clock, CheckCircle2, RotateCw, Star, MessageSquareCode, Send, Loader2, MapPin, SearchX, UploadCloud, FileWarning } from "lucide-react";
import * as motion from "motion/react-client";
import { cn } from "../../core/utils/cn";
import { reportApi } from "../../core/services/reportApi";
import { db, handleFirestoreError, OperationType } from "../../core/services/firebase";
import { doc, onSnapshot, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import { Report } from "../../core/services/reportApi";

export function TrackReport() {
  const [trackingNo, setTrackingNo] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Feedback states
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Re-open trigger
  const [showReopenPrompt, setShowReopenPrompt] = useState(false);

  // Subscribe to live report data
  useEffect(() => {
    let unsubscribe: () => void;
    
    if (report?.id) {
       unsubscribe = onSnapshot(doc(db, 'reports', report.id), (docSnap) => {
         if (docSnap.exists()) {
            setReport({ id: docSnap.id, ...docSnap.data() } as Report);
         }
       }, (err) => handleFirestoreError(err, OperationType.GET, 'reports'));
    }

    return () => {
       if (unsubscribe) unsubscribe();
    };
  }, [report?.id]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNo.trim()) return;

    setIsSearching(true);
    setError(null);
    setFeedbackSuccess(false);
    setReport(null);
    try {
      const docRef = doc(db, 'reports', trackingNo.trim());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setReport({ id: docSnap.id, ...docSnap.data() } as Report);
      } else {
        setError("لم يتم العثور على بلاغ بهذا الرقم. يرجى التأكد والمحاولة مرة أخرى.");
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, 'reports');
      setError("حدث خطأ أثناء البحث. يرجى المحاولة لاحقاً.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleRatingSelect = (s: number) => {
     setRating(s);
     if (s <= 2) {
        setShowReopenPrompt(true);
     } else {
        setShowReopenPrompt(false);
     }
  };

  const handleSubmitFeedback = async (isReopen: boolean = false) => {
    if (rating === 0) return;
    setSubmittingFeedback(true);
    try {
      const payload: any = { 
        rating, 
        feedback: feedbackText,
        updatedAt: serverTimestamp()
      };
      
      if (isReopen) {
         payload.status = 'pending_operator';
         payload.reroutedReason = 'رفض المواطن لجودة المعالجة - إعادة فتح';
         toast.info("تم إعادة فتح البلاغ وتقييم الحالة.");
      } else {
         payload.status = 'resolved';
         toast.success("تم إغلاق البلاغ بنجاح، شكراً لتقييمك.");
      }

      await updateDoc(doc(db, 'reports', report!.id), payload);
      setFeedbackSuccess(true);
      setShowReopenPrompt(false);
    } catch (err) {
      console.error(err);
      toast.error("عذراً، حدث خطأ أثناء إرسال التقييم.");
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending_operator":
      case "pending_official":
        return <RotateCw className="w-6 h-6 text-amber-500 animate-spin-slow" />;
      case "resolved_pending_rating":
        return <Star className="w-6 h-6 text-blue-500 animate-bounce" />;
      case "resolved":
      case "تم الإنجاز":
        return <CheckCircle2 className="w-6 h-6 text-emerald-500" />;
      case "in_progress":
      case "قيد التنفيذ - الفني في الموقع":
      case "تم التكليف - جاري الجدولة":
      case "الفريق في الطريق للموقع":
      case "جاري العمل والترميم":
        return <Activity className="w-6 h-6 text-indigo-500 animate-pulse" />;
      case "assigned":
        return <CheckCircle2 className="w-6 h-6 text-emerald-500" />;
      case "rejected":
        return <FileWarning className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-slate-400" />;
    }
  };

  const getStatusText = (status: string) => {
    const map: Record<string, string> = {
      'pending_operator': 'قيد المراجعة الأولية',
      'pending_official': 'تم التوجيه للقسم المختص',
      'in_progress': 'جاري المعالجة الميدانية',
      'resolved_pending_rating': 'تم الإنجاز - بانتظار تقييمك',
      'resolved': 'مُغلق (مكتمل)',
      'rejected': 'تم رفض البلاغ',
      'assigned': 'تم التعاقد مع فني',
      'قيد التنفيذ - الفني في الموقع': 'قيد التنفيذ - الفني في الموقع',
      'تم الإنجاز': 'مُغلق (مكتمل)'
    };
    return map[status] || status;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-8 transition-colors">
        <ChevronRight className="w-4 h-4 mr-1" />
        العودة للرئيسية
      </Link>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-readex text-slate-900 mb-2">متابعة حالة البلاغ (لحظياً)</h2>
          <p className="text-slate-500">أدخل رقم المتابعة الذي حصلت عليه عند تقديم البلاغ.</p>
        </div>

        <form onSubmit={handleSearch} className="relative mb-8">
          <input 
            type="text" 
            placeholder="مثال: BLG-123456"
            value={trackingNo}
            onChange={(e) => setTrackingNo(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-6 py-4 text-slate-900 text-lg font-mono focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-left placeholder:text-right shadow-inner"
            dir="ltr"
          />
          <button 
            type="submit"
            disabled={isSearching || !trackingNo.trim()}
            className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            {isSearching ? "جاري البحث..." : "بحث"}
          </button>
        </form>

        {error && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center font-medium">
            {error}
          </motion.div>
        )}

        {report && (
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-500 text-sm">البلاغ <span className="font-mono text-slate-900 font-bold">{report.id}</span></span>
              <span className="text-slate-400 text-sm dir-ltr">{new Date(report.createdAt).toLocaleDateString('ar-SA')}</span>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl relative overflow-hidden bg-white border border-slate-100 shadow-sm transition-all hover:border-slate-300 mb-6">
               <div className={cn(
                 "absolute inset-0 opacity-10",
                 report.status === "resolved" ? "bg-emerald-500" : 
                 report.status === "resolved_pending_rating" ? "bg-blue-500" :
                 report.status === "rejected" ? "bg-red-500" : "bg-amber-500"
               )}></div>
              <div className="relative z-10 w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                {getStatusIcon(report.status)}
              </div>
              <div className="relative z-10">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">الحالة الحالية</span>
                <span className={cn(
                  "font-black text-lg",
                  report.status === "resolved" ? "text-emerald-600" : 
                  report.status === "resolved_pending_rating" ? "text-blue-600" :
                  report.status === "rejected" ? "text-red-600" : "text-amber-600"
                )}>
                  {getStatusText(report.status)}
                </span>
                {report.department && (
                  <span className="text-xs text-slate-500 block mt-1 font-bold">جهة التنفيذ: {report.department}</span>
                )}
              </div>
            </div>

            {report.status === 'rejected' && (
               <div className="bg-red-50 p-4 rounded-2xl border border-red-100 mb-6">
                 <h4 className="font-black text-red-800 text-sm mb-2 text-red-700">{report.rejectReason}</h4>
                 <p className="text-xs text-red-600 font-bold">{report.rejectDetails}</p>
               </div>
            )}

            {(report.status === 'resolved_pending_rating' || report.status === 'resolved') && report.resolutionImageUrl && (
                <div className="mb-6 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                   <div className="bg-slate-50 px-4 py-2 rounded-t-xl border-b border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-black text-slate-700">صورة توثيق المعالجة (بعد)</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                   </div>
                   <img src={report.resolutionImageUrl} alt="بعد المعالجة" className="w-full h-48 object-cover rounded-b-xl" />
                </div>
            )}

            {/* Citizen Feedback Section */}
            {(report.status === 'resolved_pending_rating' || report.status === 'تم الإنجاز') && !feedbackSuccess && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-6 bg-blue-50/50 rounded-3xl border border-blue-100 shadow-inner"
                >
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                            <Star className="w-5 h-5 fill-current" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-slate-900">حدثنا عن رأيك في الإنجاز المرفق</h4>
                            <p className="text-[10px] text-slate-500 font-bold">بموجب الموثوقية العالية، يمكنك إعادة فتح البلاغ إذا كان الإنجاز غير مرضٍ.</p>
                        </div>
                    </div>

                    <div className="flex justify-center gap-2 mb-6">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <button
                                key={s}
                                onMouseEnter={() => setHoverRating(s)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => handleRatingSelect(s)}
                                className="transition-all hover:scale-125"
                            >
                                <Star 
                                    className={cn(
                                        "w-10 h-10 transition-colors",
                                        (hoverRating || rating) >= s ? "fill-amber-400 text-amber-400" : "text-slate-300"
                                    )} 
                                />
                            </button>
                        ))}
                    </div>

                    <div className="relative mb-4">
                        <MessageSquareCode className="absolute right-4 top-3 text-slate-400 w-4 h-4" />
                        <textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder="سبب التقييم (اختياري)..."
                            className="w-full bg-white border border-blue-100 rounded-2xl py-3 pr-10 pl-4 text-xs font-bold focus:ring-4 focus:ring-blue-500/10 outline-none min-h-[90px] resize-none"
                        />
                    </div>

                    {showReopenPrompt ? (
                       <div className="flex flex-col gap-2">
                          <p className="text-xs font-black text-red-600 mb-2 text-center">التقييم المنخفض يشير إلى عدم رضاك. هل ترغب في إعادة فتح البلاغ لإعادة النظر؟</p>
                          <div className="flex gap-2">
                             <button
                                 onClick={() => handleSubmitFeedback(true)}
                                 disabled={submittingFeedback}
                                 className="flex-1 py-3 bg-red-600 text-white rounded-xl text-xs font-black shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                             >
                                 {submittingFeedback ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCw size={14} />}
                                 نعم، إعادة فتح البلاغ
                             </button>
                             <button
                                 onClick={() => handleSubmitFeedback(false)}
                                 disabled={submittingFeedback}
                                 className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-xl text-xs font-black hover:bg-slate-300 transition-all flex items-center justify-center gap-2"
                             >
                                 لا، إغلاقه بالتقييم الحالي
                             </button>
                          </div>
                       </div>
                    ) : (
                       <button
                           onClick={() => handleSubmitFeedback(false)}
                           disabled={rating === 0 || submittingFeedback}
                           className="w-full py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                       >
                           {submittingFeedback ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send size={14} />}
                           اعتماد الإنجاز وإغلاق البلاغ
                       </button>
                    )}
                </motion.div>
            )}

            {(report.status === 'resolved' || feedbackSuccess) && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100 text-center shadow-inner"
                >
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <h4 className="text-lg font-black text-emerald-900 mb-1">شكراً لمساهمتك</h4>
                    <p className="text-xs text-emerald-700 font-bold opacity-80">تم إغلاق البلاغ بنجاح، ملاحظاتك ستؤخذ بعين الاعتبار لتحسين خدماتنا.</p>
                </motion.div>
            )}

            {/* Handyman Bids Section for Private Services */}
            {report.isPrivateService && report.bids && report.bids.length > 0 && !report.assignedTo && (
                <div className="mt-8 bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100">
                    <h4 className="font-bold text-slate-900 text-sm mb-4">عروض الفنيين المتاحة</h4>
                    <div className="space-y-4">
                        {report.bids.map((bid, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm flex items-center justify-between">
                                <div>
                                    <p className="font-black text-slate-900 text-sm">{bid.handymanName}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="text-[10px] bg-slate-50 text-slate-600 px-2 py-1 rounded-md border border-slate-100">السعر التقريبي: {bid.price}</span>
                                        <span className="text-[10px] bg-slate-50 text-slate-600 px-2 py-1 rounded-md border border-slate-100">الوقت المتوقع: {bid.timeEstimate}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={async () => {
                                        try {
                                            await updateDoc(doc(db, 'reports', report.id), {
                                                assignedTo: bid.handymanId,
                                                status: 'assigned',
                                                updatedAt: serverTimestamp()
                                            });
                                            toast.success("تم اختيار الفني بنجاح!");
                                        } catch (e) {
                                            toast.error("حدث خطأ أثناء الموافقة.");
                                        }
                                    }}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-600/20 transition-all"
                                >
                                    قبول العرض
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {report.isPrivateService && report.assignedTo && (
                <div className="mt-8 bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 text-center">
                    <h4 className="font-bold text-slate-900 text-sm mb-2">تم الاتفاق مع الفني</h4>
                    <p className="text-xs text-slate-600">الفني حالياً يعمل على إنجاز طلبك.</p>
                </div>
            )}

          </motion.div>
        )}
      </div>
    </div>
  );
}
