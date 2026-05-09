import React from "react";
import { motion } from "motion/react";
import { Map, MapPin, Search, Filter, Box, Layers, Navigation, Info, Activity, Maximize2, ShieldCheck } from "lucide-react";
import NeighborhoodMapView from "./NeighborhoodMapView";

export const NeighborhoodDistricts: React.FC = () => {
    const districts = [
        { id: "DIS-A", name: "مربع الزهور", population: "١,٢٤٠", risk: "Low", activity: "High" },
        { id: "DIS-B", name: "مربع الصمود", population: "٣,٨٥٠", risk: "Medium", activity: "Medium" },
        { id: "DIS-C", name: "المربع التجاري", population: "٩٢٠", risk: "High", activity: "Severe" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in slide-in-from-bottom-4 duration-1000 pb-24 lg:pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Map className="w-8 h-8 text-emerald-600" />
                        خارطة المربعات
                    </h2>
                    <p className="text-slate-500 font-bold italic">التوزيع الجغرافي للحي، إدارة المربعات السكنية، ومراقبة الكثافة السكانية والاحتياجات</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-emerald-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 leading-none">
                        تحديث الخارطة
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-[56px] border border-slate-100 shadow-2xl overflow-hidden h-[600px] relative">
                         <NeighborhoodMapView 
                            points={[]} 
                            center={[15.3694, 44.191]} 
                            zoom={15}
                         />
                         <div className="absolute top-8 left-8 z-10 flex flex-col gap-3">
                            <button className="p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl text-slate-900 hover:text-emerald-600 transition-all">
                                <Layers className="w-6 h-6" />
                            </button>
                            <button className="p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl text-slate-900 hover:text-emerald-600 transition-all">
                                <Navigation className="w-6 h-6" />
                            </button>
                         </div>
                    </div>

                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden p-10">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="font-black text-slate-900 italic uppercase">تفاصيل المربعات</h3>
                            <button className="p-3 bg-slate-50 rounded-xl text-slate-300 hover:text-slate-900 transition-all">
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {districts.map((item, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ y: -10 }}
                                    className="bg-white rounded-[40px] border border-slate-100 p-8 hover:shadow-2xl transition-all group overflow-hidden relative"
                                >
                                    <div className={`absolute -bottom-6 -right-6 w-24 h-24 bg-${item.risk === 'High' ? 'rose' : 'emerald'}-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform`} />
                                    <div className="flex justify-between items-start mb-6">
                                        <Box className="w-10 h-10 text-emerald-600 group-hover:scale-110 transition-transform" />
                                        <span className="text-[10px] font-black font-mono text-slate-300 italic">{item.id}</span>
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 italic tracking-tight uppercase leading-none mb-4">{item.name}</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase italic text-slate-400">
                                            <span>السكان</span>
                                            <span className="text-slate-900">{item.population}</span>
                                        </div>
                                        <div className={`text-[8px] font-black uppercase px-2 py-1 rounded inline-block ${
                                            item.risk === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                                        }`}>
                                            Risk: {item.risk}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                     <div className="bg-slate-900 rounded-[56px] p-12 text-white shadow-2xl relative overflow-hidden group">
                        <Activity className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-1000" />
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-tight mb-10">إحصائيات المربعات</h3>
                        <div className="space-y-8 relative z-10">
                            {[
                                { label: "إجمالي المربعات", val: "١٤", icon: Box, color: "emerald" },
                                { label: "المربعات المزدحمة", val: "٠٤", icon: Activity, color: "rose" },
                                { label: "نسبة التغطية الميدانية", val: "٩٢٪", icon: ShieldCheck, color: "blue" },
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center gap-6 group/item">
                                    <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-${stat.color}-400 group-hover/item:bg-white/10 transition-all`}>
                                        <stat.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{stat.label}</p>
                                        <h4 className="text-3xl font-black font-mono tracking-tighter">{stat.val}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 p-8 bg-white/5 rounded-3xl border border-white/10">
                            <p className="text-xs font-bold text-slate-400 italic">ملاحظة: يتم تحديث البيانات السكانية بشكل آلي بناءً على سجل السكان المربوط في النظام.</p>
                        </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-100 rounded-[56px] p-12 flex flex-col justify-between h-full">
                         <div className="space-y-6 text-center">
                            <Maximize2 className="w-16 h-16 text-emerald-600 mx-auto group-hover:rotate-45 transition-transform" />
                            <h3 className="text-2xl font-black italic uppercase text-emerald-900 tracking-tighter">تحسين التوزيع</h3>
                            <p className="text-emerald-800/60 font-medium italic">استخدم أدوات الذكاء الاصطناعي لتحسين توزيع الخبز والمساعدات بناءً على كثافة كل مربع سكني.</p>
                         </div>
                         <button className="w-full py-6 mt-12 bg-white text-emerald-600 rounded-[32px] font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-emerald-600 hover:text-white transition-all active:scale-95">
                            تشغيل المحلل الذكي
                         </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
