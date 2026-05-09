import React from "react";
import { motion } from "motion/react";
import { BarChart3, LineChart, PieChart, TrendingUp, TrendingDown, Target, Download, Calendar, Filter } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

export const VerifierAnalyticalReports: React.FC = () => {
    const data = [
        { name: "Sat", val: 400 },
        { name: "Sun", val: 300 },
        { name: "Mon", val: 600 },
        { name: "Tue", val: 800 },
        { name: "Wed", val: 500 },
        { name: "Thu", val: 900 },
        { name: "Fri", val: 700 },
    ];

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">Data Analytics</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">تحليل اتجاهات التوثيق والبيانات السكانية الميدانية</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-white border border-slate-100 p-3.5 rounded-2xl shadow-sm text-slate-400 hover:text-slate-900 transition-colors"><Calendar className="w-5 h-5" /></button>
                    <button className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "إجمالي التوثيقات", val: "١٤,٣٠٢", change: "+١٢٪", up: true, color: "text-blue-600" },
                    { label: "سرعة المعالجة (س)", val: "٢.٤", change: "-٥٪", up: false, color: "text-emerald-600" },
                    { label: "دقة البيانات", val: "٩٩.٨٪", change: "+٠.٢٪", up: true, color: "text-indigo-600" },
                    { label: "شكاوى المواطنين", val: "٠٤", change: "-٥٠٪", up: false, color: "text-rose-600" },
                ].map((kpi, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm group hover:border-blue-200 transition-all"
                    >
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                        <div className="flex items-baseline justify-between">
                            <p className="text-3xl font-black text-slate-900 italic tracking-tighter">{kpi.val}</p>
                            <div className={`flex items-center gap-1 text-[10px] font-black ${kpi.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {kpi.change}
                                {kpi.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            </div>
                        </div>
                        <div className="mt-4 h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                             <div className={`h-full ${kpi.color.replace('text', 'bg')} opacity-20`} style={{ width: '70%' }} />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-slate-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden min-h-[500px]">
                     <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                     <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-12">
                             <div>
                                <h3 className="text-2xl font-black italic tracking-tighter">حجم تدفق البيانات الأسبوعي</h3>
                                <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">Data Flow Matrix • Last 7 Days</p>
                             </div>
                             <div className="flex gap-2">
                                <button className="bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10"><BarChart3 className="w-5 h-5" /></button>
                                <button className="bg-white/10 p-3 rounded-xl border border-white/20"><LineChart className="w-5 h-5" /></button>
                             </div>
                        </div>
                        <div className="flex-1 w-full min-h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#0f172a', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                                        itemStyle={{ color: '#60a5fa', fontWeight: 'bold' }}
                                    />
                                    <XAxis dataKey="name" stroke="#475569" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                                    <Area type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={6} fillOpacity={1} fill="url(#colorVal)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                     </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                     <div className="bg-white rounded-[4rem] p-12 border border-slate-100 shadow-xl min-h-[500px] flex flex-col justify-between">
                         <div>
                            <h3 className="text-xl font-black italic tracking-tighter mb-2">توزيع فئات التوثيق</h3>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Category Distribution</p>
                         </div>
                         <div className="flex-1 w-full my-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                    { name: "A", val: 85 },
                                    { name: "B", val: 72 },
                                    { name: "C", val: 94 },
                                    { name: "D", val: 58 },
                                ]}>
                                    <Bar dataKey="val" radius={[50, 50, 0, 0]}>
                                        {[0,1,2,3].map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={['#3b82f6', '#818cf8', '#6366f1', '#4f46e5'][index]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                         </div>
                         <div className="space-y-4 pt-4 border-t border-slate-50 font-bold text-slate-900">
                             <div className="flex justify-between items-center text-xs uppercase tracking-tighter"><span>Top Category</span><span className="text-blue-600">Legal Documents</span></div>
                             <div className="flex justify-between items-center text-xs uppercase tracking-tighter"><span>Low Intensity</span><span className="text-rose-500">Technical Audit</span></div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};
