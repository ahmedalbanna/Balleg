import React from "react";
import { motion } from "motion/react";
import { Heart, Search, Filter, MapPin, Calendar, Users, ArrowRight, Star, Clock, ShieldCheck, Target } from "lucide-react";

export const DonorProjects: React.FC = () => {
  const projects = [
    { title: "سقيا الأمل", category: "مشاريع المياه", location: "تعز، اليمن", progress: 75, target: "٥٠ ألف $", raised: "٣٧ ألف $", donors: 124, image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800" },
    { title: "نور العلم", category: "التعليم", location: "حضرموت، اليمن", progress: 40, target: "٢٥ ألف $", raised: "١٠ آلاف $", donors: 86, image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800" },
    { title: "الرعاية الصحية المتنقلة", category: "الصحة", location: "الحديدة، اليمن", progress: 90, target: "١٠٠ ألف $", raised: "٩٠ ألف $", donors: 312, image: "https://images.unsplash.com/photo-1584515933487-7798246e530c?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
            <Heart className="w-8 h-8 text-rose-600" />
            مشاريع العطاء
          </h2>
          <p className="text-slate-500 font-bold italic">اكتشف فرص التبرع والمساهمة في تغيير حياة الآلاف عبر مشاريع تنموية مستدامة</p>
        </div>
        <div className="flex gap-3">
            <button className="flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-rose-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 leading-none">
                <Target className="w-4 h-4" />
                المشاريع العاجلة
            </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
               { label: 'إجمالي المشاريع', val: '٤٢', color: 'rose', icon: Heart },
               { label: 'مشاريع مكتملة', val: '١٨', color: 'emerald', icon: ShieldCheck },
               { label: 'ساعات التطوع', val: '١,٢٤٠', color: 'blue', icon: Clock },
               { label: 'المستفيدين', val: '+٥٠ألف', color: 'amber', icon: Users },
           ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
                    <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{stat.label}</span>
                        <h3 className="text-3xl font-black text-slate-900 mt-1 font-mono tracking-tighter">{stat.val}</h3>
                    </div>
                    <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-7 h-7" />
                    </div>
                </div>
           ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative flex-1 group">
                 <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors w-5 h-5" />
                 <input 
                    type="text" 
                    placeholder="ابحث عن مشروع محدد..." 
                    className="w-full py-5 pr-16 pl-8 bg-slate-50 border-transparent rounded-[30px] focus:bg-white focus:ring-4 focus:ring-rose-50 focus:border-rose-200 outline-none transition-all font-medium italic"
                 />
            </div>
            <div className="flex gap-2">
                <button className="p-5 bg-slate-50 rounded-[24px] text-slate-400 hover:text-rose-600 transition-all">
                    <Filter className="w-6 h-6" />
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            {projects.map((project, idx) => (
                <motion.div 
                    key={idx}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-[48px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all group"
                >
                    <div className="h-64 overflow-hidden relative">
                        <img referrerPolicy="no-referrer" src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 border border-white/20">
                            {project.category}
                        </div>
                    </div>
                    <div className="p-10 space-y-6">
                        <div>
                            <h4 className="text-2xl font-black text-slate-900 italic tracking-tight mb-2 uppercase leading-none">{project.title}</h4>
                            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest italic">
                                <MapPin className="w-3 h-3 text-rose-500" />
                                {project.location}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-xs font-black italic">
                                <span className="text-slate-400">التقدم: {project.progress}%</span>
                                <span className="text-rose-600">{project.raised} / {project.target}</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-rose-500" style={{ width: `${project.progress}%` }} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                             <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[1,2,3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shrink-0">
                                            <img referrerPolicy="no-referrer" src={`https://i.pravatar.cc/100?u=${i + idx}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-[10px] font-black text-slate-400 italic">+{project.donors} متبرع</span>
                             </div>
                             <button className="px-8 py-4 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-rose-500/20 active:scale-95 leading-none">
                                تبرع الآن
                             </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};
