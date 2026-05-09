import { Home, EyeOff, Heart, MessageSquare, HandHelping, ArrowRight, ShieldCheck, Info, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import DisplacedMapView from "./DisplacedMapView";

export function DisplacedDashboard() {
  const impactStats = [
    { label: "بلاغات المخيم", value: "٢٤", icon: Home, color: "text-orange-600" },
    { label: "استجابة المنظمات", value: "٧٥٪", icon: HandHelping, color: "text-teal-600" },
    { label: "بلاغات مجهولة", value: "١٠٠٪", icon: EyeOff, color: "text-slate-600" },
  ];

  const campIssues = [
    { id: 1, title: "عطل في شبكة الصرف الصحي", status: "تنبيه للمنظمة", date: "منذ ٣ ساعات", org: "اليونيسف" },
    { id: 2, title: "تكدس نفايات مدخل المربع ب", status: "بانتظار البلدية", date: "منذ يومين", org: "صندوق النظافة" },
  ];

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-[#FFFBF7] min-h-[85vh] rounded-[3rem] border border-orange-100/50 shadow-sm relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-200/20 blur-[120px] -z-10 rounded-full"></div>
      
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-orange-500 text-white flex items-center justify-center shadow-2xl shadow-orange-500/20">
            <Home className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex">مجتمعنا.. ومخيمنا</h2>
            <p className="text-slate-500 mt-1 font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                هويتك محمية تماماً عند كل بلاغ
            </p>
          </div>
        </div>
        <Link 
          to="/new" 
          className="group flex items-center gap-3 px-8 py-4 bg-white border-2 border-orange-100 rounded-3xl text-orange-600 font-black shadow-lg shadow-orange-500/5 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all active:scale-95"
        >
          <MessageSquare className="w-5 h-5" />
          ارفع صوتك للجهات المعنية
        </Link>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {impactStats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 group hover:shadow-xl hover:shadow-orange-500/5 transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reports and Tracking */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                    <HandHelping className="w-6 h-6 text-orange-500" />
                    متابعة مطالب المخيم
                </h3>
                <Link to="/displaced/needs" className="text-sm font-bold text-orange-600 flex items-center gap-1 hover:underline">
                    جميع المطالب <ArrowRight className="w-4 h-4 rotate-180" />
                </Link>
            </div>
            
            <div className="space-y-4">
                {campIssues.map(issue => (
                    <div key={issue.id} className="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white hover:border-orange-200 transition-all">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-orange-400 shadow-sm">
                                <Info className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-800">{issue.title}</h4>
                                <div className="flex items-center gap-3 mt-1.5">
                                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                        توجيه: <span className="text-slate-600">{issue.org}</span>
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                        <MessageSquare className="w-3 h-3" />
                                        {issue.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 self-end sm:self-center">
                            <span className="px-3 py-1 bg-white rounded-xl text-[10px] font-black text-orange-500 border border-orange-100 uppercase">
                                {issue.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
          </section>

          <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-orange-500" />
                    خريطة الخدمات والمراكز
                </h3>
                <Link to="/displaced/shelters" className="text-sm font-bold text-orange-600 flex items-center gap-1 hover:underline">
                    تكبير الخريطة <ArrowRight className="w-4 h-4 rotate-180" />
                </Link>
            </div>
            <div className="h-[350px] w-full rounded-3xl overflow-hidden border border-slate-100">
                <DisplacedMapView 
                    points={[
                        { lat: 15.3694, lng: 44.1910, intensity: 0.8, label: "مركز إيواء رقم 1", type: 'shelter', capacity: '80%' },
                        { lat: 15.3800, lng: 44.2000, intensity: 0.5, label: "نقطة توزيع إغاثة", type: 'aid', capacity: 'متوفر' },
                        { lat: 15.3500, lng: 44.1800, intensity: 0.3, label: "وحدة غسيل كلوى ميدانية", type: 'health', capacity: 'متاح' }
                    ]}
                />
            </div>
          </section>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <section className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-orange-500/10 relative overflow-hidden">
            <Heart className="absolute -bottom-6 -right-6 w-32 h-32 opacity-15 -rotate-12" />
            <h4 className="text-lg font-black mb-4">خدمات سريعة</h4>
            <div className="grid grid-cols-1 gap-3">
                <Link to="/displaced/aid" className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-all text-xs font-bold">
                    طلب مساعدات إنسانية
                    <ArrowRight className="w-4 h-4 rotate-180" />
                </Link>
                <Link to="/displaced/health" className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-all text-xs font-bold">
                    الإرشادات الصحية العامة
                    <ArrowRight className="w-4 h-4 rotate-180" />
                </Link>
                <Link to="/displaced/alerts" className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-all text-xs font-bold">
                    مركز التنبيهات العاجلة
                    <ArrowRight className="w-4 h-4 rotate-180" />
                </Link>
            </div>
          </section>


          <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                    <h5 className="font-black text-sm text-slate-800">حماية الخصوصية</h5>
                    <p className="text-[10px] text-slate-400 font-bold">لا يتم الكشف عن اسمك أو رقمك أبداً.</p>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}
