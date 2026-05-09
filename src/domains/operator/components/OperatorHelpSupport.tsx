import React from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  MessageCircle, 
  BookOpen, 
  FileText, 
  ShieldCheck, 
  Video, 
  Phone, 
  Mail,
  ChevronRight,
  Search,
  ExternalLink,
  MessageSquare,
  LifeBuoy,
  Clock
} from 'lucide-react';
import { cn } from '../../core/utils/cn';

const faqCategories = [
  { title: 'إدارة البلاغات', icon: <FileText size={20} />, count: '١٢ مقال' },
  { title: 'لوحة التحكم', icon: <BookOpen size={20} />, count: '٨ مقالات' },
  { title: 'الأمن والخصوصية', icon: <ShieldCheck size={20} />, count: '٥ مقالات' },
  { title: 'استكشاف الأخطاء', icon: <HelpCircle size={20} />, count: '١٥ مقال' },
];

export const OperatorHelpSupport: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 w-full" dir="rtl">
      <header className="px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-indigo-100">
            <LifeBuoy size={12} />
            مركز المساعدة والتمكين التشغيلي
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">المساعدة والدعم</h1>
        <p className="text-sm font-bold text-slate-400 italic">كل ما تحتاجه للارتقاء بأدائك التشغيلي، فهم المنصة، والحصول على الدعم الفني المباشر</p>
      </header>

      <div className="bg-indigo-600 p-12 rounded-[4rem] text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
               <div className="flex-1">
                   <h2 className="text-3xl font-black mb-4">كيف يمكننا مساعدتك اليوم؟</h2>
                   <div className="relative group max-w-xl">
                       <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors" size={24} />
                       <input 
                         type="text" 
                         placeholder="ابحث عن أدلة الاستخدام، دروس الفيديو، أو مقالات الدعم..." 
                         className="w-full pl-8 pr-16 py-6 bg-white/10 border border-white/20 rounded-[2.5rem] text-lg font-bold placeholder:text-white/30 outline-none focus:bg-white/20 transition-all text-white"
                       />
                   </div>
               </div>
               <div className="flex gap-4">
                    <div className="flex flex-col gap-3">
                         <button className="px-8 py-5 bg-white text-indigo-600 rounded-3xl font-black text-sm hover:bg-slate-50 transition-all shadow-2xl flex items-center gap-3">
                             <MessageSquare size={18} />
                             دردشة الدعم الفني
                         </button>
                         <button className="px-8 py-5 bg-white/10 border border-white/20 text-white rounded-3xl font-black text-sm hover:bg-white/20 transition-all flex items-center gap-3">
                             <Phone size={18} />
                             اتصال بمدير النظام
                         </button>
                    </div>
               </div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {faqCategories.map((cat, i) => (
                <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm group hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all text-center">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        {cat.icon}
                    </div>
                    <h3 className="text-base font-black text-slate-900 mb-1">{cat.title}</h3>
                    <p className="text-[11px] font-bold text-slate-400 mb-6 italic">{cat.count}</p>
                    <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">عرض المقالات</button>
                </div>
           ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm h-fit">
              <h3 className="text-2xl font-black text-slate-900 mb-8 border-b border-slate-50 pb-8 uppercase">شروحات مرئية سريعة</h3>
              <div className="space-y-6">
                   {[
                       { title: 'كيفية إنشاء بلاغ سيادي طارئ', duration: '٥:١٢ دقيقة', thumb: 'rose' },
                       { title: 'إدارة محادثات المواطنين بذكاء', duration: '٣:٤٥ دقيقة', thumb: 'blue' },
                       { title: 'تفسير خرائط الكثافة التشغيلية', duration: '٧:٢٠ دقيقة', thumb: 'emerald' },
                   ].map((video, k) => (
                       <div key={k} className="flex items-center gap-6 group cursor-pointer p-4 rounded-3xl hover:bg-slate-50 transition-all">
                           <div className={cn("w-28 h-20 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-lg", `bg-${video.thumb}-600`)}>
                               <Video size={24} />
                           </div>
                           <div className="flex-1">
                               <h4 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">{video.title}</h4>
                               <p className="text-[10px] font-bold text-slate-400 italic flex items-center gap-1">
                                   <Clock size={12} />
                                   {video.duration}
                               </p>
                           </div>
                           <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-all" />
                       </div>
                   ))}
              </div>
          </div>

          <div className="space-y-8">
              <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm">
                  <h3 className="text-2xl font-black text-slate-900 mb-6">تواصل معنا</h3>
                  <div className="space-y-6">
                       <a href="mailto:support@platform.gov" className="flex items-center gap-5 p-6 bg-slate-50 rounded-3xl hover:bg-slate-100 transition-all group">
                           <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-colors shadow-sm">
                               <Mail size={20} />
                           </div>
                           <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase mb-0.5">البريد الإلكتروني</p>
                               <p className="text-sm font-black text-slate-900 underline">support@platform.gov</p>
                           </div>
                       </a>
                       <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-3xl group">
                           <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
                               <Phone size={20} />
                           </div>
                           <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase mb-0.5">الخط الساخن للمشغلين</p>
                               <p className="text-sm font-black text-slate-900 tracking-widest">٨٠٠ - ٩٩٩ - ١١١</p>
                           </div>
                       </div>
                  </div>
              </div>

              <div className="bg-slate-950 p-12 rounded-[4rem] text-white">
                  <h3 className="text-xl font-black mb-4">هل لديك اقتراح لتطوير المنصة؟</h3>
                  <p className="text-xs font-bold text-slate-500 italic mb-8 leading-relaxed">نحن نقدر رؤية المشغلين في الميدان لتطوير ميزات النظام وتسهيل المهام.</p>
                  <button className="w-full py-5 bg-white text-slate-950 rounded-[2rem] font-black text-sm hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-3">
                      إرسال فكرة تطوير
                      <ExternalLink size={18} />
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};
