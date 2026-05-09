import React from "react";
import { motion } from "motion/react";
import { FileText, Search, Filter, Edit3, Trash2, Eye, Clock, CheckCircle2, AlertCircle, Plus, Send, Download } from "lucide-react";

export const JournalistArticles: React.FC = () => {
    const articles = [
        { id: "ART-801", title: "معاناة المدنيين في الجبهات المتقدمة", type: "Article", status: "Published", date: "اليوم - ١٠:٠٠ ص", views: "١,٢٤٠" },
        { id: "ART-802", title: "تقرير خاص: أزمة الغذاء في صعدة", type: "Draft", status: "In Review", date: "أمس - ٠٨:٣٠ م", views: "-" },
        { id: "ART-803", title: "تحليل: مستقبل التجارة في ميناء عدن", type: "Special", status: "Draft", date: "قبل يومين", views: "-" },
        { id: "ART-804", title: "لقاء مع مهربي المساعدات الإنسانية", type: "Expose", status: "Published", date: "الأسبوع الماضي", views: "٥,٨٠٠" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in slide-in-from-right-4 duration-1000">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <FileText className="w-8 h-8 text-indigo-600" />
                        المسودات والمقالات
                    </h2>
                    <p className="text-slate-500 font-bold italic">إدارة المحتوى الصحفي، صياغة المسودات، متابعة حالة النشر، وتحليل التفاعل</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 leading-none">
                        <Plus className="w-4 h-4" />
                        إنشاء مسودة جديدة
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "إجمالي المقالات", val: "١٤٢", color: "indigo", icon: FileText },
                    { label: "مسودات نشطة", val: "٠٨", color: "amber", icon: Edit3 },
                    { label: "مقالات منشورة", val: "١٢٤", color: "emerald", icon: CheckCircle2 },
                    { label: "مراجعات معلقة", val: "٠٣", color: "rose", icon: AlertCircle },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                         <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-${stat.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000`} />
                         <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm`}>
                            <stat.icon className="w-8 h-8" />
                         </div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">{stat.label}</p>
                         <h3 className="text-3xl font-black text-slate-900 leading-none font-mono tracking-tighter uppercase">{stat.val}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[48px] border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="relative flex-1 group max-w-lg">
                         <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                         <input 
                            type="text" 
                            placeholder="البحث في المقالات أو المسودات..."
                            className="w-full py-5 pr-16 pl-8 bg-slate-50 border-transparent rounded-[30px] focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none transition-all font-medium italic"
                         />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="bg-slate-50/10 border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
                                <th className="px-10 py-6">كود المقال</th>
                                <th className="px-10 py-6">العنوان</th>
                                <th className="px-10 py-6">التاريخ</th>
                                <th className="px-10 py-6">المشاهدات</th>
                                <th className="px-10 py-6">الحالة</th>
                                <th className="px-10 py-6"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-right">
                            {articles.map((item, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors group cursor-pointer font-medium italic">
                                    <td className="px-10 py-8">
                                        <span className="text-slate-900 font-mono group-hover:text-indigo-600 transition-colors text-xs opacity-50 uppercase tracking-widest">{item.id}</span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-800 italic uppercase tracking-tighter">{item.title}</span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase italic mt-1">{item.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                                            <Clock className="w-4 h-4 text-indigo-500" />
                                            {item.date}
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-slate-400 text-sm font-mono">
                                        {item.views}
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${
                                            item.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 
                                            item.status === 'In Review' ? 'bg-amber-50 text-amber-600 animate-pulse' :
                                            'bg-slate-100 text-slate-400'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-2">
                                            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-indigo-600 hover:border-indigo-100 transition-all">
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-slate-900 transition-all">
                                                <Send className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
