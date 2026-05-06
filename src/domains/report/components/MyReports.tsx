import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FileText, Clock, CheckCircle2, AlertCircle, 
  ChevronLeft, Star, MessageSquare, MapPin, Search, Edit3, Shield, Loader2, Save, X
} from "lucide-react";
import * as motion from "motion/react-client";
import { cn } from "../../core/utils/cn";
import { reportApi, Report } from "../../core/services/reportApi";
import { auth } from "../../core/services/firebase";

export function MyReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);

  // Simulated reputation logic
  const reputationScore = 85; 

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

  const handleEditStart = (report: Report) => {
    setEditingId(report.id);
    setEditValue(report.description);
  };

  const handleEditSave = async (id: string) => {
    setSaving(true);
    try {
      await reportApi.editReport(id, { description: editValue });
      setReports(reports.map(r => r.id === id ? { ...r, description: editValue } : r));
      setEditingId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

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
      {/* Reputation Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-6 bg-gradient-to-r from-slate-900 to-indigo-900 rounded-[2rem] text-white shadow-xl shadow-indigo-900/10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
            <Shield className="text-emerald-400 w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-black mb-1">نقاط السمعة</h2>
            <p className="text-xs font-bold text-slate-300">بلاغاتك الصادقة ترفع من جودة مدينتك.</p>
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-center md:items-end">
          <div className="text-4xl font-black text-emerald-400 mb-1">{reputationScore}</div>
          <div className="w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
             <div className="h-full bg-emerald-400" style={{ width: `${reputationScore}%` }}></div>
          </div>
          <span className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">المستوى: مواطن متعاون</span>
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 px-2">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
            <FileText size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">سجل البلاغات</h1>
            <p className="text-sm font-bold text-slate-500">إدارة ومتابعة طلباتك المرسلة</p>
          </div>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {(['all', 'active', 'resolved'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-6 py-2.5 text-xs font-black rounded-lg transition-all",
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
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="font-bold text-slate-500">جاري جلب بياناتك...</p>
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
          <Search className="w-16 h-16 mx-auto mb-6 text-slate-300" />
          <h3 className="text-xl font-black text-slate-900 mb-2">لا توجد بلاغات مرسلة</h3>
          <p className="text-sm font-bold text-slate-500 mb-8 px-10">يبدو أنك لم تقم بإرسال أي بلاغات بعد أو لا توجد نتائج مطابقة لفلترك الحالي.</p>
          <Link to="/new" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black transition-transform hover:scale-105 inline-block">
            إرسال بلاغ جديد الآن
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReports.map((report) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              key={report.id}
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all p-8 flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={cn(
                  "px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-wider",
                  getStatusStyle(report.status)
                )}>
                  {getStatusText(report.status)}
                </div>
                <div className="flex items-center gap-2">
                   {report.status === 'pending_operator' && editingId !== report.id && (
                     <button 
                        onClick={() => handleEditStart(report)}
                        className="p-2 bg-slate-50 text-slate-400 hover:bg-amber-50 hover:text-amber-600 rounded-xl transition-colors"
                        title="تعديل البلاغ"
                     >
                       <Edit3 size={16} />
                     </button>
                   )}
                   <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl">
                    #{report.id}
                  </span>
                </div>
              </div>

              {editingId === report.id ? (
                <div className="space-y-4 mb-6">
                   <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-bold focus:ring-4 focus:ring-blue-500/10 outline-none min-h-[120px] resize-none"
                   />
                   <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditSave(report.id)}
                        disabled={saving}
                        className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                      >
                         {saving ? <Loader2 className="w-3 h-3 animate-spin"/> : <Save size={14}/>}
                         حفظ التغيرات
                      </button>
                      <button 
                        onClick={() => setEditingId(null)}
                        className="px-6 py-3 bg-slate-100 text-slate-500 rounded-xl text-xs font-black flex items-center justify-center gap-2"
                      >
                         <X size={14}/> إلغاء
                      </button>
                   </div>
                </div>
              ) : (
                <h3 className="text-lg font-black text-slate-900 mb-4 line-clamp-3 leading-relaxed flex-1">
                  {report.description}
                </h3>
              )}

              <div className="space-y-3 mb-8">
                 <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <Clock size={14} className="text-slate-400" />
                  <span>{new Date(report.createdAt).toLocaleDateString('ar-SA')}</span>
                </div>
                {report.department && (
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl w-fit">
                    <MapPin size={14} />
                    <span>تم التوجيه لـ {report.department}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                {report.status === 'resolved' ? (
                  <div className="flex items-center gap-1">
                    {report.rating ? (
                       <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} size={14} className={cn("fill-current", s <= (report.rating || 0) ? "text-amber-500" : "text-slate-200")} />
                          ))}
                       </div>
                    ) : (
                      <Link 
                        to={`/track?no=${report.id}`}
                        className="text-[11px] font-black text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all flex items-center gap-2 border border-blue-100"
                      >
                        <Star size={14} /> قيم الخدمة الآن
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-sm" />
                    قيد المعالجة الميدانية
                  </div>
                )}

                <Link 
                  to={`/track?no=${report.id}`}
                  className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all transform hover:rotate-12"
                >
                  <ChevronLeft size={24} />
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
