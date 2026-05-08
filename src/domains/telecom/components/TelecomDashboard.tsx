import { Signal, Activity, Zap, Users, MessageSquare, PhoneCall, MapPin, AlertTriangle, TrendingUp, Cpu, Globe, BarChart3, Radio, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { collection, query, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../../core/services/firebase";
import { Report } from "../../core/services/reportApi";
import { toast } from "sonner";
import { useAuth } from "../../core/context/AuthContext";

export function TelecomDashboard() {
  const { currentRole } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'reports'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Report));
      // Filter reports classified as telecom network complaints by citizens
      const telecomReports = docs.filter(r => r.type === 'شكوى شبكة اتصالات');
      setReports(telecomReports);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'reports'));

    return () => unsubscribe();
  }, []);

  const openTicketsCount = reports.filter(r => !r.status.startsWith('resolved') && r.status !== 'تم الحل').length;
  const activeReports = reports.filter(r => !r.status.startsWith('resolved') && r.status !== 'تم الحل').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const uptimeData = [
    { name: "00:00", val: 99.9 },
    { name: "04:00", val: 99.8 },
    { name: "08:00", val: 99.5 },
    { name: "12:00", val: openTicketsCount > 5 ? 85.0 : 99.7 }, // Reactive to ticket count
    { name: "16:00", val: openTicketsCount > 10 ? 80.0 : 99.1 },
    { name: "20:00", val: 99.9 },
  ];

  const handleUpdateStatus = async (newStatus: string) => {
      if (!selectedReportId) return;
      setIsStatusUpdating(true);
      try {
         const repRef = doc(db, 'reports', selectedReportId);
         await updateDoc(repRef, {
             status: newStatus,
             updatedAt: new Date().toISOString()
         });
         toast.success("تم تحديث حالة البلاغ بنجاح");
         setSelectedReportId(null);
      } catch (err) {
         handleFirestoreError(err, OperationType.UPDATE, 'reports');
      } finally {
          setIsStatusUpdating(false);
      }
  };

  const handleLaunchCampaign = () => {
      toast.success("تم إرسال إشعارات التوعية للمشتركين في النطاق الجغرافي المحدد.");
  };

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-slate-50 min-h-[85vh] rounded-[3rem] border border-sky-100/50 shadow-sm relative overflow-hidden">
      {/* Abstract Tech Background */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-sky-100/30 rounded-full blur-3xl -z-10" />
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-sky-600 text-white flex items-center justify-center shadow-xl shadow-sky-600/20">
            <Signal className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex tracking-tight">إدارة استدامة الشبكة</h2>
            <p className="text-slate-500 mt-1 font-bold">بوابة الشراكة الاستراتيجية: مراقبة الأداء والتفاعل المباشر مع البلاغات</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-sky-100 shadow-sm">
                <span className={`w-2 h-2 rounded-full ${openTicketsCount > 5 ? 'bg-amber-500' : 'bg-green-500 animate-pulse'}`} />
                <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
                    {openTicketsCount > 5 ? 'Network Degraded' : 'Network Stable'}
                </span>
            </div>
            <button onClick={handleLaunchCampaign} className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-2">
                <Radio className="w-4 h-4" />
                إطلاق حملة توعوية (إشعار ذكي)
            </button>
        </div>
      </header>

      {/* Connectivity Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        {[
            { label: "المشتركين المشمولين", value: "١٢,٥٤٠", icon: Users, color: "text-blue-600" },
            { label: "كفاءة التغطية (متوسط)", value: openTicketsCount > 5 ? "٩٥.٢٪" : "٩٩.٨٪", icon: Globe, color: "text-emerald-600" },
            { label: "تذاكر دعم فني (بلاغات)", value: openTicketsCount.toString(), icon: MessageSquare, color: "text-amber-600" },
            { label: "أبراج قيد الخدمة", value: "٨٦", icon: Zap, color: "text-sky-600" },
        ].map((stat, i) => (
            <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-[2.5rem] border border-sky-50 shadow-sm group hover:border-sky-200 transition-all flex flex-col justify-center"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-5 h-5" />
                    </div>
                </div>
                <p className="text-[10px] font-black text-slate-400 capitalize tracking-widest mb-1">{stat.label}</p>
                <p className="text-xl font-black text-slate-900">{stat.value}</p>
            </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Network Pulse Graph */}
        <div className="lg:col-span-8 bg-white rounded-[3rem] border border-sky-100 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                        <Activity className="w-4 h-4 text-sky-600" />
                        الخريطة الحرارية (استقرار الشبكة)
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold mt-1">يعكس المنحنى انخفاض الجودة بمجرد تراكم بلاغات الانقطاع</p>
                </div>
            </div>
            <div className="flex-1 p-8 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={uptimeData}>
                        <defs>
                            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={openTicketsCount > 5 ? "#f59e0b" : "#0ea5e9"} stopOpacity={0.2}/>
                                <stop offset="95%" stopColor={openTicketsCount > 5 ? "#f59e0b" : "#0ea5e9"} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[80, 100]} />
                        <RechartsTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Area type="monotone" dataKey="val" stroke={openTicketsCount > 5 ? "#f59e0b" : "#0ea5e9"} strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${openTicketsCount > 5 ? 'bg-amber-500' : 'bg-sky-500'}`} />
                        <span className="text-[10px] font-bold text-slate-600">Cellular / Data</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Alerts & Service Queue */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-[3rem] p-8 border border-sky-100 shadow-sm flex-1 flex flex-col h-[500px]">
                <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-sky-600" />
                        تذاكر الأعطال الواردة
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400">{activeReports.length} بلاغ</span>
                </div>
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                    {activeReports.length === 0 && <p className="text-center text-slate-400 font-bold text-sm py-10">لا يوجد بلاغات أعطال شبكة حالياً</p>}
                    {activeReports.map(ticket => (
                        <div 
                            key={ticket.id} 
                            onClick={() => setSelectedReportId(ticket.id)}
                            className={`p-5 rounded-3xl border transition-all cursor-pointer group relative overflow-hidden
                                ${selectedReportId === ticket.id ? 'border-sky-300 bg-sky-50 shadow-md' : 'border-slate-100 bg-slate-50 hover:bg-white hover:border-sky-200'}
                            `}
                        >
                            <div className="flex justify-between items-center mb-3">
                                <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${
                                    ticket.priority === 'critical' ? 'bg-rose-100 text-rose-700' : 
                                    ticket.priority === 'high' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'
                                }`}>
                                    {ticket.priority === 'critical' ? 'حرج' : ticket.priority === 'high' ? 'عالي' : 'عادي'}
                                </span>
                                <span className="text-[10px] font-black text-slate-400">{new Date(ticket.createdAt).toLocaleDateString('ar-SA')}</span>
                            </div>
                            <h5 className="font-black text-xs text-slate-800 mb-1 group-hover:text-sky-700 transition-colors leading-relaxed">{ticket.description}</h5>
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200/50">
                                <div className="flex items-center gap-1.5 text-slate-500">
                                    <MapPin className="w-3 h-3" />
                                    <span className="text-[9px] font-bold">بواسطة مواطن</span>
                                </div>
                                <span className="text-[9px] font-black text-sky-600 bg-sky-100/50 px-2 py-0.5 rounded-lg">{ticket.status}</span>
                            </div>
                        </div>
                    ))}
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
                  className="relative bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl border border-slate-100"
               >
                    <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mb-4">
                       <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">إدارة تذكرة الدعم الفني</h3>
                    <p className="text-xs font-bold text-slate-500 mb-6">
                        تحديث حالة البلاغ سيظهر مباشرة لدى المواطن في تطبيق "بلّغ" لضمان الشفافية العالية.
                    </p>
    
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
                        <p className="text-xs font-bold text-slate-700 leading-relaxed">
                            {reports.find(r => r.id === selectedReportId)?.description}
                        </p>
                    </div>
    
                    <div className="space-y-3 mb-8">
                        <label className="block text-[10px] uppercase font-black text-slate-400 mb-2 pl-1">تحديث الحالة إلى:</label>
                        <div className="grid grid-cols-1 gap-3">
                            <button onClick={() => handleUpdateStatus('تم الاستلام')} className="px-4 py-3 rounded-xl border border-slate-200 text-xs font-black text-slate-700 hover:bg-slate-50 transition-colors">تم الاستلام</button>
                            <button onClick={() => handleUpdateStatus('قيد الفحص')} className="px-4 py-3 rounded-xl border border-amber-200 bg-amber-50 text-xs font-black text-amber-700 hover:bg-amber-100 transition-colors">قيد الفحص</button>
                            <button onClick={() => handleUpdateStatus('resolved')} className="px-4 py-3 rounded-xl border border-green-200 bg-green-50 text-xs font-black text-green-700 hover:bg-green-100 transition-colors">تم الحل</button>
                        </div>
                    </div>
    
                    <div className="flex gap-3">
                        <button disabled={isStatusUpdating} onClick={() => setSelectedReportId(null)} className="flex-1 bg-slate-100 text-slate-700 rounded-xl py-3 text-sm font-black hover:bg-slate-200 transition">
                            إغلاق النافذة
                        </button>
                    </div>
               </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
}

