import React from "react";
import { motion } from "motion/react";
import { Mic, Search, Filter, Play, Pause, Square, Headphones, User, Clock, Calendar, Download, Trash2, Plus, Volume2 } from "lucide-react";

export const JournalistInterviews: React.FC = () => {
    const interviews = [
        { id: "INT-301", title: "شهادة ميدانية من عمال الإغاثة", guest: "د. خالد منصور", duration: "١٢:٤٥", date: "اليوم", status: "Ready" },
        { id: "INT-302", title: "كواليس التفاوض على الهدنة", guest: "مسؤول محلي", duration: "٤٥:٢٠", date: "أمس", status: "Draft" },
        { id: "INT-303", title: "قصة نزوح من حي الروضة", guest: "عائلة يحيى", duration: "٠٨:١٥", date: "منذ يومين", status: "Ready" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in zoom-in-95 duration-800">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Mic className="w-8 h-8 text-rose-600" />
                        المقابلات الصوتية
                    </h2>
                    <p className="text-slate-500 font-bold italic">تسجيل وإدارة المقابلات الصوتية، أرشفة الشهادات الميدانية، واستخراج الملاحظات</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-rose-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-rose-500/20 active:scale-95 leading-none">
                        <Mic className="w-4 h-4" />
                        بدء تسجيل جديد
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                     <div className="bg-slate-900 rounded-[48px] p-12 text-white relative overflow-hidden group shadow-2xl border border-slate-800">
                         <Volume2 className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-1000" />
                         <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                            <div className="w-40 h-40 bg-rose-600 rounded-[40px] flex items-center justify-center shadow-2xl shadow-rose-600/20 group-hover:rotate-6 transition-transform">
                                <Mic className="w-20 h-20 text-white" />
                            </div>
                            <div className="flex-1 space-y-6 text-center md:text-right">
                                <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-tight">وحدة التسجيل الاحترافية</h3>
                                <p className="text-slate-400 font-medium italic">اضبط الميكروفون وابدأ في توثيق الشهادة الميدانية بأعلى جودة صوتية ممكنة.</p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <button className="p-6 bg-white text-slate-900 rounded-3xl hover:bg-rose-600 hover:text-white transition-all shadow-xl active:scale-90">
                                        <Play className="w-6 h-6 fill-current" />
                                    </button>
                                    <button className="p-6 bg-white/10 text-white rounded-3xl hover:bg-white/20 transition-all active:scale-90">
                                        <Square className="w-6 h-6" />
                                    </button>
                                    <div className="px-8 py-6 bg-white/5 rounded-3xl border border-white/10 font-mono text-2xl font-black tracking-widest text-rose-500">
                                        ٠٠:٠٠:٠٠
                                    </div>
                                </div>
                            </div>
                         </div>
                     </div>

                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                            <h3 className="font-black text-slate-900 italic uppercase">المكتبة الصوتية</h3>
                            <div className="flex gap-2">
                                <button className="p-3 bg-white rounded-xl text-slate-300 hover:text-slate-900 shadow-sm transition-all border border-slate-100">
                                    <Search className="w-4 h-4" />
                                </button>
                                <button className="p-3 bg-white rounded-xl text-slate-300 hover:text-slate-900 shadow-sm transition-all border border-slate-100">
                                    <Filter className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {interviews.map((item, idx) => (
                                <div key={idx} className="p-8 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer">
                                    <div className="flex gap-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all shadow-sm ${
                                            item.status === 'Ready' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-400'
                                        }`}>
                                             {item.status === 'Ready' ? <Headphones className="w-7 h-7" /> : <Clock className="w-7 h-7" />}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black text-slate-900 group-hover:text-rose-600 transition-colors italic tracking-tight uppercase leading-none">{item.title}</h4>
                                            <div className="flex items-center gap-4 mt-2">
                                                <span className="text-[10px] font-black text-slate-400 italic flex items-center gap-1 uppercase tracking-widest">
                                                    <User className="w-3 h-3 text-rose-500" />
                                                    {item.guest}
                                                </span>
                                                <span className="text-[10px] font-black text-slate-300 italic uppercase tracking-widest font-mono">{item.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-300 hover:text-rose-600 hover:border-rose-100 transition-all shadow-sm">
                                            <Play className="w-4 h-4 fill-current" />
                                        </button>
                                        <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-300 hover:text-slate-900 transition-all shadow-sm">
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                     <div className="bg-rose-50 border border-rose-100 rounded-[40px] p-10 space-y-6">
                        <div className="w-14 h-14 bg-rose-200 rounded-2xl flex items-center justify-center text-rose-700 shadow-sm">
                             <Volume2 className="w-8 h-8" />
                        </div>
                        <h4 className="text-xl font-black italic uppercase text-rose-900 tracking-tighter">إحصائيات التسجيل</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end border-b border-rose-200/50 pb-3">
                                <span className="text-[10px] font-black text-rose-800/60 uppercase italic">سجل المقابلات</span>
                                <span className="text-2xl font-black text-rose-900 font-mono tracking-tighter">٤٢</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-rose-200/50 pb-3">
                                <span className="text-[10px] font-black text-rose-800/60 uppercase italic">ساعات المسجل</span>
                                <span className="text-2xl font-black text-rose-900 font-mono tracking-tighter">١٨:٣٠</span>
                            </div>
                        </div>
                        <p className="text-rose-800/60 text-[10px] font-bold italic leading-relaxed">المساحة السحابية المتبقية: ٤٥٠ ميجابايت من أصل ١ جيجابايت.</p>
                    </div>

                    <div className="bg-slate-900 rounded-[40px] p-10 text-white space-y-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Calendar className="w-32 h-32" />
                        </div>
                        <h4 className="text-lg font-black italic uppercase tracking-widest text-rose-500">المواعيد القادمة</h4>
                        <div className="space-y-4 relative z-10">
                            {[
                                { name: 'عمدة المدينة', time: 'غداً - ١٠:٠٠ ص' },
                                { name: 'فريق الهلال الأحمر', time: 'الخميس - ٠٢:٠٠ م' },
                            ].map((meeting, i) => (
                                <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="font-black italic text-slate-200 uppercase leading-none mb-1">{meeting.name}</p>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{meeting.time}</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 bg-white/5 border border-white/10 text-slate-400 hover:bg-rose-600 hover:text-white hover:border-rose-600 rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all">
                            جدولة مقابلة جديدة
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
