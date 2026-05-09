import React from "react";
import { motion } from "motion/react";
import { BarChart3, TrendingUp, Users, Heart, GraduationCap, Activity, PieChart, ArrowUpRight, MousePointer2, Briefcase, Languages, Scale } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as ReBarChart, Bar, Cell } from "recharts";

export const NeighborhoodSocialStats: React.FC = () => {
    const growthData = [
        { name: "٢٠٢١", val: 850 },
        { name: "٢٠٢٢", val: 1100 },
        { name: "٢٠٢٣", val: 1450 },
        { name: "٢٠٢٤", val: 1600 },
        { name: "٢٠٢٥", val: 1840 },
    ];

    const distributionData = [
        { name: "إعالة أيتام", value: 45, color: "#4f46e5" },
        { name: "أسر محتاجة", value: 30, color: "#f59e0b" },
        { name: "نازحون", value: 15, color: "#10b981" },
        { name: "طلاب", value: 10, color: "#ec4899" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800 pb-24 lg:pb-12 text-right">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <BarChart3 className="w-10 h-10 text-indigo-600" />
                        إحصائيات اجتماعية
                    </h2>
                    <p className="text-slate-500 font-bold italic">تحليل التركيبة السكانية، تتبع مؤشرات الرفاه الاجتماعي، وقياس أثر التدخلات الإنسانية في الحي</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-8 py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 italic">
                        تصدير التقرير الاجتماعي
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "الأسر المسجلة", val: "٤١٢", change: "+١٢٪", trend: 'up', icon: Users, color: 'blue' },
                    { label: "حالات الرعاية", val: "٥٤", change: "+٥٪", trend: 'up', icon: Heart, color: 'rose' },
                    { label: "معدل البطالة", val: "١٨٪", change: "-٣٪", trend: 'down', icon: Briefcase, color: 'emerald' },
                    { label: "خريجو الجامعات", val: "١٢٠", change: "+١٥٪", trend: 'up', icon: GraduationCap, color: 'indigo' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl group hover:shadow-2xl transition-all relative overflow-hidden">
                         <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000`} />
                         <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className={`w-14 h-14 rounded-3xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                                <stat.icon className="w-8 h-8" />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black italic px-2 py-1 rounded-lg ${
                                stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                            }`}>
                                <ArrowUpRight className={`w-3 h-3 ${stat.trend === 'down' ? 'rotate-90' : ''}`} />
                                {stat.change}
                            </div>
                         </div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic leading-none">{stat.label}</p>
                         <h3 className="text-4xl font-black text-slate-900 leading-none font-mono tracking-tighter uppercase">{stat.val}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 bg-white rounded-[56px] border border-slate-100 shadow-2xl p-12 overflow-hidden">
                     <div className="flex items-center justify-between mb-12">
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-800">نمو الكثافة السكانية</h3>
                        <div className="flex gap-4">
                             <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-indigo-500" />
                                <span className="text-[10px] font-black text-slate-400 uppercase italic">Annual Growth</span>
                             </div>
                        </div>
                     </div>
                     <div className="h-80 w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={growthData}>
                                <defs>
                                    <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} 
                                />
                                <YAxis hide />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '20px', direction: 'rtl' }}
                                    itemStyle={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }}
                                />
                                <Area type="monotone" dataKey="val" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#growthGradient)" />
                             </AreaChart>
                        </ResponsiveContainer>
                     </div>
                </div>

                <div className="bg-slate-900 rounded-[56px] p-12 text-white shadow-2xl relative overflow-hidden group flex flex-col h-full">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter leading-tight mb-12">توزيـع الاحتياجـات</h3>
                    <div className="flex-1 space-y-8 relative z-10">
                        {distributionData.map((item, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase italic tracking-widest">
                                    <span className="text-slate-400 font-mono italic">{item.name}</span>
                                    <span className="text-indigo-400 font-mono">{item.value}%</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.value}%` }}
                                        transition={{ duration: 1.5, delay: i * 0.2 }}
                                        className="h-full rounded-full" 
                                        style={{ backgroundColor: item.color }} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 p-10 bg-white/5 rounded-[40px] border border-white/10 relative z-10">
                         <div className="flex items-center gap-6">
                            <Scale className="w-10 h-10 text-indigo-500 shrink-0" />
                            <div>
                                <h4 className="text-sm font-black italic uppercase text-slate-200 mb-1">مؤشر المساواة</h4>
                                <p className="text-[10px] font-bold text-slate-400 italic leading-relaxed">تحسن في وصول المساعدات للفئات الأقل حظاً بنسبة ٢٤٪ مقارنة بالربع الماضي.</p>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
