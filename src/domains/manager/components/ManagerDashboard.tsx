import { BarChart3, TrendingUp, Users, Clock, AlertCircle, CheckCircle2, ChevronRight, Download, Filter, Target, Award, PieChart, RotateCw, MapPin, ArrowDownToLine, ArrowUpFromLine, Activity, Inbox, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, AreaChart, Area, CartesianGrid } from "recharts";
import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../../core/services/firebase";
import { toast } from "sonner";
import { Report } from "../../core/services/reportApi";

export function ManagerDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'top_down' | 'bottom_up' | 'units'>('top_down');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [actionNote, setActionNote] = useState("");
  const [assigneeName, setAssigneeName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Mocking the branch identity
  const managerOrg = {
    name: "إدارة طرق محافظة عدن",
    type: "local_dept",
    agency: "هيئة الطرق والجسور",
    ministry: "وزارة الأشغال العامة"
  };

  useEffect(() => {
    // In a real app we query by assignedOrgId
    // Here we query all for demonstration, and simulate the Top-Down/Bottom-Up locally if needed
    const q = query(
      collection(db, 'reports')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Report));
      
      // Inject some mock flow markers if they don't exist for UI demo purposes
      docs = docs.map((d, i) => {
        let flowType = 'normal';
        if (i % 3 === 0) flowType = 'top_down'; // Simulated from Ministry
        if (i % 4 === 0) flowType = 'bottom_up'; // Simulated escalation from unit
        return { ...d, flowType } as any;
      });

      setReports(docs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }, error => {
       handleFirestoreError(error, OperationType.GET, 'reports');
    });

    return () => unsubscribe();
  }, []);

  const handleEscalate = async (reportId: string) => {
    if (!actionNote.trim()) {
      toast.error('يجب إدخال سبب التصعيد للجهة العليا');
      return;
    }
    setIsUpdating(true);
    try {
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, {
        status: 'escalated_to_agency',
        reroutedReason: 'تصعيد من الفرع المحلي: ' + actionNote,
        updatedAt: new Date().toISOString()
      });
      toast.success('تم تصعيد البلاغ للهيئة المركزية');
      setSelectedReport(null);
      setActionNote("");
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'reports');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAssignToUnit = async (reportId: string, unitName: string) => {
    if (!unitName.trim()) {
      toast.error('يجب تحديد الوحدة الميدانية');
      return;
    }
    setIsUpdating(true);
    try {
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, {
        status: 'assigned_to_unit',
        assignedUnit: unitName,
        updatedAt: new Date().toISOString()
      });
      toast.success(`تم إحالة البلاغ إلى ${unitName}`);
      setAssigneeName("");
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'reports');
    } finally {
      setIsUpdating(false);
    }
  };

  const performanceData = [
    { name: 'السبت', complete: 85, target: 80, escalated: 10 },
    { name: 'الأحد', complete: 70, target: 80, escalated: 15 },
    { name: 'الاث.', complete: 92, target: 80, escalated: 5 },
    { name: 'الثل.', complete: 88, target: 80, escalated: 8 },
    { name: 'الأرب.', complete: 95, target: 80, escalated: 2 },
    { name: 'الخم.', complete: 78, target: 80, escalated: 12 },
  ];

  const unitsComparison = [
    { name: 'فريق صيانة المنصورة', load: 82, resolved: 45, delayed: 4 },
    { name: 'فريق صيانة خورمكسر', load: 60, resolved: 32, delayed: 1 },
    { name: 'طوارئ الخط البحري', load: 95, resolved: 78, delayed: 8 },
  ];

  const topDownReports = reports.filter((r: any) => r.flowType === 'top_down');
  const bottomUpReports = reports.filter((r: any) => r.flowType === 'bottom_up');
  const normalReports = reports.filter((r: any) => r.flowType === 'normal');

  const mainStats = [
    { label: "توجيهات مركزية", value: topDownReports.length, subtitle: "من الوزارة/الهيئة", icon: ArrowDownToLine, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "تصعيدات ميدانية", value: bottomUpReports.length, subtitle: "من الفرق للتوجيه", icon: ArrowUpFromLine, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "أداء الإدارة", value: "٨٧٪", subtitle: "معدل الإغلاق الكلي", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  const getStatusBadge = (status: string) => {
    if (status.startsWith('resolved')) return <span className="bg-emerald-100 text-emerald-700 px-2 py-1 mx-2 rounded-xl text-[10px]">مكتمل</span>;
    if (status.includes('escalated')) return <span className="bg-rose-100 text-rose-700 px-2 py-1 mx-2 rounded-xl text-[10px]">مصعّد للإدارة</span>;
    if (status === 'assigned_to_unit') return <span className="bg-blue-100 text-blue-700 mx-2 px-2 py-1 rounded-xl text-[10px]">مُحال للوحدة</span>;
    if (status === 'in_progress') return <span className="bg-amber-100 text-amber-700 px-2 py-1 mx-2 rounded-xl text-[10px]">تحت التنفيذ</span>;
    return <span className="bg-slate-100 text-slate-700 mx-2 px-2 py-1 rounded-xl text-[10px]">قيد الانتظار</span>;
  };

  const renderReportList = (list: any[], emptyMsg: string) => {
    return (
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {list.length === 0 && <p className="text-slate-400 text-center py-10 font-bold text-sm bg-slate-50 rounded-3xl border border-dashed border-slate-200">{emptyMsg}</p>}
        {list.map((report) => (
            <div key={report.id} className="border border-slate-100 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div 
                    onClick={() => setSelectedReport(selectedReport?.id === report.id ? null : report)}
                    className="p-4 cursor-pointer hover:bg-slate-50 transition-colors flex items-center justify-between"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            {getStatusBadge(report.status)}
                            <span className="text-xs font-black text-slate-800 line-clamp-1">{report.description}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold px-2">
                            <span>الوقت: {new Date(report.createdAt).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                            {report.flowType === 'top_down' && <span className="text-indigo-600 flex items-center gap-1"><ArrowDownToLine className="w-3 h-3"/> أولوية وزارة</span>}
                            {report.flowType === 'bottom_up' && <span className="text-amber-600 flex items-center gap-1"><ArrowUpFromLine className="w-3 h-3"/> استعصاء فريق</span>}
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {selectedReport?.id === report.id && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }} 
                            animate={{ height: 'auto', opacity: 1 }} 
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-slate-50 px-4 pb-4 border-t border-slate-100"
                        >
                            <div className="pt-4 space-y-5">
                                 {report.flowType === 'bottom_up' && (
                                    <div className="space-y-2 bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                                        <p className="text-xs font-bold text-amber-800 mb-2 flex items-center gap-2"><AlertCircle className="w-4 h-4"/> الفريق الميداني غير قادر على الحل. يتطلب تدخلك أو تصعيدك.</p>
                                        <input 
                                          type="text" 
                                          placeholder="سبب التصعيد للهيئة العليا..." 
                                          value={actionNote}
                                          onChange={e => setActionNote(e.target.value)}
                                          className="w-full bg-white px-3 py-2 rounded-xl text-xs font-bold outline-none border focus:border-amber-400"
                                        />
                                        <div className="flex gap-2 mt-2">
                                            <button 
                                                onClick={() => handleEscalate(report.id)}
                                                disabled={isUpdating}
                                                className="flex-1 bg-amber-600 text-white py-2 rounded-xl text-xs font-black hover:bg-amber-700 flex items-center justify-center gap-2"
                                            >
                                                <ArrowUpFromLine className="w-3 h-3" /> تصعيد للهيئة
                                            </button>
                                        </div>
                                    </div>
                                 )}

                                 {(report.flowType === 'top_down' || report.flowType === 'normal') && (
                                    <div className="space-y-2 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                        <p className="text-xs font-bold text-slate-700 mb-2">إحالة إلى وحدة التنفيذ الميدانية</p>
                                        <div className="flex gap-2">
                                          <select 
                                            value={assigneeName}
                                            onChange={e => setAssigneeName(e.target.value)}
                                            className="flex-1 bg-slate-50 px-3 py-2 rounded-xl text-xs font-bold outline-none border focus:border-blue-400"
                                          >
                                            <option value="">اختر الوحدة...</option>
                                            <option value="فريق صيانة المنصورة">فريق صيانة المنصورة</option>
                                            <option value="فريق صيانة خورمكسر">فريق صيانة خورمكسر</option>
                                            <option value="طوارئ الخط البحري">طوارئ الخط البحري</option>
                                          </select>

                                          <button 
                                            onClick={() => handleAssignToUnit(report.id, assigneeName)}
                                            disabled={isUpdating}
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-indigo-700 shrink-0"
                                          >
                                            إحالة للوحدة
                                          </button>
                                        </div>
                                    </div>
                                 )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-slate-50 min-h-[85vh] rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div className="absolute top-0 right-0 w-full h-[400px] bg-gradient-to-br from-indigo-900 via-slate-800 to-slate-900 -z-10 blur-3xl opacity-50"></div>
      
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10 pt-4">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-2xl">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="bg-indigo-500/20 text-indigo-100 border border-indigo-500/30 px-3 py-1 rounded-full text-[10px] font-black tracking-wider">لوحة تحكم الإدارة المحلية</span>
                <span className="text-slate-400 text-xs font-bold">&bull; {managerOrg.ministry} &bull; {managerOrg.agency}</span>
            </div>
            <h2 className="text-3xl font-black text-white font-readex">{managerOrg.name}</h2>
            <p className="text-indigo-200 mt-1 font-bold text-sm">مراقبة تدفق البلاغات المركزية وإدارة الفرق الميدانية.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white text-sm font-black shadow-xl hover:bg-white/20 transition-all">
                <Download className="w-4 h-4" />
                تقرير الفرع
            </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {mainStats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex items-center justify-between group cursor-pointer hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-7 h-7" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{stat.subtitle}</p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                        <span className="text-sm font-bold text-slate-800">{stat.label}</span>
                    </div>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Action Sidebar: Top-Down vs Bottom-Up */}
        <div className="lg:col-span-5 space-y-6">
            <section className="bg-white rounded-[3rem] p-6 border border-slate-100 shadow-sm flex flex-col gap-6 h-[750px]">
                <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100">
                    <button 
                        onClick={() => setActiveTab('top_down')}
                        className={`flex-1 py-3 text-xs font-black rounded-xl transition-all flex justify-center items-center gap-2 ${activeTab === 'top_down' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-400 hover:text-slate-700'}`}
                    >
                        <ArrowDownToLine className="w-4 h-4" /> مركزية ({topDownReports.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab('bottom_up')}
                        className={`flex-1 py-3 text-xs font-black rounded-xl transition-all flex justify-center items-center gap-2 ${activeTab === 'bottom_up' ? 'bg-white shadow-sm text-amber-700' : 'text-slate-400 hover:text-slate-700'}`}
                    >
                        <ArrowUpFromLine className="w-4 h-4" /> ميدانية ({bottomUpReports.length})
                    </button>
                </div>
                
                {activeTab === 'top_down' && renderReportList(topDownReports, 'لا توجد توجيهات مركزية جديدة')}
                {activeTab === 'bottom_up' && renderReportList(bottomUpReports, 'لا توجد بلاغات مصعدة من الفرق')}
            </section>
        </div>

        {/* Real-time Analytics Chart and Dept Comparison */}
        <div className="lg:col-span-7 flex flex-col gap-8">
            <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col gap-8 flex-1">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-black text-slate-900 font-readex">تدفق البلاغات للفرع (هذا الأسبوع)</h3>
                        <p className="text-xs text-slate-500 mt-1 font-bold">مقارنة البلاغات المنجزة مع المصعدة محلياً</p>
                    </div>
                </div>
                <div className="flex-1 w-full min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorComplete" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorEscalated" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 700, fontSize: 10 }} dy={10} />
                            <YAxis hide />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                            <Area type="monotone" dataKey="complete" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorComplete)" activeDot={{ r: 6 }} />
                            <Area type="monotone" dataKey="escalated" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorEscalated)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </section>
            
            <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-end mb-6">
                    <h3 className="text-lg font-black text-slate-900 font-readex flex items-center gap-3">
                        <Users className="w-5 h-5 text-indigo-600" />أداء الوحدات التنفيذية
                    </h3>
                    <span className="text-xs font-bold text-slate-500">حسب الإنجاز والضغط</span>
                </div>
                
                <div className="space-y-6">
                    {unitsComparison.map(unit => (
                        <div key={unit.name} className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="w-32 shrink-0">
                                <h4 className="font-bold text-sm text-slate-800">{unit.name}</h4>
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex justify-between text-[10px] text-slate-500 font-bold mb-1">
                                    <span>الإنجاز ({unit.resolved})</span>
                                    <span>الضغط ({unit.load}%)</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${(unit.resolved / unit.load) * 100}%` }} className="h-full bg-emerald-500"></motion.div>
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${(unit.delayed / unit.load) * 100}%` }} className="h-full bg-rose-500"></motion.div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
      </div>
    </div>
  );
}

