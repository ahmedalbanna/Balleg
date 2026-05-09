import React from "react";
import { motion } from "motion/react";
import { Truck, Search, Filter, Package, Droplet, Fuel, HardHat, Warehouse, Navigation, AlertTriangle, ArrowUpRight, Plus } from "lucide-react";

export const HandymanLogistics: React.FC = () => {
    const supplyRequests = [
        { id: "LOG-301", item: "إسمنت مقاوم (٥٠ كيس)", location: "موقع المدرسة", status: "In Transit", eta: "٢ ساعة", type: "Material" },
        { id: "LOG-302", item: "ديزل (٥٠٠ لتر)", location: "محطة التوليد", status: "Pending", eta: "في الانتظار", type: "Fuel" },
        { id: "LOG-303", item: "مياه شرب (١٠٠ كرتون)", location: "فريق الميدان", status: "Delivered", eta: "تم الوصول", type: "Essentials" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Truck className="w-8 h-8 text-blue-600" />
                        الدعم اللوجستي
                    </h2>
                    <p className="text-slate-500 font-bold italic">إدارة المخزون، طلب المواد الخام، متابعة سلاسل الإمداد، وتنسيق النقل للمواقع</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20 active:scale-95 leading-none">
                        <Plus className="w-4 h-4" />
                        طلب إمداد جديد
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { label: "مخزون الديزل", val: "٢,٤٥٠ لتر", color: "amber", icon: Fuel },
                    { label: "إسعافات أولية", val: "١٤ حقيبة", color: "rose", icon: AlertTriangle },
                    { label: "معدات السلامة", val: "٨٥ قطعة", color: "blue", icon: HardHat },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl group hover:-translate-y-2 transition-all">
                        <div className="flex items-center justify-between mb-8">
                            <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <ArrowUpRight className="w-6 h-6 text-slate-200 group-hover:text-slate-900 transition-colors" />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{stat.label}</span>
                        <h3 className="text-3xl font-black text-slate-900 mt-1 font-mono tracking-tighter uppercase">{stat.val}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[48px] border border-slate-100 shadow-2xl overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-800">متابعة الطلبات الميدانية</h3>
                    <div className="flex gap-3">
                         <div className="relative group min-w-[300px]">
                            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors w-5 h-5" />
                            <input 
                                type="text" 
                                placeholder="البحث برقم الطلب..." 
                                className="w-full py-4 pr-16 pl-6 bg-slate-50 border-transparent rounded-[24px] focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all font-medium italic"
                            />
                         </div>
                    </div>
                </div>

                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {supplyRequests.map((req, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 hover:bg-white hover:shadow-xl transition-all group"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                                    req.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' : 
                                    req.status === 'In Transit' ? 'bg-blue-100 text-blue-600 active animate-pulse' : 'bg-amber-100 text-amber-600'
                                }`}>
                                    {req.status}
                                </span>
                                <span className="text-[10px] font-black font-mono text-slate-300">{req.id}</span>
                            </div>
                            <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors italic tracking-tight uppercase leading-tight mb-2">{req.item}</h4>
                            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest italic mb-6">
                                <Navigation className="w-3 h-3 text-blue-500" />
                                {req.location}
                            </div>
                            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">وصول متوقع:</span>
                                <span className="text-sm font-black italic text-slate-900 group-hover:text-blue-600 transition-colors">{req.eta}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
