import { HardHat, Map, Users, CheckCircle2, AlertCircle, Clock, Navigation, TrendingUp, BarChart3, ChevronLeft, Forward, Camera as CameraIcon, PenTool, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { usePermissions } from "../../core/hooks/usePermissions";
import { RequirePermission } from "../../core/components/RequirePermission";
import MapView from "../../locations/components/MapView";
import { db, handleFirestoreError, OperationType } from "../../core/services/firebase";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { Report } from "../../core/services/reportApi";
import { toast } from "sonner";
import { mediaUtils } from "../../core/utils/media";

export function SpecialistDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedTask, setSelectedTask] = useState<Report | null>(null);
  const [internalNote, setInternalNote] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [afterImageUrl, setAfterImageUrl] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // For demo, we are showing the "النظافة والمخلفات" department.
  const specialistDept = "النظافة والمخلفات";

  const { hasPermission } = usePermissions();

  useEffect(() => {
    if (!hasPermission('report:read_department')) {
      return;
    }
    const q = query(
      collection(db, 'reports'),
      where('department', '==', specialistDept),
      where('status', 'in', ['pending_official', 'in_progress'])
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Report));
      setReports(docs);
    }, (error) => {
       handleFirestoreError(error, OperationType.LIST, 'reports');
    });

    return () => unsubscribe();
  }, []);

  const handleStartWork = async (reportId: string) => {
    try {
      const toastId = toast.loading('جاري تحديث الحالة...');
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, {
        status: 'in_progress',
        updatedAt: new Date().toISOString()
      });
      toast.success('تم تحويل البلاغ إلى (تحت المعالجة)', { id: toastId });
    } catch (err) {
       toast.error('حدث خطأ أثناء التحديث');
       console.error(err);
    }
  };

  const handleCompleteWork = async (reportId: string) => {
    if (!afterImageUrl) {
       toast.error("آسف، لا يمكنك إغلاق البلاغ قبل إرفاق صورة توثيقية بعد المعالجة.", { position: 'top-center' });
       return;
    }
    
    try {
      setIsUpdating(true);
      const toastId = toast.loading('جاري توثيق الإنجاز وإغلاق البلاغ...');
      const reportRef = doc(db, 'reports', reportId);
      
      const updatePayload: any = {
        status: 'resolved_pending_rating',
        resolutionImageUrl: afterImageUrl,
        updatedAt: new Date().toISOString()
      };
      
      if (internalNote) {
         updatePayload.internalNotes = internalNote;
      }
      
      await updateDoc(reportRef, updatePayload);
      
      toast.success('مبروك! تم إنجاز العمل بنجاح بانتظار تقييم المواطن.', { id: toastId });
      setSelectedTask(null);
      setInternalNote("");
      setAfterImageUrl(null);
    } catch (err) {
       toast.error('حدث خطأ أثناء التحديث');
       console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReroute = async (reportId: string) => {
     // Ask for re-route department conceptually. For demo we just push it back to operator.
     try {
      const toastId = toast.loading('جاري إعادة التوجيه لغرفة العمليات...');
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, {
        status: 'pending_operator',
        department: '', // Clear department
        updatedAt: new Date().toISOString(),
        reroutedReason: internalNote || 'جهة اختصاص خاطئة'
      });
      toast.success('تم الإرجاع لغرفة العمليات للمراجعة', { id: toastId });
      setSelectedTask(null);
      setInternalNote("");
    } catch (err) {
       toast.error('حدث خطأ: لا يمكن الإرجاع');
    }
  };

  const handleSimulatePhotoUpload = async () => {
    setUploadingImage(true);
    try {
      await new Promise(r => setTimeout(r, 1500));
      setAfterImageUrl("https://images.unsplash.com/photo-1590552515252-3a5a1bce7f91?auto=format&fit=crop&q=80&w=800");
      toast.success("تم إرفاق صورة التوثيق بنجاح!");
    } finally {
      setUploadingImage(false);
    }
  };

  const stats = [
    { label: "مهام نشطة", value: reports.length.toString(), icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "فرق في الميدان", value: "٤", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "قيد المعالجة الآن", value: reports.filter(r => r.status === 'in_progress').length.toString(), icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  const mapPoints = reports.filter(r => r.location).map(r => ({
     lat: r.location![0],
     lng: r.location![1],
     intensity: r.status === 'in_progress' ? 1 : 0.6,
     label: r.description?.slice(0, 30) + '...' || 'مهمة ميدانية'
  }));

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-slate-50/50 min-h-[85vh] rounded-[3rem] border border-slate-200/60 shadow-sm relative">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-rose-700 text-white flex items-center justify-center shadow-2xl shadow-rose-900/20">
            <HardHat className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex">الإدارة الميدانية ({specialistDept})</h2>
            <p className="text-slate-500 mt-1 font-bold">تخطيط وتكليف ومتابعة.. لأثر ملموس على الأرض</p>
          </div>
        </div>
      </header>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl hover:shadow-rose-900/5 transition-all"
          >
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                    <p className="text-2xl font-black text-slate-900 font-readex">{stat.value}</p>
                </div>
            </div>
            <BarChart3 className="w-8 h-8 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive Map */}
        <div className="lg:col-span-8 flex flex-col gap-6">
            <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase tracking-widest text-xs">
                        <Map className="w-4 h-4 text-rose-600" />
                        نطاق العمليات الميدانية
                    </h3>
                </div>
                
                <div className="flex-1 bg-slate-100 relative group overflow-hidden">
                    <MapView points={mapPoints} center={[33.5138, 36.2765]} zoom={13} />
                </div>
            </section>
        </div>

        {/* Task List */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <section className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex flex-col gap-6 h-[500px]">
                <h4 className="text-sm font-black text-slate-800 flex items-center justify-between tracking-widest uppercase">
                    المهام الموكلة للقسم
                    <span className="w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-[10px] font-black">{reports.length}</span>
                </h4>
                
                <div className="space-y-4 overflow-y-auto pr-2">
                    {reports.length === 0 ? (
                        <div className="text-center py-10 text-slate-400">
                           <CheckCircle2 className="w-12 h-12 mx-auto mb-2 opacity-20" />
                           <p className="font-bold text-xs uppercase">لا توجد مهام نشطة حالياً</p>
                        </div>
                    ) : reports.map(task => (
                        <button 
                            key={task.id} 
                            onClick={() => { setSelectedTask(task); setInternalNote(""); setAfterImageUrl(null); }}
                            className={`w-full p-4 rounded-3xl border transition-all text-right group ${
                                selectedTask?.id === task.id ? 'bg-rose-50 border-rose-200 shadow-lg shadow-rose-900/5' : 'bg-slate-50 border-slate-100 hover:bg-white hover:border-slate-200'
                            }`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${
                                    task.status === 'in_progress' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                    {task.status === 'in_progress' ? 'تحت المعالجة' : 'عمل جديد'}
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold">{task.id}</span>
                            </div>
                            <h5 className="font-black text-slate-800 text-sm mb-1 line-clamp-2 leading-relaxed">{task.description}</h5>
                        </button>
                    ))}
                </div>
            </section>
        </div>
      </div>

      {/* Task Action Modal */}
      <AnimatePresence>
         {selectedTask && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                 onClick={() => setSelectedTask(null)}
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95, y: 20 }}
                 className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl flex flex-col"
               >
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-[2rem]">
                     <h3 className="font-black text-slate-800 flex items-center gap-2">
                        <PenTool className="w-5 h-5 text-rose-600" />
                        إدارة المهمة: {selectedTask.id}
                     </h3>
                     <button 
                       onClick={() => setSelectedTask(null)}
                       className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-300 transition-colors"
                     >
                        <X className="w-4 h-4" />
                     </button>
                  </div>
                  
                  <div className="p-6 flex flex-col gap-6">
                     <p className="text-sm font-bold text-slate-700 leading-relaxed bg-slate-100 p-4 rounded-xl border border-slate-200">
                        {selectedTask.description}
                     </p>

                     <div className="flex flex-col gap-2">
                        <label className="text-xs font-black text-slate-600">ملاحظات لفريق العمل الميداني أو العمليات (سرية):</label>
                        <textarea 
                           className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold min-h-[80px]"
                           placeholder="اكتب هنا إذا كان هناك صعوبات أو طلب تحويل لجهة أخرى..."
                           value={internalNote}
                           onChange={(e) => setInternalNote(e.target.value)}
                        />
                     </div>

                     {selectedTask.status === 'in_progress' && (
                        <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex flex-col gap-3">
                           <p className="text-xs font-black text-rose-800 mb-1 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4"/>
                              صورة توثيق المعالجة (إجبارية لإغلاق البلاغ)
                           </p>
                           {afterImageUrl ? (
                              <div className="w-32 h-32 rounded-xl overflow-hidden border border-rose-200">
                                 <img src={afterImageUrl} alt="After" className="w-full h-full object-cover" />
                              </div>
                           ) : (
                              <button 
                                onClick={handleSimulatePhotoUpload}
                                disabled={uploadingImage}
                                className="w-full sm:w-auto self-start px-5 py-3 bg-white border border-rose-200 rounded-xl text-rose-700 text-xs font-black flex items-center gap-2 hover:bg-rose-100 transition-colors shadow-sm disabled:opacity-50"
                              >
                                 <CameraIcon className="w-4 h-4" />
                                 {uploadingImage ? 'جاري الإرفاق...' : 'التقاط صورة توثيقية'}
                              </button>
                           )}
                        </div>
                     )}

                     <div className="border-t border-slate-100 pt-4 mt-2 flex flex-wrap gap-3 items-center justify-between">
                        {selectedTask.status === 'pending_official' && (
                           <button 
                             onClick={() => handleStartWork(selectedTask.id)}
                             className="px-6 py-3 bg-rose-600 text-white rounded-xl font-black text-sm hover:bg-rose-700 shadow-lg shadow-rose-600/20"
                           >
                              البدء الفعلي: تحريك الفريق
                           </button>
                        )}
                        
                        {selectedTask.status === 'in_progress' && (
                           <button 
                             onClick={() => handleCompleteWork(selectedTask.id)}
                             disabled={isUpdating}
                             className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 disabled:opacity-50"
                           >
                              توثيق كـ "مُنجز"
                           </button>
                        )}

                        <button 
                          onClick={() => handleReroute(selectedTask.id)}
                          className="px-4 py-3 bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 rounded-xl font-black text-xs transition-colors flex items-center gap-2 ml-auto"
                        >
                           <Forward className="w-4 h-4" />
                           خارج اختصاص القسم
                        </button>
                     </div>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

    </div>
  );
}
