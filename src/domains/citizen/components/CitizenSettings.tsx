import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  User, 
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
  Info
} from 'lucide-react';
import { useAuth } from '../../core/context/AuthContext';
import { useRole } from '../../core/context/RoleContext';
import { cn } from '../../core/utils/cn';

export function CitizenSettings() {
  const { profile, signOut } = useAuth();
  const { currentRole } = useRole();
  const [activeTab, setActiveTab] = useState('account');

  const themeColor = currentRole?.themeColor || '#10b981';

  const menu = [
      { id: 'account', label: 'إعدادات الحساب', icon: User },
      { id: 'security', label: 'الأمن والخصوصية', icon: Lock },
      { id: 'notifications', label: 'تفضيلات التنبيهات', icon: Bell },
      { id: 'appearance', label: 'المظهر والسمات', icon: Palette },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8" dir="rtl">
      <header className="mb-16 px-8">
          <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-[2.5rem] bg-white border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm">
                  <Settings size={28} />
              </div>
              <div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">إعدادات المنصة</h1>
                  <p className="text-sm font-bold text-slate-400 italic">خصص تجربتك الرقمية وتحكم في بياناتك وتفضيلات الوصول</p>
              </div>
          </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-8">
          {/* Side Menu */}
          <div className="lg:col-span-4 space-y-3">
              {menu.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                        "w-full flex items-center gap-4 p-5 rounded-[2rem] transition-all group",
                        activeTab === item.id 
                            ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20" 
                            : "bg-white border border-slate-50 text-slate-500 hover:bg-slate-50"
                    )}
                  >
                      <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                          activeTab === item.id ? "bg-white/20" : "bg-slate-50 text-slate-400 group-hover:bg-white"
                      )}>
                          <item.icon size={20} />
                      </div>
                      <span className="text-[13px] font-black">{item.label}</span>
                      <ChevronRight size={16} className={cn("mr-auto transition-transform", activeTab === item.id ? "rotate-90" : "opacity-30")} />
                  </button>
              ))}
              
              <div className="pt-8 px-4">
                  <button 
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-3 p-4 text-rose-500 font-black text-[11px] bg-rose-50 rounded-2xl hover:bg-rose-100 transition-all active:scale-95 border border-rose-100/50"
                  >
                      <LogOut size={16} />
                      تسجيل الخروج من كافة الأجهزة
                  </button>
              </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-8">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[3.5rem] border border-slate-100 p-8 md:p-12 shadow-sm"
              >
                  {activeTab === 'account' && (
                      <div className="space-y-10">
                          <div>
                              <h3 className="text-xl font-black text-slate-900 mb-2">البيانات الأساسية</h3>
                              <p className="text-[11px] font-bold text-slate-400 italic mb-8">يتم استخدام هذه البيانات في البلاغات والتوثيق الرسمي.</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 italic">الاسم الكامل</label>
                                      <input type="text" defaultValue={profile?.displayName} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 italic">رقم الهاتف المختصر</label>
                                      <input type="text" placeholder="٧..." className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none" />
                                  </div>
                              </div>
                          </div>

                          <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                              <div className="flex items-center gap-4 mb-4">
                                  <Info size={18} className="text-blue-500" />
                                  <h4 className="text-sm font-black text-slate-900">توثيق الهوية الرقمية</h4>
                              </div>
                              <p className="text-[11px] font-bold text-slate-500 leading-relaxed mb-6 italic">
                                  من خلال توثيق هويتك، ستحصل بلاغاتك على أولوية أعلى وسيتم اعتبارك "مواطن موثوق" مما يسرع عملية المعالجة الميدانية.
                              </p>
                              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                                  بدء إجراءات التوثيق
                              </button>
                          </div>
                      </div>
                  )}

                  {activeTab === 'security' && (
                      <div className="space-y-10">
                          <div>
                              <h3 className="text-xl font-black text-slate-900 mb-8">إعدادات الخصوصية</h3>
                              <div className="space-y-6">
                                  {[
                                      { label: 'إخفاء اسمي في خريطة البلاغات', desc: 'سيظهر البلاغ باسم "مواطن مجهول"', active: true },
                                      { label: 'تمكين المصادقة الثنائية (2FA)', desc: 'تلقي رمز تأكيد عند الدخول للجهاز الجديد', active: false },
                                      { label: 'مشاركة الموقع التقريبي فقط', desc: 'لحماية خصوصية عنوانك السكني الدقيق', active: true },
                                  ].map((opt, i) => (
                                      <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 group transition-all hover:bg-white">
                                          <div>
                                              <p className="text-sm font-black text-slate-900 mb-1">{opt.label}</p>
                                              <p className="text-[10px] font-bold text-slate-400 italic">{opt.desc}</p>
                                          </div>
                                          <div className={cn(
                                              "w-12 h-6 rounded-full p-1 cursor-pointer transition-colors",
                                              opt.active ? "bg-emerald-500" : "bg-slate-200"
                                          )}>
                                              <div className={cn(
                                                  "w-4 h-4 bg-white rounded-full transition-transform",
                                                  opt.active ? "translate-x-0" : "-translate-x-6"
                                              )} />
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  )}

                  {/* Settings Footer Action */}
                  <div className="mt-12 pt-10 border-t border-slate-100 flex items-center justify-end gap-6">
                      <button className="text-[11px] font-black text-slate-400 hover:text-slate-900 transition-colors">تجاهل التغييرات</button>
                      <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-3 shadow-xl shadow-slate-900/20">
                          <Save size={18} />
                          حفظ التعديلات
                      </button>
                  </div>
              </motion.div>
          </div>
      </div>
    </div>
  );
}
