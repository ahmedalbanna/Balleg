import { Hammer, ClipboardList, PenTool as Tool, CheckCircle2, Clock, Calendar, MapPin, ChevronRight, TrendingUp, Trophy, FileText, Users, Building2, ExternalLink, Camera, UploadCloud } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { collection, query, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../../core/services/firebase";
import { Report } from "../../core/services/reportApi";
import { toast } from "sonner";
import { useAuth } from "../../core/context/AuthContext";

export function ContractorDashboard() {
  const { currentRole } = useAuth();
  const [activeTab, setActiveTab] = useState("active");
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'reports'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Report));
      setReports(docs);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'reports'));

    return () => unsubscribe();
  }, []);

  // In a real app, we filter by r.assignedTo === currentRole.slug
  // For demo, we show reports that belong to infrastructure departments that are open or assigned to contractor
  const assignedReports = reports.filter(r => 
      r.assignedTo === currentRole?.slug || 
      (!r.assignedTo && ['الطرق والجسور', 'الصرف الصحي والمياه', 'الإنارة والكهرباء'].includes(r.department || ''))
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const activeReports = assignedReports.filter(r => !r.status.startsWith('resolved') && r.status !== 'تم الإنجاز');
  const completedReports = assignedReports.filter(r => r.status.startsWith('resolved') || r.status === 'تم الإنجاز');

  const displayReports = activeTab === 'active' ? activeReports : completedReports;

  const totalPortfolioValue = assignedReports.length * 4500; // Mock value

  const handleUpdateStatus = async (newStatus: string) => {
      if (!selectedReportId) return;
      setIsUpdatingStatus(true);
      try {
          const repRef = doc(db, 'reports', selectedReportId);
          await updateDoc(repRef, {
              status: newStatus,
              assignedTo: currentRole?.slug || 'contractor',
              updatedAt: new Date().toISOString()
          });
          toast.success("تم تحديث حالة العمليات ونقل الإشعار للبلدية!");
          setSelectedReportId(null);
      } catch (error) {
          handleFirestoreError(error, OperationType.UPDATE, 'reports');
      } finally {
          setIsUpdatingStatus(false);
      }
  };

  const handleSimulateUpload = () => {
      toast.success("تم رفع الصور التوثيقية بنجاح واعتمادها في سجل البلاغ (Simulation)");
      setIsUploadModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-orange-50/5 min-h-[85vh] rounded-[3rem] border border-orange-100/50 shadow-sm relative overflow-hidden">
      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-orange-900 text-white flex items-center justify-center shadow-xl shadow-orange-900/20 shrink-0">
            <Hammer className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex tracking-tight">بوابة المقاولين والشركاء</h2>
            <p className="text-slate-500 mt-1 font-bold">إدارة أوامر الصيانة المحولة، جدولة الفرق، وتوثيق الإنجاز الميداني</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="px-5 py-3 bg-white border border-orange-100 rounded-2xl flex items-center gap-3 shadow-sm">
                <Trophy className="w-5 h-5 text-amber-500" />
                <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase">تصنيف الاستجابة</p>
                    <p className="text-[11px] font-black text-slate-800">الأفضل في الاستجابة للطوارئ (A+)</p>
                </div>
            </div>
        </div>
      </header>

      {/* Contract Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        {[
            { label: "الأوامر النشطة", value: activeReports.length.toString(), icon: FileText, color: "text-blue-600" },
            { label: "قيمة المحفظة (تقديري)", value: `$${totalPortfolioValue.toLocaleString()}`, icon: Building2, color: "text-slate-600" },
            { label: "مشاريع منجزة", value: completedReports.length.toString(), icon: CheckCircle2, color: "text-emerald-600" },
            { label: "معدل الإنجاز", value: "٩٢٪", icon: TrendingUp, color: "text-orange-600" },
        ].map((stat, i) => (
            <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
                <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color} mb-4`}>
                    <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Active Work Orders */}
        <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden h-[600px]">
                <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">تكليفات البلدية (أوامر العمل)</h3>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setActiveTab('active')}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${activeTab === 'active' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100'}`}
                        >
                            الفعالة المحولة
                        </button>
                        <button 
                            onClick={() => setActiveTab('completed')}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${activeTab === 'completed' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100'}`}
                        >
                            المكتملة
                        </button>
                    </div>
                </div>
                
                <div className="p-8 space-y-4 overflow-y-auto custom-scrollbar flex-1 bg-slate-50/50">
                    {displayReports.length === 0 && <p className="text-center text-slate-400 font-bold py-10">لا توجد سجلات حالية في هذا القسم.</p>}
                    {displayReports.map(contract => (
                        <div key={contract.id} className="p-6 rounded-[2.5rem] bg-white border border-slate-200 hover:border-orange-200 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-orange-50 shadow-sm flex items-center justify-center text-orange-600 tracking-tight font-black text-[10px]">
                                        {contract.id.slice(0, 4)}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-sm group-hover:text-orange-700 transition-colors leading-relaxed">{contract.description}</h4>
                                        <div className="flex items-center flex-wrap gap-3 mt-2">
                                            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                                                <Building2 className="w-3 h-3" />
                                                جهة الإحالة: {contract.department || "غير محدد"}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                                                <Calendar className="w-3 h-3" />
                                                تاريخ البلاغ: {new Date(contract.createdAt).toLocaleDateString('ar-SA')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {activeTab === 'active' && (
                                    <div className="flex flex-col gap-2 shrink-0">
                                        <button 
                                            onClick={() => setSelectedReportId(contract.id)}
                                            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black hover:bg-slate-800 transition-all flex items-center gap-2 justify-center"
                                        >
                                            <Tool className="w-3 h-3" />
                                            تحديث خطة العمل
                                        </button>
                                        <button 
                                            onClick={() => setIsUploadModalOpen(true)}
                                            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-[10px] font-black hover:border-orange-500 hover:text-orange-600 transition-all flex items-center gap-2 justify-center"
                                        >
                                            <Camera className="w-3 h-3" />
                                            توثيق بالصور
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between mt-4 border border-slate-100">
                                <span className={`text-[10px] font-black px-3 py-1 rounded-full ${['تم الحل', 'تم الإنجاز'].includes(contract.status) ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                    الحالة الحالية: {contract.status}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400">لا يمكن رؤية بيانات المواطن (حماية الخصوصية)</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Fleet & Team Management */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <TrendingUp className="w-24 h-24 text-orange-500" />
                </div>
                <h4 className="text-xl font-black mb-4 font-readex relative z-10">سمعة المؤسسة وتقييم البلدية</h4>
                <p className="text-xs font-bold text-slate-400 leading-relaxed mb-6 relative z-10">
                    تؤثر دقة تحديثاتكم الميدانية وسرعة إنجازكم لأوامر العمل على تصنيفكم التلقائي في نظام المناقصات الحكومية.
                </p>
                
                <div className="p-5 bg-white/5 rounded-3xl border border-white/10 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold text-slate-300">نسبة الإنجاز ضمن الوقت المحدد</span>
                        <span className="text-xs font-black text-emerald-400">٩٢٪ (ممتاز)</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-[92%] h-full bg-emerald-400" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] p-8 border border-slate-200 shadow-sm flex-1 flex flex-col">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">رعاية خدمة المجتمع</h4>
                
                <div className="flex-1">
                    <div className="p-5 bg-orange-50 rounded-3xl border border-orange-100 h-full flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-3 text-amber-600">
                            <Trophy className="w-6 h-6" />
                            <h5 className="text-sm font-black text-slate-900">جائزة الحي الأسرع استجابة</h5>
                        </div>
                        <p className="text-[11px] text-slate-600 font-bold leading-relaxed mb-6">
                            نظام "بلّغ" يمنح مؤسستكم فرصة لرعاية الأحياء الأسرع استجابة، ليظهر شعاركم للمواطنين في التطبيق كشريك تنموي فاعل.
                        </p>
                        <button className="w-full py-4 bg-orange-600 text-white rounded-2xl text-[10px] font-black hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20">
                            التقدم بطلب الرعاية (Sponsorship)
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedReportId && (
            <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
               {/* Backdrop */}
               <motion.div 
                  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                  className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                  onClick={() => setSelectedReportId(null)}
               />
               {/* Modal */}
               <motion.div
                  initial={{scale:0.95, opacity:0, y:20}} animate={{scale:1, opacity:1, y:0}} exit={{scale:0.95, opacity:0, y:20}}
                  className="relative bg-white rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl border border-slate-100"
               >
                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                       <Tool className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2 font-readex">تحديث مستوى الإنجاز (التنفيذ الميداني)</h3>
                    <p className="text-[11px] font-bold text-slate-500 mb-8 leading-relaxed">
                        قم بتحديد المرحلة الفنية الحالية. هذا التحديث سيظهر للبلدية (كجهة رقابية) وكذلك للمواطن في تطبيق تتبع البلاغات.
                    </p>
    
                    <div className="space-y-3 mb-8">
                        <button onClick={() => handleUpdateStatus('تم التكليف - جاري الجدولة')} className="w-full px-5 py-4 rounded-2xl border border-slate-200 text-sm font-black text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors flex justify-between items-center group">
                            تم التكليف - جاري الجدولة
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:-translate-x-1 transition-all" />
                        </button>
                        <button onClick={() => handleUpdateStatus('الفريق في الطريق للموقع')} className="w-full px-5 py-4 rounded-2xl border border-sky-200 bg-sky-50 text-sm font-black text-sky-800 hover:bg-sky-100 transition-colors flex justify-between items-center group">
                            الآليات والفريق في الطريق للموقع
                            <ChevronRight className="w-4 h-4 text-sky-400 group-hover:text-sky-600 group-hover:-translate-x-1 transition-all" />
                        </button>
                        <button onClick={() => handleUpdateStatus('جاري العمل والترميم')} className="w-full px-5 py-4 rounded-2xl border border-amber-200 bg-amber-50 text-sm font-black text-amber-800 hover:bg-amber-100 transition-colors flex justify-between items-center group">
                            جاري العمل والترميم (قيد التنفيذ المباشر)
                            <ChevronRight className="w-4 h-4 text-amber-400 group-hover:text-amber-600 group-hover:-translate-x-1 transition-all" />
                        </button>
                        <button onClick={() => handleUpdateStatus('تم الإنجاز')} className="w-full px-5 py-4 rounded-2xl border border-emerald-200 bg-emerald-50 text-sm font-black text-emerald-800 hover:bg-emerald-100 transition-colors flex justify-between items-center group">
                            تم الإنجاز والمطابقة وإنهاء الأعمال
                            <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:text-emerald-600 group-hover:-translate-x-1 transition-all" />
                        </button>
                    </div>
    
                    <div className="flex gap-3 pt-6 border-t border-slate-100">
                        <button disabled={isUpdatingStatus} onClick={() => setSelectedReportId(null)} className="flex-1 bg-slate-100 text-slate-700 rounded-xl py-3.5 text-xs font-black hover:bg-slate-200 transition-colors">
                            إغلاق النافذة
                        </button>
                    </div>
               </motion.div>
            </div>
        )}

        {isUploadModalOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
               {/* Backdrop */}
               <motion.div 
                  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                  className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                  onClick={() => setIsUploadModalOpen(false)}
               />
               {/* Modal */}
               <motion.div
                  initial={{scale:0.95, opacity:0, y:20}} animate={{scale:1, opacity:1, y:0}} exit={{scale:0.95, opacity:0, y:20}}
                  className="relative bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl border border-slate-100 text-center"
               >
                    <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                       <UploadCloud className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2 font-readex">رفع التوثيق الميداني</h3>
                    <p className="text-[11px] font-bold text-slate-500 mb-8 leading-relaxed">
                        يجب إرفاق صور (قبل العمل، أثناء العمل، وبعد الانتهاء) ليتم اعتماد صرف المستخلصات المالية للمشروع.
                    </p>
    
                    <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 mb-8 bg-slate-50 cursor-pointer hover:bg-slate-100 hover:border-orange-300 transition-colors">
                        <p className="text-xs font-black text-slate-400">انقر هنا لاختيار الصور أو التقط صورة بالكاميرا</p>
                    </div>
    
                    <div className="flex gap-3">
                        <button onClick={handleSimulateUpload} className="flex-1 bg-orange-600 text-white rounded-xl py-3.5 text-xs font-black shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition">
                            أكد الرفع (Simulation)
                        </button>
                        <button onClick={() => setIsUploadModalOpen(false)} className="flex-1 bg-slate-100 text-slate-700 rounded-xl py-3.5 text-xs font-black hover:bg-slate-200 transition">
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

