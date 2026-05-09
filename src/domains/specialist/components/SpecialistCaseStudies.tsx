import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  TrendingUp, 
  BarChart3, 
  CheckCircle2, 
  AlertCircle, 
  MoreVertical,
  ArrowUpRight,
  ChevronRight,
  Eye,
  Zap,
  Building2,
  Construction
} from 'lucide-react';
import { cn } from '../../core/utils/cn';

const caseStudies = [
  { id: 'CS-001', title: 'خطة استجابة الفيضانات - حي النصر', category: 'إدارة أزمات', date: '2024-04-12', outcome: 'تحسن بـ ٦٠٪', status: 'published' },
  { id: 'CS-002', title: 'تحليل فقدان الطاقة في محطة السبعين', category: 'كفاءة طاقة', date: '2024-03-22', outcome: 'توفير ٤ ميجا', status: 'review' },
  { id: 'CS-003', title: 'بروتوكول الصيانة الوقائية لشبكة الصافية', category: 'صيانة هيكلية', date: '2024-02-15', outcome: 'تقليص أعطال ٤٠٪', status: 'published' },
];

export const SpecialistCaseStudies: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 w-full" dir="rtl">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-2">
        <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-amber-100">
                <Briefcase size={12} />
                وحدة الدراسات المرجعية والدروس المستفادة
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">دراسات الحالة</h1>
            <p className="text-sm font-bold text-slate-400 italic">توثيق التجارب التشغيلية الناجحة، تحليل الأخطاء التاريخية، وتطوير نماذج العمل الميداني</p>
        </div>

        <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-3 shadow-xl shadow-slate-900/10">
            <Plus size={18} />
            إضافة دراسة حالة
        </button>
      </header>

      <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 bg-slate-50/20 flex flex-col sm:flex-row gap-6 items-center">
              <div className="relative flex-1 group">
                  <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="البحث في دراسات الحالات التاريخية..." 
                    className="w-full pl-8 pr-16 py-5 bg-white border border-slate-100 rounded-3xl text-sm font-bold outline-none focus:ring-4 focus:ring-slate-900/5 transition-all"
                  />
              </div>
              <button className="flex items-center gap-3 px-8 py-5 bg-white border border-slate-100 rounded-3xl text-sm font-bold text-slate-600 hover:border-slate-300 transition-all">
                  <Filter size={20} />
                  تخصيص الفئة الفنية
              </button>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {caseStudies.map((study) => (
                   <motion.div 
                     key={study.id}
                     initial={{ opacity: 0, scale: 0.98 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-2 transition-all group flex flex-col h-full"
                   >
                        <div className="flex justify-between items-start mb-10">
                             <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                                 <Briefcase size={28} />
                             </div>
                             <span className={cn(
                                 "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tight",
                                 study.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                             )}>
                                 {study.status === 'published' ? 'منشور للعامة' : 'قيد التدقيق'}
                             </span>
                        </div>
                        
                        <h3 className="text-lg font-black text-slate-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors uppercase">{study.title}</h3>
                        <p className="text-[11px] font-bold text-slate-400 italic mb-8 flex-1">{study.category}</p>
                        
                        <div className="space-y-4 mb-10 pt-6 border-t border-slate-50">
                             <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">المخرج الرئيسي</span>
                                  <span className="text-[10px] font-black text-emerald-600">{study.outcome} <TrendingUp size={12} className="inline ml-1" /></span>
                             </div>
                             <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">تاريخ النشر</span>
                                  <span className="text-[10px] font-black text-slate-900">{study.date}</span>
                             </div>
                        </div>

                        <button className="w-full py-4 bg-slate-50 text-slate-900 rounded-2xl font-black text-xs hover:bg-slate-950 hover:text-white transition-all flex items-center justify-center gap-2 group-active:scale-95">
                             تحليل كامل للدراسة
                             <ArrowUpRight size={14} />
                        </button>
                   </motion.div>
               ))}
          </div>
      </div>
    </div>
  );
};
import { Plus } from 'lucide-react';
