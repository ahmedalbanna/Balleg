import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Shield, 
  Settings, 
  LogOut, 
  Lock, 
  Activity, 
  ExternalLink,
  ChevronRight,
  Database,
  Users
} from 'lucide-react';
import { useAuth } from '../../core/context/AuthContext';
import { useRole } from '../../core/context/RoleContext';

export const AdminProfile: React.FC = () => {
  const { profile, signOut } = useAuth();
  const { currentRole } = useRole();

  if (!profile) return null;

  const themeColor = currentRole?.themeColor || '#1e293b';

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-2xl shadow-indigo-500/5"
      >
        {/* Admin Specific Header */}
        <div className="bg-slate-950 p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-slate-800 p-1">
                        <div className="w-full h-full rounded-[2.25rem] bg-slate-900 flex items-center justify-center overflow-hidden">
                            {profile.profileImageUrl ? (
                                <img src={profile.profileImageUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <Shield className="w-12 h-12 text-indigo-400" />
                            )}
                        </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-amber-400 rounded-2xl flex items-center justify-center border-4 border-slate-950 text-slate-950 shadow-lg">
                        <Lock size={16} />
                    </div>
                </div>

                <div className="text-center md:text-right flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">{profile.displayName}</h1>
                        <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mx-auto md:mx-0">
                            Super Administrator
                        </div>
                    </div>
                    <p className="text-slate-400 font-bold text-sm mb-6 max-w-lg">
                        لديك الصلاحية الكاملة لإدارة المنظومة الوطنية الموحدة للبلاغات ومتابعة أداء كافة الأقسام والمستويات.
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-2xl text-xs font-black transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                            تعديل بيانات الدخول
                        </button>
                        <button 
                            onClick={() => signOut()}
                            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-2xl text-xs font-black transition-all border border-white/10 active:scale-95"
                        >
                            <LogOut className="inline ml-2" size={14} />
                            تسجيل الخروج
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* System Stats Block */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 px-2 italic">إحصائيات إدارية</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {[
                                { label: 'إدارة المستخدمين', value: '١,٤٣٢', icon: Users, color: 'indigo' },
                                { label: 'سجلات النظام', value: '٤٣,٠٠٠+', icon: Activity, color: 'emerald' },
                                { label: 'قواعد البيانات', value: '٩٩.٩%', icon: Database, color: 'amber' },
                            ].map((stat, i) => (
                                <div key={i} className="p-4 rounded-3xl border border-slate-100 bg-slate-50/50">
                                    <stat.icon className={`w-5 h-5 text-${stat.color}-500 mb-2`} />
                                    <p className="text-[10px] font-bold text-slate-500 mb-0.5">{stat.label}</p>
                                    <p className="text-xl font-black text-slate-900 leading-none">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">إعدادات سريعة</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <button className="flex items-center justify-between p-4 rounded-3xl border border-slate-100 bg-white hover:bg-slate-50 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                        <Settings size={20} />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-slate-900">تفضيلات النظام</p>
                                        <p className="text-[10px] font-bold text-slate-400">تعديل سلوك الواجهات والإعدادات العامة</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                            </button>
                            <button className="flex items-center justify-between p-4 rounded-3xl border border-slate-100 bg-white hover:bg-slate-50 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                                        <Lock size={20} />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-slate-900">مفاتيح الوصول</p>
                                        <p className="text-[10px] font-bold text-slate-400">إدارة الـ API Keys وصلاحيات المطورين</p>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-slate-300 group-hover:text-amber-600 transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side Info */}
                <div className="space-y-6">
                    <div className="p-6 rounded-[2rem] bg-indigo-50/50 border border-indigo-100">
                        <p className="text-[10px] font-black text-indigo-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                             معلومات الخادم
                             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </p>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 font-bold">المنطقة</span>
                                <span className="text-indigo-950 font-black">Europe-West (Frankfurt)</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 font-bold">زمن الاستجابة</span>
                                <span className="text-indigo-950 font-black">24 ms</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 font-bold">الإصدار</span>
                                <span className="text-indigo-950 font-black">v5.2.0-stable</span>
                            </div>
                        </div>
                        <button className="mt-6 w-full py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black hover:shadow-lg hover:shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                            <ExternalLink size={12} />
                            فتح سجلات العمليات اللحظية
                        </button>
                    </div>

                    <div className="p-6 rounded-[2rem] border border-dashed border-slate-200">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">الدعم الفني للمدراء</p>
                        <p className="text-[11px] text-slate-500 font-bold leading-relaxed mb-4">
                            هل تواجه مشكلة في الصلاحيات؟ تواصل مع قسم الأمن السيبراني مباشرة عبر الخط الساخن المخصص.
                        </p>
                        <button className="text-[10px] font-black text-indigo-600 underline">اتصل الآن</button>
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};
