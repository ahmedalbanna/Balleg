import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Headphones, 
  Settings, 
  LogOut, 
  ChevronRight,
  PhoneCall,
  Clock,
  Mic,
  Volume2,
  FileText,
  Star
} from 'lucide-react';
import { useAuth } from '../../core/context/AuthContext';
import { useRole } from '../../core/context/RoleContext';

export const OperatorProfile: React.FC = () => {
  const { profile, signOut } = useAuth();
  const { currentRole } = useRole();

  if (!profile) return null;

  const themeColor = currentRole?.themeColor || '#3b82f6';

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-2xl shadow-blue-500/5 transition-all"
      >
        <div className="bg-blue-600 p-12 md:p-16 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#fff_1px,_transparent_1px)] [background-size:24px_24px]" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="relative group">
                    <div className="w-40 h-40 rounded-[3rem] bg-white p-1.5 shadow-2xl transition-transform group-hover:scale-105 duration-500">
                        <div className="w-full h-full rounded-[2.7rem] bg-blue-50 flex items-center justify-center overflow-hidden">
                            {profile.profileImageUrl ? (
                                <img src={profile.profileImageUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <Headphones className="w-16 h-16 text-blue-500" />
                            )}
                        </div>
                    </div>
                </div>

                <div className="text-center md:text-right">
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2 font-readex">
                        {profile.displayName}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                        <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
                             <Mic size={14} />
                             مشغل عمليات معتمد
                        </span>
                        <div className="flex items-center gap-1 bg-amber-400 px-3 py-1.5 rounded-full text-slate-900 text-[10px] font-black italic">
                            <Star size={12} fill="currentColor" />
                            مستوى ذهبي
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-2xl text-xs font-black transition-all shadow-xl hover:shadow-white/20 hover:-translate-y-0.5 active:scale-95">
                            تعديل الملف الشخصي
                        </button>
                        <button 
                            onClick={() => signOut()}
                            className="bg-blue-700/50 hover:bg-red-500/50 text-white px-8 py-3 rounded-2xl text-xs font-black transition-all backdrop-blur-md border border-white/10 active:scale-95"
                        >
                            تسجيل الخروج
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="p-8 md:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6 px-2 italic">نظرة سريعة على الإنجاز</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                            {[
                                { label: 'إجمالي المكالمات', val: '٥,٢١٢', icon: PhoneCall, color: 'blue' },
                                { label: 'ساعات العمل', val: '٧٨٠', icon: Clock, color: 'indigo' },
                                { label: 'تقارير مكتملة', val: '٩٢٪', icon: FileText, color: 'emerald' },
                            ].map((s, i) => (
                                <div key={i} className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                                    <s.icon size={24} className={`text-${s.color}-500 mb-4 transition-transform group-hover:scale-110`} />
                                    <p className="text-2xl font-black text-slate-900 font-readex leading-none">{s.val}</p>
                                    <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-slate-900 rounded-[3rem] p-10 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                        <h3 className="text-lg font-black mb-8 relative z-10 flex items-center gap-3">
                            <Volume2 className="text-blue-400" />
                            جودة الخدمة الصوتية
                        </h3>
                        <div className="space-y-6 relative z-10">
                            {[
                                { name: 'قوة الإشارة والاتصال', scale: 100 },
                                { name: 'متوسط وقت الرد', scale: 85 },
                                { name: 'تقييم رضى المتصلين', scale: 94 },
                            ].map((n, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex justify-between text-xs font-bold px-1">
                                        <span className="text-slate-400">{n.name}</span>
                                        <span className="text-blue-400">{n.scale}%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${n.scale}%` }}
                                            className="h-full bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100">
                        <h4 className="text-xs font-black text-slate-900 mb-6 uppercase tracking-wider italic">تخصيص الواجهة</h4>
                        <div className="space-y-4">
                            {[
                                { label: 'إعدادات الصوت والميكروفون', icon: Mic },
                                { label: 'تنبيهات المكالمات الواردة', icon: Settings },
                                { label: 'وضع التركيز (DND)', icon: Headphones },
                            ].map((link, j) => (
                                <button key={j} className="w-full flex items-center justify-between p-4 bg-white rounded-2xl text-[11px] font-black hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-all shadow-sm group">
                                    <div className="flex items-center gap-3 group-hover:text-blue-600 transition-colors">
                                        <link.icon size={16} className="text-slate-400 group-hover:text-blue-500" />
                                        {link.label}
                                    </div>
                                    <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-blue-600 text-white shadow-xl shadow-blue-500/20 relative group overflow-hidden">
                         <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.02] transition-opacity" />
                         <p className="text-[10px] font-black opacity-60 uppercase mb-2">الدعم الفني المباشر</p>
                         <p className="text-xs font-bold leading-relaxed mb-6">
                            بصفتك مشغل عمليات، يمكنك الوصول لقناة الدعم الفني المشفرة على مدار الساعة لتجاوز أي مشاكل تقنية.
                         </p>
                         <button className="w-full py-3 bg-white text-blue-600 rounded-xl text-[10px] font-black hover:bg-blue-50 transition-colors active:scale-95">
                             فتح تذكرة دعم فني
                         </button>
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};
