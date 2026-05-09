import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Cpu, 
  Star,
  Activity,
  Award
} from 'lucide-react';

export function CitizenAbout() {
  return (
    <div className="max-w-5xl mx-auto py-8" dir="rtl">
      <section className="text-center py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-80 bg-emerald-500/5 rounded-full blur-[120px] -z-10" />
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-emerald-100">
                <Star size={12} className="fill-emerald-500" />
                رؤية المواطن ٢٠٢٤
            </div>
            <h1 className="text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-tight max-w-4xl mx-auto">
                منصة رقمية لتمكين <span className="text-emerald-600 underline decoration-emerald-200 decoration-8 underline-offset-4">المواطن</span> وبناء المستقبل
            </h1>
            <p className="text-lg font-bold text-slate-500 max-w-2xl mx-auto italic leading-relaxed">
                نحن لسنا مجرد تطبيق للبلاغات، بل جسر معرفي وفني يربط بين احتياجات الأحياء وقدرات الهندسة الميدانية لتحقيق جودة حياة استثنائية.
            </p>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-8 mb-24">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-12 rounded-[3.5rem] bg-slate-900 text-white relative overflow-hidden group"
          >
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-[80px]" />
              <h2 className="text-3xl font-black mb-6 relative z-10">رسالتنا</h2>
              <p className="text-sm font-bold text-emerald-100/70 leading-loose italic relative z-10">
                  خلق بيئة تفاعلية شفافة تضمن وصول صوت كل مواطن للمسؤول الفني، وتحويل كل ملاحظة ميدانية إلى مشروع تحسين حقيقي يعود بالنفع على الجميع في أقل وقت ممكن وبأعلى جودة.
              </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-12 rounded-[3.5rem] bg-emerald-600 text-white relative overflow-hidden group"
          >
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-[80px]" />
              <h2 className="text-3xl font-black mb-6 relative z-10">قيمنا</h2>
              <ul className="space-y-4 relative z-10">
                  {[
                      { icon: ShieldCheck, text: 'الشفافية والنزاهة في معالجة البيانات' },
                      { icon: Activity, text: 'السرعة والفعالية في الاستجابة الميدانية' },
                      { icon: Users, text: 'المشاركة المجتمعية الواعية والمسؤولة' },
                      { icon: Award, text: 'التميز التقني في إدارة البنية التحتية' },
                  ].map((val, i) => (
                      <li key={i} className="flex items-center gap-4 text-sm font-bold italic">
                          <val.icon size={20} className="text-emerald-200" />
                          {val.text}
                      </li>
                  ))}
              </ul>
          </motion.div>
      </div>

      <section className="bg-slate-50 py-24 px-8 rounded-[4rem] text-center mb-24">
          <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-12 italic">أرقام نفخر بها</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { val: '+١٠٠ ألف', label: 'مواطن فاعل', icon: Users },
                { val: '+٤٥ ألف', label: 'بلاغ منجز', icon: Zap },
                { val: '٩٤٪', label: 'نسبة الرضا', icon: Heart },
                { val: '+١٥٠', label: 'حي مغطى', icon: MapPin },
              ].map((stat, j) => (
                  <div key={j}>
                      <stat.icon size={28} className="text-emerald-600 mx-auto mb-4" />
                      <p className="text-4xl font-black text-slate-900 mb-1">{stat.val}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{stat.label}</p>
                  </div>
              ))}
          </div>
      </section>

      <section className="px-8 pb-24">
          <div className="p-12 bg-white rounded-[4rem] border border-slate-100 flex flex-col md:flex-row items-center gap-12 shadow-sm">
              <div className="flex-1">
                  <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">نحن نعمل من أجلك</h3>
                  <p className="text-sm font-bold text-slate-500 leading-loose italic mb-8">
                      وراء هذه المنصة طاقم هندسي وفني وإداري متكامل يعمل ٢٤/٧ لضمان سلامة وراحة أحياءنا. شكراً لثقتكم بنا، وشكراً لاهتمامكم بتوثيق ما يحتاج للتحسين.
                  </p>
                  <div className="flex items-center gap-4 text-emerald-600 font-black text-xs uppercase tracking-widest">
                      <div className="w-12 h-px bg-emerald-600/30" />
                      فريق العمل الميداني
                  </div>
              </div>
              <div className="w-full md:w-80 h-64 bg-slate-50 rounded-[3rem] border border-slate-100 overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=800" alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
          </div>
      </section>
    </div>
  );
}
