import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, Activity, Clock, CheckCircle2, RotateCw } from "lucide-react";
import * as motion from "motion/react-client";
import { cn } from "../../core/utils/cn";

interface ReportStatus {
  trackingNo: string;
  status: string;
  createdAt: string;
}

export function TrackReport() {
  const [trackingNo, setTrackingNo] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [report, setReport] = useState<ReportStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNo.trim()) return;

    setIsSearching(true);
    setError(null);
    try {
      // Simulate API lag
      await new Promise(r => setTimeout(r, 800));
      const res = await fetch(`/api/domain/report/track/${trackingNo}`);
      if (res.ok) {
        const data = await res.json();
        setReport(data);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "قيد المراجعة":
        return <RotateCw className="w-6 h-6 text-amber-500 animate-spin-slow" />;
      case "مكتمل":
        return <CheckCircle2 className="w-6 h-6 text-emerald-500" />;
      default:
        return <Clock className="w-6 h-6 text-slate-400" />;
    }
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

            <div className="flex items-center gap-4 p-4 rounded-xl relative overflow-hidden bg-white border border-slate-100 shadow-sm">
              <div className="absolute inset-0 bg-amber-50/50"></div>
              <div className="relative z-10 w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                {getStatusIcon(report.status)}
              </div>
              <div className="relative z-10">
                <span className="block text-sm text-slate-500 mb-1">الحالة الحالية</span>
                <span className={cn(
                  "font-bold text-lg",
                  report.status === "مكتمل" ? "text-emerald-600" : "text-amber-600"
                )}>
                  {report.status}
                </span>
              </div>
            </div>

            {/* Timeline Placeholder */}
            <div className="mt-8 border-r-2 border-slate-200 mr-6 pr-6 space-y-6 relative">
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
