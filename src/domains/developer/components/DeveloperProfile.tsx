import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Code2, 
  Settings, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  Award,
  History,
  Terminal,
  Activity,
  ArrowRight,
  Bell,
  Cpu,
  Database,
  GitBranch
} from 'lucide-react';
import { useAuth } from '../../core/context/AuthContext';
import { useRole } from '../../core/context/RoleContext';
import { Link } from 'react-router-dom';
import { cn } from '../../core/utils/cn';

export const DeveloperProfile: React.FC = () => {
  const { profile, signOut } = useAuth();
  const { currentRole } = useRole();

  if (!profile) return null;

  const themeColor = currentRole?.themeColor || '#6366f1';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-10" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-2xl shadow-indigo-500/5"
      >
        <div className="h-40 bg-indigo-600 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.1),_transparent)]" />
        </div>

        <div className="px-8 md:px-14 -mt-20 relative">
            <div className="flex flex-col md:flex-row items-end gap-6 mb-12">
                <div className="w-40 h-40 rounded-[2.5rem] bg-white p-2 shadow-2xl relative border border-slate-100">
                    <div className="w-full h-full rounded-[2rem] bg-indigo-50 flex items-center justify-center overflow-hidden">
                        {profile.profileImageUrl ? (
                            <img src={profile.profileImageUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <User size={64} className="text-indigo-500" />
                        )}
                    </div>
                </div>
                
                <div className="flex-1 pb-4 text-center md:text-right">
                    <h1 className="text-3xl font-black text-slate-900 mb-1">{profile.displayName}</h1>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <span className="text-xs font-bold text-indigo-600 flex items-center gap-1.5 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                            <ShieldCheck size={14} className="text-indigo-800" />
                            رقم المهندس: DEV-{profile.uid?.slice(-6).toUpperCase()}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        <span className="text-xs font-bold text-slate-400 italic">عضو تقني منذ {new Date(profile.createdAt?.seconds * 1000).toLocaleDateString('ar-YE')}</span>
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
                        <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-6 italic">النشاط التقني والمساهمات</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'تحديثات الكود', val: '١٥٨', icon: GitBranch, color: 'indigo' },
                                { label: 'خدمات نشطة', val: '١٢', icon: Cpu, color: 'blue' },
                            ].map((stat, i) => (
                                <div key={i} className="p-6 rounded-[2.5rem] bg-slate-50 border border-slate-100 group transition-all hover:bg-white hover:shadow-lg">
                                    <stat.icon size={24} className={`text-indigo-600 mb-4 group-hover:scale-110 transition-transform`} />
                                    <p className="text-2xl font-black text-slate-900 leading-none">{stat.val}</p>
                                    <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-tight">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-indigo-900 rounded-[3rem] p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                        <h3 className="text-sm font-black mb-6 text-white flex items-center gap-2">
                             <Award size={18} className="text-indigo-400" />
                             أوسمة التطوير المتميز
                        </h3>
                        <p className="text-xs font-bold text-slate-300 leading-relaxed mb-6 italic">
                            لقد ساهمت في تحسين زمن استجابة النظام بنسبة ٣٠٪ في الربع الأخير. تم منحك وسام "مهندس الأداء المتميز".
                        </p>
                        <button className="inline-flex items-center gap-2 bg-white text-indigo-900 px-6 py-3 rounded-2xl text-[11px] font-black hover:bg-slate-100 transition-all active:scale-95 group">
                            استعراض سجل الأوسمة
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </section>
                </div>

                <div className="space-y-8">
                    <div className="p-8 rounded-[3rem] border border-slate-100 bg-white shadow-sm space-y-4">
                        <h4 className="text-xs font-black text-slate-900 mb-2 uppercase tracking-wider italic px-2">الأدوات المهنية</h4>
                        {[
                            { label: 'سجل الأوامر الطرفية', icon: Terminal },
                            { label: 'تقارير مراقبة الأداء', icon: Activity },
                            { label: 'إدارة قواعد البيانات', icon: Database },
                            { label: 'تنبيهات البنية التحتية', icon: Bell },
                            { label: 'إعدادات الحساب التقني', icon: Settings },
                        ].map((item, j) => (
                            <button key={j} className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl text-[11px] font-black hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all group">
                                <div className="flex items-center gap-3 text-slate-500 group-hover:text-indigo-900 transition-colors">
                                    <item.icon size={16} />
                                    {item.label}
                                </div>
                                <ChevronRight size={14} className="text-slate-200 group-hover:text-indigo-500" />
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
