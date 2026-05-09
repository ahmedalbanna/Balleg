import React from "react";
import { motion } from "motion/react";
import { Truck, MapPin, Navigation, Clock, Package, CheckCircle2, ChevronLeft, Search } from "lucide-react";
import MerchantMapView from "./MerchantMapView";

export const MerchantShipping: React.FC = () => {
  const shipments = [
    { id: "SHP-٧٧١", destination: "المخلاف، صنعاء", status: "في الطريق", driver: "محمد عبدالله", eta: "٢٠ دقيقة", priority: "عالي" },
    { id: "SHP-٧٧٠", destination: "الحوبان، تعز", status: "قيد التجهيز", driver: "بانتظار سائق", eta: "--", priority: "عادي" },
    { id: "SHP-٧٦٩", destination: "المعلا، عدن", status: "تم الاستلام", driver: "صالح علي", eta: "مكتمل", priority: "عادي" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">عمليات الشحن</h2>
          <p className="text-slate-500 font-medium">تتبع مسار الشحنات وحالة التوصيل في الوقت الحقيقي</p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-slate-900/10">
                <Truck className="w-4 h-4" />
                إنشاء شحنة جديدة
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-8">
            <div className="h-[450px] bg-slate-100 rounded-[40px] border-4 border-white shadow-2xl overflow-hidden relative group">
                <MerchantMapView 
                    points={shipments.map(s => ({
                        lat: s.id === 'SHP-٧٧١' ? 15.3694 : 15.3800, 
                        lng: s.id === 'SHP-٧٧١' ? 44.1910 : 44.2000,
                        intensity: s.status === 'في الطريق' ? 0.8 : 0.4,
                        label: s.id,
                        type: 'delivery',
                        status: s.status
                    }))}
                />
                <div className="absolute bottom-6 right-6 z-[1000] bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-slate-100 shadow-xl max-w-[280px]">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                            <Navigation className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">الموقع الحالي</p>
                            <p className="font-bold text-slate-900 text-sm italic">شحنة SHP-٧٧١</p>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-400">الوجهة:</span>
                            <span className="text-slate-900 font-bold">صنعاء، اليمن</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-400">الوقت المتوقع:</span>
                            <span className="text-emerald-600 font-black tracking-widest uppercase">٢٠ دقيقة</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2 italic">الشحنات النشطة</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {shipments.filter(s => s.status !== 'تم الاستلام').map((shp, i) => (
                        <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                             <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                    <Truck className="w-6 h-6" />
                                </div>
                                <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase border ${
                                    shp.priority === 'عالي' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                                }`}>
                                    {shp.priority} الأولوية
                                </span>
                             </div>
                             <div>
                                <h4 className="text-lg font-black text-slate-900 mb-1">{shp.id}</h4>
                                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-4 italic">
                                    <MapPin className="w-3 h-3 text-rose-500" />
                                    {shp.destination}
                                </div>
                             </div>
                             <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                 <div className="flex items-center gap-2">
                                     <div className={`w-2 h-2 rounded-full ${shp.status === 'في الطريق' ? 'bg-emerald-500 animate-pulse' : 'bg-orange-500 uppercase'}`} />
                                     <span className="text-xs font-bold text-slate-900">{shp.status}</span>
                                 </div>
                                 <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                                     <ChevronLeft className="w-5 h-5 rotate-180" />
                                 </button>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col h-full overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                    <h3 className="font-black text-slate-900 italic uppercase">سجل العمليات</h3>
                    <button className="text-slate-400 hover:text-slate-900">
                        <Search className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[600px] custom-scrollbar">
                    {shipments.map((shp, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-3xl hover:bg-slate-50/50 transition-colors cursor-pointer border border-transparent hover:border-slate-100 group">
                            <div className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                    shp.status === 'تم الاستلام' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                                }`}>
                                    {shp.status === 'تم الاستلام' ? <CheckCircle2 className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                                </div>
                                <div className="w-0.5 h-full bg-slate-50 group-last:hidden" />
                            </div>
                            <div className="flex-1 pb-6">
                                <div className="flex justify-between items-start mb-1">
                                    <h5 className="font-bold text-slate-900 text-sm">{shp.id}</h5>
                                    <span className="text-[10px] font-medium text-slate-400 italic">{shp.eta}</span>
                                </div>
                                <p className="text-xs text-slate-500 mb-2 truncate max-w-[150px]">{shp.destination}</p>
                                <div className="flex items-center gap-2">
                                     <div className="w-4 h-4 rounded-full bg-slate-200" />
                                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{shp.driver}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-8 bg-slate-900 text-white border-t border-slate-800">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">كفاءة التوصيل اليوم</p>
                    <div className="flex items-end gap-1 mb-2">
                        <span className="text-3xl font-black italic">٩٤٪</span>
                        <span className="text-xs font-bold text-emerald-400 mb-1">▲ +٢٪ عن الأمس</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
