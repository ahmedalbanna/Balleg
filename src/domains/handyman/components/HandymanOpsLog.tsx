import React from "react";
import { motion } from "motion/react";
import { ListTodo, Search, Filter, Clock, MapPin, CheckCircle2, AlertCircle, Calendar, HardHat, Hammer, Wrench, ArrowDownCircle } from "lucide-react";

export const HandymanOpsLog: React.FC = () => {
    const logs = [
        { time: "٠٩:٣٠ ص", date: "اليوم", action: "بدء صب الخرسانة", location: "جسر الروضة", user: "علي منصور", icon: HardHat, status: "Ongoing" },
        { time: "٠٨:١٥ ص", date: "اليوم", action: "وصول شحنة الديزل", location: "المخزن الرئيسي", user: "سالم حامد", icon: CheckCircle2, status: "Success" },
        { time: "٠٤:٤٥ م", date: "أمس", action: "عطل مفاجئ في الرافعة", location: "مدرسة الوادي", user: "خالد سعيد", icon: AlertCircle, status: "Critical" },
        { time: "٠٢:٠٠ م", date: "أمس", action: "اكتمال تسوير الموقع", location: "جسر الروضة", user: "فريق الميدان", icon: Hammer, status: "Success" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <ListTodo className="w-8 h-8 text-amber-600" />
                        سجل العمليات
                    </h2>
                    <p className="text-slate-500 font-bold italic">التسجيل الزمني لكافة الأنشطة الميدانية، الأحداث، والتدخلات التقنية في مواقع العمل</p>
                </div>
            </header>

            <div className="bg-white rounded-[48px] border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/20">
                    <div className="flex items-center gap-3">
                         <Calendar className="w-6 h-6 text-slate-400" />
                         <span className="font-black text-slate-900 italic uppercase tracking-tighter">السجل الزمني للأحداث</span>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative group">
                             <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                             <input type="text" placeholder="بحث..." className="py-3 pr-10 pl-4 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-amber-500/20 transition-all font-medium italic" />
                        </div>
                        <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-amber-600 transition-all">
                            <ArrowDownCircle className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="p-8">
                    <div className="relative border-r-2 border-slate-100 pr-10 space-y-12 py-4">
                        {logs.map((log, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="relative group"
                            >
                                <div className={`absolute -right-[54px] top-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl transition-all group-hover:scale-110 ${
                                    log.status === 'Critical' ? 'bg-rose-500 text-white shadow-rose-200' :
                                    log.status === 'Success' ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-amber-500 text-white shadow-amber-200'
                                }`}>
                                    <log.icon className="w-6 h-6" />
                                </div>
                                
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-[10px] font-black font-mono text-slate-400 italic uppercase tracking-widest">{log.date} • {log.time}</span>
                                            <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${
                                                log.status === 'Critical' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'
                                            }`}>{log.status}</span>
                                        </div>
                                        <h4 className="text-xl font-black text-slate-900 italic tracking-tight uppercase leading-tight group-hover:text-amber-600 transition-colors">{log.action}</h4>
                                        <div className="flex items-center gap-6 mt-4">
                                             <div className="flex items-center gap-2 text-xs font-bold text-slate-400 italic">
                                                <MapPin className="w-4 h-4 text-amber-500" />
                                                {log.location}
                                             </div>
                                             <div className="flex items-center gap-2 text-xs font-bold text-slate-400 italic">
                                                <span className="w-6 h-6 rounded-full bg-slate-200 shrink-0" />
                                                بواسطة: {log.user}
                                             </div>
                                        </div>
                                    </div>
                                    <button className="px-5 py-2.5 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all opacity-0 group-hover:opacity-100 italic">
                                        التفاصيل
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
