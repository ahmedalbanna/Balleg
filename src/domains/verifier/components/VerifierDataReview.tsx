import React from "react";
import { motion } from "motion/react";
import { Search, Filter, Eye, FileSearch, CheckCircle2, XCircle, AlertTriangle, User, History, MessageSquare } from "lucide-react";

export const VerifierDataReview: React.FC = () => {
    const records = [
        { id: "REC-401", title: "مراجعة كشوفات النازحين - مخيم الصمود", status: "In-Review", field: "Demographics", date: "15 مايو" },
        { id: "REC-402", title: "تدقيق ملكية أراضي زراعية - تهامة", status: "Flagged", field: "Property", date: "18 مايو" },
        { id: "REC-403", title: "توثيق بيانات صحية - القطاع الصحي", status: "Verified", field: "Medical", date: "20 مايو" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">مراجعة البيانات</h1>
                <p className="text-slate-500 font-medium text-sm mt-1">التدقيق التقني والموضوعي للبيانات المجمعة ميدانياً</p>
                </div>
                <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm md:w-96">
                    <input className="bg-transparent border-none outline-none text-xs font-bold w-full p-2.5 px-4" placeholder="رقم السجل، الكلمة المفتاحية..." />
                    <button className="bg-slate-900 text-white px-5 rounded-xl text-[10px] font-black uppercase italic tracking-widest">
                        REVIEW
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
                <div className="p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                     <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                        <FileSearch className="w-5 h-5" />
                        Pending Review Queue
                     </h3>
                     <div className="flex gap-2">
                        <button className="p-3 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-blue-600 transition-all shadow-sm">
                            <Filter className="w-4 h-4" />
                        </button>
                     </div>
                </div>
                <div className="divide-y divide-slate-50">
                    {records.map((rec, i) => (
                        <div key={i} className="p-10 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-slate-50/50 transition-colors group">
                            <div className="flex items-start gap-8 grow">
                                <div className="p-5 rounded-3xl bg-slate-100 text-slate-400 group-hover:bg-blue-900 group-hover:text-blue-400 transition-all shadow-sm relative overflow-hidden">
                                     <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
                                     <FileSearch className="w-8 h-8 relative z-10" />
                                </div>
                                <div className="space-y-2">
                                     <div className="flex items-center gap-3">
                                         <span className="text-[10px] font-black text-slate-400 tracking-tighter bg-slate-100 px-3 py-1 rounded-full">{rec.id}</span>
                                         <span className="text-[9px] font-black uppercase text-blue-600 tracking-widest">{rec.field} Service</span>
                                     </div>
                                     <h4 className="text-2xl font-black text-slate-900 italic tracking-tight">{rec.title}</h4>
                                     <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase">
                                         <div className="flex items-center gap-1.5"><History className="w-3.5 h-3.5" /><span>Last Sync: {rec.date}</span></div>
                                         <div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /><span>Assigned: Verifier-04</span></div>
                                     </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right flex flex-col items-end gap-2">
                                     <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                                         rec.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                         rec.status === 'Flagged' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                         'bg-blue-50 text-blue-600 border border-blue-100'
                                     }`}>{rec.status}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-4 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all shadow-sm">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </button>
                                    <button className="p-4 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all shadow-sm">
                                        <XCircle className="w-5 h-5" />
                                    </button>
                                    <button className="p-4 rounded-2xl bg-slate-900 text-white shadow-xl hover:bg-blue-600 transition-all">
                                        <Eye className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
