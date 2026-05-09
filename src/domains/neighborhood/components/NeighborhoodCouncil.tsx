import React from "react";
import { motion } from "motion/react";
import { Users, Search, Filter, Plus, Shield, Star, MessageSquare, Calendar, ChevronRight, UserCheck } from "lucide-react";

export const NeighborhoodCouncil: React.FC = () => {
    const members = [
        { id: "MEM-001", name: "الشيخ منصور القادري", role: "رئيس المجلس", status: "Active", experience: "١٥ سنة", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
        { id: "MEM-002", name: "أ. ليلى الصبري", role: "الشؤون الاجتماعية", status: "Active", experience: "٨ سنوات", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
        { id: "MEM-003", name: "م. عادل الفقيه", role: "اللجنة الفنية", status: "Active", experience: "١٢ سنة", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
        { id: "MEM-004", name: "د. هبة الرشيدي", role: "اللجنة الصحية", status: "Away", experience: "٦ سنوات", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800 pb-24 lg:pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Users className="w-8 h-8 text-indigo-600" />
                        مجلس الحـي
                    </h2>
                    <p className="text-slate-500 font-bold italic">إدارة شؤون المجلس المحلي، تنسيق اللجان التخصصية، ومتابعة مخرجات الاجتماعات الدورية</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 leading-none">
                        <Plus className="w-4 h-4" />
                        إضافة عضو جديد
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "أعضاء المجلس", val: "١٢", color: "indigo", icon: UserCheck },
                    { label: "اللجان النشطة", val: "٠٥", color: "emerald", icon: Shield },
                    { label: "قرارات منجزة", val: "٨٤", color: "blue", icon: Star },
                    { label: "اجتماعات قيد الانتظار", val: "٠٢", color: "rose", icon: Calendar },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                         <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000`} />
                         <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm`}>
                            <stat.icon className="w-8 h-8" />
                         </div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{stat.label}</p>
                         <h3 className="text-3xl font-black text-slate-900 leading-none font-mono tracking-tighter uppercase">{stat.val}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[56px] border border-slate-100 shadow-2xl overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/20">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl shadow-lg shadow-slate-200 flex items-center justify-center text-indigo-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-800">قائمة الأعضاء واللجان</h3>
                     </div>
                     <div className="relative group min-w-[300px]">
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="البحث عن عضو أو لجنة..." 
                            className="w-full py-4 pr-16 pl-6 bg-white border border-slate-200 rounded-[24px] focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 outline-none transition-all font-bold italic"
                        />
                     </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100">
                    {members.map((member, i) => (
                        <div key={i} className="bg-white p-10 hover:bg-slate-50 transition-all flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <img src={member.image} className="w-20 h-20 rounded-[30px] object-cover shadow-2xl group-hover:scale-110 transition-transform duration-700" alt={member.name} />
                                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 border-4 border-white rounded-full ${member.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors italic tracking-tight uppercase leading-none">{member.name}</h4>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest italic">{member.role}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase italic">خبرة {member.experience}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                                <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-300 hover:text-indigo-600 hover:border-indigo-100 shadow-sm transition-all active:scale-90">
                                    <MessageSquare className="w-5 h-5" />
                                </button>
                                <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-300 hover:text-slate-900 shadow-sm transition-all active:scale-90">
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
