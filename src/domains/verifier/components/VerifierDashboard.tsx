import { FileSearch, CheckCircle2, XCircle, AlertCircle, Image as ImageIcon, Mic, MapPin, Search, Filter, ChevronLeft, ChevronRight, History, BarChart3, ShieldCheck, Sparkles, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { aiService } from "../../core/services/ai";

export function VerifierDashboard() {
  const [selectedReport, setSelectedReport] = useState<number | null>(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isAIClassifying, setIsAIClassifying] = useState(false);
  const [aiClassification, setAiClassification] = useState<string | null>(null);

  const pendingReports = [
    { 
        id: 1, 
        title: "تسرب مياه ضخم - تقاطع شارع النصر", 
        timestamp: "منذ ٥ دقائق", 
        type: "بنية تحتية", 
        hasAudio: true, 
        hasImage: true,
        priority: "high"
    },
    { 
        id: 2, 
        title: "حفرة خطيرة في طريق المدرسة", 
        timestamp: "منذ ١٢ دقيقة", 
        type: "طرق", 
        hasAudio: false, 
        hasImage: true,
        priority: "critical"
    },
    { 
        id: 3, 
        title: "تراكم نفايات صلبة خلف السوق", 
        timestamp: "منذ ٢٤ دقيقة", 
        type: "نظافة", 
        hasAudio: true, 
        hasImage: true,
        priority: "medium"
    },
  ];

  const currentReport = pendingReports.find(r => r.id === selectedReport);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
        setIsVerifying(false);
        setAiClassification(null);
        setSelectedReport(prev => (prev && prev < pendingReports.length ? prev + 1 : null));
    }, 1500);
  };

  const handleAIClassify = async () => {
    const reportText = "هناك ماسورة مياه مكسورة في وسط الطريق تسبب في إعاقة حركة السير وتسرب كميات هائلة من المياه العذبة. الموقع يحتاج تدخل سريع قبل غرق المحلات المجاورة.";
    setIsAIClassifying(true);
    setAiClassification(null);
    
    const result = await aiService.classifyReport(reportText);
    
    if (result.success) {
        setAiClassification(result.classification || "غير معروف");
    } else {
        alert(result.error);
    }
    setIsAIClassifying(false);
  };

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-slate-50/20 min-h-[85vh] rounded-[3rem] border border-slate-200/50 shadow-sm relative overflow-hidden">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-slate-700 text-white flex items-center justify-center shadow-xl shadow-slate-900/20">
            <FileSearch className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex tracking-tight">غرفة مراجعة البيانات</h2>
            <p className="text-slate-500 mt-1 font-bold">المنصة التشغيلية الأولى للتحقق من صحة البلاغات وتصنيفها يدوياً</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">الإنتاجية اليوم</p>
                    <p className="text-lg font-black text-slate-900 leading-none">١٢٨ بلاغاً</p>
                </div>
                <div className="w-px h-8 bg-slate-100" />
                <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">دقة التصنيف</p>
                    <p className="text-lg font-black text-emerald-600 leading-none">٩٨.٥٪</p>
                </div>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Queue List */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
                <div className="p-6 border-b border-slate-50">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">قائمة الانتظار (١٨)</h3>
                        <History className="w-4 h-4 text-slate-300" />
                    </div>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                        <input type="text" placeholder="بحث في المعرفات..." className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold outline-none" />
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-3">
                    {pendingReports.map(report => (
                        <button 
                            key={report.id}
                            onClick={() => setSelectedReport(report.id)}
                            className={`w-full text-right p-4 rounded-2xl border transition-all ${
                                selectedReport === report.id 
                                ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20 active-scale-95' 
                                : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-white hover:border-slate-300'
                            }`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${
                                    selectedReport === report.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                                }`}>
                                    {report.type}
                                </span>
                                <span className={`text-[9px] font-bold ${selectedReport === report.id ? 'text-slate-400' : 'text-slate-400'}`}>
                                    {report.timestamp}
                                </span>
                            </div>
                            <h4 className="text-xs font-black truncate">{report.title}</h4>
                            <div className="flex items-center gap-2 mt-3">
                                {report.hasImage && <ImageIcon className={`w-3 h-3 ${selectedReport === report.id ? 'text-slate-400' : 'text-slate-300'}`} />}
                                {report.hasAudio && <Mic className={`w-3 h-3 ${selectedReport === report.id ? 'text-slate-400' : 'text-slate-300'}`} />}
                                <div className={`ml-auto w-1.5 h-1.5 rounded-full ${report.priority === 'critical' ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'}`} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Verification Stage */}
        <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
                {selectedReport ? (
                    <motion.div 
                        key={selectedReport}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col"
                    >
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 font-readex">فحص البلاغ #{currentReport?.id}</h3>
                                <p className="text-[11px] font-bold text-slate-500 mt-1">المبلغ: مجهول (هاتف محمول) • إحداثيات موثقة</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-all shadow-sm">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                                <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-all shadow-sm">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="aspect-video bg-slate-200 rounded-[2rem] overflow-hidden relative group">
                                        <img 
                                            src={`https://images.unsplash.com/photo-1584467541268-b027f6120b28?auto=format&fit=crop&q=80&w=800`} 
                                            alt="Evidence" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            referrerPolicy="no-referrer"
                                        />
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="px-6 py-2.5 bg-white text-slate-900 rounded-xl text-[10px] font-black shadow-xl">تفعيل المكبر</button>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <Mic className="w-4 h-4 text-slate-400" />
                                                <span className="text-[10px] font-black text-slate-900 uppercase">التسجيل الصوتي للمبلغ</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400">٠٠:١٨</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden relative">
                                            <div className="absolute inset-y-0 left-0 w-1/3 bg-slate-900" />
                                        </div>
                                        <div className="flex justify-between mt-3">
                                            <button className="text-[9px] font-black text-slate-400 hover:text-slate-900 transition-colors">تحويل لصوت لنص (AI)</button>
                                            <button className="text-[9px] font-black text-slate-400 hover:text-slate-900 transition-colors">تحميل المقطع</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8 text-right">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">وصف البلاغ</label>
                                        <p className="text-sm font-bold text-slate-800 leading-relaxed bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                            "هناك ماسورة مياه مكسورة في وسط الطريق تسبب في إعاقة حركة السير وتسرب كميات هائلة من المياه العذبة. الموقع يحتاج تدخل سريع قبل غرق المحلات المجاورة."
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2 relative">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] font-black text-slate-400 uppercase block">التصنيف المختارة</label>
                                                <button 
                                                    onClick={handleAIClassify}
                                                    disabled={isAIClassifying}
                                                    className="flex items-center gap-1 text-[9px] font-black text-violet-600 bg-violet-50 px-2 py-1 rounded-lg hover:bg-violet-100 transition-colors disabled:opacity-50"
                                                >
                                                    {isAIClassifying ? (
                                                        <div className="w-2 h-2 border border-violet-600 border-t-transparent rounded-full animate-spin" />
                                                    ) : <Sparkles className="w-2 h-2" />}
                                                    تصنيف ذكي
                                                </button>
                                            </div>
                                            <div className="relative">
                                                <select 
                                                    value={aiClassification || ""}
                                                    onChange={(e) => setAiClassification(e.target.value)}
                                                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[11px] font-black outline-none focus:ring-2 focus:ring-slate-100 transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="">{aiClassification ? aiClassification : "بنية تحتية - مياه"}</option>
                                                    <option value="طرق">طرق وعوائق</option>
                                                    <option value="نظافة">نظافة عامة</option>
                                                    <option value="كهرباء">أعطال كهرباء</option>
                                                    <option value="إنساني">إنساني</option>
                                                    <option value="طارئ">حالة طوارئ</option>
                                                </select>
                                                {aiClassification && (
                                                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                        <Wand2 className="w-3 h-3 text-violet-500 animate-pulse" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase block">مستوى الأولوية</label>
                                            <div className="flex gap-2">
                                                <button className="flex-1 py-4 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 text-[10px] font-black shadow-sm">حرج</button>
                                                <button className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100 text-[10px] font-black">عادي</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-slate-900 rounded-[2.5rem] text-white">
                                        <div className="flex items-center gap-3 mb-3">
                                            <MapPin className="w-5 h-5 text-slate-400" />
                                            <span className="text-xs font-black">الموقع الجغرافي الموثق</span>
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-400 mb-4 leading-relaxed">
                                            الإحداثيات: 15.3694° N, 44.1910° E <br />
                                            حي الصافية، القطاع الرابع، المنطقة المجاورة لشارع النصر.
                                        </div>
                                        <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-black transition-all border border-white/10">مشاهدة على الخريطة الحرارية</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={handleVerify}
                                disabled={isVerifying}
                                className="flex-[2] py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-sm hover:bg-emerald-700 transition-all shadow-[0_15px_30px_-5px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 disabled:opacity-70"
                            >
                                {isVerifying ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-5 h-5" />
                                        اعتماد وتوجيه للقسم المختص
                                    </>
                                )}
                            </button>
                            <button className="flex-1 py-5 bg-white border border-slate-200 text-slate-400 rounded-[2rem] font-black text-sm hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all flex items-center justify-center gap-3">
                                <XCircle className="w-5 h-5" />
                                استبعاد (بلاغ وهمي)
                            </button>
                            <button className="flex-1 py-5 bg-white border border-slate-200 text-slate-400 rounded-[2rem] font-black text-sm hover:bg-slate-100 hover:text-slate-900 transition-all flex items-center justify-center gap-3">
                                <AlertCircle className="w-5 h-5" />
                                يحتاج مراجعة ميدانية
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm h-full flex flex-col items-center justify-center p-20 text-center">
                        <div className="w-24 h-24 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-300 mb-8">
                            <ShieldCheck className="w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 font-readex mb-3 tracking-tight">قائمة الانتظار فارغة</h3>
                        <p className="text-slate-500 font-bold max-w-sm mx-auto leading-relaxed">
                            لقد قمت بمراجعة جميع البلاغات المعلقة بنجاح. يمكنك استعراض الأرشيف أو تحليل أداء اليوم.
                        </p>
                        <div className="mt-12 flex gap-4">
                            <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black shadow-xl">استعراض الأرشيف</button>
                            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-xs font-black">تحليل الأداء الفردي</button>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
