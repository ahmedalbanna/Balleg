import React from "react";
import { motion } from "motion/react";
import { Scale, Search, Filter, Plus, Gavel, ShieldCheck, MessageSquare, Clock, Calendar, CheckCircle2, User, MoreVertical, Handshake } from "lucide-react";

export const NeighborhoodConflictResolution: React.FC = () => {
    const cases = [
        { id: "CNS-101", title: "نزاع على حدود أرض (مربع أ)", parties: "بيت القادري / بيت الفقيه", status: "In Mediation", officer: "الشيخ منصور", date: "أمس" },
        { id: "CNS-102", title: "خلاف على توزيع مياه شرب", location: "حارة السلام", status: "Resolved", officer: "أ. ليلى", date: "منذ يومين" },
        { id: "CNS-103", title: "شكوى إزعاج - مولد كهربائي", parties: "سكان عمارة التوفيق", status: "Pending", officer: "-", date: "منذ ٣ ساعات" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in zoom-in-95 duration-1000 pb-24 lg:pb-12 text-right">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Scale className="w-10 h-10 text-amber-600" />
                        حل النزاعـات
                    </h2>
                    <p className="text-slate-500 font-bold italic">التوسط في الخلافات البينية، توثيق جلسات الصلح، حماية السلم الاجتماعي، وضمان الحقوق</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-3 px-8 py-5 bg-amber-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-amber-500/20 active:scale-95 leading-none italic">
                        <Handshake className="w-5 h-5" />
                        بدء جلسة صلح
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                     <div className="bg-slate-900 p-12 rounded-[56px] text-white relative overflow-hidden group shadow-2xl">
                         <Gavel className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:rotate-12 transition-transform duration-2000" />
                         <div className="relative z-10 space-y-8">
                            <div className="w-20 h-20 bg-amber-600 rounded-[32px] flex items-center justify-center shadow-2xl shadow-amber-600/30">
                                <Scale className="w-10 h-10 text-white" />
                            </div>
                            <div className="space-y-4 max-w-xl">
                                <h3 className="text-3xl font-black italic uppercase tracking-tighter">وحدة التحكيم والصلح المجتمعي</h3>
                                <p className="text-slate-400 font-medium italic leading-relaxed text-sm">نظام إدارة القضايا يساعد على توثيق الدفوعات، الشهادات، ومحاضر الاتفاق لضمان التزام الأطراف وحفظ السلم.</p>
                            </div>
                            <div className="flex gap-4 pt-4">
                                 <div className="px-8 py-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4 group/box hover:bg-white/10 transition-all border-r-4 border-r-amber-500">
                                    <div className="text-3xl font-black font-mono">١٢</div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase italic">قضية منجزة</span>
                                 </div>
                                 <div className="px-8 py-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4 group/box hover:bg-white/10 transition-all border-r-4 border-r-blue-500">
                                    <div className="text-3xl font-black font-mono">٠٤</div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase italic">قيد الوساطة</span>
                                 </div>
                            </div>
                         </div>
                     </div>

                     <div className="bg-white rounded-[48px] border border-slate-100 shadow-xl overflow-hidden">
                        <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/10">
                            <h3 className="font-black text-slate-900 italic uppercase">القضايا الحالية</h3>
                            <div className="flex gap-3">
                                <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-300 hover:text-slate-900 shadow-sm transition-all">
                                    <Search className="w-5 h-5" />
                                </button>
                                <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-300 hover:text-slate-900 shadow-sm transition-all">
                                    <Filter className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {cases.map((item, idx) => (
                                <div key={idx} className="p-10 hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 group cursor-pointer">
                                    <div className="flex gap-8">
                                        <div className={`w-16 h-16 rounded-[28px] flex items-center justify-center shrink-0 transition-all shadow-sm ${
                                            item.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600' : 
                                            item.status === 'In Mediation' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-400'
                                        }`}>
                                             {item.status === 'Resolved' ? <ShieldCheck className="w-8 h-8" /> : <Clock className="w-8 h-8" />}
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors italic tracking-tight uppercase leading-none">{item.title}</h4>
                                            <div className="flex items-center gap-4 mt-3">
                                                <span className="text-[10px] font-black text-slate-400 italic flex items-center gap-1 uppercase tracking-widest leading-none">
                                                    الأطراف: {item.parties || item.location}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <span className="text-[10px] font-black text-slate-300 uppercase italic block mb-1">المكلف بالصلح</span>
                                            <span className="text-xs font-black text-slate-700 italic">{item.officer}</span>
                                        </div>
                                        <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-300 hover:text-amber-600 transition-all shadow-sm">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                     </div>
                </div>

                <div className="space-y-8">
                     <div className="bg-amber-50 border border-amber-100 rounded-[56px] p-12 space-y-8">
                        <div className="w-16 h-16 bg-amber-200 rounded-3xl flex items-center justify-center text-amber-700 shadow-xl group-hover:rotate-12 transition-transform">
                             <Handshake className="w-10 h-10" />
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-2xl font-black italic uppercase text-amber-900 tracking-tighter leading-none">ميثاق الحي</h4>
                            <p className="text-amber-800/60 font-medium italic leading-relaxed text-sm">التزم ٩٥٪ من كبار حارات الحي بميثاق "حرمة الجوار" والامتناع عن السلاح داخل التجمعات السكنية.</p>
                        </div>
                        <button className="w-full py-5 bg-white text-amber-600 rounded-[28px] font-black uppercase tracking-widest text-[9px] shadow-xl hover:bg-amber-600 hover:text-white transition-all italic">
                            عرض بنود الميثاق
                        </button>
                    </div>

                    <div className="bg-slate-900 rounded-[56px] p-12 text-white space-y-8 shadow-2xl relative overflow-hidden h-full">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Calendar className="w-48 h-48" />
                        </div>
                        <h4 className="text-lg font-black italic uppercase tracking-widest text-amber-500">الجلسات القادمة</h4>
                        <div className="space-y-4 relative z-10">
                            {[
                                { name: 'جلسة صلح آل عبيد', time: 'غداً - ٠٤:٠٠ م' },
                                { name: 'اجتماع لجنة التظلمات', time: 'الخميس - ١٠:٠٠ ص' },
                            ].map((meeting, i) => (
                                <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                                    <p className="font-black italic text-slate-200 uppercase leading-none mb-2">{meeting.name}</p>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{meeting.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
