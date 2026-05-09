import React from "react";
import { motion } from "motion/react";
import { Settings, User, Shield, HardDrive, Smartphone, Bell, Lock, Globe, Database, History, CreditCard, ChevronRight } from "lucide-react";

export const VerifierSettings: React.FC = () => {
    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1000px] mx-auto pb-32">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b-2 border-slate-100">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase underline decoration-blue-600 decoration-8 underline-offset-12">Platform Config</h1>
                    <p className="text-slate-500 font-medium text-sm mt-4 italic tracking-widest uppercase">Global Control | Verifier Instance x-04</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {[
                    { label: "إدارة الحساب", desc: "Profile Information & Professional Data", icon: User },
                    { label: "الأمان المتقدم", desc: "Two-Factor Auth & E-Signatures", icon: Lock },
                    { label: "إشعارات العمل", desc: "Notification Routes & Critical Alerts", icon: Bell },
                    { label: "الأجهزة الموثقة", desc: "Verified Access Endpoints", icon: Smartphone },
                    { label: "مساحة التخزين", desc: "Archived Documents & Data Backup", icon: HardDrive },
                    { label: "سجل النشاط", desc: "Self-Audit Logs & Transaction History", icon: History },
                    { label: "اللغة والمنطقة", desc: "Localization & Timezone Settings", icon: Globe },
                    { label: "إدارة الفواتير", desc: "Service Subscriptions & Technical Fees", icon: CreditCard },
                 ].map((s, i) => (
                    <motion.button 
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-sm flex items-center justify-between text-right group hover:border-blue-200 transition-all"
                    >
                        <div className="flex items-center gap-8 grow">
                            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-400 group-hover:bg-blue-900 group-hover:text-white transition-all shadow-sm">
                                <s.icon className="w-10 h-10" />
                            </div>
                            <div className="grow">
                                <h4 className="font-black text-slate-900 text-2xl italic tracking-tighter mb-1">{s.label}</h4>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.desc}</p>
                            </div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-blue-600 transition-colors" />
                    </motion.button>
                 ))}
            </div>

            <div className="mt-16 bg-rose-50/50 p-12 rounded-[4rem] border-2 border-rose-100/50 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm">
                <div>
                     <h3 className="text-2xl font-black italic text-rose-900 mb-2">منطقة الخطر | <span className="text-rose-500 uppercase">Danger Zone</span></h3>
                     <p className="text-sm font-bold text-rose-700/60 max-w-md">تغيير هذه الإعدادات قد يؤدي إلى تعطيل وصولك للمنصة أو فقدان البيانات الموثقة بشكل نهائي.</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-white border-2 border-rose-200 text-rose-600 px-10 py-5 rounded-3xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all">
                        Reset Cache
                    </button>
                    <button className="bg-rose-600 text-white px-10 py-5 rounded-3xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-rose-200 hover:scale-105 active:scale-95 transition-all">
                        Delete Instance
                    </button>
                </div>
            </div>
        </div>
    );
};
