import React from "react";
import { motion } from "motion/react";
import { Bell, Zap, AlertTriangle, MessageSquare, Clock, MapPin, Search, Filter, Plus, Send, Radio, Share2 } from "lucide-react";

export const JournalistBreakingNews: React.FC = () => {
    const breakingNews = [
        { id: "BRK-001", title: "انفجار عنيف يهز وسط العاصمة صنعاء", location: "صنعاء", time: "الآن", status: "Critical", source: "مراسل ميداني" },
        { id: "BRK-002", title: "وصول سفينة مساعدات لميناء الحديدة", location: "الحديدة", time: "منذ ٥ دقائق", status: "New", source: "وكالة الأنباء" },
        { id: "BRK-003", title: "اشتباكات متقطعة في جبهة مأرب", location: "مأرب", time: "منذ ١٥ دقيقة", status: "Update", source: "مصدر محلي" },
        { id: "BRK-004", title: "إعلان عن هدنة إنسانية لمدة ٧٢ ساعة", location: "دولي", time: "منذ ٣٠ دقيقة", status: "Verified", source: "الأمم المتحدة" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in slide-in-from-right-4 duration-800">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Zap className="w-8 h-8 text-rose-600 animate-pulse" />
                        عواجل الصحافة
                    </h2>
                    <p className="text-slate-500 font-bold italic">متابعة الأخبار العاجلة لحظة بلحظة، التحقق من المصادر، وإرسال التنبيهات الفورية</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-rose-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-rose-500/20 active:scale-95 leading-none">
                        <Plus className="w-4 h-4" />
                        إرسال خبر عاجل
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                     <div className="bg-slate-900 p-10 rounded-[48px] text-white relative overflow-hidden group shadow-2xl">
                         <Radio className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-2000" />
                         <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                            <div className="w-24 h-24 bg-rose-600 rounded-[32px] flex items-center justify-center shadow-2xl shadow-rose-600/30">
                                <Zap className="w-12 h-12 text-white animate-bounce" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter">بث مباشر للأخبار</h3>
                                <p className="text-slate-400 text-sm italic font-medium leading-relaxed">أنت متصل الآن بغرفة الأخبار المركزية. سيتم إشعارك فور ورود أي خبر عاجل من الميدان.</p>
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-2 text-[10px] font-black text-rose-500 uppercase italic tracking-widest">
                                        <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                                        Connected
                                    </span>
                                </div>
                            </div>
                         </div>
                     </div>

                     <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="font-black text-slate-900 italic uppercase">قائمة العواجل</h3>
                            <button className="p-3 bg-slate-50 rounded-xl text-slate-300 hover:text-slate-900 transition-all">
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {breakingNews.map((news, idx) => (
                                <div key={idx} className="p-8 hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-start justify-between gap-6 group cursor-pointer relative overflow-hidden">
                                     {news.status === 'Critical' && <div className="absolute top-0 right-0 w-1.5 h-full bg-rose-600" />}
                                     <div className="flex gap-6">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all group-hover:scale-110 ${
                                            news.status === 'Critical' ? 'bg-rose-100 text-rose-600' : 
                                            news.status === 'New' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'
                                        }`}>
                                            {news.status === 'Critical' ? <AlertTriangle className="w-6 h-6 animate-pulse" /> : <MessageSquare className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="text-[10px] font-black font-mono text-slate-300 italic flex items-center gap-1 uppercase tracking-widest leading-none bg-slate-50 px-2 py-1 rounded">
                                                    <Clock className="w-3 h-3" />
                                                    {news.time}
                                                </span>
                                                <span className={`text-[8px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest ${
                                                    news.status === 'Critical' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-400'
                                                }`}>{news.status}</span>
                                            </div>
                                            <h4 className="text-xl font-black text-slate-900 group-hover:text-rose-600 transition-colors italic tracking-tight uppercase leading-tight">{news.title}</h4>
                                            <div className="flex items-center gap-6 mt-3">
                                                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold italic">
                                                    <MapPin className="w-4 h-4 text-rose-500" />
                                                    {news.location}
                                                </div>
                                                <div className="text-[10px] font-black text-slate-300 uppercase italic">المصدر: {news.source}</div>
                                            </div>
                                        </div>
                                     </div>
                                     <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-rose-600 transition-all shadow-sm">
                                            <Share2 className="w-4 h-4" />
                                        </button>
                                        <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-slate-900/10">
                                            تحقق
                                        </button>
                                     </div>
                                </div>
                            ))}
                        </div>
                     </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-rose-600 rounded-[56px] p-12 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group h-full">
                         <Radio className="absolute -top-10 -left-10 w-48 h-48 opacity-10 group-hover:rotate-45 transition-transform duration-2000" />
                         <div className="space-y-8">
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-tight">مركز البث العاجل</h3>
                            <div className="space-y-6">
                                 <div className="bg-white/10 p-6 rounded-3xl border border-white/20">
                                    <span className="text-[10px] font-black uppercase text-rose-200 block mb-2 italic">متوسط زمن التغطية</span>
                                    <div className="text-4xl font-black font-mono tracking-tighter">٠٣:٤٥ د</div>
                                 </div>
                                 <div className="bg-white/10 p-6 rounded-3xl border border-white/20">
                                    <span className="text-[10px] font-black uppercase text-rose-200 block mb-2 italic">معدل التحقق</span>
                                    <div className="text-4xl font-black font-mono tracking-tighter">٩٨.٥ ٪</div>
                                 </div>
                            </div>
                         </div>
                         <div className="pt-12">
                             <button className="w-full py-5 bg-white text-rose-600 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 hover:text-white transition-all shadow-xl">
                                إعدادات تنبيهات العواجل
                             </button>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
