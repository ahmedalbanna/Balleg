import React from "react";
import { motion } from "motion/react";
import { AlertTriangle, MapPin, Clock, Search, Filter, ShieldAlert, Zap, Navigation, ChevronLeft } from "lucide-react";
import DriverMapView from "./DriverMapView";

export const DriverTrafficAlerts: React.FC = () => {
  const alerts = [
    { id: 1, type: "حفرة عميقة", location: "شارع الستين، منعطف ريماس", time: "منذ ٥ دقائق", priority: "high", status: "نشط", reporter: "سائق ٧٠١" },
    { id: 2, type: "إشارة معطلة", location: "تقاطع عصر، المدخل الشمالي", time: "منذ ١٥ دقيقة", priority: "medium", status: "مجدول", reporter: "آلي • مستشعر" },
    { id: 3, type: "ازدحام شديد", location: "جسر كنتاكي، باتجاه الجامعة", time: "منذ ٣٠ دقيقة", priority: "low", status: "مؤقت", reporter: "سائق ٤٤٢" },
    { id: 4, type: "تراكم نفايات", location: "الحصبة، خلف الوزارة", time: "منذ ساعة", priority: "medium", status: "مبلغ عنه", reporter: "مواطن" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase flex items-center gap-4">
            التنبيهات المرورية
            <span className="bg-rose-600 text-white text-[10px] px-2 py-0.5 rounded-lg flex items-center gap-1 font-black tracking-widest animate-pulse">
                <ShieldAlert className="w-3 h-3" />
                LIVE
            </span>
          </h2>
          <p className="text-slate-500 font-medium italic">تحذيرات فورية ومخاطر الطريق المسجلة من قبل العين الساهرة</p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-rose-600 transition-all active:scale-95 shadow-xl shadow-slate-900/10 group">
                <AlertTriangle className="w-4 h-4 text-amber-500 group-hover:text-white transition-colors" />
                تبليغ عن خطر جديد
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
            <div className="h-[450px] bg-slate-100 rounded-[40px] border-4 border-white shadow-2xl overflow-hidden relative">
                <DriverMapView 
                    points={alerts.map(a => ({
                        lat: a.id === 1 ? 15.3694 : 15.3800,
                        lng: a.id === 1 ? 44.1910 : 44.2000,
                        intensity: a.priority === 'high' ? 1 : 0.6,
                        label: a.type,
                        type: 'hazard',
                        status: a.status
                    }))}
                />
                <div className="absolute bottom-6 right-6 z-[1000] bg-white/95 backdrop-blur-md p-6 rounded-[32px] border border-slate-100 shadow-2xl max-w-[320px] animate-in slide-in-from-right-4 duration-1000">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center animate-bounce">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest leading-none mb-1">تحذير أولوية قصوى</p>
                            <h4 className="font-black text-slate-900 italic">حفرة عميقة - شارع الستين</h4>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 font-bold mb-4 italic leading-relaxed">يرجى من جميع السائقين في محيط شارع الستين توخي الحذر الشديد عند منعطف ريماس بسبب أعمال إنشائية غير مكتملة.</p>
                    <button className="w-full py-4 bg-slate-900 text-white rounded-[18px] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-rose-600 transition-all flex items-center justify-center gap-2">
                        تجنب هذا الطريق
                        <Zap className="w-3 h-3 text-amber-500" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-600 transition-colors w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="البحث في التنبيهات..." 
                    className="w-full py-4 pr-14 pl-6 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-rose-50 focus:border-rose-200 outline-none transition-all font-medium italic"
                />
                </div>
                <button className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-400 hover:text-rose-600 transition-all">
                    <Filter className="w-6 h-6" />
                </button>
            </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col h-full overflow-hidden">
                <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
                    <h3 className="font-black text-slate-900 italic uppercase">قائمة البلاغات النشطة</h3>
                    <Navigation className="w-5 h-5 text-slate-300" />
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[600px] custom-scrollbar">
                    {alerts.map((alert, i) => (
                        <div key={i} className="flex gap-4 p-6 rounded-[32px] hover:bg-slate-50/50 transition-all cursor-pointer border-2 border-transparent hover:border-slate-100 group">
                            <div className="flex flex-col items-center gap-2">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:rotate-12 ${
                                    alert.priority === 'high' ? 'bg-rose-50 text-rose-600' : 
                                    alert.priority === 'medium' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                                }`}>
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <div className="w-0.5 h-full bg-slate-50 group-last:hidden" />
                            </div>
                            <div className="flex-1 pb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h5 className="font-black text-slate-900 text-lg uppercase tracking-tight">{alert.type}</h5>
                                    <span className="text-[10px] font-black text-slate-300 italic">{alert.time}</span>
                                </div>
                                <p className="text-xs text-slate-500 mb-4 font-bold italic flex items-center gap-2">
                                    <MapPin className="w-3 h-3 opacity-50" />
                                    {alert.location}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                         <div className="w-5 h-5 rounded-lg bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-400">ID</div>
                                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{alert.reporter}</span>
                                    </div>
                                    <button className="p-2 text-slate-200 hover:text-slate-900 transition-colors">
                                        <ChevronLeft className="w-5 h-5 rotate-180" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-8 bg-slate-900 text-white border-t border-slate-800">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">كفاءة الاستجابة للبلاغات</p>
                    <div className="flex items-end gap-1 mb-2">
                        <span className="text-4xl font-black italic tracking-tighter">٩٨.٥٪</span>
                        <span className="text-xs font-bold text-amber-500 mb-2">▲ أسرع بـ ٥ ثوانِ</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
