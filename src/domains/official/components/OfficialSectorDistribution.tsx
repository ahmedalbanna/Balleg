import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Droplets, 
  Zap, 
  Navigation, 
  Building2, 
  Users, 
  PieChart as PieIcon, 
  Activity,
  ArrowUpRight,
  TrendingUp,
  LayoutGrid
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';
import { cn } from '../../core/utils/cn';

const sectorData = [
  { name: 'المياه والصرف', value: 35, color: '#3b82f6', icon: Droplets },
  { name: 'الكهرباء والطاقة', value: 25, color: '#f59e0b', icon: Zap },
  { name: 'الأشغال والطرق', value: 22, color: '#10b981', icon: Navigation },
  { name: 'النظافة والبيئة', value: 18, color: '#6366f1', icon: Activity },
];

const resourceData = [
  { name: 'قطاع ١', human: 120, assets: 45 },
  { name: 'قطاع ٢', human: 85, assets: 32 },
  { name: 'قطاع ٣', human: 150, assets: 60 },
  { name: 'قطاع ٤', human: 90, assets: 28 },
];

export const OfficialSectorDistribution: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 w-full" dir="rtl">
      <header className="px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-blue-100">
            <LayoutGrid size={12} />
            هيكلية الموارد والقطاعات التابعة
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">توزيع القطاعات والموارد</h1>
        <p className="text-sm font-bold text-slate-400 italic">تحليل تركز العمليات وتوزيع القوى العاملة والأصول بين مختلف القطاعات التنفيذية</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Sector Pie */}
          <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <h3 className="text-xl font-black text-slate-900 mb-2">كتلة العمليات الميدانية</h3>
              <p className="text-xs font-bold text-slate-400 mb-12 italic">النسبة المئوية لانشغال كل قطاع إداري</p>
              
              <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                          <Pie
                              data={sectorData}
                              cx="50%"
                              cy="50%"
                              innerRadius={80}
                              outerRadius={120}
                              paddingAngle={10}
                              dataKey="value"
                          >
                              {sectorData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                              ))}
                          </Pie>
                          <Tooltip />
                      </PieChart>
                  </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full pt-10 border-t border-slate-50 mt-4">
                  {sectorData.map((item, i) => (
                      <div key={i} className="flex flex-col items-center group cursor-pointer">
                          <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 shadow-sm", item.color)} style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                              <item.icon size={20} />
                          </div>
                          <span className="text-[10px] font-black text-slate-600 mb-1">{item.name}</span>
                          <span className="text-sm font-black text-slate-900">{item.value}%</span>
                      </div>
                  ))}
              </div>
          </div>

          {/* Resources Bar Chart */}
          <div className="bg-slate-950 p-12 rounded-[4rem] flex flex-col text-white">
               <div className="flex items-center justify-between mb-12">
                   <div>
                       <h3 className="text-xl font-black mb-1">توزيع القوى البشرية والأصول</h3>
                       <p className="text-xs font-bold text-slate-500 italic">مقارنة بين عدد الموظفين والمعدات في كل قطاع</p>
                   </div>
                   <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-slate-500">
                       <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-indigo-500" /> الكادر</span>
                       <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-400" /> المعدات</span>
                   </div>
               </div>
               
               <div className="flex-1 w-full text-[10px] font-bold">
                   <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={resourceData} barGap={12}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                           <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                           <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                           <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '15px', color: '#fff' }}
                           />
                           <Bar dataKey="human" fill="#6366f1" radius={[10, 10, 0, 0]} />
                           <Bar dataKey="assets" fill="#60a5fa" radius={[10, 10, 0, 0]} />
                       </BarChart>
                   </ResponsiveContainer>
               </div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
              { label: 'أداء قطاع الخدمات', val: '٩٢٪', trend: '+٥.٤٪', icon: Activity, color: 'emerald' },
              { label: 'كفاءة الربط البيني', val: '٨٨٪', trend: '+١٢.١٪', icon: Zap, color: 'amber' },
              { label: 'رضا المستفيدين', val: '٩٦٪', trend: '+٣.٢٪', icon: Users, color: 'blue' },
          ].map((card, k) => (
              <div key={k} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm group hover:border-indigo-100 transition-all">
                  <div className="flex items-center justify-between mb-8">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", `bg-${card.color}-50 text-${card.color}-600 border border-${card.color}-100`)}>
                          <card.icon size={28} />
                      </div>
                      <div className={cn("px-3 py-1 rounded-full text-[10px] font-black", `bg-${card.color}-50 text-${card.color}-600`)}>
                          {card.trend} <TrendingUp size={12} className="inline ml-1" />
                      </div>
                  </div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{card.label}</p>
                  <h4 className="text-3xl font-black text-slate-900">{card.val}</h4>
              </div>
          ))}
      </div>
    </div>
  );
};
