import { Landmark, FileText, Gavel, Users, Search, Download, AlertCircle, PieChart, Activity, Zap, Map as MapIcon, RotateCw, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend } from "recharts";
import MapView from "../../locations/components/MapView";
import { useState, useEffect } from "react";
import { collection, query, onSnapshot, doc, setDoc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../../core/services/firebase";
import { Report } from "../../core/services/reportApi";
import { toast } from "sonner";
import { useAuth } from "../../core/context/AuthContext";

export function CouncilDashboard() {
  const { currentRole } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClarificationModalOpen, setIsClarificationModalOpen] = useState(false);
  const [clarificationDept, setClarificationDept] = useState("");
  const [clarificationText, setClarificationText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'reports'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Report));
      setReports(docs);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'reports'));

    return () => unsubscribe();
  }, []);

  const totalReports = reports.length;
  const resolvedCount = reports.filter(r => r.status.startsWith('resolved')).length;
  const inProgressCount = reports.filter(r => r.status === 'in_progress').length;
  const newCount = reports.filter(r => r.status === 'pending_official' || r.status === 'pending_operator').length;

  const now = new Date();
  const delayedReports = reports.filter(r => {
    if (r.status.startsWith('resolved') || r.status === 'rejected') return false;
    const diffMs = now.getTime() - new Date(r.createdAt).getTime();
    return diffMs > 7 * 24 * 60 * 60 * 1000;
  });

  const poorlyRatedReports = reports.filter(r => r.rating && r.rating <= 2);

  const transparencyData = [
    { name: 'منجز', value: resolvedCount, color: '#10b981' },
    { name: 'قيد المعالجة', value: inProgressCount, color: '#3b82f6' },
    { name: 'جديد / متأخر', value: newCount, color: '#ef4444' },
  ];

  const mapPoints = reports.filter(r => r.location).map(r => ({
     lat: r.location![0],
     lng: r.location![1],
     intensity: r.priority === 'critical' || delayedReports.some(d => d.id === r.id) ? 1 : 0.5,
     label: r.description
  }));

  const transparencyStats = [
    { label: "إجمالي البلاغات الرقابية", value: totalReports.toString(), icon: Users, color: "text-slate-900" },
    { label: "بلاغات متأخرة جداً (+٧ أيام)", value: delayedReports.length.toString(), icon: AlertCircle, color: "text-rose-600" },
    { label: "بلاغات بتقييمات سلبية", value: poorlyRatedReports.length.toString(), icon: Activity, color: "text-amber-600" },
  ];

  const handleExportCSV = () => {
    try {
      const headers = ["ID", "Department", "Status", "Created At", "Type", "Priority", "Description"];
      const csvRows = [headers.join(',')];
      
      reports.forEach(r => {
        const row = [
          r.id,
          r.department || 'غير مصنف',
          r.status,
          r.createdAt,
          r.type || '',
          r.priority || '',
          `"${(r.description || '').replace(/"/g, '""')}"`
        ];
        csvRows.push(row.join(','));
      });

      const csvData = csvRows.join('\n');
      const blob = new Blob(['\uFEFF' + csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `council_raw_data_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("تم تصدير البيانات بنجاح");
    } catch (e) {
      toast.error("حدث خطأ أثناء التصدير");
    }
  };

  const handleSubmitClarification = async () => {
    if (!clarificationDept || !clarificationText.trim()) {
      toast.error('الرجاء تعبئة جميع الحقول المطلوبة');
      return;
    }
    setIsSubmitting(true);
    try {
      const newRef = doc(collection(db, 'clarifications'));
      await setDoc(newRef, {
        department: clarificationDept,
        text: clarificationText,
        status: 'open',
        createdAt: new Date().toISOString()
      });
      toast.success('تم إرسال طلب الاستيضاح بنجاح لتسجيله في الجلسة القادمة');
      setIsClarificationModalOpen(false);
      setClarificationDept("");
      setClarificationText("");
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'clarifications');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-12 bg-[#F9FAFB] min-h-[90vh] rounded-[3.5rem] border border-slate-200/50 shadow-sm relative overflow-hidden text-slate-900 font-sans">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 via-slate-800 to-slate-200"></div>
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-[2.5rem] bg-white border border-slate-200 flex items-center justify-center shadow-xl shadow-slate-200/20 text-slate-900">
            <Landmark className="w-10 h-10" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2 block">السلطة التشريعية والرقابية</span>
            <h2 className="text-4xl font-black font-readex tracking-tight">بوابة المجلس المحلي</h2>
          </div>
        </div>
        
        <div className="flex gap-3">
            <button onClick={handleExportCSV} className="px-6 py-3 bg-slate-900 rounded-2xl text-white text-sm font-black flex items-center gap-2 hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all">
                <Download className="w-4 h-4" />
                سجل البيانات الخام (CSV)
            </button>
        </div>
      </header>

      {/* Control KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {transparencyStats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-slate-300 transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-7 h-7`} />
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Transparency Hub */}
        <div className="lg:col-span-7 flex flex-col gap-8">
            <section className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm h-full flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-black font-readex">مؤشر أمانة البيانات والتنفيذ</h3>
                        <p className="text-xs font-bold text-slate-400 mt-1">توزيع الحالة الفعلية للبلاغات الموثقة في النظام الحي</p>
                    </div>
                </div>

                <div className="flex-1 w-full min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                            <Pie
                                data={transparencyData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {transparencyData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <RechartsTooltip 
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend verticalAlign="bottom" height={36}/>
                        </RePieChart>
                    </ResponsiveContainer>
                </div>

                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Zap className="w-6 h-6 text-emerald-500" />
                        <span className="text-sm font-black text-slate-800">البيانات غير قابلة للتلاعب أو التعديل من قبل المجلس (صلاحية القراءة فقط)</span>
                    </div>
                </div>
            </section>
        </div>

        {/* Supervision Sidebar */}
        <div className="lg:col-span-5 flex flex-col gap-8">
            <section className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                <Gavel className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                <h4 className="text-lg font-black mb-8 flex items-center justify-between">
                    المساءلة والفجوات
                </h4>
                
                <div className="space-y-6">
                    <div className="p-5 rounded-3xl bg-rose-500/10 border border-rose-500/20">
                        <h5 className="font-black text-sm text-rose-400 mb-2">البلاغات المتأخرة جداً (+7 أيام)</h5>
                        <p className="text-xs font-bold text-slate-300 mb-3 block">
                            توجد <span className="text-rose-400 font-black px-1">{delayedReports.length}</span> بلاغات تجاوزت الزمن المعياري ولم يتم حلها.
                        </p>
                    </div>
                    <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/20">
                        <h5 className="font-black text-sm text-amber-400 mb-2">تقييمات سلبية متكررة</h5>
                        <p className="text-xs font-bold text-slate-300 block">
                            تم رصد <span className="text-amber-400 font-black px-1">{poorlyRatedReports.length}</span> عمليات إغلاق بلاغ بتقييم أقل من ٣ نجوم.
                        </p>
                    </div>
                </div>
                
                <button onClick={() => setIsClarificationModalOpen(true)} className="w-full mt-8 py-4 bg-white text-slate-900 rounded-3xl text-sm font-black hover:bg-slate-100 transition-all flex items-center justify-center gap-2 relative z-10">
                    إصدار طلب استيضاح
                    <AlertCircle className="w-4 h-4" />
                </button>
            </section>

            <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[350px]">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <MapIcon className="w-4 h-4 text-slate-900" />
                        الخارطة الرقابية
                    </h4>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">١٠٠٪ شفافية</span>
                </div>
                <div className="flex-1 relative">
                    <MapView points={mapPoints} center={[33.5138, 36.2765]} zoom={12} />
                </div>
            </section>
        </div>
      </div>

      <AnimatePresence>
        {isClarificationModalOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
               {/* Backdrop */}
               <motion.div 
                  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                  className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                  onClick={() => setIsClarificationModalOpen(false)}
               />
               {/* Modal */}
               <motion.div
                  initial={{scale:0.95, opacity:0, y:20}} animate={{scale:1, opacity:1, y:0}} exit={{scale:0.95, opacity:0, y:20}}
                  className="relative bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl border border-slate-100"
               >
                    <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-4">
                       <Gavel className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">إصدار طلب استيضاح</h3>
                    <p className="text-xs font-bold text-slate-500 mb-6">سيتم تسجيل هذا الطلب كتذكرة مفتوحة موجهة للإدارة المعنية لعرضها في جلسات المجلس المحلي.</p>
    
                    <div className="space-y-4 font-bold text-sm">
                        <div>
                            <label className="block text-[10px] uppercase font-black text-slate-400 mb-1 pl-1">الجهة المعنية / الإدارة</label>
                            <select 
                                value={clarificationDept}
                                onChange={(e) => setClarificationDept(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                            >
                                <option value="">-- اختر الجهة المستهدفة --</option>
                                <option value="النظافة والمخلفات">النظافة والمخلفات</option>
                                <option value="الإنارة والكهرباء">الإنارة والكهرباء</option>
                                <option value="الطرق والجسور">الطرق والجسور</option>
                                <option value="الصرف الصحي والمياه">الصرف الصحي والمياه</option>
                                <option value="التشجير والمرافق">التشجير والمرافق</option>
                                <option value="المرور والمخالفات">المرور والمخالفات</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase font-black text-slate-400 mb-1 pl-1">نص الاستيضاح أو الاستجواب</label>
                            <textarea
                                value={clarificationText}
                                onChange={(e) => setClarificationText(e.target.value)}
                                placeholder="مثال: يرجى التوضيح حول أسباب تأخر الاستجابة لبلاغات حي كذا..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 resize-none min-h-[120px]"
                            ></textarea>
                        </div>
                    </div>
    
                    <div className="flex gap-3 mt-8">
                        <button disabled={isSubmitting} onClick={handleSubmitClarification} className="flex-1 bg-slate-900 text-white rounded-xl py-3 text-sm font-black shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition flex items-center justify-center gap-2">
                            {isSubmitting ? <RotateCw className="w-4 h-4 animate-spin" /> : "إصدار الطلب وحفظه"}
                        </button>
                        <button disabled={isSubmitting} onClick={() => setIsClarificationModalOpen(false)} className="flex-1 bg-slate-100 text-slate-700 rounded-xl py-3 text-sm font-black hover:bg-slate-200 transition">
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

