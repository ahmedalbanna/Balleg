import React from "react";
import { motion } from "motion/react";
import { Fuel, TrendingUp, TrendingDown, Zap, Calendar, Download, Droplets, Gauge } from "lucide-react";

export const DriverFuel: React.FC = () => {
  const fuelEvents = [
    { id: "FL-991", date: "٩ مايو", station: "محطة البركة", amount: "٤٥ لتر", cost: "٢٨,٠٠٠ ر.ي", efficiency: "٩٥٪" },
    { id: "FL-990", date: "٦ مايو", station: "محطة السلام", amount: "٥٠ لتر", cost: "٣١,٠٠٠ ر.ي", efficiency: "٩٢٪" },
    { id: "FL-989", date: "٢ مايو", station: "محطة المدينة", amount: "٤٠ لتر", cost: "٢٤,٨٠٠ ر.ي", efficiency: "٨٨٪" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in zoom-in-95 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">استهلاك الوقود</h2>
          <p className="text-slate-500 font-medium italic">مراقبة كفاءة الاستهلاك وتكاليف التشغيل</p>
        </div>
        <div className="flex gap-3">
            <button className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-100 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all text-slate-600 shadow-sm">
                <Calendar className="w-4 h-4" />
                آخر ٣٠ يوم
            </button>
            <button className="flex items-center gap-3 px-6 py-3 bg-amber-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/20">
                <Fuel className="w-4 h-4" />
                تحميل فاتورة
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'متوسط الاستهلاك', val: '٨.٥', unit: 'لتر/١٠٠كم', trend: '-٢٪', icon: Droplets, color: 'emerald' },
          { label: 'إجمالي النفقات', val: '٨٤,٠٠٠', unit: 'ر.ي', trend: '+٤٪', icon: TrendingUp, color: 'rose' },
          { label: 'كفاءة القيادة', val: '٩٤٪', unit: 'مؤشر', trend: '+٥٪', icon: Gauge, color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/5 rounded-bl-[100px] -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700`} />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">{stat.label}</p>
            <div className="flex items-baseline gap-2 mb-4">
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.val}</h3>
                <span className="text-xs text-slate-400 font-bold italic">{stat.unit}</span>
            </div>
            <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${
                    stat.trend.startsWith('+') ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                    {stat.trend}
                </div>
                <span className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.1em]">منذ الشهر الماضي</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl border border-white/5">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-12">
                   <div>
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter">تحليل الكفاءة</h3>
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.2em] mt-1">تطور استهلاك الوقود أسبوعياً</p>
                   </div>
                   <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                        <TrendingDown className="w-6 h-6 text-emerald-400" />
                   </div>
                </div>
                
                <div className="h-48 flex items-end justify-between gap-4 px-4 overflow-hidden">
                    {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                        <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400/20 rounded-t-xl group relative"
                        >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black uppercase bg-white text-slate-900 px-2 py-1 rounded shadow-lg">
                                {h}%
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="flex justify-between mt-6 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">
                    <span>السبت</span>
                    <span>الأحد</span>
                    <span>الاثنين</span>
                    <span>الثلاثاء</span>
                    <span>الأربعاء</span>
                    <span>الخميس</span>
                    <span>الجمعة</span>
                </div>
              </div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px]" />
          </div>

          <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-xl shadow-slate-200/40">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter">سجل التعبئة</h3>
                 <button className="text-[10px] font-black text-amber-600 uppercase tracking-widest hover:underline flex items-center gap-1 group">
                    عرض السجل الكامل
                    <Download className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" />
                 </button>
              </div>

              <div className="divide-y divide-slate-50">
                {fuelEvents.map((event, i) => (
                    <div key={i} className="py-5 flex items-center justify-between group cursor-pointer hover:bg-slate-50/50 transition-all px-4 rounded-3xl">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:rotate-12 transition-transform">
                                <Fuel className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{event.station}</h4>
                                <span className="text-[10px] font-bold text-slate-300 italic">{event.date} • {event.id}</span>
                            </div>
                        </div>
                        <div className="text-right">
                             <p className="text-sm font-black text-slate-900">{event.amount} <span className="text-[10px] text-slate-400">({event.cost})</span></p>
                             <div className="flex items-center justify-end gap-1">
                                <Zap className="w-3 h-3 text-emerald-500 fill-current" />
                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">كفاءة {event.efficiency}</span>
                             </div>
                        </div>
                    </div>
                ))}
              </div>
          </div>
      </div>
    </div>
  );
};
