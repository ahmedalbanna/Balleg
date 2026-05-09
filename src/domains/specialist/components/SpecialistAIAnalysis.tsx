import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Zap, 
  BrainCircuit, 
  TrendingUp, 
  Activity, 
  BarChart2, 
  Sparkles, 
  ShieldAlert,
  Search,
  ChevronRight,
  Database,
  Eye,
  FileSearch,
  MessageSquare,
  Bot
} from 'lucide-react';
import { cn } from '../../core/utils/cn';

export const SpecialistAIAnalysis: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="flex flex-col gap-10 w-full" dir="rtl">
      <header className="px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-50 text-violet-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-violet-100">
            <Bot size={12} />
            نظم التنبؤ المعتمدة على الذكاء الاصطناعي
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">تحليل الذكاء الاصطناعي</h1>
        <p className="text-sm font-bold text-slate-400 italic">التحليل التنبؤي للأعطال، تصنيف المخاطر آلياً، واقتراح الحلول الهندسية المثلى</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
              <div className="bg-slate-950 p-12 rounded-[4rem] text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10">
                      <div className="flex items-center gap-6 mb-12">
                          <div className="w-20 h-20 rounded-[2rem] bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-500/20">
                              <BrainCircuit size={40} />
                          </div>
                          <div>
                              <h3 className="text-2xl font-black mb-1">محرك التنبؤ التقني (Qwen Engine)</h3>
                              <p className="text-xs font-bold text-slate-500 italic">نشط حالياً على بيانات الـ ٤٨ ساعة الماضية</p>
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                           {[
                               { label: 'احتمالية أعطال الكهرباء', val: '٦٥٪', status: 'ارتفاع', color: 'rose' },
                               { label: 'دقة التنبؤ الميداني', val: '٩٢٪', status: 'ممتاز', color: 'emerald' },
                           ].map((stat, i) => (
                               <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
                                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
                                   <div className="flex items-end gap-3 text-3xl font-black">
                                       {stat.val}
                                       <span className={cn("text-[9px] mb-2 px-2 py-0.5 rounded-full", `bg-${stat.color}-500/20 text-${stat.color}-400`)}>{stat.status}</span>
                                   </div>
                               </div>
                           ))}
                      </div>

                      <div className="flex flex-col gap-4">
                           <button className="w-full py-6 bg-white text-slate-950 rounded-[2rem] font-black text-sm hover:bg-slate-100 transition-all active:scale-95 flex items-center justify-center gap-3">
                               <Sparkles size={20} className="text-indigo-600" />
                               توليد تقرير التنبؤ الشهري
                           </button>
                      </div>
                  </div>
              </div>

              <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm">
                   <h3 className="text-xl font-black text-slate-900 mb-8 border-b border-slate-50 pb-6 uppercase tracking-widest italic">رؤى الذكاء الاصطناعي الحية</h3>
                   <div className="space-y-6">
                        {[
                            { title: 'كثافة غير طبيعية في حي الصافية', desc: 'تم رصد تزايد بلاغات المياه الصرف الصحي في النطاق ب بنسبة ٤٠٪ عن المتوسط السنوي.', action: 'إرسال فريق تقصي' },
                            { title: 'أداء الفرق الميدانية القطاع ب', desc: 'انخفاض متوسط زمن الحل بنسبة ١٥٪ نتيجة تعديل خطوط السير المقترحة.', action: 'اعتماد الخطة' },
                        ].map((insight, j) => (
                            <div key={j} className="p-8 rounded-[3rem] bg-indigo-50/30 border border-indigo-100 group">
                                <h4 className="text-base font-black text-slate-900 mb-2">{insight.title}</h4>
                                <p className="text-sm font-bold text-slate-500 italic mb-6 leading-relaxed">{insight.desc}</p>
                                <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-2">
                                    اتخاذ إجراء: {insight.action}
                                    <ChevronRight size={14} className="rotate-180" />
                                </button>
                            </div>
                        ))}
                   </div>
              </div>
          </div>

          <div className="lg:col-span-4 space-y-10">
              <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 italic">تحليل جودة التقارير الميدانية</h4>
                   <div className="space-y-10">
                        {[
                            { label: 'دقة الوصف الفني', percentage: 85, color: 'indigo' },
                            { label: 'جودة التوثيق البصري', percentage: 70, color: 'blue' },
                            { label: 'التزام الإحداثيات', percentage: 95, color: 'emerald' },
                        ].map((bar, k) => (
                            <div key={k}>
                                <div className="flex justify-between mb-2">
                                    <span className="text-[11px] font-black text-slate-500">{bar.label}</span>
                                    <span className="text-[11px] font-black text-slate-900">{bar.percentage}%</span>
                                </div>
                                <div className="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                    <div className={cn("h-full rounded-full transition-all duration-1000", `bg-${bar.color}-500`)} style={{ width: `${bar.percentage}%` }} />
                                </div>
                            </div>
                        ))}
                   </div>
              </div>

              <div className="bg-indigo-600 p-10 rounded-[3rem] text-white overflow-hidden relative group">
                   <Database size={120} className="absolute -bottom-10 -left-10 opacity-10 group-hover:scale-110 transition-transform" />
                   <h4 className="text-xl font-black mb-4">قاعدة البيانات الرقمية</h4>
                   <p className="text-xs font-bold text-indigo-100/60 italic mb-10 leading-relaxed">تكامل الذكاء الاصطناعي مع سجلات العمليات التاريخية الممتدة لـ ٥ سنوات.</p>
                   <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs hover:bg-slate-50 transition-all shadow-xl">مزامنة البيانات الحية</button>
              </div>
          </div>
      </div>
    </div>
  );
};
