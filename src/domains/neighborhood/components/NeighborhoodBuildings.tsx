import React from "react";
import { motion } from "motion/react";
import { Home, Search, Filter, Plus, Building2, School, Hospital, Warehouse, MapPin, Activity, AlertTriangle, ShieldCheck, CheckCircle2 } from "lucide-react";

export const NeighborhoodBuildings: React.FC = () => {
    const buildings = [
        { id: "BLD-701", name: "عمارة التوفيق", type: "Residential", familyCount: "١٢", status: "Safe", district: "مربع الزهور" },
        { id: "BLD-702", name: "مدرسة المستقبل", type: "Educational", familyCount: "-", status: "Damaged", district: "مربع الصمود" },
        { id: "BLD-703", name: "مستوصف الخير", type: "Medical", familyCount: "-", status: "Operational", district: "المربع التجاري" },
        { id: "BLD-704", name: "مخزن الحبوب المركزي", type: "Storage", familyCount: "-", status: "Safe", district: "مربع الزهور" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in slide-in-from-right-4 duration-800 pb-24 lg:pb-12 text-right font-readex">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Building2 className="w-10 h-10 text-emerald-600" />
                        المباني والمنشآت
                    </h2>
                    <p className="text-slate-500 font-bold italic">توثيق الحالة الإنشائية للمباني، مراقبة المنشآت الخدمية، وتنسيق أعمال الصيانة والترميم</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-3 px-8 py-5 bg-emerald-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 leading-none">
                        <Plus className="w-5 h-5" />
                        إضافة منشأة جديدة
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "إجمالي المباني", val: "٤٨٠", type: "Residential", icon: Home, color: "blue" },
                    { label: "منشآت خدمية", val: "٢٢", type: "Public", icon: Building2, color: "emerald" },
                    { label: "مباني متضررة", val: "١٤", type: "Critical", icon: AlertTriangle, color: "rose" },
                    { label: "تم فحصها", val: "٣١٢", type: "Inspected", icon: ShieldCheck, color: "indigo" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl group hover:shadow-2xl transition-all relative overflow-hidden">
                         <div className={`absolute -top-6 -left-6 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000`} />
                         <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform shadow-sm`}>
                            <stat.icon className="w-8 h-8" />
                         </div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic leading-none">{stat.label}</p>
                         <h3 className="text-4xl font-black text-slate-900 leading-none font-mono tracking-tighter uppercase">{stat.val}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
                <div className="lg:col-span-2 bg-white rounded-[56px] border border-slate-100 shadow-2xl overflow-hidden">
                    <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/20">
                         <div className="relative group flex-1 max-w-xl">
                            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors w-5 h-5" />
                            <input 
                                type="text" 
                                placeholder="البحث برقم المبنى، النوع، أو المربع..." 
                                className="w-full py-5 pr-16 pl-8 bg-white border border-slate-200 rounded-[30px] focus:ring-4 focus:ring-emerald-50 focus:border-emerald-300 outline-none transition-all font-bold italic"
                            />
                         </div>
                         <button className="p-5 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-emerald-600 transition-all">
                            <Filter className="w-6 h-6" />
                         </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100/50">
                        {buildings.map((bld, i) => (
                            <div key={i} className="bg-white p-10 hover:bg-slate-50 transition-all group relative overflow-hidden cursor-pointer">
                                <div className="flex items-start justify-between mb-8">
                                    <div className="flex items-center gap-5">
                                         <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                            {bld.type === 'Residential' ? <Home className="w-8 h-8" /> : 
                                             bld.type === 'Educational' ? <School className="w-8 h-8" /> : 
                                             bld.type === 'Medical' ? <Hospital className="w-8 h-8" /> : <Warehouse className="w-8 h-8" />}
                                         </div>
                                         <div className="space-y-1">
                                            <h4 className="text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors italic tracking-tight uppercase leading-none">{bld.name}</h4>
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">{bld.id}</span>
                                         </div>
                                    </div>
                                    <span className={`text-[8px] font-black uppercase px-3 py-1 rounded-lg ${
                                        bld.status === 'Safe' || bld.status === 'Operational' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600 animate-pulse'
                                    }`}>
                                        {bld.status}
                                    </span>
                                </div>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-3xl">
                                        <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase italic">
                                            <MapPin className="w-4 h-4 text-emerald-500" />
                                            الموقع
                                        </div>
                                        <span className="text-xs font-black text-slate-800">{bld.district}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-3xl">
                                         <span className="text-[10px] font-black text-slate-400 uppercase italic">عدد الأسر</span>
                                         <span className="text-xs font-black text-slate-800">{bld.familyCount}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                                    <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest italic">
                                        سجل الصيانة
                                    </button>
                                    <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-emerald-600 transition-all shadow-sm">
                                        <Activity className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[56px] p-12 text-white shadow-2xl relative overflow-hidden group">
                         <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500 opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                         <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-tight mb-10">منشآت حيوية</h3>
                         <div className="space-y-8 relative z-10">
                            {[
                                { name: "مستشفى الحي المركزي", type: "Health", status: "Operational", workers: "٢٤" },
                                { name: "مركز الدفاع المدني", type: "Security", status: "Alert", workers: "١٥" },
                                { name: "مخبز البركة", type: "Food", status: "Operational", workers: "٠٨" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between group/item p-6 bg-white/5 rounded-[32px] border border-white/10 hover:bg-white/10 transition-all">
                                    <div className="space-y-1">
                                        <h4 className="font-black italic text-slate-200 uppercase leading-none">{item.name}</h4>
                                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest italic">Staff: {item.workers}</span>
                                    </div>
                                    <div className={`w-3 h-3 rounded-full ${item.status === 'Operational' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-rose-500 animate-pulse'}`} />
                                </div>
                            ))}
                         </div>
                         <button className="w-full py-6 mt-12 bg-white/5 border border-white/10 rounded-[32px] text-slate-400 hover:bg-white hover:text-slate-900 transition-all font-black uppercase tracking-widest text-[10px] italic">
                            عرض كامل خارطة المرافق
                         </button>
                    </div>

                    <div className="bg-emerald-50 p-10 rounded-[56px] border border-emerald-100 flex flex-col items-center justify-center text-center gap-6">
                        <div className="w-20 h-20 bg-emerald-100 rounded-[32px] flex items-center justify-center text-emerald-600 shadow-xl shrink-0 group-hover:rotate-12 transition-transform">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <div className="space-y-2">
                             <h4 className="text-2xl font-black italic uppercase text-emerald-900 tracking-tighter">التفتيش الدوري</h4>
                             <p className="text-emerald-800/60 font-medium italic">تم فحص ٨٤٪ من مباني المربع (أ) بنجاح هذا الشهر. استمر في التغطية لمربع (ب).</p>
                        </div>
                        <div className="w-full h-3 bg-emerald-200 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '84%' }}
                                transition={{ duration: 1.5 }}
                                className="h-full bg-emerald-600" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
