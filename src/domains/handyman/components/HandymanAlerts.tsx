import React from "react";
import { motion } from "motion/react";
import { Bell, AlertTriangle, Radiation, ShieldAlert, Wind, CloudLightning, Activity, Clock, MoreVertical, CheckCircle2, MessageSquare, Info, ShieldCheck } from "lucide-react";

export const HandymanAlerts: React.FC = () => {
    const alerts = [
        { title: "تحذير: عاصفة رملية قادمة", desc: "من المتوقع وصول عاصفة رملية لمواقع مأرب في تمام الساعة السادسة مساءً. يرجى تأمين المعدات فوراً.", type: "danger", time: "منذ ١٠ دقائق", unread: true },
        { title: "نقص في مخزون الوقود", desc: "مخزون الديزل في موقع تعز وصل للحد الأدنى (١٠٪). سيتم تزويدكم بالشحنة خلال ٤ ساعات.", type: "warning", time: "منذ ساعة", unread: true },
        { title: "تحديث إجراءات السلامة", desc: "تم تحديث بروتوكول العمل في المناطق الوعرة. يرجى الاطلاع على الدليل المحدث.", type: "info", time: "منذ ٣ ساعات", unread: false },
        { title: "رسالة من الإدارة", desc: "شكراً لجهودكم في إنجاز مشروع المدرسة قبل الموعد المحدد. سيتم صرف مكافأة الأداء غداً.", type: "system", time: "منذ يوم", unread: false },
    ];

    return (
        <div className="p-4 md:p-8 space-y-8 animate-in slide-in-from-right-4 duration-700 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Bell className="w-8 h-8 text-rose-600" />
                        التنبيهات العاجلة
                    </h2>
                    <p className="text-slate-500 font-medium italic">إشعارات ميدانية فورية، تحذيرات الطقس، وتحديثات الحالة من غرفة العمليات</p>
                </div>
                <button className="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:underline flex items-center gap-2 italic">
                    MARK ALL AS READ
                    <CheckCircle2 className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-900 p-10 rounded-[48px] text-white relative overflow-hidden group shadow-2xl">
                     <Radiation className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10 group-hover:rotate-45 transition-transform duration-1000" />
                     <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-3">
                            <ShieldAlert className="w-6 h-6 text-rose-500" />
                            <h4 className="text-xl font-black italic uppercase tracking-tighter">حالة الطوارئ</h4>
                        </div>
                        <p className="text-slate-400 text-sm italic font-medium leading-relaxed">في حال حدوث أي طارئ أمني أو طبي، استخدم زر الطوارئ لإيقاف كافة العمليات وإرسال الإحداثيات فوراً.</p>
                        <button className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-rose-900/40 active:scale-95">
                            تفعيل وضع الطوارئ
                        </button>
                     </div>
                </div>

                <div className="bg-amber-500 p-10 rounded-[48px] text-slate-900 relative overflow-hidden group shadow-2xl">
                    <Wind className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10 group-hover:-translate-x-10 transition-transform duration-1000" />
                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-3">
                            <CloudLightning className="w-6 h-6 text-slate-900" />
                            <h4 className="text-xl font-black italic uppercase tracking-tighter">تحديث الطقس</h4>
                        </div>
                        <p className="text-amber-900/60 text-sm italic font-black leading-relaxed">الجو مناسب للعمل المفتوح خلال الـ ١٢ ساعة القادمة. استغل الوقت لإنهاء صب القواعد.</p>
                        <div className="pt-4 flex items-center gap-2 text-xs font-black italic uppercase tracking-widest">
                            <Activity className="w-4 h-4" />
                            Good Working Conditions
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
                <div className="divide-y divide-slate-50">
                    {alerts.map((alert, idx) => (
                        <div key={idx} className={`p-8 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row md:items-start justify-between gap-6 group cursor-pointer relative ${alert.unread ? 'bg-rose-50/20' : ''}`}>
                            {alert.unread && <div className="absolute top-0 right-0 w-1.5 h-full bg-rose-500" />}
                            <div className="flex gap-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${
                                    alert.type === 'danger' ? 'bg-rose-100 text-rose-600' : 
                                    alert.type === 'warning' ? 'bg-amber-100 text-amber-600' : 
                                    alert.type === 'info' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'
                                }`}>
                                    {alert.type === 'danger' ? <ShieldAlert className="w-7 h-7" /> : 
                                     alert.type === 'warning' ? <AlertTriangle className="w-7 h-7" /> : 
                                     alert.type === 'info' ? <Info className="w-7 h-7" /> : <ShieldCheck className="w-7 h-7" />}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black font-mono text-slate-300 italic flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {alert.time}
                                        </span>
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 group-hover:text-rose-600 transition-colors italic tracking-tight uppercase leading-none">{alert.title}</h4>
                                    <p className="text-sm font-bold text-slate-400 mt-2 italic max-w-xl leading-relaxed">{alert.desc}</p>
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
