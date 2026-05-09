import React from "react";
import { motion } from "motion/react";
import { Eye, MapPin, Camera, CheckCircle2, ShieldAlert, Navigation, Search, Filter, HardHat } from "lucide-react";
import CouncilMapView from "./CouncilMapView";

export const CouncilFieldMonitoring: React.FC = () => {
  const monitors = [
    { id: "MON-701", inspector: "م. ناصر العبدلي", location: "سوق شميلة", status: "نشط", task: "فحص جودة التخزين" },
    { id: "MON-702", inspector: "أ. خالد حسن", location: "مخازن الأمانة", status: "مكتمل", task: "جرد الشحنات" },
    { id: "MON-703", inspector: "م. إيمان صالح", location: "نقطة توزيع ب", status: "في الطريق", task: "مراقبة التوزيع" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in zoom-in-95 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">الرقابة الميدانية</h2>
          <p className="text-slate-500 font-medium italic">إدارة فرق التفتيش والمراقبة الميدانية المباشرة</p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-3 px-6 py-3 bg-emerald-600 text-white rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20">
                <Navigation className="w-4 h-4" />
                توزيع فرق جديدة
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-8">
            <div className="h-[500px] bg-slate-100 rounded-[40px] border-4 border-white shadow-2xl overflow-hidden relative">
                <CouncilMapView 
                     points={[
                        { lat: 15.3694, lng: 44.1910, intensity: 0.8, label: "مفتش نشط", type: 'checkpoint', status: 'في الموقع' },
                        { lat: 15.3800, lng: 44.2000, intensity: 0.6, label: "بلاغ شكوى", type: 'hazard', status: 'قيد الانتظار' },
                        { lat: 15.3500, lng: 44.1800, intensity: 0.4, label: "مخزن رئيسي", type: 'delivery', status: 'جاري الفحص' }
                    ]}
                />
                <div className="absolute top-6 left-6 z-[1000] bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-slate-100 shadow-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">بث مباشر للمراقبين</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900 p-8 rounded-[40px] text-white overflow-hidden relative group">
                    <ShieldAlert className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10 group-hover:scale-110 transition-transform duration-1000" />
                    <h4 className="text-xl font-black italic uppercase tracking-tighter mb-2">إنذار ميداني</h4>
                    <p className="text-slate-400 text-sm font-medium mb-8">تم رصد مخالفة في تخزين المواد الغذائية بكيلو ١٦.</p>
                    <button className="px-6 py-3 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all">
                        التدخل السريع
                    </button>
                </div>
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-[100px] -mr-12 -mt-12" />
                    <h4 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter mb-2">كفاءة الرقابة</h4>
                    <p className="text-slate-400 text-sm font-medium mb-8 italic">تحسن بنسبة ١٥٪ في سرعة الاستجابة لبلاغات التفتيش.</p>
                    <div className="flex items-center gap-3">
                         <span className="text-3xl font-black text-emerald-600">٩٨٪</span>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">معدل الإنجاز</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-black text-slate-900 italic uppercase">الانتشار الميداني</h3>
                    <HardHat className="w-5 h-5 text-slate-300" />
                </div>
                
                <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
                    {monitors.map((m, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-lg transition-all cursor-pointer group">
                             <div className="flex items-center justify-between mb-4">
                                <span className={`text-[8px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest ${
                                    m.status === 'نشط' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                                }`}>
                                    {m.status}
                                </span>
                                <span className="text-[10px] font-black text-slate-300 italic">{m.id}</span>
                             </div>
                             <h5 className="font-black text-slate-900 text-lg group-hover:text-emerald-600 transition-colors">{m.inspector}</h5>
                             <p className="text-xs text-slate-500 font-bold italic mt-1 flex items-center gap-2">
                                <MapPin className="w-3 h-3 opacity-50" />
                                {m.location}
                             </p>
                             <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">المهمة: {m.task}</span>
                                 <Camera className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                             </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                     <button className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-slate-900/10 hover:bg-emerald-600 transition-all">
                        تصدير التقرير اليومي
                     </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
