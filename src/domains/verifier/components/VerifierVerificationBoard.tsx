import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, CheckCircle2, AlertCircle, Clock, Search, Filter, MoreVertical, UserCheck } from "lucide-react";

export const VerifierVerificationBoard: React.FC = () => {
    const tasks = [
        { id: "VR-201", title: "توثيق ملكية عقار - الحي الغربي", status: "Pending", priority: "High", time: "2 س", requester: "مجلس الحي" },
        { id: "VR-202", title: "مراجعة بيانات الهوية - مربع 04", status: "Ongoing", priority: "Normal", time: "4 س", requester: "السجل المدني" },
        { id: "VR-203", title: "تدقيق بلاغ تداخل أراضي", status: "Urgent", priority: "Urgent", time: "30 د", requester: "الأمن المحلي" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">لوحة التحقق | <span className="text-blue-600 uppercase">Verification Hub</span></h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">إدارة واعتماد البيانات الموثقة ميدانياً</p>
                </div>
                <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm md:w-96">
                    <input className="bg-transparent border-none outline-none text-xs font-bold w-full p-3 px-5" placeholder="بحث برقم المعاملة أو الموقع..." />
                    <button className="bg-blue-600 text-white px-6 rounded-xl text-[10px] font-black uppercase italic tracking-widest transition-transform active:scale-95">
                        FIND
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "قيد المراجعة", val: "١٤", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
                    { label: "مكتملة اليوم", val: "٢٨", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
                    { label: "تنبيهات حرجة", val: "٠٣", icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-50" },
                ].map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex items-center gap-6"
                    >
                        <div className={`p-5 rounded-[1.5rem] ${stat.bg} ${stat.color}`}>
                            <stat.icon className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-3xl font-black text-slate-900">{stat.val}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                    <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest">Recent Verification Queue</h3>
                    <Filter className="w-5 h-5 text-slate-300 pointer-events-auto cursor-pointer" />
                </div>
                <div className="divide-y divide-slate-50">
                    {tasks.map((task, i) => (
                        <div key={i} className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-slate-50/30 transition-colors group">
                            <div className="flex items-start gap-6 grow">
                                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                                    <ShieldCheck className="w-7 h-7" />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black tracking-widest bg-slate-100 px-3 py-1 rounded-full text-slate-500">{task.id}</span>
                                        <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase ${
                                            task.priority === 'Urgent' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-white'
                                        }`}>{task.priority}</span>
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 italic">{task.title}</h4>
                                    <p className="text-xs font-bold text-slate-400">بواسطة: {task.requester} • منذ {task.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="bg-emerald-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-100 hover:scale-105 transition-transform flex items-center gap-2">
                                    <UserCheck className="w-4 h-4" />
                                    VERIFY
                                </button>
                                <button className="p-4 rounded-2xl bg-slate-100 text-slate-400 hover:text-slate-900 transition-all">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
