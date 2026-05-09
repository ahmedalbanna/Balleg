import React from "react";
import { motion } from "motion/react";
import { FileText, Plus, Search, Filter, Clock, CheckCircle2, ChevronRight, MoreHorizontal, User, Paperclip } from "lucide-react";

export const VerifierDocRequests: React.FC = () => {
    const requests = [
        { id: "REQ-1002", title: "توكيل قانوني - ورثة بن جلال", category: "Legal", date: "اليوم", status: "In Review", files: 4 },
        { id: "REQ-1001", title: "إثبات قيد سكني - حي القلعة", category: "Residence", date: "أمس", status: "Approved", files: 2 },
        { id: "REQ-1000", title: "شهادة خلو سوابق فنية", category: "Technical", date: "08 مايو", status: "Rejected", files: 3 },
    ];

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">طلبات التوثيق</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">طلبات المواطنين والجهات لإصدار محررات موثقة</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white p-1 rounded-2xl border border-slate-100 shadow-sm flex items-center md:w-80">
                         <input className="bg-transparent border-none outline-none text-xs font-bold w-full p-2.5 px-4" placeholder="رقم الطلب، اسم صاحب العلاقة..." />
                         <button className="p-2.5 text-slate-400"><Search className="w-4 h-4" /></button>
                    </div>
                    <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl">
                        <Plus className="w-4 h-4" />
                        New Request
                    </button>
                    <button className="p-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm"><Filter className="w-4 h-4 text-slate-400" /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
                        <div className="divide-y divide-slate-50">
                            {requests.map((req, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-10 flex items-center justify-between hover:bg-slate-50/50 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start gap-8">
                                        <div className="w-16 h-16 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                            <FileText className="w-8 h-8" />
                                        </div>
                                        <div className="space-y-1.5">
                                             <div className="flex items-center gap-3">
                                                 <span className="text-[10px] font-black text-slate-400 tracking-tighter bg-slate-50 px-3 py-1 rounded-full">{req.id}</span>
                                                 <span className="text-[9px] font-black uppercase text-blue-600 tracking-widest">{req.category}</span>
                                             </div>
                                             <h4 className="text-2xl font-black text-slate-900 italic tracking-tight">{req.title}</h4>
                                             <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase">
                                                 <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" /><span>Recieved: {req.date}</span></div>
                                                 <div className="flex items-center gap-1.5"><Paperclip className="w-3 h-3" /><span>{req.files} Attachments</span></div>
                                             </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                         <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                                             req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                             req.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                             'bg-blue-50 text-blue-600 border border-blue-100'
                                         }`}>{req.status}</span>
                                         <button className="p-3 bg-slate-100 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-all">
                                            <ChevronRight className="w-5 h-5" />
                                         </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                         <h3 className="text-xl font-black italic mb-8">إحصائيات الطلبات</h3>
                         <div className="space-y-8">
                             {[
                                 { label: "تمت الموافقة", val: "٨٢٪", color: "bg-emerald-400" },
                                 { label: "تحت المعالجة", val: "١٢٪", color: "bg-blue-400" },
                                 { label: "مرفوضة", val: "٦٪", color: "bg-rose-400" },
                             ].map((stat, i) => (
                                 <div key={i} className="space-y-3">
                                     <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
                                         <span>{stat.label}</span>
                                         <span>{stat.val}</span>
                                     </div>
                                     <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                         <div className={`h-full ${stat.color}`} style={{ width: stat.val.replace('٪', '%') }} />
                                     </div>
                                 </div>
                             ))}
                         </div>
                    </div>

                    <div className="bg-white rounded-[3rem] border border-slate-100 p-10 shadow-xl">
                        <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3 italic uppercase tracking-tighter underline decoration-blue-600 decoration-4 underline-offset-4">
                            Latest Doc-Archive
                        </h3>
                        <div className="space-y-4">
                            {[1,2,3].map((j) => (
                                <div key={j} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                                     <div className="flex items-center gap-4">
                                         <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                                         <span className="text-xs font-bold text-slate-700 italic">Signed_Letter_0{j}.pdf</span>
                                     </div>
                                     <MoreHorizontal className="w-4 h-4 text-slate-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
