import React from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  MessageCircle, 
  PhoneCall, 
  FileText, 
  ChevronRight, 
  Search, 
  UserPlus, 
  MessageSquare,
  Globe,
  ShieldCheck,
  Cpu,
  Zap,
  ArrowRight
} from 'lucide-react';
import { cn } from '../../core/utils/cn';

export function CitizenSupport() {
  const faqs = [
    { q: 'كيف يمكنني تقديم بلاغ طارئ؟', a: 'يمكنك التوجه لصفحة "تقديم بلاغ جديد" واختيار الأهمية "عاجل"، وسيتم التعامل معه كأولوية قصوى.' },
    { q: 'هل يمكنني تعديل البلاغ بعد إرساله؟', a: 'حالياً لا يمكن التعديل المباشر، ولكن يمكنك إضافة ملاحظة عبر مركز الاتصال الموحد.' },
    { q: 'ما هي المدة المتوقعة لحل المشكلة؟', a: 'تعتمد المدة على نوع القسم، ولكن متوسط الاستجابة هو ٤٨ ساعة عمل للمهام العادية.' },
    { q: 'كيف أعرف من هو المسؤول عن حيي؟', a: 'يمكنك مراجعة صفحة "خريطة المنطقة" والضغط على أيقونة الحي لمشاهدة تفاصيل الفريق الميداني.' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4" dir="rtl">
      <header className="text-center mb-16 px-4">
        <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">كيف يمكننا مساعدتك؟</h1>
        <p className="text-sm font-bold text-slate-400 max-w-2xl mx-auto italic leading-relaxed">
            فريق الدعم الفني والميداني موجود لخدمتك على مدار الساعة، اختر الوسيلة المفضلة للتواصل معنا.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 px-4">
          {[
              { label: 'المحادثة الحية', desc: 'تواصل مباشرة مع أحد ممثلينا', icon: MessageSquare, color: 'emerald' },
              { label: 'الخط الساخن', desc: 'اتصل بنا على الرقم الموحد ٨٠٠٠', icon: PhoneCall, color: 'blue' },
              { label: 'قاعدة المعرفة', desc: 'تصفح أدلة الاستخدام والأسئلة الشائعة', icon: Globe, color: 'amber' },
          ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 text-center group cursor-pointer"
              >
                  <div className={cn(
                      "w-16 h-16 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110 shadow-lg",
                      item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 shadow-emerald-100' : 
                      item.color === 'blue' ? 'bg-blue-50 text-blue-600 shadow-blue-100' : 'bg-amber-50 text-amber-600 shadow-amber-100'
                  )}>
                      <item.icon size={32} />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">{item.label}</h3>
                  <p className="text-[11px] font-bold text-slate-400 italic">{item.desc}</p>
              </motion.div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 px-4">
          <div className="lg:col-span-3 space-y-8">
              <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest px-4 italic">الأسئلة الأكثر شيوعاً</h3>
              <div className="space-y-4">
                  {faqs.map((faq, j) => (
                      <div key={j} className="bg-white p-6 rounded-[2rem] border border-slate-50 hover:border-emerald-100 transition-all group overflow-hidden">
                          <div className="flex items-center justify-between gap-4 mb-3">
                              <h4 className="text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors">{faq.q}</h4>
                              <div className="shrink-0 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                                  <ChevronRight size={16} />
                              </div>
                          </div>
                          <p className="text-[11px] font-bold text-slate-500 leading-relaxed italic">{faq.a}</p>
                      </div>
                  ))}
              </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
              <div className="bg-emerald-900 p-10 rounded-[3rem] text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <h4 className="text-lg font-black mb-4 relative z-10">هل تحتاج لزيارة ميدانية؟</h4>
                  <p className="text-[11px] font-bold text-emerald-100 mb-8 leading-relaxed italic relative z-10">
                      يمكنك طلب زيارة من الفريق الفني لتقييم مشكلة معينة في ممتلكاتك العامة بالقرب منك.
                  </p>
                  <button className="w-full py-4 bg-white text-emerald-900 rounded-2xl font-black text-sm hover:bg-emerald-50 transition-all active:scale-95 flex items-center justify-center gap-2 group">
                      طلب زيارة تقنية
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
              </div>

              <div className="bg-white p-8 rounded-[3rem] border border-slate-100 space-y-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-4 px-2">
                      <ShieldCheck size={20} className="text-blue-600" />
                      <h4 className="text-xs font-black text-slate-900 tracking-wider uppercase italic">مواثيق الخدمة</h4>
                  </div>
                  {[
                      'اتفاقية مستوى الخدمة الرقمية',
                      'دليل حقوق وواجبات المواطن',
                      'سياسة الخصوصية وحماية البيانات',
                  ].map((doc, k) => (
                      <button key={k} className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl text-[11px] font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all group">
                          {doc}
                          <FileText size={16} className="text-slate-300 group-hover:text-slate-500" />
                      </button>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
}
