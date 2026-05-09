import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Activity, 
  TrendingUp, 
  Zap, 
  Droplets, 
  Construction, 
  PieChart as PieIcon, 
  Users, 
  ShieldCheck, 
  Target,
  ArrowUpRight,
  LayoutGrid
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { cn } from '../../core/utils/cn';

const efficiencyData = [
  { name: 'يناير', value: 75 },
  { name: 'فبراير', value: 82 },
  { name: 'مارس', value: 78 },
  { name: 'أبريل', value: 90 },
  { name: 'مايو', value: 94 },
];

const sectorDistribution = [
  { name: 'كفاءة الشبكة', value: 45, color: '#4f46e5' },
  { name: 'الاستهلاك', value: 30, color: '#10b981' },
  { name: 'الفواقد', value: 25, color: '#f59e0b' },
];

export const SpecialistSectorStats: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 w-full" dir="rtl">
      <header className="px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-emerald-100">
            <BarChart3 size={12} />
            وحدة التحليل الإستراتيجي للقطاع
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">إحصائيات القطاع</h1>
        <p className="text-sm font-bold text-slate-400 italic">تحليل أداء البنية التحتية، معدلات استنزاف الموارد، وكفاءة الصيانة الوقائية</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
               { label: 'كفاءة التشغيل', val: '٩٤٪', trend: '+٥٪', icon: Zap, color: 'indigo' },
               { label: 'بلاغات نوعية', val: '٤٢٠', trend: '-١٢٪', icon: Activity, color: 'rose' },
               { label: 'رضا المستفيد الفني', val: '٤.٨ / ٥', trend: '+٠.٢', icon: ShieldCheck, color: 'emerald' },
               { label: 'زمن الإصلاح (س)', val: '٣.٥', trend: '-١.٢', icon: Target, color: 'amber' },
           ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm group">
                    <div className="flex items-center justify-between mb-8">
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", `bg-${stat.color}-50 text-${stat.color}-600`)}>
                            <stat.icon size={24} />
                        </div>
                        <div className={cn("px-3 py-1 rounded-full text-[9px] font-black", stat.trend.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600")}>
                            {stat.trend} <TrendingUp size={10} className="inline ml-1" />
                        </div>
                    </div>
                    <h4 className="text-3xl font-black text-slate-900 mb-1">{stat.val}</h4>
                    <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase italic">{stat.label}</p>
                </div>
           ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-[500px]">
           <div className="bg-slate-950 p-12 rounded-[4rem] text-white flex flex-col">
                <h3 className="text-2xl font-black mb-1">منحنى نمو الكفاءة</h3>
                <p className="text-xs font-bold text-slate-500 mb-12 italic">التطور الربع سنوي لأداء القطاع الفني</p>
                <div className="flex-1 w-full text-[10px] font-bold">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={efficiencyData}>
                            <defs>
                                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff08" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569' }} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '15px', color: '#fff' }} />
                            <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={5} fill="url(#colorVal)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
           </div>

           <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm flex flex-col items-center">
                <h3 className="text-2xl font-black text-slate-900 mb-1">توزيع الجودة</h3>
                <p className="text-xs font-bold text-slate-400 mb-12 italic">تحليل تركز موارد الصيانة</p>
                <div className="flex-1 w-full text-[10px] font-bold">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={sectorDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                paddingAngle={10}
                                dataKey="value"
                            >
                                {sectorDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-6 w-full pt-8 border-t border-slate-50 mt-4">
                    {sectorDistribution.map((item, i) => (
                         <div key={i} className="text-center">
                              <div className={cn("w-2 h-2 rounded-full mx-auto mb-2", `bg-[${item.color}]`)} style={{ backgroundColor: item.color }} />
                              <p className="text-[10px] font-black text-slate-500 mb-1">{item.name}</p>
                              <p className="text-sm font-black text-slate-900">{item.value}%</p>
                         </div>
                    ))}
                </div>
           </div>
      </div>
    </div>
  );
};
