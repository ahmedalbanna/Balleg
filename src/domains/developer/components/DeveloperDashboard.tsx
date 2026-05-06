import { Terminal, Activity, Cpu, Server, Code2, Bug, Zap, Database, Search, Filter, MessageSquare, AlertTriangle, ShieldCheck, ExternalLink, GitBranch, Github, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../../core/services/firebase";

export function DeveloperDashboard() {
  const [activeTab, setActiveTab] = useState("api");
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
        const q = query(collection(db, 'audit_logs'), orderBy('createdAt', 'desc'), limit(10));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLogs(docs);
        }, (error) => handleFirestoreError(error, OperationType.LIST, 'audit_logs'));
        return () => unsubscribe();
  }, []);

  const apiPerformance = [
    { time: "00:00", latency: 45 },
    { time: "04:00", latency: 42 },
    { time: "08:00", latency: 85 },
    { time: "12:00", latency: 120 },
    { time: "16:00", latency: 95 },
    { time: "20:00", latency: 50 },
  ];

  const simulatedErrors = [
    { id: 1, type: "error", msg: "Failed to sync Firestore indices", time: "٢ دقيقة", details: "Index building timed out at 99%. Please retry using firebase CLI." },
    { id: 2, type: "warn", msg: "High latency detected in Node-A", time: "١٤ دقيقة", details: "Response time exceeded 2000ms threshold for Europe-west3." },
  ];

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-slate-50/10 min-h-[85vh] rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden text-slate-800">
      {/* Technical Grid Pattern Overlay (Light Mode) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 0)', backgroundSize: '30px 30px' }} />
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-sm">
            <Terminal className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex tracking-tight italic">DevOps Command Center</h2>
            <p className="text-slate-500 mt-1 font-mono text-[11px] uppercase tracking-widest font-bold">System Health & API Integrity Monitoring</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="flex gap-2">
                <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl flex items-center gap-2 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-600 font-bold">PROD-NORTH: 1.2s</span>
                </div>
                <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl flex items-center gap-2 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-[10px] font-mono text-blue-600 font-bold">BUILD: v2.4.1-STABLE</span>
                </div>
            </div>
            <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all font-readex shadow-lg shadow-slate-900/20">
                دخول خط الأوامر
            </button>
        </div>
      </header>

      {/* Cluster Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        {[
            { label: "حمل الـ CPU", value: "٢٤٪", icon: Cpu, color: "text-blue-500" },
            { label: "استهلاك الذاكرة", value: "٤.٢GB", icon: Database, color: "text-purple-500" },
            { label: "طلبات الـ API", value: "٨٥k/s", icon: Zap, color: "text-amber-500" },
            { label: "وقت التشغيل", value: "٩٩.٩٪", icon: ShieldCheck, color: "text-emerald-500" },
        ].map((stat, i) => (
            <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-blue-500/50 transition-all"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-5 h-5" />
                    </div>
                </div>
                <p className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-xl font-black text-slate-900">{stat.value}</p>
            </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Performance Visualization */}
        <div className="lg:col-span-8 bg-white rounded-[3rem] border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest italic leading-none">API Latency Pulse (ms)</h3>
                    <p className="text-[10px] text-slate-400 font-mono mt-1 font-bold">Real-time request duration across regional gateways</p>
                </div>
                <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black shadow-md"> latency</button>
                    <button className="px-4 py-2 text-slate-400 rounded-xl text-[10px] font-black hover:text-slate-600"> traffic</button>
                </div>
            </div>
            <div className="flex-1 p-8 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={apiPerformance}>
                        <defs>
                            <linearGradient id="colorLat" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '10px' }} />
                        <Area type="monotone" dataKey="latency" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorLat)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center gap-8">
                <div className="flex items-center gap-3">
                    <GitBranch className="w-4 h-4 text-slate-400" />
                    <span className="text-[10px] font-mono font-bold text-slate-500 tracking-tight">BRANCH: main (PRODUCTION-READ-ONLY)</span>
                </div>
                <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-slate-400" />
                    <span className="text-[10px] font-mono font-bold text-slate-500 tracking-tight">LAST COMMIT: [a7f2d1e]</span>
                </div>
            </div>
        </div>

        {/* Technical Logs & Bugs */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-[3rem] p-8 border border-slate-200 shadow-sm flex-1 flex flex-col h-[400px]">
                <div className="flex items-center justify-between mb-8">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Real-time System Logs</h4>
                    <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
                </div>
                <div className="space-y-4 overflow-y-auto flex-1 custom-scrollbar pr-2">
                    {simulatedErrors.map(log => (
                        <div key={log.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 font-mono group hover:bg-white hover:border-blue-200 transition-all">
                            <div className="flex justify-between items-center mb-2">
                                <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${
                                    log.type === 'error' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                                }`}>
                                    {log.type}
                                </span>
                                <span className="text-[9px] text-slate-400 font-bold">{log.time}</span>
                            </div>
                            <p className="text-[10px] text-slate-600 leading-relaxed font-mono font-bold">
                                <span className="text-slate-400 mr-2">$</span>
                                {log.msg}
                            </p>
                        </div>
                    ))}
                    {logs.map((log, idx) => (
                         <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 font-mono group hover:bg-white hover:border-emerald-200 transition-all">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[8px] font-black px-2 py-0.5 rounded uppercase bg-emerald-100 text-emerald-600">
                                    AUDIT
                                </span>
                                <span className="text-[9px] text-slate-400 font-bold">{new Date(log.createdAt).toLocaleTimeString()}</span>
                            </div>
                            <p className="text-[10px] text-slate-600 leading-relaxed font-mono font-bold">
                                <span className="text-slate-400 mr-2">$</span>
                                action={log.action} | entity={log.entity}
                            </p>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-6 py-3 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black hover:bg-slate-100 transition-all border border-slate-200">
                    مشاهدة كافة السجلات (Logs)
                </button>
            </div>

            <div className="bg-blue-600 rounded-[3rem] p-8 text-white relative overflow-hidden group shadow-xl shadow-blue-600/20">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                    <ShieldAlert className="w-24 h-24" />
                </div>
                <h4 className="text-xl font-black mb-2 font-readex">الديون التقنية</h4>
                <p className="text-[11px] font-bold text-blue-100 leading-relaxed mb-4">
                    تحسين أداء خوارزمية البحث الميداني (Pending).
                    <br/>
                    ربط نظام الإشعارات بمزود SMS (في انتظار الموافقات).
                </p>
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors rounded-xl text-[10px] font-black shadow-sm">
                    إدارة المهام (Jira)
                </button>
            </div>
        </div>
      </div>


      {/* Shared Components Disclaimer */}
      <div className="mt-8 p-6 bg-white border border-slate-200 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm relative z-10">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                <Code2 className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-slate-400 leading-relaxed uppercase tracking-wide">
                إطار عمل "بلّغ": واجهات الإدارة والمراقبة للمطورين - Production Read-Only.
            </p>
        </div>
        <button className="px-6 py-2 bg-slate-50 border border-slate-200 text-slate-500 rounded-xl text-[10px] font-black hover:bg-slate-100 transition-all font-mono">
            DEV_CHANGELOG_v2.4.1
        </button>
      </div>

    </div>
  );
}
