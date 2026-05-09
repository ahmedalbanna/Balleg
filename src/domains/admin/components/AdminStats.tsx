import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Zap,
  Droplets,
  Calendar,
  Activity,
  Layers,
  PieChart as PieIcon
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

const data = [
  { name: 'السبت', count: 400 },
  { name: 'الأحد', count: 300 },
  { name: 'الاثنين', count: 600 },
  { name: 'الثلاثاء', count: 800 },
  { name: 'الأربعاء', count: 500 },
  { name: 'الخميس', count: 900 },
  { name: 'الجمعة', count: 200 },
];

const categoryData = [
  { name: 'مياه', value: 400, color: '#3b82f6' },
  { name: 'كهرباء', value: 300, color: '#f59e0b' },
  { name: 'طرق', value: 300, color: '#10b981' },
  { name: 'بيئة', value: 200, color: '#6366f1' },
];

export const AdminStats: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 w-full" dir="rtl">
      <header className="px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-indigo-100">
            <Activity size={12} />
            الذكاء التحليلي الموحد
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">لوحة الأداء المركزي</h1>
        <p className="text-sm font-bold text-slate-400 italic">رؤية بيانية شاملة لتدفق البلاغات، سرعة الاستجابة، وكفاءة الأقسام الميدانية</p>
      </header>

      {/* Main Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
              { label: 'إجمالي البلاغات', val: '١٢,٤٠٠', trend: '+١٢%', up: true, icon: BarChart3, color: 'indigo' },
              { label: 'بلاغات طارئة', val: '٤٣٢', trend: '-٥%', up: false, icon: AlertCircle, color: 'rose' },
              { label: 'نسبة الإنجاز', val: '٨٨%', trend: '+٢%', up: true, icon: CheckCircle2, color: 'emerald' },
              { label: 'متوسط الاستجابة', val: '٣.٥ س', trend: '-١٥%', up: true, icon: Clock, color: 'amber' },
          ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
              >
                  <div className="flex items-center justify-between mb-4">
                      <div className={cn(
                          "w-12 h-12 rounded-[1.5rem] flex items-center justify-center transition-transform group-hover:scale-110",
                          `bg-${stat.color}-50 text-${stat.color}-600`
                      )}>
                          <stat.icon size={24} />
                      </div>
                      <div className={cn(
                          "flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black",
                          stat.up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                      )}>
                          {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                          {stat.trend}
                      </div>
                  </div>
                  <p className="text-sm font-bold text-slate-400 mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black text-slate-900">{stat.val}</h3>
              </motion.div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm h-[500px] flex flex-col">
              <div className="flex items-center justify-between mb-10">
                  <div>
                      <h3 className="text-xl font-black text-slate-900 mb-1">تحليل التدفق الأسبوعي</h3>
                      <p className="text-xs font-bold text-slate-400 italic">مراقبة كمية البلاغات الواردة خلال السبعة أيام الأخيرة</p>
                  </div>
                  <div className="flex gap-2">
                        <button className="px-5 py-2 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black hover:bg-slate-100 transition-all">تحميل التقرير PDF</button>
                        <div className="w-px h-8 bg-slate-100 mx-2" />
                        <button className="w-10 h-10 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
                            <Calendar size={18} />
                        </button>
                  </div>
              </div>
              <div className="flex-1 w-full text-[10px] font-bold">
                  <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                          <defs>
                              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                              </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '15px' }}
                            itemStyle={{ fontWeight: '900', fontSize: '12px' }}
                          />
                          <Area type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
                      </AreaChart>
                  </ResponsiveContainer>
              </div>
          </div>

          {/* Distribution Section */}
          <div className="bg-slate-950 p-10 rounded-[3.5rem] flex flex-col text-white">
              <h3 className="text-xl font-black mb-1">توزيع القطاعات</h3>
              <p className="text-xs font-bold text-slate-500 italic mb-10">النسب المئوية للبلاغات حسب الاختصاص</p>
              
              <div className="flex-1 min-h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                          <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={10}
                              dataKey="value"
                          >
                              {categoryData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                              ))}
                          </Pie>
                          <Tooltip />
                      </PieChart>
                  </ResponsiveContainer>
              </div>

              <div className="space-y-4 pt-10 border-t border-white/5">
                  {categoryData.map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-[11px] font-black text-slate-300">{item.name}</span>
                          </div>
                          <span className="text-sm font-black">{Math.round((item.value / 1200) * 100)}%</span>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      <div className="bg-white rounded-[3.5rem] border border-slate-100 p-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div>
                  <h3 className="text-2xl font-black text-slate-900">خرائط الكثافة والضغط</h3>
                  <p className="text-sm font-bold text-slate-400 italic">تحديد المناطق الجغرافية الأكثر طلباً للخدمات الميدانية</p>
              </div>
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black hover:bg-slate-900 transition-all shadow-xl shadow-indigo-600/10">التفاصيل الميدانية</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                  { label: 'المنطقة الشمالية', val: '٤,٢٠٠', color: 'emerald', progress: 85 },
                  { label: 'المنطقة الوسطى', val: '٣,٨٠٠', color: 'indigo', progress: 65 },
                  { label: 'المنطقة الجنوبية', val: '٢,٤٠٠', color: 'amber', progress: 45 },
              ].map((loc, j) => (
                  <div key={j} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 group hover:border-indigo-100 transition-all">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">{loc.label}</p>
                       <div className="flex items-end gap-2 mb-6">
                           <h4 className="text-3xl font-black text-slate-900">{loc.val}</h4>
                           <span className="text-[10px] font-bold text-slate-400 mb-1.5">بلاغ مؤكد</span>
                       </div>
                       <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                           <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${loc.progress}%` }}
                                className={cn("h-full rounded-full", `bg-${loc.color}-500 shadow-lg`)}
                           />
                       </div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};
