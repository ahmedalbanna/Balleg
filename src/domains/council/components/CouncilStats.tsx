import React from "react";
import { motion } from "motion/react";
import { BarChart3, TrendingUp, Users, Package, ShoppingBag, ArrowUpRight, ArrowDownRight, Target, Zap, Calendar } from "lucide-react";

export const CouncilStats: React.FC = () => {
    const mainStats = [
        { label: "إجمالي المستفيدين", value: "٤٢,٥٠٠", trend: "+١٢٪", color: "blue", icon: Users },
        { label: "الطرود الموزعة", value: "١٢٨,٠٠٠", trend: "+٨٪", color: "emerald", icon: Package },
        { label: "المشاريع المكتملة", value: "٨٤", trend: "+٥٪", color: "indigo", icon: Target },
        { label: "كفاءة التوزيع", value: "٩٦٪", trend: "+٢٪", color: "amber", icon: Zap },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">إحصائيات الإنجاز</h2>
                    <p className="text-slate-500 font-medium italic">تحليل البيانات الضخمة لقياس الأثر وتحسين جودة التدخلات الميدانية</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-100 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all text-slate-600 shadow-sm">
                        <Calendar className="w-4 h-4" />
                        الربع الحالي (Q2)
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {mainStats.map((stat, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
                    >
                        <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000`} />
                        <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-10 group-hover:bg-${stat.color}-600 group-hover:text-white transition-all duration-500`}>
                            <stat.icon className="w-8 h-8" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">{stat.label}</p>
                        <div className="flex items-baseline justify-between">
                            <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                            <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">
                                <ArrowUpRight className="w-3 h-3" />
                                {stat.trend}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-slate-900 rounded-[56px] p-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <header className="flex items-center justify-between mb-12">
                            <div>
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter">نمو عمليات المساعدة</h3>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1 italic">معدل التوزيع الأسبوعي للشحنات الإغاثية</p>
                            </div>
                            <BarChart3 className="w-8 h-8 text-indigo-400" />
                        </header>

                        <div className="h-64 flex items-end justify-between gap-6 px-4">
                            {[40, 75, 60, 95, 80, 110, 90, 120, 100].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                    <div className="w-full relative">
                                        <motion.div 
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h * 1.5}px` }}
                                            className={`w-full rounded-2xl bg-gradient-to-t ${i === 7 ? 'from-indigo-500 to-indigo-300 shadow-[0_0_40px_rgba(99,102,241,0.3)]' : 'from-white/10 to-white/5 opacity-50'} group-hover:opacity-100 transition-all`}
                                        />
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-slate-900 text-[10px] font-black px-2 py-1 rounded italic">+{h}%</div>
                                    </div>
                                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest italic">{i + 1} May</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -mr-48 -mt-48" />
                </div>

                <div className="bg-white rounded-[56px] p-12 border border-slate-100 shadow-xl flex flex-col justify-between group overflow-hidden">
                    <div>
                         <h3 className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter mb-4">كفاءة القطاعات</h3>
                         <div className="space-y-8 mt-12">
                             {[
                                 { label: 'الأمن الغذائي', pct: 92, color: 'emerald' },
                                 { label: 'المستلزمات الطبية', pct: 85, color: 'blue' },
                                 { label: 'الإيواء والمخيمات', pct: 78, color: 'rose' },
                                 { label: 'المياه والصرف', pct: 95, color: 'indigo' },
                             ].map((p, i) => (
                                 <div key={i} className="space-y-3">
                                     <div className="flex justify-between items-end">
                                         <span className="text-xs font-black text-slate-800 uppercase tracking-tight">{p.label}</span>
                                         <span className="text-[10px] font-black text-slate-400 italic">{p.pct}%</span>
                                     </div>
                                     <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                                         <motion.div 
                                             initial={{ width: 0 }}
                                             animate={{ width: `${p.pct}%` }}
                                             transition={{ delay: i * 0.2, duration: 1 }}
                                             className={`h-full bg-${p.color}-500 rounded-full`}
                                         />
                                     </div>
                                 </div>
                             ))}
                         </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-slate-50">
                        <button className="w-full py-5 bg-slate-900 text-white rounded-[28px] font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10">
                            تحليل التقرير الاستراتيجي
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
