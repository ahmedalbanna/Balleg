import React from "react";
import { motion } from "motion/react";
import { CreditCard, Search, Filter, Calendar, DollarSign, Download, ArrowUpRight, CheckCircle2, Clock, MoreHorizontal, FileText, Gift } from "lucide-react";

export const DonorDonations: React.FC = () => {
    const donations = [
        { id: "DON-2024-001", project: "سقيا الأمل", amount: "٥٠٠ $", date: "٢٤ مارس 2024", status: "Completed", method: "Visa •••• 4242" },
        { id: "DON-2024-002", project: "نور العلم", amount: "١,٢٠٠ $", date: "١٨ مارس 2024", status: "Completed", method: "Apple Pay" },
        { id: "DON-2024-003", project: "الرعاية الصحية", amount: "٣٠٠ $", date: "٠٥ مارس 2024", status: "Pending", method: "STC Pay" },
        { id: "DON-2024-004", project: "إفطار صائم", amount: "١٥٠ $", date: "٠٢ مارس 2024", status: "Completed", method: "Bank Transfer" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in slide-in-from-right-4 duration-800">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-indigo-600" />
                        سجل التبرعات
                    </h2>
                    <p className="text-slate-500 font-bold italic">تتبع مساهماتك المالية، طرق الدفع، وقم بتحميل تقارير الضرائب والشهادات</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-white border-2 border-slate-100 text-slate-900 rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:border-indigo-600 hover:text-indigo-600 transition-all active:scale-95 leading-none">
                        <Download className="w-4 h-4" />
                        تحميل التقرير السنوي
                    </button>
                    <button className="flex items-center gap-3 px-6 py-4 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 leading-none">
                        <Gift className="w-4 h-4" />
                        تبرع جديد
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { label: "إجمالي العطاء", val: "١٤,٥٠٠ $", color: "indigo", icon: DollarSign },
                    { label: "عدد العمليات", val: "٢٨", color: "blue", icon: RefreshCw },
                    { label: "المشاريع المدعومة", val: "١٢", color: "emerald", icon: CheckCircle2 },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                         <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000`} />
                         <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm`}>
                            <stat.icon className="w-8 h-8" />
                         </div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">{stat.label}</p>
                         <h3 className="text-3xl font-black text-slate-900 leading-none font-mono tracking-tighter">{stat.val}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[48px] border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="relative flex-1 group max-w-lg">
                         <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                         <input 
                            type="text" 
                            placeholder="البحث في سجل التبرعات..."
                            className="w-full py-5 pr-16 pl-8 bg-slate-50 border-transparent rounded-[30px] focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none transition-all font-medium italic"
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
                                <th className="px-10 py-6">رقم العملية</th>
                                <th className="px-10 py-6">المشروع</th>
                                <th className="px-10 py-6">المبلغ</th>
                                <th className="px-10 py-6">التاريخ</th>
                                <th className="px-10 py-6">الحالة</th>
                                <th className="px-10 py-6"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-right">
                            {donations.map((don, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors group cursor-pointer font-medium italic">
                                    <td className="px-10 py-8">
                                        <span className="text-slate-900 font-mono group-hover:text-indigo-600 transition-colors">{don.id}</span>
                                    </td>
                                    <td className="px-10 py-8 font-black text-slate-800 italic uppercase tracking-tighter">
                                        {don.project}
                                    </td>
                                    <td className="px-10 py-8 font-black font-mono text-emerald-600">
                                        {don.amount}
                                    </td>
                                    <td className="px-10 py-8 text-slate-400 text-sm">
                                        {don.date}
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${
                                            don.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100 animate-pulse'
                                        }`}>
                                            {don.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-2">
                                            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 transition-all">
                                                <FileText className="w-4 h-4" />
                                            </button>
                                            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 transition-all">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const RefreshCw = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
        <path d="M21 3v5h-5"></path>
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
        <path d="M3 21v-5h5"></path>
    </svg>
);
