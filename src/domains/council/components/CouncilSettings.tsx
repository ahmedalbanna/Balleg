import React from "react";
import { motion } from "motion/react";
import { Settings, Shield, Lock, Bell, Globe, Database, Scale, Users, FileText, ChevronLeft, LogOut, Zap } from "lucide-react";

export const CouncilSettings: React.FC = () => {
  const sections = [
    { 
      title: 'إعدادات الوصول والأمان', 
      icon: Shield,
      items: [
        { label: 'إدارة أدوار المجلس', value: 'رئيسي / مشرف', icon: Users },
        { label: 'تقييد الوصول الجغرافي', toggle: true, enabled: true, icon: Globe },
        { label: 'تفعيل تسجيل الدخول الثنائي (2FA)', toggle: true, enabled: true, icon: Lock },
      ]
    },
    { 
      title: 'المعايير التنظيمية', 
      icon: Scale,
      items: [
        { label: 'تعديل سياسات التوزيع', action: true, icon: FileText },
        { label: 'تحديد سقف الميزانية الطارئة', value: '٥٠,٠٠٠,٠٠٠ ر.ي', icon: Database },
        { label: 'أتمتة تقارير الامتثال', toggle: true, enabled: false, icon: Zap },
      ]
    },
    { 
      title: 'مركز الإشعارات والتحكم', 
      icon: Bell,
      items: [
        { label: 'تنبيهات المخالفات الجسيمة', toggle: true, enabled: true, icon: Bell },
        { label: 'إشعارات تحديث السياسات', toggle: true, enabled: true, icon: Bell },
        { label: 'تقارير الإنجاز الأسبوعية', toggle: true, enabled: true, icon: FileText },
      ]
    }
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto pb-24 lg:pb-12 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">الإعدادات التنظيمية</h2>
          <p className="text-slate-500 font-medium italic">إدارة وضبط السياسات العليا، الأمان، والتحكم المؤسسي</p>
        </div>
        <div className="flex -space-x-2">
            {[1,2,3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 shadow-sm" />
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-600 text-[10px] text-white flex items-center justify-center font-black shadow-lg">
                +١٢
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
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-slate-200 flex items-center justify-center text-indigo-600">
                <section.icon className="w-6 h-6" />
              </div>
              <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{section.title}</h3>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic leading-none mt-1">Configure regulatory frameworks</p>
              </div>
            </div>
            
            <div className="divide-y divide-slate-50">
              {section.items.map((item, j) => (
                <div key={j} className="px-10 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all duration-500">
                        <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-700">{item.label}</span>
                  </div>
                  
                  {item.toggle && (
                    <button className={`w-14 h-7 rounded-full transition-all relative ${item.enabled ? 'bg-indigo-600 shadow-lg shadow-indigo-100' : 'bg-slate-200'}`}>
                      <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${item.enabled ? 'left-1' : 'left-8'}`} />
                    </button>
                  )}
                  
                  {item.value && (
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest italic">{item.value}</span>
                  )}
                  
                  {item.action && (
                    <button className="px-5 py-2.5 border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                        ضبط المعايير
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="flex-1 py-6 flex items-center justify-center gap-4 text-indigo-600 font-black uppercase tracking-[0.2em] bg-indigo-50 rounded-[32px] border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all group shadow-xl shadow-indigo-500/5">
                <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                حفظ السياسات الجديدة
            </button>
            <button className="py-6 px-10 flex items-center justify-center gap-4 text-rose-600 font-black uppercase tracking-[0.2em] bg-rose-50 rounded-[32px] border border-rose-100 hover:bg-rose-600 hover:text-white transition-all group shadow-xl shadow-rose-500/5">
                <LogOut className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                خروج من النظام
            </button>
        </div>
      </div>
    </div>
  );
};
