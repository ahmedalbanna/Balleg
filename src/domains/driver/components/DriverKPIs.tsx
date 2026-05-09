import React from "react";
import { motion } from "motion/react";
import { Award, Target, TrendingUp, ShieldCheck, Zap, Star, Activity, BarChart3, ChevronRight } from "lucide-react";

export const DriverKPIs: React.FC = () => {
  const metrics = [
    { label: "معدل السلامة", value: "٩٢٪", target: "٩٥٪", color: "emerald", icon: ShieldCheck },
    { label: "دقة المواعيد", value: "٨٨٪", target: "٩٠٪", color: "amber", icon: Target },
    { label: "تقييم العملاء", value: "٤.٩", target: "٥.٠", color: "indigo", icon: Star },
    { label: "بلاغات مؤكدة", value: "٤٥", target: "٥٠", color: "blue", icon: Activity },
  ];

  return (
    <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">مؤشرات الأداء (KPIs)</h2>
          <p className="text-slate-500 font-medium italic">تحليل دقيق لمستوى الأداء، الأمان والكفاءة الميدانية</p>
        </div>
        <div className="bg-amber-500 text-white px-8 py-4 rounded-[28px] font-black uppercase tracking-[0.2em] shadow-xl shadow-amber-500/20 text-xs flex items-center gap-3">
            <Award className="w-5 h-5" />
            مرتبة السائق: ذهبي
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className={`w-14 h-14 rounded-2xl bg-${m.color}-50 text-${m.color}-600 flex items-center justify-center mb-10 group-hover:bg-${m.color}-600 group-hover:text-white transition-all duration-500`}>
                <m.icon className="w-8 h-8" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">{m.label}</p>
            <div className="flex items-baseline gap-2 mb-8">
                <h3 className="text-4xl font-black text-slate-900">{m.value}</h3>
                <span className="text-[10px] text-slate-300 font-black uppercase tracking-widest leading-none">Target: {m.target}</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: m.value }}
                    className={`h-full bg-${m.color}-500 rounded-full`}
                />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-slate-900 rounded-[48px] p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10 flex flex-col h-full">
                  <header className="flex items-center justify-between mb-12">
                      <div>
                          <h3 className="text-2xl font-black italic uppercase tracking-tighter">رحلة النمو</h3>
                          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">تطور مستوى الأداء عبر الأسابيع</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-amber-500" />
                  </header>

                  <div className="flex-1 flex items-end justify-between gap-6 px-4">
                      {[60, 85, 70, 95, 80, 100, 90].map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-4">
                              <div className="w-full relative group">
                                <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h * 1.5}px` }}
                                    className={`w-full rounded-2xl bg-gradient-to-t ${i === 5 ? 'from-amber-500 to-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.3)]' : 'from-white/10 to-white/5 opacity-50'} group-hover:opacity-100 transition-all`}
                                />
                                {i === 5 && (
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg italic">BEST</div>
                                )}
                              </div>
                              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest italic">W-{i+1}</span>
                          </div>
                      ))}
                  </div>

                  <div className="mt-12 flex gap-12 pt-10 border-t border-white/5">
                      <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">صافي التقدم</p>
                          <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-black">+١٥٪</span>
                              <TrendingUp className="w-4 h-4 text-emerald-400" />
                          </div>
                      </div>
                      <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">مكافأة الشهر</p>
                          <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-black">٤٥٠</span>
                              <Zap className="w-4 h-4 text-amber-400" />
                          </div>
                      </div>
                  </div>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] -mr-48 -mt-48" />
          </div>

          <div className="lg:col-span-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-[48px] p-12 text-white shadow-2xl relative overflow-hidden group">
              <Zap className="absolute -bottom-20 -right-20 w-80 h-80 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
              <div className="relative z-10 space-y-12">
                  <div>
                      <h3 className="text-5xl font-black italic tracking-tighter mb-4 leading-none uppercase">Level Up!</h3>
                      <p className="text-amber-100 font-bold opacity-80 italic">لقد وصلت لمرتبة "السائق الذهبي" هذا الشهر. تفصلك ٢٥٠ نقطة فقط عن مرتبة "الأسطورة".</p>
                  </div>

                  <div className="space-y-6">
                      {[
                          { title: 'دخول مسبق لمواقف النخبة', icon: ShieldCheck },
                          { title: 'خصم ٢٠٪ على قطع الغيار', icon: Zap },
                          { title: 'تأمين طبي شامل للعائلة', icon: Star },
                      ].map((benefit, i) => (
                          <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all cursor-pointer">
                              <div className="flex items-center gap-4">
                                  <benefit.icon className="w-6 h-6 text-amber-200" />
                                  <span className="text-sm font-black uppercase tracking-tight">{benefit.title}</span>
                              </div>
                              <ChevronRight className="w-5 h-5 text-amber-200 rotate-180" />
                          </div>
                      ))}
                  </div>

                  <button className="w-full py-6 bg-white text-amber-600 rounded-[30px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-amber-900/20 hover:scale-105 active:scale-95 transition-all">
                      استعراض كافة المزايا
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};
