import React from "react";
import { motion } from "motion/react";
import { Bell, ShoppingCart, Truck, AlertTriangle, Info, CheckCircle2, MoreHorizontal, Check } from "lucide-react";

export const MerchantNotifications: React.FC = () => {
  const notifications = [
    { id: 1, title: "تم استلام طلب جديد", desc: "لديك طلب جديد بقيمة ٢٤,٥٠٠ ر.ي من العميل أحمد علي.", time: "منذ ٥ دقائق", type: "order", unread: true },
    { id: 2, title: "تحديث حالة الشحن", desc: "الشحنة رقم SHP-٧٧١ وصلت إلى وجهتها النهائية في صنعاء.", time: "منذ ساعة", type: "shipping", unread: true },
    { id: 3, title: "انخفاض في المخزون", desc: "زيت الطهي ٥ لتر وصل إلى الحد الأدنى (١٢ وحدة فقط).", time: "منذ ٣ ساعات", type: "alert", unread: false },
    { id: 4, title: "اكتملت عملية السحب", desc: "تم تحويل مبلغ ٥٠,٠٠٠ ر.ي إلى حسابك البنكي بنجاح.", time: "أمس", type: "financial", unread: false },
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'order': return { icon: ShoppingCart, color: 'indigo' };
      case 'shipping': return { icon: Truck, color: 'emerald' };
      case 'alert': return { icon: AlertTriangle, color: 'rose' };
      case 'financial': return { icon: CheckCircle2, color: 'blue' };
      default: return { icon: Info, color: 'slate' };
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-4xl mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase flex items-center gap-4">
            الإشعارات
            <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-lg flex items-center gap-1 font-black tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                NEW
            </span>
          </h2>
          <p className="text-slate-500 font-medium">ابقَ على اطلاع بكل ما يحدث في متجرك وعملياتك</p>
        </div>
        <button className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-600 hover:text-white transition-all group">
            <Check className="w-3 h-3 group-hover:scale-125 transition-transform" strokeWidth={4} />
            تحديد الكل كمقروء
        </button>
      </header>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="divide-y divide-slate-50">
          {notifications.map((notif, i) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 md:p-8 flex items-start gap-6 hover:bg-slate-50/50 transition-all cursor-pointer relative group ${notif.unread ? 'bg-indigo-50/20' : ''}`}
            >
              {notif.unread && (
                <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-indigo-600" />
              )}
              
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-transform group-hover:rotate-6 ${
                notif.unread ? `bg-${getIcon(notif.type).color}-50 border-${getIcon(notif.type).color}-100 text-${getIcon(notif.type).color}-600` : 'bg-slate-100 border-transparent text-slate-400'
              }`}>
                {React.createElement(getIcon(notif.type).icon, { size: 24 })}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight`}>
                        {notif.title}
                    </h3>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-slate-300 italic uppercase">{notif.time}</span>
                        <button className="text-slate-200 hover:text-slate-400 transition-colors">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">{notif.desc}</p>
                
                {notif.unread && (
                    <button className="mt-4 text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2 group/btn">
                        تحديد كمقروء
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 group-hover/btn:scale-150 transition-transform" />
                    </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button className="px-10 py-4 bg-slate-900 text-white rounded-[20px] text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-900/20 hover:bg-indigo-600 transition-all active:scale-95">
          عرض الأرشيف الكامل
        </button>
      </div>
    </div>
  );
};
