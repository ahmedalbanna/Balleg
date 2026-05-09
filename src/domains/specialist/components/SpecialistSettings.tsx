import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Wrench, 
  ShieldCheck, 
  Bell, 
  Lock, 
  Eye, 
  Monitor, 
  Smartphone, 
  Activity, 
  Database, 
  Zap,
  Layers,
  ChevronLeft,
  ChevronDown,
  ToggleLeft as Toggle,
  Save,
  Trash2,
  Cpu
} from 'lucide-react';
import { cn } from '../../core/utils/cn';

export const SpecialistSettings: React.FC = () => {
    const [autoVerify, setAutoVerify] = useState(true);
    const [aiGrounding, setAiGrounding] = useState(true);

    return (
        <div className="flex flex-col gap-10 w-full" dir="rtl">
            <header className="px-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-slate-700 shadow-xl shadow-slate-900/10">
                    <Settings size={12} />
                    تخصيص بيئة العمل الهندسية
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">إعدادات الأدوات</h1>
                <p className="text-sm font-bold text-slate-400 italic">ضبط معايير التحقق التلقائي، التكامل مع محرك الذكاء الاصطناعي، وتخصيص أدوات القياس الفني</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4 space-y-4">
                    {[
                        { label: 'إعدادات الأدوات الفنية', icon: Wrench, active: true },
                        { label: 'تكامل الذكاء الاصطناعي', icon: Cpu, active: false },
                        { label: 'الأمن والخصوصية', icon: ShieldCheck, active: false },
                        { label: 'تنبيهات الطوارئ', icon: Bell, active: false },
                    ].map((item, i) => (
                        <button 
                            key={i}
                            className={cn(
                                "w-full p-8 rounded-[3rem] flex items-center justify-between transition-all group",
                                item.active ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20" : "bg-white border border-slate-100 text-slate-500 hover:bg-slate-50"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <item.icon size={24} className={cn(item.active ? "text-white" : "text-slate-300 group-hover:text-slate-900")} />
                                <span className="text-sm font-black">{item.label}</span>
                            </div>
                            <ChevronLeft size={18} className={cn(item.active ? "text-white/50" : "text-slate-200")} />
                        </button>
                    ))}
                </div>

                <div className="lg:col-span-8 space-y-8">
                     <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm">
                          <h3 className="text-2xl font-black text-slate-900 mb-10 pb-8 border-b border-slate-50 uppercase tracking-widest italic">المعايير التشغيلية للتحقق</h3>
                          
                          <div className="space-y-6">
                               <div className="p-8 rounded-[3rem] bg-slate-50 border border-slate-100 group transition-all hover:bg-white hover:border-indigo-100">
                                    <div className="flex items-center justify-between mb-4">
                                         <div className="flex items-center gap-4">
                                              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors shadow-sm">
                                                  <Zap size={22} />
                                              </div>
                                              <div>
                                                  <p className="text-sm font-black text-slate-900 mb-1">التحقق التلقائي الذكي</p>
                                                  <p className="text-[11px] font-bold text-slate-400 italic">اعتماد البلاغات الموثقة بصرياً وجغرافياً دون تدخل بشري للحالات البسيطة</p>
                                              </div>
                                         </div>
                                         <button 
                                            onClick={() => setAutoVerify(!autoVerify)}
                                            className={cn(
                                                "w-14 h-8 rounded-full transition-all relative flex items-center px-1",
                                                autoVerify ? "bg-indigo-600" : "bg-slate-300"
                                            )}
                                         >
                                            <motion.div 
                                                animate={{ x: autoVerify ? -24 : 0 }}
                                                className="w-6 h-6 bg-white rounded-full shadow-sm"
                                            />
                                         </button>
                                    </div>
                               </div>

                               <div className="p-8 rounded-[3rem] bg-slate-50 border border-slate-100 group transition-all hover:bg-white hover:border-indigo-100">
                                    <div className="flex items-center justify-between mb-4">
                                         <div className="flex items-center gap-4">
                                              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:text-violet-600 transition-colors shadow-sm">
                                                  <Cpu size={22} />
                                              </div>
                                              <div>
                                                  <p className="text-sm font-black text-slate-900 mb-1">ربط التنبؤ الهيكلي</p>
                                                  <p className="text-[11px] font-bold text-slate-400 italic">ربط التقارير الفنية بمحرك التنبؤ AI لتحليل المخاطر المستقبلية تلقائياً</p>
                                              </div>
                                         </div>
                                         <button 
                                            onClick={() => setAiGrounding(!aiGrounding)}
                                            className={cn(
                                                "w-14 h-8 rounded-full transition-all relative flex items-center px-1",
                                                aiGrounding ? "bg-violet-600" : "bg-slate-300"
                                            )}
                                         >
                                            <motion.div 
                                                animate={{ x: aiGrounding ? -24 : 0 }}
                                                className="w-6 h-6 bg-white rounded-full shadow-sm"
                                            />
                                         </button>
                                    </div>
                               </div>
                          </div>

                          <div className="mt-12 pt-10 border-t border-slate-50 flex items-center justify-between">
                               <button className="px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center gap-3">
                                   <Save size={18} />
                                   حفظ إعدادات المنصة
                               </button>
                               <button className="px-10 py-5 bg-white border border-slate-100 text-slate-400 rounded-3xl font-black text-sm hover:text-slate-900 transition-all italic">إعادة الضبط للمصنع</button>
                          </div>
                     </div>
                </div>
            </div>
        </div>
    );
};
