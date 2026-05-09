import React from "react";
import { motion } from "motion/react";
import { BarChart, TrendingUp, Users, Eye, Globe, PieChart, Activity, ArrowUpRight, MousePointer2, Clock, Share2, MessageSquare } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as ReBarChart, Bar, Cell } from "recharts";

export const JournalistReaderStats: React.FC = () => {
    const readerData = [
        { name: "السبت", value: 1200 },
        { name: "الأحد", value: 1800 },
        { name: "الاثنين", value: 1500 },
        { name: "الثلاثاء", value: 2400 },
        { name: "الأربعاء", value: 2100 },
        { name: "الخميس", value: 3200 },
        { name: "الجمعة", value: 2800 },
    ];

    const deviceData = [
        { name: "Mobile", value: 75, color: "#4f46e5" },
        { name: "Desktop", value: 20, color: "#10b981" },
        { name: "Tablet", value: 5, color: "#f59e0b" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-1000 pb-24 lg:pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Activity className="w-8 h-8 text-indigo-600" />
                        إحصائيات القراء
                    </h2>
                    <p className="text-slate-500 font-bold italic">تحليل سلوك القراء، تتبع مصادر الزيارات، وقياس أثر المحتوى المنشور</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 leading-none">
                        تصدير تقرير التفاعل
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "إجمالي القراء", val: "٤٥,٨٠٠", change: "+١٥٪", trend: 'up', icon: Users, color: 'indigo' },
                    { label: "متوسط وقت القراءة", val: "٠٤:٢٠ د", change: "+٨٪", trend: 'up', icon: Clock, color: 'rose' },
                    { label: "معدل الارتداد", val: "٢٢٪", change: "-٥٪", trend: 'down', icon: MousePointer2, color: 'emerald' },
                    { label: "المشاركة الاجتماعية", val: "١,٢٤٠", change: "+٢٤٪", trend: 'up', icon: Share2, color: 'blue' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                         <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000`} />
                         <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black italic px-2 py-1 rounded-lg ${
                                stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                            }`}>
                                <ArrowUpRight className={`w-3 h-3 ${stat.trend === 'down' ? 'rotate-90' : ''}`} />
                                {stat.change}
                            </div>
                         </div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{stat.label}</p>
                         <h3 className="text-3xl font-black text-slate-900 leading-none font-mono tracking-tighter uppercase">{stat.val}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 bg-white rounded-[56px] border border-slate-100 shadow-2xl p-12">
                     <div className="flex items-center justify-between mb-12">
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-800">حركة القراء الأسبوعية</h3>
                        <div className="flex gap-4">
                             <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-indigo-500" />
                                <span className="text-[10px] font-black text-slate-400 uppercase italic">Unique Visitors</span>
                             </div>
                        </div>
                     </div>
                     <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={readerData}>
                                <defs>
                                    <linearGradient id="readerGradient" x1="0" y1="0" x2="0" y2="1">
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
                                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '20px' }}
                                    itemStyle={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#readerGradient)" />
                             </AreaChart>
                        </ResponsiveContainer>
                     </div>
                </div>

                <div className="bg-slate-900 rounded-[56px] p-12 text-white shadow-2xl relative overflow-hidden group flex flex-col">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter leading-tight mb-12">أجهـزة المقاليـن</h3>
                    <div className="flex-1 space-y-10">
                        {deviceData.map((item, i) => (
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
                    <div className="mt-12 p-8 bg-white/5 rounded-[32px] border border-white/10">
                         <div className="flex items-center gap-4">
                            <Globe className="w-8 h-8 text-indigo-500" />
                            <p className="text-xs font-bold text-slate-400 italic">مصدر الزيارات الرئيسي: صنعاء، تعز، والقاهرة بنسبة ٤٥٪ من إجمالي التفاعل العام.</p>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
