import React from "react";
import { motion } from "motion/react";
import { CreditCard, Wallet, Smartphone, Landmark, Plus, Check, ExternalLink, ArrowDownLeft, ShieldCheck } from "lucide-react";

export const MerchantPayments: React.FC = () => {
  const paymentMethods = [
    { id: 1, type: "بطاقة ائتمان", provider: "فيزا كارد", last4: "٤٤٩٢", expiry: "٠٥/٢٧", isDefault: true, icon: CreditCard },
    { id: 2, type: "محفظة رقمية", provider: "كريمي باي", phone: "٠٧٧*****٨٨", isDefault: false, icon: Wallet },
    { id: 3, type: "حساب بنكي", provider: "بنك اليمن الدولي", account: "١٠٠٢***٠١", isDefault: false, icon: Landmark },
  ];

  return (
    <div className="p-4 md:p-8 space-y-12 animate-in slide-in-from-right-4 duration-1000 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">إدارة المدفوعات</h2>
          <p className="text-slate-500 font-medium italic">تحكم في طرق التحصيل المالي وبوابات الدفع الإلكترونية</p>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all active:scale-95 shadow-2xl shadow-slate-900/20">
          <Plus className="w-5 h-5 text-indigo-400" />
          إضافة وسيلة دفع جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] px-2 italic">طرق الدفع المفعلة</h3>
            <div className="space-y-4">
                {paymentMethods.map((method) => (
                    <motion.div
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-8 rounded-[40px] border-2 transition-all group relative overflow-hidden ${
                            method.isDefault ? 'bg-white border-indigo-600 shadow-2xl shadow-indigo-200' : 'bg-slate-50 border-slate-100'
                        }`}
                    >
                        {method.isDefault && (
                            <div className="absolute top-6 left-6 bg-indigo-600 text-white p-2 rounded-xl shadow-lg shadow-indigo-200">
                                <Check className="w-5 h-5" strokeWidth={3} />
                            </div>
                        )}
                        
                        <div className="flex items-center gap-6 mb-8">
                            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${
                                method.isDefault ? 'bg-indigo-50 text-indigo-600' : 'bg-white text-slate-400'
                            } group-hover:scale-110 transition-transform duration-500`}>
                                <method.icon className="w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{method.provider}</h4>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">{method.type}</p>
                            </div>
                        </div>

                        <div className="flex items-end justify-between">
                            <div className="space-y-1">
                                <p className="text-xs font-black text-slate-300 uppercase tracking-widest">معلومات الحساب</p>
                                <p className="text-xl font-black text-slate-900 tracking-[0.2em]">
                                    {method.last4 ? `**** **** **** ${method.last4}` : method.phone || method.account}
                                </p>
                            </div>
                            {method.expiry && (
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">تاريخ الانتهاء</p>
                                    <p className="text-sm font-black text-slate-900">{method.expiry}</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        <div className="space-y-8">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] px-2 italic">التحويلات المالية المعلقة</h3>
            <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl border border-white/5">
                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-12">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                            <ArrowDownLeft className="w-7 h-7 text-indigo-400" />
                        </div>
                        <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                            قيد المعالجة
                        </span>
                    </div>

                    <div className="mb-12">
                        <p className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-4">المبلغ القابل للسحب</p>
                        <div className="flex items-baseline gap-3">
                            <h3 className="text-6xl font-black text-white italic tracking-tighter">١,٢٥٠,٠٠٠</h3>
                            <span className="text-xl text-slate-500 font-bold italic">ر.ي</span>
                        </div>
                    </div>

                    <div className="space-y-4 mt-auto">
                        <button className="w-full py-5 bg-white text-slate-900 rounded-3xl font-black uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all shadow-xl shadow-white/5">
                            سحب فوري للأرصدة
                        </button>
                        <div className="flex items-center justify-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-[0.1em]">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            جميع المعاملات مشفرة وتتم عبر بوابات معتمدة
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex items-center justify-between group cursor-pointer hover:border-indigo-100 transition-all">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-black text-slate-900 italic">طرق الدفع عند الاستلام</h4>
                        <p className="text-xs text-slate-400 font-medium">إدارة خيارات الدفع اليدوية والنقدية</p>
                    </div>
                </div>
                <ExternalLink className="w-5 h-5 text-slate-200 group-hover:text-indigo-600 transition-colors" />
            </div>
        </div>
      </div>
    </div>
  );
};
