import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Monitor, 
  Bell, 
  Lock, 
  Globe, 
  ShieldCheck, 
  Eye, 
  ChevronRight,
  Zap,
  Palette,
  Layout,
  Smartphone,
  Save,
  LogOut,
  Info,
  Shield,
  Key,
  Database,
  Sliders,
  ToggleLeft
} from 'lucide-react';
import { useAuth } from '../../core/context/AuthContext';
import { useRole } from '../../core/context/RoleContext';
import { cn } from '../../core/utils/cn';

export const AdminSettings: React.FC = () => {
  const { profile, signOut } = useAuth();
  const { currentRole } = useRole();
  const [activeTab, setActiveTab] = useState('general');

  const menu = [
      { id: 'general', label: 'الإعدادات العامة', icon: Sliders },
      { id: 'security', label: 'البنية الأمنية', icon: Shield },
      { id: 'integration', label: 'الربط البرمجي (API)', icon: Key },
      { id: 'notifications', label: 'نظام التنبيهات', icon: Bell },
      { id: 'appearance', label: 'هوية النظام', icon: Palette },
  ];

  return (
    <div className="flex flex-col gap-10 w-full" dir="rtl">
      <header className="px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-slate-700">
              <Settings size={12} />
              التكوين البنيوي للمنصة
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">إعدادات النظام المركزي</h1>
          <p className="text-sm font-bold text-slate-400 italic">تكوين قواعد العمل، مستويات الوصول، وسياسات المعالجة الرقمية لكافة واجهات المستخدمين</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Side Nav */}
          <div className="lg:col-span-4 space-y-3">
              <div className="bg-white p-3 rounded-[3rem] border border-slate-100 shadow-sm space-y-1">
                  {menu.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                            "w-full flex items-center gap-4 p-5 rounded-[2rem] transition-all group",
                            activeTab === item.id 
                                ? "bg-slate-900 text-white shadow-2xl shadow-slate-900/20" 
                                : "text-slate-500 hover:bg-slate-50"
                        )}
                      >
                          <div className={cn(
                              "w-10 h-10 rounded-2xl flex items-center justify-center transition-colors",
                              activeTab === item.id ? "bg-white/10" : "bg-slate-50 text-slate-400 group-hover:bg-white"
                          )}>
                              <item.icon size={20} />
                          </div>
                          <span className="text-[13px] font-black">{item.label}</span>
                          <ChevronRight size={16} className={cn("mr-auto transition-transform", activeTab === item.id ? "rotate-90" : "opacity-20")} />
                      </button>
                  ))}
              </div>

              <div className="p-10 bg-indigo-600 rounded-[3rem] text-white relative overflow-hidden group mt-6">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                   <h4 className="text-lg font-black mb-2 relative z-10">إصدار النظام</h4>
                   <p className="text-sm font-bold text-indigo-100/70 mb-6 italic relative z-10 tracking-wider">v5.2.0-STABLE BRANCH</p>
                   <button className="w-full py-3 bg-white text-indigo-600 rounded-xl text-[10px] font-black hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 relative z-10">
                        التحقق من وجود تحديثات
                        <Zap size={14} />
                   </button>
              </div>
          </div>

          {/* Main Panel */}
          <div className="lg:col-span-8">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[4rem] border border-slate-100 p-10 md:p-14 shadow-sm"
              >
                  {activeTab === 'general' && (
                      <div className="space-y-12">
                           <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <h3 className="text-xl font-black text-slate-900">إعدادات النواة</h3>
                                    <div className="flex-1 h-px bg-slate-100" />
                                </div>
                                <div className="space-y-8">
                                    {[
                                        { label: 'اللغة الافتراضية للنظام', value: 'العربية (اليمن)', type: 'select' },
                                        { label: 'المنطقة الزمنية', value: 'Asia/Riyadh (GMT+3)', type: 'select' },
                                        { label: 'اسم المنصة الرسمي', value: 'يمني تك - الموحدة', type: 'input' },
                                    ].map((field, i) => (
                                        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">{field.label}</label>
                                            <div className="md:col-span-2">
                                                {field.type === 'input' ? (
                                                    <input type="text" defaultValue={field.value} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                                                ) : (
                                                    <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none appearance-none">
                                                        <option>{field.value}</option>
                                                    </select>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                           </section>

                           <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <h3 className="text-xl font-black text-slate-900">خيارات المعالجة</h3>
                                    <div className="flex-1 h-px bg-slate-100" />
                                </div>
                                <div className="space-y-4">
                                     {[
                                         { label: 'التفعيل التلقائي للبلاغات الموثقة', desc: 'قبول بلاغات المناديب الموثقين دون مراجعة إدارية', active: true },
                                         { label: 'نظام رصد الكثافة (AI Heatmap)', desc: 'تحديث خرائط الحرارة بشكل لحظي للعمليات الميدانية', active: true },
                                         { label: 'وضع الصيانة المجدول', desc: 'إيقاف استقبال البلاغات لغرض الصيانة التقنية', active: false },
                                     ].map((sw, j) => (
                                         <div key={j} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 group transition-all hover:bg-white">
                                             <div>
                                                 <p className="text-sm font-black text-slate-900 mb-1">{sw.label}</p>
                                                 <p className="text-[10px] font-bold text-slate-400 italic">{sw.desc}</p>
                                             </div>
                                             <div className={cn(
                                                 "w-12 h-6 rounded-full p-1 cursor-pointer transition-colors",
                                                 sw.active ? "bg-emerald-500" : "bg-slate-200"
                                             )}>
                                                 <div className={cn(
                                                     "w-4 h-4 bg-white rounded-full transition-transform",
                                                     sw.active ? "translate-x-0" : "-translate-x-6"
                                                 )} />
                                             </div>
                                         </div>
                                     ))}
                                </div>
                           </section>
                      </div>
                  )}

                  {activeTab === 'security' && (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mb-6">
                              <Shield size={40} />
                          </div>
                          <h3 className="text-xl font-black text-slate-900 mb-2">إعدادات الأمان السيبراني</h3>
                          <p className="text-sm font-bold text-slate-400 max-w-xs italic mx-auto">هذا القسم محمي بقواعد التحقق الثنائي. يرجى إدخال رمز الوصول للمتابعة.</p>
                          <button className="mt-8 px-10 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[11px] shadow-xl shadow-indigo-600/20">تأكيد الوصول لبروتوكولات الأمان</button>
                      </div>
                  )}

                  {/* Footer Action */}
                  <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-3 text-slate-400">
                          <Info size={16} />
                          <p className="text-[10px] font-bold italic">التغييرات ستؤثر على كافة مستخدمي المنصة وبشكل فوري.</p>
                      </div>
                      <div className="flex items-center gap-4 w-full md:w-auto">
                           <button className="flex-1 md:flex-none text-[11px] font-black text-slate-400 hover:text-slate-900 px-6 py-4 transition-colors">إلغاء</button>
                           <button className="flex-1 md:flex-none px-12 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/20">
                                <Save size={18} />
                                حفظ وتطبيق
                           </button>
                      </div>
                  </div>
              </motion.div>
          </div>
      </div>
    </div>
  );
};
