import React from "react";
import { motion } from "motion/react";
import { HelpCircle, MessageSquare, Phone, Mail, Search, ChevronLeft, ArrowRight, ExternalLink, ShieldCheck, HeartHandshake } from "lucide-react";

export const CouncilSupport: React.FC = () => {
  const faqs = [
    { q: "كيف تتم مراجعة التقارير المالية لشركاء التوزيع؟", a: "تخضع كافة التقارير لعملية تدقيق ثلاثية المراحل تشمل مراجعة البيانات الرقمية، المطابقة الميدانية، واعتماد المفتش العام عبر نظام سلاسل الكتل (Blockchain) لضمان الشفافية." },
    { q: "ما هي بروتوكولات التدخل السريع في الأزمات الميدانية؟", a: "يتم تفعيل وضع 'الطوارئ الاستباقي' عند استلام بلاغين متقاطعين من المراقب والمستلم، مما يخول المركز بتغيير مسارات التوريد مؤقتاً لضمان وصول المساعدات." },
    { q: "كيف يمكن الحصول على نسخة مصدقة من الأرشيف التاريخي؟", a: "يجب تقديم طلب رسمي عبر قسم 'الأرشيف التاريخي' مع توضيح غرض الاستخدام، حيث يتم توفير النسخة الرقمية المصدقة خلال ٢٤ ساعة عمل." },
  ];

  return (
    <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800 max-w-6xl mx-auto">
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase flex items-center justify-center gap-4">
            مركز الدعم والامتثال
            <HeartHandshake className="w-10 h-10 text-indigo-600" />
        </h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto italic">دعم فني وتنظيمي متخصص لضمان سير العمليات بوعي كامل وقرارات مستنيرة</p>
        
        <div className="relative max-w-2xl mx-auto group">
          <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
          <input 
            type="text" 
            placeholder="البحث في الدليل المعرفي واللوائح..."
            className="w-full py-5 pr-14 pl-8 bg-white border border-slate-100 rounded-[30px] shadow-2xl shadow-slate-200/40 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition-all text-lg font-medium outline-none text-center italic"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'دعم القرار', desc: 'مساعدة فورية في اللوائح', icon: HelpCircle, color: 'indigo' },
          { title: 'العمليات الميدانية', desc: 'دعم مراقبي السلوك الميداني', icon: MessageSquare, color: 'emerald' },
          { title: 'الخط التفتيشي', desc: 'للبلاغات الحساسة والسرية', icon: ShieldCheck, color: 'rose' },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="p-10 bg-white rounded-[48px] border border-slate-100 shadow-sm hover:shadow-xl transition-all text-center group cursor-pointer"
          >
            <div className={`w-20 h-20 rounded-[32px] bg-${item.color}-50 flex items-center justify-center text-${item.color}-600 mx-auto mb-8 group-hover:bg-${item.color}-600 group-hover:text-white transition-all duration-700 shadow-sm`}>
              <item.icon className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{item.title}</h3>
            <p className="text-slate-500 text-sm mb-8 font-medium italic leading-relaxed">{item.desc}</p>
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mx-auto group-hover:bg-slate-900 transition-all">
               <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors rotate-180" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="bg-white rounded-[48px] p-10 md:p-14 border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col justify-between h-full">
            <div>
                <div className="flex items-center justify-between mb-12">
                    <h3 className="text-2xl font-black text-slate-900 italic uppercase">القواعد المعرفية واللوائح</h3>
                    <ExternalLink className="w-6 h-6 text-slate-200" />
                </div>
                <div className="space-y-6">
                    {faqs.map((faq, idx) => (
                        <details key={idx} className="group p-6 rounded-3xl bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer">
                            <summary className="flex items-center justify-between list-none">
                                <span className="text-lg font-bold text-slate-900 pr-2">{faq.q}</span>
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-open:rotate-180 transition-transform shrink-0">
                                    <ChevronLeft className="w-5 h-5 text-slate-300 group-open:text-indigo-600 rotate-180" />
                                </div>
                            </summary>
                            <div className="mt-6 text-slate-500 leading-relaxed font-bold italic animate-in slide-in-from-top-2 duration-300 px-2 border-r-4 border-indigo-100">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
            <button className="w-full mt-10 py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10">
                طلب استشارة قانونية/تنظيمية
            </button>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[48px] p-14 text-white relative overflow-hidden flex flex-col h-full shadow-2xl justify-between min-h-[600px]">
              <div className="relative z-10">
                  <header className="flex justify-between items-start mb-12">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-2xl shadow-indigo-500/20">
                          <HeartHandshake className="w-10 h-10" />
                      </div>
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] italic mb-4">Integrity First</span>
                  </header>
                  <h3 className="text-5xl font-black mb-8 italic tracking-tighter leading-[1.1] uppercase">إرث من الثقة والامتياز</h3>
                  <p className="text-slate-400 font-medium leading-relaxed mb-12 text-lg italic">نحن هنا لتمكينك، كل استفسار أو شكوى تساهم في بناء نظام إنساني أكثر عدلاً وكفاءة. تواصل معنا بشفافية كاملة.</p>
                  
                  <div className="grid grid-cols-2 gap-6">
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                           <Phone className="w-8 h-8 text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
                           <h5 className="font-black uppercase tracking-tight">الدعم المباشر</h5>
                           <p className="text-xs text-slate-500 mt-1 uppercase italic">+٩٦٧ ١ ٢٣٤ ٥٦٧</p>
                      </div>
                      <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                           <Mail className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
                           <h5 className="font-black uppercase tracking-tight">البريد الإلكتروني</h5>
                           <p className="text-xs text-slate-500 mt-1 uppercase italic">support@souq.ye</p>
                      </div>
                  </div>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -mr-48 -mt-48" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />
          </div>
      </div>
    </div>
  );
};
