import React from "react";
import { motion } from "motion/react";
import { Settings, Bell, Lock, Globe, Moon, Shield, Eye, Smartphone, LogOut } from "lucide-react";

export const DisplacedAccountSettings: React.FC = () => {
  const sections = [
    { 
      title: 'التفضيلات العامة', 
      icon: Settings,
      items: [
        { label: 'لغة التطبيق', value: 'العربية', icon: Globe },
        { label: 'الوضع الليلي', toggle: true, enabled: false, icon: Moon },
      ]
    },
    { 
      title: 'الأمان والخصوصية', 
      icon: Shield,
      items: [
        { label: 'تغيير كلمة المرور', action: true, icon: Lock },
        { label: 'تأمين الحساب بخطوتين', toggle: true, enabled: true, icon: Smartphone },
        { label: 'من يمكنه رؤية موقعي', value: 'المشرفون فقط', icon: Eye },
      ]
    },
    { 
      title: 'التنبيهات', 
      icon: Bell,
      items: [
        { label: 'تنبيهات الموقع الجغرافي', toggle: true, enabled: true, icon: Bell },
        { label: 'تنبيهات المساعدات الغذائية', toggle: true, enabled: true, icon: Bell },
      ]
    }
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto pb-24 lg:pb-8">
      <header>
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">إعدادات الحساب</h2>
        <p className="text-slate-500 font-medium">إدارة تفضيلاتك وخصوصيتك وإعدادات الأمان</p>
      </header>

      <div className="space-y-8">
        {sections.map((section, i) => (
          <div key={i} className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600">
                <section.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900">{section.title}</h3>
            </div>
            
            <div className="divide-y divide-slate-50">
              {section.items.map((item, j) => (
                <div key={j} className="px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <item.icon className="w-5 h-5 text-slate-400" />
                    <span className="font-bold text-slate-700">{item.label}</span>
                  </div>
                  
                  {item.toggle && (
                    <button className={`w-12 h-6 rounded-full transition-all relative ${item.enabled ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${item.enabled ? 'right-1' : 'right-7'}`} />
                    </button>
                  )}
                  
                  {item.value && (
                    <span className="text-sm font-black text-slate-400 uppercase tracking-widest">{item.value}</span>
                  )}
                  
                  {item.action && (
                    <button className="px-4 py-2 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-900 hover:text-white transition-all">
                      تعديل
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button className="w-full py-6 flex items-center justify-center gap-4 text-rose-600 font-black uppercase tracking-[0.2em] bg-rose-50 rounded-[32px] border border-rose-100 hover:bg-rose-600 hover:text-white transition-all group">
          <LogOut className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
          تسجيل الخروج من الحساب
        </button>
      </div>
    </div>
  );
};
