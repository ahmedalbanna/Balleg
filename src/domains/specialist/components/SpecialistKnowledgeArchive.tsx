import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  Folder, 
  FileText, 
  ShieldCheck, 
  Eye, 
  Download, 
  ChevronRight, 
  ExternalLink,
  Lock,
  Clock,
  History,
  Archive,
  Star,
  MoreVertical,
  Plus
} from 'lucide-react';
import { cn } from '../../core/utils/cn';

const documents = [
  { id: 'DOC-001', name: 'كتيب معايير السلامة الكهربائية ٢٠٢٤', category: 'أدلة هندسية', date: '2024-01-15', size: '١٢ ميجا', type: 'PDF' },
  { id: 'DOC-002', name: 'مخططات شبكة المياه - قطاع الصافية', category: 'مخططات فنية', date: '2023-11-20', size: '٤٥ ميجا', type: 'DWG' },
  { id: 'DOC-003', name: 'بروتوكول الاستجابة السريعة للأزمات', category: 'سياسات العمل', date: '2024-03-05', size: '٥ ميجا', type: 'PDF' },
];

export const SpecialistKnowledgeArchive: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col gap-10 w-full" dir="rtl">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-2">
        <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-slate-700 shadow-xl shadow-slate-900/10">
                <BookOpen size={12} />
                مستودع المعرفة والوثائق الهندسية
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">المعارف والوثائق</h1>
            <p className="text-sm font-bold text-slate-400 italic">الوصول السريع للمراجع الفنية، مخططات البنية التحتية، وأدلة تشغيل المنصة</p>
        </div>

        <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-3 shadow-xl shadow-indigo-600/20">
            <Plus size={18} />
            رفع وثيقة جديدة
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Categories Sidebar */}
          <div className="lg:col-span-3 space-y-4">
              <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 italic">المجلدات الرئيسية</h3>
                  <div className="space-y-3">
                       {[
                           { name: 'أدلة التشغيل', count: 12, icon: BookOpen },
                           { name: 'المخططات الهندسية', count: 24, icon: Folder },
                           { name: 'السياسات والأنظمة', count: 8, icon: ShieldCheck },
                           { name: 'الأرشيف التاريخي', count: 45, icon: Archive },
                       ].map((cat, i) => (
                           <button 
                             key={i}
                             className="w-full p-5 rounded-[1.5rem] bg-slate-50 hover:bg-indigo-50 border border-slate-50 hover:border-indigo-100 transition-all group flex items-center justify-between"
                           >
                               <div className="flex items-center gap-3">
                                   <cat.icon size={16} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
                                   <span className="text-[11px] font-black text-slate-600 group-hover:text-slate-900">{cat.name}</span>
                               </div>
                               <span className="text-[10px] font-black text-slate-400">{cat.count}</span>
                           </button>
                       ))}
                  </div>
              </div>

              <div className="bg-indigo-600 p-8 rounded-[3rem] text-white overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <h4 className="text-lg font-black mb-2 relative z-10">تبحث عن شيء معين؟</h4>
                  <p className="text-[11px] font-bold text-indigo-100/60 mb-6 italic relative z-10 leading-relaxed text-right">استخدم ميزة البحث المتقدم للوصول للوثائق عبر الأرقام المرجعية.</p>
                  <div className="relative z-10">
                       <Search size={40} className="opacity-10 group-hover:scale-110 transition-transform" />
                  </div>
              </div>
          </div>

          {/* Main List */}
          <div className="lg:col-span-9 space-y-6">
               <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex items-center gap-6">
                    <div className="relative flex-1 group">
                        <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                        <input 
                          type="text" 
                          placeholder="البحث في المستندات والوثائق..." 
                          className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-50 rounded-2xl text-sm font-bold focus:bg-white focus:border-indigo-100 outline-none transition-all"
                        />
                    </div>
               </div>

               <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead>
                                <tr className="border-b border-slate-50">
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">اسم الوثيقة</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">التصنيف</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">التاريخ</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">الحجم</th>
                                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">تحميل</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((doc, i) => (
                                    <motion.tr 
                                      key={doc.id}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: i * 0.05 }}
                                      className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group cursor-pointer"
                                    >
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-4 text-right">
                                                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                                                    <FileText size={22} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">{doc.name}</p>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase font-mono tracking-widest">{doc.id}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] font-black uppercase tracking-tight">{doc.category}</span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 italic">
                                                <Clock size={12} />
                                                {doc.date}
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="text-[11px] font-bold text-slate-900">{doc.size}</span>
                                        </td>
                                        <td className="px-10 py-8 text-left">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 transition-all">
                                                    <Eye size={18} />
                                                </button>
                                                <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 transition-all">
                                                    <Download size={18} />
                                                </button>
                                                <button className="p-3 text-slate-300">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
               </div>
          </div>
      </div>
    </div>
  );
};
