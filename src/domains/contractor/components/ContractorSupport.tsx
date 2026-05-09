import React from "react";
import { motion } from "motion/react";
import { HelpCircle, MessageSquare, Phone, Mail, Search, ChevronLeft, ArrowRight, ExternalLink, ShieldCheck, HeartHandshake, Wrench, HardHat, FileText } from "lucide-react";

export const ContractorSupport: React.FC = () => {
  const guides = [
    { title: "دليل معايير التشييد في المناطق الجبلية", category: "هندسه", date: "٢٠٢٦" },
    { title: "كتيب صيانة المولدات الكهربائية ١٠٠ ك.و", category: "معدات", date: "٢٠٢٥" },
    { title: "إجراءات السلامة في التوزيع الميداني", category: "سلامة", date: "٢٠٢٦" },
    { title: "دليل استخدام تطبيق المراقبة الميدانية", category: "تقني", date: "٢٠٢٦" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800 max-w-6xl mx-auto">
      <div className="text-center space-y-6">
        <h2 className="text-4xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center justify-center gap-4">
            المساعدة والدعم الفني
            <Wrench className="w-10 h-10 text-amber-600" />
        </h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto italic">دعم هندسي وتشغيلي متخصص لضمان جودة التنفيذ وسلامة الكوادر في الميدان</p>
        
        <div className="relative max-w-2xl mx-auto group">
          <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors w-5 h-5" />
          <input 
            type="text" 
            placeholder="البحث في الأدلة الفنية والمواصفات القياسية..."
            className="w-full py-5 pr-14 pl-8 bg-white border border-slate-100 rounded-[30px] shadow-2xl shadow-slate-200/40 focus:ring-4 focus:ring-amber-50 focus:border-amber-200 transition-all text-lg font-medium outline-none text-center italic"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'دعم هندسي', desc: 'استشارات التصميم والإنشاء', icon: HardHat, color: 'amber' },
          { title: 'صيانة المعدات', desc: 'دعم فني للأعطال الميدانية', icon: Wrench, color: 'blue' },
          { title: 'لوائح الجودة', desc: 'دليل الامتثال والمواصفات', icon: ShieldCheck, color: 'emerald' },
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

      <div className="bg-white rounded-[48px] p-10 md:p-14 border border-slate-100 shadow-2xl shadow-slate-200/50">
        <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl font-black text-slate-900 italic uppercase">المكتبة الفنية والوثائق</h3>
            <ExternalLink className="w-6 h-6 text-slate-200" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-slate-50/50 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer flex items-center justify-between group">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-amber-600 transition-colors">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{guide.title}</h4>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{guide.category} • {guide.date}</p>
                        </div>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-slate-300 group-hover:text-amber-600 transition-all rotate-180" />
                </div>
            ))}
        </div>
        <div className="mt-12 text-center">
            <button className="px-10 py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-xs hover:bg-amber-600 transition-all shadow-xl shadow-slate-900/10">
                فتح تذكرة دعم فني جديدة
            </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-600 to-slate-900 rounded-[48px] p-14 text-white relative overflow-hidden flex flex-col items-center text-center shadow-2xl min-h-[400px] justify-center group">
          <div className="relative z-10 space-y-8 max-w-2xl">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-8 backdrop-blur-xl group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-10 h-10 text-amber-400" />
              </div>
              <h3 className="text-5xl font-black italic tracking-tighter leading-none uppercase">شركاء في الإنجاز</h3>
              <p className="text-slate-400 font-medium leading-relaxed text-lg italic italic">فريقنا من المهندسين والخبراء التشغيليين متاح على مدار الساعة لدعم نجاح عملياتكم الميدانية. الجودة والسرعة هي وعدنا للمقاولين الشركاء.</p>
              
              <div className="flex flex-wrap justify-center gap-8 pt-8">
                  <div className="flex items-center gap-3">
                       <Phone className="w-5 h-5 text-amber-400" />
                       <span className="font-black italic uppercase italic tracking-widest text-sm">+٩٦٧ ٧٧٧ ٠٠٠ ٠٠٠</span>
                  </div>
                  <div className="flex items-center gap-3">
                       <Mail className="w-5 h-5 text-blue-400" />
                       <span className="font-black italic uppercase italic tracking-widest text-sm">contractors@souq.ye</span>
                  </div>
              </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] -mr-48 -mt-48" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>
    </div>
  );
};
