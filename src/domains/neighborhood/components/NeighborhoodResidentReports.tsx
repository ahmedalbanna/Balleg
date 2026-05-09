import React from "react";
import { motion } from "motion/react";
import { MessageSquare, Search, Filter, Plus, Clock, MapPin, AlertTriangle, CheckCircle2, ChevronRight, User, Trash2, Edit3, MessageCircle } from "lucide-react";

export const NeighborhoodResidentReports: React.FC = () => {
    const reports = [
        { id: "REP-401", title: "انقطاع المياه في المربع ب", location: "مربع الصمود", time: "منذ ساعة", status: "Open", priority: "High" },
        { id: "REP-402", title: "تراكم القمامة خلف المدرسة", location: "مربع الزهور", time: "منذ ٤ ساعات", status: "In Progress", priority: "Medium" },
        { id: "REP-403", title: "عمود كهرباء آيل للسقوط", location: "المربع التجاري", time: "منذ يوم", status: "Urgent", priority: "Critical" },
        { id: "REP-404", title: "إصلاح حفرة في الشارع الرئيسي", location: "مربع الزهور", time: "منذ يومين", status: "Resolved", priority: "Low" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in slide-in-from-right-4 duration-800 pb-24 lg:pb-12 text-right">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <MessageSquare className="w-10 h-10 text-rose-600" />
                        بلاغات الأهالي
                    </h2>
                    <p className="text-slate-500 font-bold italic">استقبال ومعالجة بلاغات سكان الحي، توزيع المهام على اللجان المعنية، ومتابعة سرعة الاستجابة</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-3 px-8 py-5 bg-rose-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-rose-500/20 active:scale-95 leading-none italic">
                        <Plus className="w-5 h-5" />
                        تسجيل بلاغ جديد
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "إجمالي البلاغات", val: "١٤٢", color: "rose", icon: MessageSquare },
                    { label: "بلاغات نشطة", val: "١٨", color: "amber", icon: Clock },
                    { label: "تمت المعالجة", val: "١١٥", color: "emerald", icon: CheckCircle2 },
                    { label: "بلاغات عاجلة", val: "٠٩", color: "rose", icon: AlertTriangle },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl group hover:shadow-2xl transition-all relative overflow-hidden">
                         <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000`} />
                         <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm`}>
                            <stat.icon className="w-8 h-8" />
                         </div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic leading-none">{stat.label}</p>
                         <h3 className="text-4xl font-black text-slate-900 leading-none font-mono tracking-tighter uppercase">{stat.val}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[56px] border border-slate-100 shadow-2xl overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/20">
                     <div className="relative group flex-1 max-w-xl">
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="البحث في البلاغات، المواقع، أو أصحاب الشكوى..." 
                            className="w-full py-5 pr-16 pl-8 bg-white border border-slate-200 rounded-[30px] focus:ring-4 focus:ring-rose-50 focus:border-rose-300 outline-none transition-all font-bold italic"
                        />
                     </div>
                     <div className="flex gap-4">
                        <button className="p-5 bg-white border border-slate-200 rounded-[28px] text-slate-400 hover:text-rose-600 transition-all">
                            <Filter className="w-6 h-6" />
                        </button>
                     </div>
                </div>

                <div className="divide-y divide-slate-50">
                    {reports.map((report, i) => (
                        <div key={i} className="p-10 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 group cursor-pointer relative overflow-hidden">
                            {report.priority === 'Critical' && <div className="absolute top-0 right-0 w-2 h-full bg-rose-600" />}
                            <div className="flex gap-8 relative z-10">
                                <div className={`w-16 h-16 rounded-[28px] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform ${
                                    report.status === 'Urgent' ? 'bg-rose-600 text-white animate-pulse' : 
                                    report.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                                }`}>
                                     {report.status === 'Resolved' ? <CheckCircle2 className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black font-mono text-slate-300 italic uppercase tracking-widest leading-none">{report.id}</span>
                                        <span className="text-[10px] font-black text-slate-400 italic flex items-center gap-1 uppercase tracking-widest">
                                            <Clock className="w-3 h-3" />
                                            {report.time}
                                        </span>
                                    </div>
                                    <h4 className="text-2xl font-black text-slate-900 group-hover:text-rose-600 transition-colors italic tracking-tight uppercase leading-none">{report.title}</h4>
                                    <div className="flex items-center gap-6 mt-3">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 italic">
                                            <MapPin className="w-4 h-4 text-rose-500" />
                                            {report.location}
                                        </div>
                                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-lg ${
                                            report.priority === 'Critical' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-400'
                                        }`}>{report.priority}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 relative z-10 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-300 hover:text-rose-600 transition-all shadow-sm">
                                    <Edit3 className="w-5 h-5" />
                                </button>
                                <button className="px-8 py-4 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest text-[9px] hover:bg-rose-600 transition-all shadow-xl italic">
                                    تحويل لجهة الاختصاص
                                </button>
                                <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-300 hover:text-slate-900 transition-all shadow-sm">
                                    <ChevronRight className="w-5 h-5 rotate-180" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
