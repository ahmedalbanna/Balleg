import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  History, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowUpRight, 
  Download, 
  MoreVertical,
  ChevronDown,
  Building2,
  FileText,
  User,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { cn } from '../../core/utils/cn';

const historyData = [
  { id: 'H-102', title: 'إصلاح كابل جهد عالي', date: '2024-05-08', duration: '١٤ ساعة', status: 'completed', dept: 'electricity', operator: 'سمير خالد' },
  { id: 'H-101', title: 'صيانة خط مياه الستين', date: '2024-05-08', duration: '٦ ساعات', status: 'completed', dept: 'water', operator: 'فاطمة محمد' },
  { id: 'H-100', title: 'رفع مخلفات حي النصر', date: '2024-05-07', duration: '٣ أيام', status: 'completed', dept: 'waste', operator: 'عبدالله صالح' },
  { id: 'H-099', title: 'معالجة تسرب كيميائي', date: '2024-05-06', duration: '٨ ساعات', status: 'rejected', dept: 'safety', operator: 'أحمد وليد' },
];

export const OperatorOperationsHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col gap-8 w-full" dir="rtl">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-2">
        <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-slate-700 shadow-xl shadow-slate-900/10">
                <History size={12} />
                قاعدة البيانات السابقة والتوثيق
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">تاريخ العمليات</h1>
            <p className="text-sm font-bold text-slate-400 italic">مُراجعة الأرشيف التشغيلي، قياس كفاءة الإنجاز التاريخية، وتوثيق الدروس المستفادة</p>
        </div>

        <button className="px-8 py-4 bg-white border border-slate-100 text-slate-900 rounded-2xl text-xs font-black hover:border-slate-300 transition-all active:scale-95 flex items-center gap-3 shadow-sm">
            <Download size={18} />
            تصدير سجل العمليات (CSV)
        </button>
      </header>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 bg-slate-50/20 flex flex-col sm:flex-row gap-6 items-center">
              <div className="relative flex-1 group">
                  <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="البحث في العمليات السابقة..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-16 py-5 bg-white border border-slate-100 rounded-3xl text-sm font-bold focus:ring-4 focus:ring-slate-900/5 outline-none transition-all"
                  />
              </div>
              <div className="flex gap-3">
                  <button className="flex items-center gap-3 px-8 py-5 bg-white border border-slate-100 rounded-3xl text-sm font-bold text-slate-600 hover:border-slate-300 transition-all">
                      <Filter size={20} />
                      تصفية
                  </button>
                  <button className="flex items-center gap-3 px-8 py-5 bg-white border border-slate-100 rounded-3xl text-sm font-bold text-slate-600 hover:border-slate-300 transition-all">
                      <Calendar size={20} />
                      الشهر الماضي
                  </button>
              </div>
          </div>

          <div className="overflow-x-auto">
              <table className="w-full text-right">
                  <thead>
                      <tr className="border-b border-slate-50">
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">نوع العملية</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">الجهة المنفذة</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">فترة التنفيذ</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">مدير المكالمة</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">الناتج النهائي</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">التفاصيل</th>
                      </tr>
                  </thead>
                  <tbody>
                      {historyData.map((item) => (
                          <motion.tr 
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group cursor-pointer"
                          >
                              <td className="px-10 py-8">
                                  <div className="flex items-center gap-5">
                                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                          <FileText size={22} />
                                      </div>
                                      <div>
                                          <p className="text-[10px] font-black text-slate-400 mb-0.5 tracking-widest uppercase">#{item.id}</p>
                                          <p className="text-sm font-black text-slate-900">{item.title}</p>
                                      </div>
                                  </div>
                              </td>
                              <td className="px-10 py-8">
                                  <div className="flex items-center gap-3">
                                      <Building2 size={16} className="text-slate-400" />
                                      <span className="text-xs font-bold text-slate-700">
                                          {item.dept === 'water' ? 'قطاع المياه' : 
                                           item.dept === 'electricity' ? 'طوارئ الكهرباء' : 'البيئة والنظافة'}
                                      </span>
                                  </div>
                              </td>
                              <td className="px-10 py-8">
                                  <div className="flex flex-col gap-1">
                                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-900">
                                          <Clock size={14} className="text-slate-300" />
                                          {item.duration}
                                      </div>
                                      <span className="text-[9px] font-bold text-slate-400 italic">تاريخ الإغلاق: {item.date}</span>
                                  </div>
                              </td>
                              <td className="px-10 py-8">
                                  <div className="flex items-center gap-2">
                                      <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-black">
                                          <User size={14} />
                                      </div>
                                      <span className="text-[11px] font-bold text-slate-600">{item.operator}</span>
                                  </div>
                              </td>
                              <td className="px-10 py-8">
                                  <div className={cn(
                                      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight",
                                      item.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                                  )}>
                                      {item.status === 'completed' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                      {item.status === 'completed' ? 'تم الإنجاز' : 'مرفوض / متعثر'}
                                  </div>
                              </td>
                              <td className="px-10 py-8 text-left">
                                  <button className="p-3 text-slate-300 hover:text-slate-900 transition-colors">
                                      <ArrowUpRight size={20} />
                                  </button>
                              </td>
                          </motion.tr>
                      ))}
                  </tbody>
              </table>
          </div>

          <div className="p-10 bg-slate-50/20 border-t border-slate-50 flex items-center justify-between">
               <div className="flex items-center gap-10">
                   <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">إجمالي الأرشفة</p>
                       <p className="text-xl font-black text-slate-900">٨,٤٣٠ عملية</p>
                   </div>
                   <div className="w-px h-10 bg-slate-100" />
                   <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">رضا المستخدم</p>
                       <p className="text-xl font-black text-slate-900">٩٦٪</p>
                   </div>
               </div>
               <div className="flex gap-2">
                   <button className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-slate-900 transition-all">١</button>
                   <button className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-slate-900 transition-all">٢</button>
                   <button className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-black text-xs">٣</button>
               </div>
          </div>
      </div>
    </div>
  );
};
