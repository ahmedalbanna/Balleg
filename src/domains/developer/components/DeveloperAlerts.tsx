import React from "react";
import { motion } from "motion/react";
import { Bell, ShieldAlert, CheckCircle2, Clock, Filter, MoreVertical, Zap, AlertTriangle, ArrowRight, Server, Terminal } from "lucide-react";

export const DeveloperAlerts: React.FC = () => {
  const alerts = [
    { title: "ارتفاع في زمن استجابة API-01", desc: "تجاوز زمن الاستجابة في منطقة eu-west-1 معدل ٥٠٠ms لمدة ٣ دقائق.", type: "system", priority: "critical", time: "منذ دقيقتين" },
    { title: "فشل في عملية المزامنة التلقائية", desc: "فشل في تحديث فهارس البحث Vector Index بسبب مشاكل في الوصول للبيانات.", type: "database", priority: "high", time: "منذ ١٢ دقيقة" },
    { title: "اكتشاف محاولة وصول غير مصرح بها", desc: "تم حظر عنوان IP خارجي بعد محاولة الوصول إلى لوحة تحكم الأدوات الطرفية.", type: "security", priority: "high", time: "منذ ساعة" },
    { title: "اكتمال تحديث النسخة v3.4.0", desc: "تم نشر النسخة الجديدة بنجاح على خوادم الإنتاج والبيئات المعزولة.", type: "deployment", priority: "low", time: "منذ ساعتين" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in slide-in-from-left-4 duration-700 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
            <Bell className="w-8 h-8 text-rose-600" />
            تنبيهات النظام
          </h2>
          <p className="text-slate-500 font-medium italic">سجل الأحداث التقنية، مراقبة الانحرافات، وإشعارات الأمان الحرجة</p>
        </div>
        <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-2 italic">
            ACKNOWLEDGE ALL
            <CheckCircle2 className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-rose-600 p-8 rounded-[40px] text-white overflow-hidden relative shadow-2xl shadow-rose-600/20 group">
              <Zap className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
              <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                      <h4 className="text-xl font-black italic uppercase tracking-tighter">حوادث نشطة</h4>
                      <p className="text-rose-100 text-sm mt-1 opacity-80 italic">مشاكل تقنية تتطلب تدخلاً فورياً</p>
                  </div>
                  <div className="flex items-end justify-between mt-12">
                      <span className="text-6xl font-black font-mono">٠٢</span>
                      <ArrowRight className="w-10 h-10 rotate-180 opacity-40 group-hover:opacity-100 group-hover:-translate-x-2 transition-all" />
                  </div>
              </div>
          </div>
          <div className="md:col-span-2 bg-white rounded-[40px] p-8 border border-slate-100 shadow-xl flex items-center justify-between group overflow-hidden relative">
              <div className="space-y-6 relative z-10">
                   <h4 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">فلترة التنبيهات الذكية</h4>
                   <p className="text-slate-500 text-sm italic font-medium leading-relaxed max-w-xs">تخصيص مستويات التنبيه (Webhooks, Email, Slack) بناءً على خطورة الحادثة ومجالها التقني.</p>
                   <button className="px-8 py-3 bg-slate-900 text-white rounded-[20px] font-black uppercase tracking-widest text-[10px] hover:bg-rose-600 transition-all active:scale-95 shadow-xl shadow-slate-900/10">
                      إدارة قنوات الإرسال
                   </button>
              </div>
              <div className="hidden lg:flex w-40 h-40 rounded-full bg-slate-50 items-center justify-center relative translate-x-10 translate-y-10 group-hover:scale-110 transition-transform duration-1000">
                  <Terminal className="w-16 h-16 text-slate-200" />
              </div>
          </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-black text-slate-900 italic uppercase">سجل أحداث النظام</h3>
            <button className="text-slate-300 hover:text-slate-900 transition-colors">
                <Filter className="w-5 h-5" />
            </button>
        </div>
        <div className="divide-y divide-slate-50">
           {alerts.map((alert, idx) => (
               <div key={idx} className="p-8 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer">
                   <div className="flex gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${
                            alert.priority === 'critical' ? 'bg-rose-50 text-rose-600 ring-4 ring-rose-50' : 'bg-slate-50 text-slate-400'
                        }`}>
                           {alert.type === 'database' ? <DatabaseIcon className="w-7 h-7" /> : alert.type === 'security' ? <ShieldAlert className="w-7 h-7" /> : <Server className="w-7 h-7" />}
                        </div>
                        <div>
                             <div className="flex items-center gap-3 mb-1">
                                <span className={`text-[9px] font-black uppercase tracking-tight px-1.5 py-0.5 rounded-lg ${
                                    alert.priority === 'critical' ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-100 text-slate-400'
                                }`}>
                                    {alert.type}
                                </span>
                                <span className="text-[10px] font-black text-slate-300 italic flex items-center gap-1 font-mono">
                                    <Clock className="w-3 h-3" />
                                    {alert.time}
                                </span>
                             </div>
                             <h4 className="text-xl font-black text-slate-900 group-hover:text-rose-600 transition-colors italic tracking-tight uppercase leading-none">{alert.title}</h4>
                             <p className="text-sm font-bold text-slate-400 mt-2 italic">{alert.desc}</p>
                        </div>
                   </div>
                   <div className="flex items-center gap-4">
                        <button className="px-6 py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all italic">
                            DEBUG LOGS
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

const DatabaseIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
);
