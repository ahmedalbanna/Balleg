import React from "react";
import { motion } from "motion/react";
import { Bell, ShieldAlert, CheckCircle2, Clock, Filter, MoreVertical, Zap, AlertTriangle, ArrowRight } from "lucide-react";

export const CouncilAlerts: React.FC = () => {
  const alerts = [
    { title: "تعديل في ميزانية قطاع الإيواء", desc: "تم اعتماد زيادة طارئة بنسبة ١٠٪ لمخيم الوفاء.", type: "system", priority: "high", time: "قبل ١٠ دقائق" },
    { title: "بلاغ مراقب: نقص في الوقود", desc: "أفاد المراقب الميداني بنقص حاد في وقود مولدات مستشفى السلام.", type: "field", priority: "critical", time: "قبل ٣٠ دقيقة" },
    { title: "تقرير الإنجاز الشهري جاهز", desc: "تم إصدار تحليل البيانات للربع الثاني، متاح الآن للمراجعة.", type: "report", priority: "medium", time: "منذ ساعة" },
    { title: "طلب دخول لملفات الأرشيف", desc: "طلب المفتش العام الوصول لسجلات الشحنات السابقة.", type: "security", priority: "low", time: "منذ ساعتين" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in slide-in-from-left-4 duration-700 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">تنبيهات النظام</h2>
          <p className="text-slate-500 font-medium italic">مركز التحكم والتنبيهات الموحدة للقرارات التنظيمية</p>
        </div>
        <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-2">
            تعليم الكل كمقروء
            <CheckCircle2 className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-rose-600 p-8 rounded-[40px] text-white overflow-hidden relative shadow-2xl shadow-rose-600/20 group">
              <Zap className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
              <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                      <h4 className="text-xl font-black italic uppercase tracking-tighter">أولوية قصوى</h4>
                      <p className="text-rose-100 text-sm mt-1 opacity-80">تنبيهات تتطلب تدخلاً مباشراً</p>
                  </div>
                  <div className="flex items-end justify-between mt-12">
                      <span className="text-6xl font-black">٠٣</span>
                      <ArrowRight className="w-10 h-10 rotate-180 opacity-40 group-hover:opacity-100 group-hover:-translate-x-2 transition-all" />
                  </div>
              </div>
          </div>
          <div className="md:col-span-2 bg-white rounded-[40px] p-8 border border-slate-100 shadow-xl flex items-center justify-between">
              <div className="space-y-6">
                   <h4 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">تكوين التنبيهات الذكي</h4>
                   <p className="text-slate-500 text-sm italic font-medium leading-relaxed max-w-sm">قم بضبط قواعد الأتمتة لتلقي التنبيهات بناءً على الأولويات التي تحددها فقط، لتقليل الضجيج الرقمي في العمل الميداني.</p>
                   <button className="px-8 py-3 bg-slate-900 text-white rounded-[20px] font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-slate-900/10">
                      إعداد القواعد الذكية
                   </button>
              </div>
              <div className="hidden lg:flex w-32 h-32 rounded-full border-8 border-slate-50 items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-t-8 border-indigo-500 animate-spin duration-[3000ms]" />
                  <Bell className="w-10 h-10 text-indigo-500" />
              </div>
          </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-black text-slate-900 italic uppercase">قائمة الإشعارات</h3>
            <button className="text-slate-300 hover:text-slate-900 transition-colors">
                <Filter className="w-5 h-5" />
            </button>
        </div>
        <div className="divide-y divide-slate-50">
           {alerts.map((alert, idx) => (
               <div key={idx} className="p-8 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer">
                   <div className="flex gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${
                            alert.priority === 'critical' || alert.priority === 'high' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'
                        }`}>
                           {alert.priority === 'critical' ? <AlertTriangle className="w-7 h-7" /> : <Bell className="w-7 h-7" />}
                        </div>
                        <div>
                             <div className="flex items-center gap-3 mb-1">
                                <span className={`text-[9px] font-black uppercase tracking-tight px-1.5 py-0.5 rounded-lg ${
                                    alert.priority === 'critical' ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-100 text-slate-400'
                                }`}>
                                    {alert.type}
                                </span>
                                <span className="text-[10px] font-black text-slate-300 italic flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {alert.time}
                                </span>
                             </div>
                             <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors italic tracking-tight">{alert.title}</h4>
                             <p className="text-sm font-bold text-slate-400 mt-1 italic">{alert.desc}</p>
                        </div>
                   </div>
                   <div className="flex items-center gap-4">
                        <button className="px-6 py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                            اتخاذ قرار
                        </button>
                        <button className="p-3 text-slate-300 hover:text-slate-900 transition-all">
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
