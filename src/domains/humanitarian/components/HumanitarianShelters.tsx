import React from "react";
import { motion } from "motion/react";
import { Home, MapPin, Users, Bed, Search, Filter, ShieldCheck, ArrowRight, Info, Plus, Activity } from "lucide-react";

export const HumanitarianShelters: React.FC = () => {
    const shelters = [
        { id: "SHL-001", name: "مركز إيواء الأمل", location: "صنعاء، حي الثورة", capacity: 500, occupied: 450, status: "Critical", type: "State" },
        { id: "SHL-002", name: "مخيم السلام العاجل", location: "عدن، مديرية البريقة", capacity: 1200, occupied: 800, status: "Available", type: "NGO" },
        { id: "SHL-003", name: "دار الرعاية المجتمعية", location: "حضرموت، المكلا", capacity: 200, occupied: 195, status: "Full", type: "Private" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-1000">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Home className="w-8 h-8 text-indigo-600" />
                        مراكز الإيواء
                    </h2>
                    <p className="text-slate-500 font-bold italic">إدارة وتتبع الطاقة الاستيعابية لمراكز النزوح المؤقت والمخيمات الميدانية</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 leading-none">
                        <Plus className="w-4 h-4" />
                        إضافة مركز جديد
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'إجمالي المراكز', val: '١٢', color: 'indigo', icon: MapPin },
                    { label: 'الطاقة الإجمالية', val: '٤,٥٠٠', color: 'blue', icon: Bed },
                    { label: 'النازحين المسجلين', val: '٣,٨٢٠', color: 'emerald', icon: Users },
                    { label: 'مراكز ممتلئة', val: '٠٤', color: 'rose', icon: Activity },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{stat.label}</span>
                            <h3 className="text-3xl font-black text-slate-900 mt-1 font-mono tracking-tighter">{stat.val}</h3>
                        </div>
                        <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <stat.icon className="w-7 h-7" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[48px] border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="relative flex-1 group">
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="البحث عن مركز إيواء أو موقع..." 
                            className="w-full py-5 pr-16 pl-8 bg-slate-50 border-transparent rounded-[30px] focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none transition-all font-medium italic"
                        />
                    </div>
                    <button className="p-5 bg-slate-50 rounded-[24px] text-slate-400 hover:text-indigo-600 transition-all">
                        <Filter className="w-6 h-6" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                    {shelters.map((shelter, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-[48px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all group p-8"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-[0.2em] ${
                                    shelter.status === 'Full' ? 'bg-rose-50 text-rose-600' : 
                                    shelter.status === 'Critical' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                                }`}>
                                    {shelter.status}
                                </div>
                                <span className="text-[10px] font-black font-mono text-slate-300">{shelter.id}</span>
                            </div>

                            <h4 className="text-2xl font-black text-slate-900 italic tracking-tight uppercase leading-none mb-2">{shelter.name}</h4>
                            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest italic mb-6">
                                <MapPin className="w-3 h-3 text-indigo-500" />
                                {shelter.location}
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex justify-between text-xs font-black italic">
                                    <span className="text-slate-400">إشغال: {Math.round((shelter.occupied / shelter.capacity) * 100)}%</span>
                                    <span className="text-indigo-600">{shelter.occupied} / {shelter.capacity} سرير</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${shelter.status === 'Full' ? 'bg-rose-500' : 'bg-indigo-500'}`} style={{ width: `${(shelter.occupied / shelter.capacity) * 100}%` }} />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                <div className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-400 italic">
                                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                    {shelter.type} Registry
                                </div>
                                <button className="p-4 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all">
                                    <ArrowRight className="w-5 h-5 rotate-180" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
