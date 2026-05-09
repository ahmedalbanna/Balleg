import React from "react";
import { motion } from "motion/react";
import { FileText, Search, Filter, AlertCircle, CheckCircle2, Clock, ChevronLeft, ShieldCheck, Scale } from "lucide-react";

export const CouncilReports: React.FC = () => {
  const reports = [
    { id: "REP-001", title: "اشتباه في توزيع غير عادل", entity: "مخيم الوحده", type: "مالي", priority: "high", status: "تحت التحقيق", date: "منذ يوم" },
    { id: "REP-002", title: "شكوى جودة المواد الغذائية", entity: "مؤسسة الأمل", type: "جودة", priority: "medium", status: "مكتمل", date: "منذ ٣ أيام" },
    { id: "REP-003", title: "تأخر في توريد الشحنات", entity: "تاجر الجملة ب", type: "إجرائي", priority: "low", status: "جديد", date: "منذ ساعتين" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">البلاغات والتحقيقات</h2>
          <p className="text-slate-500 font-medium italic">إدارة البلاغات الواردة ومتابعة إجراءات التحقيق التنظيمية</p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10">
                <Scale className="w-4 h-4" />
                فتح تحقيق جديد
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
              { label: 'بلاغات نشطة', val: '١٢', color: 'bg-rose-50 text-rose-600' },
              { label: 'تحت المراجعة', val: '٤٥', color: 'bg-amber-50 text-amber-600' },
              { label: 'قضايا مغلقة', val: '١٢٨', color: 'bg-emerald-50 text-emerald-600' },
          ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                      <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.val}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center`}>
                      <AlertCircle className="w-6 h-6" />
                  </div>
              </div>
          ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md group">
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="البحث في القضايا والبلاغات..." 
                    className="w-full py-4 pr-14 pl-6 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none transition-all font-medium"
                />
            </div>
            <div className="flex gap-2">
                <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all">
                    <Filter className="w-6 h-6" />
                </button>
            </div>
        </div>

        <div className="divide-y divide-slate-50">
            {reports.map((report, idx) => (
                <div key={report.id} className="p-8 hover:bg-slate-50/50 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-8 group cursor-pointer">
                    <div className="flex items-start gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                            report.priority === 'high' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'
                        }`}>
                            <FileText className="w-7 h-7" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{report.id} • {report.type}</span>
                                {report.priority === 'high' && (
                                    <span className="bg-rose-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter animate-pulse">Urgnet</span>
                                )}
                            </div>
                            <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors italic tracking-tight">{report.title}</h4>
                            <p className="text-sm font-bold text-slate-400 mt-1 italic flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 opacity-50" />
                                المستهدف: {report.entity}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-16">
                        <div className="flex gap-8">
                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">الحالة</p>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${report.status === 'مكتمل' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                    <span className="text-sm font-black text-slate-900">{report.status}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">تاريخ البلاغ</p>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm font-bold">{report.date}</span>
                                </div>
                            </div>
                        </div>
                        <button className="px-6 py-3 bg-white border-2 border-slate-100 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center gap-3 group/btn">
                            عرض الملف
                            <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform rotate-180" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
