import React from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Bell, 
  Shield, 
  Eye, 
  Globe, 
  Smartphone,
  ChevronRight,
  Save
} from 'lucide-react';
import { useRole } from '../../core/context/RoleContext';

export function TelecomSettings() {
  const { currentRole } = useRole();
  const themeColor = currentRole?.themeColor || '#2563eb';

  const sections = [
    {
      title: 'إعدادات النظام',
      items: [
        { label: 'تنبيهات انقطاع الخدمة', icon: Bell, type: 'toggle', value: true },
        { label: 'تحديثات الخريطة التلقائية', icon: Globe, type: 'toggle', value: false },
        { label: 'وضع توفير البيانات', icon: Smartphone, type: 'toggle', value: true },
      ]
    },
    {
      title: 'الأمان والخصوصية',
      items: [
        { label: 'تغيير كلمة المرور', icon: Shield, type: 'link' },
        { label: 'سجلات الدخول', icon: Eye, type: 'link' },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-10" dir="rtl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">الإعدادات</h1>
          <p className="text-slate-500 font-bold text-sm">تخصيص تفضيلات لوحة التحكم والخصوصية</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-black text-sm shadow-lg shadow-blue-200 active:scale-95 transition-all">
          <Save size={18} />
          حفظ التغييرات
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm"
          >
            <div className="px-8 py-6 bg-slate-50 border-b border-slate-100">
              <h2 className="text-sm font-black text-slate-900 italic uppercase tracking-wider">{section.title}</h2>
            </div>
            <div className="px-8 divide-y divide-slate-100">
              {section.items.map((item, i) => (
                <div key={i} className="py-6 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:border-blue-100 transition-all shadow-sm">
                      <item.icon size={20} />
                    </div>
                    <span className="font-bold text-slate-700">{item.label}</span>
                  </div>
                  
                  {item.type === 'toggle' ? (
                    <button 
                      className={`w-14 h-8 rounded-full transition-all relative ${item.value ? 'bg-blue-600' : 'bg-slate-200'}`}
                      style={item.value ? { backgroundColor: themeColor } : {}}
                    >
                      <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm transition-all ${item.value ? 'left-1' : 'left-7'}`} />
                    </button>
                  ) : (
                    <ChevronRight size={20} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
