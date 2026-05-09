import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Landmark, 
  Settings, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  Award,
  History,
  FileText,
  Clock,
  ArrowRight,
  Bell,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../core/context/AuthContext';
import { useRole } from '../../core/context/RoleContext';
import { Link } from 'react-router-dom';
import { cn } from '../../core/utils/cn';

export const CouncilProfile: React.FC = () => {
  const { profile, signOut } = useAuth();
  const { currentRole } = useRole();

  if (!profile) return null;

  const themeColor = currentRole?.themeColor || '#1e293b';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-10" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-2xl shadow-slate-500/5"
      >
        <div className="h-40 bg-slate-900 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.1),_transparent)]" />
        </div>

        <div className="px-8 md:px-14 -mt-20 relative">
            <div className="flex flex-col md:flex-row items-end gap-6 mb-12">
                <div className="w-40 h-40 rounded-[2.5rem] bg-white p-2 shadow-2xl relative border border-slate-100">
                    <div className="w-full h-full rounded-[2rem] bg-slate-50 flex items-center justify-center overflow-hidden">
                        {profile.profileImageUrl ? (
                            <img src={profile.profileImageUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <User size={64} className="text-slate-500" />
                        )}
                    </div>
                </div>
                
                <div className="flex-1 pb-4 text-center md:text-right">
                    <h1 className="text-3xl font-black text-slate-900 mb-1">{profile.displayName}</h1>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                            <ShieldCheck size={14} className="text-slate-800" />
                            كود العضوية: CNC-{profile.uid?.slice(-6).toUpperCase()}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        <span className="text-xs font-bold text-slate-400 italic">عضو منتدب منذ {new Date(profile.createdAt?.seconds * 1000).toLocaleDateString('ar-YE')}</span>
                    </div>
                </div>

                <div className="flex gap-3 pb-4">
                    <button onClick={() => signOut()} className="bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-500 p-3 rounded-2xl border border-slate-100 transition-all active:scale-95 group">
                        <LogOut size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12">
                <div className="md:col-span-2 space-y-12">
                    <section>
                        <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-6 italic">إنجازات الرقابة والمتابعة</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'قرارات معتمدة', val: '٢٤', icon: Landmark, color: 'slate' },
                                { label: 'مشاريع مكتملة', val: '١٨', icon: Briefcase, color: 'blue' },
                            ].map((stat, i) => (
                                <div key={i} className="p-6 rounded-[2.5rem] bg-slate-50 border border-slate-100 group transition-all hover:bg-white hover:shadow-lg">
                                    <stat.icon size={24} className={`text-slate-600 mb-4 group-hover:scale-110 transition-transform`} />
                                    <p className="text-2xl font-black text-slate-900 leading-none">{stat.val}</p>
                                    <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-tight">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-slate-900 rounded-[3rem] p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                        <h3 className="text-sm font-black mb-6 text-white flex items-center gap-2">
                             <Award size={18} className="text-amber-400" />
                             المركز الوطني للشفافية
                        </h3>
                        <p className="text-xs font-bold text-slate-300 leading-relaxed mb-6 italic">
                            يتم قياس مستوى الشفافية وجودة التقارير الرقابية بانتظام. حالياً أنت ضمن أعلى ١٠٪ من أعضاء المجالس المحلية تميزاً.
                        </p>
                        <button className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-2xl text-[11px] font-black hover:bg-slate-100 transition-all active:scale-95 group">
                            استعراض شهادات التميز
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </section>
                </div>

                <div className="space-y-8">
                    <div className="p-8 rounded-[3rem] border border-slate-100 bg-white shadow-sm space-y-4">
                        <h4 className="text-xs font-black text-slate-900 mb-2 uppercase tracking-wider italic px-2">الوصول السريع</h4>
                        {[
                            { label: 'سجل القرارات السابقة', icon: History },
                            { label: 'تنبيهات الطوارئ', icon: Bell },
                            { label: 'طلب تقرير فني', icon: FileText },
                            { label: 'الأرشيف القانوني', icon: ShieldCheck },
                            { label: 'إعدادات المنصة', icon: Settings },
                        ].map((item, j) => (
                            <button key={j} className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl text-[11px] font-black hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all group">
                                <div className="flex items-center gap-3 text-slate-500 group-hover:text-slate-900 transition-colors">
                                    <item.icon size={16} />
                                    {item.label}
                                </div>
                                <ChevronRight size={14} className="text-slate-200 group-hover:text-slate-500" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};
