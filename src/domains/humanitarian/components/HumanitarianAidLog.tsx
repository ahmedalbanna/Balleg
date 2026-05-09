import React from "react";
import { motion } from "motion/react";
import { History, Search, Filter, Package, Truck, CheckCircle2, Clock, MapPin, Download, ArrowUpRight, AlertCircle, ShoppingBag } from "lucide-react";

export const HumanitarianAidLog: React.FC = () => {
    const logs = [
        { id: "AID-554", item: "سلال غذائية (٢٠٠ سلة)", location: "مخيم السلام", date: "اليوم - ١٠:٣٠ ص", status: "Delivered", recipient: "١٢٠ عائلة" },
        { id: "AID-553", item: "فرش وبطانيات (٥٠٠ قطعة)", location: "مدرسة حي الثورة", date: "اليوم - ٠٨:١٥ ص", status: "In Transit", recipient: "مركز الإيواء" },
        { id: "AID-552", item: "إمدادات مياه نقي (٥٠٠٠ لتر)", location: "مديرية الميناء", date: "أمس - ٠٤:٤٥ م", status: "Delivered", recipient: "المجتمع المحلي" },
        { id: "AID-551", item: "مجموعة ملابس شتوية", location: "قرى جبل صبر", date: "أمس - ٠٢:٠٠ م", status: "Processing", recipient: "٨٠ فرد" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <History className="w-8 h-8 text-amber-600" />
                        سجل المساعدات
                    </h2>
                    <p className="text-slate-500 font-bold italic">توثيق عمليات توزيع المعونات، متابعة الشحنات اللوجستية، وضمان وصول الدعم لمستحقيه</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-amber-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 leading-none">
                        <Download className="w-4 h-4" />
                        تحميل السجل الكامل
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { label: "مساعدات اليوم", val: "١٤ عملية", color: "amber", icon: ShoppingBag },
                    { label: "قيد التوزيع", val: "٠٥ شحنات", color: "blue", icon: Truck },
                    { label: "إجمالي الأسبوع", val: "١٢٤ ملف", color: "emerald", icon: Package },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl group hover:shadow-2xl transition-all relative overflow-hidden">
                         <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000`} />
                         <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <ArrowUpRight className="w-6 h-6 text-slate-200 group-hover:text-slate-900 transition-colors" />
                         </div>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{stat.label}</span>
                         <h3 className="text-3xl font-black text-slate-900 mt-1 font-mono tracking-tighter uppercase">{stat.val}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[48px] border border-slate-100 shadow-2xl overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/20">
                     <div className="flex items-center gap-3">
                        <History className="w-6 h-6 text-slate-400" />
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-800">الأرشيف الزمني للتوزيع</h3>
                     </div>
                     <div className="flex gap-3">
                         <div className="relative group min-w-[300px]">
                            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors w-5 h-5" />
                            <input 
                                type="text" 
                                placeholder="البحث برقم المساعدة أو الموقع..." 
                                className="w-full py-4 pr-16 pl-6 bg-white border border-slate-200 rounded-[24px] focus:ring-4 focus:ring-amber-50 focus:border-amber-200 outline-none transition-all font-medium italic"
                            />
                         </div>
                         <button className="p-4 bg-white border border-slate-200 rounded-[24px] text-slate-300 hover:text-slate-900 transition-all">
                            <Filter className="w-5 h-5" />
                         </button>
                    </div>
                </div>

                <div className="divide-y divide-slate-50">
                    {logs.map((log, i) => (
                        <div key={i} className="p-10 hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer relative overflow-hidden">
                            <div className="flex gap-8 relative z-10">
                                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform ${
                                    log.status === 'Delivered' ? 'bg-emerald-500 text-white' : 
                                    log.status === 'In Transit' ? 'bg-blue-500 text-white animate-pulse' : 'bg-slate-200 text-slate-500'
                                }`}>
                                     {log.status === 'Delivered' ? <CheckCircle2 className="w-8 h-8" /> : 
                                      log.status === 'In Transit' ? <Truck className="w-8 h-8" /> : <Clock className="w-8 h-8" />}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black font-mono text-slate-300 italic uppercase tracking-widest">{log.id}</span>
                                        <span className="text-[10px] font-black text-slate-400 italic flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {log.date}
                                        </span>
                                    </div>
                                    <h4 className="text-2xl font-black text-slate-900 italic tracking-tight uppercase leading-none group-hover:text-amber-600 transition-colors">{log.item}</h4>
                                    <div className="flex items-center gap-6 mt-3">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 italic">
                                            <MapPin className="w-4 h-4 text-amber-500" />
                                            {log.location}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-black text-amber-600 uppercase italic bg-amber-50 px-2 py-0.5 rounded">
                                            <Package className="w-3 h-3" />
                                            المستفيد: {log.recipient}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 relative z-10">
                                <button className="px-8 py-4 bg-slate-100 text-slate-400 rounded-[20px] text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all italic opacity-0 group-hover:opacity-100">
                                    عرض التفاصيل
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
