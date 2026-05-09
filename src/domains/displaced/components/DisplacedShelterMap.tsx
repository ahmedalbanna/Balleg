import React from "react";
import { motion } from "motion/react";
import { MapPin, Info, Navigation, Phone } from "lucide-react";
import DisplacedMapView from "./DisplacedMapView";

export const DisplacedShelterMap: React.FC = () => {
  const shelters = [
    { id: 1, name: "مركز إيواء الأمل", location: "وسط المدينة", status: "متاح", capacity: "٨٠٪", coords: [31.5, 34.4] as [number, number], lat: 15.3694, lng: 44.1910, intensity: 0.8 },
    { id: 2, name: "مدرسة القدس الثانوية", location: "الحي الشمالي", status: "مزدحم", capacity: "٩٥٪", coords: [31.52, 34.45] as [number, number], lat: 15.3800, lng: 44.2000, intensity: 0.6 },
    { id: 3, name: "قاعة السلام", location: "المنطقة الغربية", status: "متاح", capacity: "٤٠٪", coords: [31.48, 34.42] as [number, number], lat: 15.3500, lng: 44.1800, intensity: 0.4 },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">خريطة مراكز الإيواء</h2>
          <p className="text-slate-500 font-medium">بحث وتحديد أقرب مراكز الإيواء المتاحة حالياً</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 h-[500px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl relative group">
          <DisplacedMapView 
            points={shelters.map(s => ({
              lat: s.lat,
              lng: s.lng,
              intensity: s.intensity,
              label: s.name,
              type: 'shelter',
              capacity: s.capacity
            }))}
          />
          <div className="absolute top-6 right-6 z-[1000] flex gap-2">
            <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-ping" />
              تحديث حي للمواقع
            </span>
          </div>
        </div>

        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
          {shelters.map((shelter) => (
            <motion.div
              key={shelter.id}
              whileHover={{ x: -5 }}
              className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{shelter.name}</h4>
                    <p className="text-xs text-slate-400">{shelter.location}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest ${
                  shelter.status === 'متاح' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                }`}>
                  {shelter.status}
                </span>
              </div>
              
              <div className="mt-4 flex items-center justify-between border-t border-dashed border-slate-100 pt-4">
                <div className="text-xs font-medium text-slate-500 flex items-center gap-2">
                  <span>السعة:</span>
                  <span className="text-slate-900 font-black">{shelter.capacity}</span>
                </div>
                <div className="flex gap-2">
                   <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                      <Phone className="w-4 h-4" />
                   </button>
                   <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-all">
                      <Navigation className="w-3 h-3" />
                      توجه للمكان
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
