import React from "react";
import { motion } from "motion/react";
import { Layout, Plus, Search, Filter, Clock, Users, ChevronLeft, ArrowRight, MoreVertical, Layers } from "lucide-react";

export const CouncilProjects: React.FC = () => {
  const projects = [
    { title: "مشروع السلة الغذائية الرمضانية", status: "نشط", progress: 85, team: 4, deadline: "٢٠ مايو", category: "إغاثة" },
    { title: "ترميم مخازن الأمانة", status: "مجدول", progress: 0, team: 8, deadline: "١ يونيو", category: "بنية تحتية" },
    { title: "توزيع مياه صالحة للشرب", status: "نشط", progress: 62, team: 12, deadline: "١٥ مايو", category: "مياه" },
    { title: "تحديث قاعدة بيانات المستفيدين", status: "مراجعة", progress: 95, team: 3, deadline: "غداً", category: "تقني" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in slide-in-from-right-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">إدارة المشاريع</h2>
          <p className="text-slate-500 font-medium italic">تخطيط ومتابعة تنفيذ المشاريع الاستراتيجية والتشغيلية</p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 active:scale-95">
                <Plus className="w-4 h-4" />
                إنشاء مشروع جديد
            </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
              <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
              <input 
                  type="text" 
                  placeholder="البحث في المشاريع والمبادرات..." 
                  className="w-full py-4 pr-14 pl-6 bg-white border border-slate-100 rounded-3xl shadow-sm focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none transition-all font-medium italic"
              />
          </div>
          <button className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-400 hover:text-indigo-600 transition-all">
              <Filter className="w-6 h-6" />
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between"
          >
            <div>
                <div className="flex justify-between items-start mb-6">
                    <span className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-tight ${
                        p.status === 'نشط' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                    }`}>
                        {p.status}
                    </span>
                    <button className="text-slate-300 hover:text-slate-900 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
                <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors italic leading-tight mb-2">{p.title}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.category}</p>
            </div>

            <div className="mt-8 space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest italic text-slate-400">
                        <span>الإنجاز</span>
                        <span>{p.progress}%</span>
                    </div>
                    <div className="h-1 bg-slate-50 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${p.progress}%` }}
                            className="h-full bg-indigo-500 rounded-full"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex -space-x-2">
                        {[...Array(p.team)].slice(0, 3).map((_, idx) => (
                            <div key={idx} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-400">
                                {idx + 1}
                            </div>
                        ))}
                        {p.team > 3 && (
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-500 flex items-center justify-center text-[8px] font-black text-white">
                                +{p.team - 3}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                        <Clock className="w-3 h-3" />
                        {p.deadline}
                    </div>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[48px] p-10 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative shadow-2xl">
          <div className="relative z-10 space-y-6 max-w-lg">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] italic mb-4 block">System Intelligence</span>
              <h3 className="text-4xl font-black italic tracking-tighter leading-tight">تكامل الموارد والمشاريع</h3>
              <p className="text-slate-400 font-medium italic">استخدم الذكاء الاصطناعي لتحسين توزيع فريق العمل وتقليل العجز في الميزانية التشغيلية للمشاريع الجارية.</p>
              <button className="flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-[28px] font-black uppercase tracking-[0.2em] text-xs hover:bg-emerald-400 hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95 leading-none">
                  عرض التوصيات الذكية
                  <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
          </div>
          <div className="relative z-10 w-full md:w-80 h-80 bg-white/5 rounded-[48px] border border-white/10 flex items-center justify-center p-8 backdrop-blur-3xl group cursor-pointer hover:bg-white/10 transition-all duration-700">
              <Layers className="w-32 h-32 text-white/10 group-hover:scale-110 group-hover:text-emerald-400/20 transition-all duration-1000" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-40 group-hover:opacity-100 transition-opacity">
                   <span className="text-6xl font-black italic -mb-2">٤٢</span>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em]">Resource Units</span>
              </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>
    </div>
  );
};
