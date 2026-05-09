import React from "react";
import { motion } from "motion/react";
import { ShoppingCart, Clock, CheckCircle2, XCircle, ChevronLeft, MapPin, Package } from "lucide-react";

export const MerchantOrders: React.FC = () => {
  const orders = [
    { id: "ORD-٨٨٢١", customer: "أحمد بن علي", items: 3, total: "٢٤,٥٠٠", date: "منذ ١٥ دقيقة", status: "جديد" },
    { id: "ORD-٨٨٢٠", customer: "جمعية السلام الخيرية", items: 20, total: "٤٥٠,٠٠٠", date: "منذ ساعة", status: "معالجة" },
    { id: "ORD-٨٨١٩", customer: "مؤسسة الأمان", items: 12, total: "١٨٥,٠٠٠", date: "منذ ساعتين", status: "تم التسليم" },
    { id: "ORD-٨٨١٨", customer: "محل الضوء", items: 5, total: "٣٢,٠٠٠", date: "أمس", status: "ملغي" },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'جديد': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'معالجة': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'تم التسليم': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'ملغي': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">طلبات الشراء</h2>
          <p className="text-slate-500 font-medium">إدارة ومتابعة طلبات العملاء وتعديل حالاتها</p>
        </div>
        <div className="flex gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center min-w-[120px]">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">طلبات اليوم</p>
                <p className="text-2xl font-black text-indigo-600">١٢</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center min-w-[120px]">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">قيد المعالجة</p>
                <p className="text-2xl font-black text-orange-600">٤</p>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="divide-y divide-slate-50">
          {orders.map((order, idx) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:bg-slate-50 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 ${getStatusColor(order.status).split(' ').slice(1,2).join(' ')} ${getStatusColor(order.status).split(' ').slice(0,1).join(' ')} group-hover:scale-105 transition-transform`}>
                   {order.status === 'جديد' && <ShoppingCart className="w-8 h-8" />}
                   {order.status === 'معالجة' && <Clock className="w-8 h-8" />}
                   {order.status === 'تم التسليم' && <CheckCircle2 className="w-8 h-8" />}
                   {order.status === 'ملغي' && <XCircle className="w-8 h-8" />}
                </div>
                <div>
                   <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-black text-slate-400 italic">{order.id}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                   </div>
                   <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{order.customer}</h4>
                   <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            {order.items} أصناف
                        </span>
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {order.date}
                        </span>
                   </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-12">
                 <div className="text-right lg:text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">إجمالي القيمة</p>
                    <p className="text-2xl font-black text-slate-900">{order.total} <span className="text-xs text-slate-400">ر.ي</span></p>
                 </div>
                 <div className="flex gap-2">
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-3 group/btn">
                        عرض الفاتورة
                        <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                    </button>
                    <button className="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-indigo-600 hover:border-indigo-100 transition-all">
                        <MapPin className="w-5 h-5" />
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button className="px-10 py-4 border-2 border-slate-50 text-slate-400 rounded-[20px] text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
          تحميل كشف بالطلبات السابقة
        </button>
      </div>
    </div>
  );
};
