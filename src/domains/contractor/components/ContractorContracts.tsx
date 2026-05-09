import React from "react";
import { motion } from "motion/react";
import { FileStack, Search, Filter, Clock, CheckCircle2, ChevronLeft, ShieldCheck, Download, ExternalLink, Briefcase } from "lucide-react";

export const ContractorContracts: React.FC = () => {
  const contracts = [
    { id: "CON-7721", title: "توريد وتشييد وحدات سكنية مؤقتة", client: "مجلس الإغاثة الأعلى", value: "٤,٥٠٠,٠٠٠ ر.ي", status: "نشط", progress: 65, date: "١٥ أبريل ٢٠٢٦" },
    { id: "CON-7718", title: "صيانة شبكة مياه الحي الغربي", client: "إدارة مشاريع الأمانة", value: "١,٢٠٠,٠٠٠ ر.ي", status: "مكتمل", progress: 100, date: "٠١ مارس ٢٠٢٦" },
    { id: "CON-7715", title: "تجهيز مخازن تبريد طبية", client: "منظمة الصحة العالمية (شراكة)", value: "٨,٩٠٠,٠٠٠ ر.ي", status: "قيد المراجعة", progress: 0, date: "الغد" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase">عقود التنفيذ</h2>
          <p className="text-slate-500 font-medium italic">إدارة وتتبع العقود التشغيلية والاتفاقيات مع الجهات المانحة والمجالس</p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-amber-600 transition-all shadow-xl shadow-slate-900/10">
                <FileStack className="w-4 h-4" />
                إضافة عقد جديد
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
              { label: 'عقود جارية', val: '٠٨', color: 'bg-amber-50 text-amber-600' },
              { label: 'القيمة الإجمالية', val: '١٤.٦ م', color: 'bg-blue-50 text-blue-600' },
              { label: 'نسبة الإنجاز المتوسطة', val: '٧٢٪', color: 'bg-emerald-50 text-emerald-600' },
          ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-lg transition-all">
                  <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                      <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.val}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Briefcase className="w-6 h-6" />
                  </div>
              </div>
          ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md group">
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="البحث في العقود والاتفاقيات..." 
                    className="w-full py-4 pr-14 pl-6 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-amber-50 focus:border-amber-200 outline-none transition-all font-medium"
                />
            </div>
            <div className="flex gap-2">
                <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-amber-600 transition-all">
                    <Filter className="w-6 h-6" />
                </button>
            </div>
        </div>

        <div className="divide-y divide-slate-50">
            {contracts.map((contract, idx) => (
                <div key={contract.id} className="p-8 hover:bg-slate-50/50 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-8 group cursor-pointer">
                    <div className="flex items-start gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                            contract.status === 'نشط' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-400'
                        }`}>
                            <ShieldCheck className="w-7 h-7" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{contract.id} • {contract.client}</span>
                                {contract.progress > 90 && (
                                    <span className="bg-emerald-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">Finishing</span>
                                )}
                            </div>
                            <h4 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors italic tracking-tight">{contract.title}</h4>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="text-sm font-bold text-slate-900 italic">{contract.value}</div>
                                <div className="text-xs font-bold text-slate-400 italic flex items-center gap-2">
                                    <Clock className="w-3 h-3 opacity-50" />
                                    تاريخ التسليم: {contract.date}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-16">
                        <div className="w-full sm:w-48 space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest italic text-slate-400">
                                <span>الإنجاز</span>
                                <span>{contract.progress}%</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${contract.progress}%` }}
                                    className="h-full bg-amber-500 rounded-full"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-amber-600 hover:border-amber-100 transition-all shadow-sm">
                                <Download className="w-4 h-4" />
                            </button>
                            <button className="px-6 py-3 bg-white border-2 border-slate-100 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center gap-3 group/btn">
                                تفاصيل
                                <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform rotate-180" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
