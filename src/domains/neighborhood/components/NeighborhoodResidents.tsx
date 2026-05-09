import React from "react";
import { motion } from "motion/react";
import { Users, Search, Filter, Plus, UserPlus, UserCheck, ShieldCheck, Download, Trash2, Edit3, MoreVertical, MapPin, HeartPulse, User } from "lucide-react";

export const NeighborhoodResidents: React.FC = () => {
    const residents = [
        { id: "RES-001", name: "محمد أحمد صالح", district: "مربع الزهور", status: "Permanent", health: "Good", age: "٤٥" },
        { id: "RES-002", name: "فاطمة حسن علي", district: "مربع الصمود", status: "Displaced", health: "Monitoring", age: "٣٢" },
        { id: "RES-003", name: "يحيى قاسم", district: "المربع التجاري", status: "Permanent", health: "Critical", age: "٦٨" },
        { id: "RES-004", name: "أروى محمد", district: "مربع الزهور", status: "Permanent", health: "Good", age: "٢٧" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800 pb-24 lg:pb-12 text-right">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Users className="w-10 h-10 text-blue-600" />
                        سجل السكان
                    </h2>
                    <p className="text-slate-500 font-bold italic">قاعدة بيانات سكان الحي، تتبع النازحين، تحديث الحالة الصحية، وتوثيق الاحتياجات الخاصة</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-8 py-5 bg-blue-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20 active:scale-95 leading-none">
                        <UserPlus className="w-5 h-5" />
                        تسجيل ساكن جديد
                    </button>
                    <button className="p-5 bg-white border border-slate-100 rounded-[24px] text-slate-400 hover:text-blue-600 transition-all shadow-sm">
                        <Download className="w-6 h-6" />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "إجمالي السكان", val: "١,٤٥٠", color: "blue", icon: Users },
                    { label: "النازحون", val: "٣٤٠", color: "amber", icon: MapPin },
                    { label: "كبار السن (+٦٠)", val: "٨٥", color: "rose", icon: HeartPulse },
                    { label: "تم التحقق", val: "٩٨٪", color: "emerald", icon: UserCheck },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl group hover:shadow-2xl transition-all relative overflow-hidden">
                         <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000`} />
                         <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm`}>
                            <stat.icon className="w-8 h-8" />
                         </div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic leading-none">{stat.label}</p>
                         <h3 className="text-4xl font-black text-slate-900 leading-none font-mono tracking-tighter uppercase">{stat.val}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[56px] border border-slate-100 shadow-2xl overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/20">
                     <div className="relative group flex-1 max-w-xl">
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="البحث بالاسم، رقم الهوية، أو المربع السكني..." 
                            className="w-full py-5 pr-16 pl-8 bg-white border border-slate-200 rounded-[30px] focus:ring-4 focus:ring-blue-50 focus:border-blue-300 outline-none transition-all font-bold italic"
                        />
                     </div>
                     <div className="flex gap-4">
                        <button className="px-8 py-5 bg-white border border-slate-200 rounded-[24px] text-slate-400 hover:text-blue-600 transition-all font-black uppercase tracking-widest text-[9px] italic flex items-center gap-3">
                            <Filter className="w-5 h-5" />
                            تصفية متقدمة
                        </button>
                     </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="bg-slate-50/10 border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">
                                <th className="px-10 py-8">الساكن</th>
                                <th className="px-10 py-8">الموقع</th>
                                <th className="px-10 py-8">الحالة السكنية</th>
                                <th className="px-10 py-8">الحالة الصحية</th>
                                <th className="px-10 py-8">العمر</th>
                                <th className="px-10 py-8"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {residents.map((item, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                                    <td className="px-10 py-10">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                                <User className="w-7 h-7" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-xl text-slate-900 group-hover:text-blue-600 transition-colors italic uppercase tracking-tighter leading-none">{item.name}</span>
                                                <span className="text-[10px] font-black font-mono text-slate-300 uppercase tracking-widest mt-1">{item.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-10">
                                        <div className="flex items-center gap-3 text-slate-600 font-bold italic">
                                            <MapPin className="w-4 h-4 text-blue-500" />
                                            {item.district}
                                        </div>
                                    </td>
                                    <td className="px-10 py-10">
                                        <span className={`text-[9px] font-black uppercase px-4 py-2 rounded-xl italic ${
                                            item.status === 'Permanent' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600 animate-pulse'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-10">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${item.health === 'Good' ? 'bg-emerald-500' : item.health === 'Monitoring' ? 'bg-amber-500' : 'bg-rose-500'}`} />
                                            <span className="text-sm font-black text-slate-700 italic">{item.health}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-10 text-slate-400 font-mono text-lg font-black">
                                        {item.age}
                                    </td>
                                    <td className="px-10 py-10">
                                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm">
                                                <Edit3 className="w-5 h-5" />
                                            </button>
                                            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-rose-600 hover:border-rose-100 transition-all shadow-sm">
                                                <Trash2 className="w-5 h-5" />
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
