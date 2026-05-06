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
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
      >
        <Link 
          to="/new" 
          className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col items-center justify-center gap-6 group"
        >
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
            <Camera className="h-12 w-12 text-blue-600 group-hover:text-white transition-colors" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">التقط صورة للبلاغ</h3>
            <p className="text-slate-400">كاميرا فورية للتوثيق المباشر</p>
          </div>
        </Link>

        <Link 
          to="/new" 
          className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex flex-col items-center justify-center gap-6 group"
        >
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center group-hover:bg-red-500 transition-colors">
            <Mic className="h-12 w-12 text-red-500 group-hover:text-white transition-colors" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">سجل بلاغاً صوتياً</h3>
            <p className="text-slate-400">تكلم بلهجتك، نحن نفهمك ونحلها</p>
          </div>
        </Link>
      </motion.div>

      <section className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            آخر البلاغات النشطة
          </h3>
          <Link to="/track" className="text-blue-600 text-sm font-semibold hover:underline">عرض الكل ←</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-1 rounded font-bold uppercase">قيد المراجعة</span>
              <span className="text-[10px] text-slate-400">منذ ساعتين</span>
            </div>
            <p className="text-sm font-bold mb-1">تجمع مياه أمطار - حي الوحدة</p>
            <p className="text-xs text-slate-500 mb-3">بلاغ صوتي #44592</p>
            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-amber-400"></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold uppercase">تم الحل</span>
              <span className="text-[10px] text-slate-400">أمس</span>
            </div>
            <p className="text-sm font-bold mb-1">إنارة معطلة - شارع الستين</p>
            <p className="text-xs text-slate-500 mb-3">بلاغ مصور #44580</p>
            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-full h-full bg-green-500"></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold uppercase">جاري التنفيذ</span>
              <span className="text-[10px] text-slate-400">منذ ٥ ساعات</span>
            </div>
            <p className="text-sm font-bold mb-1">تراكم نفايات - سوق الملح</p>
            <p className="text-xs text-slate-500 mb-3">بلاغ صوتي #44588</p>
            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-blue-500"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
