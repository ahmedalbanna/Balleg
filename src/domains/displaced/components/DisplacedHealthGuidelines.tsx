import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Flame, Droplets, Wind, Zap, Skull, HeartPulse, ExternalLink } from "lucide-react";

export const DisplacedHealthGuidelines: React.FC = () => {
  const guidelines = [
    { title: "تعقيم المياه", desc: "طرق منزلية لضمان سلامة مياه الشرب عند انقطاع الإمدادات.", icon: Droplets, color: "blue" },
    { title: "الإسعافات الأولية", desc: "دليل التعامل السريع مع الحروق والكسور والجروح المفتوحة.", icon: HeartPulse, color: "rose" },
    { title: "النظافة العامة", desc: "منع انتشار الأوبئة في التجمعات المزدحمة ومراكز الإيواء.", icon: ShieldCheck, color: "emerald" },
    { title: "إدارة التدفئة", desc: "استخدام آمن لمصادر الحرارة وتجنب الاختناق بغاز الكربون.", icon: Flame, color: "orange" },
  ];

  const emergencyAlerts = [
    { type: "كوليرا", status: "تحذير متوسط", date: "اليوم", location: "المنطقة الوسطى" },
    { type: "جفاف", status: "تنبيه عام", date: "منذ أمس", location: "كافة المناطق" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-12 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-8">
            <header>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase mb-2">الإرشادات الصحية</h2>
                <p className="text-slate-500 font-medium">معلومات حيوية للحفاظ على سلامتك وسلامة عائلتك في ظروف الطوارئ</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {guidelines.map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
                    >
                        <div className={`w-14 h-14 rounded-2xl bg-${item.color}-50 flex items-center justify-center text-${item.color}-600 mb-6 group-hover:bg-${item.color}-600 group-hover:text-white transition-colors`}>
                            <item.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                        <button className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest hover:underline">
                            اقرأ الدليل الكامل
                            <ExternalLink className="w-3 h-3" />
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>

        <aside className="lg:w-1/3 space-y-8">
            <div className="bg-rose-50 rounded-[32px] p-8 border border-rose-100">
                <div className="flex items-center gap-3 mb-6">
                    <Skull className="w-6 h-6 text-rose-600" />
                    <h3 className="font-black text-rose-900 uppercase tracking-widest">تنبيهات وبائية</h3>
                </div>
                <div className="space-y-4">
                    {emergencyAlerts.map((alert, i) => (
                        <div key={i} className="bg-white/60 p-4 rounded-2xl border border-rose-200">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-slate-900">{alert.type}</h4>
                                <span className="text-[10px] font-black text-rose-600 uppercase bg-rose-100 px-2 py-1 rounded">نشط</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>{alert.location}</span>
                                <span>{alert.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-slate-900 rounded-[32px] p-8 text-white">
                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    خلفية الطوارئ
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    في حال حدوث طوارئ صحية حادة، يرجى التوجه فوراً لأقرب نقطة طبية أو طلب المساعدة عبر الرقم الموحد.
                </p>
                <button className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg shadow-rose-900/40">
                    اتصال طوارئ سريع
                </button>
            </div>
        </aside>
      </div>
    </div>
  );
};
