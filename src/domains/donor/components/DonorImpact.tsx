import React from "react";
import { motion } from "motion/react";
import { BarChart3, PieChart, TrendingUp, Users, Droplets, BookOpen, HeartPulse, ShieldCheck, Download, Share2, Info, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

export const DonorImpact: React.FC = () => {
  const impactData = [
    { name: 'يناير', reach: 4000, projects: 5 },
    { name: 'فبراير', reach: 3000, projects: 8 },
    { name: 'مارس', reach: 6000, projects: 12 },
    { name: 'أبريل', reach: 8000, projects: 15 },
    { name: 'مايو', reach: 7500, projects: 18 },
  ];

  const categories = [
    { name: 'المياه', val: 45, color: '#0ea5e9' },
    { name: 'التعليم', val: 30, color: '#6366f1' },
    { name: 'الصحة', val: 25, color: '#f43f5e' },
  ];

  return (
    <div className="p-4 md:p-8 space-y-12 animate-in zoom-in-95 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-emerald-600" />
            تقارير الأثر
          </h2>
          <p className="text-slate-500 font-medium italic">شاهد التغيير الذي أحدثته مساهماتك على أرض الواقع من خلال بيانات دقيقة وتقارير موثقة</p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 leading-none">
                <Download className="w-4 h-4" />
                تحميل التقرير الكامل
            </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
               { label: 'إجمالي المستفيدين', val: '١٢.٤ ألف', color: 'emerald', icon: Users },
               { label: 'أمان المياه', val: '٨٥٪', color: 'blue', icon: Droplets },
               { label: 'تمكين تعليمي', val: '٣.٥ ألف', color: 'indigo', icon: BookOpen },
               { label: 'مستوى الرضا', val: '٩٤٪', color: 'rose', icon: ShieldCheck },
           ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
                    <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{stat.label}</span>
                        <h3 className="text-3xl font-black text-slate-900 mt-1 font-mono tracking-tighter">{stat.val}</h3>
                    </div>
                    <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-7 h-7" />
                    </div>
                </div>
           ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[48px] border border-slate-100 shadow-xl p-10 h-[450px] relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-10 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">نمو الأثر المجتمعي</span>
                    </div>
                </div>
                <div className="mb-10">
                    <h3 className="font-black text-slate-900 italic uppercase">تطور الوصول الإنساني</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1 italic leading-none">Beneficiary Reach Progress</p>
                </div>
                <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={impactData}>
                            <defs>
                                <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '16px', color: '#fff' }}
                                itemStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                            />
                            <Area type="monotone" dataKey="reach" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorReach)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
          </div>

          <div className="bg-slate-900 rounded-[56px] p-12 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
               <div className="relative z-10">
                    <header className="flex items-center justify-between mb-12">
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-tight">توزيع العطاء</h3>
                        <PieChart className="w-8 h-8 text-indigo-400" />
                    </header>
                    <div className="space-y-8">
                         {categories.map((c, i) => (
                             <div key={i} className="space-y-2 group/item">
                                 <div className="flex justify-between text-[10px] font-black uppercase tracking-tight italic text-slate-500 group-hover/item:text-white transition-colors">
                                     <span>{c.name}</span>
                                     <span style={{ color: c.color }}>{c.val}%</span>
                                 </div>
                                 <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full" style={{ width: `${c.val}%`, backgroundColor: c.color }} />
                                 </div>
                             </div>
                         ))}
                    </div>
               </div>
               <div className="mt-16 p-8 bg-white/5 rounded-[40px] border border-white/5 backdrop-blur-xl relative z-10 group-hover:bg-white/10 transition-all">
                    <div className="flex items-start gap-4">
                        <TrendingUp className="w-8 h-8 text-emerald-500 shrink-0" />
                        <div>
                            <h4 className="font-black italic text-emerald-400 italic">كفاءة تشغيلية عالية</h4>
                            <p className="text-slate-500 text-xs font-medium italic leading-relaxed mt-1">يذهب ٩٤٪ من تبرعك مباشرة للمستفيدين، مع مصاريف إدارية لا تتجاوز ٦٪ فقط.</p>
                        </div>
                    </div>
               </div>
               <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
          </div>
      </div>
    </div>
  );
};
