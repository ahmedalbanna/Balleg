import { Newspaper, TrendingUp, Clock, Share2, FileVideo, Download, Filter, Search, MoreVertical, MessageSquare, ThumbsUp, AlertCircle, ExternalLink, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function JournalistDashboard() {
  const [activeFilter, setActiveFilter] = useState("trending");

  const trendingStories = [
    { 
        id: 1, 
        title: "أزمة تكدس النفايات في مخيم النازحين - الشمال", 
        support: "١,٢٤٠ تأييد", 
        media: "فيديو + ٣ صور", 
        status: "تأخر حاد (١٤ يوم)",
        urgency: "high"
    },
    { 
        id: 2, 
        title: "كابلات مكشوفة تهدد المارة في شارع الثورة", 
        support: "٨٥٠ تأييد", 
        media: "٢ صور", 
        status: "بانتظار الاستجابة",
        urgency: "medium"
    },
    { 
        id: 3, 
        title: "انقطاع المياه عن حي الصافية للأسبوع الثاني", 
        support: "٢,١٠٠ تأييد", 
        media: "تسجيل صوتي + صور", 
        status: "قيد المراجعة",
        urgency: "critical"
    },
  ];

  const statistics = [
    { label: "بلاغات برسم النشر", value: "٤٢", color: "text-purple-600" },
    { label: "متوسط وقت الاستجابة", value: "٧٢ ساعة", color: "text-slate-600" },
    { label: "بلاغات مهملة (>٣٠ يوم)", value: "١٨", color: "text-rose-600" },
  ];

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-slate-50/20 min-h-[85vh] rounded-[3rem] border border-slate-200/50 shadow-sm">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-purple-900 text-white flex items-center justify-center shadow-xl shadow-purple-900/20">
            <Newspaper className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex tracking-tight">غرفة أخبار الشفافية</h2>
            <p className="text-slate-500 mt-1 font-bold">بوابة الصحافة الاستقصائية والنشاط الرقمي لرصد قضايا المجتمع</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
            <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-2 text-xs font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                <Download className="w-4 h-4" />
                تحميل البيانات الخام (CSV)
            </button>
        </div>
      </header>

      {/* Media Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statistics.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Investigative Feed */}
        <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
                <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setActiveFilter("trending")}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                                activeFilter === 'trending' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-slate-500 hover:bg-slate-50'
                            }`}
                        >
                            الأكثر تداولاً
                        </button>
                        <button 
                            onClick={() => setActiveFilter("slowest")}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                                activeFilter === 'slowest' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-slate-500 hover:bg-slate-50'
                            }`}
                        >
                            البطء الإداري
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                        <input type="text" placeholder="ابحث في البلاغات المسجلة..." className="pr-10 pl-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold outline-none focus:ring-2 focus:ring-purple-100 transition-all w-full sm:w-48" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-4">
                    {trendingStories.map((story) => (
                        <div key={story.id} className="p-6 rounded-[2rem] border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-slate-200 transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-purple-600 border border-slate-50 font-black">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-800 text-sm group-hover:text-purple-700 transition-colors">{story.title}</h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1">
                                                <ThumbsUp className="w-3 h-3" />
                                                {story.support}
                                            </span>
                                            <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1">
                                                <FileVideo className="w-3 h-3" />
                                                {story.media}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                            
                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100/50">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${story.urgency === 'critical' ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'}`} />
                                    <span className="text-[10px] font-black text-slate-600">{story.status}</span>
                                </div>
                                <button className="flex items-center gap-2 text-[10px] font-black text-purple-600 hover:underline">
                                    معاينة القصة الكاملة
                                    <ExternalLink className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Investigative Tools */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                    <ShieldCheck className="w-32 h-32" />
                </div>
                <h3 className="text-xl font-black mb-4 font-readex">نظام الموثوقية</h3>
                <p className="text-xs font-bold text-slate-400 leading-relaxed mb-6">
                    جميع البيانات الموجودة هنا هي بيانات أولية وحية (Raw Data) تم التحقق منها عبر توقيعات زمنية وإحداثيات GPS لا يمكن التلاعب بها.
                </p>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[10px] font-bold">اتصال آمن بقاعدة البيانات المركزية</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] p-8 border border-slate-200 shadow-sm h-full">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-8">طلبات التعليق الرسمي</h4>
                <div className="space-y-4">
                   <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2 mb-3 text-amber-600">
                            <Clock className="w-3 h-3" />
                            <span className="text-[9px] font-black">بانتظار الرد (٤٨ ساعة)</span>
                        </div>
                        <p className="text-[11px] font-black text-slate-800 mb-1">بلاغ تلوث المياه - حي الصافية</p>
                        <p className="text-[10px] text-slate-500 font-bold">تم إرسال طلب توضيح لقسم الموارد المائية.</p>
                   </div>
                   <div className="p-5 rounded-3xl bg-green-50 border border-green-100">
                        <div className="flex items-center gap-2 mb-3 text-green-600">
                            <ShieldCheck className="w-3 h-3" />
                            <span className="text-[9px] font-black">وصل الرد الرسمي</span>
                        </div>
                        <p className="text-[11px] font-black text-slate-800 mb-1">بلاغ الإنارة العامة - شارع ٢٠</p>
                        <p className="text-[10px] text-green-700 font-bold">تحقق لإدراج الرد في تقريرك القادم.</p>
                   </div>
                </div>
                
                <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    طلب تصريح من المسؤول
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
