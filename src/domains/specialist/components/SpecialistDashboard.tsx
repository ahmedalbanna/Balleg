import { HardHat, Map, Users, CheckCircle2, AlertCircle, Clock, Navigation, TrendingUp, BarChart3, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import MapView from "../../locations/components/MapView";

export function SpecialistDashboard() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const maintenanceMarkers = [
    { id: 'TSK-102', lat: 33.5138, lng: 36.2765, title: 'صيانة حفرة شارع الستين', description: 'فريق صيانة الطرق (أ) - جاري العمل، نسبة الإنجاز ٦٠٪', type: 'info' as const, status: 'قيد التنفيذ' },
    { id: 'TSK-105', lat: 33.5250, lng: 36.2900, title: 'إصلاح هبوط رصيف الصافية', description: 'بانتظار وصول المواد الخام (إسمنت وحجر رصيف)', type: 'complaint' as const, status: 'تم التكليف' },
    { id: 'TSK-108', lat: 33.5050, lng: 36.2650, title: 'تغطية منهل مفتوح', description: 'إجراء عاجل: تم تأمين الموقع بحواجز تحذيرية مؤقتة', type: 'hazard' as const, status: 'طارئ' },
  ];

  const stats = [
    { label: "مهام نشطة", value: "٦", icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "فرق في الميدان", value: "٤", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "نسبة الإنجاز", value: "٨٨٪", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  const tasks = [
    { id: 'TSK-102', title: "صيانة حفرة شارع الستين", priority: "high", status: "In Progress", team: "فريق صيانة الطرق (أ)", location: "تقاطع الستين" },
    { id: 'TSK-105', title: "إصلاح هبوط رصيف الصافية", priority: "medium", status: "Assigned", team: "فريق الإشراف الميداني", location: "حي الصافية" },
    { id: 'TSK-108', title: "تغطية منهل مفتوح", priority: "critical", status: "Urgent", team: "فريق الطوارئ", location: "جولة ريماس" },
  ];

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-slate-50/50 min-h-[85vh] rounded-[3rem] border border-slate-200/60 shadow-sm">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-rose-700 text-white flex items-center justify-center shadow-2xl shadow-rose-900/20">
            <HardHat className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex">إدارة قسم الصيانة الميدانية</h2>
            <p className="text-slate-500 mt-1 font-bold">تخطيط وتكليف ومتابعة.. لأثر ملموس على الأرض</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
             <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-black text-slate-700 uppercase tracking-widest">تحديث الخريطة: لحظي</span>
             </div>
        </div>
      </header>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl hover:shadow-rose-900/5 transition-all"
          >
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                    <p className="text-2xl font-black text-slate-900 font-readex">{stat.value}</p>
                </div>
            </div>
            <BarChart3 className="w-8 h-8 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive Map & Tasks */}
        <div className="lg:col-span-8 flex flex-col gap-6">
            <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-black text-slate-800 flex items-center gap-2 uppercase tracking-widest text-xs">
                        <Map className="w-4 h-4 text-rose-600" />
                        نطاق العمليات الميدانية
                    </h3>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-slate-100 rounded-xl text-[10px] font-black text-slate-500 hover:bg-slate-200 transition-colors">تكبير</button>
                        <button className="px-3 py-1.5 bg-rose-600 rounded-xl text-[10px] font-black text-white shadow-lg shadow-rose-600/20">كامل الشاشة</button>
                    </div>
                </div>
                
                <div className="flex-1 bg-slate-100 relative group overflow-hidden">
                    <MapView markers={maintenanceMarkers} center={[33.5138, 36.2765]} zoom={13} role="specialist" />
                    
                    <div className="absolute bottom-6 left-6 right-6 z-[1000]">
                        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white shadow-2xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase">الفريق الأقرب</p>
                                    <p className="text-xs font-black text-slate-800">فريق الطرق (ب) - متاح</p>
                                </div>
                            </div>
                            <button className="px-5 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-black hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20">توجيه الفريق</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        {/* Task List & Performance */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <section className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex flex-col gap-6">
                <h4 className="text-sm font-black text-slate-800 flex items-center justify-between tracking-widest uppercase">
                    المهام الموكلة للقسم
                    <span className="w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-[10px] font-black">٣</span>
                </h4>
                
                <div className="space-y-4">
                    {tasks.map(task => (
                        <button 
                            key={task.id} 
                            onClick={() => setSelectedTask(task.id)}
                            className={`w-full p-4 rounded-3xl border transition-all text-right group ${
                                selectedTask === task.id ? 'bg-rose-50 border-rose-200 shadow-lg shadow-rose-900/5' : 'bg-slate-50 border-slate-100 hover:bg-white hover:border-slate-200'
                            }`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${
                                    task.priority === 'critical' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                    {task.priority === 'critical' ? 'طارئ جداً' : 'أولوية'}
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold">{task.id}</span>
                            </div>
                            <h5 className="font-black text-slate-800 text-sm mb-1 group-hover:text-rose-700 transition-colors">{task.title}</h5>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
                                <Clock className="w-3 h-3" />
                                <span>{task.team}</span>
                            </div>
                        </button>
                    ))}
                </div>

                <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[2rem] text-xs font-black text-slate-400 hover:border-rose-400 hover:text-rose-600 transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                    سجل المهام المنتهية
                    <ChevronLeft className="w-4 h-4 rotate-180" />
                </button>
            </section>

            <section className="bg-gradient-to-br from-rose-700 to-rose-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-rose-900/20 relative overflow-hidden group">
                <CheckCircle2 className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                <h4 className="text-lg font-black mb-4">تقييم أداء القسم</h4>
                <div className="space-y-5">
                    <div>
                        <div className="flex justify-between text-[10px] font-black uppercase mb-1.5 opacity-80">
                            <span>سرعة الاستجابة</span>
                            <span>٩٢٪</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-rose-400"></motion.div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-[10px] font-black uppercase mb-1.5 opacity-80">
                            <span>جودة التوثيق</span>
                            <span>٨٤٪</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} className="h-full bg-rose-400"></motion.div>
                        </div>
                    </div>
                </div>
                <p className="text-[10px] font-bold mt-6 opacity-70 italic border-t border-white/5 pt-4">سيتم احتساب المكافآت ربع السنوية بناءً على هذه الأرقام.</p>
            </section>
        </div>
      </div>
    </div>
  );
}
