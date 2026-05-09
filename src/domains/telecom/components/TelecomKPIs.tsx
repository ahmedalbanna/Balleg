import React from "react";
import { motion } from "motion/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import { TrendingUp, Users, Clock, AlertTriangle, Monitor, ArrowUpRight, ArrowDownRight } from "lucide-react";

export const TelecomKPIs: React.FC = () => {
    const data = [
        { name: "00:00", active: 400, errors: 24, latency: 18 },
        { name: "04:00", active: 200, errors: 12, latency: 15 },
        { name: "08:00", active: 800, errors: 45, latency: 22 },
        { name: "12:00", active: 1200, errors: 68, latency: 28 },
        { name: "16:00", active: 1400, errors: 52, latency: 32 },
        { name: "20:00", active: 1100, errors: 38, latency: 25 },
        { name: "23:59", active: 600, errors: 28, latency: 19 },
    ];

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">Network KPIs</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">مؤشرات الأداء الاستراتيجية للشبكة</p>
                </div>
                <div className="flex bg-slate-50 p-1.5 rounded-2xl gap-2">
                    <button className="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white shadow-sm text-slate-900">Today</button>
                    <button className="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-100 italic transition-all">Periodic</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Throughput (Avg)", val: "2.4 Gbps", change: "+12%", up: true, icon: TrendingUp, color: "text-blue-600" },
                    { label: "Active Subscriptions", val: "4.8M", change: "+0.8%", up: true, icon: Users, color: "text-indigo-600" },
                    { label: "Call Drop Rate", val: "0.14%", change: "-2.4%", up: false, icon: AlertTriangle, color: "text-rose-600" },
                    { label: "Latency (ms)", val: "22ms", change: "+4%", up: true, icon: Clock, color: "text-emerald-600" },
                ].map((kpi, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-4 rounded-2xl bg-slate-50 ${kpi.color}`}>
                                <kpi.icon className="w-6 h-6" />
                            </div>
                            <div className={`flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full ${kpi.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                {kpi.change}
                                {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </div>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">{kpi.label}</p>
                        <p className="text-3xl font-black text-slate-900">{kpi.val}</p>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-50 overflow-hidden">
                             <div className={`h-full opacity-20 ${kpi.color.replace('text', 'bg')}`} style={{ width: '60%' }} />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                 <div className="lg:col-span-8 bg-white p-8 rounded-[4rem] border border-slate-100 shadow-xl overflow-hidden min-h-[450px] relative">
                    <div className="flex items-center justify-between mb-8">
                         <h3 className="text-lg font-black italic flex items-center gap-3">
                            <Monitor className="w-6 h-6 text-blue-600" />
                            تحليل حركة المستخدمين خلال 24 ساعة
                         </h3>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px' }}
                                />
                                <Area type="monotone" dataKey="active" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorActive)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                 </div>

                 <div className="lg:col-span-4 bg-slate-900 p-8 rounded-[4rem] text-white shadow-2xl flex flex-col justify-between">
                     <div>
                        <h3 className="text-lg font-black italic mb-2 tracking-tighter uppercase">Distribution by Node</h3>
                        <p className="text-slate-400 text-xs font-bold">توزيع الأحمال حسب العقد المركزية</p>
                     </div>
                     <div className="h-[250px] w-full my-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.slice(0, 5)}>
                                <Bar dataKey="active" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                     </div>
                     <div className="bg-white/5 p-6 rounded-3xl space-y-4">
                        <div className="flex justify-between items-center text-xs font-black uppercase italic tracking-widest text-slate-500">
                            <span>Optimal Usage</span>
                            <span className="text-emerald-400">88%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                             <div className="h-full bg-emerald-400" style={{ width: '88%' }} />
                        </div>
                     </div>
                 </div>
            </div>
        </div>
    );
};
