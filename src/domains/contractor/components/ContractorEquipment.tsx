import React from "react";
import { motion } from "motion/react";
import { Truck, Settings, Wrench, Search, Filter, AlertCircle, CheckCircle2, Navigation, MoreVertical, Battery, Gauge, Calendar, Cog } from "lucide-react";

export const ContractorEquipment: React.FC = () => {
  const equipments = [
    { id: "EQ-102", name: "رافعة شوكية ٥ طن", type: "آليات ثقيلة", fuel: "٧٥٪", status: "نشط", maintenance: "منذ ١٤ يوم", location: "موقع أ" },
    { id: "EQ-105", name: "مولد كهربائي ١٠٠ كيلوواط", type: "طاقة", fuel: "٤٢٪", status: "تحذير", maintenance: "منذ ٤٥ يوم", location: "موقع ب" },
    { id: "EQ-108", name: "حفارة هيدروليكية", type: "آليات ثقيلة", fuel: "٩٠٪", status: "توقف", maintenance: "اليوم", location: "الورشة المركزية" },
    { id: "EQ-112", name: "ضاغط هواء صناعي", type: "أدوات", fuel: "١٠٠٪", status: "نشط", maintenance: "منذ ٥ أيام", location: "مخازن الأمانة" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in zoom-in-95 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase">إدارة المعدات</h2>
          <p className="text-slate-500 font-medium italic">متابعة الآليات الثقيلة، الصيانة الدورية، وتتبع المواقع الميدانية للمعدات</p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-amber-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                <Settings className="w-4 h-4" />
                سجل صيانة جديد
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
              { label: 'إجمالي الآليات', val: '٢٤', color: 'bg-slate-50 text-slate-600' },
              { label: 'قيد الخدمة', val: '١٨', color: 'bg-emerald-50 text-emerald-600' },
              { label: 'تحتاج صيانة', val: '٠٤', color: 'bg-rose-50 text-rose-600' },
              { label: 'في المخزن', val: '٠٢', color: 'bg-blue-50 text-blue-600' },
          ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-lg transition-all">
                  <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                      <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.val}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center group-hover:rotate-12 transition-transform`}>
                      <Truck className="w-6 h-6" />
                  </div>
              </div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl p-4 overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                     <h3 className="font-black text-slate-900 italic uppercase">قائمة المعدات والآليات</h3>
                     <div className="flex gap-2">
                         <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-amber-600 transition-all">
                             <Filter className="w-5 h-5" />
                         </button>
                     </div>
                </div>
                <div className="divide-y divide-slate-50">
                    {equipments.map((eq, i) => (
                        <div key={i} className="p-8 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row items-center justify-between gap-8 group cursor-pointer">
                             <div className="flex items-center gap-6">
                                <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform ${
                                    eq.status === 'تحذير' ? 'bg-rose-50 text-rose-600' : 'bg-slate-900 text-amber-500'
                                }`}>
                                    <Truck className="w-8 h-8" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{eq.id} • {eq.type}</span>
                                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ${
                                            eq.status === 'نشط' ? 'bg-emerald-500 text-white' : 
                                            eq.status === 'توقف' ? 'bg-slate-200 text-slate-500' : 'bg-rose-600 text-white animate-pulse'
                                        }`}>
                                            {eq.status}
                                        </span>
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors italic tracking-tight">{eq.name}</h4>
                                    <div className="flex items-center gap-4 mt-2">
                                         <span className="text-xs font-bold text-slate-400 flex items-center gap-1 italic">
                                            <Navigation className="w-3 h-3" />
                                            {eq.location}
                                         </span>
                                         <span className="text-xs font-bold text-slate-400 flex items-center gap-1 italic">
                                            <Calendar className="w-3 h-3" />
                                            آخر صيانة: {eq.maintenance}
                                         </span>
                                    </div>
                                </div>
                             </div>

                             <div className="flex items-center gap-10">
                                 <div className="text-right space-y-1">
                                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic">المستوى</p>
                                      <div className="flex items-center gap-2">
                                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                              <div className="h-full bg-amber-500" style={{ width: eq.fuel }} />
                                          </div>
                                          <span className="text-xs font-black text-slate-900">{eq.fuel}</span>
                                      </div>
                                 </div>
                                 <button className="p-4 text-slate-300 hover:text-slate-900 transition-colors">
                                     <MoreVertical className="w-6 h-6" />
                                 </button>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="space-y-6">
            <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl h-full flex flex-col justify-between group">
                <div className="relative z-10">
                    <header className="flex items-center justify-between mb-12">
                         <h3 className="text-2xl font-black italic uppercase tracking-tighter">صحة المعدات</h3>
                         <Cog className="w-8 h-8 text-amber-500 animate-spin-slow" />
                    </header>
                    <div className="space-y-10">
                        <div className="text-center p-8 bg-white/5 rounded-[40px] border border-white/5 backdrop-blur-xl group-hover:bg-white/10 transition-all">
                             <span className="text-5xl font-black italic text-amber-500">٩٢٪</span>
                             <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">معدل جاهزية الأسطول</p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { label: 'استهلاك الوقود', val: '٣٤٠ لتر', icon: Gauge },
                                { label: 'إجمالي البلاغات', val: '٠٥ أعطال', icon: AlertCircle },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center gap-4 group/item">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover/item:text-amber-500 transition-colors">
                                        <s.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-600 italic leading-none">{s.label}</p>
                                        <p className="font-black italic mt-1">{s.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-12 relative z-10">
                     <button className="w-full py-5 bg-amber-500 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/20 active:scale-95 leading-none h-14">
                        تقرير الكفاءة التشغيلية
                     </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:scale-150 transition-transform duration-1000" />
            </div>
        </div>
      </div>
    </div>
  );
};
