import React from "react";
import { motion } from "motion/react";
import { Bell, AlertTriangle, Info, Megaphone, Clock, MapPin, ChevronLeft } from "lucide-react";

export const DisplacedUrgentAlerts: React.FC = () => {
  const alerts = [
    { id: 1, title: "تحذير: عواصف رملية قادمة", content: "يرجى البقاء داخل مراكز الإيواء وإغلاق النوافذ بإحكام خلال الـ ١٢ ساعة القادمة.", type: "danger", date: "١٠:٣٠ ص", location: "كافة المناطق" },
    { id: 2, title: "توزيع مساعدات عاجلة", content: "بدء توزيع الطرود الغذائية في مدرسة القدس غداً الساعة ٨ صباحاً.", type: "info", date: "٩:٠٠ ص", location: "الحي الشمالي" },
    { id: 3, title: "تغيير في مواعيد حظر التجوال", content: "تعديل ساعات الحركة المسموح بها لتصبح من الـ ٦ صباحاً حتى الـ ٨ مساءً.", type: "warning", date: "أمس", location: "وسط المدينة" },
    { id: 4, title: "حملة تطعيم للأطفال", content: "انطلاق حملة الوقاية من الأمراض الموسمية تحت سن الـ ٥ سنوات في العيادة المركزية.", type: "success", date: "أمس", location: "العيادة المركزية" },
  ];

  const getTypeStyles = (type: string) => {
    switch(type) {
      case 'danger': return 'bg-rose-50 border-rose-100 text-rose-600 icon-rose-500';
      case 'warning': return 'bg-orange-50 border-orange-100 text-orange-600 icon-orange-500';
      case 'success': return 'bg-emerald-50 border-emerald-100 text-emerald-600 icon-emerald-500';
      default: return 'bg-blue-50 border-blue-100 text-blue-600 icon-blue-500';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase flex items-center gap-4">
            تنبيهات عاجلة
            <span className="bg-rose-600 text-white text-[10px] px-2 py-1 rounded-full animate-pulse tracking-widest font-black">LIVE</span>
          </h2>
          <p className="text-slate-500 font-medium">ابقَ على اطلاع بأحدث التعليمات والأخبار المهمة</p>
        </div>
        <button className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm relative group">
          <Bell className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 transition-colors" />
          <span className="absolute top-3 right-3 w-3 h-3 bg-rose-500 rounded-full border-4 border-white" />
        </button>
      </header>

      <div className="space-y-6">
        {alerts.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-[24px] border-2 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500 ${getTypeStyles(alert.type).split(' ').slice(0, 2).join(' ')}`}
          >
            <div className="flex flex-col md:flex-row gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${getTypeStyles(alert.type).split(' ').slice(2,3).join(' ').replace('text', 'bg').replace('600', '100')} ${getTypeStyles(alert.type).split(' ').slice(2,3).join(' ')} group-hover:scale-110 transition-transform`}>
                   {alert.type === 'danger' && <AlertTriangle className="w-8 h-8" />}
                   {alert.type === 'warning' && <Megaphone className="w-8 h-8" />}
                   {alert.type === 'success' && <Info className="w-8 h-8" />}
                   {alert.type === 'info' && <Bell className="w-8 h-8" />}
                </div>

                <div className="flex-1">
                   <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                      <h3 className={`text-xl font-black ${getTypeStyles(alert.type).split(' ').slice(2,3).join(' ')}`}>
                        {alert.title}
                      </h3>
                      <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 italic">
                         <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {alert.date}
                         </span>
                         <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {alert.location}
                         </span>
                      </div>
                   </div>
                   <p className="text-slate-600 font-medium leading-relaxed mb-4">
                     {alert.content}
                   </p>
                   
                   <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 group/btn">
                      متابعة التفاصيل
                      <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                   </button>
                </div>
            </div>
            
            <div className={`absolute top-0 right-0 w-24 h-24 opacity-5 rounded-bl-[100px] -mr-12 -mt-12 group-hover:rotate-12 transition-transform duration-700 ${getTypeStyles(alert.type).split(' ').slice(2,3).join(' ').replace('text', 'bg')}`} />
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/40 hover:bg-indigo-600 transition-all">
          عرض الأرشيف الكامل
        </button>
      </div>
    </div>
  );
};
