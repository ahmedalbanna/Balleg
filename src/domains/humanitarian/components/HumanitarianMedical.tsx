import React from "react";
import { motion } from "motion/react";
import { Stethoscope, Search, Filter, Activity, Heart, Thermometer, Pill, Truck, MapPin, Plus, AlertCircle, HardHat, ShieldCheck } from "lucide-react";

export const HumanitarianMedical: React.FC = () => {
    const supplies = [
        { id: "MED-001", name: "أدوية الطوارئ الأساسية", stock: "٨٠٪", status: "Stable", type: "Drugs" },
        { id: "MED-002", name: "معدات الإسعاف الأولي", stock: "٤٥٪", status: "Warning", type: "Equipment" },
        { id: "MED-003", name: "وحدات الدم (O-)", stock: "١٥٪", status: "Critical", type: "Blood Bank" },
        { id: "MED-004", name: "مستلزمات الحروق", stock: "٩٠٪", status: "Stable", type: "Supplies" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Stethoscope className="w-8 h-8 text-emerald-600" />
                        الدعم الطبي
                    </h2>
                    <p className="text-slate-500 font-bold italic">إشراف على الإمدادات الطبية، تنسيق فرق الإسعاف، ومتابعة الوضع الصحي في الميدان</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-emerald-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 leading-none">
                        <Truck className="w-4 h-4" />
                        طلب إمداد طبي عاجل
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "كفاءة المنظومة", val: "٨٢٪", color: "emerald", icon: Activity },
                    { label: "حالات طبية حرجة", val: "١٤", color: "rose", icon: Heart },
                    { label: "نقص المواد", val: "٠٥", color: "amber", icon: Thermometer },
                    { label: "فريق الإسعاف", val: "نشط", color: "blue", icon: HardHat },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{stat.label}</span>
                            <h3 className="text-3xl font-black text-slate-900 mt-1 font-mono tracking-tighter uppercase">{stat.val}</h3>
                        </div>
                        <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                            <stat.icon className="w-7 h-7" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 bg-white rounded-[48px] border border-slate-100 shadow-xl overflow-hidden">
                    <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-800">جرد الإمدادات الطبية</h3>
                        <button className="p-3 bg-slate-50 rounded-xl text-slate-300 hover:text-emerald-600 transition-all">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {supplies.map((item, idx) => (
                            <div key={idx} className="p-8 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer">
                                <div className="flex gap-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all shadow-sm ${
                                        item.status === 'Stable' ? 'bg-emerald-50 text-emerald-600' :
                                        item.status === 'Critical' ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-amber-50 text-amber-600'
                                    }`}>
                                         {item.type === 'Blood Bank' ? <ShieldCheck className="w-7 h-7" /> : <Pill className="w-7 h-7" />}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors italic tracking-tight uppercase leading-none">{item.name}</h4>
                                        <div className="flex items-center gap-4 mt-2">
                                            <span className="text-[10px] font-black text-slate-300 italic uppercase tracking-widest">{item.id}</span>
                                            <span className="text-[10px] font-black text-slate-400 italic uppercase tracking-widest">{item.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right w-full md:w-32">
                                    <div className="flex justify-between mb-2 text-[10px] font-black uppercase italic">
                                        <span className="text-slate-300">المخزون</span>
                                        <span className={item.status === 'Critical' ? 'text-rose-600' : 'text-emerald-600'}>{item.stock}</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.status === 'Stable' ? 'bg-emerald-500' : item.status === 'Critical' ? 'bg-rose-500' : 'bg-amber-500'}`} style={{ width: item.stock }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 rounded-[56px] p-12 text-white space-y-8 shadow-2xl relative overflow-hidden group border border-slate-800">
                    <History className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-tight mb-8">إرشادات طبية عاجلة</h3>
                        <div className="space-y-4">
                            {[
                                { title: 'التعامل مع الكوليرا', time: '٥ دقائق قراءة' },
                                { title: 'إسعاف الرضوض والكسور', time: '٨ دقائق قراءة' },
                                { title: 'نظام الفرز الطبي (Triage)', time: '١٢ دقيقة قراءة' },
                            ].map((guide, i) => (
                                <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group/item">
                                    <h4 className="font-black italic text-slate-200 group-hover/item:text-emerald-400 transition-colors uppercase leading-tight mb-1">{guide.title}</h4>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{guide.time}</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-10 py-5 bg-emerald-600 text-white rounded-[32px] font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-slate-900 transition-all shadow-xl">
                            تحميل الدليل الطبي الكامل
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const History = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
);
