import React from "react";
import { motion } from "motion/react";
import { Plus, Search, Filter, Package, Edit, Trash2, Eye } from "lucide-react";

export const MerchantProducts: React.FC = () => {
  const products = [
    { id: 1, name: "كيس دقيق ٥٠ كجم", price: "١٢٠٠٠", stock: 45, category: "مواد غذائية", status: "متوفر" },
    { id: 2, name: "زيت طهي ٥ لتر", price: "٤٥٠٠", stock: 12, category: "زيوت", status: "منخفض" },
    { id: 3, name: "كرتون حليب مجفف", price: "٨٥٠٠", stock: 28, category: "ألبان", status: "متوفر" },
    { id: 4, name: "كيس أرز بسمتي", price: "١٤٠٠٠", stock: 0, category: "مواد غذائية", status: "نفذ" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">إدارة المنتجات</h2>
          <p className="text-slate-500 font-medium">أضف، عدل وراقب حالة المخزون بفعالية</p>
        </div>
        <button className="flex items-center gap-3 px-6 py-4 bg-emerald-600 text-white rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95 leading-none">
          <Plus className="w-5 h-5" />
          إضافة منتج جديد
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors w-5 h-5" />
          <input 
            type="text" 
            placeholder="البحث بالاسم أو الفئة..." 
            className="w-full py-4 pr-14 pl-6 bg-white border border-slate-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-emerald-50 focus:border-emerald-200 outline-none transition-all font-medium"
          />
        </div>
        <button className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
          <Filter className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden overflow-x-auto">
        <table className="w-full text-right border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest italic">المنتج</th>
              <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest italic">الفئة</th>
              <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest italic">السعر (ر.ي)</th>
              <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest italic">المخزون</th>
              <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest italic">الحالة</th>
              <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest italic">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                      <Package className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-slate-900">{product.name}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">{product.category}</span>
                </td>
                <td className="px-8 py-6 font-black text-slate-900">{product.price}</td>
                <td className="px-8 py-6 font-bold text-slate-500">{product.stock} وحدات</td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    product.status === 'متوفر' ? 'bg-emerald-50 text-emerald-600' :
                    product.status === 'منخفض' ? 'bg-orange-50 text-orange-600' :
                    'bg-rose-50 text-rose-600'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex gap-2">
                    <button className="p-2.5 bg-slate-100 text-slate-400 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2.5 bg-slate-100 text-slate-400 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2.5 bg-slate-100 text-rose-400 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
