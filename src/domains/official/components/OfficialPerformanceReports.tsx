import React from 'react';
import { motion } from 'framer-motion';
import { 
  FilePieChart, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Users, 
  BarChart3, 
  ArrowUpRight,
  ChevronDown,
  Download,
  Calendar,
  Zap,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../core/utils/cn';

export const OfficialPerformanceReports: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 w-full" dir="rtl">
      <header className="px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-rose-100">
            <FilePieChart size={12} />
            نظام تدقيق الكفاءة الحكومية
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">تقارير الجودة والأداء</h1>
        <p className="text-sm font-bold text-slate-400 italic">مُراجعة تفصيلية لمعدلات الإنجاز، معايير الجودة الميدانية، والالتزام بالخطط الزمنية</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
              { label: 'متوسط وقت الحل', val: '٤.٢ ساعة', trend: '-١٨٪', status: 'تحسن', icon: Clock, color: 'indigo' },
              { label: 'دقة معالجة البلاغات', val: '٩٨.٥٪', trend: '+٢٪', status: 'مستقر', icon: CheckCircle2, color: 'emerald' },
              { label: 'معدل التكرار', val: '١.٢٪', trend: '-٠.٥٪', status: 'جيد', icon: AlertCircle, color: 'rose' },
          ].map((score, i) => (
              <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm group hover:border-indigo-100 transition-all">
                  <div className="flex items-center justify-between mb-8">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", `bg-${score.color}-50 text-${score.color}-600`)}>
                          <score.icon size={28} />
                      </div>
                      <div className={cn("px-4 py-1 rounded-full text-[10px] font-black", score.trend.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600")}>
                          {score.trend}
                      </div>
                  </div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{score.label}</p>
                  <div className="flex items-end gap-3">
                      <h4 className="text-3xl font-black text-slate-900 leading-none">{score.val}</h4>
                      <span className="text-[10px] font-bold text-slate-400 mb-1">({score.status})</span>
                  </div>
              </div>
          ))}
      </div>

      <div className="bg-white rounded-[4rem] border border-slate-100 p-12 shadow-sm">
           <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
               <div>
                   <h3 className="text-2xl font-black text-slate-900 mb-1">التقرير الشهري المفصل</h3>
                   <p className="text-sm font-bold text-slate-400 italic">تحليل أداء الأقسام لشهر مايو ٢٠٢٤</p>
               </div>
               <div className="flex gap-4">
                   <button className="px-6 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-black hover:bg-slate-100 transition-all flex items-center gap-2 border border-slate-100">
                       <Calendar size={16} />
                       مايو ٢٠٢٤
                       <ChevronDown size={14} />
                   </button>
                   <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2">
                       <Download size={16} />
                       تصدير التقرير الكامل
                   </button>
               </div>
           </div>

           <div className="space-y-6">
                {[
                    { dept: 'مؤسسة المياه والصرف', performance: 94, complaints: 12, response: '٣.٥ س' },
                    { dept: 'وزارة الكهرباء - طوارئ', performance: 88, complaints: 45, response: '٤.٨ س' },
                    { dept: 'الأشغال العامة والطرق', performance: 82, complaints: 28, response: '٥.٢ س' },
                    { dept: 'صندوق النظافة والتحسين', performance: 96, complaints: 5, response: '٢.١ س' },
                ].map((row, j) => (
                    <div key={j} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 group hover:bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
                            <div className="md:col-span-1">
                                <p className="text-[10px] font-black text-indigo-600 uppercase mb-1">القسم التنفيذي</p>
                                <h4 className="text-sm font-black text-slate-900">{row.dept}</h4>
                            </div>
                            <div className="md:col-span-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-3 px-1">كفاءة الإنجاز</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${row.performance}%` }} />
                                    </div>
                                    <span className="text-xs font-black text-slate-900">{row.performance}%</span>
                                </div>
                            </div>
                            <div className="md:col-span-1 text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">شكاوى الجودة</p>
                                <span className={cn(
                                    "px-3 py-1 rounded-lg text-[10px] font-black",
                                    row.complaints > 20 ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                                )}>
                                    {row.complaints} شكوى
                                </span>
                            </div>
                            <div className="md:col-span-1 text-left">
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">سرعة الاستجابة</p>
                                <h4 className="text-sm font-black text-slate-900">{row.response}</h4>
                            </div>
                        </div>
                    </div>
                ))}
           </div>
      </div>
    </div>
  );
};
