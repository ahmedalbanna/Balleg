import { HeartPulse, Globe, BarChart, MapPin, AlertTriangle, FileText, ChevronRight, Activity, Zap, Droplets, Trash2, Home, Download, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";
import MapView from "../../locations/components/MapView";
import { collection, query, onSnapshot, doc, updateDoc, setDoc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../../core/services/firebase";
import { Report } from "../../core/services/reportApi";
import { toast } from "sonner";
import { useAuth } from "../../core/context/AuthContext";

export function HumanitarianDashboard() {
  const { currentRole } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);
  const [isAdopting, setIsAdopting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'reports'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Report));
      setReports(docs);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'reports'));

    return () => unsubscribe();
  }, []);

  const now = new Date();
  const gapReports = reports.filter(r => {
      if (r.status.startsWith('resolved') || r.status === 'rejected') return false;
      // High priority or delayed
      const diffMs = now.getTime() - new Date(r.createdAt).getTime();
      const isDelayed = diffMs > 7 * 24 * 60 * 60 * 1000;
      return r.priority === 'critical' || isDelayed || r.sponsorId; // sponsorId means it's adopted
  });

  const adoptedReports = gapReports.filter(r => r.sponsorId === currentRole?.slug);
  const availableReports = gapReports.filter(r => !r.sponsorId);

  const mapPoints = availableReports.filter(r => r.location).map(r => ({
     lat: r.location![0],
     lng: r.location![1],
     intensity: r.priority === 'critical' ? 1 : 0.6,
     label: r.description
  }));

  const typeMap: Record<string, number> = {};
  availableReports.forEach(r => {
      const t = r.department || r.type || 'أخرى';
      typeMap[t] = (typeMap[t] || 0) + 1;
  });
  const impactData = Object.keys(typeMap).map((k, i) => ({
      name: k, 
      value: typeMap[k], 
      color: ['#ef4444', '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'][i % 5]
  }));

  const handleAdoptReport = async () => {
    if (!selectedReportId) return;
    setIsAdopting(true);
    try {
      // 1. Update report
      const repRef = doc(db, 'reports', selectedReportId);
      await updateDoc(repRef, {
         sponsorId: currentRole?.slug || 'humanitarian',
         sponsorName: "المنظمة الإنسانية الشريكة",
         sponsorDate: new Date().toISOString(),
         status: 'in_progress',
         updatedAt: new Date().toISOString(),
         department: 'تدخل إنساني (مبادرة مجتمعية)'
      });

      // 2. Notify municipality (log it as clarification/ticket)
      const ticketRef = doc(collection(db, 'clarifications'));
      await setDoc(ticketRef, {
          department: "الإدارة العليا للبلدية",
          text: `إشعار تدخل: تم تبني معالجة البلاغ رقم ${selectedReportId} من قبل منظمات شريكة لمنع الازدواجية وتوجيه الموارد.`,
          type: 'humanitarian_notice',
          status: 'open',
          createdAt: new Date().toISOString()
      });

      toast.success('تم تبني البلاغ واعتماده للتنفيذ. تم إشعار البلدية.');
      setIsAdoptModalOpen(false);
      setSelectedReportId(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'reports');
    } finally {
      setIsAdopting(false);
    }
  };

  const handleExportCSV = () => {
       toast.success("تم تصدير تقرير التدخلات (Simulation)");
  };

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-slate-50/10 min-h-[85vh] rounded-[3rem] border border-slate-200/50 shadow-sm relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-sky-600 text-white flex items-center justify-center shadow-xl shadow-sky-600/20">
            <HeartPulse className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex tracking-tight">منصة التنسيق الإنساني</h2>
            <p className="text-slate-500 mt-1 font-bold">توجيه التدخلات القائمة على البيانات لسد الفجوات الخدمية</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
            <button onClick={handleExportCSV} className="px-6 py-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-2 text-xs font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                <Download className="w-4 h-4" />
                تصدير تقارير التدخل
            </button>
            <button className="px-6 py-3 bg-sky-600 text-white rounded-2xl flex items-center gap-2 text-xs font-black hover:bg-sky-700 transition-all shadow-lg shadow-sky-600/20">
                <Globe className="w-4 h-4" />
                شبكة الشركاء
            </button>
        </div>
      </header>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between"
            >
                <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-sky-600" />
                        حجم الفجوات الخدمية المتاحة
                    </h4>
                </div>
                <div className="flex items-end gap-2 mb-4">
                    <span className="text-5xl font-black text-slate-900 leading-none">{availableReports.length}</span>
                    <span className="text-slate-400 font-bold mb-1">بلاغ / منطقة فجوة</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mt-4">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        className="h-full bg-rose-500"
                    />
                </div>
                <p className="text-[10px] text-slate-500 font-bold mt-4 leading-relaxed">
                    يعتمد التقييم على البلاغات الحرجة أو التي تجاوزت ٧ أيام دون استجابة حكومية.
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center"
            >
                <div className="h-32 w-full mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={impactData}
                                cx="50%"
                                cy="50%"
                                innerRadius={35}
                                outerRadius={50}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {impactData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <RechartsTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">توزيع القطاعات المتضررة</h4>
            </motion.div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <BarChart className="w-24 h-24" />
            </div>
            <div>
                <p className="text-sky-400 text-[10px] font-black tracking-[0.2em] uppercase mb-2">توفير الموارد</p>
                <h3 className="text-2xl font-black mb-4 font-readex leading-tight">تجنب ازدواجية التدخلات</h3>
                <p className="text-slate-400 text-xs font-bold leading-relaxed">
                    نظام الربط الذكي مع البلدية يضمن إشعارهم فوراً عند تبني المنظمات لأي بلاغ، مما يعلق التدخل الحكومي المتكرر ويوجه الموارد.
                </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800">
                <p className="text-xs font-bold text-slate-400">بلاغات تم تبنيها من قبل منظمتكم: <span className="text-white font-black">{adoptedReports.length}</span></p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Mapping Section */}
        <div className="lg:col-span-8 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-sky-600" />    
                        خريطة الفجوات الخدمية
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold mt-1">تحديد المناطق التي لا تستجيب لها جهود البلدية في الوقت المناسب</p>
                </div>
            </div>
            <div className="flex-1 bg-slate-50 relative min-h-[400px] flex items-center justify-center overflow-hidden">
                <MapView points={mapPoints} />
            </div>
        </div>

        {/* Critical Alerts Sidebar */}
        <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm flex flex-col h-[500px]">
                <h4 className="text-sm font-black text-slate-900 mb-6 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-rose-500" />
                        نقاط التدخل المتاحة
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{availableReports.length} موقع</span>
                </h4>
                
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                    {availableReports.length === 0 && <p className="text-center text-sm font-bold text-slate-400 py-10">لا توجد فجوات حالياً</p>}
                    {availableReports.map(need => (
                        <div 
                            key={need.id} 
                            onClick={() => {
                                setSelectedReportId(need.id);
                                setIsAdoptModalOpen(true);
                            }}
                            className="p-5 rounded-3xl border border-rose-100 bg-rose-50/30 hover:bg-white hover:border-rose-200 transition-all cursor-pointer group flex flex-col gap-2"
                        >
                            <div className="flex justify-between items-start">
                                <h5 className="font-black text-xs text-slate-800 group-hover:text-rose-700 transition-colors leading-relaxed">{need.description}</h5>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-[9px] font-black text-slate-500">{new Date(need.createdAt).toLocaleDateString('ar-SA')}</span>
                                <span className="text-[9px] font-black text-white bg-slate-900 px-3 py-1 rounded-full group-hover:bg-rose-600 transition-colors">تبني التدخل</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <AnimatePresence>
        {isAdoptModalOpen && selectedReportId && (
            <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
               {/* Backdrop */}
               <motion.div 
                  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                  className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                  onClick={() => setIsAdoptModalOpen(false)}
               />
               {/* Modal */}
               <motion.div
                  initial={{scale:0.95, opacity:0, y:20}} animate={{scale:1, opacity:1, y:0}} exit={{scale:0.95, opacity:0, y:20}}
                  className="relative bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl border border-slate-100"
               >
                    <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-4">
                       <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">تبني التدخل وحل المشكلة</h3>
                    <p className="text-xs font-bold text-slate-500 mb-6">
                        بموافقتك على تبني هذا البلاغ، سيتم تحويل حالته وإشعار السلطات المحلية لتجنب تعارض فرق التدخل وتوفير الموارد الحكومية.
                    </p>
    
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
                        <p className="text-sm font-black text-slate-800 mb-1">بيانات التدخل المرجعية:</p>
                        <p className="text-xs font-bold text-slate-500">البلاغ: {availableReports.find(x => x.id === selectedReportId)?.description}</p>
                        <p className="text-[10px] font-bold text-rose-500 mt-2">لا يسمح بعرض بيانات المُبلغ أو هويته حفاظاً على بروتوكولات الحماية والخصوصية.</p>
                    </div>
    
                    <div className="flex gap-3">
                        <button disabled={isAdopting} onClick={handleAdoptReport} className="flex-1 bg-sky-600 text-white rounded-xl py-3 text-sm font-black shadow-lg shadow-sky-600/20 hover:bg-sky-700 transition flex items-center justify-center gap-2">
                            تأكيد التبني وإشعار البلدية
                        </button>
                        <button disabled={isAdopting} onClick={() => setIsAdoptModalOpen(false)} className="flex-1 bg-slate-100 text-slate-700 rounded-xl py-3 text-sm font-black hover:bg-slate-200 transition">
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

