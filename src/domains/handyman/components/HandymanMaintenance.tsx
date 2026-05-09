import React from "react";
import { motion } from "motion/react";
import { Wrench, Search, Filter, Battery, Zap, AlertTriangle, CheckCircle2, Clock, History, Settings, PackageOpen } from "lucide-react";

export const HandymanMaintenance: React.FC = () => {
    const equipment = [
        { name: "حفار هيدروليكي CAT", id: "EQU-901", status: "Operational", health: 95, lastService: "١٤ أبريل 2024", type: "Heavy" },
        { name: "مولد كهرباء ٥٠٠ ك.ف", id: "EQU-902", status: "Warning", health: 65, lastService: "٠٢ مارس 2024", type: "Power" },
        { name: "مضخة مياه صناعية", id: "EQU-903", status: "Maintenance", health: 40, lastService: "١٠ فبراير 2024", type: "Process" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in slide-in-from-right-4 duration-800">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Wrench className="w-8 h-8 text-indigo-600" />
                        صيانة المعدات
                    </h2>
                    <p className="text-slate-500 font-bold italic">متابعة الحالة التشغيلية للمعدات، جدولة الصيانة الدورية، وطلب قطع الغيار</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 leading-none">
                        <PackageOpen className="w-4 h-4" />
                        طلب قطع غيار
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { label: "كفاءة المعدات", val: "٨٨٪", color: "indigo", icon: Zap },
                    { label: "معدات خارج الخدمة", val: "٠٣", color: "rose", icon: AlertTriangle },
                    { label: "فحص دوري قادم", val: "٢٤ ساعة", color: "emerald", icon: Clock },
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
                            placeholder="البحث عن آلة أو معدة..."
                            className="w-full py-5 pr-16 pl-8 bg-slate-50 border-transparent rounded-[30px] focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none transition-all font-medium italic"
                         />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="bg-slate-50/10 border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
                                <th className="px-10 py-6">كود المعدة</th>
                                <th className="px-10 py-6">اسم المعدة</th>
                                <th className="px-10 py-6">الحالة الصحية</th>
                                <th className="px-10 py-6">آخر صيانة</th>
                                <th className="px-10 py-6">الحالة</th>
                                <th className="px-10 py-6"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-right">
                            {equipment.map((item, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors group cursor-pointer font-medium italic">
                                    <td className="px-10 py-8">
                                        <span className="text-slate-900 font-mono group-hover:text-indigo-600 transition-colors">{item.id}</span>
                                    </td>
                                    <td className="px-10 py-8 font-black text-slate-800 italic uppercase tracking-tighter">
                                        {item.name}
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className={`h-full ${item.health > 80 ? 'bg-emerald-500' : item.health > 50 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${item.health}%` }} />
                                            </div>
                                            <span className="text-xs font-black">{item.health}%</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-slate-400 text-sm">
                                        {item.lastService}
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${
                                            item.status === 'Operational' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                                            item.status === 'Warning' ? 'bg-amber-50 text-amber-600 border border-amber-100 animate-pulse' :
                                            'bg-rose-50 text-rose-600 border border-rose-100'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 transition-all">
                                            <History className="w-4 h-4" />
                                        </button>
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
