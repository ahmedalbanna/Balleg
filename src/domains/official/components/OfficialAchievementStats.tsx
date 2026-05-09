import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  BarChart3, 
  Users, 
  Zap, 
  Star,
  Award,
  ArrowUpRight,
  PieChart as PieIcon,
  Calendar,
  Activity,
  Flame
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  PieChart,
  Cell,
  Pie
} from 'recharts';
import { cn } from '../../core/utils/cn';

const monthlyAchievement = [
  { name: 'يناير', target: 80, achieved: 75 },
  { name: 'فبراير', target: 80, achieved: 82 },
  { name: 'مارس', target: 85, achieved: 88 },
  { name: 'أبريل', target: 90, achieved: 95 },
  { name: 'مايو', target: 90, achieved: 92 },
];

const teamData = [
  { name: 'فريق المياه', value: 450, color: '#3b82f6' },
  { name: 'فريق الكهرباء', value: 380, color: '#f59e0b' },
  { name: 'فريق الأشغال', value: 520, color: '#10b981' },
];

export const OfficialAchievementStats: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 w-full" dir="rtl">
      <header className="px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-indigo-100">
            <Trophy size={12} />
            بوابة قياس الأداء الحكومي
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">مؤشرات الإنجاز السنوية</h1>
        <p className="text-sm font-bold text-slate-400 italic">مُتابعة الأهداف الإستراتيجية ونسب النجاح في حل مشاكل المواطنين والتدخلات الميدانية</p>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
              { label: 'نسبة النجاح العام', val: '٩٤٪', sub: '+٤٪ عن العام الماضي', icon: Target, color: 'indigo' },
              { label: 'بلاغات مكتملة', val: '٨,٤٣٠', sub: 'تم إغلاقها نهائياً', icon: CheckCircle2, color: 'emerald' },
              { label: 'تقييم المواطنين', val: '٤.٨ / ٥', sub: '١٢٠ ألف تقييم مؤكد', icon: Star, color: 'amber' },
          ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden group"
              >
                  <div className={cn("absolute top-0 right-0 w-32 h-32 opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-all group-hover:scale-150", `bg-${stat.color}-500`)} />
                  <div className="flex items-center justify-between mb-8">
                      <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg", `bg-${stat.color}-600 text-white`)}>
                          <stat.icon size={32} />
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600 font-black text-xs">
                          <TrendingUp size={16} />
                          تصاعدي
                      </div>
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 mb-2">{stat.val}</h3>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{stat.label}</p>
                  <p className="text-[10px] font-bold text-slate-400 opacity-60">{stat.sub}</p>
              </motion.div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm flex flex-col h-[500px]">
              <div className="flex items-center justify-between mb-12">
                  <div>
                      <h3 className="text-2xl font-black text-slate-900 mb-1">النمو وخط الأهداف</h3>
                      <p className="text-xs font-bold text-slate-400 italic">المقارنة بين المستهدف والمنجز فعلياً</p>
                  </div>
                  <div className="flex bg-slate-50 p-1.5 rounded-2xl">
                      <button className="px-5 py-2 bg-white text-slate-900 rounded-xl text-[10px] font-black shadow-sm">شهري</button>
                      <button className="px-5 py-2 text-slate-400 rounded-xl text-[10px] font-black">سنوي</button>
                  </div>
              </div>
              <div className="flex-1 w-full text-[10px] font-bold">
                  <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyAchievement}>
                          <defs>
                              <linearGradient id="achievedGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                              </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                          <YAxis axisLine={false} tickLine={false} />
                          <Tooltip />
                          <Area type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="5 5" fill="none" />
                          <Area type="monotone" dataKey="achieved" stroke="#4f46e5" strokeWidth={5} fill="url(#achievedGrad)" />
                      </AreaChart>
                  </ResponsiveContainer>
              </div>
          </div>

          <div className="bg-slate-950 p-12 rounded-[4rem] flex flex-col text-white">
              <h3 className="text-2xl font-black mb-1">نقاط التميز القطاعي</h3>
              <p className="text-xs font-bold text-slate-500 italic mb-12">توزيع الكفاءة بين الفرق الحكومية الرئيسية</p>
              
              <div className="flex-1 min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                          <Pie
                              data={teamData}
                              cx="50%"
                              cy="50%"
                              innerRadius={80}
                              outerRadius={120}
                              paddingAngle={15}
                              dataKey="value"
                          >
                              {teamData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                              ))}
                          </Pie>
                          <Tooltip />
                      </PieChart>
                  </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-12 border-t border-white/5">
                  {teamData.map((item, i) => (
                      <div key={i} className="text-center group cursor-pointer">
                          <div className={cn("w-1.5 h-1.5 rounded-full mx-auto mb-3", `bg-[${item.color}]`)} style={{ backgroundColor: item.color }} />
                          <p className="text-[10px] font-black text-slate-500 mb-1 group-hover:text-white transition-colors">{item.name}</p>
                          <p className="text-lg font-black">{item.value}</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      <div className="bg-white rounded-[4rem] border border-slate-100 p-12 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
               <div>
                   <h3 className="text-2xl font-black text-slate-900 mb-1">أبطال الميدان (Top Performers)</h3>
                   <p className="text-sm font-bold text-slate-400 italic">تكريم الأفراد والفرق الأكثر سرعة في الاستجابة والإغلاق</p>
               </div>
               <button className="px-6 py-3 bg-amber-500 text-white rounded-2xl text-[10px] font-black hover:bg-amber-600 transition-all flex items-center gap-2">
                   <Award size={16} />
                   سجل التكريم السنوي
               </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                  { name: 'المهندس أحمد محمد', role: 'قطاع المياه', points: '١٢,٤٠٠', icon: Flame },
                  { name: 'فريق الطوارئ س١', role: 'قطاع الكهرباء', points: '١١,٩٠٠', icon: Zap },
                  { name: 'أ. سارة خالد', role: 'التنسيق الإحصائي', points: '١٠,٨٥٠', icon: Activity },
                  { name: 'وحدة الرصد الجغرافي', role: 'الأشغال العامة', points: '١٠,٢٠٠', icon: Target },
              ].map((hero, k) => (
                  <div key={k} className="p-8 rounded-[3rem] bg-slate-50 border border-slate-100 group hover:border-amber-200 transition-all text-center">
                       <div className="w-16 h-16 rounded-full bg-white mx-auto mb-6 flex items-center justify-center text-amber-500 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                           <hero.icon size={28} />
                       </div>
                       <h4 className="text-sm font-black text-slate-900 mb-1">{hero.name}</h4>
                       <p className="text-[10px] font-bold text-slate-400 mb-4 italic">{hero.role}</p>
                       <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black border border-amber-100">
                           <Star size={12} />
                           {hero.points} نقطة
                       </div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};
