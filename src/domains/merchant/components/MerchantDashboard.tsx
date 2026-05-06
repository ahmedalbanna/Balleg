import { Store, TrendingUp, Award, Clock, MapPin, Plus } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export function MerchantDashboard() {
  const businessStats = [
    { label: "بلاغات من المنطقة", value: "٨", icon: MapPin, color: "text-blue-600" },
    { label: "نقاط المساهمة", value: "+٤٥٠", icon: Award, color: "text-emerald-600" },
    { label: "وقت المعالجة", value: "٤٨ س", icon: Clock, color: "text-amber-600" },
  ];

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-emerald-50/30 min-h-[80vh] rounded-3xl border border-emerald-100">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white border border-emerald-100 shadow-sm flex items-center justify-center text-emerald-600">
            <Store className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex">بوابة التاجر المحلي</h2>
            <p className="text-slate-500 mt-1">ساهم في رفعة شارعك.. وازدهار عملك</p>
          </div>
        </div>
        <Link 
          to="/new" 
          className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all flex items-center gap-2 self-start sm:self-center"
        >
          <Plus className="w-5 h-5" />
          تبليغ عن عائق تجاري
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {businessStats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 translate-y-0 hover:-translate-y-1 transition-transform"
          >
            <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Tracking reports for business environment */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              أثر البلاغات على منطقتك التجارية
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800">إصلاح حفرة الشارع المقابل</h4>
                  <p className="text-xs text-slate-500 mt-1">تم الإبلاغ في: ١٥ أبريل • الحالة: مكتمل ✅</p>
                </div>
                <div className="text-center">
                  <span className="block text-xs font-bold text-emerald-600">+٢٠ نقطة</span>
                  <span className="block text-[10px] text-slate-400 uppercase">سمعة</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between opacity-75">
                <div>
                  <h4 className="font-bold text-slate-800">تراكم نفايات (زاوية المقهى)</h4>
                  <p className="text-xs text-slate-500 mt-1">تم الإبلاغ في: أمس • الحالة: قيد المعالجة 🔄</p>
                </div>
                <div className="text-center">
                  <span className="block text-xs font-bold text-blue-600">جاري الإجراء</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar: Loyalty & Gamification */}
        <div className="flex flex-col gap-6">
          <section className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-xl shadow-emerald-900/20 relative overflow-hidden group">
            <Award className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">مستوى التاجر</span>
            <h3 className="text-2xl font-black mt-1 mb-4">شريك ذهبي متميز</h3>
            <div className="w-full h-2 bg-white/20 rounded-full mb-2">
              <div className="w-3/4 h-full bg-white rounded-full"></div>
            </div>
            <p className="text-xs opacity-80 italic">تبقت ٥٠ نقطة للحصول على شارة "حامي الحي"</p>
          </section>

          <section className="bg-white rounded-3xl p-6 border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-4">مميزات الدور التجاري</h4>
            <ul className="text-xs space-y-3 text-slate-500">
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5"></div>
                أولوية في معالجة البلاغات المحيطة بالعمل
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5"></div>
                ربط حساب المتجر الرسمي بالبلاغات
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5"></div>
                تأثير مباشر على تقييم نظافة "الحي التجاري"
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
