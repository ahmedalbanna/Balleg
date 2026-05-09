import React from "react";
import { motion } from "motion/react";
import { Settings, User, Shield, Bell, Globe, Map, Zap, Database, Lock, LogOut, Sparkles, Sliders, Wifi, Heart } from "lucide-react";

export const HumanitarianSettings: React.FC = () => {
    const sections = [
        { 
            title: 'إعدادات الحساب الإنساني', 
            icon: Heart,
            items: [
                { label: 'الملف الشخصي للمنقذ', value: 'سالم حامد - منسق ميثاق', icon: User },
                { label: 'تغيير كلمة المرور', action: true, icon: Lock },
                { label: 'رقم التعريف الإغاثي (UN-ID)', value: 'HUM-8812', icon: Shield },
            ]
        },
        { 
            title: 'تفضيلات البيانات والميدان', 
            icon: Wifi,
            items: [
                { label: 'تحديث البيانات تلقائياً (Real-time)', toggle: true, enabled: true, icon: Zap },
                { label: 'تنزيل الخرائط الميدانية أوفلاين', toggle: true, enabled: true, icon: Map },
                { label: 'وضع توفير البيانات المحدود', toggle: true, enabled: false, icon: Database },
            ]
        },
        { 
            title: 'إعدادات التنبيهات والاتصال', 
            icon: Bell,
            items: [
                { label: 'إشعارات نداءات SOS', toggle: true, enabled: true, icon: Bell },
                { label: 'تحديثات الحالة اللوجستية', toggle: true, enabled: true, icon: Sliders },
                { label: 'إشعارات البلاغات القريبة', toggle: true, enabled: true, icon: Globe },
            ]
        }
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 max-w-4xl mx-auto pb-24 lg:pb-12 animate-in fade-in duration-800">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Settings className="w-10 h-10 text-rose-600" />
                        الإعدادات
                    </h2>
                    <p className="text-slate-500 font-bold italic">توصيل إعدادات حسابك الإنساني، بروتوكولات الخصوصية الميدانية، وتفضيلات المزامنة</p>
                </div>
            </header>

            <div className="space-y-8">
                {sections.map((section, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-[48px] border border-slate-100 shadow-xl overflow-hidden group"
                    >
                        <div className="px-12 py-10 border-b border-slate-50 bg-slate-50/10 flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-slate-200 flex items-center justify-center text-rose-600 group-hover:rotate-12 transition-transform">
                                <section.icon className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight italic leading-none">{section.title}</h3>
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic mt-2 leading-none">Configure your humanitarian workspace</p>
                            </div>
                        </div>
                        
                        <div className="divide-y divide-slate-50">
                            {section.items.map((item, j) => (
                                <div key={j} className="px-12 py-8 flex items-center justify-between hover:bg-slate-50/50 transition-colors group/item cursor-pointer">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-300 group-hover/item:bg-rose-50 group-hover/item:text-rose-600 transition-all duration-500">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <span className="font-bold text-slate-700 italic">{item.label}</span>
                                    </div>
                                    
                                    {item.toggle && (
                                        <button className={`w-14 h-7 rounded-full transition-all relative ${item.enabled ? 'bg-rose-500 shadow-lg shadow-rose-100' : 'bg-slate-200'}`}>
                                            <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${item.enabled ? 'right-1' : 'right-8'}`} />
                                        </button>
                                    )}
                                    
                                    {item.value && (
                                        <span className="text-sm font-black text-slate-400 uppercase tracking-widest italic font-mono">{item.value}</span>
                                    )}
                                    
                                    {item.action && (
                                        <button className="px-6 py-3 border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all italic">
                                            تغيير
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}

                <div className="flex flex-col sm:flex-row gap-4 pt-10">
                    <button className="flex-1 py-8 flex items-center justify-center gap-4 text-white font-black uppercase tracking-[0.3em] bg-slate-900 rounded-[40px] hover:bg-rose-600 transition-all group shadow-2xl shadow-slate-900/20 italic text-xs">
                        <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform" />
                        حفظ التفضيلات الإنسانية
                    </button>
                    <button className="py-8 px-12 flex items-center justify-center gap-4 text-slate-400 font-black uppercase tracking-[0.3em] bg-slate-100 rounded-[40px] border border-slate-200 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all group shadow-xl italic text-xs">
                        <LogOut className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                        خروج
                    </button>
                </div>
            </div>
        </div>
    );
};
