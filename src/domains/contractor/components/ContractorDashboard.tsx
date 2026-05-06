import { Hammer, ClipboardList, PenTool as Tool, CheckCircle2, Clock, Calendar, MapPin, ChevronRight, TrendingUp, Trophy, FileText, Users, Building2, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function ContractorDashboard() {
  const [activeTab, setActiveTab] = useState("active");

  const contracts = [
    { 
        id: 1, 
        title: "ترميم شوارع حي الأمانة", 
        client: "بلدية المركز", 
        progress: 65, 
        deadline: "١٢ مايو ٢٠٢٦",
        budget: "٤٥٠,٠٠٠$",
        status: "in_progress"
    },
    { 
        id: 2, 
        title: "تحديث شبكة إنارة طريق المطار", 
        client: "وزارة الأشغال", 
        progress: 100, 
        deadline: "انتهى",
        budget: "١٢٠,٠٠٠$",
        status: "completed"
    },
    { 
        id: 3, 
        title: "صيانة طوارئ - كسر أنبوب حي النور", 
        client: "مؤسسة المياه", 
        progress: 10, 
        deadline: "اليوم",
        budget: "١٥,٠٠٠$",
        status: "urgent"
    }
  ];

  const fieldUnits = [
    { name: "فريق الأسفلت A", status: "ميداني", location: "حي الأمانة" },
    { name: "فريق الكهرباء B", status: "استراحة", location: "-", color: "bg-slate-400" },
    { name: "فريق الطوارئ C", status: "ميداني", location: "حي النور", color: "bg-rose-500 animate-pulse" },
  ];

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-orange-50/5 min-h-[85vh] rounded-[3rem] border border-orange-100/50 shadow-sm">
      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-orange-900 text-white flex items-center justify-center shadow-xl shadow-orange-900/20">
            <Hammer className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex tracking-tight">بوابة المقاولين والشركاء</h2>
            <p className="text-slate-500 mt-1 font-bold">إدارة عقود الصيانة، جدولة الفرق، ومتابعة مؤشرات كفاءة التنفيذ</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="px-5 py-3 bg-white border border-orange-100 rounded-2xl flex items-center gap-3 shadow-sm">
                <Trophy className="w-5 h-5 text-amber-500" />
                <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase">تصنيف الاستجابة</p>
                    <p className="text-[11px] font-black text-slate-800">الأفضل في قطاع الطرق (A+)</p>
                </div>
            </div>
            <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
                تقديم على مناقصة جديدة
            </button>
        </div>
      </header>

      {/* Contract Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
            { label: "العقود الجارية", value: "٧", icon: FileText, color: "text-blue-600" },
            { label: "قيمة المحفظة", value: "١.٢M$", icon: Building2, color: "text-slate-600" },
            { label: "تكت صيانة مفتوح", value: "٢٤", icon: ClipboardList, color: "text-orange-600" },
            { label: "المعدات الميدانية", value: "١٨", icon: Tool, color: "text-emerald-600" },
        ].map((stat, i) => (
            <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
                <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color} mb-4`}>
                    <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Work Orders */}
        <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">قائمة المشاريع والعقود</h3>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-orange-600 text-white rounded-xl text-[10px] font-black shadow-lg shadow-orange-600/20">الفعالة</button>
                        <button className="px-4 py-2 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black border border-slate-100 hover:bg-slate-100 transition-colors">المكتملة</button>
                    </div>
                </div>
                
                <div className="p-8 space-y-6">
                    {contracts.map(contract => (
                        <div key={contract.id} className="p-6 rounded-[2.5rem] bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-orange-200 transition-all group">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-orange-600 border border-slate-100">
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-sm group-hover:text-orange-700 transition-colors">{contract.title}</h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                تاريخ التسليم: {contract.deadline}
                                            </span>
                                            <span className="text-[10px] font-bold text-orange-500 font-black">
                                                {contract.budget}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 hover:border-orange-500 hover:text-orange-600 transition-all flex items-center gap-2">
                                    تحديث الحالة
                                    <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 tracking-wider">
                                    <span>الإنجاز الفني</span>
                                    <span>{contract.progress}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${contract.progress}%` }}
                                        className={`h-full rounded-full ${contract.status === 'urgent' ? 'bg-rose-500' : 'bg-orange-600'}`} 
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Fleet & Team Management */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <TrendingUp className="w-24 h-24 text-orange-500" />
                </div>
                <h4 className="text-xl font-black mb-4 font-readex">سمعة المؤسسة</h4>
                <p className="text-xs font-bold text-slate-400 leading-relaxed mb-8">
                    تؤثر "بلاغات بلّغ" المعاد توجيهها إليكم مباشرة على تصنيفكم في المناقصات القادمة. الاستجابة السريعة تساوي عقوداً أكثر.
                </p>
                
                <div className="p-5 bg-white/5 rounded-3xl border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold text-slate-300">متوسط وقت الاستجابة</span>
                        <span className="text-xs font-black text-emerald-400">١٨ ساعة (ممتاز)</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-[85%] h-full bg-emerald-400" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] p-8 border border-slate-200 shadow-sm flex-1 flex flex-col">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-8">تتبع الفرق الميدانية</h4>
                <div className="space-y-4 flex-1">
                    {fieldUnits.map((unit, i) => (
                        <div key={unit.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                           <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${unit.color || 'bg-emerald-500'}`} />
                                <div>
                                    <p className="text-xs font-black text-slate-800">{unit.name}</p>
                                    <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {unit.location}
                                    </p>
                                </div>
                           </div>
                           <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                           </button>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-5 bg-orange-50 rounded-3xl border border-orange-100">
                    <div className="flex items-center gap-3 mb-2">
                        <Trophy className="w-5 h-5 text-amber-600" />
                        <h5 className="text-[11px] font-black text-slate-900">تحدي الحي الأسرع</h5>
                    </div>
                    <p className="text-[10px] text-slate-600 font-bold leading-relaxed mb-4">
                        أنتم الآن في المركز الثاني برعاية "حي الأمانة". استكملوا البلاغات المفتوحة لصدارة القائمة.
                    </p>
                    <button className="w-full py-3 bg-white border border-orange-200 rounded-xl text-[10px] font-black text-orange-700 hover:bg-orange-100 transition-all">
                        مشاهدة لوحة المتصدرين
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
