import React from "react";
import { motion } from "motion/react";
import { MapPin, Search, Filter, Hammer, Construction, Clock, ShieldCheck, ArrowRight, HardHat, Navigation } from "lucide-react";

export const HandymanWorkSites: React.FC = () => {
    const sites = [
        { id: "SITE-101", title: "ترميم الجسر الغربي", location: "تعز، حي الروضة", status: "Active", progress: 65, team: 8, priority: "High" },
        { id: "SITE-102", title: "صيانة محطة التحلية", location: "الحديدة، الميناء", status: "Pending", progress: 0, team: 4, priority: "Medium" },
        { id: "SITE-103", title: "إعادة بناء المدرسة", location: "مأرب، الوادي", status: "Active", progress: 30, team: 12, priority: "Urgent" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-1000">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Construction className="w-8 h-8 text-amber-600" />
                        مواقع العمل
                    </h2>
                    <p className="text-slate-500 font-bold italic">إدارة ومتابعة المواقع الإنشائية والميدانية المكلف بها في الميدان</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-amber-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 leading-none">
                        <Navigation className="w-4 h-4" />
                        عرض الخريطة الشاملة
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'المواقع النشطة', val: '٠٨', color: 'amber', icon: HardHat },
                    { label: 'عاملين في الفريق', val: '٣٤', color: 'blue', icon: Hammer },
                    { label: 'مهام مكتملة', val: '١٢٤', color: 'emerald', icon: ShieldCheck },
                    { label: 'ساعات العمل', val: '٨٤٠+', color: 'indigo', icon: Clock },
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

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="relative flex-1 group">
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="البحث عن موقع عمل..." 
                            className="w-full py-5 pr-16 pl-8 bg-slate-50 border-transparent rounded-[30px] focus:bg-white focus:ring-4 focus:ring-amber-50 focus:border-amber-200 outline-none transition-all font-medium italic"
                        />
                    </div>
                    <button className="p-5 bg-slate-50 rounded-[24px] text-slate-400 hover:text-amber-600 transition-all">
                        <Filter className="w-6 h-6" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                    {sites.map((site, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-[48px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all group p-8"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-[0.2em] ${
                                    site.priority === 'Urgent' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                                }`}>
                                    {site.priority}
                                </div>
                                <span className="text-[10px] font-black font-mono text-slate-300">{site.id}</span>
                            </div>

                            <h4 className="text-2xl font-black text-slate-900 italic tracking-tight uppercase leading-none mb-2">{site.title}</h4>
                            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest italic mb-6">
                                <MapPin className="w-3 h-3 text-amber-500" />
                                {site.location}
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex justify-between text-xs font-black italic">
                                    <span className="text-slate-400">إنجاز: {site.progress}%</span>
                                    <span className="text-amber-600">{site.status}</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500" style={{ width: `${site.progress}%` }} />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                <div className="flex -space-x-2">
                                    {[...Array(3)].map((_, j) => (
                                        <div key={j} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shrink-0">
                                            <img referrerPolicy="no-referrer" src={`https://i.pravatar.cc/100?u=handy${i}${j}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 text-white text-[8px] font-black flex items-center justify-center shrink-0">
                                        +{site.team - 3}
                                    </div>
                                </div>
                                <button className="p-4 bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-2xl transition-all">
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
