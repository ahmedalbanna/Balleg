import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Megaphone, 
  Search, 
  Plus, 
  FileText, 
  Users, 
  Globe, 
  Shield, 
  Clock, 
  Eye, 
  Download,
  Share2,
  Trash2,
  Send,
  CheckCircle2,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '../../core/utils/cn';

const initialCirculars = [
  { id: '1', title: 'توجيه بشأن معايير السلامة في الشبكة الكهربائية', date: '2024-05-01', target: 'القطاع الهندسي', status: 'نشط', level: 'هام' },
  { id: '2', title: 'خطة استجابة طوارئ المياه لموسم الصيف', date: '2024-04-28', target: 'مؤسسة المياه', status: 'نشط', level: 'عادي' },
  { id: '3', title: 'تحديث بروتوكولات الربط مع الملف الشخصي للمواطن', date: '2024-04-20', target: 'إدارة التقنية', status: 'مؤرشف', level: 'تقني' },
];

export const OfficialCirculars: React.FC = () => {
  const [circulars] = useState(initialCirculars);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col gap-8 w-full" dir="rtl">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-2">
        <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-amber-100">
                <Megaphone size={12} />
                وحدة البيانات والمراسيم الحكومية
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">سجل التعاميم الإدارية</h1>
            <p className="text-sm font-bold text-slate-400 italic">إدارة وإصدار كافة التوجيهات والتعاميم الرسمية للجهات التابعة والمكاتب التنفيذية</p>
        </div>

        <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-3 shadow-xl shadow-slate-900/10">
            <Plus size={18} />
            إصدار تعميم جديد
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="relative flex-1 group">
                      <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
                      <input 
                        type="text" 
                        placeholder="البحث في التعاميم والقرارات..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-slate-500/20 outline-none transition-all"
                      />
                  </div>
              </div>

              <div className="space-y-4">
                  {circulars.map((c) => (
                      <motion.div 
                        key={c.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
                      >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                              <div className="flex items-start gap-6">
                                  <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all shrink-0">
                                      <FileText size={28} />
                                  </div>
                                  <div>
                                      <div className="flex items-center gap-3 mb-2">
                                          <span className={cn(
                                              "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tight",
                                              c.level === 'هام' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'
                                          )}>
                                              {c.level}
                                          </span>
                                          <span className="text-[10px] font-bold text-slate-400 italic flex items-center gap-1">
                                              <Clock size={12} />
                                              {c.date}
                                          </span>
                                      </div>
                                      <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{c.title}</h3>
                                      <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                                          <span className="flex items-center gap-1.5"><Users size={14} /> {c.target}</span>
                                          <span className="w-1 h-1 rounded-full bg-slate-200" />
                                          <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> {c.status}</span>
                                      </div>
                                  </div>
                              </div>
                              <div className="flex items-center gap-2 border-t md:border-t-0 pt-6 md:pt-0">
                                  <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all">
                                      <Eye size={18} />
                                  </button>
                                  <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all">
                                      <Download size={18} />
                                  </button>
                                  <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-rose-100 hover:text-rose-600 transition-all">
                                      <Trash2 size={18} />
                                  </button>
                              </div>
                          </div>
                      </motion.div>
                  ))}
              </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
              <div className="bg-indigo-600 p-10 rounded-[3rem] text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 flex items-center justify-center mb-8">
                      <Send size={32} />
                  </div>
                  <h4 className="text-xl font-black mb-4 relative z-10">نشر سريع</h4>
                  <p className="text-xs font-bold text-indigo-100/70 mb-8 leading-relaxed italic relative z-10">
                      إرسال رسالة توجيهية فورية لكافة الموظفين والميدانيين عبر تطبيق الجوال.
                  </p>
                  <div className="space-y-4 mb-8">
                       <textarea 
                         placeholder="اكتب التوجيه هنا..." 
                         className="w-full h-32 bg-white/10 border border-white/20 rounded-2xl p-4 text-sm font-bold placeholder:text-indigo-200 outline-none focus:bg-white/20 transition-all text-white"
                       />
                  </div>
                  <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm hover:bg-indigo-50 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl">
                      بث التعميم الميداني
                  </button>
              </div>

              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                  <h3 className="text-sm font-black text-slate-900 mb-6 px-2">إحصائيات القراءة</h3>
                  <div className="space-y-6">
                       {[
                           { label: 'التعميم #102', percentage: 92, progress: 'bg-emerald-500' },
                           { label: 'التعميم #101', percentage: 65, progress: 'bg-indigo-500' },
                           { label: 'التعميم #100', percentage: 40, progress: 'bg-amber-500' },
                       ].map((stat, i) => (
                           <div key={i}>
                               <div className="flex items-center justify-between mb-2">
                                   <span className="text-[11px] font-black text-slate-500">{stat.label}</span>
                                   <span className="text-[11px] font-black text-slate-900">{stat.percentage}%</span>
                               </div>
                               <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                                   <div className={cn("h-full rounded-full", stat.progress)} style={{ width: `${stat.percentage}%` }} />
                               </div>
                           </div>
                       ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
