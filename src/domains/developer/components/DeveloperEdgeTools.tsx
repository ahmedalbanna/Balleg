import React from "react";
import { motion } from "motion/react";
import { Terminal, Cpu, Zap, Activity, HardDrive, Shield, Search, Filter, ChevronLeft, Download, ExternalLink, Code2 } from "lucide-react";

export const DeveloperEdgeTools: React.FC = () => {
  const tools = [
    { id: "EDGE-01", name: "Ollama Gateway", status: "Running", latency: "12ms", uptime: "99.9%", version: "v2.5.1" },
    { id: "EDGE-02", name: "MQTT Broker", status: "Running", latency: "5ms", uptime: "100%", version: "v5.0" },
    { id: "EDGE-03", name: "Asset Proxy", status: "Degraded", latency: "145ms", uptime: "98.2%", version: "v1.2" },
    { id: "EDGE-04", name: "Auth Validator", status: "Running", latency: "8ms", uptime: "99.9%", version: "v3.0.4" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 font-sans animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
            <Terminal className="w-8 h-8 text-indigo-600" />
            الأدوات الطرفية
          </h2>
          <p className="text-slate-500 font-medium italic">إدارة خدمات الحافة (Edge Services)، البوابات الذكية، ووحدات المعالجة المحلية</p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
                <Zap className="w-4 h-4" />
                تحديث كافة الأدوات
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'الخدمات النشطة', val: '٠٨', color: 'bg-emerald-50 text-emerald-600', icon: Activity },
          { label: 'وقت الاستجابة', val: '١٢.٤ms', color: 'bg-blue-50 text-blue-600', icon: Zap },
          { label: 'استهلاك المعالج', val: '٣٤٪', color: 'bg-indigo-50 text-indigo-600', icon: Cpu },
          { label: 'سعة الذاكرة', val: '١.٢GB', color: 'bg-slate-100 text-slate-600', icon: HardDrive },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-lg transition-all">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1 font-mono">{stat.val}</h3>
            </div>
            <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md group">
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="البحث في سجل الخدمات الطرفية..." 
                    className="w-full py-4 pr-14 pl-6 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none transition-all font-medium"
                />
            </div>
            <div className="flex gap-2">
                <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all">
                    <Filter className="w-6 h-6" />
                </button>
            </div>
        </div>

        <div className="divide-y divide-slate-50">
            {tools.map((tool, idx) => (
                <div key={idx} className="p-8 hover:bg-slate-50/50 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-8 group cursor-pointer">
                    <div className="flex items-start gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                            tool.status === 'Running' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                            <Cpu className="w-7 h-7" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">{tool.id} • {tool.version}</span>
                                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ${
                                    tool.status === 'Running' ? 'bg-emerald-500 text-white' : 'bg-rose-600 text-white animate-pulse'
                                }`}>
                                    {tool.status}
                                </span>
                            </div>
                            <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors italic tracking-tight">{tool.name}</h4>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="text-xs font-bold text-slate-400 italic flex items-center gap-2 font-mono">
                                    Latency: {tool.latency}
                                </div>
                                <div className="text-xs font-bold text-slate-400 italic flex items-center gap-2 font-mono">
                                    Uptime: {tool.uptime}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all">
                             <Activity className="w-4 h-4" />
                        </button>
                        <button className="px-6 py-3 bg-white border-2 border-slate-100 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center gap-3 group/btn">
                             Console
                            <Code2 className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
