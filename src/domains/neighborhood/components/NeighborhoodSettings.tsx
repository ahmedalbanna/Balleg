import React from "react";
import { motion } from "motion/react";
import { Settings, Shield, Bell, Globe, User, Lock, Database, Trash2, ArrowRight, Save, Info, RefreshCw, Palette } from "lucide-react";

export const NeighborhoodSettings: React.FC = () => {
    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800 pb-24 lg:pb-12 text-right">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Settings className="w-10 h-10 text-slate-600" />
                        إعـدادات النظام
                    </h2>
                    <p className="text-slate-500 font-bold italic">تخصيص تجربة المستخدم للحي، إدارة الأمان والخصوصية، والتحكم في إشعارات وبروتوكولات الأرشفة</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pt-8">
                 <div className="lg:col-span-1">
                    <nav className="flex flex-col gap-3 sticky top-8">
                        {[
                            { name: 'عام', icon: Globe, active: true },
                            { name: 'الأمان والخصوصية', icon: Shield, active: false },
                            { name: 'تفضيلات الإشعارات', icon: Bell, active: false },
                            { name: 'المظهر والهوية', icon: Palette, active: false },
                            { name: 'قاعدة البيانات', icon: Database, active: false },
                        ].map((item, i) => (
                            <button 
                                key={i} 
                                className={`flex items-center justify-between p-6 rounded-3xl font-black uppercase tracking-widest text-[10px] italic transition-all group ${
                                    item.active ? 'bg-slate-900 text-white shadow-2xl' : 'bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-900 border border-slate-100'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <item.icon className="w-5 h-5" />
                                    {item.name}
                                </div>
                                <ArrowRight className={`w-4 h-4 rotate-180 transition-transform ${item.active ? 'opacity-100' : 'opacity-0 -translate-x-2'}`} />
                            </button>
                        ))}
                    </nav>
                 </div>

                 <div className="lg:col-span-3 space-y-10">
                     <div className="bg-white rounded-[56px] border border-slate-100 shadow-2xl overflow-hidden p-12">
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-12 flex items-center gap-4">
                            < Globe className="w-8 h-8 text-indigo-600" />
                            الإعدادات العامة
                        </h3>
                        <div className="space-y-10">
                            {[
                                { label: 'اسم الوحدة الإدارية', value: 'مجلس حي الوحدة السكني', type: 'text' },
                                { label: 'البريد الإلكتروني المعتمد', value: 'admin@neighborhood-unity.local', type: 'email' },
                                { label: 'نطاق التغطية الإقليمي', value: 'صنعاء، الأمانة، قطاع الشرق', type: 'text' },
                            ].map((field, i) => (
                                <div key={i} className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic pr-4">{field.label}</label>
                                    <input 
                                        type={field.type} 
                                        defaultValue={field.value}
                                        className="w-full p-6 bg-slate-50 border-transparent rounded-[28px] focus:bg-white focus:ring-4 focus:ring-slate-50 focus:border-slate-200 outline-none transition-all font-bold italic text-slate-800"
                                    />
                                </div>
                            ))}
                        </div>
                     </div>

                     <div className="bg-white rounded-[56px] border border-slate-100 shadow-2xl overflow-hidden p-12">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 flex items-center gap-4">
                                <Shield className="w-8 h-8 text-emerald-600" />
                                بروتوكولات الوصول
                            </h3>
                            <button className="flex items-center gap-3 px-6 py-4 bg-emerald-50 text-emerald-600 rounded-2xl font-black uppercase tracking-widest text-[10px] italic hover:bg-emerald-600 hover:text-white transition-all">
                                <RefreshCw className="w-4 h-4" />
                                تحديث الصلاحيات
                            </button>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {[
                                { name: 'المصادقة ثنائية العامل (2FA)', desc: 'تطلب رمز تأكيد إضافي عند الدخول لسجل السكان الحساس.', active: true },
                                { name: 'تشفير سجلات النازحين', desc: 'تشفير كافة البيانات المتعلقة بمواقع سكن النازحين واحتياجاتهم.', active: true },
                                { name: 'سجل التتبع الإداري', desc: 'تسجيل كافة العمليات التي يقوم بها أعضاء المجلس على النظام.', active: false },
                            ].map((item, i) => (
                                <div key={i} className="py-8 flex items-center justify-between group">
                                    <div className="space-y-2">
                                        <h4 className="font-black italic text-slate-800 uppercase tracking-tight">{item.name}</h4>
                                        <p className="text-xs font-medium text-slate-400 italic max-w-lg">{item.desc}</p>
                                    </div>
                                    <button className={`w-16 h-8 rounded-full transition-all relative ${item.active ? 'bg-emerald-500 shadow-xl shadow-emerald-500/30' : 'bg-slate-200'}`}>
                                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${item.active ? 'right-9' : 'right-1'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                     </div>

                     <div className="bg-rose-50 rounded-[48px] p-12 border border-rose-100 flex items-center justify-between gap-12 group">
                        <div className="flex items-center gap-8">
                            <div className="w-20 h-20 bg-white rounded-[32px] flex items-center justify-center text-rose-600 shadow-2xl shadow-rose-200 group-hover:rotate-12 transition-transform">
                                <Trash2 className="w-10 h-10" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-2xl font-black italic uppercase text-rose-900 tracking-tighter">منطقة الخطر</h4>
                                <p className="text-rose-800/60 font-medium italic text-sm">حذف قاعدة بيانات الحي أو تصفير سجلات الأرشيف. هذا الإجراء غير قابل للتراجع.</p>
                            </div>
                        </div>
                        <button className="px-10 py-5 bg-rose-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] italic shadow-xl hover:bg-slate-900 transition-all active:scale-95 leading-none shrink-0">
                            تدمير البيانات نهائياً
                        </button>
                     </div>

                     <div className="flex justify-end gap-4 pt-8">
                        <button className="px-10 py-6 bg-slate-100 text-slate-400 rounded-[32px] font-black uppercase tracking-widest text-[10px] italic hover:bg-slate-200 transition-all">إلغاء التغييرات</button>
                        <button className="flex items-center gap-4 px-12 py-6 bg-slate-900 text-white rounded-[32px] font-black uppercase tracking-widest text-[10px] italic shadow-2xl hover:bg-indigo-600 transition-all active:scale-95">
                            <Save className="w-5 h-5 text-indigo-400" />
                            حفظ كافة الإعدادات
                        </button>
                     </div>
                 </div>
            </div>
        </div>
    );
};
