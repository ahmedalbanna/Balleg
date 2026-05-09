import React from "react";
import { motion } from "motion/react";
import { Settings, Shield, Lock, Bell, Globe, CreditCard, Heart, Users, FileText, ChevronLeft, LogOut, Sparkles, User, Database, Zap } from "lucide-react";

export const DonorSettings: React.FC = () => {
    const sections = [
        { 
            title: 'إعدادات الحساب والخصوصية', 
            icon: User,
            items: [
                { label: 'المعلومات الشخصية', value: 'أحمد البنا', icon: User },
                { label: 'تغيير كلمة المرور', action: true, icon: Lock },
                { label: 'إخفاء اسمي في قائمة المتبرعين', toggle: true, enabled: false, icon: Shield },
            ]
        },
        { 
            title: 'المالية وطرق التبرع', 
            icon: CreditCard,
            items: [
                { label: 'البطاقة الرئيسية', value: 'Visa •••• 4242', icon: CreditCard },
                { label: 'التبرع التلقائي الشهري', toggle: true, enabled: true, icon: Heart },
                { label: 'إدارة العملات (USD, YER)', action: true, icon: Globe },
            ]
        },
        { 
            title: 'تفضيلات الإشعارات', 
            icon: Bell,
            items: [
                { label: 'تنبيهات حالة المشاريع', toggle: true, enabled: true, icon: Bell },
                { label: 'تقارير الأثر عبر البريد', toggle: true, enabled: true, icon: FileText },
                { label: 'تذكير التبرعات العاجلة', toggle: true, enabled: true, icon: Zap },
            ]
        }
    ];

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto pb-24 lg:pb-12 animate-in fade-in duration-1000 font-sans">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Settings className="w-10 h-10 text-rose-600" />
                        الإعدادات
                    </h2>
                    <p className="text-slate-500 font-medium italic">تحكم في تفضيلاتك، طرق الدفع، وإعدادات الأمان الخاصة بحساب العطاء</p>
                </div>
            </header>

            <div className="space-y-8">
                {sections.map((section, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden group"
                    >
                        <div className="px-10 py-8 border-b border-slate-50 bg-slate-50/50 flex items-center gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-slate-200 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                                <section.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">{section.title}</h3>
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic leading-none mt-1">Personalize your giving experience</p>
                            </div>
                        </div>
                        
                        <div className="divide-y divide-slate-50">
                            {section.items.map((item, j) => (
                                <div key={j} className="px-10 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors group/item cursor-pointer">
                                    <div className="flex items-center gap-6">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300 group-hover/item:bg-rose-50 group-hover/item:text-rose-600 transition-all duration-500">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-slate-700 italic">{item.label}</span>
                                    </div>
                                    
                                    {item.toggle && (
                                        <button className={`w-14 h-7 rounded-full transition-all relative ${item.enabled ? 'bg-rose-600 shadow-lg shadow-rose-100' : 'bg-slate-200'}`}>
                                            <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${item.enabled ? 'left-1' : 'left-8'}`} />
                                        </button>
                                    )}
                                    
                                    {item.value && (
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest italic font-mono">{item.value}</span>
                                    )}
                                    
                                    {item.action && (
                                        <button className="px-5 py-2.5 border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all italic">
                                            تعديل
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button className="flex-1 py-6 flex items-center justify-center gap-4 text-rose-600 font-black uppercase tracking-[0.2em] bg-rose-50 rounded-[32px] border border-rose-100 hover:bg-rose-600 hover:text-white transition-all group shadow-xl shadow-rose-500/5 italic">
                        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        حفظ التغييرات
                    </button>
                    <button className="py-6 px-10 flex items-center justify-center gap-4 text-slate-400 font-black uppercase tracking-[0.2em] bg-slate-50 rounded-[32px] border border-slate-100 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all group shadow-xl shadow-slate-200/5 italic">
                        <LogOut className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                        تسجيل الخروج
                    </button>
                </div>
            </div>
        </div>
    );
};
