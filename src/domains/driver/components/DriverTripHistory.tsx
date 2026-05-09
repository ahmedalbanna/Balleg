import React from "react";
import { motion } from "motion/react";
import { History, MapPin, Calendar, Clock, Star, ChevronLeft, Search, Download } from "lucide-react";

export const DriverTripHistory: React.FC = () => {
  const trips = [
    { id: "TRP-٥٥٢", date: "٩ مايو ٢٠٢٦", route: "المخازن - مخيم جبل زيد", duration: "١س ٢٠د", distance: "٢٢ كم", rating: 4.9, status: "مكتمل" },
    { id: "TRP-٥٥١", date: "٨ مايو ٢٠٢٦", route: "مركز الإغاثة - باب اليمن", duration: "٤٥ د", distance: "١٢ كم", rating: 5.0, status: "مكتمل" },
    { id: "TRP-٥٥٠", date: "٨ مايو ٢٠٢٦", route: "المخازن - الحي الغربي", duration: "١س ١٠د", distance: "١٨ كم", rating: 4.8, status: "مكتمل" },
    { id: "TRP-٥٤٩", date: "٧ مايو ٢٠٢٦", route: "نقطة توزيع - صنعاء القديمة", duration: "٣٠ د", distance: "٥ كم", rating: 4.7, status: "مكتمل" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">سجل الرحلات</h2>
          <p className="text-slate-500 font-medium italic">استعراض كافة الرحلات السابقة وتقييمات الأداء</p>
        </div>
        <button className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-amber-500 transition-all active:scale-95 shadow-xl shadow-slate-900/10 group">
          <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          تصدير السجل الكامل
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors w-5 h-5" />
          <input 
            type="text" 
            placeholder="البحث برقم الرحلة أو التاريخ..." 
            className="w-full py-4 pr-14 pl-6 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-amber-50 focus:border-amber-200 outline-none transition-all font-medium"
          />
        </div>
        <div className="flex gap-2">
            <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">إجمالي الرحلات</span>
                <span className="text-xl font-black text-slate-900 leading-none">١٥٤</span>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="divide-y divide-slate-50">
          {trips.map((trip, idx) => (
            <motion.div 
              key={trip.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:bg-slate-50 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border-2 border-amber-100 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 transition-all duration-500">
                   <History className="w-8 h-8" />
                </div>
                <div>
                   <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-black text-slate-400 italic">{trip.id}</span>
                      <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">
                        <Star className="w-3 h-3 fill-current" />
                        {trip.rating}
                      </div>
                   </div>
                   <h4 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors italic uppercase tracking-tight">{trip.route}</h4>
                   <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1 italic">
                            <Calendar className="w-3 h-3" />
                            {trip.date}
                        </span>
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1 italic">
                            <Clock className="w-3 h-3" />
                            {trip.duration}
                        </span>
                   </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-12">
                 <div className="text-right lg:text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">المسافة المقطوعة</p>
                    <p className="text-2xl font-black text-slate-900">{trip.distance}</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition-all flex items-center gap-3 group/btn shadow-lg shadow-slate-900/10">
                        تفاصيل الرحلة
                        <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform rotate-180" />
                    </button>
                    <button className="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-amber-600 hover:border-amber-100 transition-all shadow-sm">
                        <MapPin className="w-5 h-5" />
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button className="px-10 py-5 border-2 border-slate-50 text-slate-400 rounded-[24px] text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm">
            تحميل المزيد من الرحلات
        </button>
      </div>
    </div>
  );
};
