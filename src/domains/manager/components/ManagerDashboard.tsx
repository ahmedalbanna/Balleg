import { BarChart3, TrendingUp, Users, Clock, AlertCircle, CheckCircle2, ChevronRight, Download, Filter, Target, Award, PieChart, RotateCw, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../../core/services/firebase";
import { toast } from "sonner";
import { Report } from "../../core/services/reportApi";

export function ManagerDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [managerNote, setManagerNote] = useState("");
  const [assigneeName, setAssigneeName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const managerDept = "النظافة والمخلفات";

  useEffect(() => {
    const q = query(
      collection(db, 'reports'),
      where('department', '==', managerDept)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Report));
      setReports(docs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }, error => {
       handleFirestoreError(error, OperationType.GET, 'reports');
    });

    return () => unsubscribe();
  }, []);

  const handleReopen = async (reportId: string) => {
    if (!managerNote.trim()) {
      toast.error('يجب إدخال سبب إعادة الفتح');
      return;
    }
    setIsUpdating(true);
    try {
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, {
        status: 'pending_official',
        reroutedReason: 'أعاد المدير فتحه: ' + managerNote,
        updatedAt: new Date().toISOString()
      });
      toast.success('تم إعادة فتح البلاغ وإرجاعه للقسم الميداني');
      setSelectedReport(null);
      setManagerNote("");
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'reports');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAssign = async (reportId: string) => {
    if (!assigneeName.trim()) {
      toast.error('يجب كتابة اسم أو كود الموظف');
      return;
    }
    setIsUpdating(true);
    try {
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, {
        assignee: assigneeName,
        updatedAt: new Date().toISOString()
      });
      toast.success(`تم تعيين البلاغ للموظف: ${assigneeName}`);
      setAssigneeName("");
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'reports');
    } finally {
      setIsUpdating(false);
    }
  };

  const performanceData = [
    { name: 'السبت', complete: 85, target: 80 },
    { name: 'الأحد', complete: 70, target: 80 },
    { name: 'الاثنين', complete: 92, target: 80 },
    { name: 'الثلاثاء', complete: 88, target: 80 },
    { name: 'الأربعاء', complete: 95, target: 80 },
  ];

  const handleStartWork = async (reportId: string) => {
    setIsUpdating(true);
    try {
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, {
        status: 'in_progress',
        updatedAt: new Date().toISOString()
      });
      toast.success('تم تحويل البلاغ إلى قيد التنفيذ');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'reports');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleResolve = async (reportId: string) => {
    setIsUpdating(true);
    try {
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, {
        status: 'resolved_pending_rating',
        resolutionImageUrl: "https://images.unsplash.com/photo-1590552515252-3a5a1bce7f91?auto=format&fit=crop&q=80&w=800",
        updatedAt: new Date().toISOString()
      });
      toast.success('تم إغلاق البلاغ (اعتماد إنجاز الإدارة)');
      setSelectedReport(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'reports');
    } finally {
      setIsUpdating(false);
    }
  };

  const departmentComparison = [
    { dept: 'الطرقات', rate: 92, time: '٤.٥ ساعة' },
    { dept: 'النظافة (أنت)', rate: 78, time: '٦.٢ ساعة' },
    { dept: 'الكهرباء', rate: 85, time: '٥.١ ساعة' },
  ];

  const avgResponseTime = "٦.٢ س";
  const resolvedCount = reports.filter(r => r.status.startsWith('resolved')).length;
  const lateCount = reports.filter(r => r.status === 'in_progress' || r.status === 'pending_official').length;

  const mainStats = [
    { label: "معدل الإنجاز", value: "٧٨٪", trend: "+٥٪", icon: Target, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "زمن الاستجابة", value: avgResponseTime, trend: "-١٢٪", icon: Clock, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "البلاغات المتأخرة", value: lateCount.toString(), trend: "+٢", icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-50" },
  ];

  const getStatusBadge = (status: string) => {
    if (status.startsWith('resolved')) return <span className="bg-emerald-100 text-emerald-700 px-2 py-1 mx-2 rounded-xl text-[10px]">مكتمل</span>;
    if (status === 'in_progress') return <span className="bg-amber-100 text-amber-700 px-2 py-1 mx-2 rounded-xl text-[10px]">قيد المعالجة</span>;
    return <span className="bg-blue-100 text-blue-700 mx-2 px-2 py-1 rounded-xl text-[10px]">جديد/مُحال</span>;
  };

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-slate-50 min-h-[85vh] rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-slate-900 to-slate-800 -z-10"></div>
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10 pt-4">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-2xl">
            <BarChart3 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white font-readex">لوحة مدير الإدارة - {managerDept}</h2>
            <p className="text-slate-300 mt-1 font-bold">قياس الأداء، تخصيص الموارد للفرق، ومراقبة جودة الإنجاز.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-2xl text-white text-sm font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">
                <Download className="w-4 h-4" />
                تصدير إحصائيات الفريق
            </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {mainStats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex items-center justify-between group"
          >
            <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-7 h-7" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-lg ${stat.trend.startsWith('+') && stat.icon !== AlertCircle ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {stat.trend}
                        </span>
                    </div>
                </div>
            </div>
            <TrendingUp className={`w-10 h-10 ${stat.trend.startsWith('+') && stat.icon !== AlertCircle ? 'text-emerald-50' : 'text-rose-50'} group-hover:scale-125 transition-transform`} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Real-time Analytics Chart and Dept Comparison */}
        <div className="lg:col-span-8 flex flex-col gap-8">
            <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col gap-8 flex-1">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-black text-slate-900 font-readex">كفاءة مسار البلاغات</h3>
                    </div>
                </div>
                <div className="flex-1 w-full min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={performanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 700, fontSize: 10 }} dy={10} />
                            <YAxis hide />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} cursor={{ fill: '#f8fafc' }} />
                            <Bar dataKey="target" fill="#f1f5f9" radius={[10, 10, 10, 10]} barSize={20} />
                            <Bar dataKey="complete" fill="#2563eb" radius={[10, 10, 10, 10]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>
            
            <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-6 font-readex flex items-center gap-3">
                    <PieChart className="w-6 h-6 text-blue-600" />مؤشر التنافسية (الإدارات الأخرى)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {departmentComparison.map(dept => (
                        <div key={dept.dept} className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100">
                            <h4 className="font-black text-slate-800 mb-4">{dept.dept}</h4>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-[10px] text-slate-500 font-bold mb-1">
                                        <span>الأداء العام</span><span>{dept.rate}%</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${dept.rate}%` }} className="h-full bg-blue-600"></motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>

        {/* Action Sidebar: Team tracking and Assigning */}
        <div className="lg:col-span-4 space-y-8">
            <section className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm flex flex-col gap-6 h-[800px]">
                <h4 className="text-sm font-black text-slate-800 tracking-widest uppercase mb-2 flex items-center justify-between">
                    سجل البلاغات الميدانية
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs">{reports.length}</span>
                </h4>
                
                <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                    {reports.length === 0 && <p className="text-slate-400 text-center py-4 font-bold text-sm">لا توجد سجلات</p>}
                    {reports.map((report) => (
                        <div key={report.id} className="border border-slate-100 bg-slate-50 rounded-2xl overflow-hidden shadow-sm">
                            <div 
                                onClick={() => setSelectedReport(selectedReport?.id === report.id ? null : report)}
                                className="p-4 cursor-pointer hover:bg-slate-100 transition-colors"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-black text-slate-900 line-clamp-1">{report.description}</span>
                                </div>
                                <div className="flex gap-2">
                                     {getStatusBadge(report.status)}
                                    <span className="text-[10px] font-bold text-slate-400 self-center">{(report as any).assignee || 'غير معين'}</span>
                                </div>
                            </div>

                            <AnimatePresence>
                                {selectedReport?.id === report.id && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }} 
                                        animate={{ height: 'auto', opacity: 1 }} 
                                        exit={{ height: 0, opacity: 0 }}
                                        className="bg-white px-4 pb-4 border-t border-slate-100"
                                    >
                                        <div className="pt-4 space-y-4">
                                             {report.status.startsWith('resolved') ? (
                                                <div className="space-y-2">
                                                    <p className="text-xs font-bold text-slate-500 mb-2">إعادة فتح البلاغ بسبب سوء التقييم أو عدم الكفاية</p>
                                                    <input 
                                                      type="text" 
                                                      placeholder="سبب إعادة الفتح" 
                                                      value={managerNote}
                                                      onChange={e => setManagerNote(e.target.value)}
                                                      className="w-full bg-slate-50 px-3 py-2 rounded-xl text-xs font-bold outline-none border focus:border-amber-400"
                                                    />
                                                    <button 
                                                      onClick={() => handleReopen(report.id)}
                                                      disabled={isUpdating}
                                                      className="w-full bg-amber-50 text-amber-700 py-2 rounded-xl text-xs font-black hover:bg-amber-100 flex items-center justify-center gap-2"
                                                    >
                                                      <RotateCw className="w-3 h-3" /> إرجاع للقسم الميداني
                                                    </button>
                                                </div>
                                             ) : (
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <p className="text-xs font-bold text-slate-500 mb-2">تعيين موظف/فريق ميداني محدد</p>
                                                        <div className="flex gap-2">
                                                          <input 
                                                            type="text" 
                                                            placeholder="اسم الموظف" 
                                                            value={assigneeName}
                                                            onChange={e => setAssigneeName(e.target.value)}
                                                            className="w-full bg-slate-50 px-3 py-2 rounded-xl text-xs font-bold outline-none border focus:border-blue-400"
                                                          />
                                                          <button 
                                                            onClick={() => handleAssign(report.id)}
                                                            disabled={isUpdating}
                                                            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-blue-700 shrink-0"
                                                          >
                                                            تعيين
                                                          </button>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="border-t border-slate-100 pt-4 flex gap-2">
                                                        {report.status === 'pending_official' && (
                                                            <button 
                                                                onClick={() => handleStartWork(report.id)}
                                                                disabled={isUpdating}
                                                                className="flex-1 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-black hover:bg-emerald-100 transition-all text-center"
                                                            >
                                                                البدء بالتنفيذ
                                                            </button>
                                                        )}
                                                        {report.status === 'in_progress' && (
                                                            <button 
                                                                onClick={() => handleResolve(report.id)}
                                                                disabled={isUpdating}
                                                                className="flex-1 py-2 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-slate-800 transition-all text-center flex items-center justify-center gap-2"
                                                            >
                                                                <CheckCircle2 className="w-3 h-3" />
                                                                معالجة وإغلاق
                                                            </button>
                                                        )}
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
            </section>
        </div>
      </div>
    </div>
  );
}
