import React from "react";
import { motion } from "motion/react";
import { HelpCircle, MessageSquare, Phone, Mail, Search, ChevronLeft, ArrowRight, ExternalLink, ShieldCheck, HeartHandshake, Wrench, HardHat, FileText, Globe } from "lucide-react";

export const DonorSupport: React.FC = () => {
  const guides = [
    { title: 'دليل المتبرع الجديد', category: 'الأساسيات', time: '٥ دقائق قراءة' },
    { title: 'كيفية قراءة تقارير الأثر', category: 'الشفافية', time: '٨ دقائق قراءة' },
    { title: 'إدارة طرق الدفع والأمان', category: 'الخصوصية', time: '٤ دقائق قراءة' },
  ];

  return (
    <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800 font-sans">
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center justify-center gap-4">
            مركز المساعدة
            <HelpCircle className="w-10 h-10 text-rose-600" />
        </h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto italic">نحن هنا لضمان أن تكون تجربتك في العطاء سلسة، آمنة ومجزية. تواصل معنا لأي استفسار تقني أو إنساني.</p>
        
        <div className="relative max-w-2xl mx-auto group">
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors w-5 h-5" />
            <input 
                type="text" 
                placeholder="كيف يمكننا مساعدتك اليوم؟" 
                className="w-full py-5 pr-14 pl-8 bg-white border border-slate-100 rounded-[30px] shadow-2xl shadow-slate-200/40 focus:ring-4 focus:ring-rose-50 focus:border-rose-200 transition-all text-lg font-medium outline-none text-center italic"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'اتصال مباشر', desc: 'تواصل مع فريق الدفع', icon: Phone, color: 'rose' },
          { title: 'محادثة فورية', desc: 'دعم فني على مدار الساعة', icon: MessageSquare, color: 'blue' },
          { title: 'البريد الإلكتروني', desc: 'للاستفسارات الرسمية والتقارير', icon: Mail, color: 'emerald' },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all text-center group cursor-pointer"
          >
            <div className={`w-16 h-16 rounded-[24px] bg-${item.color}-50 flex items-center justify-center text-${item.color}-600 mx-auto mb-6 group-hover:bg-${item.color}-600 group-hover:text-white transition-all duration-700 shadow-sm border border-${item.color}-100`}>
              <item.icon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2 uppercase tracking-tighter italic">{item.title}</h3>
            <p className="text-slate-400 text-xs font-medium italic">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 items-start">
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800">الأسئلة الشائعة</h3>
                <button className="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:underline italic">كل الأسئلة</button>
            </div>
            <div className="space-y-4">
                {[
                  'كيف أضمن وصول تبرعي للمستفيد؟',
                  'هل يمكنني استعادة مبالغ التبرع؟',
                  'كيف أحصل على شهادة شكر موثقة؟',
                  'ما هي رسوم التشغيل للمنصة؟'
                ].map((q, i) => (
                  <div key={i} className="p-6 bg-white rounded-[24px] border border-slate-50 flex items-center justify-between group hover:border-rose-200 transition-all cursor-pointer">
                    <span className="font-bold text-slate-700 italic">{q}</span>
                    <ChevronLeft className="w-5 h-5 text-slate-300 group-hover:text-rose-600 transition-all" />
                  </div>
                ))}
            </div>
        </div>

        <div className="bg-slate-900 rounded-[48px] p-10 md:p-14 text-white space-y-10 relative overflow-hidden shadow-2xl">
            <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-tight relative z-10">أدلة وموارد العطاء</h3>
            <div className="space-y-6 relative z-10">
                {guides.map((guide, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer p-4 rounded-2xl hover:bg-white/5 transition-all">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                                <FileText className="w-6 h-6 text-rose-400" />
                            </div>
                            <div>
                                <h4 className="font-black italic text-slate-200 group-hover:text-white transition-colors">{guide.title}</h4>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{guide.category} • {guide.time}</span>
                            </div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-slate-600 group-hover:text-rose-500 group-hover:translate-x-2 transition-all rotate-180" />
                    </div>
                ))}
            </div>
            <button className="w-full py-6 bg-rose-600 text-white rounded-[24px] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-rose-900/10 relative z-10">
                زيارة قاعدة المعرفة الكاملة
            </button>
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px] -mr-40 -mt-40" />
        </div>
      </div>
    </div>
  );
};
