import React from "react";
import { motion } from "motion/react";
import { Layers, Search, Filter, ShieldCheck, Cpu, HardDrive, Zap, Info, ChevronRight, Box, Share2, Server, Globe } from "lucide-react";

export const DeveloperLayers: React.FC = () => {
    const layers = [
        { name: "Frontend / Static", description: "Vite + React artifacts, global CDN", status: "Active", traffic: "1.2M req/h" },
        { name: "Edge Middleware", description: "Authentication & Header sanitization", status: "Active", traffic: "900K req/h" },
        { name: "Application Core", description: "Business logic, Microservices, SDKs", status: "Scaling", traffic: "850K req/h" },
        { name: "Persistence Layer", description: "Firestore, Redis, VectorDB clusters", status: "Active", traffic: "450K ops/h" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Layers className="w-8 h-8 text-indigo-600" />
                        إدارة الطبقات
                    </h2>
                    <p className="text-slate-500 font-bold italic">هيكلة النظام الطبقية (N-Tier Architecture)، عزل المسؤوليات، واستهلاك الموارد لكل طبقة</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-6">
                    {layers.map((layer, i) => (
                        <motion.div 
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500 group-hover:w-4 transition-all" />
                            <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
                                {i === 0 ? <Globe className="w-10 h-10" /> : i === 1 ? <Zap className="w-10 h-10" /> : i === 2 ? <Cpu className="w-10 h-10" /> : <Database className="w-10 h-10" />}
                            </div>
                            <div className="flex-1 text-center md:text-right space-y-2">
                                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1">
                                    <h4 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors italic tracking-tight leading-none uppercase">{layer.name}</h4>
                                    <span className={`text-[8px] font-black px-2 py-1 rounded inline-block uppercase tracking-widest mx-auto md:mx-0 ${
                                        layer.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600 animate-pulse'
                                    }`}>
                                        {layer.status}
                                    </span>
                                </div>
                                <p className="text-slate-400 font-medium italic">{layer.description}</p>
                            </div>
                            <div className="w-full md:w-auto p-6 bg-slate-50 rounded-3xl flex flex-col items-center justify-center min-w-[140px] group-hover:bg-slate-900 group-hover:text-white transition-all transform group-hover:scale-105">
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-1">Current Traffic</span>
                                 <span className="text-lg font-black font-mono">{layer.traffic}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="space-y-8">
                    <div className="bg-indigo-600 rounded-[48px] p-10 text-white overflow-hidden relative shadow-2xl h-full flex flex-col justify-between group">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-tight mb-8">عزل الموارد</h3>
                            <div className="space-y-8">
                                {[
                                    { label: 'الأمان المادي', val: 'VPC Isolated', icon: ShieldCheck },
                                    { label: 'الربط الشبكي', val: 'Mesh Network', icon: Share2 },
                                    { label: 'التوسع التلقائي', val: 'K8s Managed', icon: Server },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-6 group/item">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-xl group-hover/item:bg-white group-hover/item:text-indigo-600 transition-all">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 italic leading-none">{item.label}</p>
                                            <p className="font-black italic mt-1 font-mono">{item.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-12 relative z-10">
                             <button className="w-full py-5 bg-white text-slate-900 rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-white/10">
                                إعدادات الحاويات
                             </button>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Database = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
);
