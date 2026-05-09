import React from "react";
import { motion } from "motion/react";
import { Calendar, Search, Filter, Plus, MapPin, Users, Clock, Heart, Star, Image as ImageIcon, Share2, ArrowRight } from "lucide-react";

export const NeighborhoodEvents: React.FC = () => {
    const events = [
        { id: "EVT-501", title: "حملة تنظيف الحارة الكبرى", category: "Community", date: "١٥ مايو", time: "٠٨:٠٠ ص", location: "الشارع الرئيسي", images: 4 },
        { id: "EVT-502", title: "دوري كرة القدم - شباب الصمود", category: "Sports", date: "٢٠ مايو", time: "٠٤:٠٠ م", location: "ملعب الحي", images: 12 },
        { id: "EVT-503", title: "مهرجان العيد للأطفال", category: "Social", date: "٢٥ مايو", time: "٠٩:٠٠ ص", location: "ساحة المجلس", images: 8 },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-1000 pb-24 lg:pb-12 text-right">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Calendar className="w-10 h-10 text-indigo-600" />
                        الأنشطة والفعاليات
                    </h2>
                    <p className="text-slate-500 font-bold italic">تنظيم المبادرات المجتمعية، الأنشطة الشبابية، الفعاليات الخيرية، وتوثيق المشاركة الأهالية</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-3 px-8 py-5 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 leading-none italic">
                        <Plus className="w-5 h-5" />
                        إضافة فعالية جديدة
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: "فعاليات مخطط لها", val: "١٢", color: "indigo", icon: Calendar },
                    { label: "مشاركون نشطون", val: "٢٥٠+", color: "emerald", icon: Users },
                    { label: "ساعات تطوعية", val: "٨٤٠", color: "blue", icon: Heart },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl group hover:shadow-2xl transition-all relative overflow-hidden">
                         <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000`} />
                         <div className={`w-14 h-14 rounded-3xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm`}>
                            <stat.icon className="w-8 h-8" />
                         </div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic leading-none">{stat.label}</p>
                         <h3 className="text-4xl font-black text-slate-900 leading-none font-mono tracking-tighter uppercase">{stat.val}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[56px] border border-slate-100 shadow-2xl overflow-hidden p-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                     <div className="flex gap-4">
                        <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic">القادمة</button>
                        <button className="px-8 py-4 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest italic hover:bg-slate-100">المنتهية</button>
                     </div>
                     <div className="relative group flex-1 max-w-lg">
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="البحث عن فعالية أو مبادرة..." 
                            className="w-full py-4 pr-16 pl-6 bg-slate-50 border-transparent rounded-[24px] focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none transition-all font-bold italic text-sm"
                        />
                     </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {events.map((evt, i) => (
                        <motion.div 
                            key={i} 
                            whileHover={{ y: -12 }}
                            className="group bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all border-t-8 border-indigo-500"
                        >
                            <div className="p-8 space-y-6">
                                <div className="flex justify-between items-start">
                                    <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest italic bg-indigo-50 px-3 py-1.5 rounded-xl">{evt.category}</span>
                                    <Star className="w-5 h-5 text-slate-200 group-hover:text-amber-500 transition-colors" />
                                </div>
                                <h4 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors italic tracking-tight uppercase leading-tight h-14 overflow-hidden">{evt.title}</h4>
                                <div className="space-y-3">
                                     <div className="flex items-center gap-3 text-slate-400 font-bold italic text-xs">
                                        <Calendar className="w-5 h-5 text-indigo-400" />
                                        {evt.date}
                                     </div>
                                     <div className="flex items-center gap-3 text-slate-400 font-bold italic text-xs">
                                        <Clock className="w-5 h-5 text-indigo-400" />
                                        {evt.time}
                                     </div>
                                     <div className="flex items-center gap-3 text-slate-400 font-bold italic text-xs">
                                        <MapPin className="w-5 h-5 text-indigo-400" />
                                        {evt.location}
                                     </div>
                                </div>
                            </div>
                            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                 <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 italic">
                                    <ImageIcon className="w-4 h-4" />
                                    {evt.images} صور
                                 </div>
                                 <div className="flex gap-2">
                                    <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-indigo-600 transition-all">
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-slate-900 transition-all">
                                        <ArrowRight className="w-4 h-4 rotate-180" />
                                    </button>
                                 </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
