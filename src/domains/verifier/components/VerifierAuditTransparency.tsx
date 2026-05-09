import React from "react";
import { motion } from "motion/react";
import { Search, Eye, Filter, Scale, ShieldAlert, CheckCircle2, MoreVertical, Database, Globe, History } from "lucide-react";

export const VerifierAuditTransparency: React.FC = () => {
    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1500px] mx-auto pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">Audit & Transparency</h1>
                    <p className="text-slate-500 font-medium text-sm mt-3 underline decoration-blue-500 decoration-dotted underline-offset-8">نظام الرقابة الذاتية والنزاهة في توثيق البيانات</p>
                </div>
                <div className="flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Scale className="w-6 h-6 text-emerald-400 relative z-10" />
                    <div className="relative z-10">
                         <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Self-Audit Score</p>
                         <p className="text-xl font-black text-emerald-400 italic">99.8% Accuracy</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    {[
                        { label: "سجلات التغيير", val: "+١,٢٤٠", icon: History, color: "text-blue-600", bg: "bg-blue-50" },
                        { label: "بلاغات النزاهة", val: "٠٠", icon: ShieldAlert, color: "text-emerald-600", bg: "bg-emerald-50" },
                        { label: "تدقيق خارجي", val: "٣ قيد المراجعة", icon: Globe, color: "text-indigo-600", bg: "bg-indigo-50" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-slate-300 transition-all">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{stat.label}</p>
                                <p className="text-2xl font-black text-slate-900 italic tracking-tighter">{stat.val}</p>
                            </div>
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:rotate-6 transition-transform`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-3">
                    <div className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
                        <div className="p-10 flex items-center justify-between border-b border-slate-50 bg-slate-50/20">
                            <h3 className="text-lg font-black italic text-slate-900 underline decoration-slate-200 decoration-4 underline-offset-8">Blockchain Verification Ledger</h3>
                            <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm grow max-w-sm mx-10">
                                <input className="bg-transparent border-none outline-none text-[11px] font-bold w-full p-2.5 px-6" placeholder="Hash, ID, Or Date..." />
                                <button className="bg-slate-900 text-white px-6 rounded-xl text-[9px] font-black uppercase italic tracking-widest">QUERY</button>
                            </div>
                        </div>
                        <div className="flex-1 p-10 space-y-6">
                             {[1,2,3,4,5].map((item) => (
                                <div key={item} className="flex items-center justify-between p-7 bg-slate-50 rounded-[2.5rem] border border-white hover:shadow-xl transition-all group">
                                     <div className="flex items-center gap-8">
                                         <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all">
                                             <Database className="w-7 h-7" />
                                         </div>
                                         <div className="space-y-1">
                                             <div className="flex items-center gap-4 text-[9px] font-bold text-slate-400">
                                                 <span className="bg-white px-3 py-1 rounded-full shadow-sm tracking-widest">HASH: 0x82...{item}F9</span>
                                                 <span className="uppercase text-emerald-500 font-black">• IMMUTABLE</span>
                                             </div>
                                             <h4 className="text-lg font-black text-slate-900 italic">توثيق معاملة رقم VR-1092{item}</h4>
                                             <p className="text-xs font-bold text-slate-500 italic">تاريخ التوثيق: ٢٣ مايو ٢٠٢٦ - ١٠:١٤ ص</p>
                                         </div>
                                     </div>
                                     <div className="flex items-center gap-6">
                                          <div className="text-right hidden md:block">
                                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Signer Identity</p>
                                              <p className="text-sm font-black text-slate-900">VERIFIER-X-04</p>
                                          </div>
                                          <button className="p-4 bg-white rounded-2xl text-slate-400 hover:text-blue-600 transition-all border border-slate-100 group-hover:border-blue-100">
                                               <Eye className="w-5 h-5" />
                                          </button>
                                     </div>
                                </div>
                             ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
