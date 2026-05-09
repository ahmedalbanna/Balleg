import React from "react";
import { motion } from "motion/react";
import { Navigation, MapPin, Flag, Clock, ArrowRight, Search, Filter } from "lucide-react";
import DriverMapView from "./DriverMapView";

export const DriverRoutes: React.FC = () => {
  const routes = [
    { id: "RT-101", from: "المخازن المركزية", to: "مخيم الأمل", distance: "١٥ كم", time: "٤٥ دقيقة", status: "نشط" },
    { id: "RT-102", from: "نقطة التوزيع أ", to: "مستشفى السلام", distance: "٨ كم", time: "٢٠ دقيقة", status: "مجدول" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">خرائط المسارات</h2>
          <p className="text-slate-500 font-medium italic">تخطيط وتتبع مسارات التوصيل بأقصى كفاءة</p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-3 px-6 py-3 bg-amber-500 text-white rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-amber-600 transition-all active:scale-95 shadow-lg shadow-amber-500/20">
                <Navigation className="w-4 h-4" />
                تحسين المسار الحالي
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <div className="h-[500px] bg-slate-100 rounded-[40px] border-4 border-white shadow-2xl overflow-hidden relative group">
                <DriverMapView 
                    points={[
                        { lat: 15.3694, lng: 44.1910, intensity: 0.8, label: "نقطة الانطلاق", type: 'loading', status: 'مكتمل' },
                        { lat: 15.3800, lng: 44.2000, intensity: 0.5, label: "نقطة تفتيش", type: 'checkpoint', status: 'مزدحم' },
                        { lat: 15.3500, lng: 44.1800, intensity: 0.4, label: "وجهة التسليم", type: 'delivery', status: 'قيد الانتظار' }
                    ]}
                    route={[
                        [15.3694, 44.1910],
                        [15.3750, 44.1950],
                        [15.3800, 44.2000],
                        [15.3650, 44.1850],
                        [15.3500, 44.1800]
                    ]}
                    center={[15.3694, 44.1910]}
                    zoom={14}
                />
                <div className="absolute top-6 left-6 z-[1000] bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-slate-100 shadow-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-black text-slate-900 uppercase tracking-widest leading-none">مباشر • تتبع الرحلة</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Flag className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">الوجهة التالية</p>
                        <h4 className="text-xl font-black text-slate-900 italic">مخيم الأمل، الجناح ب</h4>
                    </div>
                </div>
                <div className="flex items-center gap-8">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">المسافة المتبقية</p>
                        <p className="text-2xl font-black text-slate-900">٤.٥ <span className="text-xs text-slate-400">كم</span></p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">الوقت المتوقع</p>
                        <p className="text-2xl font-black text-amber-500">١٢ <span className="text-xs text-slate-400 uppercase">دقائق</span></p>
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-6">
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-black text-slate-900 italic uppercase">المسارات المقترحة</h3>
                    <button className="text-slate-300 hover:text-slate-900 transition-colors">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    {routes.map((route, i) => (
                        <div key={i} className={`p-6 rounded-3xl border transition-all cursor-pointer group ${
                            route.status === 'نشط' ? 'bg-amber-500 border-amber-500 text-white shadow-xl shadow-amber-500/20' : 'bg-slate-50 border-transparent hover:border-slate-200 text-slate-600'
                        }`}>
                            <div className="flex justify-between items-start mb-4">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg uppercase ${
                                    route.status === 'نشط' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
                                }`}>
                                    {route.status}
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">ID: {route.id}</span>
                            </div>
                            <div className="space-y-3 relative">
                                <div className="absolute right-1 top-2 bottom-2 w-0.5 bg-current opacity-10" />
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-current shrink-0" />
                                    <p className="text-sm font-bold truncate">{route.from}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full border-2 border-current shrink-0" />
                                    <p className="text-sm font-black truncate">{route.to}</p>
                                </div>
                            </div>
                            <div className={`flex items-center justify-between mt-6 pt-4 border-t ${route.status === 'نشط' ? 'border-white/10' : 'border-slate-200'}`}>
                                <div className="flex gap-4">
                                    <span className="text-[10px] font-bold flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {route.time}
                                    </span>
                                </div>
                                <ArrowRight className={`w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
