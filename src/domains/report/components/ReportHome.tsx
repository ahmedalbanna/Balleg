import { Link } from "react-router-dom";
import { Mic, Camera, Search, ArrowLeft } from "lucide-react";
import * as motion from "motion/react-client";

export function ReportHome() {
  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10">
      <section className="text-center space-y-2 mb-2">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-readex"
        >
          صوتك مسموع.. وخدمتك واجبنا
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          ساهم في تحسين مدينتك بلمسة واحدة. التقط صورة أو سجل صوتك لنصل للمشكلة.
        </motion.p>
      </section>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12"
      >
        <Link 
          to="/new" 
          className="relative bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all cursor-pointer flex flex-col items-center justify-center gap-8 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(59,130,246,0.1)] group-hover:scale-110 transition-transform relative z-10">
            <Camera className="h-10 w-10 text-blue-600" />
          </div>
          <div className="text-center relative z-10">
            <h3 className="text-2xl font-black text-slate-800 mb-2">التقط صورة للبلاغ</h3>
            <p className="text-slate-400 font-medium">كاميرا فورية للتوثيق المباشر</p>
          </div>
        </Link>

        <Link 
          to="/new" 
          className="relative bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all cursor-pointer flex flex-col items-center justify-center gap-8 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(239,68,68,0.1)] group-hover:scale-110 transition-transform relative z-10">
            <Mic className="h-10 w-10 text-red-500" />
          </div>
          <div className="text-center relative z-10">
            <h3 className="text-2xl font-black text-slate-800 mb-2">سجل بلاغاً صوتياً</h3>
            <p className="text-slate-400 font-medium">تكلم بلهجتك، نحن نفهمك ونحلها</p>
          </div>
        </Link>
      </motion.div>

      <section className="flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black flex items-center gap-3 text-slate-800">
            <div className="w-1.5 h-10 bg-blue-600 rounded-full"></div>
            آخر البلاغات النشطة
          </h3>
          <Link to="/track" className="text-blue-600 text-sm font-black hover:bg-black/5 px-4 py-2 rounded-xl transition-colors">عرض الكل ←</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] bg-amber-100 text-amber-700 px-3 py-1 rounded-lg font-black uppercase">قيد المراجعة</span>
              <span className="text-[10px] text-slate-400 font-bold">منذ ساعتين</span>
            </div>
            <p className="text-sm font-bold mb-1">تجمع مياه أمطار - حي الوحدة</p>
            <p className="text-xs text-slate-500 mb-3">بلاغ صوتي #44592</p>
            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-amber-400"></div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] bg-green-100 text-green-700 px-3 py-1 rounded-lg font-black uppercase">تم الحل</span>
              <span className="text-[10px] text-slate-400 font-bold">أمس</span>
            </div>
            <p className="text-sm font-black text-slate-800 mb-1">إنارة معطلة - شارع الستين</p>
            <p className="text-xs text-slate-500 mb-4">بلاغ مصور #44580</p>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-full h-full bg-green-500"></div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-black uppercase">جاري التنفيذ</span>
              <span className="text-[10px] text-slate-400 font-bold">منذ ٥ ساعات</span>
            </div>
            <p className="text-sm font-black text-slate-800 mb-1">تراكم نفايات - سوق الملح</p>
            <p className="text-xs text-slate-500 mb-4">بلاغ صوتي #44588</p>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-blue-500"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
