import React from "react";
import { motion } from "motion/react";
import { FileBarChart, Search, Filter, Camera, CheckCircle2, AlertCircle, Clock, Send, Image as ImageIcon, MapPin, Plus } from "lucide-react";

export const HandymanReports: React.FC = () => {
    const historicalReports = [
        { id: "REP-401", title: "تقرير إنجاز المرحلة الأولى - جسر الروضة", date: "٢٤ مارس 2024", status: "Approved", completion: "١٠٠٪" },
        { id: "REP-402", title: "فحص جودة الخرسانة - مدرسة الوادي", date: "١٨ مارس 2024", status: "Under Review", completion: "٩٠٪" },
        { id: "REP-403", title: "تقرير حادث تشغيلي - مولد الميناء", date: "٠٥ مارس 2024", status: "Resolved", completion: "-" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in zoom-in-95 duration-700">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <FileBarChart className="w-8 h-8 text-emerald-600" />
                        تقارير الإنجاز
                    </h2>
                    <p className="text-slate-500 font-bold italic">توثيق سير العمل اليومي، رفع التقارير الفنية، ومشاركة الإنجازات مع الإدارة</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-emerald-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 leading-none">
                        <Plus className="w-4 h-4" />
                        إنشاء تقرير جديد
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl p-10 space-y-8">
                         <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-800">تقديم تقرير سريع</h3>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">الموقع الحالي: تعز - حي الروضة</span>
                         </div>

                         <div className="space-y-4">
                            <input 
                                type="text" 
                                placeholder="عنوان التقرير (مثال: انتهاء صب القواعد)" 
                                className="w-full py-4 px-6 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-200 outline-none transition-all font-medium italic"
                            />
                            <textarea 
                                placeholder="وصف تفصيلي للأعمال المنجزة اليوم..." 
                                rows={4}
                                className="w-full py-4 px-6 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-200 outline-none transition-all font-medium italic resize-none"
                            />
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 group cursor-pointer hover:border-emerald-200 hover:text-emerald-600 transition-all">
                                    <Camera className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-black uppercase tracking-tighter">إضافة صورة</span>
                                </div>
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="aspect-square bg-slate-100 rounded-2xl border border-slate-200" />
                                ))}
                            </div>
                         </div>

                         <button className="w-full py-6 bg-slate-900 text-white rounded-[32px] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-4">
                            ارسال التقرير الميداني
                            <Send className="w-4 h-4" />
                         </button>
                    </div>

                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                            <h3 className="font-black text-slate-900 italic uppercase">التقارير السابقة</h3>
                            <button className="p-3 bg-white rounded-xl text-slate-300 hover:text-slate-900 shadow-sm transition-all">
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {historicalReports.map((report, idx) => (
                                <div key={idx} className="p-8 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer">
                                    <div className="flex gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                                             <CheckCircle2 className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors italic tracking-tight uppercase leading-none">{report.title}</h4>
                                            <div className="flex items-center gap-4 mt-2">
                                                <span className="text-[10px] font-black text-slate-300 italic flex items-center gap-1 font-mono uppercase tracking-widest">
                                                    <Clock className="w-3 h-3" />
                                                    {report.date}
                                                </span>
                                                <span className="text-[10px] font-black text-emerald-500 italic uppercase tracking-widest">{report.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-slate-900 italic">{report.completion}</div>
                                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">نسبة الأثر</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                     <div className="bg-slate-100 rounded-[56px] p-12 text-slate-900 flex flex-col justify-between shadow-2xl relative overflow-hidden group border border-slate-200">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-tight mb-8">إحصائيات إنجازك</h3>
                            <div className="space-y-10">
                                {[
                                    { label: 'تقارير فنية', val: '٤٨ ملف', icon: FileBarChart },
                                    { label: 'صور توثيقية', val: '١.٢ ألف صورة', icon: ImageIcon },
                                    { label: 'مواقع مكتملة', val: '١٢ موقع', icon: MapPin },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-6 group/item">
                                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-xl group-hover/item:bg-emerald-600 group-hover/item:text-white transition-all">
                                            <item.icon className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic leading-none">{item.label}</p>
                                            <p className="font-black italic mt-1 text-emerald-600 group-hover/item:text-emerald-700 transition-colors uppercase tracking-tight">{item.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
