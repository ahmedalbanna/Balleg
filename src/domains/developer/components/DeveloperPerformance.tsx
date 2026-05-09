import React from "react";
import { motion } from "motion/react";
import { Activity, Zap, Cpu, HardDrive, BarChart3, Search, Filter, AlertCircle, CheckCircle2, Navigation, MoreVertical, Gauge, Battery, History, LineChart, TrendingUp } from "lucide-react";
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export const DeveloperPerformance: React.FC = () => {
  const chartData = [
    { time: '00:00', load: 45, latency: 12 },
    { time: '04:00', load: 32, latency: 8 },
    { time: '08:00', load: 68, latency: 25 },
    { time: '12:00', load: 85, latency: 42 },
    { time: '16:00', load: 55, latency: 18 },
    { time: '20:00', load: 92, latency: 32 },
    { time: '23:59', load: 48, latency: 15 },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in zoom-in-95 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
            <Activity className="w-8 h-8 text-indigo-600" />
            مراقبة الأداء
          </h2>
          <p className="text-slate-500 font-medium italic">تحليل أداء النظام في الوقت الفعلي، مراقبة استهلاك الموارد، وتتبع زمن الاستجابة</p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-[20px] font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                <History className="w-4 h-4" />
                تحليل السجل التاريخي
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
              { label: 'وقت التوفر', val: '٩٩.٩٩٪', color: 'bg-emerald-50 text-emerald-600', icon: CheckCircle2 },
              { label: 'متوسط الأداء', val: '٩٤/١٠٠', color: 'bg-blue-50 text-blue-600', icon: Zap },
              { label: 'تعداد الطلبات', val: '١.٤ مليون', color: 'bg-indigo-50 text-indigo-600', icon: TrendingUp },
              { label: 'أخطاء النظام', val: '٠٤', color: 'bg-rose-50 text-rose-600', icon: AlertCircle },
          ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-lg transition-all">
                  <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                      <h3 className="text-3xl font-black text-slate-900 mt-1 font-mono tracking-tighter">{stat.val}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                      <stat.icon className="w-6 h-6" />
                  </div>
              </div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl p-10 h-[450px] relative group overflow-hidden">
                   <div className="absolute top-0 right-0 p-10 flex items-center gap-4">
                        <div className="flex items-center gap-2">
                             <div className="w-3 h-3 rounded-full bg-indigo-500" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Load Factor</span>
                        </div>
                   </div>
                   <div className="mb-10">
                        <h3 className="font-black text-slate-900 italic uppercase">تحليل الحمل الموزع</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Real-time Traffic Analysis</p>
                   </div>
                   <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '16px', color: '#fff' }}
                                    itemStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                                />
                                <Area type="monotone" dataKey="load" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorLoad)" />
                            </AreaChart>
                        </ResponsiveContainer>
                   </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                      { name: 'استهلاك الذاكرة', val: '٧٢٪', icon: HardDrive, color: 'indigo' },
                      { name: 'معالجة البيانات', val: '١.٢GB/s', icon: Cpu, color: 'blue' },
                  ].map((m, i) => (
                      <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all flex items-center justify-between group">
                          <div className="flex items-center gap-6">
                              <div className={`w-14 h-14 rounded-2xl bg-${m.color}-50 text-${m.color}-600 flex items-center justify-center`}>
                                  <m.icon className="w-8 h-8" />
                              </div>
                              <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic mb-1">{m.name}</p>
                                  <h4 className="text-2xl font-black text-slate-900 font-mono italic">{m.val}</h4>
                              </div>
                          </div>
                          <TrendingUp className="w-6 h-6 text-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                      </div>
                  ))}
              </div>
          </div>

          <div className="space-y-8">
               <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl h-full flex flex-col justify-between group">
                    <div className="relative z-10">
                        <header className="flex items-center justify-between mb-12">
                             <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-tight">زمن الاستجابة</h3>
                             <Gauge className="w-8 h-8 text-indigo-400" />
                        </header>
                        <div className="space-y-12">
                            <div className="text-center p-8 bg-white/5 rounded-[40px] border border-white/5 backdrop-blur-xl group-hover:bg-white/10 transition-all">
                                 <span className="text-5xl font-black italic text-indigo-500 font-mono tracking-tighter">١٤ms</span>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">Average Response Time</p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { label: 'P95 Latency', val: '٤٢ms', pct: 85 },
                                    { label: 'P99 Latency', val: '١٢٠ms', pct: 95 },
                                    { label: 'Cold Start', val: '٤٥٠ms', pct: 60 },
                                ].map((s, i) => (
                                    <div key={i} className="space-y-2 group/item">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest italic group-hover/item:text-white transition-colors text-slate-500">
                                            <span>{s.label}</span>
                                            <span className="text-indigo-400">{s.val}</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-500" style={{ width: `${s.pct}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 relative z-10">
                         <button className="w-full py-5 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 leading-none">
                            تصدير تقرير القياس
                         </button>
                    </div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
               </div>
          </div>
      </div>
    </div>
  );
};
