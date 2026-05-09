import React from "react";
import { motion } from "motion/react";
import { Archive, Search, Filter, Folder, FileText, Download, ShieldCheck, Lock, Star, Calendar, History, Trash2, MoreVertical, Database } from "lucide-react";

export const NeighborhoodArchive: React.FC = () => {
    const archives = [
        { id: "ARC-2024-001", title: "سجلات النازحين - الدفعة الأولى", files: "٤٥ ملف", size: "٨٥٠ ميجا", date: "يناير ٢٠٢٤", status: "Secure" },
        { id: "ARC-2023-112", title: "محاضر اجتماعات مجلس الحي ٢٠٢٣", files: "١٢ ملف", size: "٤٥ ميجا", date: "ديسمبر ٢٠٢٣", status: "Active" },
        { id: "ARC-2023-005", title: "مخططات المربعات السكنية (أ، ب)", files: "٠٨ ملفات", size: "١٢٠ ميجا", date: "أكتوبر ٢٠٢٣", status: "Locked" },
        { id: "ARC-2022-090", title: "أرشيف حل النزاعات التاريخي (سري)", files: "٠٣ ملفات", size: "١٥ ميجا", date: "سبتمبر ٢٠٢٢", status: "Encrypted" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in slide-in-from-bottom-4 duration-800 pb-24 lg:pb-12 text-right">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Archive className="w-10 h-10 text-slate-600" />
                        الأرشيف الإداري
                    </h2>
                    <p className="text-slate-500 font-bold italic">تخزين وحماية الوثائق الرسمية، أرشفة سجلات السكان والمنشآت، وإدارة بروتوكولات الوصول</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-3 px-8 py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 leading-none italic">
                        <Folder className="w-5 h-5" />
                        إنشاء مجلد أرشفة
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { label: "إجمالي المجلدات", val: "١٤ مجلد", color: "slate", icon: Folder },
                    { label: "مساحة الأرشيف", val: "٢.٥ جيجا", color: "blue", icon: Database },
                    { label: "وثائق مؤمنة", val: "٤٥٠ وثيقة", color: "emerald", icon: ShieldCheck },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl group hover:shadow-2xl transition-all relative overflow-hidden">
                         <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000`} />
                         <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className={`w-14 h-14 rounded-3xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                                <stat.icon className="w-8 h-8" />
                            </div>
                            <Star className="w-6 h-6 text-slate-200 group-hover:text-amber-500 transition-colors" />
                         </div>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{stat.label}</span>
                         <h3 className="text-4xl font-black text-slate-900 mt-1 font-mono tracking-tighter uppercase">{stat.val}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[56px] border border-slate-100 shadow-2xl overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/20">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center text-slate-600">
                            <History className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-800">السجل الأرشيفي</h3>
                     </div>
                     <div className="flex gap-4">
                         <div className="relative group min-w-[350px]">
                            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors w-5 h-5" />
                            <input 
                                type="text" 
                                placeholder="البحث في المجلدات، السنوات، أو العناوين..." 
                                className="w-full py-4 pr-16 pl-6 bg-white border border-slate-200 rounded-[24px] focus:ring-4 focus:ring-slate-50 focus:border-slate-300 outline-none transition-all font-bold italic"
                            />
                         </div>
                         <button className="p-5 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 transition-all">
                            <Filter className="w-6 h-6" />
                         </button>
                    </div>
                </div>

                <div className="divide-y divide-slate-50">
                    {archives.map((item, i) => (
                        <div key={i} className="p-12 hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 group cursor-pointer relative overflow-hidden">
                            <div className="flex gap-8 relative z-10">
                                <div className={`w-20 h-20 rounded-[32px] flex items-center justify-center shrink-0 shadow-xl group-hover:scale-110 transition-transform ${
                                    item.status === 'Locked' ? 'bg-slate-900 text-white' : 
                                    item.status === 'Encrypted' ? 'bg-indigo-600 text-white' : 'bg-emerald-50 text-emerald-600'
                                }`}>
                                     {item.status === 'Locked' ? <Lock className="w-10 h-10" /> : 
                                      item.status === 'Encrypted' ? <ShieldCheck className="w-10 h-10" /> : <Folder className="w-10 h-10" />}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-black font-mono text-slate-300 italic uppercase tracking-widest leading-none">{item.id}</span>
                                        <span className="text-[10px] font-black text-slate-400 italic flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {item.date}
                                        </span>
                                    </div>
                                    <h4 className="text-3xl font-black text-slate-900 italic tracking-tight uppercase leading-none group-hover:text-slate-600 transition-colors">{item.title}</h4>
                                    <div className="flex items-center gap-8 mt-4">
                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-400 italic">
                                            <FileText className="w-5 h-5 text-slate-300" />
                                            {item.files}
                                        </div>
                                        <div className="text-[10px] font-black text-slate-600 uppercase italic bg-slate-100 px-4 py-1.5 rounded-xl">
                                            Size: {item.size}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 relative z-10 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 duration-500">
                                <button className="p-5 bg-white border border-slate-100 rounded-3xl text-slate-300 hover:text-slate-900 transition-all shadow-xl active:scale-90">
                                    <Download className="w-6 h-6" />
                                </button>
                                <button className="p-5 bg-white border border-slate-100 rounded-3xl text-slate-300 hover:text-slate-900 transition-all shadow-xl active:scale-90">
                                    <MoreVertical className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
