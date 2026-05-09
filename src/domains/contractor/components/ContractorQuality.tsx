import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, BarChart3, Search, Filter, CheckCircle2, AlertTriangle, FileText, ChevronLeft, ArrowUpRight, Scale, HardHat } from "lucide-react";

export const ContractorQuality: React.FC = () => {
  const reports = [
    { id: "QA-551", title: "مراجعة سلامة مخازن الأمانة", status: "معتمد", score: 98, date: "منذ ٤ ساعات", inspector: "م. فهد الزبيري" },
    { id: "QA-548", title: "فحص جودة مواد البناء - التوريد ب", status: "تحت التدقيق", score: 85, date: "منذ يوم", inspector: "م. ريما صالح" },
    { id: "QA-545", title: "تقييم أداء فريق التفتيش الميداني", status: "معتمد", score: 92, date: "منذ يومين", inspector: "أ. عصام حسن" },
    { id: "QA-542", title: "تقرير مخالفة معايير التخزين", status: "مرفوض", score: 45, date: "منذ ٣ أيام", inspector: "م. فهد الزبيري" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in slide-in-from-top-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase">تقارير الجودة</h2>
          <p className="text-slate-500 font-medium italic">إدارة معايير الجودة، التقارير الرقابية، وضمان الامتثال للمواصفات الفنية</p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-3 px-6 py-3 bg-emerald-600 text-white rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 active:scale-95">
                <ShieldCheck className="w-4 h-4" />
                رفع تقرير جودة
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'متوسط الجودة', val: '٩٤٪', color: 'bg-emerald-50 text-emerald-600', icon: CheckCircle2 },
          { label: 'تقارير معتمدة', val: '١٢٨', color: 'bg-blue-50 text-blue-600', icon: FileText },
          { label: 'تحتاج معالجة', val: '٠٦', color: 'bg-rose-50 text-rose-600', icon: AlertTriangle },
          { label: 'عمليات الفحص', val: '٤٥٠', color: 'bg-amber-50 text-amber-600', icon: Search },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all">
            <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 leading-none tracking-tighter">{stat.val}</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 italic">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
               <h3 className="font-black text-slate-900 italic uppercase">سجل التقارير الرقابية</h3>
               <div className="relative group max-w-xs w-full">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="البحث في التقارير..."
                        className="w-full py-3 pr-10 pl-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-200 outline-none transition-all font-medium italic text-xs"
                    />
               </div>
          </div>

          <div className="divide-y divide-slate-50">
            {reports.map((report, idx) => (
              <div key={report.id} className="p-8 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 group cursor-pointer">
                <div className="flex gap-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black italic shadow-sm shrink-0 ${
                        report.score >= 90 ? 'bg-emerald-50 text-emerald-600' : report.score >= 70 ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                        {report.score}%
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{report.id} • {report.inspector}</span>
                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ${
                                report.status === 'معتمد' ? 'bg-emerald-500 text-white' : 
                                report.status === 'مرفوض' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'
                            }`}>
                                {report.status}
                            </span>
                        </div>
                        <h4 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors italic tracking-tight leading-tight">{report.title}</h4>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">{report.date}</p>
                    </div>
                </div>
                <button className="px-6 py-3 bg-white border-2 border-slate-100 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center gap-3 group/btn">
                  عرض التقرير
                  <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform rotate-180" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
             <div className="bg-slate-900 rounded-[48px] p-10 text-white overflow-hidden relative shadow-2xl h-full flex flex-col justify-between group">
                <div className="relative z-10">
                    <header className="flex items-center justify-between mb-12">
                         <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-tight">تحليل الامتثال</h3>
                         <Scale className="w-8 h-8 text-emerald-500" />
                    </header>
                    <div className="space-y-12">
                        <div className="flex items-end justify-between">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">إجمالي الدرجات</p>
                                <h4 className="text-5xl font-black italic tracking-tighter">٩٦٢</h4>
                            </div>
                            <div className="text-emerald-500 flex items-center gap-1 font-black text-sm italic mb-2">
                                <ArrowUpRight className="w-4 h-4" />
                                ٤.٢+
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { label: 'معايير السلامة', pct: 98, color: 'emerald' },
                                { label: 'دقة التنفيذ', pct: 85, color: 'blue' },
                                { label: 'جودة المواد', pct: 92, color: 'amber' },
                            ].map((s, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest italic">
                                        <span className="text-white/60">{s.label}</span>
                                        <span className={`text-${s.color}-400`}>{s.pct}%</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${s.pct}%` }}
                                            transition={{ delay: i * 0.2 }}
                                            className={`h-full bg-${s.color}-500`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button className="w-full mt-12 py-5 bg-white/5 border border-white/10 text-white hover:bg-emerald-600 hover:border-emerald-600 rounded-[24px] font-black uppercase tracking-widest text-[10px] transition-all relative z-10 backdrop-blur-xl">
                    تصدير ملف المواصفات
                </button>
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:scale-150 transition-transform duration-1000" />
             </div>
        </div>
      </div>
    </div>
  );
};
