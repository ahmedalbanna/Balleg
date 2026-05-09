import React from "react";
import { motion } from "motion/react";
import { HandMetal, Search, Filter, ShieldCheck, HardHat, AlertOctagon, HelpCircle, FileText, ChevronLeft, ArrowRight, ShieldAlert, LifeBuoy, BookOpen, Stethoscope } from "lucide-react";

export const HandymanSafety: React.FC = () => {
    const protocols = [
        { title: 'العمل في المرتفعات', category: 'وقاية', time: '١٠ دقائق قراءة' },
        { title: 'التعامل مع الأحمال الثقيلة', category: 'ميكانيكا', time: '١٥ دقيقة قراءة' },
        { title: 'بروتوكول الحرارة والجفاف', category: 'صحة', time: '٥ دقائق قراءة' },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-1000">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <HandMetal className="w-8 h-8 text-rose-600" />
                        إرشادات السلامة
                    </h2>
                    <p className="text-slate-500 font-bold italic">دليلك الكامل للحفاظ على سلامتك وسلامة الفريق في المواقع الإنشائية والميدانية</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'سجل الخلو من الحوادث', val: '٣٤٢ يوم', color: 'emerald', icon: ShieldCheck },
                    { label: 'ساعات التدريب', val: '٨٤ ساعة', color: 'indigo', icon: BookOpen },
                    { label: 'صلاحية المعدات', val: '٩٨٪', color: 'blue', icon: ShieldAlert },
                    { label: 'فريق الإسعاف', val: 'متوفر ٢٤/٧', color: 'rose', icon: Stethoscope },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{stat.label}</span>
                            <h3 className="text-3xl font-black text-slate-900 mt-1 font-mono tracking-tighter uppercase">{stat.val}</h3>
                        </div>
                        <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <stat.icon className="w-7 h-7" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-rose-600 rounded-[56px] p-12 text-white relative overflow-hidden shadow-2xl group">
                         <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-4">
                                <AlertOctagon className="w-10 h-10 text-white animate-pulse" />
                                <h3 className="text-3xl font-black italic uppercase tracking-tighter">الحالات الطارئة</h3>
                            </div>
                            <p className="text-rose-100 text-lg italic font-medium leading-relaxed max-w-xl">
                                في حال وقوع حادث ميداني، يرجى اتباع "القاعدة الذهبية": إيقاف العمل، عزل الموقع، إبلاغ غرفة العمليات، وتقديم الإسعافات الأولية فوراً.
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-6">
                                <button className="py-5 bg-white text-rose-600 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 hover:text-white transition-all shadow-xl">اتصال بالإسعاف الميداني</button>
                                <button className="py-5 bg-rose-700/50 border border-white/20 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-900 transition-all">إبلاغ المشرف المباشر</button>
                            </div>
                         </div>
                         <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -mr-48 -mt-48" />
                    </div>

                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden p-10">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800">الأسئلة الشائعة حول السلامة</h3>
                            <button className="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:underline italic">كل الأسئلة</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                'ماذا أفعل في حال تعطل رافعة الأحمال؟',
                                'متى يجب استبدال خوذة الرأس؟',
                                'كيفية التعامل مع تسرب الوقود؟',
                                'شروط العمل أثناء هطول الأمطار؟'
                            ].map((q, i) => (
                                <div key={i} className="p-6 bg-slate-50 rounded-[28px] border border-transparent flex items-center justify-between group hover:border-rose-200 hover:bg-white transition-all cursor-pointer">
                                    <span className="font-bold text-slate-700 italic">{q}</span>
                                    <ChevronLeft className="w-5 h-5 text-slate-300 group-hover:text-rose-600 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[56px] p-12 text-white space-y-10 relative overflow-hidden shadow-2xl h-full">
                        <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-tight relative z-10">مكتبة البروتوكولات</h3>
                        <div className="space-y-6 relative z-10">
                            {protocols.map((p, i) => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer p-5 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
                                            <FileText className="w-7 h-7 text-rose-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-black italic text-slate-200 group-hover:text-white transition-colors uppercase leading-tight">{p.title}</h4>
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{p.category} • {p.time}</span>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-6 h-6 text-slate-600 group-hover:text-rose-500 group-hover:translate-x-2 transition-all rotate-180" />
                                </div>
                            ))}
                        </div>
                        <div className="pt-10">
                             <button className="w-full py-6 bg-rose-600 text-white rounded-[32px] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-rose-900/10">
                                تحميل الدليل الفني الكامل
                             </button>
                        </div>
                        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px] -mr-40 -mt-40" />
                    </div>
                </div>
            </div>
        </div>
    );
};
