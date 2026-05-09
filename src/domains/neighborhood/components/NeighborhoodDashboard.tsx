import { Users, Map as MapIcon, AlertCircle, MessageSquare, ThumbsDown, Calendar, Eye, Search, Filter, MessageCircle, Send, MapPin, Box, Map, Scale, Archive, User, ShieldCheck, Zap, Settings, UserCheck, Building2, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { collection, query, onSnapshot, doc, setDoc, updateDoc, where, addDoc, serverTimestamp } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../../core/services/firebase";
import { Report } from "../../core/services/reportApi";
import NeighborhoodMapView from "./NeighborhoodMapView";
import { toast } from "sonner";
import { useAuth } from "../../core/context/AuthContext";
import { cn } from "../../core/utils/cn";
import { Link } from "react-router-dom";

export function NeighborhoodDashboard() {
  const { currentRole, profile } = useAuth();
  const activeDistrict = profile?.neighborhood || "حي الصافية";
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);
  const [escalateTitle, setEscalateTitle] = useState("");
  const [escalateDetail, setEscalateDetail] = useState("");
  const [isSubmittingEscalation, setIsSubmittingEscalation] = useState(false);

  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [communityComment, setCommunityComment] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);

  useEffect(() => {
    // Filter by neighborhood if available. 
    const reportsRef = collection(db, 'reports');
    // For prototype, if the report doesn't have a district, we might want to see them if we are testing.
    // However, the requirement is "ONLY neighborhood reports".
    const q = profile?.neighborhood
      ? query(reportsRef, where('district', '==', profile.neighborhood))
      : query(reportsRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Report));
      setReports(docs);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'reports'));

    return () => unsubscribe();
  }, [profile?.neighborhood]);

  const pendingCount = reports.filter(r => r.status === 'pending_official' || r.status === 'in_progress').length;
  const poorRatings = reports.filter(r => r.rating && r.rating <= 2);

  const now = new Date();
  const lateReports = reports.filter(r => {
    if (r.status.startsWith('resolved') || r.status === 'rejected') return false;
    const diffMs = now.getTime() - new Date(r.createdAt).getTime();
    return diffMs > 7 * 24 * 60 * 60 * 1000;
  });

  const neighborhoodStats = [
    { label: "بلاغات قيد الإجراء", value: pendingCount.toString(), icon: ClockIcon, color: "text-amber-600" },
    { label: "بلاغات متأخرة جداً", value: lateReports.length.toString(), icon: AlertCircle, color: "text-rose-600" },
    { label: "تقييمات سلبية", value: poorRatings.length.toString(), icon: ThumbsDown, color: "text-slate-600" },
  ];

  const mapPoints = reports.filter(r => r.location).map(r => {
    const isLate = lateReports.some(lr => lr.id === r.id);
    return {
      lat: r.location![0],
      lng: r.location![1],
      intensity: r.priority === 'critical' ? 1 : r.status === 'in_progress' ? 0.6 : 0.4,
      label: r.description,
      status: isLate ? 'late' : undefined
    };
  });

  // Combine late and poorly rated reports into a single alerts list
  const alerts = [
    ...lateReports.map(r => ({ ...r, alertType: 'late' as const })),
    ...poorRatings.map(r => ({ ...r, alertType: 'negative' as const }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleSubmitEscalation = async () => {
    if (!escalateTitle.trim() || !escalateDetail.trim()) {
      toast.error('الرجاء تعبئة العنوان والتفاصيل');
      return;
    }
    setIsSubmittingEscalation(true);
    try {
      await addDoc(collection(db, 'neighborhood_dissatisfaction_reports'), {
        neighborhoodId: profile?.uid || "unknown",
        neighborhoodName: activeDistrict,
        title: escalateTitle,
        content: escalateDetail,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      toast.success('تم رفع تقرير عدم الرضا بنجاح للتنبيه الإداري');
      setIsEscalateModalOpen(false);
      setEscalateTitle("");
      setEscalateDetail("");
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'neighborhood_dissatisfaction_reports');
    } finally {
      setIsSubmittingEscalation(false);
    }
  };

  const handleAddCommunityComment = async () => {
    if (!selectedReportId || !communityComment.trim()) return;
    setIsAddingComment(true);
    try {
      const reportRef = doc(db, 'reports', selectedReportId);
      // Using a simple array update, in a real app might use arrayUnion or a subcollection
      const currentReport = reports.find(r => r.id === selectedReportId);
      const updatedComments = [...(currentReport?.communityComments || []), {
        text: communityComment,
        author: "لجنة الحي",
        createdAt: new Date().toISOString()
      }];

      await updateDoc(reportRef, {
        communityComments: updatedComments,
        updatedAt: new Date().toISOString()
      });
      toast.success('تم إضافة التعليق المجتمعي');
      setCommunityComment("");
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'reports');
    } finally {
      setIsAddingComment(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-[#FAFAFA] min-h-[85vh] rounded-[3rem] border border-slate-200/50 shadow-sm relative overflow-hidden">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-600/20">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex tracking-tight">عين المجتمع: {activeDistrict}</h2>
            <p className="text-slate-500 mt-1 font-bold">لجنة رقابة تطوعية لضمان جودة الخدمات</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white px-5 py-2.5 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-sm">
            <Calendar className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-black text-slate-700 capitalize">اجتماع اللجنة القادم: الخميس</span>
          </div>
        </div>
      </header>

      {/* Neighborhood Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {neighborhoodStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5 group"
          >
            <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Map Overview Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-[400px] bg-slate-50 rounded-[3rem] border border-slate-100 overflow-hidden relative group z-10 shadow-sm"
      >
        <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <MapPin size={14} className="text-green-600" />
            <span className="text-[10px] font-black text-slate-900 tracking-tight">رصد جغرافي للمربعات السكنية والمباني النشطة</span>
        </div>
        <NeighborhoodMapView 
          points={reports.slice(0, 12).map(r => ({
            lat: r.location?.[0] || 15.3694,
            lng: r.location?.[1] || 44.1910,
            intensity: r.priority === 'critical' ? 0.9 : 0.4,
            label: r.department || 'عقار/مبنى',
            type: r.priority === 'critical' ? 'incident' : 'resident',
            status: r.priority === 'critical' ? 'urgent' : 'verified',
            owner: 'أحد سكان الحي'
          }))}
          center={[15.3694, 44.1910]}
          zoom={13}
        />
      </motion.div>

      {/* Quick Navigation Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 relative z-10 w-full pt-4">
        {[
          { name: 'مجلس الحي', icon: Users, path: "/neighborhood/council", color: "bg-indigo-50 text-indigo-600" },
          { name: 'خارطة المربعات', icon: Map, path: "/neighborhood/districts", color: "bg-emerald-50 text-emerald-600" },
          { name: 'سجل السكان', icon: UserCheck, path: "/neighborhood/residents", color: "bg-blue-50 text-blue-600" },
          { name: 'المباني والمنشآت', icon: Building2, path: "/neighborhood/buildings", color: "bg-cyan-50 text-cyan-600" },
          { name: 'إحصائيات اجتماعية', icon: BarChart3, path: "/neighborhood/social-stats", color: "bg-violet-50 text-violet-600" },
          { name: 'بلاغات الأهالي', icon: MessageSquare, path: "/neighborhood/resident-reports", color: "bg-rose-50 text-rose-600" },
          { name: 'حل النزاعات', icon: Scale, path: "/neighborhood/conflict-resolution", color: "bg-amber-50 text-amber-600" },
          { name: 'الأنشطة والفعاليات', icon: Calendar, path: "/neighborhood/events", color: "bg-fuchsia-50 text-fuchsia-600" },
          { name: 'الأرشيف الإداري', icon: Archive, path: "/neighborhood/archive", color: "bg-slate-100 text-slate-800" },
          { name: 'التنبيهات العاجلة', icon: Zap, path: "/neighborhood/alerts", color: "bg-rose-100 text-rose-700" },
          { name: 'الملف الشخصي', icon: User, path: "/neighborhood/profile", color: "bg-slate-50 text-slate-600" },
          { name: 'الإعدادات', icon: Settings, path: "/neighborhood/settings", color: "bg-gray-100 text-gray-800" },
        ].map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all flex flex-col items-center justify-center text-center gap-5 group"
          >
            <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-transform group-hover:rotate-12 shadow-sm", item.color)}>
              <item.icon className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-black text-slate-800 uppercase italic tracking-tighter leading-none">{item.name}</span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* District Map Access & Selected Report */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <section className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase tracking-widest text-xs">
                <MapIcon className="w-4 h-4 text-slate-900" />
                الرقابة الجغرافية للحي
              </h3>
              <div className="flex gap-2">
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  صلاحية اطلاع (Monitor Only)
                </span>
              </div>
            </div>

            <div className="flex-1 bg-slate-100 relative overflow-hidden">
              <NeighborhoodMapView points={mapPoints} />
            </div>
          </section>

          {/* Selected Report Details (Simulated side pane) */}
          {selectedReportId && (
            <section className="bg-white rounded-[3rem] border border-slate-200 p-8 shadow-sm">
              {(() => {
                const r = reports.find(x => x.id === selectedReportId);
                if (!r) return null;
                return (
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="font-black text-lg text-slate-900 mb-1">{r.description}</h4>
                        <p className="text-xs font-bold text-slate-500">حالة البلاغ الرقابية: {r.status}</p>
                      </div>
                      <button onClick={() => setSelectedReportId(null)} className="text-xs font-black text-slate-400 hover:text-slate-700 bg-slate-50 px-3 py-1 rounded-full">إغلاق التفاصيل</button>
                    </div>

                    {r.status.startsWith('resolved') && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <h5 className="font-black text-sm text-slate-800 mb-4 flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-emerald-500" />
                          تعليقات لجنة الحي بعد الحل
                        </h5>
                        <div className="space-y-3 mb-4 max-h-[150px] overflow-y-auto pr-2">
                          {r.communityComments?.map((c: any, i: number) => (
                            <div key={i} className="bg-slate-50 p-3 rounded-2xl">
                              <p className="font-black text-[10px] text-emerald-700 mb-1">{c.author}</p>
                              <p className="text-xs font-bold text-slate-600">{c.text}</p>
                            </div>
                          ))}
                          {(!r.communityComments || r.communityComments.length === 0) && (
                            <p className="text-xs text-slate-400 font-bold text-center py-2">لا توجد تعليقات رقابية بعد.</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="إضافة تعليق رقابي مجتمعي (مثل: التنفيذ ممتاز لكن بقيت مخلفات)..."
                            value={communityComment}
                            onChange={e => setCommunityComment(e.target.value)}
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-emerald-500"
                          />
                          <button
                            onClick={handleAddCommunityComment}
                            disabled={isAddingComment}
                            className="bg-emerald-600 text-white p-2 px-4 rounded-xl shadow-md hover:bg-emerald-700 transition"
                          >
                            <Send className="w-4 h-4 rotate-180" />
                          </button>
                        </div>
                      </div>
                    )}
                    {!r.status.startsWith('resolved') && (
                      <div className="mt-4 pt-4 border-t border-slate-100 text-center py-6">
                        <p className="text-sm font-black text-amber-600">البلاغ قيد الإجراء - بانتظار الإغلاق من قبل القطاع المعني ليتاح تقييمه والتوصية عليه.</p>
                      </div>
                    )}
                  </div>
                )
              })()}
            </section>
          )}
        </div>

        {/* Escalation Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <section className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm flex-1">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">تنبيهات للمتابعة ({alerts.length})</h4>
              <Filter className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {alerts.length === 0 && <p className="text-center text-slate-400 font-bold text-sm py-10">لا يوجد تنبيهات مقلقة حالياً</p>}
              {alerts.map(alert => (
                <div
                  key={alert.id}
                  onClick={() => setSelectedReportId(alert.id)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer group
                                ${selectedReportId === alert.id ? 'bg-slate-50 border-emerald-200 shadow-md' : 'border-slate-50 bg-slate-50/50 hover:bg-white hover:border-slate-200'}
                            `}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${alert.alertType === 'late' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                      {alert.alertType === 'late' ? 'مماطلة وتأخير' : 'تقييم سلبي'}
                    </span>
                    <span className="text-[10px] font-black text-slate-400">{new Date(alert.createdAt).toLocaleDateString('ar-SA')}</span>
                  </div>
                  <h5 className="font-black text-xs text-slate-800 mb-1 group-hover:text-slate-900 leading-relaxed">{alert.description}</h5>
                  <p className="text-[10px] text-slate-500 font-bold mt-2">انقر لعرض ومتابعة التفاصيل الداخلية</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-emerald-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden group shrink-0">
            <GavelIcon className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
            <h4 className="text-lg font-black mb-2 flex items-center gap-2 relative z-10">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              التصعيد للبلدية
            </h4>
            <p className="text-xs font-bold text-emerald-100/70 leading-relaxed mb-6 relative z-10">
              رفع تقرير "عدم رضا مجتمعي" حول جودة الخدمات أو تأخيرها، يظهر مباشرة كتنبيه لإدارة الأمانة (المدير العام).
            </p>
            <button
              onClick={() => setIsEscalateModalOpen(true)}
              className="w-full py-4 bg-emerald-500 text-white rounded-2xl text-xs font-black shadow-xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all uppercase tracking-widest relative z-10"
            >
              تحضير تقرير تصعيد
            </button>
          </section>
        </div>
      </div>

      <AnimatePresence>
        {isEscalateModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsEscalateModalOpen(false)}
            />
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl border border-slate-100"
            >
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">تقرير عدم رضا مجتمعي</h3>
              <p className="text-xs font-bold text-slate-500 mb-6">هذا التقرير سيرفع مباشرة للإدارة بأنه تم رصد تهاون متعمد أو تقصير في الحي.</p>

              <div className="space-y-4 font-bold text-sm">
                <div>
                  <label className="block text-[10px] uppercase font-black text-slate-400 mb-1 pl-1">عنوان التقرير</label>
                  <input
                    value={escalateTitle}
                    onChange={(e) => setEscalateTitle(e.target.value)}
                    placeholder="مثال: استمرار انقطاع المياه المتكرر..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black text-slate-400 mb-1 pl-1">تفاصيل القصور والمطالبات</label>
                  <textarea
                    value={escalateDetail}
                    onChange={(e) => setEscalateDetail(e.target.value)}
                    placeholder="اكتب تفاصيل القصور والمناشدة للتدخل السريع..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 resize-none min-h-[120px]"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button disabled={isSubmittingEscalation} onClick={handleSubmitEscalation} className="flex-1 bg-slate-900 text-white rounded-xl py-3 text-sm font-black shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition flex items-center justify-center gap-2">
                  إرسال لمدير النظام
                </button>
                <button disabled={isSubmittingEscalation} onClick={() => setIsEscalateModalOpen(false)} className="flex-1 bg-slate-100 text-slate-700 rounded-xl py-3 text-sm font-black hover:bg-slate-200 transition">
                  إلغاء
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function GavelIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="m14.5 12.5-8 8a2.12 2.12 0 0 1-3-3l8-8" />
      <path d="m16 16 6-6" />
      <path d="m8 8 6-6" />
      <path d="m9 7 8 8" />
      <path d="m21 11-8-8" />
    </svg>
  );
}

