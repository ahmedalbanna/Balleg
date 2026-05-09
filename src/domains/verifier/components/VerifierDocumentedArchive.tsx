import React from "react";
import { motion } from "motion/react";
import { Archive, Search, Filter, Folder, File, Download, Trash2, Eye, Calendar, Tag, MoreHorizontal } from "lucide-react";

export const VerifierDocumentedArchive: React.FC = () => {
    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto pb-24">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">الأرشيف الموثق</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">المستودع المركزي للوثائق والمحررات المعتمدة</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white p-1 rounded-2xl border border-slate-100 shadow-sm flex items-center md:w-80">
                         <input className="bg-transparent border-none outline-none text-xs font-bold w-full p-2.5 px-4" placeholder="ابحث في الأرشيف..." />
                         <button className="p-2.5 text-slate-400"><Search className="w-4 h-4" /></button>
                    </div>
                    <button className="p-3.5 bg-slate-900 text-white rounded-2xl shadow-xl transition-transform active:scale-95">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                    { name: "العقارات", count: "١,٤٣٢", icon: Folder, color: "text-blue-600" },
                    { name: "الهويات", count: "٤,٥٠٠", icon: Folder, color: "text-indigo-600" },
                    { name: "البلاغات", count: "٨٩٠", icon: Folder, color: "text-rose-600" },
                    { name: "النازحون", count: "٥,٢٠٠", icon: Folder, color: "text-amber-600" },
                    { name: "الممتلكات", count: "٦٤٤", icon: Folder, color: "text-emerald-600" },
                    { name: "أخرى", count: "١٢٠", icon: Folder, color: "text-slate-600" },
                ].map((cat, i) => (
                    <motion.button 
                        key={i}
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center gap-4 group"
                    >
                        <div className={`p-4 rounded-2xl bg-slate-50 ${cat.color} group-hover:scale-110 transition-transform`}>
                            <cat.icon className="w-8 h-8 fill-current opacity-20 group-hover:opacity-40 transition-opacity" />
                            <cat.icon className="w-8 h-8 absolute inset-4" />
                        </div>
                        <div className="text-center">
                            <h4 className="text-sm font-black text-slate-900 italic tracking-tighter">{cat.name}</h4>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cat.count} ملف</p>
                        </div>
                    </motion.button>
                ))}
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest">Recently Documented Files</h3>
                    <div className="flex gap-2">
                        <button className="px-5 py-2.5 rounded-xl bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-900 border border-slate-100 shadow-sm">All Files</button>
                        <button className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Private only</button>
                    </div>
                </div>
                <div className="divide-y divide-slate-50">
                    {[1,2,3,4,5].map((file) => (
                        <div key={file} className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-slate-50/50 transition-colors group">
                            <div className="flex items-center gap-6 grow">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:rotate-6 transition-transform">
                                    <File className="w-7 h-7" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-slate-900 italic">تقرير التحقق الميداني #{file}٠٩٢</h4>
                                    <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase mt-1">
                                        <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /><span>May 24, 2026</span></div>
                                        <div className="flex items-center gap-2"><Tag className="w-3.5 h-3.5" /><span>Verification-Report</span></div>
                                        <div className="flex items-center gap-2 italic tracking-tighter text-blue-600"><span>1.2 MB • PDF</span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="p-4 rounded-2xl bg-slate-100 text-slate-400 hover:text-blue-600 transition-all"><Download className="w-5 h-5" /></button>
                                <button className="p-4 rounded-2xl bg-slate-100 text-slate-400 hover:text-slate-900 transition-all"><Eye className="w-5 h-5" /></button>
                                <button className="p-4 rounded-2xl bg-slate-100 text-slate-400 hover:text-rose-600 transition-all"><Trash2 className="w-5 h-5" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
