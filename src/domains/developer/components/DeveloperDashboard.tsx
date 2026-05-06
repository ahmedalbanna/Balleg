import { Terminal, Activity, Cpu, Server, Code2, Bug, Zap, Database, Search, Filter, MessageSquare, AlertTriangle, ShieldCheck, ExternalLink, GitBranch, Github } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export function DeveloperDashboard() {
  const [activeTab, setActiveTab] = useState("api");

  const apiPerformance = [
    { time: "00:00", latency: 45 },
    { time: "04:00", latency: 42 },
    { time: "08:00", latency: 85 },
    { time: "12:00", latency: 120 },
    { time: "16:00", latency: 95 },
    { time: "20:00", latency: 50 },
  ];

  const recentLogs = [
    { id: 1, type: "error", msg: "Failed to sync Firestore indices", time: "٢ دقيقة" },
    { id: 2, type: "warn", msg: "High latency detected in Node-A", time: "١٤ دقيقة" },
    { id: 3, type: "info", msg: "Deployment successful: v2.4.1", time: "١ ساعة" },
  ];

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-slate-950 min-h-[85vh] rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden text-slate-300">
      {/* Matrix-like Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shadow-2xl shadow-blue-500/10">
            <Terminal className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white font-readex tracking-tight italic">DevOps Command Center</h2>
            <p className="text-slate-500 mt-1 font-mono text-[11px] uppercase tracking-widest">System Health & API Integrity Monitoring</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="flex gap-2">
                <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400">PROD-NORTH: 1.2s</span>
                </div>
                <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-[10px] font-mono text-blue-400">BUILD: v2.4.1-STABLE</span>
                </div>
            </div>
            <button className="px-6 py-3 bg-white text-slate-950 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all font-readex">
                دخول خط الأوامر
            </button>
        </div>
      </header>

      {/* Cluster Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        {[
            { label: "حمل الـ CPU", value: "٢٤٪", icon: Cpu, color: "text-blue-400" },
            { label: "استهلاك الذاكرة", value: "٤.٢GB", icon: Database, color: "text-purple-400" },
            { label: "طلبات الـ API", value: "٨٥k/s", icon: Zap, color: "text-amber-400" },
            { label: "وقت التشغيل", value: "٩٩.٩٪", icon: ShieldCheck, color: "text-emerald-400" },
        ].map((stat, i) => (
            <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900/50 p-6 rounded-[2.5rem] border border-slate-800 group hover:border-blue-500/50 transition-all"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-5 h-5" />
                    </div>
                </div>
                <p className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-xl font-black text-white">{stat.value}</p>
            </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Performance Visualization */}
        <div className="lg:col-span-8 bg-slate-900/50 rounded-[3rem] border border-slate-800 flex flex-col overflow-hidden">
            <div className="p-8 border-b border-slate-800 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-widest italic">API Latency Pulse (ms)</h3>
                    <p className="text-[10px] text-slate-500 font-mono mt-1">Real-time request duration across regional gateways</p>
                </div>
                <div className="flex gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black"> latency</button>
                    <button className="px-4 py-2 text-slate-500 rounded-xl text-[10px] font-black"> traffic</button>
                </div>
            </div>
            <div className="flex-1 p-8 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={apiPerformance}>
                        <defs>
                            <linearGradient id="colorLat" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} />
                        <Area type="monotone" dataKey="latency" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorLat)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="p-8 bg-slate-950 border-t border-slate-800 flex items-center gap-8">
                <div className="flex items-center gap-3">
                    <GitBranch className="w-4 h-4 text-slate-500" />
                    <span className="text-[10px] font-mono">BRANCH: main</span>
                </div>
                <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-slate-500" />
                    <span className="text-[10px] font-mono">LAST COMMIT: [a7f2d1e]</span>
                </div>
            </div>
        </div>

        {/* Technical Logs & Bugs */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-slate-900/50 rounded-[3rem] p-8 border border-slate-800 flex-1">
                <div className="flex items-center justify-between mb-8">
                    <h4 className="text-xs font-black text-white uppercase tracking-widest">Real-time System Logs</h4>
                    <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
                </div>
                <div className="space-y-4">
                    {recentLogs.map(log => (
                        <div key={log.id} className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 font-mono">
                            <div className="flex justify-between items-center mb-2">
                                <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${
                                    log.type === 'error' ? 'bg-rose-500/20 text-rose-400' : 
                                    log.type === 'warn' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                                }`}>
                                    {log.type}
                                </span>
                                <span className="text-[9px] text-slate-600">{log.time}</span>
                            </div>
                            <p className="text-[10px] text-slate-300 leading-relaxed font-mono">
                                <span className="text-slate-600 mr-2">root@belligh:~$</span>
                                {log.msg}
                            </p>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-6 py-3 bg-slate-800 text-slate-400 rounded-xl text-[10px] font-black hover:bg-slate-700 transition-all border border-slate-700">
                    مشاهدة كافة السجلات (Logs)
                </button>
            </div>

            <div className="bg-blue-600 rounded-[3rem] p-8 text-white relative overflow-hidden group shadow-[0_20px_50px_rgba(59,130,246,0.3)]">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-45 transition-transform duration-1000">
                    <Bug className="w-24 h-24" />
                </div>
                <h4 className="text-xl font-black mb-2 font-readex">الديون التقنية والنموذج</h4>
                <p className="text-[11px] font-bold text-blue-100 leading-relaxed mb-6">
                    نحن الآن في المرحلة التجريبية. مراجعة البلاغات البشرية (Verifier Role) ستتحول تدريجياً لذكاء اصطناعي (AI Inference) بمجرد جمع البيانات الكافية.
                </p>
                <div className="flex items-center gap-3 bg-white/20 p-4 rounded-2xl border border-white/20">
                    <div className="flex-1">
                        <div className="flex justify-between text-[8px] font-black uppercase mb-1">
                            <span>Training Dataset Progress</span>
                            <span>٤٥٪</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="w-[45%] h-full bg-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Shared Components Disclaimer */}
      <div className="mt-8 p-6 bg-slate-900/80 border border-slate-800 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <Code2 className="w-6 h-6 text-slate-500" />
            <p className="text-[10px] font-bold text-slate-500 leading-relaxed">
                استخدام مكونات تصميم موحدة (Domain/Shared) لجميع الأدوار لضمان هوية العلامة التجارية "بلّغ" مع تخصيص الـ Theme لكل دور.
            </p>
        </div>
        <button className="px-6 py-2 bg-slate-800 border border-slate-700 text-slate-400 rounded-xl text-[10px] font-black hover:text-white transition-all">
            سجل التغييرات (Dev Changelog)
        </button>
      </div>
    </div>
  );
}
