import React from "react";
import { motion } from "motion/react";
import { Archive, Search, Filter, FileText, Calendar, Download, Eye, MoreHorizontal, ShieldCheck, ChevronRight } from "lucide-react";

export const CouncilArchive: React.FC = () => {
  const archives = [
    { id: "ARC-2201", name: "تقرير الربع الأول لعام ٢٠٢٦", date: "مارس ٢٠٢٦", size: "٢.٥ ميجا", type: "PDF", category: "تقارير مالية" },
    { id: "ARC-2198", name: "سجل العمليات الإغاثية - عدن", date: "فبراير ٢٠٢٦", size: "١.٨ ميجا", type: "Excel", category: "عمليات ميدانية" },
    { id: "ARC-2195", name: "محاضر اجتماعات اللجنة العليا", date: "يناير ٢٠٢٦", size: "٨٥٠ كيلو", type: "Docs", category: "قرارات إدارية" },
    { id: "ARC-2190", name: "دراسة الأثر الانساني - الربع الرابع ٢٠٢٥", date: "ديسمبر ٢٠٢٥", size: "٤.٢ ميجا", type: "PDF", category: "دراسات وأبحاث" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">الأرشيف التاريخي</h2>
          <p className="text-slate-500 font-medium italic">الوصول الآمن لسجلات العمليات السابقة والتقارير الأرشيفية</p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-3 px-6 py-3 bg-slate-100 text-slate-900 rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all active:scale-95">
                <Archive className="w-4 h-4" />
                طلب أرشفة جديدة
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
              { label: 'إجمالي الوثائق', val: '١,٢٥٠', icon: FileText, color: 'indigo' },
              { label: 'طلبات الوصول', val: '١٤', icon: ShieldCheck, color: 'amber' },
              { label: 'سجلات مؤرشفة', val: '٤٥٠', icon: Archive, color: 'blue' },
              { label: 'تقارير دورية', val: '٨٥', icon: Calendar, color: 'emerald' },
          ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm text-center group transition-all hover:shadow-xl">
                  <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mx-auto mb-4 group-hover:bg-${stat.color}-600 group-hover:text-white transition-all duration-500`}>
                      <stat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 leading-none">{stat.val}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 italic">{stat.label}</p>
              </div>
          ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative flex-1 max-w-xl group">
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="البحث في الأرشيف (رقم الملف، السنة، الموضوع)..." 
                    className="w-full py-4 pr-14 pl-6 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none transition-all font-medium italic"
                />
            </div>
            <div className="flex gap-3">
                <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 hover:bg-slate-50 transition-all">
                    <Filter className="w-4 h-4" />
                    فلترة النتائج
                </button>
            </div>
        </div>

        <div className="divide-y divide-slate-50">
           {archives.map((doc, idx) => (
               <div key={doc.id} className="p-8 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 group">
                   <div className="flex items-center gap-6">
                       <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-indigo-600 group-hover:border-indigo-100 group-hover:shadow-lg transition-all duration-500">
                            <span className="text-xs font-black italic">{doc.type}</span>
                       </div>
                       <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{doc.id}</span>
                                <span className="text-[10px] font-black px-1.5 py-0.5 bg-indigo-50 text-indigo-500 rounded uppercase tracking-tighter">{doc.category}</span>
                            </div>
                            <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors italic tracking-tight">{doc.name}</h4>
                            <div className="flex items-center gap-4 mt-2">
                                <span className="text-xs font-bold text-slate-400 flex items-center gap-1 italic">
                                    <Calendar className="w-3 h-3" />
                                    {doc.date}
                                </span>
                                <span className="text-xs font-bold text-slate-400 flex items-center gap-1 italic">
                                    <FileText className="w-3 h-3" />
                                    {doc.size}
                                </span>
                            </div>
                       </div>
                   </div>

                   <div className="flex items-center gap-4">
                        <button className="p-4 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-indigo-600 hover:border-indigo-100 hover:shadow-lg transition-all shadow-sm">
                            <Eye className="w-5 h-5" />
                        </button>
                        <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-3 active:scale-95 shadow-xl shadow-slate-900/10">
                            تحميل الملف
                            <Download className="w-4 h-4" />
                        </button>
                        <button className="p-4 text-slate-300 hover:text-indigo-600 transition-all">
                            <MoreHorizontal className="w-6 h-6" />
                        </button>
                   </div>
               </div>
           ))}
        </div>
      </div>

      <div className="flex justify-center pt-8">
          <button className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] hover:text-indigo-600 transition-all flex items-center gap-4 group">
              مشاهدة السجلات الأقدم
              <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-2 transition-transform" />
          </button>
      </div>
    </div>
  );
};
