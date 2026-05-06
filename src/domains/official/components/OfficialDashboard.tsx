import { BarChart3, Users, LayoutDashboard, Bell, Search, Filter } from "lucide-react";
import { motion } from "motion/react";

export function OfficialDashboard() {
  const stats = [
    { label: "بلاغات نشطة", value: "٤٢", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "جاري المعالجة", value: "١٨", color: "text-amber-600", bg: "bg-amber-50" },
    { label: "بلاغات مغلقة", value: "١٢٨", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "رضا الجمهور", value: "٩٢٪", color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-slate-50 min-h-[80vh] rounded-3xl border border-slate-200">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 font-readex">لوحة تحكم المسؤول</h2>
          <p className="text-slate-500 mt-1">نظرة عامة على حالة البلاغات الوطنية وتوجيه الفرق</p>
        </div>
        <div className="flex gap-2">
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-600 hover:text-blue-600 transition-colors">
                <Bell className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                تصدير تقرير
            </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
          >
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{stat.label}</p>
            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Interactive Table Area */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold flex items-center gap-2 text-slate-800">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                إدارة البلاغات الواردة
            </h3>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="بحث مخصص..." className="pr-10 pl-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm transition-focus" />
                </div>
                <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50">
                    <Filter className="w-4 h-4" />
                </button>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-right">
                <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                        <th className="px-6 py-4">رقم البلاغ</th>
                        <th className="px-6 py-4">الموقع</th>
                        <th className="px-6 py-4">النوع</th>
                        <th className="px-6 py-4">الحالة</th>
                        <th className="px-6 py-4">الأولوية</th>
                        <th className="px-6 py-4"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {[1, 2, 3, 4].map((item) => (
                        <tr key={item} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-6 py-4 font-mono text-sm text-blue-600">#BLG-{(44590 - item)}</td>
                            <td className="px-6 py-4 text-sm font-bold">شارع السبعين، صنعاء</td>
                            <td className="px-6 py-4 text-sm text-slate-500">مشكلة بيئية (مياه)</td>
                            <td className="px-6 py-4">
                                <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${item % 2 === 0 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {item % 2 === 0 ? 'قيد المراجعة' : 'جاري العمل'}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1">
                                    <div className={`w-2 h-2 rounded-full ${item === 1 ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                                    <span className="text-xs font-medium">{item === 1 ? 'عالية' : 'متوسطة'}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-left">
                                <button className="text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">إجراء ←</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </section>
    </div>
  );
}
