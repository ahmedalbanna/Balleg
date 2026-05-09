import React from "react";
import { motion } from "motion/react";
import { Database, Search, Filter, HardDrive, RefreshCw, AlertTriangle, ShieldCheck, PieChart, Activity, Cpu, Box, ChevronLeft, MoreHorizontal, Terminal } from "lucide-react";

export const DeveloperDatabases: React.FC = () => {
    const databases = [
        { id: "DB-MAIN-01", name: "Firestore (Enterprise)", size: "450GB", usage: "78%", iops: "1.2k/s", status: "Active" },
        { id: "DB-CACHE-01", name: "Redis Cluster", size: "32GB", usage: "12%", iops: "25k/s", status: "Active" },
        { id: "DB-VECTOR-01", name: "Pinecone Index", size: "120GB", usage: "92%", iops: "4.5k/s", status: "Scaling" },
        { id: "DB-BACKUP-01", name: "PostgreSQL Replica", size: "2.4TB", usage: "65%", iops: "0.8k/s", status: "Standby" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in slide-in-from-right-4 duration-800">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Database className="w-8 h-8 text-indigo-600" />
                        قواعد البيانات
                    </h2>
                    <p className="text-slate-500 font-bold italic">إدارة قواعد البيانات السحابية، تحسين الاستعلامات، ومراقبة التخزين الهيكلي</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                        <RefreshCw className="w-4 h-4" />
                        مزامنة الفهارس
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "إجمالي السعة", val: "٣.٢TB", color: "blue", icon: HardDrive },
                    { label: "كفاءة الاستعلام", val: "٩٨.٢٪", color: "emerald", icon: Activity },
                    { label: "نمو البيانات", val: "١٤٪", color: "amber", icon: PieChart },
                    { label: "عمليات الفهرسة", val: "٤٢", color: "indigo", icon: RefreshCw },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
                    >
                        <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000`} />
                        <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm`}>
                            <stat.icon className="w-8 h-8" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">{stat.label}</p>
                        <h3 className="text-3xl font-black text-slate-900 leading-none font-mono tracking-tighter">{stat.val}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[48px] border border-slate-100 shadow-xl overflow-hidden flex flex-col">
                    <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="relative flex-1 group">
                             <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                             <input 
                                type="text" 
                                placeholder="البحث في كيانات البيانات..."
                                className="w-full py-5 pr-16 pl-8 bg-slate-50 border-transparent rounded-[30px] focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition-all font-medium italic outline-none"
                             />
                        </div>
                        <button className="p-5 bg-slate-50 rounded-[24px] text-slate-400 hover:text-indigo-600 transition-all">
                            <Filter className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-right border-collapse">
                            <thead>
                                <tr className="bg-slate-50/10 border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
                                    <th className="px-10 py-6 font-mono">Instance ID</th>
                                    <th className="px-10 py-6">النوع / السعة</th>
                                    <th className="px-10 py-6">الاستخدام</th>
                                    <th className="px-10 py-6">حالة الأداء</th>
                                    <th className="px-10 py-6"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {databases.map((db, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors group cursor-pointer font-medium italic">
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col">
                                                <span className="text-slate-900 font-mono group-hover:text-indigo-600 transition-colors">{db.id}</span>
                                                <span className="text-[10px] text-slate-400 uppercase tracking-widest">{db.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col">
                                                <span className="text-slate-900 group-hover:text-indigo-600 transition-colors">{db.name}</span>
                                                <span className="text-[10px] text-slate-400 font-mono">{db.size}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="w-32 space-y-2">
                                                <div className="flex justify-between text-[9px] font-black">
                                                    <span>Usage</span>
                                                    <span>{db.usage}</span>
                                                </div>
                                                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-indigo-500" style={{ width: db.usage }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-2">
                                                <Activity className={`w-4 h-4 ${i === 2 ? 'text-amber-500' : 'text-emerald-500'}`} />
                                                <span className="text-xs font-black font-mono">{db.iops}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <button className="text-slate-300 hover:text-slate-900 transition-colors">
                                                <MoreHorizontal className="w-6 h-6" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[56px] p-12 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group h-full">
                        <div className="relative z-10">
                            <header className="flex items-center justify-between mb-12">
                                <div>
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">الحماية والتشفير</h3>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1 italic">Security Measures</p>
                                </div>
                                <ShieldCheck className="w-8 h-8 text-emerald-500" />
                            </header>

                            <div className="space-y-10">
                                {[
                                    { label: 'تشفير البيانات (At Rest)', val: 'فعال - AES-256', color: 'emerald' },
                                    { label: 'النسخ الاحتياطي', val: 'كل ١٢ ساعة', color: 'blue' },
                                    { label: 'وقت استعادة الكوارث', val: '١٥ دقيقة', color: 'amber' },
                                ].map((s, i) => (
                                    <div key={i} className="flex flex-col gap-2 group/item">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic leading-none">{s.label}</p>
                                        <p className={`font-black italic text-${s.color}-400 group-hover/item:text-white transition-colors`}>{s.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-20 relative z-10">
                            <button className="w-full py-6 bg-white/5 border border-white/10 text-white rounded-[28px] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-white/5">
                                فتح محرر الاستعلام SQL
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] -mr-48 -mt-48" />
                    </div>
                </div>
            </div>
        </div>
    );
};
