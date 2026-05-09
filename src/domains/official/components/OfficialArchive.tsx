import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Archive, 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Eye, 
  Clock, 
  Lock, 
  ShieldCheck, 
  Calendar,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  FolderOpen,
  HardDrive
} from 'lucide-react';
import { cn } from '../../core/utils/cn';

const archivedData = [
  { id: 'ARC-001', name: 'تقرير الربع الأول لعام ٢٠٢٣ - قطاع المياه', date: '2023-03-31', size: '١٢ ميجا', type: 'PDF' },
  { id: 'ARC-002', name: 'سجل البلاغات التاريخي - مديرية السبعين', date: '2023-01-15', size: '٤٥ ميجا', type: 'XLSX' },
  { id: 'ARC-003', name: 'مذكرة تفاهم الربط التجاري مع القطاع الخاص', date: '2022-11-20', size: '٥ ميجا', type: 'PDF' },
  { id: 'ARC-004', name: 'مخططات البنية التحتية لمديرية صنعاء القديمة', date: '2022-08-05', size: '١٢٠ ميجا', type: 'DWG' },
];

export const OfficialArchive: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col gap-8 w-full" dir="rtl">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-2">
        <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-slate-700 shadow-xl shadow-slate-900/10">
                <Archive size={12} />
                مستودع الوثائق السيادية
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">الأرشيف الحكومي الموحد</h1>
            <p className="text-sm font-bold text-slate-400 italic">الوصول السريع لكافة الوثائق المؤرشفة، التقارير التاريخية، والسجلات الرسمية للمنصة</p>
        </div>

        <div className="flex items-center gap-4">
             <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-indigo-100 transition-all">
                 <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                     <HardDrive size={20} />
                 </div>
                 <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">المساحة المستخدمة</p>
                     <p className="text-sm font-black text-slate-900">١.٢ تيرابايت</p>
                 </div>
             </div>
        </div>
      </header>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 bg-slate-50/20 flex flex-col sm:flex-row gap-6 items-center">
              <div className="relative flex-1 group">
                  <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="البحث في الأرشيف برقم الوثيقة، العنوان، أو التاريخ..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-16 py-5 bg-white border border-slate-100 rounded-[2rem] text-sm font-bold focus:ring-4 focus:ring-slate-900/5 outline-none transition-all"
                  />
              </div>
              <div className="flex gap-3">
                  <button className="p-5 bg-white border border-slate-100 rounded-[1.5rem] text-slate-500 hover:text-slate-900 hover:border-slate-200 transition-all">
                      <Filter size={20} />
                  </button>
                  <button className="p-5 bg-white border border-slate-100 rounded-[1.5rem] text-slate-500 hover:text-slate-900 hover:border-slate-200 transition-all">
                      <Calendar size={20} />
                  </button>
              </div>
          </div>

          <div className="overflow-x-auto">
              <table className="w-full text-right">
                  <thead>
                      <tr className="border-b border-slate-50">
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">الوثيقة</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">المعرف الرقمي</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">تاريخ الأرشفة</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">الحجم</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">الصلاحية</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">تحميل</th>
                      </tr>
                  </thead>
                  <tbody>
                      {archivedData.map((doc, i) => (
                          <motion.tr 
                            key={doc.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group cursor-pointer"
                          >
                              <td className="px-10 py-6">
                                  <div className="flex items-center gap-5">
                                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                          <FileText size={22} />
                                      </div>
                                      <div>
                                          <p className="text-sm font-black text-slate-900 mb-1 group-hover:text-slate-900 transition-colors">{doc.name}</p>
                                          <span className="px-2 py-0.5 rounded flex items-center gap-1.5 w-fit text-[9px] font-black bg-indigo-50 text-indigo-600 border border-indigo-100">
                                              <FolderOpen size={10} />
                                              {doc.type}
                                          </span>
                                      </div>
                                  </div>
                              </td>
                              <td className="px-10 py-6">
                                  <span className="text-[11px] font-black font-mono text-slate-400">{doc.id}</span>
                              </td>
                              <td className="px-10 py-6">
                                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 italic">
                                      <Clock size={14} className="text-slate-400" />
                                      {doc.date}
                                  </div>
                              </td>
                              <td className="px-10 py-6 text-[11px] font-black text-slate-400">
                                  {doc.size}
                              </td>
                              <td className="px-10 py-6">
                                  <div className="flex items-center gap-2">
                                      <ShieldCheck size={14} className="text-emerald-500" />
                                      <span className="text-[10px] font-black text-emerald-600">مصرح للجميع</span>
                                  </div>
                              </td>
                              <td className="px-10 py-6 text-left">
                                  <div className="flex items-center justify-end gap-3">
                                      <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl border border-transparent hover:border-indigo-100 transition-all">
                                          <Eye size={18} />
                                      </button>
                                      <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl border border-transparent hover:border-blue-100 transition-all">
                                          <Download size={18} />
                                      </button>
                                      <button className="p-3 text-slate-300 hover:text-slate-900 transition-colors">
                                          <MoreVertical size={18} />
                                      </button>
                                  </div>
                              </td>
                          </motion.tr>
                      ))}
                  </tbody>
              </table>
          </div>

          <div className="p-10 bg-slate-50/30 flex items-center justify-between border-t border-slate-50">
              <p className="text-xs font-bold text-slate-400 italic">عرض سجلات من عام ٢٠٢٢ - ٢٠٢٤</p>
              <div className="flex items-center gap-3">
                  <button className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 disabled:opacity-30 transition-all pointer-events-none opacity-30">
                      <ChevronRight size={20} />
                  </button>
                  <div className="flex gap-2">
                      <button className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-black text-xs shadow-lg shadow-slate-900/20">١</button>
                      <button className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-slate-400 font-black text-xs hover:border-slate-300 transition-all">٢</button>
                  </div>
                  <button className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all">
                      <ChevronLeft size={20} />
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};
