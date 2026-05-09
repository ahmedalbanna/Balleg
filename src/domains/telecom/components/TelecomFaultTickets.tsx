import React from "react";
import { motion } from "motion/react";
import { Search, Filter, AlertCircle, Clock, CheckCircle2, MoreVertical, MessageSquare, Tag, User } from "lucide-react";

export const TelecomFaultTickets: React.FC = () => {
    const tickets = [
        { id: "TK-8022", title: "انقطاع شامل للخدمة - حي الصدة", priority: "Urgent", status: "Open", time: "٢٠ دقيقة", technician: "فهمي محمد" },
        { id: "TK-8021", title: "تداخل إشارات الموجة الراديوية", priority: "High", status: "Ongoing", time: "١ ساعة", technician: "سارة علي" },
        { id: "TK-8020", title: "صيانة دورية للمولد الاحتياطي", priority: "Normal", status: "Pending", time: "٣ ساعة", technician: "خالد سعيد" },
        { id: "TK-8019", title: "تحديث برنامج التحكم المركزي", priority: "Low", status: "Resolved", time: "٥ ساعة", technician: "أحمد يحيى" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">سجل الأعطال والتذاكر</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">نظام إدارة البلاغات والدعم الفني الميداني</p>
                </div>
                <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm md:w-96">
                    <input className="bg-transparent border-none outline-none text-xs font-bold w-full p-2.5 px-4" placeholder="رقم التذكرة أو اسم الفني..." />
                    <button className="bg-slate-900 text-white px-5 rounded-xl text-[10px] font-black uppercase italic tracking-widest">
                        SEARCH
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12">
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest">Active Tickets List</h3>
                            <div className="flex gap-2">
                                <button className="p-3 rounded-xl bg-slate-50 text-slate-900 border border-slate-100 hover:bg-slate-100 transition-colors">
                                    <Filter className="w-4 h-4" />
                                </button>
                                <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                                    New Ticket
                                </button>
                            </div>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {tickets.map((ticket, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-slate-50/50 transition-colors"
                                >
                                    <div className="flex items-start gap-6 grow">
                                        <div className={`p-5 rounded-3xl shrink-0 ${
                                            ticket.priority === 'Urgent' ? 'bg-rose-50 text-rose-600' :
                                            ticket.priority === 'High' ? 'bg-orange-50 text-orange-600' :
                                            'bg-blue-50 text-blue-600'
                                        }`}>
                                            <AlertCircle className="w-8 h-8" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                 <span className="text-[10px] font-black tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{ticket.id}</span>
                                                 <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${
                                                     ticket.priority === 'Urgent' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-white'
                                                 }`}>
                                                     {ticket.priority}
                                                 </span>
                                            </div>
                                            <h4 className="text-lg font-black text-slate-900">{ticket.title}</h4>
                                            <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                                                <div className="flex items-center gap-1.5 border-r border-slate-200 pr-4">
                                                    <User className="w-3.5 h-3.5" />
                                                    <span>{ticket.technician}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    <span>Last seen: {ticket.time} ago</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 shrink-0">
                                        <div className="text-right flex flex-col items-end gap-2">
                                            <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                                                ticket.status === 'Open' ? 'bg-rose-50 text-rose-600' :
                                                ticket.status === 'Ongoing' ? 'bg-blue-50 text-blue-600' :
                                                ticket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' :
                                                'bg-amber-50 text-amber-600'
                                            }`}>
                                                {ticket.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="p-4 rounded-2xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                                                <MessageSquare className="w-5 h-5" />
                                            </button>
                                            <button className="p-4 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
