import { Briefcase, Activity, Landmark, Map, AlertTriangle, CheckCircle2, TrendingUp, BarChart3, Globe, Users, ChevronRight, Menu } from "lucide-react";
import { motion } from "motion/react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from "recharts";

export function AdminDashboard() {
  const cityVitalData = [
    { name: 'يناير', reports: 400, resolved: 240 },
    { name: 'فبراير', reports: 300, resolved: 139 },
    { name: 'مارس', reports: 200, resolved: 980 },
    { name: 'أبريل', reports: 278, resolved: 390 },
    { name: 'مايو', reports: 189, resolved: 480 },
  ];

  const districtPerformance = [
    { district: 'مديرية التحرير', score: 94, status: 'ممتاز', color: '#10b981' },
    { district: 'مديرية السبعين', score: 82, status: 'جيد جداً', color: '#3b82f6' },
    { district: 'مديرية شعوب', score: 65, status: 'بحاجة تحسين', color: '#f59e0b' },
    { district: 'مديرية الصافية', score: 48, status: 'حرج', color: '#ef4444' },
  ];

  const executiveStats = [
    { label: "إجمالي البلاغات", value: "٤,٥٩٢", sub: "هذا العام", icon: Globe, color: "text-slate-900", bg: "bg-slate-100" },
    { label: "معدل الرضا العام", value: "٤.٦/٥", sub: "مؤشر ثقة الجمهور", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "كفاءة الميزانية", value: "٩٢٪", sub: "عائد الاستثمار الخدمي", icon: Landmark, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="flex flex-col gap-10 w-full p-2 sm:p-12 bg-white min-h-[90vh] rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
      {/* Executive Header */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 relative z-10">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-[2.5rem] bg-slate-900 text-white flex items-center justify-center shadow-2xl shadow-slate-900/20 ring-4 ring-slate-50">
            <Briefcase className="w-10 h-10" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 block">المكتب التنفيذي الأعلى</span>
            <h2 className="text-4xl font-black text-slate-900 font-readex tracking-tight">لوحة القيادة الإستراتيجية</h2>
          </div>
        </div>
        
        <div className="flex gap-4">
            <div className="bg-emerald-50 border border-emerald-100 px-6 py-3 rounded-3xl flex items-center gap-3">
                <Activity className="w-5 h-5 text-emerald-600" />
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-emerald-800/50 uppercase leading-none mb-1">نبض المدينة</span>
                    <span className="text-sm font-black text-emerald-700">مستقر - خدمات نشطة</span>
                </div>
            </div>
            <button className="p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100 text-slate-400 hover:bg-slate-100 transition-all">
                <Menu className="w-6 h-6" />
            </button>
        </div>
      </header>

      {/* Main Executive KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {executiveStats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-10 rounded-[3rem] border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/20 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50/50 blur-3xl -z-10 group-hover:bg-blue-50/50 transition-colors"></div>
            <stat.icon className={`w-8 h-8 ${stat.color} mb-6`} />
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
            <h3 className="text-4xl font-black text-slate-900 mb-2">{stat.value}</h3>
            <p className="text-xs font-bold text-slate-500">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* BIG CHART: Resolution Progress */}
        <div className="lg:col-span-8">
            <section className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden h-full flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-black font-readex">مؤشر الاستجابة الكلي</h3>
                        <p className="text-xs text-slate-400 font-bold mt-1">مقارنة البلاغات الواردة مقابل البلاغات المنفذة تراكمياً</p>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-[10px] font-black uppercase text-slate-300">الاستجابة</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-white opacity-20"></div>
                            <span className="text-[10px] font-black uppercase text-slate-300">الطلبات</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full min-h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={cityVitalData}>
                            <defs>
                                <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis 
                              dataKey="name" 
                              stroke="#475569" 
                              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                              axisLine={false}
                              tickLine={false}
                              dy={15}
                            />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="reports" stroke="#475569" strokeWidth={3} fill="transparent" strokeDasharray="5 5" />
                            <Area type="monotone" dataKey="resolved" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorRes)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-4 pt-6 border-t border-white/5 flex grid-cols-2 sm:grid-cols-4 gap-6 items-center">
                    <div className="flex-1">
                        <span className="block text-[10px] font-black text-slate-500 uppercase mb-1">النمو العام</span>
                        <span className="text-xl font-black text-emerald-400 flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            ١٨٪
                        </span>
                    </div>
                    <button className="px-8 py-3 bg-white text-slate-900 rounded-2xl text-xs font-black shadow-xl shadow-white/10 hover:bg-slate-100 transition-all flex items-center gap-2">
                        تحليل الفجوات
                        <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                </div>
            </section>
        </div>

        {/* SIDE: Rankings & Red Flags */}
        <div className="lg:col-span-4 flex flex-col gap-10">
            <section className="flex flex-col gap-8">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    ترتيب المديريات حسب الأداء
                </h4>
                
                <div className="space-y-6">
                    {districtPerformance.map((dist, i) => (
                        <div key={dist.district} className="flex flex-col gap-3 group translate-all hover:translate-x-2">
                            <div className="flex justify-between items-end">
                                <div>
                                    <span className="text-[10px] font-black text-slate-400 block mb-1">رقم {i+1}</span>
                                    <h5 className="font-black text-slate-800">{dist.district}</h5>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-black text-slate-900">{dist.score}٪</span>
                                    <span className="block text-[8px] font-black uppercase mt-0.5" style={{ color: dist.color }}>{dist.status}</span>
                                </div>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }} 
                                    animate={{ width: `${dist.score}%` }} 
                                    transition={{ duration: 1, delay: i * 0.2 }}
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: dist.color }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-rose-50 rounded-[3rem] p-8 border border-rose-100 relative overflow-hidden group hover:bg-rose-100 transition-colors">
                <AlertTriangle className="absolute -bottom-4 -right-4 w-24 h-24 text-rose-200 rotate-12 opacity-50 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-black text-rose-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    بلاغات متأخرة (فوق ٤٨ ساعة)
                </h4>
                <div className="text-3xl font-black text-rose-600 mb-2">٢٤ بلاغاً</div>
                <p className="text-xs text-rose-800/60 font-bold leading-relaxed mb-6">
                    هناك زيادة في البلاغات المتأخرة في قطاع "الصرف الصحي" بنسبة ١٢٪ عن الأسبوع الماضي.
                </p>
                <button className="w-full py-4 bg-rose-600 text-white rounded-3xl text-xs font-black shadow-xl shadow-rose-600/20 hover:bg-rose-700 transition-all group/btn">
                    مساءلة مدراء الإدارات المقصرة
                </button>
            </section>
        </div>
      </div>

      {/* Footer Snapshot */}
      <footer className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 relative z-10">
        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase block mb-2">رضا المواطن</span>
            <div className="flex gap-1 text-amber-400">
                {[1,2,3,4].map(i => <CheckCircle2 key={i} className="w-4 h-4 fill-current" />)}
                <CheckCircle2 className="w-4 h-4 opacity-30" />
            </div>
        </div>
        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase block mb-2">الميزانية المستهلكة</span>
            <span className="text-xl font-black text-slate-900 tracking-tight">٤٥.٢ مليون <span className="text-[10px] text-slate-400">ر.ي</span></span>
        </div>
        <div className="md:col-span-2 p-6 bg-blue-600 rounded-[2rem] text-white flex items-center justify-between group cursor-pointer hover:bg-blue-700 transition-all">
            <div>
                <span className="text-[10px] font-black uppercase opacity-60 block mb-1">الرؤية المستقبلية 2027</span>
                <h5 className="font-black">تحويل صنعاء إلى مدينة ذكية بالكامل</h5>
            </div>
            <Globe className="w-10 h-10 opacity-20 group-hover:rotate-45 transition-transform duration-700" />
        </div>
      </footer>
    </div>
  );
}
