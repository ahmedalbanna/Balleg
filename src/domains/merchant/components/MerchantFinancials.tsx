import React from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, DollarSign, PieChart, Calendar, Download, ChevronRight, ArrowUpRight, ArrowDownRight } from "lucide-react";

export const MerchantFinancials: React.FC = () => {
  const transactions = [
    { id: "TXN-٩٠١", type: "دخل", amount: "+٤٥,٠٠٠", category: "مبيعات جملة", date: "١٠:٣٠ ص", status: "مكتمل" },
    { id: "TXN-٩٠٠", type: "خرج", amount: "-١٢,٠٠٠", category: "شحن وتوصيل", date: "٩:٤٥ ص", status: "مكتمل" },
    { id: "TXN-٨٩٩", type: "دخل", amount: "+٨,٥٠٠", category: "مبيعات تجزئة", date: "أمس", status: "مكتمل" },
    { id: "TXN-٨٩٨", type: "خرج", amount: "-٢٠٠,٠٠٠", category: "شراء مخزون", date: "أمس", status: "قيد المراجعة" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in zoom-in-95 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">التقارير المالية</h2>
          <p className="text-slate-500 font-medium">نظرة شاملة على الأرباح، النفقات والتدفقات النقدية</p>
        </div>
        <div className="flex gap-3">
            <button className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-100 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all text-slate-600">
                <Calendar className="w-4 h-4" />
                آخر ٣٠ يوم
            </button>
            <button className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all shadow-lg shadow-slate-900/10">
                <Download className="w-4 h-4" />
                تصدير PDF
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'إجمالي المبيعات', val: '٨٥٠,٠٠٠', trend: '+١٢٪', icon: TrendingUp, color: 'emerald' },
          { label: 'إجمالي النفقات', val: '٣٢٠,٠٠٠', trend: '-٥٪', icon: TrendingDown, color: 'rose' },
          { label: 'صافي الفائدة', val: '٥٣٠,٠٠٠', trend: '+٨٪', icon: DollarSign, color: 'indigo' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/5 rounded-bl-[100px] -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700`} />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">{stat.label}</p>
            <div className="flex items-baseline gap-2 mb-4">
                <h3 className="text-4xl font-black text-slate-900">{stat.val}</h3>
                <span className="text-xs text-slate-400 font-bold">ر.ي</span>
            </div>
            <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${
                    stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                    {stat.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.trend}
                </div>
                <span className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.1em]">مقارنة بالشهر الماضي</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-12">
                   <div>
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter">أداء المبيعات</h3>
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.2em] mt-1">توزيع مبيعات المنتجات</p>
                   </div>
                   <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                        <PieChart className="w-6 h-6 text-indigo-400" />
                   </div>
                </div>
                
                <div className="space-y-8">
                    {[
                        { label: 'مواد غذائية أساسية', pct: 65, color: 'indigo' },
                        { label: 'منتجات تنظيف', pct: 20, color: 'emerald' },
                        { label: 'أدوات منزلية', pct: 15, color: 'orange' },
                    ].map((item, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-3 opacity-80">
                                <span>{item.label}</span>
                                <span>{item.pct}٪</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.pct}%` }}
                                    transition={{ duration: 1, delay: 0.5 + (idx * 0.2) }}
                                    className={`h-full bg-${item.color}-500`} 
                                />
                            </div>
                        </div>
                    ))}
                </div>
              </div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]" />
          </div>

          <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter">آخر العمليات</h3>
                 <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-1 group">
                    عرض الكل
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform rotate-180" />
                 </button>
              </div>

              <div className="divide-y divide-slate-50">
                {transactions.map((txn, i) => (
                    <div key={i} className="py-5 flex items-center justify-between group cursor-pointer hover:bg-slate-50/50 transition-all px-4 rounded-3xl">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                txn.type === 'دخل' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                            } group-hover:rotate-12 transition-transform`}>
                                {txn.type === 'دخل' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{txn.category}</h4>
                                <span className="text-[10px] font-bold text-slate-300 italic">{txn.date} • {txn.id}</span>
                            </div>
                        </div>
                        <div className="text-right">
                             <p className={`text-sm font-black ${
                                txn.type === 'دخل' ? 'text-emerald-600' : 'text-rose-600'
                             }`}>{txn.amount} ر.ي</p>
                             <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{txn.status}</span>
                        </div>
                    </div>
                ))}
              </div>
          </div>
      </div>
    </div>
  );
};
