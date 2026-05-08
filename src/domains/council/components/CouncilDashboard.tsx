import { LayoutDashboard, BarChart3, PieChart, Layers, Search, MapPin, CheckCircle, Clock, AlertTriangle, Filter, ChevronLeft, ShieldCheck, TrendingUp, Info, MessageSquarePlus, Send, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { collection, query, onSnapshot, orderBy, addDoc, serverTimestamp } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../../core/services/firebase";
import { Report } from "../../core/services/reportApi";
import { cn } from "../../core/utils/cn";
import { useAuth } from "../../core/context/AuthContext";
import { toast } from "sonner";

export interface ClarificationRequest {
  id: string;
  councilId: string;
  targetDepartment: string;
  subject: string;
  content: string;
  status: 'pending' | 'replied';
  reply?: string;
  repliedBy?: string;
  repliedAt?: any;
  createdAt: any;
}

export function CouncilDashboard() {
  const { userProfile } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [clarifications, setClarifications] = useState<ClarificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState<'reports' | 'clarifications'>('reports');
  
  // Clarification Form State
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [newRequest, setNewRequest] = useState({ subject: "", content: "", department: "الإدارة العامة" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = ['الإدارة العامة', 'النظافة والمخلفات', 'الطرق والجسور', 'شبكات المياه والصرف', 'الكهرباء والإنارة', 'البيئة والحدائق', 'الأمن والسلامة', 'الحالات الإنسانية'];

  useEffect(() => {
    const qReports = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
    const unsubReports = onSnapshot(qReports, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Report));
      setReports(docs);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'reports'));

    const qClarify = query(collection(db, 'clarification_requests'), orderBy('createdAt', 'desc'));
    const unsubClarify = onSnapshot(qClarify, (snapshot) => {
       const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as any as ClarificationRequest));
       setClarifications(docs);
    });

    return () => {
      unsubReports();
      unsubClarify();
    };
  }, []);

  const handleCreateRequest = async () => {
    if (!newRequest.subject.trim() || !newRequest.content.trim()) {
      toast.error("يرجى إكمال جميع الحقول");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'clarification_requests'), {
        councilId: userProfile?.uid,
        subject: newRequest.subject,
        content: newRequest.content,
        targetDepartment: newRequest.department,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      toast.success("تم إرسال طلب الاستيضاح بنجاح");
      setShowRequestModal(false);
      setNewRequest({ subject: "", content: "", department: "الإدارة العامة" });
    } catch (err) {
      console.error(err);
      toast.error("فشل إرسال الطلب");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (r.description?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === "all" || r.department === filterDept;
    const matchesStatus = filterStatus === "all" || r.status === filterStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const stats = [
    { label: "إجمالي البلاغات", value: reports.length, icon: Layers, color: "text-slate-600", bg: "bg-slate-50" },
    { label: "قيد المعالجة", value: reports.filter(r => ['assigned', 'in_progress', 'under_execution'].includes(r.status)).length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "تم الإنجاز", value: reports.filter(r => ['resolved', 'resolved_pending_rating'].includes(r.status)).length, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "بلاغات مرفوضة", value: reports.filter(r => r.status === 'rejected').length, icon: AlertTriangle, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, { label: string, color: string }> = {
      pending_verification: { label: 'بانتظار التحقق', color: 'bg-slate-100 text-slate-600' },
      pending_operator: { label: 'بانتظار العمليات', color: 'bg-blue-100 text-blue-600' },
      pending_official: { label: 'بانتظار المدير', color: 'bg-indigo-100 text-indigo-600' },
      assigned: { label: 'تم التكليف', color: 'bg-cyan-100 text-cyan-600' },
      in_progress: { label: 'تحت المعالجة', color: 'bg-emerald-100 text-emerald-600' },
      under_execution: { label: 'تحت التنفيذ', color: 'bg-violet-100 text-violet-600' },
      resolved_pending_rating: { label: 'تم الحل (بانتظار التقييم)', color: 'bg-green-100 text-green-600' },
      resolved: { label: 'مكتمل', color: 'bg-green-600 text-white' },
      rejected: { label: 'مرفوض', color: 'bg-rose-100 text-rose-600' },
      needs_info: { label: 'يحتاج معلومات', color: 'bg-amber-100 text-amber-600' }
    };
    return statusMap[status] || { label: status, color: 'bg-slate-100 text-slate-600' };
  };

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-white min-h-[90vh] rounded-[3rem] border border-slate-200/50 shadow-sm relative overflow-hidden">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-indigo-900 text-white flex items-center justify-center shadow-xl shadow-indigo-900/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex tracking-tight">بوابة المجلس المحلي</h2>
            <p className="text-slate-500 mt-1 font-bold">نظام الرقابة والشفافية: متابعة سير العمل وتقييم الأداء المؤسسي</p>
          </div>
        </div>

        <div className="flex items-center gap-3 py-2 px-4 bg-indigo-50 rounded-2xl border border-indigo-100/50">
            <Info className="w-4 h-4 text-indigo-600" />
            <span className="text-[10px] font-black text-indigo-900 uppercase">صلاحيات العرض فقط - الرقابة المباشرة</span>
        </div>
      </header>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5 group hover:shadow-xl hover:shadow-indigo-900/5 transition-all"
          >
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900 font-readex">
                {loading ? "..." : stat.value.toLocaleString('ar-EG')}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tab Switching & Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex bg-slate-100 p-1 rounded-2xl w-fit">
            <button 
              onClick={() => setActiveTab('reports')}
              className={cn(
                "px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2",
                activeTab === 'reports' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700 font-bold"
              )}
            >
                <Layers className="w-4 h-4" />
                سجل البلاغات ({reports.length})
            </button>
            <button 
              onClick={() => setActiveTab('clarifications')}
              className={cn(
                "px-8 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2",
                activeTab === 'clarifications' ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700 font-bold"
              )}
            >
                <MessageCircle className="w-4 h-4" />
                طلبات الاستيضاح ({clarifications.length})
            </button>
          </div>

          {activeTab === 'clarifications' && (
              <button 
                onClick={() => setShowRequestModal(true)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-2xl text-xs font-black flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-900/10"
              >
                  <MessageSquarePlus className="w-4 h-4" />
                  إنشاء طلب استيضاح جديد
              </button>
          )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Filters & Performance Insights */}
        <div className="lg:col-span-3 space-y-6">
            {activeTab === 'reports' && (
                <motion.div 
                   initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                   className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-200/50 space-y-6"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <Filter className="w-4 h-4 text-indigo-600" />
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">تصفية البيانات</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase">البحث بالمعرف أو النص</label>
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                <input 
                                type="text" 
                                placeholder="بحث..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-100" 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase">الإدارة المختصة</label>
                            <select 
                            value={filterDept}
                            onChange={(e) => setFilterDept(e.target.value)}
                            className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none cursor-pointer"
                            >
                                <option value="all">كل الإدارات</option>
                                {departments.filter(d => d !== 'الإدارة العامة').map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase">حالة البلاغ</label>
                            <select 
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none cursor-pointer"
                            >
                                <option value="all">كل الحالات</option>
                                <option value="pending_verification">بانتظار التحقق</option>
                                <option value="assigned">تم التكليف للميدان</option>
                                <option value="in_progress">تحت المعالجة</option>
                                <option value="under_execution">قيد التنفيذ الفعلي</option>
                                <option value="resolved">مكتمل</option>
                                <option value="rejected">مرفوض</option>
                            </select>
                        </div>
                    </div>
                </motion.div>
            )}

            <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                <TrendingUp className="w-20 h-20 absolute -right-5 -bottom-5 text-white/5 group-hover:scale-125 transition-transform duration-700" />
                <h4 className="text-xl font-black font-readex mb-2">أداء المحليات</h4>
                <p className="text-xs text-indigo-200 leading-relaxed font-bold">
                    تم تحقيق نسبة إنجاز كلية بلغت ٩٤٪ خلال الشهر الحالي، مع تحسن ملحوظ في وقت الاستجابة في قطاع النظافة.
                </p>
                <button className="mt-6 text-[10px] font-black uppercase text-indigo-300 hover:text-white transition-colors flex items-center gap-2">
                    تحميل التقرير التفصيلي <BarChart3 className="w-3 h-3" />
                </button>
            </div>
        </div>

        {/* Right Column: Main Data Area */}
        <div className="lg:col-span-9">
            {activeTab === 'reports' ? (
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[600px]">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                            <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                            سجل البلاغات العام (النفاذ الشامل)
                        </h3>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-500">
                                نتائج البحث: {filteredReports.length}
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-right">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 transition-colors">
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">معرف البلاغ</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">الإدارة</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">الوصف</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">الحالة</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">الموقع</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredReports.map((report) => (
                                    <tr key={report.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4 font-mono text-[11px] font-bold text-slate-500">#{report.id.slice(0, 8)}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-slate-900">{report.department || "غير محدد"}</span>
                                                <span className="text-[9px] font-bold text-slate-400">{report.priority === 'critical' ? 'أولوية قصوى' : 'أولوية عادية'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs font-bold text-slate-600 leading-relaxed line-clamp-1 max-w-sm">
                                                {report.description}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn("text-[8px] font-black px-2 py-1 rounded-lg uppercase whitespace-nowrap", getStatusLabel(report.status).color)}>
                                                {getStatusLabel(report.status).label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <MapPin className="w-3 h-3" />
                                                <span className="text-[10px] font-bold">موثق GPS</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredReports.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center">
                                            <Search className="w-12 h-12 text-slate-100 mx-auto mb-4" />
                                            <p className="text-xs font-black text-slate-400 uppercase">لا توجد بيانات مطابقة لخيارات التصفية</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                <div className="p-6 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
                    <p className="text-[10px] font-bold text-slate-400">تحديث تلقائي: نشط • عرض البيانات في الوقت الفعلي</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 hover:bg-slate-100 transition-colors">السابق</button>
                        <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black hover:bg-slate-800 transition-colors shadow-lg shadow-indigo-900/10">التالي</button>
                    </div>
                </div>
            </div>
            ) : (
                <div className="space-y-6">
                    {clarifications.length === 0 ? (
                        <div className="bg-white rounded-[2.5rem] p-20 text-center border border-dashed border-slate-300">
                             <MessageCircle className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                             <h4 className="font-black text-slate-400 text-sm uppercase">لا يوجد طلبات استيضاح مسجلة حالياً</h4>
                             <button 
                               onClick={() => setShowRequestModal(true)}
                               className="mt-6 text-indigo-600 text-[10px] font-black uppercase hover:underline"
                             >
                                ابدأ بإنشاء أول طلب استيضاح
                             </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {clarifications.map((req) => (
                                 <motion.div 
                                    key={req.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all flex flex-col gap-5 relative overflow-hidden"
                                 >
                                     <div className={cn(
                                         "absolute top-0 right-0 h-1.5 w-full",
                                         req.status === 'pending' ? "bg-amber-400" : "bg-emerald-400"
                                     )} />
                                     
                                     <div className="flex justify-between items-start">
                                         <div className="flex flex-col gap-1">
                                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">موجه إلى: {req.targetDepartment}</span>
                                             <h5 className="text-sm font-black text-slate-900">{req.subject}</h5>
                                         </div>
                                         <span className={cn(
                                             "text-[8px] font-black px-2 py-1 rounded-lg uppercase",
                                             req.status === 'pending' ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                                         )}>
                                             {req.status === 'pending' ? 'قيد الانتظار' : 'تم الرد'}
                                         </span>
                                     </div>

                                     <p className="text-xs font-bold text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl">
                                         {req.content}
                                     </p>

                                     {req.reply && (
                                         <div className="mt-2 p-5 bg-emerald-50 rounded-2xl border border-emerald-100 relative group">
                                             <div className="flex items-center gap-2 mb-2 text-[10px] font-black text-emerald-700 uppercase">
                                                 <CheckCircle className="w-3 h-3 text-emerald-500" />
                                                 الرد الرسمي للمجلس:
                                             </div>
                                             <p className="text-xs font-bold text-emerald-900 leading-relaxed">
                                                 {req.reply}
                                             </p>
                                             <div className="mt-3 text-[9px] font-black text-emerald-600/60 uppercase">
                                                 بواسطة: {req.repliedBy || "مدير النظام"} • {req.repliedAt?.toDate ? req.repliedAt.toDate().toLocaleDateString('ar-EG') : 'قريباً'}
                                             </div>
                                         </div>
                                     )}
                                 </motion.div>
                             ))}
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>

      {/* Creation Modal */}
      <AnimatePresence>
          {showRequestModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    onClick={() => setShowRequestModal(false)}
                  />
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl p-8 flex flex-col gap-6"
                  >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <h3 className="text-xl font-black font-readex text-slate-900 flex items-center gap-3">
                                <MessageSquarePlus className="w-6 h-6 text-indigo-600" />
                                طلب استيضاح جديد
                            </h3>
                            <button onClick={() => setShowRequestModal(false)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors">X</button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">الإدارة المستهدفة بالاستيضاح</label>
                                <select 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-black outline-none focus:ring-2 focus:ring-indigo-100 transition-all appearance-none cursor-pointer"
                                    value={newRequest.department}
                                    onChange={(e) => setNewRequest({...newRequest, department: e.target.value})}
                                >
                                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">موضوع الطلب</label>
                                <input 
                                    type="text" 
                                    placeholder="مثلاً: استيضاح حول مشروع صيانة طريق.."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-black outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                                    value={newRequest.subject}
                                    onChange={(e) => setNewRequest({...newRequest, subject: e.target.value})}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">تفاصيل الاستيضاح والأسئلة</label>
                                <textarea 
                                    rows={4}
                                    placeholder="يرجى كتابة التفاصيل والأسئلة الموجهة للإدارة بوضوح..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                                    value={newRequest.content}
                                    onChange={(e) => setNewRequest({...newRequest, content: e.target.value})}
                                />
                            </div>
                        </div>

                        <button 
                            onClick={handleCreateRequest}
                            disabled={isSubmitting}
                            className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-indigo-900/10 flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {isSubmitting ? "جاري الإرسال..." : (
                                <>
                                    إرسال الطلب رسمياً للمجلس <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                  </motion.div>
              </div>
          )}
      </AnimatePresence>
    </div>
  );
}
