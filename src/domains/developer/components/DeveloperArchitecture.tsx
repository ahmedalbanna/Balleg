import React from "react";
import { motion } from "motion/react";
import { Layout, Server, Cloud, GitBranch, Share2, Layers, Search, Filter, ShieldCheck, Cpu, HardDrive, Zap, Info } from "lucide-react";

export const DeveloperArchitecture: React.FC = () => {
    const services = [
        { name: "Core API Gateway", type: "Gateway", region: "eu-west-1", load: "45%", health: "Healthy" },
        { name: "Auth Microservice", type: "Service", region: "eu-west-1", load: "12%", health: "Healthy" },
        { name: "Real-time Sync", type: "WebSocket", region: "global", load: "88%", health: "Busy" },
        { name: "AI Inference Engine", type: "Compute", region: "us-east-1", load: "25%", health: "Healthy" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Share2 className="w-8 h-8 text-indigo-600" />
                        بنية الخدمات
                    </h2>
                    <p className="text-slate-500 font-bold italic">مخطط الخدمات الميكروية، تدفق البيانات، وإدارة توازن الحمل (Load Balancing)</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                        <Share2 className="w-4 h-4" />
                        تحميل المخطط المعماري
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                     <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl p-8 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
                        <h3 className="text-lg font-black italic uppercase mb-8 text-slate-900">حالة انتشار الخدمات</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {services.map((service, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="p-6 bg-slate-50 rounded-3xl border border-transparent hover:border-indigo-100 hover:bg-white transition-all group/item"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-600 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all">
                                            <Server className="w-5 h-5" />
                                        </div>
                                        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${
                                            service.health === 'Healthy' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                                        }`}>
                                            {service.health}
                                        </span>
                                    </div>
                                    <h4 className="font-black text-slate-900 italic tracking-tight">{service.name}</h4>
                                    <div className="flex items-center justify-between mt-4">
                                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">{service.type} • {service.region}</span>
                                         <div className="flex items-center gap-2">
                                             <div className="w-12 h-1 bg-slate-200 rounded-full overflow-hidden">
                                                 <div className="h-full bg-indigo-500" style={{ width: service.load }} />
                                             </div>
                                             <span className="text-[10px] font-black text-slate-900">{service.load}</span>
                                         </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                     </div>

                     <div className="bg-slate-50/50 rounded-[40px] border border-slate-100 p-8 flex flex-col md:flex-row items-center gap-8">
                         <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center shrink-0">
                            <GitBranch className="w-10 h-10 text-indigo-600" />
                         </div>
                         <div className="text-center md:text-right">
                             <h4 className="text-xl font-black text-slate-900 italic mb-2">إدارة الفروع (Branch Isolation)</h4>
                             <p className="text-slate-500 text-sm font-medium italic leading-relaxed">نظام عزل البيئات يسمح بتجربة الميزات الجديدة في "صناديق رمل" مستقلة تماماً عن البيئة الإنتاجية لضمان استقرار المنصة.</p>
                         </div>
                         <button className="whitespace-nowrap px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all">
                            تخصيص البيئات
                         </button>
                     </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl h-full flex flex-col justify-between group">
                        <div className="relative z-10">
                            <header className="flex items-center justify-between mb-12">
                                <div>
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">معدل التوفر</h3>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1 italic">Service Level Objectives</p>
                                </div>
                                <Zap className="w-8 h-8 text-amber-500" />
                            </header>

                            <div className="space-y-10">
                                <div className="text-center p-8 bg-white/5 rounded-[40px] border border-white/5 backdrop-blur-xl group-hover:bg-white/10 transition-all">
                                    <span className="text-5xl font-black italic text-indigo-400 font-mono">٩٩.٩٤٪</span>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">متوسط التوفر الشهري</p>
                                </div>

                                <div className="space-y-6">
                                    {[
                                        { label: 'وقت التعطل', val: '٤٢ دقيقة', color: 'indigo-500' },
                                        { label: 'الاستجابة للخطأ', val: '١.٢ ثانية', color: 'indigo-400' },
                                        { label: 'عدد الطلبات', val: '١.٢ مليون', color: 'indigo-300' },
                                    ].map((s, i) => (
                                        <div key={i} className="flex items-center justify-between group/line">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">{s.label}</span>
                                            <span className="font-black italic font-mono text-indigo-200 group-hover/line:text-white transition-colors">{s.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 relative z-10">
                             <button className="w-full py-5 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-indigo-500/20 active:scale-95">
                                تقرير الصيانة الدورية
                             </button>
                        </div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:scale-150 transition-transform duration-1000" />
                    </div>
                </div>
            </div>
        </div>
    );
};
