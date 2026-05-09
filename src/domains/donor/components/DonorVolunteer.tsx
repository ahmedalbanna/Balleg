import React from "react";
import { motion } from "motion/react";
import { Users, Search, Filter, MapPin, Calendar, Clock, Star, ArrowRight, ShieldCheck, Heart, Sparkles, Send } from "lucide-react";

export const DonorVolunteer: React.FC = () => {
    const opportunities = [
        { title: "توزيع السلال الغذائية", category: "ميداني", location: "عدن، اليمن", date: "١٥ مايو 2024", duration: "٤ ساعات", volunteers: 12, maxVolunteers: 20 },
        { title: "ترجمة وثائق طبية", category: "عن بعد", location: "Global", date: "مستمر", duration: "مرن", volunteers: 5, maxVolunteers: 10 },
        { title: "تنظيم مخيم تعليمي", category: "تعليم", location: "مأرب، اليمن", date: "٠١ يونيو 2024", duration: "٣ أيام", volunteers: 8, maxVolunteers: 15 },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Users className="w-8 h-8 text-blue-600" />
                        فرص التطوع
                    </h2>
                    <p className="text-slate-500 font-bold italic">ساهم بجهدك ووقتك في الميدان أو عن بعد، وكن جزءاً من فريق العطاء اليمني</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20 active:scale-95 leading-none">
                        <Sparkles className="w-4 h-4" />
                        تقديم طلب تطوع عام
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                             <div className="relative flex-1 group">
                                <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors w-5 h-5" />
                                <input 
                                    type="text" 
                                    placeholder="البحث عن فرصة تطوعية..." 
                                    className="w-full py-5 pr-16 pl-8 bg-slate-50 border-transparent rounded-[30px] focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none transition-all font-medium italic"
                                />
                             </div>
                             <div className="flex gap-2">
                                <button className="p-5 bg-slate-50 rounded-[24px] text-slate-400 hover:text-blue-600 transition-all">
                                    <Filter className="w-6 h-6" />
                                </button>
                             </div>
                        </div>

                        <div className="divide-y divide-slate-50">
                            {opportunities.map((opp, idx) => (
                                <div key={idx} className="p-8 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 group cursor-pointer">
                                    <div className="flex items-start gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                             <Heart className="w-8 h-8" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{opp.category}</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-200" />
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{opp.location}</span>
                                            </div>
                                            <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors italic tracking-tight uppercase leading-none">{opp.title}</h4>
                                            <div className="flex items-center gap-6 mt-4 pt-2">
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 italic">
                                                    <Calendar className="w-4 h-4 text-blue-400" />
                                                    {opp.date}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 italic">
                                                    <Clock className="w-4 h-4 text-blue-400" />
                                                    {opp.duration}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center md:items-end gap-3 min-w-[150px]">
                                        <div className="w-full text-right space-y-1">
                                            <div className="flex justify-between text-[10px] font-black italic">
                                                <span className="text-slate-400">Reserved</span>
                                                <span className="text-blue-600">{opp.volunteers} / {opp.maxVolunteers}</span>
                                            </div>
                                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden w-full">
                                                <div className="h-full bg-blue-500" style={{ width: `${(opp.volunteers / opp.maxVolunteers) * 100}%` }} />
                                            </div>
                                        </div>
                                        <button className="w-full py-4 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all italic flex items-center justify-center gap-3">
                                            سجل الآن
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                     <div className="bg-slate-900 rounded-[56px] p-12 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-tight mb-8">نظام المكافآت</h3>
                            <div className="space-y-10">
                                {[
                                    { label: 'ساعات التطوع', val: '٤٢ ساعة', icon: Clock },
                                    { label: 'شهادات الإنجاز', val: '٠٣ شهادات', icon: ShieldCheck },
                                    { label: 'المرتبة التطوعية', val: 'سفير العطاء', icon: Star },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-6 group/item">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 backdrop-blur-xl group-hover/item:bg-white group-hover/item:text-slate-900 transition-all">
                                            <item.icon className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic leading-none">{item.label}</p>
                                            <p className="font-black italic mt-1 text-blue-400 group-hover/item:text-white transition-colors uppercase tracking-tight">{item.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-20 relative z-10">
                            <button className="w-full py-5 bg-blue-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-blue-500/20">
                                تحميل سجل التطوع (CV)
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
                    </div>
                </div>
            </div>
        </div>
    );
};
