import React from "react";
import { motion } from "motion/react";
import { ClipboardList, Search, Filter, Map, Camera, Send, Clock, MapPin, Plus, CheckCircle2, AlertCircle } from "lucide-react";

export const HumanitarianFieldSurvey: React.FC = () => {
    const activeSurveys = [
        { id: "SRV-201", title: "مسح احتياجات مياه حي الروضة", location: "صنعاء", status: "Ongoing", progress: 75, date: "اليوم" },
        { id: "SRV-202", title: "تقييم أضرار قصف الحديدة", location: "الحديدة", status: "Critical", progress: 30, date: "أمس" },
        { id: "SRV-203", title: "إحصاء النازحين في مخيم السلام", location: "عدن", status: "Completed", progress: 100, date: "منذ يومين" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in zoom-in-95 duration-700">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <ClipboardList className="w-8 h-8 text-amber-600" />
                        المسح الميداني
                    </h2>
                    <p className="text-slate-500 font-bold italic">جمع البيانات الميدانية، تقييم الاحتياجات العاجلة، وتوثيق الأضرار في مناطق الصراع</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-amber-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-amber-500/20 active:scale-95 leading-none">
                        <Plus className="w-4 h-4" />
                        بدء مسح جديد
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl p-10 space-y-8">
                         <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-800">تقديم بيانات سريعة</h3>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">GPS ACTIVE: 15.3694° N, 44.1910° E</span>
                         </div>

                         <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input 
                                    type="text" 
                                    placeholder="نوع الحالة (غذاء، ماء، مأوى...)" 
                                    className="w-full py-4 px-6 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-amber-50 focus:border-amber-200 outline-none transition-all font-medium italic"
                                />
                                <input 
                                    type="number" 
                                    placeholder="عدد الأفراد المتضررين" 
                                    className="w-full py-4 px-6 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-amber-50 focus:border-amber-200 outline-none transition-all font-medium italic"
                                />
                            </div>
                            <textarea 
                                placeholder="ملاحظات ميدانية إضافية حول الوضع الحالي..." 
                                rows={4}
                                className="w-full py-4 px-6 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-amber-50 focus:border-amber-200 outline-none transition-all font-medium italic resize-none"
                            />
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 group cursor-pointer hover:border-amber-200 hover:text-amber-600 transition-all">
                                    <Camera className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-black uppercase tracking-tighter">التقاط صورة</span>
                                </div>
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="aspect-square bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden">
                                         <div className="w-full h-full bg-slate-200 animate-pulse" />
                                    </div>
                                ))}
                            </div>
                         </div>

                         <button className="w-full py-6 bg-slate-900 text-white rounded-[32px] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-amber-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-4">
                            رفع البيانات الميدانية
                            <Send className="w-4 h-4" />
                         </button>
                    </div>

                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                            <h3 className="font-black text-slate-900 italic uppercase">تقييمات نشطة</h3>
                            <button className="p-3 bg-white rounded-xl text-slate-300 hover:text-slate-900 shadow-sm transition-all">
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {activeSurveys.map((survey, idx) => (
                                <div key={idx} className="p-8 hover:bg-slate-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer">
                                    <div className="flex gap-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all shadow-sm ${
                                            survey.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                                            survey.status === 'Critical' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                                        }`}>
                                             {survey.status === 'Completed' ? <CheckCircle2 className="w-7 h-7" /> : <Clock className="w-7 h-7" />}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors italic tracking-tight uppercase leading-none">{survey.title}</h4>
                                            <div className="flex items-center gap-4 mt-2">
                                                <span className="text-[10px] font-black text-slate-300 italic flex items-center gap-1 font-mono uppercase tracking-widest">
                                                    <MapPin className="w-3 h-3" />
                                                    {survey.location}
                                                </span>
                                                <span className="text-[10px] font-black text-slate-400 italic uppercase tracking-widest">{survey.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right w-full md:w-32">
                                        <div className="flex justify-between mb-2 text-[10px] font-black uppercase italic">
                                            <span className="text-slate-300">نسبة المسح</span>
                                            <span className="text-amber-600">{survey.progress}%</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-500" style={{ width: `${survey.progress}%` }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[56px] p-12 text-white relative overflow-hidden shadow-2xl group border border-slate-800">
                        <Map className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-tight mb-8">عرض الخريطة الحرارية</h3>
                            <p className="text-slate-400 text-sm italic font-medium mb-12 leading-relaxed">تتبع تركيز الاحتياجات الإنسانية في الميدان عبر الخريطة التفاعلية المحدثة لحظياً.</p>
                            <button className="w-full py-5 bg-white text-slate-900 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-600 hover:text-white transition-all shadow-xl">
                                فتح الخريطة الميدانية
                            </button>
                        </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 rounded-[40px] p-10 space-y-4">
                        <div className="w-12 h-12 bg-amber-200 rounded-2xl flex items-center justify-center text-amber-700">
                             <AlertCircle className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-black italic uppercase text-amber-900">توجيهات المسح</h4>
                        <p className="text-amber-800/60 text-sm font-bold italic leading-relaxed">يرجى التأكد من دقة البيانات ووضوح الصور المرفقة لضمان سرعة الاستجابة من مركز العمليات.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
