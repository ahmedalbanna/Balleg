import { Car, Mic, Map as MapIcon, ShieldAlert, Navigation, Zap, AlertTriangle, Clock } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import MapView from "../../locations/components/MapView";

export function DriverDashboard() {
  const [isRecording, setIsRecording] = useState(false);

  const hazardMarkers = [
    { id: '1', lat: 33.5138, lng: 36.2765, title: 'حفرة عميقة', description: 'حفرة كبيرة تشكل خطراً على الإطارات في منعطف الشارع الرئيسي', type: 'hazard' as const, status: 'نشط' },
    { id: '2', lat: 33.5200, lng: 36.2850, title: 'إشارة معطلة', description: 'الإشارة الضوئية لا تعمل في تقاطع الستين', type: 'hazard' as const, status: 'قيد المتابعة' },
    { id: '3', lat: 33.5100, lng: 36.2700, title: 'تراكم نفايات', description: 'وجود مخلفات بناء كبيرة تعيق الرؤية', type: 'complaint' as const, status: 'تم الرفع' },
  ];

  const driverStats = [
    { label: "نقاط السلامة", value: "٨٥٠", color: "text-amber-600", bg: "bg-amber-50" },
    { label: "بلاغات مؤكدة", value: "١٢", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "ساعات الطريق", value: "١٢٤", color: "text-slate-600", bg: "bg-slate-50" },
  ];

  const recentHazards = [
    { id: 1, type: "حفرة عميقة", location: "جولة ريماس", time: "منذ ١٠ دقائق", priority: "high" },
    { id: 2, type: "تعطل إشارة", location: "شارع تعز", time: "منذ ٣٠ دقيقة", priority: "medium" },
    { id: 3, type: "تراكم نفايات", location: "باب اليمن", time: "منذ ساعة", priority: "low" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full p-2 sm:p-8 bg-white min-h-[85vh] rounded-[2.5rem] border border-slate-100 text-slate-900 overflow-hidden relative shadow-sm">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[120px] -z-10 rounded-full"></div>
      
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xl shadow-amber-500/20">
            <Car className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black font-readex text-slate-900">بوابة العين الساهرة</h2>
            <p className="text-slate-500 text-sm mt-1">طرق أكثر أماناً.. بفضل بلاغاتك السريعة</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">الحالة الحالية</span>
                <span className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    متصل - نشط في الميدان
                </span>
            </div>
        </div>
      </header>

      {/* Main Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* BIG ACTION: Quick Voice Report */}
        <div className="lg:col-span-8 flex flex-col gap-6">
            <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsRecording(!isRecording)}
                className={`relative h-64 rounded-[2rem] border-2 transition-all flex flex-col items-center justify-center gap-6 group overflow-hidden cursor-pointer ${
                    isRecording 
                    ? 'border-red-500 bg-red-50 shadow-[0_0_50px_rgba(239,68,68,0.1)]' 
                    : 'border-slate-100 bg-slate-50/50 hover:border-amber-500/50 hover:bg-white hover:shadow-xl hover:shadow-amber-500/5'
                }`}
            >
                {isRecording && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.3, 0.5, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-red-500/10"
                    />
                )}
                
                <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isRecording ? 'bg-red-500 shadow-xl' : 'bg-white shadow-lg border border-slate-100 group-hover:bg-amber-500 group-hover:text-white text-slate-400'
                }`}>
                    <Mic className={`w-10 h-10 ${isRecording ? 'animate-pulse text-white' : ''}`} />
                </div>
                
                <div className="text-center relative z-10">
                    <h3 className={`text-2xl font-black mb-2 ${isRecording ? 'text-red-600' : 'text-slate-900'}`}>
                        {isRecording ? 'جاري تسجيل البلاغ...' : 'تبليغ صوتي سريع'}
                    </h3>
                    <p className="text-slate-500 font-bold">سجل العطل أو الحفرة بكلمة واحدة أثناء القيادة</p>
                </div>

                {isRecording && (
                    <div className="absolute bottom-6 flex gap-1">
                        {[1,2,3,4,5,6].map(i => (
                            <motion.div 
                                key={i}
                                animate={{ height: [8, 24, 8] }}
                                transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                                className="w-1 bg-red-500 rounded-full"
                            />
                        ))}
                    </div>
                )}
            </motion.button>

            {/* Real Interactive Map */}
            <div className="flex-1 min-h-[300px] h-full bg-slate-50/30 rounded-[2rem] border border-slate-100 p-4 flex flex-col gap-4 overflow-hidden group">
                <div className="flex items-center justify-between">
                    <h4 className="font-black text-xs text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                        <MapIcon className="w-4 h-4 text-blue-500" />
                        خريطة المخاطر التفاعلية
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400">تحديث حي من الميدان</span>
                </div>
                
                <div className="relative flex-1 bg-white rounded-2xl overflow-hidden border border-slate-200/50 shadow-inner min-h-[250px]">
                    <MapView markers={hazardMarkers} center={[33.5138, 36.2765]} zoom={13} role="driver" />
                </div>
            </div>
        </div>

        {/* SIDEBAR: Hazards & Alerts */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <section className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
                <h4 className="text-[10px] font-black text-slate-400 mb-6 flex items-center gap-2 uppercase tracking-[0.2em]">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    تنبيهات الطريق الحالية
                </h4>
                
                <div className="space-y-4">
                    {recentHazards.map((hazard) => (
                        <div key={hazard.id} className="p-4 rounded-2xl bg-slate-50 group hover:bg-white transition-all border border-transparent hover:border-slate-100 hover:shadow-md flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                                    hazard.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                                }`}>
                                    {hazard.priority === 'high' ? 'عالية الأولوية' : 'متوسطة'}
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {hazard.time}
                                </span>
                            </div>
                            <h5 className="font-black text-slate-800">{hazard.type}</h5>
                            <p className="text-xs text-slate-500 font-bold flex items-center gap-1">
                                <MapIcon className="w-3 h-3 opacity-50" />
                                {hazard.location}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-[2rem] p-7 text-white shadow-xl shadow-amber-500/10 relative overflow-hidden group">
                <Zap className="absolute -bottom-4 -right-4 w-32 h-32 opacity-20 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">برنامج الولاء</span>
                <h3 className="text-2xl font-black mt-1 mb-4">أفضل منقذ طرق</h3>
                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <span className="block text-2xl font-black">٨٥٠</span>
                        <span className="block text-[8px] font-bold uppercase">نقطة سلامة</span>
                    </div>
                    <div className="flex-1 h-2 bg-black/10 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-white rounded-full"></div>
                    </div>
                </div>
                <p className="text-[10px] font-bold mt-4 opacity-90">تبقت ١٥٠ نقطة للحصول على قسيمة "وقود مجاني"</p>
            </section>
        </div>
      </div>

      {/* Bottom Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto relative z-10">
        {driverStats.map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
                <span className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">{stat.label}</span>
                <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
            </div>
        ))}
        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 flex flex-col items-center group cursor-pointer hover:bg-amber-100 transition-all shadow-sm">
            <span className="text-[10px] font-black text-amber-600 uppercase mb-2 tracking-widest">المكافآت المستلمة</span>
            <AwardBadge />
        </div>
      </div>
    </div>
  );
}

function AwardBadge() {
    return (
        <div className="flex -space-x-2">
            {[1,2,3].map(i => (
                <div key={i} className={`w-6 h-6 rounded-full border-2 border-slate-900 bg-amber-500 flex items-center justify-center text-slate-900`}>
                    <Zap className="w-3 h-3" />
                </div>
            ))}
        </div>
    )
}
