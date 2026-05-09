import React from "react";
import { motion } from "motion/react";
import { Cpu, Server, Database, Globe, Shield, RefreshCcw, Activity, Zap, Share2, Clock, Settings2 } from "lucide-react";

export const TelecomCoreNetwork: React.FC = () => {
    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">Core Infrastructure</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">إدارة الشبكة المركزية وعقد التبادل الرئيسية</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-emerald-600 text-white flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-200">
                        <RefreshCcw className="w-4 h-4" />
                        Force Sync
                    </button>
                    <button className="bg-white border border-slate-100 p-3 rounded-2xl shadow-sm text-slate-900 hover:bg-slate-50">
                        <Settings2 className="w-5 h-5 flex shrink-0" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                    { title: "Gateway Nodes", icon: Globe, status: "Healthy", load: 64, details: "12 active gateways" },
                    { title: "Switching Centers", icon: Cpu, status: "High Load", load: 92, details: "8 core switches" },
                    { title: "Data Centers", icon: Database, status: "Healthy", load: 45, details: "4 regional DCs" },
                ].map((core, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[4rem] border border-slate-100 shadow-xl overflow-hidden relative group"
                    >
                        <div className="flex justify-between items-start mb-8">
                             <div className="p-5 rounded-[2rem] bg-slate-50 text-blue-600 group-hover:scale-110 transition-transform">
                                <core.icon className="w-8 h-8" />
                             </div>
                             <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                 core.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                             }`}>
                                 {core.status}
                             </span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 italic mb-1">{core.title}</h3>
                        <p className="text-xs font-bold text-slate-400 mb-8">{core.details}</p>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                                <span>Utilization</span>
                                <span>{core.load}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${core.load}%` }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className={`h-full ${core.load > 85 ? 'bg-rose-500' : 'bg-blue-500'}`}
                                />
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                             <button className="text-[10px] font-black uppercase italic text-blue-600 hover:translate-x-2 transition-transform">View Architecture →</button>
                             <Share2 className="w-4 h-4 text-slate-300" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-slate-900 rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-black italic tracking-tighter">Security & Firewall Status</h2>
                        <p className="text-slate-400 font-bold max-w-md">تتم مراقبة كافة حزم البيانات عبر جدران الحماية المتقدمة وأنظمة اكتشاف التسلل في الزمن الحقيقي.</p>
                        <div className="flex items-center gap-8 py-4">
                            <div className="text-center">
                                <p className="text-3xl font-black text-emerald-400">0</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">Active Threats</p>
                            </div>
                            <div className="w-px h-12 bg-slate-800" />
                            <div className="text-center">
                                <p className="text-3xl font-black text-blue-400">4.2M</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">Blocked Req/Min</p>
                            </div>
                        </div>
                        <button className="bg-white text-slate-900 px-8 py-4 rounded-3xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">
                            Security Dashboard
                        </button>
                    </div>
                    <div className="bg-white/5 rounded-[3rem] p-8 border border-white/10 space-y-6">
                        <div className="flex items-center gap-4">
                            <Shield className="w-10 h-10 text-blue-400" />
                            <div>
                                <h4 className="text-lg font-black uppercase italic">Protocol Integrity</h4>
                                <p className="text-[10px] font-black text-slate-500 tracking-widest">ENABLED - FULL PROTECTION</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[1,2,3].map((v) => (
                                <div key={v} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                                     <span className="text-xs font-bold text-slate-300">Packet Filtering Node 0{v}</span>
                                     <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-[10px] font-black text-slate-500">ACTIVE</span>
                                     </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const TelecomMaintenance: React.FC = () => {
    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">صيانة المحطات</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">جدولة ومتابعة أعمال الصيانة الوقائية والطارئة</p>
                </div>
                <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
                    Generate Maintenance Plan
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-[3rem] border border-slate-100 p-8 shadow-xl">
                    <h3 className="text-xl font-black italic mb-8 flex items-center gap-3">
                        <Clock className="w-6 h-6 text-blue-600" />
                        الصيانة المجدولة للأسبوع الحالي
                    </h3>
                    <div className="space-y-6">
                        {[
                            { site: "Sana'a Central", date: "May 12", type: "Generator Check", technician: "Ahmed M.", status: "Soon" },
                            { site: "Taiz Tower 04", date: "May 14", type: "AC Replacement", technician: "Sami Y.", status: "Soon" },
                            { site: "Aden Base 01", date: "May 15", type: "Security Upgrade", technician: "Laila H.", status: "Pending" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-white">
                                <div className="flex items-center gap-6">
                                    <div className="text-center bg-white p-3 rounded-2xl min-w-[70px] shadow-sm">
                                        <p className="text-[10px] font-black text-slate-400 uppercase">{item.date.split(' ')[0]}</p>
                                        <p className="text-xl font-black text-slate-900">{item.date.split(' ')[1]}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 italic">{item.site}</h4>
                                        <p className="text-xs font-bold text-slate-500">{item.type} • {item.technician}</p>
                                    </div>
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                    item.status === 'Soon' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-200 text-slate-600'
                                }`}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] border border-slate-100 p-8 shadow-xl flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-black italic mb-2">إحصائيات الصيانة</h3>
                        <p className="text-slate-400 text-xs font-bold mb-8">نظرة عامة على كفاءة أعمال الصيانة</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6 pb-8">
                        <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
                            <p className="text-4xl font-black text-emerald-600">92%</p>
                            <p className="text-[10px] font-black uppercase text-emerald-700 tracking-widest mt-2">Planned Success</p>
                        </div>
                        <div className="bg-rose-50 rounded-3xl p-8 border border-rose-100">
                            <p className="text-4xl font-black text-rose-600">8.4h</p>
                            <p className="text-[10px] font-black uppercase text-rose-700 tracking-widest mt-2">Avg. Resolution Time</p>
                        </div>
                    </div>
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex items-center justify-between">
                         <div className="relative z-10">
                            <h4 className="text-lg font-black italic">طلب معدات طارئة</h4>
                            <p className="text-xs text-slate-400 font-bold mt-1">تواصل مسبق مع المستودع المركزي</p>
                         </div>
                         <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl relative z-10 transition-transform active:scale-95">
                            Order Now
                         </button>
                         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};
