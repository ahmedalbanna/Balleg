import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mic, Camera, Search, ArrowLeft, Loader2 } from "lucide-react";
import * as motion from "motion/react-client";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../core/services/firebase";
import { Report } from "../../core/services/reportApi";

export function ReportHome() {
  const [recentReports, setRecentReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'), limit(3));
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Report));
        setRecentReports(docs);
      } catch (err) {
        console.error("Error fetching recent reports", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, []);

  const getStatusText = (status: string) => {
    const map: Record<string, string> = {
      'pending_verification': 'قيد المراجعة',
      'pending_operator': 'قيد المراجعة',
      'pending_official': 'تم التوجيه',
      'in_progress': 'جاري العمل',
      'resolved': 'تم الحل',
      'resolved_pending_rating': 'تم الحل'
    };
    return map[status] || status;
  };

  const getStatusColors = (status: string) => {
    if (status.includes('resolved')) return 'bg-green-100 text-green-700';
    if (status.includes('in_progress')) return 'bg-blue-100 text-blue-700';
    return 'bg-amber-100 text-amber-700';
  };

  const getProgressWidth = (status: string) => {
    if (status.includes('resolved')) return 'w-full bg-green-500';
    if (status.includes('in_progress')) return 'w-2/3 bg-blue-500';
    if (status.includes('official')) return 'w-1/2 bg-amber-500';
    return 'w-1/3 bg-amber-400';
  };

  const getTimeAgo = (dateStr: string) => {
    if (!dateStr || typeof dateStr !== 'string') return "الآن";
    const min = Math.round((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (isNaN(min)) return "الآن";
    if (min === 0) return "الآن";
    if (min < 60) return `منذ ${min} دقيقة`;
    if (min < 1440) return `منذ ${Math.round(min/60)} ساعة`;
    return `منذ ${Math.round(min/1440)} يوم`;
  };

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10">
      <section className="text-center space-y-2 mb-2">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-readex"
        >
          صوتك مسموع.. وخدمتك واجبنا
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          ساهم في تحسين مدينتك بلمسة واحدة. التقط صورة أو سجل صوتك لنصل للمشكلة.
        </motion.p>
      </section>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12"
      >
        <Link 
          to="/new" 
          className="relative bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all cursor-pointer flex flex-col items-center justify-center gap-8 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(59,130,246,0.1)] group-hover:scale-110 transition-transform relative z-10">
            <Camera className="h-10 w-10 text-blue-600" />
          </div>
          <div className="text-center relative z-10">
            <h3 className="text-2xl font-black text-slate-800 mb-2">التقط صورة للبلاغ</h3>
            <p className="text-slate-400 font-medium">كاميرا فورية للتوثيق المباشر</p>
          </div>
        </Link>

        <Link 
          to="/new" 
          className="relative bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all cursor-pointer flex flex-col items-center justify-center gap-8 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(239,68,68,0.1)] group-hover:scale-110 transition-transform relative z-10">
            <Mic className="h-10 w-10 text-red-500" />
          </div>
          <div className="text-center relative z-10">
            <h3 className="text-2xl font-black text-slate-800 mb-2">سجل بلاغاً صوتياً</h3>
            <p className="text-slate-400 font-medium">تكلم بلهجتك، نحن نفهمك ونحلها</p>
          </div>
        </Link>
      </motion.div>

      <section className="flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black flex items-center gap-3 text-slate-800">
            <div className="w-1.5 h-10 bg-blue-600 rounded-full"></div>
            آخر البلاغات النشطة
          </h3>
          <Link to="/track" className="text-blue-600 text-sm font-black hover:bg-black/5 px-4 py-2 rounded-xl transition-colors">عرض الكل ←</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1">
          {loading ? (
             <div className="col-span-3 flex justify-center py-10 opacity-50"><Loader2 className="animate-spin text-blue-600" /></div>
          ) : recentReports.length === 0 ? (
             <div className="col-span-3 text-center text-slate-400 py-10 font-bold">لا توجد بلاغات نشطة حالياً.</div>
          ) : recentReports.map((report) => (
             <div key={report.id} className="bg-white/80 backdrop-blur-sm p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
               <div className="flex justify-between items-start mb-4">
                 <span className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase ${getStatusColors(report.status)}`}>{getStatusText(report.status)}</span>
                 <span className="text-[10px] text-slate-400 font-bold">{getTimeAgo(report.createdAt)}</span>
               </div>
               <p className="text-sm font-bold mb-1 line-clamp-2 text-slate-800">{report.description}</p>
               <p className="text-xs text-slate-500 mb-3">بلاغ {report.type} #{report.id}</p>
               <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                 <div className={`h-full ${getProgressWidth(report.status)}`}></div>
               </div>
             </div>
          ))}
        </div>
      </section>
    </div>
  );
}
