import { Wrench, MapPin, Star, TrendingUp, DollarSign, MessageSquare, Bell, PenTool as Tool, Package, Users, Search, Filter, ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function HandymanDashboard() {
  const [activeTab, setActiveTab] = useState("leads");

  const localLeads = [
    { 
        id: 1, 
        client: "أحمد منصور", 
        service: "إصلاح تسرب مياه (داخلي)", 
        location: "حي الصافية - شارع ٣", 
        distance: "٠.٨ كم",
        status: "new",
        time: "١٠ دقائق"
    },
    { 
        id: 2, 
        client: "سعاد جاسم", 
        service: "تغيير إضاءة خارجية", 
        location: "حي النور - عمارة ١٢", 
        distance: "١.٥ كم",
        status: "assigned",
        time: "٤٥ دقيقة"
    },
    { 
        id: 3, 
        client: "متجر القدس", 
        service: "تركيب أقفال أمان", 
        location: "المنطقة التجارية", 
        distance: "٢.٢ كم",
        status: "new",
        time: "١ ساعة"
    }
  ];

  const adsPerformance = [
    { label: "ظهور الإعلانات", value: "١,٢٤٠", sub: "+١٢٪ هذا الأسبوع" },
    { label: "نقرات المهتمين", value: "٨٦", sub: "معدل تحويل ٧٪" },
    { label: "طلبات مباشرة", value: "١٢", sub: "قيمة تقديرية ٨٥٠$" },
  ];

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-indigo-50/5 min-h-[85vh] rounded-[3rem] border border-indigo-100/50 shadow-sm relative overflow-hidden">
      {/* Decorative Indico Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] -z-10" />
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/20">
            <Wrench className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex tracking-tight">مركز الخدمات المحلية</h2>
            <p className="text-slate-500 mt-1 font-bold">إدارة الطلبات الميدانية، الترويج الجغرافي، ونمو الأعمال</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 text-slate-300" />
                    <span className="text-xs font-black text-slate-700 mr-2">٤.٨ / ٥</span>
                </div>
                <p className="text-[9px] font-bold text-slate-400 capitalize">الموثوقية: عالية جداً</p>
            </div>
            <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
                إنشاء إعلان مستهدف
            </button>
        </div>
      </header>

      {/* Ad & Business Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adsPerformance.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-indigo-50 shadow-sm group hover:border-indigo-300 transition-all"
          >
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
            <p className="text-3xl font-black text-indigo-700">{stat.value}</p>
            <p className="text-[10px] font-bold text-slate-500 mt-2">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Local Leads / Requests */}
        <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-indigo-600" />
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">طلبات صيانة قريبة (جيو-سياقية)</h3>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 border border-slate-100 transition-all">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="p-8 space-y-4">
                    {localLeads.map(lead => (
                        <div key={lead.id} className="p-6 rounded-[2.2rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-indigo-200 transition-all group cursor-pointer relative overflow-hidden">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:scale-110 transition-transform">
                                        <Tool className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-black text-slate-900 text-sm">{lead.service}</h4>
                                            {lead.status === 'new' && (
                                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                                <Users className="w-3 h-3" />
                                                {lead.client}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {lead.location} ({lead.distance})
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black text-slate-400 mb-1">{lead.time}</p>
                                    <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/10">
                                        قبول الطلب
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Ad Management & Growth */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-indigo-900 rounded-[3rem] p-8 text-white relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                <Package className="w-10 h-10 mb-6 text-indigo-300" />
                <h4 className="text-xl font-black mb-4 font-readex tracking-tight">ترويج "خدمة الجوار"</h4>
                <p className="text-xs font-bold text-indigo-100/70 leading-relaxed mb-8">
                    تظهر إعلاناتك تلقائياً كـ (اقتراح تكميلي) عندما يقوم المواطن بالإبلاغ عن عطل منزلي أو خاص لم تستجب له البلدية.
                </p>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl border border-white/5">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                        <span className="text-[10px] font-bold">الرصيد الإعلاني: $٢٥٠.٠٠</span>
                    </div>
                </div>
                <button className="w-full mt-8 py-4 bg-white text-indigo-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all">
                    شحن الرصيد
                </button>
            </div>

            <div className="bg-white rounded-[3rem] p-8 border border-slate-200 shadow-sm flex-1">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-8">إحصائيات الموثوقية المحلي</h4>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <p className="text-[11px] font-black text-slate-800">بلاغات تم حلها</p>
                        </div>
                        <span className="text-xs font-black text-slate-500">٤٥</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                                <Clock className="w-4 h-4" />
                            </div>
                            <p className="text-[11px] font-black text-slate-800">متوسط وقت المباشرة</p>
                        </div>
                        <span className="text-xs font-black text-slate-500">٣٥ دقيقة</span>
                    </div>
                </div>

                <div className="mt-12 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 text-indigo-600">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <h5 className="text-[11px] font-black text-slate-900 mb-2 font-readex">تقييمات العملاء</h5>
                    <p className="text-[9px] text-slate-400 font-bold mb-4">"خدمة سريعة جداً، السباك أحمد كان محترفاً ونظيفاً في عمله."</p>
                    <button className="text-[10px] font-black text-indigo-600 hover:underline">قراءة كافة التقييمات</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
