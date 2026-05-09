import React from "react";
import { motion } from "motion/react";
import { Users, Search, Filter, Heart, AlertTriangle, CheckCircle2, Clock, MapPin, UserPlus, MoreVertical, MessageSquare, ShieldAlert } from "lucide-react";

export const HumanitarianCases: React.FC = () => {
    const cases = [
        { id: "CASE-401", name: "عائلة نازحة (٦ أفراد)", type: "Urgent", status: "In Progress", location: "صنعاء - الروضة", time: "٢ س" },
        { id: "CASE-402", name: "طفل مجهول الهوية", type: "Critical", status: "Pending", location: "الحديدة - الميناء", time: "٤٥ د" },
        { id: "CASE-403", name: "كبار سن (احتياج طبي)", type: "Critical", status: "Urgent", location: "عدن - كريتر", time: "١٠ د" },
        { id: "CASE-404", name: "مجموعة نازحين (١٥ فرد)", type: "Relief", status: "Solved", location: "مأرب - الوادي", time: "٥ س" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in slide-in-from-right-4 duration-800">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Users className="w-8 h-8 text-rose-600" />
                        الحالات الإنسانية
                    </h2>
                    <p className="text-slate-500 font-bold italic">متابعة الحالات الفردية والعائلية المسجلة، تنسيق التدخل السريع، وتحديث حالة المعالجة</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-rose-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-rose-500/20 active:scale-95 leading-none">
                        <UserPlus className="w-4 h-4" />
                        تسجيل حالة جديدة
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { label: "حالات نشطة", val: "٢٨٤", color: "rose", icon: ShieldAlert },
                    { label: "تمت معالجتها", val: "١,٢٤٠", color: "emerald", icon: CheckCircle2 },
                    { label: "متوسط الاستجابة", val: "٤٥ دقيقة", color: "blue", icon: Clock },
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
                         <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors w-5 h-5" />
                         <input 
                            type="text" 
                            placeholder="البحث بالاسم أو رقم الحالة..."
                            className="w-full py-5 pr-16 pl-8 bg-slate-50 border-transparent rounded-[30px] focus:bg-white focus:ring-4 focus:ring-rose-50 focus:border-rose-200 outline-none transition-all font-medium italic"
                         />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="bg-slate-50/10 border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
                                <th className="px-10 py-6">كود الحالة</th>
                                <th className="px-10 py-6">الوصف</th>
                                <th className="px-10 py-6">الموقع</th>
                                <th className="px-10 py-6">زمن الانتظار</th>
                                <th className="px-10 py-6">الأولوية</th>
                                <th className="px-10 py-6"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-right">
                            {cases.map((item, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors group cursor-pointer font-medium italic">
                                    <td className="px-10 py-8">
                                        <span className="text-slate-900 font-mono group-hover:text-rose-600 transition-colors text-xs opacity-50 uppercase tracking-widest">{item.id}</span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden shrink-0">
                                                <img referrerPolicy="no-referrer" src={`https://i.pravatar.cc/100?u=case${i}`} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="font-black text-slate-800 italic uppercase tracking-tighter">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                                            <MapPin className="w-4 h-4 text-rose-500" />
                                            {item.location}
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-slate-400 text-sm">
                                        {item.time}
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${
                                            item.status === 'Solved' ? 'bg-emerald-50 text-emerald-600' : 
                                            item.status === 'Urgent' ? 'bg-rose-50 text-rose-600 animate-pulse' :
                                            'bg-amber-50 text-amber-600'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-2">
                                            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-rose-600 hover:border-rose-100 transition-all">
                                                <MessageSquare className="w-4 h-4" />
                                            </button>
                                            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-slate-900 transition-all">
                                                <MoreVertical className="w-4 h-4" />
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
