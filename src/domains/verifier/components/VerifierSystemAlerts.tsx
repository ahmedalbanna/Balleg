import React from "react";
import { motion } from "motion/react";
import { Bell, AlertTriangle, Zap, Info, Clock, CheckCircle2, RotateCcw, Eye, Settings, ShieldAlert } from "lucide-react";

export const VerifierSystemAlerts: React.FC = () => {
    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1200px] mx-auto pb-32">
             <div className="flex items-center justify-between pb-8 border-b-2 border-slate-100">
                <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">System Alerts</h1>
                <p className="text-slate-500 font-medium text-sm mt-2">مراقبة حالة أداء المنصة والتنبيهات التقنية</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-slate-900 text-white p-4 rounded-2xl shadow-xl transition-transform active:scale-95"><RotateCcw className="w-5 h-5" /></button>
                    <button className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm text-slate-400"><Settings className="w-5 h-5" /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { label: "Node Load", val: "٢٢٪", status: "Healthy", color: "text-emerald-500", bg: "bg-emerald-50" },
                    { label: "Latency", val: "١٤ms", status: "Optimal", color: "text-blue-500", bg: "bg-blue-50" },
                    { label: "Uptime", val: "٩٩.٩٩٪", status: "Verified", color: "text-indigo-500", bg: "bg-indigo-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex items-center justify-between">
                        <div>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                             <p className="text-2xl font-black text-slate-900 italic">{stat.val}</p>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${stat.bg} ${stat.color}`}>
                            {stat.status}
                        </span>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                {[
                    { id: "SYS-01", title: "Database Re-indexing Complete", type: "Info", time: "٥ د", desc: "تم تحديث فهارس البحث للأرشيف الموثق بنجاح." },
                    { id: "SYS-02", title: "API Endpoint High Latency", type: "Warning", time: "١٢ د", desc: "تأخر في استجابة بوابة الربط مع السجل المدني." },
                    { id: "SYS-03", title: "Critical Memory Usage Node-X", type: "Critical", time: "٤٥ د", desc: "استهلاك ذاكرة مرتفع في العقدة الفرعية للقطاع الشرقي." },
                ].map((alert, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-md flex items-center justify-between gap-10 group hover:border-slate-300 transition-all"
                    >
                        <div className="flex items-center gap-8 grow">
                            <div className={`p-6 rounded-[2rem] ${
                                alert.type === 'Critical' ? 'bg-rose-50 text-rose-600' :
                                alert.type === 'Warning' ? 'bg-amber-50 text-amber-600' :
                                'bg-blue-50 text-blue-600'
                            } group-hover:scale-110 transition-transform`}>
                                {alert.type === 'Critical' ? <ShieldAlert className="w-8 h-8" /> : 
                                 alert.type === 'Warning' ? <AlertTriangle className="w-8 h-8" /> : <Info className="w-8 h-8" />}
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-4">
                                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{alert.id}</span>
                                     <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase italic tracking-tighter">• System Log</span>
                                </div>
                                <h4 className="text-2xl font-black text-slate-900 italic tracking-tighter">{alert.title}</h4>
                                <p className="text-[13px] font-bold text-slate-400 max-w-lg">{alert.desc}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-3 shrink-0">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{alert.time} ago</span>
                            <div className="flex items-center gap-2">
                                <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-all"><Eye className="w-5 h-5" /></button>
                                <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-rose-600 transition-all"><Zap className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
