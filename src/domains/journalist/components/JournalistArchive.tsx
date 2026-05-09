import React from "react";
import { motion } from "motion/react";
import { History, Search, Filter, Folder, FileText, Download, Trash2, Calendar, ShieldCheck, Lock, MoreVertical, Star, Archive } from "lucide-react";

export const JournalistArchive: React.FC = () => {
    const archives = [
        { id: "ARC-2023-01", title: "تغطية شاملة لأزمة الوقود ٢٠٢٣", files: "١٤ ملف", size: "٤٥٠ ميجا", date: "ديسمبر ٢٠٢٣", status: "Locked" },
        { id: "ARC-2023-02", title: "مقابلات حصرية مع قادة الميدان", files: "٠٨ ملفات", size: "١٢٠ ميجا", date: "نوفمبر ٢٠٢٣", status: "Active" },
        { id: "ARC-2022-04", title: "مجموعة صور الحديدة (الأرشيف)", files: "١٢٠ صورة", size: "١.٢ جيجا", date: "يونيو ٢٠٢٢", status: "Encrypted" },
        { id: "ARC-2022-01", title: "تقارير الفساد المالي (سري)", files: "٠٣ ملفات", size: "١٥ ميجا", date: "يناير ٢٠٢٢", status: "Locked" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in slide-in-from-bottom-4 duration-800">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Archive className="w-8 h-8 text-slate-600" />
                        الأرشيف الصحفي
                    </h2>
                    <p className="text-slate-500 font-bold italic">تخزين وحماية المحتوى التاريخي، إدارة المجموعات المؤرشفة، والوصول السريع للبيانات القديمة</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 leading-none">
                        <Folder className="w-4 h-4" />
                        إنشاء مجموعة أرشفة
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { label: "إجمالي المجلدات", val: "٢٤ مجلد", color: "slate", icon: Folder },
                    { label: "مساحة التخزين", val: "١٢.٥ جيجا", color: "blue", icon: Archive },
                    { label: "مقالات مؤرشفة", val: "٨٥٠ مقال", color: "emerald", icon: FileText },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl group hover:shadow-2xl transition-all relative overflow-hidden">
                         <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000`} />
                         <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <Star className="w-6 h-6 text-slate-200 group-hover:text-amber-500 transition-colors" />
                         </div>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{stat.label}</span>
                         <h3 className="text-3xl font-black text-slate-900 mt-1 font-mono tracking-tighter uppercase">{stat.val}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[48px] border border-slate-100 shadow-2xl overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/20">
                     <div className="flex items-center gap-3">
                        <History className="w-6 h-6 text-slate-400" />
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-800">السجل الأرشيفي</h3>
                     </div>
                     <div className="flex gap-3">
                         <div className="relative group min-w-[300px]">
                            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors w-5 h-5" />
                            <input 
                                type="text" 
                                placeholder="البحث في الأرشيف المجلدات أو السنوات..." 
                                className="w-full py-4 pr-16 pl-6 bg-white border border-slate-200 rounded-[24px] focus:ring-4 focus:ring-slate-50 focus:border-slate-300 outline-none transition-all font-medium italic"
                            />
                         </div>
                         <button className="p-4 bg-white border border-slate-200 rounded-[24px] text-slate-300 hover:text-slate-900 transition-all">
                            <Filter className="w-5 h-5" />
                         </button>
                    </div>
                </div>

                <div className="divide-y divide-slate-50">
                    {archives.map((item, i) => (
                        <div key={i} className="p-10 hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer relative overflow-hidden">
                            <div className="flex gap-8 relative z-10">
                                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform ${
                                    item.status === 'Locked' ? 'bg-slate-900 text-white' : 
                                    item.status === 'Encrypted' ? 'bg-indigo-600 text-white' : 'bg-emerald-50 text-emerald-600'
                                }`}>
                                     {item.status === 'Locked' ? <Lock className="w-8 h-8" /> : 
                                      item.status === 'Encrypted' ? <ShieldCheck className="w-8 h-8" /> : <Folder className="w-8 h-8" />}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black font-mono text-slate-300 italic uppercase tracking-widest leading-none">{item.id}</span>
                                        <span className="text-[10px] font-black text-slate-400 italic flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {item.date}
                                        </span>
                                    </div>
                                    <h4 className="text-2xl font-black text-slate-900 italic tracking-tight uppercase leading-none group-hover:text-slate-600 transition-colors">{item.title}</h4>
                                    <div className="flex items-center gap-6 mt-3">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 italic">
                                            <FileText className="w-4 h-4 text-slate-400" />
                                            {item.files}
                                        </div>
                                        <div className="text-xs font-black text-slate-600 uppercase italic bg-slate-100 px-3 py-1 rounded-lg">
                                            {item.size}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 relative z-10">
                                <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-300 hover:text-slate-900 transition-all shadow-sm">
                                    <Download className="w-5 h-5" />
                                </button>
                                <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-300 hover:text-slate-900 transition-all shadow-sm">
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
