import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, Activity, Clock, CheckCircle2, RotateCw, Star, MessageSquareCode, Send, Loader2, MapPin } from "lucide-react";
import * as motion from "motion/react-client";
import { cn } from "../../core/utils/cn";
import { reportApi } from "../../core/services/reportApi";

export function TrackReport() {
  const [trackingNo, setTrackingNo] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Feedback states
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNo.trim()) return;

    setIsSearching(true);
    setError(null);
    setFeedbackSuccess(false);
    try {
      const res = await reportApi.trackReport(trackingNo);
      if (res.report) {
        setReport(res.report);
      } else {
        setError("لم يتم العثور على بلاغ بهذا الرقم. يرجى التأكد والمحاولة مرة أخرى.");
        setReport(null);
      }
    } catch (err) {
      setError("حدث خطأ أثناء البحث. يرجى المحاولة لاحقاً.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmitFeedback = async () => {
    if (rating === 0) return;
    setSubmittingFeedback(true);
    try {
      await reportApi.submitFeedback(report.id, { rating, feedback: feedbackText });
      setFeedbackSuccess(true);
      setReport({ ...report, rating, feedback: feedbackText });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending_operator":
      case "pending_official":
        return <RotateCw className="w-6 h-6 text-amber-500 animate-spin-slow" />;
      case "resolved":
        return <CheckCircle2 className="w-6 h-6 text-emerald-500" />;
      case "in_progress":
        return <Activity className="w-6 h-6 text-blue-500 animate-pulse" />;
      default:
        return <Clock className="w-6 h-6 text-slate-400" />;
    }
  };

  const getStatusText = (status: string) => {
    const map: Record<string, string> = {
      'pending_operator': 'قيد المراجعة الأولية',
      'pending_official': 'تم التوجيه للقسم المختص',
      'in_progress': 'جاري المعالجة الميدانية',
      'resolved': 'تم الإنجاز بنجاح'
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
          <h2 className="text-2xl font-bold font-readex text-slate-900 mb-2">متابعة حالة البلاغ</h2>
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
              <span className="text-slate-500 text-sm">البلاغ <span className="font-mono text-slate-900 font-bold">{report.trackingNo}</span></span>
              <span className="text-slate-400 text-sm dir-ltr">{new Date(report.createdAt).toLocaleDateString('ar-SA')}</span>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl relative overflow-hidden bg-white border border-slate-100 shadow-sm transition-all hover:border-slate-300">
               <div className={cn(
                 "absolute inset-0 opacity-10",
                 report.status === "resolved" ? "bg-emerald-500" : "bg-amber-500"
               )}></div>
              <div className="relative z-10 w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                {getStatusIcon(report.status)}
              </div>
              <div className="relative z-10">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">الحالة الحالية</span>
                <span className={cn(
                  "font-black text-lg",
                  report.status === "resolved" ? "text-emerald-600" : "text-amber-600"
                )}>
                  {getStatusText(report.status)}
                </span>
              </div>
            </div>

            {/* Citizen Feedback Section */}
            {report.status === 'resolved' && !report.rating && !feedbackSuccess && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 p-6 bg-blue-50/50 rounded-3xl border border-blue-100 shadow-inner"
                >
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                            <Star className="w-5 h-5 fill-current" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-slate-900">كيف كانت جودة الحل؟</h4>
                            <p className="text-[10px] text-slate-500 font-bold">تقييمك يساعدنا على تطوير الأداء الحكومي.</p>
                        </div>
                    </div>

                    <div className="flex justify-center gap-2 mb-6">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <button
                                key={s}
                                onMouseEnter={() => setHoverRating(s)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(s)}
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
                            placeholder="هل لديك أي ملاحظات تطويرية؟ (اختياري)"
                            className="w-full bg-white border border-blue-100 rounded-2xl py-3 pr-10 pl-4 text-xs font-bold focus:ring-4 focus:ring-blue-500/10 outline-none min-h-[90px] resize-none"
                        />
                    </div>

                    <button
                        onClick={handleSubmitFeedback}
                        disabled={rating === 0 || submittingFeedback}
                        className="w-full py-4 bg-blue-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                    >
                        {submittingFeedback ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send size={14} />}
                        إرسال التقييم النهائي
                    </button>
                </motion.div>
            )}

            {(report.rating || feedbackSuccess) && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100 text-center shadow-inner"
                >
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <h4 className="text-lg font-black text-emerald-900 mb-1">شكراً لمساهمتك</h4>
                    <p className="text-xs text-emerald-700 font-bold opacity-80">تم استلام تقييمك بنجاح، ملاحظاتك ستؤخذ بعين الاعتبار.</p>
                </motion.div>
            )}

            <div className="mt-8 border-r-2 border-slate-200 mr-6 pr-6 space-y-8 relative">
              <div className="relative">
                <div className="absolute -right-[31px] w-4 h-4 rounded-full bg-amber-500 border-4 border-[#F8FAFC]"></div>
                <h4 className="text-slate-900 font-bold">استلام البلاغ</h4>
                <p className="text-sm text-slate-500 mt-1">تم إدخال البلاغ للنظام بنجاح</p>
              </div>
              <div className="relative opacity-80">
                <div className="absolute -right-[31px] w-4 h-4 rounded-full bg-slate-200 border-4 border-[#F8FAFC]"></div>
                <h4 className="text-slate-700 font-bold">قيد الإجراء</h4>
                <p className="text-sm text-slate-500 mt-1">يتم الآن اتخاذ الإجراءات اللازمة</p>
              </div>
              <div className="relative opacity-50">
                <div className="absolute -right-[31px] w-4 h-4 rounded-full bg-slate-200 border-4 border-[#F8FAFC]"></div>
                <h4 className="text-slate-700 font-bold">اكتمل</h4>
                <p className="text-sm text-slate-500 mt-1">تم حل المشكلة وإغلاق البلاغ</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
