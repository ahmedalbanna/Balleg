import React from "react";
import { motion } from "motion/react";
import { Shield, Bell, AlertTriangle, Lock, Eye, RotateCcw, ShieldCheck, Fingerprint, Key, HardDrive, Smartphone, UserX } from "lucide-react";

export const VerifierSecurityNotifs: React.FC = () => {
    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1200px] mx-auto pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">Security Intelligence</h1>
                    <p className="text-slate-500 font-medium text-sm mt-3 underline decoration-rose-500 decoration-dotted underline-offset-8">مركز الأمان المتكامل وحماية بيانات التوثيق</p>
                </div>
                <div className="flex items-center gap-4 bg-rose-50 text-rose-600 px-8 py-4 rounded-[2rem] border border-rose-100 shadow-xl group cursor-pointer active:scale-95 transition-all">
                    <Shield className="w-6 h-6 animate-pulse" />
                    <div className="text-right">
                         <p className="text-[10px] font-black uppercase text-rose-400 tracking-widest">Active Protection</p>
                         <p className="text-lg font-black italic">LEVEL: MAXIMUM</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest flex items-center gap-3">
                         <Bell className="w-4 h-4" />
                         Security History
                    </h3>
                    {[
                        { id: "SEC-901", title: "محاولة دخول من جهاز غير معروف", type: "Urgent", time: "٢ م", system: "Auth-Guard" },
                        { id: "SEC-900", title: "تشفير قاعدة بيانات القطاع الغربي", type: "Notify", time: "٤ م", system: "DB-X0" },
                        { id: "SEC-899", title: "تحديث مفاتيح التوقيع الرقمي", type: "Security", time: "أمس", system: "E-Signature" },
                        { id: "SEC-898", title: "اكتمال المسح الأمني بنجاح", type: "Health", time: "أمس", system: "Scanner" },
                    ].map((alert, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex items-center justify-between gap-6 group hover:border-slate-300 transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-6 grow">
                                <div className={`p-5 rounded-[1.5rem] ${
                                    alert.type === 'Urgent' ? 'bg-rose-50 text-rose-600' :
                                    alert.type === 'Health' ? 'bg-emerald-50 text-emerald-600' :
                                    'bg-slate-900 text-white shadow-xl'
                                }`}>
                                    <Fingerprint className="w-7 h-7" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[9px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{alert.id}</span>
                                        <span className="text-[9px] font-black uppercase text-blue-600 italic tracking-widest">• {alert.system}</span>
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 italic tracking-tight">{alert.title}</h4>
                                    <p className="text-xs font-bold text-slate-400">تنبيه {alert.type} • سجل الـ{alert.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-all"><Eye className="w-5 h-5" /></button>
                                <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-rose-600 transition-all"><RotateCcw className="w-5 h-5" /></button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <h3 className="text-2xl font-black italic tracking-tighter mb-10 flex items-center gap-4">
                             <Lock className="w-8 h-8 text-blue-400" />
                             إعدادات الأمان المتقدمة
                        </h3>
                        <div className="space-y-6">
                            {[
                                { label: "المصادقة الثنائية (2FA)", status: "Active", icon: ShieldCheck },
                                { label: "البصمة الحيوية لتوقيع الوثائق", status: "Active", icon: Fingerprint },
                                { label: "تشفير البيانات الطرفي End-to-End", status: "Warning", icon: Key },
                                { label: "مسح الثغرات التلقائي", status: "Active", icon: RotateCcw },
                            ].map((opt, i) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-[2.5rem] border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group/item">
                                    <div className="flex items-center gap-5">
                                        <opt.icon className="w-6 h-6 text-slate-400 group-hover/item:text-white transition-colors" />
                                        <span className="text-[13px] font-black italic tracking-tight">{opt.label}</span>
                                    </div>
                                    <span className={`text-[9px] font-black uppercase px-4 py-1.5 rounded-full ${
                                        opt.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                                    }`}>{opt.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl space-y-8">
                        <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest flex items-center gap-3">
                             <Smartphone className="w-5 h-5" />
                             Connected Devices
                        </h3>
                        <div className="space-y-4">
                             {[
                                 { device: "MacBook Pro M2 - Verifier-X3", current: true, location: "Sana'a Control Center" },
                                 { device: "iPhone 15 Pro Max", current: false, location: "Mobile Field Operartion" },
                             ].map((dev, i) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-white">
                                    <div className="flex items-center gap-5">
                                        <div className={`w-3 h-3 rounded-full ${dev.current ? 'bg-emerald-500 shadow-lg shadow-emerald-200' : 'bg-slate-300'}`} />
                                        <div>
                                            <h4 className="text-[14px] font-black italic text-slate-900 tracking-tight">{dev.device}</h4>
                                            <p className="text-[10px] font-bold text-slate-400">{dev.location}</p>
                                        </div>
                                    </div>
                                    <button className="p-3 bg-white rounded-xl text-rose-500 hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                                        <UserX className="w-4 h-4" />
                                    </button>
                                </div>
                             ))}
                        </div>
                        <button className="w-full bg-slate-900 text-white py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                            Sign Out All Other Devices
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
