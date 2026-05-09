import React from "react";
import { motion } from "motion/react";
import { Package, Search, Filter, AlertTriangle, ArrowUpRight, ArrowDownLeft, Box, ShoppingCart, Truck, History, MoreHorizontal, ChevronRight } from "lucide-react";

export const ContractorInventory: React.FC = () => {
    const stockItems = [
        { id: "MAT-001", name: "إسمنت مقاوم للملوحة", category: "بناء", amount: "٤٥٠ كيس", status: "كافٍ", trend: "down" },
        { id: "MAT-082", name: "أنابيب مياه PVC ٤ بوصة", category: "سباكة", amount: "٨٥ قطعة", status: "منخفض", trend: "up" },
        { id: "MAT-115", name: "أسلاك كهرباء ٢.٥ ملم", category: "كهرباء", amount: "٢٠ لفة", status: "حرج", trend: "down" },
        { id: "MAT-204", name: "دهانات جدران (أبيض)", category: "تشطيب", amount: "١٢٠ جالون", status: "كافٍ", trend: "up" },
    ];

    const warehouseActivity = [
        { action: "صرف", item: "إسمنت", qty: "٥٠ كيس", date: "منذ ساعتين", recipient: "فريق التشييد أ" },
        { action: "توريد", item: "أنابيب مياه", qty: "١٠٠ قطعة", date: "منذ ٥ ساعات", recipient: "المورد: شركة السلام" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase">المخزون والمواد</h2>
                    <p className="text-slate-500 font-bold italic">إدارة سلسلة التوريد، تتبع مستويات المخزون، والرقابة على الصادر والوارد</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-amber-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                        <ShoppingCart className="w-4 h-4" />
                        طلب توريد جديد
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                    { label: "إجمالي العناصر", val: "١,٢٤٠", color: "blue", icon: Box },
                    { label: "عناصر منخفضة", val: "١٢", color: "amber", icon: AlertTriangle },
                    { label: "طلبات معلقة", val: "٠٥", color: "indigo", icon: Truck },
                    { label: "عمليات اليوم", val: "٤٢", color: "emerald", icon: History },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
                    >
                        <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000`} />
                        <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-10 group-hover:bg-${stat.color}-600 group-hover:text-white transition-all duration-500 shadow-sm`}>
                            <stat.icon className="w-8 h-8" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">{stat.label}</p>
                        <h3 className="text-3xl font-black text-slate-900 leading-none">{stat.val}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                <div className="lg:col-span-2 bg-white rounded-[48px] border border-slate-100 shadow-xl overflow-hidden flex flex-col">
                    <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="relative flex-1 group">
                             <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors w-5 h-5" />
                             <input 
                                type="text" 
                                placeholder="البحث في قائمة المواد..."
                                className="w-full py-5 pr-16 pl-8 bg-slate-50 border-transparent rounded-[30px] focus:bg-white focus:ring-4 focus:ring-amber-50 focus:border-amber-200 transition-all font-medium italic outline-none"
                             />
                        </div>
                        <button className="p-5 bg-slate-50 rounded-[24px] text-slate-400 hover:text-amber-600 transition-all">
                            <Filter className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-right border-collapse">
                            <thead>
                                <tr className="bg-slate-50/10 border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
                                    <th className="px-10 py-6">المادة / الصنف</th>
                                    <th className="px-10 py-6">الكمية</th>
                                    <th className="px-10 py-6">الحالة</th>
                                    <th className="px-10 py-6">الترند</th>
                                    <th className="px-10 py-6"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {stockItems.map((item, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors group cursor-pointer font-medium italic">
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col">
                                                <span className="text-slate-900 group-hover:text-amber-600 transition-colors">{item.name}</span>
                                                <span className="text-[10px] text-slate-300 uppercase tracking-widest">{item.id} • {item.category}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 font-black text-slate-900">{item.amount}</td>
                                        <td className="px-10 py-8">
                                            <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight ${
                                                item.status === 'حرج' ? 'bg-rose-50 text-rose-600 ring-1 ring-rose-100 animate-pulse' : 
                                                item.status === 'منخفض' ? 'bg-amber-50 text-amber-600 ring-1 ring-amber-100' : 
                                                'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8">
                                            {item.trend === 'up' ? (
                                                <ArrowUpRight className="w-5 h-5 text-emerald-500" />
                                            ) : (
                                                <ArrowDownLeft className="w-5 h-5 text-rose-500" />
                                            )}
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
                    <div className="p-8 mt-auto border-t border-slate-50 text-center">
                         <button className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] hover:text-amber-600 transition-all flex items-center justify-center gap-4 mx-auto group">
                            مشاهدة كامل المخزون
                            <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-[56px] p-12 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                     <div className="relative z-10">
                         <header className="flex items-center justify-between mb-12">
                             <div>
                                 <h3 className="text-2xl font-black italic uppercase tracking-tighter">آخر الحركات</h3>
                                 <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1 italic">نشاط المستودعات الميدانية</p>
                             </div>
                             <History className="w-8 h-8 text-amber-500" />
                         </header>

                         <div className="space-y-8">
                            {warehouseActivity.map((activity, i) => (
                                <div key={i} className="flex gap-6 items-start group/act cursor-pointer">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border-2 border-white/5 group-hover/act:border-amber-500/50 transition-colors ${
                                        activity.action === 'صرف' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                                    }`}>
                                        {activity.action === 'صرف' ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                                    </div>
                                    <div>
                                         <h5 className="font-black italic group-hover/act:text-amber-400 transition-colors">{activity.action} {activity.item} ({activity.qty})</h5>
                                         <p className="text-xs text-slate-500 font-bold italic mt-1">{activity.recipient}</p>
                                         <span className="text-[10px] text-slate-600 uppercase tracking-widest mt-2 block">{activity.date}</span>
                                    </div>
                                </div>
                            ))}
                         </div>
                     </div>

                     <div className="mt-20 relative z-10">
                        <button className="w-full py-6 bg-white text-slate-900 rounded-[28px] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-amber-500 hover:text-white transition-all shadow-xl shadow-white/5">
                            سجل الجرد المالي
                        </button>
                     </div>
                     <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:scale-150 transition-transform duration-1000" />
                </div>
            </div>
        </div>
    );
};
