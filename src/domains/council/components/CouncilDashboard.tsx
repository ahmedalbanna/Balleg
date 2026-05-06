import { Landmark, FileText, Gavel, Users, Search, Download, AlertCircle, PieChart, Activity, Zap } from "lucide-react";
import { motion } from "motion/react";
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export function CouncilDashboard() {
  const transparencyData = [
    { name: 'منجز', value: 65, color: '#10b981' },
    { name: 'قيد المعالجة', value: 25, color: '#3b82f6' },
    { name: 'متأخر', value: 10, color: '#ef4444' },
  ];

  const councilAgendas = [
    { id: 1, title: "مساءلة مدير مكتب النظافة حول تدني مستوى الإنجاز", date: "١٥ مايو", priority: "high" },
    { id: 2, title: "مراجعة تقرير الاستجابة للبلاغات الحرجة - حي الصافية", date: "١٨ مايو", priority: "medium" },
    { id: 3, title: "مناقشة توزيع ميزانية الصيانة للدورة القادمة", date: "٢٢ مايو", priority: "low" },
  ];

  const transparencyStats = [
    { label: "بلاغات مفتوحة للرقابة", value: "٤,٥٩٢", icon: Users, color: "text-slate-900" },
    { label: "طلبات إيضاح رسمية", value: "١٢", icon: Gavel, color: "text-rose-600" },
    { label: "نسبة الشفافية", value: "٩٨٪", icon: Activity, color: "text-emerald-600" },
  ];

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-12 bg-[#F9FAFB] min-h-[90vh] rounded-[3.5rem] border border-slate-200/50 shadow-sm relative overflow-hidden text-slate-900 font-sans">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 via-slate-800 to-slate-200"></div>
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-[2.5rem] bg-white border border-slate-200 flex items-center justify-center shadow-xl shadow-slate-200/20 text-slate-900">
            <Landmark className="w-10 h-10" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2 block">السلطة التشريعية والرقابية</span>
            <h2 className="text-4xl font-black font-readex tracking-tight">بوابة المجلس المحلي</h2>
          </div>
        </div>
        
        <div className="flex gap-3">
            <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-900 text-sm font-black flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                <FileText className="w-4 h-4" />
                تقارير المساءلة
            </button>
            <button className="px-6 py-3 bg-slate-900 rounded-2xl text-white text-sm font-black flex items-center gap-2 hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all">
                <Download className="w-4 h-4" />
                سجل البيانات الخام
            </button>
        </div>
      </header>

      {/* Control KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {transparencyStats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-slate-300 transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Transparency Hub */}
        <div className="lg:col-span-7 flex flex-col gap-8">
            <section className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm h-full flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-black font-readex">مؤشر أمانة البيانات</h3>
                        <p className="text-xs font-bold text-slate-400 mt-1">توزيع الحالة الفعلية للبلاغات الموثقة في النظام</p>
                    </div>
                </div>

                <div className="flex-1 w-full min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                            <Pie
                                data={transparencyData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {transparencyData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend verticalAlign="bottom" height={36}/>
                        </RePieChart>
                    </ResponsiveContainer>
                </div>

                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Zap className="w-6 h-6 text-amber-500" />
                        <span className="text-sm font-black text-slate-800">بيانات غير قابلة للتلاعب أو الحذف</span>
                    </div>
                    <button className="text-xs font-black text-slate-400 hover:text-slate-900 transition-colors underline">تحقق من التشفير</button>
                </div>
            </section>
        </div>

        {/* Supervision Sidebar */}
        <div className="lg:col-span-5 flex flex-col gap-8">
            <section className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                <Gavel className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                <h4 className="text-lg font-black mb-8 flex items-center justify-between">
                    أجندة جلسات الرقابة
                    <span className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-black">٣</span>
                </h4>
                
                <div className="space-y-6">
                    {councilAgendas.map(agenda => (
                        <div key={agenda.id} className="p-5 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                            <div className="flex justify-between items-center mb-3">
                                <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${
                                    agenda.priority === 'high' ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-300'
                                }`}>
                                    {agenda.priority === 'high' ? 'أولوية قصوى' : 'جلسة عادية'}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400">{agenda.date}</span>
                            </div>
                            <h5 className="font-black text-sm leading-relaxed">{agenda.title}</h5>
                        </div>
                    ))}
                </div>
                
                <button className="w-full mt-8 py-4 bg-white text-slate-900 rounded-3xl text-sm font-black hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                    إصدار طلب استيضاح
                    <AlertCircle className="w-4 h-4" />
                </button>
            </section>

            <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">مناطق تحت الرقابة المشددة</h4>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-rose-50 border border-rose-100">
                        <span className="text-sm font-black text-rose-900">حي الصافية</span>
                        <span className="text-[10px] font-black text-rose-600 uppercase">نزول ميداني</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-sm font-black text-slate-800">صنعاء القديمة</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase">مستقرة</span>
                    </div>
                </div>
            </section>
        </div>
      </div>
    </div>
  );
}
