import { Globe2, TrendingUp, Users, CheckCircle2, DollarSign, FileText, BarChart3, PieChart, ShieldCheck, ArrowUpRight, Target, Map as MapIcon, Calendar, Download } from "lucide-react";
import { motion } from "motion/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

export function DonorDashboard() {
  const impactData = [
    { month: "يناير", reports: 1200, resolved: 800 },
    { month: "فبراير", reports: 2100, resolved: 1400 },
    { month: "مارس", reports: 3400, resolved: 2100 },
    { month: "إبريل", reports: 5800, resolved: 3900 },
    { month: "مايو", reports: 8200, resolved: 5600 },
    { month: "يونيو", reports: 10500, resolved: 7200 },
  ];

  const fundingAllocation = [
    { name: "التطوير التقني", value: 35, color: "#1e40af" },
    { name: "الفرق الميدانية", value: 40, color: "#3b82f6" },
    { name: "التوعية المجتمعية", value: 15, color: "#60a5fa" },
    { name: "الإدارة والتشغيل", value: 10, color: "#93c5fd" },
  ];

  const kpis = [
    { label: "إجمالي التمويل المستثمر", value: "$٧٥٠k", sub: "دورة ٢٠٢٥-٢٠٢٦", icon: DollarSign, color: "bg-blue-50 text-blue-600" },
    { label: "معدل الاستجابة المجتمعية", value: "٧٢٪", sub: "+١٥٪ عن الربع السابق", icon: Target, color: "bg-emerald-50 text-emerald-600" },
    { label: "عدد المستفيدين المباشرين", value: "٤٥,٠٠٠", sub: "مواطنين في نطاق الخدمة", icon: Users, color: "bg-purple-50 text-purple-600" },
    { label: "فعالية التكلفة / البلاغ", value: "$١٢.٥", sub: "تحسن بنسبة ٢٠٪", icon: TrendingUp, color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-white min-h-[85vh] rounded-[3rem] border border-blue-100 shadow-sm relative overflow-hidden">
      {/* Strategic Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-blue-800 text-white flex items-center justify-center shadow-xl shadow-blue-900/20">
            <Globe2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex tracking-tight">بوابة المانحين والشركاء</h2>
            <p className="text-slate-500 mt-1 font-bold">لوحة أداء استراتيجية لقياس الأثر الاجتماعي وكفاءة الحوكمة المحلية</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-slate-50 border border-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                تحميل تقرير الربع السنوي
            </button>
            <button className="px-6 py-3 bg-blue-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-700/20">
                مراجعة وثائق الامتثال
            </button>
        </div>
      </header>

      {/* Strategic KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        {kpis.map((stat, i) => (
            <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-md transition-all"
            >
                <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                <p className="text-[10px] font-bold text-slate-500 mt-1">{stat.sub}</p>
            </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Growth & Impact Chart */}
        <div className="lg:col-span-8 bg-white rounded-[3rem] border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">تطور مؤشرات الأداء (Impact Tracking)</h3>
                    <p className="text-[10px] text-slate-500 font-bold mt-1">المقارنة بين حجم البلاغات ومعدل الحلول الناجحة</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-[10px] font-bold text-slate-500 font-readex">إجمالي البلاغات</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-bold text-slate-500 font-readex">تمت الاستجابة</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 p-8 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={impactData}>
                        <defs>
                            <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="reports" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorReports)" />
                        <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorResolved)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Funding Allocation & Transparency */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-[3rem] p-8 border border-slate-200 shadow-sm">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-8">توزيع الميزانية التشغيلية</h4>
                <div className="h-[200px] mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={fundingAllocation} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 800 }} width={100} />
                            <Tooltip />
                            <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={20}>
                                {fundingAllocation.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                    <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between">
                        <span className="text-[10px] font-black text-blue-900">الشفافية المالية</span>
                        <span className="px-2 py-1 bg-blue-600 text-white rounded text-[8px] font-black">Audit Verified</span>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                <MapIcon className="w-10 h-10 mb-6 text-blue-400" />
                <h4 className="text-xl font-black mb-4 font-readex tracking-tight">التوسع المستقبلي (Scalability)</h4>
                <p className="text-xs font-bold text-slate-400 leading-relaxed mb-8">
                    النموذج مصمم ليكون "صندوق أدوات" قابلاً للإطلاق في أي مدينة أخرى خلال ٧٢ ساعة من إعداد البيانات الجغرافية.
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-500 uppercase">المدن المغطاة حالياً</span>
                        <span className="text-lg font-black text-white">٣ مدن أساسية</span>
                    </div>
                    <button className="p-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all">
                        <ArrowUpRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Sustainable Goals */}
      <div className="p-8 bg-emerald-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-[2rem] bg-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
                <h4 className="text-xl font-black font-readex">أهداف التنمية المستدامة (SDGs)</h4>
                <p className="text-xs font-bold text-emerald-200/60 mt-1 uppercase tracking-widest">المساهمة في مدن ومجتمعات محلية مستدامة (الأصل ١١)</p>
            </div>
        </div>
        <div className="flex gap-4">
            <div className="px-6 py-4 bg-white/10 rounded-3xl border border-white/10 flex flex-col items-center">
                <span className="text-xs font-black">الحوكمة</span>
                <span className="text-lg font-black text-emerald-400">٩٢٪</span>
            </div>
            <div className="px-6 py-4 bg-white/10 rounded-3xl border border-white/10 flex flex-col items-center">
                <span className="text-xs font-black">الاستدامة</span>
                <span className="text-lg font-black text-emerald-400">٨٥٪</span>
            </div>
        </div>
      </div>
    </div>
  );
}
