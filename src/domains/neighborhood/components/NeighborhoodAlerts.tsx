import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Zap, Search, Filter, Plus, Clock, MapPin, AlertTriangle, CheckCircle2, ChevronRight, User, Trash2, Edit3, Send, Radio, Info } from "lucide-react";

export const NeighborhoodAlerts: React.FC = () => {
    const alerts = [
        { id: "ALT-901", title: "تنبيه: عطل في الشبكة الرئيسية للكهرباء", message: "سيتم قطع التيار لمدة ٤ ساعات ابتداءً من الآن لإصلاح عطل مفاجئ في المربع أ.", time: "للتو", status: "Critical", radius: "Square A" },
        { id: "ALT-902", title: "توزيع مخصصات الخبز (النازحين)", message: "نرجو من الإخوة النازحين في المربع ب التوجه لنقطة التوزيع غداً الساعة ٩ صباحاً.", time: "منذ ساعة", status: "Important", radius: "Square B" },
        { id: "ALT-903", title: "إرشادات السلامة من الأمطار", message: "نرجو من الجميع أخذ الحيطة وتجنب مجاري السيول خلال فترة هطول الأمطار المتوقعة.", time: "منذ ٥ ساعات", status: "Notice", radius: "Entire District" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800 pb-24 lg:pb-12 text-right">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Zap className="w-10 h-10 text-rose-600" />
                        التنبيهات العاجلة
                    </h2>
                    <p className="text-slate-500 font-bold italic">إرسال التعميمات الفورية، تنبيهات الطوارئ، وتحديثات الخدمات العامة لسكان الحي ومربعاته</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-4 px-10 py-5 bg-rose-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-rose-500/20 active:scale-95 leading-none italic">
                        <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        إرسال بلاغ عاجل
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "تم الإرسال اليوم", val: "٠٥", color: "rose", icon: Send },
                    { label: "نسبة الوصول", val: "٩٨٪", color: "emerald", icon: Radio },
                    { label: "تفاعلات فورية", val: "٤١٢", color: "blue", icon: Bell },
                    { label: "حالات طارئة", val: "٠١", color: "rose", icon: AlertTriangle },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl group hover:shadow-2xl transition-all relative overflow-hidden">
                         <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000`} />
                         <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm`}>
                            <stat.icon className="w-8 h-8" />
                         </div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic leading-none">{stat.label}</p>
                         <h3 className="text-4xl font-black text-slate-900 leading-none font-mono tracking-tighter uppercase">{stat.val}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                 <div className="lg:col-span-2 space-y-8">
                     <div className="bg-white rounded-[56px] border border-slate-100 shadow-2xl overflow-hidden p-12">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-800">الأرشيف الزمني للتنبيهات</h3>
                            <button className="p-4 bg-slate-50 rounded-2xl text-slate-300 hover:text-slate-900 transition-all">
                                <Filter className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="space-y-10">
                            {alerts.map((alert, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-10 bg-slate-50/50 rounded-[48px] border border-slate-100 hover:shadow-2xl transition-all group relative overflow-hidden"
                                >
                                    <div className={`absolute top-0 right-0 w-2 h-full ${
                                        alert.status === 'Critical' ? 'bg-rose-600' : 
                                        alert.status === 'Important' ? 'bg-amber-500' : 'bg-blue-500'
                                    }`} />
                                    <div className="flex items-start justify-between mb-6">
                                         <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                                                alert.status === 'Critical' ? 'bg-rose-600 text-white animate-pulse' : 
                                                alert.status === 'Important' ? 'bg-amber-500 text-white' : 'bg-blue-500 text-white'
                                            }`}>
                                                 {alert.status === 'Critical' ? <AlertTriangle className="w-8 h-8" /> : <Bell className="w-8 h-8" />}
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="text-2xl font-black text-slate-900 italic tracking-tight uppercase leading-none">{alert.title}</h4>
                                                <span className="text-[10px] font-black text-slate-400 italic uppercase tracking-widest">{alert.time} • {alert.radius}</span>
                                            </div>
                                         </div>
                                         <button className="p-3 bg-white rounded-xl text-slate-300 hover:text-rose-600 transition-all">
                                            <Trash2 className="w-5 h-5" />
                                         </button>
                                    </div>
                                    <p className="text-slate-600 font-medium italic leading-relaxed text-sm pr-18">{alert.message}</p>
                                    <div className="flex justify-end gap-3 mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                         <button className="px-6 py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 italic shadow-sm hover:border-slate-900 transition-all">إعادة إرسال</button>
                                         <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic shadow-xl">تحليل التفاعل</button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                     </div>
                 </div>

                 <div className="space-y-8">
                     <div className="bg-slate-900 rounded-[56px] p-12 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute -top-10 -left-10 w-48 h-48 bg-rose-600 opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-2000" />
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-tight mb-12">صناعة التنبيه الذكي</h3>
                        <div className="space-y-10 relative z-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">نطاق البلاغ</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['عام بالحي', 'مربعات محددة'].map((opt, i) => (
                                        <button key={i} className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest italic border transition-all ${
                                            i === 0 ? 'bg-white text-slate-900 border-white shadow-xl' : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                                        }`}>{opt}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">مستوى الأهمية</label>
                                <div className="flex gap-4">
                                    {['Critical', 'Regular'].map((opt, i) => (
                                        <button key={i} className={`flex-1 py-4 px-6 rounded-2xl font-black uppercase tracking-widest text-[9px] italic border transition-all ${
                                            i === 0 ? 'bg-rose-600 text-white border-rose-500 shadow-xl shadow-rose-600/30' : 'bg-white/5 text-slate-400 border-white/10'
                                        }`}>{opt}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 p-8 bg-white/5 rounded-[40px] border border-white/10">
                             <div className="flex items-center gap-4 text-emerald-500">
                                <CheckCircle2 className="w-6 h-6 shrink-0" />
                                <span className="text-[10px] font-black uppercase tracking-widest italic">نظام البث مستقر وجاهز</span>
                             </div>
                        </div>
                     </div>

                     <div className="bg-blue-50 border border-blue-100 rounded-[56px] p-12 space-y-6 text-center group">
                        <div className="w-20 h-20 bg-blue-100 rounded-[32px] flex items-center justify-center text-blue-600 mx-auto shadow-xl group-hover:rotate-12 transition-transform">
                             <Radio className="w-10 h-10" />
                        </div>
                        <div className="space-y-2">
                             <h4 className="text-2xl font-black italic uppercase text-blue-900 tracking-tighter leading-none">إحصائيات الوصول</h4>
                             <p className="text-blue-800/60 font-medium italic text-xs">تم وصول آخر تعميم لـ ١,٢٤٠ جهاز ذكي بنسبة نجاح ٩٩.٥٪.</p>
                        </div>
                        <button className="w-full py-5 bg-white text-blue-600 rounded-[28px] font-black uppercase tracking-widest text-[9px] italic shadow-xl hover:bg-blue-600 hover:text-white transition-all">
                            عرض سجل التسليم
                        </button>
                     </div>
                 </div>
            </div>
        </div>
    );
};
