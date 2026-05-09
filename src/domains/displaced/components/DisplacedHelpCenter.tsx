import React from "react";
import { motion } from "motion/react";
import { HelpCircle, Search, MessageSquare, Phone, BookOpen, ChevronLeft, ArrowRight } from "lucide-react";

export const DisplacedHelpCenter: React.FC = () => {
  const faqs = [
    { q: "كيف يمكنني تحديث بياناتي المسجلة؟", a: "يمكنك تحديث بياناتك من خلال قسم 'حسابي الشخصي' أو عبر زيارة مكتب المعلومات في أقرب مركز إيواء." },
    { q: "ما هي الأوراق الثبوتية المطلوبة لاستلام المعونات؟", a: "تحتاج إلى البطاقة الشخصية أو أي وثيقة حكومية تثبت هويتك وعدد أفراد الأسرة." },
    { q: "كيف أبلغ عن عطل في مرافق مركز الإيواء؟", a: "عبر التطبيق في قسم 'الاحتياجات' أو بإبلاغ المشرف الميداني مباشرة." },
  ];

  return (
    <div className="p-4 md:p-8 space-y-12 max-w-5xl mx-auto">
      <section className="text-center space-y-6">
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">مركز المساعدة والدعم</h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">نحن هنا للإجابة على استفساراتك وتقديم الدعم اللازم في أسرع وقت ممكن</p>
        
        <div className="relative max-w-2xl mx-auto group">
          <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
          <input 
            type="text" 
            placeholder="ابحث عن إجابات، تعليمات، أو خدمات..."
            className="w-full py-5 pr-14 pl-8 bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/40 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition-all text-lg font-medium outline-none"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'دردشة حية', desc: 'تحدث مع أحد المتطوعين حالاً', icon: MessageSquare, color: 'indigo' },
          { title: 'خط الطوارئ', desc: 'اتصال مباشر بفريق الدعم', icon: Phone, color: 'rose' },
          { title: 'دليل المستخدم', desc: 'شروحات مفصلة للتطبيق', icon: BookOpen, color: 'emerald' },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all text-center group cursor-pointer"
          >
            <div className={`w-16 h-16 rounded-[24px] bg-${item.color}-50 flex items-center justify-center text-${item.color}-600 mx-auto mb-6 group-hover:bg-${item.color}-600 group-hover:text-white transition-colors`}>
              <item.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
            <p className="text-slate-500 text-sm mb-6">{item.desc}</p>
            <ArrowRight className="w-5 h-5 text-slate-300 mx-auto group-hover:text-indigo-600 transition-colors" />
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50">
        <h3 className="text-2xl font-black text-slate-900 mb-10 pb-6 border-b border-slate-50 italic">الأسئلة الأكثر شيوعاً</h3>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group p-6 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer">
              <summary className="flex items-center justify-between list-none">
                <span className="text-lg font-bold text-slate-900 pr-2">{faq.q}</span>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-open:rotate-180 transition-transform">
                  <ChevronLeft className="w-5 h-5 text-slate-400 group-open:text-indigo-600" />
                </div>
              </summary>
              <div className="mt-6 text-slate-500 leading-relaxed font-medium animate-in slide-in-from-top-2 duration-300">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="bg-indigo-600 rounded-[40px] p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="relative z-10 max-w-md">
            <h3 className="text-3xl font-black mb-4 italic uppercase">لم تجد ضالتك؟</h3>
            <p className="text-indigo-100/80 font-medium">اتصل بنا مباشرة وسيقوم فريقنا بمساعدتك في غضون ٢٤ ساعة.</p>
        </div>
        <button className="relative z-10 px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl">
            إرسال بريد إلكتروني
        </button>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/5 rounded-full -ml-20 -mb-20 blur-3xl" />
      </div>
    </div>
  );
};
