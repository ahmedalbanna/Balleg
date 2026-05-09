import React from "react";
import { motion } from "motion/react";
import { MessageSquare, Phone, Mail, HelpCircle, Search, ChevronLeft, ArrowRight, ExternalLink } from "lucide-react";

export const MerchantSupport: React.FC = () => {
  const faqs = [
    { q: "كيف يمكنني زيادة عدد منتجاتي المعروضة؟", a: "يمكنك زيادة عدد المنتجات عبر الترقية إلى باقة التجار 'المميزة' التي تتيح إدراج عدد غير محدود من المنتجات." },
    { q: "ما هي المدة اللازمة لمعالجة طلب السحب؟", a: "تتم معالجة طلبات السحب خلال ٢٤ إلى ٤٨ ساعة عمل وتصل إلى حسابك البنكي أو محفظتك المقررة." },
    { q: "هل هناك عمولات على المبيعات؟", a: "نعم، نطبق عمولة تنافسية تبدأ من ٢٪ وتعتمد على فئة المنتجات وحجم المبيعات الشهري." },
  ];

  return (
    <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800 max-w-6xl mx-auto">
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">مركز الدعم الفني للتجار</h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto italic">نحن هنا لضمان سير أعمالك بسلاسة وتقديم الدعم الذي تحتاجه لتحقيق مبيعات أفضل</p>
        
        <div className="relative max-w-2xl mx-auto group">
          <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors w-5 h-5" />
          <input 
            type="text" 
            placeholder="كيف يمكننا مساعدتك اليوم؟"
            className="w-full py-5 pr-14 pl-8 bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-slate-200/40 focus:ring-4 focus:ring-emerald-50 focus:border-emerald-200 transition-all text-lg font-medium outline-none text-center italic"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'محادثة مباشرة', desc: 'متوفر من ٨ ص حتى ١٠ م', icon: MessageSquare, color: 'emerald' },
          { title: 'الاتصال الهاتفي', desc: 'الرقم الموحد: ٨٠٠-٠٠٧', icon: Phone, color: 'indigo' },
          { title: 'البريد الإلكتروني', desc: 'support@souq.ye', icon: Mail, color: 'rose' },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="p-10 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all text-center group cursor-pointer"
          >
            <div className={`w-20 h-20 rounded-[32px] bg-${item.color}-50 flex items-center justify-center text-${item.color}-600 mx-auto mb-8 group-hover:bg-${item.color}-600 group-hover:text-white transition-all duration-700`}>
              <item.icon className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{item.title}</h3>
            <p className="text-slate-500 text-sm mb-8 font-medium italic">{item.desc}</p>
            <ArrowRight className="w-5 h-5 text-slate-200 mx-auto group-hover:text-slate-900 transition-colors rotate-180" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-[48px] p-10 md:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50">
            <div className="flex items-center justify-between mb-12">
                 <h3 className="text-2xl font-black text-slate-900 italic uppercase">الأسئلة الشائعة</h3>
                 <HelpCircle className="w-6 h-6 text-slate-200" />
            </div>
            <div className="space-y-6">
                {faqs.map((faq, idx) => (
                    <details key={idx} className="group p-6 rounded-3xl bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer">
                        <summary className="flex items-center justify-between list-none">
                            <span className="text-lg font-bold text-slate-900 pr-2">{faq.q}</span>
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-open:rotate-180 transition-transform">
                                <ChevronLeft className="w-5 h-5 text-slate-300 group-open:text-emerald-600" />
                            </div>
                        </summary>
                        <div className="mt-6 text-slate-500 leading-relaxed font-bold italic animate-in slide-in-from-top-2 duration-300 px-2">
                            {faq.a}
                        </div>
                    </details>
                ))}
            </div>
            <button className="w-full mt-10 py-5 border-2 border-slate-50 text-slate-400 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                عرض جميع الأسئلة والحلول
            </button>
          </div>

          <div className="bg-slate-900 rounded-[48px] p-12 text-white relative overflow-hidden flex flex-col h-full shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <div className="relative z-10 flex-1">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-4 block">Merchant Success</span>
                  <h3 className="text-4xl font-black mb-6 italic tracking-tighter leading-tight">هل تحتاج إلى استشارة خاصة لنمو متجرك؟</h3>
                  <p className="text-slate-400 font-medium leading-relaxed mb-12">فريق متخصص من خبراء المبيعات والتسويق متاح لمساعدتك في تحليل أدائك وتقديم حلول لزيادة أرباحك.</p>
                  
                  <ul className="space-y-4 mb-12">
                      {['تحليل المبيعات', 'تحسين ظهور المنتجات', 'إدارة المخزون الذكية'].map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm font-bold opacity-80">
                              <ExternalLink className="w-4 h-4 text-indigo-400" />
                              {feature}
                          </li>
                      ))}
                  </ul>

                  <button className="w-full py-6 bg-white text-slate-900 rounded-[28px] font-black uppercase tracking-[0.2em] hover:bg-indigo-400 hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95 leading-none">
                      احجز موعد استشارة
                  </button>
              </div>
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] -mr-40 -mt-40" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />
          </div>
      </div>
    </div>
  );
};
