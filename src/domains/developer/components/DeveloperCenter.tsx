import React from "react";
import { motion } from "motion/react";
import { BookOpen, Code2, Cpu, ExternalLink, FileCode, Github, HelpCircle, Mail, MessageSquare, Phone, Search, Terminal, Zap, ShieldCheck } from "lucide-react";

export const DeveloperCenter: React.FC = () => {
    const devResources = [
        { title: "توثيق واجهة برمجة التطبيقات (API Docs)", desc: "مرجع شامل لجميعEndpoints ونماذج البيانات.", icon: FileCode, color: "indigo" },
        { title: "مجموعة أدوات التطوير (SDKs)", desc: "مكتبات جاهزة للغات (TS, Python, Go).", icon: Code2, color: "blue" },
        { title: "بيئة الاختبار (Sandbox)", desc: "منصة آمنة لتجربة التكامل دون التأثير على البيانات.", icon: Cpu, color: "emerald" },
        { title: "دليل الأمان والتشفير", desc: "أفضل الممارسات لحماية المفاتيح والبيانات.", icon: ShieldCheck, color: "rose" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800 max-w-6xl mx-auto">
            <div className="text-center space-y-6">
                <h2 className="text-4xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center justify-center gap-4">
                    مركز المطورين
                    <BookOpen className="w-10 h-10 text-indigo-600" />
                </h2>
                <p className="text-slate-500 font-medium max-w-xl mx-auto italic">الموارد التقنية، التوثيق البرمجي، وأدوات التكامل لمنصة السوق اليمني</p>
                
                <div className="relative max-w-2xl mx-auto group">
                    <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="البحث في الوثائق، الدوال، وأخطاء النظام..."
                        className="w-full py-5 pr-14 pl-8 bg-white border border-slate-100 rounded-[30px] shadow-2xl shadow-slate-200/40 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 transition-all text-lg font-medium outline-none text-center italic"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {devResources.map((resource, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -10 }}
                        className="p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all text-center group cursor-pointer h-full flex flex-col justify-between"
                    >
                        <div>
                            <div className={`w-16 h-16 rounded-[24px] bg-${resource.color}-50 flex items-center justify-center text-${resource.color}-600 mx-auto mb-6 group-hover:bg-${resource.color}-600 group-hover:text-white transition-all duration-700 shadow-sm`}>
                                <resource.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-black text-slate-900 mb-2 uppercase tracking-tighter italic leading-none">{resource.title}</h3>
                            <p className="text-slate-400 text-xs font-medium italic leading-relaxed">{resource.desc}</p>
                        </div>
                        <div className="mt-8 flex justify-center">
                            <ExternalLink className="w-5 h-5 text-slate-200 group-hover:text-indigo-600 transition-colors" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-slate-900 rounded-[48px] p-10 md:p-16 text-white overflow-hidden relative shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="space-y-8">
                        <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-tight">الدعم التقني المتخصص</h3>
                        <p className="text-slate-400 font-medium italic leading-relaxed text-lg">فريق مهندسي الأداء جاهز للمساعدة في حل مشاكل التكامل، تحسين الاستعلامات، وتكوين البنية التحتية.</p>
                        <div className="flex gap-4">
                            <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-slate-900 transition-all">
                                تواصل مع المهندسين
                            </button>
                            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center gap-3">
                                <Github className="w-4 h-4" />
                                GitHub Community
                            </button>
                        </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">System Status: All Systems Operational</span>
                        </div>
                        <div className="divide-y divide-white/5">
                            {[
                                { service: 'REST Gateway', response: '12ms' },
                                { service: 'Stream Broker', response: '5ms' },
                                { service: 'Identity Provider', response: '24ms' },
                            ].map((s, i) => (
                                <div key={i} className="py-4 flex justify-between items-center group/item hover:bg-white/5 transition-colors px-4 rounded-xl">
                                    <span className="text-sm font-black italic text-slate-400 group-hover/item:text-white transition-colors uppercase tracking-tight">{s.service}</span>
                                    <span className="text-xs font-mono text-indigo-400">{s.response}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -mr-48 -mt-48" />
            </div>
        </div>
    );
};
