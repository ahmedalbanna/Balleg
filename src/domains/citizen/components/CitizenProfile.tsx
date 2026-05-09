import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Home, 
  Settings, 
  LogOut, 
  ChevronRight,
  ClipboardList,
  MapPin,
  Star,
  Bell,
  Heart,
  PlusCircle,
  Clock
} from 'lucide-react';
import { useAuth } from '../../core/context/AuthContext';
import { useRole } from '../../core/context/RoleContext';
import { Link } from 'react-router-dom';
import { cn } from '../../core/utils/cn';

export const CitizenProfile: React.FC = () => {
  const { profile, signOut } = useAuth();
  const { currentRole } = useRole();

  if (!profile) return null;

  const themeColor = currentRole?.themeColor || '#10b981';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-10" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-2xl shadow-emerald-500/5"
      >
        <div className="h-44 bg-emerald-600 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.1),_transparent)]" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20" />
        </div>

        <div className="px-8 md:px-14 -mt-16 relative">
            <div className="flex flex-col md:flex-row items-end gap-6 mb-10">
                <div className="w-36 h-36 rounded-[2.5rem] bg-white p-2 shadow-2xl relative">
                    <div className="w-full h-full rounded-[2rem] bg-emerald-50 flex items-center justify-center overflow-hidden">
                        {profile.profileImageUrl ? (
                            <img src={profile.profileImageUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <User size={56} className="text-emerald-500" />
                        )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-100">
                        <Star size={18} className="text-amber-400 fill-amber-400" />
                    </div>
                </div>
                
                <div className="flex-1 pb-4 text-center md:text-right">
                    <h1 className="text-3xl font-black text-slate-900 mb-1">{profile.displayName}</h1>
                    <p className="text-sm font-bold text-slate-400 italic">عضو فعال منذ {new Date(profile.createdAt?.seconds * 1000).toLocaleDateString('ar-YE')}</p>
                </div>

                <div className="flex gap-3 pb-4">
                    <Link to="/new" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl text-xs font-black transition-all shadow-xl shadow-emerald-600/20 active:scale-95 flex items-center gap-2">
                        <PlusCircle size={16} />
                        تقديم بلاغ
                    </Link>
                    <button onClick={() => signOut()} className="bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 p-3 rounded-2xl border border-slate-100 transition-all active:scale-95">
                        <LogOut size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12">
                <div className="md:col-span-2 space-y-12">
                    <section>
                        <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-6 italic">النشاط المجتمعي</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: 'بلاغات مرفوعة', val: '١٢', icon: ClipboardList, color: 'emerald' },
                                { label: 'بلاغات محلولة', val: '٨', icon: Heart, color: 'rose' },
                                { label: 'نقاط النشاط', val: '٤٥٠', icon: Star, color: 'amber' },
                            ].map((stat, i) => (
                                <div key={i} className="p-5 rounded-[2rem] bg-slate-50 border border-slate-100">
                                    <stat.icon size={20} className={`text-${stat.color}-500 mb-2`} />
                                    <p className="text-xl font-black text-slate-900 leading-none">{stat.val}</p>
                                    <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tight">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest italic flex items-center gap-2">
                            <Clock size={14} />
                            آخر البلاغات
                        </h3>
                        <div className="space-y-3">
                            {[
                                { title: 'عطل في إنارة الحي', status: 'جاري المعالجة', date: 'منذ ٣ أيام' },
                                { title: 'تسريب مياه في الشارع الرئيسي', status: 'مكتمل', date: 'منذ أسبوع' },
                            ].map((report, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-100 transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                            <ClipboardList size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-800">{report.title}</p>
                                            <p className="text-[10px] font-bold text-slate-400">{report.date}</p>
                                        </div>
                                    </div>
                                    <span className={cn(
                                        "text-[9px] font-black px-3 py-1 rounded-full",
                                        report.status === 'مكتمل' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                                    )}>
                                        {report.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <div className="p-8 rounded-[2.5rem] border border-slate-100 bg-slate-50/50">
                        <h4 className="text-xs font-black text-slate-900 mb-6 uppercase tracking-wider italic">إعدادات سريعة</h4>
                        <div className="space-y-3">
                            {[
                                { label: 'تعديل البيانات الشخصية', icon: User },
                                { label: 'تفضيلات التنبيهات', icon: Bell },
                                { label: 'خريطة بلاغات منطقتي', icon: MapPin },
                                { label: 'إعدادات الخصوصية', icon: Settings },
                            ].map((item, j) => (
                                <button key={j} className="w-full flex items-center justify-between p-4 bg-white rounded-2xl text-[10px] font-black hover:bg-emerald-50 border border-transparent hover:border-emerald-100 transition-all shadow-sm group">
                                    <div className="flex items-center gap-3 text-slate-500 group-hover:text-emerald-700 transition-colors">
                                        <item.icon size={16} />
                                        {item.label}
                                    </div>
                                    <ChevronRight size={14} className="text-slate-300 group-hover:text-emerald-500" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                         <p className="text-[10px] font-black text-emerald-400 uppercase mb-2">الدعم والمساندة</p>
                         <p className="text-xs font-bold leading-relaxed mb-6 opacity-80 italic">
                            هل تواجه مشكلة في استخدام المنصة؟ فريقنا متاح لمساعدتك على مدار الساعة.
                         </p>
                         <button className="w-full py-3 bg-white text-slate-900 rounded-2xl text-[10px] font-black hover:bg-emerald-50 transition-colors active:scale-95">
                             تواصل مع الدعم الفني
                         </button>
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};
