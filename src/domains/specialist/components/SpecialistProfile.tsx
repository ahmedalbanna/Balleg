import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Briefcase, 
  Star, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  LayoutGrid,
  FileText,
  Mail,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { cn } from '../../core/utils/cn';

export const SpecialistProfile: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 w-full" dir="rtl">
      <header className="px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-indigo-100">
            <User size={12} />
            الهوية الرقمية والمسار المهني
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">الملف المهني</h1>
        <p className="text-sm font-bold text-slate-400 italic">إحصائيات الإنجاز، الكفاءة التقنية، وتوثيق الخبرات الميدانية المتراكمة</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-10">
               <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm text-center">
                    <div className="relative w-40 h-40 mx-auto mb-8">
                         <div className="w-full h-full rounded-[3rem] bg-slate-50 flex items-center justify-center text-slate-200 border-2 border-slate-50">
                             <User size={80} />
                         </div>
                         <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                             <ShieldCheck size={20} />
                         </div>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-1">م. يوسف الهاشمي</h2>
                    <p className="text-xs font-bold text-slate-400 italic mb-8 uppercase tracking-widest">مستشار فني - قطاع المياه</p>
                    
                    <div className="flex items-center justify-center gap-2 bg-indigo-50 px-6 py-2 rounded-full text-indigo-600 text-[10px] font-black w-fit mx-auto">
                        <Award size={14} />
                        خبير مستوى أول
                    </div>
               </div>

               <div className="bg-slate-950 p-10 rounded-[3.5rem] text-white">
                    <h3 className="text-lg font-black mb-8 border-b border-white/5 pb-6">البصمة الميدانية</h3>
                    <div className="space-y-8">
                         {[
                             { label: 'بلاغات محققة', val: '٥٤٠', color: 'emerald' },
                             { label: 'دقة التشخيص', val: '٩٨٪', color: 'indigo' },
                             { label: 'ساعات العمل', val: '١,٢٠٠', color: 'amber' },
                         ].map((item, i) => (
                             <div key={i} className="flex items-center justify-between">
                                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{item.label}</span>
                                 <span className={cn("text-lg font-black", `text-${item.color}-400`)}>{item.val}</span>
                             </div>
                         ))}
                    </div>
               </div>
          </div>

          <div className="lg:col-span-2 space-y-10">
               <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm">
                    <h3 className="text-2xl font-black text-slate-900 mb-10 pb-8 border-b border-slate-50 uppercase tracking-widest italic">المهارات الفنية المثبتة</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {[
                             { name: 'هندسة الهيدروليك', level: 95 },
                             { name: 'تحليل البيانات الضخمة', level: 75 },
                             { name: 'إدارة أزمات المياه', level: 90 },
                             { name: 'صيانة المضخات الذكية', level: 85 },
                         ].map((skill, j) => (
                             <div key={j}>
                                 <div className="flex justify-between mb-3 px-2">
                                     <span className="text-sm font-black text-slate-700">{skill.name}</span>
                                     <span className="text-sm font-black text-slate-900">{skill.level}%</span>
                                 </div>
                                 <div className="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-50">
                                     <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${skill.level}%` }} />
                                 </div>
                             </div>
                         ))}
                    </div>
               </div>

               <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm">
                    <h3 className="text-2xl font-black text-slate-900 mb-10 pb-8 border-b border-slate-50 uppercase tracking-widest italic flex items-center justify-between">
                        آخر الإنجازات الموثقة
                        <Star size={24} className="text-amber-400" />
                    </h3>
                    <div className="space-y-6">
                         {[
                             { title: 'حل أزمة ضخ حي الصافية في زمن قياسي', date: 'أبريل ٢٠٢٤', score: '+١٢٠ نقطة' },
                             { title: 'تحديث معايير صيانة المضخات الهيدروليكية', date: 'مارس ٢٠٢٤', score: 'وسام التميز' },
                             { title: 'تحليل فني ناجح لمخاطر فيضان السبعين', date: 'فبراير ٢٠٢٤', score: '+٥٠ نقطة' },
                         ].map((ach, k) => (
                             <div key={k} className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl group hover:bg-indigo-50 transition-all border border-slate-50 hover:border-indigo-100">
                                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-300 group-hover:text-indigo-600 transition-colors shadow-sm">
                                      <Zap size={20} />
                                  </div>
                                  <div className="flex-1">
                                      <h4 className="text-sm font-black text-slate-900 mb-1">{ach.title}</h4>
                                      <p className="text-[10px] font-bold text-slate-400 italic">{ach.date}</p>
                                  </div>
                                  <span className="text-[10px] font-black text-indigo-600 bg-white px-4 py-2 rounded-xl shadow-sm">{ach.score}</span>
                             </div>
                         ))}
                    </div>
               </div>
          </div>
      </div>
    </div>
  );
};
