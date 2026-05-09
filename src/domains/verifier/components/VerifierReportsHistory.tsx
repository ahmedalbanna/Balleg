import React from "react";
import { motion } from "motion/react";
import { ClipboardList, Search, Filter, AlertTriangle, Clock, CheckCircle2, MessageSquare, MoreHorizontal, User, MapPin } from "lucide-react";

export const VerifierReportsHistory: React.FC = () => {
    const reports = [
        { id: "REP-9901", title: "بلاغ تلاعب في بيانات توزيع الإغاثة", type: "Security", status: "Investigating", priority: "High", date: "12 مايو", location: "قطاع الحديدة" },
        { id: "REP-9900", title: "تقرير اشتباه تزوير محررات عقارية", type: "Fraud", status: "Resolved", priority: "Urgent", date: "10 مايو", location: "وسط العاصمة" },
        { id: "REP-9899", title: "بلاغ عن فقدان وثائق رسمية في الحريق", type: "Accident", status: "Closed", priority: "Normal", date: "08 مايو", location: "حي الجامعة" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b-2 border-slate-100">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase underline decoration-rose-600 decoration-8 underline-offset-8">Reports History</h1>
                    <p className="text-slate-500 font-medium text-sm mt-3 font-mono">سجل البلاغات والتحقيقات الميدانية الموثقة</p>
                </div>
                <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-xl md:w-96">
                    <input className="bg-transparent border-none outline-none text-[11px] font-black w-full p-2.5 px-6 uppercase" placeholder="Incident ID, Type, Location..." />
                    <button className="bg-rose-600 text-white px-8 rounded-xl text-[10px] font-black uppercase italic tracking-widest shadow-xl shadow-rose-200">
                        AUDIT
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                    { label: "Active Investigations", val: "٠٨", icon: AlertTriangle, color: "text-rose-600", bg: "bg-rose-50" },
                    { label: "Resolved Cases", val: "١٤٢", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Pending Review", val: "١٢", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Total Archive", val: "٣,٤٠٠", icon: ClipboardList, color: "text-slate-900", bg: "bg-slate-100" },
                 ].map((kpi, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-rose-200 transition-all box-border"
                    >
                        <div className={`p-4 rounded-2xl w-fit ${kpi.bg} ${kpi.color} group-hover:rotate-12 transition-transform`}>
                            <kpi.icon className="w-6 h-6" />
                        </div>
                        <div className="mt-6 text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
                            <p className="text-3xl font-black text-slate-900 italic tracking-tighter">{kpi.val}</p>
                        </div>
                    </motion.div>
                 ))}
            </div>

            <div className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl" />
                 <div className="p-8 border-b border-slate-50 flex items-center justify-between relative z-10">
                      <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest">Global Audit Log</h3>
                      <button className="flex items-center gap-2 bg-slate-50 px-5 py-2 rounded-xl text-slate-900 border border-slate-100 hover:bg-slate-100 transition-colors">
                         <Filter className="w-4 h-4" />
                         <span className="text-[10px] font-black uppercase tracking-tighter">Refine Search</span>
                      </button>
                 </div>
                 <div className="divide-y divide-slate-50">
                    {reports.map((rep, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 flex flex-col md:flex-row items-center justify-between gap-10 hover:bg-rose-50/10 transition-colors cursor-pointer group"
                        >
                            <div className="flex items-center gap-8 grow">
                                <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex flex-col items-center justify-center text-white shadow-2xl relative overflow-hidden shrink-0">
                                     <span className="text-[10px] font-black uppercase relative z-10 opacity-50">{rep.date.split(' ')[1]}</span>
                                     <span className="text-2xl font-black italic relative z-10">{rep.date.split(' ')[0]}</span>
                                     <div className={`absolute bottom-0 left-0 w-full h-1.5 ${
                                         rep.priority === 'Urgent' ? 'bg-rose-500' : 'bg-blue-500'
                                     }`} />
                                </div>
                                <div className="space-y-2">
                                     <div className="flex items-center gap-3">
                                         <span className="text-[9px] font-black bg-slate-100 px-3 py-1 rounded-full text-slate-500 tracking-widest">{rep.id}</span>
                                         <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${
                                             rep.status === 'Resolved' ? 'bg-emerald-500 text-white' : 'bg-rose-600 text-white border-2 border-rose-100 shadow-lg shadow-rose-100'
                                         }`}>{rep.status}</span>
                                     </div>
                                     <h4 className="text-2xl font-black text-slate-900 italic tracking-tight">{rep.title}</h4>
                                     <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                         <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /><span>{rep.location}</span></div>
                                         <div className="flex items-center gap-1.5 italic text-slate-900"><span>INCIDENT TYPE: {rep.type}</span></div>
                                     </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="px-8 py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-900 text-[10px] font-black uppercase tracking-widest hover:border-slate-900 transition-all">View Details</button>
                                <button className="p-5 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors"><MoreHorizontal className="w-5 h-5 text-slate-300" /></button>
                            </div>
                        </motion.div>
                    ))}
                 </div>
            </div>
        </div>
    );
};
