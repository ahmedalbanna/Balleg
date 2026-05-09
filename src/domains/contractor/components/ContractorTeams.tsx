import React from "react";
import { motion } from "motion/react";
import { Users, Search, Filter, MapPin, UserPlus, Phone, MessageCircle, MoreVertical, Shield, HardHat, CheckCircle2 } from "lucide-react";

export const ContractorTeams: React.FC = () => {
  const teams = [
    { id: "TEAM-A", name: "فريق التشييد أ", lead: "م. إبراهيم فؤاد", size: 12, location: "موقع مخيم زيد", status: "في الموقع", performance: 94 },
    { id: "TEAM-B", name: "فريق الإمداد اللوجستي", lead: "أ. سعيد باوزير", size: 5, location: "نقطة توزيع صنعاء", status: "مهمة خارجية", performance: 88 },
    { id: "TEAM-C", name: "صيانة الكهرباء والشبكات", lead: "م. منيرة قاسم", size: 4, location: "المخزن المركزي", status: "استراحة", performance: 91 },
    { id: "TEAM-D", name: "فريق المياه والصرف", lead: "م. عمار اليافعي", size: 8, location: "بئر الفلاح", status: "تحرك ميداني", performance: 96 },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in slide-in-from-right-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase">الفرق الميدانية</h2>
          <p className="text-slate-500 font-medium italic">إدارة الكوادر البشرية، وتوزيع الفرق الميدانية على مواقع التنفيذ</p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-3 px-6 py-3 bg-amber-600 text-white rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-amber-700 transition-all shadow-xl shadow-amber-500/20 active:scale-95">
                <UserPlus className="w-4 h-4" />
                تكوين فريق جديد
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {teams.map((team, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -mr-16 -mt-16 group-hover:bg-amber-50 transition-colors" />
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <span className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-tight ${
                        team.status === 'في الموقع' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                        {team.status}
                    </span>
                    <button className="text-slate-300 hover:text-slate-900 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <HardHat className="w-6 h-6 text-amber-500" />
                </div>
                <h4 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors italic leading-tight mb-1">{team.name}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{team.lead}</p>
            </div>

            <div className="mt-8 space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                        {[...Array(3)].map((_, idx) => (
                            <div key={idx} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-400">
                                {idx + 1}
                            </div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-500 flex items-center justify-center text-[8px] font-black text-white">
                            +{team.size - 3}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        {team.location}
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest italic text-slate-400">
                        <span>الأداء العام</span>
                        <span>{team.performance}%</span>
                    </div>
                    <div className="h-1 bg-slate-50 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${team.performance}%` }}
                            className="h-full bg-amber-500 rounded-full"
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all flex items-center justify-center gap-2">
                        <Phone className="w-3 h-3" />
                        اتصال
                    </button>
                    <button className="p-3 bg-slate-100 text-slate-400 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                        <MessageCircle className="w-4 h-4" />
                    </button>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[48px] p-10 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative shadow-2xl">
          <div className="relative z-10 space-y-6 max-w-lg">
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.4em] italic mb-4 block">Field Operations Control</span>
              <h3 className="text-4xl font-black italic tracking-tighter leading-tight">وحدة التحكم في القوى العاملة</h3>
              <p className="text-slate-400 font-medium italic">تحليل كفاءة الفرق الميدانية في الوقت الفعلي، وتوزيع الموارد البشرية بناءً على ضغط الحالات وسرعة التنفيذ المطلوبة في كل موقع.</p>
              <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black uppercase italic text-emerald-500 tracking-widest">Live: ٢٨ فريق نشط</span>
                  </div>
              </div>
          </div>
          <div className="relative z-10 grid grid-cols-2 gap-4 w-full md:w-auto">
              {[
                  { label: 'ساعات العمل', val: '١.٢ك', color: 'blue' },
                  { label: 'بلاغات الموقع', val: '٠٣', color: 'rose' },
              ].map((m, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[32px] backdrop-blur-xl text-center flex flex-col justify-center min-w-[140px]">
                      <span className="text-3xl font-black text-white">{m.val}</span>
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 mt-1">{m.label}</span>
                  </div>
              ))}
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>
    </div>
  );
};
