import React from "react";
import { motion } from "motion/react";
import { Settings, Shield, Lock, Bell, Globe, Database, Cpu, Users, FileCode, ChevronLeft, LogOut, Zap, Terminal, Key, Activity } from "lucide-react";

export const DeveloperSettings: React.FC = () => {
    const sections = [
        { 
            title: 'إدارة المفاتيح والأذونات', 
            icon: Key,
            items: [
                { label: 'مفاتيح API (Production)', value: '•••• •••• •••• ٧٣٢١', icon: Key },
                { label: 'مفاتيح Webhooks', value: 'نشط', icon: Zap },
                { label: 'إدارة الرموز (Classic Tokens)', action: true, icon: FileCode },
            ]
        },
        { 
            title: 'تكوين البيئات والخدمات', 
            icon: Terminal,
            items: [
                { label: 'رابط القاعدة - REST API', value: 'https://api.v1.example.com', icon: Globe },
                { label: 'بروتوكول WebSocket', value: 'WSS Enabled', icon: Activity },
                { label: 'توزيع الحمل التلقائي', toggle: true, enabled: true, icon: Cpu },
            ]
        },
        { 
            title: 'الأمان والخصوصية التقنية', 
            icon: Shield,
            items: [
                { label: 'قيود عناوين IP (Allowlist)', action: true, icon: Globe },
                { label: 'تحليل الثغرات التلقائي', toggle: true, enabled: true, icon: Shield },
                { label: 'المصادقة بمفتاح مادي (FIDO2)', toggle: true, enabled: false, icon: Lock },
            ]
        }
    ];

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto pb-24 lg:pb-12 animate-in fade-in duration-1000 font-sans">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Settings className="w-10 h-10 text-indigo-600" />
                        إعدادات المنصة
                    </h2>
                    <p className="text-slate-500 font-medium italic">إدارة البنية التحتية البرمجية، مفاتيح الوصول، وسياسات الأمان التقنية</p>
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
                            <div className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-slate-200 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                                <section.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">{section.title}</h3>
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic leading-none mt-1">Configure development framework</p>
                            </div>
                        </div>
                        
                        <div className="divide-y divide-slate-50">
                            {section.items.map((item, j) => (
                                <div key={j} className="px-10 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors group/item cursor-pointer">
                                    <div className="flex items-center gap-6">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300 group-hover/item:bg-indigo-50 group-hover/item:text-indigo-600 transition-all duration-500">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-slate-700 italic">{item.label}</span>
                                    </div>
                                    
                                    {item.toggle && (
                                        <button className={`w-14 h-7 rounded-full transition-all relative ${item.enabled ? 'bg-indigo-600 shadow-lg shadow-indigo-100' : 'bg-slate-200'}`}>
                                            <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${item.enabled ? 'left-1' : 'left-8'}`} />
                                        </button>
                                    )}
                                    
                                    {item.value && (
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest italic font-mono truncate max-w-[200px]">{item.value}</span>
                                    )}
                                    
                                    {item.action && (
                                        <button className="px-5 py-2.5 border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all italic">
                                            CONFIGURE
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button className="flex-1 py-6 flex items-center justify-center gap-4 text-indigo-600 font-black uppercase tracking-[0.2em] bg-indigo-50 rounded-[32px] border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all group shadow-xl shadow-indigo-500/5 italic">
                        <Terminal className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        تحديث إعدادات البيئة
                    </button>
                    <button className="py-6 px-10 flex items-center justify-center gap-4 text-rose-600 font-black uppercase tracking-[0.2em] bg-rose-50 rounded-[32px] border border-rose-100 hover:bg-rose-600 hover:text-white transition-all group shadow-xl shadow-rose-500/5 italic">
                        <LogOut className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                        TERMINATE SESSION
                    </button>
                </div>
            </div>
        </div>
    );
};
