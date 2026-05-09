import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
  Bell, 
  Lock, 
  Eye, 
  Globe, 
  Monitor, 
  Smartphone, 
  ShieldCheck, 
  Volume2, 
  Moon, 
  Sun,
  ChevronLeft,
  ToggleLeft as Toggle,
  Save,
  Trash2
} from 'lucide-react';
import { cn } from '../../core/utils/cn';

export const OperatorSettings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex flex-col gap-10 w-full" dir="rtl">
      <header className="px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-slate-700 shadow-xl shadow-slate-900/10">
            <Settings size={12} />
            تخصيص البيئة التشغيلية
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">إعدادات المنصة</h1>
        <p className="text-sm font-bold text-slate-400 italic">ضبط تفضيلات العرض، التنبيهات، وحماية الحساب لضمان أفضل تجربة عمل</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Navigation */}
          <div className="lg:col-span-4 space-y-4">
              {[
                  { label: 'الملف الشخصي', icon: User, active: true },
                  { label: 'التنبيهات والإشعارات', icon: Bell, active: false },
                  { label: 'الأمان والخصوصية', icon: Lock, active: false },
                  { label: 'تفضيلات العرض', icon: Monitor, active: false },
                  { label: 'إصدار التطبيق', icon: Smartphone, active: false },
              ].map((item, i) => (
                  <button 
                    key={i}
                    className={cn(
                        "w-full p-6 rounded-[2.5rem] flex items-center justify-between transition-all group",
                        item.active ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" : "bg-white border border-slate-100 text-slate-500 hover:bg-slate-50"
                    )}
                  >
                      <div className="flex items-center gap-4">
                          <item.icon size={22} className={cn(item.active ? "text-white" : "text-slate-300 group-hover:text-slate-900")} />
                          <span className="text-sm font-black">{item.label}</span>
                      </div>
                      <ChevronLeft size={18} className={cn(item.active ? "text-white/50" : "text-slate-200")} />
                  </button>
              ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-8 space-y-8">
               <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm">
                   <h3 className="text-2xl font-black text-slate-900 mb-10 pb-8 border-b border-slate-50 uppercase tracking-tight">إحصائيات الملف الشخصي</h3>
                   
                   <div className="space-y-10">
                        <section>
                             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 italic px-2">إعدادات النظرة العامة</h4>
                             <div className="space-y-4">
                                  <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group transition-all hover:bg-white hover:border-indigo-100">
                                      <div className="flex items-center gap-5">
                                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors shadow-sm">
                                              <Bell size={22} />
                                          </div>
                                          <div>
                                              <p className="text-sm font-black text-slate-900 mb-1">تنبيهات البلاغات العاجلة</p>
                                              <p className="text-[11px] font-bold text-slate-400 italic">استقبال إشعار صوتي فوري عند تسجيل بلاغ سيادي</p>
                                          </div>
                                      </div>
                                      <button 
                                        onClick={() => setNotifications(!notifications)}
                                        className={cn(
                                            "w-14 h-8 rounded-full transition-all relative flex items-center px-1",
                                            notifications ? "bg-indigo-600" : "bg-slate-300"
                                        )}
                                      >
                                          <motion.div 
                                            animate={{ x: notifications ? -24 : 0 }}
                                            className="w-6 h-6 bg-white rounded-full shadow-sm"
                                          />
                                      </button>
                                  </div>

                                  <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group transition-all hover:bg-white hover:border-indigo-100">
                                      <div className="flex items-center gap-5">
                                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:text-amber-500 transition-colors shadow-sm">
                                              {darkMode ? <Moon size={22} /> : <Sun size={22} />}
                                          </div>
                                          <div>
                                              <p className="text-sm font-black text-slate-900 mb-1">الوضع الداكن (Dark Mode)</p>
                                              <p className="text-[11px] font-bold text-slate-400 italic">تغيير مظهر الواجهة للراحة البصرية أثناء النوبات الليلية</p>
                                          </div>
                                      </div>
                                      <button 
                                        onClick={() => setDarkMode(!darkMode)}
                                        className={cn(
                                            "w-14 h-8 rounded-full transition-all relative flex items-center px-1",
                                            darkMode ? "bg-amber-500" : "bg-slate-300"
                                        )}
                                      >
                                          <motion.div 
                                            animate={{ x: darkMode ? -24 : 0 }}
                                            className="w-6 h-6 bg-white rounded-full shadow-sm"
                                          />
                                      </button>
                                  </div>
                             </div>
                        </section>

                        <section>
                             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 italic px-2">اللغة والمنطقة</h4>
                             <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                                  <div className="flex items-center gap-5">
                                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
                                          <Globe size={22} />
                                      </div>
                                      <div>
                                          <p className="text-sm font-black text-slate-900 mb-1">لغة واجهة المستخدم</p>
                                          <p className="text-[11px] font-bold text-slate-400 italic">العربية (اليمن) - الافتراضية</p>
                                      </div>
                                  </div>
                                  <button className="px-6 py-3 bg-white border border-slate-100 text-xs font-black text-slate-600 rounded-xl hover:border-slate-300 transition-all">تغيير اللغة</button>
                             </div>
                        </section>
                   </div>

                   <div className="mt-16 pt-10 border-t border-slate-50 flex items-center justify-between gap-6">
                        <button className="px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black text-sm hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-3 shadow-xl shadow-indigo-600/20">
                            <Save size={18} />
                            حفظ التعديلات
                        </button>
                        <button className="px-10 py-5 bg-white border border-slate-100 text-slate-400 rounded-3xl font-black text-sm hover:text-rose-600 hover:border-rose-100 transition-all flex items-center gap-3 italic">
                            <Trash2 size={18} />
                            حذف الحساب نهائياً
                        </button>
                   </div>
               </div>

               <div className="p-10 rounded-[3rem] bg-amber-50 border border-amber-100 flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                        <ShieldCheck size={28} />
                    </div>
                    <div>
                        <h4 className="text-base font-black text-amber-900 mb-2 underline decoration-amber-500/30 underline-offset-4">تحديث أمني مطلوب</h4>
                        <p className="text-[11px] font-bold text-amber-900/60 leading-relaxed italic">
                            لقد مضى أكثر من ٩٠ يوماً على آخر تغيير لكلمة المرور الخاصة بك. لضمان أمن البيانات السيادية، يرجى تحديثها في أقرب وقت ممكن.
                        </p>
                    </div>
               </div>
          </div>
      </div>
    </div>
  );
};
