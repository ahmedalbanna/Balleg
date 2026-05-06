import { Users, Map as MapIcon, AlertCircle, MessageSquare, ThumbsDown, Calendar, Eye, Search, Filter } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function NeighborhoodDashboard() {
  const [activeDistrict] = useState("حي الصافية");

  const alerts = [
    { id: 1, type: "late", title: "تجمع نفايات - شارع ٢٠", days: "٣ أيام", status: "متأخر" },
    { id: 2, type: "negative", title: "إصلاح رصيف سيء", rating: "١/٥", comment: "العمل غير مكتمل" },
    { id: 3, type: "late", title: "كابل كهرباء مكشوف", days: "يوم واحد", status: "حرج" },
  ];

  const neighborhoodStats = [
    { label: "بلاغات الحي", value: "٤٥", icon: MessageSquare, color: "text-slate-600" },
    { label: "بانتظار البلدية", value: "٨", icon: ClockIcon, color: "text-amber-600" },
    { label: "تقييمات سلبية", value: "٣", icon: ThumbsDown, color: "text-rose-600" },
  ];

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-slate-50/30 min-h-[85vh] rounded-[3rem] border border-slate-200/50 shadow-sm">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-slate-800 text-white flex items-center justify-center shadow-xl shadow-slate-900/20">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex tracking-tight">عين المجتمع: {activeDistrict}</h2>
            <p className="text-slate-500 mt-1 font-bold">حلقة الوصل الرقابية لضمان جودة الخدمات في الحي</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="bg-white px-5 py-2.5 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-sm">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-black text-slate-700 capitalize">اجتماع المجلس القادم: ٢٥ مايو</span>
            </div>
        </div>
      </header>

      {/* Neighborhood Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {neighborhoodStats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5 group"
          >
            <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* District Map Access */}
        <div className="lg:col-span-8">
            <section className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase tracking-widest text-xs">
                        <MapIcon className="w-4 h-4 text-slate-900" />
                        رؤية جغرافية لنطاق الحي
                    </h3>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" placeholder="ابحث في شوارع الحي..." className="pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-bold focus:ring-2 focus:ring-slate-100 outline-none" />
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 bg-slate-100 relative overflow-hidden flex items-center justify-center group">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="p-10 bg-white/50 backdrop-blur-md rounded-3xl border border-white/20 text-center max-w-sm">
                        <Eye className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h4 className="font-black text-slate-900 mb-2">وضع الاطلاع المباشر</h4>
                        <p className="text-xs text-slate-500 font-bold leading-relaxed">
                            صلاحيات المجلس تقتصر على مراقبة الحالة (Monitor Only). لا يمكن تعديل أو إغلاق البلاغات من هذا الدور.
                        </p>
                    </div>
                    
                    {/* Floating Marker Simulation */}
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute top-1/3 left-1/2 p-3 bg-white rounded-2xl shadow-2xl border border-slate-100 text-rose-600"
                    >
                        <AlertCircle className="w-6 h-6" />
                    </motion.div>
                </div>
            </section>
        </div>

        {/* Escalation Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <section className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">تنبيهات للمتابعة</h4>
                    <Filter className="w-4 h-4 text-slate-400" />
                </div>
                
                <div className="space-y-4">
                    {alerts.map(alert => (
                        <div key={alert.id} className="p-5 rounded-3xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-slate-200 transition-all cursor-pointer group">
                            <div className="flex justify-between items-center mb-3">
                                <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${
                                    alert.type === 'late' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                                }`}>
                                    {alert.type === 'late' ? 'تجاوز الوقت' : 'تقييم سلبي'}
                                </span>
                                <span className="text-[10px] font-black text-slate-400">{alert.days || alert.rating}</span>
                            </div>
                            <h5 className="font-black text-xs text-slate-800 mb-1 group-hover:text-slate-900">{alert.title}</h5>
                            <p className="text-[10px] text-slate-500 font-bold">{alert.comment || 'بانتظار تدخل القسم المختص'}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                <GavelIcon className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                <h4 className="text-lg font-black mb-4">التصعيد للبلدية</h4>
                <p className="text-xs font-bold text-slate-400 leading-relaxed mb-6">
                    يمكنك الرفع بتقرير "عدم رضا مجتمعي" حول البلاغات المتأخرة لتظهر مباشرة في لوحة قيادة المجلس المحلي.
                </p>
                <button className="w-full py-4 bg-white text-slate-900 rounded-2xl text-xs font-black shadow-xl shadow-white/10 hover:bg-slate-100 transition-all uppercase tracking-widest">
                    تحضير تقرير تصعيد
                </button>
            </section>
        </div>
      </div>
    </div>
  );
}

function ClockIcon(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function GavelIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="m14.5 12.5-8 8a2.12 2.12 0 0 1-3-3l8-8" />
        <path d="m16 16 6-6" />
        <path d="m8 8 6-6" />
        <path d="m9 7 8 8" />
        <path d="m21 11-8-8" />
      </svg>
    );
}
