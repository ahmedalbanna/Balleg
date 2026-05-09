import React from "react";
import { motion } from "motion/react";
import { Send, Package, HeartPulse, Home, Car, Utensils } from "lucide-react";

export const DisplacedAidRequests: React.FC = () => {
  const aidCategories = [
    { id: 1, title: "طرد غذائي", desc: "لحوم، معلبات، مواد أساسية", icon: Utensils, color: "orange" },
    { id: 2, title: "مساعدة طبية", desc: "أدوية، فحص دوري، ضمادات", icon: HeartPulse, color: "rose" },
    { id: 3, title: "إيواء وطوارئ", desc: "خيام، فرشات، أدوات مطبخ", icon: Home, color: "blue" },
    { id: 4, title: "نقل ومواصلات", desc: "تنقل للمراكز الطبية أو الحكومية", icon: Car, color: "slate" },
    { id: 5, title: "مستلزمات عامة", desc: "ملابس، منظفات، أدوات إنارة", icon: Package, color: "indigo" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-12">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase mb-2">تقديم طلب مساعدة</h2>
        <p className="text-slate-500 font-medium">اختر النوع المناسب لطلبك وسنقوم بالرد وفق الأولوية والحالة</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {aidCategories.map((cat, i) => (
          <motion.div
            key={cat.id}
            whileHover={{ y: -10 }}
            className="group relative bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden cursor-pointer"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${cat.color}-500/5 rounded-bl-[100px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`} />
            
            <div className={`w-16 h-16 rounded-3xl bg-${cat.color}-50 flex items-center justify-center text-${cat.color}-600 mb-8 border border-${cat.color}-100 group-hover:bg-${cat.color}-600 group-hover:text-white transition-all duration-500`}>
              <cat.icon className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-2">{cat.title}</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">{cat.desc}</p>

            <button className="flex items-center gap-3 text-slate-900 font-black text-sm uppercase tracking-widest group-hover:gap-5 transition-all">
              تقديم طلب الآن
              <Send className="w-4 h-4 text-indigo-600" />
            </button>
          </motion.div>
        ))}

        <div className="lg:col-span-1 bg-slate-900 rounded-[32px] p-8 text-white flex flex-col justify-between overflow-hidden relative border border-slate-800 shadow-2xl">
            <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4 italic">طلب مخصص</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">إذا كان طلبك غير مدرج أعلاه، يرجى تقديم وصف دقيق لاحتياجاتك الحالية وسنقوم بدراستها بشكل فوري.</p>
            </div>
            
            <div className="space-y-4">
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-1/3" />
                </div>
                <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">
                    تعبئة طلب خاص
                </button>
            </div>

            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
};
