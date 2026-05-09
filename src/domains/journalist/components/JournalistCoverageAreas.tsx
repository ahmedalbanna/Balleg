import React from "react";
import { motion } from "motion/react";
import { MapPin, Search, Filter, Globe, Navigation, Activity, ShieldCheck, Map, Plus, ArrowRight } from "lucide-react";

export const JournalistCoverageAreas: React.FC = () => {
    const areas = [
        { id: "COV-001", name: "صنعاء - البلدة القديمة", status: "Critical", activity: "High", risk: "Severe" },
        { id: "COV-002", name: "تعز - الجبهة الشرقية", status: "Active", activity: "Medium", risk: "Extreme" },
        { id: "COV-003", name: "عدن - المنطقة الحرة", status: "Stable", activity: "Low", risk: "Safe" },
        { id: "COV-004", name: "مأرب - الوادي", status: "Active", activity: "High", risk: "Moderate" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Globe className="w-8 h-8 text-teal-600" />
                        مناطق التغطية
                    </h2>
                    <p className="text-slate-500 font-bold italic">تتبع المواقع الجغرافية للتغطية الصحفية، تقييم المخاطر الميدانية، وتنسيق حركة المراسلين</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-teal-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-teal-500/20 active:scale-95 leading-none">
                        <Plus className="w-4 h-4" />
                        إضافة موقع تغطية
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "المناطق النشطة", val: "١٨", color: "teal", icon: MapPin },
                    { label: "بلاغات الخطر", val: "٠٥", color: "rose", icon: ShieldCheck },
                    { label: "المراسلون في الميدان", val: "١٢", color: "blue", icon: Navigation },
                    { label: "مستوى النشاط", val: "٨٤٪", color: "amber", icon: Activity },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{stat.label}</span>
                            <h3 className="text-3xl font-black text-slate-900 mt-1 font-mono tracking-tighter uppercase">{stat.val}</h3>
                        </div>
                        <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                            <stat.icon className="w-7 h-7" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[48px] border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="relative flex-1 group">
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="البحث عن مدينة، حي، أو منطقة صراع..." 
                            className="w-full py-5 pr-16 pl-8 bg-slate-50 border-transparent rounded-[30px] focus:bg-white focus:ring-4 focus:ring-teal-50 focus:border-teal-200 outline-none transition-all font-medium italic"
                        />
                    </div>
                    <button className="p-5 bg-slate-50 rounded-[24px] text-slate-400 hover:text-teal-600 transition-all">
                        <Filter className="w-6 h-6" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                    {areas.map((area, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-[48px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all group p-8 border-t-4 border-t-teal-500"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-[0.2em] ${
                                    area.risk === 'Extreme' ? 'bg-rose-50 text-rose-600 animate-pulse' : 
                                    area.risk === 'Severe' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                                }`}>
                                    Risk: {area.risk}
                                </div>
                                <span className="text-[10px] font-black font-mono text-slate-300">{area.id}</span>
                            </div>

                            <h4 className="text-2xl font-black text-slate-900 italic tracking-tight uppercase leading-none mb-4">{area.name}</h4>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-3xl">
                                    <span className="text-[10px] font-black text-slate-400 uppercase italic">حالة التغطية</span>
                                    <span className="text-xs font-black text-slate-800">{area.status}</span>
                                </div>
                                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-3xl">
                                    <span className="text-[10px] font-black text-slate-400 uppercase italic">النشاط الصحفي</span>
                                    <span className="text-xs font-black text-teal-600">{area.activity}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                <div className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-400 italic">
                                    <Map className="w-4 h-4 text-teal-500" />
                                    عرض التفاصيل
                                </div>
                                <button className="p-4 bg-slate-50 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-2xl transition-all">
                                    <ArrowRight className="w-5 h-5 rotate-180" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
