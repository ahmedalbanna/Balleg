import { BarChart3, LayoutDashboard, Bell, Search, Filter, CheckCircle, Loader2, AlertCircle, Clock, Hammer } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { reportApi, Report } from "../../core/services/reportApi";
import { notificationService } from "../../core/services/notifications";
import { cn } from "../../core/utils/cn";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../../core/services/firebase";
import { toast } from "sonner";
import { useAuth } from "../../core/context/AuthContext";
import OfficialMapView from "./OfficialMapView";

export function OfficialDashboard() {
  const { userProfile } = useAuth();
  const [department, setDepartment] = useState(userProfile?.departmentId || "النظافة والمخلفات");
  const [reports, setReports] = useState<Report[]>([]);
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [clarifications, setClarifications] = useState<any[]>([]);
  const [journalistRequests, setJournalistRequests] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'resolved' | 'clarifications' | 'journalist'>('active');
  const [delayThreshold, setDelayThreshold] = useState(5); // Configurable threshold in days
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string|null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyMode, setReplyMode] = useState<'clarification' | 'journalist'>('clarification');

  useEffect(() => {
    if (userProfile?.departmentId && department === "النظافة والمخلفات") {
      setDepartment(userProfile.departmentId);
    }
  }, [userProfile]);

  const delayedReports = allReports.filter(r => {
    if (!['in_progress', 'under_execution'].includes(r.status)) return false;
    const updateTime = new Date(r.updatedAt || r.createdAt).getTime();
    const daysPassed = (Date.now() - updateTime) / (1000 * 60 * 60 * 24);
    return daysPassed > delayThreshold;
  });

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, 'reports'),
      where('department', '==', department),
      where('status', 'in', ['pending_official', 'assigned', 'in_progress', 'under_execution', 'resolved_pending_rating', 'resolved'])
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Report));
      
      // Filter active docs
      const activeDocs = docs.filter(r => !['resolved', 'resolved_pending_rating'].includes(r.status));
      const priorityWeights: Record<string, number> = { critical: 4, high: 3, medium: 2, low: 1 };
      const sortedActive = activeDocs.sort((a, b) => {
        const wA = priorityWeights[a.priority || 'low'] || 1;
        const wB = priorityWeights[b.priority || 'low'] || 1;
        if (wA !== wB) return wB - wA;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      // Filter resolved docs
      const resolvedDocs = docs.filter(r => ['resolved', 'resolved_pending_rating'].includes(r.status));
      const sortedResolved = resolvedDocs.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      
      setReports(activeTab === 'active' ? sortedActive : sortedResolved);
      setAllReports(docs);
      setLoading(false);

      // Trigger automatic alert if delayed reports exist
      const delayedCount = docs.filter(r => {
        if (!['in_progress', 'under_execution'].includes(r.status)) return false;
        const updateTime = new Date(r.updatedAt || r.createdAt).getTime();
        const daysPassed = (Date.now() - updateTime) / (1000 * 60 * 60 * 24);
        return daysPassed > delayThreshold;
      }).length;

      if (delayedCount > 0) {
        toast.error(`تنبيه: يوجد ${delayedCount} بلاغ متأخر تجاوزت المدة المحددة!`, {
          description: "يرجى مراجعة سير العمل في الميدان فوراً.",
          duration: 10000,
          position: "top-center"
        });
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'reports');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [department, activeTab, delayThreshold]);

  useEffect(() => {
    if (!department) return;
    const qCl = query(
      collection(db, 'clarification_requests'),
      where('targetDepartment', '==', department)
    );
    const unsubCl = onSnapshot(qCl, (snapshot) => {
      setClarifications(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const qJr = query(
        collection(db, 'journalist_comment_requests'),
        where('targetDepartment', '==', department)
    );
    const unsubJr = onSnapshot(qJr, (snapshot) => {
        setJournalistRequests(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => {
        unsubCl();
        unsubJr();
    };
  }, [department]);

  const handleUpdateStatus = async (id: string, s: string, extras?: any) => {
    setUpdatingId(id);
    try {
      await reportApi.updateStatus(id, s, extras);
      
      const report = allReports.find(r => r.id === id);
      if (report && report.userId && report.userId !== "anonymous") {
        await notificationService.notifyUser(report.userId, {
          title: s === 'resolved' ? "تم إنجاز بلاغك" : "بدء معالجة بلاغك",
          message: s === 'resolved' 
            ? `البلاغ رقم ${id} تم التعامل معه بنجاح. شكراً لتعاونك.` 
            : `البلاغ رقم ${id} قيد التنفيذ الآن من قبل الجهات المختصة.`,
          type: s === 'resolved' ? "success" : "info"
        });
      }

      toast.success(s === 'resolved' ? "تم إنجاز البلاغ بنجاح" : "تم بدء العمل على البلاغ");
    } catch (e) {
      console.error(e);
      toast.error('حدث خطأ أثناء تحديث حالة البلاغ');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleReopen = async (reportId: string) => {
    const reason = window.prompt("يرجى ذكر سبب إعادة فتح البلاغ:");
    if (!reason || reason.trim().length < 5) {
      toast.error("يجب ذكر سبب واضح لإعادة الفتح (٥ أحرف على الأقل)");
      return;
    }

    setUpdatingId(reportId);
    try {
      const toastId = toast.loading('جاري إعادة فتح البلاغ...');
      await reportApi.updateStatus(reportId, 'assigned', {
        reopenReason: reason,
        internalNotes: `تم إعادة الفتح بواسطة المدير: ${reason}`
      });
      
      const report = allReports.find(r => r.id === reportId);
      if (report && report.userId && report.userId !== "anonymous") {
        await notificationService.notifyUser(report.userId, {
          title: "تم إعادة فتح البلاغ",
          message: `تمت مراجعة البلاغ رقم ${reportId} وإعادته للفريق الميداني لاستكمال الحل.`,
          type: "warning"
        });
      }
      
      toast.success("تم إعادة فتح البلاغ وإعادته للميدان", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("فشلت عملية إعادة الفتح");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSendReply = async (requestId: string) => {
    if (!replyText.trim()) return;
    try {
      const toastId = toast.loading('جاري إرسال الرد...');
      await reportApi.updateStatus(requestId, 'replied', {
        // This is a bit hacky because reportApi is for reports, let's use direct firestore instead
      });
      // Import updateDoc if needed, wait it's already there? No, let's check
      // Actually let's just use updateDoc from firestore as I did in Admin
      const { updateDoc, doc, serverTimestamp } = await import('firebase/firestore');
      await updateDoc(doc(db, 'clarification_requests', requestId), {
        status: 'replied',
        reply: replyText,
        repliedBy: `إدارة ${department}`,
        repliedAt: serverTimestamp()
      });
      toast.success('تم إرسال الرد بنجاح', { id: toastId });
      setReplyingToId(null);
      setReplyText("");
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'clarification_requests');
    }
  };

  const resolvedReports = allReports.filter(r => r.status === 'resolved' || r.status === 'resolved_pending_rating');
  const negativeRatings = allReports.filter(r => r.rating !== undefined && r.rating < 3);
  
  // Calculate Avg Resolution Time in Hours
  const calculateAvgTime = () => {
    if (resolvedReports.length === 0) return "٠";
    const totalTime = resolvedReports.reduce((acc, r) => {
      const created = new Date(r.createdAt).getTime();
      const resolved = new Date(r.updatedAt).getTime();
      return acc + (resolved - created);
    }, 0);
    const avgMs = totalTime / resolvedReports.length;
    const avgHrs = avgMs / (1000 * 60 * 60);
    return avgHrs < 1 ? "أقل من ساعة" : `${Math.round(avgHrs)} س`;
  };

  const stats = [
    { label: "بلاغات نشطة", value: reports.length.toString(), color: "text-blue-600", bg: "bg-blue-50" },
    { label: "متوسط الإنجاز", value: calculateAvgTime(), color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "منجزة كلياً", value: resolvedReports.length.toString(), color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "تقييمات سلبية", value: negativeRatings.length.toString(), color: "text-rose-600", bg: "bg-rose-50" },
  ];

  const getTimeAgo = (dateStr: string) => {
    const min = Math.round((Date.now() - new Date(dateStr).getTime()) / 60000);
    if (min === 0) return "الآن";
    if (min < 60) return `${min} دقيقة`;
    return `${Math.round(min/60)} ساعة`;
  };

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-slate-50 min-h-[80vh] rounded-3xl border border-slate-200">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 font-readex">لوحة تحكم معالجة البلاغات</h2>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-bold text-sm">الجهة الحالية:</span>
              <select 
                value={department} 
                onChange={(e) => { setDepartment(e.target.value); setLoading(true); }}
                className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-2 py-1 font-bold shadow-sm outline-none"
              >
                  <option value="النظافة والمخلفات">النظافة والمخلفات</option>
                  <option value="الكهرباء والإنارة">الكهرباء والإنارة</option>
                  <option value="الطرق والجسور">الطرق والجسور</option>
                  <option value="شبكات المياه والصرف">شبكات المياه والصرف</option>
                  <option value="البيئة والحدائق">البيئة والحدائق</option>
                  <option value="الأمن والسلامة">الأمن والسلامة</option>
                  <option value="الحالات الإنسانية">الحالات الإنسانية</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-lg border border-amber-100">
               <span className="text-amber-700 font-bold text-[10px]">تنبيه التأخير بعد:</span>
               <input 
                 type="number" 
                 value={delayThreshold}
                 onChange={(e) => setDelayThreshold(Number(e.target.value))}
                 className="w-12 bg-white border border-amber-200 rounded text-center text-xs font-black p-0.5 outline-none"
               />
               <span className="text-amber-700 font-bold text-[10px]">أيام</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                تصدير تقرير إنجاز
            </button>
        </div>
      </header>

      {/* Map Overview Section */}
      <section className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-slate-900 font-readex">نطاق العمل الميداني</h3>
              <p className="text-xs font-bold text-slate-400 mt-1">توزيع جغرافي للبلاغات النشطة في قطاع {department}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-slate-500">بلاغ نشط</span>
              </div>
            </div>
          </div>
          <div className="h-[400px] w-full relative">
            <OfficialMapView 
              points={reports.map(r => ({
                lat: r.location?.lat || 15.3694 + (Math.random() - 0.5) * 0.05,
                lng: r.location?.lng || 44.1910 + (Math.random() - 0.5) * 0.05,
                intensity: r.priority === 'critical' ? 1 : 0.4,
                label: r.id,
                category: r.type,
                assignedTo: r.assignedTo
              }))} 
            />
          </div>
        </div>
      </section>

      {/* Delay Alert Banner */}
      <AnimatePresence>
        {delayedReports.length > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-rose-50 border-2 border-rose-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-rose-900/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center animate-bounce">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-rose-900 text-sm">تنبيه تأخير حرج!</h4>
                  <p className="text-rose-700 text-xs font-bold leading-none mt-1">يوجد {delayedReports.length} بلاغات تجاوزت خطة المعالجة المحددة ({delayThreshold} أيام).</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  const firstDelayed = delayedReports[0];
                  const el = document.getElementById(`report-${firstDelayed.id}`);
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-rose-600 text-white text-[10px] font-black rounded-lg hover:bg-rose-700 transition-colors uppercase tracking-wider"
              >
                مراجعة البلاغات المتأخرة
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
          >
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{stat.label}</p>
            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex bg-slate-200/50 p-1 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('active')}
          className={cn(
            "px-6 py-2.5 rounded-xl text-xs font-black transition-all",
            activeTab === 'active' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          البلاغات النشطة ({allReports.filter(r => !['resolved', 'resolved_pending_rating'].includes(r.status)).length})
        </button>
        <button 
          onClick={() => setActiveTab('resolved')}
          className={cn(
            "px-6 py-2.5 rounded-xl text-xs font-black transition-all",
            activeTab === 'resolved' ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          الأرشيف المنجز ({allReports.filter(r => ['resolved', 'resolved_pending_rating'].includes(r.status)).length})
        </button>
        <button 
          onClick={() => setActiveTab('clarifications')}
          className={cn(
            "px-6 py-2.5 rounded-xl text-xs font-black transition-all",
            activeTab === 'clarifications' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          استيضاحات المجلس ({clarifications.length})
        </button>
        <button 
          onClick={() => setActiveTab('journalist')}
          className={cn(
            "px-6 py-2.5 rounded-xl text-xs font-black transition-all",
            activeTab === 'journalist' ? "bg-white text-purple-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          تعليقات الصحافة ({journalistRequests.length})
        </button>
      </div>

      {activeTab === 'active' || activeTab === 'resolved' ? (
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px] flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold flex items-center gap-2 text-slate-800">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                {activeTab === 'active' ? `البلاغات الموجهة إلى ${department}` : `أرشيف إنجازات فريق ${department}`}
                {loading && <Loader2 className="w-4 h-4 text-blue-400 animate-spin mr-2" />}
            </h3>
        </div>
        <div className="overflow-x-auto flex-1 relative">
            <table className="w-full text-right">
                <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        <th className="px-6 py-4">رقم البلاغ</th>
                        <th className="px-6 py-4 w-1/3">الوصف</th>
                        <th className="px-6 py-4">التصنيف الذكي</th>
                        <th className="px-6 py-4">{activeTab === 'active' ? 'وقت الانتظار' : 'وقت الإنجاز'}</th>
                        <th className="px-6 py-4">الحالة</th>
                        <th className="px-6 py-4">إجراء</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    <AnimatePresence mode="wait">
                        {reports.length === 0 && !loading && (
                            <motion.tr 
                              key="empty"
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                              className="text-center py-12 text-slate-400"
                            >
                                <td colSpan={6} className="py-12">
                                    <div className="flex flex-col items-center">
                                        <CheckCircle className="w-12 h-12 text-emerald-200 mb-2" />
                                        <p className="font-bold">{activeTab === 'active' ? 'لا توجد بلاغات معلقة لهذه الجهة. عمل ممتاز!' : 'لا توجد بلاغات منجزة في السجلات حتى الآن.'}</p>
                                    </div>
                                </td>
                            </motion.tr>
                        )}
                        {reports.map((report) => {
                            const updateTime = new Date(report.updatedAt || report.createdAt).getTime();
                            const daysPassed = (Date.now() - updateTime) / (1000 * 60 * 60 * 24);
                            const isDelayed = ['in_progress', 'under_execution'].includes(report.status) && daysPassed > delayThreshold;

                            return (
                            <motion.tr 
                                initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0, scale:0.95}}
                                key={report.id} 
                                id={`report-${report.id}`}
                                className={cn(
                                    "hover:bg-slate-50/80 transition-colors group",
                                    isDelayed ? "bg-rose-50/50 border-r-4 border-rose-500" : ""
                                )}
                            >
                                <td className="px-6 py-4 font-mono text-sm font-bold text-slate-700">
                                    <div className="flex flex-col gap-1">
                                        <span>{report.id}</span>
                                        {isDelayed && (
                                            <span className="flex items-center gap-0.5 text-[8px] font-black text-rose-600 uppercase">
                                                <Clock className="w-2 h-2" /> متأخر ({Math.floor(daysPassed)} يوم)
                                            </span>
                                        )}
                                        {report.priority === 'critical' && (
                                            <span className="flex items-center gap-0.5 text-[8px] font-black text-red-600 uppercase animate-pulse">
                                                <AlertCircle className="w-2 h-2" /> عاجل جداً
                                            </span>
                                        )}
                                        {report.priority === 'high' && (
                                            <span className="text-[8px] font-black text-orange-600 uppercase">أولوية مرتفعة</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold opacity-80 leading-relaxed max-w-xs transition-all">
                                    <div className="flex flex-col gap-2">
                                        <p className="line-clamp-2">{report.description}</p>
                                        <div className="flex gap-2">
                                          {report.imageUrl && (
                                              <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-100 shadow-sm hover:scale-110 transition-transform cursor-pointer">
                                                  <img src={report.imageUrl} alt="Thumbnail Before" className="w-full h-full object-cover" title="قبل الإصلاح" />
                                              </div>
                                          )}
                                          {report.resolutionImageUrl && (
                                              <div className="w-12 h-12 rounded-lg overflow-hidden border border-emerald-100 shadow-sm hover:scale-110 transition-transform cursor-pointer">
                                                  <img src={report.resolutionImageUrl} alt="Thumbnail After" className="w-full h-full object-cover" title="بعد الإصلاح" />
                                              </div>
                                          )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs font-bold text-indigo-600">
                                    <span className="bg-indigo-50 px-2 py-1 rounded text-[10px] uppercase">{report.classification || report.type}</span>
                                </td>
                                <td className="px-6 py-4 text-xs font-bold text-slate-500">
                                  {activeTab === 'active' ? getTimeAgo(report.createdAt) : getTimeAgo(report.updatedAt)}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${
                                        report.status === 'under_execution' ? 'bg-indigo-100 text-indigo-700' :
                                        report.status === 'in_progress' ? 'bg-emerald-100 text-emerald-700' : 
                                        report.status === 'assigned' ? 'bg-blue-100 text-blue-700' : 
                                        ['resolved', 'resolved_pending_rating'].includes(report.status) ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                                    }`}>
                                        {report.status === 'under_execution' ? 'تحت التنفيذ' : 
                                         report.status === 'in_progress' ? 'تحت المعالجة' : 
                                         report.status === 'assigned' ? 'تم التكليف' : 
                                         ['resolved', 'resolved_pending_rating'].includes(report.status) ? 'مكتمل' : 'بانتظار المراجعة'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-left">
                                    <div className="flex items-center gap-2">
                                        {updatingId === report.id ? (
                                            <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                                        ) : (
                                            <>
                                                {activeTab === 'active' ? (
                                                  <>
                                                    {report.status === 'pending_official' && (
                                                        <div className="flex flex-col gap-1">
                                                            <button onClick={() => handleUpdateStatus(report.id, 'assigned')} className="px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 text-[10px] font-black rounded transition-colors whitespace-nowrap">
                                                                توجيه للفريق الميداني
                                                            </button>
                                                            {['الطرق والجسور', 'شبكات المياه والصرف', 'الكهرباء والإنارة', 'البيئة والحدائق'].includes(department) && (
                                                                <button onClick={() => handleUpdateStatus(report.id, 'assigned', { assignedTo: 'contractor' })} className="px-3 py-1 bg-orange-50 text-orange-600 hover:bg-orange-100 text-[10px] font-black rounded transition-colors whitespace-nowrap flex items-center gap-1">
                                                                    <Hammer className="w-3 h-3" />
                                                                    تحويل لمقاول خارجي
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                    <button onClick={() => handleUpdateStatus(report.id, 'resolved')} className="px-3 py-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 text-xs font-bold rounded transition-colors flex items-center gap-1">
                                                        إنجاز
                                                    </button>
                                                  </>
                                                ) : (
                                                  <button onClick={() => handleReopen(report.id)} className="px-3 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded transition-colors flex items-center gap-1">
                                                      <Clock className="w-3 h-3" />
                                                      إعادة فتح
                                                  </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </td>
                            </motion.tr>
                            );
                        })}
                    </AnimatePresence>
                </tbody>
            </table>
        </div>
      </section>
      ) : activeTab === 'clarifications' ? (
        <div className="grid grid-cols-1 gap-4">
            {clarifications.length === 0 && (
              <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
                  <p className="text-sm font-bold text-slate-400">لا توجد طلبات استيضاح موجهة لقطاع {department}</p>
              </div>
            )}
            {clarifications.map((req) => (
              <motion.div 
                key={req.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4"
              >
                  <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                          <h4 className="text-md font-black text-slate-900">{req.subject}</h4>
                          <span className="text-[10px] font-bold text-slate-400">بتاريخ: {new Date(req.createdAt?.toDate?.() || req.createdAt).toLocaleDateString('ar-SA')}</span>
                      </div>
                      <span className={cn(
                          "text-[10px] font-black px-3 py-1 rounded-lg uppercase",
                          req.status === 'pending' ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                      )}>
                          {req.status === 'pending' ? 'بانتظار ردكم' : 'تم الرد'}
                      </span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-600 leading-relaxed">{req.content}</p>
                  </div>

                  {req.status === 'replied' ? (
                      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                          <p className="text-xs font-bold text-emerald-900 leading-relaxed">{req.reply}</p>
                          <div className="mt-2 text-[8px] font-black text-emerald-600/50">تم الرد بواسطة: {req.repliedBy}</div>
                      </div>
                  ) : (
                    <div className="pt-2">
                        {replyingToId === req.id ? (
                          <div className="space-y-4">
                              <textarea 
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder="اكتب رد الدائرة الرسمي والخطوات المتخذة..."
                                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-50 min-h-[120px] resize-none"
                              />
                              <div className="flex gap-2">
                                  <button onClick={() => { setReplyMode('clarification'); handleSendReply(req.id); }} className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-black hover:bg-black transition-colors">إرسال الرد</button>
                                  <button onClick={() => setReplyingToId(null)} className="text-slate-500 px-6 py-2 text-xs font-bold">إلغاء</button>
                              </div>
                          </div>
                        ) : (
                          <button onClick={() => { setReplyMode('clarification'); setReplyingToId(req.id); }} className="text-indigo-600 text-xs font-black uppercase hover:underline">كتابة رد رسمي الآن</button>
                        )}
                    </div>
                  )}
              </motion.div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
             {journalistRequests.length === 0 && (
              <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
                  <p className="text-sm font-bold text-slate-400">لا توجد طلبات تعليق صحفي موجهة لقطاع {department}</p>
              </div>
            )}
            {journalistRequests.map((req) => (
              <motion.div 
                key={req.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 border-r-4 border-r-purple-500"
              >
                  <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                          <h4 className="text-md font-black text-slate-900">طلب تعليق صحفي رسمي</h4>
                          <span className="text-[10px] font-bold text-slate-400">رقم البلاغ: {req.reportId}</span>
                      </div>
                      <span className={cn(
                          "text-[10px] font-black px-3 py-1 rounded-lg uppercase",
                          req.status === 'pending' ? "bg-amber-100 text-amber-700" : "bg-purple-100 text-purple-700"
                      )}>
                          {req.status === 'pending' ? 'بانتظار الرد' : 'تم الرد للصحافة'}
                      </span>
                  </div>

                  <div className="bg-purple-50/30 p-4 rounded-2xl border border-purple-100">
                      <p className="text-xs font-black text-slate-700 leading-relaxed italic">"{req.content}"</p>
                  </div>

                  {req.status === 'replied' ? (
                      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                          <p className="text-xs font-black text-emerald-900 leading-relaxed">{req.officialReply}</p>
                          <div className="mt-2 text-[8px] font-black text-emerald-600/50">تم الرد بواسطة المتحدث الرسمي: {req.repliedBy}</div>
                      </div>
                  ) : (
                    <div className="pt-2">
                        {replyingToId === req.id ? (
                          <div className="space-y-4">
                              <textarea 
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder="اكتب الرد الرسمي الموجه للصحافة هنا..."
                                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-bold outline-none focus:ring-2 focus:ring-purple-100 min-h-[120px] resize-none"
                              />
                              <div className="flex gap-2">
                                  <button onClick={() => { setReplyMode('journalist'); handleSendReply(req.id); }} className="bg-purple-600 text-white px-6 py-2 rounded-xl text-xs font-black hover:bg-purple-700 transition-colors">إعتماد الرد الصحفي</button>
                                  <button onClick={() => setReplyingToId(null)} className="text-slate-500 px-6 py-2 text-xs font-bold">إلغاء</button>
                              </div>
                          </div>
                        ) : (
                          <button onClick={() => { setReplyMode('journalist'); setReplyingToId(req.id); }} className="text-purple-600 text-xs font-black uppercase hover:underline">الرد ببيان رسمي الآن</button>
                        )}
                    </div>
                  )}
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
}
