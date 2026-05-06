import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FileText, Clock, CheckCircle2, AlertCircle, 
  ChevronLeft, Star, MessageSquare, MapPin, Search 
} from "lucide-react";
import * as motion from "motion/react-client";
import { cn } from "../../core/utils/cn";
import { reportApi, Report } from "../../core/services/reportApi";
import { auth } from "../../core/services/firebase";

export function MyReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');

  useEffect(() => {
    const fetchMyReports = async () => {
      try {
        const userId = auth.currentUser?.uid || "anonymous";
        const res = await reportApi.getMyReports(userId);
        setReports(res.reports || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyReports();
  }, []);

  const filteredReports = reports.filter(r => {
    if (filter === 'active') return r.status !== 'resolved';
    if (filter === 'resolved') return r.status === 'resolved';
    return true;
  });

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'resolved': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'in_progress': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'pending_operator': 
      case 'pending_official': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const getStatusText = (status: string) => {
    const map: Record<string, string> = {
      'pending_operator': 'قيد المراجعة',
      'pending_official': 'تم التوجيه للقسم',
      'in_progress': 'جاري العمل',
      'resolved': 'تم الإنجاز'
    };
    return map[status] || status;
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
            <FileText size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">بلاغاتي المرفوعة</h1>
            <p className="text-sm font-bold text-slate-500">تابع حالة بلاغاتك وتقاريرك المرسلة للجهات المختصة</p>
          </div>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {(['all', 'active', 'resolved'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 text-xs font-black rounded-lg transition-all",
                filter === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              {f === 'all' ? 'الكل' : f === 'active' ? 'النشطة' : 'المكتملة'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-bold text-slate-500">جاري جلب بياناتك...</p>
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
          <Search className="w-16 h-16 mx-auto mb-6 text-slate-300" />
          <h3 className="text-xl font-black text-slate-900 mb-2">لا توجد بلاغات مرسلة</h3>
          <p className="text-sm font-bold text-slate-500 mb-8 px-10">يبدو أنك لم تقم بإرسال أي بلاغات بعد أو لا توجد نتائج مطابقة لفلترك الحالي.</p>
          <Link to="/report/new" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black transition-transform hover:scale-105 inline-block">
            إرسال بلاغ جديد الآن
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReports.map((report) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={report.id}
              className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all p-6 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn(
                  "px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider",
                  getStatusStyle(report.status)
                )}>
                  {getStatusText(report.status)}
                </div>
                <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
                  ID: {report.id}
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900 mb-3 line-clamp-2 leading-relaxed">
                {report.description}
              </h3>

              <div className="space-y-3 mb-6">
                 <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                  <Clock size={14} className="text-slate-400" />
                  <span>{new Date(report.createdAt).toLocaleDateString('ar-SA')}</span>
                </div>
                {report.department && (
                  <div className="flex items-center gap-2 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg w-fit">
                    <AlertCircle size={14} />
                    <span>جهة الاختصاص: {report.department}</span>
                  </div>
                )}
              </div>

              <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
                {report.status === 'resolved' ? (
                  <div className="flex items-center gap-1">
                    {report.rating ? (
                       <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} size={14} className={cn("fill-current", s <= (report.rating || 0) ? "text-amber-500" : "text-slate-200")} />
                          ))}
                       </div>
                    ) : (
                      <Link 
                        to={`/report/track?no=${report.id}`}
                        className="text-xs font-black text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Star size={14} /> قيم الخدمة الآن
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                    <Activity size={14} className="text-blue-500 animate-pulse" />
                    تحت المعالجة
                  </div>
                )}

                <Link 
                  to={`/report/track?no=${report.id}`}
                  className="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all group-hover:scale-110"
                >
                  <ChevronLeft size={20} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

const Activity = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
