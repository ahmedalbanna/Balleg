import React from "react";
import { motion } from "motion/react";
import { Link2, Globe, ArrowRightLeft, ShieldCheck, Activity, BarChart, Server, Zap, PieChart, TrendingUp, History, Bell, AlertTriangle, Monitor, RotateCcw, Settings, User, Eye, Lock, HardDrive, Smartphone, CreditCard } from "lucide-react";

export const TelecomInterconnect: React.FC = () => {
    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">Interconnect Hub</h1>
                <p className="text-slate-500 font-medium text-sm mt-1">إدارة الربط مع المشغلين المحليين والدوليين</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                     { label: "Local Peer Traffic", val: "840 Gbps", unit: "per min", color: "text-blue-600" },
                     { label: "Intl. Gateway Load", val: "1.2 Tbps", unit: "per min", color: "text-indigo-600" },
                     { label: "Latent Interconnect", val: "12ms", unit: "avg delay", color: "text-emerald-600" },
                 ].map((s, i) => (
                    <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{s.label}</p>
                        <div className="flex items-baseline gap-2">
                             <span className="text-2xl font-black text-slate-900">{s.val}</span>
                             <span className="text-[10px] font-black text-slate-400 italic">{s.unit}</span>
                        </div>
                    </div>
                 ))}
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <h3 className="text-lg font-black italic">اتفاقيات الربط النشطة</h3>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>All Links Active</span>
                    </div>
                </div>
                <div className="divide-y divide-slate-50">
                    {[
                        { partner: "TeleYemen", type: "Backbone", status: "Active", bandwidth: "10 Tbps", health: 99.9 },
                        { partner: "SabaFon", type: "Peer", status: "Active", bandwidth: "2 Tbps", health: 98.4 },
                        { partner: "MTN/You", type: "Roaming", status: "Ongoing", bandwidth: "1.5 Tbps", health: 97.2 },
                        { partner: "Fiber-X Intl.", type: "Gateway", status: "Active", bandwidth: "5 Tbps", health: 99.9 },
                    ].map((partner, i) => (
                        <div key={i} className="p-8 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                                    <Globe className="w-7 h-7" />
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-900 italic text-xl">{partner.partner}</h4>
                                    <p className="text-xs font-bold text-slate-500 uppercase">{partner.type} Integration</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-12">
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase">Capacity</p>
                                    <p className="font-black text-slate-900">{partner.bandwidth}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase">Health</p>
                                    <p className={`font-black uppercase ${partner.health > 99 ? 'text-emerald-500' : 'text-amber-500'}`}>{partner.health}%</p>
                                </div>
                                <ArrowRightLeft className="w-5 h-5 text-slate-300 mx-4" />
                                <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest italic group overflow-hidden relative">
                                    <span className="relative z-10">Configure</span>
                                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const TelecomCapacityReports: React.FC = () => {
    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">تقارير السعة والنمو</h1>
                <p className="text-slate-500 font-medium text-sm mt-1">تحليل الاتجاهات المستقبلية للتوسع في الشبكة</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-white border border-slate-100 p-3 rounded-2xl shadow-sm"><PieChart className="w-5 h-5" /></button>
                    <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest">Download PDF</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 p-10 rounded-[4rem] text-white shadow-2xl relative overflow-hidden shrink-0">
                    <div className="absolute top-10 right-10 p-6 rounded-[2.5rem] bg-blue-600">
                        <TrendingUp className="w-10 h-10" />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <h3 className="text-3xl font-black italic tracking-tighter">النمو السنوي المتوقع (٢٠٢٦)</h3>
                        <p className="text-slate-400 font-bold max-w-sm">بناءً على تحليلات الذكاء الاصطناعي لحركة البيانات وسلوك المستخدمين الحالي.</p>
                        <div className="pt-8">
                             <p className="text-6xl font-black text-blue-400">+٤٢٪</p>
                             <p className="text-xs font-black uppercase tracking-widest text-slate-500 mt-4 underline decoration-blue-500 underline-offset-8">Data Traffic Surge</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-xl flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-black italic">توصيات الترقية</h3>
                        <span className="text-[10px] font-black uppercase text-slate-400">Analysis v2.4</span>
                    </div>
                    <div className="space-y-6">
                        {[
                            { title: "Node-Sana'a-X3", urgency: "High", action: "Replace Switches" },
                            { title: "Gateway-International-02", urgency: "Medium", action: "Upgrade Fiber Link" },
                            { title: "Cloud-Compute-A", urgency: "Critical", action: "Memory Expansion" },
                        ].map((rec, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2.5rem]">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Target</p>
                                    <h4 className="font-black text-slate-900 italic uppercase">{rec.title}</h4>
                                </div>
                                <div className="text-right">
                                    <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${
                                        rec.urgency === 'Critical' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-white'
                                    }`}>{rec.urgency}</span>
                                    <p className="text-xs font-bold text-slate-500 mt-2">{rec.action}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const TelecomAlerts: React.FC = () => {
    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1200px] mx-auto">
            <div className="flex items-center justify-between">
                <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">تنبيهات النظام</h1>
                <p className="text-slate-500 font-medium text-sm mt-1">مراقبة الثغرات التنبيهات الأمنية والفنية</p>
                </div>
                <div className="flex items-center gap-2 bg-rose-50 text-rose-600 px-6 py-3 rounded-2xl border border-rose-100">
                    <Bell className="w-5 h-5" />
                    <span className="text-xs font-black italic">4 Active Alerts</span>
                </div>
            </div>

            <div className="space-y-4">
                {[
                    { id: "ALR-991", title: "Power Failure detected in Sector B", type: "Critical", time: "2m ago", system: "Energy Monitor" },
                    { id: "ALR-990", title: "Latency spike on Interconnect Node 04", type: "Warning", time: "15m ago", system: "Traffic Ops" },
                    { id: "ALR-989", title: "Unauthorized login attempt blocked", type: "Security", time: "1h ago", system: "Core Firewall" },
                    { id: "ALR-988", title: "Backups completed successfully", type: "Info", time: "4h ago", system: "Cloud DB" },
                ].map((alert, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-md flex items-center justify-between gap-8"
                    >
                        <div className="flex items-center gap-6 grow">
                            <div className={`p-5 rounded-[2rem] ${
                                alert.type === 'Critical' ? 'bg-rose-50 text-rose-600' :
                                alert.type === 'Warning' ? 'bg-amber-50 text-amber-600' :
                                alert.type === 'Security' ? 'bg-slate-900 text-white' : 'bg-blue-50 text-blue-600'
                            }`}>
                                <AlertTriangle className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                     <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{alert.id}</span>
                                     <span className="text-[10px] font-black uppercase text-slate-500 italic">• {alert.system}</span>
                                </div>
                                <h4 className="text-xl font-black text-slate-900 italic tracking-tight">{alert.title}</h4>
                                <p className="text-xs font-bold text-slate-400 mt-1">{alert.time} • Marked as priority: {alert.type}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                             <button className="bg-slate-50 hover:bg-slate-100 p-4 rounded-2xl transition-colors"><Eye className="w-5 h-5 text-slate-400" /></button>
                             <button className="bg-slate-50 hover:bg-slate-100 p-4 rounded-2xl transition-colors"><RotateCcw className="w-5 h-5 text-slate-400" /></button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export const TelecomSettings: React.FC = () => {
    return (
        <div className="p-4 md:p-8 space-y-8 max-w-[1000px] mx-auto pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
                <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase underline decoration-blue-600 decoration-8 underline-offset-8">Platform Settings</h1>
                <p className="text-slate-500 font-medium text-sm mt-3">تخصيص تجربة الاستخدام وإعدادات النظام الحساسة</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    { label: "الملف الفني", desc: "إدارة البيانات التقنية والاعتمادات", icon: User },
                    { label: "الأمان والخصوصية", desc: "كلمة المرور وجدران الحماية الشخصية", icon: Lock },
                    { label: "مساحة التخزين", desc: "إدارة البيانات المؤرشفة والسجلات", icon: HardDrive },
                    { label: "الأجهزة المتصلة", desc: "الأجهزة النشطة التي تدخل للمنصة", icon: Smartphone },
                    { label: "إدارة الفوترة", desc: "الاشتراكات والمدفوعات والميزانية", icon: CreditCard },
                    { label: "إشعارات النظام", desc: "تخصيص وقت وطريقة وصول التنبيهات", icon: Bell },
                ].map((s, i) => (
                    <button key={i} className="flex items-center gap-6 p-8 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all text-right">
                        <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                            <s.icon className="w-8 h-8" />
                        </div>
                        <div className="grow">
                            <h4 className="font-black text-slate-900 text-lg mb-1">{s.label}</h4>
                            <p className="text-xs font-bold text-slate-400 italic tracking-tighter">{s.desc}</p>
                        </div>
                    </button>
                ))}
            </div>

            <div className="bg-rose-50 p-10 rounded-[4rem] border border-rose-100 flex items-center justify-between mt-12">
                <div>
                    <h3 className="text-xl font-black italic text-rose-900 mb-2">منطقة الخطر</h3>
                    <p className="text-sm font-bold text-rose-700">هذه الإجراءات قد تؤدي لفقدان البيانات أو تعطيل الوصول</p>
                </div>
                <button className="bg-rose-600 text-white px-8 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-rose-200">
                    Reset Site Data
                </button>
            </div>
        </div>
    );
};
