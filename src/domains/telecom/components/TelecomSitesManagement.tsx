import React from "react";
import { motion } from "motion/react";
import { Search, Plus, Filter, Database, MapPin, Radio, Battery, Wifi, Power, Settings2, Trash2 } from "lucide-react";

export const TelecomSitesManagement: React.FC = () => {
    const sites = [
        { id: "SITE-001", name: "Sana'a Central Tower", region: "Capital", type: "Macro", status: "Active", battery: 92, temp: "24°C" },
        { id: "SITE-002", name: "Aden Port Station", region: "Southern", type: "Micro", status: "Critical", battery: 12, temp: "38°C" },
        { id: "SITE-003", name: "Taiz Mountain Hub", region: "Western", type: "Macro", status: "Active", battery: 84, temp: "18°C" },
        { id: "SITE-004", name: "Mukalla Coast Site", region: "Eastern", type: "Small Cell", status: "Maintenance", battery: 45, temp: "32°C" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">إدارة المواقع والأبراج</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">إدارة البنية التحتية والأجهزة الطرفية</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm md:w-80">
                        <input className="bg-transparent border-none outline-none text-xs font-bold w-full p-2.5 px-4" placeholder="ID برج، اسم الموقع..." />
                        <button className="bg-slate-50 p-2 rounded-xl text-slate-400 hover:text-blue-600 transition-colors">
                            <Search className="w-4 h-4" />
                        </button>
                    </div>
                    <button className="bg-blue-600 text-white flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:shadow-xl hover:shadow-blue-200 transition-all">
                        <Plus className="w-4 h-4" />
                        Add New Site
                    </button>
                    <button className="bg-white text-slate-900 border border-slate-100 p-3 rounded-2xl shadow-sm hover:bg-slate-50 transition-colors">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12 space-y-4">
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-right border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="p-8 text-[10px] font-black uppercase text-slate-400 text-center">ID</th>
                                        <th className="p-8 text-[10px] font-black uppercase text-slate-400">الموقع</th>
                                        <th className="p-8 text-[10px] font-black uppercase text-slate-400">المنطقة</th>
                                        <th className="p-8 text-[10px] font-black uppercase text-slate-400">النوع</th>
                                        <th className="p-8 text-[10px] font-black uppercase text-slate-400">حالة التشغيل</th>
                                        <th className="p-8 text-[10px] font-black uppercase text-slate-400">البطارية</th>
                                        <th className="p-8 text-[10px] font-black uppercase text-slate-400">درجة الحرارة</th>
                                        <th className="p-8 text-[10px] font-black uppercase text-slate-400 text-left">أدوات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {sites.map((site, i) => (
                                        <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                                            <td className="p-8">
                                                <span className="text-[10px] font-black tracking-widest bg-slate-100 px-3 py-1.5 rounded-full text-slate-500 whitespace-nowrap">{site.id}</span>
                                            </td>
                                            <td className="p-8">
                                                <div className="flex items-center gap-3">
                                                     <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:rotate-6 transition-transform">
                                                        <Radio className="w-5 h-5" />
                                                     </div>
                                                     <span className="text-sm font-black text-slate-900 italic">{site.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-8">
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    <span className="text-sm font-bold">{site.region}</span>
                                                </div>
                                            </td>
                                            <td className="p-8 text-sm font-bold text-slate-600 uppercase">{site.type}</td>
                                            <td className="p-8">
                                                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap ${
                                                    site.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                    site.status === 'Critical' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                                    'bg-amber-50 text-amber-600 border border-amber-100'
                                                }`}>
                                                    {site.status}
                                                </span>
                                            </td>
                                            <td className="p-8">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full ${site.battery > 50 ? 'bg-emerald-500' : site.battery > 20 ? 'bg-amber-500' : 'bg-rose-500'}`}
                                                            style={{ width: `${site.battery}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] font-black text-slate-800">{site.battery}%</span>
                                                </div>
                                            </td>
                                            <td className="p-8 text-sm font-bold text-slate-600">{site.temp}</td>
                                            <td className="p-8 text-left">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-all">
                                                        <Settings2 className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all">
                                                        <Trash2 className="w-4 h-4" />
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
            </div>
        </div>
    );
};
