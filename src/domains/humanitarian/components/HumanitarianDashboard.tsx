import { HeartPulse, Globe, BarChart, MapPin, AlertTriangle, FileText, ChevronRight, Activity, Zap, Droplets, Trash2, Home, Download } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import MapView from "../../locations/components/MapView";

export function HumanitarianDashboard() {
  const [activeTab, setActiveTab] = useState("needs");

  const needMarkers = [
    { id: 'h1', lat: 33.5138, lng: 36.2765, title: 'مخيم النازحين - الشمال', description: 'نقص حاد في مياه الشرب والمستلزمات الطبية الأساسية', type: 'need' as const, status: 'حرج' },
    { id: 'h2', lat: 33.5050, lng: 36.2600, title: 'مركز توزيع الصافية', description: 'تأخر الإمدادات الغذائية لأكثر من أسبوع', type: 'need' as const, status: 'قيد المعالجة' },
    { id: 'h3', lat: 33.5250, lng: 36.2950, title: 'وحدة طبية متنقلة', description: 'بحاجة إلى طاقم تمريض إضافي نظراً لزيادة الحالات', type: 'need' as const, status: 'طلب عاجل' },
  ];

  const mapPoints = needMarkers.map(m => ({
     lat: m.lat,
     lng: m.lng,
     intensity: m.status === 'حرج' ? 1 : m.status === 'طلب عاجل' ? 0.7 : 0.4,
     label: m.title
  }));

  const impactData = [
    { name: "صحة", value: 35, color: "#ef4444" },
    { name: "مياه", value: 25, color: "#3b82f6" },
    { name: "سكن", value: 20, color: "#f59e0b" },
    { name: "تعليم", value: 20, color: "#10b981" },
  ];

  const criticalNeeds = [
    { id: 1, sector: "المياه", location: "مخيم النازحين - الشمال", density: "عالية جداً", status: "حرج", icon: Droplets },
    { id: 2, sector: "النظافة", location: "حي الصافية - المنطقة ج", density: "متوسطة", status: "متدهور", icon: Trash2 },
    { id: 3, sector: "الطرق", location: "طريق الإمداد الغربي", density: "عالية", status: "معطل", icon: Zap },
  ];

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-slate-50/10 min-h-[85vh] rounded-[3rem] border border-slate-200/50 shadow-sm relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-sky-600 text-white flex items-center justify-center shadow-xl shadow-sky-600/20">
            <HeartPulse className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex tracking-tight">منصة التنسيق الإنساني</h2>
            <p className="text-slate-500 mt-1 font-bold">توجيه التدخلات القائمة على البيانات لتعظيم الأثر المجتمعي</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
            <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-2 text-xs font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                <Download className="w-4 h-4" />
                تصدير تقرير المانحين
            </button>
            <button className="px-6 py-3 bg-sky-600 text-white rounded-2xl flex items-center gap-2 text-xs font-black hover:bg-sky-700 transition-all shadow-lg shadow-sky-600/20">
                <Globe className="w-4 h-4" />
                شبكة الشركاء
            </button>
        </div>
      </header>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
                <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-sky-600" />
                        مؤشر الاحتياج العام
                    </h4>
                    <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-2 py-1 rounded-lg">+١٢٪ عن الشهر الماضي</span>
                </div>
                <div className="flex items-end gap-2 mb-4">
                    <span className="text-5xl font-black text-slate-900 leading-none">٧٨</span>
                    <span className="text-slate-400 font-bold mb-1">/ ١٠٠</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '78%' }}
                        className="h-full bg-sky-500"
                    />
                </div>
                <p className="text-[10px] text-slate-500 font-bold mt-4 leading-relaxed">
                    يعتمد التقييم على كثافة بلاغات تعطل الخدمات الأساسية في القطاعات الخمسة الكبرى.
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center"
            >
                <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={impactData}
                                cx="50%"
                                cy="50%"
                                innerRadius={35}
                                outerRadius={50}
                                paddingAngle={8}
                                dataKey="value"
                            >
                                {impactData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">توزيع القطاعات الأكثر تضرراً</h4>
            </motion.div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <BarChart className="w-24 h-24" />
            </div>
            <div>
                <p className="text-sky-400 text-[10px] font-black tracking-[0.2em] uppercase mb-2">توفير الموارد</p>
                <h3 className="text-2xl font-black mb-4 font-readex leading-tight">تجنب ازدواجية التدخلات</h3>
                <p className="text-slate-400 text-xs font-bold leading-relaxed">
                    نظام الربط الذكي مع البلدية يضمن عدم توجيه منظمات دولية لنفس نقاط العمل التي باشرتها الفرق الحكومية.
                </p>
            </div>
            <button className="mt-8 w-full py-4 bg-sky-600 hover:bg-sky-500 transition-colors rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-sky-900/50">
                مراجعة خطة تداخل الصلاحيات
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Mapping Section */}
        <div className="lg:col-span-8 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">خريطة الفجوات الخدمية</h3>
                    <p className="text-[10px] text-slate-400 font-bold mt-1">تحديد المناطق ذات الكثافة العالية للبلاغات غير المعالجة</p>
                </div>
                <div className="flex gap-2">
                    <button className="p-2.5 rounded-xl bg-slate-50 text-slate-600 border border-slate-100">
                        <MapPin className="w-4 h-4" />
                    </button>
                    <button className="p-2.5 rounded-xl bg-slate-50 text-slate-600 border border-slate-100">
                        <AlertTriangle className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <div className="flex-1 bg-slate-50 relative min-h-[400px] flex items-center justify-center border-b border-slate-50 overflow-hidden">
                <MapView points={mapPoints} center={[33.5138, 36.2765]} zoom={12} />
            </div>
        </div>

        {/* Critical Alerts Sidebar */}
        <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm">
                <h4 className="text-sm font-black text-slate-900 mb-8 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    نقاط تدخل عاجل
                </h4>
                <div className="space-y-4">
                    {criticalNeeds.map(need => (
                        <div key={need.id} className="p-5 rounded-3xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-slate-200 transition-all group cursor-pointer border-r-4 border-r-rose-500">
                            <div className="flex items-start justify-between mb-3">
                                <div className="p-2 rounded-xl bg-white shadow-sm font-black text-sky-600">
                                    <need.icon className="w-4 h-4" />
                                </div>
                                <span className="text-[9px] font-black text-rose-500 bg-rose-50 px-2 py-0.5 rounded-lg uppercase">{need.status}</span>
                            </div>
                            <h5 className="font-black text-xs text-slate-800 mb-1">{need.sector}: {need.location}</h5>
                            <div className="flex items-center gap-3 mt-2">
                                <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold">
                                    <UsersIcon className="w-3 h-3" />
                                    كثافة {need.density}
                                </div>
                                <ChevronRight className="w-3 h-3 text-slate-300 group-hover:translate-x-[-4px] transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gradient-to-br from-sky-600 to-sky-700 rounded-[3rem] p-8 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <FileText className="w-10 h-10 mb-6 text-sky-200" />
                <h4 className="text-lg font-black mb-2">اتفاقية مشاركة البيانات</h4>
                <p className="text-[11px] font-bold text-sky-100 leading-relaxed mb-6">
                    وصولكم لهذه البيانات محكوم باتفاقية الشراكة لضمان خصوصية المبلغين وتوثيق التدخلات.
                </p>
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-[10px] font-black transition-all border border-white/20">
                    مراجعة بنود الاستخدام
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

function UsersIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
}
