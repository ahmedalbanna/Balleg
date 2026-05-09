import React from "react";
import { motion } from "motion/react";
import { Bell, AlertTriangle, Radiation, ShieldAlert, MessageSquare, Clock, MapPin, CheckCircle2, MoreVertical, Map, Activity, Plus } from "lucide-react";

export const HumanitarianActiveReports: React.FC = () => {
    const reports = [
        { id: "REP-101", title: "استغاثة عاجلة: نقص مياه حاد", location: "صنعاء - حي النهضة", time: "منذ ١٥ دقيقة", status: "Critical", icon: AlertTriangle },
        { id: "REP-102", title: "بلاغ عن حالة ولادة طارئة", location: "مخيم السلام - عدن", time: "منذ ٣٠ دقيقة", status: "Urgent", icon: Activity },
        { id: "REP-103", title: "تجمع نازحين جديد في الميناء", location: "الحديدة", time: "منذ ساعة", status: "Processing", icon: MessageSquare },
        { id: "REP-104", title: "طلب حماية أمنية للموقع", location: "مأرب - الوادي", time: "منذ ساعتين", status: "Critical", icon: ShieldAlert },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in slide-in-from-right-4 duration-700">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Bell className="w-8 h-8 text-rose-600" />
                        البلاغات النشطة
                    </h2>
                    <p className="text-slate-500 font-bold italic">إدارة نداءات الاستغاثة الواردة، تنسيق الاستجابة الميدانية، وتتبع تطور البلاغات لحظياً</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-rose-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-rose-500/20 active:scale-95 leading-none">
                        <Plus className="w-4 h-4" />
                        رفع بلاغ إداري
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-900 p-10 rounded-[48px] text-white relative overflow-hidden group shadow-2xl">
                             <Radiation className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10 group-hover:rotate-45 transition-transform duration-1000" />
                             <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-3">
                                    <ShieldAlert className="w-6 h-6 text-rose-500" />
                                    <h4 className="text-xl font-black italic uppercase tracking-tighter">نداء استغاثة (SOS)</h4>
                                </div>
                                <p className="text-slate-400 text-sm italic font-medium leading-relaxed">استخدم هذا الوضع في حال وجود خطر يهدد الحياة أو الطواقم الميدانية لإرسال تنبيه شامل.</p>
                                <button className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-rose-900/40">
                                    إرسال استغاثة فورية
                                </button>
                             </div>
                        </div>

                        <div className="bg-white border-2 border-rose-100 p-10 rounded-[48px] text-slate-900 relative overflow-hidden group shadow-xl">
                            <Map className="absolute -bottom-10 -right-10 w-40 h-40 text-rose-50 opacity-50 group-hover:scale-110 transition-transform duration-1000" />
                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-6 h-6 text-rose-600" />
                                    <h4 className="text-xl font-black italic uppercase tracking-tighter text-slate-800">تغطية البلاغات</h4>
                                </div>
                                <div className="flex justify-between items-center bg-rose-50 p-4 rounded-2xl border border-rose-100">
                                     <div className="text-center flex-1 border-l border-rose-100">
                                        <div className="text-2xl font-black text-rose-600 font-mono tracking-tighter">١٢</div>
                                        <div className="text-[8px] font-black uppercase text-rose-400">بلاغ نشط</div>
                                     </div>
                                     <div className="text-center flex-1">
                                        <div className="text-2xl font-black text-emerald-600 font-mono tracking-tighter">٤٥</div>
                                        <div className="text-[8px] font-black uppercase text-emerald-400">تم حلها اليوم</div>
                                     </div>
                                </div>
                            </div>
                        </div>
                     </div>

                     <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden">
                        <div className="divide-y divide-slate-100">
                            {reports.map((report, idx) => (
                                <div key={idx} className="p-8 hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-start justify-between gap-6 group cursor-pointer relative">
                                    <div className="flex gap-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all group-hover:scale-110 ${
                                            report.status === 'Critical' ? 'bg-rose-100 text-rose-600 shadow-rose-100' : 
                                            report.status === 'Urgent' ? 'bg-amber-100 text-amber-600 shadow-amber-100' : 'bg-blue-100 text-blue-600 shadow-blue-100'
                                        }`}>
                                            <report.icon className={`w-7 h-7 ${report.status === 'Critical' ? 'animate-pulse' : ''}`} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="text-[10px] font-black font-mono text-slate-300 italic flex items-center gap-1 uppercase tracking-widest leading-none">
                                                    <Clock className="w-3 h-3" />
                                                    {report.time}
                                                </span>
                                                <span className={`text-[8px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest ${
                                                    report.status === 'Critical' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-400'
                                                }`}>{report.status}</span>
                                            </div>
                                            <h4 className="text-xl font-black text-slate-900 group-hover:text-rose-600 transition-colors italic tracking-tight uppercase leading-tight">{report.title}</h4>
                                            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mt-2 italic">
                                                <MapPin className="w-4 h-4 text-rose-500" />
                                                {report.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all opacity-0 group-hover:opacity-100 shadow-lg shadow-slate-900/10">
                                            الاستجابة الآن
                                        </button>
                                        <button className="p-3 text-slate-200 hover:text-slate-900 transition-all">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                     </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-100 border border-slate-200 rounded-[56px] p-12 text-slate-900 flex flex-col justify-between shadow-xl h-full">
                         <div className="space-y-12">
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-tight">سجل الاستجابة الفورية</h3>
                            <div className="space-y-8">
                                {[
                                    { text: "تم تأمين موقع تجمع الحديدة", time: "منذ ٥ دقائق", icon: CheckCircle2, color: "emerald" },
                                    { text: "فريق الإسعاف في الطريق لمأمب", time: "منذ ١٢ دقيقة", icon: Clock, color: "blue" },
                                    { text: "تم توزيع سلال غذائية في صنعاء", time: "منذ ٢٤ دقيقة", icon: CheckCircle2, color: "emerald" },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 group/item">
                                        <div className={`w-10 h-10 rounded-2xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center shrink-0`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black italic text-slate-800 leading-tight">{item.text}</p>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{item.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>
                         <div className="pt-12">
                             <button className="w-full py-5 bg-white border border-slate-200 text-slate-400 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm">
                                أرشيف البلاغات المنتهية
                             </button>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
