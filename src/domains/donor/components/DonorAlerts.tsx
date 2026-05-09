import React from "react";
import { motion } from "motion/react";
import { Bell, Heart, CheckCircle2, Clock, Filter, MoreVertical, Star, Gift, BookOpen, MessageSquare, ArrowRight, Sparkles } from "lucide-react";

export const DonorAlerts: React.FC = () => {
    const alerts = [
        { title: "اكتمل بناء بئر 'سقيا الأمل'", desc: "بفضل تبرعك، أصبح لدى ٣٠٠ أسرة الآن وصول دائم للمياه النظيفة. شاهد صور المشروع.", type: "project", time: "منذ دقيقتين", unread: true },
        { title: "تم استلام تبرعك بنجاح", desc: "شكراً لك! تم استلام مبلغ ٥٠٠ $ مخصصة لمشروع كفالة اليتيم.", type: "donation", time: "منذ ساعة", unread: false },
        { title: "فرصة تطوعية جديدة", desc: "نحتاج لمصممين متطوعين للمساهمة في حملة 'نور العلم'. هل أنت مهتم؟", type: "volunteer", time: "منذ ٥ ساعات", unread: false },
        { title: "تقرير الأثر الشهري متوفر", desc: "اطلع على ملخص إنجازات شهر مارس وكيف ساهم عطاؤك في تغيير الميدان.", type: "system", time: "منذ يوم", unread: false },
    ];

    return (
        <div className="p-4 md:p-8 space-y-8 animate-in slide-in-from-left-4 duration-700 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Bell className="w-8 h-8 text-rose-600" />
                        الإشعارات
                    </h2>
                    <p className="text-slate-500 font-medium italic">تابع أثر تبرعاتك، تقارير المشاريع، وآخر أخبار المجتمع اليمني</p>
                </div>
                <button className="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:underline flex items-center gap-2 italic">
                    MARK ALL AS READ
                    <CheckCircle2 className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-rose-600 p-8 rounded-[40px] text-white overflow-hidden relative shadow-2xl shadow-rose-600/20 group">
                    <Sparkles className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
                    <div className="relative z-10 space-y-6">
                        <h4 className="text-xl font-black italic uppercase tracking-tighter">مركز الرسائل</h4>
                        <p className="text-rose-100 text-sm italic font-medium leading-relaxed">تواصل مباشرة مع مديري المشاريع في الميدان واحصل على تحديثات حصرية.</p>
                        <button className="px-8 py-3 bg-white text-rose-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-rose-900/10 active:scale-95">
                            فتح المحادثات
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-xl flex flex-col justify-between group">
                    <div className="space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                            <Star className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">نقاط العطاء</h4>
                        <p className="text-slate-500 text-sm italic font-medium">لقد جمعت ١,٢٤٠ نقطة هذا الشهر. يمكنك استخدامها للحصول على تقارير متميزة.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                    <h3 className="font-black text-slate-900 italic uppercase">آخر التحديثات</h3>
                    <div className="flex gap-2">
                        <button className="p-3 bg-white rounded-xl text-slate-300 hover:text-slate-900 shadow-sm transition-all">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="divide-y divide-slate-50">
                    {alerts.map((alert, idx) => (
                        <div key={idx} className={`p-8 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row md:items-start justify-between gap-6 group cursor-pointer relative ${alert.unread ? 'bg-rose-50/30' : ''}`}>
                            {alert.unread && <div className="absolute top-0 right-0 w-1.5 h-full bg-rose-500" />}
                            <div className="flex gap-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${
                                    alert.type === 'project' ? 'bg-emerald-50 text-emerald-600' : 
                                    alert.type === 'donation' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'
                                }`}>
                                    {alert.type === 'project' ? <Heart className="w-7 h-7" /> : 
                                     alert.type === 'donation' ? <Gift className="w-7 h-7" /> : 
                                     alert.type === 'volunteer' ? <MessageSquare className="w-7 h-7" /> : <BookOpen className="w-7 h-7" />}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black font-mono text-slate-300 italic flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {alert.time}
                                        </span>
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 group-hover:text-rose-600 transition-colors italic tracking-tight uppercase leading-none">{alert.title}</h4>
                                    <p className="text-sm font-bold text-slate-400 mt-2 italic max-w-xl">{alert.desc}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="p-3 text-slate-300 hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
