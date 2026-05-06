import { BarChart3, TrendingUp, Users, Clock, AlertCircle, CheckCircle2, ChevronRight, Download, Filter, Target, Award, PieChart } from "lucide-react";
import { motion } from "motion/react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LineChart, Line } from "recharts";

export function ManagerDashboard() {
  const performanceData = [
    { name: 'السبت', complete: 85, target: 80 },
    { name: 'الأحد', complete: 70, target: 80 },
    { name: 'الاثنين', complete: 92, target: 80 },
    { name: 'الثلاثاء', complete: 88, target: 80 },
    { name: 'الأربعاء', complete: 95, target: 80 },
  ];

  const departmentComparison = [
    { dept: 'الطرقات', rate: 92, time: '٤.٥ ساعة' },
    { dept: 'النظافة', rate: 78, time: '٦.٢ ساعة' },
    { dept: 'الكهرباء', rate: 85, time: '٥.١ ساعة' },
  ];

  const mainStats = [
    { label: "معدل الإنجاز", value: "٨٨٪", trend: "+٥٪", icon: Target, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "زمن الاستجابة", value: "٤.٢ س", trend: "-١٢٪", icon: Clock, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "تقييم الجمهور", value: "٤.٨/٥", trend: "+٠.٣", icon: Award, color: "text-amber-500", bg: "bg-amber-50" },
  ];

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-slate-50 min-h-[85vh] rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-slate-900 to-slate-800 -z-10"></div>
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10 pt-4">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-2xl">
            <BarChart3 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white font-readex">بوابة الإدارة الإستراتيجية</h2>
            <p className="text-slate-300 mt-1 font-bold">تحليل الأداء، إدارة الموارد، وصناعة القرار المبني على البيانات</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white text-sm font-black hover:bg-white/20 transition-all">
                <Download className="w-4 h-4" />
                تصدير التقارير
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-2xl text-white text-sm font-black shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">
                <Filter className="w-4 h-4" />
                تصفية البيانات
            </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {mainStats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex items-center justify-between group"
          >
            <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-7 h-7" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-lg ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                            {stat.trend}
                        </span>
                    </div>
                </div>
            </div>
            <TrendingUp className={`w-10 h-10 ${stat.trend.startsWith('+') ? 'text-emerald-50' : 'text-blue-50'} group-hover:scale-125 transition-transform`} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Real-time Analytics Chart */}
        <div className="lg:col-span-8 space-y-8">
            <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col gap-8 min-h-[450px]">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-black text-slate-900 font-readex">كفاءة معالجة البلاغات</h3>
                        <p className="text-xs font-bold text-slate-400 mt-1">مقارنة الإنجاز الفعلي مقابل المستهدف اليومي</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                            <span className="text-[10px] font-black text-slate-600">الإنجاز الفعلي</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                            <span className="text-[10px] font-black text-slate-600">المستهدف</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={performanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                            <XAxis 
                              dataKey="name" 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fill: '#94a3b8', fontWeight: 700, fontSize: 10 }}
                              dy={10}
                            />
                            <YAxis hide />
                            <Tooltip 
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontFamily: 'Readex Pro' }}
                                cursor={{ fill: '#f8fafc' }}
                            />
                            <Bar dataKey="target" fill="#f1f5f9" radius={[10, 10, 10, 10]} barSize={40} />
                            <Bar dataKey="complete" fill="#2563eb" radius={[10, 10, 10, 10]} barSize={40}>
                                {performanceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.complete >= entry.target ? '#2563eb' : '#94a3b8'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>

            {/* Department Comparison */}
            <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <h3 className="text-lg font-black text-slate-900 mb-8 font-readex flex items-center gap-3">
                    <PieChart className="w-6 h-6 text-blue-600" />
                    مؤشر المنافسة بين الإدارات
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {departmentComparison.map(dept => (
                        <div key={dept.dept} className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/40 blur-3xl -z-10"></div>
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-black text-slate-800">{dept.dept}</h4>
                                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">الأداء: {dept.rate}%</span>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-[10px] text-slate-400 font-bold mb-1">
                                        <span>سرعة الإنجاز</span>
                                        <span>{dept.time}</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${dept.rate}%` }} className="h-full bg-slate-900"></motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>

        {/* Action Sidebar */}
        <div className="lg:col-span-4 space-y-8">
            <section className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm flex flex-col gap-6">
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-50 pb-4">تنبيهات حرجة للمدير</h4>
                <div className="space-y-4">
                    <div className="flex gap-4 p-4 rounded-3xl bg-rose-50 border border-rose-100">
                        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        <div>
                            <p className="text-xs font-black text-rose-900">تأخر في معالجة بلاغات "حي الصافية"</p>
                            <p className="text-[10px] text-rose-600 font-bold mt-1">تجاوز الوقت المعياري بـ ٣ ساعات</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-4 rounded-3xl bg-amber-50 border border-amber-100">
                        <Users className="w-5 h-5 text-amber-600 shrink-0" />
                        <div>
                            <p className="text-xs font-black text-amber-900">انخفاض في تقييم فرق الميدان</p>
                            <p className="text-[10px] text-amber-600 font-bold mt-1">بناءً على آخر ١٠ صفقات إغلاق بلاغ</p>
                        </div>
                    </div>
                </div>
                <button className="w-full py-4 bg-slate-900 text-white rounded-3xl text-sm font-black shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                    عرض كافة التنبيهات
                    <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
            </section>

            <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-8 text-white shadow-2xl shadow-blue-600/20 relative overflow-hidden group">
                <Award className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                <h4 className="text-lg font-black mb-6">المكافآت التقديرية</h4>
                <p className="text-xs font-bold opacity-80 leading-relaxed mb-6">
                    بناءً على بيانات "بلّغ" لهذا الشهر، الإدارة مرشحة لجائزة "التميز في الاستجابة" على مستوى المحافظة.
                </p>
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-xs font-black mb-2">
                        <span>النقاط الحالية</span>
                        <span>٨٥٠ / ١٠٠٠</span>
                    </div>
                    <div className="h-1.5 bg-black/10 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-white"></motion.div>
                    </div>
                </div>
            </section>
        </div>
      </div>
    </div>
  );
}
