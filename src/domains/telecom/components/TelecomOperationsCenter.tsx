import React from "react";
import { motion } from "motion/react";
import { Activity, Shield, Zap, Globe, Cpu, Server, BarChart3, Radio } from "lucide-react";

export const TelecomOperationsCenter: React.FC = () => {
  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">مركز العمليات | <span className="text-blue-600 uppercase">NOC</span></h1>
          <p className="text-slate-500 font-medium text-sm mt-1">المراقبة اللحظية لأداء الشبكة الوطنية</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl border border-emerald-100 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-widest">System Stable</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { label: "حركة البيانات", val: "4.2 Tbps", icon: Activity, color: "text-blue-600" },
            { label: "المكالمات النشطة", val: "1.2M", icon: Radio, color: "text-indigo-600" },
            { label: "استقرار الشبكة", val: "99.98%", icon: Shield, color: "text-emerald-600" },
            { label: "استهلاك الطاقة", val: "842 KW", icon: Zap, color: "text-amber-600" },
        ].map((stat, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-4"
            >
                <div className={`p-4 rounded-2xl bg-slate-50 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{stat.label}</p>
                    <p className="text-xl font-black text-slate-900">{stat.val}</p>
                </div>
            </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-[3rem] border border-slate-100 shadow-xl p-8 relative overflow-hidden h-[500px]">
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
            <h3 className="text-lg font-black text-slate-900 mb-6 relative z-10">خريطة الأحمال المباشرة</h3>
            <div className="w-full h-full flex items-center justify-center relative z-10">
                <div className="text-center">
                    <Globe className="w-32 h-32 text-slate-100 animate-spin-slow mb-4 mx-auto" />
                    <p className="text-slate-400 font-bold italic">جاري تحميل البيانات الحية للمواقع...</p>
                </div>
            </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <h3 className="text-lg font-black italic mb-6">توزيع الموارد الأساسية</h3>
                <div className="space-y-6">
                    {[
                        { label: "الشبكة المركزية", p: 78, color: "bg-blue-400" },
                        { label: "محطات الإرسال", p: 92, color: "bg-emerald-400" },
                        { label: "البنية التحتية", p: 45, color: "bg-amber-400" },
                        { label: "السحابة الخاصة", p: 64, color: "bg-purple-400" },
                    ].map((item, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <span>{item.label}</span>
                                <span>{item.p}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.p}%` }}
                                    transition={{ duration: 1, delay: i * 0.2 }}
                                    className={`h-full ${item.color}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-100 p-8 shadow-xl">
                 <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                    <Server className="w-5 h-5 text-blue-600" />
                    خوادم التحكم
                 </h3>
                 <div className="space-y-4">
                    {[1,2,3].map((s) => (
                        <div key={s} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                             <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-xs font-bold text-slate-700">Cluster 0{s}-Node</span>
                             </div>
                             <span className="text-[10px] font-black text-slate-400">ONLINE</span>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};
