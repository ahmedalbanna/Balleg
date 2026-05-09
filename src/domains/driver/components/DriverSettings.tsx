import React from "react";
import { motion } from "motion/react";
import { Settings, Bell, Lock, Globe, Moon, Shield, Eye, Smartphone, LogOut, Car, Map as MapIcon } from "lucide-react";

export const DriverSettings: React.FC = () => {
  const sections = [
    { 
      title: 'إعدادات الحساب والمركبة', 
      icon: Car,
      items: [
        { label: 'بيانات المركبة والرخصة', value: 'تويوتا هاي لوكس ٧٧١', icon: Car },
        { label: 'سجل نقاط السلامة', value: '٨٥٠ نقطة', icon: Shield },
        { label: 'صورة الملف الشخصي', value: 'نصيب السعدي', icon: Settings },
      ]
    },
    { 
      title: 'تفضيلات النظام', 
      icon: Globe,
      items: [
        { label: 'لغة الملاحة الصوتية', value: 'العربية (صوت طبيعي)', icon: Globe },
        { label: 'تغيير رمز الأمان (PIN)', action: true, icon: Lock },
        { label: 'تنبيهات السرعة الزائدة', toggle: true, enabled: true, icon: Smartphone },
        { label: 'تفعيل الوضع الليلي التلقائي', toggle: true, enabled: true, icon: Moon },
      ]
    },
    { 
      title: 'إشعارات الطريق والميدان', 
      icon: Bell,
      items: [
        { label: 'تنبيهات المخاطر القريبة', toggle: true, enabled: true, icon: Bell },
        { label: 'تحديثات حركة المرور الحية', toggle: true, enabled: true, icon: MapIcon },
        { label: 'رسائل الدعم الفني المباشرة', toggle: true, enabled: false, icon: Bell },
      ]
    }
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto pb-24 lg:pb-12 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">إعدادات بوابة السائق</h2>
          <p className="text-slate-500 font-medium italic">تخصيص تجربة القيادة وإدارة تفضيلات الأمان والملاحة</p>
        </div>
        <div className="flex -space-x-2">
            {[1,2,3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 shadow-sm" />
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-500 text-[10px] text-white flex items-center justify-center font-black shadow-lg">
                +٥
            </div>
        </div>
      </header>

      <div className="space-y-8">
        {sections.map((section, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden"
          >
            <div className="px-10 py-8 border-b border-slate-50 bg-slate-50/50 flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-slate-200 flex items-center justify-center text-amber-500">
                <section.icon className="w-6 h-6" />
              </div>
              <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{section.title}</h3>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic leading-none mt-1">Configure your field experience</p>
              </div>
            </div>
            
            <div className="divide-y divide-slate-50">
              {section.items.map((item, j) => (
                <div key={j} className="px-10 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-amber-50 group-hover:text-amber-500 transition-all duration-500">
                        <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-700">{item.label}</span>
                  </div>
                  
                  {item.toggle && (
                    <button className={`w-14 h-7 rounded-full transition-all relative ${item.enabled ? 'bg-amber-500 shadow-lg shadow-amber-200' : 'bg-slate-200'}`}>
                      <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${item.enabled ? 'left-1' : 'left-8'}`} />
                    </button>
                  )}
                  
                  {item.value && (
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest italic">{item.value}</span>
                  )}
                  
                  {item.action && (
                    <button className="px-5 py-2.5 border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                      تعديل الآن
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="flex-1 py-6 flex items-center justify-center gap-4 text-amber-600 font-black uppercase tracking-[0.2em] bg-amber-50 rounded-[32px] border border-amber-100 hover:bg-amber-500 hover:text-white transition-all group shadow-xl shadow-amber-500/5">
                <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                حفظ كافة التغييرات
            </button>
            <button className="py-6 px-10 flex items-center justify-center gap-4 text-rose-600 font-black uppercase tracking-[0.2em] bg-rose-50 rounded-[32px] border border-rose-100 hover:bg-rose-600 hover:text-white transition-all group shadow-xl shadow-rose-500/5">
                <LogOut className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                خروج من البوابة
            </button>
        </div>
      </div>
    </div>
  );
};
