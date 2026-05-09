import React from "react";
import { motion } from "motion/react";
import { ListChecks, Clock, CheckCircle2, AlertCircle, ShoppingBag, Droplets, Briefcase } from "lucide-react";

export const DisplacedNeedsTracking: React.FC = () => {
  const needs = [
    { id: 1, category: "غذاء", item: "سلة غذائية عائلية", date: "منذ يومين", status: "قيد المراجعة", icon: ShoppingBag, color: "orange" },
    { id: 2, category: "صحة", item: "أدوية السكري", date: "منذ ٥ ساعات", status: "تمت الموافقة", icon: AlertCircle, color: "rose" },
    { id: 3, category: "مياه", item: "مياه صالحة للشرب", date: "اليوم", status: "جاري التسليم", icon: Droplets, color: "blue" },
    { id: 4, category: "إيواء", item: "أدوات فراش", date: "منذ ٣ أيام", status: "مكتمل", icon: Briefcase, color: "emerald" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">متابعة الاحتياجات</h2>
          <p className="text-slate-500 font-medium">تتبع حالة طلباتك واحتياجاتك الأساسية المسجلة</p>
        </div>
        <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:scale-105 transition-transform">
          <ListChecks className="w-5 h-5" />
          إضافة احتياج جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'طلبات معلقة', value: '٢', color: 'orange' },
          { label: 'طلبات مكتملة', value: '١٤', color: 'emerald' },
          { label: 'قيد التسليم', value: '١', color: 'blue' },
          { label: 'إجمالي الطلبات', value: '١٧', color: 'slate' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
            <p className={`text-4xl font-black text-${stat.color}-600`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50">
        <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">قائمة الاحتياجات والطلبات</h3>
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
        </div>
        
        <div className="divide-y divide-slate-50">
          {needs.map((need, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={need.id} 
              className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl bg-${need.color}-50 flex items-center justify-center text-${need.color}-600 group`}>
                   <need.icon className="w-7 h-7" />
                </div>
                <div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">
                    {need.category}
                   </span>
                   <h4 className="text-xl font-bold text-slate-900">{need.item}</h4>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col md:items-end">
                   <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3 h-3 text-slate-300" />
                      <span className="text-xs font-medium text-slate-400">{need.date}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      {need.status === 'مكتمل' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />}
                      <span className={`text-sm font-bold ${need.status === 'مكتمل' ? 'text-emerald-600' : 'text-indigo-600'}`}>
                        {need.status}
                      </span>
                   </div>
                </div>
                <button className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-900 hover:text-white transition-all uppercase tracking-widest">
                  التفاصيل
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
